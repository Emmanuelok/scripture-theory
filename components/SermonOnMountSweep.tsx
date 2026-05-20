"use client";

import { useMemo } from "react";
import { useStepReveal } from "./figure-utils/useStepReveal";
import StepControls, { StepProgress } from "./figure-utils/StepControls";

// ─── Sermon on the Mount — the structural sweep ────────────────
// Matthew 5-7 is not a loose collection of sayings but a carefully built
// teaching. Eight sections rise from the Beatitudes through deeper Torah,
// hidden righteousness, and warnings, to the climax: two builders. Walks
// through the sermon one movement at a time.

type Section = {
  num: string;
  title: string;
  refs: string;
  blurb: string;
};

const SECTIONS: Section[] = [
  { num: "01", title: "Beatitudes",            refs: "5:3-12",  blurb: "Eight blessings — the portrait of kingdom life." },
  { num: "02", title: "Salt & Light",          refs: "5:13-16", blurb: "Identity before behaviour. The world is meant to see." },
  { num: "03", title: "Christ & the Law",      refs: "5:17-20", blurb: "Not abolished — fulfilled. Righteousness must exceed the Pharisees." },
  { num: "04", title: "Six antitheses",        refs: "5:21-48", blurb: "Anger, lust, divorce, oaths, retaliation, enemies. The law reaches the heart." },
  { num: "05", title: "Righteousness in secret", refs: "6:1-18", blurb: "Giving, prayer (with the Lord's Prayer), fasting — for the Father who sees." },
  { num: "06", title: "Treasure & anxiety",    refs: "6:19-34", blurb: "Where the heart is. The single eye. Seek first the kingdom." },
  { num: "07", title: "Judging & asking",      refs: "7:1-12",  blurb: "Pluck the plank first. Ask, seek, knock. The Golden Rule." },
  { num: "08", title: "Two builders",          refs: "7:13-29", blurb: "Narrow way. False prophets. The house on the rock. The crowd is astonished." },
];

const VIEW_W = 1200;
const VIEW_H = 380;

export default function SermonOnMountSweep() {
  const state = useStepReveal(SECTIONS.length, 1700);
  const { step } = state;
  const activeIdx = step > 0 ? step - 1 : -1;
  const focused = activeIdx >= 0 ? SECTIONS[activeIdx] : null;

  // X positions across width
  const xs = useMemo(() => SECTIONS.map((_, i) => 90 + (i * (VIEW_W - 180)) / (SECTIONS.length - 1)), []);
  const Y_BASE = VIEW_H - 100;
  const RISE = 160;
  const ys = useMemo(() => SECTIONS.map((_, i) => Y_BASE - (i / (SECTIONS.length - 1)) * RISE), []);

  // Per-segment paths between consecutive sections (revealed step by step).
  const segments = useMemo(() => {
    const out: { i: number; d: string }[] = [];
    for (let i = 0; i < SECTIONS.length - 1; i++) {
      const px = xs[i];
      const py = ys[i];
      const cx = xs[i + 1];
      const cy = ys[i + 1];
      const mx = (px + cx) / 2;
      const my = (py + cy) / 2 - 18;
      out.push({ i, d: `M ${px} ${py} Q ${mx} ${my}, ${cx} ${cy}` });
    }
    return out;
  }, [xs, ys]);

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            Step {Math.max(1, step)} of {SECTIONS.length}
            {focused && <> · Matthew {focused.refs}</>}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-0.5 leading-snug">
            {focused ? focused.title : "Sermon on the Mount"}
          </h3>
          {focused && <p className="text-sm text-ink-200 italic mt-1 max-w-2xl">{focused.blurb}</p>}
        </div>
        <StepControls state={state} />
      </div>

      <StepProgress state={state} />

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label={`Sermon on the Mount, step ${Math.max(1, step)} of ${SECTIONS.length}.`}>
          <defs>
            <linearGradient id="som-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(254 215 170)" />
              <stop offset="50%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 240 199)" />
            </linearGradient>
            <radialGradient id="som-peak" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.65" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Halo at the climax — appears only when the climax step is reached */}
          {step >= SECTIONS.length && (
            <ellipse cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} rx={140} ry={70} fill="url(#som-peak)"
              style={{ opacity: 1, transition: "opacity 1200ms ease" }} />
          )}

          {/* Segments — revealed step by step */}
          {segments.map((seg) => {
            const visible = step >= seg.i + 2;
            return (
              <path
                key={`seg-${seg.i}`}
                d={seg.d}
                fill="none"
                stroke="url(#som-line)"
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

          {/* Section nodes */}
          {SECTIONS.map((s, i) => {
            const shown = step > i;
            const isActive = activeIdx === i;
            const isClimax = i === SECTIONS.length - 1;
            const x = xs[i];
            const y = ys[i];
            const r = isClimax ? 11 : 8;
            const labelY = y - 38;
            const labelFontSize = isActive ? 15 : 13;
            const labelWeight = isActive ? 700 : isClimax ? 700 : 600;
            const labelFill = isActive ? "rgb(254 240 199)" : isClimax ? "rgb(254 215 170)" : "rgb(226 232 240)";
            return (
              <g
                key={i}
                style={{
                  opacity: shown ? 1 : 0,
                  transition: "opacity 500ms ease",
                }}
              >
                {(isActive || (isClimax && shown)) && (
                  <circle cx={x} cy={y} r={r + 8} fill="none"
                    stroke={isClimax ? "rgb(249 115 22)" : "rgb(254 215 170)"} strokeWidth={1.4} opacity={0.6} />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? r + 2 : r}
                  fill={isClimax ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)"
                  strokeWidth={1.4}
                />
                {/* Step badge */}
                <text x={x} y={y + 24} textAnchor="middle" className="fill-ink-200"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {s.num}
                </text>
                {/* Pill background for active label */}
                {isActive && (
                  <rect
                    x={x - estimateWidth(s.title, labelFontSize) / 2 - 8}
                    y={labelY - labelFontSize - 4}
                    width={estimateWidth(s.title, labelFontSize) + 16}
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
                  {s.title}
                </text>
                <text x={x} y={labelY - (isActive ? labelFontSize + 10 : 16)} textAnchor="middle" className="fill-ink-300"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  Matt {s.refs}
                </text>
              </g>
            );
          })}

          {/* Endpoints */}
          <text x={90} y={28} className="fill-flame-300"
            style={{ font: "italic 600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.06em" }}>
            JESUS SITS DOWN — Matthew 5:1-2
          </text>
          <text x={VIEW_W - 90} y={28} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.06em" }}>
            THE CROWDS ARE ASTONISHED — 7:28
          </text>
        </svg>
      </div>

      {/* Jump chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {SECTIONS.map((s, i) => {
          const shown = step > i;
          const isActive = activeIdx === i;
          return (
            <button
              key={`som-chip-${i}`}
              onClick={() => state.jumpTo(i + 1)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
                isActive
                  ? "bg-flame-600 text-ink-50 border-flame-300 font-medium"
                  : shown
                  ? "bg-ink-700/60 text-ink-100 border-flame-300/30"
                  : "bg-ink-800/40 text-ink-400 border-ink-700/40 hover:border-flame-400/40 hover:text-ink-200"
              }`}
              aria-label={`Step ${i + 1}: ${s.title}`}
            >
              <span className="text-[9px] uppercase tracking-widest opacity-70">{s.num}</span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}

function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.55;
}
