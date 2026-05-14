import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph, type GlyphId } from "@/components/ui/Glyph";
import {
  feastOn,
  feastsInYear,
  fmtFeastDate,
  fmtFullDate,
  nextFeastWithin,
  seasonOn,
  SEASONS,
  type FeastId,
} from "@/lib/calendar";

export const metadata = {
  title: "The Christian Year — Scripture Theory",
  description:
    "The shape of the Christian year — Advent through Christ the King. Today's season and feast, with Scripture, prayer prompts, and practices held in common by the whole Body.",
};

const SEASON_GLYPH: Record<string, GlyphId> = {
  advent: "lamp",
  christmas: "lamp",
  epiphany: "globe",
  "ordinary-pre-lent": "tree",
  lent: "door",
  "holy-week": "cross",
  easter: "flame",
  "pentecost-season": "dove",
  "ordinary-after-pentecost": "tree",
};

const FEAST_GLYPH: Record<FeastId, GlyphId> = {
  "christmas-eve": "lamp",
  christmas: "lamp",
  "epiphany-day": "globe",
  "ash-wednesday": "door",
  "palm-sunday": "wreath",
  "maundy-thursday": "chalice",
  "good-friday": "cross",
  "holy-saturday": "door",
  "easter-day": "flame",
  ascension: "dove",
  "pentecost-day": "dove",
  "trinity-sunday": "wreath",
  "all-saints": "people",
  "christ-the-king": "key",
};

