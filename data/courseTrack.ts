import { COURSE_WEEKS, COURSE_TITLE, COURSE_SUBTITLE, type CourseWeek } from "@/data/course";
import { STORY_WEEKS, STORY_TITLE, STORY_SUBTITLE } from "@/data/storyOfGod";
import { DISCIPLINES_WEEKS, DISCIPLINES_TITLE, DISCIPLINES_SUBTITLE } from "@/data/disciplines";
import { SERMON_WEEKS, SERMON_TITLE, SERMON_SUBTITLE } from "@/data/sermon";
import { MAKING_WEEKS, MAKING_TITLE, MAKING_SUBTITLE } from "@/data/makingDisciples";

/* ──────────────────────────────────────────────────────────────────
   Growth Tract — the path of courses the platform offers, each
   building on the last. Completion of an earlier course is the
   prerequisite for the next.

   Course 1: Foundations of the Faith (12 weeks)
   Course 2: The Story of God (12 weeks)
   Course 3+: Planned. The tract is meant to keep growing.
────────────────────────────────────────────────────────────────── */

export type CourseId = "foundations" | "story-of-god" | "disciplines" | "sermon" | "making";

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
  accent: "flame" | "blue" | "emerald" | "violet" | "amber";
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
  {
    id: "disciplines",
    slug: "disciplines",
    title: DISCIPLINES_TITLE,
    subtitle: DISCIPLINES_SUBTITLE,
    tagline:
      "Now that you know who God is and where the Story goes, learn how to live in this chapter. Twelve weeks through the historic disciplines — prayer, study, fasting, solitude, simplicity, service, submission, confession, Sabbath, worship, guidance, celebration. Each week walks you into the practice tool already built into Scripture Theory.",
    prerequisites: ["foundations", "story-of-god"],
    weeks: DISCIPLINES_WEEKS.length,
    data: DISCIPLINES_WEEKS,
    href: "/track/disciplines",
    accent: "emerald",
    status: "live",
  },
  {
    id: "sermon",
    slug: "sermon",
    title: SERMON_TITLE,
    subtitle: SERMON_SUBTITLE,
    tagline:
      "Slowly through Matthew 5–7 — Jesus's longest recorded sermon and the most demanding ethical teaching in human history. The Beatitudes, the antitheses, the Lord's Prayer, the warning about treasures and anxiety, love your enemies, the narrow gate, the two builders. The disciplines you have been walking are about to be cut deeper by the Teacher Himself.",
    prerequisites: ["foundations", "story-of-god", "disciplines"],
    weeks: SERMON_WEEKS.length,
    data: SERMON_WEEKS,
    href: "/track/sermon",
    accent: "violet",
    status: "live",
  },
  {
    id: "making",
    slug: "making",
    title: MAKING_TITLE,
    subtitle: MAKING_SUBTITLE,
    tagline:
      "Form yourself for forty-eight weeks, then form others. Twelve weeks on the Great Commission applied — your story, the gospel in plain words, praying for the lost, friendship before evangelism, listening, invitation, the first thirty days, into the Body, reproducing reproducers, the hard cases, and your part in the global mission. 2 Timothy 2:2 made concrete.",
    prerequisites: ["foundations", "story-of-god", "disciplines", "sermon"],
    weeks: MAKING_WEEKS.length,
    data: MAKING_WEEKS,
    href: "/track/making",
    accent: "amber",
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
