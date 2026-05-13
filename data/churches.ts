export type CityId = "lagos" | "saopaulo" | "manila" | "nairobi" | "phoenix";
export type ChurchTradition =
  | "anglican"
  | "baptist"
  | "catholic"
  | "evangelical"
  | "lutheran"
  | "methodist"
  | "nondenom"
  | "orthodox"
  | "pentecostal"
  | "presbyterian"
  | "reformed";

export type Church = {
  id: string;
  name: string;
  city: CityId;
  neighborhood: string;
  tradition: ChurchTradition;
  languages: string[];
  discipleship: string;
  pastorIntro: string;
};

export const cities: Record<CityId, { label: string; country: string }> = {
  lagos: { label: "Lagos", country: "Nigeria" },
  saopaulo: { label: "São Paulo", country: "Brazil" },
  manila: { label: "Manila", country: "Philippines" },
  nairobi: { label: "Nairobi", country: "Kenya" },
  phoenix: { label: "Phoenix", country: "United States" },
};

export const traditionLabels: Record<ChurchTradition, string> = {
  anglican: "Anglican",
  baptist: "Baptist",
  catholic: "Roman Catholic",
  evangelical: "Evangelical",
  lutheran: "Lutheran",
  methodist: "Methodist",
  nondenom: "Non-denominational",
  orthodox: "Eastern Orthodox",
  pentecostal: "Pentecostal",
  presbyterian: "Presbyterian",
  reformed: "Reformed",
};

