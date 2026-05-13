import type { LocaleCode } from "@/data/gospel-i18n";

export type LocalizedDay = {
  reference: string;
  title: string;
  meditation: string;
};

export type ReadingPlanI18n = {
  name: string;
  tagline: string;
  description: string;
  days: Record<number, LocalizedDay>;
};

type Catalog = Partial<Record<LocaleCode, Partial<Record<string, ReadingPlanI18n>>>>;

const johnEs: ReadingPlanI18n = {
  name: "Juan en 30 días",
  tagline: "Conoce a Jesús por los ojos de su amigo más cercano.",
  description:
    "Si nunca has leído la Biblia — o quieres conocer a Jesús de nuevo — comienza aquí. Un capítulo o escena breve al día durante 30 días.",
  days: {
    1: { reference: "Juan 1:1–18", title: "El Verbo se hizo carne", meditation: "Detente en el v. 14: Dios vino a vivir entre nosotros." },
    2: { reference: "Juan 1:19–51", title: "Vengan y vean", meditation: "Mira cómo llama Jesús: no convence con argumentos, invita a venir y ver." },
    3: { reference: "Juan 2", title: "El agua en vino; la limpieza del templo", meditation: "La primera señal es alegría en una boda; el segundo acto, celo por la casa de su Padre." },
    4: { reference: "Juan 3", title: "Os es necesario nacer de nuevo", meditation: "El nuevo nacimiento es regalo del Espíritu. Juan 3:16 vive dentro de esta conversación." },
    5: { reference: "Juan 4", title: "La mujer en el pozo", meditation: "Jesús cruza barreras de género, etnia y moral para dar Agua Viva. Aún lo hace." },
    6: { reference: "Juan 5", title: "Sanidad en sábado", meditation: "El Padre y el Hijo obran — para dar vida — incluso en el día de descanso." },
    7: { reference: "Juan 6:1–40", title: "El pan de vida", meditation: "Alimenta a 5.000 y luego declara: Yo soy el Pan de Vida. Cada día te sostiene." },
    8: { reference: "Juan 6:41–71", title: "Señor, ¿a quién iremos?", meditation: "Muchos vuelven atrás. La confesión de Pedro es adoración honesta." },
    9: { reference: "Juan 7", title: "El que tenga sed, venga", meditation: "En la gran fiesta, Jesús se pone en pie y grita una invitación. Sigue gritándola." },
    10: { reference: "Juan 8:1–30", title: "Yo tampoco te condeno", meditation: "Gracia y verdad se encuentran en Jesús: ni la condena ni la deja en su pecado." },
    11: { reference: "Juan 8:31–59", title: "La verdad os hará libres", meditation: "El verdadero discipulado es permanecer en su palabra." },
    12: { reference: "Juan 9", title: "Antes era ciego", meditation: "Un hombre entero — cuerpo y alma — encuentra a Jesús, ve y adora." },
    13: { reference: "Juan 10", title: "El Buen Pastor", meditation: "Conoce a los suyos. Da su vida libremente. Reúne otras ovejas en un solo rebaño." },
    14: { reference: "Juan 11", title: "Yo soy la resurrección y la vida", meditation: "Jesús llora con María, y luego llama al muerto. La muerte no tiene la última palabra." },
    15: { reference: "Juan 12", title: "Si el grano no cae a tierra", meditation: "La cruz es gloria. El camino al fruto pasa por la muerte — la suya, y la nuestra con Él." },
    16: { reference: "Juan 13", title: "Los amó hasta el fin", meditation: "Lava pies. Da un mandamiento nuevo: amaos como yo os he amado." },
    17: { reference: "Juan 14", title: "Yo soy el camino", meditation: "Va a preparar lugar. Es el único camino al Padre. Envía al Espíritu." },
    18: { reference: "Juan 15", title: "Permaneced en mí", meditation: "Sin Él, nada. Unidos a Él, fruto. Aquí late el corazón de la vida cristiana." },
    19: { reference: "Juan 16", title: "El Espíritu os guiará", meditation: "No nos deja solos. El Espíritu estará con nosotros — y en nosotros — para siempre." },
    20: { reference: "Juan 17", title: "Su oración por nosotros", meditation: "Lee su propia oración, despacio. Ora por la unidad. Ora por ti (v. 20)." },
    21: { reference: "Juan 18:1–27", title: "Arresto y negación", meditation: "Va voluntariamente. Pedro niega. Aun aquí, Jesús manda." },
    22: { reference: "Juan 18:28–19:16", title: "Ante Pilato", meditation: "La verdad encadenada delante del poder. El poder parpadea; la verdad salva." },
    23: { reference: "Juan 19:17–42", title: "Consumado es", meditation: "El Cordero de Dios levantado. La obra de nuestra salvación, completa." },
    24: { reference: "Juan 20:1–18", title: "María, ha resucitado", meditation: "La llama por su nombre. Te llama por tu nombre. La tumba está vacía." },
    25: { reference: "Juan 20:19–31", title: "Paz a vosotros", meditation: "La duda es recibida con heridas y bienvenida. Señor mío y Dios mío." },
    26: { reference: "Juan 21:1–14", title: "Desayuno en la orilla", meditation: "Cocina pescado para sus amigos. El Rey resucitado también es amigo." },
    27: { reference: "Juan 21:15–25", title: "¿Me amas? Apacienta mis ovejas", meditation: "Restauración y comisión. El amor se expresa cuidando del rebaño." },
    28: { reference: "Juan 1 de nuevo", title: "Léelo otra vez, de un tirón", meditation: "Ahora la introducción suena distinta. Escúchala una vez más." },
    29: { reference: "Tu capítulo favorito", title: "Vuelve a donde te encontró", meditation: "Dedica el tiempo a meditar, orar y escribir lo que Él te ha dicho." },
    30: { reference: "Juan 17 + 20", title: "Su oración + su resurrección", meditation: "Termina donde terminaron los discípulos: en la oración de Jesús y la tumba vacía." },
  },
};

