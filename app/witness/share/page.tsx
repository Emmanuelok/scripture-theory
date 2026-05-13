import Link from "next/link";
import TestimonyForm from "@/components/TestimonyForm";

export const metadata = {
  title: "Share your testimony — Scripture Theory",
  description:
    "Tell us how Jesus met you. Three short sections — before, the encounter, now — and a verse that holds your story.",
};

export default function ShareTestimonyPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pt-12 pb-20">
      <Link href="/witness" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← Read other testimonies
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        Tell us how Jesus met you.
      </h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Your story is not for our analytics. It is for someone, somewhere, in their lowest hour,
        who needs to know that Jesus is real and that He still meets people. Three short
        sections — before, the moment, now — is all we need.
      </p>

      <div className="mt-8 grid sm:grid-cols-3 gap-3 text-sm">
        <Step n="01" t="You write it" b="Three short sections. No tracking. Nothing leaves your device until you send it." />
        <Step n="02" t="Our editor reads it" b="A real person, prayerfully, every time. We respect your words and your privacy." />
        <Step n="03" t="You approve, then we share" b="Nothing is published without your final yes." />
      </div>

      <div className="mt-10">
        <TestimonyForm />
      </div>

      <div className="mt-12 rounded-3xl bg-ink-900 text-ink-50 p-8 text-center">
        <p className="font-serif text-2xl leading-snug">
          "And they have conquered him by the blood of the Lamb and by the word of their
          testimony..."
        </p>
        <p className="mt-2 text-ink-300">Revelation 12:11</p>
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
