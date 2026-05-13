// This file is overwritten by `npm run ingest-bible` with the full WEB canon.
// Until then it exports an empty catalog — the app falls back to the hand-verified seed.
//
// To populate the full WEB:  npm run ingest-bible
// (Public-domain source: bible-api.com · WEB · Michael Paul Johnson / eBible.org)

import type { ChapterText } from "./seed";

export const ingested: Record<string, Record<number, ChapterText>> = {};