const johnPt: ReadingPlanI18n = {
  name: "João em 30 dias",
  tagline: "Conheça Jesus pelos olhos de seu amigo mais íntimo.",
  description:
    "Se você nunca leu a Bíblia — ou quer conhecer Jesus de novo — comece aqui. Um capítulo ou cena curta por dia, durante 30 dias.",
  days: {
    1: { reference: "João 1:1–18", title: "O Verbo se fez carne", meditation: "Pare no v. 14: Deus veio morar no nosso bairro." },
    2: { reference: "João 1:19–51", title: "Venham e vejam", meditation: "Veja como Jesus chama: não convence por argumentos — convida a vir e ver." },
    3: { reference: "João 2", title: "Água em vinho; a purificação do templo", meditation: "O primeiro sinal é alegria num casamento; o segundo, zelo pela casa do Pai." },
    4: { reference: "João 3", title: "Importa-vos nascer de novo", meditation: "O novo nascimento é dom do Espírito. João 3:16 vive dentro desta conversa." },
    5: { reference: "João 4", title: "A mulher no poço", meditation: "Jesus cruza barreiras de gênero, etnia e moral para dar Água Viva. Ainda o faz." },
    6: { reference: "João 5", title: "Cura no sábado", meditation: "O Pai e o Filho trabalham — pela vida — até no dia de descanso." },
    7: { reference: "João 6:1–40", title: "O pão da vida", meditation: "Alimenta 5.000 e então declara: Eu sou o Pão da Vida. Diariamente Ele te sustenta." },
    8: { reference: "João 6:41–71", title: "Senhor, para quem iremos?", meditation: "Muitos voltam atrás. A confissão de Pedro é adoração honesta." },
    9: { reference: "João 7", title: "Quem tem sede, venha", meditation: "Na grande festa Jesus se levanta e grita um convite. Ainda está gritando." },
    10: { reference: "João 8:1–30", title: "Nem eu te condeno", meditation: "Graça e verdade se encontram em Jesus: nem a condena, nem a deixa no pecado." },
    11: { reference: "João 8:31–59", title: "A verdade vos libertará", meditation: "O verdadeiro discipulado é permanecer na sua palavra." },
    12: { reference: "João 9", title: "Antes eu era cego", meditation: "Um homem inteiro — corpo e alma — encontra Jesus, vê e adora." },
    13: { reference: "João 10", title: "O Bom Pastor", meditation: "Conhece os seus. Dá a vida livremente. Reúne outras ovelhas em um só rebanho." },
    14: { reference: "João 11", title: "Eu sou a ressurreição e a vida", meditation: "Jesus chora com Maria, e então chama o morto. A morte não tem a última palavra." },
    15: { reference: "João 12", title: "Se o grão de trigo não cair", meditation: "A cruz é glória. O caminho do fruto passa pela morte — a dele, e a nossa com Ele." },
    16: { reference: "João 13", title: "Amou-os até o fim", meditation: "Lava pés. Dá um mandamento novo: amem-se como eu vos amei." },
    17: { reference: "João 14", title: "Eu sou o caminho", meditation: "Vai preparar lugar. É o único caminho ao Pai. Envia o Espírito." },
    18: { reference: "João 15", title: "Permaneçam em mim", meditation: "Sem Ele, nada. Unidos a Ele, fruto. Aqui bate o coração da vida cristã." },
    19: { reference: "João 16", title: "O Espírito vos guiará", meditation: "Ele não nos deixa sós. O Espírito estará conosco — e em nós — para sempre." },
    20: { reference: "João 17", title: "Sua oração por nós", meditation: "Leia a oração d'Ele, devagar. Ele ora pela unidade. Ele ora por você (v. 20)." },
    21: { reference: "João 18:1–27", title: "Prisão e negação", meditation: "Ele vai de bom grado. Pedro nega. Ainda aqui, Jesus comanda." },
    22: { reference: "João 18:28–19:16", title: "Diante de Pilatos", meditation: "A verdade acorrentada diante do poder. O poder pisca; a verdade salva." },
    23: { reference: "João 19:17–42", title: "Está consumado", meditation: "O Cordeiro de Deus levantado. A obra da nossa salvação, completa." },
    24: { reference: "João 20:1–18", title: "Maria, Ele ressuscitou", meditation: "Ele a chama pelo nome. Ele te chama pelo nome. O túmulo está vazio." },
    25: { reference: "João 20:19–31", title: "Paz seja convosco", meditation: "A dúvida é recebida com feridas e boas-vindas. Senhor meu e Deus meu." },
    26: { reference: "João 21:1–14", title: "Café da manhã na praia", meditation: "Ele cozinha peixe para os amigos. O Rei ressuscitado também é amigo." },
    27: { reference: "João 21:15–25", title: "Você me ama? Apascente as minhas ovelhas", meditation: "Restauração e missão. O amor se expressa cuidando do rebanho." },
    28: { reference: "João 1 de novo", title: "Leia outra vez, de uma vez só", meditation: "Agora a introdução soa diferente. Escute mais uma vez." },
    29: { reference: "Seu capítulo favorito", title: "Volte ao lugar onde Ele te encontrou", meditation: "Use o tempo para meditar, orar e escrever o que Ele te disse." },
    30: { reference: "João 17 + 20", title: "Sua oração + sua ressurreição", meditation: "Termine onde os discípulos terminaram: na oração de Jesus e no túmulo vazio." },
  },
};

