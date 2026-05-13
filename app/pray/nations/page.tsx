import { nations, rotationDay, todaysNation } from "@/data/nations";
import NationOfTheDay from "@/components/NationOfTheDay";
import NationsRhythm from "@/components/NationsRhythm";
import NationsTriptych from "@/components/NationsTriptych";

export const metadata = {
  title: "Praying for the Nations — Scripture Theory",
  description:
    "Every day, one nation. One flag. One focused moment of intercession. The whole Body of Christ praying for the same country, all over the world.",
};

export default function NationsPage() {
  const nation = todaysNation();
  const day = rotationDay();

  return (
    <section className="mx-auto max-w-3xl px-5 pt-10 pb-20">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-flame-700">
          Praying for the Nations
        </span>
        <h1 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900 leading-tight">
          Today the Body of Christ is praying for…
        </h1>
      </div>

      <div className="mt-8">
        <NationOfTheDay nation={nation} rotationDay={day} />
      </div>

      <div className="mt-8">
        <NationsRhythm />
      </div>

      <div className="mt-12">
        <NationsTriptych />
      </div>

      <div className="mt-12 rounded-2xl border border-ink-200 bg-ink-50/60 p-5 text-sm text-ink-700">
        <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
          How the rotation works
        </div>
        <p className="leading-relaxed">
          Every day, one specific country is lifted up with prayer points unique to its
          spiritual, pastoral, and humanitarian situation. The cycle runs through {nations.length}{" "}
          nations in {nations.length} days, then begins again. Wherever you are in the world,
          when you open this page today you are praying for <strong>{nation.name}</strong>{" "}
          alongside every other believer who opens it. The Lord of the nations is one God.
        </p>
      </div>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Ask of me, and I will make the nations your heritage, and the ends of the earth your
          possession."
        </p>
        <p className="mt-2 text-ink-300">Psalm 2:8</p>
      </div>
    </section>
  );
}
