import Link from "next/link";
import ApostlesConstellation from "@/components/ApostlesConstellation";

export const metadata = {
  title: "The Twelve — Scripture Theory",
  description:
    "The twelve apostles Jesus called, with what Scripture and trustworthy tradition tell us about each — backgrounds, callings, and ends.",
};

export default function ApostlesPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/resources" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Resources
      </Link>
      <h1 className="font-serif text-4xl md:text-6xl mt-3 text-ink-900 leading-[1.05] tracking-tight">
        The <span className="gradient-text">Twelve.</span>
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed max-w-2xl">
        Jesus appointed twelve apostles &mdash; ordinary men, mostly Galileans &mdash; "that they
        might be with Him, and that He might send them out" (Mark 3:14). Their names are
        listed in Matthew 10, Mark 3, Luke 6, and Acts 1. The Spirit then used them to lay
        the foundation of a church that now spans the earth.
      </p>

      <div className="mt-10">
        <ApostlesConstellation />
      </div>

      <div className="mt-12 rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h2 className="font-serif text-xl text-ink-900">A note on tradition</h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          What we know about the apostles' lives after Pentecost comes partly from Scripture
          and partly from early Christian writings (Eusebius, Irenaeus, traditions preserved
          across various regional churches). Where Scripture is silent, tradition is offered
          here as tradition &mdash; not as Scripture, but as the church's living memory of
          where these men carried the gospel and where many of them died for it.
        </p>
      </div>
    </section>
  );
}
