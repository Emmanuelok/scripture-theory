import ChurchFinder from "@/components/ChurchFinder";

export const metadata = {
  title: "One Body — Scripture Theory",
  description:
    "Jesus has one Church. Search the pilot directory across Lagos, São Paulo, Manila, Nairobi, and Phoenix — and request a warm intro to a real local pastor.",
};

const principles = [
  {
    title: "We are a bridge, not a destination.",
    body: "Scripture Theory is designed to make itself the second-most-used Christian tool in your life. Your local church should always be first.",
  },
  {
    title: "Warm intros, not cold pins.",
    body: "Instead of a map of churches you'll never visit, we connect you to a vetted local pastor or welcome-team leader with a brief, optional introduction.",
  },
  {
    title: "Tradition-honest filtering.",
    body: "Filter by city, language, and tradition — Anglican, Baptist, Catholic, Evangelical, Lutheran, Methodist, Non-denominational, Orthodox, Pentecostal, Presbyterian, Reformed.",
  },
  {
    title: "Pastor in the loop.",
    body: "Local pastors can claim their listing, set their discipleship culture, and shape how their flock is welcomed here.",
  },
];

export default function ConnectPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">One Body</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">
        Jesus has one Church. Find your room in it.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The Christian life is not lived alone. Jesus prayed His people would be one — and He has
        a real, local body of His people near you. We exist to introduce you to them, not to
        replace them.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-5">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl bg-white border border-ink-200 p-6">
            <div className="font-serif text-xl text-ink-900">{p.title}</div>
            <p className="mt-2 text-ink-700 leading-relaxed text-sm">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <span className="text-xs uppercase tracking-widest text-flame-700">Pilot directory</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">
              Search the five pilot cities.
            </h2>
          </div>
          <span className="text-xs text-ink-500 max-w-xs text-right">
            Pilot preview — 25 illustrative listings across 11 traditions. Real claimed listings open
            in Q3.
          </span>
        </div>

        <div className="mt-8">
          <ChurchFinder />
        </div>
      </div>

      <div className="mt-14 rounded-3xl border border-flame-200 bg-flame-50/60 p-6 md:p-8">
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">For pastors</div>
            <h3 className="font-serif text-2xl text-ink-900 mt-1">
              Pastor of a local church? Claim your listing.
            </h3>
            <p className="text-sm text-ink-700 mt-2 leading-relaxed max-w-xl">
              We exist <em>under</em> your work, not over it. Tell us about your church and we'll
              route newcomers to you on your terms — verified by a real person on our team before
              anything goes live.
            </p>
          </div>
          <a
            href="/connect/claim"
            className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors whitespace-nowrap"
          >
            Claim your church →
          </a>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "...that they may all be one... so that the world may believe that you have sent me."
        </p>
        <p className="mt-2 text-ink-300">John 17:21 — Jesus</p>
      </div>
    </section>
  );
}
