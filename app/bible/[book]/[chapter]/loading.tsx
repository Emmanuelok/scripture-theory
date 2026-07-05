/** Streaming fallback while a chapter is fetched from the upstream source. */
export default function Loading() {
  return (
    <section className="mx-auto max-w-3xl px-3 sm:px-5 pt-8 sm:pt-12 pb-32 sm:pb-24" aria-busy="true">
      <span className="sr-only">Loading chapter…</span>
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-20 rounded bg-ink-200" />
        <div className="h-10 w-1/2 rounded bg-ink-200" />
        <div className="space-y-3 pt-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-ink-100" style={{ width: `${95 - (i % 4) * 8}%` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
