"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfile, stageInfo, type DiscipleStage, type DailyNeed } from "@/lib/profile";
import { locales, localeOrder, type LocaleCode } from "@/data/gospel-i18n";

const needs: { id: DailyNeed; label: string; route: string }[] = [
  { id: "meet", label: "I want to meet Jesus", route: "/gospel" },
  { id: "word", label: "I want to open the Word today", route: "/read" },
  { id: "pray", label: "I want to learn to pray", route: "/pray" },
  { id: "belong", label: "I'm looking for a local church", route: "/connect" },
  { id: "today", label: "Just give me today's rhythm", route: "/today" },
];

export default function StartFlow() {
  const router = useRouter();
  const { profile, update, mounted } = useProfile();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (mounted && profile.stage) {
      setStep((s) => Math.max(s, 1));
    }
  }, [mounted, profile.stage]);

  const stages = (Object.keys(stageInfo) as DiscipleStage[]).filter((s) => s !== "pastor");

  function chooseStage(s: DiscipleStage) {
    update({ stage: s, startedAt: profile.startedAt ?? new Date().toISOString() });
    setStep(1);
  }

  function chooseLocale(code: LocaleCode) {
    update({ locale: code });
    setStep(2);
  }

  function chooseNeed(n: { id: DailyNeed; route: string }) {
    update({ need: n.id });
    router.push(n.route);
  }

  return (
    <div className="space-y-6">
      <Stepper step={step} />

      {step === 0 && (
        <Card eyebrow="Question 1 of 3" title="Where are you with Jesus today?">
          <p className="text-ink-700 leading-relaxed">
            No wrong answer. This is just so we can meet you where you are.
          </p>
          <ul className="mt-6 grid gap-3">
            {stages.map((s) => {
              const info = stageInfo[s];
              return (
                <li key={s}>
                  <button
                    onClick={() => chooseStage(s)}
                    className="w-full text-left rounded-2xl border border-ink-200 bg-white p-5 hover:border-flame-500 transition-colors"
                  >
                    <div className="font-serif text-xl text-ink-900">{info.label}</div>
                    <div className="text-sm text-ink-600 mt-1">{info.tagline}</div>
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => chooseStage("pastor")}
                className="w-full text-left rounded-2xl border border-flame-200 bg-flame-50/60 p-5 hover:border-flame-500 transition-colors"
              >
                <div className="font-serif text-xl text-ink-900">
                  {stageInfo.pastor.label}
                </div>
                <div className="text-sm text-ink-600 mt-1">{stageInfo.pastor.tagline}</div>
              </button>
            </li>
          </ul>
        </Card>
      )}

      {step === 1 && (
        <Card eyebrow="Question 2 of 3" title="What language do you read God's Word in?">
          <p className="text-ink-700 leading-relaxed">
            We'll set the Gospel, the Lord's Prayer, and your daily rhythm in this language. You can
            change it anytime.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {localeOrder.map((code) => {
              const item = locales[code];
              const active = profile.locale === code;
              return (
                <li key={code}>
                  <button
                    onClick={() => chooseLocale(code)}
                    className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                      active
                        ? "bg-ink-900 text-ink-50 border-ink-900"
                        : "bg-white text-ink-900 border-ink-200 hover:border-flame-500"
                    }`}
                  >
                    <div className="font-serif text-lg" lang={code} dir={item.meta.dir}>
                      {item.meta.nativeName}
                    </div>
                    <div className={`text-xs mt-0.5 ${active ? "text-ink-300" : "text-ink-500"}`}>
                      {item.meta.languageName}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex justify-between text-sm">
            <button onClick={() => setStep(0)} className="text-ink-500 hover:text-ink-900">
              ← Back
            </button>
            {profile.locale && (
              <button onClick={() => setStep(2)} className="text-flame-700 hover:underline">
                Continue →
              </button>
            )}
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card eyebrow="Question 3 of 3" title="What do you need most today?">
          <p className="text-ink-700 leading-relaxed">
            We'll send you to the right starting point right now — and remember the rest for later.
          </p>
          <ul className="mt-6 grid gap-3">
            {needs.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => chooseNeed(n)}
                  className="w-full text-left rounded-2xl border border-ink-200 bg-white p-5 hover:border-flame-500 transition-colors"
                >
                  <div className="font-serif text-lg text-ink-900">{n.label}</div>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between text-sm">
            <button onClick={() => setStep(1)} className="text-ink-500 hover:text-ink-900">
              ← Back
            </button>
          </div>
        </Card>
      )}

      <p className="text-xs text-ink-500 leading-relaxed">
        Privacy: your answers live only on this device. We never send them anywhere, and you can
        clear them in a single click from the <a href="/today" className="underline">Today</a>{" "}
        page.
      </p>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          aria-current={i === step ? "step" : undefined}
          className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-flame-500" : "bg-ink-200"}`}
        />
      ))}
    </ol>
  );
}

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 md:p-8 glow-ring">
      <div className="text-xs uppercase tracking-widest text-flame-700">{eyebrow}</div>
      <h2 className="font-serif text-3xl md:text-4xl mt-2 text-ink-900 leading-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
