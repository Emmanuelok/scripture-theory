"use client";

import { useEffect, useState } from "react";

// ─── A · C · T · S ─────────────────────────────────────────────
// The ancient four-fold pattern for praying with shape: Adoration,
// Confession, Thanksgiving, Supplication. A clean circular figure with
// each step coloured distinctly and arrows pointing through the rotation.

type Step = {
  letter: string;
  word: string;
  short: string;
  scripture: string;
  ref: string;
  color: string;
};

const STEPS: Step[] = [
  { letter: "A", word: "Adoration",    short: "Tell God who He is. Begin with His glory, not your needs.",     scripture: "Holy, holy, holy is the LORD of hosts; the whole earth is full of his glory.", ref: "Isaiah 6:3",            color: "#facc15" },
  { letter: "C", word: "Confession",   short: "Name your sins. He is faithful to forgive — His character, not your effort.", scripture: "If we confess our sins, He is faithful and just to forgive us.",         ref: "1 John 1:9",            color: "#dc2626" },
  { letter: "T", word: "Thanksgiving", short: "Count today's gifts. Gratitude reorders the soul.",              scripture: "Give thanks in all circumstances; for this is the will of God in Christ Jesus.", ref: "1 Thessalonians 5:18",  color: "#ea580c" },
  { letter: "S", word: "Supplication", short: "Now ask — for yourself, your people, the nations.",              scripture: "In everything by prayer and supplication with thanksgiving let your requests be made known.", ref: "Philippians 4:6",  color: "#7c3aed" },
];

const VIEW = 540;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_NODE = 170;
const R_LABEL = 220;

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function ActsPrayerWheel() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? STEPS.find((s) => s.letter === active) : null;

  const positions = STEPS.map((_, i) => {
    const t = -Math.PI / 2 + (i / STEPS.length) * Math.PI * 2;
    return { angle: t, ...polar(R_NODE, t) };
  });

  function arcBetween(i: number, j: number) {
    const a = positions[i];
    const b = positions[j];
    const r = R_NODE - 6;
    return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
  }

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[520px] h-auto"
            role="img" aria-label="The ACTS prayer pattern: Adoration, Confession, Thanksgiving, Supplication.">
            <defs>
              <radialGradient id="ap-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.6" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
              <marker id="ap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(254 215 170 / 0.7)" />
              </marker>
            </defs>

            <circle cx={CX} cy={CY} r={120} fill="url(#ap-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Arrowed arcs */}
            {STEPS.map((_, i) => {
              const next = (i + 1) % STEPS.length;
              return (
                <path
                  key={`arc-${i}`}
                  d={arcBetween(i, next)}
                  fill="none"
                  stroke="rgb(254 215 170 / 0.55)"
                  strokeWidth={1.5}
                  markerEnd="url(#ap-arrow)"
                  style={{
                    strokeDasharray: 380,
                    strokeDashoffset: drawn ? 0 : 380,
                    transition: `stroke-dashoffset 900ms ease ${600 + i * 150}ms`,
                  }}
                />
              );
            })}

            {/* Step nodes */}
            {STEPS.map((s, i) => {
              const p = positions[i];
              const lp = polar(R_LABEL, p.angle);
              const isOn = active === s.letter;
              return (
                <g
                  key={s.letter}
                  tabIndex={0}
                  role="button"
                  aria-label={s.word}
                  onMouseEnter={() => setActive(s.letter)}
                  onMouseLeave={() => setActive((c) => (c === s.letter ? null : c))}
                  onFocus={() => setActive(s.letter)}
                  onClick={() => setActive((c) => (c === s.letter ? null : s.letter))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${400 + i * 180}ms`,
                  }}
                >
                  {isOn && <circle cx={p.x} cy={p.y} r={36} fill="none" stroke={s.color} strokeWidth={1.4} opacity={0.55} />}
                  <circle cx={p.x} cy={p.y} r={isOn ? 32 : 28} fill={s.color} stroke="rgb(15 23 42)" strokeWidth={1.5} />
                  <text x={p.x} y={p.y + 6} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "700 22px ui-serif, Georgia, serif", letterSpacing: "0.04em" }}>
                    {s.letter}
                  </text>
                  <text x={lp.x} y={lp.y - 4} textAnchor="middle" className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{ font: `${isOn ? "600" : "500"} 12px ui-serif, Georgia, serif`, transition: "fill 200ms" }}>
                    {s.word}
                  </text>
                  <text x={lp.x} y={lp.y + 10} textAnchor="middle" className="fill-ink-300"
                    style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                    {s.ref}
                  </text>
                </g>
              );
            })}

            {/* Centre */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1300ms" }}>
              <circle cx={CX} cy={CY} r={50} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 4} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                pattern
              </text>
              <text x={CX} y={CY + 16} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 22px ui-serif, Georgia, serif", letterSpacing: "0.15em" }}>
                A·C·T·S
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? "This step" : "An ancient shape"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.word}</h3>
              <p className="mt-2 text-ink-200">{focused.short}</p>
              <p className="mt-3 text-[11px] text-flame-300/90 italic border-l-2 border-flame-500/60 pl-3">
                &ldquo;{focused.scripture}&rdquo;
                <span className="block text-flame-300 mt-1 not-italic">— {focused.ref}</span>
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Pray with shape.</h3>
              <p className="mt-2 text-ink-200 italic">
                Adoration → Confession → Thanksgiving → Supplication. Christians have prayed
                in this rhythm for centuries. Hover any letter to read it.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
