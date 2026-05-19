"use client";

import { useState } from "react";
import Link from "next/link";
import { canon } from "@/data/bible/canon";

// ─── Canon panorama ────────────────────────────────────────────
// All 66 books at a glance, grouped by genre with a colour band. Each book is
// a thin block whose height is its chapter count — Genesis is tall, Obadiah
// is short. A miniature relief map of God's library.

type Genre = {
  id: string;
  name: string;
  color: string;
  /** 1-based inclusive canonical order range */
  range: [number, number];
};

const GENRES: Genre[] = [
  { id: "pentateuch",      name: "Pentateuch",       color: "#1d4ed8", range: [1, 5] },
  { id: "history",         name: "History",          color: "#0d9488", range: [6, 17] },
  { id: "wisdom",          name: "Wisdom & Poetry",  color: "#7c3aed", range: [18, 22] },
  { id: "major-prophets",  name: "Major Prophets",   color: "#c2410c", range: [23, 27] },
  { id: "minor-prophets",  name: "Minor Prophets",   color: "#ea580c", range: [28, 39] },
  { id: "gospels",         name: "Gospels",          color: "#d97706", range: [40, 43] },
  { id: "acts",            name: "Acts",             color: "#facc15", range: [44, 44] },
  { id: "pauline",         name: "Pauline Letters",  color: "#dc2626", range: [45, 57] },
  { id: "general",         name: "General Letters",  color: "#be185d", range: [58, 65] },
  { id: "apocalypse",      name: "Apocalypse",       color: "#7f1d1d", range: [66, 66] },
];

function genreOf(order: number) {
  return GENRES.find((g) => order >= g.range[0] && order <= g.range[1])!;
}

export default function CanonGrid() {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [activeBookId, setActiveBookId] = useState<string | null>(null);

  // Max chapters for height scaling
  const maxCh = Math.max(...canon.map((b) => b.chapters));

  // Books sorted by canonical order
  const ordered = [...canon].sort((a, b) => a.order - b.order);

  const activeBook = activeBookId ? canon.find((b) => b.id === activeBookId) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring overflow-hidden">
      {/* Genre legend / filter chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {GENRES.map((g) => {
          const isOn = activeGenre === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGenre(isOn ? null : g.id)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] border transition-colors ${
                isOn ? "bg-ink-50 text-ink-900 border-ink-50" : "bg-ink-800/60 text-ink-200 border-ink-700/60 hover:border-ink-400"
              }`}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-sm"
                style={{ background: g.color }}
                aria-hidden
              />
              {g.name}
              <span className="text-[10px] text-ink-400">{g.range[1] - g.range[0] + 1}</span>
            </button>
          );
        })}
      </div>

      {/* The relief: 66 vertical bars, height proportional to chapter count */}
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <div className="min-w-[760px] px-2">
          <div className="flex items-end gap-[2px] h-[170px]">
            {ordered.map((b) => {
              const g = genreOf(b.order);
              const dimmed = activeGenre && activeGenre !== g.id;
              const isActive = activeBookId === b.id;
              const heightPct = 18 + (b.chapters / maxCh) * 82; // 18%–100%
              return (
                <Link
                  key={b.id}
                  href={`/bible/${b.id}/1`}
                  onMouseEnter={() => setActiveBookId(b.id)}
                  onMouseLeave={() => setActiveBookId((c) => (c === b.id ? null : c))}
                  onFocus={() => setActiveBookId(b.id)}
                  className="group relative flex-1 min-w-[10px] block focus:outline-none"
                  style={{ height: `${heightPct}%` }}
                  aria-label={`${b.name} (${b.chapters} chapters) — open chapter 1`}
                >
                  <div
                    className="h-full rounded-t-sm transition-all duration-200"
                    style={{
                      background: g.color,
                      opacity: dimmed ? 0.18 : isActive ? 1 : 0.86,
                      boxShadow: isActive ? `0 -10px 24px -4px ${g.color}AA` : undefined,
                      transform: isActive ? "translateY(-3px)" : undefined,
                    }}
                  />
                  {/* Small abbreviation label hidden until hover for tighter books */}
                  <span
                    className="absolute inset-x-0 bottom-full mb-1 text-center text-[9px] uppercase tracking-widest text-ink-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none"
                  >
                    {b.abbrev}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Genre band underneath */}
          <div className="mt-2 flex items-stretch gap-[2px] h-2">
            {ordered.map((b) => {
              const g = genreOf(b.order);
              const dimmed = activeGenre && activeGenre !== g.id;
              return (
                <span
                  key={`g-${b.id}`}
                  className="flex-1 min-w-[10px] rounded-sm"
                  style={{ background: g.color, opacity: dimmed ? 0.15 : 0.9 }}
                />
              );
            })}
          </div>

          {/* Genre labels along the bottom */}
          <div className="mt-2 flex items-stretch gap-[2px] text-[9px] uppercase tracking-widest text-ink-400">
            {GENRES.map((g) => {
              const count = g.range[1] - g.range[0] + 1;
              return (
                <div
                  key={`gl-${g.id}`}
                  className="text-center truncate"
                  style={{ flex: count }}
                  title={g.name}
                >
                  {g.name.split(" ")[0]}
                </div>
              );
            })}
          </div>

          {/* OT / NT divider note */}
          <div className="mt-3 flex text-[10px] uppercase tracking-widest text-ink-500">
            <div style={{ flex: 39 }} className="border-t border-ink-700/60 pt-1">Old Testament · 39 books</div>
            <div style={{ flex: 27 }} className="border-t border-ink-700/60 pt-1 text-right">New Testament · 27 books</div>
          </div>
        </div>
      </div>

      {/* Hover/focus panel */}
      <div className="mt-4 min-h-[3rem] text-sm text-ink-300">
        {activeBook ? (
          <div className="flex flex-wrap items-baseline gap-3">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: genreOf(activeBook.order).color }}
              aria-hidden
            />
            <span className="font-serif text-lg text-ink-50">{activeBook.name}</span>
            <span className="text-[11px] uppercase tracking-widest text-flame-300">
              {genreOf(activeBook.order).name} · {activeBook.chapters} chapter{activeBook.chapters === 1 ? "" : "s"}
            </span>
            <span className="text-[11px] text-ink-400 italic">— click to open chapter 1</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            Sixty-six books, forty-plus authors, one Story. Hover a bar — heights scale with chapter count. Click to read.
          </span>
        )}
      </div>
    </figure>
  );
}
