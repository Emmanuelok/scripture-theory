"use client";

/* ──────────────────────────────────────────────────────────────────
   The personal context engine.

   Synthesizes everything the believer has kept on this device into
   one quiet, human summary — name, days walking, the people they
   carry, the nations they've prayed for, today's milestone if today
   IS one, and a verse chosen for where they are.

   Covenant constraints honoured:
     • Pure functions over the on-device Profile. Nothing fetched,
       nothing sent, nothing inferred beyond what the believer
       chose to record. No AI — the "verse for you" is a curated
       editorial table keyed by stage/need, rotated by day.
────────────────────────────────────────────────────────────────── */

import type { Profile, DiscipleStage, DailyNeed } from "@/lib/profile";
import { dayOfYearUTC, localDayKey } from "@/lib/date-helpers";

export type Milestone = {
  id: string;
  title: string;
  sub: string;
};

export type PersonalVerse = { ref: string; text: string };

export type PersonalContext = {
  firstName: string | null;
  /** Whole days since profile.startedAt; null when unknown. */
  daysWalking: number | null;
  /** People currently carried in active prayer. */
  carryingCount: number;
  /** People moved to "rejoicing in" — the Lord met them. */
  rejoicingCount: number;
  /** Distinct days a nation was prayed for. */
  nationDays: number;
  /** True if the believer prayed for a nation today. */
  prayedNationToday: boolean;
  /** A milestone if (and only if) today is one. */
  milestone: Milestone | null;
  /** One human line that tells their story back to them. */
  storyLine: string | null;
  verse: PersonalVerse;
};

/* Curated verses per stage/need — public-domain WEB. */
const STAGE_VERSES: Record<DiscipleStage, PersonalVerse[]> = {
  seeker: [
    { ref: "Jeremiah 29:13", text: "You shall seek me, and find me, when you search for me with all your heart." },
    { ref: "John 6:37", text: "Him who comes to me I will in no way throw out." },
    { ref: "Acts 17:27", text: "He is not far from each one of us." },
  ],
  new: [
    { ref: "2 Corinthians 5:17", text: "If anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new." },
    { ref: "1 Peter 2:2", text: "As newborn babies, long for the pure milk of the Word, that with it you may grow." },
    { ref: "Philippians 1:6", text: "He who began a good work in you will complete it until the day of Jesus Christ." },
  ],
  growing: [
    { ref: "Colossians 2:6-7", text: "As therefore you received Christ Jesus the Lord, walk in him, rooted and built up in him, and established in the faith." },
    { ref: "Psalm 1:3", text: "He will be like a tree planted by the streams of water, that produces its fruit in its season." },
    { ref: "Hosea 6:3", text: "Let's acknowledge Yahweh. Let's press on to know Yahweh." },
  ],
  leader: [
    { ref: "2 Timothy 2:2", text: "The things which you have heard from me… commit the same things to faithful men who will be able to teach others also." },
    { ref: "1 Peter 5:2-3", text: "Shepherd the flock of God which is among you… not as lording it over those entrusted to you, but making yourselves examples to the flock." },
    { ref: "Galatians 6:9", text: "Let's not be weary in doing good, for we will reap in due season if we don't give up." },
  ],
  pastor: [
    { ref: "Isaiah 40:11", text: "He will feed his flock like a shepherd. He will gather the lambs in his arm, and carry them in his bosom." },
    { ref: "Acts 20:28", text: "Take heed… to all the flock, in which the Holy Spirit has made you overseers." },
    { ref: "John 21:17", text: "Feed my sheep." },
  ],
};

const NEED_VERSES: Partial<Record<DailyNeed, PersonalVerse[]>> = {
  meet: [
    { ref: "Revelation 3:20", text: "Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will come in to him." },
  ],
  pray: [
    { ref: "Psalm 65:2", text: "You who hear prayer, to you all men will come." },
  ],
  belong: [
    { ref: "Psalm 68:6", text: "God sets the lonely in families." },
  ],
};

const FALLBACK_VERSES: PersonalVerse[] = [
  { ref: "Lamentations 3:22-23", text: "His compassions don't fail. They are new every morning. Great is your faithfulness." },
  { ref: "Psalm 23:1", text: "Yahweh is my shepherd; I shall lack nothing." },
  { ref: "John 15:9", text: "As the Father has loved me, I also have loved you. Remain in my love." },
];

