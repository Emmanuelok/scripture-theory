import SearchView from "@/components/SearchView";

export const metadata = {
  title: "Search — Scripture Theory",
  description:
    "One search across Scripture, reading plans, prayer rhythms, churches, the Gospel, and testimonies of Jesus.",
};

export default function SearchPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Search</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Find any passage, plan, prayer, or church.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        One search bar across the whole platform. Bible references, reading-plan days, the Lord's
        Prayer line you half-remember, a city, a tradition, a verse that changed someone's life.
        We index it once and lift up Christ wherever the answer lives.
      </p>
      <div className="mt-10">
        <SearchView />
      </div>
    </section>
  );
}
