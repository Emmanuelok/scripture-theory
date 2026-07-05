"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary. Catches render/data errors (including a
 * transient upstream Bible fetch failure) and offers a retry. Because the
 * errored render is never cached, the next attempt re-fetches — a blip no
 * longer sticks a broken page in the ISR cache.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Server-side error tracking seam (no PII, no third party wired yet).
    console.error("[error-boundary]", error.message, error.digest ?? "");
  }, [error]);

  return (
    <section className="mx-auto max-w-3xl px-5 pt-24 pb-24 text-center">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        something interrupted
      </span>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-tight">
        A moment&apos;s <span className="gradient-text">trouble.</span>
      </h1>
      <p className="mt-6 text-ink-700 leading-relaxed max-w-xl mx-auto">
        This page didn&apos;t load just now — often a passing hiccup reaching a
        live source. Try again; the Word hasn&apos;t moved.
      </p>

      <blockquote className="mt-10 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8 text-left">
        <p className="font-serif text-lg md:text-xl text-ink-900 italic leading-snug">
          &ldquo;The grass withers, the flower fades, but the word of our God
          will stand forever.&rdquo;
        </p>
        <p className="mt-2 text-sm text-ink-600">— Isaiah 40:8</p>
      </blockquote>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-6 py-3 text-sm font-medium hover:bg-flame-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-ink-300 bg-card px-6 py-3 text-sm text-ink-900 hover:border-ink-900 transition-colors"
        >
          Home →
        </Link>
      </div>
    </section>
  );
}
