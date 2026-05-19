"use client";

import { useState } from "react";
import Link from "next/link";
import { jesusInScripture, type CanonBookRevelation } from "@/data/jesus-in-scripture";
import { canon } from "@/data/bible/canon";

// ─── Christ in every book ──────────────────────────────────────
// 66 small blocks, one per biblical book, in canonical order. Each block is
// coloured by its division. Hover or focus any block to see the "Jesus is…"
// headline for that book.

const DIVISION_COLOR: Record<CanonBookRevelation["division"], string> = {
  "Pentateuch":         "#1d4ed8",
  "History (OT)":       "#0d9488",
  "Wisdom & Poetry":    "#7c3aed",
  "Major Prophets":     "#c2410c",
  "Minor Prophets":     "#ea580c",
  "Gospels":            "#d97706",
  "Acts":               "#facc15",
  "Pauline Epistles":   "#dc2626",
  "General Epistles":   "#be185d",
  "Apocalypse":         "#7f1d1d",
};

const DIVISIONS: CanonBookRevelation["division"][] = [
  "Pentateuch", "History (OT)", "Wisdom & Poetry", "Major Prophets", "Minor Prophets",
  "Gospels", "Acts", "Pauline Epistles", "General Epistles", "Apocalypse",
];

export default function ChristInEveryBook() {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState<CanonBookRevelation["division"] | null>(null);

  // Order books by canonical order
  const ordered = [...jesusInScripture].sort((a, b) => {
    const oa = canon.find((c) => c.id === a.bookId)?.order ?? 999;
    const ob = canon.find((c) => c.id === b.bookId)?.order ?? 999;
    return oa - ob;
  });

  const focused = active ? ordered.find((b) => b.bookId === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      {/* Division legend / filter */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {DIVISIONS.map((d) => {
          const isOn = filter === d;
          return (
            <button
              key={d}
              onClick={() => setFilter(isOn ? null : d)}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] border transition-colors ${
                isOn ? "bg-ink-50 text-ink-900 border-ink-50" : "bg-ink-800/60 text-ink-200 border-ink-700/60 hover:border-ink-400"
              }`}
            >
              <span
                aria-hidden
                className="inline-block w-2 h-2 rounded-sm"
                style={{ background: DIVISION_COLOR[d] }}
              />
              {d}
            </button>
          );
        })}
      </div>

      {/* 66 blocks */}
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <div className="min-w-[760px] px-2">
          <div className="grid grid-cols-22 gap-[3px]" style={{ gridTemplateColumns: "repeat(22, minmax(0, 1fr))" }}>
            {ordered.map((b) => {
              const meta = canon.find((c) => c.id === b.bookId);
              const dimmed = filter && filter !== b.division;
              const isOn = active === b.bookId;
              return (
                <Link
                  key={b.bookId}
                  href={`/bible/${b.bookId}/1`}
                  onMouseEnter={() => setActive(b.bookId)}
                  onMouseLeave={() => setActive((c) => (c === b.bookId ? null : c))}
                  onFocus={() => setActive(b.bookId)}
                  aria-label={`${b.name} — ${b.headline}`}
                  className="group relative aspect-square block rounded-sm focus:outline-none"
                  style={{
                    background: DIVISION_COLOR[b.division],
                    opacity: dimmed ? 0.18 : isOn ? 1 : 0.82,
                    transform: isOn ? "scale(1.15)" : undefined,
                    boxShadow: isOn ? `0 0 18px ${DIVISION_COLOR[b.division]}` : undefined,
                    transition: "all 200ms",
                  }}
                  title={`${b.name} — ${b.headline}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold text-ink-50/70 group-hover:text-ink-50 transition-colors">
                    {meta?.abbrev?.replace(/\s/g, "") ?? ""}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* OT / NT marker beneath */}
          <div className="mt-3 flex text-[10px] uppercase tracking-widest text-ink-500">
            <div style={{ flex: 39 }} className="border-t border-ink-700/60 pt-1">Old Testament · 39</div>
            <div style={{ flex: 27 }} className="border-t border-ink-700/60 pt-1 text-right">New Testament · 27</div>
          </div>
        </div>
      </div>

      {/* Focus panel */}
      <div className="mt-4 min-h-[5rem]">
        {focused ? (
          <div className="flex flex-wrap items-start gap-3">
            <span
              aria-hidden
              className="inline-block w-3 h-3 rounded-sm mt-1.5 shrink-0"
              style={{ background: DIVISION_COLOR[focused.division] }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-serif text-lg text-ink-50">{focused.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-flame-300">{focused.division}</span>
              </div>
              <p className="mt-1 text-sm text-ink-200 italic">{focused.headline}</p>
              <p className="mt-1 text-[11px] text-ink-400">Tap to open chapter 1 →</p>
            </div>
          </div>
        ) : (
          <span className="text-sm italic text-ink-400">
            Sixty-six books, one Christ. Hover a block to see how He appears there.
          </span>
        )}
      </div>
    </figure>
  );
}
