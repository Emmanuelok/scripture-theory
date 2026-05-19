"use client";

import { useEffect, useState } from "react";

// ─── The Armor of God — Ephesians 6:13-18 ──────────────────────
// A simple silhouette of a standing figure with each piece of Paul's armour
// labelled and connected by a thin leader line. Hover or focus a label to
// see what the piece protects and how to put it on.

type Piece = {
  id: string;
  label: string;
  attaches: string;     // what it represents
  practice: string;     // how we "put it on"
  /** Pixel coords inside 600×640 viewBox */
  x: number;
  y: number;
  /** Where the label text sits */
  labelX: number;
  labelY: number;
};

const PIECES: Piece[] = [
  { id: "helmet",   label: "Helmet of salvation",     attaches: "Settled assurance of being saved in Christ.",
    practice: "When fear or self-doubt rises, return to the gospel: I am Christ's. He is mine.",
    x: 300, y: 90,  labelX: 510, labelY: 90 },
  { id: "breastplate", label: "Breastplate of righteousness", attaches: "Right standing with God in Christ; right living before others.",
    practice: "Quick repentance keeps it tight. A double life loosens the straps.",
    x: 300, y: 220, labelX: 510, labelY: 220 },
  { id: "belt",     label: "Belt of truth",            attaches: "God's truth holding the rest together — and our own truthfulness.",
    practice: "Refuse a lie this week — to others, to yourself. Stay in the Word.",
    x: 300, y: 300, labelX: 90,  labelY: 300 },
  { id: "sword",    label: "Sword of the Spirit",      attaches: "The word of God — the only piece used for attack as well as defence.",
    practice: "Memorise it. Quote it back when temptation comes, as Jesus did in the wilderness.",
    x: 410, y: 330, labelX: 510, labelY: 330 },
  { id: "shield",   label: "Shield of faith",          attaches: "Faith that quenches the enemy's arrows — fear, lies, accusation.",
    practice: "When a fiery arrow lands, name it, then name a promise of Christ that answers it.",
    x: 200, y: 330, labelX: 90,  labelY: 360 },
  { id: "feet",     label: "Feet shod with the gospel of peace", attaches: "Readiness to bring the good news wherever you stand.",
    practice: "Ask before tomorrow: who will I meet who needs to hear of Jesus from me?",
    x: 300, y: 540, labelX: 510, labelY: 540 },
];

const PRAYER: Piece = {
  id: "prayer",
  label: "Prayer in the Spirit",
  attaches: "The atmosphere all the armour is worn in. Without prayer the rest is dress-up.",
  practice: "Pray at fixed hours; pray on the move; pray for the saints (Ephesians 6:18).",
  x: 300, y: 30, labelX: 300, labelY: 14,
};

const VIEW_W = 600;
const VIEW_H = 640;

