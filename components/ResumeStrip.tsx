"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProfile } from "@/lib/profile";
import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";
import { readingPlans } from "@/data/readings";
import { todaysDevotional } from "@/data/devotional";
import { slugifyDevotional } from "@/lib/devotional-slug";
import { canon } from "@/data/bible/canon";
import { useToday } from "@/lib/useToday";

/* ──────────────────────────────────────────────────────────────────
   ResumeStrip — surfaces where the believer left off, so /today
   opens onto the next quiet step rather than a blank menu.

   Signals (all device-local):
     • last-read Bible chapter (scripture-theory-last-read, per-slot)
     • most active reading plan (scripture-theory-progress, per-slot)
     • today's devotional (always present — points to the permalink)

   Renders nothing for a brand-new visitor with no signals. As soon
   as the believer has read one chapter or progressed one plan day,
   the strip lights up.
────────────────────────────────────────────────────────────────── */

type LastRead = {
  bookId: string;
  bookName: string;
  chapter: number;
  translation: string;
  at: string;
};

type PlanProgress = Record<string, number[]>;

function fmtRelative(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function readLastRead(): LastRead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(slotKey("scripture-theory-last-read"));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.bookId || !parsed?.chapter) return null;
    return parsed as LastRead;
  } catch {
    return null;
  }
}

function readPlanProgress(): PlanProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(slotKey("scripture-theory-progress"));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Pick the most-active plan: largest completed-day count. */
function topPlan(progress: PlanProgress): {
  id: string;
  name: string;
  done: number;
  total: number;
  nextDay: number;
} | null {
  let best: { id: string; done: number } | null = null;
  for (const [id, days] of Object.entries(progress)) {
    const n = Array.isArray(days) ? days.length : 0;
    if (n === 0) continue;
    if (!best || n > best.done) best = { id, done: n };
  }
  if (!best) return null;
  const plan = readingPlans.find((p) => p.id === best!.id);
  if (!plan) return null;
  const completed = new Set(progress[best.id] ?? []);
  const total = plan.totalDays;
  // Find the first day not in the completed set (1-indexed)
  let nextDay = total;
  for (let i = 1; i <= total; i++) {
    if (!completed.has(i)) { nextDay = i; break; }
  }
  return { id: plan.id, name: plan.name, done: best.done, total, nextDay };
}

function nextChapterRef(last: LastRead): { bookId: string; bookName: string; chapter: number } | null {
  const book = canon.find((b) => b.id === last.bookId);
  if (!book) return null;
  if (last.chapter < book.chapters) {
    return { bookId: book.id, bookName: book.name, chapter: last.chapter + 1 };
  }
  // End of book — point to the next book's chapter 1
  const idx = canon.findIndex((b) => b.id === book.id);
  const next = canon[idx + 1];
  if (next) return { bookId: next.id, bookName: next.name, chapter: 1 };
  return null;
}

export default function ResumeStrip() {
  const today = useToday();
  const { mounted: profileMounted } = useProfile();
  const [mounted, setMounted] = useState(false);
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [progress, setProgress] = useState<PlanProgress>({});

  useEffect(() => {
    setMounted(true);
    function refresh() {
      setLastRead(readLastRead());
      setProgress(readPlanProgress());
    }
    refresh();
    function onFocus() { refresh(); }
    window.addEventListener("focus", onFocus);
    window.addEventListener(SLOT_CHANGE_EVENT, refresh);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(SLOT_CHANGE_EVENT, refresh);
    };
  }, []);

  if (!mounted || !profileMounted) return null;

  const plan = topPlan(progress);
  const next = lastRead ? nextChapterRef(lastRead) : null;
  const devotional = todaysDevotional(today);

  // Brand-new visitor with nothing to resume — render nothing
  if (!lastRead && !plan) return null;

  return (
    <section className="rounded-3xl border border-ink-200 bg-card-subtle p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xs uppercase tracking-widest text-flame-700">Where you left off</h2>
        <span className="text-[10px] text-ink-500 italic">Lives only on this device</span>
      </div>

      <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Last-read chapter */}
        {lastRead && next && (
          <li>
            <Link
              href={`/bible/${next.bookId}/${next.chapter}`}
              className="block h-full rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                Continue reading
              </div>
              <div className="font-serif text-lg text-ink-900 mt-1 leading-tight">
                {next.bookName} {next.chapter}
              </div>
              <div className="text-[11px] text-ink-500 mt-1">
                You read {lastRead.bookName} {lastRead.chapter} · {fmtRelative(lastRead.at)}
              </div>
              <div className="mt-2 text-xs text-flame-700">Open next chapter →</div>
            </Link>
          </li>
        )}

        {/* Active reading plan */}
        {plan && (
          <li>
            <Link
              href={`/read/${plan.id}#day-${plan.nextDay}`}
              className="block h-full rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                Reading plan
              </div>
              <div className="font-serif text-lg text-ink-900 mt-1 leading-tight">
                {plan.name}
              </div>
              <div className="text-[11px] text-ink-500 mt-1">
                Day {plan.done} of {plan.total} · next: day {plan.nextDay}
              </div>
              <div className="mt-2 h-1 w-full rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full bg-flame-500"
                  style={{ width: `${Math.min(100, (plan.done / plan.total) * 100)}%` }}
                />
              </div>
            </Link>
          </li>
        )}

        {/* Today's devotional */}
        <li>
          <Link
            href={`/devotional/${slugifyDevotional(devotional.title)}`}
            className="block h-full rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Today's devotional
            </div>
            <div className="font-serif text-lg text-ink-900 mt-1 leading-tight">
              {devotional.title}
            </div>
            <div className="text-[11px] text-ink-500 mt-1 italic">{devotional.reference}</div>
            <div className="mt-2 text-xs text-flame-700">Read today's meditation →</div>
          </Link>
        </li>
      </ul>
    </section>
  );
}
