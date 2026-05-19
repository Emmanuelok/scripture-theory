"use client";

import { useEffect, useState } from "react";

// ─── The Seven Days of Creation ────────────────────────────────
// Genesis 1 narrates a week of forming and filling. The figure presents the
// days as a circle of seven petals; days 1-3 form the realms (light/dark,
// sky/sea, land), days 4-6 fill them (sun/moon, birds/fish, beasts and
// humans), day 7 is rest at the centre.

type Day = {
  n: number;
  title: string;
  what: string;
  ref: string;
  pair?: number;     // day-3 fills day-6, etc.
};

const DAYS: Day[] = [
  { n: 1, title: "Light",       what: "Light separated from darkness — day and night.",       ref: "Genesis 1:3-5",   pair: 4 },
  { n: 2, title: "Sky & Sea",   what: "The expanse above; waters below.",                     ref: "Genesis 1:6-8",   pair: 5 },
  { n: 3, title: "Land & Plants", what: "Dry land appears; the earth brings forth life.",     ref: "Genesis 1:9-13",  pair: 6 },
  { n: 4, title: "Sun · Moon · Stars", what: "Lights to rule day and night and mark times.",  ref: "Genesis 1:14-19" },
  { n: 5, title: "Birds & Fish", what: "The waters teem; birds fly across the sky.",          ref: "Genesis 1:20-23" },
  { n: 6, title: "Beasts · Humans", what: "Land creatures — and humanity in God's image.",    ref: "Genesis 1:24-31" },
  { n: 7, title: "Rest",        what: "God finished His work and rested. He blessed the day.", ref: "Genesis 2:1-3" },
];

const VIEW = 540;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_PETAL = 200;
const R_LABEL = 240;

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function DaysOfCreation() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? DAYS.find((d) => d.n === active) : null;

  // First six days arranged around the circle; Day 7 sits at centre.
  const outer = DAYS.slice(0, 6);

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[520px] h-auto"
            role="img" aria-label="The seven days of creation arranged in a circle; day 7 at the centre.">
            <defs>
              <radialGradient id="dc-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.8" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={120} fill="url(#dc-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Pair lines: day 1↔4, 2↔5, 3↔6 (form / fill) */}
            {[[1, 4], [2, 5], [3, 6]].map(([a, b], i) => {
              const aIdx = outer.findIndex((d) => d.n === a);
              const bIdx = outer.findIndex((d) => d.n === b);
              const angleA = -Math.PI / 2 + (aIdx / 6) * Math.PI * 2;
              const angleB = -Math.PI / 2 + (bIdx / 6) * Math.PI * 2;
              const p1 = polar(R_PETAL - 40, angleA);
              const p2 = polar(R_PETAL - 40, angleB);
              return (
                <line
                  key={`pair-${i}`}
                  x1={p1.x} y1={p1.y}
                  x2={p2.x} y2={p2.y}
                  stroke="rgb(254 215 170 / 0.18)"
                  strokeWidth={1}
                  strokeDasharray="3 5"
                  style={{
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 800ms ease ${1400 + i * 150}ms`,
                  }}
                />
              );
            })}

            {/* Day petals around the circle */}
            {outer.map((d, i) => {
              const angle = -Math.PI / 2 + (i / 6) * Math.PI * 2;
              const p = polar(R_PETAL, angle);
              const lp = polar(R_LABEL, angle);
              const isOn = active === d.n;
              const isFill = d.n >= 4;
              return (
                <g
                  key={d.n}
                  tabIndex={0}
                  role="button"
                  aria-label={`Day ${d.n}: ${d.title}`}
                  onMouseEnter={() => setActive(d.n)}
                  onMouseLeave={() => setActive((c) => (c === d.n ? null : c))}
                  onFocus={() => setActive(d.n)}
                  onClick={() => setActive((c) => (c === d.n ? null : d.n))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${400 + i * 130}ms`,
                  }}
                >
                  {isOn && (
                    <circle cx={p.x} cy={p.y} r={36} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.4} opacity={0.5} />
                  )}
                  <circle
                    cx={p.x} cy={p.y}
                    r={isOn ? 30 : 26}
                    fill={isFill ? "rgb(249 115 22)" : "rgb(245 158 11)"}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1.5}
                  />
                  <text x={p.x} y={p.y - 2} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "700 12px ui-sans-serif, system-ui" }}>
                    {d.n}
                  </text>
                  <text x={p.x} y={p.y + 12} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "italic 9px ui-serif, Georgia, serif" }}>
                    {isFill ? "fill" : "form"}
                  </text>
                  <text x={lp.x} y={lp.y + 4} textAnchor="middle" className="fill-ink-100"
                    style={{ font: "500 11px ui-serif, Georgia, serif" }}>
                    {d.title}
                  </text>
                </g>
              );
            })}

            {/* Day 7 at centre */}
            <g
              tabIndex={0}
              role="button"
              aria-label="Day 7: Rest"
              onMouseEnter={() => setActive(7)}
              onMouseLeave={() => setActive((c) => (c === 7 ? null : c))}
              onFocus={() => setActive(7)}
              onClick={() => setActive((c) => (c === 7 ? null : 7))}
              style={{
                cursor: "pointer",
                opacity: drawn ? 1 : 0,
                transition: "opacity 900ms ease 1500ms",
              }}
            >
              <circle cx={CX} cy={CY} r={56} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 6} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                Day 7
              </text>
              <text x={CX} y={CY + 14} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 18px ui-serif, Georgia, serif" }}>
                Rest
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? `Day ${focused.n} · ${focused.ref}` : "Genesis 1–2"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.title}</h3>
              <p className="mt-2 text-ink-200">{focused.what}</p>
              {focused.pair && (
                <p className="mt-2 text-[11px] text-ink-400 italic">
                  Day {focused.n} (form) is filled on Day {focused.pair}.
                </p>
              )}
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Form, then fill, then rest.</h3>
              <p className="mt-2 text-ink-200 italic">
                Days 1-3 separate the realms; days 4-6 fill them; day 7 blesses the
                whole. The rhythm built into the world.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
