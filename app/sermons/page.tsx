import SermonNotesView from "@/components/SermonNotes";

export const metadata = {
  title: "Sermon Notes — Scripture Theory",
  description:
    "Catch the Word you hear preached on Sunday — passage, big idea, outline, application, prayer. Cross-references into the Bible reader. Stays on your device.",
};

export default function SermonsPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Sermon Notes</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Don't lose Sunday's sermon by Wednesday.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The Word preached fades within hours unless you catch it. Capture it here — passage, big
        idea, outline, application, prayer. Re-open it through the week and let it shape Tuesday's
        choices, not just Sunday's feelings.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "These were more fair-minded than those in Thessalonica, in that they received the word
        with all readiness, and searched the Scriptures daily to find out whether these things
        were so." — Acts 17:11
      </p>

      <div className="mt-10">
        <SermonNotesView />
      </div>
    </section>
  );
}