const johnFr: ReadingPlanI18n = {
  name: "Jean en 30 jours",
  tagline: "Rencontre Jésus par les yeux de son ami le plus proche.",
  description:
    "Si tu n'as jamais lu la Bible — ou si tu veux rencontrer Jésus à nouveau — commence ici. Un court chapitre ou une scène par jour, pendant 30 jours.",
  days: {
    1: { reference: "Jean 1:1–18", title: "La Parole faite chair", meditation: "Arrête-toi au v. 14 : Dieu est venu habiter dans le quartier." },
    2: { reference: "Jean 1:19–51", title: "Venez et voyez", meditation: "Vois comment Jésus appelle : il n'argumente pas, il invite à venir et à voir." },
    3: { reference: "Jean 2", title: "L'eau changée en vin ; le temple purifié", meditation: "Premier signe : la joie d'une noce. Deuxième acte : zèle pour la maison du Père." },
    4: { reference: "Jean 3", title: "Il vous faut naître de nouveau", meditation: "La nouvelle naissance est don de l'Esprit. Jean 3:16 vit à l'intérieur de cette conversation." },
    5: { reference: "Jean 4", title: "La femme au puits", meditation: "Jésus franchit les barrières de genre, d'ethnie et de morale pour donner l'Eau Vive. Il le fait encore." },
    6: { reference: "Jean 5", title: "Guérison le jour du sabbat", meditation: "Le Père et le Fils sont à l'œuvre — pour donner la vie — même le jour du repos." },
    7: { reference: "Jean 6:1–40", title: "Le pain de vie", meditation: "Il nourrit 5 000 puis déclare : Je suis le Pain de Vie. Chaque jour il te soutient." },
    8: { reference: "Jean 6:41–71", title: "Seigneur, à qui irions-nous ?", meditation: "Beaucoup s'en vont. La confession de Pierre est une adoration honnête." },
    9: { reference: "Jean 7", title: "Si quelqu'un a soif, qu'il vienne", meditation: "À la grande fête, Jésus se lève et crie une invitation. Il la crie encore." },
    10: { reference: "Jean 8:1–30", title: "Moi non plus je ne te condamne pas", meditation: "Grâce et vérité se rencontrent en Jésus : ni condamnation, ni complaisance." },
    11: { reference: "Jean 8:31–59", title: "La vérité vous rendra libres", meditation: "Le vrai disciple demeure dans sa parole." },
    12: { reference: "Jean 9", title: "J'étais aveugle ; maintenant je vois", meditation: "Un homme entier — corps et âme — rencontre Jésus, voit et adore." },
    13: { reference: "Jean 10", title: "Le Bon Berger", meditation: "Il connaît les siens. Il donne sa vie librement. Il rassemble d'autres brebis en un seul troupeau." },
    14: { reference: "Jean 11", title: "Je suis la résurrection et la vie", meditation: "Jésus pleure avec Marie, puis appelle le mort. La mort n'a pas le dernier mot." },
    15: { reference: "Jean 12", title: "Si le grain ne meurt", meditation: "La croix est gloire. Le chemin du fruit passe par la mort — la sienne, et la nôtre avec lui." },
    16: { reference: "Jean 13", title: "Il les aima jusqu'à la fin", meditation: "Il lave les pieds. Il donne un commandement nouveau : aimez comme je vous ai aimés." },
    17: { reference: "Jean 14", title: "Je suis le chemin", meditation: "Il va préparer une place. Il est le seul chemin vers le Père. Il envoie l'Esprit." },
    18: { reference: "Jean 15", title: "Demeurez en moi", meditation: "Sans lui, rien. Unis à lui, du fruit. Voici le cœur de la vie chrétienne." },
    19: { reference: "Jean 16", title: "L'Esprit vous conduira", meditation: "Il ne nous laisse pas seuls. L'Esprit sera avec nous — et en nous — pour toujours." },
    20: { reference: "Jean 17", title: "Sa prière pour nous", meditation: "Lis sa propre prière, lentement. Il prie pour l'unité. Il prie pour toi (v. 20)." },
    21: { reference: "Jean 18:1–27", title: "Arrestation et reniement", meditation: "Il y va de bon gré. Pierre renie. Même ici, Jésus commande." },
    22: { reference: "Jean 18:28–19:16", title: "Devant Pilate", meditation: "La vérité enchaînée devant le pouvoir. Le pouvoir cligne ; la vérité sauve." },
    23: { reference: "Jean 19:17–42", title: "Tout est accompli", meditation: "L'Agneau de Dieu élevé. L'œuvre de notre salut, achevée." },
    24: { reference: "Jean 20:1–18", title: "Marie, il est ressuscité", meditation: "Il l'appelle par son nom. Il t'appelle par ton nom. Le tombeau est vide." },
    25: { reference: "Jean 20:19–31", title: "La paix soit avec vous", meditation: "Le doute est accueilli par les plaies et un bonjour. Mon Seigneur et mon Dieu." },
    26: { reference: "Jean 21:1–14", title: "Petit-déjeuner sur le rivage", meditation: "Il cuit du poisson pour ses amis. Le Roi ressuscité est aussi un ami." },
    27: { reference: "Jean 21:15–25", title: "M'aimes-tu ? Pais mes brebis", meditation: "Restauration et envoi. L'amour s'exprime en prenant soin du troupeau." },
    28: { reference: "Jean 1 à nouveau", title: "Relis-le une fois, d'un seul tenant", meditation: "Maintenant l'introduction sonne différemment. Écoute-la encore une fois." },
    29: { reference: "Ton chapitre préféré", title: "Reviens là où il t'a rencontré", meditation: "Prends le temps de méditer, de prier et d'écrire ce qu'il t'a dit." },
    30: { reference: "Jean 17 + 20", title: "Sa prière + sa résurrection", meditation: "Termine là où les disciples ont terminé : à la prière de Jésus et au tombeau vide." },
  },
};

