// This file is overwritten by the targeted `npm run ingest-bible` command.
// Until then it exports an empty catalog and the app falls back to the seed,
// then configured runtime providers.
//
// Shape: ingested[translation][book][chapter] = ChapterText
//
// Example targeted bundle:
//   npm run ingest-bible -- --translations=web,kjv --books=john,romans
//
// Do not use the public chapter API to download whole Bibles. Full-canon
// ingestion must use the publishers' source archives.

import type { ChapterText } from "./seed";
import type { TranslationId } from "./translations";

export const ingested: Partial<
  Record<TranslationId, Record<string, Record<number, ChapterText>>>
> = {};
