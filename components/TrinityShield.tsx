"use client";

import { useEffect, useState } from "react";

// ─── Scutum Fidei — the medieval Trinity Shield ───────────────
// Three Persons at the corners of an equilateral triangle, "God" in the
// centre. The edges between any two Persons read "is not" — the Father is
// not the Son, etc. — and the spokes from each Person to the centre read
// "is" — the Father IS God, the Son IS God, the Spirit IS God. The classic
// orthodox confession in one image.

type Node = { id: string; label: string; cx: number; cy: number };

const W = 520;
const H = 460;
const CX = W / 2;        // centre x
const CY = H / 2 + 12;   // centre y, biased slightly down to balance crown
const R = 170;           // triangle circumradius

// Equilateral triangle: top-left, top-right, bottom
const NODES: Node[] = [
  { id: "father",  label: "Father",      cx: CX - R * Math.sin(Math.PI / 3), cy: CY - R / 2 },
  { id: "son",     label: "Son",         cx: CX + R * Math.sin(Math.PI / 3), cy: CY - R / 2 },
  { id: "spirit",  label: "Holy Spirit", cx: CX,                              cy: CY + R },
];
const CENTRE = { id: "god", label: "God", cx: CX, cy: CY };

// Pretty mid-edge label coords (slightly offset outward from the edge).
function midOutward(a: Node, b: Node, away: number) {
  const mx = (a.cx + b.cx) / 2;
  const my = (a.cy + b.cy) / 2;
  const dx = mx - CX;
  const dy = my - CY;
  const len = Math.hypot(dx, dy) || 1;
  return { x: mx + (dx / len) * away, y: my + (dy / len) * away };
}
function midToward(a: Node, away: number) {
  const dx = CENTRE.cx - a.cx;
  const dy = CENTRE.cy - a.cy;
  const len = Math.hypot(dx, dy) || 1;
  const mx = a.cx + dx * 0.45;
  const my = a.cy + dy * 0.45;
  // perpendicular offset for readability
  const perpX = -dy / len;
  const perpY = dx / len;
  return { x: mx + perpX * away, y: my + perpY * away };
}

