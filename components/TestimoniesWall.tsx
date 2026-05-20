"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  displayName,
  isTestimonyCloudConfigured,
  listPublishedTestimonies,
  type PublishedTestimony,
} from "@/lib/testimonies-cloud";

/**
 * The witness page's "real testimonies" section. Replaces the previous
 * static array of placeholder stories with a live feed from Supabase.
 *
 * Empty / unconfigured states render warmly — the page never looks broken.
 */
export default function TestimoniesWall() {
  const [configured] = useState(() => isTestimonyCloudConfigured());
  const [testimonies, setTestimonies] = useState<PublishedTestimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const rows = await listPublishedTestimonies(60);
      if (cancelled) return;
      setTestimonies(rows);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [configured]);

  if (loading) {
    return (
      <div className="mt-12 rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8 text-ink-500">
        Loading the witnesses…
      </div>
    );
  }

  // No published testimonies (yet) — be warm, not broken.
  if (testimonies.length === 0) {
    return (
      <section className="mt-12 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-10">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          Stories from the Body
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-1 leading-tight">
          The first testimonies are being written.
        </h2>
        <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
          We deliberately publish no placeholder &ldquo;stories.&rdquo; The Lord is meeting real
          people in real places — and when they share their stories with us, this is where the
          Body will read them. Will you be the first?
        </p>
        <p className="mt-3 text-sm italic text-ink-600 leading-relaxed max-w-2xl">
          &ldquo;They overcame him by the blood of the Lamb, and by the word of their
          testimony.&rdquo; — Revelation 12:11
        </p>
        <Link
          href="/witness/share"
          className="mt-5 inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
        >
          Share your testimony →
        </Link>
        {!configured && (
          <p className="mt-5 text-[11px] text-ink-500 italic">
            Maintainer: set <code className="rounded bg-ink-100 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            and <code className="rounded bg-ink-100 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            and run the SQL in <code className="rounded bg-ink-100 px-1.5 py-0.5">lib/testimonies-cloud.ts</code>{" "}
            to enable the queue.
          </p>
        )}
      </section>
    );
  }

  const [featured, ...rest] = testimonies;

  return (
    <>
      {/* Featured testimony — most-recent published */}
      <article className="mt-12 group relative overflow-hidden rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 border border-ink-800">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(60% 40% at 100% 100%, rgba(184,66,12,0.16), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.18em] text-flame-300">
            Testimony{featured.place ? ` · ${featured.place}` : ""}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl mt-2 leading-tight">
            {displayName(featured)}
          </h2>
          {featured.verse && (
            <div className="mt-1 text-xs uppercase tracking-widest text-flame-300">
              {featured.verse}
            </div>
          )}
          <div className="mt-7 grid md:grid-cols-3 gap-4">
            <DarkBlock label="Before">{featured.before_text}</DarkBlock>
            <DarkBlock label="Jesus met me">{featured.encounter}</DarkBlock>
            <DarkBlock label="Now">{featured.now_text}</DarkBlock>
          </div>
        </div>
      </article>

      {/* Remaining testimonies — uniform tile grid */}
      {rest.length > 0 && (
        <div className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
              More stories of the same Lord
            </h2>
            <p className="text-sm text-ink-500 italic">
              One Christ, many tongues, many tribes.
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 gap-4">
            {rest.map((t) => (
              <li
                key={t.id}
                className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 hover:-translate-y-0.5 hover:border-flame-500/60 hover:shadow-[0_18px_50px_-20px_rgba(249,115,22,0.28)] transition-all"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-flame-50/50 to-transparent"
                />
                <div className="relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-xl text-ink-900 group-hover:text-flame-700 transition-colors">
                      {displayName(t)}
                    </h3>
                    {t.verse && (
                      <span className="text-[10px] uppercase tracking-widest text-flame-700">
                        {t.verse}
                      </span>
                    )}
                  </div>
                  {t.place && (
                    <div className="text-xs uppercase tracking-widest text-ink-500 mt-0.5">
                      {t.place}
                    </div>
                  )}
                  <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                    <LightBlock label="Before">{t.before_text}</LightBlock>
                    <LightBlock label="Jesus met me">{t.encounter}</LightBlock>
                    <LightBlock label="Now">{t.now_text}</LightBlock>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function DarkBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-700/60 bg-ink-800/40 p-4">
      <div className="text-[10px] uppercase tracking-widest text-flame-300">{label}</div>
      <p className="mt-1.5 text-ink-100 leading-relaxed text-sm">{children}</p>
    </div>
  );
}
function LightBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-card-subtle p-3">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">{label}</div>
      <p className="mt-1 text-ink-800 leading-relaxed text-sm">{children}</p>
    </div>
  );
}
