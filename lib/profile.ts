"use client";

import { useEffect, useState } from "react";
import type { LocaleCode } from "@/data/gospel-i18n";

export type DiscipleStage = "seeker" | "new" | "growing" | "leader" | "pastor";
export type DailyNeed = "meet" | "word" | "pray" | "belong" | "today";

export type PrayingForRecord = {
  id: string;
  name: string;
  note?: string;
  addedAt: string;
  prayedAt: string[];
  sharedAt?: string;
  /**
   * Posture toward this name. Absent / "walking-with" means active
   * intercession; "rejoicing-in" means the Lord has met them — we
   * change from petition to thanksgiving but the name stays.
   */
  status?: "walking-with" | "rejoicing-in";
  metJesusAt?: string;
};

export type MemoryLevel = "reading" | "first-letters" | "blanks" | "recited" | "mastered";

export type MemoryRecord = {
  verseId: string;
  startedAt: string;
  lastPracticedAt?: string;
  attempts: number;
  level: MemoryLevel;
};

export type NationPrayed = {
  iso: string;
  date: string; // YYYY-MM-DD
};

export type JourneyStage =
  | "outside"        // not yet a believer — we're praying
  | "conversation"   // spiritual conversation happening
  | "studying"       // reading the Bible / discussing together
  | "responded"      // they said yes to Jesus
  | "baptized"       // publicly confessed faith
  | "community"      // committed to a local church
  | "reproducing";   // now discipling someone else

export type JourneyEventType =
  | "prayed_for"
  | "shared_gospel"
  | "conversation"
  | "studied_scripture"
  | "discipleship_meeting"
  | "responded"
  | "baptized"
  | "joined_community"
  | "began_discipling";

export type JourneyEvent = {
  id: string;
  type: JourneyEventType;
  date: string; // ISO datetime
  note?: string;
};

export type DiscipleRecord = {
  id: string;
  name: string;
  city?: string;
  notes?: string;
  startedAt: string;
  stage: JourneyStage;
  events: JourneyEvent[];
};

// ─── Secret Place — Matthew 6:6 ────────────────────────────────
// A private, contemplative space. Lives only on this device. Never synced.

export type Season =
  | "waiting"
  | "wrestling"
  | "growing"
  | "grieving"
  | "joyful"
  | "called"
  | "restoring"
  | "resting"
  | "listening"
  | "surrendering";

export type JournalKind =
  | "reflection"
  | "prayer"
  | "gratitude"
  | "confession"
  | "lesson"
  | "letter";

export type JournalEntry = {
  id: string;
  kind: JournalKind;
  title?: string;
  body: string;
  scriptureRef?: string;
  date: string; // ISO
};

export type SecretPrayer = {
  id: string;
  title: string;
  body?: string;
  date: string;
  status: "active" | "answered" | "released";
  answeredAt?: string;
  answerNote?: string;
};

export type Gratitude = {
  id: string;
  text: string;
  date: string;
};

export type SecretPlaceState = {
  alias?: string;
  season?: Season;
  anchorVerse?: string;
  anchorRef?: string;
  setupComplete?: boolean;
  startedAt?: string;
  entries?: JournalEntry[];
  prayers?: SecretPrayer[];
  gratitudes?: Gratitude[];
};

// ─── Fasting ───────────────────────────────────────────────────
export type FastType = "full" | "partial" | "daniel" | "media" | "sundown" | "one-meal" | "custom";

export type Fast = {
  id: string;
  type: FastType;
  label?: string;
  focus: string; // what you're seeking the Lord about
  startedAt: string;
  endsAt?: string; // planned end
  endedAt?: string; // actual end
  broken?: boolean;
  notes?: string;
};

// ─── Daily Examen ──────────────────────────────────────────────
export type ExamenEntry = {
  id: string;
  date: string; // ISO
  gratitude: string;   // where God was good
  encounter: string;   // where you sensed Him
  conviction: string;  // what needs repentance
  longing: string;     // tomorrow's prayer
};

// ─── Forgiveness walk ──────────────────────────────────────────
export type ForgivenessRecord = {
  id: string;
  who: string;     // person (can be initials)
  wound: string;   // what they did
  feelings?: string;
  releasedAt?: string;
  notes?: string;
  createdAt: string;
};

// ─── Rule of Life ──────────────────────────────────────────────
export type RuleDiscipline =
  | "scripture" | "prayer" | "silence" | "sabbath" | "fasting"
  | "worship" | "community" | "generosity" | "service" | "confession" | "witness";

export type RuleOfLife = {
  daily: RuleDiscipline[];
  weekly: RuleDiscipline[];
  monthly: RuleDiscipline[];
  startedAt?: string;
  /** ISO date strings of completion, keyed per discipline */
  log?: Record<string, string[]>;
};

// ─── Listening Prayer (hearing God) ────────────────────────────
export type ListeningEntry = {
  id: string;
  date: string;
  question?: string;    // what you brought
  scriptureRef?: string;
  heard: string;        // what you sensed
  tested?: string;      // testing against Scripture
};

