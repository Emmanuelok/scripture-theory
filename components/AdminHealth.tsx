"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { checkIsAdmin, isTestimonyCloudConfigured } from "@/lib/testimonies-cloud";
import { getSupabase } from "@/lib/supabase";

type EnvStatus = {
  supabaseUrl: boolean;
  supabaseAnon: boolean;
  esv: boolean;
  giveOnce: boolean;
  giveMonthly: boolean;
  siteUrl: string | null;
};

type Counts = {
  pendingTestimonies: number | null;
  publishedTestimonies: number | null;
  hiddenYeses: number | null;
  totalYeses: number | null;
  flaggedPrayers: number | null;
  hiddenPrayers: number | null;
  openPrayers: number | null;
};

const EMPTY: Counts = {
  pendingTestimonies: null,
  publishedTestimonies: null,
  hiddenYeses: null,
  totalYeses: null,
  flaggedPrayers: null,
  hiddenPrayers: null,
  openPrayers: null,
};

async function loadCounts(): Promise<Counts> {
  const sb = getSupabase();
  if (!sb) return EMPTY;

  async function count(table: string, where?: Record<string, unknown>): Promise<number | null> {
    let q = sb!.from(table).select("*", { count: "exact", head: true });
    if (where) {
      for (const [k, v] of Object.entries(where)) {
        q = q.eq(k, v);
      }
    }
    const { count: n, error } = await q;
    if (error) {
      console.warn("[admin-health]", table, error.message);
      return null;
    }
    return n ?? 0;
  }

  // Flagged prayers — flagged_count > 0; this needs a `.gt()` not `.eq()`.
  async function countFlagged(): Promise<number | null> {
    const { count: n, error } = await sb!
      .from("prayer_requests")
      .select("*", { count: "exact", head: true })
      .gt("flagged_count", 0);
    if (error) {
      console.warn("[admin-health] flagged", error.message);
      return null;
    }
    return n ?? 0;
  }

  const [
    pendingTestimonies,
    publishedTestimonies,
    hiddenYeses,
    totalYeses,
    flaggedPrayers,
    hiddenPrayers,
    openPrayers,
  ] = await Promise.all([
    count("testimonies", { status: "pending" }),
    count("testimonies", { status: "published" }),
    count("sending_covenant", { hidden: true }),
    count("sending_covenant"),
    countFlagged(),
    count("prayer_requests", { status: "hidden" }),
    count("prayer_requests", { status: "open" }),
  ]);

  return {
    pendingTestimonies,
    publishedTestimonies,
    hiddenYeses,
    totalYeses,
    flaggedPrayers,
    hiddenPrayers,
    openPrayers,
  };
}

export default function AdminHealth({ env }: { env: EnvStatus }) {
  const { user, configured: authConfigured, ready } = useAuth();
  const cloud = isTestimonyCloudConfigured();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [counts, setCounts] = useState<Counts>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!cloud || !user) {
      setAdmin(false);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const ok = await checkIsAdmin();
      if (cancelled) return;
      setAdmin(ok);
      if (!ok) {
        setLoading(false);
        return;
      }
      const c = await loadCounts();
      if (cancelled) return;
      setCounts(c);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, cloud, user]);

  if (!ready) {
    return <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading…</div>;
  }

  if (!cloud || !authConfigured) {
    return (
      <div className="space-y-6">
        <EnvPanel env={env} />
        <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-900 text-sm">
          Supabase env vars aren&apos;t configured — queue counts unavailable until
          they are. See the env panel above.
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <EnvPanel env={env} />
        <div className="rounded-3xl border border-ink-200 bg-card p-6">
          <div className="text-xs uppercase tracking-widest text-flame-700">Sign in required</div>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed">
            Sign in with your maintainer email to see queue counts.
          </p>
          <a
            href="/account"
            className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700"
          >
            Sign in →
          </a>
        </div>
      </div>
    );
  }

  if (admin === false) {
    return (
      <div className="space-y-6">
        <EnvPanel env={env} />
        <div className="rounded-3xl border border-ink-200 bg-card p-6">
          <div className="text-xs uppercase tracking-widest text-flame-700">Not authorised</div>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed">
            Signed in as <span className="font-medium text-ink-900">{user.email}</span> —
            this email isn&apos;t on the maintainer allowlist.
          </p>
        </div>
      </div>
    );
  }

  const queueDemandTotal =
    (counts.pendingTestimonies ?? 0) +
    (counts.flaggedPrayers ?? 0) +
    (counts.hiddenPrayers ?? 0);

  return (
    <div className="space-y-8">
      <div
        className={`rounded-3xl border p-5 md:p-6 ${
          queueDemandTotal === 0
            ? "border-emerald-300 bg-emerald-50"
            : "border-flame-300 bg-flame-50/70"
        }`}
      >
        <div className="text-xs uppercase tracking-widest text-flame-700">
          {queueDemandTotal === 0 ? "All clear" : "Wants your eyes"}
        </div>
        <p className="mt-1 font-serif text-2xl md:text-3xl text-ink-900 leading-snug">
          {queueDemandTotal === 0 ? (
            <>Nothing pending. Walk well.</>
          ) : (
            <>
              <span className="text-flame-700">{queueDemandTotal}</span> item
              {queueDemandTotal === 1 ? "" : "s"} waiting for review.
            </>
          )}
        </p>
      </div>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-flame-700">Queues</h2>
        <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <QueueCard
            href="/admin/testimonies"
            title="Testimonies"
            primary={counts.pendingTestimonies}
            primaryLabel="pending"
            secondary={counts.publishedTestimonies}
            secondaryLabel="published"
            loading={loading}
          />
          <QueueCard
            href="/admin/yeses"
            title="Wall of Yeses"
            primary={counts.hiddenYeses}
            primaryLabel="hidden"
            secondary={counts.totalYeses}
            secondaryLabel="total"
            loading={loading}
            tone="dim"
          />
          <QueueCard
            href="/admin/prayers"
            title="Prayer Wall"
            primary={counts.flaggedPrayers}
            primaryLabel="with flags"
            secondary={counts.openPrayers}
            secondaryLabel="open"
            loading={loading}
          />
        </ul>
      </section>

      <EnvPanel env={env} />

      <p className="text-xs text-ink-500 leading-relaxed">
        Counts re-fetch when you reload this page. If a queue shows &mdash;
        (em-dash), Supabase returned an error reading that table — most
        likely a missing migration.{" "}
        <Link href="/admin" className="underline">Back to /admin</Link>.
      </p>
    </div>
  );
}

