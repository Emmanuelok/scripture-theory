"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import {
  deleteRequest,
  flagRequest,
  listMyIntercessions,
  listMyRequests,
  listPrayedIds,
  listRequests,
  markAnswered,
  prayFor,
  submitRequest,
  validateBody,
  type PrayerRequest,
} from "@/lib/prayer-wall";
import { Glyph } from "@/components/ui/Glyph";

/* ──────────────────────────────────────────────────────────────────
   PrayerWall — two-way intercession across the global Body.

   Three tabs:
     • Intercede — feed of open requests; tap to pray for one
     • Post a request — short form, anonymous-by-default
     • My posts / my intercessions — personal history
────────────────────────────────────────────────────────────────── */

type Tab = "intercede" | "post" | "mine";

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
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function avatarColor(seed: string) {
  // Deterministic pastel from string
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 60% 45%)`;
}

export default function PrayerWall() {
  const { configured, ready, user } = useAuth();
  const [tab, setTab] = useState<Tab>("intercede");
  const [feed, setFeed] = useState<PrayerRequest[]>([]);
  const [mine, setMine] = useState<PrayerRequest[]>([]);
  const [intercessions, setIntercessions] = useState<
    { request: PrayerRequest; prayedAt: string }[]
  >([]);
  const [prayedIds, setPrayedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Submit form state
  const [body, setBody] = useState("");
  const [alias, setAlias] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [language, setLanguage] = useState("en");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Action state
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState("");

  useEffect(() => {
    if (!configured || !ready) {
      setLoading(false);
      return;
    }
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured, ready, user]);

  async function refresh() {
    setLoading(true);
    const [f, p] = await Promise.all([listRequests({ limit: 60 }), listPrayedIds()]);
    setFeed(f);
    setPrayedIds(p);
    if (user) {
      const [m, i] = await Promise.all([listMyRequests(), listMyIntercessions()]);
      setMine(m);
      setIntercessions(i);
    } else {
      setMine([]);
      setIntercessions([]);
    }
    setLoading(false);
  }

  async function onPray(requestId: string) {
    setBusyId(requestId);
    setActionStatus("");
    const res = await prayFor(requestId);
    setBusyId(null);
    if (!res.ok) {
      setActionStatus(res.error ?? "Could not record your prayer.");
      return;
    }
    // Optimistic-ish: update local feed
    setFeed((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, prayer_count: res.count ?? r.prayer_count + (prayedIds.has(r.id) ? 0 : 1) }
          : r
      )
    );
    setPrayedIds((prev) => new Set(prev).add(requestId));
    setActionStatus("Prayer recorded. He hears.");
  }

  async function onFlag(requestId: string) {
    const reason =
      typeof window !== "undefined"
        ? window.prompt("Briefly: why are you flagging this? (visible to moderators)")
        : null;
    if (!reason) return;
    setBusyId(requestId);
    const res = await flagRequest(requestId, reason);
    setBusyId(null);
    setActionStatus(res.ok ? "Thank you — flagged for review." : res.error ?? "Could not flag.");
    await refresh();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validateBody(body);
    if (!v.ok) {
      setSubmitStatus(v.error ?? "Invalid request.");
      return;
    }
    setSubmitting(true);
    setSubmitStatus("");
    const res = await submitRequest({
      body,
      alias: anonymous ? undefined : alias.trim() || undefined,
      anonymous,
      language,
    });
    setSubmitting(false);
    if (!res.ok) {
      setSubmitStatus(res.error ?? "Could not submit.");
      return;
    }
    setBody("");
    setAlias("");
    setSubmitStatus("Posted. Believers around the world will lift it up.");
    await refresh();
    setTab("mine");
  }

  async function onDelete(id: string) {
    if (typeof window !== "undefined" && !window.confirm("Delete this request?")) return;
    setBusyId(id);
    const res = await deleteRequest(id);
    setBusyId(null);
    if (!res.ok) setActionStatus(res.error ?? "Could not delete.");
    await refresh();
  }

  async function onAnswered(id: string) {
    setBusyId(id);
    const res = await markAnswered(id);
    setBusyId(null);
    if (!res.ok) setActionStatus(res.error ?? "Could not mark answered.");
    await refresh();
  }

  if (!ready) return <Card>Loading…</Card>;

  if (!configured) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Setup needed</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          The Prayer Wall needs cloud sync.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          This is the one corner of the platform that crosses devices — a believer in one city
          asks for prayer, another believer somewhere else lifts them up. It requires Supabase to
          be configured. See{" "}
          <Link href="/account" className="text-flame-700 hover:underline">
            /account
          </Link>{" "}
          for setup.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1.5 rounded-full bg-card-subtle border border-ink-200 p-1 w-fit">
        {([
          { id: "intercede", label: "Intercede" },
          { id: "post", label: "Post a request" },
          { id: "mine", label: "My posts" },
        ] as { id: Tab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={[
              "text-xs px-3 py-1.5 rounded-full transition-colors",
              tab === t.id ? "bg-ink-900 text-ink-50" : "text-ink-600 hover:text-ink-900",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {actionStatus && (
        <p className="text-xs text-ink-600" role="status">
          {actionStatus}
        </p>
      )}

      {tab === "intercede" && (
        <Intercede
          feed={feed}
          prayedIds={prayedIds}
          loading={loading}
          onPray={onPray}
          onFlag={onFlag}
          busyId={busyId}
          signedIn={!!user}
        />
      )}

      {tab === "post" && (
        <PostForm
          body={body}
          setBody={setBody}
          alias={alias}
          setAlias={setAlias}
          anonymous={anonymous}
          setAnonymous={setAnonymous}
          language={language}
          setLanguage={setLanguage}
          submitting={submitting}
          status={submitStatus}
          onSubmit={onSubmit}
          signedIn={!!user}
        />
      )}

      {tab === "mine" && (
        <Mine
          posts={mine}
          intercessions={intercessions}
          loading={loading}
          busyId={busyId}
          onDelete={onDelete}
          onAnswered={onAnswered}
          signedIn={!!user}
        />
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */

function Intercede({
  feed,
  prayedIds,
  loading,
  onPray,
  onFlag,
  busyId,
  signedIn,
}: {
  feed: PrayerRequest[];
  prayedIds: Set<string>;
  loading: boolean;
  onPray: (id: string) => void;
  onFlag: (id: string) => void;
  busyId: string | null;
  signedIn: boolean;
}) {
  if (loading) return <Card>Listening for requests…</Card>;
  if (feed.length === 0) {
    return (
      <Card>
        <p className="text-sm text-ink-600 italic text-center py-6">
          No open requests right now. Be the first to post — somewhere a believer is hungry to
          carry one prayer today.
        </p>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {!signedIn && (
        <div className="rounded-2xl border border-flame-200 bg-flame-50/60 p-4 text-sm text-flame-900">
          You're reading the wall. To <strong>pray for someone</strong> or post a request, sign in
          on{" "}
          <Link href="/account" className="underline">
            /account
          </Link>
          .
        </div>
      )}
      {feed.map((r) => (
        <RequestCard
          key={r.id}
          r={r}
          prayed={prayedIds.has(r.id)}
          onPray={() => onPray(r.id)}
          onFlag={() => onFlag(r.id)}
          busy={busyId === r.id}
          canPray={signedIn}
        />
      ))}
    </div>
  );
}

function RequestCard({
  r,
  prayed,
  onPray,
  onFlag,
  busy,
  canPray,
}: {
  r: PrayerRequest;
  prayed: boolean;
  onPray: () => void;
  onFlag: () => void;
  busy: boolean;
  canPray: boolean;
}) {
  const name = r.alias?.trim() || "Anonymous";
  const initial = (name[0] ?? "A").toUpperCase();
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-card p-5 md:p-6 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
      />
      <div className="relative flex items-start gap-3">
        <div
          className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-ink-50 font-serif text-lg"
          style={{ background: avatarColor(r.id) }}
          aria-hidden
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="font-serif text-ink-900">{name}</div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                {fmtRelative(r.created_at)} · {r.language.toUpperCase()}
                {r.status === "answered" && (
                  <span className="ml-2 text-emerald-700">Answered ✓</span>
                )}
              </div>
            </div>
            <button
              onClick={onFlag}
              disabled={busy}
              className="text-[10px] text-ink-400 hover:text-ink-700"
              title="Flag for moderation"
            >
              ⚑ flag
            </button>
          </div>
          <p className="mt-2 text-ink-800 leading-relaxed whitespace-pre-wrap">{r.body}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onPray}
              disabled={busy || !canPray || prayed}
              className={[
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors",
                prayed
                  ? "border border-flame-300 bg-flame-50 text-flame-700"
                  : canPray
                  ? "bg-flame-600 text-ink-50 hover:bg-flame-500"
                  : "border border-ink-200 bg-card-subtle text-ink-400",
              ].join(" ")}
              aria-pressed={prayed}
            >
              <Glyph id="hands" size={16} />
              {prayed ? "You prayed" : busy ? "…" : "Pray for this"}
            </button>
            <span className="text-xs text-ink-500">
              <strong className="text-ink-900">{r.prayer_count}</strong>{" "}
              {r.prayer_count === 1 ? "believer has" : "believers have"} prayed
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────────── */

function PostForm({
  body,
  setBody,
  alias,
  setAlias,
  anonymous,
  setAnonymous,
  language,
  setLanguage,
  submitting,
  status,
  onSubmit,
  signedIn,
}: {
  body: string;
  setBody: (v: string) => void;
  alias: string;
  setAlias: (v: string) => void;
  anonymous: boolean;
  setAnonymous: (v: boolean) => void;
  language: string;
  setLanguage: (v: string) => void;
  submitting: boolean;
  status: string;
  onSubmit: (e: React.FormEvent) => void;
  signedIn: boolean;
}) {
  if (!signedIn) {
    return (
      <Card>
        <div className="text-xs uppercase tracking-widest text-flame-700">Sign in to post</div>
        <h2 className="font-serif text-2xl text-ink-900 mt-1">
          A signed-in believer behind every request.
        </h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          The Wall stays prayerful by requiring sign-in. You can still post <strong>anonymously</strong>{" "}
          — we just need to know you're a real human believer, not a bot.
        </p>
        <Link
          href="/account"
          className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500"
        >
          Sign in →
        </Link>
      </Card>
    );
  }

  const remaining = 600 - body.length;
  return (
    <Card>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-flame-700">
            What do you want the Body to lift up?
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            maxLength={600}
            placeholder="My father is dying. Pray for peace at the bedside, and that he'd see Christ before he goes."
            className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-base text-ink-900 focus:outline-none focus:border-flame-500"
          />
          <div className="mt-1 text-[11px] text-ink-500 flex justify-between">
            <span>5–600 characters · keep it specific</span>
            <span className={remaining < 60 ? "text-flame-700" : ""}>{remaining} left</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-flame-700">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
              <option value="sw">Kiswahili</option>
              <option value="hi">हिन्दी</option>
              <option value="ar">العربية</option>
              <option value="zh">中文</option>
            </select>
          </label>

          {!anonymous && (
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-flame-700">
                Name to show (optional)
              </span>
              <input
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                maxLength={40}
                placeholder="Emma"
                className="mt-1.5 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
              />
            </label>
          )}
        </div>

        <label className="flex items-start gap-2 text-sm text-ink-700">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="mt-1"
          />
          <span>
            <strong className="text-ink-900">Post anonymously.</strong> Your post is unlinked from
            your account in the public feed. You'll still see it in "My posts," and only you can
            edit or delete it.
          </span>
        </label>

        {status && <p className="text-sm text-ink-600">{status}</p>}

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="submit"
            disabled={submitting || body.trim().length < 5}
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 disabled:opacity-50"
          >
            {submitting ? "Posting…" : "Post to the Wall"}
          </button>
          <p className="text-xs text-ink-500 self-center italic">
            "Bear one another's burdens, and so fulfill the law of Christ." — Gal 6:2
          </p>
        </div>
      </form>
    </Card>
  );
}

/* ──────────────────────────────────────────────────────────────── */

function Mine({
  posts,
  intercessions,
  loading,
  busyId,
  onDelete,
  onAnswered,
  signedIn,
}: {
  posts: PrayerRequest[];
  intercessions: { request: PrayerRequest; prayedAt: string }[];
  loading: boolean;
  busyId: string | null;
  onDelete: (id: string) => void;
  onAnswered: (id: string) => void;
  signedIn: boolean;
}) {
  if (!signedIn) {
    return (
      <Card>
        <p className="text-sm text-ink-700">
          Sign in to see your own posts and the requests you've prayed for.{" "}
          <Link href="/account" className="text-flame-700 hover:underline">
            /account
          </Link>
        </p>
      </Card>
    );
  }
  if (loading) return <Card>Loading…</Card>;

  return (
    <div className="space-y-8">
      <section>
        <h3 className="font-serif text-2xl text-ink-900 mb-3">Posts I've made</h3>
        {posts.length === 0 ? (
          <Card>
            <p className="text-sm text-ink-600 italic">
              You haven't posted yet. The Body is here when you're ready.
            </p>
          </Card>
        ) : (
          <ul className="space-y-3">
            {posts.map((r) => (
              <li
                key={r.id}
                className="rounded-3xl border border-ink-200 bg-card p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    {fmtRelative(r.created_at)} · {r.language.toUpperCase()}
                    {r.status === "answered" && (
                      <span className="ml-2 text-emerald-700">Answered ✓</span>
                    )}
                    {r.status === "hidden" && (
                      <span className="ml-2 text-ink-400">Hidden (under review)</span>
                    )}
                  </div>
                  <span className="text-xs text-ink-500">
                    <strong className="text-ink-900">{r.prayer_count}</strong> have prayed
                  </span>
                </div>
                <p className="mt-2 text-ink-800 leading-relaxed whitespace-pre-wrap">{r.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.status !== "answered" && (
                    <button
                      onClick={() => onAnswered(r.id)}
                      disabled={busyId === r.id}
                      className="text-xs rounded-full bg-emerald-600 text-ink-50 px-3 py-1 hover:bg-emerald-500 disabled:opacity-50"
                    >
                      Mark answered ✓
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(r.id)}
                    disabled={busyId === r.id}
                    className="text-xs rounded-full border border-ink-300 px-3 py-1 text-ink-500 hover:text-ink-900 hover:border-ink-900 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="font-serif text-2xl text-ink-900 mb-3">
          People I've lifted up{" "}
          <span className="text-sm text-ink-500 font-sans">({intercessions.length})</span>
        </h3>
        {intercessions.length === 0 ? (
          <Card>
            <p className="text-sm text-ink-600 italic">
              You haven't prayed for anyone on the Wall yet. Open the Intercede tab and carry one
              today.
            </p>
          </Card>
        ) : (
          <ul className="space-y-2">
            {intercessions.map(({ request, prayedAt }) => (
              <li
                key={request.id}
                className="rounded-2xl border border-ink-200 bg-card p-4"
              >
                <div className="flex items-baseline justify-between gap-2 text-[10px] uppercase tracking-widest text-flame-700">
                  <span>Prayed {fmtRelative(prayedAt)}</span>
                  <span>{request.status === "answered" ? "Answered ✓" : "Open"}</span>
                </div>
                <p className="mt-1 text-sm text-ink-800 leading-relaxed line-clamp-3">
                  {request.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
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
