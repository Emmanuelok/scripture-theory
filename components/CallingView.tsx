"use client";

import { useState } from "react";
import { useProfile, type CallingNote } from "@/lib/profile";
import { callingFoundations, callingSteps, callingClose } from "@/data/calling";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function CallingView() {
  const { profile, update, mounted } = useProfile();
  const notes = profile.calling ?? [];

  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [walking, setWalking] = useState(false);

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  const step = callingSteps[stepIndex];

  function saveStep() {
    const v = draft[step.step]?.trim();
    if (!v) return;
    const existing = notes.find((n) => n.step === step.step);
    const note: CallingNote = existing
      ? { ...existing, body: v, date: new Date().toISOString() }
      : { id: newId(), step: step.step, body: v, date: new Date().toISOString() };
    update({
      calling: existing ? notes.map((n) => (n.id === existing.id ? note : n)) : [note, ...notes],
    });
  }

  function next() {
    saveStep();
    if (stepIndex < callingSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setWalking(false);
    }
  }

  function loadStep(i: number) {
    const s = callingSteps[i];
    const existing = notes.find((n) => n.step === s.step);
    setDraft({ ...draft, [s.step]: existing?.body ?? "" });
    setStepIndex(i);
  }

  if (!walking) {
    return (
      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-2xl text-ink-900">Before you begin</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {callingFoundations.map((f) => (
              <div key={f.title} className="rounded-2xl border border-ink-200 bg-card p-5">
                <div className="font-serif text-lg text-ink-900">{f.title}</div>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-flame-300">Seven movements</div>
          <h2 className="font-serif text-2xl mt-1">Love · Wired · World · Word · Wise · Yes · Next</h2>
          <p className="mt-3 text-ink-300 leading-relaxed">
            Walk through all seven. Save each. Return to them over weeks. Calling is rarely a
            single moment — it is a slow discernment.
          </p>
          <button
            onClick={() => {
              loadStep(0);
              setWalking(true);
            }}
            className="mt-6 rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Begin the walk →
          </button>
        </section>

        {notes.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-ink-900">Your notes so far</h2>
            <ul className="mt-4 space-y-3">
              {callingSteps.map((s, i) => {
                const note = notes.find((n) => n.step === s.step);
                if (!note) return null;
                return (
                  <li key={s.step} className="rounded-2xl border border-ink-200 bg-card p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-flame-700">
                          Step {s.n} · {s.name}
                        </div>
                        <div className="text-xs text-ink-500 mt-1">
                          Last updated {new Date(note.date).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          loadStep(i);
                          setWalking(true);
                        }}
                        className="text-xs text-flame-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="mt-3 text-ink-800 whitespace-pre-wrap leading-relaxed">{note.body}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {notes.length === callingSteps.length && (
          <section className="rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-8">
            <h2 className="font-serif text-2xl text-ink-900">{callingClose.scripture}</h2>
            <p className="mt-3 text-ink-800 italic leading-relaxed">{callingClose.prayer}</p>
          </section>
        )}
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <button
        onClick={() => setWalking(false)}
        className="text-xs text-ink-500 hover:text-ink-900"
      >
        ← Back to overview
      </button>

      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          Step {step.n} of {callingSteps.length} · {step.name}
        </div>
        <p className="mt-2 font-serif text-xl md:text-2xl text-ink-900 italic leading-snug">
          "{step.scripture.text}"
        </p>
        <p className="text-xs text-ink-500 mt-1">— {step.scripture.ref}</p>
        <p className="mt-4 text-ink-700 leading-relaxed">{step.prompt}</p>
      </div>

      <textarea
        value={draft[step.step] ?? ""}
        onChange={(e) => setDraft({ ...draft, [step.step]: e.target.value })}
        rows={6}
        placeholder="In your own words. Be honest. Be unfinished."
        className="mt-5 w-full rounded-2xl border border-ink-300 bg-card-subtle px-4 py-3 text-ink-900"
      />

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            saveStep();
            if (stepIndex > 0) loadStep(stepIndex - 1);
          }}
          disabled={stepIndex === 0}
          className="text-sm text-ink-500 hover:text-ink-900 disabled:opacity-30"
        >
          ← Back
        </button>
        <button
          onClick={next}
          className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
        >
          {stepIndex < callingSteps.length - 1 ? "Save & next →" : "Save & finish"}
        </button>
      </div>

      <div className="mt-6 flex gap-1">
        {callingSteps.map((s, i) => (
          <div
            key={s.step}
            className={`h-1 flex-1 rounded-full ${i <= stepIndex ? "bg-flame-600" : "bg-ink-200"}`}
          />
        ))}
      </div>
    </section>
  );
}
