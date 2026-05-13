import ListenView from "@/components/ListenView";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Listening Prayer — Scripture Theory",
  description:
    "How God speaks — and how to listen. A 7-step listening prayer practice with Scripture, silence timer, and a private journal. Tested against the Word and the witness of the Body.",
};

export default function ListenPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · Hearing God"
        title={`"My sheep`}
        titleAccent={`hear My voice."`}
        intro="Most of us pray. Far fewer have learned to listen. Yet the whole Bible is the story of a God who speaks — and of His people learning to recognize the still small voice. Seven steps, with Scripture, silence, and the guardrails that keep this safe."
        scripture="Speak, LORD, for Your servant hears."
        scriptureRef="1 Samuel 3:9"
      />
      <div className="mt-10">
        <ListenView />
      </div>
    </section>
  );
}
