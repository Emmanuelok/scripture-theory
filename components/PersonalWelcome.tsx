"use client";

import Link from "next/link";
import { useProfile } from "@/lib/profile";
import { useToday } from "@/lib/useToday";
import { getPersonalContext, greetingFor } from "@/lib/personal";

/**
 * The home page's personal address. Everything here is read from the
 * believer's own device — nothing fetched, nothing tracked. For a
 * first-time visitor it renders nothing (the hero speaks first);
 * once there's a name or any walk history, the site starts greeting
 * them like it knows them. Because it does — locally.
 */
export default function PersonalWelcome() {
  const { profile, mounted } = useProfile();
  const now = useToday();

  if (!mounted) return null;

  const ctx = getPersonalContext(profile, now);
  const hasIdentity = ctx.firstName || ctx.storyLine;
  if (!hasIdentity) return null;

  return (
    <section className="mx-auto max-w-5xl px-5 mt-6 rise">
      <div className="relative overflow-hidden rounded-3xl border border-flame-300/60 bg-gradient-to-br from-flame-50/80 via-card to-card p-6 md:p-7">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-flame-500/10 blur-3xl"
        />
        <div className="relative flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900 leading-tight">
              {greetingFor(now, ctx.firstName)}
            </h2>
            {ctx.storyLine && (
              <p className="mt-1.5 text-sm text-ink-600">
                {ctx.storyLine.charAt(0).toUpperCase() + ctx.storyLine.slice(1)}.
              </p>
            )}
            <blockquote className="mt-4 max-w-xl border-l-2 border-flame-400 pl-3 text-sm text-ink-800 italic leading-relaxed">
              &ldquo;{ctx.verse.text}&rdquo;
              <span className="block mt-1 not-italic text-[10px] uppercase tracking-widest text-flame-700">
                {ctx.verse.ref} · chosen for where you are
              </span>
            </blockquote>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Link
              href="/today"
              className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
            >
              Continue your walk →
            </Link>
            {!ctx.prayedNationToday && (
              <Link
                href="/pray/nations"
                className="text-xs text-ink-600 hover:text-flame-700"
              >
                Today&apos;s nation is still waiting on you ↗
              </Link>
            )}
          </div>
        </div>

        {ctx.milestone && (
          <div className="relative mt-5 rounded-2xl border border-amber-300 bg-amber-50/70 p-4">
            <div className="text-[10px] uppercase tracking-widest text-amber-700">
              Today · a milestone
            </div>
            <div className="font-serif text-lg text-ink-900 mt-0.5">{ctx.milestone.title}</div>
            <p className="text-sm text-ink-700 mt-1 leading-relaxed">{ctx.milestone.sub}</p>
          </div>
        )}
      </div>
    </section>
  );
}
