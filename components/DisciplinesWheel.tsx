"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DISCIPLINES } from "@/data/resources/disciplines";

// ─── Spiritual disciplines wheel ───────────────────────────────
// The eight historic disciplines arranged as spokes around a centre marked
// "Christ." None earns grace; together they prepare the soil. Click a spoke
// to scroll to its detailed section below.

const VIEW = 580;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_NODE = 210;
const R_NODE_INNER = 80;

const COLORS = [
  "#ea580c", "#dc2626", "#b45309", "#7c3aed",
  "#1d4ed8", "#0d9488", "#16a34a", "#facc15",
];

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function DisciplinesWheel() {
  const [active, setActive] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focus = active ? DISCIPLINES.find((d) => d.slug === active) : null;

  function scrollTo(slug: string) {
    setActive(slug);
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-2", "ring-flame-500", "ring-offset-2", "ring-offset-ink-50");
      window.setTimeout(() => {
        el.classList.remove("ring-2", "ring-flame-500", "ring-offset-2", "ring-offset-ink-50");
      }, 1600);
    }
  }

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="block mx-auto w-full max-w-[560px] h-auto"
            role="img"
            aria-label="A wheel of the eight historic spiritual disciplines around a centre marked Christ."
          >
            <defs>
              <radialGradient id="dw-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.75" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={140} fill="url(#dw-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 600ms" }} />

            {/* Spokes from centre to each discipline */}
            {DISCIPLINES.map((d, i) => {
              const angle = (i / DISCIPLINES.length) * Math.PI * 2 - Math.PI / 2;
              const start = polar(R_NODE_INNER, angle);
              const end = polar(R_NODE, angle);
              return (
                <line
                  key={`spoke-${d.slug}`}
                  x1={start.x} y1={start.y}
                  x2={end.x} y2={end.y}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  opacity={active && active !== d.slug ? 0.18 : 0.55}
                  style={{
                    strokeDasharray: 280,
                    strokeDashoffset: drawn ? 0 : 280,
                    transition: `stroke-dashoffset 900ms ease ${300 + i * 80}ms, opacity 200ms`,
                  }}
                />
              );
            })}

            {/* Discipline nodes */}
            {DISCIPLINES.map((d, i) => {
              const angle = (i / DISCIPLINES.length) * Math.PI * 2 - Math.PI / 2;
              const p = polar(R_NODE, angle);
              const labelP = polar(R_NODE + 36, angle);
              const isOn = active === d.slug;
              const dimmed = active && !isOn;
              const color = COLORS[i % COLORS.length];

              return (
                <g
                  key={d.slug}
                  tabIndex={0}
                  role="button"
                  aria-label={d.name}
                  onMouseEnter={() => setActive(d.slug)}
                  onMouseLeave={() => setActive((c) => (c === d.slug ? null : c))}
                  onFocus={() => setActive(d.slug)}
                  onClick={() => scrollTo(d.slug)}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? (dimmed ? 0.45 : 1) : 0,
                    transition: `opacity 700ms ease ${500 + i * 90}ms`,
                  }}
                >
                  {isOn && (
                    <circle cx={p.x} cy={p.y} r={28} fill="none" stroke={color} strokeWidth={1.4} opacity={0.45} />
                  )}
                  <circle cx={p.x} cy={p.y} r={isOn ? 20 : 16} fill={color} stroke="rgb(15 23 42)" strokeWidth={1.5} />
                  <text
                    x={labelP.x}
                    y={labelP.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{
                      font: `${isOn ? "600" : "500"} 12px ui-serif, Georgia, serif`,
                      letterSpacing: "0.02em",
                      transition: "fill 200ms",
                    }}
                  >
                    {d.name.split(" ")[0].replace("&", "·")}
                  </text>
                </g>
              );
            })}

            {/* Centre node — Christ */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1300ms" }}>
              <circle cx={CX} cy={CY} r={56} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 6} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                centre
              </text>
              <text x={CX} y={CY + 14} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 18px ui-serif, Georgia, serif" }}>
                Christ
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focus ? "Discipline" : "How saints have grown"}
          </div>
          {focus ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focus.name}</h3>
              <p className="mt-2 text-ink-200 italic">{focus.oneLine}</p>
              <button
                onClick={() => scrollTo(focus.slug)}
                className="mt-3 inline-flex items-center rounded-full bg-flame-600 hover:bg-flame-700 text-ink-50 px-4 py-1.5 text-xs"
              >
                Read {focus.name.toLowerCase()} ↓
              </button>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Pick one. Walk with it.</h3>
              <p className="mt-2 text-ink-200 italic">
                None of these earn anything; all of them prepare the soil. The centre
                is not a practice — it is a Person.
              </p>
              <p className="mt-3 text-[11px] text-ink-400">
                Hover a node to read; click to jump to that discipline below.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
