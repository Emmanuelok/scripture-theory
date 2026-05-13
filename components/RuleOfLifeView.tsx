"use client";

import { useState } from "react";
import Link from "next/link";
import { useProfile, type RuleDiscipline, type RuleOfLife } from "@/lib/profile";
import { disciplines, ruleIntro, sampleRules } from "@/data/rule";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function RuleOfLifeView() {
  const { profile, update, mounted } = useProfile();
  const rule: RuleOfLife = profile.rule ?? { daily: [], weekly: [], monthly: [], log: {} };
  const [tab, setTab] = useState<"build" | "today" | "library">("today");

  if (!mounted) return <div className="text-ink-500">Loading…</div>;

  const hasRule = (rule.daily?.length ?? 0) + (rule.weekly?.length ?? 0) + (rule.monthly?.length ?? 0) > 0;

  function toggle(cadence: "daily" | "weekly" | "monthly", id: RuleDiscipline) {
    const list = rule[cadence] ?? [];
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    update({ rule: { ...rule, [cadence]: next, startedAt: rule.startedAt ?? new Date().toISOString() } });
  }

  function markDone(id: RuleDiscipline) {
    const today = todayKey();
    const log = { ...(rule.log ?? {}) };
    const existing = log[id] ?? [];
    if (existing.includes(today)) {
      log[id] = existing.filter((d) => d !== today);
    } else {
      log[id] = [today, ...existing].slice(0, 365);
    }
    update({ rule: { ...rule, log } });
  }

  function applySample(s: typeof sampleRules[number]) {
    update({
      rule: {
        ...rule,
        daily: s.daily,
        weekly: s.weekly,
        monthly: s.monthly,
        startedAt: rule.startedAt ?? new Date().toISOString(),
      },
    });
  }

  return (
    <div className="space-y-8">
      {!hasRule && (
        <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
          <h2 className="font-serif text-2xl text-ink-900">{ruleIntro.title}</h2>
          {ruleIntro.body.map((p, i) => (
            <p key={i} className="mt-3 text-ink-700 leading-relaxed">
              {p}
            </p>
          ))}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {sampleRules.map((s) => (
              <button
                key={s.name}
                onClick={() => applySample(s)}
                className="text-left rounded-2xl border border-ink-200 bg-card-subtle p-5 hover:border-flame-500"
              >
                <div className="font-serif text-lg text-ink-900">{s.name}</div>
                <div className="text-xs text-flame-700 mt-1">{s.forWhom}</div>
                <p className="text-sm text-ink-700 mt-3 leading-relaxed">{s.body}</p>
                <div className="mt-4 text-xs text-flame-700">Use this →</div>
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="flex gap-2">
        {(["today", "build", "library"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm ${
              tab === t
                ? "bg-flame-600 text-ink-50"
                : "border border-ink-300 text-ink-700 hover:border-ink-900"
            }`}
          >
            {t === "today" ? "Today" : t === "build" ? "My rule" : "Library"}
          </button>
        ))}
      </div>

      {tab === "today" && hasRule && (
        <CadenceList
          title="Today"
          ids={rule.daily ?? []}
          log={rule.log ?? {}}
          onToggle={markDone}
          empty="No daily practices set yet. Open My rule."
        />
      )}

      {tab === "today" && !hasRule && (
        <div className="rounded-2xl border border-ink-200 bg-card p-5 text-sm text-ink-600">
          Pick a sample rule above, or build your own — then return here.
        </div>
      )}

      {tab === "today" && hasRule && (
        <>
          <CadenceList
            title="This week"
            ids={rule.weekly ?? []}
            log={rule.log ?? {}}
            onToggle={markDone}
            empty="No weekly practices set."
          />
          <CadenceList
            title="This month"
            ids={rule.monthly ?? []}
            log={rule.log ?? {}}
            onToggle={markDone}
            empty="No monthly practices set."
          />
        </>
      )}

      {tab === "build" && (
        <section className="space-y-6">
          {(["daily", "weekly", "monthly"] as const).map((cadence) => (
            <div key={cadence}>
              <h3 className="font-serif text-xl text-ink-900 capitalize">{cadence}</h3>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                {disciplines
                  .filter((d) => d.cadence.includes(cadence))
                  .map((d) => {
                    const active = (rule[cadence] ?? []).includes(d.id);
                    return (
                      <li key={d.id}>
                        <button
                          onClick={() => toggle(cadence, d.id)}
                          className={`text-left w-full rounded-2xl border p-4 transition-colors ${
                            active
                              ? "border-flame-500 bg-flame-50/60"
                              : "border-ink-200 bg-card hover:border-ink-400"
                          }`}
                        >
                          <div className="flex items-baseline justify-between">
                            <span className="font-serif text-ink-900">{d.name}</span>
                            <span className={`text-xs ${active ? "text-flame-700" : "text-ink-400"}`}>
                              {active ? "✓ in rule" : "+ add"}
                            </span>
                          </div>
                          <div className="text-xs text-ink-500 mt-1">{d.short}</div>
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}

          {hasRule && (
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.confirm("Clear your whole rule of life?")) {
                  update({ rule: { daily: [], weekly: [], monthly: [], log: {} } });
                }
              }}
              className="text-xs text-ink-500 hover:text-flame-700"
            >
              Clear my rule
            </button>
          )}
        </section>
      )}

      {tab === "library" && (
        <section className="space-y-3">
          {disciplines.map((d) => (
            <details key={d.id} className="rounded-2xl border border-ink-200 bg-card p-5 open:border-flame-500">
              <summary className="cursor-pointer flex items-baseline justify-between gap-3 list-none">
                <div>
                  <div className="font-serif text-lg text-ink-900">{d.name}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{d.short}</div>
                </div>
                <span className="text-xs text-flame-700">Open →</span>
              </summary>
              <div className="mt-4 space-y-3 text-sm">
                <p className="text-ink-700 leading-relaxed">{d.why}</p>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">Practices</div>
                  <ul className="mt-1 list-disc pl-5 text-ink-700 space-y-1">
                    {d.practices.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-ink-700 italic border-l-2 border-flame-500 pl-3">
                  "{d.scripture.text}" — {d.scripture.ref}
                </p>
              </div>
            </details>
          ))}
        </section>
      )}

      <p className="text-xs text-ink-500">
        Your rule lives on this device only. <Link href="/secret-place" className="hover:text-flame-700">Open the Secret Place</Link>{" "}
        for the journal that pairs with it.
      </p>
    </div>
  );
}

function CadenceList({
  title,
  ids,
  log,
  onToggle,
  empty,
}: {
  title: string;
  ids: RuleDiscipline[];
  log: Record<string, string[]>;
  onToggle: (id: RuleDiscipline) => void;
  empty: string;
}) {
  const today = todayKey();
  if (ids.length === 0) {
    return (
      <section>
        <h3 className="font-serif text-xl text-ink-900">{title}</h3>
        <p className="mt-2 text-sm text-ink-500">{empty}</p>
      </section>
    );
  }
  return (
    <section>
      <h3 className="font-serif text-xl text-ink-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {ids.map((id) => {
          const d = disciplines.find((x) => x.id === id);
          if (!d) return null;
          const done = (log[id] ?? []).includes(today);
          return (
            <li key={id} className="rounded-2xl border border-ink-200 bg-card p-4 flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <div className="font-serif text-ink-900">{d.name}</div>
                <div className="text-xs text-ink-500 mt-0.5">{d.short}</div>
              </div>
              <button
                onClick={() => onToggle(id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs ${
                  done
                    ? "bg-flame-600 text-ink-50"
                    : "border border-ink-300 text-ink-700 hover:border-ink-900"
                }`}
              >
                {done ? "Done today ✓" : "Mark done"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
