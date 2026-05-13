import { testimonies, sharePrompts } from "@/data/testimonies";
import Link from "next/link";

export const metadata = {
  title: "Witness — Scripture Theory",
  description:
    "Read testimonies of Jesus from believers around the world, and learn how to tell your own story and share the Gospel with one person this week.",
};

export default function WitnessPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">Witness</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        He is alive. Stories from around the world.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The same Jesus is meeting people in jails, kitchens, classrooms, and capital cities. We
        gather their testimonies — not to celebrate the stories, but to lift up the Lord who is in
        them.
      </p>

      <div className="mt-6">
        <Link
          href="/witness/share"
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-700 transition-colors"
        >
          Share your testimony →
        </Link>
      </div>

      <ol className="mt-12 space-y-5">
        {testimonies.map((t) => (
          <li
            key={t.name + t.place}
            className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-serif text-2xl text-ink-900">
                {t.name} · <span className="text-ink-500">{t.place}</span>
              </h2>
              <span className="text-xs uppercase tracking-widest text-flame-700">{t.verse}</span>
            </div>
            <div className="mt-5 grid md:grid-cols-3 gap-4 text-sm">
              <Block label="Before">{t.before}</Block>
              <Block label="Jesus met me">{t.encounter}</Block>
              <Block label="Now">{t.now}</Block>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16">
        <span className="text-xs uppercase tracking-widest text-flame-700">Tell one person</span>
        <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900">
          You don't need to be a preacher. You need to be honest.
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
          Most people come to Jesus through one ordinary friend who told them the truth gently and
          stayed close. Here are six simple steps to help you become that friend this week.
        </p>

        <ol className="mt-8 grid md:grid-cols-2 gap-4">
          {sharePrompts.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-ink-200 bg-white p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-flame-700 text-2xl leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg text-ink-900">{p.title}</h3>
              </div>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl">
          "But you will receive power when the Holy Spirit has come upon you, and you will be my
          witnesses..."
        </p>
        <p className="mt-2 text-ink-300">Acts 1:8</p>
      </div>
    </section>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-ink-50 border border-ink-100 p-4">
      <div className="text-xs uppercase tracking-widest text-ink-400">{label}</div>
      <p className="mt-1.5 text-ink-800 leading-relaxed">{children}</p>
    </div>
  );
}
