import CatechismView from "@/components/CatechismView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "The Heidelberg Catechism — Scripture Theory",
  description:
    "The 1563 Heidelberg Catechism — 129 questions and answers across 52 weekly Lord's Days, in three movements: misery, deliverance, gratitude. The warmest catechism the Church has produced.",
};

export default function CatechismPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="1563 · The Heidelberg Catechism"
        title="What is your only comfort"
        titleAccent="in life and in death?"
        intro="That is how the Heidelberg Catechism begins — a 1563 question that has shaped the dying breath of saints for four centuries. 129 Q&A across 52 Lord's Days, in three movements: misery, deliverance, gratitude. One per week, every week of the year."
        scripture="I and the children whom the LORD has given me are for signs and wonders in Israel."
        scriptureRef="Isaiah 8:18"
      />
      <div className="mt-10">
        <CatechismView />
      </div>
    </section>
  );
}
