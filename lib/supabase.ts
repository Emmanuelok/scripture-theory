"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Lazy Supabase client.
 * Returns null when env vars are not configured — the rest of the app
 * treats that as "auth not yet enabled" and continues to work locally.
 */

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    cached = null;
    return null;
  }

  cached = createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "scripture-theory-auth",
    },
  });
  return cached;
}

export function isAuthConfigured() {
  return getSupabase() !== null;
}