// ─── Family Altar ──────────────────────────────────────────────
export type FamilyAltarLog = {
  date: string; // YYYY-MM-DD
  ageGroup: string;
  dayId: string;
};

// ─── Sermon notes ─────────────────────────────────────────────
export type SermonNote = {
  id: string;
  date: string;            // ISO
  preacher?: string;
  church?: string;
  passage?: string;
  title?: string;
  bigIdea?: string;
  outline?: string;
  questions?: string;      // questions you want to study
  application?: string;
  prayer?: string;
};

// ─── Spiritual gifts result ──────────────────────────────────
export type GiftId =
  | "prophecy" | "serving" | "teaching" | "exhortation" | "giving" | "leadership" | "mercy"
  | "wisdom" | "knowledge" | "faith" | "healing" | "miracles" | "discernment" | "tongues" | "interpretation"
  | "apostleship" | "evangelism" | "shepherding" | "hospitality" | "administration";

export type GiftsResult = {
  takenAt: string;
  responses: Record<string, number>; // statementId -> 0..4
  top: GiftId[];                     // top 3-5 gifts by score
};

// ─── Fruit of the Spirit check ───────────────────────────────
export type FruitFacet =
  | "love" | "joy" | "peace" | "patience" | "kindness"
  | "goodness" | "faithfulness" | "gentleness" | "self-control";

export type FruitCheck = {
  id: string;
  date: string;
  scores: Record<FruitFacet, number>; // 1..5
  notes?: string;
};

// ─── Healing prayer / James 5 ────────────────────────────────
export type HealingRequest = {
  id: string;
  who: string;        // name or initials (can be self)
  forWhat: string;
  startedAt: string;
  status: "praying" | "improving" | "answered" | "released";
  updates?: { at: string; note: string }[];
};

// ─── Marriage rhythm ─────────────────────────────────────────
export type MarriageState = {
  partnerName?: string;
  anniversary?: string;   // YYYY-MM-DD
  beganAt?: string;
  daysLogged?: string[];  // YYYY-MM-DD
  intentions?: string[];  // freeform vows / intentions
};

// ─── Parenting rhythm ────────────────────────────────────────
export type Child = {
  id: string;
  name: string;
  ageOrBirth?: string;
  prayerFocus?: string;
};

export type ParentingState = {
  children?: Child[];
  beganAt?: string;
  daysLogged?: string[];
};

// ─── Sabbath plan ────────────────────────────────────────────
export type SabbathPlan = {
  day?: "fri-sat" | "sat-sun" | "sun" | "custom";
  startsAt?: string;       // HH:MM
  endsAt?: string;
  rhythms?: string[];      // chosen rest practices
  abstain?: string[];      // things stopped
  customNotes?: string;
  weeksKept?: string[];    // YYYY-WW
};

// ─── Calling discernment ─────────────────────────────────────
export type CallingNote = {
  id: string;
  date: string;
  step:
    | "love"            // what you love
    | "wired"           // how you're wired
    | "world"           // the world's need you see
    | "word"            // Scriptures that have spoken
    | "wise"            // wise believers' counsel
    | "yes"             // what you sense He's saying
    | "next";           // next obedient step
  body: string;
};

// ─── The Path — discipleship progression ─────────────────────
export type PathStageNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type PathEventType =
  | "completed"
  | "uncompleted"
  | "pastor_request"
  | "pastor_confirmed";

export type PathEvent = {
  id: string;
  type: PathEventType;
  stage: PathStageNum;
  at: string;
  note?: string;
};

export type PathProgress = {
  /** Stages the believer has marked complete. */
  completed?: PathStageNum[];
  /** ISO date each stage was completed. */
  completedAt?: Partial<Record<PathStageNum, string>>;
  /** Pastor-confirmed stages (stages 3 & 7 typically). */
  pastorConfirmed?: PathStageNum[];
  /** Free-form note per stage. */
  notes?: Partial<Record<PathStageNum, string>>;
  /** Append-only event log. */
  events?: PathEvent[];
};

export type Profile = {
  name?: string;
  stage?: DiscipleStage;
  locale?: LocaleCode;
  need?: DailyNeed;
  startedAt?: string;
  prayingFor?: PrayingForRecord[];
  memory?: MemoryRecord[];
  nationsPrayed?: NationPrayed[];
  adoptedNationIso?: string;
  disciples?: DiscipleRecord[];
  secretPlace?: SecretPlaceState;
  fasts?: Fast[];
  examens?: ExamenEntry[];
  forgiveness?: ForgivenessRecord[];
  rule?: RuleOfLife;
  listening?: ListeningEntry[];
  familyAltar?: FamilyAltarLog[];
  sermons?: SermonNote[];
  gifts?: GiftsResult;
  fruit?: FruitCheck[];
  healing?: HealingRequest[];
  marriage?: MarriageState;
  parenting?: ParentingState;
  sabbath?: SabbathPlan;
  calling?: CallingNote[];
  catechismProgress?: number[]; // Heidelberg Lord's Day completed (1..52)
  path?: PathProgress;
  course?: CourseProgress;
  /** Additional courses keyed by id (e.g. "story-of-god"). Foundations remains under `course` for backward compat. */
  courses?: Partial<Record<string, CourseProgress>>;
  lastActivity?: LastActivity;
};

