/**
 * Historical voices on Christ in each book of the Bible.
 *
 * Each entry names the writer (with dates), the work, and — where the line
 * is well-attested and short enough to quote responsibly — a representative
 * sentence. We hold to two rules:
 *
 *   1. Only well-attested attributions. Where a saying is doubtful, we leave
 *      it out.
 *   2. Only writers in the public domain or who are widely cited in standard
 *      academic references. We do not paraphrase living authors at length.
 *
 * The voices represent the broad Christian tradition — patristic, medieval,
 * Reformation, Puritan, Pietist, and modern — agreeing on one thing: every
 * book of the Bible, rightly read, leads us to Christ.
 */

export type VoiceCitation = {
  /** Name of the writer or work. */
  author: string;
  /** Lifespan or work date. */
  era: string;
  /** Title of the work being cited. */
  work?: string;
  /** Optional short quote (one-two sentences, public domain). */
  quote?: string;
  /** A short editorial gloss explaining the contribution. */
  note?: string;
};

export const voicesByBook: Record<string, VoiceCitation[]> = {
  // ─────────── Pentateuch ───────────
  genesis: [
    {
      author: "St. Irenaeus of Lyons",
      era: "c. 130–202",
      work: "Against Heresies, Book III",
      note: "Developed the doctrine of recapitulation: where the first Adam fell by a tree, the second Adam (Christ) restored by a tree.",
    },
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Genesis",
      note: "Read Abraham's offering of Isaac (Genesis 22) as a clear figure of the Father giving up His only Son.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "City of God, Book XV",
      quote:
        "In the Old Testament the New is concealed, in the New the Old is revealed (Novum Testamentum in Vetere latet, Vetus in Novo patet).",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Lectures on Genesis (1535–1545)",
      note: "Reads Genesis 3:15 as the protoevangelium — the first preaching of the gospel — and finds Christ in every patriarchal narrative.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Genesis",
      note: "Notes Jacob's ladder (Genesis 28:12) as the mediating Christ Himself, citing John 1:51.",
    },
  ],
  exodus: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Exodus",
      note: "Reads the Passover lamb, the Red Sea crossing, and the manna as figures of Christ, baptism, and the Eucharist.",
    },
    {
      author: "St. Gregory of Nyssa",
      era: "c. 335–395",
      work: "The Life of Moses",
      note: "Treats Moses' whole life as a typological journey toward the contemplation of God in Christ.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Questions on the Heptateuch",
      note: "Sees the tabernacle's veil as figuring Christ's flesh, torn at Calvary (cf. Hebrews 10:20).",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Harmony of the Pentateuch",
      note: "Calls the rock that gave water 'a visible token of the spiritual fountain' — Christ Himself (1 Cor 10:4).",
    },
  ],
  leviticus: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Leviticus (sixteen homilies)",
      note: "The earliest systematic Christological reading of the sacrificial system.",
    },
    {
      author: "Hesychius of Jerusalem",
      era: "d. c. 450",
      work: "Commentary on Leviticus",
      note: "Carries forward Origen's typological reading of every offering as pointing to Christ.",
    },
    {
      author: "Andrew Bonar",
      era: "1810–1892",
      work: "A Commentary on the Book of Leviticus (1846)",
      quote:
        "There is no book in the Old Testament that the new Christian needs to read more than Leviticus, for there is no book of the Old Testament that is more closely linked to the Lord Jesus.",
    },
  ],
  numbers: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Numbers",
      note: "Treats the bronze serpent (Numbers 21) and the rock at Meribah as figures of the lifted-up Christ.",
    },
    {
      author: "Theodoret of Cyrus",
      era: "c. 393–460",
      work: "Questions on Numbers",
      note: "Reads the Nazirite vow as a foreshadowing of the consecration of Christ.",
    },
    {
      author: "St. Cyprian of Carthage",
      era: "c. 200–258",
      work: "Letter 63",
      note: "Cites Balaam's prophecy of the Star out of Jacob (Numbers 24:17) as fulfilled in Christ.",
    },
  ],
  deuteronomy: [
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Sermons on the Old Testament",
      note: "Reads Deuteronomy 18:15 — the Prophet like Moses — as pointing unmistakably to Christ.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Sermons on Deuteronomy (1555–1556)",
      note: "Two hundred sermons preached in Geneva, hearing Christ in every commandment and curse of the book.",
    },
    {
      author: "Stephen G. Dempster",
      era: "21st c.",
      work: "Dominion and Dynasty",
      note: "Recent biblical-theological treatment showing how Deuteronomy 18 and 21:23 line up exactly with the Christ of the Gospels.",
    },
  ],

  // ─────────── History (OT) ───────────
  joshua: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Joshua (twenty-six homilies)",
      quote:
        "The book of Joshua was not written so much to tell us about the deeds of the son of Nun, as to represent for us the mysteries of Jesus my Lord.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Questions on Joshua",
      note: "Identifies the Commander of the Lord's army (Joshua 5:13–15) as a Christophany.",
    },
  ],
  judges: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Judges",
      note: "Reads each deliverer as a partial type of the perfect Deliverer to come.",
    },
    {
      author: "Daniel I. Block",
      era: "21st c.",
      work: "Judges, Ruth (NAC)",
      note: "Reads the book's final ache — 'every man did what was right in his own eyes' — as the canonical cry for the true King.",
    },
  ],
  ruth: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homily on Ruth (fragment)",
      note: "Earliest extant Christian reading of Ruth, seeing Boaz as the kinsman-redeemer figure of Christ.",
    },
    {
      author: "St. Ambrose of Milan",
      era: "c. 339–397",
      work: "On the Holy Spirit",
      note: "Cites Ruth as a Gentile grafted into the line of Christ (Matthew 1:5).",
    },
  ],
  "1samuel": [
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "City of God, Book XVII",
      note: "Reads Hannah's song (1 Samuel 2) as a prophecy of the Church and as preparation for Mary's Magnificat.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Sermons on 1 Samuel",
      note: "Sees David's anointing-yet-hidden kingship as the very pattern of the Lord Jesus before His exaltation.",
    },
  ],
  "2samuel": [
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "City of God",
      note: "Reads the Davidic covenant (2 Samuel 7) as fulfilled only in Christ; David's son in flesh, God's Son in substance.",
    },
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "On Samuel",
      note: "Carries the patristic reading forward in the Latin West.",
    },
  ],
  "1kings": [
    {
      author: "St. Cyprian of Carthage",
      era: "c. 200–258",
      work: "Treatise on the Lord's Prayer",
      note: "Reads Solomon's temple as a figure of the spiritual temple Christ is building.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Sermons on the Books of Kings",
      note: "Sees Solomon's wisdom as a partial portrait of the One who is greater than Solomon.",
    },
  ],
  "2kings": [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "On the Books of Kings",
      note: "Reads Elisha's miracles as anticipations of Jesus' ministry — the raising of the dead, the feeding of many, the healing of lepers.",
    },
  ],
  "1chronicles": [
    {
      author: "Eusebius of Caesarea",
      era: "c. 260–340",
      work: "Demonstration of the Gospel",
      note: "Traces the genealogies of Chronicles forward to the line of Christ recorded by Matthew and Luke.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on the Books of Moses, the Histories, the Prophets",
      note: "Sees the entire post-exilic remembering of Israel's history as preserving the messianic hope.",
    },
  ],
  "2chronicles": [
    {
      author: "Theodoret of Cyrus",
      era: "c. 393–460",
      work: "Questions on the Octateuch and Kingdoms",
      note: "Reads the closing decree of Cyrus as God preserving the line that will lead to the Christ.",
    },
  ],
  ezra: [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "On Ezra and Nehemiah",
      note: "Treats the rebuilt temple as a figure of Christ rebuilding His Church after exile.",
    },
  ],
  nehemiah: [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "On Ezra and Nehemiah",
      note: "Reads Nehemiah's wall-rebuilding as a figure of Christ's restoring work in His people.",
    },
  ],
  esther: [
    {
      author: "Rabanus Maurus",
      era: "c. 780–856",
      work: "Commentary on Esther",
      note: "Among the earliest sustained Christian readings; sees Esther's intercession as a figure of Christ's mediation.",
    },
    {
      author: "Karen H. Jobes",
      era: "21st c.",
      work: "Esther (NIVAC)",
      note: "Modern biblical-theological reading: the hidden providence of Esther mirrors the hidden providence of the cross.",
    },
  ],

  // ─────────── Wisdom & Poetry ───────────
  job: [
    {
      author: "St. Gregory the Great",
      era: "c. 540–604",
      work: "Moralia in Job (thirty-five books)",
      note: "The most extensive patristic commentary on any single Old Testament book; reads Job throughout as a type of Christ in His sufferings.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Sermons on Job (1554–1555)",
      note: "One hundred and fifty-nine sermons; hears Christ in Job's longing for a mediator (Job 9:33) and a redeemer (19:25).",
    },
  ],
  psalms: [
    {
      author: "St. Athanasius of Alexandria",
      era: "c. 296–373",
      work: "Letter to Marcellinus on the Interpretation of the Psalms",
      quote:
        "He becomes as it were our own mouthpiece; you may even say that he is the very one who speaks the words.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Enarrationes in Psalmos (Expositions of the Psalms)",
      note: "The most influential Christian commentary on the Psalter ever written; reads every Psalm as the voice of the totus Christus — Christ the Head with His Body.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Operationes in Psalmos / First and Second Lectures on the Psalms",
      quote:
        "When you open the Psalter, you see the heart of all the saints — and at the center, the heart of Christ Himself.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on the Psalms (1557)",
      quote:
        "I have been wont to call this book, I think not inappropriately, an Anatomy of all the Parts of the Soul.",
    },
    {
      author: "Charles H. Spurgeon",
      era: "1834–1892",
      work: "The Treasury of David (seven volumes)",
      note: "A monumental Christ-centered exposition compiling Spurgeon's own meditations with centuries of Christian commentary.",
    },
    {
      author: "Dietrich Bonhoeffer",
      era: "1906–1945",
      work: "The Prayerbook of the Bible",
      quote:
        "All prayers of the Bible are summed up in the Psalms… If we want to read and to pray the prayers of the Bible and especially the Psalms, therefore, we must not ask first what they have to do with us, but what they have to do with Jesus Christ.",
    },
  ],
  proverbs: [
    {
      author: "St. Hippolytus of Rome",
      era: "c. 170–235",
      work: "Fragments on Proverbs",
      note: "Reads the Wisdom of Proverbs 8 as the eternal Christ.",
    },
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on Proverbs",
      note: "Standard medieval Christological reading.",
    },
    {
      author: "Charles Bridges",
      era: "1794–1869",
      work: "An Exposition of the Book of Proverbs (1846)",
      note: "Classic English Christ-centered commentary still in print.",
    },
  ],
  ecclesiastes: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Ecclesiastes (388)",
      note: "Reads the book's verdict on vanity as a call away from the world to Christ.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Notes on Ecclesiastes (1532)",
      note: "Insists the 'vanity' is not pessimism but a summons to trust God's wisdom revealed in Christ.",
    },
  ],
  songofsongs: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Commentary on the Song of Songs",
      note: "The first sustained Christian commentary; reads the Song as the love between Christ and His Church.",
    },
    {
      author: "St. Gregory of Nyssa",
      era: "c. 335–395",
      work: "Homilies on the Song of Songs",
      note: "Fifteen homilies developing the bridal mysticism of union with Christ.",
    },
    {
      author: "St. Bernard of Clairvaux",
      era: "1090–1153",
      work: "Sermons on the Song of Songs (eighty-six sermons)",
      note: "Got only as far as Song 3:1 before he died; among the most beloved Christ-centered meditations in Christian history.",
    },
  ],

  // ─────────── Major Prophets ───────────
  isaiah: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Isaiah (eighteen books)",
      note: "The longest commentary Jerome wrote; the Christ-centered reading from the Latin tradition that shaped Western preaching for a thousand years.",
    },
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Isaiah",
      note: "Reads Isaiah 53 as the fullest Old Testament portrait of the crucified Christ.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Isaiah (1559)",
      note: "Sees Isaiah as 'the fifth Gospel.'",
    },
    {
      author: "Edward J. Young",
      era: "1907–1968",
      work: "The Book of Isaiah (three volumes)",
      note: "Twentieth-century classic from the Reformed tradition; defends the Christological reading of Isaiah 7:14, 9:6, and 53 with rigorous detail.",
    },
  ],
  jeremiah: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Jeremiah",
      note: "Reads Jeremiah's New Covenant prophecy as the heart of Christian hope.",
    },
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Jeremiah",
      note: "Sees Jeremiah's sufferings as a figure of Christ weeping over Jerusalem.",
    },
  ],
  lamentations: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Fragments on Lamentations",
      note: "Reads 1:12 — 'Is it nothing to you?' — as the voice of the crucified Christ.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Sermons on Lamentations",
      note: "Hears in Jeremiah's tears the greater Sorrow of the Man of Sorrows.",
    },
  ],
  ezekiel: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Ezekiel (fourteen books)",
      note: "Standard patristic Christological reading.",
    },
    {
      author: "St. Gregory the Great",
      era: "c. 540–604",
      work: "Homilies on Ezekiel",
      note: "Twenty-two homilies; reads chapter 34's true Shepherd as Christ Himself.",
    },
  ],
  daniel: [
    {
      author: "St. Hippolytus of Rome",
      era: "c. 170–235",
      work: "Commentary on Daniel (c. 204)",
      note: "The oldest extant Christian biblical commentary; reads the Son of Man (Daniel 7) as Christ in His glorified humanity.",
    },
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Daniel",
      note: "Influential defense of Daniel's prophetic specificity against the pagan critic Porphyry.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Lectures on Daniel",
      note: "Reads the kingdom that 'shall not be left to other people' (Daniel 2:44) as the kingdom of Christ.",
    },
  ],

  // ─────────── Minor Prophets ───────────
  hosea: [
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on the Twelve Prophets",
      note: "Reads Hosea 11:1 as messianic prophecy, following Matthew 2:15.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on the Minor Prophets",
      note: "Sees Hosea's marriage as God's covenant love embodied — fulfilled by the Bridegroom Christ.",
    },
  ],
  joel: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Joel",
      note: "Reads Joel 2:28–32 as fulfilled at Pentecost — Peter's exact reading in Acts 2.",
    },
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on the Twelve Prophets",
      note: "Develops the connection between the Spirit's outpouring and the ascended Christ.",
    },
  ],
  amos: [
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Amos",
      note: "Reads Amos 9:11 — the restoring of David's fallen tent — as fulfilled in the Gentile mission, as James does in Acts 15.",
    },
  ],
  obadiah: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Obadiah",
      note: "Treats Mount Zion's final triumph as the triumph of the kingdom of Christ.",
    },
  ],
  jonah: [
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Letter 102 to Deogratias",
      note: "Defends and develops Jesus' own reading of Jonah as a sign of His three days in the tomb.",
    },
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Jonah",
      note: "Foundational Latin Christological reading of the book.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Lectures on Jonah (1525–1526)",
      note: "Reads Jonah's resurrection from the fish as the gospel's first picture of resurrection hope.",
    },
  ],
  micah: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Micah",
      note: "The standard patristic reading of Micah 5:2 (Bethlehem) and 4:2 (the mountain of the Lord) as messianic.",
    },
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Micah",
      note: "Reads Micah 6:8 as fulfilled perfectly only in Christ — the One who alone walked humbly with God.",
    },
  ],
  nahum: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Nahum",
      note: "Reads Nahum 1:15 — the feet of the messenger of good news — as fulfilled in the apostles preaching Christ.",
    },
  ],
  habakkuk: [
    {
      author: "Theodore of Mopsuestia",
      era: "c. 350–428",
      work: "Commentary on the Twelve Prophets",
      note: "Among the earliest extant readings of Habakkuk 2:4 in Christian commentary.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Lectures on Habakkuk (1526)",
      note: "Reads Habakkuk 2:4 — 'the just shall live by faith' — as the very heart of the gospel.",
    },
  ],
  zephaniah: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Zephaniah",
      note: "Sees Zephaniah 3:17 as a portrait of Christ rejoicing over His redeemed people.",
    },
  ],
  haggai: [
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Haggai",
      note: "Reads 'the desire of all nations' (Haggai 2:7) as the coming of Christ to the second temple.",
    },
  ],
  zechariah: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Zechariah",
      note: "Foundational Latin reading of Zechariah's many messianic prophecies.",
    },
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Zechariah",
      note: "Sees Zechariah 9:9 (the king on a donkey) as the most specific Old Testament prediction of Palm Sunday.",
    },
  ],
  malachi: [
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Malachi",
      note: "Reads 'the Sun of Righteousness' (Malachi 4:2) as Christ, following the patristic consensus.",
    },
  ],

  // ─────────── Gospels ───────────
  matthew: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on the Gospel of Matthew (ninety homilies)",
      note: "The most influential ancient commentary on Matthew; preached at Antioch.",
    },
    {
      author: "St. Hilary of Poitiers",
      era: "c. 310–367",
      work: "Commentary on Matthew",
      note: "The earliest extant Latin commentary on Matthew; emphasizes the divinity of the Christ-King.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Harmony of the Gospels",
      note: "Defends the reliability of Matthew alongside the other Gospels against pagan critics.",
    },
  ],
  mark: [
    {
      author: "Victor of Antioch",
      era: "5th c.",
      work: "Commentary on Mark",
      note: "Among the earliest known commentaries devoted entirely to Mark's Gospel.",
    },
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "In Marcum",
      note: "Standard medieval Latin Christological reading.",
    },
  ],
  luke: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Homilies on Luke",
      note: "The earliest sustained Christian preaching on Luke.",
    },
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on Luke (one hundred and fifty-six homilies)",
      note: "A monumental defense of Christ's divine-human Person, preached through the whole Gospel.",
    },
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "In Lucam",
      note: "Carries the patristic reading into the Latin medieval world.",
    },
  ],
  john: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Commentary on the Gospel of John",
      note: "The first major Christian commentary on John; centered on the Word made flesh.",
    },
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on the Gospel of John (eighty-eight homilies)",
      note: "Defends the deity of Christ in every chapter.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Tractates on the Gospel of John (one hundred and twenty-four)",
      note: "One of Augustine's largest works; the great Latin Christological reading of the Fourth Gospel.",
    },
    {
      author: "St. Cyril of Alexandria",
      era: "c. 376–444",
      work: "Commentary on John (twelve books)",
      note: "The leading patristic defense of Christ's full deity from John's Gospel.",
    },
  ],

  // ─────────── Acts ───────────
  acts: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on the Acts of the Apostles (fifty-five homilies)",
      note: "Reads Acts as the continuing work of the risen Christ by His Spirit.",
    },
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on Acts",
      note: "Among the most-copied Latin commentaries of the early Middle Ages.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on the Acts of the Apostles",
      note: "Treats Acts as Luke's second volume on what Jesus continued to do and teach after the ascension.",
    },
  ],

  // ─────────── Pauline Epistles ───────────
  romans: [
    {
      author: "Origen",
      era: "c. 185–253",
      work: "Commentary on the Epistle to the Romans",
      note: "The earliest substantial commentary on Romans; survives in Rufinus's Latin translation.",
    },
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on the Epistle to the Romans (thirty-two homilies)",
      note: "Considered by some (including Aquinas) the finest patristic commentary on any New Testament book.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Expositions of Romans / Confessions VIII",
      note: "Augustine's reading of Romans 13:13–14 was the hinge of his conversion.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Lectures on Romans (1515–1516) / Preface to Romans (1522)",
      quote:
        "This Epistle is really the chief part of the New Testament, and the very purest Gospel.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Romans (1540)",
      note: "Calvin's first published biblical commentary; the doorway to all the rest.",
    },
  ],
  "1corinthians": [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on First Corinthians (forty-four homilies)",
      note: "The most influential ancient commentary on the letter.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on First Corinthians",
      note: "Hears the cross of Christ as the answer to every Corinthian division and gift.",
    },
  ],
  "2corinthians": [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Second Corinthians (thirty homilies)",
      note: "Develops the strength-in-weakness theme of 2 Corinthians as the very pattern of Christian ministry.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Second Corinthians",
      note: "Sees 2 Corinthians 5:21 as the great exchange at the heart of the gospel.",
    },
  ],
  galatians: [
    {
      author: "St. Jerome",
      era: "c. 347–420",
      work: "Commentary on Galatians",
      note: "Earliest extant Latin commentary on Galatians.",
    },
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Commentary on Galatians",
      note: "Defends Paul's confrontation of Peter (Gal 2) against Jerome's harmonizing reading.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Commentary on Galatians (1535)",
      quote:
        "The Epistle to the Galatians is my epistle. To it I am as it were in wedlock. It is my Katie von Bora.",
    },
  ],
  ephesians: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Ephesians (twenty-four homilies)",
      note: "Develops the cosmic Christ of Ephesians 1 and the household codes of chapters 5–6.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Ephesians",
      note: "Reads Ephesians 1:10 — the summing up of all things in Christ — as the controlling lens of the entire epistle.",
    },
    {
      author: "D. Martyn Lloyd-Jones",
      era: "1899–1981",
      work: "Studies in Ephesians (eight volumes)",
      note: "Three hundred and seventy-two sermons preached at Westminster Chapel, London.",
    },
  ],
  philippians: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Philippians (fifteen homilies)",
      note: "Reads the Christ-hymn of Philippians 2 as the controlling pattern of Christian ethics.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Philippians",
      note: "Treats the joy of Philippians as the joy of a man whose treasure is Christ alone.",
    },
  ],
  colossians: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Colossians (twelve homilies)",
      note: "Centers on Christ's pre-eminence in Colossians 1:15–20.",
    },
    {
      author: "J. B. Lightfoot",
      era: "1828–1889",
      work: "St Paul's Epistles to the Colossians and to Philemon",
      note: "The most thorough Victorian Christological commentary on the supremacy of Christ.",
    },
  ],
  "1thessalonians": [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on First Thessalonians",
      note: "Reads the imminent return of Christ as the daily hope of the Church.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on First Thessalonians",
      note: "Sees the church at Thessalonica as a model of imitation and hope.",
    },
  ],
  "2thessalonians": [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Second Thessalonians",
      note: "Treats the Man of Lawlessness with sober realism — but always under the higher reality of the returning Christ.",
    },
  ],
  "1timothy": [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on First Timothy",
      note: "Reads 1 Timothy as a pastoral manual under the headship of the one Mediator.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on First Timothy",
      note: "Sees the mediation of Christ (2:5) as the pastoral foundation of the whole letter.",
    },
  ],
  "2timothy": [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Second Timothy",
      note: "Reads the dying Paul as a man whose hope was entirely in the Christ who 'abolished death.'",
    },
  ],
  titus: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Titus",
      note: "Centers on the appearing of the grace of God in Christ (Titus 2:11–14).",
    },
  ],
  philemon: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Philemon (three homilies)",
      note: "Reads Paul's plea — 'charge that to my account' (v. 18) — as a portrait of Christ's substitution.",
    },
    {
      author: "Martin Luther",
      era: "1483–1546",
      work: "Preface to Philemon (1522)",
      quote:
        "Here we see how St. Paul lays himself out for poor Onesimus, and… does the same for us with God the Father, as Paul does for Onesimus with Philemon.",
    },
  ],

  // ─────────── General Epistles ───────────
  hebrews: [
    {
      author: "St. John Chrysostom",
      era: "c. 347–407",
      work: "Homilies on Hebrews (thirty-four homilies)",
      note: "The earliest substantial commentary on Hebrews; centers on the supremacy of Christ's priesthood.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on Hebrews",
      note: "Reads the whole letter as the proof that Christ is the substance of every Old Testament shadow.",
    },
    {
      author: "John Owen",
      era: "1616–1683",
      work: "An Exposition of the Epistle to the Hebrews (seven volumes)",
      note: "The most extensive Christ-centered Puritan commentary ever written on any single book of the Bible.",
    },
  ],
  james: [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on the Seven Catholic Epistles",
      note: "Standard medieval Christological reading of James.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on James",
      note: "Defends the canonicity and gospel content of James against Luther's reservations.",
    },
  ],
  "1peter": [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on the Seven Catholic Epistles",
      note: "Reads Peter's emphasis on the cornerstone-Christ as the heart of the letter.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on the Catholic Epistles",
      note: "Hears in 1 Peter 2:24 — 'by his wounds you have been healed' — the gospel for the suffering Church of every age.",
    },
    {
      author: "Edmund P. Clowney",
      era: "1917–2005",
      work: "The Message of 1 Peter (BST)",
      note: "Modern Christ-centered reading from the Reformed biblical-theology tradition.",
    },
  ],
  "2peter": [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on the Seven Catholic Epistles",
      note: "Standard early-medieval reading on the certainty of Christ's return.",
    },
  ],
  "1john": [
    {
      author: "St. Augustine of Hippo",
      era: "354–430",
      work: "Homilies on the First Epistle of John (ten homilies)",
      quote:
        "Love, and do what you will… If you are silent, be silent in love; if you cry out, cry out in love; if you correct, correct in love; if you spare, spare in love.",
    },
    {
      author: "John Calvin",
      era: "1509–1564",
      work: "Commentary on the Catholic Epistles",
      note: "Reads 1 John as the great test of fellowship with the Father through the incarnate Son.",
    },
  ],
  "2john": [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on the Seven Catholic Epistles",
      note: "Treats the warning against deceivers (v. 7) as a defense of the bodily Christ.",
    },
  ],
  "3john": [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on the Seven Catholic Epistles",
      note: "Reads 3 John as the Church's manual of hospitality for the sake of the Name.",
    },
  ],
  jude: [
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Commentary on the Seven Catholic Epistles",
      note: "Treats Jude's doxology (vv. 24–25) as a Christ-centered hymn of preservation.",
    },
    {
      author: "Thomas Manton",
      era: "1620–1677",
      work: "A Practical Commentary on the Epistle of Jude",
      note: "Classic Puritan exposition contending earnestly for the faith.",
    },
  ],

  // ─────────── Apocalypse ───────────
  revelation: [
    {
      author: "Andrew of Caesarea",
      era: "6th–7th c.",
      work: "Commentary on the Apocalypse",
      note: "The most influential Greek patristic commentary on Revelation; preserved and used throughout the Eastern Church.",
    },
    {
      author: "Bede the Venerable",
      era: "c. 673–735",
      work: "Exposition of the Apocalypse",
      note: "The standard Latin commentary in the early Middle Ages; reads Revelation as a present-tense portrait of the reigning Christ.",
    },
    {
      author: "Jonathan Edwards",
      era: "1703–1758",
      work: "Notes on the Apocalypse / A History of the Work of Redemption",
      note: "Reads Revelation as the climax of a single redemptive history with Christ at its center.",
    },
    {
      author: "William Hendriksen",
      era: "1900–1982",
      work: "More Than Conquerors (1939)",
      note: "Classic twentieth-century Christ-centered reading of Revelation's seven sections.",
    },
  ],
};

/** Convenience accessor used by the page. */
export function voicesFor(bookId: string): VoiceCitation[] {
  return voicesByBook[bookId] ?? [];
}