export default function CalendarPage() {
  const now = new Date();
  const today = seasonOn(now);
  const feastToday = feastOn(now);
  const next = nextFeastWithin(now, 60);

  const year = now.getUTCFullYear();
  const thisYearFeasts = feastsInYear(year);
  const upcoming = thisYearFeasts.filter((f) => f.date >= now);
  const past = thisYearFeasts.filter((f) => f.date < now);

  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="The Christian year"
        title="Today's place"
        titleAccent="in the story."
        intro="The Church has always kept time differently — by the life of Christ, not the calendar's quarters. From Advent's watching through Christ the King, every season points at Jesus."
        scripture="There is a time for everything, and a season for every activity under the heavens."
        scriptureRef="Ecclesiastes 3:1"
      />

      {/* Today's season — featured */}
      <Tile
        size="wide"
        tone="dark"
        eyebrow={feastToday ? `Feast · ${feastToday.name}` : "Today · " + today.season.name}
        title={feastToday ? feastToday.tagline : today.season.tagline}
        glyph={
          <Glyph
            id={feastToday ? FEAST_GLYPH[feastToday.id] : SEASON_GLYPH[today.season.id] ?? "flame"}
            size={120}
          />
        }
        className="mt-12"
      >
        <blockquote className="mt-4 border-l-2 border-flame-500/70 pl-4 italic text-flame-100/90 leading-relaxed max-w-2xl">
          "{(feastToday ?? today.season).scripture.text}"
          <span className="block not-italic text-[11px] text-flame-300 mt-1.5 tracking-wide">
            — {(feastToday ?? today.season).scripture.ref}
          </span>
        </blockquote>
        {!feastToday && (
          <p className="mt-4 text-sm text-ink-300 leading-relaxed max-w-2xl">
            {today.season.about}
          </p>
        )}
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-ink-800/40 border border-ink-700/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-flame-300/80">
              Pray today
            </div>
            <ul className="mt-1.5 space-y-1.5 text-sm text-ink-100">
              {today.season.pray.slice(0, 2).map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-flame-300 mt-1">·</span>
                  <span className="italic leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-ink-800/40 border border-ink-700/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-flame-300/80">
              Practice this week
            </div>
            <ul className="mt-1.5 space-y-1.5 text-sm text-ink-100">
              {today.season.practices.slice(0, 2).map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-flame-300 mt-1">·</span>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Tile>

      {/* Coming up */}
      {next && (
        <div className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
            <h2 className="font-serif text-2xl md:text-3xl text-ink-900">Coming up</h2>
            <p className="text-sm text-ink-500 italic">
              {next.in === 1 ? "Tomorrow" : `${next.in} days from today`}
            </p>
          </div>
          <Tile
            tone="light"
            size="wide"
            eyebrow={fmtFullDate(next.on)}
            title={next.feast.name}
            sub={next.feast.tagline}
            glyph={<Glyph id={FEAST_GLYPH[next.feast.id]} size={64} />}
          >
            <blockquote className="mt-3 border-l-2 border-flame-500/70 pl-3 italic text-sm text-ink-700">
              "{next.feast.scripture.text}"
              <span className="block not-italic text-[11px] text-ink-500 mt-1">
                — {next.feast.scripture.ref}
              </span>
            </blockquote>
          </Tile>
        </div>
      )}

      {/* All seasons */}
      <div className="mt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
          <h2 className="font-serif text-2xl md:text-3xl text-ink-900">
            The full year, season by season
          </h2>
          <p className="text-sm text-ink-500 italic">Held in common by the global Body.</p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {(Object.values(SEASONS)).map((s) => {
            const isNow = today.season.id === s.id;
            return (
              <li key={s.id}>
                <div
                  className={[
                    "group relative h-full overflow-hidden rounded-3xl border p-5 md:p-6 transition-all",
                    isNow
                      ? "border-flame-500 bg-flame-50/40 shadow-[0_18px_50px_-20px_rgba(249,115,22,0.32)]"
                      : "border-ink-200 bg-card hover:border-flame-500/60",
                  ].join(" ")}
                >
                  <span
                    aria-hidden
                    className="absolute right-4 top-4 text-flame-700/25 group-hover:text-flame-700/60 transition-colors"
                  >
                    <Glyph id={SEASON_GLYPH[s.id] ?? "flame"} size={44} />
                  </span>
                  <div className="text-[10px] uppercase tracking-widest text-flame-700">
                    {isNow ? "Now" : s.color}
                  </div>
                  <h3 className="font-serif text-xl text-ink-900 mt-1">{s.name}</h3>
                  <p className="text-xs italic text-ink-500 mt-0.5">{s.tagline}</p>
                  <p className="mt-3 text-sm text-ink-700 leading-relaxed">{s.about}</p>
                  <div className="mt-3 text-[11px] text-ink-500">
                    Anchor: {s.scripture.ref}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The feast list for this year */}
      <div className="mt-14">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Feasts in {year}
        </h2>
        <ol className="space-y-2">
          {[...upcoming, ...past].map((f) => {
            const isToday = feastToday?.id === f.id;
            const isPast = f.date < now && !isToday;
            return (
              <li
                key={f.id}
                className={[
                  "rounded-2xl border p-4 flex items-start gap-4",
                  isToday
                    ? "border-flame-500 bg-flame-50/40"
                    : isPast
                    ? "border-ink-200 bg-card-subtle opacity-70"
                    : "border-ink-200 bg-card",
                ].join(" ")}
              >
                <div
                  className={[
                    "shrink-0 w-20 text-center",
                    isToday ? "text-flame-700" : isPast ? "text-ink-400" : "text-ink-600",
                  ].join(" ")}
                >
                  <div className="text-[10px] uppercase tracking-widest">
                    {fmtFeastDate(f.date).split(",")[0]}
                  </div>
                  <div className="font-serif text-2xl mt-0.5">
                    {f.date.toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      timeZone: "UTC",
                    })}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-serif text-lg text-ink-900">{f.feast.name}</h3>
                    {isToday && (
                      <span className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-2 py-0.5 text-[10px] uppercase tracking-widest">
                        Today
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink-600 italic">{f.feast.tagline}</p>
                  <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">
                    {f.feast.scripture.text}
                    <span className="text-flame-700"> · {f.feast.scripture.ref}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Cross-link footer */}
      <div className="mt-14 grid md:grid-cols-2 gap-3">
        <Tile
          href="/hours"
          eyebrow="Pray with the Church"
          title="The Daily Office"
          sub="Morning, midday, evening, and night prayer — kept by the worldwide Body across every season."
          glyph={<Glyph id="hours" size={48} />}
        />
        <Tile
          href="/practices"
          eyebrow="Old paths"
          title="Practices for this season"
          sub="Match a practice to the day. Lent calls for fasting. Eastertide for hymns. Ordinary Time for the slow walk."
          glyph={<Glyph id="rule" size={48} />}
        />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug italic">
            "Jesus Christ is the same yesterday and today and forever."
          </p>
          <p className="mt-2 text-ink-300">Hebrews 13:8</p>
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-500 text-center max-w-xl mx-auto">
        Dates follow the Western (Gregorian) computus. Eastern Orthodox dating differs in some
        years; we honor that family of the Body but do not yet render their calendar.{" "}
        <Link href="/about" className="underline">
          About this site
        </Link>
        .
      </p>
    </section>
  );
}
