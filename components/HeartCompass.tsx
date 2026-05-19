"use client";

import { useEffect, useState } from "react";

// ─── Heart compass ─────────────────────────────────────────────
// Eight Christian practices arranged on a compass rose. Each arrow points
// inward to a centre marked "Christ." Disciplines do not deliver us to
// Christ on their own; they orient us toward Him.

type Direction = {
  id: string;
  label: string;
  note: string;
  ref: string;
  angle: number;     // radians, 0 = right, increases clockwise on screen
  color: string;
};

const VIEW = 540;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_TIP = 220;     // arrowhead distance
const R_LABEL = 250;   // label distance
const R_INNER = 80;    // arrow base

const POINTS: Direction[] = [
  { id: "word",       label: "Word",        note: "Scripture read, prayed, obeyed.",                   ref: "Joshua 1:8",        angle: -Math.PI / 2,                       color: "#facc15" },
  { id: "prayer",     label: "Prayer",      note: "Speaking and listening, in His name.",              ref: "1 Thess 5:17",      angle: -Math.PI / 2 + Math.PI / 4,         color: "#ea580c" },
  { id: "fellowship", label: "Fellowship",  note: "The Body in person. Two or three gathered.",        ref: "Hebrews 10:24-25",  angle: 0,                                  color: "#dc2626" },
  { id: "service",    label: "Service",     note: "Hands and feet doing what He sees and rewards.",    ref: "Matthew 25:40",     angle: Math.PI / 4,                        color: "#b91c1c" },
  { id: "sabbath",    label: "Sabbath",     note: "Trust in the form of stopping.",                    ref: "Mark 2:27",         angle: Math.PI / 2,                        color: "#7c3aed" },
  { id: "confession", label: "Confession",  note: "Honest, specific, before God and one friend.",      ref: "James 5:16",        angle: Math.PI / 2 + Math.PI / 4,          color: "#1d4ed8" },
  { id: "fasting",    label: "Fasting",     note: "Hollowing out so the heart can hear.",              ref: "Matthew 6:16-18",   angle: Math.PI,                            color: "#0d9488" },
  { id: "witness",    label: "Witness",     note: "Telling what we have seen of Him.",                 ref: "Acts 1:8",          angle: -Math.PI / 2 - Math.PI / 4,         color: "#16a34a" },
];

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function HeartCompass() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? POINTS.find((p) => p.id === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[520px] h-auto"
            role="img" aria-label="A compass of eight Christian practices, all pointing inward to Christ at the centre.">
            <defs>
              <radialGradient id="hc-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.8" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
              <marker id="hc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(254 215 170)" />
              </marker>
            </defs>

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={120} fill="url(#hc-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Light ring guide */}
            <circle cx={CX} cy={CY} r={R_TIP} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth={1} />

            {/* Arrows (each pointing INWARD — from tip toward centre base) */}
            {POINTS.map((p, i) => {
              const tip = polar(R_TIP, p.angle);
              const base = polar(R_INNER + 4, p.angle);
              const isOn = active === p.id;
              return (
                <line
                  key={`arrow-${p.id}`}
                  x1={tip.x}
                  y1={tip.y}
                  x2={base.x}
                  y2={base.y}
                  stroke={isOn ? p.color : "rgb(254 215 170 / 0.55)"}
                  strokeWidth={isOn ? 2.4 : 1.6}
                  strokeLinecap="round"
                  markerEnd="url(#hc-arrow)"
                  style={{
                    strokeDasharray: 240,
                    strokeDashoffset: drawn ? 0 : 240,
                    transition: `stroke-dashoffset 1100ms ease ${400 + i * 110}ms, stroke 200ms`,
                  }}
                />
              );
            })}

            {/* Direction nodes (small dots at the tip + labels outside) */}
            {POINTS.map((p, i) => {
              const tip = polar(R_TIP, p.angle);
              const lp = polar(R_LABEL, p.angle);
              const isOn = active === p.id;
              return (
                <g
                  key={p.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.label}: ${p.note}`}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive((c) => (c === p.id ? null : c))}
                  onFocus={() => setActive(p.id)}
                  onClick={() => setActive((c) => (c === p.id ? null : p.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${700 + i * 90}ms`,
                  }}
                >
                  {isOn && <circle cx={tip.x} cy={tip.y} r={13} fill="none" stroke={p.color} strokeWidth={1.4} opacity={0.55} />}
                  <circle cx={tip.x} cy={tip.y} r={isOn ? 8 : 6} fill={p.color} stroke="rgb(15 23 42)" strokeWidth={1.2} />
                  <text x={lp.x} y={lp.y + 4} textAnchor="middle"
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{ font: `${isOn ? "600" : "500"} 12px ui-serif, Georgia, serif`, transition: "fill 200ms" }}>
                    {p.label}
                  </text>
                </g>
              );
            })}

            {/* Centre — Christ */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1400ms" }}>
              <circle cx={CX} cy={CY} r={56} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 6} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                true north
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
            {focused ? "This direction" : "Eight directions, one North"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.label}</h3>
              <p className="mt-2 text-ink-200 italic">&ldquo;{focused.note}&rdquo;</p>
              <p className="mt-2 text-[11px] text-flame-300">{focused.ref}</p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">All arrows point inward.</h3>
              <p className="mt-2 text-ink-200 italic">
                Disciplines do not save. They orient. Each practice — Word, prayer,
                fellowship, service, Sabbath, confession, fasting, witness — turns the
                heart toward true North.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
