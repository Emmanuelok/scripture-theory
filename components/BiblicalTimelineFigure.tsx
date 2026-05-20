"use client";

import { useMemo } from "react";
import { useStepReveal } from "./figure-utils/useStepReveal";
import StepControls, { StepProgress } from "./figure-utils/StepControls";

// ─── Era anchor positions on a 1200×280 viewBox ────────────────
// X is hand-tuned for visual balance so the Cross sits at the apex (the center),
// with Eternity Past anchoring the left and Until He Comes the right.
// Y is computed from a parabola whose peak is at x = 600 — Christ as the hinge
// of history. Markers further from the center sit lower on the path.

const TIMELINE = { w: 1200, h: 320 };
const PEAK_X = 600;
const PEAK_Y = 90;
const BASE_Y = 230;
const SPAN = 540;

function yAt(x: number) {
  const t = Math.min(1, Math.abs((x - PEAK_X) / SPAN));
  return BASE_Y - (BASE_Y - PEAK_Y) * (1 - t * t);
}

type Era = {
  id: string;
  short: string;
  range: string;
  title: string;
  blurb: string;
  x: number;
  isCross?: boolean;
};

// Widened spacing for the previously-cramped cluster near the Cross
// (Return, Silence) so every label sits on its own.
const ERAS: Era[] = [
  { id: "before-time",     short: "Eternity past",     range: "Before time",                  title: "The eternal Son",            blurb: "Before there was a universe to date, the Father loved the Son in the Spirit.",                                       x:  90 },
  { id: "creation",        short: "Creation",          range: "Genesis 1–11",                 title: "Creation & the Fall",        blurb: "God speaks; a universe is. Humans are made in His image. The long ache of redemption begins.",                       x: 195 },
  { id: "patriarchs",      short: "Patriarchs",        range: "c. 2100–1700 B.C.",           title: "The promise to Abraham",     blurb: "Out of an idolatrous Mesopotamia, God calls Abraham. Land, descendants, a blessing for the nations.",                  x: 295 },
  { id: "exodus",          short: "Exodus & Sinai",    range: "c. 1446 – 1406 B.C.",         title: "Egypt, Exodus, Sinai",       blurb: "Four hundred years in Egypt; a baby in a basket; the Passover; the Law given on a mountain on fire.",                   x: 390 },
  { id: "judges-kings",    short: "Judges & Kings",    range: "c. 1400 – 586 B.C.",          title: "Joshua, Judges, Kings",      blurb: "Israel enters the land. David is anointed. The everlasting-throne promise is given. The kingdom rises, splits, falls.", x: 470 },
  { id: "prophets",        short: "The Prophets",      range: "c. 850 – 430 B.C.",           title: "The Prophets",               blurb: "Across collapse and exile, prophets thunder against idolatry and see further than they say — a Servant, a Bethlehem-born King.", x: 525 },
  { id: "return",          short: "Return",            range: "538 – 432 B.C.",               title: "Return & the second temple", blurb: "Persia lets the exiles go home. Ezra teaches the Law; Nehemiah rebuilds the wall. Malachi seals the Old Testament.",       x: 555 },
  { id: "the-silence",     short: "The Silence",       range: "c. 430 – 4 B.C.",              title: "Four hundred silent years",  blurb: "No prophet speaks. Empires turn — Persia to Greece to Rome. The Septuagint readies the Greek that will carry the gospel.", x: 580 },
  { id: "advent",          short: "Christ",            range: "c. 6/4 B.C. – A.D. 30/33",    title: "The coming of Christ",       blurb: "The Word becomes flesh. Thirty years hidden, three years public, three days that change everything.",                  x: PEAK_X, isCross: true },
  { id: "early-church",    short: "Apostolic Church",  range: "A.D. 30 – c. 100",             title: "The apostolic Church",       blurb: "Pentecost. The first martyrs. Paul on the road. The gospel reaches Rome. The New Testament is written.",                x: 760 },
  { id: "until-He-comes",  short: "Until He comes",    range: "A.D. 95 — the Day",            title: "Until He comes",             blurb: "Two thousand years and still counting. From a hundred and twenty in an upper room to billions across every nation.",  x: 1110 },
];

