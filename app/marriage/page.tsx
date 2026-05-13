import MarriageView from "@/components/MarriageView";

export const metadata = {
  title: "Marriage Prayer Rhythm — Scripture Theory",
  description:
    "A daily prayer rhythm for marriage — seven daily themes (Christ-center, words, repentance, service, joy, Sabbath, worship), Scripture, prayer, and weekly intentions before the Lord.",
};

export default function MarriagePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Marriage</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Pray your marriage. Daily.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Marriage is a picture of Christ and the Church (Ephesians 5:32) — not a contract to
        survive. Seven short prayer rhythms for the days of the week, plus intentions you
        commit to before the Lord.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "What God has joined together, let not man separate." — Mark 10:9
      </p>

      <div className="mt-10">
        <MarriageView />
      </div>
    </section>
  );
}
