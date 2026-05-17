import { COURSE_WEEKS, COURSE_TITLE, COURSE_SUBTITLE, type CourseWeek } from "@/data/course";
import { STORY_WEEKS, STORY_TITLE, STORY_SUBTITLE } from "@/data/storyOfGod";

/* ──────────────────────────────────────────────────────────────────
   Growth Tract — the path of courses the platform offers, each
   building on the last. Completion of an earlier course is the
   prerequisite for the next.

   Course 1: Foundations of the Faith (12 weeks)
   Course 2: The Story of God (12 weeks)
   Course 3+: Planned. The tract is meant to keep growing.
────────────────────────────────────────────────────────────────── */

export type CourseId = "foundations" | "story-of-god";

export type TrackCourse = {
  id: CourseId;
  /** URL slug for the course (kept stable; Foundations also lives at /course/* for backward compat). */
  slug: string;
  title: string;
  subtitle: string;
  /** One-paragraph summary for the track listing. */
  tagline: string;
  /** Prerequisite course ids that must be passed first. Empty = no prereq. */
  prerequisites: CourseId[];
  /** Total weeks in the course. */
  weeks: number;
  /** Underlying course data — used by /track/[id]/week/[n] routes. */
  data: CourseWeek[];
  /** Path to the course's primary entry page. */
  href: string;
  /** Lightweight aesthetic accent for the track view. */
  accent: "flame" | "blue" | "emerald" | "violet";
  /** Whether the course is currently shippable or in development. */
  status: "live" | "coming-soon";
};

export const TRACK: TrackCourse[] = [
  {
    id: "foundations",
    slug: "foundations",
    title: COURSE_TITLE,
    subtitle: COURSE_SUBTITLE,
    tagline:
      "The doctrinal floor under every Christian life. Who is God, who is Jesus, what is the Spirit doing, what is the Church, what is salvation — twelve weeks for the new believer or any believer who wants the floor again.",
    prerequisites: [],
    weeks: COURSE_WEEKS.length,
    data: COURSE_WEEKS,
    href: "/course",
    accent: "flame",
    status: "live",
  },
  {
    id: "story-of-god",
    slug: "story-of-god",
    title: STORY_TITLE,
    subtitle: STORY_SUBTITLE,
    tagline:
      "The Bible as one Story — Creation, Fall, Israel, Christ, the Church, the New Creation. Twelve weeks tracing the metanarrative so that every passage you read finds its place, and you find your own place in it.",
    prerequisites: ["foundations"],
    weeks: STORY_WEEKS.length,
    data: STORY_WEEKS,
    href: "/track/story-of-god",
    accent: "blue",
    status: "live",
  },
];

export function findCourse(id: string): TrackCourse | undefined {
  return TRACK.find((c) => c.id === id || c.slug === id);
}

export function nextCourseAfter(id: CourseId): TrackCourse | null {
  const idx = TRACK.findIndex((c) => c.id === id);
  if (idx === -1 || idx === TRACK.length - 1) return null;
  return TRACK[idx + 1];
}

/**
 * True if all prerequisites for a course are passed in the believer's profile.
 * For now, only Foundations has tracked completion (`profile.course.passed`).
 * Future courses will share the same per-course progress shape.
 */
export function meetsPrerequisites(
  course: TrackCourse,
  passedCourses: CourseId[]
): boolean {
  return course.prerequisites.every((p) => passedCourses.includes(p));
}