export default function BiblicalTimelineFigure() {
  const state = useStepReveal(ERAS.length, 1700);
  const { step } = state;
  const activeIdx = step > 0 ? step - 1 : -1;
  const activeEra: Era | null = activeIdx >= 0 ? ERAS[activeIdx] : null;

  // Sampled path for the whole arc — drawn under the markers; segments
  // light up as steps advance.
  const fullPath = useMemo(() => {
    const xs: number[] = [];
    for (let x = 30; x <= TIMELINE.w - 30; x += 6) xs.push(x);
    let d = `M ${xs[0]} ${yAt(xs[0]).toFixed(1)}`;
    for (let i = 1; i < xs.length; i++) {
      d += ` L ${xs[i]} ${yAt(xs[i]).toFixed(1)}`;
    }
    return d;
  }, []);

  // Per-segment paths between successive eras (revealed as step advances).
  const segments = useMemo(() => {
    const out: { i: number; d: string }[] = [];
    for (let i = 0; i < ERAS.length - 1; i++) {
      const a = ERAS[i];
      const b = ERAS[i + 1];
      const xs: number[] = [];
      for (let x = a.x; x <= b.x; x += 4) xs.push(x);
      xs.push(b.x);
      let d = `M ${a.x} ${yAt(a.x).toFixed(1)}`;
      for (const x of xs) d += ` L ${x} ${yAt(x).toFixed(1)}`;
      out.push({ i, d });
    }
    return out;
  }, []);

  function jumpToSection(id: string) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("ring-2", "ring-flame-500", "ring-offset-2", "ring-offset-ink-50");
      window.setTimeout(() => {
        el.classList.remove("ring-2", "ring-flame-500", "ring-offset-2", "ring-offset-ink-50");
      }, 1600);
    }
  }

  return (
    <figure className="mt-8 rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            Step {Math.max(1, step)} of {ERAS.length}
            {activeEra?.range && <> · {activeEra.range}</>}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-0.5 leading-snug">
            {activeEra ? activeEra.title : "The biblical timeline"}
          </h3>
          {activeEra && (
            <p className="text-sm text-ink-200 italic mt-1 max-w-2xl">{activeEra.blurb}</p>
          )}
        </div>
        <StepControls state={state} />
      </div>

      <StepProgress state={state} />

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${TIMELINE.w} ${TIMELINE.h}`}
          className="block w-full min-w-[820px] h-auto"
          role="img"
          aria-label={`Biblical timeline, step ${Math.max(1, step)} of ${ERAS.length}.`}
        >
          <defs>
            <linearGradient id="bt-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="35%" stopColor="rgb(245 158 11)" />
              <stop offset="50%" stopColor="rgb(254 215 170)" />
              <stop offset="65%" stopColor="rgb(245 158 11)" />
              <stop offset="100%" stopColor="rgb(202 138 4)" />
            </linearGradient>
            <radialGradient id="bt-cross-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.85" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Faint guide path under the journey */}
          <path d={fullPath} fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth={10} strokeLinecap="round" />

          {/* Revealed segments */}
          {segments.map((seg) => {
            const visible = step >= seg.i + 2;
            return (
              <path
                key={`seg-${seg.i}`}
                d={seg.d}
                fill="none"
                stroke="url(#bt-line)"
                strokeWidth={3}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: visible ? 0 : 400,
                  opacity: visible ? 1 : 0,
                  transition: "stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1), opacity 350ms ease",
                }}
              />
            );
          })}

          {/* Anchor tags */}
          <text x={70} y={BASE_Y + 50} textAnchor="middle" className="fill-ink-200"
            style={{ font: "italic 11px ui-serif, Georgia, serif", letterSpacing: "0.04em", opacity: 0.75 }}>
            eternity past
          </text>
          <text x={1110} y={BASE_Y + 50} textAnchor="middle" className="fill-ink-200"
            style={{ font: "italic 11px ui-serif, Georgia, serif", letterSpacing: "0.04em", opacity: 0.75 }}>
            the Day He returns
          </text>

          {/* Christ glow — appears once the Cross step is reached */}
          {(() => {
            const crossIdx = ERAS.findIndex((e) => e.isCross);
            const shown = step > crossIdx;
            return (
              <circle
                cx={PEAK_X}
                cy={PEAK_Y}
                r={52}
                fill="url(#bt-cross-glow)"
                style={{
                  opacity: shown ? 1 : 0,
                  transition: "opacity 1200ms ease",
                  transformOrigin: `${PEAK_X}px ${PEAK_Y}px`,
                  animation: shown ? "btPulse 4.5s ease-in-out infinite" : "none",
                }}
              />
            );
          })()}

          {/* Era markers */}
          {ERAS.map((era, i) => {
            const cy = yAt(era.x);
            const shown = step > i;
            const isActive = activeIdx === i;
            const r = era.isCross ? 11 : 7;
            // Alternate above/below to keep labels apart
            const above = i % 2 === 0;
            const labelY = above ? cy - 30 : cy + 36;
            const labelFontSize = isActive ? 15 : era.isCross ? 14 : 12;
            const labelWeight = isActive ? 700 : era.isCross ? 700 : 600;
            const labelFill = isActive ? "rgb(254 240 199)" : era.isCross ? "rgb(254 215 170)" : "rgb(226 232 240)";
            return (
              <g
                key={era.id}
                style={{
                  opacity: shown ? 1 : 0,
                  transition: "opacity 500ms ease",
                  cursor: "pointer",
                }}
                onClick={() => activeEra && jumpToSection(era.id)}
              >
                {/* Halo for active */}
                {isActive && (
                  <circle cx={era.x} cy={cy} r={r + 12} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.4} opacity={0.7} />
                )}
                {era.isCross ? (
                  <g transform={`translate(${era.x} ${cy})`}>
                    <rect x={-2} y={-14} width={4} height={28} fill="rgb(254 215 170)" rx={1} />
                    <rect x={-8} y={-5} width={16} height={4} fill="rgb(254 215 170)" rx={1} />
                  </g>
                ) : (
                  <circle
                    cx={era.x}
                    cy={cy}
                    r={isActive ? r + 1 : r}
                    fill={isActive ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1.4}
                  />
                )}
                {/* Pill behind the active label so it's always legible */}
                {isActive && (
                  <rect
                    x={era.x - estimateWidth(era.short, labelFontSize) / 2 - 8}
                    y={labelY - labelFontSize - 4}
                    width={estimateWidth(era.short, labelFontSize) + 16}
                    height={labelFontSize + 10}
                    rx={6}
                    fill="rgb(15 23 42 / 0.85)"
                    stroke="rgb(249 115 22)"
                    strokeWidth={1.2}
                  />
                )}
                <text
                  x={era.x}
                  y={labelY}
                  textAnchor="middle"
                  style={{
                    font: `${labelWeight} ${labelFontSize}px ui-serif, Georgia, serif`,
                    fill: labelFill,
                    letterSpacing: "0.01em",
                  }}
                >
                  {era.short}
                </text>
              </g>
            );
          })}

          {/* Caption above the apex */}
          {step >= ERAS.findIndex((e) => e.isCross) + 1 && (
            <text x={PEAK_X} y={PEAK_Y - 44} textAnchor="middle" className="fill-flame-100"
              style={{ font: "italic 700 14px ui-serif, Georgia, serif", letterSpacing: "0.02em" }}>
              Jesus is the hinge of history.
            </text>
          )}
        </svg>
      </div>

      {/* Jump-to chip strip */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {ERAS.map((e, i) => {
          const shown = step > i;
          const isActive = activeIdx === i;
          return (
            <button
              key={`era-chip-${e.id}`}
              onClick={() => state.jumpTo(i + 1)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
                isActive
                  ? "bg-flame-600 text-ink-50 border-flame-300 font-medium"
                  : shown
                  ? "bg-ink-700/60 text-ink-100 border-flame-300/30"
                  : "bg-ink-800/40 text-ink-400 border-ink-700/40 hover:border-flame-400/40 hover:text-ink-200"
              }`}
              aria-label={`Step ${i + 1}: ${e.short}`}
            >
              <span className="text-[9px] uppercase tracking-widest opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span>{e.short}</span>
            </button>
          );
        })}
      </div>

      {/* Read-this-era CTA */}
      {activeEra && (
        <div className="mt-3">
          <button
            onClick={() => jumpToSection(activeEra.id)}
            className="rounded-full bg-flame-600 hover:bg-flame-700 text-ink-50 px-4 py-1.5 text-xs"
          >
            Read {activeEra.short.toLowerCase()} ↓
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes btPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.06); }
        }
      `}</style>
    </figure>
  );
}

function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.55;
}
