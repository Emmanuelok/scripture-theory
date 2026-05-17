import { TRACK } from "@/data/courseTrack";
import type { MemoryVerse, Theme } from "@/data/memory";

/* ──────────────────────────────────────────────────────────────────
   Cross-course memory verses — every memory verse from every course
   in the growth tract, exposed in the same MemoryVerse shape used by
   the standalone memory trainer.

   This lets a believer who has walked the courses keep all their
   verses warm in one place, and lets the memory page surface verses
   they have encountered in formation.
────────────────────────────────────────────────────────────────── */

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Best-effort theme mapping. Default to discipleship; the trainer
// only uses themes for filtering, so a rough mapping is fine.
const COURSE_THEME: Record<string, Theme> = {
  foundations: "jesus",
  "story-of-god": "wisdom",
  disciplines: "discipleship",
  sermon: "discipleship",
};

export type CourseMemoryVerse = MemoryVerse & {
  courseId: string;
  courseTitle: string;
  week: number;
  weekTitle: string;
};

export const courseMemoryVerses: CourseMemoryVerse[] = TRACK.flatMap((tc) =>
  tc.data.map((w) => ({
    id: `${tc.id}-w${w.week}-${slugify(w.memoryVerse.ref)}`,
    ref: w.memoryVerse.ref,
    text: w.memoryVerse.text,
    translation: "WEB" as const,
    theme: COURSE_THEME[tc.id] ?? "discipleship",
    why: `Memory verse for ${tc.title} · Week ${w.week} (${w.title}). Walk it home this week.`,
    courseId: tc.id,
    courseTitle: tc.title,
    week: w.week,
    weekTitle: w.title,
  }))
);
