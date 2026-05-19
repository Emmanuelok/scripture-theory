"use client";

import { useEffect, useState } from "react";

// ─── Acts 1:8 — concentric circles of witness ──────────────────
// "You shall be my witnesses in Jerusalem, in all Judea and Samaria, and to
// the ends of the earth." Jesus' last words before the ascension drew a map
// — and the church has lived inside it ever since. Four rings, each one a
// further reach, all rooted in the same Spirit-given commission.

const VIEW = 560;
const CX = VIEW / 2;
const CY = VIEW / 2;

type Ring = {
  id: string;
  label: string;
  blurb: string;
  prompt: string;
  r: number;            // radius
  color: string;
  textColor?: string;
};

const RINGS: Ring[] = [
  {
    id: "ends",
    label: "Ends of the earth",
    blurb: "Every nation, tribe, tongue — the unreached and the unheard. Most of the church's first century was spent learning to mean this.",
    prompt: "Adopt a country. Support a translator. Pray Revelation 7:9 over a region you have never visited.",
    r: 250,
    color: "#1e3a8a",
  },
  {
    id: "samaria",
    label: "Samaria",
    blurb: "The people you would rather avoid. Different culture, different politics, sometimes painful history. Jesus crossed every Samaria.",
    prompt: "Cross one boundary this month. A meal, a conversation, a service rendered to someone outside your usual circle.",
    r: 195,
    color: "#7c3aed",
  },
  {
    id: "judea",
    label: "Judea",
    blurb: "Your wider community — the city, the workplace, the school. The people you share a roof of language with but not yet a roof of fellowship.",
    prompt: "Name one specific person at work, school, or in the neighborhood who does not know Jesus. Begin to pray for them daily.",
    r: 140,
    color: "#b45309",
  },
  {
    id: "jerusalem",
    label: "Jerusalem",
    blurb: "Home. The people closest. Witness begins at the kitchen table — the hardest place and the first place.",
    prompt: "Tell one person in your household, this week, something true about Jesus that you have seen.",
    r: 85,
    color: "#ea580c",
    textColor: "#0f172a",
  },
];

export default function WitnessCircles() {
  const [active, setActive] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focus = active ? RINGS.find((r) => r.id === active) : RINGS[0];

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_300px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="block mx-auto w-full max-w-[560px] h-auto"
            role="img"
            aria-label="Acts 1:8 — concentric circles of witness from Jerusalem to the ends of the earth."
          >
            <defs>
              <radialGradient id="wc-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.8" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Outer halo */}
            <circle cx={CX} cy={CY} r={270} fill="url(#wc-core)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1400ms ease 600ms" }} />

            {/* Concentric rings, outermost first */}
            {RINGS.map((ring, i) => {
              const isOn = active === ring.id;
              const labelY = CY - ring.r + 18;
              return (
                <g
                  key={ring.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${ring.label} — ${ring.blurb}`}
                  onMouseEnter={() => setActive(ring.id)}
                  onMouseLeave={() => setActive((c) => (c === ring.id ? null : c))}
                  onFocus={() => setActive(ring.id)}
                  onClick={() => setActive((c) => (c === ring.id ? null : ring.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${300 + i * 220}ms`,
                  }}
                >
                  <circle
                    cx={CX}
                    cy={CY}
                    r={ring.r}
                    fill={ring.color}
                    opacity={isOn ? 0.95 : 0.82}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1.5}
                    style={{ transition: "opacity 200ms" }}
                  />
                  {/* ring label arched along the top */}
                  <text
                    x={CX}
                    y={labelY}
                    textAnchor="middle"
                    style={{
                      font: `${isOn ? "700" : "600"} 12px ui-sans-serif, system-ui`,
                      fill: ring.textColor ?? "rgb(248 250 252)",
                      letterSpacing: "0.04em",
                      pointerEvents: "none",
                    }}
                  >
                    {ring.label.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Centre marker — the believer / the church */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1400ms" }}>
              <circle cx={CX} cy={CY} r={14} fill="rgb(15 23 42)" stroke="rgb(254 215 170)" strokeWidth={1.5} />
              <text x={CX} y={CY + 4} textAnchor="middle" className="fill-flame-100"
                style={{ font: "italic 9px ui-serif, Georgia, serif" }}>
                you
              </text>
            </g>

            {/* Caption */}
            <text x={CX} y={VIEW - 14} textAnchor="middle" className="fill-ink-400"
              style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.06em", opacity: drawn ? 0.85 : 0, transition: "opacity 800ms ease 1700ms" }}>
              Acts 1:8 — witness ripples outward from where you stand
            </text>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[12rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {active ? "Circle" : "Where it begins"}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-1">{focus?.label}</h3>
          <p className="mt-2 text-ink-200">{focus?.blurb}</p>
          <div className="mt-3 rounded-xl bg-ink-800/60 border border-ink-700/60 p-3">
            <div className="text-[10px] uppercase tracking-widest text-flame-300 mb-1">One step this week</div>
            <p className="text-ink-100 italic text-sm leading-relaxed">{focus?.prompt}</p>
          </div>
          <p className="mt-3 text-[11px] text-ink-400 italic">
            None of these is optional. Most disciples stay inside the smallest ring all their life.
          </p>
        </aside>
      </div>
    </figure>
  );
}
