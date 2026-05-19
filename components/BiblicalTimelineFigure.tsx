"use client";

import { useEffect, useState } from "react";

// ─── Era anchor positions on a 1200×280 viewBox ────────────────
// X is hand-tuned for visual balance so the Cross sits at the apex (the center),
// with Eternity Past anchoring the left and Until He Comes the right.
// Y is computed from a parabola whose peak is at x = 600 — Christ as the hinge
// of history. Markers further from the center sit lower on the path.

const TIMELINE = { w: 1200, h: 280 };
const PEAK_X = 600;
const PEAK_Y = 70;
const BASE_Y = 210;
const SPAN = 540;

function yAt(x: number) {
  const t = Math.min(1, Math.abs((x - PEAK_X) / SPAN));
  return BASE_Y - (BASE_Y - PEAK_Y) * (1 - t * t);
}

type Era = {
  id: string;
  short: string;       // marker tooltip label
  range: string;
  title: string;
  x: number;
  isCross?: boolean;
  /** "above" or "below" the path; "hover" hides label until interaction */
  labelPos: "above" | "below" | "hover";
};

const ERAS: Era[] = [
  { id: "before-time",     short: "Eternity past",     range: "Before time",                title: "The eternal Son",          x:  70, labelPos: "above" },
  { id: "creation",        short: "Creation",          range: "Genesis 1–11",                title: "Creation & the Fall",      x: 170, labelPos: "below" },
  { id: "patriarchs",      short: "Patriarchs",        range: "c. 2100–1700 B.C.",          title: "The promise to Abraham",   x: 270, labelPos: "above" },
  { id: "exodus",          short: "Exodus & Sinai",    range: "c. 1446 – 1406 B.C.",        title: "Egypt, Exodus, Sinai",     x: 370, labelPos: "below" },
  { id: "judges-kings",    short: "Judges & Kings",    range: "c. 1400 – 586 B.C.",         title: "Joshua, Judges, Kings",    x: 460, labelPos: "above" },
  { id: "prophets",        short: "The Prophets",      range: "c. 850 – 430 B.C.",          title: "The Prophets",             x: 525, labelPos: "below" },
  { id: "return",          short: "Return",            range: "538 – 432 B.C.",              title: "Return & 2nd Temple",      x: 560, labelPos: "hover" },
  { id: "the-silence",     short: "The Silence",       range: "c. 430 – 4 B.C.",             title: "Four Hundred Silent Years", x: 580, labelPos: "hover" },
  { id: "advent",          short: "Christ",            range: "c. 6/4 B.C. – A.D. 30/33",   title: "The coming of Christ",     x: PEAK_X, isCross: true, labelPos: "below" },
  { id: "early-church",    short: "Apostolic Church",  range: "A.D. 30 – c. 100",            title: "The apostolic Church",     x: 720, labelPos: "above" },
  { id: "until-He-comes",  short: "Until He comes",    range: "A.D. 95 — the Day",           title: "Until He comes",           x: 1110, labelPos: "below" },
];

