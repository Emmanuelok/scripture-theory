import SermonNotesView from "@/components/SermonNotes";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Sermon Notes — Scripture Theory",
  description:
    "Catch the Word you hear preached on Sunday — passage, big idea, outline, application, prayer. Cross-references into the Bible reader. Stays on your device.",
};

export default function SermonsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Sermon Notes"
        title="Don't lose Sunday's sermon"
        titleAccent="by Wednesday."
        intro="The Word preached fades within hours unless you catch it. Capture it here — passage, big idea, outline, application, prayer. Re-open it through the week and let it shape Tuesday's choices, not just Sunday's feelings."
        scripture="These were more fair-minded than those in Thessalonica, in that they received the word with all readiness, and searched the Scriptures daily to find out whether these things were so."
        scriptureRef="Acts 17:11"
      />
      <div className="mt-10">
        <SermonNotesView />
      </div>
    </section>
  );
}
