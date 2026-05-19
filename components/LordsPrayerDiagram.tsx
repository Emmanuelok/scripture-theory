"use client";

import { useEffect, useState } from "react";

// ─── The Lord's Prayer — structure diagram ─────────────────────
// The prayer Jesus taught has a shape: an address ("Our Father"), three
// petitions oriented to God ("Your name… Your kingdom… Your will"), three
// oriented to us ("daily bread… forgive us… deliver us"), and a doxology
// that returns to Him. The figure makes the architecture visible.

type Petition = {
  id: string;
  phrase: string;
  meditation: string;
};

const ADDRESS: Petition = {
  id: "address",
  phrase: "Our Father in heaven,",
  meditation: "We are not orphans. We begin by belonging.",
};
const DOXOLOGY: Petition = {
  id: "doxology",
  phrase: "For yours is the kingdom and the power and the glory, forever. Amen.",
  meditation: "We end where we began — with Him.",
};
const GODWARD: Petition[] = [
  { id: "name",   phrase: "hallowed be your name.",                            meditation: "Before our needs, His glory." },
  { id: "kingdom", phrase: "Your kingdom come,",                                meditation: "We ask the King's rule to come here." },
  { id: "will",    phrase: "your will be done, on earth as it is in heaven.",   meditation: "May earth look more like heaven today." },
];
const USWARD: Petition[] = [
  { id: "bread",   phrase: "Give us this day our daily bread.",                 meditation: "Today's bread, not next year's. Trust is daily." },
  { id: "forgive", phrase: "And forgive us our debts, as we have forgiven ours.", meditation: "Forgiven people forgive." },
  { id: "deliver", phrase: "Lead us not into temptation; deliver us from evil.", meditation: "We are weak; Father, steer and rescue." },
];

const VIEW_W = 800;
const VIEW_H = 540;

