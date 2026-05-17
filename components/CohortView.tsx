"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  getCohortByCode,
  leaveCohort,
  listCohortMembers,
  listCohortProgress,
  listCohortPrayers,
  postCohortPrayer,
  deleteCohortPrayer,
  setActiveCohortId,
  type Cohort,
  type CohortMember,
  type CohortPrayer,
  type CohortProgress,
} from "@/lib/cohorts";
import { COURSE_WEEKS } from "@/data/course";
import { useProfile } from "@/lib/profile";
import { Glyph } from "@/components/ui/Glyph";

function fmtRelative(iso: string) {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function CohortView({ code }: { code: string }) {
  const { user, ready } = useAuth();
  const { profile } = useProfile();
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [members, setMembers] = useState<CohortMember[]>([]);
  const [progress, setProgress] = useState<CohortProgress[]>([]);
  const [prayers, setPrayers] = useState<CohortPrayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const c = await getCohortByCode(code);
      if (cancelled) return;
      if (!c) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setCohort(c);
      setActiveCohortId(c.id);
      const [m, p, pr] = await Promise.all([
        listCohortMembers(c.id),
        listCohortProgress(c.id),
        listCohortPrayers(c.id),
      ]);
      if (cancelled) return;
      setMembers(m);
      setProgress(p);
      setPrayers(pr);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [code, ready]);

  const me = useMemo(
    () => (user ? members.find((m) => m.user_id === user.id) ?? null : null),
    [members, user]
  );
  const isLeader = cohort && user && cohort.leader_id === user.id;
  const myAlias = me?.alias || profile.name || profile.secretPlace?.alias || "Member";

  async function submitPrayer(body: string) {
    if (!cohort || !body.trim()) return;
    const np = await postCohortPrayer(cohort.id, myAlias, body);
    if (np) setPrayers((prev) => [np, ...prev]);
  }

  async function removePrayer(id: string) {
    const ok = await deleteCohortPrayer(id);
    if (ok) setPrayers((prev) => prev.filter((p) => p.id !== id));
  }

  async function leave() {
    if (!cohort) return;
    if (!confirm("Leave this cohort?")) return;
    const ok = await leaveCohort(cohort.id);
    if (ok && typeof window !== "undefined") {
      setActiveCohortId(null);
      window.location.href = "/cohort";
    }
  }

  if (!ready || loading) {
    return (
      <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
          Loading the cohort…
        </div>
      </section>
    );
  }

  if (notFound || !cohort) {
    return (
      <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
        <Link href="/cohort" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
          ← Cohorts
        </Link>
        <div className="mt-8 rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center">
          <h2 className="font-serif text-2xl text-ink-900">No cohort with that code.</h2>
          <p className="mt-2 text-sm text-ink-600">Check the spelling, or ask your leader for the link.</p>
        </div>
      </section>
    );
  }

  if (!user || !me) {
    return (
      <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
        <Link href="/cohort" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
          ← Cohorts
        </Link>
        <div className="mt-8 rounded-3xl border border-flame-300 bg-flame-50/40 p-6">
          <h2 className="font-serif text-xl text-ink-900">{cohort.name}</h2>
          <p className="mt-2 text-sm text-ink-700">
            {user ? "You're not a member of this cohort yet. " : "Sign in and "} join with the code{" "}
            <code className="font-mono text-flame-700">{cohort.code}</code>.
          </p>
          <Link
            href="/cohort"
            className="mt-3 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-500"
          >
            Go to cohorts →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/cohort" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Cohorts
      </Link>

      {/* Header */}
      <article className="mt-6 relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.18), transparent 60%)",
          }}
        />
        <div className="relative flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-flame-300">
              Cohort · code {cohort.code}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl mt-1 leading-tight">{cohort.name}</h1>
            {cohort.description && (
              <p className="mt-3 text-sm text-ink-300 leading-relaxed max-w-xl">
                {cohort.description}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-ink-300">
              {members.length} member{members.length === 1 ? "" : "s"}
            </div>
            {cohort.starts_on && (
              <div className="text-xs text-flame-300 mt-1">
                Started {new Date(cohort.starts_on).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Share + actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              navigator.clipboard.writeText(cohort.code).catch(() => {});
            }
          }}
          className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-700 hover:border-ink-900"
        >
          Copy code: {cohort.code}
        </button>
        <button
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.share) {
              navigator.share({
                title: `Join my Foundations cohort: ${cohort.name}`,
                text: `Join my Foundations of the Faith cohort. Use code: ${cohort.code}`,
                url: typeof window !== "undefined" ? `${window.location.origin}/cohort` : "/cohort",
              }).catch(() => {});
            }
          }}
          className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-700 hover:border-ink-900"
        >
          Share invite
        </button>
        <Link
          href="/course"
          className="text-xs rounded-full bg-flame-600 text-ink-50 px-3 py-1 hover:bg-flame-500"
        >
          Open Foundations →
        </Link>
        {!isLeader && (
          <button
            onClick={leave}
            className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-500 hover:text-red-600 hover:border-red-300 ml-auto"
          >
            Leave cohort
          </button>
        )}
      </div>

      {/* Members + progress grid */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink-900 mb-3">Walking together</h2>
        <p className="text-sm text-ink-600 italic mb-4">
          Each cell lights up when a member finishes a week of Foundations.
        </p>
        <ProgressGrid members={members} progress={progress} meId={user.id} />
      </section>

      {/* Prayer thread */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-ink-900 mb-1">Carry each other.</h2>
        <p className="text-sm text-ink-600 italic mb-4">
          One shared prayer thread. Short. Honest. You can always remove your own.
        </p>
        <PrayerComposer onSubmit={submitPrayer} alias={myAlias} />
        <PrayerThread prayers={prayers} meId={user.id} onDelete={removePrayer} />
      </section>
    </section>
  );
}

