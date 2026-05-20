import Link from "next/link";

export const metadata = {
  title: "Admin — Scripture Theory",
  description: "Editorial and moderation tools for maintainers.",
  robots: { index: false, follow: false },
};

const QUEUES = [
  {
    href: "/admin/testimonies",
    title: "Testimonies",
    sub: "Review and publish submitted testimonies of Jesus. Pending stories wait here until an editor reads and approves them.",
    eyebrow: "Editorial",
  },
  {
    href: "/admin/yeses",
    title: "Wall of Yeses",
    sub: "Moderate the public Project 1M wall. Hide anything that exposes a believer or anything spam / abuse. Most rows need nothing.",
    eyebrow: "Project 1M",
  },
  {
    href: "/admin/prayers",
    title: "Prayer Wall",
    sub: "Review requests believers have flagged. Three flags hide a post automatically — restore the honest pain, delete only clear abuse.",
    eyebrow: "Intercession",
  },
];

export default function AdminHomePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Admin</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Tend the garden.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Two small editorial queues — one for testimonies, one for the Wall of
        Yeses. Sign in with a maintainer email (on the{" "}
        <code className="rounded bg-ink-100 px-1.5 py-0.5 text-xs">admin_emails</code>{" "}
        allowlist) and the right tools appear.
      </p>

      <ul className="mt-10 grid sm:grid-cols-2 gap-4">
        {QUEUES.map((q) => (
          <li key={q.href}>
            <Link
              href={q.href}
              className="block rounded-3xl border border-ink-200 bg-card p-6 hover:border-ink-900 transition-colors"
            >
              <div className="text-xs uppercase tracking-widest text-flame-700">{q.eyebrow}</div>
              <h2 className="font-serif text-2xl mt-1 text-ink-900">{q.title} →</h2>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">{q.sub}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-xs text-ink-500 leading-relaxed">
        Admin pages aren&apos;t linked anywhere in the public nav and are
        excluded from <code className="rounded bg-ink-100 px-1.5 py-0.5">robots.txt</code>.
        They&apos;re yours alone — Galatians 6:1, restore gently.
      </p>
    </section>
  );
}
