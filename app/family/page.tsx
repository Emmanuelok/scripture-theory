import FamilyAltarView from "@/components/FamilyAltar";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Family Altar — Scripture Theory",
  description:
    "Daily household worship in seven steps — by age group, in ten minutes. The lost rhythm of Christian families, rebuilt for parents, spouses, and roommates who want to gather their home around Jesus.",
};

export default function FamilyPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Deuteronomy 6:7"
        title="Bring the Word"
        titleAccent="home."
        intro="Ten minutes. Seven simple steps. A different theme for each day of the week, with prompts and activities for littles, kids, youth, and adults. The home was always meant to be the first sanctuary. This is how to start tonight."
        scripture="You shall teach them diligently to your children, and shall talk of them when you sit in your house, when you walk by the way, when you lie down, and when you rise up."
        scriptureRef="Deuteronomy 6:7"
      />
      <div className="mt-10">
        <FamilyAltarView />
      </div>
    </section>
  );
}
