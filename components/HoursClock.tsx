"use client";

import { useEffect, useState } from "react";

// ─── The Daily Office — 24-hour clock ──────────────────────────
// A circular 24-hour face with the four offices placed at their canonical
// hours: Morning (06:00), Midday (12:00), Evening (18:00), Night (21:00).
// A clock hand rotates to the current local hour so you can see which
// office is closest right now.

type Office = {
  id: "morning" | "midday" | "evening" | "night";
  hour: number;        // 0-23, target hour
  windowStart: number; // local hour from which this office is "current"
  windowEnd: number;   // exclusive
  name: string;
  altName: string;
  prayer: string;
};

const OFFICES: Office[] = [
  { id: "morning", hour: 6,  windowStart: 4,  windowEnd: 11, name: "Morning Prayer", altName: "Lauds",
    prayer: "O Lord, open my lips, and my mouth shall declare Your praise. (Ps 51:15)" },
  { id: "midday",  hour: 12, windowStart: 11, windowEnd: 15, name: "Midday Prayer",  altName: "Sext",
    prayer: "I will lift up my eyes to the hills — from whence comes my help? (Ps 121:1)" },
  { id: "evening", hour: 18, windowStart: 15, windowEnd: 20, name: "Evening Prayer", altName: "Vespers",
    prayer: "Let my prayer be set forth before You as incense, the lifting up of my hands as the evening sacrifice. (Ps 141:2)" },
  { id: "night",   hour: 21, windowStart: 20, windowEnd: 28, name: "Night Prayer",   altName: "Compline",
    prayer: "Into Your hand I commit my spirit; You have redeemed me, O LORD God of truth. (Ps 31:5)" },
];

const VIEW = 520;
const CX = VIEW / 2;
const CY = VIEW / 2;
const R_HOUR = 200;       // hour-tick radius
const R_OFFICE = 165;     // office node radius
const R_LABEL = 230;      // office label radius
const R_HAND = 175;       // clock hand reach

function polarHour(r: number, hour: number) {
  // 0h at top, then clockwise around 24h
  const t = -Math.PI / 2 + (hour / 24) * Math.PI * 2;
  return { x: CX + r * Math.cos(t), y: CY + r * Math.sin(t) };
}

