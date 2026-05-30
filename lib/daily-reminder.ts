"use client";

/* ──────────────────────────────────────────────────────────────────
   Daily rhythm — gentle reminders.

   What this delivers today:
     • An in-app reminder card on /today and the home page, fresh
       per UTC day, dismissible (dismissal scoped to the day).
     • Browser Notification opt-in: once the user grants permission,
       we fire one gentle notification per day the *first time* the
       user opens the site that day. No "wake you up at 7am" — that
       requires a push server (see comment below).

   What this does NOT deliver yet:
     • Cross-device push when the app is closed. That needs a push
       service (FCM / OneSignal / Web Push + a server endpoint). The
       SW is wired with notification capability so adding push later
       is a small change.

   localStorage keys (per-device, never synced):
     scripture-theory-reminder-last-fired  → YYYY-MM-DD of last fire
     scripture-theory-reminder-dismissed-* → per-day dismiss flag
     scripture-theory-reminder-prefs       → { browser: bool, sundayOnly: bool }
────────────────────────────────────────────────────────────────── */

import { localDayKey } from "@/lib/date-helpers";

const LAST_FIRED_KEY = "scripture-theory-reminder-last-fired";
const PREFS_KEY = "scripture-theory-reminder-prefs";
const DISMISS_PREFIX = "scripture-theory-reminder-dismissed-";

export type ReminderPrefs = {
  /** Did the user grant browser Notification permission via our opt-in? */
  browser: boolean;
  /** Only fire on Sundays (fellowship), not weekdays. */
  sundayOnly: boolean;
};

const DEFAULT_PREFS: ReminderPrefs = { browser: false, sundayOnly: false };

export function getPrefs(): ReminderPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw);
    return {
      browser: Boolean(parsed?.browser),
      sundayOnly: Boolean(parsed?.sundayOnly),
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function setPrefs(patch: Partial<ReminderPrefs>): ReminderPrefs {
  const next = { ...getPrefs(), ...patch };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    } catch {}
  }
  return next;
}

// This module is wall-clock-local throughout: Sunday detection and the
// liturgical hour band both read local time, so the day key must be local
// too — otherwise a dismissal set near UTC midnight is keyed to a different
// day than the band that produced it, and the card reappears or sticks.
export function todayKey(d: Date = new Date()): string {
  return localDayKey(d);
}

export function isSunday(d: Date = new Date()): boolean {
  return d.getDay() === 0;
}

/* ──────────────────────────────────────────────────────────────────
   Time of day — adapts the reminder to where you are in the day.

   Bands (user's LOCAL time):
     05:00–10:59  morning  → Morning Office, "begin the day"
     11:00–16:59  midday   → Midday Office, pause + persistence
     17:00–20:59  evening  → Evening Office, family altar / sermon notes
     21:00–04:59  night    → Night Office (Compline), Examen, rest

   We deliberately use the user's local time (not UTC) because liturgical
   hours are tied to wall-clock daylight, not a server clock.
────────────────────────────────────────────────────────────────── */

export type LiturgicalHour = "morning" | "midday" | "evening" | "night";

export function currentLiturgicalHour(d: Date = new Date()): LiturgicalHour {
  const h = d.getHours(); // local time on the user's device
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "midday";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

/** Dismissals are scoped to the (day, hour-band) pair so dismissing the
 *  morning card still lets the midday card appear when the band changes. */
function dismissKey(d: Date): string {
  return `${todayKey(d)}-${currentLiturgicalHour(d)}`;
}

export function wasDismissedToday(d: Date = new Date()): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(DISMISS_PREFIX + dismissKey(d)) === "1";
  } catch {
    return false;
  }
}

export function dismissToday(d: Date = new Date()): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISMISS_PREFIX + dismissKey(d), "1");
    cleanupOldDismissals();
  } catch {}
}

/** Remove dismissal flags older than 14 days so localStorage doesn't grow. */
function cleanupOldDismissals(): void {
  if (typeof window === "undefined") return;
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k?.startsWith(DISMISS_PREFIX)) keys.push(k);
    }
    if (keys.length <= 56) return; // 14 days × 4 bands
    const cutoff = new Date();
    cutoff.setUTCDate(cutoff.getUTCDate() - 14);
    const cutoffKey = todayKey(cutoff);
    for (const k of keys) {
      const dayPart = k.slice(DISMISS_PREFIX.length, DISMISS_PREFIX.length + 10);
      if (dayPart && dayPart < cutoffKey) window.localStorage.removeItem(k);
    }
  } catch {}
}

