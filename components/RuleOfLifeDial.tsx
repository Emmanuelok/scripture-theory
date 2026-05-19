"use client";

import { useEffect, useState } from "react";

// ─── Rule of Life dial ─────────────────────────────────────────
// Concentric bands representing the cadence of a Christian rule:
// daily, weekly, monthly, yearly. Each band lists the practices that
// belong to that rhythm. The whole dial centres on Christ — the rule
// supports the life; it does not become the life.

type Band = {
  id: string;
  label: string;
  items: string[];
  r1: number;
  r2: number;
  color: string;
};

const VIEW = 580;
const CX = VIEW / 2;
const CY = VIEW / 2;

const BANDS: Band[] = [
  { id: "daily",   label: "Daily",   r1: 70,  r2: 130, color: "#ea580c",
    items: ["Open the Word", "Pray (morning + evening)", "Examen at day's end"] },
  { id: "weekly",  label: "Weekly",  r1: 130, r2: 180, color: "#b45309",
    items: ["Sabbath (24h)", "Gather with the church", "One person discipled", "Generous giving"] },
  { id: "monthly", label: "Monthly", r1: 180, r2: 220, color: "#7c3aed",
    items: ["A day of solitude", "Fast (24h)", "Confession with a friend"] },
  { id: "yearly",  label: "Yearly",  r1: 220, r2: 260, color: "#1d4ed8",
    items: ["A longer retreat", "Re-read the gospels", "Rule review and refresh"] },
];

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

function bandPath(r1: number, r2: number) {
  // Full ring as two arcs
  const p1 = polar(r2, 0);
  const p2 = polar(r2, Math.PI);
  const i1 = polar(r1, 0);
  const i2 = polar(r1, Math.PI);
  return `
    M ${p1.x} ${p1.y}
    A ${r2} ${r2} 0 1 1 ${p2.x} ${p2.y}
    A ${r2} ${r2} 0 1 1 ${p1.x} ${p1.y}
    M ${i1.x} ${i1.y}
    A ${r1} ${r1} 0 1 0 ${i2.x} ${i2.y}
    A ${r1} ${r1} 0 1 0 ${i1.x} ${i1.y}
    Z
  `;
}

export default function RuleOfLifeDial() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>("daily");

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = BANDS.find((b) => b.id === active) ?? BANDS[0];

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[540px] h-auto"
            role="img" aria-label="A rule-of-life dial: daily, weekly, monthly, yearly bands around Christ at the centre.">
            <defs>
              <radialGradient id="rd-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.6" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={100} fill="url(#rd-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 400ms" }} />

            {/* Bands (rendered outermost first so labels can overlap correctly) */}
            {[...BANDS].reverse().map((b, idx) => {
              const isOn = active === b.id;
              const i = BANDS.length - 1 - idx;
              return (
                <g
                  key={b.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${b.label} cadence: ${b.items.join(", ")}`}
                  onMouseEnter={() => setActive(b.id)}
                  onFocus={() => setActive(b.id)}
                  onClick={() => setActive(b.id)}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 800ms ease ${500 + i * 200}ms`,
                  }}
                >
                  <path
                    d={bandPath(b.r1, b.r2)}
                    fill={b.color}
                    fillRule="evenodd"
                    opacity={isOn ? 0.88 : 0.62}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1.4}
                    style={{ transition: "opacity 200ms" }}
                  />
                  {/* Band label on the right side */}
                  <text
                    x={CX + (b.r1 + b.r2) / 2}
                    y={CY + 4}
                    textAnchor="middle"
                    style={{
                      font: "600 11px ui-sans-serif, system-ui",
                      letterSpacing: "0.08em",
                      fill: "rgb(248 250 252)",
                      pointerEvents: "none",
                    }}
                  >
                    {b.label.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Centre — Christ */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1500ms" }}>
              <circle cx={CX} cy={CY} r={64} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 6} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                trellis for
              </text>
              <text x={CX} y={CY + 14} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 18px ui-serif, Georgia, serif" }}>
                the Vine
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">{focused.label} cadence</div>
          <h3 className="font-serif text-2xl text-ink-50 mt-1">A trellis, not a cage.</h3>
          <ul className="mt-3 space-y-1.5">
            {focused.items.map((it, i) => (
              <li key={i} className="flex gap-2 text-ink-200">
                <span className="text-flame-300 mt-1">·</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-ink-400 italic">
            These are sample rhythms — yours will be shaped by your season. Pick fewer than
            you think; the goal is consistent, not maximal.
          </p>
        </aside>
      </div>
    </figure>
  );
}
