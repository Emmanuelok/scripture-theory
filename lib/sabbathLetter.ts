import type { Profile, JournalEntry, ExamenEntry } from "@/lib/profile";
import { recurringThemes } from "@/lib/journalThemes";
import { COURSE_WEEKS } from "@/data/course";

/* ──────────────────────────────────────────────────────────────────
   sabbathLetter — Builds a weekly retrospective letter for the
   believer. Reads from everything the platform has captured in the
   last seven days and assembles it into a pastoral, second-person
   letter — not a dashboard.

   Pure on-device. No surveillance, no fabrication: if there's nothing
   to say, we say so.
────────────────────────────────────────────────────────────────── */

const WEEK_MS = 7 * 86_400_000;

export type LetterSection =
  | { kind: "walked"; lines: string[] }
  | { kind: "carried"; themes: { term: string; count: number }[] }
  | { kind: "warmed"; verses: { ref: string; level: string }[] }
  | { kind: "gratitudes"; texts: string[] }
  | { kind: "saidYes"; lines: string[] }
  | { kind: "saidNo"; lines: string[] }
  | { kind: "longing"; text: string };

export type WeeklyLetter = {
  weekStart: string;   // ISO date
  weekEnd: string;     // ISO date
  greeting: string;
  openingScripture: { ref: string; text: string };
  sections: LetterSection[];
  closing: string;
  closingScripture: { ref: string; text: string };
  isEmpty: boolean;
};

function inLastWeek(iso: string | undefined, now: Date): boolean {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return t >= now.getTime() - WEEK_MS && t <= now.getTime();
}

