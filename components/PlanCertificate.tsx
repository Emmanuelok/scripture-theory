"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { slotKey } from "@/lib/slots";
import type { ReadingPlan } from "@/data/readings";
import { PageHero } from "@/components/ui/Tile";

const PROGRESS_BASE = "scripture-theory-progress";

export default function PlanCertificate({ plan }: { plan: ReadingPlan }) {
  const { profile } = useProfile();
  const [daysDone, setDaysDone] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Read progress from per-slot localStorage (same store used by /read)
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(slotKey(PROGRESS_BASE));
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number[]>;
        setDaysDone(parsed[plan.id] ?? []);
      }
    } catch {}
  }, [plan.id]);

  const isComplete = daysDone.length >= plan.totalDays;
  const certifiedName = (profile.course?.certifiedName ?? profile.name ?? "").trim();
  const [name, setName] = useState<string>(certifiedName);
  useEffect(() => {
    if (mounted && certifiedName && !name) setName(certifiedName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, certifiedName]);

  const safeName = name.replace(/[<>]/g, "").slice(0, 60).trim();
  const certUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (safeName) params.set("name", safeName);
    return `/api/plan-cert/${plan.id}${params.toString() ? `?${params.toString()}` : ""}`;
  }, [plan.id, safeName]);

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/read"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Reading plans
      </Link>

      <PageHero
        eyebrow={`Reading plan · ${plan.totalDays} days`}
        title={isComplete ? "You walked the whole plan." : "Almost there."}
        intro={
          isComplete
            ? `You finished ${plan.name}. Receive the certificate — print it, save it, give it to someone who walked it with you.`
            : `You've read ${daysDone.length} of ${plan.totalDays} days of ${plan.name}. The certificate unlocks when you finish — but you can preview it now.`
        }
      />

      {/* Preview */}
      <div className="mt-8 rounded-3xl border border-ink-200 bg-card-subtle p-3 md:p-4 shadow-inner">
        <div className="aspect-[1600/1100] w-full rounded-2xl overflow-hidden bg-ink-50 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={certUrl}
            alt={`${plan.name} certificate preview`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name field */}
      <div className="mt-6 rounded-3xl border border-ink-200 bg-card p-5">
        <label className="block text-[10px] uppercase tracking-widest text-flame-700">
          Your name (written on the certificate)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Anna O."
          maxLength={60}
          className="mt-2 w-full rounded-xl border border-ink-200 bg-card-subtle px-4 py-2 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-flame-500"
        />
        <p className="mt-2 text-xs text-ink-500 italic">
          Stays on this device. Leave blank for a generic certificate.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={certUrl}
          download={`${plan.id}-certificate.png`}
          className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
        >
          ↓ Download PNG
        </a>
        <a
          href={certUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
        >
          Open full size ↗
        </a>
        <Link
          href="/read"
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
        >
          Back to plans
        </Link>
      </div>

      {!isComplete && mounted && (
        <p className="mt-6 text-xs text-ink-500 italic text-center">
          You can preview and download the certificate at any time — but it sings loudest when you've actually walked the {plan.totalDays} days.
        </p>
      )}
    </section>
  );
}
