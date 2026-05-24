"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTimeBand, useToday } from "@/lib/useToday";
import {
  currentLiturgicalHour,
  dismissToday,
  maybeFireDailyNotification,
  todaysReminder,
  wasDismissedToday,
} from "@/lib/daily-reminder";

/**
 * A gentle daily prompt at the top of /today and the home page.
 *
 *   • Sunday → fellowship reminder (gather with the Body)
 *   • Mon–Sat → four small practices (meditate / read / journal / pray)
 *
 * Dismissible per day; respects the user's notification opt-in if
 * granted, fires a single browser notification on the day's first
 * visit.
 */
export default function DailyRhythmReminder({
  variant = "card",
}: {
  variant?: "card" | "strip";
}) {
  const today = useToday();
  // Re-render when the liturgical-hour band changes (morning → midday → evening → night)
  const hour = useTimeBand(currentLiturgicalHour);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHidden(wasDismissedToday(today));
    // Try to fire today's browser notification (no-op if not opted in
    // or already fired today)
    maybeFireDailyNotification(today);
  }, [today]);

  // Reset dismissal when the hour band changes — the user gets the next
  // band's reminder even if they dismissed the previous one.
  useEffect(() => {
    setHidden(wasDismissedToday(today));
  }, [hour, today]);

  if (!mounted || hidden) return null;

  const reminder = todaysReminder(today);
  const isSunday = reminder.shape === "sunday";

  function handleDismiss() {
    dismissToday(today);
    setHidden(true);
  }

  if (variant === "strip") {
    return (
      <div
        className={`relative rounded-2xl border p-3 md:p-4 flex flex-wrap items-center gap-3 ${
          isSunday
            ? "border-flame-300 bg-gradient-to-r from-flame-50 to-card"
            : "border-ink-200 bg-card-subtle"
        }`}
      >
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">
            {reminder.eyebrow}
          </div>
          <div className="font-serif text-base text-ink-900 mt-0.5">{reminder.title}</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {reminder.ctas.slice(0, 2).map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-full bg-ink-900 text-ink-50 px-3 py-1 text-xs hover:bg-flame-700"
            >
              {c.label}
            </Link>
          ))}
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss for today"
          className="ml-1 text-ink-400 hover:text-ink-700"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <section
      className={`relative rounded-3xl border p-6 md:p-7 ${
        isSunday
          ? "border-flame-300 bg-gradient-to-br from-flame-50 via-card to-card"
          : "border-ink-200 bg-card"
      }`}
    >
      <button
        onClick={handleDismiss}
        aria-label="Dismiss for today"
        className="absolute top-3 right-4 text-ink-400 hover:text-ink-800 text-sm"
      >
        ✕
      </button>

      <div className="text-xs uppercase tracking-widest text-flame-700">{reminder.eyebrow}</div>
      <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1 leading-tight">
        {reminder.title}
      </h2>
      <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">{reminder.body}</p>

      <blockquote className="mt-4 rounded-2xl border-l-2 border-flame-400 bg-card-subtle p-3 md:p-4 text-sm text-ink-800 italic leading-relaxed">
        &ldquo;{reminder.scripture.text}&rdquo;
        <span className="block mt-1 not-italic text-[11px] uppercase tracking-widest text-flame-700">
          {reminder.scripture.ref}
        </span>
      </blockquote>

      <div className="mt-5 flex flex-wrap gap-2">
        {reminder.ctas.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm transition-colors ${
              i === 0
                ? "bg-flame-600 text-ink-50 hover:bg-flame-700"
                : "border border-ink-300 text-ink-800 bg-card hover:border-ink-900"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
