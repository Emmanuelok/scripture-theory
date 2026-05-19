"use client";

import { useEffect, useState } from "react";

// ─── The Twelve — a constellation around Christ ─────────────────
// The twelve apostles arranged as twelve points orbiting a central marker
// for Christ. Each node carries the name, the trade or background where
// Scripture gives one, and tradition about how the apostle ended.

type Apostle = {
  id: string;
  name: string;
  also?: string;
  background: string;
  endTradition: string;
  ref: string;
};

const TWELVE: Apostle[] = [
  { id: "peter",      name: "Peter",     also: "Simon · Cephas",         background: "Fisherman of Bethsaida; brother of Andrew.", endTradition: "Crucified upside-down in Rome under Nero, by tradition.", ref: "John 1:42" },
  { id: "andrew",     name: "Andrew",                                    background: "Fisherman; the first to bring his brother to Jesus.",  endTradition: "Crucified on an X-shaped cross at Patras, by tradition.",          ref: "John 1:40-42" },
  { id: "james-z",    name: "James (the Greater)", also: "son of Zebedee", background: "Fisherman; brother of John.",                          endTradition: "Beheaded by Herod Agrippa I — the first apostle to die for Christ.", ref: "Acts 12:1-2" },
  { id: "john",       name: "John",      also: "the beloved",              background: "Fisherman; brother of James; writer of the Fourth Gospel.", endTradition: "Exiled to Patmos under Domitian; died old at Ephesus.",            ref: "Revelation 1:9" },
  { id: "philip",     name: "Philip",                                    background: "From Bethsaida; brought Nathanael.",                    endTradition: "Martyred at Hierapolis in Phrygia, by tradition.",                 ref: "John 1:43-46" },
  { id: "bartholomew", name: "Bartholomew", also: "Nathanael",            background: "Of Cana in Galilee; \"an Israelite in whom is no deceit.\"", endTradition: "Flayed and crucified in Armenia, by tradition.",                  ref: "John 1:47" },
  { id: "thomas",     name: "Thomas",    also: "the Twin (Didymus)",      background: "Loyal to the death (John 11:16); slow to believe without proof.", endTradition: "Carried the gospel to India; speared at Mylapore, by tradition.", ref: "John 20:24-29" },
  { id: "matthew",    name: "Matthew",   also: "Levi",                    background: "Tax collector at Capernaum; writer of the First Gospel.", endTradition: "Various traditions — Ethiopia and Persia; martyred.",            ref: "Matthew 9:9" },
  { id: "james-a",    name: "James (the Less)", also: "son of Alphaeus",  background: "Less is known of him by name in the Gospels.",          endTradition: "Stoned, by tradition; sometimes identified with the James of the Jerusalem church.", ref: "Mark 3:18" },
  { id: "thaddaeus",  name: "Thaddaeus", also: "Jude · Lebbaeus",         background: "Asked Jesus, 'Why will You manifest Yourself to us and not to the world?' (John 14:22)", endTradition: "Martyred in Persia, by tradition.",                                  ref: "John 14:22" },
  { id: "simon-z",    name: "Simon",     also: "the Zealot",              background: "Of zealot background; the political extreme of the Twelve.", endTradition: "Martyred, by various traditions.",                                ref: "Luke 6:15" },
  { id: "judas",      name: "Judas Iscariot",                            background: "Keeper of the money bag; the betrayer.",                endTradition: "Hanged himself after returning the silver. Matthias was chosen in his place (Acts 1:26).", ref: "John 13:26-30" },
];

