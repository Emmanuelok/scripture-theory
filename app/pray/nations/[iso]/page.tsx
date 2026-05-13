import Link from "next/link";
import { notFound } from "next/navigation";
import { nations, findNation, daysUntilNation, rotationCycleDay, todaysNation } from "@/data/nations";
import NationOfTheDay from "@/components/NationOfTheDay";
import { flagEmoji } from "@/lib/flags";

export function generateStaticParams() {
  return nations.map((n) => ({ iso: n.iso.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ iso: string }>;
}) {
  const { iso } = await params;
  const nation = findNation(iso);
  if (!nation) return { title: "Nation — Scripture Theory" };
  return {
    title: `Praying for ${nation.name} — Scripture Theory`,
    description: `${nation.context}`,
  };
}

export default async function NationPage({
  params,
}: {
  params: Promise<{ iso: string }>;
}) {
  const { iso } = await params;
  const nation = findNation(iso);
  if (!nation) notFound();

  const today = todaysNation();
  const isToday = nation.iso === today.iso;
  const daysUntil = daysUntilNation(nation.iso);

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link href="/pray/nations" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Today's nation
      </Link>

      {!isToday && (
        <div className="mt-4 rounded-2xl border border-flame-200 bg-flame-50/60 p-4 text-sm text-flame-900 flex flex-wrap items-center gap-3">
          <span className="text-xl" aria-hidden>{flagEmoji(nation.iso)}</span>
          <span>
            <strong>{nation.name}</strong> isn't today's nation —{" "}
            {daysUntil === 0
              ? "(today)"
              : daysUntil === 1
              ? "the rotation returns to this country tomorrow."
              : `the rotation will return to this country in ${daysUntil} days.`}
            {" "}You can still pray for it now.
          </span>
        </div>
      )}

      <div className="mt-6">
        <NationOfTheDay
          nation={nation}
          rotationDay={
            isToday
              ? rotationCycleDay()
              : rotationCycleDay(new Date(Date.now() + daysUntil * 86_400_000))
          }
        />
      </div>
    </section>
  );
}
