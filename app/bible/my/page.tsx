import Link from "next/link";
import MyBible from "@/components/MyBible";

export const metadata = {
  title: "My Bible — Scripture Theory",
  description:
    "Every verse you've highlighted, bookmarked, or written a note on. Saved on your device.",
};

export default function MyBiblePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <Link href="/bible" className="text-xs uppercase tracking-widest text-flame-700 hover:underline">
        ← The Bible
      </Link>
      <h1 className="font-serif text-4xl md:text-5xl mt-3 text-ink-900 leading-tight">
        My Bible.
      </h1>
      <p className="mt-3 text-ink-700 leading-relaxed max-w-xl">
        Everything you've highlighted, bookmarked, or written a note on — gathered in one place,
        in canonical order. All saved on this device.
      </p>

      <div className="mt-10">
        <MyBible />
      </div>
    </section>
  );
}
