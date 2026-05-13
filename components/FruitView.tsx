"use client";

import { useMemo, useState } from "react";
import { useProfile, type FruitFacet, type FruitCheck } from "@/lib/profile";
import { fruits, fruitIntro } from "@/data/fruit";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const SCORE_LABELS: Record<number, string> = {
  1: "Barely showing",
  2: "Sometimes there",
  3: "Steady",
  4: "Growing",
  5: "Abounding",
};

export default function FruitView() {
  const { profile, update, mounted } = useProfile();
  const history = profile.fruit ?? [];
  const last = history[0];

  const [scores, setScores] = useState<Record<FruitFacet, number>>(
    () =>
      Object.fromEntries(fruits.map((f) => [f.id, 3])) as Record<FruitFacet, number>
  );
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const trend = useMemo(() => {
    if (history.length < 2) return null;
    const a = history[0].scores;
    const b = history[1].scores;
    return Object.fromEntries(
      fruits.map((f) => [f.id, (a[f.id] ?? 3) - (b[f.id] ?? 3)])
    ) as Record<FruitFacet, number>;
  }, [history]);

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function save() {
    const entry: FruitCheck = {
      id: newId(),
      date: new Date().toISOString(),
      scores,
      notes: notes.trim() || undefined,
    };
    update({ fruit: [entry, ...history] });
    setSubmitted(true);
  }

  if (submitted) {
    const lowest = fruits
      .map((f) => ({ f, v: scores[f.id] }))
      .sort((a, b) => a.v - b.v)[0];
    return (
      <div className="space-y-8">
        <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-10 glow-ring">
          <div className="text-xs uppercase tracking-widest text-flame-300">Saved · for prayer</div>
          <h2 className="font-serif text-3xl mt-1">"Abide in Me, and I in you."</h2>
          <p className="mt-3 text-ink-300">— John 15:4</p>

          <div className="mt-6 rounded-2xl bg-ink-800 border border-ink-700 p-5">
            <div className="text-[10px] uppercase tracking-widest text-flame-300">
              One facet to pray about this season
            </div>
            <div className="mt-1 font-serif text-xl">{lowest.f.name}</div>
            <p className="mt-2 text-ink-100 italic leading-relaxed">"{lowest.f.scripture.text}"</p>
            <p className="text-xs text-flame-300 mt-1">— {lowest.f.scripture.ref}</p>
            <p className="mt-3 text-ink-200 leading-relaxed">{lowest.f.prayer}</p>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            New check
          </button>
        </section>

        <FruitHistory history={[...history]} onDelete={(id) => update({ fruit: history.filter((h) => h.id !== id) })} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">{fruitIntro.title}</h2>
        {fruitIntro.body.map((p, i) => (
          <p key={i} className="mt-3 text-ink-700 leading-relaxed">{p}</p>
        ))}
      </section>

      <section className="space-y-3">
        {fruits.map((f) => {
          const v = scores[f.id];
          const t = trend?.[f.id];
          return (
            <div key={f.id} className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="font-serif text-lg text-ink-900">
                    {f.name} <span className="text-xs text-ink-400 italic">({f.greek})</span>
                  </div>
                  <div className="text-xs text-ink-500 mt-0.5">{f.short}</div>
                </div>
                {typeof t === "number" && t !== 0 && (
                  <span className={`text-xs ${t > 0 ? "text-flame-700" : "text-ink-500"}`}>
                    {t > 0 ? `+${t}` : t} vs. last check
                  </span>
                )}
              </div>

              <ul className="mt-3 list-disc pl-5 text-xs text-ink-600 space-y-0.5">
                {f.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setScores({ ...scores, [f.id]: n })}
                    className={`rounded-full px-3 py-1 text-xs ${
                      v === n
                        ? "bg-flame-600 text-ink-50"
                        : "border border-ink-300 text-ink-700 hover:border-ink-900"
                    }`}
                  >
                    {n} · {SCORE_LABELS[n]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section>
        <label className="text-[10px] uppercase tracking-widest text-flame-700">Notes for this season</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="What is going on in life this season? Where is the Spirit moving? Where am I resisting?"
          className="mt-1 w-full rounded-2xl border border-ink-300 bg-card px-4 py-3 text-ink-900"
        />
      </section>

      <button
        onClick={save}
        className="rounded-full bg-flame-600 text-ink-50 px-6 py-2.5 text-sm hover:bg-flame-700"
      >
        Save this check
      </button>

      {last && (
        <p className="text-xs text-ink-500">
          Last check: {new Date(last.date).toLocaleDateString()}
        </p>
      )}

      <FruitHistory history={history} onDelete={(id) => update({ fruit: history.filter((h) => h.id !== id) })} />
    </div>
  );
}

function FruitHistory({
  history,
  onDelete,
}: {
  history: FruitCheck[];
  onDelete: (id: string) => void;
}) {
  if (history.length === 0) return null;
  return (
    <section>
      <h3 className="font-serif text-2xl text-ink-900">Past checks</h3>
      <ul className="mt-3 space-y-2">
        {history.map((h) => (
          <li key={h.id} className="rounded-2xl border border-ink-200 bg-card p-4 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="text-xs uppercase tracking-widest text-flame-700">
                {new Date(h.date).toLocaleDateString()}
              </div>
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && window.confirm("Delete this check?")) {
                    onDelete(h.id);
                  }
                }}
                className="text-xs text-ink-400 hover:text-flame-700"
              >
                Delete
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              {fruits.map((f) => (
                <span key={f.id} className="rounded-full bg-card-subtle border border-ink-200 px-2 py-0.5">
                  {f.name}: <strong className="text-ink-900">{h.scores[f.id] ?? "—"}</strong>
                </span>
              ))}
            </div>
            {h.notes && <p className="mt-2 text-ink-700 italic whitespace-pre-wrap">{h.notes}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
