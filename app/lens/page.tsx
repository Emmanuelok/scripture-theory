import VerseLens from "@/components/VerseLens";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Jesus in the Word — Scripture Theory",
  description:
    "Open any passage and see how it points to Christ — with the One Gospel held by the whole Church in view, and the voices of brothers and sisters across the centuries.",
};

export default function LensPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Multi-tradition lens"
        title="Every page"
        titleAccent="is about Him."
        intro="Open a passage and we lift up Jesus first. Then we show what the whole Church confesses here together. Then — if you want to go deeper — we offer the meditations of brothers and sisters across the centuries and the continents who have loved Him in this verse."
        scripture="You search the Scriptures, because you think that in them you have eternal life; and these are they which testify about me."
        scriptureRef="John 5:39 — Jesus"
      />
      <p className="mt-3 text-xs text-ink-500 max-w-2xl">
        We are not denominational. We are not flattening differences either. We hold up the one
        Lord, the one Gospel, and the many gifts His family has carried for one another.
      </p>
      <div className="mt-10">
        <VerseLens />
      </div>
    </section>
  );
}
