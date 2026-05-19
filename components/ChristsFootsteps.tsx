"use client";

import { useEffect, useState } from "react";

// ─── Footsteps of Christ ───────────────────────────────────────
// A simplified path through the geographies of Jesus' earthly ministry —
// birth at Bethlehem to ascension on Olivet, with the resurrection
// glow at Jerusalem. Schematic, not strict cartography; the eye walks
// His life in one figure.

type Step = {
  id: string;
  place: string;
  event: string;
  ref: string;
  x: number;
  y: number;
  major?: boolean;
};

const VIEW_W = 1100;
const VIEW_H = 460;

// Schematic layout — north (top) is up; Galilee in the north, Jerusalem south.
const STEPS: Step[] = [
  { id: "bethlehem", place: "Bethlehem",          event: "Born of Mary",                       ref: "Luke 2:7",       x: 580, y: 380, major: true },
  { id: "nazareth",  place: "Nazareth",           event: "Grew up in obscurity",               ref: "Luke 2:39",      x: 560, y: 140 },
  { id: "jordan",    place: "Jordan River",       event: "Baptized by John",                   ref: "Matthew 3:13",   x: 600, y: 220 },
  { id: "wilderness",place: "Wilderness",         event: "Forty days · tempted",                ref: "Matthew 4:1",    x: 700, y: 270 },
  { id: "galilee",   place: "Capernaum & the Sea",event: "Ministry base; first disciples",     ref: "Matthew 4:13",   x: 520, y: 100, major: true },
  { id: "philippi",  place: "Caesarea Philippi",  event: "\"You are the Christ.\"",            ref: "Matthew 16:16",  x: 460, y: 50 },
  { id: "tabor",     place: "Mount of the Transfiguration", event: "Glory revealed",            ref: "Matthew 17:1",   x: 540, y: 70 },
  { id: "bethany",   place: "Bethany",            event: "Lazarus raised",                      ref: "John 11:43",     x: 640, y: 340 },
  { id: "olivet",    place: "Mount of Olives",    event: "Wept over the city",                  ref: "Luke 19:41",     x: 620, y: 350 },
  { id: "gethsemane",place: "Gethsemane",         event: "Agony · arrest",                      ref: "Matthew 26:36",  x: 600, y: 360 },
  { id: "golgotha",  place: "Golgotha",           event: "Crucified",                           ref: "John 19:17",     x: 580, y: 370, major: true },
  { id: "tomb",      place: "The Empty Tomb",     event: "Risen on the third day",              ref: "Luke 24:6",      x: 540, y: 360, major: true },
  { id: "emmaus",    place: "Emmaus",             event: "Hearts burning at the breaking of bread", ref: "Luke 24:30", x: 460, y: 380 },
  { id: "ascension", place: "Mount of Olives",    event: "Ascended; will return the same way",  ref: "Acts 1:9",       x: 660, y: 320 },
];

export default function ChristsFootsteps() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? STEPS.find((s) => s.id === active) : null;

  // Path through all the points (in order)
  const pathD = (() => {
    let d = `M ${STEPS[0].x} ${STEPS[0].y}`;
    for (let i = 1; i < STEPS.length; i++) {
      const prev = STEPS[i - 1];
      const curr = STEPS[i];
      const mx = (prev.x + curr.x) / 2;
      const my = (prev.y + curr.y) / 2 + (i % 2 === 0 ? -22 : 22);
      d += ` Q ${mx} ${my}, ${curr.x} ${curr.y}`;
    }
    return d;
  })();

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label="A schematic map of Jesus' earthly ministry — birth at Bethlehem to the ascension at the Mount of Olives.">
          <defs>
            <radialGradient id="cf-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.65" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cf-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(254 215 170)" />
              <stop offset="55%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 240 199)" />
            </linearGradient>
          </defs>

          {/* Decorative compass rose top-left */}
          <g style={{ opacity: drawn ? 0.7 : 0, transition: "opacity 1200ms ease 1000ms" }}>
            <text x={60} y={50} className="fill-ink-300" style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.1em" }}>N ↑</text>
            <text x={60} y={66} className="fill-ink-500" style={{ font: "italic 9px ui-serif, Georgia, serif" }}>schematic, not to scale</text>
          </g>

          {/* Region labels */}
          <text x={350} y={55} textAnchor="middle" className="fill-ink-400"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.16em", opacity: drawn ? 0.85 : 0, transition: "opacity 900ms ease 1100ms" }}>
            GALILEE
          </text>
          <text x={400} y={250} textAnchor="middle" className="fill-ink-400"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.16em", opacity: drawn ? 0.85 : 0, transition: "opacity 900ms ease 1200ms" }}>
            SAMARIA
          </text>
          <text x={500} y={420} textAnchor="middle" className="fill-ink-400"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.16em", opacity: drawn ? 0.85 : 0, transition: "opacity 900ms ease 1300ms" }}>
            JUDEA
          </text>
          <text x={900} y={300} textAnchor="middle" className="fill-ink-400"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.16em", opacity: drawn ? 0.85 : 0, transition: "opacity 900ms ease 1400ms" }}>
            WILDERNESS
          </text>

          {/* Resurrection glow at the empty tomb */}
          <circle cx={540} cy={360} r={80} fill="url(#cf-glow)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 1600ms ease 1800ms" }} />

          {/* Path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#cf-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 2400,
              strokeDashoffset: drawn ? 0 : 2400,
              transition: "stroke-dashoffset 2800ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Steps */}
          {STEPS.map((s, i) => {
            const isOn = active === s.id;
            const r = s.major ? 8 : 5;
            return (
              <g
                key={s.id}
                tabIndex={0}
                role="button"
                aria-label={`${s.place}: ${s.event}`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive((c) => (c === s.id ? null : c))}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive((c) => (c === s.id ? null : s.id))}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${600 + i * 90}ms`,
                }}
              >
                {(isOn || s.major) && (
                  <circle cx={s.x} cy={s.y} r={r + 7} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.2} opacity={0.55} />
                )}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={isOn ? r + 2 : r}
                  fill={s.major ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)"
                  strokeWidth={1.2}
                />
                {/* Number badge */}
                <text x={s.x} y={s.y - r - 8} textAnchor="middle" className="fill-ink-400"
                  style={{ font: "italic 8px ui-serif, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                {/* Place label, alternating sides */}
                <text
                  x={s.x + (i % 2 === 0 ? 14 : -14)}
                  y={s.y + 4}
                  textAnchor={i % 2 === 0 ? "start" : "end"}
                  className={isOn ? "fill-flame-200" : s.major ? "fill-flame-100" : "fill-ink-100"}
                  style={{ font: `${s.major ? "600" : "500"} 10.5px ui-serif, Georgia, serif`, transition: "fill 200ms" }}
                >
                  {s.place}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 min-h-[3rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">{focused.ref}</span>
            <span className="font-serif text-ink-50">{focused.place}.</span>
            <span className="ml-2 text-ink-300 italic">{focused.event}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            A schematic walk of His earthly steps — from Bethlehem's manger to Olivet's
            ascension, with the empty tomb at the centre of the glow. Hover any node.
          </span>
        )}
      </div>
    </figure>
  );
}