function fmtDateShort(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const KIND_VERB: Record<string, string> = {
  reflection: "reflected on",
  prayer: "brought prayer for",
  gratitude: "thanked Him for",
  confession: "confessed",
  lesson: "learned about",
  letter: "wrote to the Father about",
};

const MEMORY_LEVEL: Record<string, string> = {
  reading: "reading",
  "first-letters": "first letters",
  blanks: "fill the blanks",
  recited: "reciting",
  mastered: "mastered",
};

function pickRecentJournal(entries: JournalEntry[], now: Date, limit = 3): JournalEntry[] {
  return entries
    .filter((e) => inLastWeek(e.date, now))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

function pickRecentExamens(examens: ExamenEntry[], now: Date): ExamenEntry[] {
  return examens
    .filter((e) => inLastWeek(e.date, now))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function partOfDay(d: Date): "morning" | "afternoon" | "evening" {
  const h = d.getHours();
  if (h < 11) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

export function buildSabbathLetter(profile: Profile, now: Date = new Date()): WeeklyLetter {
  const weekAgo = new Date(now.getTime() - WEEK_MS);
  const name = (profile.name || profile.secretPlace?.alias || "").trim();
  const tone = partOfDay(now);
  const greeting = name
    ? `${tone === "morning" ? "Good Sabbath morning" : tone === "afternoon" ? "Peace this Sabbath afternoon" : "A quiet Sabbath evening"}, ${name}.`
    : `${tone === "morning" ? "Good Sabbath morning" : tone === "afternoon" ? "Peace this Sabbath afternoon" : "A quiet Sabbath evening"}, beloved.`;

  const sections: LetterSection[] = [];

  // 1. What you walked — concrete touch points
  const walked: string[] = [];

  // Foundations course
  const completedWeeksThisWeek = Object.entries(profile.course?.weekCompletedAt ?? {})
    .filter(([, iso]) => inLastWeek(iso, now))
    .map(([weekNum]) => Number(weekNum))
    .sort((a, b) => a - b);
  if (completedWeeksThisWeek.length > 0) {
    const weekTitles = completedWeeksThisWeek
      .map((n) => COURSE_WEEKS.find((w) => w.week === n))
      .filter((w): w is (typeof COURSE_WEEKS)[number] => !!w)
      .map((w) => `Week ${w.week} — ${w.title}`);
    walked.push(
      completedWeeksThisWeek.length === 1
        ? `You finished Foundations ${weekTitles[0]}.`
        : `You finished ${completedWeeksThisWeek.length} Foundations weeks: ${weekTitles.join("; ")}.`
    );
  }

  // Course days marked (no timestamp, only counts) — only mention if no week was completed
  const courseDaysThisWeek = Object.values(profile.course?.daysComplete ?? {})
    .reduce((sum, days) => sum + (days?.length ?? 0), 0);
  if (completedWeeksThisWeek.length === 0 && courseDaysThisWeek > 0) {
    // weak signal, skip
  }

  // Journal entries
  const recentJournal = pickRecentJournal(profile.secretPlace?.entries ?? [], now);
  if (recentJournal.length > 0) {
    if (recentJournal.length === 1) {
      const e = recentJournal[0];
      walked.push(`On ${fmtDateShort(e.date)}, you ${KIND_VERB[e.kind] ?? "wrote about"} ${e.title ? `"${e.title}"` : "what was on your heart"}.`);
    } else {
      const dates = recentJournal.map((e) => fmtDateShort(e.date)).join(", ");
      walked.push(`You wrote ${recentJournal.length} entries in your Secret Place this week (${dates}).`);
    }
  }

  // Prayers logged
  const prayersThisWeek = (profile.secretPlace?.prayers ?? []).filter((p) => inLastWeek(p.date, now));
  if (prayersThisWeek.length > 0) {
    walked.push(
      prayersThisWeek.length === 1
        ? `You brought a prayer: "${prayersThisWeek[0].title}".`
        : `You brought ${prayersThisWeek.length} prayers before the Father.`
    );
  }

  // Praying-for marks
  const stalePrayers = (profile.prayingFor ?? []).filter((p) =>
    (p.prayedAt ?? []).some((iso) => inLastWeek(iso, now))
  );
  if (stalePrayers.length > 0) {
    const names = stalePrayers.slice(0, 3).map((p) => p.name).join(", ");
    walked.push(
      stalePrayers.length === 1
        ? `You lifted up ${names} by name.`
        : `You lifted up ${stalePrayers.length} people by name${stalePrayers.length <= 3 ? ` — ${names}` : ""}.`
    );
  }

  // Examens
  const examens = pickRecentExamens(profile.examens ?? [], now);
  if (examens.length > 0) {
    walked.push(
      examens.length === 1
        ? `You closed one day with the Father in an examen.`
        : `You closed ${examens.length} days with the Father in an examen.`
    );
  }

  // Fasts
  const fastsStarted = (profile.fasts ?? []).filter((f) => inLastWeek(f.startedAt, now));
  const fastsEnded = (profile.fasts ?? []).filter((f) => inLastWeek(f.endedAt, now));
  if (fastsStarted.length > 0) {
    walked.push(`You began a fast — "${fastsStarted[0].focus}".`);
  }
  if (fastsEnded.length > 0 && !fastsEnded[0].broken) {
    walked.push(`You finished a fast you set before Him.`);
  }

  // Sermons
  const sermons = (profile.sermons ?? []).filter((s) => inLastWeek(s.date, now));
  if (sermons.length > 0) {
    walked.push(
      sermons.length === 1
        ? `You sat under the Word this week and took notes on ${sermons[0].passage ?? "a sermon"}.`
        : `You sat under the Word ${sermons.length} times and took notes.`
    );
  }

  // Healing intercession
  const healingTouches = (profile.healing ?? []).filter((h) =>
    (h.updates ?? []).some((u) => inLastWeek(u.at, now))
  );
  if (healingTouches.length > 0) {
    walked.push(
      `You stood in prayer for the sick — ${healingTouches[0].who}${healingTouches.length > 1 ? ` and ${healingTouches.length - 1} more` : ""}.`
    );
  }

  if (walked.length > 0) {
    sections.push({ kind: "walked", lines: walked });
  }

  // 2. What you carried — recurring themes in this week's journal
  const themes = recurringThemes(
    (profile.secretPlace?.entries ?? []).filter((e) => inLastWeek(e.date, now)),
    4
  );
  if (themes.length > 0) {
    sections.push({ kind: "carried", themes });
  }

  // 3. What stayed warm — memory verses practiced this week
  const warmMemory = (profile.memory ?? [])
    .filter((m) => inLastWeek(m.lastPracticedAt, now))
    .map((m) => ({ ref: m.verseId, level: MEMORY_LEVEL[m.level] ?? m.level }))
    .slice(0, 5);
  if (warmMemory.length > 0) {
    sections.push({ kind: "warmed", verses: warmMemory });
  }

  // 4. Gratitudes
  const grats = (profile.secretPlace?.gratitudes ?? [])
    .filter((g) => inLastWeek(g.date, now))
    .slice(0, 5)
    .map((g) => g.text);
  if (grats.length > 0) {
    sections.push({ kind: "gratitudes", texts: grats });
  }

  // 5. Where you said yes — gratitudes + encounters from examens
  const yes = examens
    .map((e) => e.encounter)
    .filter((s) => s && s.trim().length > 0)
    .slice(0, 3);
  if (yes.length > 0) {
    sections.push({ kind: "saidYes", lines: yes });
  }

  // 6. Where you said no — convictions
  const no = examens
    .map((e) => e.conviction)
    .filter((s) => s && s.trim().length > 0)
    .slice(0, 3);
  if (no.length > 0) {
    sections.push({ kind: "saidNo", lines: no });
  }

  // 7. Tomorrow's longing — most recent examen
  if (examens.length > 0 && examens[0].longing && examens[0].longing.trim().length > 0) {
    sections.push({ kind: "longing", text: examens[0].longing });
  }

  // Closing words depend on how full the week was
  const isEmpty = sections.length === 0;
  const closing = isEmpty
    ? "There is nothing here to read back — and that is its own honest word. A quiet week is not a wasted week. Some weeks the Father is teaching you in silence what He could not teach in noise. Begin again tomorrow with one small obedience. He has not moved."
    : sections.length <= 2
    ? "This was a smaller week. Smaller weeks are not lesser weeks. The Lord is not adding up your activity; He is forming your heart. What you did, you did before Him — and that is the only audience that matters."
    : "Read it slowly. This is what the week actually held, not what social feeds or to-do lists claimed it held. The Father saw every word, every prayer, every hidden act. Receive His good pleasure today and stop. Tomorrow can wait.";

  return {
    weekStart: weekAgo.toISOString(),
    weekEnd: now.toISOString(),
    greeting,
    openingScripture: {
      ref: "Hebrews 4:9–10",
      text: "There remains therefore a Sabbath rest for the people of God. For he who has entered into his rest has himself also rested from his works, as God did from his.",
    },
    sections,
    closing,
    closingScripture: {
      ref: "Psalm 23:2–3",
      text: "He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
    },
    isEmpty,
  };
}
