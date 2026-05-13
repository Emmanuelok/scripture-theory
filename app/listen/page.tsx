import ListenView from "@/components/ListenView";

export const metadata = {
  title: "Listening Prayer — Scripture Theory",
  description:
    "How God speaks — and how to listen. A 7-step listening prayer practice with Scripture, silence timer, and a private journal. Tested against the Word and the witness of the Body.",
};

export default function ListenPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Practice · Listening Prayer
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        "My sheep hear My voice." — Jesus
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Most of us pray. Far fewer have learned to listen. Yet the whole Bible is the story of a
        God who speaks — and of His people learning to recognize the still small voice. Seven
        steps, with Scripture, silence, and the guardrails that keep this safe.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Speak, LORD, for Your servant hears." — 1 Samuel 3:9
      </p>

      <div className="mt-10">
        <ListenView />
      </div>
    </section>
  );
}
