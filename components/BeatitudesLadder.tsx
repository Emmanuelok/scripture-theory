"use client";

import { useEffect, useState } from "react";

// ─── The Beatitudes — a ladder ─────────────────────────────────
// Matthew 5:3-12 opens the Sermon on the Mount with eight blessings. The
// figure shows them as ascending stair-steps, each step naming both the
// posture Jesus calls blessed and the promise He attaches to it.

type Beatitude = {
  num: number;
  posture: string;
  promise: string;
  scripture: string;
};

const BEATITUDES: Beatitude[] = [
  { num: 1, posture: "Poor in spirit",                promise: "theirs is the kingdom of heaven",        scripture: "Matthew 5:3" },
  { num: 2, posture: "Those who mourn",               promise: "they shall be comforted",                scripture: "Matthew 5:4" },
  { num: 3, posture: "The meek",                      promise: "they shall inherit the earth",           scripture: "Matthew 5:5" },
  { num: 4, posture: "Hungry & thirsty for righteousness", promise: "they shall be filled",            scripture: "Matthew 5:6" },
  { num: 5, posture: "The merciful",                  promise: "they shall obtain mercy",                scripture: "Matthew 5:7" },
  { num: 6, posture: "The pure in heart",             promise: "they shall see God",                     scripture: "Matthew 5:8" },
  { num: 7, posture: "The peacemakers",               promise: "they shall be called sons of God",       scripture: "Matthew 5:9" },
  { num: 8, posture: "Persecuted for righteousness",  promise: "theirs is the kingdom of heaven",        scripture: "Matthew 5:10" },
];

const VIEW_W = 900;
const VIEW_H = 560;

export default function BeatitudesLadder() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focus = active ? BEATITUDES.find((b) => b.num === active) : null;

  // Step geometry — each beatitude is a step rising up
  const stepW = 110;
  const stepH = 56;
  const baseY = VIEW_H - 60;
  const startX = 80;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[760px] h-auto"
          role="img" aria-label="A staircase of the eight beatitudes from Matthew 5:3-12.">
          <defs>
            <linearGradient id="bl-step" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="bl-step-active" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(254 240 199)" />
              <stop offset="100%" stopColor="rgb(234 88 12)" />
            </linearGradient>
            <radialGradient id="bl-kingdom-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.8" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Kingdom glow above the highest step */}
          <ellipse
            cx={startX + 7 * stepW + stepW / 2}
            cy={baseY - 8 * stepH + 20}
            rx={180}
            ry={50}
            fill="url(#bl-kingdom-glow)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 1500ms" }}
          />
          <text
            x={startX + 7 * stepW + stepW / 2}
            y={baseY - 8 * stepH - 14}
            textAnchor="middle"
            className="fill-flame-200"
            style={{ font: "italic 700 14px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 1700ms" }}
          >
            the kingdom of heaven
          </text>

          {/* Steps */}
          {BEATITUDES.map((b, i) => {
            const x = startX + i * stepW;
            const y = baseY - (i + 1) * stepH;
            const isOn = active === b.num;
            return (
              <g
                key={b.num}
                tabIndex={0}
                role="button"
                aria-label={`${b.posture}: ${b.promise}`}
                onMouseEnter={() => setActive(b.num)}
                onMouseLeave={() => setActive((c) => (c === b.num ? null : c))}
                onFocus={() => setActive(b.num)}
                onClick={() => setActive((c) => (c === b.num ? null : b.num))}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${400 + i * 130}ms`,
                }}
              >
                {/* The riser to the next step (vertical face) */}
                <rect
                  x={x}
                  y={y}
                  width={stepW}
                  height={stepH}
                  fill={isOn ? "url(#bl-step-active)" : "url(#bl-step)"}
                  stroke="rgb(15 23 42)"
                  strokeWidth={1.5}
                  rx={4}
                  style={{ transition: "fill 200ms" }}
                />
                {/* Numbered badge */}
                <circle cx={x + 18} cy={y + 18} r={11} fill="rgb(15 23 42)" stroke="rgb(254 215 170)" strokeWidth={1} />
                <text x={x + 18} y={y + 22} textAnchor="middle"
                  style={{ font: "700 11px ui-sans-serif, system-ui", fill: "rgb(254 215 170)" }}>
                  {b.num}
                </text>
                {/* Posture label on the step */}
                <text x={x + stepW / 2 + 6} y={y + 22} textAnchor="middle"
                  style={{ font: "600 10px ui-sans-serif, system-ui", fill: "rgb(15 23 42)", letterSpacing: "0.02em" }}>
                  {b.posture.length > 16 ? b.posture.split(" ").slice(0, 2).join(" ") + "…" : b.posture}
                </text>
                {/* Promise label below */}
                <text x={x + stepW / 2 + 6} y={y + 40} textAnchor="middle"
                  style={{ font: "italic 10px ui-serif, Georgia, serif", fill: "rgb(15 23 42)" }}>
                  → {b.promise.length > 22 ? b.promise.slice(0, 22) + "…" : b.promise}
                </text>
              </g>
            );
          })}

          {/* Base label */}
          <text x={startX} y={baseY + 26} className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.08em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1300ms" }}>
            BEGIN HERE — Matthew 5:3
          </text>
          <text x={VIEW_W - 60} y={baseY + 26} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.08em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1400ms" }}>
            ↑ rejoice & be exceedingly glad
          </text>
        </svg>
      </div>

      <div className="mt-3 min-h-[3rem] text-sm leading-relaxed">
        {focus ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">{focus.scripture}</span>
            <span className="font-serif text-ink-50">Blessed are the {focus.posture.toLowerCase()},</span>
            <span className="ml-2 text-ink-300 italic">for {focus.promise}.</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            Jesus opens His great sermon by overturning the world's idea of blessing. Hover any
            step to read its promise. The whole staircase ends in His kingdom.
          </span>
        )}
      </div>
    </figure>
  );
}
