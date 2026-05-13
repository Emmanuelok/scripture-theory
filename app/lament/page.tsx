import LamentView from "@/components/Lament";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Lament — Scripture Theory",
  description:
    "A guided lament walk for grief, anger, fear, and unanswered prayer — shaped by the Psalms. Five movements: turn, complaint, ask, trust, vow. Not stored. Spoken to God.",
};

export default function LamentPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · The Psalms · Lament"
        title="Bring the wound"
        titleAccent="to the One who can hold it."
        intro="Lament is the prayer language of the Bible most modern Christians never learned. It is how the psalmists, the prophets, Job, and Jesus Himself spoke from inside grief. Five movements walk you through a real lament — privately, never saved."
        scripture="You have collected all my tears in Your bottle. You have recorded each one in Your book."
        scriptureRef="Psalm 56:8"
      />
      <div className="mt-10">
        <LamentView />
      </div>
    </section>
  );
}
