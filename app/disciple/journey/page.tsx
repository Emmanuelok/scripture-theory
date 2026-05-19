import Link from "next/link";
import JourneyTracker from "@/components/JourneyTracker";
import PersonalSubNav from "@/components/PersonalSubNav";
import DiscipleshipStations from "@/components/DiscipleshipStations";

export const metadata = {
  title: "Discipleship Journey — Scripture Theory",
  description:
    "A quiet, on-device counter for the souls you're praying for, witnessing to, and discipling. Track stages, log events, and see the Kingdom multiply.",
};

export default function JourneyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link href="/disciple" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← The Path
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Discipleship Journey.
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">
        Your private record of the souls you're praying for, witnessing to, and discipling. Add a
        name. Log what happened today. Watch one person move from praying-for to baptized to
        discipling someone else — and the Kingdom multiplies (2 Timothy 2:2).
      </p>

      <div className="mt-10">
        <PersonalSubNav />
        <div className="mt-6">
          <DiscipleshipStations />
        </div>
        <JourneyTracker />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "The things which you have heard from me among many witnesses, commit to faithful men
          who will be able to teach others also."
        </p>
        <p className="mt-2 text-ink-300">2 Timothy 2:2</p>
      </div>
    </section>
  );
}
