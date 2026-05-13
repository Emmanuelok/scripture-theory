import GospelView from "@/components/GospelView";

export const metadata = {
  title: "The Gospel — Scripture Theory",
  description:
    "The ONE Gospel of Jesus Christ — clearly and kindly told in seven languages: English, Español, Português, Français, Kiswahili, हिन्दी, العربية.",
};

export default function GospelPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <GospelView />
    </section>
  );
}
