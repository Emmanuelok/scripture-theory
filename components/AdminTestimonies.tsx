"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  checkIsAdmin,
  displayName,
  isTestimonyCloudConfigured,
  listTestimoniesByStatus,
  setTestimonyStatus,
  type AdminTestimony,
} from "@/lib/testimonies-cloud";

type Tab = "pending" | "published" | "hidden";

export default function AdminTestimonies() {
  const { user, configured: authConfigured, ready } = useAuth();
  const cloud = isTestimonyCloudConfigured();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("pending");
  const [rows, setRows] = useState<AdminTestimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

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
      if (!ok) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [cloud, user, ready]);

  useEffect(() => {
    if (admin !== true) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      const data = await listTestimoniesByStatus(tab);
      if (cancelled) return;
      setRows(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [admin, tab]);

  async function changeStatus(id: string, status: Tab) {
    setBusy(id);
    try {
      const res = await setTestimonyStatus(id, status);
      if (res.ok) {
        // Optimistic: drop from current list
        setRows((list) => list.filter((r) => r.id !== id));
      }
    } finally {
      setBusy(null);
    }
  }

  if (!ready) {
    return <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading…</div>;
  }

  if (!cloud || !authConfigured) {
    return (
      <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
        <div className="text-xs uppercase tracking-widest text-amber-700">Setup needed</div>
        <p className="mt-2 text-sm leading-relaxed">
          The Supabase env vars aren&apos;t configured on this deploy. Set
          {" "}<code className="rounded bg-amber-100 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          and{" "}<code className="rounded bg-amber-100 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          on Vercel and redeploy.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6">
        <div className="text-xs uppercase tracking-widest text-flame-700">Sign in required</div>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          You must sign in with your maintainer email to review testimonies.
        </p>
        <a
          href="/account"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700"
        >
          Sign in →
        </a>
      </div>
    );
  }

  if (admin === false) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6">
        <div className="text-xs uppercase tracking-widest text-flame-700">Not authorised</div>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          You&apos;re signed in as{" "}
          <span className="font-medium text-ink-900">{user.email}</span>, but this email
          isn&apos;t on the maintainer allowlist.
        </p>
        <p className="mt-3 text-xs text-ink-500 leading-relaxed">
          A maintainer can add your email by running{" "}
          <code className="rounded bg-ink-100 px-1.5 py-0.5">
            insert into admin_emails(email) values ('{user.email}');
          </code>{" "}
          in the Supabase SQL editor.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["pending", "published", "hidden"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition-colors ${
              tab === t
                ? "bg-ink-900 text-ink-50 border-ink-900"
                : "bg-card text-ink-700 border-ink-300 hover:border-ink-900"
            }`}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-ink-500 italic">
          Signed in as {user.email}
        </span>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading {tab}…</div>
      ) : rows.length === 0 ? (
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-8 text-center text-ink-600 italic">
          {tab === "pending"
            ? "Nothing pending review. The queue is clean."
            : tab === "published"
              ? "No testimonies published yet."
              : "Nothing hidden."}
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map((t) => (
            <li key={t.id} className="rounded-3xl border border-ink-200 bg-card p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h2 className="font-serif text-xl text-ink-900">
                    {displayName(t)}
                    {t.initials_only && (
                      <span className="ml-2 text-[10px] uppercase tracking-widest text-flame-700">
                        initials only
                      </span>
                    )}
                  </h2>
                  {t.place && (
                    <div className="text-xs uppercase tracking-widest text-ink-500 mt-0.5">
                      {t.place}
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-ink-500">
                  submitted {new Date(t.created_at).toLocaleString()}
                </div>
              </div>

              {t.verse && (
                <div className="mt-2 text-[10px] uppercase tracking-widest text-flame-700">
                  {t.verse}
                </div>
              )}

              <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
                <Block label="Before">{t.before_text}</Block>
                <Block label="Jesus met me">{t.encounter}</Block>
                <Block label="Now">{t.now_text}</Block>
              </div>

              {t.contact && (
                <div className="mt-4 rounded-2xl border border-ink-200 bg-card-subtle p-3 text-xs text-ink-600">
                  <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-1">
                    Contact (private, editor only)
                  </div>
                  <span className="font-mono text-ink-800">{t.contact}</span>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {tab !== "published" && (
                  <button
                    onClick={() => changeStatus(t.id, "published")}
                    disabled={busy === t.id}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-ink-50 px-4 py-1.5 text-sm disabled:opacity-60"
                  >
                    Publish →
                  </button>
                )}
                {tab !== "hidden" && (
                  <button
                    onClick={() => changeStatus(t.id, "hidden")}
                    disabled={busy === t.id}
                    className="rounded-full border border-amber-400 text-amber-900 bg-amber-50 px-4 py-1.5 text-sm hover:bg-amber-100 disabled:opacity-60"
                  >
                    Hide
                  </button>
                )}
                {tab !== "pending" && (
                  <button
                    onClick={() => changeStatus(t.id, "pending")}
                    disabled={busy === t.id}
                    className="rounded-full border border-ink-300 text-ink-700 bg-card px-4 py-1.5 text-sm hover:border-ink-900 disabled:opacity-60"
                  >
                    Return to pending
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-card-subtle p-3">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <p className="mt-1 text-ink-800 leading-relaxed whitespace-pre-wrap">{children}</p>
    </div>
  );
}
