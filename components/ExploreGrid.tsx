"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { flagEmoji } from "@/lib/flags";
import { whichOfficeNow, offices } from "@/data/hours";
import type { TodayData } from "@/lib/today-data";

/* ──────────────────────────────────────────────────────────────────
   ExploreGrid — a bento-style, mouse-tracking, live-data tile grid.
   Replaces the bland uniform grid on the landing page.

   Daily-rotation data (nation, verse, memory, catechism, persecuted)
   arrives as a server-computed `today` prop so the big editorial
   modules don't ship to the browser. The component still polls local
   time every 60s to keep the user-local greeting and the canonical
   hour (whichOfficeNow) accurate to the user's wall clock.
────────────────────────────────────────────────────────────────── */
export default function ExploreGrid({ today }: { today: TodayData }) {
  // Wall-clock-local state for the greeting + current canonical hour.
  // Starts null so initial SSR/hydrate doesn't lock to the server's
  // timezone; the first effect tick fills it in from the user's clock.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const i = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(i);
  }, []);

  const localized = useMemo(() => {
    const d = now ?? new Date();
    const officeId = whichOfficeNow(d);
    const office = offices.find((o) => o.id === officeId)!;
    return {
      d,
      office,
      hour: d.getHours(),
    };
  }, [now]);

  if (!now) {
    // Skeleton mirrors the real grid heights so layout doesn't jump on hydrate
    return (
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(120px,auto)]">
          <div className="md:col-span-6 md:row-span-2 rounded-3xl bg-card-subtle h-[260px]" />
          <div className="md:col-span-3 md:row-span-2 rounded-3xl bg-card-subtle h-[260px]" />
          <div className="md:col-span-3 md:row-span-2 rounded-3xl bg-card-subtle h-[260px]" />
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="md:col-span-4 rounded-3xl bg-card-subtle h-[120px]" />
          ))}
        </div>
      </section>
    );
  }

  // Merge server-rendered daily data with user-local time data into a single
  // `data` object so the JSX below stays close to its original shape.
  const data = {
    ...localized,
    nation: today.nation,
    nationDay: today.nationDay,
    memory: today.memory,
    ld: today.ld,
    persecuted: today.persecuted,
    verse: today.verse,
    bookName: today.verse.bookName,
    nationRegionLabel: today.nationRegionLabel,
  };

  const greet =
    data.hour < 12 ? "Good morning" : data.hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-flame-700">Explore</span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-1">
            Twelve doors. One Christ.
          </h2>
        </div>
        <p className="text-sm text-ink-500 max-w-xs">
          Live, today — your nation in the rotation, today's verse, this week's memory verse, the
          canonical hour you're in.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(120px,auto)]">
        {/* HERO — Today */}
        <Tile
          href="/today"
          variant="hero"
          eyebrow={`${greet} · ${data.d.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}`}
          title="Today"
          tag="Personal"
        >
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Live label="Today's nation">
              <span className="text-2xl mr-1.5" aria-hidden>
                {flagEmoji(data.nation.iso)}
              </span>
              <span className="font-serif text-ink-50">{data.nation.name}</span>
            </Live>
            <Live label="Canonical hour">
              <span className="font-serif text-ink-50 capitalize">{data.office.name}</span>
            </Live>
            <Live label="Memory this week">
              <span className="font-serif text-ink-50">{data.memory.ref}</span>
            </Live>
            <Live label="Lord's Day">
              <span className="font-serif text-ink-50">
                {data.ld.ld} · {data.ld.theme.split(" — ")[0]}
              </span>
            </Live>
          </div>
          <blockquote className="mt-5 border-l-2 border-flame-500/70 pl-3 text-flame-100/90 italic text-sm leading-relaxed line-clamp-3">
            "{data.verse.t}"
            <span className="block not-italic text-[11px] text-flame-300 mt-1.5 tracking-wide">
              — {data.bookName} {data.verse.chapter}:{data.verse.v}
            </span>
          </blockquote>
        </Tile>

        {/* BIBLE — tall */}
        <Tile
          href="/bible"
          variant="tall"
          eyebrow="11 translations"
          title="The Bible"
          tag="Word"
          glyph={<BookGlyph />}
        >
          <p className="mt-3 text-xs text-ink-400 leading-relaxed">
            WEB · KJV · ASV · RVR · LSG · CUV · Vulgate · ELB · LUT · ALB · BBE — switch translations
            mid-chapter.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["WEB", "KJV", "ASV", "RVR", "LSG", "CUV", "Vulgate"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-ink-800/50 border border-ink-700 px-2 py-0.5 text-[10px] uppercase tracking-widest text-flame-200"
              >
                {t}
              </span>
            ))}
          </div>
        </Tile>

        {/* NATIONS — tall, with live flag */}
        <Tile
          href="/pray/nations"
          variant="tall"
          eyebrow={`Day ${data.nationDay} of ${today.nationCycleLength}`}
          title="The Nations"
          tag="Intercession"
        >
          <div className="mt-4 flex items-end gap-3">
            <span className="text-5xl leading-none drop-shadow" aria-hidden>
              {flagEmoji(data.nation.iso)}
            </span>
            <div className="min-w-0">
              <div className="font-serif text-xl text-ink-50 truncate">{data.nation.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-flame-300">
                {data.nationRegionLabel}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-ink-400 leading-snug line-clamp-3">
            {data.nation.context}
          </p>
        </Tile>

        {/* PRACTICES */}
        <Tile
          href="/practices"
          eyebrow="23 ancient practices"
          title="Practices"
          tag="Old paths"
          glyph={<FlameGlyph />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            Hours · Examen · Fasting · Lament · Forgiveness · Healing · Sabbath · Calling
          </p>
        </Tile>

        {/* DAILY OFFICE — live hour */}
        <Tile
          href="/hours"
          eyebrow="Psalm 119:164"
          title="The Daily Office"
          tag="Now"
          glyph={<HoursGlyph hour={data.hour} />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            <span className="font-medium text-flame-300">{data.office.name}</span>
            <span className="text-ink-500"> · {data.office.altName}</span>
            <span className="block text-ink-500 mt-0.5">{data.office.windowLabel}</span>
          </p>
        </Tile>

        {/* SECRET PLACE */}
        <Tile
          href="/secret-place"
          eyebrow="Matthew 6:6"
          title="The Secret Place"
          tag="Private"
          glyph={<DoorGlyph />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            Journal, prayers, gratitudes — only on this device. Never synced.
          </p>
        </Tile>

        {/* PERSECUTED — month rotation */}
        <Tile
          href="/persecuted"
          eyebrow="Hebrews 13:3"
          title="The Persecuted"
          tag={`This month · ${data.persecuted.name}`}
        >
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl" aria-hidden>
              {flagEmoji(data.persecuted.iso)}
            </span>
            <p className="text-xs text-ink-400 leading-snug line-clamp-2 flex-1">
              {data.persecuted.context}
            </p>
          </div>
        </Tile>

        {/* GIFTS */}
        <Tile
          href="/gifts"
          eyebrow="1 Cor 12"
          title="Spiritual Gifts"
          tag="Discern"
          glyph={<DoveGlyph />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            Twenty gifts inventoried. Discern how the Spirit has shaped you to serve.
          </p>
        </Tile>

        {/* THE PATH */}
        <Tile
          href="/disciple"
          eyebrow="12 stages"
          title="The Path"
          tag="Discipleship"
          glyph={<PathGlyph />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            From first encounter to reproducing disciple — and the next obedient step.
          </p>
        </Tile>

        {/* CHURCH */}
        <Tile
          href="/connect"
          eyebrow="Local body"
          title="Find a Church"
          tag="Belong"
          glyph={<HouseGlyph />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            Real congregations near you, every faithful tradition. Not a chat room — a body.
          </p>
        </Tile>

        {/* RESOURCES */}
        <Tile
          href="/resources"
          eyebrow="Study & creeds"
          title="Resources"
          tag="Library"
          glyph={<LibraryGlyph />}
        >
          <p className="mt-2 text-xs text-ink-400 leading-snug">
            Topical index · creeds · disciplines · glossary · catechism · 14 languages.
          </p>
        </Tile>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Tile — interactive, mouse-tracked spotlight, glow on hover.
────────────────────────────────────────────────────────────────── */

type TileVariant = "default" | "tall" | "hero";

function Tile({
  href,
  eyebrow,
  title,
  tag,
  variant = "default",
  glyph,
  children,
}: {
  href: string;
  eyebrow: string;
  title: string;
  tag?: string;
  variant?: TileVariant;
  glyph?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  const layout =
    variant === "hero"
      ? "md:col-span-6 md:row-span-2"
      : variant === "tall"
      ? "md:col-span-3 md:row-span-2"
      : "md:col-span-4";

  const isDark = variant === "hero" || variant === "tall";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      className={[
        "tile group relative overflow-hidden rounded-3xl p-5 md:p-6 transition-all duration-300",
        "border",
        isDark
          ? "bg-ink-900 border-ink-800 text-ink-50 hover:border-flame-500/60"
          : "bg-card border-ink-200 hover:border-flame-500/60",
        "hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(249,115,22,0.35)]",
        layout,
      ].join(" ")}
    >
      {/* Spotlight follows cursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(249,115,22,0.18), transparent 45%)",
        }}
      />

      {/* Subtle aurora wash on dark tiles */}
      {isDark && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(80% 60% at 0% 0%, rgba(249,115,22,0.12), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.10), transparent 60%)",
          }}
        />
      )}

      {/* Glyph in the corner */}
      {glyph && (
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute right-4 top-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3",
            isDark ? "text-flame-300/40" : "text-flame-700/30",
          ].join(" ")}
        >
          {glyph}
        </span>
      )}

      <div className="relative">
        <div
          className={[
            "text-[10px] uppercase tracking-[0.18em]",
            isDark ? "text-flame-300" : "text-flame-700",
          ].join(" ")}
        >
          {eyebrow}
        </div>
        <h3
          className={[
            "font-serif mt-1.5 leading-tight tracking-tight",
            variant === "hero" ? "text-4xl md:text-5xl" : "text-2xl",
            isDark ? "text-ink-50" : "text-ink-900",
            "group-hover:[text-shadow:0_0_22px_rgba(249,115,22,0.25)]",
          ].join(" ")}
        >
          {title}
        </h3>
        {tag && (
          <div
            className={[
              "mt-1 text-[10px] uppercase tracking-widest",
              isDark ? "text-ink-400" : "text-ink-500",
            ].join(" ")}
          >
            {tag}
          </div>
        )}

        <div className="relative">{children}</div>

        <div
          className={[
            "absolute right-0 -bottom-1 text-sm transition-transform duration-300 group-hover:translate-x-1",
            isDark ? "text-flame-300" : "text-flame-700",
          ].join(" ")}
        >
          →
        </div>
      </div>
    </Link>
  );
}

function Live({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-ink-800/60 border border-ink-700/60 px-3 py-2.5">
      <div className="text-[9px] uppercase tracking-widest text-flame-300/80">{label}</div>
      <div className="mt-0.5 flex items-center text-sm">{children}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Glyphs — tiny, elegant SVG marks per tile category.
────────────────────────────────────────────────────────────────── */

function BookGlyph() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 5.5C3 4.67 3.67 4 4.5 4H11v15H4.5A1.5 1.5 0 0 1 3 17.5v-12Z" />
      <path d="M21 5.5C21 4.67 20.33 4 19.5 4H13v15h6.5a1.5 1.5 0 0 0 1.5-1.5v-12Z" />
      <path d="M11 4v15M13 4v15" />
    </svg>
  );
}

function FlameGlyph() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-1 4-5 5-5 10a5 5 0 0 0 10 0c0-3-2-4-2-7 0 2-1 3-3 4 1-3 1-5 0-7Z" opacity="0.85" />
    </svg>
  );
}

