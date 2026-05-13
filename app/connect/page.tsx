import ChurchFinderWizard from "@/components/ChurchFinderWizard";

export const metadata = {
  title: "One Body — Scripture Theory",
  description:
    "Find a real local Christian church anywhere on earth. Powered by OpenStreetMap (the same open data used by Apple Maps and Wikipedia). We ask you three questions, then surface real churches near you — never fabricated.",
};

const principles = [
  {
    title: "We are a bridge, not a destination.",
    body: "Scripture Theory is designed to make itself the second-most-used Christian tool in your life. Your local church should always be first.",
  },
  {
    title: "Real data, never invented.",
    body: "Every church we show comes from OpenStreetMap — the world's open, community-edited map. We will never mislead you with fabricated listings.",
  },
  {
    title: "Three questions, then results.",
    body: "We ask where you are, how far you can travel, and what tradition you'd like to start with. You can widen any of these from the results screen.",
  },
  {
    title: "Verify before you visit.",
    body: "Each result links to Google Maps directions, the church's website (if listed), and the source entry on OpenStreetMap. Confirm details with the church directly.",
  },
];

export default function ConnectPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">One Body</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">
        Jesus has one Church. Find your room in it.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The Christian life is not lived alone. Jesus prayed His people would be one — and He has
        a real, local body of His people near you. Answer three short questions and we'll surface
        the churches that match, anywhere on earth.
      </p>

      <div className="mt-10">
        <ChurchFinderWizard />
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-4">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl bg-card border border-ink-200 p-5">
            <div className="font-serif text-lg text-ink-900">{p.title}</div>
            <p className="mt-1.5 text-ink-700 leading-relaxed text-sm">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-flame-200 bg-flame-50/60 p-6 md:p-8">
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700">For pastors</div>
            <h3 className="font-serif text-2xl text-ink-900 mt-1">
              Pastor of a local church?
            </h3>
            <p className="text-sm text-ink-700 mt-2 leading-relaxed max-w-xl">
              We surface every Christian church OpenStreetMap has tagged. If your church is missing
              or its details are outdated, the best fix is to{" "}
              <a
                href="https://www.openstreetmap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame-700 underline"
              >
                edit it directly on OpenStreetMap
              </a>
              {" "}— the change flows to us automatically. You can also claim your presence on Scripture Theory below.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href="/connect/claim"
              className="inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors whitespace-nowrap"
            >
              Claim your church →
            </a>
            <a
              href="/connect/dashboard"
              className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-800 hover:border-ink-900 transition-colors whitespace-nowrap"
            >
              Preview the dashboard
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "...that they may all be one... so that the world may believe that you have sent me."
        </p>
        <p className="mt-2 text-ink-300">John 17:21 — Jesus</p>
      </div>

      <p className="mt-6 text-xs text-ink-500 leading-relaxed text-center max-w-xl mx-auto">
        Data: © OpenStreetMap contributors (ODbL). Geocoding: Nominatim · OpenStreetMap.
        We never sell, share, or store your location.
      </p>
    </section>
  );
}