export type LastActivity = {
  type: string;
  href: string;
  label: string;
  sublabel?: string;
  at: string; // ISO timestamp
};

// ─── Foundations of the Faith — course progress ───────────────
export type CourseProgress = {
  /** Weeks completed (1..12). A week is complete when its quiz is passed. */
  weeksComplete?: number[];
  /** Best score per week (raw correct out of the week's quiz length). */
  quizScores?: Partial<Record<number, number>>;
  /** ISO date a week was first marked complete. */
  weekCompletedAt?: Partial<Record<number, string>>;
  /** Per-day completion within a week: week -> [day numbers]. */
  daysComplete?: Partial<Record<number, number[]>>;
  /** Saved in-progress quiz answers per week, so a refresh doesn't wipe them. */
  quizDrafts?: Partial<Record<number, (number | null)[]>>;
  /** Final-exam best score (correct out of 24). */
  examScore?: number;
  /** Whether the believer has passed the final exam. */
  passed?: boolean;
  /** Date the certificate was issued (ISO). */
  certifiedAt?: string;
  /** Name printed on the certificate. */
  certifiedName?: string;
};

import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";

const PROFILE_BASE = "scripture-theory-profile";
const LOCALE_STORAGE = "scripture-theory-locale";

function profileKey() {
  return slotKey(PROFILE_BASE);
}

export function loadProfile(): Profile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(profileKey());
    const profile = raw ? (JSON.parse(raw) as Profile) : {};
    if (!profile.locale) {
      const sharedLocale = window.localStorage.getItem(LOCALE_STORAGE) as LocaleCode | null;
      if (sharedLocale) profile.locale = sharedLocale;
    }
    return profile;
  } catch {
    return {};
  }
}

export const PROFILE_CHANGE_EVENT = "scripture-theory:profile-change";

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(profileKey(), JSON.stringify(profile));
    if (profile.locale) {
      window.localStorage.setItem(LOCALE_STORAGE, profile.locale);
    }
    window.dispatchEvent(
      new CustomEvent<Profile>(PROFILE_CHANGE_EVENT, { detail: profile })
    );
  } catch {}
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setMounted(true);
    if (typeof window === "undefined") return;
    const onProfile = (e: Event) => {
      const detail = (e as CustomEvent<Profile>).detail;
      if (detail) setProfile(detail);
    };
    const onSlot = () => setProfile(loadProfile());
    // Cross-tab liveness: the `storage` event only fires in OTHER tabs,
    // so two open tabs (e.g. /me and /today) stay in step when either writes.
    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key.startsWith(PROFILE_BASE)) setProfile(loadProfile());
    };
    window.addEventListener(PROFILE_CHANGE_EVENT, onProfile);
    window.addEventListener(SLOT_CHANGE_EVENT, onSlot);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(PROFILE_CHANGE_EVENT, onProfile);
      window.removeEventListener(SLOT_CHANGE_EVENT, onSlot);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function update(patch: Partial<Profile>) {
    const next = { ...profile, ...patch };
    setProfile(next);
    saveProfile(next);
  }

  function reset() {
    setProfile({});
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(profileKey());
        window.dispatchEvent(new CustomEvent<Profile>(PROFILE_CHANGE_EVENT, { detail: {} }));
      } catch {}
    }
  }

  return { profile, update, reset, mounted };
}

export const stageInfo: Record<
  DiscipleStage,
  { label: string; tagline: string; firstStep: string; route: string }
> = {
  seeker: {
    label: "I haven't met Him yet",
    tagline: "Welcome. The most important Person you will ever meet is one click away.",
    firstStep: "Read the Gospel",
    route: "/gospel",
  },
  new: {
    label: "I just said yes recently",
    tagline:
      "Welcome to the family. The first weeks matter. We'll walk with you, gently, every day.",
    firstStep: "Begin John in 30 Days",
    route: "/read",
  },
  growing: {
    label: "I'm growing with Him",
    tagline: "Then let's keep going — Word, prayer, witness, and a real local body.",
    firstStep: "Open today's reading",
    route: "/today",
  },
  leader: {
    label: "I disciple others",
    tagline: "We exist to serve under your work. Here's what we can hand you.",
    firstStep: "Open The Path",
    route: "/disciple",
  },
  pastor: {
    label: "I shepherd a local church",
    tagline:
      "We exist under, not over, your work. Claim your church so we can introduce newcomers to you.",
    firstStep: "Claim your church",
    route: "/connect/claim",
  },
};
