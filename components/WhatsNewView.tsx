"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CHANGELOG, latestChangelogDate } from "@/data/changelog";
import { PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

const LAST_SEEN_KEY = "scripture-theory-changelog-seen";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function WhatsNewView() {
  // Mark the latest changelog date as seen on this device.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(LAST_SEEN_KEY, latestChangelogDate());
    } catch {}
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Home
      </Link>

      <PageHero
        eyebrow="The platform grows"
        title="What's"
        titleAccent="new."
        intro="A plain-English log of additions and quiet improvements. The platform grows, but your rhythm does not have to. Walk what you have today; everything else will keep."
        scripture="The path of the righteous is like the dawning light that shines more and more until the perfect day."
        scriptureRef="Proverbs 4:18"
      />

      <ol className="mt-10 relative space-y-5">
        <span
          aria-hidden
          className="hidden md:block absolute left-7 top-3 bottom-3 w-px bg-gradient-to-b from-flame-300 via-flame-500/40 to-ink-200"
        />
        {CHANGELOG.map((entry) => (
          <li key={entry.date}>
            <article className="relative grid grid-cols-[auto_1fr] gap-4 md:gap-6 rounded-3xl border border-ink-200 bg-card p-5 md:p-6">
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-flame-500 bg-gradient-to-br from-flame-50 to-flame-100 flex items-center justify-center text-flame-700">
                  <Glyph id="flame" size={28} />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-flame-700">
                  {fmtDate(entry.date)}
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-ink-900 mt-0.5">
                  {entry.title}
                </h3>
                <p className="mt-2 text-ink-700 leading-relaxed">{entry.body}</p>
                {entry.links && entry.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-xs rounded-full border border-flame-500 text-flame-700 px-3 py-1 hover:bg-flame-50"
                      >
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-xs text-ink-500 italic text-center">
        The platform is built to be added to slowly, like a hymnal — each new entry tested against
        Scripture and the long memory of the Church.
      </p>
    </section>
  );
}
