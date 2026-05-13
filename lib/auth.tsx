"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, isAuthConfigured } from "@/lib/supabase";

export type AuthState = {
  configured: boolean;
  ready: boolean;
  user: User | null;
  session: Session | null;
  signInWithMagicLink: (email: string) => Promise<{ ok: boolean; error?: string }>;
  signInWithOAuth: (provider: "google" | "apple") => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const configured = isAuthConfigured();

  useEffect(() => {
    if (!configured) {
      setReady(true);
      return;
    }
    const supabase = getSupabase()!;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => sub.subscription.unsubscribe();
  }, [configured]);

  const value = useMemo<AuthState>(
    () => ({
      configured,
      ready,
      session,
      user: session?.user ?? null,
      async signInWithMagicLink(email: string) {
        const supabase = getSupabase();
        if (!supabase) return { ok: false, error: "Cloud sign-in is not configured yet." };
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo:
              typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
          },
        });
        return error ? { ok: false, error: error.message } : { ok: true };
      },
      async signInWithOAuth(provider) {
        const supabase = getSupabase();
        if (!supabase) return { ok: false, error: "Cloud sign-in is not configured yet." };
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo:
              typeof window !== "undefined" ? `${window.location.origin}/account` : undefined,
          },
        });
        return error ? { ok: false, error: error.message } : { ok: true };
      },
      async signOut() {
        const supabase = getSupabase();
        if (!supabase) return;
        await supabase.auth.signOut();
      },
    }),
    [configured, ready, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      configured: false,
      ready: true,
      user: null,
      session: null,
      async signInWithMagicLink() {
        return { ok: false, error: "Auth provider not mounted." };
      },
      async signInWithOAuth() {
        return { ok: false, error: "Auth provider not mounted." };
      },
      async signOut() {},
    };
  }
  return ctx;
}
