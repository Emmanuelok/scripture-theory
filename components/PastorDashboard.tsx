"use client";

import { useState } from "react";
import Link from "next/link";
import {
  sampleIntros,
  replyTemplates,
  weeklyMetrics,
  pastoralResources,
  type IntroRequest,
} from "@/data/dashboard";

export default function PastorDashboard() {
  const [openId, setOpenId] = useState<string | null>(sampleIntros[0]?.id ?? null);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-flame-200 bg-flame-50/60 p-5 text-sm text-amber-900">
        <strong className="font-semibold">Preview.</strong> This dashboard uses illustrative
        sample data so you can see the loop. When you{" "}
        <Link href="/connect/claim" className="underline font-medium">
          claim your church
        </Link>
        , it fills with the real newcomer intros that come to <em>you</em>.
      </div>

      <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-8 glow-ring">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-flame-300">This week</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-1">
              {weeklyMetrics.introsThisWeek} newcomer intros
            </h2>
            <div className="text-xs text-ink-300 mt-1">
              {weeklyMetrics.introsThisWeek > weeklyMetrics.introsLastWeek
                ? `+${weeklyMetrics.introsThisWeek - weeklyMetrics.introsLastWeek} from last week`
                : `${weeklyMetrics.introsThisWeek - weeklyMetrics.introsLastWeek} from last week`}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <Mini label="Where they came from">
              <ul className="text-xs mt-1 space-y-0.5">
                {weeklyMetrics.introsByOrigin.map((o) => (
                  <li key={o.origin} className="flex justify-between gap-2">
                    <span>{o.origin}</span>
                    <strong className="text-flame-300">{o.count}</strong>
                  </li>
                ))}
              </ul>
            </Mini>
            <Mini label="Language">
              <ul className="text-xs mt-1 space-y-0.5">
                {weeklyMetrics.newcomersByLanguage.map((l) => (
                  <li key={l.language} className="flex justify-between gap-2">
                    <span>{l.language}</span>
                    <strong className="text-flame-300">{l.count}</strong>
                  </li>
                ))}
              </ul>
            </Mini>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-ink-900">Newcomer intros to respond to</h2>
          <span className="text-xs text-ink-500">
            Respond within 7 days · pastoral covenant
          </span>
        </div>
        <ul className="space-y-3">
          {sampleIntros.map((i) => (
            <IntroCard
              key={i.id}
              intro={i}
              open={openId === i.id}
              onToggle={() => setOpenId(openId === i.id ? null : i.id)}
            />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-ink-900">Pastoral resources</h2>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {pastoralResources.map((r) => (
            <li key={r.title}>
              <Link
                href={r.href}
                className="block rounded-2xl border border-ink-200 bg-card p-5 hover:border-flame-500 transition-colors"
              >
                <div className="font-serif text-lg text-ink-900">{r.title}</div>
                <p className="text-sm text-ink-600 mt-1 leading-relaxed">{r.body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function IntroCard({
  intro,
  open,
  onToggle,
}: {
  intro: IntroRequest;
  open: boolean;
  onToggle: () => void;
}) {
  const [tplIndex, setTplIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);
  const tpl = replyTemplates[tplIndex];

  const filled = tpl.body
    .replaceAll("{{name}}", intro.newcomerName.split(" ")[0])
    .replaceAll("{{church}}", "your church")
    .replaceAll("{{time}}", "9:30 a.m.")
    .replaceAll("{{day}}", "Thursday")
    .replaceAll("{{neighborhood}}", intro.city.split("·")[1]?.trim() ?? intro.city)
    .replaceAll("{{leader}}", "one of our small-group leaders")
    .replaceAll("{{pastor}}", "Pastor");

  async function copy() {
    try {
      await navigator.clipboard.writeText(filled);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  }

  return (
    <li
      className={`rounded-2xl border bg-card transition-colors ${
        done ? "border-emerald-200" : "border-ink-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex flex-wrap items-baseline justify-between gap-3"
        aria-expanded={open}
      >
        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="font-serif text-xl text-ink-900">{intro.newcomerName}</span>
            {done && (
              <span className="rounded-full bg-emerald-100 text-emerald-900 text-[10px] uppercase tracking-widest px-2 py-0.5">
                Replied
              </span>
            )}
          </div>
          <div className="text-xs text-ink-500 mt-0.5">
            {intro.city} · {intro.language} · via {intro.source}
          </div>
        </div>
        <div className="text-xs text-ink-500">{intro.receivedAt}</div>
      </button>

      {open && (
        <div className="border-t border-ink-100 p-5 space-y-4">
          <div className="rounded-xl bg-ink-50 border border-ink-100 p-4">
            <div className="text-xs uppercase tracking-widest text-ink-400">Their note</div>
            <p className="mt-1.5 text-ink-800 leading-relaxed">{intro.note}</p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-flame-700 mb-2">
              Suggested reply
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {replyTemplates.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setTplIndex(i)}
                  className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                    i === tplIndex
                      ? "bg-ink-900 text-ink-50 border-ink-900"
                      : "bg-card text-ink-700 border-ink-200 hover:border-ink-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <pre className="rounded-2xl bg-card border border-ink-200 p-4 text-sm text-ink-800 leading-relaxed whitespace-pre-wrap font-sans">
{filled}
            </pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-4 py-1.5 text-sm hover:bg-flame-700"
              >
                {copied ? "Copied!" : "Copy reply"}
              </button>
              <button
                onClick={() => setDone((v) => !v)}
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm border transition-colors ${
                  done
                    ? "bg-emerald-100 text-emerald-900 border-transparent"
                    : "bg-card text-ink-800 border-ink-300 hover:border-ink-900"
                }`}
              >
                {done ? "Marked replied ✓" : "Mark as replied"}
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

function Mini({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-ink-800 border border-ink-700 p-3">
      <div className="text-[10px] uppercase tracking-widest text-flame-300">{label}</div>
      {children}
    </div>
  );
}
