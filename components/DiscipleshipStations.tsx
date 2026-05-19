"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile, type JourneyStage } from "@/lib/profile";

// ─── Discipleship stations ─────────────────────────────────────
// Seven stages from "outside" to "reproducing." The figure shows them as a
// rising path of stations. If the household is tracking real disciples on
// /disciple/journey, the figure colours each station by how many people
// currently sit there — a quiet visual of the harvest.

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

const VIEW_W = 1100;
const VIEW_H = 380;

export default function DiscipleshipStations() {
  const { profile, mounted } = useProfile();
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<JourneyStage | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Count current disciples at each stage (if any).
  const counts = useMemo(() => {
    const m = new Map<JourneyStage, number>();
    for (const d of profile.disciples ?? []) {
      m.set(d.stage, (m.get(d.stage) ?? 0) + 1);
    }
    return m;
  }, [profile.disciples]);

  const total = useMemo(() => (profile.disciples ?? []).length, [profile.disciples]);

  // X positions along the path; ascend so the rightmost station is highest
  const xs = STATIONS.map((_, i) => 80 + (i * (VIEW_W - 160)) / (STATIONS.length - 1));
  const baseY = VIEW_H - 90;
  const peakRise = 160;
  const ys = STATIONS.map((_, i) => baseY - (i / (STATIONS.length - 1)) * peakRise);

  // Smooth path through all stations
  const pathD = (() => {
    let d = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < xs.length; i++) {
      const px = xs[i - 1];
      const py = ys[i - 1];
      const cx = xs[i];
      const cy = ys[i];
      const mx = (px + cx) / 2;
      const my = (py + cy) / 2 - 14;
      d += ` Q ${mx} ${my}, ${cx} ${cy}`;
    }
    return d;
  })();

  const focused = active ? STATIONS.find((s) => s.id === active) : null;
  const focusedCount = focused ? counts.get(focused.id) ?? 0 : 0;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-300">The journey</div>
          <h3 className="font-serif text-xl text-ink-50 mt-0.5">
            From outside to reproducing — seven stations.
          </h3>
        </div>
        {mounted && total > 0 && (
          <div className="text-xs text-ink-300 italic">
            {total} {total === 1 ? "person" : "people"} on your record
          </div>
        )}
      </div>

      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label="Seven discipleship stations from outside to reproducing.">
          <defs>
            <linearGradient id="dj-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="50%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 215 170)" />
            </linearGradient>
          </defs>

          {/* Path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#dj-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: drawn ? 0 : 1400,
              transition: "stroke-dashoffset 2200ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Stations */}
          {STATIONS.map((s, i) => {
            const isOn = active === s.id;
            const x = xs[i];
            const y = ys[i];
            const count = counts.get(s.id) ?? 0;
            const radius = isOn ? 10 : count > 0 ? 9 : 7;
            const fill = count > 0 ? "rgb(249 115 22)" : "rgb(254 215 170)";
            return (
              <g
                key={s.id}
                tabIndex={0}
                role="button"
                aria-label={`${s.label}: ${s.short}${count > 0 ? ` (${count} on your record)` : ""}`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive((c) => (c === s.id ? null : c))}
                onFocus={() => setActive(s.id)}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${500 + i * 130}ms`,
                }}
              >
                {(isOn || count > 0) && (
                  <circle cx={x} cy={y} r={radius + 7} fill="none" stroke={fill} strokeWidth={1.2} opacity={0.5} />
                )}
                <circle cx={x} cy={y} r={radius} fill={fill} stroke="rgb(15 23 42)" strokeWidth={1.4} />
                {count > 0 && (
                  <text x={x} y={y + 3} textAnchor="middle"
                    style={{ font: "700 10.5px ui-sans-serif, system-ui", fill: "rgb(15 23 42)", pointerEvents: "none" }}>
                    {count}
                  </text>
                )}
                {/* Number badge above */}
                <text x={x} y={y - radius - 22} textAnchor="middle" className="fill-ink-200"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                {/* Label below */}
                <text x={x} y={y + radius + 18} textAnchor="middle"
                  className={isOn ? "fill-flame-200" : "fill-ink-100"}
                  style={{ font: `${isOn ? "600" : "500"} 11px ui-serif, Georgia, serif`, transition: "fill 200ms" }}>
                  {s.label}
                </text>
                <text x={x} y={y + radius + 32} textAnchor="middle" className="fill-ink-300"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {s.ref}
                </text>
              </g>
            );
          })}

          {/* Endpoint labels */}
          <text x={80} y={30} className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1300ms" }}>
            START — pray by name
          </text>
          <text x={VIEW_W - 80} y={30} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1400ms" }}>
            MULTIPLY — 2 Timothy 2:2 →
          </text>
        </svg>
      </div>

      <div className="mt-3 min-h-[3.5rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">{focused.ref}</span>
            <span className="font-serif text-ink-50">{focused.label}.</span>
            <span className="ml-2 text-ink-300 italic">{focused.short}</span>
            {focusedCount > 0 && (
              <span className="ml-3 text-flame-300 not-italic">
                · {focusedCount} on your record
              </span>
            )}
          </div>
        ) : (
          <span className="italic text-ink-400">
            The line rises from praying-for to reproducing. Stations with a number show how
            many people on your record sit there right now.
          </span>
        )}
      </div>
    </figure>
  );
}