const johnSw: ReadingPlanI18n = {
  name: "Yohana katika siku 30",
  tagline: "Mfahamu Yesu kupitia macho ya rafiki yake wa karibu.",
  description:
    "Kama hujawahi kuisoma Biblia — au unataka kumfahamu Yesu tena — anza hapa. Sura moja fupi au tukio kwa siku, kwa siku 30.",
  days: {
    1: { reference: "Yohana 1:1–18", title: "Neno akafanyika mwili", meditation: "Tulia kwenye mstari wa 14: Mungu alikuja kuishi katika ujirani wetu." },
    2: { reference: "Yohana 1:19–51", title: "Njoo uone", meditation: "Tazama jinsi Yesu anavyoita: hashindani kwa mabishano — anaita uje uone." },
    3: { reference: "Yohana 2", title: "Maji kuwa divai; kusafishwa kwa hekalu", meditation: "Ishara ya kwanza ni furaha kwenye harusi; tendo la pili, juhudi kwa nyumba ya Baba." },
    4: { reference: "Yohana 3", title: "Yawapasa kuzaliwa mara ya pili", meditation: "Kuzaliwa upya ni zawadi ya Roho. Yohana 3:16 unaishi ndani ya mazungumzo haya." },
    5: { reference: "Yohana 4", title: "Mwanamke kisimani", meditation: "Yesu anavuka mipaka ya jinsia, kabila na maadili kutoa Maji ya Uzima. Bado anafanya hivyo." },
    6: { reference: "Yohana 5", title: "Uponyaji siku ya Sabato", meditation: "Baba na Mwana wanafanya kazi — kwa uzima — hata siku ya kupumzika." },
    7: { reference: "Yohana 6:1–40", title: "Mkate wa uzima", meditation: "Anawalisha 5,000 kisha anatangaza: Mimi ni Mkate wa Uzima. Kila siku anakushikilia." },
    8: { reference: "Yohana 6:41–71", title: "Bwana, twende kwa nani?", meditation: "Wengi wanarudi. Ungamo la Petro ni ibada ya kweli." },
    9: { reference: "Yohana 7", title: "Mtu yeyote akiwa na kiu, na aje", meditation: "Kwenye sherehe kuu Yesu anasimama na kupiga kelele mwaliko. Bado anapiga." },
    10: { reference: "Yohana 8:1–30", title: "Mimi pia sikuhukumu", meditation: "Neema na kweli wanakutana katika Yesu: hahukumu, wala hatumlauni katika dhambi yake." },
    11: { reference: "Yohana 8:31–59", title: "Kweli itawaweka huru", meditation: "Uanafunzi wa kweli ni kukaa katika neno lake." },
    12: { reference: "Yohana 9", title: "Zamani nilikuwa kipofu", meditation: "Mtu mzima — mwili na nafsi — anakutana na Yesu, anaona na anaabudu." },
    13: { reference: "Yohana 10", title: "Mchungaji Mwema", meditation: "Anawajua walio wake. Anatoa uhai wake kwa hiari. Anakusanya kondoo wengine kuwa kundi moja." },
    14: { reference: "Yohana 11", title: "Mimi ndimi ufufuo na uzima", meditation: "Yesu analia pamoja na Mariamu, kisha anamwita aliyekufa. Mauti haina neno la mwisho." },
    15: { reference: "Yohana 12", title: "Chembe ya ngano isipoanguka", meditation: "Msalaba ni utukufu. Njia ya tunda ni kupitia mauti — yake, na yetu pamoja Naye." },
    16: { reference: "Yohana 13", title: "Aliwapenda hadi mwisho", meditation: "Anaosha miguu. Anatoa amri mpya: pendaneni kama nilivyowapenda ninyi." },
    17: { reference: "Yohana 14", title: "Mimi ni njia", meditation: "Anaenda kuandaa mahali. Yeye ndiye njia pekee kwa Baba. Anatuma Roho." },
    18: { reference: "Yohana 15", title: "Kaeni ndani yangu", meditation: "Bila Yeye, hakuna kitu. Ndani Yake, tunda. Hapa ndio moyo wa maisha ya Kikristo." },
    19: { reference: "Yohana 16", title: "Roho atakuongoza", meditation: "Hatuwachi peke yetu. Roho atakuwa pamoja nasi — na ndani yetu — milele." },
    20: { reference: "Yohana 17", title: "Sala yake kwa ajili yetu", meditation: "Soma sala yake mwenyewe, polepole. Anaomba umoja. Anakuombea wewe (mst. 20)." },
    21: { reference: "Yohana 18:1–27", title: "Kukamatwa na kukana", meditation: "Anaenda kwa hiari. Petro anakana. Hata hapa, Yesu ndiye mtawala." },
    22: { reference: "Yohana 18:28–19:16", title: "Mbele ya Pilato", meditation: "Kweli iliyofungwa mbele ya mamlaka. Mamlaka hupepesa macho; kweli huokoa." },
    23: { reference: "Yohana 19:17–42", title: "Imekwisha", meditation: "Mwana-Kondoo wa Mungu ameinuliwa. Kazi ya wokovu wetu, imekamilika." },
    24: { reference: "Yohana 20:1–18", title: "Mariamu, Amefufuka", meditation: "Anamwita kwa jina lake. Anakuita wewe kwa jina lako. Kaburi liko tupu." },
    25: { reference: "Yohana 20:19–31", title: "Amani iwe nanyi", meditation: "Shaka inakaribishwa kwa majeraha na karibu. Bwana wangu na Mungu wangu." },
    26: { reference: "Yohana 21:1–14", title: "Kifungua kinywa pwani", meditation: "Anapika samaki kwa marafiki zake. Mfalme aliyefufuka pia ni rafiki." },
    27: { reference: "Yohana 21:15–25", title: "Wanipenda? Lisha kondoo zangu", meditation: "Urejesho na utume. Upendo unajidhihirisha kwa kulilisha kundi." },
    28: { reference: "Yohana 1 tena", title: "Soma tena, kwa pumzi moja", meditation: "Sasa utangulizi unasikika tofauti. Sikiliza tena." },
    29: { reference: "Sura uipendayo zaidi", title: "Rudi mahali alipokutana nawe", meditation: "Tumia muda kutafakari, kuomba na kuandika alilokwambia." },
    30: { reference: "Yohana 17 + 20", title: "Sala yake + ufufuo wake", meditation: "Maliza pale wanafunzi walipomalizia: katika sala ya Yesu na kaburi tupu." },
  },
};

