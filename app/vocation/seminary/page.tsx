import Link from "next/link";
import { PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Should I go to seminary? — Scripture Theory",
  description:
    "Honest pastoral wisdom for the believer weighing formal theological study. For the prospective student, the bivocational learner, the full-time enrolled, and the postgraduate researcher.",
};

export default function SeminaryPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/vocation"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Vocation
      </Link>

      <PageHero
        eyebrow="Pastoral guidance · prospective and current students"
        title="Should I go to"
        titleAccent="seminary?"
        intro="Formal theological study is one of the great gifts the Church has given the Church. It is also expensive, time-consuming, and not for every believer. This page offers honest pastoral wisdom for the decision — wisdom that respects both the calling and the cost."
        scripture="The things which you have heard from me among many witnesses, commit the same things to faithful people, who will be able to teach others also."
        scriptureRef="2 Timothy 2:2"
      />

      <div className="mt-10 space-y-8">
        {/* Three honest realities */}
        <section className="rounded-3xl border border-ink-200 bg-card p-6">
          <h2 className="font-serif text-2xl text-ink-900">Three honest realities, before we begin</h2>
          <ol className="mt-4 list-decimal pl-5 space-y-3 text-ink-800 leading-relaxed">
            <li>
              <strong>Seminary is not a substitute for a calling.</strong> The call to vocational
              ministry comes from the Spirit and is confirmed by the Church. Seminary equips the
              already-called; it does not create the calling.
            </li>
            <li>
              <strong>Seminary is not the only path to depth.</strong> Many of the greatest pastors
              and theologians in Church history — Spurgeon, Bonhoeffer's early years, Lewis as a lay
              writer, John Newton, A.W. Tozer — never had a formal seminary degree. Faithful local
              church involvement, lifelong reading, and mentorship can form a believer profoundly.
            </li>
            <li>
              <strong>Seminary is, for many, exactly right.</strong> If you are called to pastoral
              ministry, to theological teaching, to mission work that crosses cultures, or to
              counselling, seminary is often the wisest path. Do not refuse it out of false humility
              if the calling is real.
            </li>
          </ol>
        </section>

        {/* Discernment questions */}
        <section className="rounded-3xl border border-flame-300 bg-flame-50/40 p-6">
          <h2 className="font-serif text-2xl text-ink-900">Discernment questions</h2>
          <p className="mt-2 text-sm text-ink-700 italic">
            Bring these to extended prayer, to a pastor or mature believer, and to a clearness
            committee of three or four trusted people who know you well.
          </p>
          <ol className="mt-4 list-decimal pl-5 space-y-2.5 text-ink-800 leading-relaxed">
            <li>Has your local church confirmed the calling, or are you discerning it alone? The Church's confirmation matters.</li>
            <li>What specific ministry, role, or vocation would seminary equip you for? Can you name it?</li>
            <li>Have you tested the calling already — teaching, preaching, counselling, leading — in lay capacity? Fruit in small ways usually precedes fruit in larger ways.</li>
            <li>Are you running toward something or running away from something? Both are real motivations; the second is rarely a stable foundation.</li>
            <li>What is the financial cost, and how will it be paid? Christian students often graduate with debt that constrains the very ministries seminary was meant to equip. Plan honestly.</li>
            <li>What is the family cost — to your spouse, children, or aging parents? Will they be sustained through these years?</li>
            <li>Are you spiritually formed enough to receive the academic content without it puffing you up? The first year of seminary often unsettles a believer's faith before it deepens it.</li>
            <li>What will you do if, by the end, your calling has changed? Many seminarians discover they are called not to pastor but to teach, write, counsel, or serve in some other way. Hold the calling open.</li>
          </ol>
        </section>

        {/* By stage */}
        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-4">For each stage</h2>
          <div className="space-y-4">
            <article className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Prospective student</div>
              <h3 className="font-serif text-lg text-ink-900 mt-1">Before you apply</h3>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">
                Spend a full year in serious lay ministry first — teaching, preaching, leading small groups, counselling, serving in administrative capacity at your church. Read the major classics on your own (Augustine's Confessions, Calvin's Institutes Book III, Bonhoeffer's Cost of Discipleship, Lewis's Mere Christianity). Visit at least three schools in person and talk to current students candidly. Pray with your spouse if married, and your elders.
              </p>
            </article>
            <article className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Full-time enrolled</div>
              <h3 className="font-serif text-lg text-ink-900 mt-1">Through the program</h3>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">
                Do not let the academy replace the church. Stay rooted in a local congregation through the whole program; serve there in lay capacity even when busy. Guard your devotional life — seminary's biggest spiritual danger is making the Bible an object of study rather than a means of communion. Build close friendships with classmates that will outlast the degree. Take Hebrew and Greek seriously; you will not return to them after graduation if you do not love them now.
              </p>
            </article>
            <article className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Bivocational / part-time learner</div>
              <h3 className="font-serif text-lg text-ink-900 mt-1">For the believer studying alongside work</h3>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">
                Bivocational study is harder and slower, but in many ways spiritually healthier — it keeps you grounded in the rhythms of ordinary work and church life while you learn. Pace yourself for the long haul (most M.Div. programs take 5-7 years part-time). Build clear weekly rhythms that protect family time, Sabbath, and worship. Consider modular or distance programs from accredited schools — the technology now makes serious learning possible without relocating.
              </p>
            </article>
            <article className="rounded-2xl border border-ink-200 bg-card p-5">
              <div className="text-[10px] uppercase tracking-widest text-flame-700">Postgraduate researcher</div>
              <h3 className="font-serif text-lg text-ink-900 mt-1">For the Th.M., Ph.D., D.Min. student</h3>
              <p className="mt-2 text-sm text-ink-700 leading-relaxed">
                Pursue postgraduate work because the Church needs scholars who love her, not to build a personal academic brand. Pick a supervisor whose life and faith you respect, not only whose research is famous. The years can be lonely; commit early to a local church and a small group of fellow believers in your university. Remember that Ph.D. work — even in theology — has a much higher attrition rate than expected. Plan for the long climb; honour your spouse and family through it; and keep returning to the Word, devotionally, every day.
              </p>
            </article>
          </div>
        </section>

        {/* The honest cost */}
        <section className="rounded-3xl bg-ink-900 text-ink-50 p-6 md:p-7 relative overflow-hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(70% 60% at 0% 0%, rgba(249,115,22,0.18), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-serif text-2xl">The honest cost</h2>
            <p className="mt-3 text-sm text-ink-300 leading-relaxed">
              Seminary is not free. The financial cost matters — borrow only what you can repay on the salary you will likely earn. But the deeper costs are spiritual. Three years of academic study can produce a graduate who knows more about God and loves Him less. The faithful seminarian works actively against this — by prayer, by participation in worship, by friendship, by service to the poor and weak, by refusing to make any class a substitute for the closet, the church, the sick-bed visit, or the meal with a struggling brother. Guard your soul. The God who calls you to study calls you, even more, to know Him.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="rounded-3xl border border-ink-200 bg-card-subtle p-6">
          <h2 className="font-serif text-xl text-ink-900">Trustworthy directories and resources</h2>
          <p className="mt-2 text-sm text-ink-700 italic">
            These maintain their own data and are far better positioned than we are to keep listings
            current. Confirm anything you read on them with the school's own admissions office.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href="https://www.ats.edu/member-schools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame-700 hover:underline"
              >
                The Association of Theological Schools (ATS) ↗
              </a>{" "}
              <span className="text-ink-500">— graduate-level theological education, accreditation, U.S. and Canada.</span>
            </li>
            <li>
              <a
                href="https://www.abhe.org/member-schools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame-700 hover:underline"
              >
                Association for Biblical Higher Education (ABHE) ↗
              </a>{" "}
              <span className="text-ink-500">— undergraduate Bible college accreditation.</span>
            </li>
            <li>
              <a
                href="https://overseasministries.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame-700 hover:underline"
              >
                OMSC / international training networks ↗
              </a>{" "}
              <span className="text-ink-500">— for missions-oriented study and global theological education.</span>
            </li>
            <li>
              <a
                href="https://www.ccel.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame-700 hover:underline"
              >
                CCEL · Christian Classics Ethereal Library ↗
              </a>{" "}
              <span className="text-ink-500">— free public-domain classics: Augustine, Calvin, Spurgeon, Edwards, and more.</span>
            </li>
          </ul>
        </section>

        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/vocation/discerning-schools"
            className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Next</div>
            <div className="font-serif text-ink-900 mt-0.5">Discerning a Bible school →</div>
            <div className="text-xs text-ink-600 mt-0.5">Framework for evaluating any program</div>
          </Link>
          <Link
            href="/secret-place"
            className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Pray about it</div>
            <div className="font-serif text-ink-900 mt-0.5">Bring it to the Secret Place</div>
            <div className="text-xs text-ink-600 mt-0.5">Journal the decision before Him</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
