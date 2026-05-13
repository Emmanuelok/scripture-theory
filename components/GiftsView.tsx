"use client";

import { useMemo, useState } from "react";
import { useProfile, type GiftId, type GiftsResult } from "@/lib/profile";
import { gifts, statements, giftsIntro } from "@/data/gifts";

const LIKERT = [
  { score: 0, label: "Not me" },
  { score: 1, label: "Rarely" },
  { score: 2, label: "Sometimes" },
  { score: 3, label: "Often" },
  { score: 4, label: "Strongly me" },
];

export default function GiftsView() {
  const { profile, update, mounted } = useProfile();
  const saved = profile.gifts;

  const [responses, setResponses] = useState<Record<string, number>>(saved?.responses ?? {});
  const [submitted, setSubmitted] = useState(!!saved);

  const score = useMemo(() => {
    const acc: Record<GiftId, number> = {} as any;
    for (const s of statements) {
      acc[s.gift] = (acc[s.gift] ?? 0) + (responses[s.id] ?? 0);
    }
    return acc;
  }, [responses]);

  const top = useMemo(() => {
    const list = (Object.entries(score) as [GiftId, number][])
      .sort((a, b) => b[1] - a[1])
      .filter(([, v]) => v > 0);
    return list.slice(0, 5);
  }, [score]);

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function submit() {
    const result: GiftsResult = {
      takenAt: new Date().toISOString(),
      responses,
      top: top.map(([g]) => g),
    };
    update({ gifts: result });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-8">
        <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-10 glow-ring">
          <div className="text-xs uppercase tracking-widest text-flame-300">
            Your top gifts to pray about
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mt-1">A place to begin.</h1>
          <p className="mt-3 text-ink-300 leading-relaxed max-w-2xl">
            These are not your final identity in Christ — that is fixed and free. These are areas
            where the Spirit may be inviting you to serve the body. Pray about them. Try them.
            Welcome the wisdom of mature believers.
          </p>

          <ol className="mt-8 space-y-6">
            {top.map(([g, v], i) => {
              const def = gifts.find((x) => x.id === g)!;
              return (
                <li key={g}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-flame-300 text-2xl">{i + 1}.</span>
                    <div>
                      <div className="font-serif text-2xl">{def.name}</div>
                      <div className="text-xs text-flame-300 mt-0.5">
                        Score {v} / {2 * 4} · {def.scripture.join(" · ")}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-ink-100 leading-relaxed">{def.long}</p>
                  <p className="mt-2 text-xs text-ink-400 italic">{def.caution}</p>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setResponses(responses);
              }}
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
            >
              Retake the discernment
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.confirm("Clear your gifts result?")) {
                  update({ gifts: undefined });
                  setResponses({});
                  setSubmitted(false);
                }
              }}
              className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
            >
              Clear my result
            </button>
          </div>
        </section>

        <GiftLibrary />
      </div>
    );
  }

  const total = statements.length;
  const answered = Object.keys(responses).length;
  const canSubmit = answered >= Math.floor(total * 0.7);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">{giftsIntro.title}</h2>
        {giftsIntro.body.map((p, i) => (
          <p key={i} className="mt-3 text-ink-700 leading-relaxed">{p}</p>
        ))}
        <p className="mt-3 text-xs text-flame-700">
          {answered} / {total} answered
        </p>
      </section>

      <section className="space-y-3">
        {statements.map((s) => {
          const v = responses[s.id];
          return (
            <div key={s.id} className="rounded-2xl border border-ink-200 bg-card p-4">
              <p className="text-ink-900 leading-relaxed">{s.text}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {LIKERT.map((l) => (
                  <button
                    key={l.score}
                    onClick={() => setResponses({ ...responses, [s.id]: l.score })}
                    className={`text-xs rounded-full px-3 py-1 border ${
                      v === l.score
                        ? "bg-flame-600 text-ink-50 border-flame-600"
                        : "border-ink-300 text-ink-700 hover:border-ink-900"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <button
        onClick={submit}
        disabled={!canSubmit}
        className="rounded-full bg-flame-600 text-ink-50 px-6 py-2.5 text-sm hover:bg-flame-700 disabled:opacity-40"
      >
        See my top gifts →
      </button>
      {!canSubmit && (
        <p className="text-xs text-ink-500">
          Answer at least 70% of the statements for a meaningful result.
        </p>
      )}
    </div>
  );
}

function GiftLibrary() {
  return (
    <section>
      <h2 className="font-serif text-2xl text-ink-900">All 20 gifts in Scripture</h2>
      <p className="text-sm text-ink-600 mt-1">Open any one to learn how it serves the body.</p>
      <div className="mt-4 space-y-2">
        {gifts.map((g) => (
          <details key={g.id} className="rounded-2xl border border-ink-200 bg-card p-5 open:border-flame-500">
            <summary className="cursor-pointer list-none flex items-baseline justify-between gap-3">
              <div>
                <div className="font-serif text-lg text-ink-900">{g.name}</div>
                <div className="text-xs text-ink-500 mt-0.5">{g.short}</div>
              </div>
              <span className="text-xs text-flame-700">Open →</span>
            </summary>
            <div className="mt-3 text-sm space-y-2">
              <p className="text-ink-700 leading-relaxed">{g.long}</p>
              <p className="text-ink-600 italic"><strong>How it serves: </strong>{g.served}</p>
              <p className="text-flame-700 italic"><strong>Watch: </strong>{g.caution}</p>
              <p className="text-xs text-ink-500">{g.scripture.join(" · ")}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
