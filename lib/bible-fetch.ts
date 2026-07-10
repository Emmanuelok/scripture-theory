// Runtime Bible providers.
//
// Public-domain editions use bible-api.com's structured data endpoint. The
// licensed ESV is requested directly from Crossway when ESV_API_KEY is set.
// ESV responses are deliberately no-store: the reader displays the required
// attribution and the service worker never persists licensed text.

import type { ChapterText } from "@/data/bible/seed";
import { getBook } from "@/data/bible/canon";
import {
  translationOrder,
  translations,
  translationSupportsTestament,
  type TranslationId,
} from "@/data/bible/translations";
import { fetchWithTimeout } from "@/lib/fetch-timeout";

export const BIBLE_API_BOOK_ID: Record<string, string> = {
  genesis: "GEN",
  exodus: "EXO",
  leviticus: "LEV",
  numbers: "NUM",
  deuteronomy: "DEU",
  joshua: "JOS",
  judges: "JDG",
  ruth: "RUT",
  "1samuel": "1SA",
  "2samuel": "2SA",
  "1kings": "1KI",
  "2kings": "2KI",
  "1chronicles": "1CH",
  "2chronicles": "2CH",
  ezra: "EZR",
  nehemiah: "NEH",
  esther: "EST",
  job: "JOB",
  psalms: "PSA",
  proverbs: "PRO",
  ecclesiastes: "ECC",
  songofsongs: "SNG",
  isaiah: "ISA",
  jeremiah: "JER",
  lamentations: "LAM",
  ezekiel: "EZK",
  daniel: "DAN",
  hosea: "HOS",
  joel: "JOL",
  amos: "AMO",
  obadiah: "OBA",
  jonah: "JON",
  micah: "MIC",
  nahum: "NAM",
  habakkuk: "HAB",
  zephaniah: "ZEP",
  haggai: "HAG",
  zechariah: "ZEC",
  malachi: "MAL",
  matthew: "MAT",
  mark: "MRK",
  luke: "LUK",
  john: "JHN",
  acts: "ACT",
  romans: "ROM",
  "1corinthians": "1CO",
  "2corinthians": "2CO",
  galatians: "GAL",
  ephesians: "EPH",
  philippians: "PHP",
  colossians: "COL",
  "1thessalonians": "1TH",
  "2thessalonians": "2TH",
  "1timothy": "1TI",
  "2timothy": "2TI",
  titus: "TIT",
  philemon: "PHM",
  hebrews: "HEB",
  james: "JAS",
  "1peter": "1PE",
  "2peter": "2PE",
  "1john": "1JN",
  "2john": "2JN",
  "3john": "3JN",
  jude: "JUD",
  revelation: "REV",
};

/** Provider-capable translations. Configuration and canon coverage are checked separately. */
export const RUNTIME_TRANSLATIONS = translationOrder.filter(
  (id) => translations[id].provider !== "bundled",
);

export function isRuntimeFetchable(
  translation: TranslationId,
  bookId?: string,
): boolean {
  const meta = translations[translation];
  if (meta.provider === "bundled") return false;
  if (meta.provider === "crossway" && !process.env.ESV_API_KEY) return false;

  if (bookId) {
    const book = getBook(bookId);
    if (!book || !translationSupportsTestament(translation, book.testament))
      return false;
  }

  return true;
}

export type BibleProvider = "bible-api" | "esv" | "local";
export type BibleFetchErrorCode =
  | "INVALID_REQUEST"
  | "NO_RUNTIME_SOURCE"
  | "UNSUPPORTED_BOOK"
  | "MISSING_API_KEY"
  | "UPSTREAM_AUTH"
  | "UPSTREAM_RATE_LIMITED"
  | "UPSTREAM_NOT_FOUND"
  | "UPSTREAM_TIMEOUT"
  | "UPSTREAM_UNAVAILABLE"
  | "INVALID_UPSTREAM_RESPONSE";

export type BibleFetchResult =
  | { ok: true; chapter: ChapterText }
  | {
      ok: false;
      error: {
        code: BibleFetchErrorCode;
        provider: BibleProvider;
        retryable: boolean;
        retryAfterSec?: number;
      };
    };

function failure(
  code: BibleFetchErrorCode,
  provider: BibleProvider,
  retryable: boolean,
  retryAfterSec?: number,
): BibleFetchResult {
  return {
    ok: false,
    error: {
      code,
      provider,
      retryable,
      ...(retryAfterSec ? { retryAfterSec } : {}),
    },
  };
}

function retryAfterSeconds(response: Response): number | undefined {
  const value = Number(response.headers.get("retry-after"));
  return Number.isFinite(value) && value > 0
    ? Math.min(Math.ceil(value), 3_600)
    : undefined;
}

function fetchFailure(
  error: unknown,
  provider: BibleProvider,
): BibleFetchResult {
  const timedOut =
    error instanceof Error &&
    (error.name === "AbortError" ||
      error.message.toLowerCase().includes("timed out"));
  return failure(
    timedOut ? "UPSTREAM_TIMEOUT" : "UPSTREAM_UNAVAILABLE",
    provider,
    true,
  );
}

export async function fetchChapterFromApi(
  translation: TranslationId,
  bookId: string,
  chapter: number,
): Promise<ChapterText | null> {
  const result = await fetchChapterResultFromApi(translation, bookId, chapter);
  return result.ok ? result.chapter : null;
}

