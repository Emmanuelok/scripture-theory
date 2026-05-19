"use client";

import { useEffect, useState } from "react";

// ─── The Seven Last Words from the Cross ───────────────────────
// The seven sayings of Jesus on the cross, in the traditional order. They
// are spread along a horizontal cross-beam, each anchored to a small
// vertical mark — like stations. The middle word ("It is finished")
// receives a brighter highlight: the climax of redemption.

type Word = {
  n: number;
  saying: string;
  fullText: string;
  ref: string;
  context: string;
};

const WORDS: Word[] = [
  { n: 1, saying: "Forgiveness",  fullText: "Father, forgive them, for they don't know what they are doing.",                  ref: "Luke 23:34",     context: "Spoken as the soldiers fasten Him to the wood." },
  { n: 2, saying: "Salvation",    fullText: "Truly, I tell you, today you will be with me in Paradise.",                       ref: "Luke 23:43",     context: "To the dying thief who asked to be remembered." },
  { n: 3, saying: "Relationship", fullText: "Woman, behold, your son! … Behold, your mother!",                                 ref: "John 19:26-27",  context: "Entrusting His mother to the beloved disciple." },
  { n: 4, saying: "Abandonment",  fullText: "My God, my God, why have you forsaken me?",                                       ref: "Matthew 27:46",  context: "The opening line of Psalm 22 — the cry of utter darkness." },
  { n: 5, saying: "Distress",     fullText: "I thirst.",                                                                       ref: "John 19:28",     context: "Fulfilling Scripture even in dying agony." },
  { n: 6, saying: "Triumph",      fullText: "It is finished.",                                                                 ref: "John 19:30",     context: "Greek: tetelestai — paid in full. The work is done." },
  { n: 7, saying: "Reunion",      fullText: "Father, into your hands I commit my spirit.",                                     ref: "Luke 23:46",     context: "The last word — handed back to the Father in trust." },
];

const VIEW_W = 1100;
const VIEW_H = 360;

export default function SevenLastWords() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? WORDS.find((w) => w.n === active) : null;

  // Crossbeam x positions
  const beamY = 200;
  const xs = WORDS.map((_, i) => 100 + (i * (VIEW_W - 200)) / (WORDS.length - 1));

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[800px] h-auto"
          role="img" aria-label="The seven last words of Jesus from the cross.">
          <defs>
            <linearGradient id="sw-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="50%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(120 113 108)" />
            </linearGradient>
            <radialGradient id="sw-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.65" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Halo around the cross */}
          <ellipse cx={VIEW_W / 2} cy={beamY} rx={500} ry={120} fill="url(#sw-glow)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 500ms" }} />

          {/* Cross beam (horizontal) */}
          <rect
            x={60} y={beamY - 4}
            width={VIEW_W - 120} height={8}
            rx={3}
            fill="url(#sw-beam)"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 1200ms ease 400ms",
            }}
          />
          {/* Cross beam (vertical) at centre */}
          <rect
            x={VIEW_W / 2 - 4} y={60}
            width={8} height={260}
            rx={3}
            fill="url(#sw-beam)"
            style={{
              opacity: drawn ? 1 : 0,
              transition: "opacity 1200ms ease 600ms",
            }}
          />

          {/* INRI title plate */}
          <rect x={VIEW_W / 2 - 28} y={64} width={56} height={20} rx={3} fill="rgb(15 23 42)" stroke="rgb(254 215 170 / 0.6)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1500ms" }} />
          <text x={VIEW_W / 2} y={78} textAnchor="middle" className="fill-flame-200"
            style={{ font: "700 11px ui-serif, Georgia, serif", letterSpacing: "0.18em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1600ms" }}>
            INRI
          </text>

          {/* Saying nodes along the beam */}
          {WORDS.map((w, i) => {
            const x = xs[i];
            const isOn = active === w.n;
            const isClimax = w.n === 6;
            const above = i % 2 === 0;
            const labelY = above ? beamY - 50 : beamY + 70;
            return (
              <g
                key={w.n}
                tabIndex={0}
                role="button"
                aria-label={`${w.n}. ${w.fullText}`}
                onMouseEnter={() => setActive(w.n)}
                onMouseLeave={() => setActive((c) => (c === w.n ? null : c))}
                onFocus={() => setActive(w.n)}
                onClick={() => setActive((c) => (c === w.n ? null : w.n))}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 700ms ease ${600 + i * 130}ms`,
                }}
              >
                {/* tick to the label */}
                <line x1={x} y1={beamY} x2={x} y2={above ? beamY - 30 : beamY + 30}
                  stroke="rgb(254 215 170 / 0.4)" strokeWidth={1.2} />
                {/* node */}
                {(isOn || isClimax) && (
                  <circle cx={x} cy={beamY} r={14}
                    fill="none" stroke={isClimax ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                    strokeWidth={1.4} opacity={0.55} />
                )}
                <circle cx={x} cy={beamY}
                  r={isClimax ? 9 : isOn ? 8 : 6}
                  fill={isClimax ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)" strokeWidth={1.2} />
                {/* number */}
                <text x={x} y={beamY + 4} textAnchor="middle"
                  style={{ font: "700 8px ui-sans-serif, system-ui", fill: "rgb(15 23 42)", pointerEvents: "none" }}>
                  {w.n}
                </text>
                {/* short label */}
                <text x={x} y={labelY} textAnchor="middle"
                  className={isClimax ? "fill-flame-200" : isOn ? "fill-flame-300" : "fill-ink-100"}
                  style={{ font: `${isClimax || isOn ? "600" : "500"} 12px ui-serif, Georgia, serif` }}>
                  {w.saying}
                </text>
                {/* ref */}
                <text x={x} y={labelY + (above ? -14 : 14)} textAnchor="middle" className="fill-ink-400"
                  style={{ font: "italic 9px ui-serif, Georgia, serif" }}>
                  {w.ref}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 min-h-[3rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">
              {focused.ref} · {focused.saying}
            </span>
            <span className="font-serif text-ink-50 italic">&ldquo;{focused.fullText}&rdquo;</span>
            <span className="block mt-1 text-ink-300">{focused.context}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            Seven sayings, gathered from the four Gospels in their traditional order. The
            sixth — &ldquo;It is finished&rdquo; — is the climax. Hover any node to hear it.
          </span>
        )}
      </div>
    </figure>
  );
}