export function getLastFired(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LAST_FIRED_KEY);
  } catch {
    return null;
  }
}

function setLastFired(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_FIRED_KEY, key);
  } catch {}
}

/* ──────────────────────────────────────────────────────────────────
   Pastoral copy — the heart of this module.
────────────────────────────────────────────────────────────────── */

export type ReminderKind =
  | "sunday-morning"
  | "sunday-midday"
  | "sunday-evening"
  | "sunday-night"
  | "weekday-morning"
  | "weekday-midday"
  | "weekday-evening"
  | "weekday-night";

export type ReminderContent = {
  kind: ReminderKind;
  /** Coarser tag for styling — Sunday cards get warmer treatment. */
  shape: "sunday" | "weekday";
  hour: LiturgicalHour;
  eyebrow: string;
  title: string;
  body: string;
  scripture: { ref: string; text: string };
  ctas: { href: string; label: string }[];
};

export function todaysReminder(d: Date = new Date()): ReminderContent {
  const sun = isSunday(d);
  const hour = currentLiturgicalHour(d);
  const shape = sun ? "sunday" : "weekday";
  const kind = `${shape}-${hour}` as ReminderKind;

  // Sunday — fellowship-shaped through the day
  if (sun && hour === "morning") {
    return {
      kind, shape, hour,
      eyebrow: "The Lord's Day · morning",
      title: "Today, gather with the Body.",
      body:
        "A meal, a song, a prayer, a sermon — together. Even one believer counts; online counts; in-person counts most. The Lord shaped His Church to be local, named, and known.",
      scripture: {
        ref: "Hebrews 10:24-25",
        text: "Let us consider how to stir one another up to love and good works, not neglecting to meet together.",
      },
      ctas: [
        { href: "/connect", label: "Find a church near you →" },
        { href: "/hours", label: "Pray the morning office" },
        { href: "/sabbath", label: "Sabbath rhythm" },
      ],
    };
  }
  if (sun && hour === "midday") {
    return {
      kind, shape, hour,
      eyebrow: "The Lord's Day · midday",
      title: "Pause before the table.",
      body:
        "A short, quiet pause — between the gathering and the rest of the day. Bring one line of the morning's word back to mind. Let Him meet you a second time.",
      scripture: {
        ref: "Psalm 90:14",
        text: "Satisfy us in the morning with Your steadfast love, that we may rejoice and be glad all our days.",
      },
      ctas: [
        { href: "/hours", label: "Midday office (3 min)" },
        { href: "/sermons", label: "Notes from today's sermon" },
      ],
    };
  }
  if (sun && hour === "evening") {
    return {
      kind, shape, hour,
      eyebrow: "The Lord's Day · evening",
      title: "Carry the gathering home.",
      body:
        "A family meal. A song around a table. A page of the Word read aloud. Sundays end where they began — in worship made domestic, lived in our houses.",
      scripture: {
        ref: "Deuteronomy 6:6-7",
        text: "These words shall be on your heart… you shall talk of them when you sit in your house, and when you walk by the way.",
      },
      ctas: [
        { href: "/family", label: "Family altar tonight →" },
        { href: "/hours", label: "Evening office" },
      ],
    };
  }
  if (sun && hour === "night") {
    return {
      kind, shape, hour,
      eyebrow: "The Lord's Day · night",
      title: "Lay the day down.",
      body:
        "Let the week begin with rest — not collapse, but Sabbath rest. The Lord built the seventh day for you; let it close in His presence.",
      scripture: {
        ref: "Psalm 4:8",
        text: "In peace I will both lie down and sleep; for You alone, O Lord, make me dwell in safety.",
      },
      ctas: [
        { href: "/hours", label: "Compline (Night office)" },
        { href: "/examen", label: "Five-minute Examen" },
      ],
    };
  }

  // Weekday — four-practices rhythm through the day
  if (hour === "morning") {
    return {
      kind, shape, hour,
      eyebrow: "Begin the day with Him",
      title: "Four small practices.",
      body:
        "Meditate on one verse. Read a chapter. Write one line in your journal. Pray for one person by name. Five minutes each is enough — the Lord asks for the heart, not the hour.",
      scripture: {
        ref: "Lamentations 3:22-23",
        text: "His mercies are new every morning; great is Your faithfulness.",
      },
      ctas: [
        { href: "/hours", label: "Morning office (5 min) →" },
        { href: "/today", label: "Today's chapter" },
        { href: "/secret-place", label: "Open the Secret Place" },
        { href: "/me#names", label: "Pray for the names you carry" },
      ],
    };
  }
  if (hour === "midday") {
    return {
      kind, shape, hour,
      eyebrow: "Midday · pause",
      title: "One verse. One breath.",
      body:
        "The day is half done — He is not done with you. Take three minutes. Pray the Midday office. Carry today's nation before Him before the afternoon swallows you.",
      scripture: {
        ref: "Psalm 55:17",
        text: "Evening and morning and at noon I utter my complaint and moan, and He hears my voice.",
      },
      ctas: [
        { href: "/hours", label: "Midday office (3 min) →" },
        { href: "/pray/nations", label: "Today's nation" },
      ],
    };
  }
  if (hour === "evening") {
    return {
      kind, shape, hour,
      eyebrow: "Evening · gather",
      title: "Tell the day to one another.",
      body:
        "A family altar tonight, or a simple two minutes with whoever is at your table — read one chapter, pray one prayer, name one mercy of the day. Faith stays alive in the telling.",
      scripture: {
        ref: "Psalm 141:2",
        text: "Let my prayer be counted as incense before You, and the lifting up of my hands as the evening sacrifice.",
      },
      ctas: [
        { href: "/family", label: "Family altar tonight →" },
        { href: "/hours", label: "Evening office" },
        { href: "/me#names", label: "Pray once more for one name" },
      ],
    };
  }

  // Night
  return {
    kind, shape, hour,
    eyebrow: "Night · review",
    title: "Lay the day down with Him.",
    body:
      "Five quiet minutes before sleep. Thank Him for one mercy. Notice one moment He was near. Repent of one thing. Ask for one grace tomorrow.",
    scripture: {
      ref: "Psalm 4:8",
      text: "In peace I will both lie down and sleep; for You alone, O Lord, make me dwell in safety.",
    },
    ctas: [
      { href: "/examen", label: "Examen (5 min) →" },
      { href: "/hours", label: "Compline (Night office)" },
    ],
  };
}

