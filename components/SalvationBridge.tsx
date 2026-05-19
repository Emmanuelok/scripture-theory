"use client";

import { useEffect, useState } from "react";

// ─── The Salvation Bridge ──────────────────────────────────────
// A classic gospel illustration: a chasm of sin separates humanity from
// God; the cross bridges it. Drawn as two cliffs with labels — humanity
// on the left, God on the right — and the cross as the only crossing.

const VIEW_W = 1100;
const VIEW_H = 460;

type Side = {
  id: string;
  title: string;
  body: string;
  refs: string[];
};

const HUMAN: Side = {
  id: "humanity",
  title: "Humanity",
  body: "Made in God's image. Loved. Real worth. Yet separated from God by sin — restless, guilty, dying.",
  refs: ["Romans 3:23", "Isaiah 59:2", "Romans 6:23"],
};
const GOD: Side = {
  id: "god",
  title: "God",
  body: "Holy. Loving. Just. The Father of every good gift. Always taking the first step toward us.",
  refs: ["1 John 4:8", "Habakkuk 1:13", "Romans 5:8"],
};
const CHASM = {
  id: "chasm",
  title: "Sin · the chasm",
  body: "Not a small gap. Not bridgeable by good works, religion, ritual, or sincerity. We cannot reach across.",
  refs: ["Isaiah 64:6", "Galatians 2:16", "Ephesians 2:8-9"],
};
const CROSS = {
  id: "cross",
  title: "The Cross — the only bridge",
  body: "God Himself crossed first. Christ bore our sin so we could come back. Trust Him and walk over.",
  refs: ["John 14:6", "1 Timothy 2:5", "1 Peter 3:18"],
};

