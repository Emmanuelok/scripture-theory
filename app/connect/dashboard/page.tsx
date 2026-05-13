import Link from "next/link";
import PastorDashboard from "@/components/PastorDashboard";

export const metadata = {
  title: "Pastor dashboard — Scripture Theory",
  description:
    "A preview of the pastor dashboard: weekly newcomer intros, your discipleship culture, suggested replies, and pastoral resources.",
};

export default function PastorDashboardPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-20">
      <Link href="/connect" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← One Body
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Welcome, pastor.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        A small, sober dashboard. We hand you the names of newcomers in your city — never the
        reverse. Reply within a week, in your voice. We exist <em>under</em> your work, not over
        it.
      </p>

      <div className="mt-10">
        <PastorDashboard />
      </div>

      <div className="mt-14 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "Shepherd the flock of God that is among you... eagerly... being examples to the flock."
        </p>
        <p className="mt-2 text-ink-300">1 Peter 5:2–3</p>
      </div>
    </section>
  );
}
