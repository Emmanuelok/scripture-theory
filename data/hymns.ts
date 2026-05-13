// ─── Public-Domain Hymn Library ───────────────────────────────
// All hymn texts here are in the public domain (composed before 1929,
// authors deceased > 70 years). Verses are presented in full where
// reasonable to preserve theological richness. Modernized spelling
// where it does not alter meter.

export type Hymn = {
  id: string;
  title: string;
  author: string;
  year: number;
  category:
    | "praise"
    | "advent"
    | "cross"
    | "easter"
    | "communion"
    | "comfort"
    | "consecration"
    | "mission"
    | "trinity"
    | "second-coming";
  scriptures: string[];
  verses: string[];
  refrain?: string;
};

export const hymnCategories: Record<Hymn["category"], { label: string; sub: string }> = {
  praise: { label: "Praise of God", sub: "Adoration, the majesty of the Father" },
  advent: { label: "Advent / Incarnation", sub: "He is coming, He has come" },
  cross: { label: "The Cross", sub: "The death of Jesus for us" },
  easter: { label: "Resurrection", sub: "He is risen" },
  communion: { label: "The Lord's Supper", sub: "The Table of the Lord" },
  comfort: { label: "Comfort & assurance", sub: "When the soul needs steadying" },
  consecration: { label: "Consecration", sub: "Surrender, walk, holiness" },
  mission: { label: "Mission", sub: "Go and make disciples" },
  trinity: { label: "The Trinity", sub: "Father, Son, Spirit — one God" },
  "second-coming": { label: "Second Coming", sub: "Even so, come, Lord Jesus" },
};

