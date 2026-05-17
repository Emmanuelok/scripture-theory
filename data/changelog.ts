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
    date: "2026-05-25",
    title: "Course 6 · Knowing God + Vocation section",
    body:
      "Two additions. (1) Course 6 — Knowing God — twelve weeks slowly through God's revealed character (holy, love, sovereign, wise, merciful, just, unchanging, faithful, present, knowing, good, glorious). The course you walk for a lifetime. The growth tract is now 72 weeks deep. (2) A new Vocation section at /vocation, with pastoral guidance for believers weighing formal study — prospective, full-time enrolled, bivocational, and postgraduate. No directory; a framework for discernment, plus curated outbound links to ATS, ABHE, and other trustworthy bodies.",
    links: [
      { label: "Knowing God", href: "/track/knowing" },
      { label: "Vocation", href: "/vocation" },
      { label: "Should I go to seminary?", href: "/vocation/seminary" },
    ],
  },
  {
    date: "2026-05-24",
    title: "Course 5 · Making Disciples — the tract turns outward",
    body:
      "After 48 weeks forming the believer inwardly, Course 5 turns them outward. Twelve weeks on the Great Commission applied — your story, the gospel in plain words, praying for the lost, friendship before evangelism, listening, invitation, the first thirty days, into the Body, reproducing reproducers (2 Timothy 2:2), the hard cases (Monica praying for Augustine), and your part in the global mission. The growth tract is now 60 weeks deep. Prerequisites: Foundations, Story of God, Disciplines, Sermon on the Mount.",
    links: [
      { label: "Making Disciples", href: "/track/making" },
      { label: "The growth tract", href: "/track" },
    ],
  },
  {
    date: "2026-05-23",
    title: "Cross-course polish · search, memory, /me progress",
    body:
      "Three quiet wins that make the existing 48 weeks more useful. Every week of every course in the growth tract — not just Foundations — is now indexed in global search. All 48 course memory verses are surfaced in the memory trainer, so the believer can keep them warm alongside the catalog. /me carries a new growth-tract progress card showing where you are across every course at a glance.",
    links: [
      { label: "Search", href: "/search" },
      { label: "Memory trainer", href: "/memory" },
      { label: "Your walk", href: "/me" },
    ],
  },
  {
    date: "2026-05-22",
    title: "Course 4 · The Sermon on the Mount",
    body:
      "Twelve weeks slowly through Matthew 5–7 — Jesus's longest recorded sermon. The Beatitudes, salt and light, the Law fulfilled, anger, lust, oaths, love of enemies, hidden almsgiving and prayer and fasting, treasures and anxiety, judging and asking, the narrow gate, the two builders. The growth tract is now 48 weeks deep. Prerequisites: Foundations, Story of God, Disciplines.",
    links: [
      { label: "The Sermon on the Mount", href: "/track/sermon" },
      { label: "The growth tract", href: "/track" },
    ],
  },
  {
    date: "2026-05-21",
    title: "Course 3 · Disciplines of the Faith",
    body:
      "The growth tract grows. Course 3 is now live — twelve weeks through the historic spiritual disciplines: prayer, study, fasting, solitude, simplicity, service, submission, confession, Sabbath, worship, guidance, celebration. Each week walks you into the practice tool already built into Scripture Theory (/secret-place, /fast, /examen, /sabbath, /hours), turning the course into a guided tour of the disciplines and the platform at once. Prerequisites: Foundations and The Story of God.",
    links: [
      { label: "Disciplines of the Faith", href: "/track/disciplines" },
      { label: "The growth tract", href: "/track" },
    ],
  },
  {
    date: "2026-05-20",
    title: "Course 2 · closed the arc — exam, certificate, workbook",
    body:
      "The Story of God now finishes the way Foundations does. A 24-question final exam draws two questions from each week. Pass at 80% to earn a printable, name-your-own certificate. The complete twelve-week workbook is print-ready for offline reading or group facilitation.",
    links: [
      { label: "Final exam", href: "/track/story-of-god/exam" },
      { label: "Certificate", href: "/track/story-of-god/certificate" },
      { label: "Workbook", href: "/track/story-of-god/workbook" },
    ],
  },
  {
    date: "2026-05-19",
    title: "The growth tract — Course 2: The Story of God",
    body:
      "Foundations of the Faith was always meant as a doorway, not a destination. The new growth tract at /track keeps walking deeper after Foundations is complete. Course 2 — The Story of God — is now live: twelve weeks through Scripture's one big story (Creation, Fall, Israel, Christ, the Church, the New Creation). Each future course will build on the one before. The tract will keep growing.",
    links: [
      { label: "The growth tract", href: "/track" },
      { label: "Course 2 · The Story of God", href: "/track/story-of-god" },
    ],
  },
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
