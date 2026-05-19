"use client";

import { useEffect, useState } from "react";

// ─── Vocation discernment funnel ───────────────────────────────
// Five widening-then-narrowing bands that picture how the Spirit
// confirms a call: from the broad call shared by every believer down
// to the particular sending of a particular person to a particular work.

type Band = {
  id: string;
  title: string;
  question: string;
  scripture: string;
  ref: string;
  /** Width of the band at this row, 0..1 */
  width: number;
};

const BANDS: Band[] = [
  { id: "made",       title: "Made on purpose",     question: "Do I know I was made by God, for God?",
    scripture: "We are his workmanship, created in Christ Jesus for good works.", ref: "Ephesians 2:10", width: 1.0 },
  { id: "saved",      title: "Saved by grace",      question: "Have I trusted Christ — not my résumé — for my standing with God?",
    scripture: "By grace you have been saved through faith… not of works, lest anyone should boast.", ref: "Ephesians 2:8-9", width: 0.85 },
  { id: "discipled",  title: "Walking with Him",    question: "Am I being shaped by Word, prayer, sabbath, fellowship?",
    scripture: "Abide in me, and I in you. As the branch cannot bear fruit of itself…",            ref: "John 15:4",   width: 0.7 },
  { id: "gifted",     title: "Gifts named",         question: "What gifts have other believers seen and confirmed in me?",
    scripture: "Each has received a gift; use it to serve one another as good stewards of God's grace.", ref: "1 Peter 4:10", width: 0.55 },
  { id: "burden",     title: "Burden and joy",      question: "What can I not stop thinking about? What lights me up to serve?",
    scripture: "Delight yourself in the LORD, and he will give you the desires of your heart.",      ref: "Psalm 37:4",  width: 0.42 },
  { id: "sent",       title: "Sent",                question: "By the church, with confirmation. Not self-appointed.",
    scripture: "They laid their hands on them and sent them away.",                                  ref: "Acts 13:3",   width: 0.28 },
];

const VIEW_W = 700;
const VIEW_H = 540;

export default function VocationFunnel() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active ? BANDS.find((b) => b.id === active) : null;

  const bandH = 70;
  const gap = 8;
  const startY = 30;
  const CX = VIEW_W / 2;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_280px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="block mx-auto w-full max-w-[640px] h-auto"
            role="img" aria-label="A discernment funnel for vocation, narrowing from the general call to the particular sending.">
            <defs>
              <linearGradient id="vf-band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="vf-band-active" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(254 240 199)" />
                <stop offset="100%" stopColor="rgb(234 88 12)" />
              </linearGradient>
            </defs>

            {/* The bands */}
            {BANDS.map((b, i) => {
              const y = startY + i * (bandH + gap);
              const w = b.width * (VIEW_W - 80);
              const x = CX - w / 2;
              const isOn = active === b.id;
              return (
                <g
                  key={b.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`${b.title}: ${b.question}`}
                  onMouseEnter={() => setActive(b.id)}
                  onMouseLeave={() => setActive((c) => (c === b.id ? null : c))}
                  onFocus={() => setActive(b.id)}
                  onClick={() => setActive((c) => (c === b.id ? null : b.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${400 + i * 150}ms`,
                  }}
                >
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={bandH}
                    rx={12}
                    fill={isOn ? "url(#vf-band-active)" : "url(#vf-band)"}
                    stroke="rgb(15 23 42)"
                    strokeWidth={1.5}
                    style={{ transition: "fill 200ms" }}
                  />
                  <text x={CX} y={y + bandH / 2 - 2} textAnchor="middle"
                    style={{ font: "600 14px ui-serif, Georgia, serif", fill: "rgb(15 23 42)", letterSpacing: "0.02em" }}>
                    {b.title}
                  </text>
                  <text x={CX} y={y + bandH / 2 + 16} textAnchor="middle"
                    style={{ font: "italic 11px ui-serif, Georgia, serif", fill: "rgb(15 23 42)" }}>
                    {b.ref}
                  </text>
                </g>
              );
            })}

            {/* Top label */}
            <text x={CX} y={18} textAnchor="middle" className="fill-flame-300"
              style={{ font: "italic 500 10px ui-sans-serif, system-ui", letterSpacing: "0.08em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1500ms" }}>
              GENERAL CALL — shared by every believer
            </text>
            {/* Bottom label */}
            <text x={CX} y={VIEW_H - 14} textAnchor="middle" className="fill-flame-300"
              style={{ font: "italic 500 10px ui-sans-serif, system-ui", letterSpacing: "0.08em", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1700ms" }}>
              PARTICULAR SENDING — confirmed by the church
            </text>
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {focused ? "Ask yourself" : "How calling clarifies"}
          </div>
          {focused ? (
            <>
              <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused.title}</h3>
              <p className="mt-2 text-ink-200 italic">&ldquo;{focused.question}&rdquo;</p>
              <p className="mt-3 text-[11px] text-flame-300/90 italic border-l-2 border-flame-500/60 pl-3">
                &ldquo;{focused.scripture}&rdquo;
                <span className="block text-flame-300 mt-1 not-italic">— {focused.ref}</span>
              </p>
            </>
          ) : (
            <>
              <h3 className="font-serif text-xl text-ink-50 mt-1">From general to particular.</h3>
              <p className="mt-2 text-ink-200 italic">
                Every believer shares the top band. Few skip directly to the bottom. The Spirit
                tends to narrow our call through Word, gifts, mentors, joy, and the sending of
                the church.
              </p>
              <p className="mt-3 text-[11px] text-ink-400">
                Hover any band to read the question for that step.
              </p>
            </>
          )}
        </aside>
      </div>
    </figure>
  );
}
