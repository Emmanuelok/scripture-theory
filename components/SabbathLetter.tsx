"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProfile } from "@/lib/profile";
import { buildSabbathLetter, type LetterSection } from "@/lib/sabbathLetter";
import { useRecordActivity } from "@/lib/lastActivity";
import { Glyph } from "@/components/ui/Glyph";

function fmtRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const startStr = start.toLocaleDateString(undefined, { month: "long", day: "numeric" });
  const endStr = end.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  return `${startStr} – ${endStr}`;
}

export default function SabbathLetter() {
  const { profile, mounted } = useProfile();
  const letter = useMemo(() => (mounted ? buildSabbathLetter(profile) : null), [profile, mounted]);

  useRecordActivity(
    mounted
      ? {
          type: "sabbath-letter",
          href: "/sabbath/letter",
          label: "Sabbath letter",
          sublabel: "Your week, read back",
        }
      : null,
    [mounted]
  );

  if (!mounted || !letter) {
    return (
      <section className="mx-auto max-w-2xl px-5 pt-12 pb-24">
        <div className="rounded-3xl border border-ink-200 bg-card-subtle p-10 text-center text-ink-500">
          Gathering your week…
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 pt-12 pb-24">
      <Link
        href="/sabbath"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Sabbath
      </Link>

      {/* Header — a letter, not a dashboard */}
      <article className="mt-6 relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.22em] text-flame-300">
            Sabbath letter · {fmtRange(letter.weekStart, letter.weekEnd)}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mt-3 leading-tight">
            {letter.greeting}
          </h1>
          <blockquote className="mt-5 text-base md:text-lg italic text-ink-200 leading-relaxed border-l-2 border-flame-400/60 pl-4">
            "{letter.openingScripture.text}"
            <span className="block mt-1 text-xs text-flame-300 not-italic">
              — {letter.openingScripture.ref}
            </span>
          </blockquote>
        </div>
      </article>

      {/* The letter body */}
      <div className="mt-8 space-y-6">
        {letter.isEmpty && (
          <p className="font-serif text-lg text-ink-800 leading-relaxed italic">
            There is nothing here to read back from this week — and that is its own honest word.
          </p>
        )}

        {letter.sections.map((s, i) => (
          <SectionBlock key={i} section={s} />
        ))}
      </div>

      {/* Closing */}
      <div className="mt-10 rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-7">
        <div className="flex items-start gap-3">
          <Glyph id="dove" size={36} className="text-flame-700 shrink-0" />
          <div>
            <p className="font-serif text-lg text-ink-900 leading-relaxed">
              {letter.closing}
            </p>
            <blockquote className="mt-4 italic text-ink-700 leading-relaxed border-l-2 border-flame-500/70 pl-3 text-sm">
              "{letter.closingScripture.text}"
              <span className="block mt-1 not-italic text-xs text-flame-700">
                — {letter.closingScripture.ref}
              </span>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Practical footer */}
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        <Link
          href="/sabbath"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Plan</div>
          <div className="font-serif text-ink-900 mt-0.5">Your Sabbath rhythm</div>
          <div className="text-xs text-ink-600 mt-0.5">Day · start · stop · do instead</div>
        </Link>
        <Link
          href="/secret-place"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Write</div>
          <div className="font-serif text-ink-900 mt-0.5">Carry one line into journal</div>
          <div className="text-xs text-ink-600 mt-0.5">What did this letter stir?</div>
        </Link>
      </div>

      <p className="mt-8 text-[11px] text-ink-400 italic leading-relaxed">
        This letter is built on this device from your own data. Nothing is sent anywhere. Refresh on
        any day for a rolling 7-day view.
      </p>
    </section>
  );
}

function SectionBlock({ section }: { section: LetterSection }) {
  if (section.kind === "walked") {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6">
        <h2 className="font-serif text-xl text-ink-900">What you walked.</h2>
        <ul className="mt-3 space-y-2.5">
          {section.lines.map((l, i) => (
            <li key={i} className="flex gap-3 text-ink-800 leading-relaxed">
              <span className="text-flame-700 shrink-0 mt-1.5">·</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.kind === "carried") {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h2 className="font-serif text-xl text-ink-900">What you carried.</h2>
        <p className="mt-1 text-sm text-ink-600 italic">
          Themes that returned more than once in this week's writing.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {section.themes.map((t) => (
            <li
              key={t.term}
              className="rounded-full bg-flame-100 text-flame-900 px-3 py-1 text-sm"
            >
              {t.term}
              <span className="ml-1.5 text-flame-700/70 text-xs">×{t.count}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.kind === "warmed") {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6">
        <h2 className="font-serif text-xl text-ink-900">What stayed warm.</h2>
        <p className="mt-1 text-sm text-ink-600 italic">
          Verses you practiced this week.
        </p>
        <ul className="mt-3 space-y-1.5">
          {section.verses.map((v, i) => (
            <li key={i} className="flex items-baseline justify-between gap-2 text-sm">
              <span className="text-ink-800">{v.ref}</span>
              <span className="text-xs text-flame-700">{v.level}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.kind === "gratitudes") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-6">
        <h2 className="font-serif text-xl text-ink-900">Where you thanked Him.</h2>
        <ul className="mt-3 space-y-1.5">
          {section.texts.map((t, i) => (
            <li key={i} className="text-ink-800 italic">"{t}"</li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.kind === "saidYes") {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card p-6">
        <h2 className="font-serif text-xl text-ink-900">Where you sensed Him.</h2>
        <p className="mt-1 text-sm text-ink-600 italic">From your examens.</p>
        <ul className="mt-3 space-y-2">
          {section.lines.map((l, i) => (
            <li key={i} className="text-ink-800 leading-relaxed">"{l}"</li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.kind === "saidNo") {
    return (
      <div className="rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h2 className="font-serif text-xl text-ink-900">Where He was inviting repentance.</h2>
        <ul className="mt-3 space-y-2">
          {section.lines.map((l, i) => (
            <li key={i} className="text-ink-800 leading-relaxed">"{l}"</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-500 italic">
          Bring these to Him today before you do anything else.
        </p>
      </div>
    );
  }

  // longing
  return (
    <div className="rounded-3xl border border-flame-300 bg-flame-50/40 p-6">
      <h2 className="font-serif text-xl text-ink-900">Your longing.</h2>
      <p className="mt-2 text-ink-800 italic leading-relaxed">"{section.text}"</p>
      <p className="mt-3 text-xs text-flame-700">
        The Lord heard. Carry it into the new week.
      </p>
    </div>
  );
}