export const churches: Church[] = [
  // Lagos
  {
    id: "lag-01",
    name: "Trinity Anglican · Ikoyi",
    city: "lagos",
    neighborhood: "Ikoyi",
    tradition: "anglican",
    languages: ["English", "Yoruba"],
    discipleship: "Sunday worship, weekly home cells, six-month catechumenate before baptism.",
    pastorIntro: "Pastor Adewale will reply within 3 days and invite you to a Sunday gathering and a midweek meal.",
  },
  {
    id: "lag-02",
    name: "Grace Family Baptist · Surulere",
    city: "lagos",
    neighborhood: "Surulere",
    tradition: "baptist",
    languages: ["English", "Yoruba", "Igbo"],
    discipleship: "Membership class, growth groups, mentor-pair discipleship for new believers.",
    pastorIntro: "Pastor Ngozi pairs every newcomer with a same-gender mentor for the first 90 days.",
  },
  {
    id: "lag-03",
    name: "Living Hope Pentecostal · Yaba",
    city: "lagos",
    neighborhood: "Yaba",
    tradition: "pentecostal",
    languages: ["English", "Pidgin"],
    discipleship: "Foundations class for new believers, prayer huddles, monthly outreach.",
    pastorIntro: "Pastor Tobi will walk you through The Path stages 1–4 over four Saturdays.",
  },
  {
    id: "lag-04",
    name: "Christ Cathedral · Lagos Island",
    city: "lagos",
    neighborhood: "Lagos Island",
    tradition: "catholic",
    languages: ["English", "Yoruba", "Latin"],
    discipleship: "RCIA, parish small groups, weekly Mass and adoration.",
    pastorIntro: "Fr. Emmanuel will introduce you to the parish RCIA team and a sponsor.",
  },
  {
    id: "lag-05",
    name: "Redeemer Presbyterian · Lekki",
    city: "lagos",
    neighborhood: "Lekki Phase 1",
    tradition: "presbyterian",
    languages: ["English"],
    discipleship: "Expository preaching, community groups, weekly catechism class.",
    pastorIntro: "Pastor Chinedu meets every newcomer for coffee within two Sundays.",
  },

  // São Paulo
  {
    id: "sp-01",
    name: "Igreja da Graça · Vila Mariana",
    city: "saopaulo",
    neighborhood: "Vila Mariana",
    tradition: "reformed",
    languages: ["Português"],
    discipleship: "Pregação expositiva, grupos pequenos por bairro, classe de fundamentos.",
    pastorIntro: "Pastor Ricardo responde em até 48 horas e convida você para um grupo perto da sua casa.",
  },
  {
    id: "sp-02",
    name: "Comunidade Pentecostal · Mooca",
    city: "saopaulo",
    neighborhood: "Mooca",
    tradition: "pentecostal",
    languages: ["Português", "Español"],
    discipleship: "Encontro com Deus, células bilíngues, escola de líderes.",
    pastorIntro: "Pastora Camila acolhe pessoalmente cada novo irmão na primeira semana.",
  },
  {
    id: "sp-03",
    name: "Catedral da Sé · Centro",
    city: "saopaulo",
    neighborhood: "Sé",
    tradition: "catholic",
    languages: ["Português"],
    discipleship: "Catecumenato adulto, missa diária, grupos de oração e caridade.",
    pastorIntro: "Padre Tiago apresenta o catecumenato e indica um padrinho ou madrinha.",
  },
  {
    id: "sp-04",
    name: "Comunidade Anglicana · Pinheiros",
    city: "saopaulo",
    neighborhood: "Pinheiros",
    tradition: "anglican",
    languages: ["Português", "English"],
    discipleship: "Liturgia semanal, grupos de leitura bíblica, mentoria 1:1.",
    pastorIntro: "Pastor Daniel marcará um almoço dentro de duas semanas.",
  },
  {
    id: "sp-05",
    name: "Comunidade Cristã · Itaim Paulista",
    city: "saopaulo",
    neighborhood: "Itaim Paulista (zona leste)",
    tradition: "nondenom",
    languages: ["Português"],
    discipleship: "Foco em adolescentes da periferia, grupos semanais, mentoria com a família.",
    pastorIntro: "Pastor Lucas e a esposa, Bia, recebem novas famílias para um jantar simples.",
  },

  // Manila
  {
    id: "mn-01",
    name: "San Lorenzo Parish · Makati",
    city: "manila",
    neighborhood: "Makati",
    tradition: "catholic",
    languages: ["English", "Tagalog"],
    discipleship: "RCIA, parish small communities, weekday Mass.",
    pastorIntro: "Fr. Joel will pair you with a parish welcome team within a week.",
  },
  {
    id: "mn-02",
    name: "Greenhills Christian Fellowship · Ortigas",
    city: "manila",
    neighborhood: "Ortigas",
    tradition: "evangelical",
    languages: ["English", "Tagalog"],
    discipleship: "Discovery Class, Dgroups (3–5 people), one-to-one Bible reading.",
    pastorIntro: "Pastor Marvin invites every newcomer to a 4-week Discovery class.",
  },
  {
    id: "mn-03",
    name: "Word for the World · Quezon City",
    city: "manila",
    neighborhood: "Quezon City",
    tradition: "pentecostal",
    languages: ["English", "Tagalog"],
    discipleship: "Encounter weekend, life groups, leadership track.",
    pastorIntro: "Pastor Grace personally welcomes new families and arranges a Sunday meal.",
  },
  {
    id: "mn-04",
    name: "Cubao Reformed Church · Cubao",
    city: "manila",
    neighborhood: "Cubao",
    tradition: "reformed",
    languages: ["English", "Tagalog"],
    discipleship: "Catechism class, expository preaching, neighborhood Bible studies.",
    pastorIntro: "Pastor Ramon meets each newcomer for merienda the week after their first visit.",
  },
  {
    id: "mn-05",
    name: "Iglesia Filipina Independiente · Tondo",
    city: "manila",
    neighborhood: "Tondo",
    tradition: "anglican",
    languages: ["Tagalog", "English"],
    discipleship: "Daily prayer, neighborhood feeding, weekly Eucharist.",
    pastorIntro: "Fr. Andres serves Tondo families and welcomes anyone for a parish visit.",
  },

  // Nairobi
  {
    id: "nb-01",
    name: "St. Andrew's Cathedral · CBD",
    city: "nairobi",
    neighborhood: "Central",
    tradition: "anglican",
    languages: ["English", "Kiswahili"],
    discipleship: "Confirmation class, growth groups across the city, daily prayer office.",
    pastorIntro: "Padre James will introduce you to a growth group near your estate.",
  },
  {
    id: "nb-02",
    name: "Nairobi Chapel · Ngong Road",
    city: "nairobi",
    neighborhood: "Ngong Road",
    tradition: "evangelical",
    languages: ["English", "Kiswahili"],
    discipleship: "Foundations class, mid-size missional communities, one-to-one discipleship.",
    pastorIntro: "Pastor Wanjiru reaches out personally within 72 hours.",
  },
  {
    id: "nb-03",
    name: "Mavuno Church · Bellevue",
    city: "nairobi",
    neighborhood: "Bellevue",
    tradition: "pentecostal",
    languages: ["English", "Kiswahili", "Sheng"],
    discipleship: "Mizizi (10-week roots), Ndoa, leadership pipeline.",
    pastorIntro: "Pastor Kevin starts every newcomer in the Mizizi course at the next intake.",
  },
  {
    id: "nb-04",
    name: "Lighthouse Reformed Baptist · Karen",
    city: "nairobi",
    neighborhood: "Karen",
    tradition: "reformed",
    languages: ["English"],
    discipleship: "Expository preaching, catechism, neighborhood Bible studies.",
    pastorIntro: "Pastor Daniel meets every visitor for tea within two weeks.",
  },
  {
    id: "nb-05",
    name: "Holy Family Basilica · CBD",
    city: "nairobi",
    neighborhood: "Central",
    tradition: "catholic",
    languages: ["English", "Kiswahili"],
    discipleship: "RCIA, small Christian communities, daily Mass.",
    pastorIntro: "Fr. Peter will link you to a small Christian community near your home.",
  },

  // Phoenix
  {
    id: "ph-01",
    name: "Desert Springs Bible Church · Central Phoenix",
    city: "phoenix",
    neighborhood: "Central",
    tradition: "nondenom",
    languages: ["English", "Spanish"],
    discipleship: "Rooted (10-week), life groups in every neighborhood, mentor pairings.",
    pastorIntro: "Pastor Mark or one of his elders meets every newcomer within a week.",
  },
  {
    id: "ph-02",
    name: "Iglesia Cristo Vive · Maryvale",
    city: "phoenix",
    neighborhood: "Maryvale",
    tradition: "pentecostal",
    languages: ["Spanish", "English"],
    discipleship: "Bienvenida, Encuentro, Escuela de líderes.",
    pastorIntro: "Pastor Hugo y su esposa, Marta, los reciben con una cena en casa la primera semana.",
  },
  {
    id: "ph-03",
    name: "Trinity Cathedral · Roosevelt Row",
    city: "phoenix",
    neighborhood: "Roosevelt Row",
    tradition: "anglican",
    languages: ["English"],
    discipleship: "Catechumenate, daily office, sustained spiritual direction.",
    pastorIntro: "Dean Sarah meets every catechumen monthly for the first year.",
  },
  {
    id: "ph-04",
    name: "St. Mary's Basilica · Downtown",
    city: "phoenix",
    neighborhood: "Downtown",
    tradition: "catholic",
    languages: ["English", "Spanish"],
    discipleship: "OCIA, parish small groups, daily Mass.",
    pastorIntro: "Fr. Antonio links you to a sponsor and a small group.",
  },
  {
    id: "ph-05",
    name: "Living Hope Free Methodist · Tempe",
    city: "phoenix",
    neighborhood: "Tempe (metro)",
    tradition: "methodist",
    languages: ["English"],
    discipleship: "Class meetings (Wesley-style), Bible study, mercy ministries in the city.",
    pastorIntro: "Pastor Rebecca invites every newcomer into a class meeting at the next start.",
  },
];

export function filterChurches(input: {
  city?: CityId | "all";
  tradition?: ChurchTradition | "all";
  language?: string | "all";
  q?: string;
}): Church[] {
  const q = (input.q ?? "").trim().toLowerCase();
  return churches.filter((c) => {
    if (input.city && input.city !== "all" && c.city !== input.city) return false;
    if (input.tradition && input.tradition !== "all" && c.tradition !== input.tradition) return false;
    if (
      input.language &&
      input.language !== "all" &&
      !c.languages.some((l) => l.toLowerCase() === input.language!.toLowerCase())
    )
      return false;
    if (q) {
      const hay = [
        c.name,
        c.neighborhood,
        cities[c.city].label,
        cities[c.city].country,
        traditionLabels[c.tradition],
        c.languages.join(" "),
        c.discipleship,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
