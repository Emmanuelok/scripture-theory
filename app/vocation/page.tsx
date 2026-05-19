import Link from "next/link";
import { PageHero, Tile } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";
import VocationFunnel from "@/components/VocationFunnel";

export const metadata = {
  title: "Vocation — Scripture Theory",
  description:
    "Pastoral guidance for believers weighing their callings — to formal study, to vocational ministry, to the marketplace, to the mission field. Not a directory; a framework for discernment.",
};

export default function VocationPage() {
  return (
    <section className="mx-auto max-w-4xl px-5 pt-12 pb-24">
      <PageHero
        eyebrow="For believers weighing their callings"
        title="Vocation."
        titleAccent=""
        intro="The call of God is not the same as the call to vocational ministry. Every believer has a vocation — a place where God has sent them. For some, that place includes formal study, seminary, full-time ministry, or the mission field. These pages offer pastoral guidance for the decision — not a directory of schools, but a framework for discerning yours."
        scripture="As each has received a gift, use it to serve one another, as good managers of the grace of God in its various forms."
        scriptureRef="1 Peter 4:10"
      />

      <div className="mt-10">
        <VocationFunnel />
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-3 md:gap-4">
        <Tile
          href="/vocation/seminary"
          eyebrow="The big question"
          title="Should I go to seminary?"
          sub="Honest pastoral wisdom for the prospective student, the bivocational learner, the full-time enrolled, and the postgraduate researcher."
          glyph={<Glyph id="open-book" size={48} />}
        />
        <Tile
          href="/vocation/discerning-schools"
          eyebrow="Choosing well"
          title="Evaluating a Bible school"
          sub="A framework for discerning any Bible school or seminary — accreditation, doctrine, finances, fit, and the questions to ask before you enroll."
          glyph={<Glyph id="scroll" size={48} />}
        />
      </div>

      <div className="mt-12 rounded-3xl border border-flame-300 bg-flame-50/40 p-6">
        <div className="flex items-start gap-3">
          <Glyph id="lamp" size={36} className="text-flame-700 shrink-0" />
          <div>
            <h2 className="font-serif text-xl text-ink-900">Why no directory?</h2>
            <p className="mt-2 text-sm text-ink-700 leading-relaxed">
              We deliberately do not maintain a directory of seminaries and Bible schools. There are tens of thousands of programs worldwide, accreditation changes every year, doctrinal positions drift, and a single bad listing could mislead a believer through a six-figure life decision. Instead, we offer the pastoral wisdom for the decision and point you to authoritative directories that specialize in keeping their data current.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <a
                href="https://www.ats.edu/member-schools"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-flame-500 text-flame-700 px-3 py-1 hover:bg-flame-50"
              >
                ATS member directory ↗
              </a>
              <a
                href="https://www.abhe.org/member-schools"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-flame-500 text-flame-700 px-3 py-1 hover:bg-flame-50"
              >
                ABHE schools ↗
              </a>
              <a
                href="https://www.tyndale.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-flame-500 text-flame-700 px-3 py-1 hover:bg-flame-50"
              >
                Tyndale House ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-ink-200 bg-card-subtle p-6">
        <h2 className="font-serif text-xl text-ink-900">More on vocation, coming</h2>
        <p className="mt-2 text-sm text-ink-700 leading-relaxed">
          We plan to add pastoral guidance for additional callings — the pastor, the missionary,
          the marketplace believer, the artist, the academic, the parent, the single believer
          serving in place. The Christian's vocation is wider than vocational ministry; the
          platform's content will keep growing to match.
        </p>
      </div>

      <p className="mt-8 text-xs text-ink-500 italic text-center">
        "And he gave the apostles, the prophets, the evangelists, the shepherds and teachers, to
        equip the saints for the work of ministry, for building up the body of Christ." — Ephesians 4:11-12
      </p>
    </section>
  );
}
