"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { WEEKLY_QUIZ_PASS, type CourseWeek } from "@/data/course";
import { PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export default function CourseWeekShare({ week }: { week: CourseWeek }) {
  const { profile, mounted } = useProfile();
  const course = profile.course ?? {};
  const score = course.quizScores?.[week.week];
  const done = (course.weeksComplete ?? []).includes(week.week);

  const certifiedName = (course.certifiedName ?? "").trim();
  const [name, setName] = useState<string>(certifiedName);

  useEffect(() => {
    if (mounted && certifiedName && !name) setName(certifiedName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, certifiedName]);

  const safeName = name.replace(/[<>]/g, "").slice(0, 60).trim();
  const scoreText = score !== undefined ? `${score}/${week.quiz.length}` : "";

  const cardUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (safeName) params.set("name", safeName);
    if (scoreText) params.set("score", scoreText);
    const qs = params.toString();
    return `/api/course-card/${week.week}${qs ? `?${qs}` : ""}`;
  }, [week.week, safeName, scoreText]);

  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(`${window.location.origin}/course/week/${week.week}/share`);
  }, [week.week]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  async function nativeShare() {
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({
        title: `Foundations Week ${week.week} · ${week.title}`,
        text: `"${week.memoryVerse.text}" — ${week.memoryVerse.ref}`,
        url: shareUrl,
      });
    } catch {
      /* user cancelled */
    }
  }

  const canShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href={`/course/week/${week.week}`}
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Week {week.week}
      </Link>

      <PageHero
        eyebrow={`Foundations · Week ${week.week} of 12`}
        title={`Share Week ${week.week}.`}
        intro={
          done
            ? "You walked this week. Encourage someone else to walk it too. The card shows the memory verse and the title — nothing else."
            : "You can preview the share card here. Once you pass the week's quiz, your score will appear on it."
        }
      />

      {/* Live preview */}
      <div className="mt-8 rounded-3xl border border-ink-200 bg-card-subtle p-3 md:p-4 shadow-inner">
        <div className="aspect-[1200/630] w-full rounded-2xl overflow-hidden bg-ink-900 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cardUrl}
            alt={`Foundations Week ${week.week} share card`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name (writes on the card) */}
      <div className="mt-6 rounded-3xl border border-ink-200 bg-card p-5">
        <label className="block text-[10px] uppercase tracking-widest text-flame-700">
          Your name (optional · written on the card)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Anna O."
          className="mt-2 w-full rounded-xl border border-ink-200 bg-card-subtle px-4 py-2 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-flame-500"
          maxLength={60}
        />
        <p className="mt-2 text-xs text-ink-500 italic">
          Stays on this device unless you choose to share. Leave blank for an anonymous card.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        {canShare && (
          <button
            onClick={nativeShare}
            className="inline-flex items-center rounded-full bg-flame-600 text-ink-50 px-5 py-2.5 text-sm hover:bg-flame-500"
          >
            Share this week →
          </button>
        )}
        <button
          onClick={copyLink}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
        >
          {copied ? "Link copied ✓" : "Copy share link"}
        </button>
        <a
          href={cardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
        >
          Open card image ↗
        </a>
        <a
          href={cardUrl}
          download={`foundations-week-${week.week}.png`}
          className="inline-flex items-center rounded-full border border-ink-300 px-5 py-2.5 text-sm text-ink-700 hover:border-ink-900"
        >
          ↓ Download PNG
        </a>
      </div>

      {/* What gets shared */}
      <div className="mt-10 rounded-3xl border border-flame-300 bg-flame-50/60 p-6">
        <div className="flex items-start gap-3">
          <Glyph id="lamp" size={36} className="text-flame-700 shrink-0" />
          <div>
            <h3 className="font-serif text-xl text-ink-900">A quiet invitation</h3>
            <p className="mt-1 text-sm text-ink-700 leading-relaxed">
              The card carries Christ's word and a week of walking — no triumph, no curated life.
              When someone you love sees it, they're seeing the memory verse you're hiding in your heart.
              Pass on what was given freely.
            </p>
            {score !== undefined && (
              <p className="mt-2 text-xs text-ink-500 italic">
                Your quiz score ({scoreText}{score >= WEEKLY_QUIZ_PASS ? " · passed" : ""}) shows on the card. Remove the score by clearing the URL parameter if you'd rather not include it.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Memory + anchor */}
      <article className="mt-6 rounded-3xl border border-ink-200 bg-card p-6">
        <div className="text-[10px] uppercase tracking-widest text-flame-700">
          Anchor · {week.scripture.ref}
        </div>
        <blockquote className="mt-2 font-serif text-lg italic text-ink-800 leading-relaxed">
          "{week.scripture.text}"
        </blockquote>
        <div className="mt-5 text-[10px] uppercase tracking-widest text-flame-700">
          Memory · {week.memoryVerse.ref}
        </div>
        <blockquote className="mt-2 font-serif text-lg italic text-ink-800 leading-relaxed">
          "{week.memoryVerse.text}"
        </blockquote>
      </article>
    </section>
  );
}
