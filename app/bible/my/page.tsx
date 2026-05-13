import Link from "next/link";
import MyBible from "@/components/MyBible";
import { PageHero } from "@/components/ui/Tile";

export const metadata = {
  title: "My Bible — Scripture Theory",
  description:
    "Every verse you've highlighted, bookmarked, or written a note on. Saved on your device.",
};

export default function MyBiblePage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <Link href="/bible" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← The Bible
      </Link>
      <div className="mt-3">
        <PageHero
          eyebrow="On this device · never synced unless you sign in"
          title="My"
          titleAccent="Bible."
          intro="Everything you've highlighted, bookmarked, or written a note on — gathered in one place, in canonical order."
          scripture="Your word I have hidden in my heart, that I might not sin against you."
          scriptureRef="Psalm 119:11"
        />
      </div>

      <div className="mt-10">
        <MyBible />
      </div>
    </section>
  );
}
