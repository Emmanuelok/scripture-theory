"use client";

import { useEffect, useMemo, useState } from "react";
import { readingPlans } from "@/data/readings";

type Progress = Record<string, number[]>;

const STORAGE = "scripture-theory-progress";

function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE, JSON.stringify(p));
}

export default function ReadingPlanView() {
  const [activeId, setActiveId] = useState(readingPlans[0].id);
  const [progress, setProgress] = useState<Progress>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setMounted(true);
  }, []);

  const plan = useMemo(
    () => readingPlans.find((p) => p.id === activeId) ?? readingPlans[0],
    [activeId]
  );
  const done = progress[plan.id] ?? [];
  const nextDay = useMemo(() => {
    for (const d of plan.days) if (!done.includes(d.day)) return d;
    return plan.days[plan.days.length - 1];
  }, [plan, done]);

  function toggle(day: number) {
    setProgress((prev) => {
      const list = new Set(prev[plan.id] ?? []);
      if (list.has(day)) list.delete(day);
      else list.add(day);
      const next = { ...prev, [plan.id]: Array.from(list).sort((a, b) => a - b) };
      saveProgress(next);
      return next;
    });
  }

  const percent = Math.round((done.length / plan.totalDays) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {readingPlans.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`rounded-full px-4 py-2 text-sm border transition-colors ${
              p.id === activeId
                ? "bg-ink-900 text-ink-50 border-ink-900"
                : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl text-ink-900">{plan.name}</h2>
            <p className="text-ink-500 mt-1">{plan.tagline}</p>
          </div>
          <span className="text-xs uppercase tracking-widest text-ink-400">
            {mounted ? `${done.length} / ${plan.totalDays} read` : `${plan.totalDays} days`}
          </span>
        </div>
        <p className="mt-4 text-ink-700 leading-relaxed">{plan.description}</p>

        {mounted && (
          <div className="mt-5 h-2 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-flame-500 transition-all"
              style={{ width: `${percent}%` }}
              aria-label={`${percent}% complete`}
            />
          </div>
        )}

        <div className="mt-7 rounded-2xl bg-ink-900 text-ink-50 p-5 md:p-6">
          <div className="text-xs uppercase tracking-widest text-flame-300">Today's reading</div>
          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-serif text-2xl">
              Day {nextDay.day} — {nextDay.reference}
            </h3>
            <span className="text-sm text-ink-300">{nextDay.title}</span>
          </div>
          <p className="mt-3 text-ink-200 leading-relaxed">{nextDay.meditation}</p>
          {mounted && (
            <button
              onClick={() => toggle(nextDay.day)}
              className="mt-5 inline-flex items-center rounded-full bg-flame-600 hover:bg-flame-700 text-ink-50 px-5 py-2 text-sm"
            >
              {done.includes(nextDay.day) ? "Mark unread" : "Mark today read"}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-ink-200 bg-ink-50/60 p-5 md:p-6">
        <div className="text-xs uppercase tracking-widest text-ink-500 mb-3">Plan overview</div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {plan.days.map((d) => {
            const isDone = done.includes(d.day);
            return (
              <li key={d.day}>
                <button
                  onClick={() => mounted && toggle(d.day)}
                  className={`w-full text-left rounded-xl border px-3 py-2 transition-colors text-sm ${
                    isDone
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-white border-ink-200 hover:border-ink-400 text-ink-800"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium">Day {d.day}</span>
                    <span className="text-xs text-ink-500">{d.reference}</span>
                  </div>
                  <div className="text-xs text-ink-500 mt-0.5">{d.title}</div>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-xs text-ink-500">
          Progress is saved on this device. Sign-in and cross-device sync arrive in Q2 — for now,
          your rhythm with Jesus lives quietly in your own browser.
        </p>
      </div>
    </div>
  );
}