export default function HoursClock() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.requestAnimationFrame(() => setDrawn(true));
    const tick = window.setInterval(() => setNow(new Date()), 60_000);
    return () => {
      window.cancelAnimationFrame(id);
      window.clearInterval(tick);
    };
  }, []);

  // Current local hour as a fractional 0-24
  const hourFrac = now ? now.getHours() + now.getMinutes() / 60 : 0;
  const handTip = polarHour(R_HAND, hourFrac);

  // The office closest to now (by window membership; window crosses midnight for "night")
  function isCurrent(o: Office) {
    if (!now) return false;
    const h = hourFrac;
    if (o.windowEnd > 24) {
      return h >= o.windowStart || h < o.windowEnd - 24;
    }
    return h >= o.windowStart && h < o.windowEnd;
  }
  const currentOffice = OFFICES.find(isCurrent) ?? OFFICES[0];
  const focused = active ? OFFICES.find((o) => o.id === active) : currentOffice;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="grid md:grid-cols-[1fr_320px] gap-6 items-center">
        <div className="-mx-2 md:mx-0 overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block mx-auto w-full max-w-[500px] h-auto"
            role="img" aria-label="A 24-hour clock with the four daily prayer offices.">
            <defs>
              <radialGradient id="hc-centre" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(254 215 170)" stopOpacity="0.55" />
                <stop offset="60%" stopColor="rgb(249 115 22)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="rgb(249 115 22)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Centre halo */}
            <circle cx={CX} cy={CY} r={140} fill="url(#hc-centre)" style={{ opacity: drawn ? 1 : 0, transition: "opacity 1200ms ease 500ms" }} />

            {/* Hour ticks */}
            {Array.from({ length: 24 }).map((_, h) => {
              const major = h % 6 === 0;
              const a = polarHour(R_HOUR - (major ? 16 : 8), h);
              const b = polarHour(R_HOUR, h);
              return (
                <g key={h} style={{ opacity: drawn ? (major ? 1 : 0.6) : 0, transition: `opacity 700ms ease ${300 + h * 25}ms` }}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgb(148 163 184 / 0.5)" strokeWidth={major ? 2 : 1} />
                  {major && (
                    <text
                      x={polarHour(R_HOUR - 32, h).x}
                      y={polarHour(R_HOUR - 32, h).y + 4}
                      textAnchor="middle"
                      style={{ font: "600 12px ui-sans-serif, system-ui", fill: "rgb(203 213 225)", letterSpacing: "0.06em" }}
                    >
                      {h.toString().padStart(2, "0")}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Faint outline circle */}
            <circle cx={CX} cy={CY} r={R_HOUR} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth={1} />

            {/* Office nodes */}
            {OFFICES.map((o, i) => {
              const isOn = focused?.id === o.id;
              const p = polarHour(R_OFFICE, o.hour);
              const lp = polarHour(R_LABEL, o.hour);
              const color = ["#facc15", "#ea580c", "#dc2626", "#7c3aed"][i];
              return (
                <g
                  key={o.id}
                  tabIndex={0}
                  role="button"
                  aria-label={o.name}
                  onMouseEnter={() => setActive(o.id)}
                  onMouseLeave={() => setActive((c) => (c === o.id ? null : c))}
                  onFocus={() => setActive(o.id)}
                  onClick={() => setActive((c) => (c === o.id ? null : o.id))}
                  style={{
                    cursor: "pointer",
                    opacity: drawn ? 1 : 0,
                    transition: `opacity 700ms ease ${500 + i * 200}ms`,
                  }}
                >
                  {isOn && <circle cx={p.x} cy={p.y} r={26} fill="none" stroke={color} strokeWidth={1.4} opacity={0.55} />}
                  <circle cx={p.x} cy={p.y} r={isOn ? 18 : 15} fill={color} stroke="rgb(15 23 42)" strokeWidth={1.5} />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" className="fill-ink-50"
                    style={{ font: "700 11.5px ui-sans-serif, system-ui" }}>
                    {o.hour.toString().padStart(2, "0")}
                  </text>
                  <text x={lp.x} y={lp.y - 4} textAnchor="middle" className={isOn ? "fill-flame-200" : "fill-ink-100"}
                    style={{ font: `${isOn ? "600" : "500"} 11px ui-serif, Georgia, serif`, transition: "fill 200ms" }}>
                    {o.name.replace(" Prayer", "")}
                  </text>
                  <text x={lp.x} y={lp.y + 10} textAnchor="middle" className="fill-ink-300"
                    style={{ font: "italic 10.5px ui-serif, Georgia, serif" }}>
                    {o.altName}
                  </text>
                </g>
              );
            })}

            {/* Clock hand to NOW */}
            {now && (
              <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 1000ms ease 1500ms" }}>
                <line x1={CX} y1={CY} x2={handTip.x} y2={handTip.y} stroke="rgb(249 115 22)" strokeWidth={2.4} strokeLinecap="round" />
                <circle cx={handTip.x} cy={handTip.y} r={5} fill="rgb(249 115 22)" stroke="rgb(15 23 42)" strokeWidth={1.5} />
                <circle cx={CX} cy={CY} r={6} fill="rgb(249 115 22)" stroke="rgb(15 23 42)" strokeWidth={1.5} />
              </g>
            )}

            {/* Centre time + label */}
            {now && (
              <>
                <text x={CX} y={CY - 14} textAnchor="middle" className="fill-ink-300"
                  style={{ font: "italic 10px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1600ms" }}>
                  now
                </text>
                <text x={CX} y={CY + 8} textAnchor="middle" className="fill-flame-100"
                  style={{ font: "700 22px ui-serif, Georgia, serif", opacity: drawn ? 1 : 0, transition: "opacity 800ms ease 1700ms" }}>
                  {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </text>
              </>
            )}
          </svg>
        </div>

        <aside className="text-sm leading-relaxed min-h-[10rem]">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            {active ? "Office" : "Closest office to now"}
          </div>
          <h3 className="font-serif text-2xl text-ink-50 mt-1">{focused?.name}</h3>
          <p className="text-[11px] uppercase tracking-widest text-flame-300/80 mt-0.5">{focused?.altName}</p>
          <p className="mt-3 text-ink-200 italic">&ldquo;{focused?.prayer}&rdquo;</p>
          <p className="mt-3 text-[11px] text-ink-400">
            Five minutes apiece. You don't have to pray all four — even one fixed hour
            shapes a day.
          </p>
        </aside>
      </div>
    </figure>
  );
}