export default function LordsPrayerDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused: Petition | null = active
    ? [ADDRESS, ...GODWARD, ...USWARD, DOXOLOGY].find((p) => p.id === active) ?? null
    : null;

  // Layout: Address top centre, Godward column left, Usward column right,
  // Doxology bottom centre. Spines from address downward to each column.
  const CX = VIEW_W / 2;
  const colYStart = 160;
  const colYStep = 90;
  const leftX = CX - 200;
  const rightX = CX + 200;
  const addressY = 60;
  const doxologyY = VIEW_H - 50;

  function NodeRect({ x, y, label, id, side }: { x: number; y: number; label: string; id: string; side?: "godward" | "usward" | "anchor" }) {
    const isOn = active === id;
    const color = side === "godward" ? "rgb(245 158 11)" : side === "usward" ? "rgb(249 115 22)" : "rgb(254 215 170)";
    return (
      <g
        tabIndex={0}
        role="button"
        aria-label={label}
        onMouseEnter={() => setActive(id)}
        onMouseLeave={() => setActive((c) => (c === id ? null : c))}
        onFocus={() => setActive(id)}
        onClick={() => setActive((c) => (c === id ? null : id))}
        style={{ cursor: "pointer" }}
      >
        <rect
          x={x - 170}
          y={y - 26}
          width={340}
          height={52}
          rx={26}
          fill={isOn ? "rgb(30 41 59)" : "rgb(15 23 42)"}
          stroke={isOn ? color : "rgb(255 255 255 / 0.18)"}
          strokeWidth={isOn ? 2 : 1}
          style={{ transition: "stroke 200ms, fill 200ms" }}
        />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill={isOn ? color : "rgb(248 250 252)"}
          style={{ font: "italic 13px ui-serif, Georgia, serif", pointerEvents: "none", transition: "fill 200ms" }}
        >
          {label}
        </text>
      </g>
    );
  }

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="block w-full min-w-[640px] h-auto"
          role="img"
          aria-label="A diagram of the Lord's Prayer — address, three Godward petitions, three usward petitions, doxology."
        >
          <defs>
            <linearGradient id="lp-godward" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="lp-usward" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Column spines */}
          <line x1={leftX} y1={addressY + 30} x2={leftX} y2={doxologyY - 30} stroke="url(#lp-godward)" strokeWidth={2}
            style={{ strokeDasharray: 600, strokeDashoffset: drawn ? 0 : 600, transition: "stroke-dashoffset 1400ms ease 400ms" }} />
          <line x1={rightX} y1={addressY + 30} x2={rightX} y2={doxologyY - 30} stroke="url(#lp-usward)" strokeWidth={2}
            style={{ strokeDasharray: 600, strokeDashoffset: drawn ? 0 : 600, transition: "stroke-dashoffset 1400ms ease 600ms" }} />

          {/* From Address down to top of each column */}
          <path
            d={`M ${CX} ${addressY + 26} C ${CX - 50} ${addressY + 60}, ${leftX + 50} ${colYStart - 60}, ${leftX} ${colYStart - 26}`}
            fill="none"
            stroke="rgb(245 158 11 / 0.6)"
            strokeWidth={2}
            style={{ strokeDasharray: 400, strokeDashoffset: drawn ? 0 : 400, transition: "stroke-dashoffset 1400ms ease 700ms" }}
          />
          <path
            d={`M ${CX} ${addressY + 26} C ${CX + 50} ${addressY + 60}, ${rightX - 50} ${colYStart - 60}, ${rightX} ${colYStart - 26}`}
            fill="none"
            stroke="rgb(249 115 22 / 0.6)"
            strokeWidth={2}
            style={{ strokeDasharray: 400, strokeDashoffset: drawn ? 0 : 400, transition: "stroke-dashoffset 1400ms ease 800ms" }}
          />

          {/* From bottom of columns to Doxology */}
          <path
            d={`M ${leftX} ${colYStart + colYStep * 2 + 26} C ${leftX + 50} ${doxologyY - 60}, ${CX - 50} ${doxologyY - 60}, ${CX} ${doxologyY - 26}`}
            fill="none"
            stroke="rgb(245 158 11 / 0.6)"
            strokeWidth={2}
            style={{ strokeDasharray: 400, strokeDashoffset: drawn ? 0 : 400, transition: "stroke-dashoffset 1400ms ease 1500ms" }}
          />
          <path
            d={`M ${rightX} ${colYStart + colYStep * 2 + 26} C ${rightX - 50} ${doxologyY - 60}, ${CX + 50} ${doxologyY - 60}, ${CX} ${doxologyY - 26}`}
            fill="none"
            stroke="rgb(249 115 22 / 0.6)"
            strokeWidth={2}
            style={{ strokeDasharray: 400, strokeDashoffset: drawn ? 0 : 400, transition: "stroke-dashoffset 1400ms ease 1600ms" }}
          />

          {/* Column captions */}
          <text x={leftX} y={addressY + 80} textAnchor="middle" className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1100ms" }}>
            GODWARD ↓
          </text>
          <text x={rightX} y={addressY + 80} textAnchor="middle" className="fill-flame-300"
            style={{ font: "italic 500 11px ui-sans-serif, system-ui", letterSpacing: "0.06em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1200ms" }}>
            USWARD ↓
          </text>

          {/* Address */}
          <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 700ms ease 200ms" }}>
            <NodeRect x={CX} y={addressY} label={ADDRESS.phrase} id={ADDRESS.id} side="anchor" />
          </g>

          {/* Godward column */}
          {GODWARD.map((p, i) => (
            <g key={p.id} style={{ opacity: drawn ? 1 : 0, transition: `opacity 700ms ease ${800 + i * 120}ms` }}>
              <NodeRect x={leftX} y={colYStart + i * colYStep} label={p.phrase} id={p.id} side="godward" />
            </g>
          ))}

          {/* Usward column */}
          {USWARD.map((p, i) => (
            <g key={p.id} style={{ opacity: drawn ? 1 : 0, transition: `opacity 700ms ease ${900 + i * 120}ms` }}>
              <NodeRect x={rightX} y={colYStart + i * colYStep} label={p.phrase} id={p.id} side="usward" />
            </g>
          ))}

          {/* Doxology */}
          <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 700ms ease 1800ms" }}>
            <NodeRect x={CX} y={doxologyY} label="For Yours is the kingdom… Amen." id={DOXOLOGY.id} side="anchor" />
          </g>
        </svg>
      </div>

      <div className="mt-4 min-h-[3rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">Pray slowly</span>
            <span className="font-serif text-ink-50">{focused.phrase}</span>
            <span className="block mt-1 text-ink-300 italic">{focused.meditation}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            The architecture Jesus gave: belong (Father) → glorify (three Godward) → ask (three usward) → return (doxology).
            Hover any line to read it slowly.
          </span>
        )}
      </div>
    </figure>
  );
}
