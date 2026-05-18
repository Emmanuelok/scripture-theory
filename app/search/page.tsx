import SearchView from "@/components/SearchView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Search — Scripture Theory",
  description:
    "One search across Scripture, the glossary, topical index, creeds, apologetics, hymns, reading plans, prayer rhythms, and testimonies of Jesus.",
};

export default function SearchPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Search"
        title="One search bar,"
        titleAccent="the whole platform."
        intro="The Bible, the glossary, the topical index, the historic creeds, apologetics, hymns, reading plans, prayer rhythms, the persecuted Church, and testimonies. We lift up Christ wherever the answer lives."
      />
      <div className="mt-10">
        <SearchView />
      </div>
    </section>
  );
}
