"use client";

import Link from "next/link";
import { todaysNation, regions, rotationCycleDay } from "@/data/nations";
import { thisWeeksVerse } from "@/data/memory";
import { seed as bibleSeed } from "@/data/bible/seed";
import { canon } from "@/data/bible/canon";
import { flagEmoji } from "@/lib/flags";
import NationFlag from "@/components/NationFlag";
import { useToday } from "@/lib/useToday";
import { dayOfYearUTC as dayOfYear } from "@/lib/date-helpers";

export default function LiveTiles() {
  const now = useToday();

  // Today's verse — rotated daily across the WEB seed
  const webVerses = bibleSeed.filter((c) => c.translation === "WEB");
  const allVerses: { book: string; chapter: number; v: number; t: string }[] = [];
  for (const c of webVerses) for (const v of c.verses) allVerses.push({ book: c.book, chapter: c.chapter, v: v.v, t: v.t });
  const dailyVerse = allVerses[dayOfYear(now) % allVerses.length];
  const dailyBookName = canon.find((b) => b.id === dailyVerse.book)?.name ?? dailyVerse.book;

  const nation = todaysNation(now);
  const rDay = rotationCycleDay(now);
  const memory = thisWeeksVerse(now);

  return (
    <section className="mx-auto max-w-6xl px-5 mt-8 relative z-10">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Today's Nation — flag-led, the most visually striking */}
        <Link
          href="/pray/nations"
          className="group rounded-3xl overflow-hidden border border-ink-200 bg-card glow-ring hover:border-flame-500 transition-colors"
        >
          <div className="relative aspect-[5/3] bg-ink-200 overflow-hidden">
            <NationFlag
              iso={nation.iso}
              alt={`Flag of ${nation.name}`}
              width={640}
              className="absolute inset-0 h-full w-full transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
            <div className="absolute top-3 left-4">
              <span className="text-[10px] uppercase tracking-widest text-flame-300">
                Day {rDay} · Today's nation
              </span>
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex items-end gap-3">
              <span className="text-3xl leading-none" aria-hidden>
                {flagEmoji(nation.iso)}
              </span>
              <div>
                <div className="font-serif text-2xl text-ink-50 leading-none">{nation.name}</div>
                <div className="text-[11px] text-ink-300 mt-1">{regions[nation.region]}</div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-ink-700 line-clamp-3 leading-relaxed">{nation.context}</p>
            <div className="mt-3 text-xs text-flame-700">Pray with the Body of Christ →</div>
          </div>
        </Link>

        {/* Today's Verse */}
        <Link
          href={`/verse/${dailyVerse.book}/${dailyVerse.chapter}/${dailyVerse.v}`}
          className="rounded-3xl border border-ink-200 bg-card glow-ring p-6 hover:border-flame-500 transition-colors flex flex-col"
        >
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            Today's verse · WEB
          </span>
          <p className="mt-3 prose-scripture text-ink-900 text-lg leading-snug grow">
            "{dailyVerse.t}"
          </p>
          <div className="mt-4 text-sm text-ink-500 italic">
            — {dailyBookName} {dailyVerse.chapter}:{dailyVerse.v}
          </div>
          <div className="mt-2 text-xs text-flame-700">Open the chapter →</div>
        </Link>

        {/* This week's memory verse */}
        <Link
          href="/memory"
          className="rounded-3xl border border-ink-200 bg-card glow-ring p-6 hover:border-flame-500 transition-colors flex flex-col"
        >
          <span className="text-[10px] uppercase tracking-widest text-flame-700">
            This week's memory verse
          </span>
          <h3 className="mt-3 font-serif text-2xl text-ink-900">{memory.ref}</h3>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed line-clamp-4 grow">
            {memory.text}
          </p>
          <div className="mt-3 text-xs text-flame-700">Hide it in your heart →</div>
        </Link>
      </div>
    </section>
  );
}
