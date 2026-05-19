import Link from "next/link";
import ArmorOfGod from "@/components/ArmorOfGod";
import ScriptureRef from "@/components/ScriptureRef";

export const metadata = {
  title: "The Armor of God — Scripture Theory",
  description:
    "Ephesians 6:10-18 — the six pieces of armour and the prayer that surrounds them. The believer's standing posture against the powers.",
};

export default function ArmorPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        The <span className="gradient-text">whole armour</span> of God.
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        Paul wrote this passage from a Roman cell, chained to a soldier. He turned
        the picture sideways — the believer's real battle is not with people but
        with the powers, and the dress for it is given by God. Six pieces, plus
        the prayer that surrounds them.
      </p>

      <div className="mt-10">
        <ArmorOfGod />
      </div>

      <div className="mt-12 rounded-3xl bg-flame-50/60 border border-flame-300 p-6">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">The whole passage</div>
        <ScriptureRef reference="Ephesians 6:10-18" className="font-serif text-2xl text-ink-900 mt-1 block" />
        <p className="mt-3 text-sm text-ink-700 italic leading-relaxed">
          &ldquo;Finally, be strong in the Lord and in the strength of His might. Put on
          the whole armour of God, that you may be able to stand against the schemes of
          the devil… therefore take up the whole armour of God, that you may be able to
          withstand in the evil day, and having done all, to stand.&rdquo;
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h2 className="font-serif text-xl text-ink-900">Three reminders</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-700 leading-relaxed">
          <li>
            <strong className="text-ink-900">Put it on, plural.</strong> Paul addresses the
            church together. Spiritual warfare is not for lone wolves; we stand together.
          </li>
          <li>
            <strong className="text-ink-900">Stand, four times.</strong> The verb of victory
            in Ephesians 6 is not <em>attack</em> — it is <em>stand</em>. The ground has been
            taken by Christ; the church holds it.
          </li>
          <li>
            <strong className="text-ink-900">Pray in the Spirit.</strong> The armour list ends
            in prayer, not in any of the six pieces. Prayer is the air the armour is worn in.
          </li>
        </ul>
      </div>
    </section>
  );
}
