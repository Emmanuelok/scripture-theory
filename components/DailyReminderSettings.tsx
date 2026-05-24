"use client";

import { useEffect, useState } from "react";
import {
  getPrefs,
  notifyState,
  requestNotify,
  setPrefs,
  type NotifyState,
} from "@/lib/daily-reminder";

/**
 * Browser notification opt-in for the daily rhythm reminder.
 *
 * Honest framing: we fire ONE notification per day the first time you
 * open the site (or have a tab open at midnight). We don't promise
 * "ping at 7am" — that requires a push server we don't run.
 */
export default function DailyReminderSettings() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<NotifyState>("unsupported");
  const [browserEnabled, setBrowserEnabled] = useState(false);
  const [sundayOnly, setSundayOnly] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setState(notifyState());
    const p = getPrefs();
    setBrowserEnabled(p.browser);
    setSundayOnly(p.sundayOnly);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">
        Loading…
      </div>
    );
  }

  async function enable() {
    setBusy(true);
    setMessage(null);
    try {
      const next = await requestNotify();
      setState(next);
      if (next === "granted") {
        setBrowserEnabled(true);
        setPrefs({ browser: true });
        setMessage("Granted — you'll see one gentle reminder per day on your first visit.");
      } else if (next === "denied") {
        setMessage(
          "Permission denied. To re-enable, allow notifications for this site in your browser's site settings.",
        );
      } else if (next === "unsupported") {
        setMessage("Your browser doesn't support notifications.");
      }
    } finally {
      setBusy(false);
    }
  }

  function disable() {
    setBrowserEnabled(false);
    setPrefs({ browser: false });
    setMessage("Stopped sending browser reminders. The in-app card still shows on visits.");
  }

  function toggleSundayOnly(v: boolean) {
    setSundayOnly(v);
    setPrefs({ sundayOnly: v });
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
      <div className="text-xs uppercase tracking-widest text-flame-700">Gentle reminders</div>
      <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
        A nudge to keep the rhythm.
      </h2>
      <p className="mt-3 text-sm text-ink-700 leading-relaxed max-w-2xl">
        On weekdays we surface four small practices — meditate, read, journal, pray.
        On Sundays we lift up the call to gather with the Body. The reminder always
        shows as a card when you visit. If you grant notification permission, we&apos;ll
        also fire one gentle browser notification the first time you open the site
        each day.
      </p>

      <ul className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
        <li className="rounded-2xl border border-ink-200 bg-card-subtle p-3">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">In-app card</div>
          <div className="text-ink-800 mt-0.5">Always on. Dismissible per day.</div>
        </li>
        <li className="rounded-2xl border border-ink-200 bg-card-subtle p-3">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Browser notification</div>
          <div className="text-ink-800 mt-0.5">
            {state === "granted" && browserEnabled
              ? "On · once per day on your first visit"
              : state === "granted"
                ? "Permitted but paused"
                : state === "denied"
                  ? "Blocked by your browser"
                  : state === "unsupported"
                    ? "Not supported by this browser"
                    : "Not yet enabled"}
          </div>
        </li>
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {state === "granted" && browserEnabled ? (
          <button
            onClick={disable}
            className="rounded-full border border-ink-300 text-ink-800 bg-card px-4 py-2 text-sm hover:border-ink-900"
          >
            Stop browser reminders
          </button>
        ) : state !== "denied" && state !== "unsupported" ? (
          <button
            onClick={enable}
            disabled={busy}
            className="rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700 disabled:opacity-60"
          >
            {busy ? "Asking…" : "Enable browser reminders"}
          </button>
        ) : null}

        <label className="flex items-center gap-2 text-sm text-ink-800 ml-2">
          <input
            type="checkbox"
            checked={sundayOnly}
            onChange={(e) => toggleSundayOnly(e.target.checked)}
            className="accent-flame-600"
          />
          Only on Sundays (fellowship reminder)
        </label>
      </div>

      {message && (
        <p className="mt-4 rounded-2xl border border-ink-200 bg-card-subtle p-3 text-xs text-ink-700">
          {message}
        </p>
      )}

      <details className="mt-5 text-xs text-ink-600 leading-relaxed">
        <summary className="cursor-pointer text-ink-800 font-medium">
          Why don&apos;t I get a notification at 7am sharp?
        </summary>
        <p className="mt-2 max-w-2xl">
          To send a notification at a specific time when the site isn&apos;t open, a
          platform needs a push server. We deliberately don&apos;t run one — fewer
          servers means less to fail and less to fund. What we do instead: when you
          open the site, you see the reminder card immediately, and (if you&apos;ve
          opted in) a browser notification fires the very first time you open us
          each day. For a daily wake-up nudge, your phone&apos;s built-in clock is
          still the best tool.
        </p>
      </details>
    </div>
  );
}
