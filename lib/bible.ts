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

export const DEFAULT_TRANSLATION: TranslationId = "WEB";

// Resolve a chapter. Prefer the requested translation; if missing, fall back
// to any available translation (preferring WEB).
export function getChapter(
  bookId: string,
  chapter: number,
  translation: TranslationId = DEFAULT_TRANSLATION
): ChapterText | undefined {
  // Ingested catalog
  const fromIngested = ingested[translation]?.[bookId]?.[chapter];
  if (fromIngested) return fromIngested;
  // Hand seed
  const fromSeed = findSeedChapter(bookId, chapter, translation);
  if (fromSeed) return fromSeed;
  // Fallback to any available translation for this chapter (WEB first)
  for (const t of translationOrder) {
    const fromIng = ingested[t]?.[bookId]?.[chapter];
    if (fromIng) return fromIng;
    const fromSd = findSeedChapter(bookId, chapter, t);
    if (fromSd) return fromSd;
  }
  return undefined;
}

export function availableTranslations(bookId: string, chapter: number): TranslationId[] {
  const set = new Set<TranslationId>();
  for (const t of translationOrder) {
    if (ingested[t]?.[bookId]?.[chapter]) set.add(t);
  }
  for (const t of seedLoadedTranslations(bookId, chapter)) set.add(t);
  return Array.from(set);
}

export function isLoaded(bookId: string, chapter: number): boolean {
  return availableTranslations(bookId, chapter).length > 0;
}

export function loadedChaptersOf(bookId: string): number[] {
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
};

export function loadedSummary(): LoadedSummary {
  let booksWithText = 0;
  let chaptersWithText = 0;
  for (const book of canon) {
    const loaded = loadedChaptersOf(book.id);
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