function ProgressGrid({
  members,
  progress,
  meId,
}: {
  members: CohortMember[];
  progress: CohortProgress[];
  meId: string;
}) {
  const byMember = useMemo(() => {
    const m = new Map<string, Set<number>>();
    for (const p of progress) {
      const s = m.get(p.user_id) ?? new Set<number>();
      s.add(p.week);
      m.set(p.user_id, s);
    }
    return m;
  }, [progress]);

  return (
    <div className="overflow-x-auto rounded-3xl border border-ink-200 bg-card">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            <th className="text-left p-3 font-serif text-ink-700 sticky left-0 bg-card z-10">
              Member
            </th>
            {COURSE_WEEKS.map((w) => (
              <th
                key={w.week}
                className="p-2 text-center text-[10px] uppercase tracking-widest text-flame-700 min-w-[36px]"
                title={w.title}
              >
                W{w.week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((mem) => {
            const done = byMember.get(mem.user_id) ?? new Set<number>();
            const isMe = mem.user_id === meId;
            return (
              <tr key={mem.id} className="border-b border-ink-100 last:border-0">
                <td
                  className={[
                    "p-3 font-serif sticky left-0 bg-card z-10",
                    isMe ? "text-flame-700" : "text-ink-900",
                  ].join(" ")}
                >
                  {mem.alias}
                  {mem.role === "leader" && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-flame-700">
                      leader
                    </span>
                  )}
                  {isMe && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-ink-400">
                      you
                    </span>
                  )}
                </td>
                {COURSE_WEEKS.map((w) => (
                  <td key={w.week} className="p-2 text-center">
                    {done.has(w.week) ? (
                      <span className="inline-block w-4 h-4 rounded-full bg-flame-500" title={`Week ${w.week} — ${w.title}`} />
                    ) : (
                      <span className="inline-block w-4 h-4 rounded-full bg-ink-100" />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PrayerComposer({
  onSubmit,
  alias,
}: {
  onSubmit: (body: string) => Promise<void> | void;
  alias: string;
}) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!body.trim()) return;
    setBusy(true);
    await onSubmit(body);
    setBusy(false);
    setBody("");
  }

  return (
    <div className="rounded-3xl border border-ink-200 bg-card p-5">
      <label className="text-[10px] uppercase tracking-widest text-flame-700">
        Share a prayer with the cohort · as {alias}
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        maxLength={600}
        placeholder="Short, honest. Three lines is plenty."
        className="mt-2 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={submit}
          disabled={busy || !body.trim()}
          className="rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-500 disabled:opacity-50"
        >
          {busy ? "Posting…" : "Post to cohort"}
        </button>
      </div>
    </div>
  );
}

function PrayerThread({
  prayers,
  meId,
  onDelete,
}: {
  prayers: CohortPrayer[];
  meId: string;
  onDelete: (id: string) => void;
}) {
  if (prayers.length === 0) {
    return (
      <div className="mt-4 rounded-3xl border border-ink-200 bg-card-subtle p-8 text-center">
        <Glyph id="dove" size={36} className="text-flame-700/40 mx-auto mb-2" />
        <p className="text-sm text-ink-600 italic">
          No prayers in the thread yet. Be the first to carry someone.
        </p>
      </div>
    );
  }
  return (
    <ul className="mt-5 space-y-3">
      {prayers.map((p) => (
        <li key={p.id} className="rounded-2xl border border-ink-200 bg-card p-5">
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              {p.alias} · {fmtRelative(p.created_at)}
            </div>
            {p.user_id === meId && (
              <button
                onClick={() => onDelete(p.id)}
                className="text-xs text-ink-400 hover:text-red-600"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-2 prose-scripture text-ink-800 whitespace-pre-wrap leading-relaxed">
            {p.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
