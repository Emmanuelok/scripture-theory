#!/usr/bin/env node
// Ingest a targeted set of authentic public-domain Bible chapters from
// bible-api.com's structured data endpoint. Scripture Theory never
// machine-translates text.
//
// Examples:
//   npm run ingest-bible -- --translations=web,kjv --books=john,romans
//   npm run ingest-bible -- --translations=cuv --books=john
//
// Both flags are required. bible-api.com explicitly asks clients not to use
// its live API to download whole Bibles; use the upstream source archives for
// a full-canon build. This script caps and paces small editorial bundles.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(REPO_ROOT, "data/bible/text.ts");
const REQUEST_DELAY_MS = 2_100;
const MAX_REQUESTS = 250;

const TRANSLATIONS = [
  { id: "WEB", apiId: "web", coverage: "full" },
  { id: "WEBBE", apiId: "webbe", coverage: "full" },
  { id: "KJV", apiId: "kjv", coverage: "full" },
  { id: "OEBUS", apiId: "oeb-us", coverage: "full" },
  { id: "OEBCW", apiId: "oeb-cw", coverage: "full" },
  { id: "ASV", apiId: "asv", coverage: "full" },
  { id: "BBE", apiId: "bbe", coverage: "full" },
  { id: "YLT", apiId: "ylt", coverage: "new-testament" },
  { id: "DARBY", apiId: "darby", coverage: "full" },
  { id: "DRA", apiId: "dra", coverage: "full" },
  { id: "ALMEIDA", apiId: "almeida", coverage: "full" },
  { id: "BKR", apiId: "bkr", coverage: "full" },
  { id: "RCCV", apiId: "rccv", coverage: "full" },
  { id: "CUV", apiId: "cuv", coverage: "full" },
  { id: "CHEROKEE", apiId: "cherokee", coverage: "new-testament" },
];

// [local slug, USFM book id, chapters, testament]
const CANON = [
  ["genesis", "GEN", 50, "OT"],
  ["exodus", "EXO", 40, "OT"],
  ["leviticus", "LEV", 27, "OT"],
  ["numbers", "NUM", 36, "OT"],
  ["deuteronomy", "DEU", 34, "OT"],
  ["joshua", "JOS", 24, "OT"],
  ["judges", "JDG", 21, "OT"],
  ["ruth", "RUT", 4, "OT"],
  ["1samuel", "1SA", 31, "OT"],
  ["2samuel", "2SA", 24, "OT"],
  ["1kings", "1KI", 22, "OT"],
  ["2kings", "2KI", 25, "OT"],
  ["1chronicles", "1CH", 29, "OT"],
  ["2chronicles", "2CH", 36, "OT"],
  ["ezra", "EZR", 10, "OT"],
  ["nehemiah", "NEH", 13, "OT"],
  ["esther", "EST", 10, "OT"],
  ["job", "JOB", 42, "OT"],
  ["psalms", "PSA", 150, "OT"],
  ["proverbs", "PRO", 31, "OT"],
  ["ecclesiastes", "ECC", 12, "OT"],
  ["songofsongs", "SNG", 8, "OT"],
  ["isaiah", "ISA", 66, "OT"],
  ["jeremiah", "JER", 52, "OT"],
  ["lamentations", "LAM", 5, "OT"],
  ["ezekiel", "EZK", 48, "OT"],
  ["daniel", "DAN", 12, "OT"],
  ["hosea", "HOS", 14, "OT"],
  ["joel", "JOL", 3, "OT"],
  ["amos", "AMO", 9, "OT"],
  ["obadiah", "OBA", 1, "OT"],
  ["jonah", "JON", 4, "OT"],
  ["micah", "MIC", 7, "OT"],
  ["nahum", "NAM", 3, "OT"],
  ["habakkuk", "HAB", 3, "OT"],
  ["zephaniah", "ZEP", 3, "OT"],
  ["haggai", "HAG", 2, "OT"],
  ["zechariah", "ZEC", 14, "OT"],
  ["malachi", "MAL", 4, "OT"],
  ["matthew", "MAT", 28, "NT"],
  ["mark", "MRK", 16, "NT"],
  ["luke", "LUK", 24, "NT"],
  ["john", "JHN", 21, "NT"],
  ["acts", "ACT", 28, "NT"],
  ["romans", "ROM", 16, "NT"],
  ["1corinthians", "1CO", 16, "NT"],
  ["2corinthians", "2CO", 13, "NT"],
  ["galatians", "GAL", 6, "NT"],
  ["ephesians", "EPH", 6, "NT"],
  ["philippians", "PHP", 4, "NT"],
  ["colossians", "COL", 4, "NT"],
  ["1thessalonians", "1TH", 5, "NT"],
  ["2thessalonians", "2TH", 3, "NT"],
  ["1timothy", "1TI", 6, "NT"],
  ["2timothy", "2TI", 4, "NT"],
  ["titus", "TIT", 3, "NT"],
  ["philemon", "PHM", 1, "NT"],
  ["hebrews", "HEB", 13, "NT"],
  ["james", "JAS", 5, "NT"],
  ["1peter", "1PE", 5, "NT"],
  ["2peter", "2PE", 3, "NT"],
  ["1john", "1JN", 5, "NT"],
  ["2john", "2JN", 1, "NT"],
  ["3john", "3JN", 1, "NT"],
  ["jude", "JUD", 1, "NT"],
  ["revelation", "REV", 22, "NT"],
];

