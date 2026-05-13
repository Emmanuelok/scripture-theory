import type { LocaleCode } from "@/data/gospel-i18n";

export type PrayerLocale = {
  pageEyebrow: string;
  pageTitle: string;
  pageIntro: string;
  modes: { lords: string; acts: string; world: string };
  lords: {
    headingScripture: string;
    headingScriptureRef: string;
    headingTagline: string;
    prayNowLabel: string;
    lines: { phrase: string; meditation: string; prompt: string }[];
  };
  acts: {
    intro: string;
    movements: {
      letter: string;
      word: string;
      body: string;
      scripture: string;
      reference: string;
    }[];
  };
  closing: {
    quote: string;
    ref: string;
  };
};

const en: PrayerLocale = {
  pageEyebrow: "Pray",
  pageTitle: "Talk to the Father, the way Jesus taught.",
  pageIntro:
    "You do not need a special voice, a special place, or fancy words. You need a Father — and you have one. Walk through the prayer Jesus gave us. Use a simple ancient pattern. Pray for a different region of the world each day.",
  modes: { lords: "The Lord's Prayer", acts: "A · C · T · S", world: "Pray for the world" },
  lords: {
    headingScripture: "\"Pray then like this...\" — Jesus",
    headingScriptureRef: "Matthew 6:9–13",
    headingTagline:
      "He didn't just tell us to pray. He taught us how. Walk through it slowly, one line at a time — and let it become your own.",
    prayNowLabel: "Pray now:",
    lines: [
      { phrase: "Our Father in heaven,", meditation: "We are not orphans. The God who made the universe is your Father. We do not begin by demanding — we begin by belonging.", prompt: "Tell God He is your Father. Thank Him that you are not alone today." },
      { phrase: "hallowed be your name.", meditation: "Before our needs, His glory. May His name be honored in the earth, in our city, and in our own life today.", prompt: "Name one place in your life where God is not yet honored. Ask Him to be honored there." },
      { phrase: "Your kingdom come,", meditation: "We are asking for the King's rule to come — into our home, our work, our nation, our heart.", prompt: "Pray for one situation where evil seems to be winning. Ask the King to come." },
      { phrase: "your will be done, on earth as it is in heaven.", meditation: "Heaven is where God's will is done freely and joyfully. We are praying earth would look more like heaven today.", prompt: "Surrender one thing you have been trying to control. Say: Your will, not mine." },
      { phrase: "Give us this day our daily bread.", meditation: "We ask for today's bread, not next year's. Trust is rebuilt one day at a time.", prompt: "Ask the Father for what you actually need today — food, work, wisdom, courage, joy." },
      { phrase: "And forgive us our debts,", meditation: "Bring your sins into the light. He already knows them; He longs to forgive them.", prompt: "Name your sins to God specifically. Receive His mercy through Jesus." },
      { phrase: "as we also have forgiven our debtors.", meditation: "Forgiveness is the air the forgiven breathe. Refusing to forgive blocks our own lungs.", prompt: "Who do you need to forgive today? Begin — even with a single sentence." },
      { phrase: "And lead us not into temptation,", meditation: "We are weak. We need a Father who steers us away from the places where we fall.", prompt: "Name one temptation you face this week. Ask the Father to lead you around it." },
      { phrase: "but deliver us from evil.", meditation: "There is a real enemy. We are not strong enough on our own — and we don't have to be.", prompt: "Ask Jesus, the Stronger One, for deliverance — where you have felt powerless." },
      { phrase: "For yours is the kingdom and the power and the glory, forever. Amen.", meditation: "We end where we began: with Him. The kingdom, the power, and the glory are not ours — and that is good news.", prompt: "Close in praise. Tell Him He is enough." },
    ],
  },
  acts: {
    intro:
      "A simple, ancient pattern that helps anyone pray with shape: Adoration, Confession, Thanksgiving, Supplication.",
    movements: [
      { letter: "A", word: "Adoration", body: "Begin by telling God who He is and praising Him for it. Not what He has done for you yet — who He is.", scripture: "Holy, holy, holy is the Lord of hosts; the whole earth is full of his glory!", reference: "Isaiah 6:3" },
      { letter: "C", word: "Confession", body: "Name your sins. Specifically. He is faithful and just to forgive — that is His character, not your achievement.", scripture: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.", reference: "1 John 1:9" },
      { letter: "T", word: "Thanksgiving", body: "Now count the gifts. Today's. This week's. From this season. Gratitude reorders the soul.", scripture: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.", reference: "1 Thessalonians 5:18" },
      { letter: "S", word: "Supplication", body: "Now ask. For yourself, for your people, for the nations. The Father invites it.", scripture: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.", reference: "Philippians 4:6" },
    ],
  },
  closing: { quote: "Lord, teach us to pray.", ref: "Luke 11:1" },
};

const es: PrayerLocale = {
  pageEyebrow: "Ora",
  pageTitle: "Habla con el Padre, como Jesús nos enseñó.",
  pageIntro:
    "No necesitas una voz especial, un lugar especial ni palabras elegantes. Necesitas un Padre — y lo tienes. Camina por la oración que Jesús nos dio. Usa un patrón antiguo y sencillo. Ora por una región distinta del mundo cada día.",
  modes: { lords: "El Padre Nuestro", acts: "A · C · A · S", world: "Ora por el mundo" },
  lords: {
    headingScripture: "\"Oren así...\" — Jesús",
    headingScriptureRef: "Mateo 6:9–13",
    headingTagline:
      "Él no sólo nos dijo que oráramos. Nos enseñó cómo. Recórrela lentamente, línea por línea — y haz que sea tuya.",
    prayNowLabel: "Ora ahora:",
    lines: [
      { phrase: "Padre nuestro que estás en los cielos,", meditation: "No somos huérfanos. El Dios que hizo el universo es tu Padre. No comenzamos exigiendo — comenzamos perteneciendo.", prompt: "Dile a Dios que es tu Padre. Agradécele que hoy no estás solo." },
      { phrase: "santificado sea tu nombre.", meditation: "Antes que nuestras necesidades, Su gloria. Que Su nombre sea honrado en la tierra, en nuestra ciudad y en nuestra propia vida hoy.", prompt: "Nombra un lugar de tu vida donde Dios aún no es honrado. Pide que lo sea allí." },
      { phrase: "Venga tu reino,", meditation: "Pedimos que el reinado del Rey venga — a nuestra casa, a nuestro trabajo, a nuestra nación, a nuestro corazón.", prompt: "Ora por una situación donde el mal parece estar ganando. Pide que venga el Rey." },
      { phrase: "hágase tu voluntad, en la tierra como en el cielo.", meditation: "El cielo es donde la voluntad de Dios se hace con libertad y gozo. Estamos orando para que la tierra se parezca más al cielo hoy.", prompt: "Entrega algo que has intentado controlar. Di: Tu voluntad, no la mía." },
      { phrase: "Danos hoy nuestro pan de cada día.", meditation: "Pedimos el pan de hoy, no el del próximo año. La confianza se reconstruye un día a la vez.", prompt: "Pide al Padre lo que realmente necesitas hoy — comida, trabajo, sabiduría, valor, gozo." },
      { phrase: "Y perdona nuestras deudas,", meditation: "Lleva tus pecados a la luz. Él ya los conoce; anhela perdonarlos.", prompt: "Nombra tus pecados a Dios concretamente. Recibe Su misericordia por medio de Jesús." },
      { phrase: "como también nosotros perdonamos a nuestros deudores.", meditation: "El perdón es el aire que respira el perdonado. Negarnos a perdonar tapona nuestros propios pulmones.", prompt: "¿A quién necesitas perdonar hoy? Comienza — aunque sea con una sola frase." },
      { phrase: "Y no nos metas en tentación,", meditation: "Somos débiles. Necesitamos un Padre que nos aparte de los lugares donde caemos.", prompt: "Nombra una tentación que enfrentas esta semana. Pídele al Padre que te dirija alrededor de ella." },
      { phrase: "mas líbranos del mal.", meditation: "Hay un verdadero enemigo. No somos lo bastante fuertes por nosotros mismos — y no tenemos que serlo.", prompt: "Pide a Jesús, el Más Fuerte, que te libre — donde te has sentido sin poder." },
      { phrase: "Porque tuyo es el reino, el poder y la gloria, por los siglos. Amén.", meditation: "Terminamos donde empezamos: con Él. El reino, el poder y la gloria no son nuestros — y esa es una buena noticia.", prompt: "Cierra con alabanza. Dile que Él es suficiente." },
    ],
  },
  acts: {
    intro:
      "Un patrón antiguo y sencillo que ayuda a cualquiera a orar con forma: Adoración, Confesión, Acción de gracias, Súplica.",
    movements: [
      { letter: "A", word: "Adoración", body: "Comienza diciéndole a Dios quién es Él y alabándolo por ello. No por lo que ha hecho por ti todavía — sino por quién es.", scripture: "Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria.", reference: "Isaías 6:3" },
      { letter: "C", word: "Confesión", body: "Nombra tus pecados. Concretamente. Él es fiel y justo para perdonar — ése es Su carácter, no tu logro.", scripture: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.", reference: "1 Juan 1:9" },
      { letter: "A", word: "Acción de gracias", body: "Ahora cuenta los regalos. Los de hoy. Los de esta semana. Los de esta temporada. La gratitud reordena el alma.", scripture: "Dad gracias en todo, porque ésta es la voluntad de Dios para con vosotros en Cristo Jesús.", reference: "1 Tesalonicenses 5:18" },
      { letter: "S", word: "Súplica", body: "Ahora pide. Por ti, por tu gente, por las naciones. El Padre lo invita.", scripture: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.", reference: "Filipenses 4:6" },
    ],
  },
  closing: { quote: "Señor, enséñanos a orar.", ref: "Lucas 11:1" },
};

const pt: PrayerLocale = {
  pageEyebrow: "Ore",
  pageTitle: "Fale com o Pai, do jeito que Jesus ensinou.",
  pageIntro:
    "Você não precisa de uma voz especial, um lugar especial, nem palavras sofisticadas. Você precisa de um Pai — e você tem um. Caminhe pela oração que Jesus nos deu. Use um padrão antigo e simples. Ore por uma região diferente do mundo a cada dia.",
  modes: { lords: "Pai-Nosso", acts: "A · C · A · S", world: "Ore pelo mundo" },
  lords: {
    headingScripture: "\"Orai assim...\" — Jesus",
    headingScriptureRef: "Mateus 6:9–13",
    headingTagline:
      "Ele não apenas nos disse para orar. Ele nos ensinou como. Caminhe devagar, linha por linha — e deixe a oração se tornar sua.",
    prayNowLabel: "Ore agora:",
    lines: [
      { phrase: "Pai nosso, que estás nos céus,", meditation: "Não somos órfãos. O Deus que fez o universo é o seu Pai. Não começamos exigindo — começamos pertencendo.", prompt: "Diga a Deus que Ele é o seu Pai. Agradeça por você não estar sozinho hoje." },
      { phrase: "santificado seja o teu nome.", meditation: "Antes das nossas necessidades, a Sua glória. Que o Seu nome seja honrado na terra, na nossa cidade e na nossa vida hoje.", prompt: "Nomeie um lugar da sua vida onde Deus ainda não é honrado. Peça que Ele seja honrado ali." },
      { phrase: "Venha o teu reino,", meditation: "Estamos pedindo que o reinado do Rei venha — ao nosso lar, ao nosso trabalho, à nossa nação, ao nosso coração.", prompt: "Ore por uma situação onde o mal parece estar vencendo. Peça que o Rei venha." },
      { phrase: "seja feita a tua vontade, assim na terra como no céu.", meditation: "O céu é onde a vontade de Deus é feita com liberdade e alegria. Estamos orando para que a terra se pareça mais com o céu hoje.", prompt: "Entregue uma coisa que você tem tentado controlar. Diga: a Tua vontade, não a minha." },
      { phrase: "O pão nosso de cada dia nos dá hoje.", meditation: "Pedimos o pão de hoje, não o do próximo ano. A confiança é reconstruída um dia de cada vez.", prompt: "Peça ao Pai o que você realmente precisa hoje — comida, trabalho, sabedoria, coragem, alegria." },
      { phrase: "E perdoa-nos as nossas dívidas,", meditation: "Traga os seus pecados à luz. Ele já os conhece; Ele anseia perdoá-los.", prompt: "Nomeie os seus pecados a Deus, especificamente. Receba a Sua misericórdia por meio de Jesus." },
      { phrase: "assim como nós perdoamos aos nossos devedores.", meditation: "O perdão é o ar que o perdoado respira. Recusar-se a perdoar entope nossos próprios pulmões.", prompt: "A quem você precisa perdoar hoje? Comece — mesmo que seja com uma única frase." },
      { phrase: "E não nos induzas à tentação,", meditation: "Somos fracos. Precisamos de um Pai que nos afaste dos lugares onde caímos.", prompt: "Nomeie uma tentação que você enfrenta esta semana. Peça ao Pai que o guie ao redor dela." },
      { phrase: "mas livra-nos do mal.", meditation: "Há um inimigo real. Não somos fortes o bastante sozinhos — e não precisamos ser.", prompt: "Peça a Jesus, o Mais Forte, livramento — onde você se sentiu sem força." },
      { phrase: "Porque teu é o reino, o poder e a glória, para sempre. Amém.", meditation: "Terminamos onde começamos: com Ele. O reino, o poder e a glória não são nossos — e isso é uma boa notícia.", prompt: "Termine em louvor. Diga a Ele que Ele é suficiente." },
    ],
  },
  acts: {
    intro:
      "Um padrão antigo e simples que ajuda qualquer pessoa a orar com forma: Adoração, Confissão, Ação de graças, Súplica.",
    movements: [
      { letter: "A", word: "Adoração", body: "Comece dizendo a Deus quem Ele é e louvando-O por isso. Não pelo que Ele fez por você ainda — mas por quem Ele é.", scripture: "Santo, santo, santo é o Senhor dos exércitos; toda a terra está cheia da sua glória.", reference: "Isaías 6:3" },
      { letter: "C", word: "Confissão", body: "Nomeie os seus pecados. Especificamente. Ele é fiel e justo para perdoar — esse é o caráter d'Ele, não a sua conquista.", scripture: "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.", reference: "1 João 1:9" },
      { letter: "A", word: "Ação de graças", body: "Agora conte os presentes. Os de hoje. Os desta semana. Os desta estação. A gratidão reordena a alma.", scripture: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reference: "1 Tessalonicenses 5:18" },
      { letter: "S", word: "Súplica", body: "Agora peça. Por você, pelo seu povo, pelas nações. O Pai convida.", scripture: "Não andeis ansiosos por coisa alguma; antes em tudo sejam os vossos pedidos conhecidos diante de Deus pela oração e súplica com ações de graças.", reference: "Filipenses 4:6" },
    ],
  },
  closing: { quote: "Senhor, ensina-nos a orar.", ref: "Lucas 11:1" },
};

const fr: PrayerLocale = {
  pageEyebrow: "Prie",
  pageTitle: "Parle au Père, comme Jésus l'a enseigné.",
  pageIntro:
    "Tu n'as pas besoin d'une voix particulière, d'un lieu particulier ni de mots savants. Tu as besoin d'un Père — et tu en as un. Parcours la prière que Jésus nous a donnée. Utilise un modèle ancien et simple. Prie chaque jour pour une région différente du monde.",
  modes: { lords: "Le Notre Père", acts: "A · C · R · S", world: "Prier pour le monde" },
  lords: {
    headingScripture: "« Voici donc comment vous devez prier... » — Jésus",
    headingScriptureRef: "Matthieu 6:9–13",
    headingTagline:
      "Il ne nous a pas seulement dit de prier. Il nous a appris comment. Parcours-la lentement, ligne par ligne — et fais-la tienne.",
    prayNowLabel: "Prie maintenant :",
    lines: [
      { phrase: "Notre Père qui es aux cieux,", meditation: "Nous ne sommes pas orphelins. Le Dieu qui a fait l'univers est ton Père. Nous ne commençons pas par exiger — nous commençons par appartenir.", prompt: "Dis à Dieu qu'Il est ton Père. Remercie-Le de ce que tu n'es pas seul aujourd'hui." },
      { phrase: "que ton nom soit sanctifié.", meditation: "Avant nos besoins, Sa gloire. Que Son nom soit honoré sur la terre, dans notre ville et dans notre propre vie aujourd'hui.", prompt: "Nomme un endroit de ta vie où Dieu n'est pas encore honoré. Demande qu'Il le soit là." },
      { phrase: "Que ton règne vienne,", meditation: "Nous demandons que le règne du Roi vienne — dans notre maison, notre travail, notre nation, notre cœur.", prompt: "Prie pour une situation où le mal semble gagner. Demande que le Roi vienne." },
      { phrase: "que ta volonté soit faite sur la terre comme au ciel.", meditation: "Le ciel est l'endroit où la volonté de Dieu est accomplie librement et joyeusement. Nous prions pour que la terre ressemble davantage au ciel aujourd'hui.", prompt: "Remets une chose que tu essaies de contrôler. Dis : Ta volonté, non la mienne." },
      { phrase: "Donne-nous aujourd'hui notre pain de ce jour.", meditation: "Nous demandons le pain d'aujourd'hui, non celui de l'an prochain. La confiance se reconstruit un jour à la fois.", prompt: "Demande au Père ce dont tu as vraiment besoin aujourd'hui — nourriture, travail, sagesse, courage, joie." },
      { phrase: "Pardonne-nous nos offenses,", meditation: "Apporte tes péchés à la lumière. Il les connaît déjà ; Il aspire à les pardonner.", prompt: "Nomme tes péchés à Dieu, précisément. Reçois Sa miséricorde par Jésus." },
      { phrase: "comme nous pardonnons aussi à ceux qui nous ont offensés.", meditation: "Le pardon est l'air que respire celui qui est pardonné. Refuser de pardonner bouche nos propres poumons.", prompt: "À qui dois-tu pardonner aujourd'hui ? Commence — même par une seule phrase." },
      { phrase: "Ne nous induis pas en tentation,", meditation: "Nous sommes faibles. Nous avons besoin d'un Père qui nous écarte des lieux où nous tombons.", prompt: "Nomme une tentation à laquelle tu fais face cette semaine. Demande au Père de t'en détourner." },
      { phrase: "mais délivre-nous du mal.", meditation: "Il y a un véritable ennemi. Nous ne sommes pas assez forts par nous-mêmes — et nous n'avons pas à l'être.", prompt: "Demande à Jésus, le Plus Fort, de te délivrer — là où tu t'es senti impuissant." },
      { phrase: "Car c'est à toi qu'appartiennent le règne, la puissance et la gloire, à jamais. Amen.", meditation: "Nous finissons là où nous avons commencé : avec Lui. Le règne, la puissance et la gloire ne sont pas à nous — et c'est une bonne nouvelle.", prompt: "Termine par la louange. Dis-Lui qu'Il suffit." },
    ],
  },
  acts: {
    intro:
      "Un modèle ancien et simple qui aide chacun à prier avec forme : Adoration, Confession, Reconnaissance, Supplication.",
    movements: [
      { letter: "A", word: "Adoration", body: "Commence par dire à Dieu qui Il est et loue-Le pour cela. Pas pour ce qu'Il a fait pour toi encore — mais pour qui Il est.", scripture: "Saint, saint, saint est l'Éternel des armées ! toute la terre est pleine de sa gloire !", reference: "Ésaïe 6:3" },
      { letter: "C", word: "Confession", body: "Nomme tes péchés. Précisément. Il est fidèle et juste pour pardonner — c'est Son caractère, non ton mérite.", scripture: "Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.", reference: "1 Jean 1:9" },
      { letter: "R", word: "Reconnaissance", body: "Maintenant compte les dons. Ceux d'aujourd'hui. Ceux de cette semaine. Ceux de cette saison. La reconnaissance réordonne l'âme.", scripture: "Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus-Christ.", reference: "1 Thessaloniciens 5:18" },
      { letter: "S", word: "Supplication", body: "Maintenant demande. Pour toi, pour les tiens, pour les nations. Le Père y invite.", scripture: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.", reference: "Philippiens 4:6" },
    ],
  },
  closing: { quote: "Seigneur, enseigne-nous à prier.", ref: "Luc 11:1" },
};

const sw: PrayerLocale = {
  pageEyebrow: "Omba",
  pageTitle: "Zungumza na Baba, kama Yesu alivyofundisha.",
  pageIntro:
    "Huhitaji sauti maalum, mahali maalum, wala maneno makubwa. Unahitaji Baba — na unaye. Tembea kupitia sala ambayo Yesu alitupa. Tumia mfumo wa kale na rahisi. Omba kwa eneo tofauti la dunia kila siku.",
  modes: { lords: "Sala ya Bwana", acts: "A · K · S · M", world: "Omba kwa ajili ya dunia" },
  lords: {
    headingScripture: "\"Basi ninyi salini hivi...\" — Yesu",
    headingScriptureRef: "Mathayo 6:9–13",
    headingTagline:
      "Hakutuambia tu kuwa tuombe. Alitufundisha jinsi. Tembea ndani yake polepole, mstari kwa mstari — na uifanye iwe yako.",
    prayNowLabel: "Omba sasa:",
    lines: [
      { phrase: "Baba yetu uliye mbinguni,", meditation: "Sisi si yatima. Mungu aliyeumba ulimwengu ni Baba yako. Hatuanzii kwa kudai — tunaanzia kwa kumiliki na kumilikiwa.", prompt: "Mwambie Mungu kwamba Yeye ni Baba yako. Mshukuru kwamba leo hauko peke yako." },
      { phrase: "jina lako litukuzwe.", meditation: "Kabla ya mahitaji yetu, utukufu wake. Jina lake litukuzwe duniani, katika mji wetu, na katika maisha yetu leo.", prompt: "Taja sehemu moja ya maisha yako ambapo Mungu bado hatukuzwi. Muombe atukuzwe huko." },
      { phrase: "Ufalme wako uje,", meditation: "Tunaomba utawala wa Mfalme uje — nyumbani kwetu, kazini kwetu, taifani kwetu, mioyoni mwetu.", prompt: "Omba kwa ajili ya hali moja ambayo uovu unaonekana kushinda. Muombe Mfalme aje." },
      { phrase: "mapenzi yako yatimizwe, hapa duniani kama huko mbinguni.", meditation: "Mbinguni ndiko mapenzi ya Mungu yanapotimizwa kwa uhuru na furaha. Tunaomba dunia ifanane zaidi na mbinguni leo.", prompt: "Achilia kitu kimoja ambacho umekuwa ukijaribu kukidhibiti. Sema: mapenzi yako, si yangu." },
      { phrase: "Utupe leo riziki yetu ya kila siku.", meditation: "Tunaomba mkate wa leo, si wa mwakani. Imani hujengwa upya siku kwa siku.", prompt: "Mwombe Baba kile unachohitaji kweli leo — chakula, kazi, hekima, ujasiri, furaha." },
      { phrase: "Utusamehe deni zetu,", meditation: "Lete dhambi zako nuruni. Ameshazijua; anatamani kuzisamehe.", prompt: "Mtaje Mungu dhambi zako kwa uwazi. Pokea rehema yake kwa njia ya Yesu." },
      { phrase: "kama sisi tunavyowasamehe wadeni wetu.", meditation: "Msamaha ni hewa wanayopumua wale waliosamehewa. Kukataa kusamehe huziba mapafu yetu wenyewe.", prompt: "Nani unaehitaji kumsamehe leo? Anza — hata kwa sentensi moja tu." },
      { phrase: "Usitutie majaribuni,", meditation: "Sisi ni wadhaifu. Tunamhitaji Baba anayetuongoza mbali na sehemu tunakoanguka.", prompt: "Taja jaribu moja unalokumbana nalo wiki hii. Mwombe Baba akuepushe nalo." },
      { phrase: "lakini utuokoe na yule mwovu.", meditation: "Kuna adui halisi. Hatuwezi pekee yetu — wala hatuhitajiki kuwa hivyo.", prompt: "Muombe Yesu, Aliye na nguvu zaidi, akuokoe — pale ulipojihisi huna nguvu." },
      { phrase: "Kwa kuwa ufalme ni wako, na nguvu, na utukufu, milele. Amina.", meditation: "Tunamalizia tulipoanzia: pamoja Naye. Ufalme, nguvu, na utukufu si vyetu — na hizo ni habari njema.", prompt: "Maliza kwa sifa. Mwambie Yeye anatosha." },
    ],
  },
  acts: {
    intro:
      "Mfumo wa kale na rahisi unaomsaidia mtu yeyote kuomba kwa mpangilio: Abudu, Kiri, Shukuru, Omba.",
    movements: [
      { letter: "A", word: "Abudu", body: "Anza kwa kumweleza Mungu Yeye ni nani na kumsifu kwa hilo. Si kwa kile alichokufanyia bado — bali kwa Yeye alivyo.", scripture: "Mtakatifu, mtakatifu, mtakatifu, Bwana wa majeshi; dunia yote imejaa utukufu wake.", reference: "Isaya 6:3" },
      { letter: "K", word: "Kiri", body: "Taja dhambi zako. Kwa uwazi. Yeye ni mwaminifu na mwenye haki kusamehe — huo ni utu wake, si mafanikio yako.", scripture: "Tukiziungama dhambi zetu, Yeye ni mwaminifu na wa haki hata atuondolee dhambi zetu, na kutusafisha na udhalimu wote.", reference: "1 Yohana 1:9" },
      { letter: "S", word: "Shukuru", body: "Sasa hesabu zawadi. Za leo. Za wiki hii. Za msimu huu. Shukrani huipanga upya roho.", scripture: "Shukuruni kwa kila jambo; maana hayo ni mapenzi ya Mungu kwenu katika Kristo Yesu.", reference: "1 Wathesalonike 5:18" },
      { letter: "M", word: "Maombi", body: "Sasa omba. Kwa ajili yako, kwa ajili ya watu wako, kwa ajili ya mataifa. Baba anakukaribisha.", scripture: "Msijisumbue kwa neno lo lote; bali katika kila neno kwa kusali na kuomba pamoja na kushukuru, haja zenu na zijulikane na Mungu.", reference: "Wafilipi 4:6" },
    ],
  },
  closing: { quote: "Bwana, tufundishe kuomba.", ref: "Luka 11:1" },
};

const hi: PrayerLocale = {
  pageEyebrow: "प्रार्थना",
  pageTitle: "पिता से बात करो, जैसे यीशु ने सिखाया।",
  pageIntro:
    "तुम्हें किसी विशेष आवाज़, विशेष स्थान या भारी-भरकम शब्दों की आवश्यकता नहीं है। तुम्हें एक पिता चाहिए — और तुम्हारे पास एक है। उस प्रार्थना से होकर चलो जो यीशु ने हमें दी। एक सरल, प्राचीन रीति का प्रयोग करो। प्रतिदिन दुनिया के एक भिन्न क्षेत्र के लिए प्रार्थना करो।",
  modes: { lords: "प्रभु की प्रार्थना", acts: "अ · प · ध · वि", world: "संसार के लिए प्रार्थना" },
  lords: {
    headingScripture: "\"तुम इस रीति से प्रार्थना किया करो...\" — यीशु",
    headingScriptureRef: "मत्ती 6:9–13",
    headingTagline:
      "उसने हमें केवल प्रार्थना करने को नहीं कहा। उसने हमें यह सिखाया कि कैसे करनी है। उसे धीरे-धीरे, एक-एक पंक्ति करके चलो — और उसे अपनी बनने दो।",
    prayNowLabel: "अभी प्रार्थना करो:",
    lines: [
      { phrase: "हे हमारे पिता, तू जो स्वर्ग में है,", meditation: "हम अनाथ नहीं हैं। जिस परमेश्वर ने ब्रह्मांड बनाया, वह तुम्हारा पिता है। हम माँग से शुरू नहीं करते — हम संबंध से शुरू करते हैं।", prompt: "परमेश्वर से कहो कि वह तुम्हारा पिता है। उसका धन्यवाद करो कि आज तुम अकेले नहीं हो।" },
      { phrase: "तेरा नाम पवित्र माना जाए।", meditation: "हमारी आवश्यकताओं से पहले, उसकी महिमा। उसका नाम पृथ्वी पर, हमारे नगर में, और आज हमारे ही जीवन में आदरित हो।", prompt: "अपने जीवन का एक स्थान बताओ जहाँ परमेश्वर का अब तक आदर नहीं हुआ। माँगो कि वहाँ उसका आदर हो।" },
      { phrase: "तेरा राज्य आए,", meditation: "हम राजा के राज्य के आने की प्रार्थना कर रहे हैं — हमारे घर में, हमारे काम में, हमारे राष्ट्र में, हमारे हृदय में।", prompt: "एक ऐसी परिस्थिति के लिए प्रार्थना करो जहाँ बुराई जीतती हुई लगती है। राजा के आने को कहो।" },
      { phrase: "तेरी इच्छा जैसी स्वर्ग में पूरी होती है, वैसे ही पृथ्वी पर भी हो।", meditation: "स्वर्ग वह स्थान है जहाँ परमेश्वर की इच्छा स्वतंत्रता और आनंद से पूरी होती है। हम प्रार्थना कर रहे हैं कि आज पृथ्वी स्वर्ग जैसी और दिखे।", prompt: "एक चीज़ छोड़ दो जिसे तुम नियंत्रित करने की कोशिश करते रहे हो। कहो: तेरी इच्छा, मेरी नहीं।" },
      { phrase: "हमारी प्रतिदिन की रोटी आज हमें दे।", meditation: "हम आज की रोटी माँगते हैं, अगले वर्ष की नहीं। भरोसा एक-एक दिन करके फिर से बनता है।", prompt: "पिता से वह माँगो जिसकी तुम्हें आज सचमुच आवश्यकता है — भोजन, काम, बुद्धि, साहस, आनंद।" },
      { phrase: "और जैसे हम अपने अपराधियों को क्षमा करते हैं,", meditation: "अपने पापों को प्रकाश में लाओ। वह उन्हें पहले से जानता है; वह उन्हें क्षमा करने को तरसता है।", prompt: "अपने पाप परमेश्वर के सामने स्पष्ट रूप से नाम लेकर रखो। यीशु के द्वारा उसकी दया ग्रहण करो।" },
      { phrase: "वैसे ही तू भी हमारे अपराध हमें क्षमा कर।", meditation: "क्षमा वह वायु है जिसे क्षमा पाया हुआ साँस लेता है। क्षमा करने से इनकार करना हमारे अपने फेफड़ों को रोकता है।", prompt: "तुम्हें आज किसे क्षमा करने की आवश्यकता है? आरंभ करो — चाहे केवल एक वाक्य से।" },
      { phrase: "और हमें परीक्षा में न ला,", meditation: "हम कमज़ोर हैं। हमें ऐसे पिता की आवश्यकता है जो हमें उन स्थानों से दूर करे जहाँ हम गिरते हैं।", prompt: "इस सप्ताह अपने सामने आने वाली एक परीक्षा का नाम लो। पिता से कहो कि वह तुम्हें उससे बचाकर ले जाए।" },
      { phrase: "परन्तु बुराई से बचा।", meditation: "एक वास्तविक शत्रु है। हम स्वयं इतने बलवान नहीं हैं — और हमें होने की आवश्यकता भी नहीं।", prompt: "यीशु से, जो उससे भी बलवान है, छुटकारा माँगो — जहाँ तुमने स्वयं को असमर्थ अनुभव किया है।" },
      { phrase: "क्योंकि राज्य और पराक्रम और महिमा सदा तेरे ही हैं। आमीन।", meditation: "हम वहीं समाप्त करते हैं जहाँ से आरंभ किया था: उसके साथ। राज्य, पराक्रम और महिमा हमारी नहीं हैं — और यही शुभ समाचार है।", prompt: "स्तुति से समाप्त करो। उसे कहो कि वह काफ़ी है।" },
    ],
  },
  acts: {
    intro:
      "एक सरल, प्राचीन रीति जो किसी को भी एक आकार के साथ प्रार्थना करने में सहायता करती है: अराधना, पाप-स्वीकार, धन्यवाद, विनती।",
    movements: [
      { letter: "अ", word: "अराधना", body: "परमेश्वर को बताकर आरंभ करो कि वह कौन है, और उसके लिए उसकी स्तुति करो। उसने तुम्हारे लिए क्या किया, इसके लिए नहीं — बल्कि वह कौन है, इसके लिए।", scripture: "पवित्र, पवित्र, पवित्र है सेनाओं का यहोवा, सारी पृथ्वी उसकी महिमा से परिपूर्ण है।", reference: "यशायाह 6:3" },
      { letter: "प", word: "पाप-स्वीकार", body: "अपने पाप नाम लेकर बताओ। स्पष्टता से। वह क्षमा करने में विश्वासयोग्य और न्यायी है — यह उसका स्वभाव है, तुम्हारी उपलब्धि नहीं।", scripture: "यदि हम अपने पापों को मान लें, तो वह हमारे पापों को क्षमा करने और हमें सब अधर्म से शुद्ध करने में विश्वासयोग्य और धर्मी है।", reference: "1 यूहन्ना 1:9" },
      { letter: "ध", word: "धन्यवाद", body: "अब उपहार गिनो। आज के। इस सप्ताह के। इस ऋतु के। कृतज्ञता आत्मा को पुनः व्यवस्थित कर देती है।", scripture: "हर बात में धन्यवाद करो; क्योंकि तुम्हारे लिये मसीह यीशु में परमेश्वर की यही इच्छा है।", reference: "1 थिस्सलुनीकियों 5:18" },
      { letter: "वि", word: "विनती", body: "अब माँगो। अपने लिए, अपने लोगों के लिए, राष्ट्रों के लिए। पिता आमंत्रित करता है।", scripture: "किसी भी बात की चिन्ता मत करो: परन्तु हर एक बात में तुम्हारे निवेदन, प्रार्थना और बिनती के द्वारा धन्यवाद के साथ परमेश्वर के सम्मुख उपस्थित किए जाएँ।", reference: "फिलिप्पियों 4:6" },
    ],
  },
  closing: { quote: "हे प्रभु, हमें प्रार्थना करना सिखा।", ref: "लूका 11:1" },
};

const ar: PrayerLocale = {
  pageEyebrow: "صلِّ",
  pageTitle: "تحدَّث إلى الآب كما علَّمنا يسوع.",
  pageIntro:
    "لست بحاجة إلى صوت خاص، أو مكان خاص، أو كلمات منمَّقة. أنت تحتاج إلى آب — ولديك آب. سِرْ في الصلاة التي أعطانا إياها يسوع. استخدم نمطًا قديمًا بسيطًا. صلِّ من أجل منطقة مختلفة من العالم كل يوم.",
  modes: { lords: "الصلاة الربية", acts: "س · ا · ش · ط", world: "الصلاة لأجل العالم" },
  lords: {
    headingScripture: "«فصلوا أنتم هكذا...» — يسوع",
    headingScriptureRef: "متى ٦:٩–١٣",
    headingTagline:
      "لم يقل لنا أن نصلي فحسب. علَّمنا كيف. سِرْ فيها ببطء، سطرًا بعد سطر — ودعها تصير لك.",
    prayNowLabel: "صلِّ الآن:",
    lines: [
      { phrase: "أبانا الذي في السماوات،", meditation: "نحن لسنا أيتامًا. الإله الذي صنع الكون هو أبوك. لا نبدأ بالمطالبة — نبدأ بالانتماء.", prompt: "قل لله إنه أبوك. اشكره أنك اليوم لست وحدك." },
      { phrase: "ليتقدَّس اسمك.", meditation: "قبل احتياجاتنا، مجده. ليتعظَّم اسمه في الأرض، وفي مدينتنا، وفي حياتنا اليوم.", prompt: "اذكر مكانًا في حياتك لم يُكرَّم فيه الله بعد. اطلب أن يُكرَّم هناك." },
      { phrase: "ليأتِ ملكوتك،", meditation: "نطلب أن يأتي ملك الملك — إلى بيتنا، وعملنا، وأمتنا، وقلبنا.", prompt: "صلِّ من أجل موقف يبدو أن الشر منتصر فيه. اطلب أن يأتي الملك." },
      { phrase: "لتكن مشيئتك كما في السماء كذلك على الأرض.", meditation: "السماء حيث تُتمَّ مشيئة الله بحرية وفرح. نصلي أن تشبه الأرض السماء أكثر اليوم.", prompt: "سلِّم أمرًا كنت تحاول السيطرة عليه. قل: مشيئتك أنت، لا مشيئتي." },
      { phrase: "خبزنا كفافنا أعطنا اليوم.", meditation: "نطلب خبز اليوم لا خبز السنة القادمة. الثقة تُبنى يومًا فيومًا.", prompt: "اطلب من الآب ما تحتاجه فعلًا اليوم — طعامًا، عملًا، حكمة، شجاعة، فرحًا." },
      { phrase: "واغفر لنا ذنوبنا،", meditation: "أحضِر خطاياك إلى النور. هو يعرفها مسبقًا، ويتوق أن يغفرها.", prompt: "اذكر خطاياك أمام الله بالاسم. اقبل رحمته في يسوع." },
      { phrase: "كما نغفر نحن أيضًا للمذنبين إلينا.", meditation: "الغفران هو الهواء الذي يتنفسه المغفور لهم. رفض الغفران يسدُّ رئتينا.", prompt: "من تحتاج أن تغفر له اليوم؟ ابدأ — ولو بجملة واحدة." },
      { phrase: "ولا تُدخلنا في تجربة،", meditation: "نحن ضعفاء. نحتاج إلى آب يبعدنا عن الأماكن التي نسقط فيها.", prompt: "اذكر تجربة تواجهها هذا الأسبوع. اطلب من الآب أن يقودك بعيدًا عنها." },
      { phrase: "لكن نجِّنا من الشرير.", meditation: "هناك عدوٌ حقيقي. لسنا أقوياء بمفردنا — ولا حاجة بنا أن نكون كذلك.", prompt: "اطلب من يسوع، الأقوى، أن ينجيك — حيث شعرت بالعجز." },
      { phrase: "لأن لك الملك والقوة والمجد، إلى الأبد. آمين.", meditation: "نختم حيث بدأنا: معه. الملك والقوة والمجد ليست لنا — وهذه هي البشارة.", prompt: "اختم بالتسبيح. قل له إنه يكفي." },
    ],
  },
  acts: {
    intro:
      "نمط قديم بسيط يساعد كل إنسان أن يصلي بشكل واضح: السجود، الاعتراف، الشكر، الطلب.",
    movements: [
      { letter: "س", word: "السجود", body: "ابدأ بأن تقول لله من هو، وسبِّحه على ذلك. لا لأجل ما فعله لك بعد — بل لأجل من هو.", scripture: "قدوس، قدوس، قدوس رب الجنود، مجده ملء كل الأرض.", reference: "إشعياء ٦:٣" },
      { letter: "ا", word: "الاعتراف", body: "اذكر خطاياك. بالتفصيل. هو أمين وعادل ليغفر — هذه شخصيته، لا إنجازك.", scripture: "إن اعترفنا بخطايانا فهو أمين وعادل، حتى يغفر لنا خطايانا ويطهرنا من كل إثم.", reference: "١ يوحنا ١:٩" },
      { letter: "ش", word: "الشكر", body: "والآن عُدَّ العطايا. عطايا اليوم. عطايا هذا الأسبوع. عطايا هذا الموسم. الشكر يعيد ترتيب النفس.", scripture: "اشكروا في كل شيء، لأن هذه هي مشيئة الله في المسيح يسوع من جهتكم.", reference: "١ تسالونيكي ٥:١٨" },
      { letter: "ط", word: "الطلب", body: "والآن اطلب. لنفسك، ولشعبك، وللأمم. الآب يدعوك إلى ذلك.", scripture: "لا تهتموا بشيء، بل في كل شيء بالصلاة والدعاء مع الشكر، لتُعلَم طلباتكم لدى الله.", reference: "فيلبي ٤:٦" },
    ],
  },
  closing: { quote: "يا رب، علِّمنا أن نصلي.", ref: "لوقا ١١:١" },
};

const zh: PrayerLocale = {
  pageEyebrow: "祷告",
  pageTitle: "像耶稣所教的那样,与父说话。",
  pageIntro:
    "你不需要特别的声音、特别的地方,也不需要华丽的词藻。你只需要一位父——而你有一位。走过耶稣赐给我们的祷告。使用一个简单古老的模式。每天为世界上不同的地区祷告。",
  modes: { lords: "主祷文", acts: "敬 · 认 · 谢 · 求", world: "为世界祷告" },
  lords: {
    headingScripture: "「所以,你们祷告要这样说……」 —— 耶稣",
    headingScriptureRef: "马太福音 6:9–13",
    headingTagline:
      "祂不只是叫我们祷告。祂教导我们如何祷告。慢慢地走过它,一句一句——让它成为你自己的祷告。",
    prayNowLabel: "现在就祷告:",
    lines: [
      { phrase: "我们在天上的父,", meditation: "我们不是孤儿。那位创造宇宙的神,是你的父。我们不从索求开始——我们从归属开始。", prompt: "告诉神祂是你的父。感谢祂今天你并不孤单。" },
      { phrase: "愿人都尊你的名为圣。", meditation: "在我们的需要之前,是祂的荣耀。愿祂的名在地上、在我们的城市、在我们今天自己的生命里,被尊崇为圣。", prompt: "说出你生命中一个尚未被神尊崇的地方,求祂在那里被尊崇。" },
      { phrase: "愿你的国降临,", meditation: "我们求王的国度降临——降临到我们的家、我们的工作、我们的国家、我们的心。", prompt: "为一个邪恶似乎正在得胜的处境祷告。求王降临。" },
      { phrase: "愿你的旨意行在地上,如同行在天上。", meditation: "天上是神的旨意被自由地、喜乐地成就之处。我们祷告今天的地更像天。", prompt: "交出一件你一直试图掌控的事。说:愿祢的旨意成就,不是我的。" },
      { phrase: "我们日用的饮食,今日赐给我们。", meditation: "我们求今天的饼,不是明年的。信靠是一天一天重新建立的。", prompt: "求父赐下你今天真正需要的——食物、工作、智慧、勇气、喜乐。" },
      { phrase: "免我们的债,", meditation: "把你的罪带到光中。祂早已知道;祂渴望赦免。", prompt: "向神具体说出你的罪。借着耶稣领受祂的怜悯。" },
      { phrase: "如同我们免了人的债。", meditation: "饶恕是蒙赦免之人所呼吸的空气。拒绝饶恕,就是堵塞自己的肺。", prompt: "今天你需要饶恕谁?开始——哪怕只是一句话。" },
      { phrase: "不叫我们遇见试探,", meditation: "我们是软弱的。我们需要一位父,带我们绕开那些会跌倒的地方。", prompt: "说出本周你所面对的一个试探。求父带你绕开它。" },
      { phrase: "救我们脱离凶恶。", meditation: "确有一位真实的仇敌。我们独自不够强壮——我们也不必如此。", prompt: "求那位更强大的耶稣施行拯救——在你曾感到无能为力之处。" },
      { phrase: "因为国度、权柄、荣耀,全是你的,直到永远。阿们。", meditation: "我们在起点处收尾:与祂同在。国度、权柄、荣耀都不属我们——这正是好消息。", prompt: "以赞美收尾。告诉祂,祂就够了。" },
    ],
  },
  acts: {
    intro:
      "一个简单而古老的祷告模式,帮助任何人有结构地祷告:敬拜、认罪、感谢、祈求。",
    movements: [
      { letter: "敬", word: "敬拜", body: "先告诉神祂是谁,并为此赞美祂。不是为祂还为你做了什么——而是为祂本身。", scripture: "圣哉、圣哉、圣哉,万军之耶和华;祂的荣光充满全地。", reference: "以赛亚书 6:3" },
      { letter: "认", word: "认罪", body: "说出你的罪。具体地。祂是信实公义的,必要赦免——这是祂的性情,不是你的成就。", scripture: "我们若认自己的罪,神是信实的,是公义的,必要赦免我们的罪,洗净我们一切的不义。", reference: "约翰一书 1:9" },
      { letter: "谢", word: "感谢", body: "现在数算恩赐。今天的、这一周的、这个季节的。感恩重塑灵魂的秩序。", scripture: "凡事谢恩;因为这是神在基督耶稣里向你们所定的旨意。", reference: "帖撒罗尼迦前书 5:18" },
      { letter: "求", word: "祈求", body: "现在祈求。为自己、为自己的人、为列国。父邀请这样做。", scripture: "应当一无挂虑,只要凡事借着祷告、祈求和感谢,将你们所要的告诉神。", reference: "腓立比书 4:6" },
    ],
  },
  closing: { quote: "求主教导我们祷告。", ref: "路加福音 11:1" },
};

export const prayerLocales: Record<LocaleCode, PrayerLocale> = {
  en, es, pt, fr, sw, hi, ar, zh,
};
