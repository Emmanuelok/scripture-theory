import CourseCertificate from "@/components/CourseCertificate";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "Certificate — Foundations of the Faith — Scripture Theory",
  description:
    "Your certificate of completion for the Foundations of the Faith course. Print it, download it, share it — and disciple someone else.",
};

export default function CourseCertificatePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Certificate of completion"
        title="A good work"
        titleAccent="begun in you."
        intro="You have walked twelve weeks of the Foundations of the Faith. The course is finished; the walk is for life. Print this, give it away, and now — disciple someone else."
        scripture="He who began a good work in you will complete it until the day of Jesus Christ."
        scriptureRef="Philippians 1:6"
      />
      <div className="mt-10">
        <CourseCertificate />
      </div>
    </section>
  );
}
