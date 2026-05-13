import Link from "next/link";

export const metadata = {
  title: "What we believe — Scripture Theory",
  description:
    "Scripture Theory holds the historic faith of the Christian Church as expressed in the Apostles' Creed and the Nicene Creed — and the one gospel of Jesus Christ.",
};

export default function BeliefsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 pb-24">
      <span className="text-xs uppercase tracking-widest text-flame-700">What we believe</span>
      <h1 className="font-serif text-4xl md:text-5xl mt-2 text-ink-900 leading-tight">
        The faith once for all delivered to the saints.
      </h1>
      <p className="mt-5 text-ink-700 leading-relaxed">
        "Inter-denominational" does not mean "no doctrine." It means we hold to the historic
        Christian faith — the faith of Scripture, the faith of the early Church, the faith
        confessed by believers across centuries, languages, and traditions — and we leave
        secondary matters where Scripture leaves them: to the conscience, the local church, and
        the work of the Spirit.
      </p>

      <div className="mt-10 space-y-10 text-ink-700 leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">The core: one Gospel</h2>
          <p>
            We confess what Paul confessed:
          </p>
          <blockquote className="mt-3 border-l-4 border-flame-300 pl-4 italic text-ink-800">
            "For I delivered unto you first of all that which I also received, how that Christ
            died for our sins according to the scriptures; and that he was buried, and that he
            rose again the third day according to the scriptures."
            <span className="block mt-1 not-italic text-sm text-ink-500">
              — 1 Corinthians 15:3–4
            </span>
          </blockquote>
          <p className="mt-3">
            Jesus Christ — fully God and fully man — lived a sinless life, died on the cross as
            a substitute for sinners, was buried, rose bodily on the third day, ascended to the
            right hand of the Father, and is coming again. By repentance from sin and faith in
            Him, anyone may be saved, forgiven, indwelt by the Holy Spirit, and adopted as a
            child of God.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">The Apostles' Creed</h2>
          <p className="text-sm text-ink-500 mb-3">
            The oldest baptismal confession of the Church, in continual use since at least the
            second century.
          </p>
          <div className="rounded-2xl border border-ink-200 bg-card p-5 md:p-6 font-serif text-lg leading-relaxed text-ink-900">
            <p>I believe in God, the Father almighty, creator of heaven and earth.</p>
            <p className="mt-3">
              I believe in Jesus Christ, his only Son, our Lord, who was conceived by the Holy
              Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died,
              and was buried; he descended to the dead. On the third day he rose again; he
              ascended into heaven, he is seated at the right hand of the Father, and he will
              come again to judge the living and the dead.
            </p>
            <p className="mt-3">
              I believe in the Holy Spirit, the holy catholic Church, the communion of saints,
              the forgiveness of sins, the resurrection of the body, and the life everlasting.
              Amen.
            </p>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            "Catholic" here is the original meaning: universal — every faithful believer in every
            place who confesses Christ as Lord.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">The Nicene Creed (A.D. 325 / 381)</h2>
          <p className="text-sm text-ink-500 mb-3">
            The Church's response to early heresies, confessed by Eastern, Roman, Anglican,
            Lutheran, Reformed, and many evangelical communions.
          </p>
          <div className="rounded-2xl border border-ink-200 bg-card p-5 md:p-6 font-serif text-lg leading-relaxed text-ink-900">
            <p>
              We believe in one God, the Father almighty, maker of heaven and earth, of all
              things visible and invisible.
            </p>
            <p className="mt-3">
              And in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father
              before all worlds; God of God, Light of Light, very God of very God; begotten, not
              made, being of one substance with the Father, by whom all things were made; who for
              us men and for our salvation came down from heaven, and was incarnate by the Holy
              Spirit of the Virgin Mary, and was made man; and was crucified also for us under
              Pontius Pilate; he suffered and was buried; and the third day he rose again
              according to the Scriptures; and ascended into heaven, and sitteth on the right
              hand of the Father; and he shall come again, with glory, to judge both the quick
              and the dead; whose kingdom shall have no end.
            </p>
            <p className="mt-3">
              And we believe in the Holy Spirit, the Lord and Giver of life, who proceedeth from
              the Father, who with the Father and the Son together is worshipped and glorified,
              who spake by the prophets.
            </p>
            <p className="mt-3">
              And we believe in one holy catholic and apostolic Church. We acknowledge one baptism
              for the remission of sins; and we look for the resurrection of the dead, and the
              life of the world to come. Amen.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">Essentials we will not negotiate</h2>
          <ul className="space-y-3 list-disc pl-5">
            <li>
              <strong>The Trinity.</strong> One God, eternally existing in three Persons —
              Father, Son, and Holy Spirit — co-equal, co-eternal, of one substance.
            </li>
            <li>
              <strong>The deity and humanity of Christ.</strong> Jesus is fully God and fully man
              in one Person, forever.
            </li>
            <li>
              <strong>The authority of Scripture.</strong> The 66 books of the Old and New
              Testaments are the inspired, written Word of God, sufficient for faith and life.
              (We respectfully note that some traditions include the Deuterocanonical books;
              we publish them in the Clementine Vulgate and Douay-Rheims editions, and we are
              honest about which canon a translation reflects.)
            </li>
            <li>
              <strong>Salvation by grace through faith in Christ alone.</strong> Not by works,
              not by tradition, not by merit. The Spirit then produces the fruit of obedience
              in those He has redeemed.
            </li>
            <li>
              <strong>The bodily resurrection of Jesus.</strong> No resurrection, no Christianity
              (1 Corinthians 15:14).
            </li>
            <li>
              <strong>The bodily return of Christ</strong> to judge the living and the dead and to
              consummate His Kingdom.
            </li>
            <li>
              <strong>The Church.</strong> The universal Body of Christ, made visible in faithful
              local congregations, marked by Word, sacrament/ordinance, prayer, mission, and love.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">What we hold loosely</h2>
          <p>
            Faithful brothers and sisters disagree, in love, over questions of church government,
            the mode and recipients of baptism, the timing and details of Christ's return, the
            nature of spiritual gifts, the relationship between the believer's freedom and the
            old-covenant law, and many other matters. On these things Scripture Theory takes no
            partisan position. We commend you to your local church and to your conscience before
            God.
          </p>
          <p className="mt-3">
            We believe Christ's prayer in John 17 — "that they all may be one" — is binding on us,
            and that division over secondary matters dishonors Him. Where we can agree, we
            rejoice. Where we differ, we love.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink-900 mb-3">If you'd like to go deeper</h2>
          <p>
            We publish the full text of the historic creeds, several catechisms, and the writings
            of the early Church in our{" "}
            <Link href="/resources/creeds" className="text-flame-700 hover:underline">
              creeds collection
            </Link>{" "}
            and{" "}
            <Link href="/resources" className="text-flame-700 hover:underline">resources hub</Link>.
            The Bereans, Luke commends, did not take the Apostle's word for it — they searched the
            Scriptures themselves (Acts 17:11). Do the same here.
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
          href="/resources/creeds"
          className="rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          Historic creeds
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-ink-300 px-5 py-2 text-sm text-ink-800 hover:border-ink-900"
        >
          About this site
        </Link>
      </div>
    </section>
  );
}
