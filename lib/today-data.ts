/* ──────────────────────────────────────────────────────────────────
   Today's data — server-pure compute for the daily-rotation
   primitives surfaced on the home page.

   Importing this from a SERVER component keeps the big editorial
   data modules (nations.ts ~3100 lines, catechism.ts ~1200 lines,
   bible/seed.ts ~290 lines, memory.ts ~350 lines, persecuted.ts
   ~310 lines) on the server side. The previous home-page setup
   imported them all into `"use client"` components and shipped
   them in the client bundle.

   All UTC-day-keyed: every believer worldwide sees the same nation,
   memory verse, devotional verse, catechism Lord's Day on the same
   calendar day — by design ("the whole Body of Christ praying for
   the same country, all over the world").

   The home page revalidates hourly (export const revalidate = 3600
   in app/page.tsx), so the SSR cache rolls over within an hour of
   each UTC midnight.

   The returned object is fully serializable — safe to pass from
   server components into client component props.
────────────────────────────────────────────────────────────────── */

import {
  todaysNation,
  rotationCycleDay,
  NATION_CYCLE_LENGTH,
  regions,
  type Nation,
} from "@/data/nations";
import { thisWeeksVerse, type MemoryVerse } from "@/data/memory";
import { persecutedOfTheMonth, type PersecutedNation } from "@/data/persecuted";
import { heidelberg, type LordsDay } from "@/data/catechism";
import { seed as bibleSeed } from "@/data/bible/seed";
import { canon as bibleCanon } from "@/data/bible/canon";
import { dayOfYearUTC } from "@/lib/date-helpers";

export type TodayVerse = {
  book: string;
  bookName: string;
  chapter: number;
  v: number;
  t: string;
};

export type TodayData = {
  /** ISO date string for tile display (the day this data is keyed to). */
  isoDate: string;
  nation: Nation;
  /** Pre-resolved display label e.g. "Sub-Saharan Africa". */
  nationRegionLabel: string;
  nationDay: number;
  nationCycleLength: number;
  persecuted: PersecutedNation;
  memory: MemoryVerse;
  verse: TodayVerse;
  ld: LordsDay;
};

function weekOfYearUTC(d: Date): number {
  return Math.floor(dayOfYearUTC(d) / 7);
}

// Pre-flatten the WEB seed once at module load — cheap and stable.
const WEB_VERSES: TodayVerse[] = (() => {
  const out: TodayVerse[] = [];
  for (const c of bibleSeed) {
    if (c.translation !== "WEB") continue;
    const bookName = bibleCanon.find((b) => b.id === c.book)?.name ?? c.book;
    for (const v of c.verses) {
      out.push({ book: c.book, bookName, chapter: c.chapter, v: v.v, t: v.t });
    }
  }
  return out;
})();

export function getTodayData(d: Date = new Date()): TodayData {
  const nation = todaysNation(d);
  const memory = thisWeeksVerse(d);
  const persecuted = persecutedOfTheMonth(d);
  const ld = heidelberg[weekOfYearUTC(d) % heidelberg.length];
  const verse = WEB_VERSES[dayOfYearUTC(d) % WEB_VERSES.length];

  return {
    isoDate: d.toISOString().slice(0, 10),
    nation,
    nationRegionLabel: regions[nation.region],
    nationDay: rotationCycleDay(d),
    nationCycleLength: NATION_CYCLE_LENGTH,
    persecuted,
    memory,
    verse,
    ld,
  };
}
