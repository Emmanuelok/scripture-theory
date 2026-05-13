import Link from "next/link";
import ClaimChurchPanel from "@/components/ClaimChurchPanel";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Claim your church — Scripture Theory",
  description:
    "Pastors and shepherds: claim your local church so disciples in your city can be introduced to you. Real, on-platform routing. We exist under, not over, your work.",
};

export default function ClaimPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link
        href="/connect"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← One Body
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow="For pastors, deacons, elders"
          title="Claim your church's"
          titleAccent="listing."
          intro="We exist under your work, not over it. Claim your local body and Scripture Theory will introduce newcomers to you — in your tradition, in your language, on your terms."
          scripture="Shepherd the flock of God that is among you… not domineering… but being examples."
          scriptureRef="1 Peter 5:2–3"
        />
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-3 text-sm">
        <Step n="01" t="Sign in" b="A passwordless email link from /account. We tie your claim to your account so we know it's really you." />
        <Step n="02" t="Tell us about your church" b="Three minutes. Name, city, country, tradition. You can edit it any time." />
        <Step n="03" t="Disciples are introduced" b="When a believer in your city or at your specific church asks for an intro, it lands in your dashboard." />
      </div>

      <div className="mt-10">
        <ClaimChurchPanel />
      </div>
    </section>
  );
}

function Step({ n, t, b }: { n: string; t: string; b: string }) {
  return (
    <div className="rounded-2xl bg-card border border-ink-200 p-5">
      <div className="font-serif text-flame-700 text-2xl leading-none">{n}</div>
      <div className="font-serif text-ink-900 mt-2">{t}</div>
      <p className="text-xs text-ink-600 mt-1.5 leading-relaxed">{b}</p>
    </div>
  );
}
