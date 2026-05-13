"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { offices, whichOfficeNow, officeIntro, type Office, type OfficeId } from "@/data/hours";

export default function HoursView() {
  const [selected, setSelected] = useState<OfficeId>(whichOfficeNow());
  const office = useMemo(() => offices.find((o) => o.id === selected) ?? offices[0], [selected]);
  const now = whichOfficeNow();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">{officeIntro.title}</h2>
        {officeIntro.body.map((p, i) => (
          <p key={i} className="mt-3 text-ink-700 leading-relaxed">{p}</p>
        ))}
        <p className="mt-3 text-xs text-flame-700 italic">— Psalm 119:164</p>
      </section>

      <section>
        <div className="text-xs uppercase tracking-widest text-flame-700">Pick an office</div>
        <div className="mt-3 grid sm:grid-cols-4 gap-2">
          {offices.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`text-left rounded-2xl border p-4 transition-colors ${
                selected === o.id
                  ? "border-flame-500 bg-flame-50/60"
                  : "border-ink-200 bg-card hover:border-ink-400"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-serif text-ink-900">{o.name}</span>
                {o.id === now && (
                  <span className="text-[10px] uppercase tracking-widest text-flame-700">Now</span>
                )}
              </div>
              <div className="text-xs text-ink-500 mt-0.5">
                {o.altName} · {o.windowLabel}
              </div>
            </button>
          ))}
        </div>
      </section>

      <OfficeBlock office={office} />
    </div>
  );
}

function OfficeBlock({ office }: { office: Office }) {
  return (
    <article className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-10 glow-ring">
      <div className="text-xs uppercase tracking-widest text-flame-300">
        {office.altName} · {office.windowLabel}
      </div>
      <h1 className="font-serif text-3xl md:text-4xl mt-1">{office.name}</h1>
      <p className="mt-2 text-ink-300 leading-relaxed">{office.description}</p>

      <div className="mt-8 space-y-7">
        {office.parts.map((part, i) => (
          <section key={i}>
            <div className="text-[10px] uppercase tracking-widest text-flame-300">
              {part.label}
              {part.ref && <span className="ml-2 text-ink-400 normal-case tracking-normal">· {part.ref}</span>}
            </div>
            <p
              className={`mt-2 leading-relaxed whitespace-pre-line ${
                part.kind === "psalm" || part.kind === "canticle"
                  ? "font-serif text-lg md:text-xl"
                  : "text-ink-100"
              }`}
            >
              {part.text}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-ink-700 flex flex-wrap gap-3">
        <Link
          href="/secret-place"
          className="rounded-full bg-flame-600 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
        >
          Sit with Him in the Secret Place →
        </Link>
        <Link
          href="/examen"
          className="rounded-full border border-ink-600 text-ink-300 px-5 py-2 text-sm hover:text-ink-50 hover:border-ink-400"
        >
          End-of-day examen →
        </Link>
      </div>
    </article>
  );
}
