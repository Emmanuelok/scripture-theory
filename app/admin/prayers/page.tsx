import AdminPrayers from "@/components/AdminPrayers";

export const metadata = {
  title: "Admin · Prayer Wall — Scripture Theory",
  description: "Moderation queue for the global Prayer Wall.",
  robots: { index: false, follow: false },
};

export default function AdminPrayersPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Admin · Prayer Wall</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Tend the burdens that have been carried in.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Believers can flag requests that don&apos;t belong on the Wall.
        Three flags hide a request automatically; you decide whether to
        restore, leave hidden, or delete. Read the reasons before acting.
      </p>
      <div className="mt-10">
        <AdminPrayers />
      </div>
    </section>
  );
}
