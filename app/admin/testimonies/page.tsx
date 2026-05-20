import AdminTestimonies from "@/components/AdminTestimonies";

export const metadata = {
  title: "Admin · Testimonies — Scripture Theory",
  description: "Editorial review queue for testimonies of Jesus.",
  robots: { index: false, follow: false },
};

export default function AdminTestimoniesPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Admin</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Testimony review queue.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        Read each story slowly. Publish what clearly lifts up Jesus; hide what
        doesn&apos;t fit (theology, safety, or other pastoral reasons). The
        believer who submitted will receive no rejection — only the editor
        knows what was held back.
      </p>
      <div className="mt-10">
        <AdminTestimonies />
      </div>
    </section>
  );
}
