"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  listIncomingIntroRequests,
  listMyClaims,
  updateIntroStatus,
  type ChurchClaim,
  type IntroRequest,
} from "@/lib/pastor";
import { findStage } from "@/data/path";

/* ──────────────────────────────────────────────────────────────────
   PastorDashboardLive — pastors see real intro requests routed to
   their claimed churches. Supabase-backed; degrades gracefully.
────────────────────────────────────────────────────────────────── */

type Tab = "pending" | "accepted" | "completed" | "all";

function fmtRelative(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export default function PastorDashboardLive() {
  const { configured, ready, user } = useAuth();
  const [claims, setClaims] = useState<ChurchClaim[]>([]);
  const [requests, setRequests] = useState<IntroRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!configured || !ready || !user) {
      setLoading(false);
      return;
    }
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured, ready, user]);

  async function refresh() {
    setLoading(true);
    const [c, r] = await Promise.all([listMyClaims(), listIncomingIntroRequests()]);
    setClaims(c);
    setRequests(r);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    if (tab === "all") return requests;
    return requests.filter((r) => r.status === tab);
  }, [requests, tab]);

  const counts = useMemo(() => {
    return {
      pending: requests.filter((r) => r.status === "pending").length,
      accepted: requests.filter((r) => r.status === "accepted").length,
      completed: requests.filter((r) => r.status === "completed").length,
      all: requests.length,
    };
  }, [requests]);

  async function setStatusFor(id: string, next: IntroRequest["status"]) {
    setBusyId(id);
    const res = await updateIntroStatus(id, next);
    setBusyId(null);
    if (!res.ok) {
      setStatus(res.error ?? "Could not update.");
      return;
    }
    setStatus(`Marked ${next}.`);
    await refresh();
  }

  if (!ready) {
    return <Card>Loading…</Card>;
  }

  if (!configured) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Setup needed</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          Pastor accounts aren't yet enabled.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          The platform maintainer needs to configure Supabase and run the pastor migration. See{" "}
          <Link href="/account" className="text-flame-700 hover:underline">
            /account
          </Link>{" "}
          for the one-time setup. Below is what the dashboard will look like once configured.
        </p>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Sign in to continue</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          A pastor's dashboard is gated behind sign-in.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          A passwordless email link, signed in once.
        </p>
        <Link
          href="/account"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 transition-colors"
        >
          Sign in →
        </Link>
      </Card>
    );
  }

  if (claims.length === 0) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Almost ready</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">Claim your church first.</h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          The dashboard fills with newcomer intros once you've told us which local body you serve.
        </p>
        <Link
          href="/connect/claim"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 transition-colors"
        >
          Claim a church →
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
          }}
        />
        <div className="relative flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300">
              Welcome, pastor
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">
              {counts.pending} newcomer{counts.pending === 1 ? "" : "s"} waiting.
            </h2>
            <p className="mt-2 text-sm text-ink-300 max-w-md">
              We hand you the names of believers who asked to meet a pastor in your city. Reply in
              your voice, in your week. Mark each one when you've reached out.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Mini label="Pending" value={String(counts.pending)} />
            <Mini label="Accepted" value={String(counts.accepted)} />
            <Mini label="Completed" value={String(counts.completed)} />
          </div>
        </div>
      </section>

      {/* My churches */}
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Routing
            </div>
            <h3 className="font-serif text-xl text-ink-900 mt-0.5">
              {claims.length} claimed church{claims.length === 1 ? "" : "es"}
            </h3>
          </div>
          <Link
            href="/connect/claim"
            className="text-xs text-flame-700 hover:underline"
          >
            Add another →
          </Link>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          {claims.map((c) => (
            <li
              key={c.id}
              className="rounded-full bg-card-subtle border border-ink-200 px-3 py-1 text-xs text-ink-700"
              title={`${c.church_name} · ${c.city}, ${c.country}`}
            >
              {c.church_name} <span className="text-ink-400">· {c.city}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 rounded-full bg-card-subtle border border-ink-200 p-1 w-fit">
        {(["pending", "accepted", "completed", "all"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={[
              "text-xs px-3 py-1.5 rounded-full transition-colors capitalize",
              tab === t ? "bg-ink-900 text-ink-50" : "text-ink-600 hover:text-ink-900",
            ].join(" ")}
          >
            {t} <span className="opacity-60">({counts[t]})</span>
          </button>
        ))}
      </div>

      {status && (
        <p className="text-xs text-ink-600" role="status">
          {status}
        </p>
      )}

      {/* Requests */}
      {loading ? (
        <Card>Loading requests…</Card>
      ) : filtered.length === 0 ? (
        <Card>
          <p className="text-sm text-ink-600 italic text-center py-6">
            {tab === "pending"
              ? "Nothing pending right now. Disciples will show up here when they ask for an intro."
              : `No ${tab} requests yet.`}
          </p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {filtered.map((r) => {
            const stage = r.stage ? findStage(r.stage) : null;
            const claim = r.target_claim_id
              ? claims.find((c) => c.id === r.target_claim_id)
              : null;
            return (
              <li key={r.id}>
                <article className="rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-flame-700">
                        {stage ? `Stage ${stage.stage} · ${stage.name}` : "Intro request"} ·{" "}
                        {fmtRelative(r.created_at)}
                      </div>
                      <h3 className="font-serif text-xl text-ink-900 mt-1">
                        {r.alias || "An anonymous believer"}
                      </h3>
                      <div className="text-xs text-ink-500 mt-0.5">
                        {claim ? (
                          <>To: {claim.church_name}</>
                        ) : r.target_city ? (
                          <>To: any pastor in {r.target_city}{r.target_country ? `, ${r.target_country}` : ""}</>
                        ) : (
                          <>To: any pastor in your area</>
                        )}
                      </div>
                    </div>
                    <StatusPill status={r.status} />
                  </div>

                  {r.note && (
                    <blockquote className="mt-3 border-l-2 border-flame-500/70 pl-3 italic text-sm text-ink-700">
                      "{r.note}"
                    </blockquote>
                  )}

                  {r.contact && (
                    <div className="mt-3 text-sm text-ink-700">
                      <span className="text-[10px] uppercase tracking-widest text-flame-700 mr-2">
                        Reach back
                      </span>
                      <a
                        href={`mailto:${r.contact}`}
                        className="text-flame-700 hover:underline break-all"
                      >
                        {r.contact}
                      </a>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.status === "pending" && (
                      <>
                        <button
                          onClick={() => setStatusFor(r.id, "accepted")}
                          disabled={busyId === r.id}
                          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500 disabled:opacity-50"
                        >
                          Accept · I'll reach back
                        </button>
                        <button
                          onClick={() => setStatusFor(r.id, "declined")}
                          disabled={busyId === r.id}
                          className="inline-flex items-center rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-500 hover:text-ink-900 hover:border-ink-900 disabled:opacity-50"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {r.status === "accepted" && (
                      <button
                        onClick={() => setStatusFor(r.id, "completed")}
                        disabled={busyId === r.id}
                        className="inline-flex items-center rounded-full bg-emerald-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-emerald-500 disabled:opacity-50"
                      >
                        Mark completed
                      </button>
                    )}
                    {r.status !== "pending" && (
                      <button
                        onClick={() => setStatusFor(r.id, "pending")}
                        disabled={busyId === r.id}
                        className="inline-flex items-center rounded-full border border-ink-300 px-4 py-1.5 text-sm text-ink-500 hover:text-ink-900 hover:border-ink-900 disabled:opacity-50"
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8 glow-ring">
      {children}
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-ink-800/40 border border-ink-700/60 px-3 py-2 text-center">
      <div className="text-[9px] uppercase tracking-widest text-flame-300/80">{label}</div>
      <div className="mt-0.5 font-serif text-xl text-ink-50">{value}</div>
    </div>
  );
}

function StatusPill({ status }: { status: IntroRequest["status"] }) {
  const colors: Record<IntroRequest["status"], string> = {
    pending: "bg-flame-100 text-flame-900",
    accepted: "bg-sky-100 text-sky-900",
    declined: "bg-ink-100 text-ink-700",
    completed: "bg-emerald-100 text-emerald-900",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${colors[status]}`}
    >
      {status}
    </span>
  );
}
