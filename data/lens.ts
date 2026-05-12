export type TraditionId =
  | "orthodox"
  | "catholic"
  | "reformed"
  | "wesleyan"
  | "pentecostal"
  | "anabaptist";

export type TraditionReading = {
  tradition: TraditionId;
  label: string;
  emphasis: string;
  reading: string;
  voices: string[];
};

export type Passage = {
  reference: string;
  translation: string;
  text: string;
  context: string;
  literal: string;
  christCentered: string;
  readings: TraditionReading[];
  agreement: string;
  disagreement: string;
  formation: string[];
};

export const traditions: Record<TraditionId, { label: string; color: string }> = {
  orthodox: { label: "Eastern Orthodox", color: "bg-amber-100 text-amber-900" },
  catholic: { label: "Roman Catholic", color: "bg-yellow-100 text-yellow-900" },
  reformed: { label: "Reformed", color: "bg-sky-100 text-sky-900" },
  wesleyan: { label: "Wesleyan / Methodist", color: "bg-rose-100 text-rose-900" },
  pentecostal: { label: "Pentecostal / Charismatic", color: "bg-orange-100 text-orange-900" },
  anabaptist: { label: "Anabaptist", color: "bg-emerald-100 text-emerald-900" },
};

export const passages: Passage[] = [
  {
    reference: "John 3:16",
    translation: "ESV",
    text:
      "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    context:
      "Jesus is speaking at night to Nicodemus, a Pharisee and ruler of the Jews, after explaining the new birth (John 3:1–15).",
    literal:
      "The Greek 'houtōs ... ēgapēsen' is best read as 'in this way God loved the world' — emphasizing the manner of the love (the giving of the Son) more than the intensity.",
    christCentered:
      "The Father's love is named, defined, and given a face: the giving of the Son for the salvation of the world.",
    readings: [
      {
        tradition: "orthodox",
        label: "Eastern Orthodox",
        emphasis: "Theosis through union with the Incarnate Son",
        reading:
          "Eternal life is participation in the divine life — life with the Triune God, made possible because the Son took on flesh and reopened humanity to communion with the Father.",
        voices: ["St. John Chrysostom, Homilies on John 27", "St. Athanasius, On the Incarnation"],
      },
      {
        tradition: "catholic",
        label: "Roman Catholic",
        emphasis: "Universal salvific will of God",
        reading:
          "God genuinely wills the salvation of every person; the Son is given for the world. Faith is the door, but the gift is offered to all without exception.",
        voices: ["St. Augustine, Tractates on John 12", "Catechism of the Catholic Church §458"],
      },
      {
        tradition: "reformed",
        label: "Reformed",
        emphasis: "Definite love issuing in saving faith",
        reading:
          "The love of God is shown supremely in the giving of the Son, and that love effectually secures eternal life for all who believe — faith itself being God's gift.",
        voices: ["John Calvin, Commentary on John 3", "D. A. Carson, The Difficult Doctrine of the Love of God"],
      },
      {
        tradition: "wesleyan",
        label: "Wesleyan / Methodist",
        emphasis: "Prevenient grace; genuine 'whosoever'",
        reading:
          "God's love is for the whole world. Grace goes before every person, enabling a real response. 'Whoever believes' means whoever — no one is excluded by decree.",
        voices: ["John Wesley, Notes on the New Testament — John 3", "Thomas Oden, Classic Christianity"],
      },
      {
        tradition: "pentecostal",
        label: "Pentecostal / Charismatic",
        emphasis: "Personal encounter and new birth by the Spirit",
        reading:
          "John 3:16 must be read with John 3:5–8: the love that gives the Son is the love that births us anew by the Spirit — a real, experiential reality, not a legal fiction.",
        voices: ["Gordon Fee, Paul, the Spirit, and the People of God", "Amos Yong, Renewing Christian Theology"],
      },
      {
        tradition: "anabaptist",
        label: "Anabaptist",
        emphasis: "A love that costs and a discipleship that follows",
        reading:
          "The Father's love is cruciform — He gives. Belief in Him is therefore inseparable from a life that follows the way of the Lamb, even into suffering for the world.",
        voices: ["Menno Simons, Foundation of Christian Doctrine", "John Howard Yoder, The Politics of Jesus"],
      },
    ],
    agreement:
      "All six streams confess: the love of the Father, the gift of the Son, the offer of eternal life, and the necessity of faith.",
    disagreement:
      "Streams differ on the scope of the divine intent ('world'), the relation of grace to free response, and the relation of belief to ongoing discipleship.",
    formation: [
      "Sit with John 3:14–18 for 10 minutes; notice every verb God does and every verb you do.",
      "Tell one person today, in your own words, what the Father has done in giving the Son.",
      "Ask your local pastor what 'eternal life' means in your church's confession.",
    ],
  },
  {
    reference: "Romans 8:28",
    translation: "ESV",
    text:
      "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
    context:
      "Paul writes to a suffering Roman church, having just spoken of the Spirit's intercession in our weakness (Rom. 8:26–27).",
    literal:
      "Manuscripts vary: 'all things work together for good' (KJV/ESV) or 'God works all things together for good' (NA28). Either way, the agency is God's.",
    christCentered:
      "The good toward which all things move is named in v. 29: conformity to the image of the Son. The destination of providence is Christlikeness.",
    readings: [
      {
        tradition: "orthodox",
        label: "Eastern Orthodox",
        emphasis: "Providence within synergy",
        reading:
          "God works all things in cooperation with His saints; the 'good' is union with God. Suffering is not erased but transfigured through participation in the cross of Christ.",
        voices: ["St. John of Damascus, Exact Exposition of the Orthodox Faith II.29"],
      },
      {
        tradition: "catholic",
        label: "Roman Catholic",
        emphasis: "Providence ordering all to beatitude",
        reading:
          "Divine providence orders even evil to a greater good. The 'good' is ultimately the beatific vision — friendship with God — toward which the called are drawn.",
        voices: ["Thomas Aquinas, Summa Theologiae I.22"],
      },
      {
        tradition: "reformed",
        label: "Reformed",
        emphasis: "Sovereign providence; the golden chain",
        reading:
          "Verses 28–30 form a golden chain — foreknowledge, predestination, calling, justification, glorification — guaranteeing that nothing is wasted in the lives of the called.",
        voices: ["John Murray, Epistle to the Romans", "Heidelberg Catechism Q.1"],
      },
      {
        tradition: "wesleyan",
        label: "Wesleyan / Methodist",
        emphasis: "Providence engaging real human love",
        reading:
          "The promise is addressed to those who love God — a real, responsive love that God Himself enables. Providence works with us, never coercively, toward holiness.",
        voices: ["John Wesley, Sermon 'On Divine Providence'"],
      },
      {
        tradition: "pentecostal",
        label: "Pentecostal / Charismatic",
        emphasis: "The Spirit groaning through suffering toward glory",
        reading:
          "Read with vv. 26–27: the Spirit intercedes through our weakness. The 'good' is glory revealed (v. 18), and the Spirit is the down-payment of that good even now.",
        voices: ["Gordon Fee, God's Empowering Presence"],
      },
      {
        tradition: "anabaptist",
        label: "Anabaptist",
        emphasis: "Cross-shaped providence in the suffering church",
        reading:
          "The 'good' is conformity to the crucified Christ (v. 29). Providence is read from the underside — by a church that suffers with its Lord and refuses the sword.",
        voices: ["John Howard Yoder, The Politics of Jesus"],
      },
    ],
    agreement:
      "All streams confess that God is sovereign over suffering and that the destination of His work is conformity to Christ.",
    disagreement:
      "Streams differ on the relation between God's sovereignty and human freedom in how 'all things' are worked together.",
    formation: [
      "Name one current 'all thing' — a hard situation. Ask: how is the Father using this to form Christ in me?",
      "Pray Romans 8:26–30 aloud, slowly, this week.",
      "Carry someone else's hard 'all thing' with them today (Gal. 6:2).",
    ],
  },
  {
    reference: "Matthew 28:18–20",
    translation: "ESV",
    text:
      "All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you. And behold, I am with you always, to the end of the age.",
    context:
      "The risen Jesus speaks on a mountain in Galilee to the Eleven. This is the climactic command of Matthew's Gospel.",
    literal:
      "The main verb is 'make disciples' (mathēteusate). 'Going,' 'baptizing,' and 'teaching' are participles describing how disciples are made.",
    christCentered:
      "Jesus claims universal authority — Daniel 7 language — and sends His Church on the basis of His own enthronement and abiding presence.",
    readings: [
      {
        tradition: "orthodox",
        label: "Eastern Orthodox",
        emphasis: "Mission as participation in the life of the Trinity",
        reading:
          "Baptism into the Triune name is initiation into divine communion. Mission flows from the Church's life of worship and the Eucharist — we go because we have first been gathered.",
        voices: ["Alexander Schmemann, For the Life of the World"],
      },
      {
        tradition: "catholic",
        label: "Roman Catholic",
        emphasis: "The Church as universal sacrament of salvation",
        reading:
          "The risen Christ commissions His Church to gather every nation through Word and sacrament. Mission, catechesis, and sacramental life are one continuous act.",
        voices: ["Vatican II, Ad Gentes 1–7"],
      },
      {
        tradition: "reformed",
        label: "Reformed",
        emphasis: "Christ's reign and Word-centered mission",
        reading:
          "Because all authority belongs to Christ, the Word is preached to all nations, and disciples are taught everything He commanded. Mission is a function of His kingship.",
        voices: ["Herman Bavinck, Reformed Dogmatics IV"],
      },
      {
        tradition: "wesleyan",
        label: "Wesleyan / Methodist",
        emphasis: "Holiness across the whole earth",
        reading:
          "The Great Commission is the spread of scriptural holiness across the lands. 'Teaching to observe all' makes formation in love and holiness inseparable from mission.",
        voices: ["John Wesley, 'The General Spread of the Gospel'"],
      },
      {
        tradition: "pentecostal",
        label: "Pentecostal / Charismatic",
        emphasis: "Mission empowered by the Spirit",
        reading:
          "Read with Acts 1:8: the same risen Lord who commissions also pours out the Spirit so the disciples can actually do it. Mission without power is impossible; with the Spirit, unstoppable.",
        voices: ["Roland Allen, Missionary Methods", "Amos Yong, The Missiological Spirit"],
      },
      {
        tradition: "anabaptist",
        label: "Anabaptist",
        emphasis: "Discipleship as the heart of mission",
        reading:
          "The command is to make disciples — not just converts. Baptism marks a new community that obeys 'everything I have commanded,' including enemy-love and economic sharing.",
        voices: ["Harold Bender, The Anabaptist Vision"],
      },
    ],
    agreement:
      "All six streams agree: the risen Christ has total authority, every nation is in view, and the goal is obedient, baptized disciples — not isolated decisions.",
    disagreement:
      "Streams differ on the relationship between mission, sacrament, holiness, Spirit-empowerment, and the local community.",
    formation: [
      "Name one person you can disciple in the next 90 days, not just witness to.",
      "Ask your church how it 'teaches them to observe all that I have commanded.' Where is the gap?",
      "Pray Acts 1:8 over the place you live.",
    ],
  },
  {
    reference: "Matthew 5:3–10",
    translation: "ESV",
    text:
      "Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are those who mourn, for they shall be comforted. Blessed are the meek, for they shall inherit the earth. Blessed are those who hunger and thirst for righteousness, for they shall be satisfied. Blessed are the merciful, for they shall receive mercy. Blessed are the pure in heart, for they shall see God. Blessed are the peacemakers, for they shall be called sons of God. Blessed are those who are persecuted for righteousness' sake, for theirs is the kingdom of heaven.",
    context:
      "The Beatitudes open Jesus' Sermon on the Mount (Matt. 5–7). The crowds are listening; the disciples are forming.",
    literal:
      "'Blessed' (makarios) describes a settled state of God-given flourishing — not a sentimental 'happy' nor a future-only reward.",
    christCentered:
      "Jesus is the Blessed One who first lived every Beatitude — poor, mourning, meek, hungry for righteousness, merciful, pure, peacemaking, persecuted. He calls disciples into His own way of being.",
    readings: [
      {
        tradition: "orthodox",
        label: "Eastern Orthodox",
        emphasis: "The ladder of ascent into the Kingdom",
        reading:
          "The Beatitudes form a staircase of spiritual growth — from poverty of spirit into purity of heart and the vision of God. They describe the life of the saints.",
        voices: ["St. Gregory of Nyssa, Homilies on the Beatitudes"],
      },
      {
        tradition: "catholic",
        label: "Roman Catholic",
        emphasis: "Charter of Christian life and the gifts of the Spirit",
        reading:
          "The Beatitudes are the heart of Jesus' preaching, the portrait of His own face, and the path of the Christian life — closely tied to the gifts of the Holy Spirit.",
        voices: ["Catechism of the Catholic Church §§1716–1729"],
      },
      {
        tradition: "reformed",
        label: "Reformed",
        emphasis: "Marks of the genuinely regenerate",
        reading:
          "The Beatitudes describe what God works in those whom He has made new. They are not entry requirements but evidences of grace already at work.",
        voices: ["Martyn Lloyd-Jones, Studies in the Sermon on the Mount"],
      },
      {
        tradition: "wesleyan",
        label: "Wesleyan / Methodist",
        emphasis: "The shape of holiness of heart and life",
        reading:
          "These are the lineaments of perfect love. Sanctifying grace produces this character — measurably, observably, in real people.",
        voices: ["John Wesley, Sermons on the Sermon on the Mount I–IV"],
      },
      {
        tradition: "pentecostal",
        label: "Pentecostal / Charismatic",
        emphasis: "Kingdom life empowered by the Spirit",
        reading:
          "The Beatitudes are Kingdom life now — and life in the Spirit makes them livable, not merely admirable. Power and character go together.",
        voices: ["Simon Chan, Spiritual Theology"],
      },
      {
        tradition: "anabaptist",
        label: "Anabaptist",
        emphasis: "The literal way of Jesus",
        reading:
          "The Sermon on the Mount is to be obeyed, not admired. Peacemaking and meekness are not metaphors — they are how the Church visibly differs from the powers.",
        voices: ["John Howard Yoder, The Politics of Jesus"],
      },
    ],
    agreement:
      "All streams confess the Beatitudes as the portrait of Jesus and the shape of life in His Kingdom.",
    disagreement:
      "Streams differ on the relation between the Beatitudes and entrance to the Kingdom (gift, gift evidenced, or path).",
    formation: [
      "Pick one Beatitude this week. Ask the Spirit to form it in you. Tell one friend you're doing this.",
      "Find one person who embodies that Beatitude. Spend an hour with them.",
      "Re-read Matthew 5–7 in one sitting before next Sunday.",
    ],
  },
  {
    reference: "Acts 2:42–47",
    translation: "ESV",
    text:
      "And they devoted themselves to the apostles' teaching and the fellowship, to the breaking of bread and the prayers. And awe came upon every soul, and many wonders and signs were being done through the apostles. And all who believed were together and had all things in common. And they were selling their possessions and belongings and distributing the proceeds to all, as any had need. And day by day, attending the temple together and breaking bread in their homes, they received their food with glad and generous hearts, praising God and having favor with all the people. And the Lord was adding to their number day by day those who were being saved.",
    context:
      "Immediately after Peter's Pentecost sermon and the first 3,000 baptisms. The first portrait of the Spirit-formed church.",
    literal:
      "Four marks are named: teaching, fellowship (koinōnia), breaking of bread, and the prayers. Generosity and growth follow these four.",
    christCentered:
      "The risen and ascended Jesus is now pouring out His Spirit (Acts 2:33). The Church is His ongoing body, doing His works, by His Spirit.",
    readings: [
      {
        tradition: "orthodox",
        label: "Eastern Orthodox",
        emphasis: "The Eucharistic community",
        reading:
          "The 'breaking of bread' is the Eucharist. The Church is constituted as it gathers around the apostles' teaching and the cup — a single liturgical and missional reality.",
        voices: ["Alexander Schmemann, The Eucharist"],
      },
      {
        tradition: "catholic",
        label: "Roman Catholic",
        emphasis: "The four marks of authentic ecclesial life",
        reading:
          "Teaching, communion, sacrament, prayer — the four pillars hold the Church through every age. Generosity and growth are their fruit.",
        voices: ["Catechism of the Catholic Church §§2624–2625"],
      },
      {
        tradition: "reformed",
        label: "Reformed",
        emphasis: "Marks of the true Church",
        reading:
          "The apostolic Word rightly taught, the sacraments rightly administered, and ordered fellowship — these are how we recognize the Church, then and now.",
        voices: ["Belgic Confession Art. 29"],
      },
      {
        tradition: "wesleyan",
        label: "Wesleyan / Methodist",
        emphasis: "Means of grace and shared life",
        reading:
          "Acts 2 names the ordinary means of grace — preaching, the Lord's Supper, prayer, Christian conference. The Methodist class meeting was built on this.",
        voices: ["John Wesley, 'The Means of Grace'"],
      },
      {
        tradition: "pentecostal",
        label: "Pentecostal / Charismatic",
        emphasis: "Signs, wonders, and Spirit-formed community",
        reading:
          "Signs and wonders are normal — and so is radical generosity. The Spirit who gave Pentecost still constitutes the Church as a witnessing, miraculous community.",
        voices: ["Frank Macchia, Baptized in the Spirit"],
      },
      {
        tradition: "anabaptist",
        label: "Anabaptist",
        emphasis: "Visible community of goods and peace",
        reading:
          "'All things in common' is not poetic. The Spirit creates a real, visible alternative economy — a community whose money, time, and homes are shared.",
        voices: ["The Schleitheim Confession (1527)"],
      },
    ],
    agreement:
      "Every stream sees Acts 2:42–47 as a normative portrait of what the Spirit produces — teaching, fellowship, table, prayer, generosity, mission.",
    disagreement:
      "Streams differ on the nature of the breaking of bread, the role of signs and wonders, and how literally to apply the community of goods.",
    formation: [
      "Map your week against the four marks: where is teaching, fellowship, table, prayer?",
      "Identify one possession the Spirit may be asking you to share.",
      "Invite one new person to a meal in your home this month.",
    ],
  },
  {
    reference: "John 17:20–23",
    translation: "ESV",
    text:
      "I do not ask for these only, but also for those who will believe in me through their word, that they may all be one, just as you, Father, are in me, and I in you, that they also may be in us, so that the world may believe that you have sent me. The glory that you have given me I have given to them, that they may be one even as we are one, I in them and you in me, that they may become perfectly one, so that the world may believe that you have sent me and loved them even as you loved me.",
    context:
      "Jesus' high-priestly prayer the night before His crucifixion. His final recorded prayer for His Church.",
    literal:
      "Unity here is modeled on the Father–Son relationship and tied directly to the world's believing — mission and unity are inseparable.",
    christCentered:
      "Christ Himself prays for our oneness. Our unity is not a strategy we invent; it is an answer to His prayer.",
    readings: [
      {
        tradition: "orthodox",
        label: "Eastern Orthodox",
        emphasis: "Unity grounded in the Triune communion",
        reading:
          "The unity Christ prays for is participation in the very communion of the Trinity — a unity of love, given by the Spirit, expressed in the one Eucharist.",
        voices: ["John Zizioulas, Being as Communion"],
      },
      {
        tradition: "catholic",
        label: "Roman Catholic",
        emphasis: "Visible unity as a sacrament to the world",
        reading:
          "The Church's visible unity is itself a sign and instrument of salvation. Ecumenism is therefore a permanent duty, not an optional extra.",
        voices: ["Vatican II, Unitatis Redintegratio"],
      },
      {
        tradition: "reformed",
        label: "Reformed",
        emphasis: "Unity in the truth of the gospel",
        reading:
          "True unity is unity in the apostolic Word. We pursue it without compromising what the gospel reveals, because real unity rests on real truth.",
        voices: ["John Calvin, Institutes IV.1"],
      },
      {
        tradition: "wesleyan",
        label: "Wesleyan / Methodist",
        emphasis: "Catholic spirit; unity in love",
        reading:
          "'Though we cannot think alike, may we not love alike?' Where the heart is right with God and neighbor, give me your hand. Unity is love, not uniformity.",
        voices: ["John Wesley, 'Catholic Spirit'"],
      },
      {
        tradition: "pentecostal",
        label: "Pentecostal / Charismatic",
        emphasis: "Unity by the one Spirit",
        reading:
          "The same Spirit who fell at Pentecost still constitutes one body. Spirit-empowered renewal has, across the world, repeatedly broken down the dividing walls.",
        voices: ["Cecil M. Robeck Jr., The Azusa Street Mission and Revival"],
      },
      {
        tradition: "anabaptist",
        label: "Anabaptist",
        emphasis: "Unity expressed in the way of peace",
        reading:
          "A divided, violent church cannot witness to a reconciling Christ. Unity is forged at the table, in shared bread and refused weapons.",
        voices: ["Stuart Murray, The Naked Anabaptist"],
      },
    ],
    agreement:
      "All streams confess: Christ Himself prays for our oneness, and our unity is essential to the world's belief.",
    disagreement:
      "Streams differ on the visible form of unity (institutional, confessional, charismatic, communal) and how to pursue it without compromising truth.",
    formation: [
      "Pray John 17:20–23 over a Christian from a different tradition this week.",
      "Sit through one service in a tradition not your own. Receive what is true and good.",
      "Confess one prejudice you have carried about another part of the Body.",
    ],
  },
];

export function findPassage(query: string): Passage | null {
  if (!query) return null;
  const normalized = query.toLowerCase().replace(/\s+/g, "").replace(/\./g, ":");
  for (const p of passages) {
    const ref = p.reference.toLowerCase().replace(/\s+/g, "");
    if (ref.includes(normalized) || normalized.includes(ref.split(":")[0])) return p;
  }
  return null;
}
