"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile, type ListeningEntry } from "@/lib/profile";
import {
  listenIntro,
  howGodSpeaks,
  listeningSteps,
  listeningGuards,
  sampleScriptures,
} from "@/data/listen";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ListenView() {
  const { profile, update, mounted } = useProfile();
  const entries = profile.listening ?? [];
  const [step, setStep] = useState(0);
  const [practicing, setPracticing] = useState(false);
  const [draft, setDraft] = useState({
    question: "",
    scriptureRef: "",
    heard: "",
    tested: "",
  });
  const [silenceLeft, setSilenceLeft] = useState<number | null>(null);

  useEffect(() => {
    if (silenceLeft === null) return;
    if (silenceLeft <= 0) return;
    const t = setTimeout(() => setSilenceLeft(silenceLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [silenceLeft]);

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function save() {
    if (!draft.heard.trim()) return;
    const e: ListeningEntry = {
      id: newId(),
      date: new Date().toISOString(),
      question: draft.question.trim() || undefined,
      scriptureRef: draft.scriptureRef.trim() || undefined,
      heard: draft.heard.trim(),
      tested: draft.tested.trim() || undefined,
    };
    update({ listening: [e, ...entries] });
    setPracticing(false);
    setStep(0);
    setDraft({ question: "", scriptureRef: "", heard: "", tested: "" });
  }

  if (!practicing) {
    return (
      <div className="space-y-10">
        <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
          <h2 className="font-serif text-2xl text-ink-900">{listenIntro.title}</h2>
          {listenIntro.body.map((p, i) => (
            <p key={i} className="mt-3 text-ink-700 leading-relaxed">
              {p}
            </p>
          ))}
          <button
            onClick={() => setPracticing(true)}
            className="mt-6 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-6 py-2.5 text-sm hover:bg-flame-700"
          >
            Begin a listening prayer →
          </button>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900">Six ways God speaks</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {howGodSpeaks.map((w) => (
              <div key={w.name} className="rounded-2xl border border-ink-200 bg-card p-5">
                <div className="font-serif text-lg text-ink-900">{w.name}</div>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed">{w.body}</p>
                <p className="text-xs text-flame-700 mt-2 italic">— {w.example}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-8">
          <h2 className="font-serif text-2xl text-ink-900">Guardrails</h2>
          <p className="mt-2 text-sm text-ink-700">
            Listening prayer without these is dangerous. With these, it is safe and life-giving.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-5 text-ink-700 text-sm leading-relaxed">
            {listeningGuards.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900">Scriptures to start with</h2>
          <p className="text-sm text-ink-600 mt-1">
            Open one. Read it twice. Then sit and listen.
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2">
            {sampleScriptures.map((s) => (
              <li key={s.ref} className="rounded-xl border border-ink-200 bg-card p-3 flex items-baseline justify-between gap-3">
                <span>
                  <span className="font-serif text-ink-900">{s.ref}</span>
                  <span className="ml-2 text-xs text-ink-500">{s.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {entries.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-ink-900">Your listening journal</h2>
            <p className="text-sm text-ink-500 mt-1">
              What you've heard, and tested, over time. Lives only on this device.
            </p>
            <ul className="mt-4 space-y-3">
              {entries.map((e) => (
                <li key={e.id} className="rounded-2xl border border-ink-200 bg-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-xs uppercase tracking-widest text-flame-700">
                      {new Date(e.date).toLocaleDateString(undefined, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      {e.scriptureRef && <span className="ml-2 text-ink-500 normal-case tracking-normal">· {e.scriptureRef}</span>}
                    </div>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined" && window.confirm("Delete this entry?")) {
                          update({ listening: entries.filter((x) => x.id !== e.id) });
                        }
                      }}
                      className="text-xs text-ink-400 hover:text-flame-700"
                    >
                      Delete
                    </button>
                  </div>
                  {e.question && (
                    <p className="mt-2 text-sm text-ink-600 italic">"{e.question}"</p>
                  )}
                  <p className="mt-2 text-ink-800 whitespace-pre-wrap leading-relaxed">{e.heard}</p>
                  {e.tested && (
                    <p className="mt-2 text-xs text-ink-500">
                      <span className="text-flame-700 uppercase tracking-widest">Tested:</span>{" "}
                      {e.tested}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  const s = listeningSteps[step];
  const isSilenceStep = s.n === "4";

  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <button
        onClick={() => {
          setPracticing(false);
          setStep(0);
        }}
        className="text-xs text-ink-500 hover:text-ink-900"
      >
        ← Stop and return
      </button>

      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          Step {s.n} of {listeningSteps.length} · {s.name}
        </div>
        <p className="mt-2 font-serif text-xl md:text-2xl text-ink-900 italic leading-snug">
          "{s.scripture.text}"
        </p>
        <p className="text-xs text-ink-500 mt-1">— {s.scripture.ref}</p>
        <p className="mt-4 text-ink-700 leading-relaxed">{s.prompt}</p>
      </div>

      {s.n === "3" && (
        <div className="mt-5 space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">
              Your question
            </label>
            <textarea
              value={draft.question}
              onChange={(e) => setDraft({ ...draft, question: e.target.value })}
              rows={3}
              placeholder="Father, what would You say to me about ____?"
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">
              Scripture you opened (optional)
            </label>
            <input
              value={draft.scriptureRef}
              onChange={(e) => setDraft({ ...draft, scriptureRef: e.target.value })}
              placeholder="e.g. Psalm 23"
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
            />
          </div>
        </div>
      )}

      {isSilenceStep && (
        <div className="mt-5 rounded-2xl bg-ink-900 text-ink-50 p-5">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Silence timer</div>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="font-serif text-3xl">
              {silenceLeft !== null
                ? `${Math.floor(silenceLeft / 60)}:${String(silenceLeft % 60).padStart(2, "0")}`
                : "0:00"}
            </span>
            <div className="flex gap-2">
              {[2, 5, 10].map((m) => (
                <button
                  key={m}
                  onClick={() => setSilenceLeft(m * 60)}
                  className="rounded-full border border-ink-700 px-3 py-1 text-xs text-ink-300 hover:text-ink-50"
                >
                  {m} min
                </button>
              ))}
              {silenceLeft !== null && (
                <button
                  onClick={() => setSilenceLeft(null)}
                  className="rounded-full bg-flame-600 px-3 py-1 text-xs text-ink-50"
                >
                  Stop
                </button>
              )}
            </div>
          </div>
          {silenceLeft === 0 && (
            <p className="mt-3 text-flame-300 text-sm">
              The bell has rung. Write what came.
            </p>
          )}

          <textarea
            value={draft.heard}
            onChange={(e) => setDraft({ ...draft, heard: e.target.value })}
            rows={6}
            placeholder="What surfaced. A verse. A picture. A word. A stillness. Don't filter yet."
            className="mt-4 w-full rounded-xl bg-ink-800 border border-ink-700 px-3 py-2 text-ink-50 placeholder:text-ink-500"
          />
        </div>
      )}

      {s.n === "5" && (
        <div className="mt-5">
          <label className="text-[10px] uppercase tracking-widest text-flame-700">
            How does it test? (Scripture · Christ-likeness · fruit of the Spirit)
          </label>
          <textarea
            value={draft.tested}
            onChange={(e) => setDraft({ ...draft, tested: e.target.value })}
            rows={4}
            placeholder="It echoes Romans 8:1; it sounds like the Jesus of the Gospels; it brought peace, not anxiety…"
            className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
          />
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm text-ink-500 hover:text-ink-900 disabled:opacity-30"
        >
          ← Back
        </button>
        {step < listeningSteps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="rounded-full bg-ink-900 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={save}
            disabled={!draft.heard.trim()}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 disabled:opacity-40"
          >
            Save what He said →
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-1">
        {listeningSteps.map((sx, i) => (
          <div
            key={sx.n}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-flame-600" : "bg-ink-200"}`}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-ink-500">
        For longer reflection, open the{" "}
        <Link href="/secret-place" className="hover:text-flame-700">
          Secret Place
        </Link>
        .
      </p>
    </section>
  );
}
