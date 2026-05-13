import { canon, getBook, type BookMeta } from "@/data/bible/canon";
import {
  seed,
  findChapter as findSeedChapter,
  loadedChapters as seedLoaded,
  type ChapterText,
} from "@/data/bible/seed";
import { ingested } from "@/data/bible/text";

// Chapter resolution: ingested WEB text wins; otherwise the hand-verified seed.
export function getChapter(bookId: string, chapter: number): ChapterText | undefined {
  return ingested?.[bookId]?.[chapter] ?? findSeedChapter(bookId, chapter);
}

export function isLoaded(bookId: string, chapter: number): boolean {
  return Boolean(getChapter(bookId, chapter));
}

export function loadedChaptersOf(bookId: string): number[] {
  const fromIngested = ingested[bookId] ? Object.keys(ingested[bookId]).map(Number) : [];
  const fromSeed = seedLoaded(bookId);
  return Array.from(new Set<number>([...fromIngested, ...fromSeed])).sort((a, b) => a - b);
}

export type LoadedSummary = {
  totalBooks: number;
  totalChapters: number;
  booksWithText: number;
  chaptersWithText: number;
};

export function loadedSummary(): LoadedSummary {
  let booksWithText = 0;
  let chaptersWithText = 0;
  for (const book of canon) {
    const loaded = loadedChaptersOf(book.id);
    if (loaded.length > 0) booksWithText++;
    chaptersWithText += loaded.length;
  }
  return {
    totalBooks: canon.length,
    totalChapters: canon.reduce((a, b) => a + b.chapters, 0),
    booksWithText,
    chaptersWithText,
  };
}

export { canon, getBook, seed };
export type { BookMeta, ChapterText };
