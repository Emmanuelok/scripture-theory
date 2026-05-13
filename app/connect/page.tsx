import Link from "next/link";
import ChurchFinderWizard from "@/components/ChurchFinderWizard";
import { PageHero, Tile, Bento } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "One Body — Scripture Theory",
  description:
    "Find a real local Christian church anywhere on earth. Powered by OpenStreetMap (the same open data used by Apple Maps and Wikipedia). We ask you three questions, then surface real churches near you — never fabricated.",
};

const PRINCIPLES = [
  {
    glyph: "anchor" as const,
    title: "A bridge, not a destination",
    sub: "Scripture Theory is designed to be the second-most-used Christian tool in your life. Your local church is always first.",
  },
  {
    glyph: "globe" as const,
    title: "Real data, never invented",
    sub: "Every church we show comes from OpenStreetMap — the world's open, community-edited map. We will never mislead you with fabricated listings.",
  },
  {
    glyph: "compass" as const,
    title: "Three questions, then results",
    sub: "Where you are, how far you can travel, what tradition you'd like to start with. You can widen any of these from the results screen.",
  },
  {
    glyph: "shield" as const,
    title: "Verify before you visit",
    sub: "Each result links to Google Maps, the church's website, and the OpenStreetMap source. Confirm details with the church directly.",
  },
];

export default function ConnectPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="One Body"
        title="Jesus has one Church."
        titleAccent="Find your room in it."
        intro="The Christian life is not lived alone. Jesus prayed His people would be one — and He has a real, local body of His people near you. Answer three short questions and we'll surface the churches that match, anywhere on earth."
        scripture="…that they may all be one… so that the world may believe that you have sent me."
        scriptureRef="John 17:21"
      />

      <div className="mt-12">
        <ChurchFinderWizard />
      </div>

      {/* Principles */}
      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">How we do this</h2>
          <p className="text-sm text-ink-500 italic">Four principles, no exceptions.</p>
        </div>
        <Bento>
          {PRINCIPLES.map((p) => (
            <Tile
              key={p.title}
              title={p.title}
              sub={p.sub}
              glyph={<Glyph id={p.glyph} size={48} />}
            />
          ))}
        </Bento>
      </div>

      {/* Pastor's lane — featured CTA */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow="For pastors"
        title={
          <>
            Pastor of a local church?{" "}
            <span className="text-flame-300">Help us send your sheep home.</span>
          </>
        }
        sub="We surface every Christian church OpenStreetMap has tagged. If your church is missing or its details are outdated, edit it on OpenStreetMap and the change flows to us automatically. You can also claim your presence on Scripture Theory so newcomers in your city can be introduced to you."
        glyph={<Glyph id="house" size={120} />}
        className="mt-16"
      >
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/connect/claim"
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-500 transition-colors"
          >
            Claim your church →
          </Link>
          <Link
            href="/connect/dashboard"
            className="inline-flex items-center rounded-full border border-ink-700 text-ink-50 px-5 py-2 text-sm hover:border-flame-300 transition-colors"
          >
            Preview the dashboard
          </Link>
          <a
            href="https://www.openstreetmap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-ink-700 text-ink-300 px-5 py-2 text-sm hover:border-flame-300 hover:text-ink-50 transition-colors"
          >
            Edit on OpenStreetMap ↗
          </a>
        </div>
      </Tile>

      <p className="mt-12 text-xs text-ink-500 leading-relaxed text-center max-w-xl mx-auto">
        Data: © OpenStreetMap contributors (ODbL). Geocoding: Nominatim · OpenStreetMap. We never
        sell, share, or store your location.
      </p>
    </section>
  );
}
