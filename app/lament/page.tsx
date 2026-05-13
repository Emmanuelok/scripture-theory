import LamentView from "@/components/Lament";

export const metadata = {
  title: "Lament — Scripture Theory",
  description:
    "A guided lament walk for grief, anger, fear, and unanswered prayer — shaped by the Psalms. Five movements: turn, complaint, ask, trust, vow. Not stored. Spoken to God.",
};

export default function LamentPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Lament</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Bring the wound to the One who can hold it.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Lament is the prayer language of the Bible most modern Christians never learned. It is how
        the psalmists, the prophets, Job, and Jesus Himself spoke from inside grief. Five movements
        walk you through a real lament — privately, never saved.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "You have collected all my tears in Your bottle. You have recorded each one in Your book."
        — Psalm 56:8
      </p>

      <div className="mt-10">
        <LamentView />
      </div>
    </section>
  );
}
