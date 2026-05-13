import StartFlow from "@/components/StartFlow";

export const metadata = {
  title: "Start — Scripture Theory",
  description:
    "Three short questions so we can meet you where you are: your stage with Jesus, your language, and what you need most today.",
};

export default function StartPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Start here</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Three short questions.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        We don't ask for your email, your name, or your money. We just want to meet you where you
        are so that whatever we offer next actually serves you. Your answers stay on this device.
      </p>

      <div className="mt-10">
        <StartFlow />
      </div>
    </section>
  );
}
