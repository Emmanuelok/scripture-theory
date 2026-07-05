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
  "path",
  "course",
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
 * Identity of a record inside each syncable array collection. Different
 * collections key on different fields — memory on `verseId`, nations on
 * `iso`, family-altar on date+dayId — so a naive `id`-only merge would
 * DROP every record that has no `id` (silent data loss). Each entry here
 * returns a stable identity so cross-device union merges never lose or
 * duplicate a believer's records.
 */
const COLLECTION_IDENTITY: Partial<Record<SyncableKey, (r: unknown) => string | undefined>> = {
  prayingFor: (r) => (r as { id?: string }).id,
  memory: (r) => (r as { verseId?: string }).verseId,
  disciples: (r) => (r as { id?: string }).id,
  fasts: (r) => (r as { id?: string }).id,
  examens: (r) => (r as { id?: string }).id,
  forgiveness: (r) => (r as { id?: string }).id,
  listening: (r) => (r as { id?: string }).id,
  sermons: (r) => (r as { id?: string }).id,
  fruit: (r) => (r as { id?: string }).id,
  healing: (r) => (r as { id?: string }).id,
  calling: (r) => (r as { id?: string }).id,
  nationsPrayed: (r) => (r as { iso?: string }).iso,
  familyAltar: (r) => {
    const f = r as { date?: string; dayId?: string };
    return f.date != null && f.dayId != null ? `${f.date}::${f.dayId}` : undefined;
  },
};

/**
 * Merge a cloud profile into a local one.
 * The local profile wins for scalar keys it has set; the cloud fills gaps.
 * Array-of-record collections are UNION-merged by each collection's
 * identity field (local overrides cloud on collision) so that records
 * created on one device are never wiped by a leaner blob from another.
 */
export function mergeProfiles(local: Profile, cloud: Partial<Profile>): Profile {
  const out: Profile = { ...cloud, ...local };

  for (const key of Object.keys(COLLECTION_IDENTITY) as SyncableKey[]) {
    const identity = COLLECTION_IDENTITY[key]!;
    const a = (local[key] as unknown as unknown[] | undefined) ?? [];
    const b = (cloud[key] as unknown as unknown[] | undefined) ?? [];
    if (a.length === 0 && b.length === 0) continue;
    const byId = new Map<string, unknown>();
    const extras: unknown[] = []; // records without a resolvable identity — keep, never drop
    for (const r of b) {
      const id = r != null ? identity(r) : undefined;
      if (id != null) byId.set(id, r);
      else if (r != null) extras.push(r);
    }
    for (const r of a) {
      const id = r != null ? identity(r) : undefined;
      if (id != null) byId.set(id, r); // local overrides cloud
      else if (r != null) extras.push(r);
    }
    // @ts-expect-error — key is keyof Profile
    out[key] = [...byId.values(), ...extras];
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
