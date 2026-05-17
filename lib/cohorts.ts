"use client";

import { getSupabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────
   cohorts — small groups walking Foundations together.

   All functions return null / empty results when Supabase is not
   configured, so the rest of the platform continues to work.
────────────────────────────────────────────────────────────────── */

export type Cohort = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  leader_id: string;
  starts_on: string | null;
  course: string;
  created_at: string;
  updated_at: string;
};

export type CohortMember = {
  id: string;
  cohort_id: string;
  user_id: string;
  alias: string;
  role: "leader" | "member";
  joined_at: string;
};

export type CohortPrayer = {
  id: string;
  cohort_id: string;
  user_id: string;
  alias: string;
  body: string;
  created_at: string;
};

export type CohortProgress = {
  id: string;
  cohort_id: string;
  user_id: string;
  week: number;
  completed_at: string;
};

/** Generate a friendly, short, unambiguous join code. */
export function generateCohortCode(): string {
  // A–H, J, K, M–N, P–T, W–Z (no I, L, O, U, V — visual ambiguity)
  const alphabet = "ABCDEFGHJKMNPQRSTWXYZ";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function normalizeCode(c: string): string {
  return c.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 24);
}

export async function createCohort(input: {
  name: string;
  description?: string;
  startsOn?: string;
  alias: string;
}): Promise<Cohort | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data: session } = await supabase.auth.getUser();
  const uid = session.user?.id;
  if (!uid) return null;

  // Try up to 5 codes if one collides
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCohortCode();
    const { data, error } = await supabase
      .from("cohorts")
      .insert({
        code,
        name: input.name.trim().slice(0, 80),
        description: input.description?.trim().slice(0, 600) || null,
        starts_on: input.startsOn || null,
        leader_id: uid,
      })
      .select()
      .single();
    if (data) {
      // Add the leader as a member with their alias
      await supabase.from("cohort_members").insert({
        cohort_id: data.id,
        user_id: uid,
        alias: input.alias.trim().slice(0, 60) || "Leader",
        role: "leader",
      });
      return data as Cohort;
    }
    if (error && !error.message.toLowerCase().includes("duplicate")) {
      console.error("createCohort", error);
      return null;
    }
  }
  return null;
}

export async function joinCohort(code: string, alias: string): Promise<string | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const cleaned = normalizeCode(code);
  if (!cleaned) return null;
  const { data, error } = await supabase.rpc("join_cohort", {
    the_code: cleaned,
    the_alias: alias.trim().slice(0, 60) || "Member",
  });
  if (error) {
    console.error("joinCohort", error);
    return null;
  }
  return data as string;
}

export async function leaveCohort(cohortId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { data: session } = await supabase.auth.getUser();
  const uid = session.user?.id;
  if (!uid) return false;
  const { error } = await supabase
    .from("cohort_members")
    .delete()
    .eq("cohort_id", cohortId)
    .eq("user_id", uid);
  return !error;
}

export async function listMyCohorts(): Promise<Cohort[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data: session } = await supabase.auth.getUser();
  const uid = session.user?.id;
  if (!uid) return [];

  // RLS will only return cohorts they belong to or lead
  const { data, error } = await supabase
    .from("cohorts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listMyCohorts", error);
    return [];
  }
  return (data ?? []) as Cohort[];
}

export async function getCohortByCode(code: string): Promise<Cohort | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const cleaned = normalizeCode(code);
  if (!cleaned) return null;
  const { data } = await supabase
    .from("cohorts")
    .select("*")
    .eq("code", cleaned)
    .maybeSingle();
  return (data as Cohort) ?? null;
}

export async function listCohortMembers(cohortId: string): Promise<CohortMember[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cohort_members")
    .select("*")
    .eq("cohort_id", cohortId)
    .order("joined_at", { ascending: true });
  if (error) {
    console.error("listCohortMembers", error);
    return [];
  }
  return (data ?? []) as CohortMember[];
}

export async function listCohortProgress(cohortId: string): Promise<CohortProgress[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cohort_progress")
    .select("*")
    .eq("cohort_id", cohortId);
  if (error) {
    console.error("listCohortProgress", error);
    return [];
  }
  return (data ?? []) as CohortProgress[];
}

export async function publishWeekComplete(cohortId: string, week: number): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.rpc("publish_week_complete", {
    c_id: cohortId,
    the_week: week,
  });
  if (error) {
    console.error("publishWeekComplete", error);
    return false;
  }
  return true;
}

export async function listCohortPrayers(cohortId: string): Promise<CohortPrayer[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cohort_prayers")
    .select("*")
    .eq("cohort_id", cohortId)
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) {
    console.error("listCohortPrayers", error);
    return [];
  }
  return (data ?? []) as CohortPrayer[];
}

export async function postCohortPrayer(
  cohortId: string,
  alias: string,
  body: string
): Promise<CohortPrayer | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data: session } = await supabase.auth.getUser();
  const uid = session.user?.id;
  if (!uid) return null;
  const { data, error } = await supabase
    .from("cohort_prayers")
    .insert({
      cohort_id: cohortId,
      user_id: uid,
      alias: alias.trim().slice(0, 60) || "Member",
      body: body.trim().slice(0, 600),
    })
    .select()
    .single();
  if (error) {
    console.error("postCohortPrayer", error);
    return null;
  }
  return data as CohortPrayer;
}

export async function deleteCohortPrayer(prayerId: string): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;
  const { error } = await supabase.from("cohort_prayers").delete().eq("id", prayerId);
  return !error;
}

/**
 * On-device cache of the believer's primary active cohort id, so the
 * course week view can offer "publish to cohort" without hitting the
 * network on every render. Per-slot.
 */
import { slotKey } from "@/lib/slots";

const ACTIVE_COHORT_KEY = "scripture-theory-active-cohort";

export function getActiveCohortId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(slotKey(ACTIVE_COHORT_KEY));
  } catch {
    return null;
  }
}

export function setActiveCohortId(id: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (id) window.localStorage.setItem(slotKey(ACTIVE_COHORT_KEY), id);
    else window.localStorage.removeItem(slotKey(ACTIVE_COHORT_KEY));
  } catch {}
}
