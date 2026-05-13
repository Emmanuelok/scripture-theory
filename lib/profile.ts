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

export type Profile = {
  stage?: DiscipleStage;
  locale?: LocaleCode;
  need?: DailyNeed;
  startedAt?: string;
  prayingFor?: PrayingForRecord[];
  memory?: MemoryRecord[];
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
