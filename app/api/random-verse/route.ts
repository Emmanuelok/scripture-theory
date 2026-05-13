import { NextResponse } from "next/server";
import { seed } from "@/data/bible/seed";
import { canon } from "@/data/bible/canon";

// Curated set of well-loved verses for the "Encourage me" button.
// We surface these from the bundled WEB seed so the response is instant
// and never requires a network round-trip.
const FAVORITES: { book: string; chapter: number; v: number }[] = [
  // Psalm 23 (every verse)
  { book: "psalms", chapter: 23, v: 1 },
  { book: "psalms", chapter: 23, v: 2 },
  { book: "psalms", chapter: 23, v: 3 },
  { book: "psalms", chapter: 23, v: 4 },
  { book: "psalms", chapter: 23, v: 5 },
  { book: "psalms", chapter: 23, v: 6 },
  // Psalm 1
  { book: "psalms", chapter: 1, v: 1 },
  { book: "psalms", chapter: 1, v: 2 },
  { book: "psalms", chapter: 1, v: 3 },
  { book: "psalms", chapter: 1, v: 6 },
  // Psalm 100
  { book: "psalms", chapter: 100, v: 1 },
  { book: "psalms", chapter: 100, v: 3 },
  { book: "psalms", chapter: 100, v: 5 },
  // Psalm 117
  { book: "psalms", chapter: 117, v: 1 },
  { book: "psalms", chapter: 117, v: 2 },
  // Psalm 150
  { book: "psalms", chapter: 150, v: 6 },
];

export async function GET() {
  // Pick a favorite at random; fall back to ANY verse from the seed.
  let pickFrom = FAVORITES;
  const valid = pickFrom.filter(({ book, chapter, v }) =>
    seed.some(
      (c) =>
        c.translation === "WEB" &&
        c.book === book &&
        c.chapter === chapter &&
        c.verses.some((vs) => vs.v === v)
    )
  );
  if (valid.length === 0) {
    // Fallback: every WEB verse in the seed
    const all: { book: string; chapter: number; v: number }[] = [];
    for (const c of seed) {
      if (c.translation !== "WEB") continue;
      for (const verse of c.verses) all.push({ book: c.book, chapter: c.chapter, v: verse.v });
    }
    pickFrom = all;
  } else {
    pickFrom = valid;
  }

  const idx = Math.floor(Math.random() * pickFrom.length);
  const choice = pickFrom[idx];
  const chapterText = seed.find(
    (c) => c.translation === "WEB" && c.book === choice.book && c.chapter === choice.chapter
  );
  const verse = chapterText?.verses.find((v) => v.v === choice.v);
  if (!verse) {
    return NextResponse.json({ ok: false, error: "Internal" }, { status: 500 });
  }
  const bookName = canon.find((b) => b.id === choice.book)?.name ?? choice.book;
  return NextResponse.json({
    ok: true,
    book: choice.book,
    bookName,
    chapter: choice.chapter,
    verse: choice.v,
    text: verse.t,
    translation: "WEB",
  });
}