const VIEW = 600;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_NODE = 220;
const R_LABEL = 260;

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function ApostlesConstellation() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? TWELVE.find((a) => a.id === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[560px] h-auto"
            role="img" aria-label="The twelve apostles arranged around Christ at the centre.">
            <defs>
              <radialGradient id="ac-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.75" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={140} fill="url(#ac-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Lines from each apostle to Christ */}
            {TWELVE.map((a, i) => {
              const angle = -Math.PI / 2 + (i / TWELVE.length) * Math.PI * 2;
              const p = polar(R_NODE - 16, angle);
              const c = polar(70, angle);
              const isJudas = a.id === "judas";
              return (
                <line
                  key={`line-${a.id}`}
                  x1={c.x} y1={c.y}
                  x2={p.x} y2={p.y}
                  stroke={isJudas ? "rgb(120 113 108 / 0.4)" : "rgb(254 215 170 / 0.35)"}
                  strokeWidth={1}
                  strokeDasharray={isJudas ? "3 4" : undefined}
                  style={{
                    strokeDasharray: isJudas ? "3 4" : 280,
                    strokeDashoffset: drawn ? 0 : 280,
                    transition: `stroke-dashoffset 1000ms ease ${300 + i * 80}ms`,
                  }}
                />
              );
            })}

            {/* Apostle nodes */}
            {TWELVE.map((a, i) => {
              const angle = -Math.PI / 2 + (i / TWELVE.length) * Math.PI * 2;
              const p = polar(R_NODE, angle);
              const lp = polar(R_LABEL, angle);
              const isOn = active === a.id;
              const isJudas = a.id === "judas";
              const color = isJudas ? "rgb(120 113 108)" : "rgb(254 215 170)";

              return (
                <g
                  key={a.id}
                  tabIndex={0}
                  role="button"
                  aria-label={a.name}
                  onMouseEnter={() => setActive(a.id)}
                  onMouseLeave={() => setActive((c) => (c === a.id ? null : c))}
                  onFocus={() => setActive(a.id)}
                  onClick={() => setActive((c) => (c === a.id ? null : a.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 600ms ease ${500 + i * 70}ms`,
                  }}
                >
                  {isOn && (
                    <circle cx={p.x} cy={p.y} r={18} fill="none" stroke={color} strokeWidth={1.4} opacity={0.6} />
                  )}
                  <circle cx={p.x} cy={p.y} r={isOn ? 11 : 9} fill={color} stroke="rgb(15 23 42)" strokeWidth={1.4} />
                  <text
                    x={lp.x}
                    y={lp.y + 4}
                    textAnchor="middle"
                    className={isOn ? "fill-flame-200" : isJudas ? "fill-ink-300" : "fill-ink-100"}
                    style={{
                      font: `${isOn ? "600" : "500"} 10.5px ui-serif, Georgia, serif`,
                      letterSpacing: "0.01em",
                      transition: "fill 200ms",
                    }}
                  >
                    {a.name}
                  </text>
                </g>
              );
            })}

            {/* Christ at the centre */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1300ms" }}>
              <circle cx={CX} cy={CY} r={52} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY + 7} textAnchor="middle" className="fill-flame-100"
                style={{ font: "700 19px ui-serif, Georgia, serif", letterSpacing: "0.02em" }}>
                Christ
              </text>
            </g>

            {/* Caption */}
            <text x={VIEW / 2} y={VIEW - 14} textAnchor="middle" className="fill-ink-200"
              style={{ font: "italic 10px ui-serif, Georgia, serif", letterSpacing: "0.06em", opacity: drawn ? 0.85 : 0, transition: "opacity 800ms ease 1800ms" }}>
              Mark 3:14 — He appointed twelve, that they might be with Him
            </text>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[12rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? "Apostle" : "The Twelve"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.name}</h3>
              {focused.also && (
                <p className="text-xs text-flame-300 italic mt-0.5">also: {focused.also}</p>
              )}
              <p className="mt-3 text-ink-200">{focused.background}</p>
              <p className="mt-3 text-ink-300 text-xs italic">{focused.endTradition}</p>
              <p className="mt-2 text-[11px] text-flame-300">{focused.ref}</p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">Ordinary men, called.</h3>
              <p className="mt-2 text-ink-200 italic">
                Fishermen, a tax collector, a zealot — and a traitor. He chose them so the
                world would know the power is His, not theirs. Hover any name.
              </p>
              <p className="mt-3 text-[11px] text-ink-400">
                The dotted line is Judas, who walked from the circle into the dark.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
