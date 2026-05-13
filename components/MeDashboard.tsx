"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useProfile, stageInfo, type Profile } from "@/lib/profile";
import { readingPlans } from "@/data/readings";
import { localizedPlan } from "@/data/readings-i18n";
import { locales, type LocaleCode } from "@/data/gospel-i18n";
import { findNation } from "@/data/nations";
import { flagEmoji } from "@/lib/flags";
import { useAuth } from "@/lib/auth";
import { STAGES as PATH_STAGES } from "@/data/path";
import { COURSE_WEEKS } from "@/data/course";
import { slotKey, SLOT_CHANGE_EVENT } from "@/lib/slots";
import ProfileSwitcher from "@/components/ProfileSwitcher";

// Per-slot bases (each slot has its own row in localStorage)
const PER_SLOT_BASES = [
  "scripture-theory-profile",
  "scripture-theory-progress",
  "scripture-theory-bible-marks",
  "scripture-theory-firstdays",
  "scripture-theory-last-read",
];

// Global keys (one copy per device)
const GLOBAL_KEYS = [
  "scripture-theory-locale",
  "scripture-theory-theme",
  "scripture-theory-translation",
  "scripture-theory-reader",
  "scripture-theory-a11y",
  "scripture-theory-slots",
  "scripture-theory-active-slot",
];

type PlanProgress = Record<string, number[]>;

type BibleMarks = {
  highlights?: string[];
  bookmarks?: string[];
  notes?: Record<string, string>;
};

function daysBetween(isoStart?: string) {
  if (!isoStart) return 0;
  const start = new Date(isoStart).getTime();
  if (Number.isNaN(start)) return 0;
  const diff = Date.now() - start;
  return Math.max(0, Math.floor(diff / 86_400_000));
}

function fmtDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function fmtRelative(iso?: string) {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const diff = Date.now() - then;
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function uniqueDates(iso: string[] | undefined) {
  if (!iso?.length) return 0;
  const set = new Set(iso.map((s) => s.slice(0, 10)));
  return set.size;
}

export default function MeDashboard() {
  const { profile, update, mounted } = useProfile();
  const [planProgress, setPlanProgress] = useState<PlanProgress>({});
  const [bibleMarks, setBibleMarks] = useState<BibleMarks>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    function refresh() {
      try {
        const p = window.localStorage.getItem(slotKey("scripture-theory-progress"));
        setPlanProgress(p ? JSON.parse(p) : {});
      } catch {
        setPlanProgress({});
      }
      try {
        const m = window.localStorage.getItem(slotKey("scripture-theory-bible-marks"));
        setBibleMarks(m ? JSON.parse(m) : {});
      } catch {
        setBibleMarks({});
      }
    }
    refresh();
    const onSlot = () => refresh();
    window.addEventListener(SLOT_CHANGE_EVENT, onSlot);
    return () => window.removeEventListener(SLOT_CHANGE_EVENT, onSlot);
  }, [mounted]);

  const stats = useMemo(
    () => buildStats(profile, planProgress, bibleMarks),
    [profile, planProgress, bibleMarks]
  );

  if (!mounted) {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
        Opening your inner room…
      </div>
    );
  }

  const locale = (profile.locale ?? "en") as LocaleCode;
  const dir = locales[locale].meta.dir;
  const sp = profile.secretPlace;
  const displayName = profile.name?.trim() || sp?.alias?.trim();
  const stage = profile.stage;
  const stageMeta = stage ? stageInfo[stage] : undefined;
  const journeyDays = daysBetween(profile.startedAt ?? sp?.startedAt);
  const adopted = profile.adoptedNationIso ? findNation(profile.adoptedNationIso) : undefined;

  return (
    <div className="space-y-6" dir={dir}>
      <HeroHeader
        name={displayName}
        stageLabel={stageMeta?.label}
        journeyDays={journeyDays}
        season={sp?.season}
        anchorVerse={sp?.anchorVerse}
        anchorRef={sp?.anchorRef}
        onRename={(next) => update({ name: next.trim() || undefined })}
      />

      <StatGrid stats={stats} />

      <SignInBanner />

      <CourseCard profile={profile} />

      <PathCard profile={profile} />

      <SecretPlaceCard profile={profile} />

      <ReadingPlansCard locale={locale} progress={planProgress} />

      <PrayerLifeCard profile={profile} />

      <PracticesCard profile={profile} />

      <FormationCard profile={profile} />

      <FamilyCard profile={profile} />

      <NationsCard profile={profile} adoptedName={adopted?.name} adoptedIso={adopted?.iso} />

      <BibleMarksCard marks={bibleMarks} />

      <BackupCard />

      <FooterNote />
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */

function HeroHeader({
  name,
  stageLabel,
  journeyDays,
  season,
  anchorVerse,
  anchorRef,
  onRename,
}: {
  name?: string;
  stageLabel?: string;
  journeyDays: number;
  season?: string;
  anchorVerse?: string;
  anchorRef?: string;
  onRename: (next: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name ?? "");

  useEffect(() => {
    setDraft(name ?? "");
  }, [name]);

  function commit() {
    onRename(draft);
    setEditing(false);
  }

  return (
    <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="text-xs uppercase tracking-widest text-flame-300">
          My walk with Jesus · on this device only
        </div>
        <ProfileSwitcher variant="hero" />
      </div>
      {editing ? (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setDraft(name ?? "");
                setEditing(false);
              }
            }}
            maxLength={40}
            autoFocus
            placeholder="What may we call you?"
            className="font-serif text-2xl md:text-3xl bg-ink-800 border border-ink-700 rounded-xl px-3 py-1.5 text-ink-50 focus:outline-none focus:border-flame-500"
          />
          <button
            onClick={commit}
            className="rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
          >
            Save
          </button>
          <button
            onClick={() => {
              setDraft(name ?? "");
              setEditing(false);
            }}
            className="text-sm text-ink-300 hover:text-ink-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <h1 className="font-serif text-3xl md:text-4xl mt-2 flex flex-wrap items-baseline gap-3">
          <span>{name ? `Hello, ${name}.` : "Welcome back."}</span>
          <button
            onClick={() => setEditing(true)}
            className="text-xs uppercase tracking-widest text-flame-300 hover:text-flame-200"
          >
            {name ? "Rename" : "Add your name"}
          </button>
        </h1>
      )}
      <p className="mt-2 text-sm text-ink-300 max-w-2xl leading-relaxed">
        {stageLabel ? `${stageLabel}.` : "A quiet record of where He has walked with you."}{" "}
        {journeyDays > 0 && (
          <span>
            Day <strong className="text-ink-50">{journeyDays}</strong> of journeying with us.
          </span>
        )}
      </p>
      {anchorVerse && (
        <blockquote className="mt-5 border-l-2 border-flame-500 pl-4 italic text-ink-100 max-w-2xl">
          "{anchorVerse}"
          {anchorRef && <span className="block not-italic text-xs text-ink-300 mt-1">— {anchorRef}</span>}
        </blockquote>
      )}
      {season && (
        <div className="mt-4 inline-flex items-center rounded-full bg-ink-800 px-3 py-1 text-xs uppercase tracking-widest text-flame-300">
          Season: {season}
        </div>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */

type Stat = { label: string; value: string | number; sub?: string; href?: string };

function buildStats(profile: Profile, plans: PlanProgress, marks: BibleMarks): Stat[] {
  const totalChaptersRead = Object.values(plans).reduce((acc, arr) => acc + (arr?.length ?? 0), 0);
  const memoryCount = profile.memory?.length ?? 0;
  const mastered = profile.memory?.filter((m) => m.level === "mastered").length ?? 0;
  const prayingForCount = profile.prayingFor?.length ?? 0;
  const prayersCount = (profile.prayingFor ?? []).reduce(
    (acc, r) => acc + (r.prayedAt?.length ?? 0),
    0
  );
  const journalCount = profile.secretPlace?.entries?.length ?? 0;
  const answeredPrayers = (profile.secretPlace?.prayers ?? []).filter((p) => p.status === "answered").length;
  const fastCount = profile.fasts?.length ?? 0;
  const examenCount = profile.examens?.length ?? 0;
  const nationsPrayed = uniqueDates(profile.nationsPrayed?.map((n) => n.date));
  const disciplesCount = profile.disciples?.length ?? 0;
  const sermonsCount = profile.sermons?.length ?? 0;
  const highlightsCount = marks.highlights?.length ?? 0;
  const notesCount = Object.keys(marks.notes ?? {}).length;
  const catechismProgress = profile.catechismProgress?.length ?? 0;
  const pathDone = profile.path?.completed?.length ?? 0;

  return [
    { label: "The Path", value: `${pathDone}/${PATH_STAGES.length}`, sub: "stages walked", href: "/disciple" },
    {
      label: "Foundations",
      value: `${profile.course?.weeksComplete?.length ?? 0}/${COURSE_WEEKS.length}`,
      sub: profile.course?.passed ? "certified ✓" : "weeks complete",
      href: "/course",
    },
    { label: "Chapters read", value: totalChaptersRead, sub: "across plans", href: "/read" },
    { label: "Verses memorized", value: memoryCount, sub: `${mastered} mastered`, href: "/memory" },
    { label: "People I pray for", value: prayingForCount, sub: `${prayersCount} prayers offered`, href: "/pray" },
    { label: "Journal entries", value: journalCount, sub: "in the Secret Place", href: "/secret-place" },
    { label: "Prayers answered", value: answeredPrayers, sub: "He hears", href: "/secret-place" },
    { label: "Fasts kept", value: fastCount, sub: "before Him", href: "/fast" },
    { label: "Examens", value: examenCount, sub: "end-of-day reviews", href: "/examen" },
    { label: "Nations prayed for", value: nationsPrayed, sub: "distinct days", href: "/pray/nations" },
    { label: "Disciples walking", value: disciplesCount, sub: "people I'm with", href: "/disciple/journey" },
    { label: "Bible highlights", value: highlightsCount, sub: `${notesCount} notes`, href: "/bible" },
    { label: "Catechism", value: `${catechismProgress}/52`, sub: "Lord's Days", href: "/catechism" },
  ];
}

function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {stats.map((s) =>
        s.href ? (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
          >
            <StatBody {...s} />
          </Link>
        ) : (
          <div key={s.label} className="rounded-2xl border border-ink-200 bg-card p-4">
            <StatBody {...s} />
          </div>
        )
      )}
    </section>
  );
}

function StatBody({ label, value, sub }: Stat) {
  return (
    <>
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-2xl text-ink-900 mt-1">{value}</div>
      {sub && <div className="text-xs text-ink-500 mt-0.5">{sub}</div>}
    </>
  );
}

/* ────────────────────────────────────────────────────────── */

function CourseCard({ profile }: { profile: Profile }) {
  const course = profile.course;
  const done = new Set(course?.weeksComplete ?? []);
  const total = COURSE_WEEKS.length;
  const completeCount = done.size;
  const pct = Math.round((completeCount / total) * 100);

  const next = COURSE_WEEKS.find((w) => !done.has(w.week));
  const allWeeksDone = completeCount === total;

  // Empty state — hide unless they've at least opened week 1 or completed something
  if (completeCount === 0 && !course) return null;

  const targetHref = course?.passed
    ? "/course/certificate"
    : allWeeksDone
    ? "/course/exam"
    : next
    ? `/course/week/${next.week}`
    : "/course";

  const label = course?.passed
    ? "Certificate earned · open"
    : allWeeksDone
    ? "Take the final exam"
    : next
    ? `Continue Week ${next.week}`
    : "Open course";

  return (
    <Link
      href={targetHref}
      className="group relative block overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 md:p-7 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
      />
      <div className="relative">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Foundations of the Faith
            </div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
              {course?.passed
                ? "Course complete · certificate earned"
                : allWeeksDone
                ? "All twelve weeks done — exam awaits"
                : next
                ? `Week ${next.week} · ${next.title}`
                : "Begin"}
            </h2>
            {next && !allWeeksDone && (
              <p className="text-sm text-ink-600 mt-1 leading-relaxed">{next.tagline}</p>
            )}
          </div>
          <span className="text-xs text-flame-700 shrink-0">{label} →</span>
        </div>

        {/* Twelve-week strip */}
        <ol className="mt-5 grid grid-cols-12 gap-1.5">
          {COURSE_WEEKS.map((w) => {
            const isDone = done.has(w.week);
            const isCurrent = next?.week === w.week;
            return (
              <li key={w.week}>
                <div
                  className={[
                    "h-2 rounded-full",
                    isDone
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
                      : isCurrent
                      ? "bg-flame-300"
                      : "bg-ink-200",
                  ].join(" ")}
                  title={`Week ${w.week} · ${w.title}${isDone ? " (complete)" : ""}`}
                />
              </li>
            );
          })}
        </ol>
        <div className="mt-2 text-xs text-ink-500">
          {completeCount} of {total} weeks · {pct}%
          {course?.examScore != null && (
            <span> · Exam best: {course.examScore}/24</span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ────────────────────────────────────────────────────────── */

function PathCard({ profile }: { profile: Profile }) {
  const path = profile.path;
  const completed = new Set(path?.completed ?? []);
  const pastorConfirmed = new Set(path?.pastorConfirmed ?? []);
  const total = PATH_STAGES.length;
  const done = completed.size;
  const pct = Math.round((done / total) * 100);

  const current = PATH_STAGES.find((s) => !completed.has(s.stage));
  const lastCompletedIso = path?.completedAt
    ? Object.values(path.completedAt).sort().reverse()[0]
    : undefined;

  // Empty state — haven't started
  if (done === 0 && !current) {
    return null;
  }

  return (
    <Link
      href="/disciple"
      className="group relative block overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 md:p-7 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/40 to-transparent"
      />
      <div className="relative">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">The Path</div>
            <h2 className="font-serif text-2xl text-ink-900 mt-1 group-hover:text-flame-700 transition-colors">
              {current
                ? <>Stage {current.stage} · {current.name}</>
                : "All twelve stages walked"}
            </h2>
            {current && (
              <p className="text-sm text-ink-600 mt-1 leading-relaxed">
                Next: {current.nextStep}
              </p>
            )}
          </div>
          <span className="text-xs text-flame-700">Open The Path →</span>
        </div>

        {/* Dotted stage strip */}
        <ol className="mt-5 grid grid-cols-12 gap-1.5">
          {PATH_STAGES.map((s) => {
            const isDone = completed.has(s.stage);
            const isCurrent = current?.stage === s.stage;
            const isConf = pastorConfirmed.has(s.stage);
            return (
              <li key={s.stage} className="relative">
                <div
                  className={[
                    "h-2 rounded-full",
                    isDone
                      ? "bg-gradient-to-r from-flame-500 to-flame-300"
                      : isCurrent
                      ? "bg-flame-300"
                      : "bg-ink-200",
                  ].join(" ")}
                  title={`Stage ${s.stage} · ${s.name}${isDone ? " (complete)" : ""}${isConf ? " · pastor-confirmed" : ""}`}
                />
                {isConf && (
                  <span
                    aria-hidden
                    className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-flame-600"
                  />
                )}
              </li>
            );
          })}
        </ol>
        <div className="mt-2 flex items-baseline justify-between text-xs text-ink-500">
          <span>
            {done} of {total} stages · {pct}%
          </span>
          {lastCompletedIso && <span>Last marked {fmtRelative(lastCompletedIso)}</span>}
        </div>
      </div>
    </Link>
  );
}

/* ────────────────────────────────────────────────────────── */

function SectionCard({
  eyebrow,
  title,
  href,
  hrefLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">{eyebrow}</div>
          <h2 className="font-serif text-2xl text-ink-900 mt-1">{title}</h2>
        </div>
        {href && (
          <Link href={href} className="text-xs text-flame-700 hover:underline">
            {hrefLabel ?? "Open"} →
          </Link>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────── */

function SecretPlaceCard({ profile }: { profile: Profile }) {
  const sp = profile.secretPlace;
  const latest = sp?.entries?.[0];
  const activePrayers = (sp?.prayers ?? []).filter((p) => p.status === "active");
  const gratitudes = sp?.gratitudes ?? [];
  const setup = sp?.setupComplete;

  return (
    <SectionCard
      eyebrow="Matthew 6:6"
      title="My Secret Place"
      href="/secret-place"
      hrefLabel="Enter"
    >
      {!setup ? (
        <p className="text-sm text-ink-600">
          You haven't opened the door yet. Your secret place is private, on-device, and never synced.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <MiniBlock label="Journal entries" value={String(sp?.entries?.length ?? 0)} />
            <MiniBlock label="Active prayers" value={String(activePrayers.length)} />
            <MiniBlock label="Gratitudes" value={String(gratitudes.length)} />
          </div>
          {latest && (
            <div className="rounded-2xl bg-ink-50 border border-ink-200 p-4">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">
                Latest · {latest.kind} · {fmtRelative(latest.date)}
              </div>
              {latest.title && (
                <div className="font-serif text-ink-900 mt-1">{latest.title}</div>
              )}
              <p className="mt-1 text-sm text-ink-700 line-clamp-3">{latest.body}</p>
            </div>
          )}
          {activePrayers.slice(0, 3).length > 0 && (
            <div>
              <div className="text-[10px] uppercase tracking-widest text-flame-700 mb-2">
                Standing prayers
              </div>
              <ul className="space-y-1 text-sm text-ink-700">
                {activePrayers.slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-baseline justify-between gap-3">
                    <span>{p.title}</span>
                    <span className="text-xs text-ink-500">{fmtRelative(p.date)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function ReadingPlansCard({
  locale,
  progress,
}: {
  locale: LocaleCode;
  progress: PlanProgress;
}) {
  const summarized = readingPlans.map((p) => {
    const done = progress[p.id]?.length ?? 0;
    return {
      id: p.id,
      name: localizedPlan(locale, p.id)?.name ?? p.name,
      total: p.totalDays,
      done,
      percent: p.totalDays > 0 ? Math.min(100, Math.round((done / p.totalDays) * 100)) : 0,
    };
  });
  const started = summarized.filter((p) => p.done > 0);
  const list = started.length > 0 ? started : summarized.slice(0, 4);

  return (
    <SectionCard
      eyebrow="The Word"
      title="My reading plans"
      href="/read"
      hrefLabel="All plans"
    >
      {started.length === 0 && (
        <p className="text-sm text-ink-600 mb-3">
          No plan started yet. Pick a plan and read one chapter today.
        </p>
      )}
      <ul className="space-y-3">
        {list.map((p) => (
          <li key={p.id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-serif text-ink-900">{p.name}</span>
              <span className="text-xs text-ink-500">
                {p.done} / {p.total}
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-ink-200 overflow-hidden">
              <div className="h-full bg-flame-600" style={{ width: `${p.percent}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function PrayerLifeCard({ profile }: { profile: Profile }) {
  const list = profile.prayingFor ?? [];
  if (list.length === 0) {
    return (
      <SectionCard
        eyebrow="Intercession"
        title="People I pray for"
        href="/pray"
        hrefLabel="Add someone"
      >
        <p className="text-sm text-ink-600">
          Bring one name before the Father today. He hears the small prayers.
        </p>
      </SectionCard>
    );
  }
  const sorted = [...list].sort((a, b) => {
    const la = a.prayedAt?.[a.prayedAt.length - 1] ?? a.addedAt;
    const lb = b.prayedAt?.[b.prayedAt.length - 1] ?? b.addedAt;
    return lb.localeCompare(la);
  });
  return (
    <SectionCard
      eyebrow="Intercession"
      title="People I pray for"
      href="/pray"
      hrefLabel="Open list"
    >
      <ul className="divide-y divide-ink-200">
        {sorted.slice(0, 6).map((r) => {
          const last = r.prayedAt?.[r.prayedAt.length - 1];
          return (
            <li key={r.id} className="py-2 flex items-baseline justify-between gap-3">
              <div>
                <div className="font-serif text-ink-900">{r.name}</div>
                {r.note && <div className="text-xs text-ink-500 line-clamp-1">{r.note}</div>}
              </div>
              <div className="text-xs text-ink-500 text-right">
                <div>{r.prayedAt?.length ?? 0}× prayed</div>
                <div className="text-ink-400">last {fmtRelative(last)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function PracticesCard({ profile }: { profile: Profile }) {
  const rows: { label: string; value: string; sub?: string; href: string }[] = [];

  if (profile.fasts?.length) {
    const active = profile.fasts.find((f) => !f.endedAt && !f.broken);
    rows.push({
      label: "Fasting",
      value: active ? `Fasting · ${active.focus}` : `${profile.fasts.length} fasts kept`,
      sub: active
        ? `Started ${fmtRelative(active.startedAt)}`
        : `Last ${fmtRelative(profile.fasts[profile.fasts.length - 1]?.startedAt)}`,
      href: "/fast",
    });
  }
  if (profile.examens?.length) {
    rows.push({
      label: "Daily Examen",
      value: `${profile.examens.length} entries`,
      sub: `Last ${fmtRelative(profile.examens[0]?.date)}`,
      href: "/examen",
    });
  }
  if (profile.listening?.length) {
    rows.push({
      label: "Listening prayer",
      value: `${profile.listening.length} entries`,
      sub: `Last ${fmtRelative(profile.listening[0]?.date)}`,
      href: "/listen",
    });
  }
  if (profile.forgiveness?.length) {
    const released = profile.forgiveness.filter((f) => f.releasedAt).length;
    rows.push({
      label: "Forgiveness walks",
      value: `${released} released`,
      sub: `${profile.forgiveness.length} in process`,
      href: "/forgive",
    });
  }
  if (profile.healing?.length) {
    const answered = profile.healing.filter((h) => h.status === "answered").length;
    rows.push({
      label: "Healing prayers",
      value: `${profile.healing.length} requests`,
      sub: `${answered} answered`,
      href: "/heal",
    });
  }
  if (profile.sabbath?.weeksKept?.length) {
    rows.push({
      label: "Sabbath",
      value: `${profile.sabbath.weeksKept.length} weeks kept`,
      href: "/sabbath",
    });
  }
  if (profile.familyAltar?.length) {
    rows.push({
      label: "Family Altar",
      value: `${profile.familyAltar.length} days`,
      sub: `Last ${fmtRelative(profile.familyAltar[profile.familyAltar.length - 1]?.date)}`,
      href: "/family",
    });
  }
  if (profile.rule) {
    const total =
      (profile.rule.daily?.length ?? 0) +
      (profile.rule.weekly?.length ?? 0) +
      (profile.rule.monthly?.length ?? 0);
    rows.push({
      label: "Rule of Life",
      value: `${total} disciplines`,
      sub: `Set ${fmtDate(profile.rule.startedAt)}`,
      href: "/rule",
    });
  }
  if (profile.sermons?.length) {
    rows.push({
      label: "Sermon notes",
      value: `${profile.sermons.length} kept`,
      sub: `Last ${fmtRelative(profile.sermons[0]?.date)}`,
      href: "/today",
    });
  }
  if (profile.calling?.length) {
    rows.push({
      label: "Calling discernment",
      value: `${profile.calling.length} notes`,
      sub: `Last ${fmtRelative(profile.calling[0]?.date)}`,
      href: "/calling",
    });
  }

  return (
    <SectionCard eyebrow="Old paths" title="My practices" href="/practices" hrefLabel="All practices">
      {rows.length === 0 ? (
        <p className="text-sm text-ink-600">
          No practices logged yet. Try the Daily Examen tonight — it takes 5 minutes.
        </p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {rows.map((r) => (
            <li key={r.label}>
              <Link
                href={r.href}
                className="block rounded-2xl border border-ink-200 bg-card-subtle p-4 hover:border-flame-500 transition-colors"
              >
                <div className="text-[10px] uppercase tracking-widest text-flame-700">{r.label}</div>
                <div className="font-serif text-ink-900 mt-1">{r.value}</div>
                {r.sub && <div className="text-xs text-ink-500 mt-0.5">{r.sub}</div>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function FormationCard({ profile }: { profile: Profile }) {
  const gifts = profile.gifts;
  const lastFruit = profile.fruit?.[profile.fruit.length - 1];
  const catechism = profile.catechismProgress?.length ?? 0;

  return (
    <SectionCard eyebrow="Formation" title="Who He is making me">
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Spiritual gifts</div>
          {gifts ? (
            <>
              <div className="font-serif text-ink-900 mt-1 capitalize">
                {gifts.top.slice(0, 3).join(", ")}
              </div>
              <div className="text-xs text-ink-500 mt-0.5">Taken {fmtDate(gifts.takenAt)}</div>
            </>
          ) : (
            <Link href="/gifts" className="text-sm text-flame-700 hover:underline mt-1 inline-block">
              Take the gifts inventory →
            </Link>
          )}
        </div>
        <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Fruit check</div>
          {lastFruit ? (
            <>
              <div className="font-serif text-ink-900 mt-1">
                {(profile.fruit?.length ?? 0)} checks
              </div>
              <div className="text-xs text-ink-500 mt-0.5">Last {fmtRelative(lastFruit.date)}</div>
              <Link href="/fruit" className="text-xs text-flame-700 hover:underline mt-2 inline-block">
                Check fruit again →
              </Link>
            </>
          ) : (
            <Link href="/fruit" className="text-sm text-flame-700 hover:underline mt-1 inline-block">
              Begin a fruit check →
            </Link>
          )}
        </div>
        <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Catechism</div>
          <div className="font-serif text-ink-900 mt-1">{catechism} / 52</div>
          <div className="mt-2 h-1.5 rounded-full bg-ink-200 overflow-hidden">
            <div
              className="h-full bg-flame-600"
              style={{ width: `${Math.min(100, (catechism / 52) * 100)}%` }}
            />
          </div>
          <Link href="/catechism" className="text-xs text-flame-700 hover:underline mt-2 inline-block">
            Continue →
          </Link>
        </div>
      </div>
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function FamilyCard({ profile }: { profile: Profile }) {
  const m = profile.marriage;
  const p = profile.parenting;
  const hasMarriage = m?.partnerName || (m?.daysLogged?.length ?? 0) > 0;
  const hasParenting = (p?.children?.length ?? 0) > 0 || (p?.daysLogged?.length ?? 0) > 0;

  if (!hasMarriage && !hasParenting) {
    return (
      <SectionCard eyebrow="Household" title="My household">
        <p className="text-sm text-ink-600">
          Build a rhythm of prayer over your spouse and children — the small daily covering matters.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link href="/marriage" className="text-flame-700 hover:underline">
            Marriage →
          </Link>
          <Link href="/parenting" className="text-flame-700 hover:underline">
            Parenting →
          </Link>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard eyebrow="Household" title="My household">
      <div className="grid sm:grid-cols-2 gap-3">
        {hasMarriage && (
          <Link
            href="/marriage"
            className="rounded-2xl border border-ink-200 bg-card-subtle p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Marriage</div>
            <div className="font-serif text-ink-900 mt-1">
              {m?.partnerName ?? "My spouse"}
            </div>
            <div className="text-xs text-ink-500 mt-0.5">
              {m?.daysLogged?.length ?? 0} days prayed
              {m?.anniversary && ` · ${fmtDate(m.anniversary)}`}
            </div>
          </Link>
        )}
        {hasParenting && (
          <Link
            href="/parenting"
            className="rounded-2xl border border-ink-200 bg-card-subtle p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Children</div>
            <div className="font-serif text-ink-900 mt-1">
              {p?.children?.map((c) => c.name).join(", ") || "My children"}
            </div>
            <div className="text-xs text-ink-500 mt-0.5">
              {p?.daysLogged?.length ?? 0} days prayed over them
            </div>
          </Link>
        )}
      </div>
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function NationsCard({
  profile,
  adoptedName,
  adoptedIso,
}: {
  profile: Profile;
  adoptedName?: string;
  adoptedIso?: string;
}) {
  const days = uniqueDates(profile.nationsPrayed?.map((n) => n.date));
  const distinct = new Set((profile.nationsPrayed ?? []).map((n) => n.iso)).size;
  return (
    <SectionCard
      eyebrow="The Nations"
      title="My intercession for the world"
      href="/pray/nations"
    >
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <MiniBlock label="Days prayed" value={String(days)} />
        <MiniBlock label="Nations covered" value={String(distinct)} />
        {adoptedIso && adoptedName ? (
          <Link
            href={`/pray/nations/${adoptedIso.toLowerCase()}`}
            className="rounded-2xl border border-flame-300 bg-flame-50/60 p-4 hover:bg-flame-50"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Adopted</div>
            <div className="font-serif text-ink-900 mt-1">
              {flagEmoji(adoptedIso)} {adoptedName}
            </div>
          </Link>
        ) : (
          <Link
            href="/pray/nations"
            className="rounded-2xl border border-ink-200 bg-card-subtle p-4 hover:border-flame-500"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Adopt a nation</div>
            <div className="text-sm text-ink-700 mt-1">Carry one country in prayer →</div>
          </Link>
        )}
      </div>
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function BibleMarksCard({ marks }: { marks: BibleMarks }) {
  const h = marks.highlights?.length ?? 0;
  const b = marks.bookmarks?.length ?? 0;
  const n = Object.keys(marks.notes ?? {}).length;
  if (h + b + n === 0) {
    return (
      <SectionCard eyebrow="My Bible" title="Marks in my Bible" href="/bible">
        <p className="text-sm text-ink-600">
          Highlight a verse, bookmark a chapter, or write a note — your Bible remembers.
        </p>
      </SectionCard>
    );
  }
  return (
    <SectionCard eyebrow="My Bible" title="Marks in my Bible" href="/bible">
      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        <MiniBlock label="Highlights" value={String(h)} />
        <MiniBlock label="Bookmarks" value={String(b)} />
        <MiniBlock label="Notes" value={String(n)} />
      </div>
    </SectionCard>
  );
}

/* ────────────────────────────────────────────────────────── */

function BackupCard() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [passphrase, setPassphrase] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function exportData() {
    setBusy(true);
    setStatus("");
    try {
      const payload = collectAllData();
      const json = JSON.stringify(payload);
      const filename = `scripture-theory-${new Date().toISOString().slice(0, 10)}`;

      let blob: Blob;
      let ext: string;
      if (passphrase) {
        const encrypted = await encrypt(json, passphrase);
        blob = new Blob([JSON.stringify(encrypted, null, 2)], { type: "application/json" });
        ext = "encrypted.json";
      } else {
        blob = new Blob([json], { type: "application/json" });
        ext = "json";
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      setStatus(
        passphrase
          ? "Backup downloaded · encrypted with your passphrase."
          : "Backup downloaded · stored as plain JSON."
      );
    } catch (e) {
      setStatus("Backup failed. " + (e instanceof Error ? e.message : ""));
    } finally {
      setBusy(false);
    }
  }

  async function importData(file: File) {
    setBusy(true);
    setStatus("");
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      let payload: Record<string, string>;
      if (parsed && typeof parsed === "object" && parsed.__encrypted === true) {
        if (!passphrase) {
          throw new Error("This file is encrypted. Enter your passphrase first.");
        }
        const decrypted = await decrypt(parsed, passphrase);
        payload = JSON.parse(decrypted);
      } else {
        payload = parsed;
      }
      restoreAllData(payload);
      setStatus("Restored. Refresh the page to see your data.");
    } catch (e) {
      setStatus("Restore failed. " + (e instanceof Error ? e.message : ""));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function clearEverything() {
    if (
      typeof window !== "undefined" &&
      window.confirm(
        "Erase EVERYTHING on this device — Secret Place, reading progress, prayers, journal? This cannot be undone."
      )
    ) {
      eraseAllData();
      setStatus("All data cleared. Refresh the page.");
    }
  }

  return (
    <section className="rounded-3xl border border-ink-200 bg-ink-50 p-6 md:p-8">
      <div className="text-xs uppercase tracking-widest text-flame-700">Backup & restore</div>
      <h2 className="font-serif text-2xl text-ink-900 mt-1">Your data, in your hands.</h2>
      <p className="mt-2 text-sm text-ink-600 max-w-2xl leading-relaxed">
        Nothing here ever leaves your device unless you choose to download it. Set a passphrase to
        encrypt the backup with AES-GCM (256-bit); without it, we can't recover your data — and
        neither can anyone else.
      </p>

      <div className="mt-4">
        <label className="text-xs text-ink-500 uppercase tracking-widest">
          Passphrase (optional, recommended)
        </label>
        <input
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="e.g. shepherd-of-my-soul-1995"
          className="mt-1 w-full rounded-xl border border-ink-200 bg-card px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-flame-500"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={exportData}
          disabled={busy}
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-2 text-sm hover:bg-flame-700 disabled:opacity-50"
        >
          Download backup
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900 disabled:opacity-50"
        >
          Restore from file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importData(f);
          }}
        />
        <button
          onClick={clearEverything}
          disabled={busy}
          className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-500 hover:text-ink-900 hover:border-ink-900 disabled:opacity-50 ml-auto"
        >
          Erase everything
        </button>
      </div>

      {status && (
        <p className="mt-3 text-xs text-ink-600" role="status">
          {status}
        </p>
      )}
    </section>
  );
}

function SignInBanner() {
  const { configured, ready, user } = useAuth();
  if (!configured || !ready) return null;
  if (user) {
    return (
      <Link
        href="/account"
        className="block rounded-2xl border border-ink-200 bg-card-subtle p-4 hover:border-flame-500 transition-colors"
      >
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">
              Signed in · syncing
            </div>
            <div className="text-sm text-ink-700 mt-1">
              {user.email} — your walk travels with you.
            </div>
          </div>
          <span className="text-xs text-flame-700 shrink-0">Account →</span>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href="/account"
      className="block rounded-3xl border border-flame-300 bg-flame-50/60 p-5 hover:bg-flame-50 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">Optional</div>
          <div className="font-serif text-lg text-ink-900 mt-1">
            Sign in so you don't lose your walk when you change devices.
          </div>
          <p className="text-sm text-ink-700 mt-1 leading-relaxed">
            One passwordless link to your email. The Secret Place stays on this device unless you
            opt it in.
          </p>
        </div>
        <span className="text-xs text-flame-700 shrink-0">Sign in →</span>
      </div>
    </Link>
  );
}

function FooterNote() {
  return (
    <p className="text-xs text-ink-500 italic text-center max-w-2xl mx-auto leading-relaxed">
      "When you pray, go into your room and shut the door and pray to your Father who is in
      secret. And your Father who sees in secret will reward you." — Matthew 6:6
    </p>
  );
}

function MiniBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-card-subtle p-4">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <div className="font-serif text-xl text-ink-900 mt-1">{value}</div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/* Backup helpers — WebCrypto AES-GCM with PBKDF2 key derivation */

/** True if the given storage key belongs to Scripture Theory and is safe to back up. */
function isOurKey(key: string): boolean {
  if (GLOBAL_KEYS.includes(key)) return true;
  for (const base of PER_SLOT_BASES) {
    if (key === base || key.startsWith(`${base}:`)) return true;
  }
  return false;
}

function collectAllData(): Record<string, string> {
  const out: Record<string, string> = {};
  if (typeof window === "undefined") return out;
  // Enumerate every key, include only ours (covers every slot)
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (!k || !isOurKey(k)) continue;
    const v = window.localStorage.getItem(k);
    if (v != null) out[k] = v;
  }
  return out;
}

function restoreAllData(payload: Record<string, string>) {
  if (typeof window === "undefined") return;
  for (const [key, value] of Object.entries(payload)) {
    if (isOurKey(key) && typeof value === "string") {
      window.localStorage.setItem(key, value);
    }
  }
}

function eraseAllData() {
  if (typeof window === "undefined") return;
  const toRemove: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const k = window.localStorage.key(i);
    if (k && isOurKey(k)) toRemove.push(k);
  }
  for (const k of toRemove) {
    try { window.localStorage.removeItem(k); } catch {}
  }
}

type EncryptedBlob = {
  __encrypted: true;
  v: 1;
  algo: "AES-GCM";
  kdf: "PBKDF2-SHA256";
  iter: number;
  salt: string;
  iv: string;
  data: string;
};

async function deriveKey(passphrase: string, salt: Uint8Array, iterations: number) {
  const enc = new TextEncoder();
  const base = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function bytesToB64(buf: ArrayBuffer | Uint8Array) {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64ToBytes(b64: string) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function encrypt(plaintext: string, passphrase: string): Promise<EncryptedBlob> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const iterations = 200_000;
  const key = await deriveKey(passphrase, salt, iterations);
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return {
    __encrypted: true,
    v: 1,
    algo: "AES-GCM",
    kdf: "PBKDF2-SHA256",
    iter: iterations,
    salt: bytesToB64(salt),
    iv: bytesToB64(iv),
    data: bytesToB64(ct),
  };
}

async function decrypt(blob: EncryptedBlob, passphrase: string): Promise<string> {
  const salt = b64ToBytes(blob.salt);
  const iv = b64ToBytes(blob.iv);
  const data = b64ToBytes(blob.data);
  const key = await deriveKey(passphrase, salt, blob.iter);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  return new TextDecoder().decode(pt);
}