function HoursGlyph({ hour }: { hour: number }) {
  // A clock hand that points to the current hour
  const angle = ((hour % 12) / 12) * 360 - 90;
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="9" />
      <line
        x1="12"
        y1="12"
        x2={12 + Math.cos((angle * Math.PI) / 180) * 5}
        y2={12 + Math.sin((angle * Math.PI) / 180) * 5}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ScrollGlyph() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M6 4h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4Z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

function DoorGlyph() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M5 3h14v18H5z" />
      <circle cx="15" cy="12" r="0.8" fill="currentColor" />
      <path d="M9 3v18" />
    </svg>
  );
}

function DoveGlyph() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" opacity="0.8">
      <path d="M3 14c2-3 5-5 9-5 0-2 2-3 4-3-1 2-2 3-2 4 2 0 4 1 5 3-2 1-5 1-7 1-1 2-3 4-6 4l-3-1c-1-1-1-2 0-3Z" />
    </svg>
  );
}

function PathGlyph() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="5" cy="6" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="19" cy="18" r="1.4" />
      <path d="M5 6c4 0 4 6 7 6s3 6 7 6" />
    </svg>
  );
}

function HouseGlyph() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" />
    </svg>
  );
}

function LibraryGlyph() {
  return (
    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="4" width="3" height="16" />
      <rect x="8" y="4" width="3" height="16" />
      <rect x="13" y="6" width="3" height="14" transform="rotate(8 14.5 13)" />
      <rect x="18" y="4" width="3" height="16" />
    </svg>
  );
}
