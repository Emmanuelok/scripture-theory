import MarriageView from "@/components/MarriageView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Marriage Prayer Rhythm — Scripture Theory",
  description:
    "A daily prayer rhythm for marriage — seven daily themes (Christ-center, words, repentance, service, joy, Sabbath, worship), Scripture, prayer, and weekly intentions before the Lord.",
};

export default function MarriagePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Ephesians 5:32"
        title="Pray your marriage."
        titleAccent="Daily."
        intro="Marriage is a picture of Christ and the Church — not a contract to survive. Seven short prayer rhythms for the days of the week, plus intentions you commit to before the Lord."
        scripture="What God has joined together, let not man separate."
        scriptureRef="Mark 10:9"
      />
      <div className="mt-10">
        <MarriageView />
      </div>
    </section>
  );
}
