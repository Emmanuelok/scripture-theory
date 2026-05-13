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
  type TranslationId,
  type TranslationMeta,
} from "@/data/bible/translations";
import { fetchChapterFromApi, isRuntimeFetchable, RUNTIME_TRANSLATIONS } from "@/lib/bible-fetch";

export const DEFAULT_TRANSLATION: TranslationId = "WEB";

// Synchronous lookup: ingested catalog → hand seed. Used where async isn't
// available (e.g., search index built at module load).
export function getChapterSync(
  bookId: string,
  chapter: number,
  translation: TranslationId = DEFAULT_TRANSLATION
): ChapterText | undefined {
  const fromIngested = ingested[translation]?.[bookId]?.[chapter];
  if (fromIngested) return fromIngested;
  return findSeedChapter(bookId, chapter, translation);
}

// Async lookup with runtime fallback: ingested → seed → bible-api.com
// (cached 24h via Next.js fetch cache). This is what the chapter reader
// uses, so any chapter on earth loads on first visit.
export async function getChapter(
  bookId: string,
  chapter: number,
  translation: TranslationId = DEFAULT_TRANSLATION
): Promise<ChapterText | undefined> {
  const local = getChapterSync(bookId, chapter, translation);
  if (local) return local;
  if (isRuntimeFetchable(translation)) {
    const fetched = await fetchChapterFromApi(translation, bookId, chapter);
    if (fetched) return fetched;
  }
  return undefined;
}

// All translations available for a chapter — local seed/ingested PLUS the
// runtime-fetchable set (we promise we can deliver them on demand).
export function availableTranslations(bookId: string, chapter: number): TranslationId[] {
  const set = new Set<TranslationId>();
  for (const t of translationOrder) {
    if (ingested[t]?.[bookId]?.[chapter]) set.add(t);
  }
  for (const t of seedLoadedTranslations(bookId, chapter)) set.add(t);
  for (const t of RUNTIME_TRANSLATIONS) set.add(t);
  return translationOrder.filter((t) => set.has(t));
}

// "Is this chapter loadable at all?" — yes if local OR runtime-fetchable in
// any supported translation.
export function isLoaded(bookId: string, chapter: number): boolean {
  if (seedLoadedChapters(bookId).includes(chapter)) return true;
  for (const t of translationOrder) if (ingested[t]?.[bookId]?.[chapter]) return true;
  // Anything in the canon is runtime-fetchable from at least one translation.
  return RUNTIME_TRANSLATIONS.length > 0;
}

export function loadedChaptersOf(bookId: string): number[] {
  // For book overviews we treat every chapter as loadable (because runtime
  // fetch can serve any of them). The "ready" badge on /bible reflects
  // chapters with seed/ingested text only — see seedOnlyChapters.
  const book = canon.find((b) => b.id === bookId);
  if (!book) return [];
  return Array.from({ length: book.chapters }, (_, i) => i + 1);
}

export function seedChaptersOf(bookId: string): number[] {
  const set = new Set<number>(seedLoadedChapters(bookId));
  for (const t of translationOrder) {
    const tBook = ingested[t]?.[bookId];
    if (tBook) for (const k of Object.keys(tBook)) set.add(Number(k));
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
  for (const c of seed) translationsLoaded.add(c.translation);
  for (const t of translationOrder) {
    if (ingested[t] && Object.keys(ingested[t]!).length > 0) translationsLoaded.add(t);
  }
  return {
    totalBooks: canon.length,
    totalChapters: canon.reduce((a, b) => a + b.chapters, 0),
    booksWithText,
    chaptersWithText,
    translationsLoaded: translationsLoaded.size,
    translationsCatalog: translationOrder.length,
    runtimeTranslations: RUNTIME_TRANSLATIONS.length,
  };
}

export {
  canon,
  getBook,
  seed,
  translations,
  translationOrder,
};
export type { BookMeta, ChapterText, TranslationId, TranslationMeta };
