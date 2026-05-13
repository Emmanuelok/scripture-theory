import HymnsView from "@/components/HymnsView";
import { hymns, hymnCategories } from "@/data/hymns";

export const metadata = {
  title: "Hymns — Scripture Theory",
  description:
    "A library of public-domain hymns the Church has sung for centuries — from Luther and Wesley to Watts, Spafford, and the African-American spirituals. Sing them. Pray them. Hand them down.",
};

export default function HymnsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Hymns</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The songs the Church has sung.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        {hymns.length} public-domain hymns — Luther, Wesley, Watts, Spafford, and more —
        organized by what they teach. The modern church often forgets these. But the dying have
        been carried out of this world on these words for centuries. Sing them. Pray them.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Speaking to one another in psalms and hymns and spiritual songs, singing and making
        melody in your heart to the Lord." — Ephesians 5:19
      </p>

      <div className="mt-10">
        <HymnsView />
      </div>

      <div className="mt-16 rounded-2xl border border-ink-200 bg-card-subtle p-5 text-sm text-ink-600">
        Categories: {Object.values(hymnCategories).map((c) => c.label).join(" · ")}
      </div>
    </section>
  );
}