const args = process.argv.slice(2);
function arg(flag) {
  const value = args.find((entry) => entry.startsWith(`${flag}=`));
  return value ? value.slice(flag.length + 1) : null;
}

function values(value) {
  return value
    ? new Set(value.split(",").map((entry) => entry.trim().toLowerCase()))
    : null;
}

const onlyBooks = values(arg("--books"));
const onlyTranslations = values(arg("--translations"));

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

async function fetchChapter(apiId, bookApiId, chapter) {
  const url = `https://bible-api.com/data/${apiId}/${bookApiId}/${chapter}`;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const response = await fetch(url, { signal: AbortSignal.timeout(12_000) });
    if (response.ok) {
      const data = await response.json();
      if (!data.verses?.length) throw new Error("empty verses");
      return data.verses.map((verse) => ({
        v: Number(verse.verse),
        t: String(verse.text ?? "").trim(),
      }));
    }

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 3) throw new Error(`HTTP ${response.status}`);
    const retryAfter = Number(response.headers.get("retry-after"));
    await delay(
      Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1_000
        : 1_000 * 2 ** attempt,
    );
  }
  throw new Error("unreachable");
}

async function main() {
  const catalog = {};
  let totalChapters = 0;
  let failed = 0;

  if (!onlyBooks || !onlyTranslations) {
    throw new Error(
      "Targeted ingestion requires both --translations and --books. The live API must not be used to download whole Bibles.",
    );
  }

  const activeTranslations = TRANSLATIONS.filter(
    ({ id, apiId }) =>
      !onlyTranslations ||
      onlyTranslations.has(id.toLowerCase()) ||
      onlyTranslations.has(apiId),
  );

  if (activeTranslations.length === 0) {
    throw new Error(
      "No matching translations. Check --translations against data/bible/translations.ts.",
    );
  }

  const activeBooks = CANON.filter(([slug]) => onlyBooks.has(slug));
  if (activeBooks.length === 0) throw new Error("No matching canonical books.");
  const estimatedRequests = activeTranslations.reduce(
    (sum, translation) =>
      sum +
      activeBooks.reduce(
        (bookSum, [, , chapterCount, testament]) =>
          bookSum +
          (translation.coverage === "new-testament" && testament !== "NT"
            ? 0
            : chapterCount),
        0,
      ),
    0,
  );
  if (estimatedRequests > MAX_REQUESTS) {
    throw new Error(
      `This targeted job would make ${estimatedRequests} requests (limit ${MAX_REQUESTS}). Use source archives for larger ingestion jobs.`,
    );
  }

  for (const translation of activeTranslations) {
    console.log(`\n— ${translation.id} (${translation.apiId}) —`);
    catalog[translation.id] = {};

    for (const [slug, bookApiId, chapterCount, testament] of activeBooks) {
      if (translation.coverage === "new-testament" && testament !== "NT")
        continue;

      catalog[translation.id][slug] = {};
      for (let chapter = 1; chapter <= chapterCount; chapter += 1) {
        try {
          const verses = await fetchChapter(
            translation.apiId,
            bookApiId,
            chapter,
          );
          catalog[translation.id][slug][chapter] = {
            book: slug,
            chapter,
            translation: translation.id,
            verses,
          };
          totalChapters += 1;
          process.stdout.write(`\r  ${slug} ${chapter}/${chapterCount}      `);
        } catch (error) {
          failed += 1;
          console.error(
            `\n  ! ${translation.id} ${slug} ${chapter}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
        await delay(REQUEST_DELAY_MS);
      }
      process.stdout.write("\n");
    }
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  const header = `// Auto-generated by scripts/ingest-bible.mjs — do not edit by hand.
// Authentic public-domain translations fetched from bible-api.com.
// Generated at: ${new Date().toISOString()}
import type { ChapterText } from "./seed";
import type { TranslationId } from "./translations";

export const ingested: Partial<
  Record<TranslationId, Record<string, Record<number, ChapterText>>>
> = `;
  writeFileSync(OUT_PATH, `${header}${JSON.stringify(catalog)};\n`, "utf8");

  console.log(
    `\nIngested ${totalChapters} chapter-translations · ${failed} failure(s).`,
  );
  console.log(`Wrote ${OUT_PATH}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
