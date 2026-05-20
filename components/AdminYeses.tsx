"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { checkIsAdmin, isTestimonyCloudConfigured } from "@/lib/testimonies-cloud";
import {
  type AdminYes,
  type YesFilter,
  deleteYesAsAdmin,
  listYesesForAdmin,
  setYesHidden,
} from "@/lib/sending-cloud";

export default function AdminYeses() {
  const { user, configured: authConfigured, ready } = useAuth();
  const cloud = isTestimonyCloudConfigured();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<YesFilter>("visible");
  const [rows, setRows] = useState<AdminYes[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [reasonDraft, setReasonDraft] = useState<Record<string, string>>({});

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
      const data = await listYesesForAdmin(tab);
      if (cancelled) return;
      setRows(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [admin, tab]);

  async function hide(id: string) {
    setBusy(id);
    try {
      const res = await setYesHidden(id, true, reasonDraft[id]);
      if (res.ok) setRows((list) => list.filter((r) => r.id !== id));
    } finally {
      setBusy(null);
    }
  }

  async function restore(id: string) {
    setBusy(id);
    try {
      const res = await setYesHidden(id, false);
      if (res.ok) setRows((list) => list.filter((r) => r.id !== id));
    } finally {
      setBusy(null);
    }
  }

  async function hardDelete(id: string) {
    if (!confirm("Hard-delete this yes? This cannot be undone.")) return;
    setBusy(id);
    try {
      const res = await deleteYesAsAdmin(id);
      if (res.ok) setRows((list) => list.filter((r) => r.id !== id));
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
          You must sign in with your maintainer email to moderate the Wall of Yeses.
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
      <div className="flex flex-wrap gap-2">
        {(["visible", "hidden"] as const).map((t) => (
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
            {t === "visible" ? "On the wall" : "Hidden"}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-ink-500 italic">
          Signed in as {user.email}
        </span>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4 text-xs text-ink-600 leading-relaxed">
        <strong className="text-ink-800">Pastoral note:</strong> these are real
        believers&apos; first words of obedience. Hide rather than delete unless
        the row is clear spam, abuse, or a safety risk (last name, exposed location,
        hostile-jurisdiction identity). Hidden rows stay in the database so the audit
        trail survives.
      </div>

      {loading ? (
        <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading {tab}…</div>
      ) : rows.length === 0 ? (
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-8 text-center text-ink-600 italic">
          {tab === "visible"
            ? "No public yeses yet — the wall is empty."
            : "Nothing hidden. Walls are clean."}
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map((y) => (
            <li key={y.id} className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg text-ink-900">
                    {y.first_name}
                    {y.public === false && (
                      <span className="ml-2 text-[10px] uppercase tracking-widest text-ink-500">
                        private
                      </span>
                    )}
                  </h2>
                  <div className="text-xs uppercase tracking-widest text-ink-500 mt-0.5">
                    {y.region}
                  </div>
                </div>
                <div className="text-[11px] text-ink-500">
                  said yes {new Date(y.said_yes_at).toLocaleString()}
                </div>
              </div>

              {y.prayer && (
                <blockquote className="mt-3 rounded-2xl border border-flame-200 bg-flame-50/60 p-3 text-sm text-ink-800 italic leading-relaxed">
                  &ldquo;{y.prayer}&rdquo;
                </blockquote>
              )}

              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-ink-500">
                <span>walking with {y.souls_walking_with}</span>
                <span>·</span>
                <span>lifted up {y.prayed_for_count}×</span>
                {y.device_id && (
                  <>
                    <span>·</span>
                    <span className="font-mono">device {y.device_id.slice(0, 8)}…</span>
                  </>
                )}
              </div>

              {tab === "hidden" && y.flagged_reason && (
                <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50/70 p-3 text-xs text-amber-900">
                  <div className="text-[10px] uppercase tracking-widest text-amber-700 mb-0.5">
                    Editor note
                  </div>
                  {y.flagged_reason}
                </div>
              )}

              {tab === "visible" && (
                <div className="mt-4">
                  <label className="block text-[10px] uppercase tracking-widest text-ink-500 mb-1">
                    Hide reason (optional, private)
                  </label>
                  <input
                    type="text"
                    maxLength={280}
                    placeholder="e.g. last-name slipped through, hostile jurisdiction"
                    value={reasonDraft[y.id] ?? ""}
                    onChange={(e) =>
                      setReasonDraft((d) => ({ ...d, [y.id]: e.target.value }))
                    }
                    className="w-full rounded-xl border border-ink-300 bg-card px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400"
                  />
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {tab === "visible" ? (
                  <button
                    onClick={() => hide(y.id)}
                    disabled={busy === y.id}
                    className="rounded-full border border-amber-400 text-amber-900 bg-amber-50 px-4 py-1.5 text-sm hover:bg-amber-100 disabled:opacity-60"
                  >
                    Hide from wall
                  </button>
                ) : (
                  <button
                    onClick={() => restore(y.id)}
                    disabled={busy === y.id}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-ink-50 px-4 py-1.5 text-sm disabled:opacity-60"
                  >
                    Restore to wall
                  </button>
                )}
                <button
                  onClick={() => hardDelete(y.id)}
                  disabled={busy === y.id}
                  className="rounded-full border border-red-300 text-red-700 bg-red-50 px-4 py-1.5 text-sm hover:bg-red-100 disabled:opacity-60"
                >
                  Delete permanently
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
