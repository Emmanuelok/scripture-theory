#!/usr/bin/env node
// Ingest authentic, published, public-domain Bible translations from bible-api.com.
// We never machine-translate Scripture. Every translation served is in its
// original published wording.
//
// Run all available translations:
//   npm run ingest-bible
// Restrict to a subset:
//   npm run ingest-bible -- --translations=kjv,asv
//   npm run ingest-bible -- --books=john,romans,psalms
//   npm run ingest-bible -- --translations=web --books=psalms
//
// bible-api.com is a free public-domain Scripture API (no key, no auth).
// Mainstream, denominationally accepted, public-domain editions only:
//   WEB     — World English Bible (Michael Paul Johnson · eBible.org)
//   KJV     — King James Version (1769 Oxford)
//   ASV     — American Standard Version (1901)
//   DRB     — Douay-Rheims (Challoner Revision, 1899) · Roman Catholic
//   Almeida — João Ferreira de Almeida (Portuguese, public-domain edition)

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(REPO_ROOT, "data/bible/text.ts");

// Translations bible-api.com serves natively that meet our editorial standard:
// mainstream, denominationally accepted, public-domain Bibles only.
// (BBE, YLT, and Darby are intentionally excluded as niche/extreme-literal
// editions that are not used as primary Bibles in churches.)
//
// The other six in our catalog (RVR1909, LSG, Luther 1912, Synodal, CUV,
// Vulgate) are seeded by hand for Psalm 23 and will be ingested from
// eBible.org's USFM archives in a follow-up adapter.
const TRANSLATIONS = [
  { id: "WEB", key: "web" },
  { id: "KJV", key: "kjv" },
  { id: "ASV", key: "asv" },
  { id: "DRA", key: "drb" },
  { id: "ALMEIDA", key: "almeida" },
];

const CANON = [
  ["genesis", 50], ["exodus", 40], ["leviticus", 27], ["numbers", 36], ["deuteronomy", 34],
  ["joshua", 24], ["judges", 21], ["ruth", 4], ["1samuel", 31], ["2samuel", 24],
  ["1kings", 22], ["2kings", 25], ["1chronicles", 29], ["2chronicles", 36],
  ["ezra", 10], ["nehemiah", 13], ["esther", 10], ["job", 42], ["psalms", 150],
  ["proverbs", 31], ["ecclesiastes", 12], ["songofsongs", 8], ["isaiah", 66],
  ["jeremiah", 52], ["lamentations", 5], ["ezekiel", 48], ["daniel", 12],
  ["hosea", 14], ["joel", 3], ["amos", 9], ["obadiah", 1], ["jonah", 4],
  ["micah", 7], ["nahum", 3], ["habakkuk", 3], ["zephaniah", 3], ["haggai", 2],
  ["zechariah", 14], ["malachi", 4],
  ["matthew", 28], ["mark", 16], ["luke", 24], ["john", 21], ["acts", 28],
  ["romans", 16], ["1corinthians", 16], ["2corinthians", 13], ["galatians", 6],
  ["ephesians", 6], ["philippians", 4], ["colossians", 4],
  ["1thessalonians", 5], ["2thessalonians", 3], ["1timothy", 6], ["2timothy", 4],
  ["titus", 3], ["philemon", 1], ["hebrews", 13], ["james", 5],
  ["1peter", 5], ["2peter", 3], ["1john", 5], ["2john", 1], ["3john", 1],
  ["jude", 1], ["revelation", 22],
];

const URL_NAME = {
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

const args = process.argv.slice(2);
function arg(flag) {
  const a = args.find((x) => x.startsWith(flag + "="));
  return a ? a.replace(flag + "=", "") : null;
}
const booksArg = arg("--books");
const translationsArg = arg("--translations");

const onlyBooks = booksArg ? new Set(booksArg.split(",").map((s) => s.trim())) : null;
const onlyTranslations = translationsArg
  ? new Set(translationsArg.split(",").map((s) => s.trim().toLowerCase()))
  : null;

async function fetchChapter(apiKey, bookSlug, chapter) {
  const bookForUrl = URL_NAME[bookSlug] ?? bookSlug;
  const url = `https://bible-api.com/${encodeURIComponent(
    bookForUrl + " " + chapter
  )}?translation=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.verses || data.verses.length === 0) throw new Error("empty verses");
  return data.verses.map((v) => ({ v: v.verse, t: (v.text || "").trim() }));
}

async function main() {
  const catalog = {}; // catalog[translationId][book][chapter] = ChapterText
  let totalChapters = 0;
  let failed = 0;

  const activeTranslations = TRANSLATIONS.filter(
    (t) => !onlyTranslations || onlyTranslations.has(t.key) || onlyTranslations.has(t.id.toLowerCase())
  );

  for (const tr of activeTranslations) {
    console.log(`\n— ${tr.id} (${tr.key}) —`);
    catalog[tr.id] = {};
    for (const [slug, chapters] of CANON) {
      if (onlyBooks && !onlyBooks.has(slug)) continue;
      catalog[tr.id][slug] = {};
      for (let c = 1; c <= chapters; c++) {
        try {
          const verses = await fetchChapter(tr.key, slug, c);
          catalog[tr.id][slug][c] = { book: slug, chapter: c, translation: tr.id, verses };
          totalChapters++;
          process.stdout.write(`\r  ${slug} ${c}/${chapters}      `);
          await new Promise((r) => setTimeout(r, 80));
        } catch (err) {
          failed++;
          console.error(`\n  ! ${tr.id} ${slug} ${c}: ${err.message}`);
        }
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
  const body = JSON.stringify(catalog, null, 0);
  writeFileSync(OUT_PATH, header + body + ";\n", "utf8");

  console.log(
    `\nIngested ${totalChapters} chapter-translations · ${failed} failure(s).`
  );
  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
