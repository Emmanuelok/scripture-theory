"use client";

import { useEffect, useMemo, useState } from "react";
import { SEASONS, seasonOn, feastsInYear, type SeasonId } from "@/lib/calendar";

// ─── Church Year Wheel ─────────────────────────────────────────
// The Christian year as a circle. Nine season arcs sized by their actual
// length in days. A pointer rotates to today's place. Month ticks ring the
// outside. Click a season to read it.

const VIEW = 560;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_OUTER = 250;        // outer edge of season arc
const R_INNER = 170;        // inner edge of season arc
const R_LABEL = 215;        // season label radius
const R_MONTH = 268;        // month tick radius

const SEASON_COLOR: Record<SeasonId, string> = {
  advent: "#7e3af2",                       // royal purple
  christmas: "#fef7ed",                    // white-cream
  epiphany: "#fff7d6",                     // pale gold
  "ordinary-pre-lent": "#22c55e",          // green
  lent: "#6d28d9",                         // deeper purple
  "holy-week": "#b91c1c",                  // red
  easter: "#f59e0b",                       // gold
  "pentecost-season": "#dc2626",           // fire red
  "ordinary-after-pentecost": "#16a34a",   // green
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function polarToCart(r: number, thetaRad: number) {
  return {
    x: CX + r * Math.cos(thetaRad),
    y: CY + r * Math.sin(thetaRad),
  };
}

function arcPath(r1: number, r2: number, thetaStart: number, thetaEnd: number) {
  const large = thetaEnd - thetaStart > Math.PI ? 1 : 0;
  const a = polarToCart(r2, thetaStart);
  const b = polarToCart(r2, thetaEnd);
  const c = polarToCart(r1, thetaEnd);
  const d = polarToCart(r1, thetaStart);
  return `
    M ${a.x} ${a.y}
    A ${r2} ${r2} 0 ${large} 1 ${b.x} ${b.y}
    L ${c.x} ${c.y}
    A ${r1} ${r1} 0 ${large} 0 ${d.x} ${d.y}
    Z
  `;
}

// Day of year (0-based), assuming non-leap = 365.
function dayOfYearFraction(d: Date) {
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start;
  const days = ms / 86_400_000;
  return days / 365;
}

export default function ChurchYearWheel() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<SeasonId | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Compute season ranges in days-of-year. The exact dates shift year-to-year
  // (Easter floats), so we work them out for the current civil year.
  const seasonArcs = useMemo(() => {
    if (!now) return [];
    const year = now.getUTCFullYear();
    const feasts = feastsInYear(year);
    const f = (id: string) => feasts.find((x) => x.id === id)!.date;

    const adventStart = f("ash-wednesday"); // placeholder, replaced below
    // We need the start dates of each season. Easiest: probe seasonOn() across
    // the year and walk transitions. Cheap enough — once per render.
    const ranges: { id: SeasonId; start: number; end: number }[] = [];
    let lastId: SeasonId | null = null;
    let startDay = 0;
    for (let day = 0; day < 365; day++) {
      const d = new Date(Date.UTC(year, 0, 1 + day));
      const id = seasonOn(d).season.id as SeasonId;
      if (id !== lastId) {
        if (lastId !== null) ranges.push({ id: lastId, start: startDay, end: day });
        lastId = id;
        startDay = day;
      }
    }
    if (lastId) ranges.push({ id: lastId, start: startDay, end: 365 });

    // Coalesce same-id adjacent ranges (ordinary-after-pentecost may wrap)
    void adventStart;
    return ranges;
  }, [now]);

  if (!now) {
    return <div className="rounded-3xl border border-ink-200 bg-card p-8 text-ink-500">Loading the year…</div>;
  }

  // Today's angle on the circle. Start the year at 12 o'clock and sweep clockwise.
  const todayFrac = dayOfYearFraction(now);
  const todayAngle = -Math.PI / 2 + todayFrac * Math.PI * 2;
  const todayTip = polarToCart(R_OUTER + 8, todayAngle);

  const todaySeason = seasonOn(now).season;
  const focusSeason = active ? SEASONS[active] : todaySeason;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="block mx-auto w-full max-w-[560px] h-auto"
            role="img"
            aria-label="The Christian Year as a wheel. Nine season arcs around a circle, with a pointer at today."
          >
            <defs>
              <radialGradient id="cyw-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.45" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={R_INNER - 8} fill="url(#cyw-centre)" />

            {/* Season arcs */}
            {seasonArcs.map((arc, i) => {
              const startA = -Math.PI / 2 + (arc.start / 365) * Math.PI * 2;
              const endA = -Math.PI / 2 + (arc.end / 365) * Math.PI * 2;
              const midA = (startA + endA) / 2;
              const season = SEASONS[arc.id];
              const colorHex = SEASON_COLOR[arc.id];
              const isOn = active === arc.id || (!active && arc.id === todaySeason.id);
              const labelPos = polarToCart(R_LABEL, midA);

              // Shorten very tight labels
              const shortName = season.name
                .replace("Ordinary Time (winter)", "Ordinary")
                .replace("Ordinary Time", "Ordinary")
                .replace("Christmastide", "Christmas")
                .replace("Eastertide", "Easter")
                .replace("Holy Week", "Holy Wk");

              const arcSpan = endA - startA;

              return (
                <g
                  key={`${arc.id}-${i}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${season.name} — ${season.tagline}`}
                  onMouseEnter={() => setActive(arc.id)}
                  onMouseLeave={() => setActive((c) => (c === arc.id ? null : c))}
                  onFocus={() => setActive(arc.id)}
                  onClick={() => setActive((c) => (c === arc.id ? null : arc.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${300 + i * 80}ms`,
                  }}
                >
                  <path
                    d={arcPath(R_INNER, R_OUTER, startA, endA)}
                    fill={colorHex}
                    opacity={isOn ? 1 : 0.78}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1.5}
                    style={{ transition: "opacity 200ms" }}
                  />
                  {arcSpan > 0.18 && (
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        font: "600 11px ui-sans-serif, system-ui",
                        fill: ["white", "rose", "gold"].includes(season.color) ? "rgb(30 41 59)" : "rgb(248 250 252)",
                        pointerEvents: "none",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {shortName}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Month ticks */}
            {MONTHS.map((m, i) => {
              const a = -Math.PI / 2 + (i / 12) * Math.PI * 2;
              const p = polarToCart(R_MONTH, a);
              const t = polarToCart(R_OUTER + 4, a);
              const t2 = polarToCart(R_OUTER + 14, a);
              return (
                <g key={m} style={{ opacity: drawn ? 0.8 : 0, transition: `opacity 800ms ease ${800 + i * 30}ms` }}>
                  <line x1={t.x} y1={t.y} x2={t2.x} y2={t2.y} stroke="rgb(148 163 184 / 0.6)" strokeWidth={1.5} />
                  <text
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ font: "600 11.5px ui-sans-serif, system-ui", fill: "rgb(203 213 225)", letterSpacing: "0.08em" }}
                  >
                    {m}
                  </text>
                </g>
              );
            })}

            {/* Today pointer */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 1000ms ease 1400ms" }}>
              <line
                x1={CX}
                y1={CY}
                x2={todayTip.x}
                y2={todayTip.y}
                stroke="rgb(249 115 22)"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <circle cx={todayTip.x} cy={todayTip.y} r={6} fill="rgb(249 115 22)" stroke="rgb(15 23 42)" strokeWidth={1.5} />
              <circle cx={CX} cy={CY} r={6} fill="rgb(249 115 22)" stroke="rgb(15 23 42)" strokeWidth={1.5} />
            </g>

            {/* Centre date label */}
            <text x={CX} y={CY - 8} textAnchor="middle" className="fill-ink-300"
              style={{ font: "italic 10px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1500ms" }}>
              today
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" className="fill-flame-100"
              style={{ font: "600 14px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1600ms" }}>
              {now.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </text>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {active ? "Season" : "Today's season"}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-1">{focusSeason.name}</h3>
          <p className="mt-2 text-ink-200 italic">&ldquo;{focusSeason.tagline}&rdquo;</p>
          <p className="mt-3 text-ink-300 text-xs">
            Christians have kept time by this story for many centuries. The colour of
            each season — purple for waiting and repentance, white for incarnation,
            red for the Spirit and the cross, green for ordinary discipleship, gold
            for resurrection — preaches without a single word.
          </p>
          {!active && (
            <p className="mt-3 text-[11px] text-ink-400 italic">
              Hover a wedge to read a season; click to keep it open.
            </p>
          )}
        </aside>
      </div>
    </figure>
  );
}