export async function fetchChapterResultFromApi(
  translation: TranslationId,
  bookId: string,
  chapter: number,
): Promise<BibleFetchResult> {
  const book = getBook(bookId);
  if (
    !book ||
    !Number.isInteger(chapter) ||
    chapter < 1 ||
    chapter > book.chapters
  ) {
    return failure("INVALID_REQUEST", "local", false);
  }
  if (!translationSupportsTestament(translation, book.testament)) {
    return failure("UNSUPPORTED_BOOK", "local", false);
  }

  const meta = translations[translation];
  if (meta.provider === "crossway" && !process.env.ESV_API_KEY) {
    return failure("MISSING_API_KEY", "esv", false);
  }
  if (meta.provider === "crossway") return fetchEsvChapter(bookId, chapter);
  if (meta.provider !== "bible-api" || !meta.apiId) {
    return failure("NO_RUNTIME_SOURCE", "local", false);
  }
  return fetchPublicDomainChapter(translation, meta.apiId, bookId, chapter);
}

async function fetchPublicDomainChapter(
  translation: TranslationId,
  apiId: string,
  bookId: string,
  chapter: number,
): Promise<BibleFetchResult> {
  const bookApiId = BIBLE_API_BOOK_ID[bookId];
  if (!bookApiId) return failure("INVALID_REQUEST", "local", false);
  const url = `https://bible-api.com/data/${encodeURIComponent(apiId)}/${bookApiId}/${chapter}`;

  try {
    const res = await fetchWithTimeout(url, {
      timeoutMs: 8_000,
      next: {
        revalidate: 86_400,
        tags: [`bible:${translation}:${bookId}:${chapter}`],
      },
    });
    if (res.status === 429) {
      return failure(
        "UPSTREAM_RATE_LIMITED",
        "bible-api",
        true,
        retryAfterSeconds(res),
      );
    }
    if (res.status === 404)
      return failure("UPSTREAM_NOT_FOUND", "bible-api", false);
    if (!res.ok) return failure("UPSTREAM_UNAVAILABLE", "bible-api", true);
    const data = (await res.json()) as {
      translation?: { identifier?: string };
      verses?: Array<{
        book_id?: string;
        chapter?: number;
        verse?: number;
        text?: string;
      }>;
    };
    if (
      data.translation?.identifier !== apiId ||
      !data.verses?.length ||
      data.verses.some(
        (verse) =>
          verse.book_id !== bookApiId || Number(verse.chapter) !== chapter,
      )
    ) {
      return failure("INVALID_UPSTREAM_RESPONSE", "bible-api", true);
    }

    const verses = data.verses
      .map((verse) => ({
        v: Number(verse.verse),
        t: (verse.text ?? "").trim(),
      }))
      .filter(
        (verse) =>
          Number.isInteger(verse.v) && verse.v > 0 && verse.t.length > 0,
      );
    if (verses.length !== data.verses.length) {
      return failure("INVALID_UPSTREAM_RESPONSE", "bible-api", true);
    }

    return {
      ok: true,
      chapter: { book: bookId, chapter, translation, verses },
    };
  } catch (error) {
    return fetchFailure(error, "bible-api");
  }
}

// ─── ESV (Crossway) ──────────────────────────────────────────

async function fetchEsvChapter(
  bookId: string,
  chapter: number,
): Promise<BibleFetchResult> {
  const token = process.env.ESV_API_KEY;
  if (!token) return failure("MISSING_API_KEY", "esv", false);
  const book = getBook(bookId);
  if (!book) return failure("INVALID_REQUEST", "local", false);

  const params = new URLSearchParams({
    q: `${book.name} ${chapter}`,
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

  try {
    const res = await fetchWithTimeout(
      `https://api.esv.org/v3/passage/text/?${params}`,
      {
        timeoutMs: 8_000,
        cache: "no-store",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      },
    );
    if (res.status === 401 || res.status === 403) {
      return failure("UPSTREAM_AUTH", "esv", false);
    }
    if (res.status === 429) {
      return failure(
        "UPSTREAM_RATE_LIMITED",
        "esv",
        true,
        retryAfterSeconds(res),
      );
    }
    if (res.status === 404) return failure("UPSTREAM_NOT_FOUND", "esv", false);
    if (!res.ok) return failure("UPSTREAM_UNAVAILABLE", "esv", true);
    const data = (await res.json()) as { passages?: string[] };
    if (!data.passages?.length)
      return failure("INVALID_UPSTREAM_RESPONSE", "esv", true);

    const verses = parseEsvVerses(data.passages.join("\n"));
    if (verses.length === 0)
      return failure("INVALID_UPSTREAM_RESPONSE", "esv", true);
    return {
      ok: true,
      chapter: { book: bookId, chapter, translation: "ESV", verses },
    };
  } catch (error) {
    return fetchFailure(error, "esv");
  }
}

/** Pull `[N] text` markers out of Crossway's plain-text response. */
export function parseEsvVerses(text: string): Array<{ v: number; t: string }> {
  const cleaned = text.replace(/\(ESV\)\s*$/i, "").trim();
  const regex = /\[(\d+)\]\s*([^\[]*)/g;
  const verses: Array<{ v: number; t: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleaned)) !== null) {
    const v = Number.parseInt(match[1], 10);
    const t = match[2].replace(/\s+/g, " ").trim();
    if (v > 0 && t) verses.push({ v, t });
  }

  return verses;
}