export default function ArmorOfGod() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? [PRAYER, ...PIECES].find((p) => p.id === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_300px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block mx-auto w-full max-w-[560px] h-auto"
            role="img" aria-label="A figure of a believer wearing the armour of God from Ephesians 6.">
            <defs>
              <radialGradient id="ag-aura" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.45" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ag-fig" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(180 169 158)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="rgb(120 113 108)" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* Aura */}
            <ellipse cx={300} cy={300} rx={180} ry={300} fill="url(#ag-aura)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 400ms" }} />

            {/* Silhouette: head, body, legs */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }}>
              {/* Helmet/head */}
              <circle cx={300} cy={90} r={36} fill="url(#ag-fig)" stroke="rgb(254 215 170 / 0.6)" strokeWidth={1.5} />
              {/* Neck */}
              <rect x={290} y={120} width={20} height={20} fill="rgb(120 113 108)" />
              {/* Breastplate / torso */}
              <path d="M 230 145 Q 300 135, 370 145 L 370 280 Q 300 295, 230 280 Z"
                fill="url(#ag-fig)" stroke="rgb(254 215 170 / 0.6)" strokeWidth={1.5} />
              {/* Belt */}
              <rect x={230} y={285} width={140} height={18} fill="rgb(254 215 170 / 0.55)" stroke="rgb(15 23 42)" />
              {/* Skirt / hips */}
              <path d="M 235 305 L 365 305 L 360 380 L 240 380 Z" fill="rgb(120 113 108 / 0.6)" stroke="rgb(254 215 170 / 0.5)" strokeWidth={1.2} />
              {/* Legs */}
              <rect x={250} y={385} width={42} height={130} fill="url(#ag-fig)" stroke="rgb(254 215 170 / 0.5)" strokeWidth={1.2} />
              <rect x={308} y={385} width={42} height={130} fill="url(#ag-fig)" stroke="rgb(254 215 170 / 0.5)" strokeWidth={1.2} />
              {/* Feet (sandals) */}
              <ellipse cx={271} cy={530} rx={28} ry={8} fill="rgb(254 215 170 / 0.65)" />
              <ellipse cx={329} cy={530} rx={28} ry={8} fill="rgb(254 215 170 / 0.65)" />
              {/* Shield in left hand */}
              <ellipse cx={200} cy={330} rx={36} ry={56} fill="rgb(120 113 108 / 0.7)" stroke="rgb(254 215 170 / 0.7)" strokeWidth={1.5} />
              <line x1={200} y1={280} x2={200} y2={380} stroke="rgb(254 215 170 / 0.6)" strokeWidth={1.2} />
              <line x1={170} y1={330} x2={230} y2={330} stroke="rgb(254 215 170 / 0.6)" strokeWidth={1.2} />
              {/* Sword in right hand */}
              <rect x={406} y={300} width={8} height={120} fill="rgb(254 215 170 / 0.8)" />
              <rect x={394} y={300} width={32} height={6} fill="rgb(254 215 170 / 0.8)" />
              <rect x={408} y={420} width={4} height={14} fill="rgb(120 113 108)" />
            </g>

            {/* Leader lines and labels for each armour piece */}
            {[PRAYER, ...PIECES].map((p, i) => {
              const isOn = active === p.id;
              const isTop = p.id === "prayer";
              return (
                <g key={p.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.label}: ${p.attaches}`}
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive((c) => (c === p.id ? null : c))}
                  onFocus={() => setActive(p.id)}
                  onClick={() => setActive((c) => (c === p.id ? null : p.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${500 + i * 130}ms`,
                  }}
                >
                  {/* Leader line from piece to label area */}
                  {!isTop && (
                    <line
                      x1={p.x}
                      y1={p.y}
                      x2={p.labelX > VIEW_W / 2 ? p.labelX - 70 : p.labelX + 70}
                      y2={p.labelY}
                      stroke={isOn ? "rgb(249 115 22)" : "rgb(254 215 170 / 0.45)"}
                      strokeWidth={isOn ? 1.6 : 1}
                      strokeDasharray="3 3"
                      style={{ transition: "stroke 200ms" }}
                    />
                  )}
                  {/* Marker dot on the figure */}
                  <circle cx={p.x} cy={p.y} r={isOn ? 6 : 4}
                    fill={isOn ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                    stroke="rgb(15 23 42)" strokeWidth={1} />
                  {/* Label */}
                  <text
                    x={p.labelX}
                    y={p.labelY + 4}
                    textAnchor={p.labelX > VIEW_W / 2 ? "start" : p.labelX < VIEW_W / 2 ? "end" : "middle"}
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{ font: `${isOn ? "600" : "500"} 11px ui-serif, Georgia, serif`, transition: "fill 200ms" }}
                  >
                    {p.label}
                  </text>
                </g>
              );
            })}

            {/* Bottom caption */}
            <text x={VIEW_W / 2} y={VIEW_H - 14} textAnchor="middle" className="fill-ink-200"
              style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.06em", opacity: drawn ? 0.85 : 0, transition: "opacity 800ms ease 1800ms" }}>
              Ephesians 6:13 — put on the whole armour of God
            </text>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[12rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? "This piece" : "Stand firm"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.label}</h3>
              <p className="mt-2 text-ink-200">{focused.attaches}</p>
              <div className="mt-3 rounded-xl bg-ink-800/60 border border-ink-700/60 p-3">
                <div className="text-[10px] uppercase tracking-widest text-flame-300 mb-1">Put it on</div>
                <p className="text-ink-100 italic text-sm leading-relaxed">{focused.practice}</p>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Not against flesh and blood.</h3>
              <p className="mt-2 text-ink-200 italic">
                Six pieces, plus the air all of it is worn in — prayer. Paul wrote this from a
                Roman cell, watching the soldier chained to his arm. Hover any label to read it.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
