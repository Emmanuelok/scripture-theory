"use client";

import { useMemo, useState } from "react";
import { useProfile, type ExamenEntry } from "@/lib/profile";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const STEPS = [
  {
    key: "gratitude" as const,
    eyebrow: "1. Give thanks",
    prompt: "Where was God good to you today? Name one gift, however small.",
    scripture: "Every good gift and every perfect gift is from above. — James 1:17",
    placeholder: "A face, a meal, a mercy, a quiet moment…",
  },
  {
    key: "encounter" as const,
    eyebrow: "2. Notice His presence",
    prompt:
      "Where did you sense the Lord today — a verse, a person, a nudge, an answered prayer, a beauty?",
    scripture: "Surely the LORD is in this place, and I did not know it. — Genesis 28:16",
    placeholder: "What surprised you. What softened you. What He may have been saying…",
  },
  {
    key: "conviction" as const,
    eyebrow: "3. Repent — without shame",
    prompt:
      "Where did you turn from Him today — by what you did, said, thought, or failed to do? Bring it into the light.",
    scripture:
      "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness. — 1 John 1:9",
    placeholder: "Be honest. He already loves you. Naming it here loosens its grip.",
  },
  {
    key: "longing" as const,
    eyebrow: "4. Ask for tomorrow",
    prompt: "What do you most need from the Father tomorrow? Ask plainly.",
    scripture:
      "Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need. — Hebrews 4:16",
    placeholder: "A specific request for the day ahead — work, family, your own heart…",
  },
];

export default function ExamenView() {
  const { profile, update, mounted } = useProfile();
  const examens = profile.examens ?? [];
  const today = todayKey();
  const todaysEntry = examens.find((e) => e.date.startsWith(today));

  const [draft, setDraft] = useState<Partial<ExamenEntry>>({
    gratitude: todaysEntry?.gratitude ?? "",
    encounter: todaysEntry?.encounter ?? "",
    conviction: todaysEntry?.conviction ?? "",
    longing: todaysEntry?.longing ?? "",
  });
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(!!todaysEntry);

  const past = useMemo(
    () => examens.filter((e) => !e.date.startsWith(today)).sort((a, b) => b.date.localeCompare(a.date)),
    [examens, today]
  );

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  function save() {
    const entry: ExamenEntry = {
      id: todaysEntry?.id ?? newId(),
      date: new Date().toISOString(),
      gratitude: draft.gratitude ?? "",
      encounter: draft.encounter ?? "",
      conviction: draft.conviction ?? "",
      longing: draft.longing ?? "",
    };
    const next = todaysEntry
      ? examens.map((e) => (e.id === todaysEntry.id ? entry : e))
      : [entry, ...examens];
    update({ examens: next });
    setDone(true);
  }

  if (done && todaysEntry) {
    return (
      <div className="space-y-8">
        <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
          <div className="text-xs uppercase tracking-widest text-flame-300">Tonight's examen · saved</div>
          <h2 className="font-serif text-3xl mt-1">"He gives sleep to His beloved." — Psalm 127:2</h2>
          <p className="mt-3 text-ink-300">
            Close the screen. Whisper Psalm 4:8 over your bed: <em>"In peace I will both lie down and
            sleep, for You alone, O LORD, make me dwell in safety."</em>
          </p>
          <button
            onClick={() => setDone(false)}
            className="mt-5 text-xs text-flame-300 hover:underline"
          >
            Edit today's entry
          </button>
        </section>
        <PastList past={past} onDelete={(id) => update({ examens: examens.filter((e) => e.id !== id) })} />
      </div>
    );
  }

  const current = STEPS[step];
  const value = (draft[current.key] as string) ?? "";

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
        <div className="flex items-baseline justify-between">
          <div className="text-xs uppercase tracking-widest text-flame-700">{current.eyebrow}</div>
          <div className="text-xs text-ink-500">{step + 1} / {STEPS.length}</div>
        </div>
        <p className="mt-2 font-serif text-2xl md:text-3xl text-ink-900 leading-snug">
          {current.prompt}
        </p>
        <p className="mt-2 text-sm text-ink-500 italic">{current.scripture}</p>

        <textarea
          value={value}
          onChange={(e) => setDraft({ ...draft, [current.key]: e.target.value })}
          rows={5}
          placeholder={current.placeholder}
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
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="rounded-full bg-ink-900 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={save}
              className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
            >
              Save tonight's examen →
            </button>
          )}
        </div>

        <div className="mt-6 flex gap-1">
          {STEPS.map((s, i) => (
            <div
              key={s.key}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-flame-600" : "bg-ink-200"}`}
            />
          ))}
        </div>
      </section>

      <PastList past={past} onDelete={(id) => update({ examens: examens.filter((e) => e.id !== id) })} />
    </div>
  );
}

function PastList({
  past,
  onDelete,
}: {
  past: ExamenEntry[];
  onDelete: (id: string) => void;
}) {
  if (past.length === 0) return null;
  return (
    <section>
      <h2 className="font-serif text-2xl text-ink-900">Past examens</h2>
      <p className="text-sm text-ink-500 mt-1">
        A record of God's faithfulness through your days. On this device only.
      </p>
      <ul className="mt-4 space-y-3">
        {past.map((e) => (
          <li key={e.id} className="rounded-2xl border border-ink-200 bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="text-xs uppercase tracking-widest text-flame-700">
                {new Date(e.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && window.confirm("Delete this examen?")) {
                    onDelete(e.id);
                  }
                }}
                className="text-xs text-ink-400 hover:text-flame-700"
              >
                Delete
              </button>
            </div>
            <dl className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
              <Field label="Gratitude" value={e.gratitude} />
              <Field label="Encounter" value={e.encounter} />
              <Field label="Conviction" value={e.conviction} />
              <Field label="Tomorrow" value={e.longing} />
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-widest text-flame-700">{label}</dt>
      <dd className="text-ink-800 mt-0.5 leading-relaxed">{value}</dd>
    </div>
  );
}
