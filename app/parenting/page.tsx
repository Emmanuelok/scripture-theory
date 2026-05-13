import ParentingView from "@/components/ParentingView";

export const metadata = {
  title: "Parenting Prayer Rhythm — Scripture Theory",
  description:
    "A daily prayer rhythm for parents — seven daily themes (their hearts, my example, friends, salvation, weariness, calling, faith handed on), Scripture, prayer, and a list of children by name.",
};

export default function ParentingPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Parenting</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Pray your children. By name.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Of everything you will do for your children — your prayer is the most consequential and
        the most invisible. Seven daily themes shaped by Scripture, with space to add each child
        by name and today's focus.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Train up a child in the way he should go: and when he is old, he will not depart from
        it." — Proverbs 22:6
      </p>

      <div className="mt-10">
        <ParentingView />
      </div>
    </section>
  );
}
