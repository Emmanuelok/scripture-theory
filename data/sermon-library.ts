/**
 * Public-domain sermon library — pointers to the great preachers of the
 * Church, freely available online. We curate. We do not host. We point
 * readers at reputable free archives (CCEL, Spurgeon Gems, Monergism,
 * Christian Classics) where the full text is preserved.
 *
 * Every preacher named here is in the public domain. We pick a handful of
 * representative sermons per preacher — usually their most-loved or most-
 * referenced — with a one-line description so the reader knows what they
 * are clicking into.
 */

export type SermonLink = {
  title: string;
  preachedOn?: string; // text on which the sermon was preached
  year?: string;
  blurb: string;
  href: string;
};

export type SermonPreacher = {
  id: string;
  name: string;
  era: string;
  tradition: string;
  bio: string;
  archive: { label: string; href: string };
  sermons: SermonLink[];
};

export const sermonLibrary: SermonPreacher[] = [
  // ─────────── Patristic ───────────
  {
    id: "chrysostom",
    name: "St. John Chrysostom",
    era: "c. 347–407 · Antioch / Constantinople",
    tradition: "Greek Father · the \"golden-mouthed\"",
    bio:
      "Patriarch of Constantinople and the most celebrated preacher of the ancient Church. Over six hundred of his sermons survive — most as continuous expositions through whole books of the Bible.",
    archive: {
      label: "Complete works · New Advent",
      href: "https://www.newadvent.org/fathers/2401.htm",
    },
    sermons: [
      {
        title: "Homilies on the Gospel of John",
        preachedOn: "John",
        year: "c. 391",
        blurb: "Eighty-eight homilies defending the deity of Christ in every chapter.",
        href: "https://www.newadvent.org/fathers/240101.htm",
      },
      {
        title: "Homilies on Matthew",
        preachedOn: "Matthew",
        blurb: "The largest extant ancient commentary on the First Gospel.",
        href: "https://www.newadvent.org/fathers/2001.htm",
      },
      {
        title: "Homilies on Romans",
        preachedOn: "Romans",
        blurb: "Aquinas judged this the finest patristic commentary on any New Testament book.",
        href: "https://www.newadvent.org/fathers/2102.htm",
      },
    ],
  },
  {
    id: "augustine",
    name: "St. Augustine of Hippo",
    era: "354–430 · North Africa",
    tradition: "Latin Father · bishop of Hippo Regius",
    bio:
      "Converted from a wandering young life through Romans 13:13–14; spent thirty-five years preaching to his African congregation. His sermons number in the thousands.",
    archive: {
      label: "Tractates, sermons, and works · New Advent",
      href: "https://www.newadvent.org/fathers/1801.htm",
    },
    sermons: [
      {
        title: "Tractates on the Gospel of John",
        preachedOn: "John",
        blurb: "One hundred and twenty-four sermons — the great Latin Christological reading of John.",
        href: "https://www.newadvent.org/fathers/1701.htm",
      },
      {
        title: "Homilies on the First Epistle of John",
        preachedOn: "1 John",
        blurb:
          "Ten homilies on love. Source of the line \"Love, and do what you will.\"",
        href: "https://www.newadvent.org/fathers/170201.htm",
      },
      {
        title: "Expositions on the Psalms",
        preachedOn: "Psalms",
        blurb:
          "The largest patristic commentary on any biblical book — every psalm preached as the voice of Christ with His Body.",
        href: "https://www.newadvent.org/fathers/1801.htm",
      },
    ],
  },

  // ─────────── Reformation ───────────
  {
    id: "luther",
    name: "Martin Luther",
    era: "1483–1546 · Saxony",
    tradition: "Reformer · father of the German Reformation",
    bio:
      "Posted his Ninety-five Theses in Wittenberg in 1517; spent the next twenty-eight years preaching and writing the gospel of grace. Hundreds of sermons survive, most in his Postils.",
    archive: {
      label: "Sermons & works · Project Wittenberg",
      href: "https://www.projectwittenberg.org/etext/luther/",
    },
    sermons: [
      {
        title: "A Mighty Fortress Is Our God — the sermon behind the hymn",
        preachedOn: "Psalm 46",
        blurb: "Luther's exposition of the psalm that produced the Reformation's anthem.",
        href: "https://www.projectwittenberg.org/etext/luther/psalm46.txt",
      },
      {
        title: "On Christian Liberty",
        year: "1520",
        blurb:
          "The treatise that defined the gospel for the sixteenth century — and still does.",
        href: "https://www.projectwittenberg.org/pub/resources/text/wittenberg/luther/web/freedom.txt",
      },
      {
        title: "The Bondage of the Will",
        year: "1525",
        blurb: "Luther's response to Erasmus on grace and the unsaved will.",
        href: "https://www.ccel.org/ccel/luther/bondage",
      },
    ],
  },
  {
    id: "calvin",
    name: "John Calvin",
    era: "1509–1564 · Geneva",
    tradition: "Reformer · pastor of Geneva",
    bio:
      "Preached through entire books of the Bible Monday through Saturday in Geneva. Over two thousand of his sermons were transcribed by his hearers; many survive.",
    archive: {
      label: "Sermons & commentaries · CCEL",
      href: "https://www.ccel.org/ccel/calvin",
    },
    sermons: [
      {
        title: "Sermons on the Book of Job",
        preachedOn: "Job",
        year: "1554–1555",
        blurb:
          "One hundred and fifty-nine sermons. Calvin hearing Christ in Job's longing for a Mediator.",
        href: "https://www.ccel.org/ccel/calvin/calcom17",
      },
      {
        title: "Sermons on Galatians",
        preachedOn: "Galatians",
        blurb: "The gospel of justification by faith alone preached from the pulpit, week after week.",
        href: "https://www.ccel.org/ccel/calvin/calcom21",
      },
    ],
  },

  // ─────────── Wesleyan ───────────
  {
    id: "wesley",
    name: "John Wesley",
    era: "1703–1791 · England",
    tradition: "Founder of Methodism · field preacher",
    bio:
      "Rode over 250,000 miles on horseback and preached over 40,000 sermons. His Standard Sermons were the doctrinal core of the Methodist revival.",
    archive: {
      label: "Standard Sermons · Wesley Center",
      href: "https://wesley.nnu.edu/john-wesley/the-sermons-of-john-wesley-1872-edition/",
    },
    sermons: [
      {
        title: "Sermon 1 — Salvation by Faith",
        preachedOn: "Ephesians 2:8",
        year: "1738",
        blurb:
          "Wesley's founding sermon, preached at Oxford a month after his Aldersgate conversion.",
        href: "https://wesley.nnu.edu/john-wesley/the-sermons-of-john-wesley-1872-edition/sermon-1-salvation-by-faith/",
      },
      {
        title: "Sermon 16 — The Means of Grace",
        blurb:
          "Wesley on Scripture, prayer, the Lord's Supper, and the disciplines that form the soul.",
        href: "https://wesley.nnu.edu/john-wesley/the-sermons-of-john-wesley-1872-edition/sermon-16-the-means-of-grace/",
      },
      {
        title: "Sermon 39 — Catholic Spirit",
        preachedOn: "2 Kings 10:15",
        blurb:
          "On unity across difference: \"If your heart is right, as mine is with your heart, give me your hand.\"",
        href: "https://wesley.nnu.edu/john-wesley/the-sermons-of-john-wesley-1872-edition/sermon-39-catholic-spirit/",
      },
    ],
  },
  {
    id: "whitefield",
    name: "George Whitefield",
    era: "1714–1770 · Britain & America",
    tradition: "Anglican evangelist · the Great Awakening",
    bio:
      "Preached over 18,000 sermons to crowds as large as twenty thousand. Wesley's contemporary; the chief voice of the First Great Awakening on both sides of the Atlantic.",
    archive: {
      label: "Sermons · Christian Classics Ethereal Library",
      href: "https://www.ccel.org/ccel/whitefield",
    },
    sermons: [
      {
        title: "The Method of Grace",
        blurb: "Whitefield's most-reproduced sermon — the spiritual stages of true conversion.",
        href: "https://www.ccel.org/ccel/whitefield/sermons.iv.html",
      },
      {
        title: "Marks of a True Conversion",
        preachedOn: "Matthew 18:3",
        blurb: "Becoming as a little child — what conversion looks and feels like.",
        href: "https://www.ccel.org/ccel/whitefield/sermons.xviii.html",
      },
    ],
  },

  // ─────────── American awakening ───────────
  {
    id: "edwards",
    name: "Jonathan Edwards",
    era: "1703–1758 · New England",
    tradition: "Puritan / Reformed · pastor at Northampton, then Princeton",
    bio:
      "America's greatest theologian and one of its most consequential preachers. Pastored in Northampton, Massachusetts, then briefly served as president of what is now Princeton.",
    archive: {
      label: "Works of Jonathan Edwards · Yale",
      href: "https://edwards.yale.edu/research/browse",
    },
    sermons: [
      {
        title: "Sinners in the Hands of an Angry God",
        preachedOn: "Deuteronomy 32:35",
        year: "1741",
        blurb:
          "Preached at Enfield, July 8, 1741 — sparked one of the great Awakenings of American history.",
        href: "https://edwards.yale.edu/archive?path=aHR0cDovL2Vkd2FyZHMueWFsZS5lZHUvY2dpLWJpbi9uZXdwaGlsby9nZXRvYmplY3QucGw_Yy4yMjo0Ny53amVv",
      },
      {
        title: "A Divine and Supernatural Light",
        preachedOn: "Matthew 16:17",
        year: "1734",
        blurb:
          "Edwards on what regeneration actually is — a new sense of the heart, given by the Spirit.",
        href: "https://edwards.yale.edu/research/browse",
      },
      {
        title: "The Excellency of Christ",
        preachedOn: "Revelation 5:5–6",
        blurb:
          "Christ as both Lion and Lamb — a sustained meditation on the conjoined glories of the Savior.",
        href: "https://edwards.yale.edu/research/browse",
      },
    ],
  },

  // ─────────── Victorian ───────────
  {
    id: "spurgeon",
    name: "Charles Haddon Spurgeon",
    era: "1834–1892 · London",
    tradition: "Reformed Baptist · the \"Prince of Preachers\"",
    bio:
      "Pastor of the Metropolitan Tabernacle, London. Preached to crowds of 10,000+ every Sunday for nearly forty years. Over 3,500 of his sermons survive — the largest body of sermon material from any single preacher in history.",
    archive: {
      label: "All sermons · Spurgeon Gems",
      href: "https://www.spurgeongems.org/",
    },
    sermons: [
      {
        title: "Sermon 1 — The Immutability of God",
        preachedOn: "Malachi 3:6",
        year: "1855",
        blurb: "Spurgeon's first sermon at New Park Street Chapel as a nineteen-year-old.",
        href: "https://www.spurgeongems.org/sermon/chs1.pdf",
      },
      {
        title: "The Blood of the Everlasting Covenant",
        preachedOn: "Hebrews 13:20",
        blurb: "One of Spurgeon's most-reprinted sermons on the cross.",
        href: "https://www.spurgeongems.org/",
      },
      {
        title: "Compel Them to Come In",
        preachedOn: "Luke 14:23",
        year: "1858",
        blurb: "Spurgeon's most famous evangelistic appeal — converting many to Christ even in print.",
        href: "https://www.spurgeongems.org/sermon/chs227.pdf",
      },
      {
        title: "Morning and Evening (devotional)",
        blurb: "Twice-daily devotional readings — 365×2 entries, Christ on every page.",
        href: "https://www.ccel.org/ccel/spurgeon/morneve.html",
      },
    ],
  },
  {
    id: "mcheyne",
    name: "Robert Murray M'Cheyne",
    era: "1813–1843 · Dundee, Scotland",
    tradition: "Scottish Presbyterian",
    bio:
      "Pastor of St Peter's, Dundee. Died of typhus at age twenty-nine; his sermons and personal holiness shaped Scottish revival for a century.",
    archive: {
      label: "Sermons and works · Banner of Truth / CCEL",
      href: "https://www.gracegems.org/Mcheyne/index.htm",
    },
    sermons: [
      {
        title: "The Believer in the Hand of the Lord Jesus",
        preachedOn: "John 10:28",
        blurb: "On the eternal security of those Christ keeps.",
        href: "https://www.gracegems.org/Mcheyne/believer_in_the_hand.htm",
      },
      {
        title: "I Love the Lord's Day",
        blurb: "Sabbath joy from a young pastor who lived it.",
        href: "https://www.gracegems.org/Mcheyne/lords_day.htm",
      },
    ],
  },
  {
    id: "moody",
    name: "Dwight L. Moody",
    era: "1837–1899 · Chicago",
    tradition: "American evangelist · founder of Moody Bible Institute",
    bio:
      "Shoe salesman turned evangelist; preached to over a hundred million people in an era before radio. Plain, urgent, gospel-saturated.",
    archive: {
      label: "Sermons · Bible Believers",
      href: "https://www.biblebelievers.com/moody_sermons/index.html",
    },
    sermons: [
      {
        title: "Heaven",
        blurb: "Moody's portrait of the believer's hope.",
        href: "https://www.biblebelievers.com/moody_sermons/m1.html",
      },
      {
        title: "Where Art Thou?",
        preachedOn: "Genesis 3:9",
        blurb: "The first question God asked man — and the question He still asks today.",
        href: "https://www.biblebelievers.com/moody_sermons/m4.html",
      },
    ],
  },

  // ─────────── Twentieth-century turn ───────────
  {
    id: "torrey",
    name: "R. A. Torrey",
    era: "1856–1928 · United States",
    tradition: "Presbyterian / evangelistic",
    bio:
      "Moody's successor at Moody Bible Institute and later head of BIOLA. Compiled the doctrinal core of the early-twentieth-century evangelical movement.",
    archive: {
      label: "Works · CCEL",
      href: "https://www.ccel.org/ccel/torrey",
    },
    sermons: [
      {
        title: "How to Pray",
        blurb: "Torrey's classic primer on the prayer life.",
        href: "https://www.ccel.org/ccel/torrey/pray",
      },
      {
        title: "The Person and Work of the Holy Spirit",
        blurb: "A foundational text in twentieth-century pneumatology.",
        href: "https://www.ccel.org/ccel/torrey/holyspirit",
      },
    ],
  },
];

/** A small editorial note we render at the bottom of the sermon library page. */
export const sermonLibraryNote = `Every preacher listed here is in the public domain. We do not host the
texts — we point at trusted free archives (CCEL, New Advent, Yale,
Spurgeon Gems, Project Wittenberg, the Wesley Center, Grace Gems)
that have preserved them faithfully for the Church. If a link breaks
or you spot a typo, please tell us and we will fix it.`;
