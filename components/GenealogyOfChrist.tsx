"use client";

import { useEffect, useState } from "react";

// ─── Genealogy of Christ — Matthew 1 ───────────────────────────
// Matthew opens his gospel with three sets of fourteen generations:
// Abraham → David → exile → Christ. The figure is three horizontal
// rails, each carrying its fourteen names, with the four women Matthew
// names highlighted (Tamar, Rahab, Ruth, "the wife of Uriah"). The
// last name on the third rail is Mary; the line ends at Jesus.

type Generation = {
  i: number;
  name: string;
  woman?: boolean;  // Matthew specifically lists this woman
  king?: boolean;
};

// Matthew 1:1-17 with light annotation. Counting follows Matthew's own
// "fourteen generations" framing (he is selective; this is not a complete
// biological list and Matthew knows it — see Matthew 1:17).
const SET_1: Generation[] = [
  { i: 1,  name: "Abraham" },
  { i: 2,  name: "Isaac" },
  { i: 3,  name: "Jacob" },
  { i: 4,  name: "Judah (& Tamar)", woman: true },
  { i: 5,  name: "Perez" },
  { i: 6,  name: "Hezron" },
  { i: 7,  name: "Ram" },
  { i: 8,  name: "Amminadab" },
  { i: 9,  name: "Nahshon" },
  { i: 10, name: "Salmon (& Rahab)", woman: true },
  { i: 11, name: "Boaz (& Ruth)", woman: true },
  { i: 12, name: "Obed" },
  { i: 13, name: "Jesse" },
  { i: 14, name: "David", king: true },
];
const SET_2: Generation[] = [
  { i: 1,  name: "David (& Bathsheba)", woman: true, king: true },
  { i: 2,  name: "Solomon", king: true },
  { i: 3,  name: "Rehoboam", king: true },
  { i: 4,  name: "Abijah", king: true },
  { i: 5,  name: "Asa", king: true },
  { i: 6,  name: "Jehoshaphat", king: true },
  { i: 7,  name: "Joram", king: true },
  { i: 8,  name: "Uzziah", king: true },
  { i: 9,  name: "Jotham", king: true },
  { i: 10, name: "Ahaz", king: true },
  { i: 11, name: "Hezekiah", king: true },
  { i: 12, name: "Manasseh", king: true },
  { i: 13, name: "Amon", king: true },
  { i: 14, name: "Josiah", king: true },
];
const SET_3: Generation[] = [
  { i: 1,  name: "Jechoniah · the exile" },
  { i: 2,  name: "Shealtiel" },
  { i: 3,  name: "Zerubbabel" },
  { i: 4,  name: "Abiud" },
  { i: 5,  name: "Eliakim" },
  { i: 6,  name: "Azor" },
  { i: 7,  name: "Zadok" },
  { i: 8,  name: "Akim" },
  { i: 9,  name: "Eliud" },
  { i: 10, name: "Eleazar" },
  { i: 11, name: "Matthan" },
  { i: 12, name: "Jacob" },
  { i: 13, name: "Joseph (husband of Mary)" },
  { i: 14, name: "Jesus, called Christ" },
];

const SETS: { title: string; subtitle: string; bookend: string; rows: Generation[] }[] = [
  { title: "From Abraham to David",     subtitle: "14 generations", bookend: "Promise",        rows: SET_1 },
  { title: "From David to the exile",   subtitle: "14 generations", bookend: "Kingdom & loss", rows: SET_2 },
  { title: "From the exile to Christ",  subtitle: "14 generations", bookend: "Fulfilment",     rows: SET_3 },
];

export default function GenealogyOfChrist() {
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const focused = active
    ? SETS.flatMap((s, si) => s.rows.map((g) => ({ ...g, setIdx: si }))).find((g) => `${g.setIdx}-${g.i}` === active)
    : null;

  return (
    <figure className="rounded-3xl border border-ink-200 bg-gradient-to-b from-ink-900 to-ink-800 text-ink-50 p-4 md:p-6 glow-ring">
      <div className="text-[10px] uppercase tracking-widest text-flame-300 mb-3">
        Matthew 1:1-17 — three sets of fourteen generations
      </div>

      <div className="space-y-5">
        {SETS.map((set, si) => (
          <div key={si} className="rounded-2xl border border-ink-700/60 bg-ink-800/40 p-4">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
              <div>
                <h3 className="font-serif text-lg text-ink-50">{set.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-flame-300/80 mt-0.5">{set.subtitle} · {set.bookend}</p>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-ink-500">Set {si + 1} of 3</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {set.rows.map((g, gi) => {
                const id = `${si}-${g.i}`;
                const isOn = active === id;
                const isJesus = si === 2 && g.i === 14;
                const isDavid = (si === 0 && g.i === 14) || (si === 1 && g.i === 1);
                return (
                  <button
                    key={id}
                    onMouseEnter={() => setActive(id)}
                    onMouseLeave={() => setActive((c) => (c === id ? null : c))}
                    onFocus={() => setActive(id)}
                    onClick={() => setActive((c) => (c === id ? null : id))}
                    className={`group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all ${
                      isJesus
                        ? "bg-flame-600 text-ink-50 border-flame-300 font-medium"
                        : isOn
                        ? "bg-flame-50/20 border-flame-300 text-flame-100"
                        : isDavid
                        ? "bg-ink-700/60 border-flame-300/40 text-flame-200"
                        : g.woman
                        ? "bg-ink-700/40 border-ink-500/60 text-ink-100"
                        : "bg-ink-700/30 border-ink-700 text-ink-200 hover:border-ink-400"
                    }`}
                    style={{
                      opacity: drawn ? 1 : 0,
                      transition: `opacity 500ms ease ${200 + si * 200 + gi * 40}ms, background-color 200ms, border-color 200ms`,
                    }}
                  >
                    <span className="text-[9px] uppercase tracking-widest opacity-60">{String(g.i).padStart(2, "0")}</span>
                    <span>{g.name}</span>
                    {g.king && !isJesus && <span className="text-[10px] opacity-70" aria-hidden>♕</span>}
                    {g.woman && <span className="text-[10px] opacity-70" aria-hidden>✦</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-[3rem] text-sm leading-relaxed">
        {focused ? (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-flame-300 mr-2">
              Set {focused.setIdx + 1} · Generation {focused.i}
            </span>
            <span className="font-serif text-ink-50">{focused.name}</span>
            {focused.woman && (
              <span className="ml-2 text-ink-300 italic text-xs">
                ✦ One of the four women Matthew specifically names — outsiders or scandals woven into the King's line.
              </span>
            )}
            {focused.king && (
              <span className="ml-2 text-ink-300 italic text-xs">
                ♕ A king in David's line.
              </span>
            )}
          </div>
        ) : (
          <span className="italic text-ink-400">
            Matthew is selective on purpose — three sets of fourteen, the number of David's
            name in Hebrew. The line goes through the unlikely (Tamar, Rahab, Ruth, Bathsheba)
            and the unimpressive. It ends in Jesus.
          </span>
        )}
      </div>

      <p className="mt-3 text-[11px] text-ink-500 italic">
        Luke 3 gives a different (and longer) genealogy of Jesus, traced through Mary
        and back to Adam. Both are Scripture; both tell the same story from different angles.
      </p>
    </figure>
  );
}
