import { describe, it, expect } from "vitest";
import { dueVerses, isDue, SR_INTERVAL_DAYS } from "@/lib/memorySchedule";
import { memoryVerses } from "@/data/memory";
import type { MemoryRecord } from "@/lib/profile";

const DAY = 86_400_000;
const knownVerseId = memoryVerses[0].id;

function record(partial: Partial<MemoryRecord>): MemoryRecord {
  return {
    verseId: knownVerseId,
    startedAt: new Date(0).toISOString(),
    attempts: 1,
    level: "recited",
    ...partial,
  };
}

describe("memorySchedule.dueVerses", () => {
  const now = new Date("2024-06-01T12:00:00Z");

  it("surfaces a mastered verse at the monthly interval (30d), not 60d", () => {
    // Regression: a second daysOverdue>=30 gate double-counted the interval
    // and hid mastered verses for 60 days instead of the documented 30.
    const at31 = record({
      level: "mastered",
      lastPracticedAt: new Date(now.getTime() - 31 * DAY).toISOString(),
    });
    const at20 = record({
      level: "mastered",
      lastPracticedAt: new Date(now.getTime() - 20 * DAY).toISOString(),
    });
    const due = dueVerses([at31, at20], now);
    expect(due.map((d) => d.record)).toContain(at31);
    expect(due.map((d) => d.record)).not.toContain(at20);
  });

  it("does not surface a recited verse before its 5-day interval", () => {
    const fresh = record({
      level: "recited",
      lastPracticedAt: new Date(now.getTime() - 2 * DAY).toISOString(),
    });
    expect(isDue(fresh, now)).toBe(false);
    expect(dueVerses([fresh], now)).toHaveLength(0);
  });

  it("orders most-overdue first", () => {
    const a = record({ verseId: knownVerseId, level: "reading", lastPracticedAt: new Date(now.getTime() - 3 * DAY).toISOString() });
    const b = record({ verseId: memoryVerses[1].id, level: "reading", lastPracticedAt: new Date(now.getTime() - 10 * DAY).toISOString() });
    const due = dueVerses([a, b], now);
    expect(due[0].overdue).toBeGreaterThanOrEqual(due[due.length - 1].overdue);
  });

  it("mastered interval is the documented 30 days", () => {
    expect(SR_INTERVAL_DAYS.mastered).toBe(30);
  });
});
