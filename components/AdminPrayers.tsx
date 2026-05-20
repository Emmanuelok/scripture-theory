"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { checkIsAdmin, isTestimonyCloudConfigured } from "@/lib/testimonies-cloud";
import {
  type AdminPrayerStatus,
  type FlagReason,
  type PrayerRequest,
  adminDeleteRequest,
  adminListFlagReasons,
  adminListPrayerRequests,
  adminSetRequestStatus,
} from "@/lib/prayer-wall";

type Tab = AdminPrayerStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: "hidden", label: "Hidden / flagged" },
  { key: "open", label: "Open" },
  { key: "answered", label: "Answered" },
  { key: "all", label: "All" },
];

function fmtRelative(iso: string) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function AdminPrayers() {
  const { user, configured: authConfigured, ready } = useAuth();
  const cloud = isTestimonyCloudConfigured();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("hidden");
  const [rows, setRows] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, FlagReason[]>>({});

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
      const data = await adminListPrayerRequests(tab);
      if (cancelled) return;
      setRows(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [admin, tab]);

  async function loadReasons(id: string) {
    if (reasons[id]) return;
    const list = await adminListFlagReasons(id);
    setReasons((r) => ({ ...r, [id]: list }));
  }

  async function setStatus(id: string, status: "open" | "answered" | "hidden") {
    setBusy(id);
    try {
      const res = await adminSetRequestStatus(id, status);
      if (res.ok) setRows((list) => list.filter((r) => r.id !== id));
    } finally {
      setBusy(null);
    }
  }

  async function hardDelete(id: string) {
    if (!confirm("Hard-delete this prayer request? This cannot be undone.")) return;
    setBusy(id);
    try {
      const res = await adminDeleteRequest(id);
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
          Supabase env vars aren&apos;t configured on this deploy.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6">
        <div className="text-xs uppercase tracking-widest text-flame-700">Sign in required</div>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          Sign in with your maintainer email to review prayer requests.
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
          Signed in as <span className="font-medium text-ink-900">{user.email}</span>,
          but this email isn&apos;t on the maintainer allowlist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              tab === t.key
                ? "bg-ink-900 text-ink-50 border-ink-900"
                : "bg-card text-ink-700 border-ink-300 hover:border-ink-900"
            }`}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-ink-500 italic">
          Signed in as {user.email}
        </span>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4 text-xs text-ink-600 leading-relaxed">
        <strong className="text-ink-800">Pastoral note:</strong> three distinct
        flags auto-hide a request. Read the reasons, then decide gently —
        restore most things (people flag honest pain as &quot;off-topic&quot; sometimes);
        hard-delete only clear abuse, doxxing, or spam.
      </div>

      {loading ? (
        <div className="rounded-3xl border border-ink-200 bg-card p-6 text-ink-500">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-8 text-center text-ink-600 italic">
          {tab === "hidden" ? "Nothing hidden. Walls are clean." : `No ${tab} requests.`}
        </div>
      ) : (
        <ul className="space-y-4">
          {rows.map((r) => (
            <li key={r.id} className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h2 className="font-serif text-base text-ink-900">
                    {r.alias?.trim() || "Anonymous"}
                  </h2>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    {fmtRelative(r.created_at)} · {r.language}
                    {r.user_id ? "" : " · anon"}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                  <span className="text-ink-500">prayed {r.prayer_count}×</span>
                  {r.flagged_count > 0 && (
                    <span className="text-red-700">{r.flagged_count} flag{r.flagged_count === 1 ? "" : "s"}</span>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm text-ink-800 leading-relaxed whitespace-pre-wrap">
                {r.body}
              </p>

              {r.flagged_count > 0 && (
                <div className="mt-3">
                  <button
                    onClick={() => loadReasons(r.id)}
                    className="text-[11px] uppercase tracking-widest text-flame-700 hover:underline"
                  >
                    {reasons[r.id] ? "Flag reasons:" : `View ${r.flagged_count} flag reason${r.flagged_count === 1 ? "" : "s"} →`}
                  </button>
                  {reasons[r.id] && (
                    <ul className="mt-2 space-y-1.5">
                      {reasons[r.id].length === 0 ? (
                        <li className="text-xs text-ink-500 italic">
                          (No reasons readable — likely RLS or empty.)
                        </li>
                      ) : (
                        reasons[r.id].map((fr, i) => (
                          <li
                            key={i}
                            className="rounded-xl border border-red-200 bg-red-50/60 p-2.5 text-xs text-red-900"
                          >
                            <div className="text-[10px] uppercase tracking-widest text-red-700">
                              {fmtRelative(fr.at)}
                            </div>
                            <div className="mt-0.5">{fr.reason ?? "(no reason given)"}</div>
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {r.status !== "open" && (
                  <button
                    onClick={() => setStatus(r.id, "open")}
                    disabled={busy === r.id}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-ink-50 px-4 py-1.5 text-sm disabled:opacity-60"
                  >
                    Restore to open
                  </button>
                )}
                {r.status !== "hidden" && (
                  <button
                    onClick={() => setStatus(r.id, "hidden")}
                    disabled={busy === r.id}
                    className="rounded-full border border-amber-400 text-amber-900 bg-amber-50 px-4 py-1.5 text-sm hover:bg-amber-100 disabled:opacity-60"
                  >
                    Hide
                  </button>
                )}
                {r.status !== "answered" && (
                  <button
                    onClick={() => setStatus(r.id, "answered")}
                    disabled={busy === r.id}
                    className="rounded-full border border-ink-300 text-ink-700 bg-card px-4 py-1.5 text-sm hover:border-ink-900 disabled:opacity-60"
                  >
                    Mark answered
                  </button>
                )}
                <button
                  onClick={() => hardDelete(r.id)}
                  disabled={busy === r.id}
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

function statusTone(s: string): "ink" | "amber" | "emerald" {
  if (s === "hidden") return "amber";
  if (s === "answered") return "emerald";
  return "ink";
}

function Badge({
  tone,
  children,
}: {
  tone: "ink" | "amber" | "emerald";
  children: React.ReactNode;
}) {
  const cls =
    tone === "amber"
      ? "border-amber-300 bg-amber-50 text-amber-900"
      : tone === "emerald"
        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
        : "border-ink-300 bg-card text-ink-700";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${cls}`}>
      {children}
    </span>
  );
}
