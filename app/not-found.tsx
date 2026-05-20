import Link from "next/link";

export const metadata = {
  title: "Not found — Scripture Theory",
  description: "The page you were looking for is not here.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-24 pb-24 text-center">
      <span className="text-xs uppercase tracking-widest text-flame-700">404 · not found</span>
      <h1 className="font-serif text-5xl md:text-7xl mt-3 text-ink-900 leading-tight">
        Not <span className="gradient-text">here.</span>
      </h1>
      <p className="mt-6 text-ink-700 leading-relaxed max-w-xl mx-auto">
        The page you were looking for has moved, never existed, or is being built. But the
        Lord you came looking for hasn&apos;t moved. The Story is still the Story.
      </p>

      <blockquote className="mt-10 rounded-3xl border border-flame-300 bg-gradient-to-br from-flame-50 to-card p-6 md:p-8 text-left">
        <p className="font-serif text-lg md:text-xl text-ink-900 italic leading-snug">
          &ldquo;Jesus Christ is the same yesterday and today and forever.&rdquo;
        </p>
        <p className="mt-2 text-sm text-ink-600">— Hebrews 13:8</p>
      </blockquote>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-6 py-3 text-sm font-medium hover:bg-flame-700 transition-colors"
        >
          Home →
        </Link>
        <Link
          href="/bible/john/3"
          className="inline-flex items-center rounded-full border border-ink-300 bg-card px-6 py-3 text-sm text-ink-900 hover:border-ink-900 transition-colors"
        >
          Read John 3
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center rounded-full border border-ink-300 bg-card px-6 py-3 text-sm text-ink-900 hover:border-ink-900 transition-colors"
        >
          Search
        </Link>
      </div>

      <p className="mt-12 text-xs text-ink-500">
        If you got here from a broken link on the site, please{" "}
        <Link href="/help" className="underline hover:text-flame-700">
          tell us
        </Link>
        .
      </p>
    </section>
  );
}
