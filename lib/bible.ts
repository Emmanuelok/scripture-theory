import { canon, getBook, type BookMeta } from "@/data/bible/canon";
import {
  seed,
  findChapter as findSeedChapter,
  loadedChapters as seedLoadedChapters,
  loadedTranslations as seedLoadedTranslations,
  type ChapterText,
} from "@/data/bible/seed";
import { ingested } from "@/data/bible/text";
import {
  translations,
  translationOrder,
  translationSupportsTestament,
  type TranslationId,
  type TranslationMeta,
} from "@/data/bible/translations";
import {
  fetchChapterResultFromApi,
  isRuntimeFetchable,
  RUNTIME_TRANSLATIONS,
  type BibleFetchResult,
} from "@/lib/bible-fetch";

export const DEFAULT_TRANSLATION: TranslationId = "WEB";

// Synchronous lookup: ingested catalog → hand seed. Used where async isn't
// available (e.g., search index built at module load).
export function getChapterSync(
  bookId: string,
  chapter: number,
  translation: TranslationId = DEFAULT_TRANSLATION,
): ChapterText | undefined {
  const fromIngested = ingested[translation]?.[bookId]?.[chapter];
  if (fromIngested) return fromIngested;
  return findSeedChapter(bookId, chapter, translation);
}

// Async lookup with runtime fallback: ingested → seed → configured provider.
export async function getChapter(
  bookId: string,
  chapter: number,
  translation: TranslationId = DEFAULT_TRANSLATION,
): Promise<ChapterText | undefined> {
  const result = await getChapterResult(bookId, chapter, translation);
  return result.ok ? result.chapter : undefined;
}

export async function getChapterResult(
  bookId: string,
  chapter: number,
  translation: TranslationId = DEFAULT_TRANSLATION,
): Promise<BibleFetchResult> {
  const local = getChapterSync(bookId, chapter, translation);
  if (local) return { ok: true, chapter: local };

  const book = getBook(bookId);
  if (
    !book ||
    !Number.isInteger(chapter) ||
    chapter < 1 ||
    chapter > book.chapters
  ) {
    return {
      ok: false,
      error: { code: "INVALID_REQUEST", provider: "local", retryable: false },
    };
  }

  const meta = translations[translation];
  if (!translationSupportsTestament(translation, book.testament)) {
    return {
      ok: false,
      error: { code: "UNSUPPORTED_BOOK", provider: "local", retryable: false },
    };
  }
  if (meta.provider === "crossway" && !process.env.ESV_API_KEY) {
    return {
      ok: false,
      error: { code: "MISSING_API_KEY", provider: "esv", retryable: false },
    };
  }
  if (!isRuntimeFetchable(translation, bookId)) {
    return {
      ok: false,
      error: { code: "NO_RUNTIME_SOURCE", provider: "local", retryable: false },
    };
  }

  return fetchChapterResultFromApi(translation, bookId, chapter);
}

// All translations available for this exact chapter: local text plus provider
// editions that are configured and cover the book's testament.
export function availableTranslations(
  bookId: string,
  chapter: number,
): TranslationId[] {
  const set = new Set<TranslationId>();
  for (const id of translationOrder) {
    if (ingested[id]?.[bookId]?.[chapter]) set.add(id);
  }
  for (const id of seedLoadedTranslations(bookId, chapter)) set.add(id);
  for (const id of RUNTIME_TRANSLATIONS) {
    if (isRuntimeFetchable(id, bookId)) set.add(id);
  }
  return translationOrder.filter((id) => set.has(id));
}

export function isLoaded(bookId: string, chapter: number): boolean {
  if (seedLoadedChapters(bookId).includes(chapter)) return true;
  for (const id of translationOrder) {
    if (ingested[id]?.[bookId]?.[chapter]) return true;
  }
  return RUNTIME_TRANSLATIONS.some((id) => isRuntimeFetchable(id, bookId));
}

export function loadedChaptersOf(bookId: string): number[] {
  const book = canon.find((candidate) => candidate.id === bookId);
  if (!book) return [];
  return Array.from({ length: book.chapters }, (_, index) => index + 1);
}

export function seedChaptersOf(bookId: string): number[] {
  const set = new Set<number>(seedLoadedChapters(bookId));
  for (const id of translationOrder) {
    const translatedBook = ingested[id]?.[bookId];
    if (translatedBook) {
      for (const chapter of Object.keys(translatedBook))
        set.add(Number(chapter));
    }
  }
  return Array.from(set).sort((a, b) => a - b);
}

export type LoadedSummary = {
  totalBooks: number;
  totalChapters: number;
  booksWithText: number;
  chaptersWithText: number;
  translationsLoaded: number;
  translationsCatalog: number;
  runtimeTranslations: number;
};

export function loadedSummary(): LoadedSummary {
  let booksWithText = 0;
  let chaptersWithText = 0;
  for (const book of canon) {
    const loaded = seedChaptersOf(book.id);
    if (loaded.length > 0) booksWithText++;
    chaptersWithText += loaded.length;
  }

  const translationsLoaded = new Set<TranslationId>();
  for (const chapter of seed) translationsLoaded.add(chapter.translation);
  for (const id of translationOrder) {
    if (ingested[id] && Object.keys(ingested[id]!).length > 0)
      translationsLoaded.add(id);
  }

  return {
    totalBooks: canon.length,
    totalChapters: canon.reduce((sum, book) => sum + book.chapters, 0),
    booksWithText,
    chaptersWithText,
    translationsLoaded: translationsLoaded.size,
    translationsCatalog: translationOrder.length,
    runtimeTranslations: RUNTIME_TRANSLATIONS.filter((id) =>
      isRuntimeFetchable(id),
    ).length,
  };
}

export { canon, getBook, seed, translations, translationOrder };
export type { BookMeta, ChapterText, TranslationId, TranslationMeta };
