"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile, type Profile } from "@/lib/profile";
import { STAGES as PATH_STAGES, findStage } from "@/data/path";
import { Glyph, type GlyphId } from "@/components/ui/Glyph";

/* ──────────────────────────────────────────────────────────────────
   ForYouToday — pastoral, contextual nudges based on profile + time.

   Picks the 2–4 most relevant signals from the believer's on-device
   life: active fast in progress, current Path stage, examen owed
   tonight, neglected prayer-list names, healing prayers standing,
   disciples not heard from in two weeks, today's catechism Lord's
   Day, this week's memory verse, sermon notes from Sunday, marriage
   / parenting log streak, Sabbath approaching.

   This is the difference between "an app that shows you content" and
   "an app that knows where you are with the Lord today."
────────────────────────────────────────────────────────────────── */

type Variant = "active" | "nudge" | "encouragement";

type Signal = {
  id: string;
  priority: number;
  eyebrow: string;
  title: string;
  sub?: string;
  href: string;
  glyph: GlyphId;
  variant: Variant;
};

function daysSince(iso?: string) {
  if (!iso) return Infinity;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return Infinity;
  return Math.floor((Date.now() - t) / 86_400_000);
}

function todayIso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildSignals(profile: Profile, now: Date): Signal[] {
  const signals: Signal[] = [];
  const hour = now.getHours();
  const today = todayIso(now);
  const dow = now.getDay(); // 0=Sun

  // 1. Active fast — most urgent, surface always
  const activeFast = (profile.fasts ?? []).find((f) => !f.endedAt && !f.broken);
  if (activeFast) {
    const d = daysSince(activeFast.startedAt);
    signals.push({
      id: "fast",
      priority: 100,
      eyebrow: `Fast · day ${d + 1}`,
      title: activeFast.focus || "Fasting before Him",
      sub: activeFast.endsAt
        ? `Planned end: ${new Date(activeFast.endsAt).toLocaleString(undefined, { weekday: "short", hour: "numeric", minute: "2-digit" })}`
        : "Open to log a meditation or break the fast",
      href: "/fast",
      glyph: "fast",
      variant: "active",
    });
  }

  // 2. The Path — current stage + next step
  if (profile.path) {
    const completed = new Set(profile.path.completed ?? []);
    const current = PATH_STAGES.find((s) => !completed.has(s.stage));
    if (current) {
      signals.push({
        id: "path",
        priority: 80,
        eyebrow: `The Path · stage ${current.stage} of ${PATH_STAGES.length}`,
        title: current.name,
        sub: current.nextStep,
        href: current.href || "/disciple",
        glyph: current.glyph,
        variant: "active",
      });
    }
  }

  // 3. Active healing prayers — standing intercession
  const activeHealing = (profile.healing ?? []).filter(
    (h) => h.status === "praying" || h.status === "improving"
  );
  if (activeHealing.length > 0) {
    const next = activeHealing[0];
    signals.push({
      id: "heal",
      priority: 75,
      eyebrow: `Standing prayer · ${activeHealing.length} active`,
      title: `For ${next.who}: ${next.forWhat}`.slice(0, 80),
      sub: "Pray for the sick. Bold prayer, humble heart.",
      href: "/heal",
      glyph: "heal",
      variant: "active",
    });
  }

  // 4. Evening + no examen logged today
  const examenToday = (profile.examens ?? []).some((e) => e.date.startsWith(today));
  if (hour >= 19 && !examenToday) {
    signals.push({
      id: "examen",
      priority: 70,
      eyebrow: "It's evening · 5 minutes",
      title: "Close the day with Him",
      sub: "Thanksgiving · noticing · repentance · longing.",
      href: "/examen",
      glyph: "examen",
      variant: "nudge",
    });
  }

  // 5. Morning + offer the Daily Office (Lauds)
  if (hour >= 5 && hour < 11) {
    signals.push({
      id: "lauds",
      priority: 65,
      eyebrow: "It's morning · 5 minutes",
      title: "Give Him your first thought",
      sub: "Pray Lauds — Psalm 95 and the words of the day.",
      href: "/hours",
      glyph: "hours",
      variant: "nudge",
    });
  }

  // 6. People you pray for — anyone stale 7+ days
  const stale = (profile.prayingFor ?? []).filter((p) => {
    const last = p.prayedAt?.[p.prayedAt.length - 1] ?? p.addedAt;
    return daysSince(last) >= 7;
  });
  if (stale.length > 0) {
    signals.push({
      id: "stale-prayer",
      priority: 60,
      eyebrow: "Bring them up · quiet a while",
      title:
        stale.length === 1
          ? `${stale[0].name} hasn't been lifted up in a week`
          : `${stale.length} people in your list — quiet for a week`,
      sub: "He hears the small prayers.",
      href: "/pray",
      glyph: "hands",
      variant: "nudge",
    });
  }

  // 7. Disciples whose journey hasn't been touched in 14d
  const staleDisciples = (profile.disciples ?? []).filter((d) => {
    const lastEvent = d.events?.[d.events.length - 1];
    const last = lastEvent?.date ?? d.startedAt;
    return daysSince(last) >= 14;
  });
  if (staleDisciples.length > 0) {
    signals.push({
      id: "stale-disciples",
      priority: 55,
      eyebrow: "Journey · 2 weeks quiet",
      title:
        staleDisciples.length === 1
          ? `Pray for ${staleDisciples[0].name} today`
          : `${staleDisciples.length} people you walk with — silence is loud`,
      sub: "Add a log: pray, talk, study, share.",
      href: "/disciple/journey",
      glyph: "people",
      variant: "nudge",
    });
  }

  // 8. Forgiveness in progress (not released)
  const inProcess = (profile.forgiveness ?? []).filter((f) => !f.releasedAt);
  if (inProcess.length > 0) {
    signals.push({
      id: "forgiveness",
      priority: 50,
      eyebrow: "Walk it through",
      title: `${inProcess.length} ${inProcess.length === 1 ? "wound" : "wounds"} held — lay it down`,
      sub: "Christ paid the debt. You can hand it to Him.",
      href: "/forgive",
      glyph: "forgive",
      variant: "nudge",
    });
  }

  // 9. Sabbath approaching (Fri/Sat) if no plan set
  if ((dow === 5 || dow === 6) && !profile.sabbath?.day) {
    signals.push({
      id: "sabbath",
      priority: 45,
      eyebrow: "Sabbath is coming",
      title: "Plan it before the day arrives",
      sub: "One day in seven, stop. Choose when, what to stop, what to do instead.",
      href: "/sabbath",
      glyph: "sabbath",
      variant: "nudge",
    });
  }

  // 10. Marriage / parenting — gentle daily prompt
  if (profile.marriage?.partnerName) {
    const lastLogged = (profile.marriage.daysLogged ?? []).slice().sort().pop();
    if (!lastLogged || daysSince(lastLogged) >= 7) {
      signals.push({
        id: "marriage",
        priority: 42,
        eyebrow: "Marriage · pray your spouse",
        title: `Today, lift ${profile.marriage.partnerName}`,
        sub: "Seven daily themes — words, repentance, joy, sabbath, worship.",
        href: "/marriage",
        glyph: "rings",
        variant: "nudge",
      });
    }
  }
  if ((profile.parenting?.children ?? []).length > 0) {
    const lastLogged = (profile.parenting?.daysLogged ?? []).slice().sort().pop();
    if (!lastLogged || daysSince(lastLogged) >= 7) {
      const names = profile.parenting!.children!.map((c) => c.name).join(", ");
      signals.push({
        id: "parenting",
        priority: 41,
        eyebrow: "Parenting · by name",
        title: `Today, lift ${names}`,
        sub: "Their hearts, your example, their faith.",
        href: "/parenting",
        glyph: "tree",
        variant: "nudge",
      });
    }
  }

  // 11. Memory verse practice this week
  const memoryThisWeek = (profile.memory ?? []).find((m) => {
    if (!m.lastPracticedAt) return false;
    return daysSince(m.lastPracticedAt) < 7;
  });
  if (!memoryThisWeek && (profile.memory?.length ?? 0) > 0) {
    signals.push({
      id: "memory",
      priority: 40,
      eyebrow: "Hide the Word",
      title: "Practice a verse you've been learning",
      sub: "Read · first letters · blanks · recite.",
      href: "/memory",
      glyph: "memory",
      variant: "nudge",
    });
  }

  // 12. Pastor introduction pending — completion encouragement
  const pendingPastor = (profile.path?.events ?? []).filter(
    (e) => e.type === "pastor_request"
  ).length;
  const pastorConfirmed = profile.path?.pastorConfirmed?.length ?? 0;
  if (pendingPastor > pastorConfirmed) {
    signals.push({
      id: "pastor-followup",
      priority: 35,
      eyebrow: "Waiting on a pastor",
      title: "Follow up on your introduction",
      sub: "If no one has reached back, claim a church on /connect and try again.",
      href: "/connect",
      glyph: "house",
      variant: "encouragement",
    });
  }

  // 13. Encouragement — completed pieces of life
  if ((profile.secretPlace?.prayers ?? []).filter((p) => p.status === "answered").length > 0) {
    signals.push({
      id: "answered",
      priority: 25,
      eyebrow: "He hears",
      title: "Look back on answered prayers",
      sub: "Remembering builds faith forward.",
      href: "/secret-place",
      glyph: "lamp",
      variant: "encouragement",
    });
  }

  return signals.sort((a, b) => b.priority - a.priority);
}

