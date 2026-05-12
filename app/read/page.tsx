import ReadingPlanView from "@/components/ReadingPlan";

export const metadata = {
  title: "Read the Word — Scripture Theory",
  description:
    "Daily Scripture, simple plans, no noise. Begin with John in 30 days, the Psalms in 30 days, or the whole New Testament in 90 days.",
};

export default function ReadPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Read the Word</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        A small, daily rhythm with Jesus and His Word.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        We have not added a feed, a streak system, or a celebrity. We have just opened the
        Scriptures, picked three short plans, and asked you to come back tomorrow. Jesus will meet
        you in them.
      </p>

      <div className="mt-10">
        <ReadingPlanView />
      </div>
    </section>
  );
}