const johnHi: ReadingPlanI18n = {
  name: "30 दिनों में यूहन्ना",
  tagline: "यीशु से उसके सबसे करीबी मित्र की आँखों से मिलें।",
  description:
    "यदि आपने कभी बाइबल नहीं पढ़ी है — या आप यीशु से फिर से मिलना चाहते हैं — यहीं से शुरू कीजिए। 30 दिनों तक प्रतिदिन एक छोटा अध्याय या दृश्य।",
  days: {
    1: { reference: "यूहन्ना 1:1–18", title: "वचन देहधारी हुआ", meditation: "पद 14 पर रुकें: परमेश्वर हमारे पड़ोस में बसने आया।" },
    2: { reference: "यूहन्ना 1:19–51", title: "आओ और देखो", meditation: "देखिए यीशु कैसे बुलाते हैं: तर्क से नहीं — आओ और देखो, इस निमंत्रण से।" },
    3: { reference: "यूहन्ना 2", title: "जल से दाख़रस; मंदिर का शुद्धिकरण", meditation: "पहला चिन्ह: विवाह में आनंद। दूसरा कार्य: पिता के घर के लिए जलन।" },
    4: { reference: "यूहन्ना 3", title: "तुम्हें नये सिरे से जन्म लेना अवश्य है", meditation: "नया जन्म आत्मा का दान है। यूहन्ना 3:16 इसी बातचीत के भीतर रहता है।" },
    5: { reference: "यूहन्ना 4", title: "कुएँ की स्त्री", meditation: "यीशु लिंग, जाति और नैतिकता की सीमाएँ पार कर जीवन-जल देते हैं। आज भी।" },
    6: { reference: "यूहन्ना 5", title: "सब्त के दिन चंगाई", meditation: "पिता और पुत्र काम कर रहे हैं — जीवन के लिए — विश्राम के दिन भी।" },
    7: { reference: "यूहन्ना 6:1–40", title: "जीवन की रोटी", meditation: "5000 को खिलाते हैं और घोषणा करते हैं: मैं ही जीवन की रोटी हूँ। प्रतिदिन वे तुझे संभालते हैं।" },
    8: { reference: "यूहन्ना 6:41–71", title: "प्रभु, हम किस के पास जाएँ?", meditation: "बहुत-से लौट जाते हैं। पतरस का अंगीकार ईमानदार आराधना है।" },
    9: { reference: "यूहन्ना 7", title: "जो प्यासा हो, मेरे पास आए", meditation: "महान पर्व में यीशु खड़े होकर निमंत्रण की घोषणा करते हैं। आज भी।" },
    10: { reference: "यूहन्ना 8:1–30", title: "मैं भी तुझे दोषी नहीं ठहराता", meditation: "अनुग्रह और सत्य यीशु में मिलते हैं: न दोषी ठहराते हैं, न पाप में छोड़ते हैं।" },
    11: { reference: "यूहन्ना 8:31–59", title: "सत्य तुम्हें स्वतंत्र करेगा", meditation: "सच्चा शिष्यत्व उसके वचन में बने रहना है।" },
    12: { reference: "यूहन्ना 9", title: "एक समय मैं अंधा था", meditation: "सम्पूर्ण मनुष्य — देह और आत्मा — यीशु से मिलकर देखता है और आराधना करता है।" },
    13: { reference: "यूहन्ना 10", title: "अच्छा चरवाहा", meditation: "वह अपनों को जानता है। अपना प्राण स्वेच्छा से देता है। दूसरी भेड़ों को एक झुंड में इकट्ठा करता है।" },
    14: { reference: "यूहन्ना 11", title: "पुनरुत्थान और जीवन मैं ही हूँ", meditation: "यीशु मरियम के साथ रोते हैं, फिर मरे हुए को बुलाते हैं। मृत्यु का अंतिम वचन नहीं है।" },
    15: { reference: "यूहन्ना 12", title: "जब तक गेहूँ का दाना मिट्टी में पड़कर मर न जाए", meditation: "क्रूस ही महिमा है। फल का मार्ग मृत्यु से होकर है — उसकी, और उसके साथ हमारी।" },
    16: { reference: "यूहन्ना 13", title: "उसने उन्हें अंत तक प्रेम किया", meditation: "वह पाँव धोते हैं। नई आज्ञा देते हैं: एक दूसरे से प्रेम करो जैसा मैंने तुमसे किया।" },
    17: { reference: "यूहन्ना 14", title: "मार्ग मैं ही हूँ", meditation: "वह स्थान तैयार करने जाते हैं। पिता के पास जाने का एकमात्र मार्ग वही हैं। आत्मा को भेजते हैं।" },
    18: { reference: "यूहन्ना 15", title: "मुझ में बने रहो", meditation: "उसके बिना, कुछ नहीं। उसमें जुड़कर, फल। यहीं मसीही जीवन का हृदय धड़कता है।" },
    19: { reference: "यूहन्ना 16", title: "आत्मा तुम्हें मार्गदर्शन देगा", meditation: "वह हमें अकेला नहीं छोड़ता। आत्मा हमारे साथ — और हम में — सदा रहेगा।" },
    20: { reference: "यूहन्ना 17", title: "हमारे लिए उसकी प्रार्थना", meditation: "उसकी अपनी प्रार्थना धीरे-धीरे पढ़ें। वह एकता के लिए प्रार्थना करता है। आपके लिए (पद 20)।" },
    21: { reference: "यूहन्ना 18:1–27", title: "गिरफ्तारी और इन्कार", meditation: "वह स्वेच्छा से जाते हैं। पतरस इन्कार करता है। यहाँ भी, यीशु ही प्रभु हैं।" },
    22: { reference: "यूहन्ना 18:28–19:16", title: "पीलातुस के सामने", meditation: "सत्य अधिकार के सामने जंजीरों में। अधिकार झपकता है; सत्य बचाता है।" },
    23: { reference: "यूहन्ना 19:17–42", title: "पूरा हुआ", meditation: "परमेश्वर का मेम्ना उठाया गया। हमारे उद्धार का कार्य, सम्पूर्ण।" },
    24: { reference: "यूहन्ना 20:1–18", title: "मरियम, वह जी उठा है", meditation: "वह उसे नाम लेकर बुलाता है। तुझे भी नाम लेकर बुलाता है। कब्र खाली है।" },
    25: { reference: "यूहन्ना 20:19–31", title: "तुम्हें शान्ति मिले", meditation: "संदेह घावों और स्वागत से मिलाया जाता है। मेरा प्रभु और मेरा परमेश्वर।" },
    26: { reference: "यूहन्ना 21:1–14", title: "किनारे पर नाश्ता", meditation: "वह अपने मित्रों के लिए मछली पकाते हैं। जी उठा हुआ राजा भी मित्र है।" },
    27: { reference: "यूहन्ना 21:15–25", title: "क्या तू मुझ से प्रेम रखता है? मेरी भेड़ों को चरा", meditation: "पुनःस्थापना और प्रेषण। प्रेम झुंड की देखभाल में प्रकट होता है।" },
    28: { reference: "यूहन्ना 1 फिर से", title: "एक बैठक में फिर पढ़ें", meditation: "अब परिचय अलग सुनाई देता है। एक बार फिर सुनें।" },
    29: { reference: "अपना पसंदीदा अध्याय", title: "जहाँ वह तुमसे मिला, वहीं लौटें", meditation: "ध्यान, प्रार्थना और जो उसने कहा है उसे लिखने में समय बिताएँ।" },
    30: { reference: "यूहन्ना 17 + 20", title: "उसकी प्रार्थना + उसका जी उठना", meditation: "वहीं समाप्त करें जहाँ शिष्यों ने किया: यीशु की प्रार्थना और खाली कब्र पर।" },
  },
};