export default function TrinityShield() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const isNotEdges = [
    { a: NODES[0], b: NODES[1] }, // Father — Son
    { a: NODES[1], b: NODES[2] }, // Son — Spirit
    { a: NODES[0], b: NODES[2] }, // Father — Spirit
  ];

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-8 glow-ring">
      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="block mx-auto w-full max-w-[520px] h-auto"
            role="img"
            aria-label="Scutum Fidei — Trinity Shield. The Father, the Son, and the Holy Spirit each are God; none is the others."
          >
            <defs>
              <radialGradient id="ts-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.7" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* SCVTVM · FIDEI caption — placed at the top where there's room */}
            <text
              x={W / 2}
              y={22}
              textAnchor="middle"
              className="fill-ink-200"
              style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.08em", opacity: drawn ? 0.85 : 0, transition: "opacity 800ms ease 1900ms" }}
            >
              SCVTVM · FIDEI — the shield of faith
            </text>

            {/* Central halo */}
            <circle cx={CENTRE.cx} cy={CENTRE.cy} r={70} fill="url(#ts-glow)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 600ms" }} />

            {/* Outer triangle edges (is NOT). Solid stroke — gradients on <line> can render invisibly. */}
            {isNotEdges.map((e, i) => (
              <line
                key={i}
                x1={e.a.cx} y1={e.a.cy}
                x2={e.b.cx} y2={e.b.cy}
                stroke="rgb(180 169 158 / 0.65)"
                strokeWidth={2}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 700,
                  strokeDashoffset: drawn ? 0 : 700,
                  transition: `stroke-dashoffset 1100ms ease ${300 + i * 150}ms`,
                }}
              />
            ))}

            {/* Spokes (IS) from each corner to centre */}
            {NODES.map((n, i) => (
              <line
                key={n.id}
                x1={n.cx} y1={n.cy}
                x2={CENTRE.cx} y2={CENTRE.cy}
                stroke="rgb(249 115 22 / 0.7)"
                strokeWidth={2.2}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: drawn ? 0 : 400,
                  transition: `stroke-dashoffset 1100ms ease ${900 + i * 150}ms`,
                }}
              />
            ))}

            {/* "IS" labels on spokes */}
            {NODES.map((n, i) => {
              const p = midToward(n, 0);
              return (
                <g key={`is-${n.id}`} style={{ opacity: drawn ? 1 : 0, transition: `opacity 600ms ease ${1500 + i * 120}ms` }}>
                  <rect x={p.x - 14} y={p.y - 10} width={28} height={20} rx={10} fill="rgb(15 23 42)" stroke="rgb(249 115 22 / 0.5)" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" className="fill-flame-300"
                    style={{ font: "italic 11px ui-serif, Georgia, serif" }}>
                    is
                  </text>
                </g>
              );
            })}

            {/* "IS NOT" labels on outer edges */}
            {isNotEdges.map((e, i) => {
              const p = midOutward(e.a, e.b, 18);
              return (
                <g key={`isnot-${i}`} style={{ opacity: drawn ? 1 : 0, transition: `opacity 600ms ease ${1700 + i * 120}ms` }}>
                  <rect x={p.x - 26} y={p.y - 10} width={52} height={20} rx={10} fill="rgb(15 23 42)" stroke="rgb(180 169 158 / 0.55)" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" className="fill-ink-300"
                    style={{ font: "italic 11px ui-serif, Georgia, serif" }}>
                    is not
                  </text>
                </g>
              );
            })}

            {/* Person nodes */}
            {NODES.map((n, i) => {
              const isOn = active === n.id;
              return (
                <g
                  key={n.id}
                  tabIndex={0}
                  role="button"
                  aria-label={n.label}
                  onMouseEnter={() => setActive(n.id)}
                  onMouseLeave={() => setActive((c) => (c === n.id ? null : c))}
                  onFocus={() => setActive(n.id)}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${1300 + i * 150}ms`,
                  }}
                >
                  <circle cx={n.cx} cy={n.cy} r={44} fill="rgb(30 41 59)" stroke={isOn ? "rgb(249 115 22)" : "rgb(254 215 170 / 0.6)"} strokeWidth={isOn ? 2.4 : 1.6} />
                  <text x={n.cx} y={n.cy + 5} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "600 13px ui-serif, Georgia, serif" }}>
                    {n.label}
                  </text>
                </g>
              );
            })}

            {/* Centre "God" node */}
            <g
              tabIndex={0}
              role="button"
              aria-label="God"
              onMouseEnter={() => setActive("god")}
              onMouseLeave={() => setActive((c) => (c === "god" ? null : c))}
              style={{
                cursor: "pointer",
                opacity: drawn ? 1 : 0,
                transition: "opacity 900ms ease 1700ms",
              }}
            >
              <circle cx={CENTRE.cx} cy={CENTRE.cy} r={48} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CENTRE.cx} y={CENTRE.cy + 6} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 18px ui-serif, Georgia, serif" }}>
                God
              </text>
            </g>

          </svg>
        </div>

        <aside className="text-sm leading-relaxed">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Trinity Shield</div>
          <h3 className="font-serif text-xl text-ink-50 mt-1">One God, three Persons.</h3>
          <p className="mt-3 text-ink-200">
            The medieval church drew this diagram to keep two truths together: that
            the Father, the Son, and the Holy Spirit are each fully God — and that
            no one of them is the other.
          </p>
          <ul className="mt-3 space-y-1 text-ink-300">
            <li>Father <span className="text-flame-300">is</span> God · Son <span className="text-flame-300">is</span> God · Spirit <span className="text-flame-300">is</span> God</li>
            <li>Father <span className="text-ink-400 italic">is not</span> the Son · Son <span className="text-ink-400 italic">is not</span> the Spirit · Father <span className="text-ink-400 italic">is not</span> the Spirit</li>
          </ul>
          <p className="mt-3 text-ink-400 italic text-xs">
            One in essence, three in Person. Not three Gods. Not three masks of one
            Person. The mystery the church confesses without explaining away.
          </p>
        </aside>
      </div>
    </figure>
  );
}
