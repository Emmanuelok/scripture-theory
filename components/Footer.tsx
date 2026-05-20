"use client";

import Link from "next/link";
import { useUI } from "@/lib/useUI";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Footer() {
  const { t } = useUI();
  return (
    <footer className="mt-24 border-t border-ink-200 bg-ink-50">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 md:grid-cols-4 text-sm text-ink-500">
        <div className="md:col-span-2">
          <div className="font-serif text-ink-900 text-lg">Scripture Theory</div>
          <p className="mt-2 max-w-md leading-relaxed">
            JESUS at the center. The ONE Gospel as our message. The Word as our food. The Body as
            our home. A non-denominational, Christ-centered platform for the world.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
            <li><Link href="/about" className="hover:text-ink-900">{t.footer.about}</Link></li>
            <li><Link href="/beliefs" className="hover:text-ink-900">{t.footer.whatWeBelieve}</Link></li>
            <li><Link href="/privacy" className="hover:text-ink-900">{t.footer.privacy}</Link></li>
            <li><Link href="/accessibility" className="hover:text-ink-900">Accessibility</Link></li>
            <li><Link href="/help" className="hover:text-ink-900">Help</Link></li>
            <li><Link href="/give" className="hover:text-ink-900">Support the work</Link></li>
            <li><Link href="/new-believer" className="hover:text-ink-900">{t.footer.newBeliever}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink-700 font-medium">{t.footer.dayOne}</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/gospel" className="hover:text-ink-900">{t.footer.gospel}</Link></li>
            <li><Link href="/bible" className="hover:text-ink-900">{t.footer.bible}</Link></li>
            <li><Link href="/read" className="hover:text-ink-900">{t.footer.readingPlans}</Link></li>
            <li><Link href="/read/build" className="hover:text-ink-900">Build a plan</Link></li>
            <li><Link href="/devotional" className="hover:text-ink-900">Devotional library</Link></li>
            <li><Link href="/course" className="hover:text-ink-900">Foundations of the Faith (12 wks)</Link></li>
            <li><Link href="/course/lead" className="hover:text-ink-900">Lead a Foundations cohort</Link></li>
            <li><Link href="/memory" className="hover:text-ink-900">{t.footer.scriptureMemory}</Link></li>
            <li><Link href="/pray" className="hover:text-ink-900">{t.nav.pray}</Link></li>
            <li><Link href="/pray/nations" className="hover:text-ink-900">Praying for the nations</Link></li>
            <li><Link href="/pray/wall" className="hover:text-ink-900">Prayer Wall · global Body</Link></li>
            <li><Link href="/pray/live" className="hover:text-ink-900">Pray for the world · live</Link></li>
            <li><Link href="/witness" className="hover:text-ink-900">{t.footer.witness}</Link></li>
            <li><Link href="/sending" className="hover:text-ink-900">Sent · the Great Commission</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink-700 font-medium">{t.footer.growAndGo}</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/today" className="hover:text-ink-900">{t.footer.today}</Link></li>
            <li><Link href="/me" className="hover:text-ink-900">Me · my walk</Link></li>
            <li><Link href="/secret-place" className="hover:text-ink-900">{t.footer.secretPlace}</Link></li>
            <li><Link href="/disciple/journey" className="hover:text-ink-900">{t.footer.journey}</Link></li>
            <li><Link href="/account" className="hover:text-ink-900">Me · account (optional sync)</Link></li>
            <li><Link href="/disciple" className="hover:text-ink-900">The Path</Link></li>
            <li><Link href="/resources" className="hover:text-ink-900">{t.footer.resources}</Link></li>
            <li><Link href="/resources/topical-index" className="hover:text-ink-900">{t.footer.topical}</Link></li>
            <li><Link href="/resources/creeds" className="hover:text-ink-900">{t.footer.creeds}</Link></li>
            <li><Link href="/resources/glossary" className="hover:text-ink-900">{t.footer.glossary}</Link></li>
            <li><Link href="/resources/disciplines" className="hover:text-ink-900">{t.footer.disciplines}</Link></li>
            <li><Link href="/sermon-library" className="hover:text-ink-900">{t.footer.sermonLibrary}</Link></li>
            <li><Link href="/atlas" className="hover:text-ink-900">{t.footer.atlas}</Link></li>
            <li><Link href="/timeline" className="hover:text-ink-900">{t.footer.timeline}</Link></li>
            <li><Link href="/kids" className="hover:text-ink-900">{t.footer.kids}</Link></li>
            <li><Link href="/family" className="hover:text-ink-900">{t.footer.family}</Link></li>
            <li><Link href="/persecuted" className="hover:text-ink-900">{t.footer.persecuted}</Link></li>
            <li><Link href="/calendar" className="hover:text-ink-900">{t.footer.christianYear}</Link></li>
            <li><Link href="/connect" className="hover:text-ink-900">{t.footer.connect}</Link></li>
            <li><Link href="/jesus" className="hover:text-ink-900">{t.footer.jesusInScripture}</Link></li>
            <li><Link href="/jesus#emphases" className="hover:text-ink-900">— {t.footer.sixEmphases}</Link></li>
            <li><Link href="/search" className="hover:text-ink-900">{t.footer.search}</Link></li>
            <li><Link href="/roadmap" className="hover:text-ink-900">{t.footer.roadmap}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-200">
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-ink-400 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Scripture Theory.</span>
          <span className="italic flex-1 text-center min-w-[12rem]">
            &ldquo;Jesus Christ is the same yesterday and today and forever.&rdquo; — Hebrews 13:8
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-ink-500">Language</span>
              <LocaleSwitcher direction="up" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ink-500">Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
