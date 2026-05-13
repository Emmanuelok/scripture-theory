import HealingView from "@/components/HealingView";

export const metadata = {
  title: "Healing Prayer — Scripture Theory",
  description:
    "The James 5 pattern for praying for the sick — confession, anointing, the prayer of faith — with a private journal for tracking healing requests over time. Faith and medicine. Bold prayer with humility before mystery.",
};

export default function HealPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Practice · Healing Prayer
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        "By His stripes we are healed."
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Jesus healed the sick — and He sent the church to do the same. The pattern is in James 5:
        call the elders, confess sin, anoint with oil, pray the prayer of faith. Bold prayer with
        humility before the mystery of God's "not yet" and "no."
      </p>
      <p className="mt-2 text-xs text-ink-500">
        "He sent His word and healed them, and delivered them from their destructions." —
        Psalm 107:20
      </p>

      <div className="mt-10">
        <HealingView />
      </div>
    </section>
  );
}
