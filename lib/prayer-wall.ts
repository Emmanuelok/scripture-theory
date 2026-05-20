"use client";

import { getSupabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────
   Prayer Wall — two-way intercession across the global Body.

   One believer posts a short request. Any signed-in believer can pray
   for it. The counter is unique-intercessors (no inflation). All
   functions are null-safe when Supabase isn't configured.
────────────────────────────────────────────────────────────────── */

export type PrayerRequest = {
  id: string;
  user_id: string | null;
  alias: string | null;
  body: string;
  language: string;
  status: "open" | "answered" | "hidden";
  prayer_count: number;
  flagged_count: number;
  created_at: string;
  updated_at: string;
};

export type PrayerIntercession = {
  id: string;
  request_id: string;
  intercessor_user_id: string;
  prayed_at: string;
};

const MAX_BODY = 600;
const MIN_BODY = 5;

export function validateBody(body: string): { ok: boolean; error?: string } {
  const t = body.trim();
  if (t.length < MIN_BODY) return { ok: false, error: `At least ${MIN_BODY} characters.` };
  if (t.length > MAX_BODY) return { ok: false, error: `At most ${MAX_BODY} characters.` };
  return { ok: true };
}

export type ListOpts = {
  limit?: number;
  language?: string;
  status?: "open" | "answered";
};

/** Public-facing feed (anyone can read). */
export async function listRequests(opts: ListOpts = {}): Promise<PrayerRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  let q = sb
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(opts.limit ?? 50);
  q = q.eq("status", opts.status ?? "open");
  if (opts.language) q = q.eq("language", opts.language);
  const { data, error } = await q;
  if (error || !data) return [];
  return data as PrayerRequest[];
}

/** Posts I have submitted. */
export async function listMyRequests(): Promise<PrayerRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return [];
  const { data, error } = await sb
    .from("prayer_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as PrayerRequest[];
}

/** Requests I have interceded for. */
export async function listMyIntercessions(): Promise<{ request: PrayerRequest; prayedAt: string }[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return [];

  const { data: rows, error } = await sb
    .from("prayer_intercessions")
    .select("prayed_at, request_id, prayer_requests(*)")
    .eq("intercessor_user_id", user.id)
    .order("prayed_at", { ascending: false })
    .limit(100);
  if (error || !rows) return [];

  return rows
    .filter((r) => (r as unknown as { prayer_requests: PrayerRequest | null }).prayer_requests)
    .map((r) => {
      const typed = r as unknown as { prayed_at: string; prayer_requests: PrayerRequest };
      return { request: typed.prayer_requests, prayedAt: typed.prayed_at };
    });
}

export type SubmitInput = {
  body: string;
  alias?: string;
  language?: string;
  /** When true, user_id is set to NULL so the request truly is anonymous. */
  anonymous?: boolean;
};

export async function submitRequest(
  input: SubmitInput
): Promise<{ ok: boolean; request?: PrayerRequest; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, error: "Sign in first." };

  const v = validateBody(input.body);
  if (!v.ok) return { ok: false, error: v.error };

  const row = {
    user_id: input.anonymous ? null : user.id,
    alias: input.alias?.trim() || null,
    body: input.body.trim(),
    language: (input.language || "en").slice(0, 8),
  };

  const { data, error } = await sb
    .from("prayer_requests")
    .insert(row)
    .select("*")
    .single();
  if (error || !data) return { ok: false, error: error?.message ?? "Submit failed." };
  return { ok: true, request: data as PrayerRequest };
}

export async function deleteRequest(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { error } = await sb.from("prayer_requests").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function markAnswered(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { error } = await sb
    .from("prayer_requests")
    .update({ status: "answered" })
    .eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Atomic: record intercession + return new unique-intercessor count. */
export async function prayFor(
  requestId: string
): Promise<{ ok: boolean; count?: number; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, error: "Sign in to pray." };

  const { data, error } = await sb.rpc("pray_for", { req_id: requestId });
  if (error) return { ok: false, error: error.message };
  return { ok: true, count: typeof data === "number" ? data : undefined };
}

export async function flagRequest(
  requestId: string,
  reason: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { error } = await sb.rpc("flag_prayer_request", {
    req_id: requestId,
    the_reason: reason,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** IDs of requests the current user has prayed for (for UI state). */
export async function listPrayedIds(): Promise<Set<string>> {
  const sb = getSupabase();
  if (!sb) return new Set();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return new Set();
  const { data, error } = await sb
    .from("prayer_intercessions")
    .select("request_id")
    .eq("intercessor_user_id", user.id);
  if (error || !data) return new Set();
  return new Set(data.map((r: { request_id: string }) => r.request_id));
}

/* ──────────────────────────────────────────────────────────────────
   Admin moderation (gated server-side by is_admin())

   Auto-hide kicks in at 3 distinct flags (see migration 0003). This
   admin surface lets a maintainer:
     - see auto-hidden + manually-hidden requests
     - read every flag's reason
     - restore (set status='open') or hard-delete

   See migration 0005_prayer_admin.sql for the policies + RPCs.
────────────────────────────────────────────────────────────────── */

export type AdminPrayerStatus = "open" | "answered" | "hidden" | "all";

export async function adminListPrayerRequests(
  status: AdminPrayerStatus,
  limit = 100,
): Promise<PrayerRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.rpc("admin_list_prayer_requests", {
    the_status: status,
    the_limit: limit,
  });
  if (error || !data) {
    if (error) console.warn("[prayer-wall] admin list error", error.message);
    return [];
  }
  return data as PrayerRequest[];
}

export type FlagReason = { reason: string | null; at: string };

export async function adminListFlagReasons(requestId: string): Promise<FlagReason[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.rpc("admin_list_flag_reasons", { req_id: requestId });
  if (error || !data) return [];
  return data as FlagReason[];
}

export async function adminSetRequestStatus(
  id: string,
  status: "open" | "answered" | "hidden",
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud not configured." };
  const { error } = await sb.from("prayer_requests").update({ status }).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function adminDeleteRequest(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud not configured." };
  const { error } = await sb.from("prayer_requests").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
