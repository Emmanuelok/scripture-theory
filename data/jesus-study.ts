/**
 * An extensive study on the Christ-centered reading of Scripture.
 *
 * This essay is the opening of the merged page "Jesus throughout the
 * Scriptures." It is original Scripture Theory editorial — but it
 * carefully traces the actual historical tradition of Christological
 * reading from Jesus Himself, through the apostles, the Fathers, the
 * Reformers, the Puritans, and into the modern era.
 *
 * Every named figure is a real and well-attested historical writer.
 * Where we attribute a saying, we cite a work and (where possible) the
 * specific text. Where the saying is well-known but the wording in
 * tradition is variable, we render it in plain English and indicate so.
 */

export type StudySection = {
  id: string;
  heading: string;
  /** A short scriptural epigraph (verse text + reference). */
  epigraph?: { text: string; reference: string };
  body: string[]; // paragraphs
};

export const jesusStudy: StudySection[] = [
  {
    id: "the-emmaus-principle",
    heading: "1 · The Emmaus principle: Jesus Himself read the Bible this way",
    epigraph: {
      text: "And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself.",
      reference: "Luke 24:27",
    },
    body: [
      "Christianity does not begin with a theory about how to read the Old Testament. It begins with a risen Man on a road. On the afternoon of the first Easter, walking toward Emmaus with two confused disciples, Jesus opened the Hebrew Scriptures — \"Moses and all the prophets\" — and showed them, page by page, that the whole thing had been about Him. Later that evening, He stood in a locked room and said the same thing again: \"all things must be fulfilled, which were written in the law of Moses, and in the prophets, and in the psalms, concerning me\" (Luke 24:44).",
      "Earlier in His ministry He had said it more pointedly. To the religious leaders studying the Bible in search of life He said, \"You search the Scriptures, because you think that in them you have eternal life; and it is they that bear witness about me\" (John 5:39). And to a Jerusalem crowd in the temple: \"Your father Abraham rejoiced to see my day, and he saw it and was glad\" (John 8:56).",
      "This is not a Christian reading imposed on Jewish texts. This is the reading the risen Lord Himself gave to His own Scriptures. To read the Bible Christologically is not to add Jesus to the Old Testament. It is to recover what Jesus said was already there.",
    ],
  },
  {
    id: "the-apostles-hermeneutic",
    heading: "2 · The apostles caught it — and carried it everywhere",
    epigraph: {
      text: "All the promises of God find their Yes in him. That is why it is through him that we utter our Amen to God for his glory.",
      reference: "2 Corinthians 1:20",
    },
    body: [
      "Once Jesus had handed His apostles the Christ-centered hermeneutic, they used it without hesitation. Peter, standing in Jerusalem fifty days after the resurrection, preached the Spirit's outpouring as Joel 2 fulfilled, the resurrection as Psalm 16 fulfilled, the ascension as Psalm 110 fulfilled (Acts 2). Philip ran alongside an Ethiopian official reading Isaiah 53 and, \"beginning with this Scripture, told him the good news about Jesus\" (Acts 8:35).",
      "Paul wrote that the rock that gave water to Israel in the wilderness \"was Christ\" (1 Corinthians 10:4). The author of Hebrews argued for eleven chapters that the entire tabernacle system was a shadow whose substance had now arrived (Hebrews 8–10). John testified that when Isaiah saw the Lord high and lifted up in the temple, \"he saw his glory and spoke of him\" — meaning the pre-incarnate Christ (John 12:41). Peter said the Old Testament prophets themselves had been inquiring into the sufferings and glories of the very Christ the apostles now preached (1 Peter 1:10–12).",
      "The New Testament is not an interpretation laid alongside the Old. It is the Old Testament's own self-disclosure. The hidden Christ has stepped forward and named Himself.",
    ],
  },
  {
    id: "the-fathers",
    heading: "3 · The Fathers: every prophet, every offering, every shadow",
    body: [
      "The earliest Christian writers, taught by the apostles or by their immediate successors, simply continued the Lukan reading. Justin Martyr, writing around A.D. 155, devoted long sections of his Dialogue with Trypho to showing how Christ was prefigured throughout the Hebrew Scriptures — in Joshua's name, in the bronze serpent, in the scapegoat, in Isaiah's Servant.",
      "St. Irenaeus of Lyons (c. 130–202) gave the Church one of its great Christological frameworks: recapitulation. In Against Heresies, Irenaeus argued that Christ, as the second Adam, retraces the steps of the first Adam and undoes every defeat — obedient where Adam disobeyed, victorious on a tree where Adam was defeated by a tree, faithful in the wilderness where Israel had failed. The entire arc of salvation history is being gathered up (anakephalaiōsis, Ephesians 1:10) into Christ.",
      "Origen of Alexandria (c. 185–253), the early Church's most prolific commentator, devoted thousands of pages to showing the Christ-pattern in every book — Genesis, Exodus, Leviticus, Numbers, Joshua, Judges, Psalms, Song of Songs, the prophets. He overreached at times in his allegorical method; later writers would correct him. But his core conviction — that the Old Testament will yield its true depths only when the eye of Christ is opened on it — became the Church's settled instinct.",
      "St. Athanasius of Alexandria (c. 296–373), defender of Christ's full deity at Nicaea, wrote in his Letter to Marcellinus on the Psalms: when you pray the Psalms, you are not merely reading David — \"the words become as if your own.\" The Psalter is the song-book of the Christ who is Head of His Body, and that Body now sings with Him.",
      "St. Augustine of Hippo (354–430) gave the Latin West the principle every later Christian reader would quote: Novum Testamentum in Vetere latet, Vetus in Novo patet — \"The New Testament is concealed in the Old; the Old is revealed in the New\" (City of God, citing Quaestiones in Heptateuchum). His Enarrationes in Psalmos — exposition of all one hundred and fifty psalms — is one of the longest sustained Christological readings of any biblical book in Christian history, and centers on the totus Christus, the whole Christ: Head and members together.",
    ],
  },
  {
    id: "the-medievals",
    heading: "4 · The medievals: Christ in the cloister and the schools",
    body: [
      "Between the Fathers and the Reformers, Christ-centered reading deepened in the monasteries. St. Bernard of Clairvaux (1090–1153), the most influential preacher of his century, gave eighty-six sermons on the Song of Songs, hearing in every verse the voice of the Bridegroom Christ wooing His Bride. He never reached chapter 3:1 before he died. The sermons are still in print, and still read like fire.",
      "The medieval schools developed the so-called Quadriga, the four senses of Scripture: literal, allegorical (Christ and the Church), moral (how I should live), and anagogical (heaven and the consummation). At its worst, the system invited speculation. At its best — in Hugh of St. Victor, in Thomas Aquinas — it insisted that no allegorical reading was allowed unless it was first grounded in the literal sense the human author meant.",
      "Aquinas (1225–1274), in his Summa Theologiae (I.1.10), gave classic shape to the principle: the literal sense is the foundation of every other sense, and the literal sense itself contains Christ — because the events described in the Old Testament were themselves arranged by God to point forward to Him.",
    ],
  },
  {
    id: "the-reformers",
    heading: "5 · The Reformation recovery: the literal sense is Christological",
    body: [
      "The Reformers did not invent the Christ-centered reading; they purified it. Where late-medieval allegory had drifted into speculation, Luther and Calvin re-anchored the Church in the sensus literalis — the plain sense the human author wrote. But they were emphatic: that plain sense was, from the Spirit's side of the page, Christological all along.",
      "Martin Luther (1483–1546) put it in characteristically blunt terms: every page of the Old Testament \"contains Christ.\" In his Lectures on Genesis he traces Christ through every patriarch. In the Lectures on the Psalms he hears Christ in nearly every Psalm. His Galatians commentary of 1535 — by his own admission his \"Katie von Bora,\" his bride — is a sustained meditation on Christ-alone, faith-alone, against any return to law-righteousness.",
      "John Calvin (1509–1564) wrote commentaries on most books of the Bible. In the preface to his Commentary on the Psalms (1557), he called the Psalter \"an Anatomy of all the Parts of the Soul,\" and read it consistently as the prayer-book of the suffering and exalted Christ. Calvin's hermeneutical rule was strict: respect the historical situation of every text — and yet hear, in that historical situation, the foreshadowed Christ.",
      "Across the rest of the Reformation tradition the same pattern holds. Tyndale, Cranmer, Bullinger, Bucer, Knox, Owen, Manton, Henry — all of them preached and wrote with the conviction that the Bible's center of gravity is the Person and work of Jesus Christ.",
    ],
  },
  {
    id: "the-puritans-pietists",
    heading: "6 · Puritans, Pietists, and the great preachers",
    body: [
      "If the Reformers gave the Church the principle, the Puritans gave it the practice. John Owen (1616–1683) wrote a seven-volume exposition of Hebrews — the single longest Christ-centered Puritan commentary on any one biblical book. His Christologia (1679) is a sustained meditation on \"the glorious mystery of the person of Christ.\" Owen called Jesus \"the proper centre and substance of all divine revelations.\"",
      "Across the Channel, the Pietists — Spener, Francke, Bengel, Zinzendorf — kept the Christ-centered reading alive in the pulpits of post-Reformation Germany. Zinzendorf's Moravian Brethren took it to the ends of the earth.",
      "On the English side of the Atlantic, Charles Haddon Spurgeon (1834–1892) preached the Christ-centered reading to thousands every week. The line attributed to him is exactly the line: \"The marrow of theology is Christ. The Christ is the central sun of the Bible.\" His Treasury of David — seven volumes, the work of twenty years — is the great Victorian Christological commentary on the Psalms.",
      "In New England, Jonathan Edwards (1703–1758) wrote A History of the Work of Redemption, a sustained argument that the entire Bible from Genesis to Revelation is a single unfolding drama whose protagonist is Christ. Edwards was not first a preacher of revival; he was first a preacher of Christ in all the Scriptures, and the revival followed.",
    ],
  },
  {
    id: "the-moderns",
    heading: "7 · The modern flowering: biblical theology comes of age",
    body: [
      "The twentieth century saw a remarkable renewal of the Christ-centered reading under the heading of biblical theology — the disciplined attempt to trace the unfolding plot of Scripture from creation to new creation, with Christ as the climactic center.",
      "Geerhardus Vos (1862–1949), professor at Princeton, gave biblical theology its modern academic shape in his Biblical Theology (published posthumously, 1948). His students kept the discipline alive in the United States and beyond.",
      "Dietrich Bonhoeffer (1906–1945), writing The Prayerbook of the Bible from the shadow of Nazi Germany, insisted that the Psalter is the prayer Jesus Christ prayed and continues to pray in His Church. \"If we want to read and to pray the prayers of the Bible,\" he wrote, \"we must not ask first what they have to do with us, but what they have to do with Jesus Christ.\"",
      "In the second half of the century the discipline became truly global. Graeme Goldsworthy in Australia (Gospel and Kingdom, 1981), Edmund Clowney in the United States (Preaching Christ in All of Scripture, 2003), Sidney Greidanus in the Netherlands and North America (Preaching Christ from the Old Testament, 1999), Christopher J. H. Wright in the United Kingdom (Knowing Jesus through the Old Testament, 1992) — all of them have given the Church practical, pastoral, accessible help for hearing Christ in every part of His Word.",
      "On the catechetical side, the Heidelberg Catechism's first question (1563) still frames the whole project: \"What is your only comfort in life and in death?\" — \"That I am not my own, but belong with body and soul, both in life and in death, to my faithful Saviour Jesus Christ.\" That is the answer the whole Bible has been writing toward since Genesis 3.",
    ],
  },
  {
    id: "the-categories",
    heading: "8 · How Christ appears: the categories of revelation",
    body: [
      "Once you start looking, you discover that Christ does not appear in the Old Testament in only one way. The historical witnesses above name several converging modes, all of them grounded in Scripture itself.",
      "Direct prophecy — explicit predictions of the coming Messiah. Isaiah 53 names a suffering Servant who would be pierced for our transgressions. Micah 5:2 names His birthplace: Bethlehem. Zechariah 9:9 names His arrival on a donkey, and 12:10 names His piercing. Psalm 22 walks through crucifixion centuries before crucifixion existed. The Old Testament does not merely point at Christ in shadowy ways — at times it speaks His name aloud.",
      "Types and shadows — historical persons, events, and institutions that God arranged to function as foreshadowings. The Passover lamb (Exodus 12) is named by Paul as a type of Christ our Passover (1 Cor 5:7). The bronze serpent (Numbers 21) is named by Jesus Himself as a figure of His own lifting up (John 3:14). The whole sacrificial system of Leviticus is named by Hebrews as a shadow whose substance is Christ (Hebrews 10:1).",
      "Theophanies and Christophanies — appearances of the pre-incarnate Christ. Joshua meets \"the Commander of the army of the Lord\" outside Jericho and falls on his face in worship (Joshua 5:13–15). Daniel sees the fiery furnace and counts a fourth man \"like a son of the gods\" walking with Shadrach, Meshach, and Abednego (Daniel 3:25). John tells us plainly that when Isaiah saw the Lord high and lifted up, he saw the glory of the pre-incarnate Christ (John 12:41).",
      "Wisdom and personification — the Wisdom of Proverbs 8, said to be with God at creation, is taken up by Paul as the Christ \"in whom are hidden all the treasures of wisdom and knowledge\" (Colossians 2:3). The Word that opens John's Gospel is unmistakably the divine logos already present in Genesis 1.",
      "Promise and fulfillment — the great covenant promises (to Eve, to Abraham, to Moses, to David, to the prophets) accumulate across the Old Testament like a series of bonds. The New Testament announces, in verse after verse, that they have all been cashed in Christ (2 Corinthians 1:20).",
      "Recapitulation — Irenaeus's framework. Where Adam and Israel failed, Christ — the second Adam, the true Israel — succeeded. Where the Old Testament expected and could not deliver, the gospel delivers what was always expected.",
    ],
  },
  {
    id: "how-to-read",
    heading: "9 · How to use this page",
    body: [
      "What follows is a sweep through the Bible, book by book. Each entry names Christ in a single line, lists the key passages that anchor the connection (every passage is a tappable link that opens just the verse), gives a short reflection, and ends with the historical voices — Fathers, Reformers, Puritans, moderns — who have read the book that way.",
      "Six of the most-read passages in the New Testament are also presented through six emphases — six facets the Church across the centuries has heard in the same verse. We do not name parties or pit them against each other. We name what believers across time have heard, and let Christ be the center of every hearing.",
      "Read slowly. Pray as you go. The aim of every page of this page is not information about Jesus, but Jesus Himself.",
    ],
  },
];

export const studyEpigraph = {
  text: "And beginning at Moses and all the prophets, he expounded unto them in all the scriptures the things concerning himself.",
  reference: "Luke 24:27",
};
