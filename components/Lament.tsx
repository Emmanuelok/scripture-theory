"use client";

import { useState } from "react";
import Link from "next/link";
import { lamentMovements, lamentIntro, lamentClose } from "@/data/lament";

export default function LamentView() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  if (!started) {
    return (
      <section className="rounded-3xl border border-ink-200 bg-card p-8 md:p-10 glow-ring">
        <h2 className="font-serif text-3xl text-ink-900">{lamentIntro.title}</h2>
        {lamentIntro.body.map((p, i) => (
          <p key={i} className="mt-4 text-ink-700 leading-relaxed">
            {p}
          </p>
        ))}
        <div className="mt-8 grid sm:grid-cols-5 gap-2">
          {lamentMovements.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-ink-200 bg-card-subtle p-4 text-center"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">{m.number}</div>
              <div className="font-serif text-ink-900 mt-1">{m.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setStarted(true)}
            className="rounded-full bg-flame-600 text-ink-50 px-6 py-2.5 text-sm hover:bg-flame-700"
          >
            Begin the lament →
          </button>
          <Link
            href="/secret-place"
            className="rounded-full border border-ink-300 px-6 py-2.5 text-sm text-ink-800 hover:border-ink-900"
          >
            Or open the Secret Place
          </Link>
        </div>
      </section>
    );
  }

  if (done) {
    return (
      <section className="rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">He has heard you.</div>
        <p className="mt-3 font-serif text-2xl md:text-3xl leading-snug">
          "{lamentClose.scripture}"
        </p>
        <p className="mt-6 text-ink-300 italic leading-relaxed">{lamentClose.prayer}</p>

        <div className="mt-8 rounded-2xl bg-ink-800 border border-ink-700 p-5">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Your lament</div>
          <dl className="mt-3 space-y-3 text-sm">
            {lamentMovements.map((m) => {
              const v = draft[m.id]?.trim();
              if (!v) return null;
              return (
                <div key={m.id}>
                  <dt className="text-flame-300 text-xs">{m.number} · {m.name}</dt>
                  <dd className="text-ink-100 mt-1 whitespace-pre-wrap">{v}</dd>
                </div>
              );
            })}
          </dl>
          <p className="mt-4 text-xs text-ink-400">
            We do not save laments to your device. They go to Him, not to history.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setStarted(false);
              setStep(0);
              setDraft({});
              setDone(false);
            }}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Lament again
          </button>
          <Link
            href="/today"
            className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
          >
            Return to today
          </Link>
        </div>
      </section>
    );
  }

  const m = lamentMovements[step];

  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            Movement {m.number} of Five · {m.name}
          </div>
          <p className="mt-2 font-serif text-xl md:text-2xl text-ink-900 italic leading-snug">
            "{m.scripture.text}"
          </p>
          <p className="text-xs text-ink-500 mt-1">— {m.scripture.ref}</p>
        </div>
      </div>

      <p className="mt-5 font-serif text-xl text-ink-900">{m.prompt}</p>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{m.pastoralNote}</p>

      <textarea
        value={draft[m.id] ?? ""}
        onChange={(e) => setDraft({ ...draft, [m.id]: e.target.value })}
        rows={6}
        placeholder={m.placeholder}
        className="mt-5 w-full rounded-2xl border border-ink-300 bg-card-subtle px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-flame-500"
      />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm text-ink-500 hover:text-ink-900 disabled:opacity-30"
        >
          ← Back
        </button>
        {step < lamentMovements.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="rounded-full bg-ink-900 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Next movement →
          </button>
        ) : (
          <button
            onClick={() => setDone(true)}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Lay it before Him →
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-1">
        {lamentMovements.map((mv, i) => (
          <div
            key={mv.id}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-flame-600" : "bg-ink-200"}`}
          />
        ))}
      </div>
    </section>
  );
}
