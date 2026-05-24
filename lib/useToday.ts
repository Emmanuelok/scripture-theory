"use client";

import { useEffect, useState } from "react";

/**
 * A reactive "now" for the user's wall clock. Re-renders when:
 *   • the UTC day rolls over (a timer scheduled to fire just after midnight)
 *   • the tab is re-foregrounded after being hidden (Page Visibility API)
 *   • the window regains focus
 *
 * Use this anywhere a component renders today-keyed content so the user
 * isn't frozen on whatever date the component first mounted with — the
 * common bug being `useMemo(() => new Date(), [])` returning stale data
 * to a user whose tab has been open for hours.
 *
 * The hook returns a fresh `Date` on every refresh. Day-of-year derived
 * content (today's verse, today's nation, today's devotional) updates
 * automatically as the date changes.
 */
export function useToday(): Date {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function refresh() {
      if (!cancelled) setNow(new Date());
    }

    function scheduleNextDay() {
      const next = new Date();
      // 30 seconds into the next UTC day, to safely cross the boundary
      next.setUTCHours(24, 0, 30, 0);
      const ms = Math.max(1000, next.getTime() - Date.now());
      timer = setTimeout(() => {
        refresh();
        scheduleNextDay();
      }, ms);
    }

    function onVisible() {
      if (document.visibilityState === "visible") refresh();
    }

    scheduleNextDay();
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", refresh);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  return now;
}

/**
 * Same as useToday() but returns the YYYY-MM-DD UTC date key — useful
 * for comparing "is this today" without re-rendering on every minute tick.
 */
export function useTodayKey(): string {
  const now = useToday();
  return now.toISOString().slice(0, 10);
}

/**
 * Polls the wall clock at a coarse interval (default 5 min) and re-renders
 * when the value passed through `derive` changes — for time-of-day
 * adaptive UI without re-rendering on every minute.
 */
export function useTimeBand<T>(derive: (d: Date) => T, intervalMs = 5 * 60_000): T {
  const today = useToday();
  const [band, setBand] = useState<T>(() => derive(today));

  useEffect(() => {
    setBand(derive(new Date()));
    const i = setInterval(() => {
      setBand((prev) => {
        const next = derive(new Date());
        return Object.is(prev, next) ? prev : next;
      });
    }, intervalMs);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs]);

  // also refresh whenever the UTC day rolls over
  useEffect(() => {
    setBand(derive(today));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  return band;
}
