"use client";

import { useMemo, useState } from "react";
import { useProfile, type Fast, type FastType } from "@/lib/profile";
import { fastTypes, fastingTeaching, fastingPrayerLiturgy } from "@/data/fasting";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function hoursBetween(a: string, b: string) {
  return Math.max(0, (new Date(b).getTime() - new Date(a).getTime()) / 36e5);
}

function fmtElapsed(hours: number) {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 24) return `${hours.toFixed(1)} hours`;
  const days = Math.floor(hours / 24);
  const rem = Math.round(hours - days * 24);
  return `${days}d ${rem}h`;
}

export default function FastingView() {
  const { profile, update, mounted } = useProfile();
  const fasts = profile.fasts ?? [];
  const active = fasts.find((f) => !f.endedAt);
  const past = fasts.filter((f) => f.endedAt).sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  const [showStart, setShowStart] = useState(false);

  if (!mounted) {
    return <div className="text-ink-500">Loading…</div>;
  }

  return (
    <div className="space-y-10">
      {active ? (
        <ActiveFastCard
          fast={active}
          onUpdate={(patch) =>
            update({ fasts: fasts.map((f) => (f.id === active.id ? { ...f, ...patch } : f)) })
          }
          onEnd={(broken) =>
            update({
              fasts: fasts.map((f) =>
                f.id === active.id ? { ...f, endedAt: new Date().toISOString(), broken } : f
              ),
            })
          }
        />
      ) : (
        <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
          <div className="text-xs uppercase tracking-widest text-flame-700">No active fast</div>
          <p className="mt-2 font-serif text-2xl text-ink-900">
            Begin a fast. Set it before the Lord, then close this page.
          </p>
          <button
            onClick={() => setShowStart((v) => !v)}
            className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
          >
            {showStart ? "Cancel" : "Start a fast →"}
          </button>
          {showStart && (
            <StartFastForm
              onStart={(fast) => {
                update({ fasts: [fast, ...fasts] });
                setShowStart(false);
              }}
            />
          )}
        </div>
      )}

      <section>
        <h2 className="font-serif text-2xl text-ink-900">Why fast?</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {fastingTeaching.whyFast.map((t) => (
            <div key={t.title} className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="font-serif text-lg text-ink-900">{t.title}</div>
              <p className="text-sm text-ink-700 mt-2 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-ink-900">Kinds of fasts</h2>
        <p className="text-sm text-ink-600 mt-2">
          Choose what is faithful for your body and season. Beginners — start small.
        </p>
        <div className="mt-4 space-y-3">
          {fastTypes.map((t) => (
            <details
              key={t.id}
              className="group rounded-2xl border border-ink-200 bg-card p-5 open:border-flame-500"
            >
              <summary className="cursor-pointer flex flex-wrap items-baseline justify-between gap-3 list-none">
                <div>
                  <div className="font-serif text-lg text-ink-900">{t.name}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{t.duration}</div>
                </div>
                <span className="text-xs text-flame-700 group-open:hidden">Open →</span>
                <span className="text-xs text-flame-700 hidden group-open:inline">Close ↑</span>
              </summary>
              <div className="mt-4 space-y-3 text-sm">
                <p className="text-ink-700 leading-relaxed">{t.description}</p>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">Practice</div>
                  <p className="text-ink-700 leading-relaxed mt-1">{t.practice}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">Scripture</div>
                  <ul className="mt-1 space-y-1.5">
                    {t.scripture.map((s) => (
                      <li key={s.ref} className="text-ink-700">
                        <span className="italic">"{s.text}"</span>{" "}
                        <span className="text-ink-500">— {s.ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">Take care</div>
                  <ul className="mt-1 list-disc pl-5 text-ink-700 space-y-1">
                    {t.cautions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">How to begin</h2>
        <ol className="mt-4 space-y-2 list-decimal pl-5 text-ink-700 text-sm leading-relaxed">
          {fastingTeaching.howToBegin.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">Take heed</h2>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-ink-700 text-sm leading-relaxed">
          {fastingTeaching.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </section>

      {past.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl text-ink-900">Your fasts</h2>
          <ul className="mt-4 space-y-3">
            {past.map((f) => {
              const fdef = fastTypes.find((t) => t.id === f.type);
              const dur = f.endedAt ? hoursBetween(f.startedAt, f.endedAt) : 0;
              return (
                <li
                  key={f.id}
                  className="rounded-2xl border border-ink-200 bg-card p-4 text-sm flex flex-wrap items-baseline justify-between gap-3"
                >
                  <div>
                    <div className="font-serif text-ink-900">
                      {fdef?.name ?? f.type} {f.broken && <span className="text-flame-700">· broken early</span>}
                    </div>
                    <div className="text-ink-500 text-xs">
                      {new Date(f.startedAt).toLocaleDateString()} · {fmtElapsed(dur)} · "{f.focus}"
                    </div>
                  </div>
                  <button
                    onClick={() => update({ fasts: fasts.filter((x) => x.id !== f.id) })}
                    className="text-xs text-ink-400 hover:text-flame-700"
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

function ActiveFastCard({
  fast,
  onUpdate,
  onEnd,
}: {
  fast: Fast;
  onUpdate: (patch: Partial<Fast>) => void;
  onEnd: (broken: boolean) => void;
}) {
  const fdef = fastTypes.find((t) => t.id === fast.type);
  const elapsed = useMemo(() => hoursBetween(fast.startedAt, new Date().toISOString()), [fast.startedAt]);
  const target = fast.endsAt ? hoursBetween(fast.startedAt, fast.endsAt) : null;
  const pct = target ? Math.min(100, (elapsed / target) * 100) : null;

  const phase = elapsed < 6 ? "morning" : elapsed < 18 ? "midday" : "breaking";
  const liturgy = fastingPrayerLiturgy[phase as keyof typeof fastingPrayerLiturgy];

  return (
    <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
      <div className="text-xs uppercase tracking-widest text-flame-300">Active fast · before the Lord</div>
      <h1 className="font-serif text-3xl md:text-4xl mt-1">{fdef?.name ?? fast.type}</h1>
      <p className="mt-2 text-ink-300 italic">"{fast.focus}"</p>

      <div className="mt-5 flex items-baseline gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-flame-300">Elapsed</div>
          <div className="font-serif text-2xl">{fmtElapsed(elapsed)}</div>
        </div>
        {target !== null && (
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-300">Target</div>
            <div className="font-serif text-2xl">{fmtElapsed(target)}</div>
          </div>
        )}
      </div>
      {pct !== null && (
        <div className="mt-3 h-1.5 rounded-full bg-ink-700 overflow-hidden">
          <div className="h-full bg-flame-500" style={{ width: `${pct}%` }} />
        </div>
      )}

      <div className="mt-6 rounded-2xl bg-ink-800 border border-ink-700 p-5">
        <div className="text-[10px] uppercase tracking-widest text-flame-300">
          Pray now — {phase}
        </div>
        <ul className="mt-2 space-y-2 text-ink-100 text-sm leading-relaxed">
          {liturgy.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => onEnd(false)}
          className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
        >
          End — give thanks
        </button>
        <button
          onClick={() => {
            if (typeof window !== "undefined" && window.confirm("Break the fast early?")) {
              onEnd(true);
            }
          }}
          className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
        >
          Break early — no shame
        </button>
      </div>

      <details className="mt-5 text-sm text-ink-300">
        <summary className="cursor-pointer hover:text-ink-50">Add a note</summary>
        <textarea
          defaultValue={fast.notes ?? ""}
          onBlur={(e) => onUpdate({ notes: e.target.value })}
          rows={3}
          placeholder="What is the Lord saying?"
          className="mt-2 w-full rounded-xl bg-ink-800 border border-ink-700 px-3 py-2 text-ink-50 text-sm placeholder:text-ink-500"
        />
      </details>
    </section>
  );
}

function StartFastForm({ onStart }: { onStart: (fast: Fast) => void }) {
  const [type, setType] = useState<FastType>("sundown");
  const [focus, setFocus] = useState("");
  const [hours, setHours] = useState(24);

  const fdef = fastTypes.find((t) => t.id === type);

  return (
    <div className="mt-5 space-y-4">
      <div>
        <label className="text-[10px] uppercase tracking-widest text-flame-700">Kind of fast</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as FastType)}
          className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
        >
          {fastTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} · {t.duration}
            </option>
          ))}
        </select>
        {fdef && <p className="text-xs text-ink-500 mt-1">{fdef.description}</p>}
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-widest text-flame-700">
          What are you bringing to the Lord?
        </label>
        <input
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="e.g. clarity about a decision · my prodigal child · revival in my city"
          className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
        />
      </div>

      <div>
        <label className="text-[10px] uppercase tracking-widest text-flame-700">
          Planned length (hours) — optional
        </label>
        <input
          type="number"
          min={1}
          max={24 * 40}
          value={hours}
          onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
          className="mt-1 w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-ink-900"
        />
      </div>

      <button
        onClick={() => {
          if (!focus.trim()) return;
          const now = new Date();
          const endsAt = new Date(now.getTime() + hours * 36e5).toISOString();
          onStart({
            id: newId(),
            type,
            focus: focus.trim(),
            startedAt: now.toISOString(),
            endsAt,
          });
        }}
        disabled={!focus.trim()}
        className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700 disabled:opacity-40"
      >
        Begin before the Lord →
      </button>
    </div>
  );
}
