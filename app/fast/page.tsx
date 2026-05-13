import FastingView from "@/components/Fasting";

export const metadata = {
  title: "Fasting — Scripture Theory",
  description:
    "A biblical guide to fasting — full, partial, Daniel, sundown, media — with a private fast tracker, Scripture, prayer liturgy, and pastoral cautions. Jesus said 'when you fast.'",
};

export default function FastPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practice · Fasting</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        "When you fast." — Jesus
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Not <em>if</em>. <em>When.</em> Fasting is one of the lost rhythms of the Western church —
        an old, normal, joyful weapon. Here is how to begin, what kind of fast to choose, what
        Scripture says, and a quiet tracker that lives only on your device.
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "Whenever you fast… anoint your head and wash your face, that your fasting may not be seen
        by people, but by your Father, who is in secret." — Matthew 6:17-18
      </p>

      <div className="mt-10">
        <FastingView />
      </div>
    </section>
  );
}
