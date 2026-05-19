"use client";

import { useEffect, useMemo, useState } from "react";

// ─── Footsteps of Christ ───────────────────────────────────────
// A schematic walk through the geographies of Jesus' earthly ministry.
// Plays one step at a time: each tap of "Next" reveals one node, draws
// the line from the previous, and lifts the new place name into focus.
// "Auto-play" walks the whole story; "Restart" goes back to Bethlehem.

type Step = {
  id: string;
  place: string;
  event: string;
  ref: string;
  x: number;
  y: number;
  region?: "Galilee" | "Judea" | "Samaria" | "Wilderness";
  major?: boolean;
};

const VIEW_W = 1200;
const VIEW_H = 520;

// Positions laid out to give every label its own breathing room. Galilee
// up north, Judea south, wilderness east. Not strict cartography — the
// disclaimer at top calls it out.
const STEPS: Step[] = [
  { id: "bethlehem",  place: "Bethlehem",             event: "Born of Mary",                                ref: "Luke 2:7",       x: 200, y: 400, region: "Judea",     major: true },
  { id: "nazareth",   place: "Nazareth",              event: "Grew up in obscurity",                        ref: "Luke 2:39",      x: 310, y: 110, region: "Galilee" },
  { id: "jordan",     place: "Jordan River",          event: "Baptized by John",                            ref: "Matthew 3:13",   x: 470, y: 230, region: "Judea" },
  { id: "wilderness", place: "Wilderness",            event: "Forty days · tempted",                        ref: "Matthew 4:1",    x: 580, y: 290, region: "Wilderness" },
  { id: "galilee",    place: "Capernaum & the Sea",   event: "Ministry base; first disciples",              ref: "Matthew 4:13",   x: 410, y: 80,  region: "Galilee", major: true },
  { id: "philippi",   place: "Caesarea Philippi",     event: "“You are the Christ.”",            ref: "Matthew 16:16",  x: 560, y: 60,  region: "Galilee" },
  { id: "tabor",      place: "Mount of Transfiguration", event: "Glory revealed",                            ref: "Matthew 17:1",   x: 700, y: 110, region: "Galilee" },
  { id: "bethany",    place: "Bethany",               event: "Lazarus raised",                              ref: "John 11:43",     x: 830, y: 330, region: "Judea" },
  { id: "olivet",     place: "Mount of Olives",       event: "Wept over the city",                          ref: "Luke 19:41",     x: 910, y: 295, region: "Judea" },
  { id: "gethsemane", place: "Gethsemane",            event: "Agony · arrest",                              ref: "Matthew 26:36",  x: 960, y: 355, region: "Judea" },
  { id: "golgotha",   place: "Golgotha",              event: "Crucified",                                   ref: "John 19:17",     x: 1020, y: 405, region: "Judea", major: true },
  { id: "tomb",       place: "The Empty Tomb",        event: "Risen on the third day",                      ref: "Luke 24:6",      x: 1080, y: 340, region: "Judea", major: true },
  { id: "emmaus",     place: "Emmaus",                event: "Hearts burning at the breaking of bread",     ref: "Luke 24:30",     x: 950,  y: 440, region: "Judea" },
  { id: "ascension",  place: "Mount of Olives (Ascension)", event: "Ascended; will return the same way",    ref: "Acts 1:9",       x: 1130, y: 240, region: "Judea" },
];

const AUTOPLAY_MS = 1800;

