"use client";

import { useEffect, useState } from "react";

// ─── Sermon on the Mount — the structural sweep ────────────────
// Matthew 5-7 is not a loose collection of sayings but a carefully built
// teaching. Eight sections rise from the Beatitudes through deeper Torah,
// hidden righteousness, and warnings, to the climax: two builders.

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
const VIEW_H = 360;

export default function SermonOnMountSweep() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active !== null ? SECTIONS[active] : null;

  // X positions across width
  const xs = SECTIONS.map((_, i) => 80 + (i * (VIEW_W - 160)) / (SECTIONS.length - 1));
  // Y rises gently from left to right; last section is the highest (the climax)
  const baseY = VIEW_H - 100;
  const rise = 140;
  const ys = SECTIONS.map((_, i) => baseY - (i / (SECTIONS.length - 1)) * rise);

  // Smooth path through sections
  const pathD = (() => {
    let d = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < xs.length; i++) {
      const px = xs[i - 1];
      const py = ys[i - 1];
      const cx = xs[i];
      const cy = ys[i];
      const mx = (px + cx) / 2;
      const my = (py + cy) / 2 - 16;
      d += ` Q ${mx} ${my}, ${cx} ${cy}`;
    }
    return d;
  })();

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label="The Sermon on the Mount as a structural sweep through Matthew 5-7.">
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

          {/* Halo at the climax */}
          <ellipse cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} rx={120} ry={60} fill="url(#som-peak)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 1500ms" }} />

          {/* Main path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#som-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: drawn ? 0 : 1400,
              transition: "stroke-dashoffset 2200ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Section nodes */}
          {SECTIONS.map((s, i) => {
            const isOn = active === i;
            const isClimax = i === SECTIONS.length - 1;
            const x = xs[i];
            const y = ys[i];
            const labelY = y - 38;
            return (
              <g
                key={i}
                tabIndex={0}
                role="button"
                aria-label={`${s.title}: ${s.blurb}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((c) => (c === i ? null : c))}
                onFocus={() => setActive(i)}
                onClick={() => setActive((c) => (c === i ? null : i))}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${400 + i * 130}ms`,
                }}
              >
                {(isOn || isClimax) && (
                  <circle cx={x} cy={y} r={14} fill="none" stroke={isClimax ? "rgb(249 115 22)" : "rgb(254 215 170)"} strokeWidth={1.4} opacity={0.55} />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isClimax ? 9 : isOn ? 8 : 6}
                  fill={isClimax ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)"
                  strokeWidth={1.2}
                />
                {/* Number badge */}
                <text x={x} y={y + 24} textAnchor="middle" className="fill-ink-400"
                  style={{ font: "italic 9px ui-serif, Georgia, serif" }}>
                  {s.num}
                </text>
                {/* Title */}
                <text x={x} y={labelY} textAnchor="middle"
                  className={isClimax ? "fill-flame-200" : isOn ? "fill-flame-300" : "fill-ink-100"}
                  style={{ font: `${isClimax || isOn ? "600" : "500"} 11px ui-serif, Georgia, serif` }}>
                  {s.title}
                </text>
                {/* Refs */}
                <text x={x} y={labelY - 14} textAnchor="middle" className="fill-ink-400"
                  style={{ font: "italic 9px ui-serif, Georgia, serif" }}>
                  Matt {s.refs}
                </text>
              </g>
            );
          })}

          {/* Endpoints */}
          <text x={80} y={26} className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1300ms" }}>
            JESUS SITS DOWN — Matthew 5:1-2
          </text>
          <text x={VIEW_W - 80} y={26} textAnchor="end" className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1400ms" }}>
            THE CROWDS ARE ASTONISHED — 7:28
          </text>
        </svg>
      </div>

      <div className="mt-3 min-h-[3rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">Matthew {focused.refs}</span>
            <span className="font-serif text-ink-50">{focused.title}.</span>
            <span className="ml-2 text-ink-300 italic">{focused.blurb}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            One sermon, eight movements, one rising point — the house on the rock. The
            most consequential public address ever delivered.
          </span>
        )}
      </div>
    </figure>
  );
}
