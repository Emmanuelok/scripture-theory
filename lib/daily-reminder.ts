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

export function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function isSunday(d: Date = new Date()): boolean {
  return d.getDay() === 0;
}

export function wasDismissedToday(d: Date = new Date()): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(DISMISS_PREFIX + todayKey(d)) === "1";
  } catch {
    return false;
  }
}

export function dismissToday(d: Date = new Date()): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISMISS_PREFIX + todayKey(d), "1");
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
    if (keys.length <= 14) return;
    const cutoff = new Date();
    cutoff.setUTCDate(cutoff.getUTCDate() - 14);
    const cutoffKey = todayKey(cutoff);
    for (const k of keys) {
      const day = k.slice(DISMISS_PREFIX.length);
      if (day < cutoffKey) window.localStorage.removeItem(k);
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

export type ReminderContent = {
  kind: "sunday" | "weekday";
  eyebrow: string;
  title: string;
  body: string;
  scripture: { ref: string; text: string };
  ctas: { href: string; label: string }[];
};

export function todaysReminder(d: Date = new Date()): ReminderContent {
  if (isSunday(d)) {
    return {
      kind: "sunday",
      eyebrow: "Today · the Lord's Day",
      title: "Gather with the Body.",
      body:
        "Don't carry the faith alone. A meal, a song, a prayer, a sermon — together. Even one believer counts; online counts; in-person counts most. The Lord shaped His Church to be local, named, and known.",
      scripture: {
        ref: "Hebrews 10:24-25",
        text: "Let us consider how to stir one another up to love and good works, not neglecting to meet together.",
      },
      ctas: [
        { href: "/connect", label: "Find a church near you →" },
        { href: "/sabbath", label: "Sabbath rhythm →" },
        { href: "/hours", label: "Pray the Sunday office" },
      ],
    };
  }

  return {
    kind: "weekday",
    eyebrow: "Begin the day with Him",
    title: "Four small practices.",
    body:
      "Meditate on one verse. Read a chapter. Write one line in your journal. Pray for one person by name. Five minutes each is enough — the Lord asks for the heart, not the hour.",
    scripture: {
      ref: "Lamentations 3:22-23",
      text: "His mercies are new every morning; great is Your faithfulness.",
    },
    ctas: [
      { href: "/today", label: "Today's chapter & devotional →" },
      { href: "/hours", label: "Morning office (5 min)" },
      { href: "/secret-place", label: "Open the Secret Place" },
      { href: "/me#names", label: "Pray for the names you carry" },
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