export default function ChristsFootsteps() {
  // step = how many nodes are revealed. 0 = none, STEPS.length = all.
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);

  // Reveal the first node shortly after mount.
  useEffect(() => {
    const t = window.setTimeout(() => setStep((s) => (s === 0 ? 1 : s)), 350);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-play advances on a timer.
  useEffect(() => {
    if (!auto) return;
    if (step >= STEPS.length) {
      setAuto(false);
      return;
    }
    const t = window.setTimeout(() => setStep((s) => Math.min(STEPS.length, s + 1)), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [auto, step]);

  function next() {
    setAuto(false);
    setStep((s) => Math.min(STEPS.length, s + 1));
  }
  function prev() {
    setAuto(false);
    setStep((s) => Math.max(0, s - 1));
  }
  function restart() {
    setAuto(false);
    setStep(0);
    window.setTimeout(() => setStep(1), 60);
  }

  // Segments. The k-th segment connects STEPS[k] to STEPS[k+1] and is
  // revealed once step > k+1 (i.e. both endpoints showing).
  const segments = useMemo(() => {
    const out: { i: number; d: string }[] = [];
    for (let i = 0; i < STEPS.length - 1; i++) {
      const prev = STEPS[i];
      const curr = STEPS[i + 1];
      const mx = (prev.x + curr.x) / 2;
      const my = (prev.y + curr.y) / 2 + (i % 2 === 0 ? -22 : 22);
      out.push({ i, d: `M ${prev.x} ${prev.y} Q ${mx} ${my}, ${curr.x} ${curr.y}` });
    }
    return out;
  }, []);

  const activeIdx = step > 0 ? step - 1 : -1;
  const activeStep = activeIdx >= 0 ? STEPS[activeIdx] : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      {/* Step header — date / place / event */}
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            Step {Math.max(1, step)} of {STEPS.length}
            {activeStep?.region && <> · {activeStep.region}</>}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-0.5 leading-snug">
            {activeStep ? activeStep.place : "His earthly walk"}
          </h3>
          {activeStep && (
            <p className="text-sm text-ink-200 italic mt-0.5">
              <span className="text-flame-300 not-italic">{activeStep.ref}</span>
              <span className="mx-2 text-ink-500">·</span>
              {activeStep.event}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={step <= 1}
            className="rounded-full border border-ink-700/60 bg-ink-800/60 px-3 py-1.5 text-xs text-ink-100 hover:border-flame-400 disabled:opacity-40 disabled:hover:border-ink-700/60"
            aria-label="Previous step"
          >
            ← Previous
          </button>
          <button
            onClick={() => setAuto((v) => !v)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border ${
              auto
                ? "bg-flame-600 text-ink-50 border-flame-500"
                : "bg-ink-800/60 text-ink-100 border-ink-700/60 hover:border-flame-400"
            }`}
            aria-pressed={auto}
          >
            {auto ? "■ Pause" : "▶ Auto-play"}
          </button>
          <button
            onClick={next}
            disabled={step >= STEPS.length}
            className="rounded-full bg-flame-600 hover:bg-flame-700 px-3 py-1.5 text-xs text-ink-50 disabled:opacity-40 disabled:hover:bg-flame-600"
            aria-label="Next step"
          >
            Next →
          </button>
          <button
            onClick={restart}
            className="rounded-full border border-ink-700/60 bg-ink-800/60 px-3 py-1.5 text-xs text-ink-300 hover:border-flame-400 hover:text-ink-100"
            aria-label="Restart"
          >
            ↺
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1.5 rounded-full bg-ink-800/60 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-flame-300 via-flame-500 to-flame-300 transition-all duration-700"
          style={{ width: `${(step / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block w-full min-w-[900px] h-auto"
          role="img"
          aria-label={`A schematic step-by-step map of Jesus' earthly ministry. Currently showing step ${Math.max(1, step)} of ${STEPS.length}.`}
        >
          <defs>
            <radialGradient id="cf-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.7" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cf-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(254 215 170)" />
              <stop offset="55%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 240 199)" />
            </linearGradient>
          </defs>

          {/* Compass corner */}
          <g style={{ opacity: 0.75 }}>
            <text x={56} y={50} className="fill-ink-200"
              style={{ font: "italic 12px ui-serif, Georgia, serif", letterSpacing: "0.1em" }}>
              N ↑
            </text>
            <text x={56} y={68} className="fill-ink-300"
              style={{ font: "italic 11px ui-serif, Georgia, serif" }}>
              schematic · not to scale
            </text>
          </g>

          {/* Region labels — placed where they won't conflict */}
          <text x={210} y={50} textAnchor="middle" className="fill-ink-200"
            style={{ font: "italic 600 13px ui-sans-serif, system-ui", letterSpacing: "0.22em", opacity: 0.8 }}>
            GALILEE
          </text>
          <text x={600} y={490} textAnchor="middle" className="fill-ink-200"
            style={{ font: "italic 600 13px ui-sans-serif, system-ui", letterSpacing: "0.22em", opacity: 0.8 }}>
            JUDEA
          </text>
          <text x={300} y={490} textAnchor="middle" className="fill-ink-300"
            style={{ font: "italic 600 13px ui-sans-serif, system-ui", letterSpacing: "0.22em", opacity: 0.55 }}>
            SAMARIA
          </text>
          <text x={1050} y={50} textAnchor="middle" className="fill-ink-300"
            style={{ font: "italic 600 13px ui-sans-serif, system-ui", letterSpacing: "0.22em", opacity: 0.55 }}>
            WILDERNESS
          </text>

          {/* Resurrection glow at the empty tomb — appears when reached */}
          <circle
            cx={STEPS.find((s) => s.id === "tomb")!.x}
            cy={STEPS.find((s) => s.id === "tomb")!.y}
            r={90}
            fill="url(#cf-glow)"
            style={{
              opacity: step >= STEPS.findIndex((s) => s.id === "tomb") + 1 ? 1 : 0,
              transition: "opacity 1400ms ease",
            }}
          />

          {/* Segments — each appears when its endpoint is reached */}
          {segments.map((seg) => {
            const visible = step >= seg.i + 2; // both endpoints must be shown
            return (
              <path
                key={`seg-${seg.i}`}
                d={seg.d}
                fill="none"
                stroke="url(#cf-line)"
                strokeWidth={3}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 320,
                  strokeDashoffset: visible ? 0 : 320,
                  opacity: visible ? 1 : 0,
                  transition: "stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1), opacity 350ms ease",
                }}
              />
            );
          })}

          {/* Nodes */}
          {STEPS.map((s, i) => {
            const shown = step > i;
            const isActive = activeIdx === i;
            const r = s.major ? 11 : 8;
            const labelOffset = (() => {
              // Active label takes a larger position so it doesn't crowd siblings.
              // For dense cluster (Jerusalem ones) push labels further out, alternating.
              const above = i % 2 === 0;
              return {
                x: 0,
                y: above ? -(r + 18) : (r + 22),
                anchor: "middle" as const,
                above,
              };
            })();

            const labelFontSize = isActive ? 16 : s.major ? 13 : 12;
            const labelWeight = isActive ? 700 : s.major ? 600 : 500;
            const labelFill = isActive ? "rgb(254 240 199)" : s.major ? "rgb(254 215 170)" : "rgb(226 232 240)";

            return (
              <g
                key={s.id}
                style={{
                  opacity: shown ? 1 : 0,
                  transition: "opacity 600ms ease",
                }}
              >
                {/* Ring under active node */}
                {isActive && (
                  <>
                    <circle cx={s.x} cy={s.y} r={r + 16} fill="none" stroke="rgb(249 115 22)" strokeWidth={1.2} opacity={0.5}
                      style={{ animation: shown ? "cfPulse 2.2s ease-in-out infinite" : undefined, transformOrigin: `${s.x}px ${s.y}px` }} />
                    <circle cx={s.x} cy={s.y} r={r + 7} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.4} opacity={0.75} />
                  </>
                )}
                {/* Major events get a subtle ring even when not active */}
                {!isActive && s.major && (
                  <circle cx={s.x} cy={s.y} r={r + 5} fill="none" stroke="rgb(254 215 170)" strokeWidth={1} opacity={0.4} />
                )}

                {/* Marker */}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={isActive ? r + 2 : r}
                  fill={s.major ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)"
                  strokeWidth={1.5}
                />

                {/* Step number badge */}
                <text
                  x={s.x}
                  y={s.y + (s.major ? 4 : 4)}
                  textAnchor="middle"
                  style={{
                    font: "700 11px ui-sans-serif, system-ui",
                    fill: "rgb(15 23 42)",
                    pointerEvents: "none",
                  }}
                >
                  {i + 1}
                </text>

                {/* Label background pill (only for active to ensure legibility) */}
                {isActive && (
                  <rect
                    x={s.x - estimateWidth(s.place, labelFontSize) / 2 - 8}
                    y={s.y + labelOffset.y - labelFontSize - 4}
                    width={estimateWidth(s.place, labelFontSize) + 16}
                    height={labelFontSize + 10}
                    rx={6}
                    fill="rgb(15 23 42 / 0.85)"
                    stroke="rgb(249 115 22)"
                    strokeWidth={1.2}
                  />
                )}

                {/* Place label */}
                <text
                  x={s.x}
                  y={s.y + labelOffset.y}
                  textAnchor={labelOffset.anchor}
                  style={{
                    font: `${labelWeight} ${labelFontSize}px ui-serif, Georgia, serif`,
                    fill: labelFill,
                    letterSpacing: "0.01em",
                  }}
                >
                  {s.place}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Step-dots strip — clickable */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {STEPS.map((s, i) => {
          const shown = step > i;
          const isActive = activeIdx === i;
          return (
            <button
              key={`dot-${s.id}`}
              onClick={() => {
                setAuto(false);
                setStep(i + 1);
              }}
              aria-label={`Jump to step ${i + 1}: ${s.place}`}
              className={`group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
                isActive
                  ? "bg-flame-600 text-ink-50 border-flame-300 font-medium"
                  : shown
                  ? "bg-ink-700/60 text-ink-100 border-flame-300/30"
                  : "bg-ink-800/40 text-ink-400 border-ink-700/40 hover:border-flame-400/40 hover:text-ink-200"
              }`}
            >
              <span className="text-[9px] uppercase tracking-widest opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span>{s.place}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes cfPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
      `}</style>
    </figure>
  );
}

// Rough text width estimate for sizing the active label pill. Serif at ~13px
// averages around 7px per char; bigger for larger fonts. Good enough for a
// pleasant pill with margin.
function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.55;
}