export default function BiblicalTimelineFigure() {
  const [active, setActive] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Sampled path through every era position for the flowing ribbon.
  const pathD = (() => {
    const xs: number[] = [];
    for (let x = 30; x <= TIMELINE.w - 30; x += 8) xs.push(x);
    let d = `M ${xs[0]} ${yAt(xs[0]).toFixed(1)}`;
    for (let i = 1; i < xs.length; i++) {
      d += ` L ${xs[i]} ${yAt(xs[i]).toFixed(1)}`;
    }
    return d;
  })();

  const activeEra = active ? ERAS.find((e) => e.id === active) : null;

  function jumpTo(id: string) {
    setActive(id);
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // brief flash on the target
      el.classList.add("ring-2", "ring-flame-500", "ring-offset-2", "ring-offset-ink-50");
      window.setTimeout(() => {
        el.classList.remove("ring-2", "ring-flame-500", "ring-offset-2", "ring-offset-ink-50");
      }, 1600);
    }
  }

  return (
    <figure className="mt-8 rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring overflow-hidden">
      {/* Scrollable wrapper for narrow screens */}
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${TIMELINE.w} ${TIMELINE.h}`}
          className="block w-full min-w-[760px] h-auto"
          role="img"
          aria-label="A figure of the biblical timeline. Eleven eras flow from eternity past through the coming of Christ to the day He returns."
        >
          <defs>
            <linearGradient id="bt-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="35%" stopColor="rgb(245 158 11)" />
              <stop offset="50%" stopColor="rgb(254 215 170)" />
              <stop offset="65%" stopColor="rgb(245 158 11)" />
              <stop offset="100%" stopColor="rgb(202 138 4)" />
            </linearGradient>
            <linearGradient id="bt-halo" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              <stop offset="50%" stopColor="rgb(249 115 22)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="bt-cross-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.85" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
            <filter id="bt-soft" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" />
            </filter>
          </defs>

          {/* Decorative subtle horizon glow */}
          <ellipse
            cx={PEAK_X}
            cy={PEAK_Y + 12}
            rx={420}
            ry={28}
            fill="url(#bt-halo)"
          />

          {/* Faint twin guide line under the main path */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth={10}
            strokeLinecap="round"
          />

          {/* The main flowing path through history */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#bt-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 2400,
              strokeDashoffset: drawn ? 0 : 2400,
              transition: "stroke-dashoffset 2200ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Subtle glow halo on the upper arc */}
          <path
            d={pathD}
            fill="none"
            stroke="rgb(249 115 22 / 0.35)"
            strokeWidth={6}
            strokeLinecap="round"
            filter="url(#bt-soft)"
            style={{
              opacity: drawn ? 0.55 : 0,
              transition: "opacity 1400ms ease 800ms",
            }}
          />

          {/* "Eternity past" and "Eternity future" anchor tags */}
          <g opacity={drawn ? 0.7 : 0} style={{ transition: "opacity 800ms ease 1200ms" }}>
            <text
              x={70}
              y={BASE_Y + 38}
              textAnchor="middle"
              className="fill-ink-300"
              style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.04em" }}
            >
              eternity past
            </text>
            <text
              x={1110}
              y={BASE_Y + 38}
              textAnchor="middle"
              className="fill-ink-300"
              style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.04em" }}
            >
              the Day He returns
            </text>
          </g>

          {/* Christ glow behind the apex */}
          <circle
            cx={PEAK_X}
            cy={PEAK_Y}
            r={42}
            fill="url(#bt-cross-glow)"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 1400ms ease 1000ms",
              transformOrigin: `${PEAK_X}px ${PEAK_Y}px`,
              animation: drawn ? "btPulse 4.5s ease-in-out infinite" : "none",
            }}
          />

          {/* Era markers */}
          {ERAS.map((era, i) => {
            const cy = yAt(era.x);
            const isActive = active === era.id;
            const r = era.isCross ? 9 : 5;
            const showLabel =
              era.labelPos !== "hover" || isActive || era.isCross;
            const labelAbove = era.labelPos === "above";
            return (
              <g
                key={era.id}
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 600ms ease ${600 + i * 80}ms`,
                  cursor: "pointer",
                }}
                onClick={() => jumpTo(era.id)}
                onMouseEnter={() => setActive(era.id)}
                onMouseLeave={() => setActive((cur) => (cur === era.id ? null : cur))}
                onFocus={() => setActive(era.id)}
                tabIndex={0}
                role="button"
                aria-label={`${era.short} — ${era.range}`}
              >
                {/* Outer ring on hover/active */}
                {(isActive || era.isCross) && (
                  <circle
                    cx={era.x}
                    cy={cy}
                    r={era.isCross ? 16 : 11}
                    fill="none"
                    stroke="rgb(254 215 170)"
                    strokeWidth={1}
                    opacity={era.isCross ? 0.55 : 0.7}
                  />
                )}
                {/* Cross gets a literal cross icon; others are dots */}
                {era.isCross ? (
                  <g
                    transform={`translate(${era.x} ${cy})`}
                    style={{
                      transformOrigin: `${era.x}px ${cy}px`,
                    }}
                  >
                    {/* small cross */}
                    <rect x={-1.5} y={-12} width={3} height={24} fill="rgb(254 215 170)" rx={1} />
                    <rect x={-7} y={-5} width={14} height={3} fill="rgb(254 215 170)" rx={1} />
                  </g>
                ) : (
                  <circle
                    cx={era.x}
                    cy={cy}
                    r={r}
                    fill={isActive ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1}
                  />
                )}

                {/* Label */}
                {showLabel && (
                  <>
                    <text
                      x={era.x}
                      y={labelAbove ? cy - 14 : cy + 22}
                      textAnchor="middle"
                      className={era.isCross ? "fill-flame-100" : isActive ? "fill-flame-300" : "fill-ink-200"}
                      style={{
                        font: `${era.isCross ? "600" : "500"} ${era.isCross ? 12 : 10}px ui-sans-serif, system-ui`,
                        letterSpacing: "0.02em",
                        pointerEvents: "none",
                      }}
                    >
                      {era.short}
                    </text>
                    <text
                      x={era.x}
                      y={labelAbove ? cy - 26 : cy + 34}
                      textAnchor="middle"
                      className="fill-ink-400"
                      style={{
                        font: "italic 9px ui-serif, Georgia, serif",
                        pointerEvents: "none",
                      }}
                    >
                      {era.range}
                    </text>
                  </>
                )}
                {/* Invisible hit area for hover targets that have small dots */}
                <circle
                  cx={era.x}
                  cy={cy}
                  r={14}
                  fill="transparent"
                  pointerEvents="all"
                />
              </g>
            );
          })}

          {/* Christ label above the apex (always visible) */}
          <text
            x={PEAK_X}
            y={PEAK_Y - 30}
            textAnchor="middle"
            className="fill-flame-100"
            style={{
              font: "italic 700 14px ui-serif, Georgia, serif",
              letterSpacing: "0.02em",
              opacity: drawn ? 1 : 0,
              transition: "opacity 1400ms ease 1200ms",
            }}
          >
            Jesus is the hinge of history.
          </text>
        </svg>
      </div>

      {/* Selected era summary + jump CTA */}
      <div className="mt-4 grid sm:grid-cols-[1fr_auto] gap-3 items-center">
        <div className="text-sm text-ink-300 leading-relaxed">
          {activeEra ? (
            <>
              <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">
                {activeEra.range}
              </span>
              <span className="font-serif text-ink-50">{activeEra.title}</span>
              <span className="ml-2 italic text-ink-400">— tap to read this era</span>
            </>
          ) : (
            <span className="italic">Hover or tap a marker. The Cross sits at the center; the line bends toward it.</span>
          )}
        </div>
        {activeEra && (
          <button
            onClick={() => jumpTo(activeEra.id)}
            className="justify-self-start sm:justify-self-end rounded-full bg-flame-600 hover:bg-flame-700 text-ink-50 px-4 py-1.5 text-xs"
          >
            Read {activeEra.short.toLowerCase()} ↓
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes btPulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.06); }
        }
      `}</style>
    </figure>
  );
}
