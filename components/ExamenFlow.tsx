"use client";

import { useEffect, useState } from "react";

// ─── Examen — the four-step evening rhythm ─────────────────────
// The classical examen has more steps in some traditions; we use the four
// that match our /examen tool: gratitude, encounter, conviction, longing.
// Arranged as a circle with arrows so the eye walks the rhythm.

type Step = {
  id: "gratitude" | "encounter" | "conviction" | "longing";
  label: string;
  verb: string;
  prompt: string;
  ref: string;
  color: string;
};

const STEPS: Step[] = [
  { id: "gratitude",  label: "Thank",     verb: "Gratitude",    prompt: "Where was God good today? Name it specifically.",                            ref: "1 Thessalonians 5:18", color: "#facc15" },
  { id: "encounter",  label: "Notice",    verb: "Encounter",    prompt: "Where did you sense Him? In whom, when, in what?",                            ref: "Psalm 16:11",          color: "#ea580c" },
  { id: "conviction", label: "Repent",    verb: "Conviction",   prompt: "Where did you grieve Him? Be specific. Ask forgiveness.",                     ref: "1 John 1:9",           color: "#dc2626" },
  { id: "longing",    label: "Ask",       verb: "Longing",      prompt: "What do you ask of God for tomorrow? Pray it before sleep.",                  ref: "Psalm 5:3",            color: "#7c3aed" },
];

const VIEW = 540;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_NODE = 180;
const R_LABEL = 220;

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function ExamenFlow() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? STEPS.find((s) => s.id === active) : null;

  // Compute positions (start at 12 o'clock, go clockwise)
  const positions = STEPS.map((_, i) => {
    const t = -Math.PI / 2 + (i / STEPS.length) * Math.PI * 2;
    return { angle: t, ...polar(R_NODE, t) };
  });

  // Arc-arrow path between adjacent steps (arc around the centre)
  function arcBetween(i: number, j: number) {
    const a = positions[i];
    const b = positions[j];
    const r = R_NODE - 8;
    return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
  }

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[520px] h-auto"
            role="img" aria-label="The examen flow: thank, notice, repent, ask.">
            <defs>
              <radialGradient id="ef-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.55" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
              <marker id="ef-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(254 215 170 / 0.7)" />
              </marker>
            </defs>

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={120} fill="url(#ef-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Arcs with arrows */}
            {STEPS.map((_, i) => {
              const next = (i + 1) % STEPS.length;
              return (
                <path
                  key={`arc-${i}`}
                  d={arcBetween(i, next)}
                  fill="none"
                  stroke="rgb(254 215 170 / 0.55)"
                  strokeWidth={1.5}
                  markerEnd="url(#ef-arrow)"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: drawn ? 0 : 400,
                    transition: `stroke-dashoffset 900ms ease ${600 + i * 150}ms`,
                  }}
                />
              );
            })}

            {/* Step nodes */}
            {STEPS.map((s, i) => {
              const p = positions[i];
              const isOn = active === s.id;
              const lp = polar(R_LABEL, p.angle);
              return (
                <g
                  key={s.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${s.verb}: ${s.prompt}`}
                  onMouseEnter={() => setActive(s.id)}
                  onMouseLeave={() => setActive((c) => (c === s.id ? null : c))}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive((c) => (c === s.id ? null : s.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${400 + i * 180}ms`,
                  }}
                >
                  {isOn && (
                    <circle cx={p.x} cy={p.y} r={36} fill="none" stroke={s.color} strokeWidth={1.4} opacity={0.5} />
                  )}
                  <circle cx={p.x} cy={p.y} r={isOn ? 28 : 24} fill={s.color} stroke="rgb(15 23 42)" strokeWidth={1.5} />
                  <text x={p.x} y={p.y - 3} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "700 11px ui-sans-serif, system-ui", letterSpacing: "0.05em" }}>
                    {(i + 1).toString()}
                  </text>
                  <text x={p.x} y={p.y + 11} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "italic 600 11px ui-serif, Georgia, serif" }}>
                    {s.label}
                  </text>
                  <text x={lp.x} y={lp.y - 4} textAnchor="middle" className="fill-ink-300"
                    style={{ font: "600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.04em" }}>
                    {s.verb}
                  </text>
                  <text x={lp.x} y={lp.y + 8} textAnchor="middle" className="fill-ink-300"
                    style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                    {s.ref}
                  </text>
                </g>
              );
            })}

            {/* Centre badge */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1300ms" }}>
              <circle cx={CX} cy={CY} r={48} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 6} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                five minutes
              </text>
              <text x={CX} y={CY + 14} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 18px ui-serif, Georgia, serif", letterSpacing: "0.02em" }}>
                Examen
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? `Step ${STEPS.indexOf(focused) + 1}` : "End the day with Him"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.verb}</h3>
              <p className="mt-2 text-ink-200 italic">&ldquo;{focused.prompt}&rdquo;</p>
              <p className="mt-2 text-[11px] text-flame-300">{focused.ref}</p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Four steps, in order.</h3>
              <p className="mt-2 text-ink-200 italic">
                Thank → notice → repent → ask. Then sleep. Saints have closed
                their day with this rhythm for many centuries.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