function QueueCard({
  href,
  title,
  primary,
  primaryLabel,
  secondary,
  secondaryLabel,
  loading,
  tone,
}: {
  href: string;
  title: string;
  primary: number | null;
  primaryLabel: string;
  secondary: number | null;
  secondaryLabel: string;
  loading: boolean;
  tone?: "dim";
}) {
  const has = (primary ?? 0) > 0;
  return (
    <li>
      <Link
        href={href}
        className={`block rounded-3xl border p-5 transition-colors ${
          has
            ? "border-flame-400 bg-flame-50 hover:border-flame-600"
            : "border-ink-200 bg-card hover:border-ink-900"
        }`}
      >
        <div className="text-xs uppercase tracking-widest text-flame-700">{title}</div>
        <div
          className={`mt-2 font-serif text-4xl leading-none ${
            tone === "dim" ? "text-ink-700" : "text-ink-900"
          }`}
        >
          {loading ? "…" : primary === null ? "—" : primary.toLocaleString()}
        </div>
        <div className="text-xs text-ink-600 mt-1">{primaryLabel}</div>
        <div className="mt-4 text-[11px] text-ink-500">
          {loading ? "…" : secondary === null ? "—" : secondary.toLocaleString()}{" "}
          {secondaryLabel}
        </div>
      </Link>
    </li>
  );
}

function EnvPanel({ env }: { env: EnvStatus }) {
  const rows: { key: string; ok: boolean; note?: string }[] = [
    {
      key: "NEXT_PUBLIC_SUPABASE_URL",
      ok: env.supabaseUrl,
      note: "Cloud auth, admin queues, Wall, Prayer Wall, testimonies.",
    },
    {
      key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      ok: env.supabaseAnon,
    },
    {
      key: "ESV_API_KEY",
      ok: env.esv,
      note: "Server-side ESV translation. Without it the ESV option silently falls back.",
    },
    {
      key: "NEXT_PUBLIC_GIVE_ONCE_URL",
      ok: env.giveOnce,
      note: "Stripe Payment Link / Ko-fi / etc. Hides the Give-once button when unset.",
    },
    {
      key: "NEXT_PUBLIC_GIVE_MONTHLY_URL",
      ok: env.giveMonthly,
      note: "Monthly counterpart of the same.",
    },
    {
      key: "NEXT_PUBLIC_SITE_URL",
      ok: Boolean(env.siteUrl),
      note: env.siteUrl ?? "Falls back to https://scripture-theory.vercel.app for sitemap / OG.",
    },
  ];

  return (
    <section>
      <h2 className="text-xs uppercase tracking-widest text-flame-700">Environment</h2>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li
            key={r.key}
            className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-card p-3 md:p-4"
          >
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-ink-50 ${
                r.ok ? "bg-emerald-600" : "bg-ink-300"
              }`}
              aria-label={r.ok ? "set" : "unset"}
            >
              {r.ok ? "✓" : "·"}
            </span>
            <div className="min-w-0">
              <code className="text-xs font-mono text-ink-800 break-all">{r.key}</code>
              {r.note && (
                <p className="mt-0.5 text-xs text-ink-600 leading-relaxed">{r.note}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
