"use client";

import { getSupabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────
   Pastor + intro-request data layer.
   All functions return null-or-fail when Supabase isn't configured.
────────────────────────────────────────────────────────────────── */

export type ChurchClaim = {
  id: string;
  user_id: string;
  church_name: string;
  city: string;
  country: string;
  tradition: string | null;
  osm_id: string | null;
  service_times: string | null;
  contact_email: string | null;
  pastor_name: string | null;
  pastor_role: string | null;
  notes: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
};

export type IntroRequest = {
  id: string;
  disciple_user_id: string | null;
  alias: string | null;
  contact: string | null;
  stage: number | null;
  note: string | null;
  target_claim_id: string | null;
  target_city: string | null;
  target_country: string | null;
  status: "pending" | "accepted" | "declined" | "completed";
  pastor_user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type IntroRequestEvent = {
  id: string;
  request_id: string;
  by_user_id: string | null;
  status: string;
  note: string | null;
  at: string;
};

/* ── Church claims ──────────────────────────────────────── */

export async function listMyClaims(): Promise<ChurchClaim[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return [];
  const { data, error } = await sb
    .from("church_claims")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as ChurchClaim[];
}

export async function createClaim(
  patch: Omit<
    ChurchClaim,
    "id" | "user_id" | "verified" | "created_at" | "updated_at"
  >
): Promise<{ ok: boolean; claim?: ChurchClaim; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, error: "Sign in first." };
  const row = { ...patch, user_id: user.id };
  const { data, error } = await sb
    .from("church_claims")
    .insert(row)
    .select("*")
    .single();
  if (error || !data) return { ok: false, error: error?.message ?? "Insert failed." };
  return { ok: true, claim: data as ChurchClaim };
}

export async function updateClaim(
  id: string,
  patch: Partial<Omit<ChurchClaim, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { error } = await sb.from("church_claims").update(patch).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deleteClaim(id: string): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { error } = await sb.from("church_claims").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/* ── Intro requests ─────────────────────────────────────── */

export type SubmitIntroInput = {
  alias?: string;
  contact?: string;
  stage: number;
  note?: string;
  target_claim_id?: string | null;
  target_city?: string | null;
  target_country?: string | null;
  anonymous?: boolean;
};

export async function submitIntroRequest(
  input: SubmitIntroInput
): Promise<{ ok: boolean; request?: IntroRequest; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, error: "Sign in first." };

  const row = {
    disciple_user_id: input.anonymous ? null : user.id,
    alias: input.alias ?? null,
    contact: input.contact ?? null,
    stage: input.stage,
    note: input.note ?? null,
    target_claim_id: input.target_claim_id ?? null,
    target_city: input.target_city ?? null,
    target_country: input.target_country ?? null,
  };

  const { data, error } = await sb
    .from("intro_requests")
    .insert(row)
    .select("*")
    .single();
  if (error || !data) return { ok: false, error: error?.message ?? "Submit failed." };

  // Best-effort audit event
  sb.from("intro_request_events")
    .insert({ request_id: data.id, by_user_id: user.id, status: "pending", note: "Created" })
    .then(() => {});

  return { ok: true, request: data as IntroRequest };
}

/** Disciple-side: requests I have submitted. */
export async function listMyIntroRequests(): Promise<IntroRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("intro_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as IntroRequest[];
}

/** Pastor-side: requests routed to a church I claimed. */
export async function listIncomingIntroRequests(): Promise<IntroRequest[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("intro_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as IntroRequest[];
}

export async function updateIntroStatus(
  id: string,
  status: IntroRequest["status"],
  note?: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud sync isn't configured." };
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, error: "Sign in first." };

  const { error } = await sb
    .from("intro_requests")
    .update({ status, pastor_user_id: user.id })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  sb.from("intro_request_events")
    .insert({ request_id: id, by_user_id: user.id, status, note: note ?? null })
    .then(() => {});

  return { ok: true };
}

export async function listEventsForRequest(id: string): Promise<IntroRequestEvent[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("intro_request_events")
    .select("*")
    .eq("request_id", id)
    .order("at", { ascending: true });
  if (error || !data) return [];
  return data as IntroRequestEvent[];
}
