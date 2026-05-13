import Link from "next/link";

export const metadata = {
  title: "About — Scripture Theory",
  description:
    "Scripture Theory is a JESUS-centered, inter-denominational platform built to help anyone, anywhere, encounter the Lord through His Word.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">About</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        JESUS at the center. The Word as our food. The Body as our home.
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed">
        Scripture Theory is an inter-denominational, Christ-centered platform built for anyone,
        anywhere, who wants to walk with Jesus through the Word. We are not a denomination. We do
        not represent a single church. We do not promote a brand. We try, imperfectly, to point
        people to the Lord and to the local Body of believers He has placed near them.
      </p>

      <div className="mt-10 space-y-8 text-ink-700 leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-2">Why this exists</h2>
          <p>
            Billions of people carry a phone. Many of them either do not own a Bible, cannot read
            theirs, or have never been shown how. Many believers love Jesus deeply but feel
            isolated from a faithful local body, or do not know where to begin in the Word. We
            wanted a place — small, honest, free — that meets people where they are and walks
            them toward where Christ is calling them.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-2">What we are</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Christ-centered.</strong> Jesus is not a topic on this platform. He is the
              point of every page.
            </li>
            <li>
              <strong>One Gospel.</strong> The same gospel Paul received and passed on — Christ
              died for our sins according to the Scriptures, was buried, and rose on the third
              day (1 Corinthians 15:3–4).
            </li>
            <li>
              <strong>Inter-denominational.</strong> We hold the historic faith of the Church (see
              our <Link href="/beliefs" className="text-flame-700 hover:underline">Statement of Faith</Link>)
              and leave secondary matters where Scripture leaves them — to the conscience and the
              local church.
            </li>
            <li>
              <strong>Reader-respecting.</strong> We trust adults to read the Bible. We surface
              authentic public-domain translations and clearly label what is what. We do not
              hide niche-but-legitimate translations to nudge you toward "ours."
            </li>
            <li>
              <strong>On-device by default.</strong> Your notes, your prayers, your journal, your
              walk — they live on your device, not on our servers. See our{" "}
              <Link href="/privacy" className="text-flame-700 hover:underline">privacy commitment</Link>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-2">What we are not</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>We are not a replacement for the local church. Find a faithful body and join it.</li>
            <li>We are not a prosperity platform. The Cross stays at the center.</li>
            <li>We are not anti-tradition. We honor the historic creeds and the saints who came before us.</li>
            <li>We are not a "Bible AI" that rewrites Scripture. We use real, published, public-domain translations.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-2">Our editorial commitments</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>No AI translation of Scripture.</strong> Every translation on this site is
              a real, published, public-domain edition (WEB, KJV, ASV, BBE, YLT, Darby, DRA,
              RVR1909, Almeida, LSG 1910, Luther 1912, Russian Synodal, CUV 1919, Clementine
              Vulgate). We will never let a machine paraphrase the Bible into our voice.
            </li>
            <li>
              <strong>Real church data only.</strong> The church finder pulls from OpenStreetMap.
              We do not invent listings to fill maps.
            </li>
            <li>
              <strong>Honest about what we don't know.</strong> If a passage is contested, we say
              so. If a translation is from 1611, we say so. If audio failed to load, we say so.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-2">Who built this</h2>
          <p>
            A small group of believers using the tools they have, for the glory of the One who
            saved them. We are not perfect. If something on this site dishonors Christ or
            misrepresents His Word, please tell us — we will fix it.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-2">A word to whoever is reading</h2>
          <p className="italic">
            "Come unto me, all ye that labour and are heavy laden, and I will give you rest." —
            Matthew 11:28
          </p>
          <p className="mt-3">
            Wherever you are — believer, skeptic, returning, exhausted, hungry, hopeful — Jesus is
            real, and He is good, and He loves you. This site is here so you can meet Him in His
            Word and walk with His people. Welcome.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/gospel"
          className="rounded-full bg-flame-600 text-white px-5 py-2 text-sm hover:bg-flame-700"
        >
          Read the Gospel
        </Link>
        <Link
          href="/beliefs"
          className="rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          What we believe
        </Link>
        <Link
          href="/privacy"
          className="rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          Privacy commitment
        </Link>
      </div>
    </section>
  );
}
