"use client";

import { useEffect, useState } from "react";

// ─── Seven "I AM" sayings of Jesus ─────────────────────────────
// John's gospel records seven self-disclosures of Jesus, each using the
// divine name "I AM" (egō eimi, the Greek of Exodus 3:14). The figure
// arranges them as seven spokes around a centre marked "ἐγώ εἰμι" —
// the eighth, absolute "I AM" of John 8:58 stands at the centre.

type Saying = {
  num: number;
  text: string;
  ref: string;
  short: string;
};

const SAYINGS: Saying[] = [
  { num: 1, text: "I am the bread of life.",                  ref: "John 6:35",  short: "Daily bread is good; eternal bread is Christ Himself." },
  { num: 2, text: "I am the light of the world.",             ref: "John 8:12",  short: "Walk with Him and you do not walk in darkness." },
  { num: 3, text: "I am the door of the sheep.",              ref: "John 10:9",  short: "Entry to safety, pasture, the Father — through Him." },
  { num: 4, text: "I am the good shepherd.",                  ref: "John 10:11", short: "The shepherd who lays down His life for the sheep." },
  { num: 5, text: "I am the resurrection and the life.",      ref: "John 11:25", short: "Not just gives them — IS them. Spoken at Lazarus's tomb." },
  { num: 6, text: "I am the way, the truth, and the life.",   ref: "John 14:6",  short: "Three nouns, one Person. No one comes to the Father but by Him." },
  { num: 7, text: "I am the true vine.",                      ref: "John 15:1",  short: "Apart from Him we can do nothing; abide in Him and we bear much fruit." },
];

const VIEW = 580;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_NODE = 215;
const R_LABEL = 250;

function polar(r: number, t: number) {
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function SevenIAmSayings() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? SAYINGS.find((s) => s.num === active) : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_300px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[560px] h-auto"
            role="img" aria-label="Seven I AM sayings of Jesus from the Gospel of John.">
            <defs>
              <radialGradient id="ia-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.8" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r={150} fill="url(#ia-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Spokes */}
            {SAYINGS.map((s, i) => {
              const angle = -Math.PI / 2 + (i / SAYINGS.length) * Math.PI * 2;
              const startP = polar(80, angle);
              const endP = polar(R_NODE - 14, angle);
              const isOn = active === s.num;
              return (
                <line
                  key={`spoke-${s.num}`}
                  x1={startP.x} y1={startP.y}
                  x2={endP.x} y2={endP.y}
                  stroke={isOn ? "rgb(249 115 22)" : "rgb(254 215 170 / 0.4)"}
                  strokeWidth={isOn ? 1.8 : 1.2}
                  style={{
                    strokeDasharray: 240,
                    strokeDashoffset: drawn ? 0 : 240,
                    transition: `stroke-dashoffset 900ms ease ${500 + i * 110}ms, stroke 200ms`,
                  }}
                />
              );
            })}

            {/* Saying nodes */}
            {SAYINGS.map((s, i) => {
              const angle = -Math.PI / 2 + (i / SAYINGS.length) * Math.PI * 2;
              const p = polar(R_NODE, angle);
              const lp = polar(R_LABEL, angle);
              const isOn = active === s.num;
              return (
                <g
                  key={s.num}
                  tabIndex={0}
                  role="button"
                  aria-label={`I am ${s.text}`}
                  onMouseEnter={() => setActive(s.num)}
                  onMouseLeave={() => setActive((c) => (c === s.num ? null : c))}
                  onFocus={() => setActive(s.num)}
                  onClick={() => setActive((c) => (c === s.num ? null : s.num))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${700 + i * 130}ms`,
                  }}
                >
                  {isOn && <circle cx={p.x} cy={p.y} r={20} fill="none" stroke="rgb(249 115 22)" strokeWidth={1.4} opacity={0.55} />}
                  <circle cx={p.x} cy={p.y} r={isOn ? 14 : 12}
                    fill={isOn ? "rgb(249 115 22)" : "rgb(254 215 170)"}
                    stroke="rgb(15 23 42)" strokeWidth={1.4} />
                  <text x={p.x} y={p.y + 4} textAnchor="middle"
                    style={{ font: "700 11px ui-sans-serif, system-ui", fill: "rgb(15 23 42)", pointerEvents: "none" }}>
                    {s.num}
                  </text>
                  {/* Truncated saying as label */}
                  <text x={lp.x} y={lp.y - 4} textAnchor="middle"
                    className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{ font: `${isOn ? "600" : "500"} 11px ui-serif, Georgia, serif`, letterSpacing: "0.01em", transition: "fill 200ms" }}>
                    {s.text.replace(/^I am /, "").replace(/\.$/, "")}
                  </text>
                  <text x={lp.x} y={lp.y + 10} textAnchor="middle" className="fill-ink-300"
                    style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                    {s.ref}
                  </text>
                </g>
              );
            })}

            {/* Centre — egō eimi */}
            <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 900ms ease 1500ms" }}>
              <circle cx={CX} cy={CY} r={64} fill="rgb(15 23 42)" stroke="rgb(249 115 22)" strokeWidth={2.4} />
              <text x={CX} y={CY - 10} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10px ui-serif, Georgia, serif" }}>
                Exodus 3:14 · John 8:58
              </text>
              <text x={CX} y={CY + 10} textAnchor="middle" className="fill-flame-100"
                style={{ font: "italic 700 18px 'EB Garamond', ui-serif, Georgia, serif", letterSpacing: "0.04em" }}>
                ἐγώ εἰμι
              </text>
              <text x={CX} y={CY + 26} textAnchor="middle" className="fill-flame-300"
                style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                I AM
              </text>
            </g>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? `Saying ${focused.num} · ${focused.ref}` : "The seven I AMs of John"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1 italic">
                &ldquo;{focused.text}&rdquo;
              </h3>
              <p className="mt-3 text-ink-200">{focused.short}</p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">He says it of Himself.</h3>
              <p className="mt-2 text-ink-200 italic">
                The Greek <span className="not-italic">ἐγώ εἰμι</span> is the verb of Exodus 3:14 —
                the name God gave Moses at the burning bush. When Jesus uses it of Himself, His
                hearers reach for stones (John 8:58-59). Seven sayings of grace; one
                self-disclosure.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