/* ──────────────────────────────────────────────────────────────────
   Browser notifications — best-effort, fires once per day on first visit
────────────────────────────────────────────────────────────────── */

export type NotifyState =
  | "unsupported"
  | "denied"
  | "default" // not yet asked
  | "granted";

export function notifyState(): NotifyState {
  if (typeof window === "undefined") return "unsupported";
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
}

export async function requestNotify(): Promise<NotifyState> {
  if (notifyState() === "unsupported") return "unsupported";
  if (Notification.permission === "granted") return "granted";
  try {
    const res = await Notification.requestPermission();
    return res as NotifyState;
  } catch {
    return "denied";
  }
}

/**
 * Fire today's gentle reminder via the Notification API if all of:
 *   • the user has granted permission and our opt-in is true
 *   • we haven't already fired today
 *   • the reminder respects sundayOnly preference
 *
 * Safe to call on every page mount — it's idempotent for the day.
 */
export function maybeFireDailyNotification(d: Date = new Date()): boolean {
  if (typeof window === "undefined") return false;
  const prefs = getPrefs();
  if (!prefs.browser) return false;
  if (notifyState() !== "granted") return false;
  if (prefs.sundayOnly && !isSunday(d)) return false;

  const key = todayKey(d);
  if (getLastFired() === key) return false;

  const reminder = todaysReminder(d);
  try {
    const n = new Notification(reminder.title, {
      body: reminder.body,
      icon: "/icon.svg",
      tag: `scripture-theory-${reminder.kind}-${key}`,
      requireInteraction: false,
      silent: false,
    });
    n.onclick = () => {
      window.focus();
      window.location.href = reminder.ctas[0]?.href ?? "/today";
      n.close();
    };
    setLastFired(key);
    return true;
  } catch {
    return false;
  }
}
