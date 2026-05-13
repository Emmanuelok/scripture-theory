import AccessibilityPanel from "@/components/AccessibilityPanel";

export const metadata = {
  title: "Accessibility — Scripture Theory",
  description:
    "Make the platform readable for every body — text size, dyslexia-friendly font, high contrast, reduced motion, and always-visible link underlines.",
};

export default function AccessibilityPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">Accessibility</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        For every kind of body.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The gospel is for every body. Tune the platform so you can read it — your eyes, your
        device, your settings. These choices live on this device only.
      </p>
      <div className="mt-10">
        <AccessibilityPanel />
      </div>
    </section>
  );
}
