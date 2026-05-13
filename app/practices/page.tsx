import PracticesHub from "@/components/PracticesHub";

export const metadata = {
  title: "Practices — Scripture Theory",
  description:
    "Every spiritual practice the believer needs — fasting, examen, lament, forgiveness, listening prayer, the Lord's Supper at home, family altar, rule of life, and the Secret Place. Old paths, made plain.",
};

export default function PracticesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Practices</span>
      <h1 className="font-serif text-4xl md:text-6xl mt-2 text-ink-900 leading-[1.05] tracking-tight">
        Old paths.<br />
        <span className="gradient-text">Made plain.</span>
      </h1>
      <p className="mt-5 text-ink-700 max-w-2xl leading-relaxed">
        Every practice the Christian needs — and most apps refuse to teach. Fasting, lament, examen,
        listening prayer, forgiveness, household worship, the Lord's Supper at home, the rule of
        life, the hymns, and the prisoners we are to remember. None of it gimmicky. All of it
        ancient. All of it for you.
      </p>
      <p className="mt-3 text-xs text-ink-500 max-w-2xl italic">
        "Stand in the ways and see, and ask for the old paths, where the good way is, and walk in
        it; then you will find rest for your souls." — Jeremiah 6:16
      </p>

      <div className="mt-10">
        <PracticesHub />
      </div>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 md:p-10 text-center relative overflow-hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(249,115,22,0.22), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgba(184,66,12,0.18), transparent 60%)",
          }}
        />
        <div className="relative">
          <p className="font-serif text-2xl md:text-3xl leading-snug">
            "He must increase, but I must decrease."
          </p>
          <p className="mt-2 text-ink-300">John 3:30</p>
          <p className="mt-4 text-sm text-ink-300 max-w-xl mx-auto leading-relaxed">
            The practices are not the life. Christ is the life. They are the trellis on which He
            grows the vine.
          </p>
        </div>
      </div>
    </section>
  );
}
