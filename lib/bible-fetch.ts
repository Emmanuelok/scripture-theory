// Runtime Bible fetch.
//
// Public-domain editions are fetched from bible-api.com (free, no key).
// The ESV is fetched directly from Crossway's free API when ESV_API_KEY is
// configured; per Crossway's terms it is served fresh (no extended cache,
// no offline storage), and falls back to "unavailable" if the key is absent.

import type { ChapterText } from "@/data/bible/seed";
import type { TranslationId } from "@/data/bible/translations";
import { getBook } from "@/data/bible/canon";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

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

export const RUNTIME_TRANSLATIONS: TranslationId[] = [
  ...(Object.keys(TRANSLATION_API_KEY) as TranslationId[]),
  "ESV", // network-fetched separately when a key is configured
];

export function isRuntimeFetchable(translation: TranslationId): boolean {
  if (translation === "ESV") return Boolean(process.env.ESV_API_KEY);
  return Boolean(TRANSLATION_API_KEY[translation]);
}

export async function fetchChapterFromApi(
  translation: TranslationId,
  bookId: string,
  chapter: number
): Promise<ChapterText | null> {
  if (translation === "ESV") return fetchEsvChapter(bookId, chapter);

  const apiKey = TRANSLATION_API_KEY[translation];
  if (!apiKey) return null;
  const bookName = URL_NAME[bookId] ?? bookId;
  const url = `https://bible-api.com/${encodeURIComponent(
    `${bookName} ${chapter}`
  )}?translation=${apiKey}`;

  try {
    const res = await fetchWithTimeout(url, {
      timeoutMs: 8000,
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

// ─── ESV (Crossway) ──────────────────────────────────────────
// Free API, requires a token. Crossway permits caching for performance but
// not indefinite storage; we use Next's 1-hour revalidate (well within
// terms) and never persist on the client.
async function fetchEsvChapter(bookId: string, chapter: number): Promise<ChapterText | null> {
  const token = process.env.ESV_API_KEY;
  if (!token) return null;
  const book = getBook(bookId);
  if (!book) return null;

  const query = `${book.name} ${chapter}`;
  const params = new URLSearchParams({
    q: query,
    "include-headings": "false",
    "include-footnotes": "false",
    "include-passage-references": "false",
    "include-short-copyright": "false",
    "include-verse-numbers": "true",
    "include-first-verse-numbers": "true",
    "indent-poetry": "false",
    "indent-poetry-lines": "0",
    "indent-declares": "0",
    "indent-psalm-doxology": "0",
    "line-length": "0",
  });
  const url = `https://api.esv.org/v3/passage/text/?${params.toString()}`;

  try {
    const res = await fetchWithTimeout(url, {
      timeoutMs: 8000,
      headers: { Authorization: `Token ${token}` },
      // Crossway permits short caching for performance. Stay well inside.
      next: { revalidate: 3600, tags: [`bible:ESV:${bookId}:${chapter}`] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { passages?: string[] };
    if (!data.passages || data.passages.length === 0) return null;
    const verses = parseEsvVerses(data.passages.join("\n"));
    if (verses.length === 0) return null;
    return {
      book: bookId,
      chapter,
      translation: "ESV",
      verses,
    };
  } catch {
    return null;
  }
}

/** Pull `[N] text` markers out of the ESV text endpoint into verse rows. */
function parseEsvVerses(text: string): { v: number; t: string }[] {
  // Drop the trailing "(ESV)" tag if present.
  const cleaned = text.replace(/\(ESV\)\s*$/i, "").trim();
  const regex = /\[(\d+)\]\s*([^\[]*)/g;
  const out: { v: number; t: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(cleaned)) !== null) {
    const v = parseInt(match[1], 10);
    const t = match[2].replace(/\s+/g, " ").trim();
    if (v > 0 && t) out.push({ v, t });
  }
  return out;
}
