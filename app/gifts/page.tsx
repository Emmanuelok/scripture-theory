import GiftsView from "@/components/GiftsView";

export const metadata = {
  title: "Spiritual Gifts — Scripture Theory",
  description:
    "A non-charismatic-vs-cessationist discernment tool for the 20 spiritual gifts of Romans 12, 1 Corinthians 12, Ephesians 4, and 1 Peter 4. Forty statements; a place to begin. Confirmed by the Body, not by a quiz.",
};

export default function GiftsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Spiritual Gifts
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        How has the Spirit gifted you to serve the Body?
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Scripture lists the gifts in four places: Romans 12, 1 Corinthians 12, Ephesians 4, and
        1 Peter 4. Forty statements help you discern where the Spirit may be inviting you to
        serve. This is a starting point — not a verdict. Real confirmation comes from your local
        body and the fruit of using a gift in love.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Now there are diversities of gifts, but the same Spirit." — 1 Corinthians 12:4
      </p>

      <div className="mt-10">
        <GiftsView />
      </div>
    </section>
  );
}