const johnAr: ReadingPlanI18n = {
  name: "يوحنا في ٣٠ يومًا",
  tagline: "تعرَّف على يسوع بعيون أقرب أصدقائه.",
  description:
    "إن لم تقرأ الكتاب المقدس من قبل — أو أردت أن تلتقي بيسوع من جديد — فابدأ من هنا. أصحاح قصير أو مشهد كل يوم، لمدة ٣٠ يومًا.",
  days: {
    1: { reference: "يوحنا ١:١–١٨", title: "والكلمة صار جسدًا", meditation: "توقَّف عند الآية ١٤: الله جاء ليسكن في حيِّنا." },
    2: { reference: "يوحنا ١:١٩–٥١", title: "تعالوا وانظروا", meditation: "انظر كيف يدعو يسوع: لا يجادل بل يدعو لتأتي وترى." },
    3: { reference: "يوحنا ٢", title: "تحويل الماء إلى خمر؛ تطهير الهيكل", meditation: "العلامة الأولى فرح في عرس؛ والفعل الثاني غيرة على بيت أبيه." },
    4: { reference: "يوحنا ٣", title: "ينبغي أن تولدوا من فوق", meditation: "الولادة الجديدة عطية الروح. يوحنا ٣:١٦ يعيش داخل هذه المحادثة." },
    5: { reference: "يوحنا ٤", title: "المرأة عند البئر", meditation: "يعبر يسوع حواجز الجنس والعرق والأخلاق ليعطي الماء الحي. وما زال." },
    6: { reference: "يوحنا ٥", title: "شفاء يوم السبت", meditation: "الآب والابن يعملان — للحياة — حتى في يوم الراحة." },
    7: { reference: "يوحنا ٦:١–٤٠", title: "خبز الحياة", meditation: "أطعم خمسة آلاف ثم أعلن: أنا هو خبز الحياة. يوميًا يسندك." },
    8: { reference: "يوحنا ٦:٤١–٧١", title: "يا رب، إلى من نذهب؟", meditation: "كثيرون رجعوا. اعتراف بطرس عبادة صادقة." },
    9: { reference: "يوحنا ٧", title: "إن عطش أحد فليأتِ", meditation: "في العيد الكبير وقف يسوع وصرخ بدعوة. وما زال يصرخ بها." },
    10: { reference: "يوحنا ٨:١–٣٠", title: "ولا أنا أدينك", meditation: "النعمة والحق يلتقيان في يسوع: لا يدين، ولا يتركها في خطيتها." },
    11: { reference: "يوحنا ٨:٣١–٥٩", title: "الحق يحرركم", meditation: "التلمذة الحقيقية أن تثبت في كلمته." },
    12: { reference: "يوحنا ٩", title: "كنت أعمى ثم أبصرت", meditation: "إنسان كامل — جسدًا ونفسًا — يلتقي يسوع، يبصر ويسجد." },
    13: { reference: "يوحنا ١٠", title: "الراعي الصالح", meditation: "يعرف خاصته. يبذل نفسه باختياره. يجمع خرافًا أخر إلى قطيع واحد." },
    14: { reference: "يوحنا ١١", title: "أنا هو القيامة والحياة", meditation: "يبكي يسوع مع مريم، ثم ينادي الميت. الموت ليست له الكلمة الأخيرة." },
    15: { reference: "يوحنا ١٢", title: "إن لم تقع حبة الحنطة في الأرض", meditation: "الصليب هو المجد. طريق الثمر يمر بالموت — موته وموتنا معه." },
    16: { reference: "يوحنا ١٣", title: "أحبهم إلى المنتهى", meditation: "يغسل الأقدام. يعطي وصية جديدة: أحبوا بعضكم بعضًا كما أحببتكم." },
    17: { reference: "يوحنا ١٤", title: "أنا هو الطريق", meditation: "ذاهب ليعد مكانًا. هو الطريق الوحيد إلى الآب. يرسل الروح." },
    18: { reference: "يوحنا ١٥", title: "اثبتوا فيَّ", meditation: "بدونه، لا شيء. متحدًا به، ثمر. هنا قلب الحياة المسيحية ينبض." },
    19: { reference: "يوحنا ١٦", title: "الروح يرشدكم", meditation: "لا يتركنا وحدنا. الروح سيكون معنا — وفينا — إلى الأبد." },
    20: { reference: "يوحنا ١٧", title: "صلاته من أجلنا", meditation: "اقرأ صلاته بهدوء. يصلي من أجل الوحدة. يصلي من أجلك (الآية ٢٠)." },
    21: { reference: "يوحنا ١٨:١–٢٧", title: "القبض والإنكار", meditation: "يذهب طوعًا. بطرس ينكر. حتى هنا، يسوع يقود." },
    22: { reference: "يوحنا ١٨:٢٨–١٩:١٦", title: "أمام بيلاطس", meditation: "الحق مكبَّل أمام السلطة. السلطة ترتعش؛ الحق يخلص." },
    23: { reference: "يوحنا ١٩:١٧–٤٢", title: "قد أُكمل", meditation: "حمل الله مرفوع. عمل خلاصنا، كامل." },
    24: { reference: "يوحنا ٢٠:١–١٨", title: "يا مريم، لقد قام", meditation: "يدعوها باسمها. ويدعوك باسمك. القبر فارغ." },
    25: { reference: "يوحنا ٢٠:١٩–٣١", title: "سلام لكم", meditation: "الشك يُقابَل بالجراح والترحاب. ربي وإلهي." },
    26: { reference: "يوحنا ٢١:١–١٤", title: "إفطار على الشاطئ", meditation: "يطهو السمك لأصدقائه. الملك القائم صديق أيضًا." },
    27: { reference: "يوحنا ٢١:١٥–٢٥", title: "أتحبني؟ ارعَ خرافي", meditation: "ترميم وإرسالية. المحبة تُعبَّر برعاية القطيع." },
    28: { reference: "يوحنا ١ مرة أخرى", title: "اقرأه مرة أخرى دفعة واحدة", meditation: "الآن المقدمة تبدو مختلفة. اسمعها مرة أخرى." },
    29: { reference: "أصحاحك المفضل", title: "ارجع إلى المكان الذي قابلك فيه", meditation: "اقضِ الوقت في التأمل والصلاة وتدوين ما قاله لك." },
    30: { reference: "يوحنا ١٧ + ٢٠", title: "صلاته + قيامته", meditation: "اختم حيث ختم التلاميذ: عند صلاة يسوع والقبر الفارغ." },
  },
};

