import VerseLens from "@/components/VerseLens";

export const metadata = {
  title: "Jesus in the Word — Scripture Theory",
  description:
    "Open any passage and see how it points to Christ — with the One Gospel held by the whole Church in view, and the voices of brothers and sisters across the centuries.",
};

export default function LensPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-10 pb-16">
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-flame-700">Jesus in the Word</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900">
          Every page is about Him.
        </h1>
        <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
          Open a passage and we lift up Jesus first. Then we show what the whole Church confesses
          here together. Then — if you want to go deeper — we offer the meditations of brothers and
          sisters across the centuries and the continents who have loved Him in this verse.
        </p>
        <p className="mt-3 text-xs text-ink-500 max-w-2xl">
          We are not denominational. We are not flattening differences either. We hold up the one
          Lord, the one Gospel, and the many gifts His family has carried for one another.
        </p>
      </div>

      <VerseLens />
    </section>
  );
}
