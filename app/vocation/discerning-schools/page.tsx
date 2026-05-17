import Link from "next/link";
import { PageHero } from "@/components/ui/Tile";
import { Glyph } from "@/components/ui/Glyph";

export const metadata = {
  title: "Discerning a Bible school — Scripture Theory",
  description:
    "A framework for evaluating any Bible school or seminary — accreditation, doctrine, finances, fit, and the questions to ask before you enroll.",
};

export default function DiscerningSchoolsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <Link
        href="/vocation"
        className="text-xs uppercase tracking-widest text-flame-700 hover:underline"
      >
        ← Vocation
      </Link>

      <PageHero
        eyebrow="Framework · for any school"
        title="Discerning a"
        titleAccent="Bible school."
        intro="A framework for evaluating any Bible school, seminary, or theological program — undergraduate or graduate, denominational or independent, residential or distance. The questions matter more than the rankings."
        scripture="Test all things; hold firmly that which is good."
        scriptureRef="1 Thessalonians 5:21"
      />

      <div className="mt-10 space-y-6">
        {/* Five dimensions */}
        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-4">Five dimensions to evaluate</h2>
          <p className="text-sm text-ink-600 italic mb-5">
            Rank a school against all five, not just one. A school that excels in academic rigor but is doctrinally drifting will not equip you for faithful ministry. A school that is doctrinally strong but pedagogically thin will leave you with conviction and no skill.
          </p>

          <div className="space-y-4">
            <Dimension
              n={1}
              title="Doctrine"
              short="What does the school actually teach?"
              questions={[
                "Read their statement of faith carefully. Where does it stand on the inspiration and authority of Scripture? On the historic creeds? On the gospel?",
                "Look at the faculty publication record. Are they writing things you can stand behind?",
                "Ask current students: 'Do your professors love Jesus? Do they pray with you? Do they invite you to dinner?' These are not optional questions.",
                "Beware of schools whose statements have grown vague over time. Doctrinal drift is real and often quiet.",
              ]}
            />
            <Dimension
              n={2}
              title="Accreditation"
              short="Is the degree recognized and credible?"
              questions={[
                "Is the school accredited by a recognized body? In the U.S.: ATS (graduate), ABHE (undergraduate), or regional accreditors (HLC, SACS, etc.). Outside the U.S.: equivalents exist in your country.",
                "If you plan to do further graduate work, will your degree transfer? Many smaller schools' degrees do not.",
                "Some excellent schools are deliberately not accredited (often for theological conscience reasons). This is fine — just understand the implications for transferability and licensure.",
                "Beware of unaccredited schools that imply they are accredited. This is increasingly common and increasingly fraudulent.",
              ]}
            />
            <Dimension
              n={3}
              title="Formation"
              short="Will this school form your soul, not just your mind?"
              questions={[
                "Does the school require chapel, prayer, or community worship as a regular part of the program?",
                "Are students expected to be in local churches? Do faculty hold them accountable to it?",
                "Are there mentorship structures — older believers walking with students through the program?",
                "Visit and ask: 'What is the dominant tone of student life?' If it is competitive, anxious, or theologically angry, walk carefully.",
              ]}
            />
            <Dimension
              n={4}
              title="Finance"
              short="Can you afford this, in money and time?"
              questions={[
                "What is the total cost — tuition, fees, books, living, opportunity cost? Calculate the full number.",
                "What scholarships and aid does the school actually award (not just advertise)? Ask current students.",
                "What is the median debt of graduates? Many schools publish this; if yours does not, ask.",
                "Will you earn enough after graduation to repay reasonably? Ministry salaries are often lower than the loan payments assume.",
                "Bivocational and distance options are increasingly excellent. Consider them seriously even if you would prefer residential.",
              ]}
            />
            <Dimension
              n={5}
              title="Fit"
              short="Is this the right school for the actual you?"
              questions={[
                "Does the school's denominational or theological tradition match yours? You can study outside your tradition with profit, but if you cannot affirm the school's core, you will be unhappy.",
                "Does the location work for your spouse, children, or aging parents?",
                "Visit. The school's website will tell you what they want you to think; the campus visit will tell you what life there is actually like.",
                "Pray. The Spirit knows the school for you. Watch for confirmations and closed doors.",
              ]}
            />
          </div>
        </section>

        {/* Red flags */}
        <section className="rounded-3xl border border-red-300 bg-red-50/40 p-6">
          <div className="flex items-start gap-3">
            <Glyph id="lamp" size={32} className="text-red-700 shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl text-ink-900">Red flags to take seriously</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-ink-800 leading-relaxed">
                <li>The school's website implies accreditation it does not have.</li>
                <li>The statement of faith is vague on Scripture, the deity of Christ, the gospel, or the resurrection.</li>
                <li>You cannot easily find faculty credentials, publication record, or church involvement.</li>
                <li>Current students cannot describe what spiritual formation looks like at the school.</li>
                <li>The school has had multiple high-profile faculty or administrative scandals in recent years.</li>
                <li>Marketing emphasizes "fast and flexible" over "deep and formed."</li>
                <li>The financial advice you get from the admissions office sounds like sales pressure.</li>
                <li>Graduates from the program are not, in fact, doing the kind of ministry the school advertises.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Questions to ask current students */}
        <section className="rounded-3xl border border-ink-200 bg-card p-6">
          <h2 className="font-serif text-xl text-ink-900">Ten questions to ask current students</h2>
          <p className="mt-2 text-sm text-ink-700 italic">
            Find a current student or recent alumnus — by email, LinkedIn, or campus visit — and ask
            them, in their own words. The school's marketing will not answer these honestly.
          </p>
          <ol className="mt-4 list-decimal pl-5 space-y-2 text-sm text-ink-800 leading-relaxed">
            <li>What surprised you most, good or bad, in the first year?</li>
            <li>Do your professors actually know your name?</li>
            <li>Has your faith grown deeper or thinner during your time here?</li>
            <li>Are you connected to a local church, and does the school support that?</li>
            <li>What is the dominant mood among students — joy, fear, exhaustion, ambition?</li>
            <li>How much debt will you graduate with, honestly?</li>
            <li>If you could do it over, would you come here again?</li>
            <li>Who at the school has most shaped your formation, and why?</li>
            <li>What does the school not advertise that prospective students should know?</li>
            <li>Who would you recommend I also talk to?</li>
          </ol>
        </section>

        {/* Closing */}
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
            <h2 className="font-serif text-2xl">The deeper question</h2>
            <p className="mt-3 text-sm text-ink-300 leading-relaxed">
              Behind every choice of school is a question about who is forming you. The Holy Spirit forms believers through the local church first, the Word read and prayed, the disciplines, and the long companionship of Jesus. A good seminary is one of the great gifts the Spirit uses; it is not, finally, the source of your formation. Choose a school that knows it is a servant of the Spirit, not a substitute for Him.
            </p>
          </div>
        </section>

        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/vocation/seminary"
            className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Back</div>
            <div className="font-serif text-ink-900 mt-0.5">Should I go to seminary? ←</div>
            <div className="text-xs text-ink-600 mt-0.5">The pastoral guide</div>
          </Link>
          <Link
            href="/secret-place"
            className="rounded-2xl border border-ink-200 bg-card p-4 hover:border-flame-500 transition-colors"
          >
            <div className="text-[10px] uppercase tracking-widest text-flame-700">Pray it through</div>
            <div className="font-serif text-ink-900 mt-0.5">Bring it to the Secret Place</div>
            <div className="text-xs text-ink-600 mt-0.5">Journal the decision before Him</div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Dimension({
  n,
  title,
  short,
  questions,
}: {
  n: number;
  title: string;
  short: string;
  questions: string[];
}) {
  return (
    <article className="rounded-2xl border border-ink-200 bg-card p-5">
      <div className="flex items-baseline gap-3">
        <div className="w-10 h-10 rounded-xl border border-flame-500 bg-flame-50 text-flame-700 flex items-center justify-center font-serif text-lg shrink-0">
          {n}
        </div>
        <div>
          <h3 className="font-serif text-xl text-ink-900">{title}</h3>
          <p className="text-sm text-ink-600 italic">{short}</p>
        </div>
      </div>
      <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-ink-800 leading-relaxed">
        {questions.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    </article>
  );
}
