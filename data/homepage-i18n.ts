import type { LocaleCode } from "@/data/gospel-i18n";

export type HomeHero = {
  badge: string;
  h1Lead: string;
  h1Name: string;
  h1Trail: string;
  subtitle: string;
  body: string;
  ctaGospel: string;
  ctaWord: string;
  ctaPray: string;
  ctaStart: string;
  sidebarLabel: string;
  sidebarQuote: string;
  sidebarRef: string;
  sidebarNote: string;
};

export const homeHero: Record<LocaleCode, HomeHero> = {
  en: {
    badge: "JESUS · One Gospel · One Body · For the world",
    h1Lead: "It has always been about",
    h1Name: "JESUS",
    h1Trail: ".",
    subtitle: "JESUS at the center. The Gospel as our message. The Word as our food. The Body as our home.",
    body: "Scripture Theory is not another Bible app and not an AI gimmick. It is a JESUS-centered, non-denominational platform built to lift up Christ Himself, to put the ONE Gospel of the New Testament back in the middle, and to gather believers around the only thing that has ever united the Church: the person and work of the Lord Jesus.",
    ctaGospel: "Read the Gospel →",
    ctaWord: "Open the Word",
    ctaPray: "Learn to pray",
    ctaStart: "Personalize for me",
    sidebarLabel: "The ONE Gospel, in one breath",
    sidebarQuote: "Christ died for our sins. He was buried. He rose on the third day. He was seen. He is alive. He is Lord.",
    sidebarRef: "1 Corinthians 15:3–8",
    sidebarNote: "Two thousand years of Christians from every nation, language, and tradition have lived and died for this Gospel. There is no other. There has never been another.",
  },
  es: {
    badge: "JESÚS · Un solo Evangelio · Un solo Cuerpo · Para el mundo",
    h1Lead: "Siempre ha tratado de",
    h1Name: "JESÚS",
    h1Trail: ".",
    subtitle: "JESÚS en el centro. El Evangelio como nuestro mensaje. La Palabra como nuestro alimento. El Cuerpo como nuestro hogar.",
    body: "Scripture Theory no es otra app de Biblia ni un truco de IA. Es una plataforma centrada en JESÚS, interdenominacional, hecha para exaltar a Cristo mismo, devolver el ÚNICO Evangelio del Nuevo Testamento al centro, y reunir a los creyentes en torno a lo único que siempre ha unido a la Iglesia: la persona y la obra del Señor Jesús.",
    ctaGospel: "Lee el Evangelio →",
    ctaWord: "Abre la Palabra",
    ctaPray: "Aprende a orar",
    ctaStart: "Personalízalo para mí",
    sidebarLabel: "El ÚNICO Evangelio, en una sola respiración",
    sidebarQuote: "Cristo murió por nuestros pecados. Fue sepultado. Resucitó al tercer día. Fue visto. Está vivo. Es Señor.",
    sidebarRef: "1 Corintios 15:3–8",
    sidebarNote: "Dos mil años de cristianos de toda nación, lengua y tradición han vivido y muerto por este Evangelio. No hay otro. Nunca ha habido otro.",
  },
  pt: {
    badge: "JESUS · Um só Evangelho · Um só Corpo · Para o mundo",
    h1Lead: "Sempre foi sobre",
    h1Name: "JESUS",
    h1Trail: ".",
    subtitle: "JESUS no centro. O Evangelho como nossa mensagem. A Palavra como nosso alimento. O Corpo como nosso lar.",
    body: "Scripture Theory não é mais um aplicativo bíblico nem um truque de IA. É uma plataforma centrada em JESUS, interdenominacional, feita para exaltar o próprio Cristo, recolocar o ÚNICO Evangelho do Novo Testamento no centro, e reunir os crentes em torno daquilo que sempre uniu a Igreja: a pessoa e a obra do Senhor Jesus.",
    ctaGospel: "Leia o Evangelho →",
    ctaWord: "Abra a Palavra",
    ctaPray: "Aprenda a orar",
    ctaStart: "Personalize para mim",
    sidebarLabel: "O ÚNICO Evangelho, em um só fôlego",
    sidebarQuote: "Cristo morreu pelos nossos pecados. Foi sepultado. Ressuscitou ao terceiro dia. Foi visto. Ele vive. Ele é Senhor.",
    sidebarRef: "1 Coríntios 15:3–8",
    sidebarNote: "Dois mil anos de cristãos de toda nação, língua e tradição viveram e morreram por este Evangelho. Não há outro. Nunca houve outro.",
  },
  fr: {
    badge: "JÉSUS · Un seul Évangile · Un seul Corps · Pour le monde",
    h1Lead: "Tout a toujours été au sujet de",
    h1Name: "JÉSUS",
    h1Trail: ".",
    subtitle: "JÉSUS au centre. L'Évangile pour message. La Parole pour nourriture. Le Corps pour maison.",
    body: "Scripture Theory n'est pas une énième application biblique ni un gadget IA. C'est une plateforme centrée sur JÉSUS, interconfessionnelle, conçue pour élever le Christ lui-même, remettre au centre l'UNIQUE Évangile du Nouveau Testament, et rassembler les croyants autour de la seule chose qui ait jamais uni l'Église : la personne et l'œuvre du Seigneur Jésus.",
    ctaGospel: "Lis l'Évangile →",
    ctaWord: "Ouvre la Parole",
    ctaPray: "Apprends à prier",
    ctaStart: "Personnaliser pour moi",
    sidebarLabel: "L'UNIQUE Évangile, en un seul souffle",
    sidebarQuote: "Christ est mort pour nos péchés. Il a été enseveli. Il est ressuscité le troisième jour. Il a été vu. Il est vivant. Il est Seigneur.",
    sidebarRef: "1 Corinthiens 15:3–8",
    sidebarNote: "Deux mille ans de chrétiens de toute nation, langue et tradition ont vécu et sont morts pour cet Évangile. Il n'y en a pas d'autre. Il n'y en a jamais eu d'autre.",
  },
  sw: {
    badge: "YESU · Injili moja · Mwili mmoja · Kwa ajili ya dunia",
    h1Lead: "Daima imekuwa juu ya",
    h1Name: "YESU",
    h1Trail: ".",
    subtitle: "YESU ndiye kitovu. Injili ndiyo ujumbe wetu. Neno ndilo chakula chetu. Mwili ndio nyumbani petu.",
    body: "Scripture Theory si app nyingine ya Biblia, wala si mzaha wa AI. Ni jukwaa lililomwekea kitovu YESU, lisiloegemea dhehebu lolote, lililojengwa kumtukuza Kristo mwenyewe, kurudisha Injili MOJA ya Agano Jipya katikati, na kuwakusanya waumini kuzunguka kitu pekee kilichowahi kuunganisha Kanisa: nafsi na kazi ya Bwana Yesu.",
    ctaGospel: "Soma Injili →",
    ctaWord: "Fungua Neno",
    ctaPray: "Jifunze kuomba",
    ctaStart: "Niboreshee mimi mwenyewe",
    sidebarLabel: "Injili MOJA, kwa pumzi moja",
    sidebarQuote: "Kristo alikufa kwa ajili ya dhambi zetu. Akazikwa. Akafufuka siku ya tatu. Akaonekana. Yu hai. Yeye ni Bwana.",
    sidebarRef: "1 Wakorintho 15:3–8",
    sidebarNote: "Miaka elfu mbili ya Wakristo wa kila taifa, lugha na utamaduni wameishi na kufa kwa Injili hii. Hakuna nyingine. Haijawahi kuwa nyingine.",
  },
  hi: {
    badge: "यीशु · एक सुसमाचार · एक देह · पूरे जगत के लिए",
    h1Lead: "सब कुछ हमेशा से",
    h1Name: "यीशु",
    h1Trail: " के विषय में रहा है।",
    subtitle: "यीशु केन्द्र में। सुसमाचार हमारा संदेश। वचन हमारा भोजन। देह हमारा घर।",
    body: "Scripture Theory कोई और बाइबल ऐप नहीं है, न ही कोई AI तमाशा। यह यीशु-केन्द्रित, गैर-संप्रदायिक मंच है, जिसे स्वयं मसीह को ऊँचा उठाने, नए नियम के एकमात्र सुसमाचार को फिर से केन्द्र में रखने, और विश्वासियों को उस एकमात्र वस्तु के चारों ओर इकट्ठा करने के लिए बनाया गया है, जिसने कलीसिया को कभी एक किया है: प्रभु यीशु का व्यक्तित्व और उसका कार्य।",
    ctaGospel: "सुसमाचार पढ़ें →",
    ctaWord: "वचन खोलें",
    ctaPray: "प्रार्थना करना सीखें",
    ctaStart: "मेरे लिए वैयक्तिक करें",
    sidebarLabel: "एकमात्र सुसमाचार, एक साँस में",
    sidebarQuote: "मसीह हमारे पापों के लिए मरा। गाड़ा गया। तीसरे दिन जी उठा। देखा गया। वह जीवित है। वह प्रभु है।",
    sidebarRef: "1 कुरिन्थियों 15:3–8",
    sidebarNote: "हर राष्ट्र, भाषा और परम्परा के मसीहियों के दो हज़ार वर्ष इस सुसमाचार के लिए जीते और मरते आए हैं। कोई दूसरा नहीं है। कभी दूसरा था ही नहीं।",
  },
  ar: {
    badge: "يسوع · إنجيل واحد · جسد واحد · من أجل العالم",
    h1Lead: "كان الأمر دائمًا عن",
    h1Name: "يسوع",
    h1Trail: ".",
    subtitle: "يسوع في المركز. الإنجيل رسالتنا. الكلمة طعامنا. الجسد بيتنا.",
    body: "Scripture Theory ليس مجرد تطبيق آخر للكتاب المقدس، ولا حيلة من حيل الذكاء الاصطناعي. إنه منصة محورها يسوع، غير طائفية، بُنيت لرفع المسيح ذاته، ولإعادة الإنجيل الواحد في العهد الجديد إلى المنتصف، ولجمع المؤمنين حول الشيء الوحيد الذي وحَّد الكنيسة على الإطلاق: شخص الرب يسوع وعمله.",
    ctaGospel: "اقرأ الإنجيل ←",
    ctaWord: "افتح الكلمة",
    ctaPray: "تعلَّم كيف تصلي",
    ctaStart: "اجعله مخصصًا لي",
    sidebarLabel: "الإنجيل الواحد، في نَفَس واحد",
    sidebarQuote: "المسيح مات من أجل خطايانا. دُفن. قام في اليوم الثالث. رُئي. هو حيٌّ. هو الرب.",
    sidebarRef: "١ كورنثوس ١٥:٣–٨",
    sidebarNote: "ألفا سنة من المسيحيين من كل أمة ولغة وتقليد عاشوا وماتوا من أجل هذا الإنجيل. ليس هناك غيره. ولم يكن قط غيره.",
  },
  zh: {
    badge: "耶稣 · 一个福音 · 一个身体 · 为了全世界",
    h1Lead: "一切始终都关乎",
    h1Name: "耶稣",
    h1Trail: "。",
    subtitle: "耶稣居中。福音为我们的信息。圣言为我们的食物。身体为我们的家。",
    body: "Scripture Theory 不是又一个圣经应用,也不是 AI 噱头。它是一个以耶稣为中心、不分宗派的平台,为要高举基督祂自己,把新约那唯一的福音重新放回中心,并把信徒聚集在那唯一曾经使教会合一的事物之上:主耶稣这位本身和祂的工作。",
    ctaGospel: "阅读福音 →",
    ctaWord: "打开圣经",
    ctaPray: "学习祷告",
    ctaStart: "为我量身定制",
    sidebarLabel: "那唯一的福音,一口气说完",
    sidebarQuote: "基督为我们的罪死了。被埋葬了。第三天复活了。被人看见了。祂活着。祂是主。",
    sidebarRef: "哥林多前书 15:3–8",
    sidebarNote: "两千年来,来自各国、各方言、各传统的基督徒都为这福音而活、而死。没有别的福音。从未有过别的福音。",
  },
};
