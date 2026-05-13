import FastingView from "@/components/Fasting";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Fasting — Scripture Theory",
  description:
    "A biblical guide to fasting — full, partial, Daniel, sundown, media — with a private fast tracker, Scripture, prayer liturgy, and pastoral cautions. Jesus said 'when you fast.'",
};

export default function FastPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Matthew 6:16"
        title={<>"When you fast." <span className="text-ink-500">— Jesus</span></>}
        titleAccent="Not if. When."
        intro="Fasting is one of the lost rhythms of the Western church — an old, normal, joyful weapon. How to begin, what kind of fast to choose, what Scripture says, and a quiet tracker that lives only on your device."
        scripture="Whenever you fast… anoint your head and wash your face, that your fasting may not be seen by people, but by your Father, who is in secret."
        scriptureRef="Matthew 6:17–18"
      />
      <div className="mt-10">
        <FastingView />
      </div>
    </section>
  );
}
