import Link from "next/link";

export const metadata = {
  title: "The Lord's Supper at Home — Scripture Theory",
  description:
    "A reverent, non-denominational guide for taking the Lord's Supper at home — when sickness, persecution, distance, or season prevent gathering with the local church. With Scripture, examination, words of institution, and prayer.",
};

export default function CommunionPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-20">
      <span className="text-xs uppercase tracking-widest text-flame-700">
        Practice · The Lord's Supper
      </span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        Do this in remembrance of Me.
      </h1>
      <p className="mt-4 text-ink-700 max-w-2xl leading-relaxed">
        The Lord's Supper is the meal Jesus gave His church the night before He died. It is to be
        taken with the gathered body whenever possible. But there are seasons — illness,
        persecution, mission, distance, isolation — when a believer or household will take it at
        home. This is a reverent, scriptural way to do that.
      </p>

      <section className="mt-10 rounded-3xl border border-flame-300 bg-flame-50/60 p-6 md:p-8">
        <div className="text-xs uppercase tracking-widest text-flame-700">A pastoral word</div>
        <p className="mt-2 text-ink-800 leading-relaxed">
          Christian traditions differ on who may preside, who may receive, and what happens at the
          table. We do not dissolve those convictions; we point home. <strong>If you have a local
          church, ask your pastor first.</strong> If you do not, or you cannot, what follows is
          drawn straight from Scripture and the prayers the global church has prayed for
          centuries.
        </p>
      </section>

      <Section title="Before — Prepare" eyebrow="One">
        <ul className="space-y-3 text-ink-800 leading-relaxed">
          <li>
            <strong>Bread and the cup.</strong> Ordinary bread (a piece of any loaf will do) and
            grape juice or wine. The elements are simple.
          </li>
          <li>
            <strong>Examination.</strong> "Let a man examine himself, and so let him eat of that
            bread and drink of that cup." (1 Corinthians 11:28) Open the{" "}
            <Link href="/examen" className="text-flame-700 hover:underline">
              Examen
            </Link>{" "}
            or simply ask:
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>Have I trusted Jesus Christ as Lord today?</li>
              <li>Is there sin unconfessed? (1 John 1:9 — confess it now.)</li>
              <li>Is there a brother or sister against whom I hold something?</li>
              <li>Am I receiving this meal as His gift, not as my work?</li>
            </ul>
          </li>
          <li>
            <strong>Reconcile if you can.</strong> "Leave your gift before the altar, and go your
            way. First be reconciled to your brother…" (Matthew 5:23-24)
          </li>
        </ul>
      </Section>

      <Section title="Read — His own words" eyebrow="Two">
        <blockquote className="prose-scripture text-ink-900 border-l-2 border-flame-500 pl-4 italic leading-relaxed">
          "The Lord Jesus on the same night in which He was betrayed took bread; and when He had
          given thanks, He broke it and said, 'Take, eat; this is My body which is broken for you;
          do this in remembrance of Me.' In the same manner He also took the cup after supper,
          saying, 'This cup is the new covenant in My blood. This do, as often as you drink it, in
          remembrance of Me.' For as often as you eat this bread and drink this cup, you proclaim
          the Lord's death till He comes."
          <div className="mt-2 not-italic text-xs text-ink-500">— 1 Corinthians 11:23-26</div>
        </blockquote>
      </Section>

      <Section title="Pray — Thanksgiving" eyebrow="Three">
        <p className="text-ink-800 leading-relaxed italic">
          Father, we thank You that You so loved the world that You gave Your only begotten Son,
          that whoever believes in Him should not perish but have everlasting life.
        </p>
        <p className="text-ink-800 leading-relaxed italic mt-3">
          We thank You that on the night He was betrayed, He took bread, gave thanks, and broke
          it. So now we take this bread, by His command, in remembrance of Him.
        </p>
      </Section>

      <Section title="The Bread" eyebrow="Four">
        <p className="text-ink-800 leading-relaxed">
          Take a piece of the bread. Hold it. Say aloud (or silently together):
        </p>
        <p className="mt-3 font-serif text-xl text-ink-900 italic leading-snug">
          "Lord Jesus, this is the Bread of Life. This is Your body, broken for me. I receive You
          again, with thanksgiving."
        </p>
        <p className="mt-3 text-ink-700">Eat.</p>
      </Section>

      <Section title="The Cup" eyebrow="Five">
        <p className="text-ink-800 leading-relaxed">
          Lift the cup. Say aloud (or silently together):
        </p>
        <p className="mt-3 font-serif text-xl text-ink-900 italic leading-snug">
          "Lord Jesus, this is the new covenant in Your blood, poured out for the forgiveness of
          my sins. I receive You again, with thanksgiving."
        </p>
        <p className="mt-3 text-ink-700">Drink.</p>
      </Section>

      <Section title="Pray — for the Body and the world" eyebrow="Six">
        <p className="text-ink-800 leading-relaxed italic">
          Father, we are one bread, one body, because we share one Bread (1 Corinthians 10:17).
          Hold Your whole church around the world tonight — those who gather freely, those who
          gather in secret, those who suffer for Your name. Make us one as You and the Son are
          one. Send us out to love and to witness. Come, Lord Jesus.
        </p>
      </Section>

      <Section title="Close — Bless and go" eyebrow="Seven">
        <p className="text-ink-800 leading-relaxed italic">
          "The grace of the Lord Jesus Christ, and the love of God, and the communion of the Holy
          Spirit be with us all. Amen." — 2 Corinthians 13:14
        </p>
      </Section>

      <section className="mt-12 rounded-3xl border border-ink-200 bg-card-subtle p-6 md:p-8">
        <h2 className="font-serif text-2xl text-ink-900">Questions believers ask</h2>
        <dl className="mt-4 space-y-5 text-sm">
          <Q
            q="Can I take communion alone?"
            a="The New Testament pattern is the gathered body. But Scripture does not forbid a believer cut off from the body (by illness, persecution, distance) from remembering the Lord. Do so with reverence. Get to the gathered church the moment you can."
          />
          <Q
            q="Does it have to be wine?"
            a="Scripture says 'the cup' and 'the fruit of the vine.' Grape juice is appropriate, especially with children present or for those in recovery."
          />
          <Q
            q="Does it have to be unleavened bread?"
            a="Jesus instituted the Supper at Passover (with unleavened bread). Most traditions today use ordinary bread. Either is faithful — the bread is the bread."
          />
          <Q
            q="Can children take it?"
            a="Traditions differ. Some baptize and commune infants; others wait for credible profession of faith. Follow your church's practice. If you have none, err on the side of teaching the child the meaning first."
          />
          <Q
            q="What about non-believers in the home?"
            a="Invite them to read and listen — it is for them too, when they trust Christ. To take the cup as a sign of trust before that trust exists empties the sign."
          />
          <Q
            q="Do I need to be ordained?"
            a="Traditions differ sharply. We do not dissolve that. In a household where there is no other option, follow Scripture and your conscience. When you can again gather with the church, do."
          />
        </dl>
      </section>

      <section className="mt-12 text-center">
        <p className="font-serif text-2xl text-ink-700 italic leading-snug">
          "You proclaim the Lord's death till He comes."
        </p>
        <p className="mt-2 text-sm text-ink-500">1 Corinthians 11:26</p>
        <Link
          href="/connect"
          className="mt-6 inline-flex items-center rounded-full bg-ink-900 text-ink-50 px-5 py-2 text-sm hover:bg-flame-700"
        >
          Find a local church near you →
        </Link>
      </section>
    </section>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="text-[10px] uppercase tracking-widest text-flame-700">Step {eyebrow}</div>
      <h2 className="font-serif text-2xl text-ink-900 mt-1">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Q({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-serif text-ink-900">{q}</dt>
      <dd className="mt-1 text-ink-700 leading-relaxed">{a}</dd>
    </div>
  );
}
