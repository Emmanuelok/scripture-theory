"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  daysSince,
  formatYesCount,
  getLocalPrayedSet,
  getMyYes,
  getTotalSouls,
  getYesCount,
  isCloudConfigured,
  listCloud,
  percentOfMillion,
  prayForYes,
  sayYes,
  updateMySouls,
  validateYes,
  type SendingYes,
} from "@/lib/sending-cloud";

/**
 * The Cloud of Witnesses (Hebrews 12:1) — visible "yes" wall for Project 1M.
 *
 * NOT a leaderboard. No rank. No competition. The aggregate count is the
 * encouragement; the recent yeses are the cloud. First-name + region only.
 *
 * Falls back to a quiet "coming soon" state when Supabase isn't configured,
 * so deploys without a backend still ship cleanly.
 */
export default function CloudOfWitnesses() {
  const [configured] = useState(() => isCloudConfigured());
  const [count, setCount] = useState<number | null>(null);
  const [souls, setSouls] = useState<number | null>(null);
  const [cloud, setCloud] = useState<SendingYes[]>([]);
  const [me, setMe] = useState<SendingYes | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [region, setRegion] = useState("");
  const [prayer, setPrayer] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Souls-walking editor
  const [editingSouls, setEditingSouls] = useState(false);
  const [soulsDraft, setSoulsDraft] = useState<string>("");
  const [savingSouls, setSavingSouls] = useState(false);

  // Wall · prayed-for set + pending state per yes id
  const [prayedSet, setPrayedSet] = useState<Set<string>>(new Set());
  const [prayingId, setPrayingId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!configured) {
      setLoading(false);
      return;
    }
    async function refresh() {
      const [c, s, list, mine] = await Promise.all([
        getYesCount(),
        getTotalSouls(),
        listCloud(120),
        getMyYes(),
      ]);
      if (cancelled) return;
      setCount(c);
      setSouls(s);
      setCloud(list);
      setMe(mine);
      setPrayedSet(getLocalPrayedSet());
      setLoading(false);
    }
    refresh();

    // Re-fetch when the tab regains focus so the wall stays fresh.
    function onVisibility() {
      if (document.visibilityState === "visible") {
        void refresh();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", refresh);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", refresh);
    };
  }, [configured]);

  async function liftUp(y: SendingYes) {
    if (prayedSet.has(y.id) || prayingId) return;
    setPrayingId(y.id);
    try {
      const res = await prayForYes(y.id);
      if (res.ok) {
        setPrayedSet((s) => {
          const next = new Set(s);
          next.add(y.id);
          return next;
        });
        // Reflect the new count in the wall
        setCloud((list) =>
          list.map((x) =>
            x.id === y.id ? { ...x, prayed_for_count: res.count ?? x.prayed_for_count + 1 } : x
          )
        );
      }
    } finally {
      setPrayingId(null);
    }
  }

  async function saveSouls() {
    if (!me) return;
    const n = Math.max(0, Math.min(10000, parseInt(soulsDraft, 10) || 0));
    setSavingSouls(true);
    try {
      const updated = await updateMySouls(n);
      if (updated) {
        const diff = updated.souls_walking_with - me.souls_walking_with;
        setMe(updated);
        setSouls((s) => (s ?? 0) + diff);
        setEditingSouls(false);
      }
    } finally {
      setSavingSouls(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validateYes({ firstName, region, prayer });
    if (!v.ok) {
      setError(v.error ?? "Please check the fields above.");
      return;
    }
    setSubmitting(true);
    try {
      const row = await sayYes({ firstName, region, prayer, isPublic });
      if (!row) {
        setError("Could not register your yes. Please try again in a moment.");
        return;
      }
      setMe(row);
      setCount((c) => (c ?? 0) + 1);
      if (row.public) setCloud((list) => [row, ...list].slice(0, 60));
      setFirstName("");
      setRegion("");
      setPrayer("");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Not-yet-configured fallback ────────────────────────────────
  if (!configured) {
    return (
      <section className="rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          The cloud of witnesses · Hebrews 12:1
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          A wall of yeses, when the cloud is online.
        </h2>
        <p className="mt-3 text-sm text-ink-700 leading-relaxed max-w-3xl">
          Once the platform&apos;s database is configured, this section will hold a
          live registry of believers who have prayed the Acts 1:8 yes — first
          name and country only, never last names, never any data that could
          expose a brother or sister in a hostile place. The headline is the
          aggregate; the wall is the encouragement. For now, pray your yes;
          the cloud will gather them.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-flame-700">
          The cloud of witnesses · Hebrews 12:1
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mt-1">
          Believers who have said yes.
        </h2>
        <p className="mt-3 text-sm text-ink-700 leading-relaxed max-w-2xl">
          Not a leaderboard. Not a stat to brag about. A &ldquo;great cloud of
          witnesses&rdquo; (Hebrews 12:1) — visible only so the next believer
          sees the cloud and is emboldened to add their amen. First names and
          countries only; no comparison, no rank.
        </p>
      </div>

      {/* Two-count headline — evangelists + souls being walked with */}
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-flame-300 bg-ink-900 text-ink-50 px-5 py-4 text-center">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            Said yes so far
          </div>
          <div className="font-serif text-flame-100 text-4xl md:text-5xl mt-1 leading-none tabular-nums">
            {loading ? "…" : formatYesCount(count ?? 0)}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-flame-300/80">
            evangelists · toward 1,000,000
          </div>
        </div>
        <div className="rounded-2xl border border-flame-300 bg-ink-900 text-ink-50 px-5 py-4 text-center">
          <div className="text-[10px] uppercase tracking-widest text-flame-300">
            Souls being walked with
          </div>
          <div className="font-serif text-flame-100 text-4xl md:text-5xl mt-1 leading-none tabular-nums">
            {loading ? "…" : formatYesCount(souls ?? 0)}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-flame-300/80">
            self-reported · the Lord saves
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-ink-600 italic leading-relaxed">
        Our prayer: one million evangelists, each walking with at least one soul toward
        Jesus — that is the harvest of Project 1M. The Lord of the harvest brings the
        increase; we walk.
      </p>

      {/* Progress bar — capped, no false growth */}
      <div className="mt-5 mb-6">
        <div className="h-2 rounded-full bg-ink-200/70 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-flame-300 via-flame-500 to-flame-300 transition-all duration-700"
            style={{ width: `${percentOfMillion(count ?? 0)}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-widest text-ink-500">
          <span>{loading ? "…" : `${percentOfMillion(count ?? 0).toFixed(4)}% of 1M evangelists`}</span>
          <span>1,000,000</span>
        </div>
      </div>

      {/* Already-said state, or the form */}
      {me ? (
        <div className="rounded-2xl border border-flame-300 bg-card p-5 md:p-6">
          <div className="text-xs uppercase tracking-widest text-flame-700">You said yes</div>
          <p className="mt-2 font-serif text-lg text-ink-900">
            <span className="text-flame-700">{me.first_name}</span> · {me.region}
          </p>
          {me.prayer && (
            <p className="mt-2 italic text-ink-700 leading-relaxed border-l-2 border-flame-300 pl-3">
              &ldquo;{me.prayer}&rdquo;
            </p>
          )}
          <p className="mt-3 text-[11px] text-ink-500 italic">
            Recorded {new Date(me.said_yes_at).toLocaleDateString()} · welcome to the cloud.
          </p>

          <div className="mt-4">
            <Link
              href="/sending/begin"
              className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-xs hover:bg-flame-700"
            >
              Walk your first week →
            </Link>
          </div>

          {/* Souls editor */}
          <div className="mt-5 pt-4 border-t border-ink-100">
            <div className="text-xs uppercase tracking-widest text-flame-700">
              Souls you are walking with
            </div>
            {!editingSouls ? (
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <span className="font-serif text-3xl text-ink-900 tabular-nums">
                    {me.souls_walking_with}
                  </span>
                  <span className="ml-2 text-sm text-ink-600">
                    {me.souls_walking_with === 1 ? "soul" : "souls"} you are praying for, studying with, or witnessing to.
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSoulsDraft(String(me.souls_walking_with));
                    setEditingSouls(true);
                  }}
                  className="rounded-full border border-ink-300 bg-card px-3 py-1 text-xs text-ink-700 hover:border-flame-500 hover:text-flame-700"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    value={soulsDraft}
                    onChange={(e) => setSoulsDraft(e.target.value)}
                    className="w-24 rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
                  />
                  <span className="text-sm text-ink-600">souls walking with you</span>
                </label>
                <button
                  onClick={saveSouls}
                  disabled={savingSouls}
                  className="rounded-full bg-flame-600 text-ink-50 px-3 py-1.5 text-xs hover:bg-flame-700 disabled:opacity-60"
                >
                  {savingSouls ? "Saving…" : "Save"}
                </button>
                <button
                  onClick={() => setEditingSouls(false)}
                  className="rounded-full border border-ink-300 bg-card px-3 py-1.5 text-xs text-ink-600 hover:border-ink-900"
                >
                  Cancel
                </button>
              </div>
            )}
            <p className="mt-2 text-[11px] text-ink-500 italic leading-relaxed">
              These are people you are praying for or walking with toward Jesus — not
              &ldquo;won&rdquo; or &ldquo;converted.&rdquo; The Lord saves. We walk. Update
              gently as the Spirit grows the harvest in front of you.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="rounded-2xl border border-ink-200 bg-card p-5 md:p-6">
          <div className="text-xs uppercase tracking-widest text-flame-700">
            Say yes — add your amen to the cloud
          </div>
          <p className="mt-2 text-sm text-ink-700 leading-relaxed">
            Not a sign-up. A covenant. You are saying: <em>I am willing to be sent.</em>
          </p>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-ink-500">First name</span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                maxLength={32}
                placeholder="Mary"
                required
                className="mt-1 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
              />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-widest text-ink-500">Country / region</span>
              <input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                maxLength={64}
                placeholder="Kenya"
                required
                className="mt-1 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
              />
            </label>
          </div>
          <label className="block mt-3">
            <span className="text-[11px] uppercase tracking-widest text-ink-500">
              Your prayer or sentence{" "}
              <span className="lowercase tracking-normal text-ink-400">— optional, max 280 chars</span>
            </span>
            <textarea
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              maxLength={280}
              rows={2}
              placeholder="Lord, send me. Make me brave with Your name."
              className="mt-1 w-full rounded-xl border border-ink-200 bg-card-subtle px-3 py-2 text-sm text-ink-900 leading-relaxed focus:outline-none focus:border-flame-500"
            />
            <div className="mt-1 text-[10px] text-ink-400 text-right">{prayer.length}/280</div>
          </label>
          <label className="mt-3 flex items-start gap-2 text-xs text-ink-600">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              Show my first name &amp; country on the public wall (uncheck if you live somewhere
              following Jesus is dangerous — your yes still counts).
            </span>
          </label>
          {error && (
            <p className="mt-3 text-xs text-amber-700 italic">{error}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 disabled:opacity-60"
          >
            {submitting ? "Recording…" : "Say my yes →"}
          </button>
          <p className="mt-3 text-[10px] text-ink-400 italic leading-relaxed">
            No last names. No emails. No tracking. Your yes is a covenant, not a contact form.
          </p>
        </form>
      )}

      {/* The Wall of Yeses — every yes shown as a card, with prayer lift */}
      {(() => {
        if (cloud.length === 0) {
          return (
            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest text-flame-700">
                The Wall of Yeses
              </div>
              <p className="mt-3 text-sm text-ink-600 italic">
                The cloud is gathering. Be among the first to say yes.
              </p>
            </div>
          );
        }
        const newWeek = cloud.filter((y) => daysSince(y.said_yes_at) <= 7);
        const older = cloud.filter((y) => daysSince(y.said_yes_at) > 7);
        const olderShown = showAll ? older : older.slice(0, Math.max(0, 24 - newWeek.length));
        return (
          <>
            {newWeek.length > 0 && (
              <div className="mt-8">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-flame-700">
                      Just said yes this week · lift them up
                    </div>
                    <p className="mt-1 text-sm text-ink-700 italic max-w-2xl">
                      The new evangelists, the just-stepped-out, the still-finding-their-feet.
                      Pray for one of them right now — even if you do not know their face.
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-flame-700">
                    {newWeek.length} this week
                  </span>
                </div>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {newWeek.map((y) => (
                    <YesCard
                      key={y.id}
                      y={y}
                      prayed={prayedSet.has(y.id)}
                      pending={prayingId === y.id}
                      onPray={() => liftUp(y)}
                      isFresh
                    />
                  ))}
                </ul>
              </div>
            )}

            {older.length > 0 && (
              <div className="mt-8">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <div className="text-xs uppercase tracking-widest text-flame-700">
                    The Wall of Yeses · the cloud
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-ink-500">
                    {older.length} {older.length === 1 ? "voice" : "voices"}
                  </span>
                </div>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {olderShown.map((y) => (
                    <YesCard
                      key={y.id}
                      y={y}
                      prayed={prayedSet.has(y.id)}
                      pending={prayingId === y.id}
                      onPray={() => liftUp(y)}
                    />
                  ))}
                </ul>
                {!showAll && older.length > olderShown.length && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setShowAll(true)}
                      className="rounded-full border border-ink-300 bg-card px-4 py-2 text-sm text-ink-700 hover:border-flame-500 hover:text-flame-700"
                    >
                      Show all {older.length} →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        );
      })()}

      <p className="mt-8 text-[11px] text-ink-500 italic leading-relaxed">
        Privacy: first names and countries only. No last names, no emails, no street-level
        location, ever. The &ldquo;lifted up in prayer&rdquo; count is anonymous — a quiet
        encouragement to the believer, not a vote tally.
      </p>
    </section>
  );
}

/* ───────────── One yes — the wall card ───────────── */

function YesCard({
  y,
  prayed,
  pending,
  onPray,
  isFresh,
}: {
  y: SendingYes;
  prayed: boolean;
  pending: boolean;
  onPray: () => void;
  isFresh?: boolean;
}) {
  const days = daysSince(y.said_yes_at);
  const ago =
    days === 0 ? "today"
    : days === 1 ? "yesterday"
    : days < 7 ? `${days} days ago`
    : days < 30 ? `${Math.floor(days / 7)} weeks ago`
    : days < 365 ? `${Math.floor(days / 30)} months ago`
    : `${Math.floor(days / 365)} years ago`;
  return (
    <li
      className={`rounded-2xl border bg-card p-4 flex flex-col transition-all ${
        isFresh
          ? "border-flame-400/70 bg-gradient-to-br from-flame-50/70 to-card"
          : "border-ink-200 hover:border-flame-400/50"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <div className="font-serif text-lg text-ink-900 truncate">{y.first_name}</div>
          <div className="text-xs text-ink-500 truncate">{y.region}</div>
        </div>
        {isFresh && (
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-flame-600 text-ink-50 px-2 py-0.5 text-[9px] uppercase tracking-widest">
            <span className="h-1 w-1 rounded-full bg-ink-50 animate-pulse" />
            New
          </span>
        )}
      </div>
      {y.prayer && (
        <p className="mt-2 text-sm text-ink-700 italic leading-relaxed border-l-2 border-flame-300 pl-3 line-clamp-3">
          &ldquo;{y.prayer}&rdquo;
        </p>
      )}
      <div className="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between gap-2">
        <div className="text-[10px] uppercase tracking-widest text-ink-500">
          said yes {ago}
          {y.prayed_for_count > 0 && (
            <> · lifted up {y.prayed_for_count}{y.prayed_for_count === 1 ? "" : "×"}</>
          )}
        </div>
        {prayed ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-1 text-[10px] uppercase tracking-widest">
            ✓ prayed
          </span>
        ) : (
          <button
            onClick={onPray}
            disabled={pending}
            className="inline-flex items-center gap-1 rounded-full bg-flame-600 hover:bg-flame-700 text-ink-50 px-3 py-1 text-[11px] disabled:opacity-60"
            aria-label={`Lift up ${y.first_name} in prayer`}
          >
            {pending ? "…" : "Lift up in prayer"}
          </button>
        )}
      </div>
    </li>
  );
}
