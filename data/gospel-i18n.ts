import type { GospelMovement } from "@/data/gospel";

export type LocaleCode = "en" | "es" | "pt" | "fr" | "sw" | "hi" | "ar";

export type GospelLocaleContent = {
  meta: {
    pageEyebrow: string;
    pageTitle: string;
    pageIntro: string;
    languageName: string;
    nativeName: string;
    dir: "ltr" | "rtl";
  };
  movements: GospelMovement[];
  prayer: {
    eyebrow: string;
    heading: string;
    intro: string;
    body: string;
  };
  next: {
    heading: string;
    steps: { title: string; body: string }[];
  };
  cta: {
    readJohn: string;
    learnPray: string;
    findChurch: string;
  };
};

export const locales: Record<LocaleCode, GospelLocaleContent> = {
  en: {
    meta: {
      pageEyebrow: "The Gospel",
      pageTitle: "The best news the world has ever heard.",
      pageIntro:
        "There is only one Gospel. Two thousand years of Christians from every nation, language, and tradition have lived and died for the same simple, life-giving truth about Jesus. Here it is — in four short movements.",
      languageName: "English",
      nativeName: "English",
      dir: "ltr",
    },
    movements: [
      {
        number: "01",
        title: "God",
        subtitle: "He made you. He loves you. He is good.",
        scripture:
          "In the beginning, God created the heavens and the earth... And God saw everything that he had made, and behold, it was very good.",
        reference: "Genesis 1:1, 31",
        body: "Before anything else, there is God — the Father, the Son, and the Holy Spirit — who has always existed in perfect love. He made the universe, and He made you. You were created on purpose, by Someone who is good. You were never meant to live for yourself or by yourself. You were made for Him.",
        echoes: ["Psalm 139:13–14", "Acts 17:24–28", "1 John 4:8"],
      },
      {
        number: "02",
        title: "Our sin",
        subtitle: "Something went wrong — in the world, and in us.",
        scripture:
          "For all have sinned and fall short of the glory of God... For the wages of sin is death.",
        reference: "Romans 3:23; 6:23",
        body: "From the beginning, humanity has chosen to live as if we were God instead of trusting Him. The Bible calls this sin. It is not just bad behavior — it is a broken relationship. Sin separates us from God, breaks our communion with one another, and ends in death. We cannot fix it by trying harder or being more religious. We need to be rescued.",
        echoes: ["Genesis 3:1–13", "Isaiah 59:1–2", "Ephesians 2:1–3"],
      },
      {
        number: "03",
        title: "Jesus",
        subtitle: "He came. He died. He rose. He is Lord.",
        scripture:
          "For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared...",
        reference: "1 Corinthians 15:3–5",
        body: "God did not leave us in our sin. The eternal Son of God became a man — Jesus of Nazareth. He lived the life we should have lived. He died on a Roman cross, in our place, for our sins. He was buried. On the third day, He rose from the dead, conquering death itself. He is now King of kings, and one day He will return. This is the ONE Gospel — there is no other.",
        echoes: ["John 1:14; 3:16", "Romans 5:6–8", "1 Peter 3:18"],
      },
      {
        number: "04",
        title: "Your response",
        subtitle: "Turn. Trust. Follow. Belong.",
        scripture:
          "If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.",
        reference: "Romans 10:9",
        body: "The Gospel asks for a response. Turn from sin. Trust Jesus. Receive His Spirit. Be baptized. Follow Him. Belong to His people — the Church. This is not a one-time decision; it is a whole life. And it begins the moment you say yes to Him.",
        echoes: ["Mark 1:14–15", "Acts 2:38–39", "John 1:12–13"],
      },
    ],
    prayer: {
      eyebrow: "A prayer of response",
      heading: "Talk to Jesus right now.",
      intro:
        "If you have never said yes to Jesus, or if you want to say it again today, here are simple words you can pray. There is nothing magic about the words — Jesus hears the heart behind them.",
      body: `Jesus,
I have lived for myself.
I have sinned, and I cannot save myself.
I believe You died for me and rose again.
Today I turn from my sin and turn to You.
Be my Lord. Be my Savior. Be my friend.
Send Your Spirit. Make me new.
I belong to You now. Lead me, and I will follow.
Amen.`,
    },
    next: {
      heading: "If you prayed that — or want to — do these four things this week.",
      steps: [
        { title: "Tell someone today", body: "Tell one Christian friend you said yes to Jesus. If you don't know one, write to a pastor near you. The Christian life is not lived alone." },
        { title: "Open the Word", body: "Begin with the Gospel of John. We have a 30-day plan ready for you. Read a chapter a day and let Jesus introduce Himself." },
        { title: "Find a local church", body: "Baptism, the Lord's Supper, and life with God's people happen in a real church. We can help you find one — and meet a real pastor." },
        { title: "Begin to pray", body: "Talk to God like a Father. He is. Use the Lord's Prayer as your guide. We have a walk-through to help you start." },
      ],
    },
    cta: {
      readJohn: "Start the John 30-day plan",
      learnPray: "Learn to pray",
      findChurch: "Find a local church",
    },
  },

  es: {
    meta: {
      pageEyebrow: "El Evangelio",
      pageTitle: "La mejor noticia que el mundo ha escuchado.",
      pageIntro:
        "Hay un solo Evangelio. Dos mil años de cristianos de toda nación, lengua y tradición han vivido y muerto por la misma verdad sencilla y vivificante acerca de Jesús. Aquí está — en cuatro movimientos breves.",
      languageName: "Spanish",
      nativeName: "Español",
      dir: "ltr",
    },
    movements: [
      {
        number: "01",
        title: "Dios",
        subtitle: "Él te hizo. Él te ama. Él es bueno.",
        scripture:
          "En el principio creó Dios los cielos y la tierra... Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera.",
        reference: "Génesis 1:1, 31",
        body: "Antes que cualquier otra cosa, existe Dios — el Padre, el Hijo y el Espíritu Santo — que ha existido siempre en amor perfecto. Él hizo el universo, y te hizo a ti. Fuiste creado con un propósito, por Alguien que es bueno. Nunca fuiste hecho para vivir por ti mismo ni para ti mismo. Fuiste hecho para Él.",
        echoes: ["Salmo 139:13–14", "Hechos 17:24–28", "1 Juan 4:8"],
      },
      {
        number: "02",
        title: "Nuestro pecado",
        subtitle: "Algo se quebró — en el mundo, y en nosotros.",
        scripture:
          "Por cuanto todos pecaron y están destituidos de la gloria de Dios... Porque la paga del pecado es muerte.",
        reference: "Romanos 3:23; 6:23",
        body: "Desde el principio, la humanidad ha escogido vivir como si fuéramos Dios en lugar de confiar en Él. La Biblia llama a esto pecado. No es solo mala conducta — es una relación rota. El pecado nos separa de Dios, rompe nuestra comunión con los demás y termina en muerte. No podemos arreglarlo esforzándonos más ni siendo más religiosos. Necesitamos ser rescatados.",
        echoes: ["Génesis 3:1–13", "Isaías 59:1–2", "Efesios 2:1–3"],
      },
      {
        number: "03",
        title: "Jesús",
        subtitle: "Vino. Murió. Resucitó. Es Señor.",
        scripture:
          "Porque primeramente os he enseñado lo que asimismo recibí: Que Cristo murió por nuestros pecados, conforme a las Escrituras; y que fue sepultado, y que resucitó al tercer día, conforme a las Escrituras; y que apareció...",
        reference: "1 Corintios 15:3–5",
        body: "Dios no nos dejó en nuestro pecado. El Hijo eterno de Dios se hizo hombre — Jesús de Nazaret. Vivió la vida que nosotros debíamos haber vivido. Murió en una cruz romana, en nuestro lugar, por nuestros pecados. Fue sepultado. Al tercer día, resucitó de entre los muertos, venciendo a la muerte misma. Ahora es Rey de reyes, y un día volverá. Este es EL UNICO Evangelio — no hay otro.",
        echoes: ["Juan 1:14; 3:16", "Romanos 5:6–8", "1 Pedro 3:18"],
      },
      {
        number: "04",
        title: "Tu respuesta",
        subtitle: "Vuélvete. Confía. Sigue. Pertenece.",
        scripture:
          "Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo.",
        reference: "Romanos 10:9",
        body: "El Evangelio pide una respuesta. Apártate del pecado. Confía en Jesús. Recibe Su Espíritu. Bautízate. Síguelo. Pertenece a Su pueblo — la Iglesia. Esto no es una decisión de una sola vez; es una vida entera. Y empieza en el momento en que le dices sí a Él.",
        echoes: ["Marcos 1:14–15", "Hechos 2:38–39", "Juan 1:12–13"],
      },
    ],
    prayer: {
      eyebrow: "Una oración de respuesta",
      heading: "Habla con Jesús ahora mismo.",
      intro:
        "Si nunca le has dicho sí a Jesús, o si quieres decírselo de nuevo hoy, aquí tienes palabras sencillas que puedes orar. No hay nada mágico en las palabras — Jesús escucha el corazón detrás de ellas.",
      body: `Jesús,
he vivido para mí mismo.
He pecado, y no puedo salvarme.
Creo que moriste por mí y resucitaste.
Hoy me aparto de mi pecado y me vuelvo a Ti.
Sé mi Señor. Sé mi Salvador. Sé mi amigo.
Envía Tu Espíritu. Hazme nuevo.
Te pertenezco. Guíame, y te seguiré.
Amén.`,
    },
    next: {
      heading: "Si oraste esto — o quieres hacerlo — haz estas cuatro cosas esta semana.",
      steps: [
        { title: "Díselo a alguien hoy", body: "Cuéntale a un amigo cristiano que le dijiste sí a Jesús. Si no conoces a ninguno, escribe a un pastor cercano. La vida cristiana no se vive en soledad." },
        { title: "Abre la Palabra", body: "Comienza con el Evangelio de Juan. Tenemos un plan de 30 días listo para ti. Lee un capítulo al día y deja que Jesús se presente." },
        { title: "Encuentra una iglesia local", body: "El bautismo, la Cena del Señor y la vida con el pueblo de Dios suceden en una iglesia real. Podemos ayudarte a encontrar una — y a conocer a un pastor real." },
        { title: "Comienza a orar", body: "Habla con Dios como con un Padre. Lo es. Usa el Padrenuestro como guía. Tenemos un recorrido para ayudarte a empezar." },
      ],
    },
    cta: {
      readJohn: "Comienza el plan Juan en 30 días",
      learnPray: "Aprende a orar",
      findChurch: "Encuentra una iglesia local",
    },
  },

  pt: {
    meta: {
      pageEyebrow: "O Evangelho",
      pageTitle: "A melhor notícia que o mundo já ouviu.",
      pageIntro:
        "Há um só Evangelho. Dois mil anos de cristãos de toda nação, língua e tradição viveram e morreram pela mesma verdade simples e vivificante acerca de Jesus. Aqui está — em quatro breves movimentos.",
      languageName: "Portuguese",
      nativeName: "Português",
      dir: "ltr",
    },
    movements: [
      {
        number: "01",
        title: "Deus",
        subtitle: "Ele fez você. Ele ama você. Ele é bom.",
        scripture:
          "No princípio criou Deus os céus e a terra... E viu Deus tudo quanto tinha feito, e eis que era muito bom.",
        reference: "Gênesis 1:1, 31",
        body: "Antes de tudo, há Deus — o Pai, o Filho e o Espírito Santo — que sempre existiu em amor perfeito. Ele fez o universo, e fez você. Você foi criado com propósito, por Alguém que é bom. Você nunca foi feito para viver por si mesmo nem sozinho. Você foi feito para Ele.",
        echoes: ["Salmo 139:13–14", "Atos 17:24–28", "1 João 4:8"],
      },
      {
        number: "02",
        title: "Nosso pecado",
        subtitle: "Algo se quebrou — no mundo e em nós.",
        scripture:
          "Porque todos pecaram e destituídos estão da glória de Deus... Porque o salário do pecado é a morte.",
        reference: "Romanos 3:23; 6:23",
        body: "Desde o início, a humanidade escolheu viver como se nós fôssemos Deus em vez de confiar Nele. A Bíblia chama isso de pecado. Não é apenas mau comportamento — é uma relação quebrada. O pecado nos separa de Deus, rompe a nossa comunhão uns com os outros, e termina em morte. Não podemos consertar isso esforçando-nos mais nem sendo mais religiosos. Precisamos ser resgatados.",
        echoes: ["Gênesis 3:1–13", "Isaías 59:1–2", "Efésios 2:1–3"],
      },
      {
        number: "03",
        title: "Jesus",
        subtitle: "Ele veio. Ele morreu. Ele ressuscitou. Ele é Senhor.",
        scripture:
          "Porque primeiramente vos entreguei o que também recebi: que Cristo morreu por nossos pecados, segundo as Escrituras, e que foi sepultado, e que ressuscitou ao terceiro dia, segundo as Escrituras, e que foi visto...",
        reference: "1 Coríntios 15:3–5",
        body: "Deus não nos deixou em nosso pecado. O Filho eterno de Deus tornou-se homem — Jesus de Nazaré. Viveu a vida que nós deveríamos ter vivido. Morreu numa cruz romana, em nosso lugar, pelos nossos pecados. Foi sepultado. Ao terceiro dia, ressuscitou dos mortos, vencendo a própria morte. Ele é agora Rei dos reis, e um dia voltará. Este é O ÚNICO Evangelho — não há outro.",
        echoes: ["João 1:14; 3:16", "Romanos 5:6–8", "1 Pedro 3:18"],
      },
      {
        number: "04",
        title: "Sua resposta",
        subtitle: "Volte-se. Confie. Siga. Pertença.",
        scripture:
          "A saber: Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dos mortos, serás salvo.",
        reference: "Romanos 10:9",
        body: "O Evangelho pede uma resposta. Afaste-se do pecado. Confie em Jesus. Receba o Seu Espírito. Seja batizado. Siga-O. Pertença ao Seu povo — a Igreja. Esta não é uma decisão única; é uma vida inteira. E começa no momento em que você diz sim a Ele.",
        echoes: ["Marcos 1:14–15", "Atos 2:38–39", "João 1:12–13"],
      },
    ],
    prayer: {
      eyebrow: "Uma oração de resposta",
      heading: "Fale com Jesus agora mesmo.",
      intro:
        "Se você nunca disse sim a Jesus, ou se quer dizê-lo de novo hoje, aqui estão palavras simples que você pode orar. Não há nada de mágico nas palavras — Jesus ouve o coração por trás delas.",
      body: `Jesus,
eu tenho vivido para mim mesmo.
Eu pequei e não consigo me salvar.
Eu creio que Você morreu por mim e ressuscitou.
Hoje me afasto do meu pecado e me volto para Você.
Seja meu Senhor. Seja meu Salvador. Seja meu amigo.
Envie o Seu Espírito. Faça-me novo.
Eu Te pertenço. Conduza-me, e eu seguirei.
Amém.`,
    },
    next: {
      heading: "Se você orou isso — ou quer orar — faça estas quatro coisas esta semana.",
      steps: [
        { title: "Conte a alguém hoje", body: "Diga a um amigo cristão que você disse sim a Jesus. Se não conhece nenhum, escreva a um pastor perto de você. A vida cristã não é vivida sozinho." },
        { title: "Abra a Palavra", body: "Comece com o Evangelho de João. Temos um plano de 30 dias pronto para você. Leia um capítulo por dia e deixe Jesus se apresentar." },
        { title: "Encontre uma igreja local", body: "Batismo, Ceia do Senhor e a vida com o povo de Deus acontecem numa igreja real. Podemos ajudar você a encontrar uma — e conhecer um pastor real." },
        { title: "Comece a orar", body: "Fale com Deus como com um Pai. Ele é. Use o Pai-Nosso como guia. Temos um passo a passo para ajudar você a começar." },
      ],
    },
    cta: {
      readJohn: "Começar o plano João em 30 dias",
      learnPray: "Aprender a orar",
      findChurch: "Encontrar uma igreja local",
    },
  },

  fr: {
    meta: {
      pageEyebrow: "L'Évangile",
      pageTitle: "La meilleure nouvelle que le monde ait jamais entendue.",
      pageIntro:
        "Il n'y a qu'un seul Évangile. Deux mille ans de chrétiens de toute nation, langue et tradition ont vécu et sont morts pour la même vérité simple et vivifiante au sujet de Jésus. La voici — en quatre brefs mouvements.",
      languageName: "French",
      nativeName: "Français",
      dir: "ltr",
    },
    movements: [
      {
        number: "01",
        title: "Dieu",
        subtitle: "Il t'a créé. Il t'aime. Il est bon.",
        scripture:
          "Au commencement, Dieu créa les cieux et la terre... Dieu vit tout ce qu'il avait fait, et voici, cela était très bon.",
        reference: "Genèse 1:1, 31",
        body: "Avant toute chose, il y a Dieu — le Père, le Fils et le Saint-Esprit — qui a toujours existé dans un amour parfait. Il a fait l'univers, et il t'a fait. Tu as été créé exprès, par Quelqu'un qui est bon. Tu n'as jamais été fait pour vivre par toi-même ni pour toi-même. Tu as été fait pour Lui.",
        echoes: ["Psaume 139:13–14", "Actes 17:24–28", "1 Jean 4:8"],
      },
      {
        number: "02",
        title: "Notre péché",
        subtitle: "Quelque chose s'est brisé — dans le monde et en nous.",
        scripture:
          "Car tous ont péché et sont privés de la gloire de Dieu... Car le salaire du péché, c'est la mort.",
        reference: "Romains 3:23 ; 6:23",
        body: "Depuis le commencement, l'humanité a choisi de vivre comme si nous étions Dieu, au lieu de Lui faire confiance. La Bible appelle cela le péché. Ce n'est pas seulement de la mauvaise conduite — c'est une relation brisée. Le péché nous sépare de Dieu, brise notre communion les uns avec les autres, et conduit à la mort. Nous ne pouvons pas y remédier en faisant plus d'efforts ou en étant plus religieux. Nous avons besoin d'être sauvés.",
        echoes: ["Genèse 3:1–13", "Ésaïe 59:1–2", "Éphésiens 2:1–3"],
      },
      {
        number: "03",
        title: "Jésus",
        subtitle: "Il est venu. Il est mort. Il est ressuscité. Il est Seigneur.",
        scripture:
          "Je vous ai enseigné avant tout, comme je l'avais aussi reçu, que Christ est mort pour nos péchés, selon les Écritures ; qu'il a été enseveli, et qu'il est ressuscité le troisième jour, selon les Écritures, et qu'il est apparu...",
        reference: "1 Corinthiens 15:3–5",
        body: "Dieu ne nous a pas laissés dans notre péché. Le Fils éternel de Dieu est devenu homme — Jésus de Nazareth. Il a vécu la vie que nous aurions dû vivre. Il est mort sur une croix romaine, à notre place, pour nos péchés. Il a été enseveli. Le troisième jour, il est ressuscité d'entre les morts, vainquant la mort elle-même. Il est maintenant Roi des rois, et un jour il reviendra. C'est l'UNIQUE Évangile — il n'y en a pas d'autre.",
        echoes: ["Jean 1:14 ; 3:16", "Romains 5:6–8", "1 Pierre 3:18"],
      },
      {
        number: "04",
        title: "Ta réponse",
        subtitle: "Reviens. Crois. Suis. Appartiens.",
        scripture:
          "Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l'a ressuscité des morts, tu seras sauvé.",
        reference: "Romains 10:9",
        body: "L'Évangile demande une réponse. Détourne-toi du péché. Aie confiance en Jésus. Reçois son Esprit. Sois baptisé. Suis-le. Appartiens à son peuple — l'Église. Ce n'est pas une décision unique ; c'est toute une vie. Et cela commence à l'instant où tu lui dis oui.",
        echoes: ["Marc 1:14–15", "Actes 2:38–39", "Jean 1:12–13"],
      },
    ],
    prayer: {
      eyebrow: "Une prière de réponse",
      heading: "Parle à Jésus maintenant.",
      intro:
        "Si tu n'as jamais dit oui à Jésus, ou si tu veux le redire aujourd'hui, voici de simples mots que tu peux prier. Il n'y a rien de magique dans les mots — Jésus entend le cœur derrière eux.",
      body: `Jésus,
j'ai vécu pour moi-même.
J'ai péché, et je ne peux pas me sauver.
Je crois que tu es mort pour moi et que tu es ressuscité.
Aujourd'hui je me détourne de mon péché et je me tourne vers toi.
Sois mon Seigneur. Sois mon Sauveur. Sois mon ami.
Envoie ton Esprit. Fais-moi nouveau.
Je t'appartiens. Conduis-moi, et je te suivrai.
Amen.`,
    },
    next: {
      heading: "Si tu as prié cela — ou si tu veux le faire — fais ces quatre choses cette semaine.",
      steps: [
        { title: "Parle à quelqu'un aujourd'hui", body: "Dis à un ami chrétien que tu as dit oui à Jésus. Si tu n'en connais aucun, écris à un pasteur près de chez toi. La vie chrétienne ne se vit pas seul." },
        { title: "Ouvre la Parole", body: "Commence par l'Évangile de Jean. Nous avons un plan de 30 jours prêt pour toi. Lis un chapitre par jour et laisse Jésus se présenter." },
        { title: "Trouve une église locale", body: "Le baptême, la Sainte-Cène et la vie avec le peuple de Dieu se vivent dans une vraie église. Nous pouvons t'aider à en trouver une — et à rencontrer un vrai pasteur." },
        { title: "Commence à prier", body: "Parle à Dieu comme à un Père. Il l'est. Utilise le Notre Père comme guide. Nous avons un parcours pour t'aider à commencer." },
      ],
    },
    cta: {
      readJohn: "Commencer le plan Jean en 30 jours",
      learnPray: "Apprendre à prier",
      findChurch: "Trouver une église locale",
    },
  },

  sw: {
    meta: {
      pageEyebrow: "Injili",
      pageTitle: "Habari njema iliyo bora kuliko zote ulimwengu umewahi kusikia.",
      pageIntro:
        "Kuna Injili moja tu. Miaka elfu mbili ya Wakristo wa kila taifa, lugha na utamaduni wameishi na kufa kwa ajili ya ukweli ule ule rahisi na wenye uzima kuhusu Yesu. Hii hapa — katika sehemu nne fupi.",
      languageName: "Swahili",
      nativeName: "Kiswahili",
      dir: "ltr",
    },
    movements: [
      {
        number: "01",
        title: "Mungu",
        subtitle: "Yeye alikuumba. Yeye anakupenda. Yeye ni mwema.",
        scripture:
          "Hapo mwanzo Mungu aliziumba mbingu na nchi... Mungu akaona kila kitu alichokifanya, na tazama, kilikuwa chema sana.",
        reference: "Mwanzo 1:1, 31",
        body: "Kabla ya kitu kingine chochote, kuna Mungu — Baba, Mwana, na Roho Mtakatifu — ambaye amekuwepo daima katika upendo mkamilifu. Yeye aliuumba ulimwengu, na akakuumba wewe. Uliumbwa kwa kusudi, na Yeye aliye mwema. Hukuumbwa kuishi kwa ajili yako mwenyewe au peke yako. Uliumbwa kwa ajili yake.",
        echoes: ["Zaburi 139:13–14", "Matendo 17:24–28", "1 Yohana 4:8"],
      },
      {
        number: "02",
        title: "Dhambi yetu",
        subtitle: "Kuna kitu kilivunjika — ulimwenguni na ndani yetu.",
        scripture:
          "Kwa sababu wote wamefanya dhambi, na kupungukiwa na utukufu wa Mungu... Kwa maana mshahara wa dhambi ni mauti.",
        reference: "Warumi 3:23; 6:23",
        body: "Tangu mwanzo, wanadamu wamechagua kuishi kana kwamba sisi ni Mungu badala ya kumtegemea Yeye. Biblia inaita hili dhambi. Si tabia mbaya tu — ni uhusiano uliovunjika. Dhambi inatutenganisha na Mungu, inavunja ushirika wetu na wengine, na huishia katika mauti. Hatuwezi kurekebisha hili kwa kujitahidi zaidi au kwa kuwa wa dini zaidi. Tunahitaji kuokolewa.",
        echoes: ["Mwanzo 3:1–13", "Isaya 59:1–2", "Waefeso 2:1–3"],
      },
      {
        number: "03",
        title: "Yesu",
        subtitle: "Alikuja. Alikufa. Alifufuka. Yeye ni Bwana.",
        scripture:
          "Kwa maana naliwatolea ninyi hapo mwanzo yale niliyoyapokea mimi mwenyewe, ya kuwa Kristo alikufa kwa ajili ya dhambi zetu, kama maandiko yasemavyo; na ya kuwa alizikwa; na ya kuwa alifufuka siku ya tatu, kama maandiko yasemavyo; na ya kuwa alimtokea...",
        reference: "1 Wakorintho 15:3–5",
        body: "Mungu hakutuacha katika dhambi yetu. Mwana wa milele wa Mungu akawa mwanadamu — Yesu wa Nazareti. Aliishi maisha tuliyopaswa kuyaishi. Akafa msalabani wa Kirumi, mahali petu, kwa ajili ya dhambi zetu. Alizikwa. Siku ya tatu, akafufuka kutoka kwa wafu, akiishinda mauti yenyewe. Sasa Yeye ni Mfalme wa wafalme, na siku moja atarudi. Hii ndiyo Injili MOJA — hakuna nyingine.",
        echoes: ["Yohana 1:14; 3:16", "Warumi 5:6–8", "1 Petro 3:18"],
      },
      {
        number: "04",
        title: "Jibu lako",
        subtitle: "Geuka. Amini. Fuata. Kuwa wa Mwili wake.",
        scripture:
          "Kwa sababu, ukimkiri Yesu kwa kinywa chako ya kuwa ni Bwana, na kuamini moyoni mwako ya kuwa Mungu alimfufua katika wafu, utaokoka.",
        reference: "Warumi 10:9",
        body: "Injili inahitaji jibu. Geuka kutoka dhambini. Mtegemee Yesu. Pokea Roho wake. Ubatizwe. Mfuate. Uwe sehemu ya watu wake — Kanisa. Hili si uamuzi wa mara moja; ni maisha yote. Na huanza wakati huo huo unaposema ndiyo Kwake.",
        echoes: ["Marko 1:14–15", "Matendo 2:38–39", "Yohana 1:12–13"],
      },
    ],
    prayer: {
      eyebrow: "Sala ya jibu",
      heading: "Zungumza na Yesu sasa hivi.",
      intro:
        "Kama hujawahi kusema ndiyo kwa Yesu, au unataka kusema tena leo, hapa kuna maneno rahisi unayoweza kuyaomba. Hakuna uchawi katika maneno yenyewe — Yesu husikia moyo unaoyaongea.",
      body: `Yesu,
nimeishi kwa ajili yangu mwenyewe.
Nimefanya dhambi, na siwezi kujiokoa mwenyewe.
Naamini ulikufa kwa ajili yangu na ukafufuka.
Leo nageuka kutoka kwa dhambi yangu, na ninakugeukia Wewe.
Uwe Bwana wangu. Uwe Mwokozi wangu. Uwe rafiki yangu.
Tuma Roho wako. Unifanye mpya.
Mimi ni wako sasa. Niongoze, nami nitafuata.
Amina.`,
    },
    next: {
      heading: "Kama uliomba hivi — au unataka kuomba — fanya mambo manne haya juma hili.",
      steps: [
        { title: "Mwambie mtu leo", body: "Mwambie rafiki mmoja Mkristo kwamba ulisema ndiyo kwa Yesu. Kama humjui mmoja, andika kwa mchungaji wa karibu nawe. Maisha ya Kikristo hayaishi peke yake." },
        { title: "Fungua Neno", body: "Anza na Injili ya Yohana. Tuna mpango wa siku 30 tayari kwa ajili yako. Soma sura moja kwa siku, na umwache Yesu mwenyewe ajitambulishe." },
        { title: "Tafuta kanisa la mtaa", body: "Ubatizo, Meza ya Bwana, na maisha pamoja na watu wa Mungu hutokea ndani ya kanisa halisi. Tunaweza kukusaidia kupata mojawapo — na kukutana na mchungaji halisi." },
        { title: "Anza kuomba", body: "Zungumza na Mungu kama na Baba. Yeye ni. Tumia Sala ya Bwana kama mwongozo. Tuna mwongozo wa kukusaidia kuanza." },
      ],
    },
    cta: {
      readJohn: "Anza mpango wa Yohana siku 30",
      learnPray: "Jifunze kuomba",
      findChurch: "Tafuta kanisa la mtaa",
    },
  },

  hi: {
    meta: {
      pageEyebrow: "सुसमाचार",
      pageTitle: "सबसे अच्छी खबर जो दुनिया ने कभी सुनी।",
      pageIntro:
        "केवल एक ही सुसमाचार है। दो हजार वर्षों से हर राष्ट्र, भाषा और परंपरा के मसीही उसी सरल, जीवनदायी सत्य के लिए जीते और मरते आए हैं — यीशु के बारे में। यह रहा — चार छोटे चरणों में।",
      languageName: "Hindi",
      nativeName: "हिन्दी",
      dir: "ltr",
    },
    movements: [
      {
        number: "०१",
        title: "परमेश्वर",
        subtitle: "उसने तुम्हें बनाया। वह तुमसे प्रेम करता है। वह भला है।",
        scripture:
          "आदि में परमेश्वर ने आकाश और पृथ्वी की सृष्टि की... और परमेश्वर ने जो कुछ बनाया था, सब को देखा, तो क्या देखा, कि वह बहुत ही अच्छा है।",
        reference: "उत्पत्ति 1:1, 31",
        body: "किसी भी चीज़ से पहले, परमेश्वर है — पिता, पुत्र और पवित्र आत्मा — जो सदा से सिद्ध प्रेम में रहे हैं। उसने ब्रह्मांड बनाया, और उसने तुम्हें बनाया। तुम उद्देश्य के साथ बनाए गए हो, उसके द्वारा जो भला है। तुम कभी अपने लिए या अकेले जीने के लिए नहीं बनाए गए थे। तुम उसके लिए बनाए गए हो।",
        echoes: ["भजन संहिता 139:13–14", "प्रेरितों के काम 17:24–28", "1 यूहन्ना 4:8"],
      },
      {
        number: "०२",
        title: "हमारा पाप",
        subtitle: "कुछ टूट गया — दुनिया में, और हमारे भीतर।",
        scripture:
          "क्योंकि सबने पाप किया है और परमेश्वर की महिमा से रहित हैं... क्योंकि पाप की मजदूरी मृत्यु है।",
        reference: "रोमियों 3:23; 6:23",
        body: "शुरू से ही, मनुष्यजाति ने परमेश्वर पर भरोसा करने के बजाय वैसे जीना चुना मानो हम परमेश्वर हों। बाइबल इसे पाप कहती है। यह केवल बुरा व्यवहार नहीं है — यह एक टूटा हुआ रिश्ता है। पाप हमें परमेश्वर से अलग करता है, हमारे आपस के संगति को तोड़ता है, और मृत्यु में समाप्त होता है। हम अधिक प्रयास करके या अधिक धार्मिक होकर इसे ठीक नहीं कर सकते। हमें बचाए जाने की आवश्यकता है।",
        echoes: ["उत्पत्ति 3:1–13", "यशायाह 59:1–2", "इफिसियों 2:1–3"],
      },
      {
        number: "०३",
        title: "यीशु",
        subtitle: "वह आया। वह मरा। वह जी उठा। वह प्रभु है।",
        scripture:
          "मैंने मुख्य बातें जो मुझे पहुँचीं, वह तुम्हें पहुँचा दीं, कि पवित्रशास्त्र के अनुसार यीशु मसीह हमारे पापों के लिए मरा, और गाड़ा गया; और पवित्रशास्त्र के अनुसार तीसरे दिन जी उठा, और कैफा को, फिर बारहों को दिखाई दिया।",
        reference: "1 कुरिन्थियों 15:3–5",
        body: "परमेश्वर ने हमें हमारे पाप में नहीं छोड़ा। परमेश्वर का अनादि पुत्र मनुष्य बना — नासरत का यीशु। उसने वह जीवन जिया जो हमें जीना चाहिए था। उसने रोमी क्रूस पर, हमारे स्थान पर, हमारे पापों के लिए, अपनी जान दे दी। उसे गाड़ा गया। तीसरे दिन, वह मरे हुओं में से जी उठा, स्वयं मृत्यु पर विजय पाई। अब वह राजाओं का राजा है, और एक दिन फिर लौटेगा। यही एकमात्र सुसमाचार है — कोई दूसरा नहीं।",
        echoes: ["यूहन्ना 1:14; 3:16", "रोमियों 5:6–8", "1 पतरस 3:18"],
      },
      {
        number: "०४",
        title: "तुम्हारा उत्तर",
        subtitle: "लौटो। भरोसा करो। पीछे चलो। उसके लोगों के बनो।",
        scripture:
          "कि यदि तू अपने मुँह से यीशु को प्रभु जानकर अंगीकार करे और अपने मन से विश्वास करे कि परमेश्वर ने उसे मरे हुओं में से जिलाया, तो तू निश्चय उद्धार पाएगा।",
        reference: "रोमियों 10:9",
        body: "सुसमाचार उत्तर माँगता है। पाप से लौटो। यीशु पर भरोसा करो। उसकी आत्मा को ग्रहण करो। बपतिस्मा लो। उसके पीछे चलो। उसके लोगों के बनो — कलीसिया के। यह एक बार का निर्णय नहीं है; यह पूरा जीवन है। और यह उसी क्षण से शुरू होता है जब तुम उसे हाँ कहते हो।",
        echoes: ["मरकुस 1:14–15", "प्रेरितों के काम 2:38–39", "यूहन्ना 1:12–13"],
      },
    ],
    prayer: {
      eyebrow: "उत्तर की प्रार्थना",
      heading: "अभी यीशु से बात करो।",
      intro:
        "यदि तुमने कभी यीशु को हाँ नहीं कहा, या आज फिर कहना चाहते हो, तो यहाँ सरल शब्द हैं जिनसे तुम प्रार्थना कर सकते हो। शब्दों में कोई जादू नहीं है — यीशु उनके पीछे का हृदय सुनता है।",
      body: `यीशु,
मैं अपने लिए जीता रहा हूँ।
मैंने पाप किया है, और मैं स्वयं को नहीं बचा सकता।
मैं विश्वास करता हूँ कि तू मेरे लिए मरा और जी उठा।
आज मैं अपने पाप से मुड़ता हूँ और तेरी ओर मुड़ता हूँ।
तू मेरा प्रभु बन। तू मेरा उद्धारकर्ता बन। तू मेरा मित्र बन।
अपनी आत्मा भेज। मुझे नया बना।
मैं अब तेरा हूँ। मेरी अगुवाई कर, और मैं पीछे चलूँगा।
आमीन।`,
    },
    next: {
      heading: "यदि तुमने यह प्रार्थना की — या करना चाहते हो — तो इस सप्ताह ये चार काम करो।",
      steps: [
        { title: "आज किसी को बताओ", body: "किसी एक मसीही मित्र को बताओ कि तुमने यीशु को हाँ कहा। यदि तुम किसी को नहीं जानते, तो पास के किसी पास्टर को लिखो। मसीही जीवन अकेले नहीं जिया जाता।" },
        { title: "वचन को खोलो", body: "यूहन्ना के सुसमाचार से आरंभ करो। हमारे पास तुम्हारे लिए 30 दिन की योजना तैयार है। एक अध्याय प्रतिदिन पढ़ो और यीशु को स्वयं अपना परिचय देने दो।" },
        { title: "एक स्थानीय कलीसिया खोजो", body: "बपतिस्मा, प्रभु-भोज, और परमेश्वर के लोगों के साथ जीवन एक वास्तविक कलीसिया में होता है। हम तुम्हें एक खोजने में सहायता कर सकते हैं — और एक वास्तविक पास्टर से मिलवाएँगे।" },
        { title: "प्रार्थना करना आरंभ करो", body: "परमेश्वर से एक पिता की तरह बात करो। वह है। प्रभु की प्रार्थना को मार्गदर्शन के रूप में उपयोग करो। हमारे पास तुम्हारी सहायता के लिए एक पथ है।" },
      ],
    },
    cta: {
      readJohn: "यूहन्ना 30-दिन की योजना आरंभ करें",
      learnPray: "प्रार्थना करना सीखें",
      findChurch: "स्थानीय कलीसिया खोजें",
    },
  },

  ar: {
    meta: {
      pageEyebrow: "الإنجيل",
      pageTitle: "أعظم خبر سار سمعه العالم على الإطلاق.",
      pageIntro:
        "هناك إنجيل واحد فقط. على مدى ألفي عام، عاش المسيحيون من كل أمة ولغة وتقليد وماتوا من أجل الحقيقة ذاتها البسيطة المُحيية عن يسوع. ها هو — في أربع حركات قصيرة.",
      languageName: "Arabic",
      nativeName: "العربية",
      dir: "rtl",
    },
    movements: [
      {
        number: "٠١",
        title: "الله",
        subtitle: "هو خلقك. هو يحبك. هو صالح.",
        scripture:
          "في البدء خلق الله السماوات والأرض... ورأى الله كل ما عمله، وإذا هو حسن جدا.",
        reference: "تكوين ١:١، ٣١",
        body: "قبل أي شيء آخر، يوجد الله — الآب والابن والروح القدس — الذي ظل دائمًا في محبة كاملة. لقد صنع الكون، وصنعك. لقد خُلِقتَ بقصد، من يدِ من هو صالح. لم تُخلق أبدًا لتحيا لنفسك أو وحدك. خُلِقتَ من أجله.",
        echoes: ["مزمور ١٣٩:١٣–١٤", "أعمال ١٧:٢٤–٢٨", "١ يوحنا ٤:٨"],
      },
      {
        number: "٠٢",
        title: "خطيتنا",
        subtitle: "شيء انكسر — في العالم، وفينا.",
        scripture:
          "إذ الجميع أخطأوا وأعوزهم مجد الله... لأن أجرة الخطية هي موت.",
        reference: "رومية ٣:٢٣؛ ٦:٢٣",
        body: "منذ البداية، اختار الإنسان أن يحيا كأنه هو الله، بدلًا من أن يتكل عليه. الكتاب المقدس يدعو هذا خطية. ليست مجرد سلوك سيئ — بل علاقة مكسورة. الخطية تفصلنا عن الله، وتحطم شركتنا بعضنا مع بعض، وتنتهي بالموت. لا نقدر أن نُصلِح هذا بمزيد من المحاولة أو بمزيد من التديّن. نحتاج إلى أن نُنقَذ.",
        echoes: ["تكوين ٣:١–١٣", "إشعياء ٥٩:١–٢", "أفسس ٢:١–٣"],
      },
      {
        number: "٠٣",
        title: "يسوع",
        subtitle: "أتى. مات. قام. هو الرب.",
        scripture:
          "فإنني سلمت إليكم في الأول ما قبلته أنا أيضا: أن المسيح مات من أجل خطايانا حسب الكتب، وأنه دفن، وأنه قام في اليوم الثالث حسب الكتب، وأنه ظهر...",
        reference: "١ كورنثوس ١٥:٣–٥",
        body: "لم يتركنا الله في خطيتنا. ابن الله الأزلي صار إنسانًا — يسوع الناصري. عاش الحياة التي كان ينبغي أن نحياها. مات على صليب روماني، في موضعنا، من أجل خطايانا. دُفِنَ. في اليوم الثالث، قام من بين الأموات، غالبًا الموت ذاته. وهو الآن ملك الملوك، وذات يوم سوف يعود. هذا هو الإنجيل الواحد — لا يوجد إنجيل آخر.",
        echoes: ["يوحنا ١:١٤؛ ٣:١٦", "رومية ٥:٦–٨", "١ بطرس ٣:١٨"],
      },
      {
        number: "٠٤",
        title: "ردُّك",
        subtitle: "تُب. ثِق. اتبع. انتمِ.",
        scripture:
          "إنك إن اعترفت بفمك بالرب يسوع، وآمنت بقلبك أن الله أقامه من الأموات، خلصت.",
        reference: "رومية ١٠:٩",
        body: "الإنجيل يطلب ردًّا. تب عن الخطية. ثق بيسوع. اقبل روحه. اعتمد. اتبعه. انتمِ إلى شعبه — الكنيسة. هذا ليس قرارًا لمرة واحدة؛ بل هو حياة كاملة. وتبدأ في اللحظة التي تقول له فيها نعم.",
        echoes: ["مرقس ١:١٤–١٥", "أعمال ٢:٣٨–٣٩", "يوحنا ١:١٢–١٣"],
      },
    ],
    prayer: {
      eyebrow: "صلاة استجابة",
      heading: "تكلَّم مع يسوع الآن.",
      intro:
        "إن لم تقل ليسوع نعم من قبل، أو أردت أن تقولها مرة أخرى اليوم، فهذه كلمات بسيطة يمكنك أن تصلي بها. ليس في الكلمات سحر — يسوع يسمع القلب الذي خلفها.",
      body: `يا يسوع،
عشتُ لنفسي.
أخطأتُ، ولا أقدر أن أُخلِّص نفسي.
أؤمن أنك متَّ من أجلي وقمت.
اليوم أتوب عن خطيتي وأرجع إليك.
كنْ ربي. كنْ مخلصي. كنْ صديقي.
أرسل روحك. اجعلني جديدًا.
أنا لكَ الآن. قُدْني، وأنا أتبعك.
آمين.`,
    },
    next: {
      heading: "إن صليت هذه الصلاة — أو أردت أن تصلي — فافعل هذه الأمور الأربعة هذا الأسبوع.",
      steps: [
        { title: "أخبر أحدًا اليوم", body: "أخبر صديقًا مسيحيًا واحدًا أنك قلت نعم ليسوع. إن لم تعرف أحدًا، فاكتب إلى راعٍ قريب منك. الحياة المسيحية لا تُحيا منفردًا." },
        { title: "افتح الكلمة", body: "ابدأ بإنجيل يوحنا. لدينا خطة لثلاثين يومًا جاهزة لك. اقرأ أصحاحًا في اليوم، ودعْ يسوع يُعرِّفك بنفسه." },
        { title: "ابحث عن كنيسة محلية", body: "المعمودية، والعشاء الرباني، والحياة مع شعب الله تحدث في كنيسة حقيقية. نستطيع أن نساعدك على إيجاد واحدة — وأن تلتقي براعٍ حقيقي." },
        { title: "ابدأ بالصلاة", body: "تحدَّث إلى الله كأبٍ. هو كذلك. استخدم الصلاة الربية مرشدًا. لدينا جولة تساعدك على البدء." },
      ],
    },
    cta: {
      readJohn: "ابدأ خطة يوحنا في ٣٠ يومًا",
      learnPray: "تعلَّم كيف تصلي",
      findChurch: "ابحث عن كنيسة محلية",
    },
  },
};

export const localeOrder: LocaleCode[] = ["en", "es", "pt", "fr", "sw", "hi", "ar"];
