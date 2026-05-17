/**
 * Scripture Theory changelog — a believer-facing record of what is
 * new, written in plain English. Entries are dated; the platform
 * compares the latest entry's date against the device's last-seen
 * marker to know whether to surface a quiet "what's new" nudge.
 *
 * Add new entries at the TOP of the list.
 */

export type ChangelogEntry = {
  date: string;       // YYYY-MM-DD
  title: string;
  body: string;
  links?: { label: string; href: string }[];
};

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-05-18",
    title: "Cohorts — walk Foundations together",
    body:
      "Foundations was built to be walked by five to eight believers together. Create a cohort, share the six-letter code, and your group walks the twelve weeks side by side. Each week's progress publishes to the cohort grid; one shared prayer thread carries the group. Personal Secret Place, journal, and notes still live only on this device.",
    links: [
      { label: "Cohorts", href: "/cohort" },
      { label: "Lead a cohort well", href: "/course/lead" },
    ],
  },
  {
    date: "2026-05-17",
    title: "The Sabbath letter",
    body:
      "A weekly retrospective that reads your week back to you as a letter — quietly assembled on this device from your journal, prayers, Foundations weeks, examens, fasts, sermons, healing intercession, and the verses you've been hiding in your heart. Not a dashboard. A letter.",
    links: [
      { label: "Open this week's letter", href: "/sabbath/letter" },
    ],
  },
  {
    date: "2026-05-16",
    title: "Reading plan certificates",
    body:
      "When you finish John in 30 Days, the Psalms in 30, the Sermon on the Mount in 7, or the NT in 90, a certificate is now waiting. Print it, save it, give it to whoever walked it with you.",
    links: [{ label: "Reading plans", href: "/read" }],
  },
  {
    date: "2026-05-15",
    title: "Today's liturgical day",
    body:
      "The /today header now shows today's feast or season — Advent, Lent, Easter, Pentecost, every saint — in place of the old Language tile. The Church's calendar, lived along with you.",
  },
  {
    date: "2026-05-14",
    title: "Theme-aware journal, pace-aware course, quiet momentum",
    body:
      "As you write a journal entry, past entries with overlapping themes quietly surface ('You've been here before — around father, work, return'). The Foundations course softens its nudge when you've drifted and points you deeper when you're racing. /me carries a 14-day momentum strip — no streaks, no shame.",
    links: [
      { label: "Open Secret Place", href: "/secret-place" },
      { label: "Your walk", href: "/me" },
    ],
  },
  {
    date: "2026-05-13",
    title: "Spaced-repetition memory · auto-resume · auto-mark-done",
    body:
      "Memory verses now schedule themselves for review (1d → 2d → 5d → 30d). /me carries a 'resume where you left off' card. Foundations course days check themselves off after you've actually sat with them.",
    links: [{ label: "Memory trainer", href: "/memory" }],
  },
  {
    date: "2026-05-12",
    title: "Foundations · sticky TOC · share cards · annual recall",
    body:
      "Every Foundations week has a sticky table of contents now. Completed weeks have a shareable card with the memory verse. A year after finishing the course, the platform quietly invites you to walk it again — a second pass deepens what's already there.",
    links: [{ label: "Foundations of the Faith", href: "/course" }],
  },
  {
    date: "2026-05-11",
    title: "Foundations of the Faith — 12-week course",
    body:
      "A complete, ecumenical 12-week course for new believers and any believer who wants the foundations again. Each week: anchor scripture, 7-day reading, long-form lesson, voices from across the centuries, multi-tradition voices on contested questions, an 8-question quiz, and a journal prompt. Final exam earns a certificate.",
    links: [
      { label: "Begin Foundations", href: "/course" },
      { label: "Lead a cohort", href: "/course/lead" },
    ],
  },
];

export function latestChangelogDate(): string {
  return CHANGELOG[0]?.date ?? "";
}