/** Deterministic per-day pick from the believer's stage/need pools. */
export function verseFor(profile: Profile, now: Date): PersonalVerse {
  const pool: PersonalVerse[] = [
    ...(profile.stage ? STAGE_VERSES[profile.stage] : []),
    ...((profile.need && NEED_VERSES[profile.need]) || []),
  ];
  const list = pool.length > 0 ? pool : FALLBACK_VERSES;
  return list[dayOfYearUTC(now) % list.length];
}

/** Days walking — milestone table. Only fires on the exact day. */
const DAY_MILESTONES: Record<number, { title: string; sub: string }> = {
  7: { title: "One week walking with us.", sub: "Seven days. The rhythm is forming — keep it small and keep it daily." },
  30: { title: "Thirty days.", sub: "A month of showing up. The Lord honours the unseen faithfulness (Matthew 6:6)." },
  40: { title: "Forty days.", sub: "A biblical season — the wilderness number. You've walked one." },
  100: { title: "A hundred days.", sub: "Most resolutions die in February. Grace doesn't. Still here." },
  365: { title: "One year.", sub: "Through every season — He was faithful in all of them (Lamentations 3:23)." },
  1000: { title: "A thousand days.", sub: "Better is one day in His courts than a thousand elsewhere — and you brought Him a thousand (Psalm 84:10)." },
};

function wholeDaysSince(iso: string | undefined, now: Date): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((now.getTime() - t) / 86_400_000));
}

export function getPersonalContext(profile: Profile, now: Date): PersonalContext {
  const firstName = profile.name?.trim().split(/\s+/)[0] || null;
  const daysWalking = wholeDaysSince(profile.startedAt, now);

  const praying = profile.prayingFor ?? [];
  const carryingCount = praying.filter((p) => p.status !== "rejoicing-in").length;
  const rejoicingCount = praying.filter((p) => p.status === "rejoicing-in").length;

  const nationRecords = profile.nationsPrayed ?? [];
  const nationDays = new Set(nationRecords.map((r) => r.date)).size;
  const today = localDayKey(now);
  const prayedNationToday = nationRecords.some((r) => r.date === today);

  // Milestone — exact-day only, never nagging about missed ones
  let milestone: Milestone | null = null;
  if (daysWalking !== null && DAY_MILESTONES[daysWalking]) {
    const m = DAY_MILESTONES[daysWalking];
    milestone = { id: `days-${daysWalking}`, ...m };
  } else if (rejoicingCount > 0) {
    // A "met the Lord" marked today outranks day-count milestones
    const metToday = praying.find(
      (p) => p.status === "rejoicing-in" && p.metJesusAt?.slice(0, 10) === now.toISOString().slice(0, 10),
    );
    if (metToday) {
      milestone = {
        id: `met-${metToday.id}`,
        title: `${metToday.name} met the Lord.`,
        sub: "There is joy in the presence of the angels of God over one sinner who repents (Luke 15:10).",
      };
    }
  }

  // One human line — pick the 2–3 strongest facts, never a wall of stats
  const facts: string[] = [];
  if (daysWalking !== null && daysWalking > 0) facts.push(`day ${daysWalking + 1} of your walk here`);
  if (carryingCount > 0)
    facts.push(carryingCount === 1 ? "one name on your heart" : `${carryingCount} names on your heart`);
  if (rejoicingCount > 0)
    facts.push(rejoicingCount === 1 ? "one answered with joy" : `${rejoicingCount} answered with joy`);
  if (nationDays > 2) facts.push(`${nationDays} days praying for the nations`);
  const storyLine = facts.length > 0 ? facts.slice(0, 3).join(" · ") : null;

  return {
    firstName,
    daysWalking,
    carryingCount,
    rejoicingCount,
    nationDays,
    prayedNationToday,
    milestone,
    storyLine,
    verse: verseFor(profile, now),
  };
}

export function greetingFor(now: Date, firstName: string | null): string {
  const h = now.getHours();
  const base = h < 5 ? "Peace to you" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  return firstName ? `${base}, ${firstName}.` : `${base}.`;
}
