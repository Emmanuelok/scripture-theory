"use client";

import { getSupabase } from "@/lib/supabase";

/* ──────────────────────────────────────────────────────────────────
   Testimonies — real, submitted, reviewed.

   Synthetic stories were removed. The witness page now reads from
   the `testimonies` table; this lib handles listing the published
   ones and submitting a new one for editorial review.

   Editorial workflow:
     1. Believer submits → row inserted with status='pending'
     2. Pastor / editor reviews in Supabase (or future admin UI)
     3. Editor flips status to 'published' and sets published_at
     4. The witness page surfaces it

   Privacy:
     - First name (or initials) only. Place is the country / region.
     - "contact" is optional and never displayed publicly — only the
       editor sees it (used to reply with a draft for approval).
     - RLS hides 'pending' and 'hidden' rows from anonymous reads.

   ── Schema ──────────────────────────────────────────────────────
   Run once in the Supabase SQL editor:

     create table if not exists testimonies (
       id              uuid primary key default gen_random_uuid(),
       first_name      text not null check (char_length(first_name) between 1 and 64),
       initials_only   boolean not null default false,
       place           text check (place is null or char_length(place) <= 96),
       before_text     text not null check (char_length(before_text) between 10 and 2000),
       encounter       text not null check (char_length(encounter) between 10 and 2000),
       now_text        text not null check (char_length(now_text) between 10 and 2000),
       verse           text check (verse is null or char_length(verse) <= 64),
       contact         text check (contact is null or char_length(contact) <= 256),
       status          text not null default 'pending'
                       check (status in ('pending', 'published', 'hidden')),
       user_id         uuid,
       device_id       text,
       created_at      timestamptz not null default now(),
       published_at    timestamptz
     );

     create index if not exists idx_testimonies_published
       on testimonies (published_at desc nulls last)
       where status = 'published';

     alter table testimonies enable row level security;

     -- The public sees published rows only.
     create policy "read published" on testimonies
       for select using (status = 'published');

     -- Anyone (anon or signed-in) can submit. Insert is forced to
     -- pending; editors then flip status from /admin/testimonies.
     create policy "submit any" on testimonies
       for insert with check (status = 'pending');

     -- ── Admin / editor access ─────────────────────────────────
     -- A tiny allowlist table + helper that returns true when the
     -- caller's auth email is on the allowlist. Admins read/update
     -- everything; non-admins still only see published rows.

     create table if not exists admin_emails (
       email text primary key
     );

     -- Add your maintainer email(s):
     --   insert into admin_emails(email) values ('you@example.com');

     create or replace function is_admin() returns boolean
       language sql stable security definer
       set search_path = public
       as $$ select exists(select 1 from admin_emails where email = auth.email()) $$;
     grant execute on function is_admin() to anon, authenticated;

     -- Admins can read pending / hidden too
     create policy "admin read all" on testimonies
       for select using (is_admin());

     -- Admins can update status (and any other column) on any row
     create policy "admin update" on testimonies
       for update using (is_admin()) with check (is_admin());
────────────────────────────────────────────────────────────────── */

export type PublishedTestimony = {
  id: string;
  first_name: string;
  initials_only: boolean;
  place: string | null;
  before_text: string;
  encounter: string;
  now_text: string;
  verse: string | null;
  published_at: string | null;
  created_at: string;
};

export type TestimonySubmission = {
  firstName: string;
  initialsOnly?: boolean;
  city?: string;
  country?: string;
  before: string;
  encounter: string;
  now: string;
  verse?: string;
  contact?: string;
};

export function isTestimonyCloudConfigured(): boolean {
  return getSupabase() !== null;
}

/** Pretty-print the believer's display name honouring the initials-only flag. */
export function displayName(t: { first_name: string; initials_only: boolean }): string {
  if (!t.initials_only) return t.first_name;
  // "Mary Anne" → "M. A.", "Mary" → "M."
  return t.first_name
    .trim()
    .split(/\s+/)
    .map((s) => `${s.charAt(0).toUpperCase()}.`)
    .join(" ");
}

