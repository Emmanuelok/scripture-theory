import HymnsView from "@/components/HymnsView";
import { hymns, hymnCategories } from "@/data/hymns";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Hymns — Scripture Theory",
  description:
    "A library of public-domain hymns the Church has sung for centuries — from Luther and Wesley to Watts, Spafford, and the African-American spirituals. Sing them. Pray them. Hand them down.",
};

export default function HymnsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow={`${hymns.length} hymns · public domain`}
        title="The songs the Church"
        titleAccent="has sung for centuries."
        intro="Luther, Wesley, Watts, Spafford, Newton, the African-American spirituals — organized by what they teach. The modern church often forgets these. But the dying have been carried out of this world on these words for centuries. Sing them. Pray them. Hand them down."
        scripture="Speaking to one another in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord."
        scriptureRef="Ephesians 5:19"
      />

      <div className="mt-8 flex flex-wrap gap-1.5">
        {Object.values(hymnCategories).map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center rounded-full border border-ink-200 bg-card px-3 py-1 text-[10px] uppercase tracking-widest text-flame-700"
          >
            {c.label}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <HymnsView />
      </div>
    </section>
  );
}
