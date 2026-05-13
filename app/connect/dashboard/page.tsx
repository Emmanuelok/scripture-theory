import Link from "next/link";
import PastorDashboardLive from "@/components/PastorDashboardLive";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Pastor dashboard — Scripture Theory",
  description:
    "A small, sober dashboard. We hand you the names of newcomers in your city — never the reverse. Reply in your voice, in your week. We exist under your work, not over it.",
};

export default function PastorDashboardPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <Link
        href="/connect"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← One Body
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow="For pastors"
          title="Welcome,"
          titleAccent="pastor."
          intro="A small, sober dashboard. We hand you the names of newcomers who asked to meet a pastor in your city. Reply in your voice, in your week. Mark each one when you've reached out — we don't badger you, we don't badger them."
          scripture="Shepherd the flock of God that is among you… eagerly… being examples to the flock."
          scriptureRef="1 Peter 5:2–3"
        />
      </div>

      <div className="mt-10">
        <PastorDashboardLive />
      </div>
    </section>
  );
}
