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

   ── Schema ──────────────────────────────────────────────────────
   Run this once in the Supabase SQL editor:

     create table if not exists sending_covenant (
       id          uuid primary key default gen_random_uuid(),
       first_name  text not null check (char_length(first_name) between 1 and 32),
       region      text not null check (char_length(region) between 1 and 64),
       prayer      text check (prayer is null or char_length(prayer) <= 280),
       said_yes_at timestamptz not null default now(),
       public      boolean not null default true,
       user_id     uuid,
       device_id   text
     );

     create index if not exists idx_sending_covenant_recent
       on sending_covenant (said_yes_at desc)
       where public = true;

     alter table sending_covenant enable row level security;

     -- Anyone can read public entries
     create policy "read public" on sending_covenant
       for select using (public = true);

     -- Anyone (anon or authed) can register a yes
     create policy "insert any" on sending_covenant
       for insert with check (true);

     -- Signed-in users can delete their own entry
     create policy "delete own (user)" on sending_covenant
       for delete using (auth.uid() = user_id);
────────────────────────────────────────────────────────────────── */

export type SendingYes = {
  id: string;
  first_name: string;
  region: string;
  prayer: string | null;
  said_yes_at: string;
  public: boolean;
};

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
    .select("id, first_name, region, prayer, said_yes_at, public")
    .eq("public", true)
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
    .select("id, first_name, region, prayer, said_yes_at, public")
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
    .select("id, first_name, region, prayer, said_yes_at, public")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.warn("[sending-cloud] my-yes error", error.message);
    return null;
  }
  return (data as SendingYes | null) ?? null;
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
