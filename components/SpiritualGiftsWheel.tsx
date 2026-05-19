"use client";

import { useEffect, useState } from "react";
import { gifts, type Gift } from "@/data/gifts";

// ─── Spiritual gifts wheel ─────────────────────────────────────
// Twenty gifts named in Romans 12, 1 Corinthians 12, Ephesians 4, and
// 1 Peter 4, arranged as spokes around a centre marked "love" — Paul's
// great corrective in 1 Corinthians 13. Without love, every gift is noise.

const VIEW = 620;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_NODE = 230;
const R_LABEL = 270;

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function SpiritualGiftsWheel() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused: Gift | null = active ? gifts.find((g) => g.id === active) ?? null : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[580px] h-auto"
            role="img" aria-label="The spiritual gifts arranged as spokes around a centre marked Love.">
            <defs>
              <radialGradient id="sg-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.8" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={140} fill="url(#sg-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Spokes from centre to each gift */}
            {gifts.map((g, i) => {
              const angle = -Math.PI / 2 + (i / gifts.length) * Math.PI * 2;
              const start = polar(75, angle);
              const end = polar(R_NODE - 12, angle);
              const isOn = active === g.id;
              return (
                <line
                  key={`spoke-${g.id}`}
                  x1={start.x} y1={start.y}
                  x2={end.x} y2={end.y}
                  stroke={isOn ? "rgb(249 115 22)" : "rgb(254 215 170 / 0.35)"}
                  strokeWidth={isOn ? 1.7 : 1}
                  style={{
                    strokeDasharray: 200,
                    strokeDashoffset: drawn ? 0 : 200,
                    transition: `stroke-dashoffset 800ms ease ${300 + i * 60}ms, stroke 200ms`,
                  }}
                />
              );
            })}

            {/* Gift nodes */}
            {gifts.map((g, i) => {
              const angle = -Math.PI / 2 + (i / gifts.length) * Math.PI * 2;
              const p = polar(R_NODE, angle);
              const lp = polar(R_LABEL, angle);
              const isOn = active === g.id;
              const label = g.name.length > 14 ? g.name.split(" ")[0] : g.name;
              return (
                <g
                  key={g.id}
                  tabIndex={0}
                  role="button"
                  aria-label={g.name}
                  onMouseEnter={() => setActive(g.id)}
                  onMouseLeave={() => setActive((c) => (c === g.id ? null : c))}
                  onFocus={() => setActive(g.id)}
                  onClick={() => setActive((c) => (c === g.id ? null : g.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 600ms ease ${500 + i * 60}ms`,
                  }}
                >
                  {isOn && <circle cx={p.x} cy={p.y} r={13} fill="none" stroke="rgb(249 115 22)" strokeWidth={1.4} opacity={0.55} />}
                  <circle cx={p.x} cy={p.y} r={isOn ? 8 : 6}
                    fill={isOn ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                    stroke="rgb(15 23 42)" strokeWidth={1.2} />
                  <text x={lp.x} y={lp.y + 4} textAnchor="middle"
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{ font: `${isOn ? "600" : "500"} 10px ui-serif, Georgia, serif`, transition: "fill 200ms" }}>
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Centre — Love */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1500ms" }}>
              <circle cx={CX} cy={CY} r={60} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 8} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                1 Corinthians 13
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 22px ui-serif, Georgia, serif" }}>
                Love
              </text>
              <text x={CX} y={CY + 30} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                the more excellent way
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[12rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? "Gift" : "Many gifts, one Spirit"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.name}</h3>
              <p className="mt-2 text-ink-200">{focused.short}</p>
              <p className="mt-3 text-[11px] text-ink-400 italic">{focused.served}</p>
              {focused.scripture.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {focused.scripture.map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-widest text-flame-300/80 rounded-full border border-ink-700/60 px-2 py-0.5">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">For the common good.</h3>
              <p className="mt-2 text-ink-200 italic">
                Twenty gifts named across the New Testament, given by one Spirit for the
                building up of the church. Hover any spoke to read.
              </p>
              <p className="mt-3 text-[11px] text-ink-400">
                Paul puts love at the centre on purpose. Without love every gift is noise
                (1 Corinthians 13:1).
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
