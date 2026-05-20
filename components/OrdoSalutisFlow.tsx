"use client";

import { useMemo } from "react";
import { useStepReveal } from "./figure-utils/useStepReveal";
import StepControls, { StepProgress } from "./figure-utils/StepControls";

// ─── Ordo Salutis — the order of salvation ─────────────────────
// Romans 8:29-30 lists the chain: foreknew → predestined → called → justified
// → glorified. The church has expanded this into a fuller ordo. The figure
// walks the chain one link at a time, with the active step's name and
// scripture pulled to large, readable text. Christians frame the order
// differently; all confess every link is grace.

type Stage = {
  id: string;
  label: string;
  blurb: string;
  ref: string;
};

const STAGES: Stage[] = [
  { id: "election",      label: "Election",       blurb: "God set His love on us before the foundation of the world.",                    ref: "Ephesians 1:4" },
  { id: "calling",       label: "Calling",        blurb: "The Spirit summons by the gospel — outwardly through the Word, inwardly to the heart.", ref: "Romans 8:30" },
  { id: "regeneration",  label: "New birth",      blurb: "We are born again from above; the dead heart is made alive.",                   ref: "John 3:3-8" },
  { id: "faith",         label: "Faith & repentance", blurb: "We turn — from sin, toward Christ. Faith is the empty hand that receives.",   ref: "Mark 1:15" },
  { id: "justification", label: "Justification",  blurb: "God declares us righteous in Christ — not because we are, but because He is.",  ref: "Romans 5:1" },
  { id: "adoption",      label: "Adoption",       blurb: "We are received into the family. We get a new Father, a new name, an inheritance.", ref: "Galatians 4:4-7" },
  { id: "sanctification",label: "Sanctification", blurb: "The slow, real work of being made like Christ — the Spirit's daily project.",   ref: "Philippians 2:13" },
  { id: "perseverance",  label: "Perseverance",   blurb: "Those truly in Christ are kept by Him to the end. He does not lose what He bought.", ref: "John 10:28-29" },
  { id: "glorification", label: "Glorification",  blurb: "Body raised, sin gone, sight of Him face to face. The last link finishes us.",  ref: "1 John 3:2" },
];

const VIEW_W = 1300;
const VIEW_H = 340;

export default function OrdoSalutisFlow() {
  const state = useStepReveal(STAGES.length, 1700);
  const { step } = state;
  const activeIdx = step > 0 ? step - 1 : -1;
  const focused = activeIdx >= 0 ? STAGES[activeIdx] : null;

  // Positions: evenly spaced across width, alternating up/down
  const xs = useMemo(() => STAGES.map((_, i) => 90 + (i * (VIEW_W - 180)) / (STAGES.length - 1)), []);
  const Y_MID = 170;

  // Gentle alternating curve — same shape as before, but per-segment so we
  // can reveal it step by step.
  const segments = useMemo(() => {
    const out: { i: number; d: string }[] = [];
    for (let i = 0; i < STAGES.length - 1; i++) {
      const a = xs[i];
      const b = xs[i + 1];
      const mid = (a + b) / 2;
      const yOff = i % 2 === 0 ? Y_MID - 24 : Y_MID + 24;
      out.push({ i, d: `M ${a} ${Y_MID} Q ${mid} ${yOff}, ${b} ${Y_MID}` });
    }
    return out;
  }, [xs]);

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            Step {Math.max(1, step)} of {STAGES.length}
            {focused && <> · {focused.ref}</>}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-0.5 leading-snug">
            {focused ? focused.label : "Ordo salutis — the order of salvation"}
          </h3>
          {focused && <p className="text-sm text-ink-200 italic mt-1 max-w-2xl">{focused.blurb}</p>}
        </div>
        <StepControls state={state} />
      </div>

      <StepProgress state={state} />

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[900px] h-auto"
          role="img" aria-label={`Ordo salutis, step ${Math.max(1, step)} of ${STAGES.length}.`}>
          <defs>
            <linearGradient id="os-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="50%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 215 170)" />
            </linearGradient>
          </defs>

          {/* Segments revealed step by step */}
          {segments.map((seg) => {
            const visible = step >= seg.i + 2;
            return (
              <path
                key={`seg-${seg.i}`}
                d={seg.d}
                fill="none"
                stroke="url(#os-line)"
                strokeWidth={3}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 240,
                  strokeDashoffset: visible ? 0 : 240,
                  opacity: visible ? 1 : 0,
                  transition: "stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1), opacity 350ms ease",
                }}
              />
            );
          })}

          {/* Stages */}
          {STAGES.map((s, i) => {
            const shown = step > i;
            const isActive = activeIdx === i;
            const x = xs[i];
            const y = Y_MID;
            const above = i % 2 === 0;
            const labelY = above ? y - 62 : y + 80;
            const labelFontSize = isActive ? 14.5 : 12.5;
            const labelWeight = isActive ? 700 : 600;
            const labelFill = isActive ? "rgb(254 240 199)" : "rgb(226 232 240)";
            return (
              <g
                key={s.id}
                style={{
                  opacity: shown ? 1 : 0,
                  transition: "opacity 500ms ease",
                }}
              >
                {/* tick from node to label */}
                <line x1={x} y1={y} x2={x} y2={above ? y - 42 : y + 42} stroke="rgb(255 255 255 / 0.15)" strokeWidth={1} />
                {isActive && <circle cx={x} cy={y} r={16} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.4} opacity={0.7} />}
                <circle cx={x} cy={y} r={isActive ? 9 : 7}
                  fill={isActive ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)" strokeWidth={1.4} />
                {/* Pill for active */}
                {isActive && (
                  <rect
                    x={x - estimateWidth(s.label, labelFontSize) / 2 - 8}
                    y={labelY - labelFontSize - 4}
                    width={estimateWidth(s.label, labelFontSize) + 16}
                    height={labelFontSize + 10}
                    rx={6}
                    fill="rgb(15 23 42 / 0.85)"
                    stroke="rgb(249 115 22)"
                    strokeWidth={1.2}
                  />
                )}
                <text x={x} y={labelY} textAnchor="middle"
                  style={{
                    font: `${labelWeight} ${labelFontSize}px ui-serif, Georgia, serif`,
                    fill: labelFill,
                  }}>
                  {s.label}
                </text>
                <text x={x} y={labelY + (above ? -labelFontSize - 4 : labelFontSize + 4)} textAnchor="middle" className="fill-ink-300"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {s.ref}
                </text>
              </g>
            );
          })}

          {/* Endpoints */}
          <text x={90} y={30} className="fill-flame-300"
            style={{ font: "italic 600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.06em" }}>
            BEGINS WITH GOD
          </text>
          <text x={VIEW_W - 90} y={30} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.06em" }}>
            ENDS WITH GOD
          </text>
        </svg>
      </div>

      {/* Jump chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {STAGES.map((s, i) => {
          const shown = step > i;
          const isActive = activeIdx === i;
          return (
            <button
              key={`os-chip-${s.id}`}
              onClick={() => state.jumpTo(i + 1)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
                isActive
                  ? "bg-flame-600 text-ink-50 border-flame-300 font-medium"
                  : shown
                  ? "bg-ink-700/60 text-ink-100 border-flame-300/30"
                  : "bg-ink-800/40 text-ink-400 border-ink-700/40 hover:border-flame-400/40 hover:text-ink-200"
              }`}
              aria-label={`Step ${i + 1}: ${s.label}`}
            >
              <span className="text-[9px] uppercase tracking-widest opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] text-ink-300 italic">
        Christians frame the order differently; all confess every link is His work.
      </p>
    </figure>
  );
}

function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.55;
}
