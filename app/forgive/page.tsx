import ForgiveView from "@/components/Forgive";

export const metadata = {
  title: "Forgiveness — Scripture Theory",
  description:
    "A pastoral, biblical walk through forgiveness — someone else, yourself, or an offense toward God. Seven steps, drawn from the Gospels, the cross of Christ, and centuries of pastoral care.",
};

export default function ForgivePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Forgiveness</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Lay down the debt.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Jesus said to forgive seventy-seven times — and from the heart. He would not command what
        He does not also empower. This is a private walk. It does not minimize what was done. It
        hands the debt to the One who keeps the books.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Be kind to one another, tenderhearted, forgiving one another, even as God in Christ
        forgave you." — Ephesians 4:32
      </p>

      <div className="mt-10">
        <ForgiveView />
      </div>
    </section>
  );
}
