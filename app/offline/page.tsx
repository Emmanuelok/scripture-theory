import Link from "next/link";

export const metadata = {
  title: "Offline — Scripture Theory",
  description:
    "You're offline. Open a chapter you've already read, your Secret Place, or wait for signal.",
};

export default function OfflinePage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pt-16 pb-24 text-center">
      <span className="text-xs uppercase tracking-widest text-flame-700">No signal</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        He is with you even here.
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed">
        The page you wanted isn't cached on this device yet. Here's what still works without signal:
      </p>
      <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-left">
        <Link
          href="/bible"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">The Word</div>
          <div className="font-serif text-ink-900 mt-1">Bible — chapters you've read</div>
        </Link>
        <Link
          href="/secret-place"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Matthew 6:6</div>
          <div className="font-serif text-ink-900 mt-1">Secret Place — all on this device</div>
        </Link>
        <Link
          href="/hours"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">Psalm 119:164</div>
          <div className="font-serif text-ink-900 mt-1">The Daily Office</div>
        </Link>
        <Link
          href="/me"
          className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
        >
          <div className="text-[10px] uppercase tracking-widest text-flame-700">My walk</div>
          <div className="font-serif text-ink-900 mt-1">Your data, on this device</div>
        </Link>
      </ul>
      <blockquote className="mt-12 prose-scripture text-ink-700 italic">
        "Where can I go from Your Spirit? Where can I flee from Your presence? … If I take the wings
        of the dawn and dwell in the remotest part of the sea, even there Your hand will lead me,
        and Your right hand will lay hold of me."
      </blockquote>
      <p className="mt-3 text-xs text-ink-500">Psalm 139:7, 9–10</p>
    </section>
  );
}
