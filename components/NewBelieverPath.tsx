"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { firstThirtyDays, type FirstDay } from "@/data/new-believer";
import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";

const PROGRESS_BASE = "scripture-theory-firstdays";
const PROGRESS_KEY = () => slotKey(PROGRESS_BASE);

type Saved = { completed: number[]; startedOn: string | null };

function load(): Saved {
  if (typeof window === "undefined") return { completed: [], startedOn: null };
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY());
    if (!raw) return { completed: [], startedOn: null };
    const p = JSON.parse(raw);
    return {
      completed: Array.isArray(p.completed) ? p.completed : [],
      startedOn: typeof p.startedOn === "string" ? p.startedOn : null,
    };
  } catch {
    return { completed: [], startedOn: null };
  }
}

function save(s: Saved) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY(), JSON.stringify(s));
}

const movementColor: Record<FirstDay["movement"], string> = {
  Foundations: "bg-flame-100 text-flame-800 border-flame-200",
  Walk: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Body: "bg-sky-100 text-sky-800 border-sky-200",
  Witness: "bg-amber-100 text-amber-800 border-amber-200",
};

export default function NewBelieverPath() {
  const [state, setState] = useState<Saved>({ completed: [], startedOn: null });
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(1);

  useEffect(() => {
    setState(load());
    setMounted(true);
    if (typeof window === "undefined") return;
    const onSlot = () => setState(load());
    window.addEventListener(SLOT_CHANGE_EVENT, onSlot);
    return () => window.removeEventListener(SLOT_CHANGE_EVENT, onSlot);
  }, []);

  function toggle(day: number) {
    setState((prev) => {
      const completed = prev.completed.includes(day)
        ? prev.completed.filter((d) => d !== day)
        : [...prev.completed, day];
      const startedOn = prev.startedOn ?? new Date().toISOString();
      const next = { completed, startedOn };
      save(next);
      return next;
    });
  }

  function startOver() {
    if (!confirm("Reset your progress through the first 30 days?")) return;
    const next = { completed: [], startedOn: new Date().toISOString() };
    save(next);
    setState(next);
  }

  const completedCount = mounted ? state.completed.length : 0;
  const pct = Math.round((completedCount / firstThirtyDays.length) * 100);

  const movements: FirstDay["movement"][] = ["Foundations", "Walk", "Body", "Witness"];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            Your progress
          </h2>
          {mounted && state.startedOn && (
            <span className="text-xs text-ink-500">
              Started{" "}
              {new Date(state.startedOn).toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <div className="mt-4 h-2.5 rounded-full bg-ink-100 overflow-hidden">
          <div
            className="h-full bg-flame-600 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-baseline justify-between text-xs text-ink-500">
          <span>
            {completedCount} of {firstThirtyDays.length} days
          </span>
          <span>{pct}%</span>
        </div>
        {completedCount > 0 && (
          <button
            onClick={startOver}
            className="mt-4 text-xs text-ink-500 hover:text-ink-900 underline"
          >
            Reset progress
          </button>
        )}
      </div>

      {movements.map((movement) => {
        const days = firstThirtyDays.filter((d) => d.movement === movement);
        const moveDone = days.filter((d) => state.completed.includes(d.day)).length;
        return (
          <section key={movement}>
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <h3 className="font-serif text-xl text-ink-900">
                Week of {movement}
              </h3>
              <span className="text-xs text-ink-500">
                {mounted ? `${moveDone}/${days.length}` : `${days.length} days`}
              </span>
            </div>
            <div className="space-y-3">
              {days.map((d) => {
                const done = mounted && state.completed.includes(d.day);
                const open = expanded === d.day;
                return (
                  <div
                    key={d.day}
                    className={`rounded-2xl border ${
                      done ? "border-flame-300 bg-flame-50/30" : "border-ink-200 bg-card"
                    } overflow-hidden transition-colors`}
                  >
                    <button
                      onClick={() => setExpanded(open ? null : d.day)}
                      className="w-full px-4 py-3 flex items-center gap-3 text-left"
                    >
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium shrink-0 ${
                          done
                            ? "bg-flame-600 text-white"
                            : "bg-ink-100 text-ink-700"
                        }`}
                      >
                        {done ? "✓" : d.day}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-ink-900 truncate">
                          {d.title}
                        </span>
                        <span className="block text-xs text-ink-500 truncate">
                          {d.reference}
                        </span>
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${movementColor[d.movement]}`}
                      >
                        {d.movement}
                      </span>
                      <span className="text-ink-400 text-xs shrink-0">
                        {open ? "▴" : "▾"}
                      </span>
                    </button>
                    {open && (
                      <div className="px-4 pb-4 pt-1 border-t border-ink-100 text-sm space-y-3">
                        <p className="text-ink-700 leading-relaxed">{d.why}</p>
                        <div className="rounded-xl border border-ink-200 bg-card-subtle p-3">
                          <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
                            Today's step
                          </div>
                          <p className="text-ink-800 leading-relaxed">{d.step}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <Link
                            href={d.verse ? `/verse/${d.bookId}/${d.chapter}/${d.verse}` : `/bible/${d.bookId}/${d.chapter}`}
                            className="rounded-full border border-ink-300 px-3.5 py-1 text-xs text-ink-800 hover:border-ink-900"
                          >
                            Open {d.reference} →
                          </Link>
                          <button
                            onClick={() => toggle(d.day)}
                            className={`rounded-full px-3.5 py-1 text-xs ${
                              done
                                ? "border border-ink-300 text-ink-700 hover:border-ink-900"
                                : "bg-flame-600 text-white hover:bg-flame-700"
                            }`}
                          >
                            {done ? "Mark not done" : "Mark done"}
                          </button>
                          <Link
                            href="/secret-place"
                            className="rounded-full border border-ink-300 px-3.5 py-1 text-xs text-ink-800 hover:border-ink-900"
                          >
                            Journal this →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <p className="text-xs text-ink-400 leading-relaxed">
        Your progress lives on this device only. It is never sent to a server. Bookmark this page
        and return to it daily — you do not need an account.
      </p>
    </div>
  );
}