const johnZh: ReadingPlanI18n = {
  name: "30 天读约翰福音",
  tagline: "借着祂最亲近的朋友的眼睛认识耶稣。",
  description:
    "如果你从未读过圣经——或想再次认识耶稣——就从这里开始。30 天,每天一段经文或场景。",
  days: {
    1: { reference: "约翰福音 1:1–18", title: "道成了肉身", meditation: "停在第 14 节:神搬到我们的街区里来了。" },
    2: { reference: "约翰福音 1:19–51", title: "你来看", meditation: "看耶稣怎样呼召人:不靠辩论,只是邀请——你来,看。" },
    3: { reference: "约翰福音 2", title: "水变酒;洁净圣殿", meditation: "第一个神迹是婚宴的喜乐;第二个行动是为父家的热心。" },
    4: { reference: "约翰福音 3", title: "你们必须重生", meditation: "重生是圣灵的恩赐。约翰福音 3:16 就活在这段对话里。" },
    5: { reference: "约翰福音 4", title: "井旁的妇人", meditation: "耶稣跨越性别、种族、道德的界限,把活水赐下。今日仍然如此。" },
    6: { reference: "约翰福音 5", title: "安息日的医治", meditation: "父和子都在做工——为了赐生命——在安息日也是。" },
    7: { reference: "约翰福音 6:1–40", title: "生命的粮", meditation: "祂喂饱五千人,然后宣告:我就是生命的粮。祂每日托住你。" },
    8: { reference: "约翰福音 6:41–71", title: "主啊,我们还归从谁呢?", meditation: "许多人退去了。彼得的承认是诚实的敬拜。" },
    9: { reference: "约翰福音 7", title: "人若渴了,就到我这里来", meditation: "在大节期里,耶稣站起来高声邀请。祂今日仍在高声邀请。" },
    10: { reference: "约翰福音 8:1–30", title: "我也不定你的罪", meditation: "恩典与真理在耶稣里相遇:不定罪,也不放任她在罪中。" },
    11: { reference: "约翰福音 8:31–59", title: "真理必叫你们得以自由", meditation: "真正的门徒,是常在祂的话里。" },
    12: { reference: "约翰福音 9", title: "从前我是瞎眼的", meditation: "一个完整的人——身体与灵魂——遇见耶稣,看见,然后敬拜。" },
    13: { reference: "约翰福音 10", title: "好牧人", meditation: "祂认识属祂的。祂自己舍命。祂将另外的羊聚成一群。" },
    14: { reference: "约翰福音 11", title: "复活在我,生命也在我", meditation: "耶稣与马利亚同哭,又呼唤死人出来。死亡没有最后一句话。" },
    15: { reference: "约翰福音 12", title: "一粒麦子若不落在地里", meditation: "十字架就是荣耀。结果之路要经过死——祂的死,我们与祂同死。" },
    16: { reference: "约翰福音 13", title: "祂爱他们到底", meditation: "祂洗脚。祂赐下新命令:你们要彼此相爱,如同我爱你们。" },
    17: { reference: "约翰福音 14", title: "我就是道路", meditation: "祂去预备地方。祂是到父那里的唯一道路。祂差下圣灵。" },
    18: { reference: "约翰福音 15", title: "你们要常在我里面", meditation: "离了祂,什么都不能做;在祂里面,就结果子。这是基督徒生命的核心。" },
    19: { reference: "约翰福音 16", title: "圣灵要引导你们", meditation: "祂不撇下我们为孤儿。圣灵将与我们同在——也住在我们里面——直到永远。" },
    20: { reference: "约翰福音 17", title: "祂为我们的祷告", meditation: "慢慢读祂自己的祷告。祂祈求合一。祂为你祷告(20 节)。" },
    21: { reference: "约翰福音 18:1–27", title: "被捕与不认", meditation: "祂自愿前往。彼得不认。即便在此,耶稣仍在掌权。" },
    22: { reference: "约翰福音 18:28–19:16", title: "在彼拉多面前", meditation: "真理在权势面前被捆锁。权势眨眼,真理却拯救。" },
    23: { reference: "约翰福音 19:17–42", title: "成了", meditation: "神的羔羊被举起。我们救恩之工,完成了。" },
    24: { reference: "约翰福音 20:1–18", title: "马利亚,祂复活了", meditation: "祂叫她的名字。祂也叫你的名字。坟墓是空的。" },
    25: { reference: "约翰福音 20:19–31", title: "愿你们平安", meditation: "怀疑遇见伤痕和欢迎。我的主,我的神。" },
    26: { reference: "约翰福音 21:1–14", title: "海边的早餐", meditation: "祂为朋友烤鱼。复活的王,也是朋友。" },
    27: { reference: "约翰福音 21:15–25", title: "你爱我吗?喂养我的羊", meditation: "复兴与差遣。爱在喂养祂的羊群中显出来。" },
    28: { reference: "约翰福音 1 再读一次", title: "一气呵成再读一次", meditation: "现在序言听起来不同了。再听一次。" },
    29: { reference: "你最爱的一章", title: "回到祂遇见你的地方", meditation: "用时间默想、祷告,把祂对你说过的话写下来。" },
    30: { reference: "约翰福音 17 + 20", title: "祂的祷告 + 祂的复活", meditation: "在门徒结束的地方结束:在耶稣的祷告和空坟前。" },
  },
};

export const readingsCatalog: Catalog = {
  es: { john: johnEs },
  pt: { john: johnPt },
  fr: { john: johnFr },
  sw: { john: johnSw },
  hi: { john: johnHi },
  ar: { john: johnAr },
  zh: { john: johnZh },
};

export function localizedPlan(locale: LocaleCode, planId: string) {
  return readingsCatalog[locale]?.[planId];
}

export function localizedDay(locale: LocaleCode, planId: string, dayNum: number) {
  return readingsCatalog[locale]?.[planId]?.days[dayNum];
}
