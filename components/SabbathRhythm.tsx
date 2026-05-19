"use client";

import { useEffect, useState } from "react";

// ─── Sabbath rhythm — six work days, one rest ───────────────────
// A horizontal seven-day strip with six "work" tiles and one "rest" tile.
// Compact and unambiguous: the seventh is the one that finishes the week
// — for Christians, the Lord's Day rest in the resurrection.

const DAYS = [
  { num: 1, label: "Day 1", note: "Light from darkness", state: "work" },
  { num: 2, label: "Day 2", note: "Sky above the sea",   state: "work" },
  { num: 3, label: "Day 3", note: "Dry land · plants",   state: "work" },
  { num: 4, label: "Day 4", note: "Sun · moon · stars",  state: "work" },
  { num: 5, label: "Day 5", note: "Birds · fish",        state: "work" },
  { num: 6, label: "Day 6", note: "Beasts · humans",     state: "work" },
  { num: 7, label: "Sabbath", note: "He rested. We rest.", state: "rest" },
] as const;

export default function SabbathRhythm() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="text-[10px] uppercase tracking-widest text-flame-300 mb-3">
        Genesis 2:2-3 — the rhythm built into the world
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((d, i) => {
          const isRest = d.state === "rest";
          const isOn = active === d.num;
          return (
            <button
              key={d.num}
              onMouseEnter={() => setActive(d.num)}
              onMouseLeave={() => setActive((c) => (c === d.num ? null : c))}
              onFocus={() => setActive(d.num)}
              className={`relative aspect-[3/4] rounded-2xl border p-3 text-left transition-all ${
                isRest
                  ? "bg-gradient-to-b from-flame-500 to-flame-700 text-ink-50 border-flame-300"
                  : "bg-ink-800/60 border-ink-700/60 text-ink-100 hover:border-flame-400/60"
              } ${isOn ? "scale-[1.05] shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)]" : ""}`}
              style={{
                opacity: drawn ? 1 : 0,
                transition: `opacity 700ms ease ${300 + i * 100}ms, transform 200ms`,
              }}
            >
              <div className={`text-[10px] uppercase tracking-widest ${isRest ? "text-flame-100/80" : "text-flame-300/80"}`}>
                {isRest ? "Seventh" : `Day ${d.num}`}
              </div>
              <div className={`font-serif mt-2 leading-tight ${isRest ? "text-2xl" : "text-base text-ink-50"}`}>
                {isRest ? "REST" : "Work"}
              </div>
              <div className={`mt-2 text-[10px] leading-snug ${isRest ? "text-flame-50/90 italic" : "text-ink-400"}`}>
                {d.note}
              </div>

              {isRest && (
                <div className="absolute -top-2 -right-2 rounded-full bg-ink-900 border border-flame-300 px-1.5 py-0.5 text-[9px] text-flame-200">
                  ✦
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom note panel */}
      <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-ink-800/60 border border-ink-700/60 p-4">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Six days</div>
          <p className="mt-1 text-ink-200 leading-relaxed">
            God called His own work very good — and our work is good too. We labour, build,
            create, serve, repair. The world is meant to be tended.
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-flame-500 to-flame-700 text-ink-50 p-4">
          <div className="text-[10px] uppercase tracking-widest text-flame-100/80">One day</div>
          <p className="mt-1 leading-relaxed">
            One day in seven we stop. We trust. We worship. The world does not depend on us.
            The seventh day blessed and named all the others.
          </p>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-ink-400 italic">
        Jesus is Lord of the Sabbath (Mark 2:28). The rhythm is a gift, not a burden — and one
        the modern Christian most often gives up.
      </p>
    </figure>
  );
}
