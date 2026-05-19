"use client";

import { useEffect, useState } from "react";

// ─── The Roman Road ────────────────────────────────────────────
// A simple gospel walk through five verses in Romans. The figure draws a
// winding road from "all have sinned" to "whoever calls," with milestones
// at each stop. A classical evangelism pattern, presented gently.

type Stop = {
  num: number;
  title: string;
  ref: string;
  text: string;
  short: string;
};

const STOPS: Stop[] = [
  { num: 1, title: "All have sinned",
    ref: "Romans 3:23",  text: "All have sinned, and fall short of the glory of God.",
    short: "There is no one who has not. Every honest examen lands here." },
  { num: 2, title: "The wages — and the gift",
    ref: "Romans 6:23",  text: "The wages of sin is death; but the gift of God is eternal life through Christ Jesus our Lord.",
    short: "Two words: wages (earned) and gift (given). The road turns here." },
  { num: 3, title: "While we were still",
    ref: "Romans 5:8",   text: "But God commends his own love toward us, in that while we were yet sinners, Christ died for us.",
    short: "Not after we cleaned up. While we were still." },
  { num: 4, title: "Confess and believe",
    ref: "Romans 10:9",  text: "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.",
    short: "Two acts of one heart. Mouth and heart together." },
  { num: 5, title: "Whoever calls",
    ref: "Romans 10:13", text: "Whoever will call on the name of the Lord will be saved.",
    short: "Whoever. The door is the widest door in the world." },
];

const VIEW_W = 1100;
const VIEW_H = 340;

export default function RomanRoad() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? STOPS.find((s) => s.num === active) : null;

  // Winding path — alternating high/low for visual interest
  const xs = STOPS.map((_, i) => 90 + (i * (VIEW_W - 180)) / (STOPS.length - 1));
  const ys = STOPS.map((_, i) => 200 + (i % 2 === 0 ? 0 : -40));

  // Smooth path through stops
  const pathD = (() => {
    let d = `M 60 220`;
    for (let i = 0; i < STOPS.length; i++) {
      const cx = xs[i];
      const cy = ys[i];
      const prevX = i === 0 ? 60 : xs[i - 1];
      const prevY = i === 0 ? 220 : ys[i - 1];
      const mx = (prevX + cx) / 2;
      const my = (prevY + cy) / 2 + (i % 2 === 0 ? 30 : -30);
      d += ` Q ${mx} ${my}, ${cx} ${cy}`;
    }
    // Continue beyond last stop
    d += ` Q ${xs[xs.length - 1] + 30} ${ys[ys.length - 1] - 20}, ${VIEW_W - 60} 180`;
    return d;
  })();

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label="The Roman Road — five verses from Romans, drawn as a winding road from sin to salvation.">
          <defs>
            <linearGradient id="rr-road" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="30%" stopColor="rgb(180 169 158)" />
              <stop offset="70%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 215 170)" />
            </linearGradient>
            <radialGradient id="rr-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.55" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow at the destination */}
          <circle cx={VIEW_W - 60} cy={180} r={70} fill="url(#rr-glow)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 1500ms" }} />

          {/* Faint shoulder under the road */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth={16}
            strokeLinecap="round"
          />

          {/* The road */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#rr-road)"
            strokeWidth={5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 1500,
              strokeDashoffset: drawn ? 0 : 1500,
              transition: "stroke-dashoffset 2400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Dashed centre lane line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(15 23 42 / 0.4)"
            strokeWidth={0.8}
            strokeDasharray="6 8"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 1000ms ease 2200ms",
            }}
          />

          {/* Stop markers */}
          {STOPS.map((s, i) => {
            const isOn = active === s.num;
            const x = xs[i];
            const y = ys[i];
            const above = i % 2 === 0;
            const labelY = above ? y - 36 : y + 56;
            return (
              <g
                key={s.num}
                tabIndex={0}
                role="button"
                aria-label={`${s.title}: ${s.text}`}
                onMouseEnter={() => setActive(s.num)}
                onMouseLeave={() => setActive((c) => (c === s.num ? null : c))}
                onFocus={() => setActive(s.num)}
                onClick={() => setActive((c) => (c === s.num ? null : s.num))}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${600 + i * 180}ms`,
                }}
              >
                {/* Milestone tick from road to label */}
                <line x1={x} y1={y} x2={x} y2={above ? y - 20 : y + 20}
                  stroke="rgb(254 215 170 / 0.5)" strokeWidth={1.2} />
                {isOn && (
                  <circle cx={x} cy={y} r={15} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.4} opacity={0.55} />
                )}
                {/* The stone — square milestone */}
                <rect x={x - 11} y={y - 11} width={22} height={22} rx={3}
                  fill={isOn ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)" strokeWidth={1.4} />
                <text x={x} y={y + 4} textAnchor="middle"
                  style={{ font: "700 12px ui-serif, Georgia, serif", fill: "rgb(15 23 42)", pointerEvents: "none" }}>
                  {s.num}
                </text>
                {/* Label */}
                <text x={x} y={labelY} textAnchor="middle"
                  className={isOn ? "fill-flame-200" : "fill-ink-100"}
                  style={{ font: `${isOn ? "600" : "500"} 11px ui-serif, Georgia, serif`, transition: "fill 200ms" }}>
                  {s.title}
                </text>
                <text x={x} y={labelY + (above ? -14 : 14)} textAnchor="middle" className="fill-ink-200"
                  style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                  {s.ref}
                </text>
              </g>
            );
          })}

          {/* Endpoints */}
          <text x={60} y={26} className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1300ms" }}>
            ALL HAVE SINNED
          </text>
          <text x={VIEW_W - 60} y={26} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1400ms" }}>
            WHOEVER CALLS WILL BE SAVED →
          </text>
        </svg>
      </div>

      <div className="mt-3 min-h-[3.5rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">{focused.ref}</span>
            <span className="font-serif text-ink-50 italic">&ldquo;{focused.text}&rdquo;</span>
            <span className="block mt-1 text-ink-300">{focused.short}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            The classical evangelism walk — five verses from Romans tracing the road from sin
            to salvation. Walk it slowly with someone, or by yourself.
          </span>
        )}
      </div>
    </figure>
  );
}
