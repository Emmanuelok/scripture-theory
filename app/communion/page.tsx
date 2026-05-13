import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "The Lord's Supper at Home — Scripture Theory",
  description:
    "A reverent, non-denominational guide for taking the Lord's Supper at home — when sickness, persecution, distance, or season prevent gathering with the local church. With Scripture, examination, words of institution, and prayer.",
};

const FAQS = [
  {
    q: "Can I take communion alone?",
    a: "The New Testament pattern is the gathered body. But Scripture does not forbid a believer cut off from the body (by illness, persecution, distance) from remembering the Lord. Do so with reverence. Get to the gathered church the moment you can.",
  },
  {
    q: "Does it have to be wine?",
    a: "Scripture says 'the cup' and 'the fruit of the vine.' Grape juice is appropriate, especially with children present or for those in recovery.",
  },
  {
    q: "Does it have to be unleavened bread?",
    a: "Jesus instituted the Supper at Passover (with unleavened bread). Most traditions today use ordinary bread. Either is faithful — the bread is the bread.",
  },
  {
    q: "Can children take it?",
    a: "Traditions differ. Some baptize and commune infants; others wait for credible profession of faith. Follow your church's practice. If you have none, err on the side of teaching the child the meaning first.",
  },
  {
    q: "What about non-believers in the home?",
    a: "Invite them to read and listen — it is for them too, when they trust Christ. To take the cup as a sign of trust before that trust exists empties the sign.",
  },
  {
    q: "Do I need to be ordained?",
    a: "Traditions differ sharply. We do not dissolve that. In a household where there is no other option, follow Scripture and your conscience. When you can again gather with the church, do.",
  },
];

export default function CommunionPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="Practice · 1 Corinthians 11"
        title="Do this"
        titleAccent="in remembrance of Me."
        intro="The Lord's Supper is the meal Jesus gave His church the night before He died. It is to be taken with the gathered body whenever possible. But there are seasons — illness, persecution, mission, distance, isolation — when a believer or household will take it at home. This is a reverent, scriptural way to do that."
        scripture="For as often as you eat this bread and drink this cup, you proclaim the Lord's death till He comes."
        scriptureRef="1 Corinthians 11:26"
      />

      {/* Pastoral word — featured */}
      <Tile
        tone="dark"
        size="wide"
        eyebrow="A pastoral word, first"
        title={
          <>
            We do not dissolve traditions —{" "}
            <span className="text-flame-300">we point home.</span>
          </>
        }
        sub="Christian traditions differ on who may preside, who may receive, and what happens at the table. If you have a local church, ask your pastor first. If you do not, or you cannot, what follows is drawn straight from Scripture and the prayers the global church has prayed for centuries."
        glyph={<Glyph id="chalice" size={120} />}
        className="mt-12"
      />

      {/* Seven-step liturgy */}
      <div className="mt-12 space-y-6">
        <Step n={1} title="Prepare" glyph="examen">
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
              way. First be reconciled to your brother…" (Matthew 5:23–24)
            </li>
          </ul>
        </Step>

        <Step n={2} title="His own words" glyph="open-book">
          <blockquote className="prose-scripture text-ink-900 border-l-2 border-flame-500 pl-4 italic leading-relaxed">
            "The Lord Jesus on the same night in which He was betrayed took bread; and when He had
            given thanks, He broke it and said, 'Take, eat; this is My body which is broken for
            you; do this in remembrance of Me.' In the same manner He also took the cup after
            supper, saying, 'This cup is the new covenant in My blood. This do, as often as you
            drink it, in remembrance of Me.'"
            <div className="mt-2 not-italic text-xs text-ink-500">— 1 Corinthians 11:23–25</div>
          </blockquote>
        </Step>

        <Step n={3} title="Thanksgiving" glyph="hands">
          <p className="italic text-ink-800 leading-relaxed">
            Father, we thank You that You so loved the world that You gave Your only begotten Son,
            that whoever believes in Him should not perish but have everlasting life.
          </p>
          <p className="italic text-ink-800 leading-relaxed mt-3">
            We thank You that on the night He was betrayed, He took bread, gave thanks, and broke
            it. So now we take this bread, by His command, in remembrance of Him.
          </p>
        </Step>

        <Step n={4} title="The Bread" glyph="bread">
          <p className="text-ink-800 leading-relaxed">Take a piece of the bread. Hold it. Say aloud:</p>
          <p className="mt-3 font-serif text-xl md:text-2xl text-ink-900 italic leading-snug border-l-2 border-flame-500 pl-4">
            "Lord Jesus, this is the Bread of Life. This is Your body, broken for me. I receive
            You again, with thanksgiving."
          </p>
          <p className="mt-3 text-ink-700">Eat.</p>
        </Step>

        <Step n={5} title="The Cup" glyph="chalice">
          <p className="text-ink-800 leading-relaxed">Lift the cup. Say aloud:</p>
          <p className="mt-3 font-serif text-xl md:text-2xl text-ink-900 italic leading-snug border-l-2 border-flame-500 pl-4">
            "Lord Jesus, this is the new covenant in Your blood, poured out for the forgiveness
            of my sins. I receive You again, with thanksgiving."
          </p>
          <p className="mt-3 text-ink-700">Drink.</p>
        </Step>

        <Step n={6} title="Pray — for the Body and the world" glyph="globe">
          <p className="italic text-ink-800 leading-relaxed">
            Father, we are one bread, one body, because we share one Bread (1 Corinthians 10:17).
            Hold Your whole church around the world tonight — those who gather freely, those who
            gather in secret, those who suffer for Your name. Make us one as You and the Son are
            one. Send us out to love and to witness. Come, Lord Jesus.
          </p>
        </Step>

        <Step n={7} title="Bless and go" glyph="dove">
          <p className="italic text-ink-800 leading-relaxed">
            "The grace of the Lord Jesus Christ, and the love of God, and the communion of the
            Holy Spirit be with us all. Amen." — 2 Corinthians 13:14
          </p>
        </Step>
      </div>

      {/* FAQs */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl md:text-3xl text-ink-900 mb-5">
          Questions believers ask
        </h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-ink-200 bg-card overflow-hidden"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between p-5 hover:bg-card-subtle transition-colors">
                <span className="font-serif text-ink-900">{f.q}</span>
                <span className="text-flame-700 text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-ink-700 leading-relaxed">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <Tile
        size="wide"
        tone="flame"
        eyebrow="One Body"
        title="Find a faithful local church"
        sub="The Lord's table is, by design, the gathered body's table. Three short questions and we'll surface real congregations near you."
        glyph={<Glyph id="house" size={120} />}
        href="/connect"
        className="mt-14"
      />

      <div className="mt-14 text-center">
        <p className="font-serif text-2xl md:text-3xl text-ink-700 italic leading-snug">
          "You proclaim the Lord's death till He comes."
        </p>
        <p className="mt-2 text-sm text-ink-500">1 Corinthians 11:26</p>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  glyph,
  children,
}: {
  n: number;
  title: string;
  glyph: Parameters<typeof Glyph>[0]["id"];
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-ink-200 bg-card p-6 md:p-8">
      <span
        aria-hidden
        className="absolute right-5 top-5 text-flame-700/20"
      >
        <Glyph id={glyph} size={56} />
      </span>
      <div className="relative">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-4xl text-flame-700 leading-none">
            {String(n).padStart(2, "0")}
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Step {n}</div>
            <h2 className="font-serif text-2xl text-ink-900">{title}</h2>
          </div>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
