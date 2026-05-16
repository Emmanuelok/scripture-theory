import type { CourseProgress } from "@/lib/profile";

/* ──────────────────────────────────────────────────────────────────
   coursePace — reads the believer's actual cadence on Foundations
   (per-day completion dates, week completion dates, week-to-week gap)
   and surfaces a pastoral signal: drifting, steady, or ahead.

   Pure on-device. No surveillance, no scoring. The goal is mercy:
   if someone has stopped, soften the next nudge into a re-entry; if
   someone is racing through, surface the deeper readings so they
   don't skim past the marrow.
────────────────────────────────────────────────────────────────── */

export type Cadence = "drifting" | "re-entering" | "steady" | "ahead" | "unstarted";

export type PaceReading = {
  cadence: Cadence;
  daysSinceLastTouch: number | null;
  avgDaysPerWeek: number | null; // average days between week completions
  weeksDone: number;
};

function daysBetween(a: string, b: string) {
  return Math.abs(new Date(a).getTime() - new Date(b).getTime()) / 86_400_000;
}

export function readPace(course: CourseProgress | undefined, now: Date = new Date()): PaceReading {
  if (!course) {
    return { cadence: "unstarted", daysSinceLastTouch: null, avgDaysPerWeek: null, weeksDone: 0 };
  }

  const completedAt = course.weekCompletedAt ?? {};
  const weeksDone = Object.keys(completedAt).length;
  const completions = Object.values(completedAt)
    .filter((iso): iso is string => !!iso)
    .map((iso) => new Date(iso).getTime())
    .sort((a, b) => a - b);

  // Most recent touch = latest week completion or latest day mark
  const dayDates: number[] = [];
  for (const arr of Object.values(course.daysComplete ?? {})) {
    if (!arr) continue;
    // daysComplete stores day numbers, not dates; fall back to week completion
  }
  void dayDates;

  const latestCompletion = completions.length > 0 ? completions[completions.length - 1] : null;
  const daysSinceLastTouch =
    latestCompletion === null
      ? null
      : Math.floor((now.getTime() - latestCompletion) / 86_400_000);

  // Average gap between consecutive week completions
  let avg: number | null = null;
  if (completions.length >= 2) {
    const gaps: number[] = [];
    for (let i = 1; i < completions.length; i++) {
      gaps.push((completions[i] - completions[i - 1]) / 86_400_000);
    }
    avg = gaps.reduce((s, g) => s + g, 0) / gaps.length;
  }

  if (weeksDone === 0) {
    return { cadence: "unstarted", daysSinceLastTouch, avgDaysPerWeek: avg, weeksDone };
  }

  // Re-entering: they've drifted >14d AND they're not done.
  // Drifting: 7-14d without a touch.
  // Ahead: average gap < 4 days (intense pace).
  // Steady: otherwise.
  if (daysSinceLastTouch !== null && daysSinceLastTouch >= 21) {
    return { cadence: "re-entering", daysSinceLastTouch, avgDaysPerWeek: avg, weeksDone };
  }
  if (daysSinceLastTouch !== null && daysSinceLastTouch >= 10) {
    return { cadence: "drifting", daysSinceLastTouch, avgDaysPerWeek: avg, weeksDone };
  }
  if (avg !== null && avg < 4 && weeksDone >= 2) {
    return { cadence: "ahead", daysSinceLastTouch, avgDaysPerWeek: avg, weeksDone };
  }
  return { cadence: "steady", daysSinceLastTouch, avgDaysPerWeek: avg, weeksDone };
}

export const PACE_COPY: Record<
  Cadence,
  { eyebrow: string; title: string; sub: string }
> = {
  unstarted: {
    eyebrow: "Foundations · begin",
    title: "A twelve-week walk is waiting.",
    sub: "Open Week 1 when you're ready. No streaks. No shame. Just the Word.",
  },
  drifting: {
    eyebrow: "Foundations · gentle re-entry",
    title: "It's been a little while.",
    sub: "Don't restart from the top. Open where you left off, read one paragraph, and that's enough for today.",
  },
  "re-entering": {
    eyebrow: "Foundations · welcome back",
    title: "He has not let go.",
    sub: "Three weeks or three months — the Father runs to the one returning. Open the next week and read only the anchor scripture today.",
  },
  steady: {
    eyebrow: "Foundations · steady walk",
    title: "Keep going.",
    sub: "One week at a time. The Word is not a sprint; it is bread for the day.",
  },
  ahead: {
    eyebrow: "Foundations · slow down",
    title: "You're moving fast — go deeper.",
    sub: "Try the recommended reading for this week. A second pass with one of the witnesses changes the air in the room.",
  },
};
