import CatechismView from "@/components/CatechismView";

export const metadata = {
  title: "The Heidelberg Catechism — Scripture Theory",
  description:
    "The 1563 Heidelberg Catechism — 129 questions and answers across 52 weekly Lord's Days, in three movements: misery, deliverance, gratitude. The warmest catechism the Church has produced.",
};

export default function CatechismPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Catechism</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        "What is your only comfort in life and in death?"
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        That is how the Heidelberg Catechism begins — a 1563 question that has shaped the dying
        breath of saints for four centuries. 129 Q&amp;A across 52 Lord's Days. One per week,
        every week of the year.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "I and the children whom the LORD has given me are for signs and wonders in Israel." —
        Isaiah 8:18
      </p>

      <div className="mt-10">
        <CatechismView />
      </div>
    </section>
  );
}
