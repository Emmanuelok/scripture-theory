"use client";

import { useState } from "react";
import Link from "next/link";
import { useProfile, type ForgivenessRecord } from "@/lib/profile";
import {
  forgivenessFoundations,
  forgivenessSteps,
  forgivenessSelf,
  forgivenessGod,
} from "@/data/forgiveness";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

type Mode = "menu" | "another" | "self" | "god";

export default function ForgiveView() {
  const { profile, update, mounted } = useProfile();
  const records = profile.forgiveness ?? [];
  const [mode, setMode] = useState<Mode>("menu");

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  return (
    <div className="space-y-10">
      {mode === "menu" && (
        <>
          <section>
            <h2 className="font-serif text-2xl text-ink-900">Before you begin</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {forgivenessFoundations.map((f) => (
                <div key={f.title} className="rounded-2xl border border-ink-200 bg-card p-5">
                  <div className="font-serif text-lg text-ink-900">{f.title}</div>
                  <p className="text-sm text-ink-700 mt-2 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
            <h2 className="font-serif text-2xl text-ink-900">Whom are you here to forgive?</h2>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              <ChoiceCard
                label="Someone else"
                sub="A person — alive or gone — who hurt you."
                onClick={() => setMode("another")}
              />
              <ChoiceCard
                label="Yourself"
                sub="A debt you've been holding against your own life."
                onClick={() => setMode("self")}
              />
              <ChoiceCard
                label="An offense toward God"
                sub="Something He allowed that you have not yet released."
                onClick={() => setMode("god")}
              />
            </div>
          </section>

          {records.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl text-ink-900">Your walks</h2>
              <p className="text-sm text-ink-500 mt-1">
                Private notes from past forgiveness walks. They live on this device only.
              </p>
              <ul className="mt-4 space-y-3">
                {records.map((r) => (
                  <li key={r.id} className="rounded-2xl border border-ink-200 bg-card p-5 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <div className="font-serif text-ink-900">
                          {r.who}
                          {r.releasedAt && (
                            <span className="ml-2 text-xs text-flame-700">released</span>
                          )}
                        </div>
                        <div className="text-ink-500 text-xs mt-0.5">{r.wound}</div>
                      </div>
                      <button
                        onClick={() => {
                          if (
                            typeof window !== "undefined" &&
                            window.confirm("Delete this record?")
                          ) {
                            update({ forgiveness: records.filter((x) => x.id !== r.id) });
                          }
                        }}
                        className="text-xs text-ink-400 hover:text-flame-700"
                      >
                        Delete
                      </button>
                    </div>
                    {r.notes && (
                      <p className="mt-3 text-ink-700 whitespace-pre-wrap">{r.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      {mode === "another" && (
        <AnotherWalk
          onSave={(r) => update({ forgiveness: [r, ...records] })}
          onBack={() => setMode("menu")}
        />
      )}

      {mode === "self" && <SelfWalk onBack={() => setMode("menu")} />}
      {mode === "god" && <GodWalk onBack={() => setMode("menu")} />}
    </div>
  );
}

function ChoiceCard({
  label,
  sub,
  onClick,
}: {
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border border-ink-200 bg-card p-5 hover:border-flame-500 transition-colors"
    >
      <div className="font-serif text-lg text-ink-900">{label}</div>
      <div className="text-xs text-ink-500 mt-1 leading-snug">{sub}</div>
      <div className="mt-3 text-xs text-flame-700">Walk this →</div>
    </button>
  );
}

function AnotherWalk({
  onSave,
  onBack,
}: {
  onSave: (r: ForgivenessRecord) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [who, setWho] = useState("");
  const [wound, setWound] = useState("");
  const [released, setReleased] = useState(false);

  if (released) {
    return (
      <section className="rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 glow-ring">
        <div className="text-xs uppercase tracking-widest text-flame-300">It is finished here.</div>
        <p className="mt-3 font-serif text-2xl md:text-3xl leading-snug">
          "Father, forgive them, for they do not know what they do." — Luke 23:34
        </p>
        <p className="mt-5 text-ink-300 leading-relaxed">
          If the feelings rise again, this is not a failure. Walk this path again. Every return
          weakens the hold. He is healing the deep places.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onBack}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Return to the menu
          </button>
          <Link
            href="/lament"
            className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
          >
            Lament if you need to →
          </Link>
        </div>
      </section>
    );
  }

  const s = forgivenessSteps[step];

  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <button onClick={onBack} className="text-xs text-ink-500 hover:text-ink-900">
        ← Back to menu
      </button>

      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          Step {s.n} of {forgivenessSteps.length} · {s.name}
        </div>
        <p className="mt-2 font-serif text-xl md:text-2xl text-ink-900 italic">
          "{s.scripture.text}"
        </p>
        <p className="text-xs text-ink-500 mt-1">— {s.scripture.ref}</p>
        <p className="mt-4 text-ink-700 leading-relaxed">{s.prompt}</p>
      </div>

      {step === 0 && (
        <div className="mt-5 space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">
              Who (name or initials)
            </label>
            <input
              value={who}
              onChange={(e) => setWho(e.target.value)}
              placeholder="J.M."
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-flame-700">The wound</label>
            <textarea
              value={wound}
              onChange={(e) => setWound(e.target.value)}
              rows={3}
              placeholder="What they did. Be specific."
              className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
            />
          </div>
        </div>
      )}

      {step > 0 && (
        <textarea
          value={draft[s.id] ?? ""}
          onChange={(e) => setDraft({ ...draft, [s.id]: e.target.value })}
          rows={5}
          placeholder="In your own words, before the Lord…"
          className="mt-5 w-full rounded-2xl border border-ink-300 bg-card-subtle px-4 py-3 text-ink-900 placeholder:text-ink-400"
        />
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm text-ink-500 hover:text-ink-900 disabled:opacity-30"
        >
          ← Back
        </button>
        {step < forgivenessSteps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 0 && (!who.trim() || !wound.trim())}
            className="rounded-full bg-ink-900 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 disabled:opacity-40"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => {
              const notes = forgivenessSteps
                .slice(1)
                .map((sx) => (draft[sx.id]?.trim() ? `${sx.name}\n${draft[sx.id].trim()}` : null))
                .filter(Boolean)
                .join("\n\n");
              onSave({
                id: newId(),
                who: who.trim(),
                wound: wound.trim(),
                notes,
                createdAt: new Date().toISOString(),
                releasedAt: new Date().toISOString(),
              });
              setReleased(true);
            }}
            className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            Release it at the cross →
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-1">
        {forgivenessSteps.map((sx, i) => (
          <div
            key={sx.id}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-flame-600" : "bg-ink-200"}`}
          />
        ))}
      </div>
    </section>
  );
}

function SelfWalk({ onBack }: { onBack: () => void }) {
  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <button onClick={onBack} className="text-xs text-ink-500 hover:text-ink-900">
        ← Back
      </button>
      <h2 className="mt-3 font-serif text-2xl text-ink-900">Forgiving yourself.</h2>
      <p className="mt-3 text-ink-700 leading-relaxed">{forgivenessSelf.intro}</p>

      <ol className="mt-6 space-y-3 list-decimal pl-5 text-ink-800 leading-relaxed">
        {forgivenessSelf.declaration.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ol>

      <p className="mt-6 text-sm text-ink-500 italic">
        "If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us
        from all unrighteousness." — 1 John 1:9
      </p>

      <div className="mt-6">
        <Link
          href="/secret-place"
          className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 inline-flex"
        >
          Open the Secret Place to write this →
        </Link>
      </div>
    </section>
  );
}

function GodWalk({ onBack }: { onBack: () => void }) {
  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      <button onClick={onBack} className="text-xs text-ink-500 hover:text-ink-900">
        ← Back
      </button>
      <h2 className="mt-3 font-serif text-2xl text-ink-900">When you are angry with God.</h2>
      <p className="mt-3 text-ink-700 leading-relaxed">{forgivenessGod.intro}</p>

      <blockquote className="mt-5 border-l-2 border-flame-500 pl-4 italic text-ink-800">
        "{forgivenessGod.scripture.text}"
        <div className="mt-1 not-italic text-xs text-ink-500">— {forgivenessGod.scripture.ref}</div>
      </blockquote>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/lament"
          className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
        >
          Walk a lament →
        </Link>
        <Link
          href="/secret-place"
          className="rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          Open the Secret Place
        </Link>
      </div>
    </section>
  );
}
