"use client";

import { useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { heidelberg, catechismIntro, catechismParts, type LordsDay } from "@/data/catechism";

function thisWeekLD() {
  // 1..52, by ISO week
  const d = new Date();
  const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const days = Math.floor((d.getTime() - start.getTime()) / 86400000);
  return Math.min(52, Math.max(1, Math.floor(days / 7) + 1));
}

export default function CatechismView() {
  const { profile, update, mounted } = useProfile();
  const completed = profile.catechismProgress ?? [];
  const [selected, setSelected] = useState<number>(thisWeekLD());
  const ld = useMemo<LordsDay>(
    () => heidelberg.find((x) => x.ld === selected) ?? heidelberg[0],
    [selected]
  );
  const isDone = completed.includes(ld.ld);

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function toggleDone(n: number) {
    const next = completed.includes(n) ? completed.filter((x) => x !== n) : [...completed, n].sort((a, b) => a - b);
    update({ catechismProgress: next });
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">{catechismIntro.title}</h2>
        {catechismIntro.body.map((p, i) => (
          <p key={i} className="mt-3 text-ink-700 leading-relaxed">{p}</p>
        ))}
      </section>

      <section>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="text-xs uppercase tracking-widest text-flame-700">
            All 52 Lord's Days · {completed.length} read
          </div>
          <span className="text-xs text-ink-500">Tap one to open</span>
        </div>
        <div className="mt-3 grid grid-cols-7 sm:grid-cols-13 gap-1.5">
          {heidelberg.map((d) => {
            const done = completed.includes(d.ld);
            const active = selected === d.ld;
            return (
              <button
                key={d.ld}
                onClick={() => setSelected(d.ld)}
                className={`aspect-square text-xs rounded-md border transition-colors ${
                  active
                    ? "bg-flame-600 text-ink-50 border-flame-600"
                    : done
                    ? "bg-flame-50 text-flame-700 border-flame-300"
                    : "bg-card text-ink-600 border-ink-200 hover:border-ink-400"
                }`}
                title={`Lord's Day ${d.ld} — ${d.theme}`}
              >
                {d.ld}
              </button>
            );
          })}
        </div>
      </section>

      <article className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-10 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">
          Lord's Day {ld.ld} · Part {ld.part} of 3 · {catechismParts[ld.part].name}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl mt-1 leading-snug">{ld.theme}</h1>

        <ol className="mt-8 space-y-8">
          {ld.qas.map((qa) => (
            <li key={qa.q}>
              <div className="text-[10px] uppercase tracking-widest text-flame-300">
                Q&A {qa.q}
              </div>
              <p className="mt-1 font-serif text-xl md:text-2xl leading-snug">{qa.question}</p>
              <p className="mt-3 text-ink-100 leading-relaxed whitespace-pre-line">{qa.answer}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 pt-6 border-t border-ink-700 flex flex-wrap items-center gap-3">
          <button
            onClick={() => toggleDone(ld.ld)}
            className={`rounded-full px-5 py-2 text-sm ${
              isDone ? "bg-ink-800 border border-ink-700 text-ink-300" : "bg-flame-600 text-ink-50 hover:bg-flame-700"
            }`}
          >
            {isDone ? "Read ✓ — undo" : "Mark this Lord's Day read"}
          </button>
          {ld.ld > 1 && (
            <button
              onClick={() => setSelected(ld.ld - 1)}
              className="text-sm text-ink-300 hover:text-ink-50"
            >
              ← Previous
            </button>
          )}
          {ld.ld < 52 && (
            <button
              onClick={() => setSelected(ld.ld + 1)}
              className="text-sm text-ink-300 hover:text-ink-50"
            >
              Next →
            </button>
          )}
        </div>
      </article>

      <section className="grid sm:grid-cols-3 gap-3">
        {[1, 2, 3].map((p) => {
          const part = catechismParts[p as 1 | 2 | 3];
          const lds = heidelberg.filter((x) => x.part === p);
          const done = lds.filter((x) => completed.includes(x.ld)).length;
          return (
            <div key={p} className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Part {p}</div>
              <div className="font-serif text-lg text-ink-900 mt-1">{part.name}</div>
              <div className="text-xs text-ink-500 mt-1">{part.sub}</div>
              <div className="mt-3 text-sm text-ink-700">
                {done} / {lds.length} read
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
