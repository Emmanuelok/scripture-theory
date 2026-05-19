"use client";

import { useEffect, useState } from "react";
import { fruits } from "@/data/fruit";

// ─── Nine-petal fruit-of-the-Spirit flower ─────────────────────
// Galatians 5:22-23 names ONE fruit with nine facets. The figure draws nine
// petals in a circle around a centre marked "Spirit" — geometry that mirrors
// the verse's grammar. Hover or tap any petal to read its short blurb.

const VIEW = 600;
const CX = VIEW / 2;
const CY = VIEW / 2;
const PETAL_R = 220;     // distance from centre to petal tip
const PETAL_W = 70;      // petal width
const PETAL_H = 130;     // petal length

export default function FruitFlower() {
  const [active, setActive] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const activeFruit = active ? fruits.find((f) => f.id === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="block mx-auto w-full max-w-[560px] h-auto"
            role="img"
            aria-label="Fruit of the Spirit — a nine-petal flower naming love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control."
          >
            <defs>
              <radialGradient id="ff-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.9" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ff-petal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="ff-petal-active" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(254 240 199)" />
                <stop offset="100%" stopColor="rgb(234 88 12)" />
              </linearGradient>
            </defs>

            {/* Centre glow */}
            <circle cx={CX} cy={CY} r={110} fill="url(#ff-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 600ms" }} />

            {/* Petals */}
            {fruits.map((f, i) => {
              const angle = (i / fruits.length) * Math.PI * 2 - Math.PI / 2; // start at top
              const tipX = CX + Math.cos(angle) * PETAL_R;
              const tipY = CY + Math.sin(angle) * PETAL_R;
              const angleDeg = (angle * 180) / Math.PI + 90; // +90 so petal points outward
              const isOn = active === f.id;

              // Petal is an ellipse rotated so it points from centre outward.
              const baseX = CX + Math.cos(angle) * 70;
              const baseY = CY + Math.sin(angle) * 70;

              // Label position just past the petal tip
              const labelX = CX + Math.cos(angle) * (PETAL_R + 40);
              const labelY = CY + Math.sin(angle) * (PETAL_R + 40);

              return (
                <g
                  key={f.id}
                  tabIndex={0}
                  role="button"
                  aria-label={f.name}
                  onMouseEnter={() => setActive(f.id)}
                  onMouseLeave={() => setActive((c) => (c === f.id ? null : c))}
                  onFocus={() => setActive(f.id)}
                  onClick={() => setActive(isOn ? null : f.id)}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 600ms ease ${500 + i * 90}ms, transform 500ms cubic-bezier(.2,.9,.3,1.4)`,
                    transform: drawn ? "scale(1)" : "scale(0.6)",
                    transformOrigin: `${CX}px ${CY}px`,
                  }}
                >
                  <g transform={`rotate(${angleDeg} ${(baseX + tipX) / 2} ${(baseY + tipY) / 2})`}>
                    <ellipse
                      cx={(baseX + tipX) / 2}
                      cy={(baseY + tipY) / 2}
                      rx={PETAL_W / 2}
                      ry={PETAL_H / 2}
                      fill={isOn ? "url(#ff-petal-active)" : "url(#ff-petal)"}
                      opacity={isOn ? 1 : 0.85}
                      stroke="rgb(15 23 42)"
                      strokeWidth={1}
                      style={{ transition: "opacity 200ms" }}
                    />
                  </g>
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{
                      font: `${isOn ? "600" : "500"} 13px ui-serif, Georgia, serif`,
                      transition: "fill 200ms",
                    }}
                  >
                    {f.name}
                  </text>
                </g>
              );
            })}

            {/* Centre node */}
            <circle cx={CX} cy={CY} r={56} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2}
              style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 900ms" }} />
            <text x={CX} y={CY - 6} textAnchor="middle" className="fill-flame-100"
              style={{ font: "italic 11px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1100ms" }}>
              fruit of the
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" className="fill-flame-100"
              style={{ font: "700 18px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1200ms" }}>
              Spirit
            </text>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Galatians 5:22-23</div>
          {activeFruit ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{activeFruit.name}.</h3>
              <p className="mt-3 text-ink-200">{activeFruit.short}</p>
              {activeFruit.scripture && (
                <p className="mt-3 italic text-ink-300 border-l-2 border-flame-500/60 pl-3">
                  &ldquo;{activeFruit.scripture.text}&rdquo;
                  <span className="block text-[11px] not-italic text-flame-300 mt-1">— {activeFruit.scripture.ref}</span>
                </p>
              )}
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">One fruit, nine facets.</h3>
              <p className="mt-3 text-ink-200 italic">
                Paul does not write &ldquo;the fruits of the Spirit&rdquo; — singular fruit, nine
                petals of one growing thing. Hover a petal to read its facet.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
