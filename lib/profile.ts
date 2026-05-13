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

export type Profile = {
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
};

const STORAGE = "scripture-theory-profile";
const LOCALE_STORAGE = "scripture-theory-locale";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE);
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

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE, JSON.stringify(profile));
    if (profile.locale) {
      window.localStorage.setItem(LOCALE_STORAGE, profile.locale);
    }
  } catch {}
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setMounted(true);
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
        window.localStorage.removeItem(STORAGE);
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
