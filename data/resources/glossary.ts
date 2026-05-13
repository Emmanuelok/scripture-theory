// Brief, plain-language definitions of key theological terms.
// Written to be accurate enough for a pastor to nod at and short enough for a
// 14-year-old to read.

export type Term = {
  slug: string;
  word: string;
  short: string; // one-sentence answer
  long: string; // 2–4 sentence expansion
  refs?: string[]; // anchor verses
};

export const GLOSSARY: Term[] = [
  { slug: "atonement", word: "Atonement",
    short: "The work of Christ on the cross that reconciles sinners to God.",
    long: "Atonement means 'at-one-ment' — to make at one. In Scripture, atonement is the way God, in Christ, took the punishment our sin deserved so that we could be brought near. The cross is the center of atonement; the empty tomb is its vindication.",
    refs: ["Romans 3:25", "1 John 2:2"] },

  { slug: "baptism", word: "Baptism",
    short: "The public sign of union with Christ in His death and resurrection.",
    long: "Christ commanded His disciples to baptize in the name of the Father, Son, and Holy Spirit. Christians across traditions differ on the mode (immersion or pouring) and the timing (infant or believer), but agree that baptism marks entry into the visible Church and union with Jesus.",
    refs: ["Matthew 28:19", "Romans 6:3–4"] },

  { slug: "canon", word: "Canon",
    short: "The list of books recognized by the Church as the Spirit-breathed Scripture.",
    long: "The Christian canon is 66 books (39 Old Testament + 27 New Testament) in Protestant Bibles; Catholic and Orthodox Bibles include additional deuterocanonical books. The Church did not create the canon — it recognized the books God had given.",
    refs: ["2 Timothy 3:16"] },

  { slug: "christ", word: "Christ / Messiah",
    short: "The Anointed One promised throughout the Old Testament — Jesus of Nazareth.",
    long: "'Christ' is Greek for 'Messiah' (Hebrew Mashiach), meaning 'Anointed One.' Israel waited for the Messiah-King who would deliver God's people. Jesus of Nazareth is that promised one — Prophet, Priest, and King.",
    refs: ["John 1:41", "Luke 24:27"] },

  { slug: "church", word: "Church (ekklēsia)",
    short: "The called-out people of God — both local congregations and the universal Body of Christ.",
    long: "The Greek ekklēsia means 'assembly' — those called out. Locally, it is the believers who gather in one place to worship and obey Jesus. Universally, it is every believer in every age and place, joined to Christ.",
    refs: ["Matthew 16:18", "Ephesians 1:22–23"] },

  { slug: "conversion", word: "Conversion",
    short: "Turning from sin to Christ in faith and repentance.",
    long: "Conversion involves both turning from (repentance) and turning to (faith in Christ). It is a one-time decisive turning and the beginning of a lifelong walk of repentance and faith.",
    refs: ["Acts 3:19", "1 Thessalonians 1:9"] },

  { slug: "covenant", word: "Covenant",
    short: "A binding relationship initiated by God with His people.",
    long: "Throughout Scripture God enters covenants — with Noah, Abraham, Israel at Sinai, David, and finally the new covenant in Christ's blood. The Bible's story is one unfolding covenant relationship reaching its fulfillment in Jesus.",
    refs: ["Jeremiah 31:31–34", "Luke 22:20"] },

  { slug: "discipleship", word: "Discipleship",
    short: "Becoming the kind of person Jesus was, and doing what He did.",
    long: "A disciple (mathētēs) is a learner — but learning here means whole-life apprenticeship to Jesus. Discipleship is not extra; it is the basic Christian shape. Disciples make disciples (Matthew 28:19).",
    refs: ["Luke 9:23", "2 Timothy 2:2"] },

  { slug: "eschatology", word: "Eschatology",
    short: "The doctrine of last things — Christ's return, the resurrection, judgment, and the new creation.",
    long: "Eschatology asks: how does the story end? Christians confess that Christ will return bodily, the dead will be raised, all will be judged, and the heavens and earth will be renewed (Revelation 21).",
    refs: ["Acts 1:11", "Revelation 21:1–4"] },

  { slug: "lords-supper", word: "Lord's Supper / Eucharist / Communion",
    short: "The meal Christ instituted in which believers remember and proclaim His death until He comes.",
    long: "On the night He was betrayed Jesus took bread and wine and said, 'This is my body… this is my blood.' Christians differ in their understanding of how Christ is present, but agree the meal is central to the Church's life.",
    refs: ["1 Corinthians 11:23–26"] },

  { slug: "faith", word: "Faith",
    short: "Trust in Christ for everything He promises in the Gospel.",
    long: "Faith is not a vague hope; it is trust, grounded in evidence, that Christ is who He says He is. Saving faith both believes and clings — head, heart, and life.",
    refs: ["Hebrews 11:1", "Romans 10:17"] },

  { slug: "fall", word: "The Fall",
    short: "Humanity's original turning away from God in Genesis 3 and its consequences.",
    long: "When Adam and Eve disobeyed, sin entered the world and death through sin. The Fall did not destroy God's image in us; it disordered it. All people since are born east of Eden, longing to come home.",
    refs: ["Genesis 3", "Romans 5:12"] },

  { slug: "glory", word: "Glory",
    short: "The weighty beauty of God — His radiant presence and worth.",
    long: "God's glory is the visible expression of His invisible perfections. Christ is 'the radiance of God's glory' (Heb 1:3). Our destiny is to be transformed into His likeness, 'from glory to glory' (2 Cor 3:18).",
    refs: ["Exodus 33:18–19", "John 1:14"] },

  { slug: "gospel", word: "Gospel",
    short: "The good news that Jesus is Lord — He died for our sins, was buried, was raised, and reigns.",
    long: "The Gospel is the announcement of what God has done in Christ. Paul summarizes it in 1 Cor 15:3–8: Christ died for our sins, was buried, rose on the third day, and was seen. Believing this is salvation.",
    refs: ["1 Corinthians 15:3–8", "Romans 1:16"] },

  { slug: "grace", word: "Grace",
    short: "God's unmerited favor — His free gift in Christ.",
    long: "Grace is God doing for us what we could not do for ourselves and giving us what we could never earn. Salvation is by grace, through faith, in Christ alone.",
    refs: ["Ephesians 2:8–9", "Titus 2:11"] },

  { slug: "heaven", word: "Heaven",
    short: "Where God's will is done freely and joyfully — and one day, the renewed earth too.",
    long: "Heaven is the realm of God's unhindered reign. Christian hope is not 'escape to heaven' but the union of heaven and earth in the new creation when Christ returns.",
    refs: ["Matthew 6:10", "Revelation 21:2–3"] },

  { slug: "hell", word: "Hell",
    short: "Final, just separation from God for those who reject Christ.",
    long: "Hell is real and serious. Scripture pictures it as fire, darkness, and the absence of God. Christ Himself spoke of it more than anyone else — precisely so we would be saved from it.",
    refs: ["Matthew 25:46", "Revelation 20:14–15"] },

  { slug: "holy", word: "Holy / Holiness",
    short: "Set apart for God — pure, distinct, devoted.",
    long: "God is holy — utterly other, morally perfect. He calls His people to be holy too, not by trying harder but by being made new in Christ and walking by the Spirit.",
    refs: ["Isaiah 6:3", "1 Peter 1:15–16"] },

  { slug: "incarnation", word: "Incarnation",
    short: "God the Son took on flesh and became truly human in Jesus of Nazareth.",
    long: "The Word became flesh and lived among us (John 1:14). Without ceasing to be God, the Son became truly human — body and soul. This is the hinge of the Christian faith.",
    refs: ["John 1:14", "Philippians 2:5–8"] },

  { slug: "justification", word: "Justification",
    short: "God's verdict that the sinner is righteous in Christ, by grace through faith.",
    long: "Justification is a courtroom term: God declares the believing sinner righteous because Christ's righteousness is credited to them. It is not earned; it is received.",
    refs: ["Romans 3:23–26", "Galatians 2:16"] },

  { slug: "kingdom", word: "Kingdom of God",
    short: "God's reign — already begun in Christ, awaiting its full revealing.",
    long: "Jesus' first message was 'the Kingdom of God has come near.' The Kingdom is wherever Christ's reign is welcomed. It is already here in part; it will be all in all when He returns.",
    refs: ["Mark 1:14–15", "Matthew 6:10"] },

  { slug: "logos", word: "Logos (the Word)",
    short: "John's name for Christ — the eternal Word of God who became flesh.",
    long: "The opening of John's Gospel echoes Genesis 1: 'In the beginning was the Word, and the Word was with God, and the Word was God.' Christ is God's self-expression to the world.",
    refs: ["John 1:1–14"] },

  { slug: "mercy", word: "Mercy",
    short: "God withholding the judgment we deserved.",
    long: "Mercy is the other side of grace: grace gives the good we did not earn; mercy withholds the punishment we did. Both meet at the cross.",
    refs: ["Titus 3:5", "Lamentations 3:22–23"] },

  { slug: "pentecost", word: "Pentecost",
    short: "The day the Holy Spirit was poured out on the Church (Acts 2), fulfilling Joel 2.",
    long: "Pentecost was a Jewish harvest festival. On that day, fifty days after Christ's resurrection, the Spirit fell on the gathered disciples — the birth of the Church and the start of the worldwide mission.",
    refs: ["Acts 2:1–4", "Joel 2:28"] },

  { slug: "propitiation", word: "Propitiation",
    short: "The turning-aside of God's righteous anger against sin, satisfied at the cross.",
    long: "Propitiation does not mean an angry God appeased by His Son — it means the loving God Himself bears the just consequence of sin in the person of His Son, so we go free.",
    refs: ["Romans 3:25", "1 John 4:10"] },

  { slug: "reconciliation", word: "Reconciliation",
    short: "Friendship with God restored through Christ.",
    long: "Sin made us enemies of God. The cross made peace. Reconciliation is not just the absence of hostility — it is the restoration of friendship with the Father.",
    refs: ["2 Corinthians 5:18–19", "Romans 5:10"] },

  { slug: "redemption", word: "Redemption",
    short: "Being bought back — out of slavery to sin and into freedom in Christ.",
    long: "Redemption pictures a slave being set free at a price. The price was Christ's blood. The freedom is real.",
    refs: ["Ephesians 1:7", "1 Peter 1:18–19"] },

  { slug: "repentance", word: "Repentance",
    short: "A change of mind that becomes a change of life.",
    long: "Repentance is more than feeling sorry — it is turning. The Greek metanoia means a change of mind that bears fruit in a changed life. It is the perpetual posture of the disciple.",
    refs: ["Mark 1:15", "Acts 3:19"] },

  { slug: "resurrection", word: "Resurrection",
    short: "Christ rose bodily from the grave — and so will all who are His.",
    long: "Resurrection is not the immortality of the soul but the bodily raising of the dead. Christ is the firstfruits; we follow at His coming. The Christian hope is fully physical and fully glorious.",
    refs: ["1 Corinthians 15:20–22", "John 11:25"] },

  { slug: "righteousness", word: "Righteousness",
    short: "Right standing with God — and right living before Him.",
    long: "In Christ we are made righteous (justification) and we are being made righteous (sanctification). The first is His gift; the second is His Spirit's work in us.",
    refs: ["Romans 3:22", "Matthew 5:6"] },

  { slug: "sabbath", word: "Sabbath",
    short: "God-given rhythm of rest, rooted in creation and renewed in Christ.",
    long: "The Sabbath was given as a sign of trust — that the world goes on without us because God upholds it. Christ calls Himself Lord of the Sabbath and is its true rest.",
    refs: ["Genesis 2:2–3", "Matthew 11:28", "Hebrews 4:9–10"] },

  { slug: "sanctification", word: "Sanctification",
    short: "The lifelong process of becoming holy — being made more like Jesus.",
    long: "Justification is a once-for-all verdict; sanctification is a lifelong becoming. The Spirit who saved us is now shaping us into the image of Christ, with our cooperation.",
    refs: ["1 Thessalonians 4:3", "2 Corinthians 3:18"] },

  { slug: "sin", word: "Sin",
    short: "Falling short of the glory of God — both rebellion and brokenness.",
    long: "Sin is both what we do wrong and what is wrong with us. It is missing the mark, breaking the law, and twisting the loves of the heart. The Gospel is God's answer to it.",
    refs: ["Romans 3:23", "1 John 3:4"] },

  { slug: "spirit", word: "Holy Spirit",
    short: "The third Person of the Trinity — fully God, sent to indwell and sanctify believers.",
    long: "The Spirit convicts of sin, comforts the saints, gives gifts to the Church, and produces fruit in the disciple. He is not an impersonal force; He is the Lord, the giver of life.",
    refs: ["John 14:16–17", "Galatians 5:22–23"] },

  { slug: "trinity", word: "Trinity",
    short: "One God in three persons: Father, Son, and Holy Spirit.",
    long: "The doctrine of the Trinity says God is one in being and three in person. Not three gods, not one person with three masks — but the eternal, mutual love of Father, Son, and Spirit.",
    refs: ["Matthew 28:19", "2 Corinthians 13:14"] },

  { slug: "wisdom", word: "Wisdom",
    short: "Skill in the art of living rightly before God — and a Person in whom we find it.",
    long: "Biblical wisdom (chokmah) is more than knowledge; it is knowing how to live. Proverbs 9 personifies Wisdom; 1 Corinthians 1 identifies Christ as the wisdom of God.",
    refs: ["Proverbs 1:7", "1 Corinthians 1:30"] },

  { slug: "worship", word: "Worship",
    short: "Ascribing worth to God with our whole life — words, deeds, time, money, love.",
    long: "Worship is not first an event but a posture. Sunday's gathering trains the rest of the week's living. Romans 12 calls our offered bodies our true and proper worship.",
    refs: ["John 4:23–24", "Romans 12:1"] },
];
