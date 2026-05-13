// Runtime Bible fetch from bible-api.com (free, public-domain, no key).
// Hits the upstream once per (translation, book, chapter) per 24h thanks to
// Next.js fetch caching, so each chapter pays one network round-trip ever
// (per Vercel region) and then serves from cache.

import type { ChapterText } from "@/data/bible/seed";
import type { TranslationId } from "@/data/bible/translations";

const TRANSLATION_API_KEY: Partial<Record<TranslationId, string>> = {
  WEB: "web",
  KJV: "kjv",
  ASV: "asv",
  BBE: "bbe",
  YLT: "ylt",
  DARBY: "darby",
  DRA: "drb",
  ALMEIDA: "almeida",
};

const URL_NAME: Record<string, string> = {
  songofsongs: "song of solomon",
  "1samuel": "1 samuel",
  "2samuel": "2 samuel",
  "1kings": "1 kings",
  "2kings": "2 kings",
  "1chronicles": "1 chronicles",
  "2chronicles": "2 chronicles",
  "1corinthians": "1 corinthians",
  "2corinthians": "2 corinthians",
  "1thessalonians": "1 thessalonians",
  "2thessalonians": "2 thessalonians",
  "1timothy": "1 timothy",
  "2timothy": "2 timothy",
  "1peter": "1 peter",
  "2peter": "2 peter",
  "1john": "1 john",
  "2john": "2 john",
  "3john": "3 john",
};

export const RUNTIME_TRANSLATIONS: TranslationId[] = Object.keys(
  TRANSLATION_API_KEY
) as TranslationId[];

export function isRuntimeFetchable(translation: TranslationId): boolean {
  return Boolean(TRANSLATION_API_KEY[translation]);
}

export async function fetchChapterFromApi(
  translation: TranslationId,
  bookId: string,
  chapter: number
): Promise<ChapterText | null> {
  const apiKey = TRANSLATION_API_KEY[translation];
  if (!apiKey) return null;
  const bookName = URL_NAME[bookId] ?? bookId;
  const url = `https://bible-api.com/${encodeURIComponent(
    `${bookName} ${chapter}`
  )}?translation=${apiKey}`;

  try {
    const res = await fetch(url, {
      // Cache server-side for 24h. Subsequent visits to the same chapter
      // hit Vercel's data cache, not the upstream.
      next: { revalidate: 86400, tags: [`bible:${translation}:${bookId}:${chapter}`] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      verses?: { verse: number; text: string }[];
    };
    if (!data.verses || data.verses.length === 0) return null;
    return {
      book: bookId,
      chapter,
      translation,
      verses: data.verses.map((v) => ({ v: v.verse, t: (v.text ?? "").trim() })),
    };
  } catch {
    return null;
  }
}
