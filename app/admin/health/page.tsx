import AdminHealth from "@/components/AdminHealth";

export const metadata = {
  title: "Admin · Health — Scripture Theory",
  description: "Maintainer dashboard: queue counts and environment status.",
  robots: { index: false, follow: false },
};

const ENV_STATUS = {
  supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  esv: Boolean(process.env.ESV_API_KEY),
  giveOnce: Boolean(process.env.NEXT_PUBLIC_GIVE_ONCE_URL),
  giveMonthly: Boolean(process.env.NEXT_PUBLIC_GIVE_MONTHLY_URL),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
};

export default function AdminHealthPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Admin</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Health.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        One glance at what&apos;s waiting and what isn&apos;t wired up. Pending
        counts come from Supabase live; env status is read at build time on
        the server.
      </p>

      <div className="mt-10">
        <AdminHealth env={ENV_STATUS} />
      </div>
    </section>
  );
}
