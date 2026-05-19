"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";

// ─── A year of practice — GitHub-style heatmap ─────────────────
// Renders the past 364 days as a 52-column × 7-row grid of cells. Each cell
// is shaded by the number of distinct practices done on that day —
// reading-plan days, examens, fasts, family-altar gatherings, secret-place
// entries, sermon notes, healing-prayer entries. Hover shows the breakdown.

const CELL = 12;
const GAP = 3;
const WEEKS = 53;       // covers ~one year plus a little buffer for partial first week
const DAYS = 7;

type DayRecord = {
  date: string;        // YYYY-MM-DD (local)
  practices: { kind: string; count: number }[];
  total: number;
};

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function addDays(base: Date, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

const KIND_LABEL: Record<string, string> = {
  reading: "Reading plan",
  examen: "Examen",
  fast: "Fast",
  altar: "Family altar",
  secret: "Secret place",
  sermon: "Sermon note",
  healing: "Healing prayer",
  nation: "Nation prayed",
};

export default function PracticeHeatmap() {
  const { profile, mounted } = useProfile();
  const [now] = useState(() => new Date());
  const [hover, setHover] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Build the activity map keyed by YYYY-MM-DD.
  const activity = useMemo(() => {
    const map = new Map<string, { kind: string; count: number }[]>();
    function bump(date: string | undefined, kind: string) {
      if (!date) return;
      const key = date.slice(0, 10);
      const arr = map.get(key) ?? [];
      const existing = arr.find((a) => a.kind === kind);
      if (existing) existing.count += 1;
      else arr.push({ kind, count: 1 });
      map.set(key, arr);
    }

    // Reading-plan completions: profile.readingProgress / profile.plans, etc.
    // We look at any field that has a `date` ISO and tag it by kind.
    const dated: [unknown[] | undefined, string][] = [
      [profile.examens, "examen"],
      [profile.fasts, "fast"],
      [profile.familyAltar, "altar"],
      [profile.sermons, "sermon"],
      [profile.healing, "healing"],
      [profile.nationsPrayed, "nation"],
    ];
    for (const [arr, kind] of dated) {
      if (!Array.isArray(arr)) continue;
      for (const rec of arr as { date?: string; startedAt?: string; createdAt?: string }[]) {
        const d = rec?.date ?? rec?.startedAt ?? rec?.createdAt;
        bump(d, kind);
      }
    }
    // Secret place — walk journal entries
    if (Array.isArray(profile.secretPlace?.entries)) {
      for (const e of profile.secretPlace!.entries as { date?: string }[]) {
        bump(e?.date, "secret");
      }
    }
    // Reading progress: each chapter read on its date if available
    const progress = (profile as unknown as { readingLog?: { date: string }[] }).readingLog;
    if (Array.isArray(progress)) {
      for (const r of progress) bump(r.date, "reading");
    }
    return map;
  }, [profile]);

  // Build the 53-week × 7-day grid ending today.
  const grid: (DayRecord | null)[][] = useMemo(() => {
    const end = new Date(now);
    end.setHours(0, 0, 0, 0);
    const start = addDays(end, -((WEEKS * 7) - 1));
    // Align start to a Sunday by stepping backward
    const startSunday = addDays(start, -start.getDay());
    const cols: (DayRecord | null)[][] = [];
    for (let w = 0; w < WEEKS; w++) {
      const col: (DayRecord | null)[] = [];
      for (let d = 0; d < DAYS; d++) {
        const date = addDays(startSunday, w * 7 + d);
        if (date > end) {
          col.push(null);
        } else {
          const key = ymd(date);
          const practices = activity.get(key) ?? [];
          const total = practices.reduce((n, p) => n + p.count, 0);
          col.push({ date: key, practices, total });
        }
      }
      cols.push(col);
    }
    return cols;
  }, [activity, now]);

  // Shade levels by total practices
  function shade(total: number) {
    if (total === 0) return "rgb(30 41 59 / 0.55)";
    if (total === 1) return "rgb(249 115 22 / 0.32)";
    if (total === 2) return "rgb(249 115 22 / 0.55)";
    if (total === 3) return "rgb(249 115 22 / 0.78)";
    return "rgb(254 215 170)";
  }

  // Month tick positions — first Sunday of each month
  const monthTicks = useMemo(() => {
    const ticks: { col: number; label: string }[] = [];
    let lastMonth = -1;
    grid.forEach((col, ci) => {
      const first = col.find((c) => c !== null);
      if (!first) return;
      const d = new Date(first.date);
      if (d.getMonth() !== lastMonth) {
        ticks.push({
          col: ci,
          label: d.toLocaleDateString(undefined, { month: "short" }),
        });
        lastMonth = d.getMonth();
      }
    });
    return ticks;
  }, [grid]);

  const totalCells = grid.flat().filter((c) => c !== null).length;
  const activeCells = grid.flat().filter((c) => c !== null && c!.total > 0).length;
  const totalEvents = grid.flat().reduce((n, c) => n + (c?.total ?? 0), 0);

  // Hovered day details
  const hoverDay = hover ? grid.flat().find((c) => c?.date === hover) ?? null : null;

  if (!mounted) {
    return <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading your practice…</div>;
  }

  const W = WEEKS * (CELL + GAP) + 32;
  const H = DAYS * (CELL + GAP) + 50;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-300">A year of practice</div>
          <h3 className="font-serif text-xl text-ink-50 mt-0.5">
            {activeCells > 0 ? (
              <>{activeCells} days with Him in the last year.</>
            ) : (
              <>The grid fills as you walk.</>
            )}
          </h3>
        </div>
        <div className="text-xs text-ink-300 italic">
          {totalEvents > 0 && (
            <>{totalEvents} practices across {activeCells} of {totalCells} days · stays on this device</>
          )}
        </div>
      </div>

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="block min-w-[760px] h-auto" role="img" aria-label="A heatmap of your spiritual practice over the past year.">
          {/* Month ticks across the top */}
          {monthTicks.map((t) => (
            <text
              key={`${t.col}-${t.label}`}
              x={t.col * (CELL + GAP) + 24}
              y={14}
              className="fill-ink-400"
              style={{ font: "500 9px ui-sans-serif, system-ui", letterSpacing: "0.04em" }}
            >
              {t.label}
            </text>
          ))}
          {/* Weekday letters down the left */}
          {["S", "M", "T", "W", "T", "F", "S"].map((l, i) => (
            <text
              key={`${i}-${l}`}
              x={8}
              y={24 + i * (CELL + GAP) + CELL - 2}
              className="fill-ink-500"
              style={{ font: "500 8px ui-sans-serif, system-ui" }}
            >
              {l}
            </text>
          ))}

          {/* Cells */}
          {grid.map((col, ci) =>
            col.map((cell, ri) => {
              if (!cell) return null;
              const x = ci * (CELL + GAP) + 24;
              const y = 24 + ri * (CELL + GAP);
              const isHover = hover === cell.date;
              return (
                <rect
                  key={cell.date}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={shade(cell.total)}
                  stroke={isHover ? "rgb(254 215 170)" : "rgb(15 23 42)"}
                  strokeWidth={isHover ? 1.4 : 0.6}
                  onMouseEnter={(e) => {
                    setHover(cell.date);
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: cell.total > 0 ? "pointer" : "default" }}
                >
                  <title>
                    {cell.date}
                    {cell.total > 0
                      ? ` · ${cell.practices.map((p) => `${KIND_LABEL[p.kind] ?? p.kind}${p.count > 1 ? ` ×${p.count}` : ""}`).join(", ")}`
                      : ""}
                  </title>
                </rect>
              );
            })
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap text-xs text-ink-400">
        <div className="italic">Hover a cell to see what you did that day.</div>
        <div className="flex items-center gap-2">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className="inline-block rounded-sm"
              style={{ width: 12, height: 12, background: shade(n), border: "0.6px solid rgb(15 23 42)" }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Floating tooltip near the cursor */}
      {hoverDay && hoverDay.total > 0 && tooltipPos && (
        <div
          className="pointer-events-none fixed z-40 rounded-xl border border-ink-700 bg-ink-900/95 text-ink-50 px-3 py-2 text-xs shadow-lg"
          style={{
            left: tooltipPos.x + 14,
            top: tooltipPos.y + 14,
          }}
        >
          <div className="text-flame-300 font-medium">{hoverDay.date}</div>
          <ul className="mt-1 space-y-0.5">
            {hoverDay.practices.map((p) => (
              <li key={p.kind}>
                <span className="text-ink-300">{KIND_LABEL[p.kind] ?? p.kind}</span>
                {p.count > 1 && <span className="text-ink-500"> ×{p.count}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}