/** Listed in newest-published-first order. */
export async function listPublishedTestimonies(limit = 60): Promise<PublishedTestimony[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("testimonies")
    .select(
      "id, first_name, initials_only, place, before_text, encounter, now_text, verse, published_at, created_at",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error) {
    console.warn("[testimonies] list error", error.message);
    return [];
  }
  return (data ?? []) as PublishedTestimony[];
}

const FIRST_NAME_MAX = 64;
const PLACE_MAX = 96;
const TEXT_MIN = 10;
const TEXT_MAX = 2000;
const VERSE_MAX = 64;
const CONTACT_MAX = 256;

export function validateTestimony(s: TestimonySubmission): { ok: boolean; error?: string } {
  if (!s.firstName.trim()) return { ok: false, error: "First name (or initials) is required." };
  if (s.firstName.trim().length > FIRST_NAME_MAX)
    return { ok: false, error: `First name max ${FIRST_NAME_MAX} characters.` };
  for (const [field, label] of [
    ["before", "Before"],
    ["encounter", "Jesus met me"],
    ["now", "Now"],
  ] as const) {
    const v = (s[field] ?? "").trim();
    if (v.length < TEXT_MIN)
      return { ok: false, error: `${label}: at least ${TEXT_MIN} characters.` };
    if (v.length > TEXT_MAX)
      return { ok: false, error: `${label}: at most ${TEXT_MAX} characters.` };
  }
  if ((s.verse ?? "").length > VERSE_MAX)
    return { ok: false, error: `Verse max ${VERSE_MAX} characters.` };
  if ((s.contact ?? "").length > CONTACT_MAX)
    return { ok: false, error: `Contact max ${CONTACT_MAX} characters.` };
  return { ok: true };
}

const LOCAL_DEVICE_KEY = "scripture-theory-testimony-device";

function getOrCreateDeviceId(): string {
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

/**
 * Submit a testimony into the editorial queue. Returns the new row ID
 * (so the form can show "submitted ✓") or null on failure.
 */
export async function submitTestimony(s: TestimonySubmission): Promise<{ ok: boolean; id?: string; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "The testimony queue isn't configured yet on this deploy." };
  const v = validateTestimony(s);
  if (!v.ok) return { ok: false, error: v.error };

  const place =
    [s.city, s.country].filter((x) => x && x.trim().length > 0).join(", ").trim().slice(0, PLACE_MAX) ||
    null;

  const row = {
    first_name: s.firstName.trim(),
    initials_only: Boolean(s.initialsOnly),
    place,
    before_text: s.before.trim(),
    encounter: s.encounter.trim(),
    now_text: s.now.trim(),
    verse: (s.verse ?? "").trim() || null,
    contact: (s.contact ?? "").trim() || null,
    status: "pending" as const,
    device_id: getOrCreateDeviceId() || null,
  };

  const { data, error } = await sb
    .from("testimonies")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.warn("[testimonies] insert error", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true, id: data?.id as string };
}

/* ──────────────────────────────────────────────────────────────────
   Admin helpers (gated by is_admin() RLS on the server)
────────────────────────────────────────────────────────────────── */

export type AdminTestimony = PublishedTestimony & {
  status: "pending" | "published" | "hidden";
  contact: string | null;
};

/** True iff the caller's auth email is in the admin_emails table. */
export async function checkIsAdmin(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { data, error } = await sb.rpc("is_admin");
  if (error) {
    console.warn("[testimonies] is_admin error", error.message);
    return false;
  }
  return Boolean(data);
}

export async function listTestimoniesByStatus(
  status: "pending" | "published" | "hidden",
  limit = 100,
): Promise<AdminTestimony[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("testimonies")
    .select(
      "id, first_name, initials_only, place, before_text, encounter, now_text, verse, contact, status, published_at, created_at",
    )
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.warn("[testimonies] admin list error", error.message);
    return [];
  }
  return (data ?? []) as AdminTestimony[];
}

export async function setTestimonyStatus(
  id: string,
  status: "pending" | "published" | "hidden",
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: "Cloud not configured." };
  const patch: { status: string; published_at?: string | null } = { status };
  if (status === "published") patch.published_at = new Date().toISOString();
  if (status !== "published") patch.published_at = null;
  const { error } = await sb.from("testimonies").update(patch).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
