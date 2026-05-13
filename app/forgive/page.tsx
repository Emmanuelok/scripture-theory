import ForgiveView from "@/components/Forgive";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Forgiveness — Scripture Theory",
  description:
    "A pastoral, biblical walk through forgiveness — someone else, yourself, or an offense toward God. Seven steps, drawn from the Gospels, the cross of Christ, and centuries of pastoral care.",
};

export default function ForgivePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Seventy times seven"
        title="Lay down"
        titleAccent="the debt."
        intro="Jesus said to forgive seventy-seven times — and from the heart. He would not command what He does not also empower. This is a private walk. It does not minimize what was done. It hands the debt to the One who keeps the books."
        scripture="Be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you."
        scriptureRef="Ephesians 4:32"
      />
      <div className="mt-10">
        <ForgiveView />
      </div>
    </section>
  );
}
