"use client";

import { useEffect, useState } from "react";

// ─── The Sending Compass ───────────────────────────────────────
// The mirror of the Heart Compass. Where the heart's disciplines point
// INWARD to Christ, the Great Commission sends FIVE rays OUTWARD from
// Christ to the world. The believer's life has two compasses — one
// gathering, one going.

type Ray = {
  id: string;
  label: string;
  phrase: string;
  ref: string;
  short: string;
  angle: number;     // radians, 0 = right, increases clockwise on screen
  color: string;
};

const VIEW = 560;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_TIP = 220;
const R_LABEL = 250;
const R_INNER = 80;

// Five rays at pentagram angles, starting at the top and going clockwise.
const RAYS: Ray[] = [
  {
    id: "authority",
    label: "All authority",
    phrase: "All authority in heaven and on earth has been given to Me.",
    ref: "Matthew 28:18",
    short: "The basis of every sending. Not our courage. His authority.",
    angle: -Math.PI / 2,
    color: "#facc15",
  },
  {
    id: "go",
    label: "Go",
    phrase: "Go therefore…",
    ref: "Matthew 28:19",
    short: "The movement. Most disciples wait to be called somewhere; He has already sent us everywhere.",
    angle: -Math.PI / 2 + (2 * Math.PI) / 5,
    color: "#ea580c",
  },
  {
    id: "disciple",
    label: "Make disciples",
    phrase: "Make disciples of all nations.",
    ref: "Matthew 28:19",
    short: "Not converts only. Disciples — taught, baptised, gathered into a body, sent again.",
    angle: -Math.PI / 2 + (4 * Math.PI) / 5,
    color: "#dc2626",
  },
  {
    id: "baptize",
    label: "Baptize",
    phrase: "Baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    ref: "Matthew 28:19",
    short: "The public marker. Buried with Christ; raised with Him; named with the Triune Name.",
    angle: -Math.PI / 2 + (6 * Math.PI) / 5,
    color: "#7c3aed",
  },
  {
    id: "teach",
    label: "Teach",
    phrase: "Teaching them to observe all that I have commanded.",
    ref: "Matthew 28:20",
    short: "Not just information. Obedience. The disciple's measure is whether the Master is followed.",
    angle: -Math.PI / 2 + (8 * Math.PI) / 5,
    color: "#1d4ed8",
  },
];

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function SendingCompass() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? RAYS.find((r) => r.id === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_300px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[540px] h-auto"
            role="img" aria-label="A compass of the five sending commands of the Great Commission, radiating outward from Christ at the centre.">
            <defs>
              <radialGradient id="sc-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.95" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
              <marker id="sc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(254 215 170)" />
              </marker>
              <radialGradient id="sc-pulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Outer pulse — Christ's authority radiating */}
            <circle cx={CX} cy={CY} r={R_TIP + 40} fill="url(#sc-pulse)"
              style={{ opacity: drawn ? 0.8 : 0, transition: "opacity 1600ms ease 600ms" }} />

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={140} fill="url(#sc-centre)"
              style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Light ring guide */}
            <circle cx={CX} cy={CY} r={R_TIP} fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth={1} />

            {/* Outgoing rays */}
            {RAYS.map((r, i) => {
              const base = polar(R_INNER + 4, r.angle);
              const tip = polar(R_TIP, r.angle);
              const isOn = active === r.id;
              return (
                <line
                  key={`ray-${r.id}`}
                  x1={base.x}
                  y1={base.y}
                  x2={tip.x}
                  y2={tip.y}
                  stroke={isOn ? r.color : "rgb(254 215 170 / 0.7)"}
                  strokeWidth={isOn ? 2.8 : 2}
                  strokeLinecap="round"
                  markerEnd="url(#sc-arrow)"
                  style={{
                    strokeDasharray: 240,
                    strokeDashoffset: drawn ? 0 : 240,
                    transition: `stroke-dashoffset 1200ms cubic-bezier(.22,1,.36,1) ${500 + i * 150}ms, stroke 200ms`,
                  }}
                />
              );
            })}

            {/* Ray nodes & labels */}
            {RAYS.map((r, i) => {
              const tip = polar(R_TIP, r.angle);
              const lp = polar(R_LABEL, r.angle);
              const isOn = active === r.id;
              return (
                <g
                  key={r.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${r.label}: ${r.phrase}`}
                  onMouseEnter={() => setActive(r.id)}
                  onMouseLeave={() => setActive((c) => (c === r.id ? null : c))}
                  onFocus={() => setActive(r.id)}
                  onClick={() => setActive((c) => (c === r.id ? null : r.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${900 + i * 110}ms`,
                  }}
                >
                  {isOn && <circle cx={tip.x} cy={tip.y} r={16} fill="none" stroke={r.color} strokeWidth={1.5} opacity={0.6} />}
                  <circle cx={tip.x} cy={tip.y} r={isOn ? 10 : 8} fill={r.color} stroke="rgb(15 23 42)" strokeWidth={1.4} />
                  <text x={lp.x} y={lp.y - 4} textAnchor="middle"
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{
                      font: `${isOn ? "700" : "600"} 13px ui-serif, Georgia, serif`,
                      letterSpacing: "0.02em",
                      transition: "fill 200ms",
                    }}>
                    {r.label}
                  </text>
                </g>
              );
            })}

            {/* Centre — Christ + the promise that anchors everything */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1400ms" }}>
              <circle cx={CX} cy={CY} r={62} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.6} />
              <text x={CX} y={CY - 14} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                Matthew 28:20
              </text>
              <text x={CX} y={CY + 4} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 16px ui-serif, Georgia, serif", letterSpacing: "0.02em" }}>
                I am with you
              </text>
              <text x={CX} y={CY + 22} textAnchor="middle" className="fill-flame-100"
                style={{ font: "italic 700 14px ui-serif, Georgia, serif" }}>
                always.
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[12rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? focused.ref : "Five rays, one Sender"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.label}</h3>
              <p className="mt-2 text-ink-100 italic">&ldquo;{focused.phrase}&rdquo;</p>
              <p className="mt-3 text-ink-200">{focused.short}</p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Outward, in His name.</h3>
              <p className="mt-2 text-ink-200 italic">
                His authority. Go. Make disciples. Baptize. Teach. And the centre
                that holds it all together: <span className="text-flame-200">&ldquo;I am with you always.&rdquo;</span>
              </p>
              <p className="mt-3 text-[11px] text-ink-300">
                Hover any ray to read its command and scripture.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