export default function SalvationBridge() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused: Side | null =
    active === "humanity" ? HUMAN :
    active === "god" ? GOD :
    active === "chasm" ? CHASM :
    active === "cross" ? CROSS :
    null;

  // Cliff geometry
  const groundY = 320;
  const leftCliffX = 250;
  const rightCliffX = VIEW_W - 250;
  const chasmDepth = VIEW_H - groundY;
  const CX = VIEW_W / 2;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="-mx-2 md:mx-0 overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block w-full min-w-[820px] h-auto"
          role="img" aria-label="The salvation bridge — the cross spanning the chasm of sin between humanity and God.">
          <defs>
            <linearGradient id="sb-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(60 65 80)" />
              <stop offset="100%" stopColor="rgb(15 23 42)" />
            </linearGradient>
            <linearGradient id="sb-ground-left" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(180 169 158)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="rgb(120 113 108)" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="sb-ground-right" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0.25" />
            </linearGradient>
            <radialGradient id="sb-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.55" />
              <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect x={0} y={0} width={VIEW_W} height={groundY} fill="url(#sb-sky)" />

          {/* Glow over the cross */}
          <ellipse cx={CX} cy={groundY - 80} rx={200} ry={70} fill="url(#sb-glow)"
            style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 1500ms" }} />

          {/* Left cliff (Humanity) */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Humanity"
            onMouseEnter={() => setActive("humanity")}
            onMouseLeave={() => setActive((c) => (c === "humanity" ? null : c))}
            onFocus={() => setActive("humanity")}
            onClick={() => setActive((c) => (c === "humanity" ? null : "humanity"))}
            style={{ cursor: "pointer", opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 500ms" }}
          >
            <path
              d={`M 0 ${groundY} L ${leftCliffX} ${groundY} L ${leftCliffX} ${groundY + chasmDepth} L 0 ${groundY + chasmDepth} Z`}
              fill="url(#sb-ground-left)"
              stroke="rgb(254 215 170 / 0.35)"
              strokeWidth={1.5}
            />
            <text x={leftCliffX / 2} y={groundY - 100} textAnchor="middle" className="fill-ink-100"
              style={{ font: "700 22px ui-serif, Georgia, serif", letterSpacing: "0.03em" }}>
              Humanity
            </text>
            <text x={leftCliffX / 2} y={groundY - 80} textAnchor="middle" className="fill-ink-200"
              style={{ font: "italic 11px ui-serif, Georgia, serif" }}>
              made in His image · separated by sin
            </text>
            {/* A small standing figure on top */}
            <g transform={`translate(${leftCliffX / 2} ${groundY - 30})`}>
              <circle cx={0} cy={-18} r={6} fill="rgb(254 215 170 / 0.85)" />
              <rect x={-3} y={-12} width={6} height={18} fill="rgb(254 215 170 / 0.75)" />
              <line x1={0} y1={6} x2={-6} y2={20} stroke="rgb(254 215 170 / 0.75)" strokeWidth={2} />
              <line x1={0} y1={6} x2={6}  y2={20} stroke="rgb(254 215 170 / 0.75)" strokeWidth={2} />
            </g>
          </g>

          {/* Right cliff (God) */}
          <g
            tabIndex={0}
            role="button"
            aria-label="God"
            onMouseEnter={() => setActive("god")}
            onMouseLeave={() => setActive((c) => (c === "god" ? null : c))}
            onFocus={() => setActive("god")}
            onClick={() => setActive((c) => (c === "god" ? null : "god"))}
            style={{ cursor: "pointer", opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 700ms" }}
          >
            <path
              d={`M ${rightCliffX} ${groundY} L ${VIEW_W} ${groundY} L ${VIEW_W} ${groundY + chasmDepth} L ${rightCliffX} ${groundY + chasmDepth} Z`}
              fill="url(#sb-ground-right)"
              stroke="rgb(254 215 170 / 0.55)"
              strokeWidth={1.5}
            />
            <text x={rightCliffX + (VIEW_W - rightCliffX) / 2} y={groundY - 100} textAnchor="middle" className="fill-flame-100"
              style={{ font: "700 22px ui-serif, Georgia, serif", letterSpacing: "0.03em" }}>
              God
            </text>
            <text x={rightCliffX + (VIEW_W - rightCliffX) / 2} y={groundY - 80} textAnchor="middle" className="fill-flame-300"
              style={{ font: "italic 11px ui-serif, Georgia, serif" }}>
              holy · loving · just
            </text>
            {/* A light "throne" silhouette */}
            <g transform={`translate(${rightCliffX + (VIEW_W - rightCliffX) / 2} ${groundY - 30})`}>
              <rect x={-12} y={-30} width={24} height={36} rx={3} fill="rgb(249 115 22 / 0.75)" stroke="rgb(254 215 170)" />
              <circle cx={0} cy={-44} r={9} fill="rgb(254 215 170)" />
            </g>
          </g>

          {/* Chasm label (under the cliffs) */}
          <g
            tabIndex={0}
            role="button"
            aria-label="Chasm of sin"
            onMouseEnter={() => setActive("chasm")}
            onMouseLeave={() => setActive((c) => (c === "chasm" ? null : c))}
            onFocus={() => setActive("chasm")}
            onClick={() => setActive((c) => (c === "chasm" ? null : "chasm"))}
            style={{ cursor: "pointer", opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1000ms" }}
          >
            <text x={CX} y={VIEW_H - 80} textAnchor="middle" className="fill-ink-200"
              style={{ font: "italic 700 14px ui-serif, Georgia, serif", letterSpacing: "0.06em" }}>
              the chasm of sin
            </text>
            <text x={CX} y={VIEW_H - 60} textAnchor="middle" className="fill-ink-300"
              style={{ font: "italic 11px ui-serif, Georgia, serif" }}>
              no human work spans this
            </text>
          </g>

          {/* The cross — bridge */}
          <g
            tabIndex={0}
            role="button"
            aria-label="The cross — the only bridge"
            onMouseEnter={() => setActive("cross")}
            onMouseLeave={() => setActive((c) => (c === "cross" ? null : c))}
            onFocus={() => setActive("cross")}
            onClick={() => setActive((c) => (c === "cross" ? null : "cross"))}
            style={{ cursor: "pointer", opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 1500ms" }}
          >
            {/* The horizontal beam = the bridge itself */}
            <rect
              x={leftCliffX - 10}
              y={groundY - 5}
              width={(rightCliffX - leftCliffX) + 20}
              height={10}
              rx={3}
              fill="rgb(254 215 170)"
              stroke="rgb(15 23 42)"
              strokeWidth={1}
              style={{
                opacity: active === "cross" ? 1 : 0.92,
                transition: "opacity 200ms",
              }}
            />
            {/* Vertical post at centre */}
            <rect
              x={CX - 5}
              y={groundY - 110}
              width={10}
              height={220}
              rx={3}
              fill="rgb(254 215 170)"
              stroke="rgb(15 23 42)"
              strokeWidth={1}
            />
            {/* INRI plate */}
            <rect x={CX - 22} y={groundY - 110} width={44} height={16} rx={2} fill="rgb(15 23 42)" stroke="rgb(254 215 170 / 0.7)" />
            <text x={CX} y={groundY - 98} textAnchor="middle" className="fill-flame-200"
              style={{ font: "700 9px ui-serif, Georgia, serif", letterSpacing: "0.18em" }}>
              INRI
            </text>
            {/* Label above the cross */}
            <text x={CX} y={groundY - 130} textAnchor="middle" className="fill-flame-200"
              style={{ font: "italic 700 14px ui-serif, Georgia, serif" }}>
              the only bridge
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 min-h-[4rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">
              {focused.refs.join(" · ")}
            </span>
            <span className="font-serif text-ink-50">{focused.title}.</span>
            <span className="block mt-1 text-ink-300 italic">{focused.body}</span>
          </div>
        ) : (
          <span className="italic text-ink-400">
            A classic Christian picture: humanity and God on either side of a chasm sin alone
            could open. Christ on the cross is the only bridge. Hover any element to read it.
          </span>
        )}
      </div>
    </figure>
  );
}
