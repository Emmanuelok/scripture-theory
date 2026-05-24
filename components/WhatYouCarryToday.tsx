"use client";

import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────
   WhatYouCarryToday — a one-tap entry point from "what I'm feeling
   today" to Scripture that names it.

   We don't ask the user to type anything. We surface the 10 most
   common emotional / spiritual conditions a believer brings to the
   Word, each mapped to an existing topical-index slug (data/resources
   /topics.ts) so the click lands on real verses, not a search page.

   "Grateful" routes to /devotional — the daily editorial reflection
   is the right home for thanksgiving on a given day.
────────────────────────────────────────────────────────────────── */

type Carry = {
  label: string;
  href: string;
  /** Tailwind tone for the chip (kept fixed so JIT picks them up). */
  tone: "ink" | "violet" | "amber" | "rose" | "emerald" | "sky" | "flame";
};

const CARRIES: Carry[] = [
  { label: "Anxious", href: "/resources/topical-index#anxiety", tone: "violet" },
  { label: "Afraid", href: "/resources/topical-index#fear", tone: "violet" },
  { label: "Grieving", href: "/resources/topical-index#grief", tone: "rose" },
  { label: "Lonely", href: "/resources/topical-index#loneliness", tone: "rose" },
  { label: "Doubting", href: "/resources/topical-index#doubt", tone: "ink" },
  { label: "Tempted", href: "/resources/topical-index#temptation", tone: "amber" },
  { label: "Angry", href: "/resources/topical-index#anger", tone: "amber" },
  { label: "Discouraged", href: "/resources/topical-index#discouragement", tone: "ink" },
  { label: "Sleepless", href: "/resources/topical-index#sleeplessness", tone: "ink" },
  { label: "Repenting", href: "/resources/topical-index#repentance", tone: "violet" },
  { label: "Hopeful", href: "/resources/topical-index#hope", tone: "emerald" },
  { label: "Grateful", href: "/devotional", tone: "emerald" },
  { label: "Wanting peace", href: "/resources/topical-index#peace", tone: "sky" },
  { label: "When God is silent", href: "/resources/topical-index#when-god-is-silent", tone: "ink" },
  { label: "Need wisdom", href: "/resources/topical-index#wisdom", tone: "sky" },
  { label: "Carrying conflict", href: "/resources/topical-index#conflict", tone: "amber" },
];

const TONE_CLS: Record<Carry["tone"], string> = {
  ink: "border-ink-300 bg-card text-ink-800 hover:border-ink-900",
  violet: "border-violet-300 bg-violet-50/60 text-violet-900 hover:border-violet-600",
  amber: "border-amber-300 bg-amber-50/60 text-amber-900 hover:border-amber-600",
  rose: "border-rose-300 bg-rose-50/60 text-rose-900 hover:border-rose-600",
  emerald: "border-emerald-300 bg-emerald-50/60 text-emerald-900 hover:border-emerald-600",
  sky: "border-sky-300 bg-sky-50/60 text-sky-900 hover:border-sky-600",
  flame: "border-flame-300 bg-flame-50/60 text-flame-900 hover:border-flame-600",
};

export default function WhatYouCarryToday() {
  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">
            What are you carrying?
          </div>
          <h2 className="font-serif text-xl md:text-2xl text-ink-900 mt-0.5">
            Bring it to the Word.
          </h2>
        </div>
        <Link
          href="/resources/topical-index"
          className="text-xs text-ink-600 hover:text-flame-700"
        >
          The full index →
        </Link>
      </div>
      <p className="mt-2 text-sm text-ink-700 leading-relaxed max-w-2xl">
        Tap what fits today. Every chip opens to Scripture that names what you
        feel — no algorithm, no profile, no judgment.
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {CARRIES.map((c) => (
          <li key={c.label}>
            <Link
              href={c.href}
              className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm transition-colors ${TONE_CLS[c.tone]}`}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
