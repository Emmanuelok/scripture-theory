import Link from "next/link";
import {
  yesterdaysNation,
  tomorrowsNation,
  upcomingNations,
} from "@/data/nations";
import { regions } from "@/data/nations";
import { flagEmoji } from "@/lib/flags";

export default function NationsTriptych() {
  const yesterday = yesterdaysNation();
  const tomorrow = tomorrowsNation();
  const upcoming = upcomingNations(7).slice(1); // skip today

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <SidewardCard
          eyebrow="Yesterday"
          iso={yesterday.iso}
          name={yesterday.name}
          region={regions[yesterday.region]}
          align="left"
        />
        <SidewardCard
          eyebrow="Tomorrow"
          iso={tomorrow.iso}
          name={tomorrow.name}
          region={regions[tomorrow.region]}
          align="right"
        />
      </div>

      <div className="rounded-2xl border border-ink-200 bg-card p-5">
        <div className="text-xs uppercase tracking-widest text-flame-700">
          On the rotation this week
        </div>
        <ol className="mt-3 space-y-1">
          {upcoming.map(({ date, nation }) => (
            <li key={date.toISOString()}>
              <Link
                href={`/pray/nations/${nation.iso.toLowerCase()}`}
                className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-ink-50 transition-colors"
              >
                <span className="w-20 text-xs text-ink-500 shrink-0 font-medium">
                  {date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                </span>
                <span className="text-xl" aria-hidden>{flagEmoji(nation.iso)}</span>
                <span className="text-ink-900">{nation.name}</span>
                <span className="text-xs text-ink-400 ml-auto">{regions[nation.region]}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function SidewardCard({
  eyebrow,
  iso,
  name,
  region,
  align,
}: {
  eyebrow: string;
  iso: string;
  name: string;
  region: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={`/pray/nations/${iso.toLowerCase()}`}
      className="block rounded-2xl border border-ink-200 bg-card p-5 hover:border-flame-500 transition-colors"
    >
      <div
        className={`text-xs uppercase tracking-widest text-flame-700 ${
          align === "right" ? "text-right" : ""
        }`}
      >
        {eyebrow}
      </div>
      <div
        className={`mt-2 flex items-baseline gap-3 ${
          align === "right" ? "flex-row-reverse text-right" : ""
        }`}
      >
        <span className="text-3xl" aria-hidden>{flagEmoji(iso)}</span>
        <div>
          <div className="font-serif text-xl text-ink-900">{name}</div>
          <div className="text-xs text-ink-500">{region}</div>
        </div>
      </div>
    </Link>
  );
}
