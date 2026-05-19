"use client";

import { useEffect, useState } from "react";

// ─── Four-movement gospel arc ──────────────────────────────────
// Layout: an "fall-and-rise" path from God's good creation, down to the Fall,
// climbing to the Cross at the apex, and out to our response. Bezier curve;
// four nodes positioned at meaningful low/high points so the geometry preaches.

type Movement = {
  number: string;
  title: string;
  blurb: string;
  /** Marker x/y inside the 1000×320 viewBox */
  x: number;
  y: number;
  color: string;
};

const VIEW = { w: 1000, h: 320 };

const MOVEMENTS: Movement[] = [
  { number: "01", title: "God",         blurb: "He made everything good. He made you on purpose.",                                 x: 90,  y: 110, color: "rgb(254 215 170)" },
  { number: "02", title: "Our sin",     blurb: "Something went wrong. We chose self over God; the world broke; we cannot fix it.", x: 350, y: 250, color: "rgb(120 113 108)" },
  { number: "03", title: "Jesus",       blurb: "He came. He died for us. He rose. He is Lord.",                                    x: 660, y: 70,  color: "rgb(249 115 22)" },
  { number: "04", title: "Your response", blurb: "Turn. Trust. Follow. Belong.",                                                   x: 920, y: 150, color: "rgb(254 215 170)" },
];

export default function GospelArcFigure() {
  const [active, setActive] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Smooth cubic path through all four nodes.
  // Tuned control points so it dips through the Fall then sweeps to the Cross.
  const pathD = `
    M ${MOVEMENTS[0].x} ${MOVEMENTS[0].y}
    C 180 220, 250 280, ${MOVEMENTS[1].x} ${MOVEMENTS[1].y}
    C 460 220, 540 80, ${MOVEMENTS[2].x} ${MOVEMENTS[2].y}
    C 760 70, 820 100, ${MOVEMENTS[3].x} ${MOVEMENTS[3].y}
  `;

  const current = active !== null ? MOVEMENTS[active] : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring overflow-hidden">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="block w-full min-w-[640px] h-auto"
          role="img"
          aria-label="A figure of the gospel in four movements: God, our sin, Jesus, your response."
        >
          <defs>
            <linearGradient id="ga-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(254 215 170)" />
              <stop offset="35%" stopColor="rgb(120 113 108)" />
              <stop offset="55%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 215 170)" />
            </linearGradient>
            <radialGradient id="ga-cross-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.9" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
            <filter id="ga-soft" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Faint background path */}
          <path d={pathD} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth={12} strokeLinecap="round" />

          {/* The main flowing path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#ga-line)"
            strokeWidth={3}
            strokeLinecap="round"
            style={{
              strokeDasharray: 2400,
              strokeDashoffset: drawn ? 0 : 2400,
              transition: "stroke-dashoffset 2200ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          {/* Glow halo on the path */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(249 115 22 / 0.4)"
            strokeWidth={8}
            strokeLinecap="round"
            filter="url(#ga-soft)"
            style={{
              opacity: drawn ? 0.5 : 0,
              transition: "opacity 1400ms ease 900ms",
            }}
          />

          {/* Cross glow behind Jesus apex */}
          <circle
            cx={MOVEMENTS[2].x}
            cy={MOVEMENTS[2].y}
            r={46}
            fill="url(#ga-cross-glow)"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 1400ms ease 1000ms",
              animation: drawn ? "gaPulse 4.5s ease-in-out infinite" : "none",
              transformOrigin: `${MOVEMENTS[2].x}px ${MOVEMENTS[2].y}px`,
            }}
          />

          {/* Movement markers */}
          {MOVEMENTS.map((m, i) => {
            const isActive = active === i;
            const isCross = i === 2;
            return (
              <g
                key={i}
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${700 + i * 180}ms`,
                  cursor: "pointer",
                }}
                onClick={() => setActive(i === active ? null : i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((c) => (c === i ? null : c))}
                onFocus={() => setActive(i)}
                tabIndex={0}
                role="button"
                aria-label={`Movement ${m.number}: ${m.title}`}
              >
                {(isActive || isCross) && (
                  <circle cx={m.x} cy={m.y} r={isCross ? 22 : 16} fill="none" stroke={m.color} strokeWidth={1.2} opacity={0.55} />
                )}
                {isCross ? (
                  <g transform={`translate(${m.x} ${m.y})`}>
                    <rect x={-1.8} y={-14} width={3.6} height={28} fill={m.color} rx={1} />
                    <rect x={-9} y={-5} width={18} height={3.6} fill={m.color} rx={1} />
                  </g>
                ) : (
                  <circle cx={m.x} cy={m.y} r={isActive ? 9 : 7} fill={m.color} stroke="rgb(15 23 42)" strokeWidth={1} />
                )}
                {/* Number badge */}
                <text
                  x={m.x}
                  y={m.y + (i === 1 ? 28 : -22)}
                  textAnchor="middle"
                  className="fill-ink-400"
                  style={{ font: "italic 10px ui-serif, Georgia, serif" }}
                >
                  {m.number}
                </text>
                {/* Title */}
                <text
                  x={m.x}
                  y={m.y + (i === 1 ? 44 : -36)}
                  textAnchor="middle"
                  className={isCross ? "fill-flame-100" : isActive ? "fill-flame-300" : "fill-ink-100"}
                  style={{
                    font: `${isCross ? "700" : "600"} ${isCross ? 18 : 14}px ui-serif, Georgia, serif`,
                  }}
                >
                  {m.title}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active panel */}
      <div className="mt-4 min-h-[3rem] text-sm text-ink-300 leading-relaxed">
        {current ? (
          <div className="flex items-baseline gap-3">
            <span className="text-[10px] uppercase tracking-widest text-flame-300">{current.number}</span>
            <span>
              <span className="font-serif text-ink-50">{current.title}.</span>{" "}
              <span className="italic">{current.blurb}</span>
            </span>
          </div>
        ) : (
          <span className="italic text-ink-400">One Gospel. Four movements. Hover or tap a node — the line bends down through the Fall, then climbs to the Cross.</span>
        )}
      </div>

      <style jsx>{`
        @keyframes gaPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.08); }
        }
      `}</style>
    </figure>
  );
}
