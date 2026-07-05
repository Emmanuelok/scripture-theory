import { memoryVerses, type MemoryVerse } from "@/data/memory";
import type { MemoryLevel, MemoryRecord } from "@/lib/profile";

// Spaced-repetition intervals (days) per level. Leitner-style:
// a verse becomes "due" again `INTERVAL[level]` days after lastPracticedAt.
// Lower levels review sooner, mastered verses keep warm with a monthly recall.
export const SR_INTERVAL_DAYS: Record<MemoryLevel, number> = {
  reading: 0,           // due immediately — they just started it
  "first-letters": 1,   // overnight
  blanks: 2,
  recited: 5,
  mastered: 30,         // monthly warm-up
};

function dayDiff(fromIso: string, toIso: string): number {
  const a = new Date(fromIso).getTime();
  const b = new Date(toIso).getTime();
  return Math.floor((b - a) / 86_400_000);
}

export function dueDateFor(record: MemoryRecord): Date {
  const base = record.lastPracticedAt ?? record.startedAt;
  const interval = SR_INTERVAL_DAYS[record.level] ?? 0;
  return new Date(new Date(base).getTime() + interval * 86_400_000);
}

export function isDue(record: MemoryRecord, now: Date = new Date()): boolean {
  return dueDateFor(record).getTime() <= now.getTime();
}

export function daysOverdue(record: MemoryRecord, now: Date = new Date()): number {
  return Math.max(0, dayDiff(dueDateFor(record).toISOString(), now.toISOString()));
}

export type DueVerse = {
  verse: MemoryVerse;
  record: MemoryRecord;
  overdue: number;
};

/** Verses started but currently due for review, soonest-overdue last. */
export function dueVerses(records: MemoryRecord[], now: Date = new Date()): DueVerse[] {
  const byId = new Map(memoryVerses.map((v) => [v.id, v] as const));
  // `isDue` already applies each level's interval, including the mastered
  // 30-day monthly warm-up. A second `daysOverdue >= 30` gate on mastered
  // rows double-counted the interval and hid them for 60 days, not 30.
  return records
    .filter((r) => isDue(r, now))
    .map((r) => {
      const verse = byId.get(r.verseId);
      if (!verse) return null;
      return { verse, record: r, overdue: daysOverdue(r, now) };
    })
    .filter((x): x is DueVerse => x !== null)
    .sort((a, b) => b.overdue - a.overdue);
}

/**
 * When a mastered verse is severely overdue (≥ 2× the monthly interval),
 * gently regress it to "recited" so the believer reviews it more often
 * until it warms back up. Returns the level the record should be at.
 */
export function adjustedLevel(record: MemoryRecord, now: Date = new Date()): MemoryLevel {
  if (record.level !== "mastered") return record.level;
  const overdue = daysOverdue(record, now);
  if (overdue >= SR_INTERVAL_DAYS.mastered * 2) return "recited";
  return record.level;
}
