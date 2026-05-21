"use client";

import { getSupabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────
   Project 1M · the Cloud of Witnesses

   A registry of believers who have prayed the Acts 1:8 yes. Not a
   leaderboard, not a counter to show off — a "great cloud of witnesses"
   (Hebrews 12:1) whose visible "yes" emboldens others to say theirs.

   Editorial guardrails:
   - First name + country / region only. No last names. No emails. No
     personal details that could expose someone in a hostile jurisdiction.
   - Optional one-line prayer — never required.
   - The aggregate count is the headline; the wall of recent yeses is
     the encouragement.
   - All functions degrade to no-op / empty when Supabase isn't
     configured (the page still reads as a vision statement).

   Schema: see supabase/migrations/0007_sending_covenant.sql
   Depends on: supabase/migrations/0005_prayer_admin.sql (admin_emails + is_admin)
────────────────────────────────────────────────────────────────── */

export type SendingYes = {
  id: string;
  first_name: string;
  region: string;
  prayer: string | null;
  said_yes_at: string;
  public: boolean;
  /** Self-reported souls this evangelist is praying for / walking with. */
  souls_walking_with: number;
  /** How many times the Body has lifted this believer up in prayer. */
  prayed_for_count: number;
};

const SOULS_MAX = 10_000;
const PRAYED_FOR_KEY = "scripture-theory-sending-prayed-for";

const TABLE = "sending_covenant";
const LOCAL_ID_KEY = "scripture-theory-sending-yes-id";
const LOCAL_DEVICE_KEY = "scripture-theory-sending-device";

/* ──────────────────────────────────────────────────────────────────
   Local-side helpers — remember this device's own yes so the page
   can show "You said yes on [date]" without sign-in.
────────────────────────────────────────────────────────────────── */

export function getLocalYesId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(LOCAL_ID_KEY);
  } catch {
    return null;
  }
}

export function setLocalYesId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_ID_KEY, id);
  } catch {}
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(LOCAL_DEVICE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      window.localStorage.setItem(LOCAL_DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

/* ──────────────────────────────────────────────────────────────────
   Validation
────────────────────────────────────────────────────────────────── */

const NAME_MAX = 32;
const REGION_MAX = 64;
const PRAYER_MAX = 280;

export function validateYes(input: {
  firstName: string;
  region: string;
  prayer?: string;
}): { ok: boolean; error?: string } {
  const fn = input.firstName.trim();
  const rg = input.region.trim();
  const pr = (input.prayer ?? "").trim();
  if (fn.length < 1) return { ok: false, error: "First name is required." };
  if (fn.length > NAME_MAX) return { ok: false, error: `First name max ${NAME_MAX} characters.` };
  if (rg.length < 1) return { ok: false, error: "Country or region is required." };
  if (rg.length > REGION_MAX) return { ok: false, error: `Region max ${REGION_MAX} characters.` };
  if (pr.length > PRAYER_MAX) return { ok: false, error: `Prayer max ${PRAYER_MAX} characters.` };
  return { ok: true };
}

/* ──────────────────────────────────────────────────────────────────
   Supabase calls
────────────────────────────────────────────────────────────────── */

export function isCloudConfigured(): boolean {
  return getSupabase() !== null;
}

/** Total count of yeses (public + private — the headline). */
export async function getYesCount(): Promise<number> {
  const sb = getSupabase();
  if (!sb) return 0;
  const { count, error } = await sb
    .from(TABLE)
    .select("*", { count: "exact", head: true });
  if (error) {
    console.warn("[sending-cloud] count error", error.message);
    return 0;
  }
  return count ?? 0;
}

/** Recent public entries for the wall (first-name + region only). */
export async function listCloud(limit = 60): Promise<SendingYes[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from(TABLE)
    .select("id, first_name, region, prayer, said_yes_at, public, souls_walking_with, prayed_for_count")
    .eq("public", true)
    .eq("hidden", false)
    .order("said_yes_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.warn("[sending-cloud] list error", error.message);
    return [];
  }
  return (data ?? []) as SendingYes[];
}

/** Register a yes. Returns the new row, or null on failure. */
export async function sayYes(input: {
  firstName: string;
  region: string;
  prayer?: string;
  isPublic?: boolean;
}): Promise<SendingYes | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const v = validateYes(input);
  if (!v.ok) return null;

  const row = {
    first_name: input.firstName.trim(),
    region: input.region.trim(),
    prayer: (input.prayer ?? "").trim() || null,
    public: input.isPublic ?? true,
    device_id: getOrCreateDeviceId() || null,
  };

  const { data, error } = await sb
    .from(TABLE)
    .insert(row)
    .select("id, first_name, region, prayer, said_yes_at, public, souls_walking_with, prayed_for_count")
    .single();
  if (error) {
    console.warn("[sending-cloud] insert error", error.message);
    return null;
  }
  if (data) setLocalYesId(data.id);
  return data as SendingYes;
}

/** Look up this device's own entry by the local id we stored. */
export async function getMyYes(): Promise<SendingYes | null> {
  const sb = getSupabase();
  const id = getLocalYesId();
  if (!sb || !id) return null;
  const { data, error } = await sb
    .from(TABLE)
    .select("id, first_name, region, prayer, said_yes_at, public, souls_walking_with, prayed_for_count")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.warn("[sending-cloud] my-yes error", error.message);
    return null;
  }
  return (data as SendingYes | null) ?? null;
}

