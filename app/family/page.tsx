import FamilyAltarView from "@/components/FamilyAltar";

export const metadata = {
  title: "Family Altar — Scripture Theory",
  description:
    "Daily household worship in seven steps — by age group, in ten minutes. The lost rhythm of Christian families, rebuilt for parents, spouses, and roommates who want to gather their home around Jesus.",
};

export default function FamilyPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Family Altar</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Bring the Word home.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Ten minutes. Seven simple steps. A different theme for each day of the week, with prompts
        and activities for littles, kids, youth, and adults. The home was always meant to be the
        first sanctuary. This is how to start tonight.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "You shall teach them diligently to your children, and shall talk of them when you sit in
        your house, when you walk by the way, when you lie down, and when you rise up." —
        Deuteronomy 6:7
      </p>

      <div className="mt-10">
        <FamilyAltarView />
      </div>
    </section>
  );
}
