"use client";

import { useMemo, useState } from "react";
import { passages, traditions, type Passage, type TraditionId } from "@/data/lens";
import ScriptureRef from "@/components/ScriptureRef";

const allTraditionIds = Object.keys(traditions) as TraditionId[];

export default function VerseLens() {
  const [activeRef, setActiveRef] = useState(passages[0].reference);
  const [enabled, setEnabled] = useState<Set<TraditionId>>(new Set(allTraditionIds));
  const [showHistory, setShowHistory] = useState(false);

  const passage = useMemo<Passage>(() => {
    return passages.find((p) => p.reference === activeRef) ?? passages[0];
  }, [activeRef]);

  function toggle(id: TraditionId) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-ink-200 bg-card p-5 md:p-7 glow-ring">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-ink-400">Choose a passage</span>
          <span className="ml-auto text-xs text-ink-400">
            {passages.length} curated · expanding through Q1
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {passages.map((p) => (
            <button
              key={p.reference}
              onClick={() => setActiveRef(p.reference)}
              className={`rounded-full px-3.5 py-1.5 text-sm border transition-colors ${
                p.reference === activeRef
                  ? "bg-ink-900 text-ink-50 border-ink-900"
                  : "bg-ink-50 text-ink-700 border-ink-200 hover:border-ink-400"
              }`}
            >
              {p.reference}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            <ScriptureRef reference={passage.reference} underline={false} className="text-ink-900 hover:text-flame-700" />
          </h2>
          <span className="text-xs uppercase tracking-widest text-ink-400">{passage.translation}</span>
        </div>
        <p className="prose-scripture mt-4 text-ink-800">{passage.text}</p>
      </div>

      <div className="rounded-3xl border border-flame-200 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-700">How this points to Jesus</div>
        <p className="mt-2 font-serif text-xl md:text-2xl text-ink-900 leading-snug">
          {passage.christCentered}
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-emerald-800">
          What the whole Church confesses here
        </div>
        <p className="mt-2 text-emerald-950 leading-relaxed text-lg">{passage.agreement}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 text-sm">
        <InfoTile title="Context" body={passage.context} />
        <InfoTile title="Original-language note" body={passage.literal} />
      </div>

      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="w-full flex items-center justify-between gap-3 text-left"
          aria-expanded={showHistory}
        >
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-400">
              Go deeper · optional
            </div>
            <div className="font-serif text-2xl text-ink-900 mt-1">
              How brothers and sisters across history have meditated on this
            </div>
          </div>
          <span className="text-flame-700 font-serif text-2xl">
            {showHistory ? "−" : "+"}
          </span>
        </button>

        {showHistory && (
          <div className="mt-6 space-y-6">
            <p className="text-ink-700 leading-relaxed">
              The Church is one family, scattered across many rooms. We are not denominational — but
              we honor the gifts each part of the Body has brought to the One Table. Below, six
              streams of believers meditate on the same passage. Notice first what they share —
              Jesus — then what each one helps the rest of us see.
            </p>

            <div className="rounded-2xl bg-ink-50 border border-ink-200 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-ink-500">
                  Show voices from
                </span>
                <div className="flex flex-wrap gap-2">
                  {allTraditionIds.map((id) => {
                    const t = traditions[id];
                    const on = enabled.has(id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggle(id)}
                        className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                          on
                            ? `${t.color} border-transparent`
                            : "bg-card text-ink-400 border-ink-200 hover:border-ink-400"
                        }`}
                        aria-pressed={on}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {passage.readings
                .filter((r) => enabled.has(r.tradition))
                .map((r) => {
                  const t = traditions[r.tradition];
                  return (
                    <article
                      key={r.tradition}
                      className="rounded-2xl border border-ink-200 bg-card p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ${t.color}`}>
                          {r.label}
                        </span>
                        <span className="text-xs text-ink-400 italic">{r.emphasis}</span>
                      </div>
                      <p className="mt-3 text-ink-800 leading-relaxed">{r.reading}</p>
                      <div className="mt-4 border-t border-ink-100 pt-3">
                        <div className="text-xs uppercase tracking-widest text-ink-400 mb-1">
                          Representative voices
                        </div>
                        <ul className="text-xs text-ink-600 space-y-0.5">
                          {r.voices.map((v) => (
                            <li key={v}>· {v}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  );
                })}
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
              <div className="text-xs uppercase tracking-widest text-amber-800">
                Where brothers and sisters hold this differently
              </div>
              <p className="mt-2 text-amber-950 leading-relaxed">{passage.disagreement}</p>
              <p className="mt-3 text-xs text-amber-900 italic">
                "Though we cannot think alike, may we not love alike?" — John Wesley
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-ink-900 bg-ink-900 text-ink-50 p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-300">From hearing to doing</div>
        <h3 className="font-serif text-2xl mt-1">A small step this week</h3>
        <ul className="mt-4 space-y-2 text-ink-100">
          {passage.formation.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-flame-300 font-serif">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-ink-300">
          Hearing is not enough (James 1:22). Every Verse Lens session ends with one step toward
          obedience and one step toward your local body.
        </p>
      </div>
    </div>
  );
}

function InfoTile({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-ink-50 border border-ink-100 p-4">
      <div className="text-xs uppercase tracking-widest text-ink-400">{title}</div>
      <p className="mt-1.5 text-ink-800 leading-relaxed">{body}</p>
    </div>
  );
}
