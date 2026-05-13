import Link from "next/link";
import ClaimForm from "@/components/ClaimForm";

export const metadata = {
  title: "Claim your church — Scripture Theory",
  description:
    "Pastors and shepherds: claim your local church's listing in the One Body directory. We exist under, not over, your work.",
};

export default function ClaimPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link
        href="/connect"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← One Body directory
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Claim your church's listing.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Pastors, priests, deacons, elders, and welcome-team leaders: we exist <em>under</em> your
        work, not over it. If you'd like Scripture Theory to introduce newcomers to your local body
        — in your tradition, in your languages, on your terms — please tell us about you.
      </p>

      <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
        <Step n="01" t="You tell us about your church" b="Three minutes. No accounts. No data leaves your device until you click send." />
        <Step n="02" t="We verify" b="A real person on our team reads every claim and confirms with you before replacing the pilot entry." />
        <Step n="03" t="Newcomers are introduced" b="When a disciple in your city asks for an intro, we hand it to you with a brief, prayerful note." />
      </div>

      <div className="mt-10">
        <ClaimForm />
      </div>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Shepherd the flock of God that is among you... not domineering... but being examples."
        </p>
        <p className="mt-2 text-ink-300">1 Peter 5:2–3</p>
      </div>
    </section>
  );
}

function Step({ n, t, b }: { n: string; t: string; b: string }) {
  return (
    <div className="rounded-2xl bg-white border border-ink-200 p-5">
      <div className="font-serif text-flame-700 text-2xl leading-none">{n}</div>
      <div className="font-serif text-ink-900 mt-2">{t}</div>
      <p className="text-xs text-ink-600 mt-1.5 leading-relaxed">{b}</p>
    </div>
  );
}
