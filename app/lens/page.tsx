import VerseLens from "@/components/VerseLens";

export const metadata = {
  title: "Verse Lens — Scripture Theory",
  description:
    "See any passage through the lenses of Orthodox, Catholic, Reformed, Wesleyan, Pentecostal, and Anabaptist traditions — with named sources, no invented verses.",
};

export default function LensPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-10 pb-16">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-flame-700">Flagship demo</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">Verse Lens</h1>
        <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
          One passage. Six traditions. Named voices. No invented verses. This is the kind of AI
          experience the Church has been asking for and no major platform has shipped — because
          getting it right requires holding inter-denominational unity and citation rigor at the
          same time.
        </p>
        <div className="mt-4 text-xs text-ink-500 max-w-2xl">
          The demo below is built on a curated, source-grounded dataset. It is the same surface our
          retrieval layer will fill at scale — see the Roadmap for how this expands to 50, then
          5,000, then the whole canon.
        </div>
      </div>

      <VerseLens />
    </section>
  );
}
