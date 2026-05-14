"use client";

import { useEffect } from "react";
import { loadProfile, saveProfile, type LastActivity } from "@/lib/profile";

/**
 * Record what the believer is doing right now, so /me and the home page
 * can offer a one-tap "resume where you left off".
 *
 * Stays on-device. Only the most recent activity is kept.
 *
 * Recording is debounced via a 600ms idle window so route-fast-switching
 * doesn't churn the profile.
 */

let pending: ReturnType<typeof setTimeout> | null = null;

export function recordActivity(a: Omit<LastActivity, "at">) {
  if (typeof window === "undefined") return;
  if (pending) clearTimeout(pending);
  pending = setTimeout(() => {
    pending = null;
    try {
      const profile = loadProfile();
      const next: LastActivity = { ...a, at: new Date().toISOString() };
      // Avoid redundant writes if nothing meaningful changed
      const prev = profile.lastActivity;
      if (
        prev &&
        prev.type === next.type &&
        prev.href === next.href &&
        prev.label === next.label
      ) {
        // Refresh `at` only — still useful for ordering
        saveProfile({ ...profile, lastActivity: { ...prev, at: next.at } });
        return;
      }
      saveProfile({ ...profile, lastActivity: next });
    } catch {
      /* ignore */
    }
  }, 600);
}

/** Hook to record activity once a component mounts (and on key prop changes). */
export function useRecordActivity(
  a: Omit<LastActivity, "at"> | null | undefined,
  deps: ReadonlyArray<unknown> = []
) {
  useEffect(() => {
    if (!a) return;
    recordActivity(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
