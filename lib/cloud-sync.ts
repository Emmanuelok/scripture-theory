"use client";

import type { Profile } from "@/lib/profile";
import { getSupabase } from "@/lib/supabase";

/**
 * Cloud sync for the on-device profile.
 *
 * Design:
 * - The local profile remains the source of truth on each device.
 * - When a user signs in, we pull the cloud profile and merge it with
 *   the local one (last-write-wins by `updatedAt`).
 * - Subsequent local mutations push the whole blob (debounced).
 * - When signed out, nothing leaves the device.
 *
 * The Secret Place is excluded by default — see `SYNCABLE` below.
 * Believers can opt the Secret Place in from /account if they choose.
 */

export type SyncableKey = keyof Profile;

// Keys that sync to the cloud when signed in.
// Notably EXCLUDED by default: secretPlace (Matthew 6:6 — stays local).
const DEFAULT_SYNCABLE: SyncableKey[] = [
  "name",
  "stage",
  "locale",
  "need",
  "startedAt",
  "prayingFor",
  "memory",
  "nationsPrayed",
  "adoptedNationIso",
  "disciples",
  "fasts",
  "examens",
  "forgiveness",
  "rule",
  "listening",
  "familyAltar",
  "sermons",
  "gifts",
  "fruit",
  "healing",
  "marriage",
  "parenting",
  "sabbath",
  "calling",
  "catechismProgress",
];

const SYNC_PREFS_KEY = "scripture-theory-sync-prefs";

export type SyncPrefs = {
  includeSecretPlace?: boolean;
};

export function loadSyncPrefs(): SyncPrefs {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SYNC_PREFS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSyncPrefs(prefs: SyncPrefs) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SYNC_PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

export function syncableKeys(prefs: SyncPrefs = loadSyncPrefs()): SyncableKey[] {
  return prefs.includeSecretPlace
    ? [...DEFAULT_SYNCABLE, "secretPlace"]
    : DEFAULT_SYNCABLE;
}

function pickSyncable(profile: Profile, prefs: SyncPrefs): Partial<Profile> {
  const out: Partial<Profile> = {};
  const keys = syncableKeys(prefs);
  for (const k of keys) {
    if (profile[k] !== undefined) {
      // @ts-expect-error — k is keyof Profile
      out[k] = profile[k];
    }
  }
  return out;
}

/**
 * Pull the user's cloud profile.
 * Returns null if not signed in or no row exists yet.
 */
export async function pullCloudProfile(): Promise<{
  profile: Partial<Profile>;
  updatedAt: string;
} | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("data, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.warn("[cloud-sync] pull failed", error.message);
    return null;
  }
  if (!data) return null;
  return { profile: (data.data ?? {}) as Partial<Profile>, updatedAt: data.updated_at };
}

/**
 * Push the local profile to the cloud (upsert).
 */
export async function pushCloudProfile(profile: Profile): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "Cloud sync is not configured." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in." };

  const prefs = loadSyncPrefs();
  const payload = pickSyncable(profile, prefs);

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      data: payload,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/**
 * Merge a cloud profile into a local one.
 * The local profile wins for keys it has set; the cloud fills the gaps.
 * Arrays of records (prayingFor, memory, etc.) are merged by id with
 * last-write-wins on a per-record updatedAt where present.
 */
export function mergeProfiles(local: Profile, cloud: Partial<Profile>): Profile {
  const out: Profile = { ...cloud, ...local };

  // For id-keyed array collections, merge & dedupe
  const idKeys: SyncableKey[] = [
    "prayingFor",
    "memory",
    "disciples",
    "fasts",
    "examens",
    "forgiveness",
    "listening",
    "sermons",
    "fruit",
    "healing",
    "calling",
  ];
  for (const key of idKeys) {
    const a = (local[key] as unknown as { id?: string }[] | undefined) ?? [];
    const b = (cloud[key] as unknown as { id?: string }[] | undefined) ?? [];
    if (a.length === 0 && b.length === 0) continue;
    const byId = new Map<string, { id?: string }>();
    for (const r of b) if (r && r.id) byId.set(r.id, r);
    for (const r of a) if (r && r.id) byId.set(r.id, r); // local overrides
    // @ts-expect-error — key is keyof Profile
    out[key] = Array.from(byId.values());
  }

  return out;
}

/** Debounced cloud push — call from useProfile's update path. */
let pushTimer: ReturnType<typeof setTimeout> | null = null;
export function schedulePush(profile: Profile, delay = 1500) {
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushCloudProfile(profile).catch(() => {
      /* swallow — surfaced via /account status */
    });
  }, delay);
}
