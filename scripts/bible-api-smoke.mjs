#!/usr/bin/env node
// Read-only smoke test for every public-domain runtime translation.
// It requests John 3 from bible-api.com's structured data endpoint and checks
// for a non-empty verse 16. Nothing is written or ingested.

const TRANSLATIONS = [
  ["WEB", "web"],
  ["WEBBE", "webbe"],
  ["KJV", "kjv"],
  ["OEBUS", "oeb-us"],
  ["OEBCW", "oeb-cw"],
  ["ASV", "asv"],
  ["BBE", "bbe"],
  ["YLT", "ylt"],
  ["DARBY", "darby"],
  ["DRA", "dra"],
  ["ALMEIDA", "almeida"],
  ["BKR", "bkr"],
  ["RCCV", "rccv"],
  ["CUV", "cuv"],
  ["CHEROKEE", "cherokee"],
];

async function check([id, apiId]) {
  const url = `https://bible-api.com/data/${apiId}/JHN/3`;
  let response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (response.status === 429) {
    await new Promise((resolve) => setTimeout(resolve, 1_500));
    response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  }
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = await response.json();
  const verse16 = payload.verses
    ?.find((verse) => verse.verse === 16)
    ?.text?.trim();
  if (!verse16) throw new Error("John 3:16 missing or empty");
  return `${id.padEnd(9)} ✓ ${payload.verses.length} verses`;
}

let failed = 0;
for (const translation of TRANSLATIONS) {
  try {
    console.log(await check(translation));
  } catch (error) {
    failed += 1;
    console.error(
      `${translation[0].padEnd(9)} ✗ ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  // Stay under the public service's 15-requests-per-30-seconds ceiling.
  await new Promise((resolve) => setTimeout(resolve, 2_100));
}

if (failed > 0) {
  console.error(`\n${failed} public Bible provider check(s) failed.`);
  process.exit(1);
}

console.log(
  `\nAll ${TRANSLATIONS.length} public Bible provider checks passed.`,
);