/**
 * Aggregate of souls being walked with — summed across all evangelists.
 * This is the harvest count; if 1M evangelists each walk with one soul,
 * the prayer of Project 1M is answered.
 */
export async function getTotalSouls(): Promise<number> {
  const sb = getSupabase();
  if (!sb) return 0;
  // We can't easily sum via the JS client without RPC, so fetch in pages.
  // For now, ask Postgres for sum via a small RPC alternative: pull all
  // rows' souls_walking_with via select sum.
  const { data, error } = await sb
    .from(TABLE)
    .select("souls_walking_with");
  if (error) {
    console.warn("[sending-cloud] sum souls error", error.message);
    return 0;
  }
  return (data ?? []).reduce(
    (n: number, row: { souls_walking_with?: number | null }) => n + (row.souls_walking_with ?? 0),
    0,
  );
}

/**
 * Update the calling device's own souls count. Bounded 0..SOULS_MAX.
 * Matched by device_id so a believer can adjust their own count from
 * the same device without signing in.
 */
export async function updateMySouls(n: number): Promise<SendingYes | null> {
  const sb = getSupabase();
  const id = getLocalYesId();
  const device = getOrCreateDeviceId();
  if (!sb || !id || !device) return null;
  const clamped = Math.max(0, Math.min(SOULS_MAX, Math.floor(n)));
  const { data, error } = await sb
    .from(TABLE)
    .update({ souls_walking_with: clamped })
    .eq("id", id)
    .eq("device_id", device)
    .select("id, first_name, region, prayer, said_yes_at, public, souls_walking_with, prayed_for_count")
    .maybeSingle();
  if (error) {
    console.warn("[sending-cloud] update souls error", error.message);
    return null;
  }
  return (data as SendingYes | null) ?? null;
}

/* ──────────────────────────────────────────────────────────────────
   The Wall of Yeses — letting the Body lift up new evangelists in prayer.
────────────────────────────────────────────────────────────────── */

/** localStorage-tracked set of yes IDs this device has prayed for. */
export function getLocalPrayedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(PRAYED_FOR_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function addLocalPrayed(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const cur = getLocalPrayedSet();
    cur.add(id);
    window.localStorage.setItem(PRAYED_FOR_KEY, JSON.stringify(Array.from(cur)));
  } catch {}
}

/**
 * Lift up one yes in prayer. Atomic server-side increment via the
 * pray_for_yes() RPC; local dedup so the same device cannot click
 * twice on the same person. Returns the new prayed_for_count.
 */
export async function prayForYes(yesId: string): Promise<{ ok: boolean; count?: number; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  if (getLocalPrayedSet().has(yesId)) {
    return { ok: false, error: "Already prayed for this brother / sister." };
  }
  const { data, error } = await sb.rpc("pray_for_yes", { yes_id: yesId });
  if (error) return { ok: false, error: error.message };
  addLocalPrayed(yesId);
  return { ok: true, count: typeof data === "number" ? data : undefined };
}

/** Number of days since said_yes_at — used to highlight new yeses. */
export function daysSince(iso: string): number {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return Number.POSITIVE_INFINITY;
  const ms = Date.now() - then;
  return Math.max(0, Math.floor(ms / 86_400_000));
}

/** Pretty short label like "2,341" with thousands separator. */
export function formatYesCount(n: number): string {
  return n.toLocaleString();
}

/** Percent of the 1M prayer (capped at 100). */
export function percentOfMillion(n: number): number {
  const p = (n / 1_000_000) * 100;
  if (!Number.isFinite(p)) return 0;
  return Math.max(0, Math.min(100, p));
}

/* ──────────────────────────────────────────────────────────────────
   Admin helpers — Wall moderation.

   Gated by is_admin() RLS on the server (defined in migration 0005
   schema). Non-admins calling these will just see empty results /
   "permission denied" errors from Supabase.
────────────────────────────────────────────────────────────────── */

export type AdminYes = SendingYes & {
  hidden: boolean;
  flagged_reason: string | null;
  device_id: string | null;
};

export type YesFilter = "visible" | "hidden";

export async function listYesesForAdmin(filter: YesFilter, limit = 200): Promise<AdminYes[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from(TABLE)
    .select(
      "id, first_name, region, prayer, said_yes_at, public, souls_walking_with, prayed_for_count, hidden, flagged_reason, device_id",
    )
    .eq("hidden", filter === "hidden")
    .order("said_yes_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.warn("[sending-cloud] admin list error", error.message);
    return [];
  }
  return (data ?? []) as AdminYes[];
}

export async function setYesHidden(
  id: string,
  hidden: boolean,
  reason?: string,
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud not configured." };
  const patch: { hidden: boolean; flagged_reason?: string | null } = { hidden };
  if (hidden) {
    patch.flagged_reason = (reason ?? "").trim().slice(0, 280) || null;
  } else {
    patch.flagged_reason = null;
  }
  const { error } = await sb.from(TABLE).update(patch).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * Hard-delete a yes. Reserved for clear abuse / safety cases — most
 * removals should use hide instead so the audit trail survives.
 */
export async function deleteYesAsAdmin(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud not configured." };
  const { error } = await sb.from(TABLE).delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