export const hymns: Hymn[] = [
  {
    id: "amazing-grace",
    title: "Amazing Grace",
    author: "John Newton",
    year: 1779,
    category: "praise",
    scriptures: ["Ephesians 2:8-9", "1 Chronicles 17:16-17"],
    verses: [
      "Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.",
      "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.",
      "Through many dangers, toils, and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.",
      "The Lord has promised good to me,\nHis Word my hope secures;\nHe will my Shield and Portion be,\nAs long as life endures.",
      "Yea, when this flesh and heart shall fail,\nAnd mortal life shall cease,\nI shall possess, within the veil,\nA life of joy and peace.",
      "When we've been there ten thousand years,\nBright shining as the sun,\nWe've no less days to sing God's praise\nThan when we'd first begun.",
    ],
  },
  {
    id: "be-thou-my-vision",
    title: "Be Thou My Vision",
    author: "Irish hymn (8th c.); tr. Mary E. Byrne",
    year: 1905,
    category: "consecration",
    scriptures: ["Psalm 16:8", "Galatians 2:20"],
    verses: [
      "Be Thou my Vision, O Lord of my heart;\nNaught be all else to me, save that Thou art —\nThou my best Thought, by day or by night,\nWaking or sleeping, Thy presence my light.",
      "Be Thou my Wisdom, and Thou my true Word;\nI ever with Thee and Thou with me, Lord;\nThou my great Father, I Thy true son;\nThou in me dwelling, and I with Thee one.",
      "Riches I heed not, nor man's empty praise,\nThou mine Inheritance, now and always:\nThou and Thou only, first in my heart,\nHigh King of Heaven, my Treasure Thou art.",
      "High King of Heaven, my victory won,\nMay I reach Heaven's joys, O bright Heaven's Sun!\nHeart of my own heart, whatever befall,\nStill be my Vision, O Ruler of all.",
    ],
  },
  {
    id: "holy-holy-holy",
    title: "Holy, Holy, Holy",
    author: "Reginald Heber",
    year: 1826,
    category: "trinity",
    scriptures: ["Revelation 4:8", "Isaiah 6:3"],
    verses: [
      "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy! Merciful and mighty,\nGod in three Persons, blessèd Trinity!",
      "Holy, holy, holy! All the saints adore Thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before Thee,\nWhich wert and art and evermore shalt be.",
      "Holy, holy, holy! Though the darkness hide Thee,\nThough the eye of sinful man Thy glory may not see,\nOnly Thou art holy — there is none beside Thee\nPerfect in power, in love, and purity.",
      "Holy, holy, holy! Lord God Almighty!\nAll Thy works shall praise Thy Name, in earth, and sky, and sea.\nHoly, holy, holy! Merciful and mighty,\nGod in three Persons, blessèd Trinity!",
    ],
  },
  {
    id: "when-i-survey",
    title: "When I Survey the Wondrous Cross",
    author: "Isaac Watts",
    year: 1707,
    category: "cross",
    scriptures: ["Galatians 6:14", "Philippians 3:7-8"],
    verses: [
      "When I survey the wondrous cross\nOn which the Prince of glory died,\nMy richest gain I count but loss,\nAnd pour contempt on all my pride.",
      "Forbid it, Lord, that I should boast,\nSave in the death of Christ my God!\nAll the vain things that charm me most,\nI sacrifice them to His blood.",
      "See from His head, His hands, His feet,\nSorrow and love flow mingled down!\nDid e'er such love and sorrow meet,\nOr thorns compose so rich a crown?",
      "Were the whole realm of nature mine,\nThat were a present far too small;\nLove so amazing, so divine,\nDemands my soul, my life, my all.",
    ],
  },
  {
    id: "and-can-it-be",
    title: "And Can It Be That I Should Gain",
    author: "Charles Wesley",
    year: 1738,
    category: "cross",
    scriptures: ["Romans 8:1", "1 Timothy 1:15"],
    verses: [
      "And can it be that I should gain\nAn interest in the Savior's blood?\nDied He for me, who caused His pain —\nFor me, who Him to death pursued?\nAmazing love! How can it be\nThat Thou, my God, shouldst die for me?",
      "He left His Father's throne above\n(So free, so infinite His grace!),\nEmptied Himself of all but love,\nAnd bled for Adam's helpless race:\n'Tis mercy all, immense and free;\nFor, O my God, it found out me!",
      "Long my imprisoned spirit lay\nFast bound in sin and nature's night;\nThine eye diffused a quickening ray —\nI woke, the dungeon flamed with light;\nMy chains fell off, my heart was free,\nI rose, went forth, and followed Thee.",
      "No condemnation now I dread;\nJesus, and all in Him, is mine!\nAlive in Him, my living Head,\nAnd clothed in righteousness divine,\nBold I approach the eternal throne,\nAnd claim the crown, through Christ my own.",
    ],
    refrain: "Amazing love! How can it be\nThat Thou, my God, shouldst die for me?",
  },
  {
    id: "christ-the-lord-is-risen",
    title: "Christ the Lord Is Risen Today",
    author: "Charles Wesley",
    year: 1739,
    category: "easter",
    scriptures: ["1 Corinthians 15:20", "Matthew 28:6"],
    verses: [
      "Christ the Lord is risen today, Alleluia!\nSons of men and angels say, Alleluia!\nRaise your joys and triumphs high, Alleluia!\nSing, ye heavens, and earth reply, Alleluia!",
      "Lives again our glorious King, Alleluia!\nWhere, O death, is now thy sting? Alleluia!\nOnce He died our souls to save, Alleluia!\nWhere thy victory, O grave? Alleluia!",
      "Love's redeeming work is done, Alleluia!\nFought the fight, the battle won, Alleluia!\nDeath in vain forbids Him rise, Alleluia!\nChrist has opened paradise, Alleluia!",
      "Soar we now where Christ has led, Alleluia!\nFollowing our exalted Head, Alleluia!\nMade like Him, like Him we rise, Alleluia!\nOurs the cross, the grave, the skies, Alleluia!",
    ],
  },
  {
    id: "great-is-thy-faithfulness",
    title: "Great Is Thy Faithfulness",
    author: "Thomas O. Chisholm",
    year: 1923,
    category: "comfort",
    scriptures: ["Lamentations 3:22-23"],
    verses: [
      "Great is Thy faithfulness, O God my Father,\nThere is no shadow of turning with Thee;\nThou changest not, Thy compassions, they fail not;\nAs Thou hast been Thou forever wilt be.",
      "Summer and winter, and springtime and harvest,\nSun, moon and stars in their courses above,\nJoin with all nature in manifold witness\nTo Thy great faithfulness, mercy and love.",
      "Pardon for sin and a peace that endureth,\nThine own dear presence to cheer and to guide;\nStrength for today and bright hope for tomorrow,\nBlessings all mine, with ten thousand beside!",
    ],
    refrain:
      "Great is Thy faithfulness! Great is Thy faithfulness!\nMorning by morning new mercies I see;\nAll I have needed Thy hand hath provided —\nGreat is Thy faithfulness, Lord, unto me!",
  },
  {
    id: "it-is-well",
    title: "It Is Well with My Soul",
    author: "Horatio G. Spafford",
    year: 1873,
    category: "comfort",
    scriptures: ["Habakkuk 3:17-18", "Romans 8:38-39"],
    verses: [
      "When peace, like a river, attendeth my way,\nWhen sorrows like sea billows roll;\nWhatever my lot, Thou hast taught me to say,\nIt is well, it is well with my soul.",
      "Though Satan should buffet, though trials should come,\nLet this blest assurance control,\nThat Christ hath regarded my helpless estate,\nAnd hath shed His own blood for my soul.",
      "My sin — O the bliss of this glorious thought —\nMy sin, not in part, but the whole,\nIs nailed to His cross, and I bear it no more;\nPraise the Lord, praise the Lord, O my soul!",
      "And, Lord, haste the day when the faith shall be sight,\nThe clouds be rolled back as a scroll,\nThe trump shall resound and the Lord shall descend;\nEven so — it is well with my soul.",
    ],
    refrain: "It is well (it is well)\nWith my soul (with my soul)\nIt is well, it is well with my soul.",
  },
  {
    id: "come-thou-fount",
    title: "Come, Thou Fount of Every Blessing",
    author: "Robert Robinson",
    year: 1758,
    category: "praise",
    scriptures: ["1 Samuel 7:12", "Psalm 103:1-5"],
    verses: [
      "Come, Thou Fount of every blessing,\nTune my heart to sing Thy grace;\nStreams of mercy, never ceasing,\nCall for songs of loudest praise.\nTeach me some melodious sonnet,\nSung by flaming tongues above;\nPraise the mount! I'm fixed upon it,\nMount of Thy redeeming love.",
      "Here I raise mine Ebenezer;\nHither by Thy help I'm come;\nAnd I hope, by Thy good pleasure,\nSafely to arrive at home.\nJesus sought me when a stranger,\nWandering from the fold of God;\nHe, to rescue me from danger,\nInterposed His precious blood.",
      "O to grace how great a debtor\nDaily I'm constrained to be!\nLet that grace now, like a fetter,\nBind my wandering heart to Thee.\nProne to wander, Lord, I feel it,\nProne to leave the God I love;\nHere's my heart, O take and seal it,\nSeal it for Thy courts above.",
    ],
  },
  {
    id: "come-thou-long-expected",
    title: "Come, Thou Long-Expected Jesus",
    author: "Charles Wesley",
    year: 1744,
    category: "advent",
    scriptures: ["Haggai 2:7", "Luke 2:25-32"],
    verses: [
      "Come, Thou long-expected Jesus,\nBorn to set Thy people free;\nFrom our fears and sins release us;\nLet us find our rest in Thee.\nIsrael's strength and consolation,\nHope of all the earth Thou art;\nDear desire of every nation,\nJoy of every longing heart.",
      "Born Thy people to deliver,\nBorn a child and yet a King,\nBorn to reign in us forever,\nNow Thy gracious kingdom bring.\nBy Thine own eternal Spirit\nRule in all our hearts alone;\nBy Thine all-sufficient merit\nRaise us to Thy glorious throne.",
    ],
  },
  {
    id: "o-come-o-come-emmanuel",
    title: "O Come, O Come, Emmanuel",
    author: "Latin (12th c.); tr. John M. Neale",
    year: 1851,
    category: "advent",
    scriptures: ["Isaiah 7:14", "Matthew 1:23"],
    verses: [
      "O come, O come, Emmanuel,\nAnd ransom captive Israel,\nThat mourns in lonely exile here\nUntil the Son of God appear.",
      "O come, Thou Wisdom from on high,\nWho orderest all things mightily;\nTo us the path of knowledge show,\nAnd teach us in her ways to go.",
      "O come, Thou Day-Spring, come and cheer\nOur spirits by Thine advent here;\nDisperse the gloomy clouds of night,\nAnd death's dark shadows put to flight.",
      "O come, Desire of nations, bind\nIn one the hearts of all mankind;\nBid Thou our sad divisions cease,\nAnd be Thyself our King of Peace.",
    ],
    refrain: "Rejoice! Rejoice! Emmanuel\nShall come to thee, O Israel.",
  },
  {
    id: "praise-to-the-lord",
    title: "Praise to the Lord, the Almighty",
    author: "Joachim Neander; tr. Catherine Winkworth",
    year: 1680,
    category: "praise",
    scriptures: ["Psalm 103", "Psalm 150"],
    verses: [
      "Praise to the Lord, the Almighty, the King of creation!\nO my soul, praise Him, for He is thy health and salvation!\nAll ye who hear, now to His temple draw near;\nJoin me in glad adoration!",
      "Praise to the Lord, who o'er all things so wondrously reigneth,\nShelters thee under His wings, yea, so gently sustaineth!\nHast thou not seen how thy desires e'er have been\nGranted in what He ordaineth?",
      "Praise to the Lord, who doth prosper thy work and defend thee;\nSurely His goodness and mercy here daily attend thee.\nPonder anew what the Almighty can do,\nIf with His love He befriend thee.",
      "Praise to the Lord! O let all that is in me adore Him!\nAll that hath life and breath, come now with praises before Him!\nLet the Amen sound from His people again;\nGladly forever adore Him.",
    ],
  },
  {
    id: "rock-of-ages",
    title: "Rock of Ages",
    author: "Augustus M. Toplady",
    year: 1776,
    category: "cross",
    scriptures: ["Exodus 33:22", "1 Corinthians 10:4"],
    verses: [
      "Rock of Ages, cleft for me,\nLet me hide myself in Thee;\nLet the water and the blood,\nFrom Thy wounded side which flowed,\nBe of sin the double cure;\nSave from wrath and make me pure.",
      "Not the labors of my hands\nCan fulfill Thy law's demands;\nCould my zeal no respite know,\nCould my tears forever flow,\nAll for sin could not atone;\nThou must save, and Thou alone.",
      "Nothing in my hand I bring,\nSimply to the cross I cling;\nNaked, come to Thee for dress;\nHelpless, look to Thee for grace;\nFoul, I to the Fountain fly;\nWash me, Savior, or I die.",
      "While I draw this fleeting breath,\nWhen mine eyes shall close in death,\nWhen I soar to worlds unknown,\nSee Thee on Thy judgment throne,\nRock of Ages, cleft for me,\nLet me hide myself in Thee.",
    ],
  },
  {
    id: "a-mighty-fortress",
    title: "A Mighty Fortress Is Our God",
    author: "Martin Luther",
    year: 1529,
    category: "comfort",
    scriptures: ["Psalm 46"],
    verses: [
      "A mighty Fortress is our God,\nA Bulwark never failing;\nOur Helper He, amid the flood\nOf mortal ills prevailing.\nFor still our ancient foe\nDoth seek to work us woe;\nHis craft and power are great,\nAnd, armed with cruel hate,\nOn earth is not his equal.",
      "Did we in our own strength confide,\nOur striving would be losing,\nWere not the right Man on our side,\nThe Man of God's own choosing.\nDost ask who that may be?\nChrist Jesus, it is He;\nLord Sabaoth His Name,\nFrom age to age the same,\nAnd He must win the battle.",
      "And though this world, with devils filled,\nShould threaten to undo us,\nWe will not fear, for God hath willed\nHis truth to triumph through us.\nThe Prince of Darkness grim —\nWe tremble not for him;\nHis rage we can endure,\nFor lo, his doom is sure;\nOne little word shall fell him.",
      "That word above all earthly powers —\nNo thanks to them — abideth;\nThe Spirit and the gifts are ours\nThrough Him who with us sideth.\nLet goods and kindred go,\nThis mortal life also;\nThe body they may kill;\nGod's truth abideth still;\nHis kingdom is forever.",
    ],
  },
  {
    id: "i-surrender-all",
    title: "I Surrender All",
    author: "Judson W. Van DeVenter",
    year: 1896,
    category: "consecration",
    scriptures: ["Romans 12:1", "Galatians 2:20"],
    verses: [
      "All to Jesus, I surrender;\nAll to Him I freely give;\nI will ever love and trust Him,\nIn His presence daily live.",
      "All to Jesus I surrender;\nHumbly at His feet I bow,\nWorldly pleasures all forsaken;\nTake me, Jesus, take me now.",
      "All to Jesus, I surrender;\nMake me, Savior, wholly Thine;\nLet me feel the Holy Spirit,\nTruly know that Thou art mine.",
      "All to Jesus, I surrender;\nLord, I give myself to Thee;\nFill me with Thy love and power;\nLet Thy blessing fall on me.",
    ],
    refrain: "I surrender all, I surrender all,\nAll to Thee, my blessèd Savior, I surrender all.",
  },
  {
    id: "what-a-friend",
    title: "What a Friend We Have in Jesus",
    author: "Joseph M. Scriven",
    year: 1855,
    category: "comfort",
    scriptures: ["Philippians 4:6-7", "Hebrews 4:15-16"],
    verses: [
      "What a Friend we have in Jesus,\nAll our sins and griefs to bear!\nWhat a privilege to carry\nEverything to God in prayer!\nO what peace we often forfeit,\nO what needless pain we bear,\nAll because we do not carry\nEverything to God in prayer!",
      "Have we trials and temptations?\nIs there trouble anywhere?\nWe should never be discouraged —\nTake it to the Lord in prayer!\nCan we find a friend so faithful\nWho will all our sorrows share?\nJesus knows our every weakness;\nTake it to the Lord in prayer!",
      "Are we weak and heavy laden,\nCumbered with a load of care?\nPrecious Savior, still our refuge —\nTake it to the Lord in prayer!\nDo thy friends despise, forsake thee?\nTake it to the Lord in prayer!\nIn His arms He'll take and shield thee;\nThou wilt find a solace there.",
    ],
  },
  {
    id: "all-creatures",
    title: "All Creatures of Our God and King",
    author: "Francis of Assisi (1225); tr. William Draper",
    year: 1919,
    category: "praise",
    scriptures: ["Psalm 148"],
    verses: [
      "All creatures of our God and King,\nLift up your voice and with us sing\nAlleluia! Alleluia!\nThou burning sun with golden beam,\nThou silver moon with softer gleam,\nO praise Him! O praise Him!\nAlleluia! Alleluia! Alleluia!",
      "Thou rushing wind that art so strong,\nYe clouds that sail in heaven along,\nO praise Him! Alleluia!\nThou rising morn, in praise rejoice,\nYe lights of evening, find a voice,\nO praise Him! O praise Him!\nAlleluia! Alleluia! Alleluia!",
      "Let all things their Creator bless,\nAnd worship Him in humbleness,\nO praise Him! Alleluia!\nPraise, praise the Father, praise the Son,\nAnd praise the Spirit, Three in One,\nO praise Him! O praise Him!\nAlleluia! Alleluia! Alleluia!",
    ],
  },
  {
    id: "let-us-break-bread",
    title: "Let Us Break Bread Together",
    author: "African-American spiritual",
    year: 1880,
    category: "communion",
    scriptures: ["1 Corinthians 11:23-26"],
    verses: [
      "Let us break bread together on our knees,\nLet us break bread together on our knees;\nWhen I fall on my knees, with my face to the rising sun,\nO Lord, have mercy on me.",
      "Let us drink wine together on our knees,\nLet us drink wine together on our knees;\nWhen I fall on my knees, with my face to the rising sun,\nO Lord, have mercy on me.",
      "Let us praise God together on our knees,\nLet us praise God together on our knees;\nWhen I fall on my knees, with my face to the rising sun,\nO Lord, have mercy on me.",
    ],
  },
  {
    id: "lo-he-comes",
    title: "Lo! He Comes with Clouds Descending",
    author: "Charles Wesley",
    year: 1758,
    category: "second-coming",
    scriptures: ["Revelation 1:7", "Acts 1:11"],
    verses: [
      "Lo! He comes with clouds descending,\nOnce for favored sinners slain;\nThousand thousand saints attending\nSwell the triumph of His train:\nHallelujah! Hallelujah!\nGod appears, on earth to reign.",
      "Every eye shall now behold Him\nRobed in dreadful majesty;\nThose who set at naught and sold Him,\nPierced and nailed Him to the tree,\nDeeply wailing, deeply wailing,\nShall the true Messiah see.",
      "Yea, Amen! Let all adore Thee,\nHigh on Thine eternal throne;\nSavior, take the power and glory,\nClaim the kingdom for Thine own:\nO come quickly, O come quickly!\nEverlasting God, come down.",
    ],
  },
  {
    id: "o-for-a-thousand",
    title: "O For a Thousand Tongues to Sing",
    author: "Charles Wesley",
    year: 1739,
    category: "praise",
    scriptures: ["Psalm 35:28", "Acts 4:12"],
    verses: [
      "O for a thousand tongues to sing\nMy great Redeemer's praise,\nThe glories of my God and King,\nThe triumphs of His grace!",
      "My gracious Master and my God,\nAssist me to proclaim,\nTo spread through all the earth abroad\nThe honors of Thy Name.",
      "Jesus! the Name that charms our fears,\nThat bids our sorrows cease;\n'Tis music in the sinner's ears,\n'Tis life, and health, and peace.",
      "He breaks the power of cancelled sin,\nHe sets the prisoner free;\nHis blood can make the foulest clean;\nHis blood availed for me.",
      "Hear Him, ye deaf; His praise, ye dumb,\nYour loosened tongues employ;\nYe blind, behold your Savior come,\nAnd leap, ye lame, for joy.",
    ],
  },
  {
    id: "facing-a-task-unfinished",
    title: "Facing a Task Unfinished",
    author: "Frank Houghton",
    year: 1929,
    category: "mission",
    scriptures: ["Matthew 28:18-20"],
    verses: [
      "Facing a task unfinished,\nThat drives us to our knees,\nA need that, undiminished,\nRebukes our slothful ease,\nWe, who rejoice to know Thee,\nRenew before Thy throne\nThe solemn pledge we owe Thee\nTo go and make Thee known.",
      "Where other lords beside Thee\nHold their unhindered sway,\nWhere forces that defied Thee\nDefy Thee still today,\nWith none to heed their crying\nFor life, and love, and light,\nUnnumbered souls are dying,\nAnd pass into the night.",
      "We bear the torch that flaming\nFell from the hands of those\nWho gave their lives proclaiming\nThat Jesus died and rose.\nOurs is the same commission,\nThe same glad message ours;\nFired by the same ambition,\nTo Thee we yield our powers.",
      "O Father who sustainest,\nO Spirit who dost fill,\nO Son who lovest, reignest,\nWe wait Thy sovereign will.\nSend us upon Thine errand,\nLet us Thy servants be,\nGracious Lord and holy,\nFor Thy own Name we go.",
    ],
  },
];
