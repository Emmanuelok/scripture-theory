// ESV API smoke test
// -------------------
// Verifies the parser handles real Crossway responses for prose, poetry,
// and verse-bridges. Run from the project root:
//
//   ESV_API_KEY=… node scripts/esv-smoke.mjs
//
// If ESV_API_KEY is unset, the script exits cleanly with a hint.

const TOKEN = process.env.ESV_API_KEY;
if (!TOKEN) {
  console.log("ESV_API_KEY not set — set it on Vercel (Project Settings → Env vars) and rerun.");
  process.exit(0);
}

const CASES = [
  // Prose
  { label: "John 3 (prose)",   query: "John 3",   expectVerseCount: 36 },
  // Pauline epistle (often has long verses)
  { label: "Romans 8",         query: "Romans 8", expectVerseCount: 39 },
  // Psalm with poetry indentation
  { label: "Psalm 23",         query: "Psalm 23", expectVerseCount: 6 },
  // Job — heavy poetry
  { label: "Job 1",            query: "Job 1",    expectVerseCount: 22 },
  // Short single chapter
  { label: "Jude",             query: "Jude",     expectVerseCount: 25 },
];

const PARAMS = new URLSearchParams({
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

/** Same parser as lib/bible-fetch.ts. Keep these in sync. */
function parseEsvVerses(text) {
  const cleaned = text.replace(/\(ESV\)\s*$/i, "").trim();
  const regex = /\[(\d+)\]\s*([^\[]*)/g;
  const out = [];
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    const v = parseInt(match[1], 10);
    const t = match[2].replace(/\s+/g, " ").trim();
    if (v > 0 && t) out.push({ v, t });
  }
  return out;
}

async function fetchPassage(query) {
  const url = `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(query)}&${PARAMS.toString()}`;
  const res = await fetch(url, {
    headers: { Authorization: `Token ${TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${query}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.passages?.[0] ?? "";
}

let failed = 0;
for (const c of CASES) {
  process.stdout.write(`  ${c.label.padEnd(28)} `);
  try {
    const text = await fetchPassage(c.query);
    const verses = parseEsvVerses(text);
    const count = verses.length;
    const verses1 = verses.find((v) => v.v === 1);
    const ok =
      count === c.expectVerseCount &&
      verses1 &&
      verses1.t.length > 0 &&
      // Make sure no parsed verse text contains a stray "[" — would mean
      // the regex over-ran or under-ran into the next verse.
      verses.every((v) => !v.t.includes("["));

    if (ok) {
      console.log(`✓  ${count} verses · v1 reads "${verses1.t.slice(0, 60)}…"`);
    } else {
      console.log(`✗  got ${count} verses (expected ${c.expectVerseCount})`);
      console.log(`     v1: ${verses1?.t.slice(0, 100) ?? "(missing)"}`);
      failed += 1;
    }
  } catch (e) {
    console.log(`✗  ${e.message}`);
    failed += 1;
  }
}

if (failed === 0) {
  console.log("\nAll smoke tests passed.");
  process.exit(0);
} else {
  console.log(`\n${failed} smoke test(s) failed — inspect output above.`);
  process.exit(1);
}
