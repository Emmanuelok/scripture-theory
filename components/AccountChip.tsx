"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

/** Compact account indicator for the Nav. Hidden until configured + ready. */
export default function AccountChip() {
  const { configured, ready, user } = useAuth();
  if (!configured || !ready) return null;

  if (!user) {
    return (
      <Link
        href="/account"
        className="hidden md:inline-flex items-center rounded-full border border-ink-200 px-3 py-1.5 text-xs text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors"
        title="Sign in to sync"
      >
        Sign in
      </Link>
    );
  }

  const initial = (user.email ?? "?").trim().charAt(0).toUpperCase();
  return (
    <Link
      href="/account"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-flame-600 text-ink-50 text-sm font-medium hover:bg-flame-700 transition-colors"
      title={user.email ?? "Account"}
      aria-label="Account"
    >
      {initial}
    </Link>
  );
}
