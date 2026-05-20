import AdminYeses from "@/components/AdminYeses";

export const metadata = {
  title: "Admin · Wall of Yeses — Scripture Theory",
  description: "Moderation queue for the Wall of Yeses (Project 1M).",
  robots: { index: false, follow: false },
};

export default function AdminYesesPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Admin · Project 1M</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The Wall of Yeses.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Watch over what gets shown publicly. Hide anything that exposes a believer
        (last name, street-level location, hostile-jurisdiction identity), and clear
        any spam or abuse. Most rows should never need attention — Hebrews 12:1
        is the whole point.
      </p>
      <div className="mt-10">
        <AdminYeses />
      </div>
    </section>
  );
}
