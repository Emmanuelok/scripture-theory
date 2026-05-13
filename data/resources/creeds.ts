// Historic Christian creeds — public-domain texts of universal-Church witness.

export type Creed = {
  slug: string;
  name: string;
  era: string;
  origin: string;
  text: string;
  why: string;
};

export const CREEDS: Creed[] = [
  {
    slug: "apostles",
    name: "The Apostles' Creed",
    era: "Form by 4th century · final by 8th",
    origin: "Western Church · earliest baptismal confession",
    why:
      "The simplest and most ancient summary of what Christians believe. Recited at baptism since the earliest centuries and still confessed every Sunday in churches of nearly every tradition.",
    text: `I believe in God, the Father almighty,
    Creator of heaven and earth.

I believe in Jesus Christ, his only Son, our Lord,
    who was conceived by the Holy Spirit,
    born of the Virgin Mary,
    suffered under Pontius Pilate,
    was crucified, died, and was buried;
    he descended to the dead.
    On the third day he rose again;
    he ascended into heaven,
    he is seated at the right hand of the Father,
    and he will come again to judge the living and the dead.

I believe in the Holy Spirit,
    the holy catholic Church,
    the communion of saints,
    the forgiveness of sins,
    the resurrection of the body,
    and the life everlasting.

Amen.`,
  },
  {
    slug: "nicene",
    name: "The Nicene Creed",
    era: "325 · expanded 381",
    origin: "First Council of Nicaea / First Council of Constantinople",
    why:
      "The creed of the whole Church — Orthodox, Catholic, Anglican, Reformed, Lutheran. It defined what is non-negotiable about Christ: truly God, truly man, of the same substance as the Father.",
    text: `We believe in one God, the Father almighty,
maker of heaven and earth, of all things visible and invisible.

We believe in one Lord, Jesus Christ,
    the only Son of God,
    begotten from the Father before all ages,
    God from God, Light from Light,
    true God from true God,
    begotten, not made,
    of one being with the Father;
    through him all things were made.

For us and for our salvation
    he came down from heaven,
    was incarnate of the Holy Spirit and the Virgin Mary
    and became truly human.
    For our sake he was crucified under Pontius Pilate;
    he suffered death and was buried.
    On the third day he rose again
    in accordance with the Scriptures;
    he ascended into heaven
    and is seated at the right hand of the Father.
    He will come again in glory
    to judge the living and the dead,
    and his kingdom will have no end.

We believe in the Holy Spirit,
    the Lord, the giver of life,
    who proceeds from the Father,
    who with the Father and the Son is worshiped and glorified,
    who has spoken through the prophets.

We believe in one, holy, catholic, and apostolic Church.
We acknowledge one baptism for the forgiveness of sins.
We look for the resurrection of the dead,
    and the life of the world to come.

Amen.`,
  },
  {
    slug: "chalcedonian",
    name: "The Chalcedonian Definition",
    era: "451",
    origin: "Council of Chalcedon",
    why:
      "The Church's settled answer to 'Who is Jesus?' — one person, two natures, fully God and fully human, without confusion, change, division, or separation.",
    text: `We confess one and the same our Lord Jesus Christ,
    the same perfect in Godhead
    and the same perfect in manhood;
    truly God and truly man,
    of a reasonable soul and body;

consubstantial with the Father according to the Godhead,
    and the same consubstantial with us according to the manhood;
    in all things like unto us, without sin;

begotten before the ages of the Father according to the Godhead,
    and in these latter days, for us and for our salvation,
    born of the Virgin Mary, the Mother of God,
    according to the manhood;

one and the same Christ, Son, Lord, only-begotten,
to be acknowledged in two natures,
        without confusion,
        without change,
        without division,
        without separation;

the distinction of natures being in no way annulled by the union,
but rather the characteristics of each nature being preserved
and coming together to form one person and one subsistence,
not parted or divided into two persons,
but one and the same Son and only-begotten God the Word,
the Lord Jesus Christ.`,
  },
  {
    slug: "athanasian",
    name: "The Athanasian Creed (excerpt)",
    era: "5th–6th century",
    origin: "Western Church · associated with Athanasius's followers",
    why:
      "The fullest creed of the early Church — explicit about the Trinity and the two natures of Christ. Used liturgically in the Western tradition.",
    text: `Whosoever wishes to be saved must, above all things, hold the catholic faith.

And the catholic faith is this:
That we worship one God in Trinity, and Trinity in Unity;
Neither confounding the persons, nor dividing the substance.

For there is one Person of the Father, another of the Son, and another of the Holy Spirit.
But the Godhead of the Father, of the Son, and of the Holy Spirit is all one;
the glory equal, the majesty co-eternal.

Such as the Father is, such is the Son, and such is the Holy Spirit.
The Father uncreated, the Son uncreated, and the Holy Spirit uncreated.
The Father infinite, the Son infinite, and the Holy Spirit infinite.
The Father eternal, the Son eternal, and the Holy Spirit eternal.
And yet they are not three eternals, but one eternal.

So that in all things, as is aforesaid,
the Unity in Trinity and the Trinity in Unity is to be worshiped.

Furthermore, it is necessary to everlasting salvation
that we believe rightly the incarnation of our Lord Jesus Christ.
For the right faith is that we believe and confess
that our Lord Jesus Christ, the Son of God, is God and man:

God, of the substance of the Father, begotten before the worlds;
and man, of the substance of his mother, born in the world.
Perfect God and perfect man, of a reasonable soul and human flesh subsisting…

This is the catholic faith,
which except a man believe faithfully, he cannot be saved.`,
  },
];
