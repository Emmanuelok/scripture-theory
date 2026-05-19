"use client";

import { useEffect, useState } from "react";

// ─── Ordo Salutis — the order of salvation ─────────────────────
// Romans 8:29-30 lists the chain: foreknew → predestined → called → justified
// → glorified. The church has expanded this into a fuller ordo: election,
// effectual calling, regeneration, faith and repentance, justification,
// adoption, sanctification, perseverance, glorification. The figure shows
// the chain as a left-to-right cascade, with arrows of the Spirit's work
// between each link. Christians frame it differently; Scripture is firm
// that all of it is grace.

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

const VIEW_W = 1200;
const VIEW_H = 320;

export default function OrdoSalutisFlow() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? STAGES.find((s) => s.id === active) : null;

  // X positions across width
  const xs = STAGES.map((_, i) => 80 + (i * (VIEW_W - 160)) / (STAGES.length - 1));
  const Y = 150;

  // The path connecting all stages — a gentle wave so the eye flows
  const pathD = (() => {
    let d = `M ${xs[0]} ${Y}`;
    for (let i = 1; i < xs.length; i++) {
      const prev = xs[i - 1];
      const curr = xs[i];
      const mid = (prev + curr) / 2;
      const yOff = i % 2 === 0 ? Y - 24 : Y + 24;
      d += ` Q ${mid} ${yOff}, ${curr} ${Y}`;
    }
    return d;
  })();

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block w-full min-w-[820px] h-auto"
          role="img"
          aria-label="Ordo salutis — the order of salvation, from election to glorification."
        >
          <defs>
            <linearGradient id="os-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(120 113 108)" />
              <stop offset="50%" stopColor="rgb(249 115 22)" />
              <stop offset="100%" stopColor="rgb(254 215 170)" />
            </linearGradient>
          </defs>

          {/* Connecting path */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#os-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: drawn ? 0 : 1400,
              transition: "stroke-dashoffset 2400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Stage nodes */}
          {STAGES.map((s, i) => {
            const isOn = active === s.id;
            const x = xs[i];
            const above = i % 2 === 0;
            const labelY = above ? Y - 56 : Y + 70;
            return (
              <g
                key={s.id}
                tabIndex={0}
                role="button"
                aria-label={`${s.label}: ${s.blurb}`}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive((c) => (c === s.id ? null : c))}
                onFocus={() => setActive(s.id)}
                style={{
                  cursor: "pointer",
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 600ms ease ${500 + i * 110}ms`,
                }}
              >
                {/* tick line from path to label */}
                <line
                  x1={x}
                  y1={Y}
                  x2={x}
                  y2={above ? Y - 38 : Y + 38}
                  stroke="rgb(255 255 255 / 0.15)"
                  strokeWidth={1}
                />
                {isOn && (
                  <circle cx={x} cy={Y} r={14} fill="none" stroke="rgb(254 215 170)" strokeWidth={1.2} opacity={0.6} />
                )}
                <circle
                  cx={x}
                  cy={Y}
                  r={isOn ? 8 : 6}
                  fill={isOn ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                  stroke="rgb(15 23 42)"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={labelY}
                  textAnchor="middle"
                  className={isOn ? "fill-flame-200" : "fill-ink-100"}
                  style={{ font: `${isOn ? "600" : "500"} 12px ui-serif, Georgia, serif` }}
                >
                  {s.label}
                </text>
                <text
                  x={x}
                  y={labelY + (above ? -14 : 14)}
                  textAnchor="middle"
                  className="fill-ink-400"
                  style={{ font: "italic 9px ui-serif, Georgia, serif" }}
                >
                  {s.ref}
                </text>
              </g>
            );
          })}

          {/* Headers */}
          <text x={80} y={26} className="fill-flame-300" style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1200ms" }}>
            BEGINS WITH GOD
          </text>
          <text x={VIEW_W - 80} y={26} textAnchor="end" className="fill-flame-300" style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1300ms" }}>
            ENDS WITH GOD
          </text>
        </svg>
      </div>

      <div className="mt-3 min-h-[3rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">{focused.ref}</span>
            <span className="font-serif text-ink-50">{focused.label}.</span>
            <span className="ml-2 text-ink-300 italic">{focused.blurb}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            The order of salvation — every link the work of grace. Hover any node for its summary and scripture.
            Christians frame the order differently; all confess it is His work from first to last.
          </span>
        )}
      </div>
    </figure>
  );
}
