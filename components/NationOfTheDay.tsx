"use client";

import Link from "next/link";
import { useState } from "react";
import type { Nation } from "@/data/nations";
import { regions, NATION_CYCLE_LENGTH } from "@/data/nations";
import { nativeNameFor } from "@/data/nations-native";
import { flagEmoji } from "@/lib/flags";
import NationFlag from "@/components/NationFlag";
import { referenceHref } from "@/lib/reference";
import { useProfile, type NationPrayed } from "@/lib/profile";

function todayKey(d = new Date()): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function NationOfTheDay({
  nation,
  rotationDay,
  showActions = true,
  showAnchorLink = true,
}: {
  nation: Nation;
  rotationDay: number;
  showActions?: boolean;
  showAnchorLink?: boolean;
}) {
  const { profile, update, mounted } = useProfile();
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  const today = todayKey();
  const records = profile.nationsPrayed ?? [];
  const prayedToday = records.some((r) => r.iso === nation.iso && r.date === today);
  const adopted = profile.adoptedNationIso === nation.iso;

  function markPrayed() {
    if (!mounted) return;
    if (prayedToday) {
      update({
        nationsPrayed: records.filter((r) => !(r.iso === nation.iso && r.date === today)),
      });
    } else {
      const record: NationPrayed = { iso: nation.iso, date: today };
      update({ nationsPrayed: [...records, record] });
    }
  }

  function toggleAdopt() {
    if (!mounted) return;
    update({ adoptedNationIso: adopted ? undefined : nation.iso });
  }

  async function share() {
    const text = [
      `Praying for ${nation.name} today.`,
      "",
      ...nation.prayer.map((p, i) => `${i + 1}. ${p}`),
      "",
      `"${nation.verse.text}" — ${nation.verse.ref}`,
      "",
      "Praying for the Nations · scripturetheory.com",
    ].join("\n");
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Praying for ${nation.name}`,
          text,
        });
        return;
      }
      await navigator.clipboard.writeText(text);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2200);
    } catch {}
  }

  const native = nativeNameFor(nation.iso);
  const anchorHref = showAnchorLink ? referenceHref(nation.verse.ref) : null;

  return (
    <article className="rounded-3xl overflow-hidden border border-ink-200 bg-card glow-ring">
      {/* Hero with flag */}
      <div className="relative bg-ink-900 text-ink-50">
        <div className="relative aspect-[16/9] md:aspect-[5/2] overflow-hidden bg-ink-800">
          <NationFlag
            iso={nation.iso}
            alt={`Flag of ${nation.name}`}
            width={1280}
            className="absolute inset-0 h-full w-full"
          />
          {/* Soft top gradient so text on top is legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/10 to-ink-900/80" />
          <div className="absolute top-4 left-5 md:top-6 md:left-7 flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-flame-300">
              Day {rotationDay} of {NATION_CYCLE_LENGTH} · Praying for the Nations
            </span>
          </div>
          <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7 right-5">
            <div className="flex items-end gap-3 flex-wrap">
              <span className="text-4xl md:text-5xl leading-none" aria-hidden>
                {flagEmoji(nation.iso)}
              </span>
              <div>
                <h1 className="font-serif text-3xl md:text-5xl text-ink-50 leading-none">
                  {nation.name}
                </h1>
                {native && native !== nation.name && (
                  <div className="text-ink-200 mt-1 text-sm md:text-base font-serif">
                    {native}
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs text-ink-300 mt-2">{regions[nation.region]}</div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-9 space-y-6">
        <p className="text-ink-700 leading-relaxed">{nation.context}</p>

        <div>
          <div className="text-xs uppercase tracking-widest text-flame-700">
            Pray with the Body of Christ today
          </div>
          <ul className="mt-3 space-y-3">
            {nation.prayer.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-serif text-flame-700 leading-none text-xl shrink-0 mt-0.5">
                  {i + 1}.
                </span>
                <span className="text-ink-800 leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="rounded-2xl bg-ink-50 border border-ink-100 p-5 prose-scripture text-ink-900">
          <p>"{nation.verse.text}"</p>
          <footer className="text-xs text-ink-500 mt-2 not-italic">
            — {anchorHref ? (
              <Link href={anchorHref} className="hover:text-flame-700 underline">
                {nation.verse.ref}
              </Link>
            ) : (
              nation.verse.ref
            )}
          </footer>
        </blockquote>

        {showActions && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ink-100">
            <button
              onClick={markPrayed}
              disabled={!mounted}
              className={`inline-flex items-center rounded-full px-5 py-2 text-sm transition-colors ${
                prayedToday
                  ? "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
                  : "bg-ink-900 text-ink-50 hover:bg-flame-700"
              } disabled:opacity-50`}
            >
              {prayedToday ? `Prayed for ${nation.name} ✓` : `I prayed for ${nation.name} today`}
            </button>
            <button
              onClick={share}
              className="inline-flex items-center rounded-full border border-ink-300 px-4 py-2 text-sm text-ink-800 hover:border-ink-900"
            >
              {shareState === "copied" ? "Copied!" : "Share"}
            </button>
            <button
              onClick={toggleAdopt}
              disabled={!mounted}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors ${
                adopted
                  ? "bg-flame-50 text-flame-900 border-flame-300"
                  : "border-ink-300 text-ink-800 hover:border-ink-900"
              } disabled:opacity-50`}
              title="Adopt this nation to keep praying for it daily, alongside the rotation"
            >
              {adopted ? "Adopted ★" : "Adopt this nation"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
