// This file is overwritten by `npm run ingest-bible` with authentic
// public-domain translations fetched from bible-api.com.
// Until then it exports an empty catalog — the app falls back to the seed.
//
// Shape: ingested[translation][book][chapter] = ChapterText
//
// Run all available translations:
//   npm run ingest-bible
// Run a subset:
//   npm run ingest-bible -- --translations=web,kjv,asv --books=john,romans,psalms

import type { ChapterText } from "./seed";
import type { TranslationId } from "./translations";

export const ingested: Partial<
  Record<TranslationId, Record<string, Record<number, ChapterText>>>
> = {};