export default function ForYouToday() {
  const { profile, mounted } = useProfile();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);

  const signals = useMemo(() => {
    if (!mounted || !now) return [];
    return buildSignals(profile, now).slice(0, 4);
  }, [profile, now, mounted]);

  if (!mounted || !now || signals.length === 0) return null;

  return (
    <section className="rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50/70 to-card p-6 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-flame-700">For you today</div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">
            Where the Spirit is moving in your life right now.
          </h2>
        </div>
        <p className="text-xs text-ink-500 italic max-w-[16ch]">
          Picked from your own walk — never a stream.
        </p>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3">
        {signals.map((s) => (
          <li key={s.id}>
            <Link
              href={s.href}
              className="group relative block h-full overflow-hidden rounded-2xl border border-ink-200 bg-card p-4 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_12px_36px_-16px_rgba(249,115,22,0.32)] transition-all"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
              />
              <span
                aria-hidden
                className={[
                  "absolute right-3 top-3 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3",
                  s.variant === "active"
                    ? "text-flame-700/40"
                    : s.variant === "encouragement"
                    ? "text-emerald-700/30"
                    : "text-flame-700/20",
                ].join(" ")}
              >
                <Glyph id={s.glyph} size={36} />
              </span>
              <div className="relative pr-10">
                <div
                  className={[
                    "text-[10px] uppercase tracking-widest",
                    s.variant === "active"
                      ? "text-flame-700"
                      : s.variant === "encouragement"
                      ? "text-emerald-700"
                      : "text-flame-700/80",
                  ].join(" ")}
                >
                  {s.eyebrow}
                </div>
                <div className="font-serif text-ink-900 mt-0.5 leading-snug">{s.title}</div>
                {s.sub && (
                  <p className="text-xs text-ink-600 mt-1 leading-relaxed">{s.sub}</p>
                )}
                <div className="mt-2 text-xs text-flame-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
