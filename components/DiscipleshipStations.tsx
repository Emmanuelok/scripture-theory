"use client";

import { useMemo } from "react";
import { useProfile, type JourneyStage } from "@/lib/profile";
import { useStepReveal } from "./figure-utils/useStepReveal";
import StepControls, { StepProgress } from "./figure-utils/StepControls";

// ─── Discipleship stations ─────────────────────────────────────
// Seven stages from "outside" to "reproducing." The figure walks the
// household through one stage at a time. If real disciples are being
// tracked on /disciple/journey, the station holding them lights up
// with the count even in earlier steps.

type Station = {
  id: JourneyStage;
  label: string;
  short: string;
  ref: string;
};

const STATIONS: Station[] = [
  { id: "outside",      label: "Praying for",       short: "They don't yet follow Jesus. We pray, by name.",                ref: "1 Timothy 2:1" },
  { id: "conversation", label: "Conversation",      short: "Honest spiritual conversation has begun.",                     ref: "Colossians 4:6" },
  { id: "studying",     label: "Studying together", short: "Opening the Word with them, in a meal or a chair.",            ref: "Acts 8:30-31" },
  { id: "responded",    label: "Said yes",          short: "They have confessed Jesus as Lord and believed.",              ref: "Romans 10:9" },
  { id: "baptized",     label: "Baptized",          short: "Publicly confessed, buried with Christ, raised.",              ref: "Romans 6:4" },
  { id: "community",    label: "In community",      short: "Committed to a local church — not solo Christianity.",         ref: "Hebrews 10:24-25" },
  { id: "reproducing",  label: "Reproducing",       short: "Now walking with someone else through the stations.",          ref: "2 Timothy 2:2" },
];

const VIEW_W = 1200;
const VIEW_H = 400;

export default function DiscipleshipStations() {
  const { profile, mounted } = useProfile();
  const state = useStepReveal(STATIONS.length, 1700);
  const { step } = state;
  const activeIdx = step > 0 ? step - 1 : -1;
  const focused = activeIdx >= 0 ? STATIONS[activeIdx] : null;

  const counts = useMemo(() => {
    const m = new Map<JourneyStage, number>();
    for (const d of profile.disciples ?? []) {
      m.set(d.stage, (m.get(d.stage) ?? 0) + 1);
    }
    return m;
  }, [profile.disciples]);

  const total = useMemo(() => (profile.disciples ?? []).length, [profile.disciples]);
  const focusedCount = focused ? counts.get(focused.id) ?? 0 : 0;

  // Layout: stations ascend left → right
  const xs = useMemo(
    () => STATIONS.map((_, i) => 90 + (i * (VIEW_W - 180)) / (STATIONS.length - 1)),
    []
  );
  const baseY = VIEW_H - 110;
  const peakRise = 180;
  const ys = useMemo(
    () => STATIONS.map((_, i) => baseY - (i / (STATIONS.length - 1)) * peakRise),
    [baseY]
  );

  const segments = useMemo(() => {
    const out: { i: number; d: string }[] = [];
    for (let i = 0; i < STATIONS.length - 1; i++) {
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
            Step {Math.max(1, step)} of {STATIONS.length}
            {focused && <> · {focused.ref}</>}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-0.5 leading-snug">
            {focused ? focused.label : "From outside to reproducing"}
          </h3>
          {focused && (
            <p className="text-sm text-ink-200 italic mt-1 max-w-2xl">
              {focused.short}
              {focusedCount > 0 && (
                <span className="not-italic text-flame-300 ml-2">· {focusedCount} on your record</span>
              )}
            </p>
          )}
        </div>
        <StepControls state={state} />
      </div>

      <StepProgress state={state} />

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label={`Discipleship stations, step ${Math.max(1, step)} of ${STATIONS.length}.`}>
          <defs>
            <linearGradient id="dj-line" x1="0" y1="0" x2="1" y2="0">
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
                stroke="url(#dj-line)"
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

          {/* Stations */}
          {STATIONS.map((s, i) => {
            const shown = step > i;
            const isActive = activeIdx === i;
            const x = xs[i];
            const y = ys[i];
            const count = mounted ? counts.get(s.id) ?? 0 : 0;
            const radius = isActive ? 12 : count > 0 ? 11 : 9;
            const fill = count > 0 ? "rgb(249 115 22)" : "rgb(254 215 170)";
            const labelY = y + radius + 22;
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
                {(isActive || count > 0) && (
                  <circle cx={x} cy={y} r={radius + 9} fill="none" stroke={fill} strokeWidth={1.4} opacity={isActive ? 0.7 : 0.45} />
                )}
                <circle cx={x} cy={y} r={radius} fill={fill} stroke="rgb(15 23 42)" strokeWidth={1.5} />
                {count > 0 && (
                  <text x={x} y={y + 4} textAnchor="middle"
                    style={{ font: "700 11px ui-sans-serif, system-ui", fill: "rgb(15 23 42)", pointerEvents: "none" }}>
                    {count}
                  </text>
                )}
                {/* Step badge */}
                <text x={x} y={y - radius - 12} textAnchor="middle" className="fill-ink-200"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                {/* Pill for active label */}
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
                <text x={x} y={labelY + labelFontSize + 4} textAnchor="middle" className="fill-ink-300"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {s.ref}
                </text>
              </g>
            );
          })}

          {/* Endpoints */}
          <text x={90} y={30} className="fill-flame-300"
            style={{ font: "italic 600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.06em" }}>
            START — pray by name
          </text>
          <text x={VIEW_W - 90} y={30} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 600 11.5px ui-sans-serif, system-ui", letterSpacing: "0.06em" }}>
            MULTIPLY — 2 Timothy 2:2 →
          </text>
        </svg>
      </div>

      {/* Jump chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {STATIONS.map((s, i) => {
          const shown = step > i;
          const isActive = activeIdx === i;
          const count = mounted ? counts.get(s.id) ?? 0 : 0;
          return (
            <button
              key={`ds-chip-${s.id}`}
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
              {count > 0 && <span className="text-flame-200">· {count}</span>}
            </button>
          );
        })}
      </div>

      {mounted && total > 0 && (
        <p className="mt-3 text-xs text-ink-300 italic">
          {total} {total === 1 ? "person" : "people"} on your record · stations colour by who currently sits there
        </p>
      )}
    </figure>
  );
}

function estimateWidth(text: string, fontSize: number): number {
  return text.length * fontSize * 0.55;
}
