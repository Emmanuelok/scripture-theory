import { nations, rotationCycleDay, todaysNation, NATION_CYCLE_LENGTH } from "@/data/nations";
import NationOfTheDay from "@/components/NationOfTheDay";
import NationsRhythm from "@/components/NationsRhythm";
import NationsTriptych from "@/components/NationsTriptych";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Praying for the Nations — Scripture Theory",
  description:
    "Every day, one nation. One flag. One focused moment of intercession. The whole Body of Christ praying for the same country, all over the world.",
};

// Today-keyed content (todaysNation, rotationCycleDay) — rebuild hourly so
// the daily rotation reflects the actual UTC day, not the build day.
export const revalidate = 3600;

export default function NationsPage() {
  const nation = todaysNation();
  const day = rotationCycleDay();

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow={`Day ${day} of ${NATION_CYCLE_LENGTH} · Praying for the Nations`}
        title="Today the Body of Christ"
        titleAccent="is praying for…"
        intro={`Every day, one specific country is lifted up by the whole platform — with prayer points unique to its spiritual, pastoral, and humanitarian situation. The cycle runs through ${nations.length} nations, then begins again. Wherever you are in the world, when you open this page today, you are praying with every other believer who opens it.`}
        scripture="Ask of me, and I will make the nations your heritage, and the ends of the earth your possession."
        scriptureRef="Psalm 2:8"
      />

      <div className="mt-12">
        <NationOfTheDay nation={nation} rotationDay={day} />
      </div>

      <div className="mt-10">
        <NationsRhythm />
      </div>

      <div className="mt-14">
        <NationsTriptych />
      </div>

      <Tile
        size="wide"
        tone="dark"
        eyebrow="How the rotation works"
        title="One Lord. One field. Every nation, in time."
        sub={`Each opening of the cycle lifts up a different country — by name, with prayer points unique to its situation. The pattern runs through ${nations.length} nations in ${nations.length} days, then begins again. Today, you are praying for ${nation.name} alongside every other believer who opens this page.`}
        glyph={<Glyph id="globe" size={120} />}
        className="mt-14"
      />
    </section>
  );
}
