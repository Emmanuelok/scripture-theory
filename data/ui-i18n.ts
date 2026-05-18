/**
 * UI string translations.
 *
 * Scripture Theory hosts Scripture in 14 public-domain translations across
 * 8 languages — but until now the chrome (navigation, footer, headings)
 * has been English-only. This file translates the most-visible UI strings
 * into the eight locales already supported by the platform's content
 * (homepage, gospel, prayers, reading plans).
 *
 * Translations done by Scripture Theory editorial. Where a string is a
 * common Christian term, we use the standard term of the language. If
 * you spot a translation that misrepresents a biblical concept, please
 * tell us and we will correct it.
 */
import type { LocaleCode } from "@/data/gospel-i18n";

export type UIStrings = {
  // Nav
  nav: {
    today: string;
    bible: string;
    practices: string;
    pray: string;
    me: string;
    resources: string;
    search: string;
    start: string;
    language: string;
  };
  // Footer section headings
  footer: {
    dayOne: string;
    growAndGo: string;
    gospel: string;
    bible: string;
    readingPlans: string;
    scriptureMemory: string;
    witness: string;
    today: string;
    secretPlace: string;
    journey: string;
    resources: string;
    topical: string;
    creeds: string;
    glossary: string;
    disciplines: string;
    sermonLibrary: string;
    atlas: string;
    timeline: string;
    kids: string;
    family: string;
    persecuted: string;
    christianYear: string;
    connect: string;
    jesusInScripture: string;
    sixEmphases: string;
    search: string;
    roadmap: string;
    about: string;
    whatWeBelieve: string;
    privacy: string;
    newBeliever: string;
  };
  // Common buttons / labels
  common: {
    open: string;
    readMore: string;
    pray: string;
    share: string;
    save: string;
    cancel: string;
    next: string;
    previous: string;
    back: string;
    close: string;
  };
};

const STRINGS: Record<LocaleCode, UIStrings> = {
  en: {
    nav: { today: "Today", bible: "Bible", practices: "Practices", pray: "Pray", me: "Me", resources: "Resources", search: "Search", start: "Start", language: "Language" },
    footer: {
      dayOne: "Day one", growAndGo: "Grow & go",
      gospel: "The Gospel", bible: "The Bible", readingPlans: "Reading plans",
      scriptureMemory: "Scripture memory", witness: "Witness",
      today: "Today", secretPlace: "My Secret Place", journey: "Discipleship Journey",
      resources: "Resources", topical: "Topical Scripture", creeds: "Historic creeds",
      glossary: "Theological glossary", disciplines: "Spiritual disciplines",
      sermonLibrary: "Sermon library", atlas: "Bible atlas", timeline: "Biblical timeline",
      kids: "Bible stories for kids", family: "The Family Altar",
      persecuted: "The persecuted Church", christianYear: "The Christian year",
      connect: "One Body (local church)", jesusInScripture: "Jesus throughout the Scriptures",
      sixEmphases: "Six emphases on key passages", search: "Search", roadmap: "Roadmap",
      about: "About", whatWeBelieve: "What we believe", privacy: "Privacy",
      newBeliever: "Just said yes?",
    },
    common: { open: "Open", readMore: "Read more", pray: "Pray", share: "Share", save: "Save", cancel: "Cancel", next: "Next", previous: "Previous", back: "Back", close: "Close" },
  },

  es: {
    nav: { today: "Hoy", bible: "Biblia", practices: "Prácticas", pray: "Orar", me: "Yo", resources: "Recursos", search: "Buscar", start: "Comenzar", language: "Idioma" },
    footer: {
      dayOne: "Día uno", growAndGo: "Crece y ve",
      gospel: "El Evangelio", bible: "La Biblia", readingPlans: "Planes de lectura",
      scriptureMemory: "Memorizar la Escritura", witness: "Testimonio",
      today: "Hoy", secretPlace: "Mi Lugar Secreto", journey: "Camino del discipulado",
      resources: "Recursos", topical: "Escritura por tema", creeds: "Credos históricos",
      glossary: "Glosario teológico", disciplines: "Disciplinas espirituales",
      sermonLibrary: "Biblioteca de sermones", atlas: "Atlas bíblico", timeline: "Cronología bíblica",
      kids: "Historias bíblicas para niños", family: "El Altar Familiar",
      persecuted: "La Iglesia perseguida", christianYear: "El año cristiano",
      connect: "Un solo Cuerpo (iglesia local)", jesusInScripture: "Jesús en todas las Escrituras",
      sixEmphases: "Seis énfasis en pasajes clave", search: "Buscar", roadmap: "Hoja de ruta",
      about: "Acerca de", whatWeBelieve: "Lo que creemos", privacy: "Privacidad",
      newBeliever: "¿Acabas de decir sí?",
    },
    common: { open: "Abrir", readMore: "Leer más", pray: "Orar", share: "Compartir", save: "Guardar", cancel: "Cancelar", next: "Siguiente", previous: "Anterior", back: "Atrás", close: "Cerrar" },
  },

  pt: {
    nav: { today: "Hoje", bible: "Bíblia", practices: "Práticas", pray: "Orar", me: "Eu", resources: "Recursos", search: "Buscar", start: "Começar", language: "Idioma" },
    footer: {
      dayOne: "Dia um", growAndGo: "Cresce e vai",
      gospel: "O Evangelho", bible: "A Bíblia", readingPlans: "Planos de leitura",
      scriptureMemory: "Memorização da Escritura", witness: "Testemunho",
      today: "Hoje", secretPlace: "Meu Lugar Secreto", journey: "Jornada do discípulo",
      resources: "Recursos", topical: "Escritura por tema", creeds: "Credos históricos",
      glossary: "Glossário teológico", disciplines: "Disciplinas espirituais",
      sermonLibrary: "Biblioteca de sermões", atlas: "Atlas bíblico", timeline: "Cronologia bíblica",
      kids: "Histórias bíblicas para crianças", family: "O Altar Familiar",
      persecuted: "A Igreja perseguida", christianYear: "O ano cristão",
      connect: "Um só Corpo (igreja local)", jesusInScripture: "Jesus em todas as Escrituras",
      sixEmphases: "Seis ênfases em passagens-chave", search: "Buscar", roadmap: "Roteiro",
      about: "Sobre", whatWeBelieve: "O que cremos", privacy: "Privacidade",
      newBeliever: "Acabou de dizer sim?",
    },
    common: { open: "Abrir", readMore: "Ler mais", pray: "Orar", share: "Compartilhar", save: "Salvar", cancel: "Cancelar", next: "Próximo", previous: "Anterior", back: "Voltar", close: "Fechar" },
  },

  fr: {
    nav: { today: "Aujourd'hui", bible: "Bible", practices: "Pratiques", pray: "Prier", me: "Moi", resources: "Ressources", search: "Rechercher", start: "Commencer", language: "Langue" },
    footer: {
      dayOne: "Premier jour", growAndGo: "Grandir et aller",
      gospel: "L'Évangile", bible: "La Bible", readingPlans: "Plans de lecture",
      scriptureMemory: "Mémorisation des Écritures", witness: "Témoignage",
      today: "Aujourd'hui", secretPlace: "Mon Lieu secret", journey: "Le chemin du disciple",
      resources: "Ressources", topical: "Écriture par thème", creeds: "Symboles historiques",
      glossary: "Glossaire théologique", disciplines: "Disciplines spirituelles",
      sermonLibrary: "Bibliothèque de sermons", atlas: "Atlas biblique", timeline: "Chronologie biblique",
      kids: "Histoires bibliques pour enfants", family: "L'Autel familial",
      persecuted: "L'Église persécutée", christianYear: "L'année chrétienne",
      connect: "Un seul Corps (église locale)", jesusInScripture: "Jésus dans toutes les Écritures",
      sixEmphases: "Six accents sur six passages-clés", search: "Rechercher", roadmap: "Feuille de route",
      about: "À propos", whatWeBelieve: "Ce que nous croyons", privacy: "Confidentialité",
      newBeliever: "Vous venez de dire oui ?",
    },
    common: { open: "Ouvrir", readMore: "Lire la suite", pray: "Prier", share: "Partager", save: "Enregistrer", cancel: "Annuler", next: "Suivant", previous: "Précédent", back: "Retour", close: "Fermer" },
  },

  sw: {
    nav: { today: "Leo", bible: "Biblia", practices: "Mazoezi", pray: "Omba", me: "Mimi", resources: "Rasilimali", search: "Tafuta", start: "Anza", language: "Lugha" },
    footer: {
      dayOne: "Siku ya kwanza", growAndGo: "Kua na enda",
      gospel: "Injili", bible: "Biblia", readingPlans: "Mipango ya kusoma",
      scriptureMemory: "Kukariri Maandiko", witness: "Ushahidi",
      today: "Leo", secretPlace: "Mahali Pangu pa Siri", journey: "Safari ya udimba",
      resources: "Rasilimali", topical: "Maandiko kwa mada", creeds: "Maungamo ya zamani",
      glossary: "Kamusi ya teolojia", disciplines: "Nidhamu za rohoni",
      sermonLibrary: "Maktaba ya mahubiri", atlas: "Atlasi ya Biblia", timeline: "Mfululizo wa Biblia",
      kids: "Hadithi za Biblia kwa watoto", family: "Madhabahu ya Familia",
      persecuted: "Kanisa linalonyanyaswa", christianYear: "Mwaka wa Kikristo",
      connect: "Mwili mmoja (kanisa la mtaa)", jesusInScripture: "Yesu katika Maandiko yote",
      sixEmphases: "Misisitizo sita katika vifungu vya muhimu", search: "Tafuta", roadmap: "Ramani",
      about: "Kuhusu", whatWeBelieve: "Tunayoyaamini", privacy: "Faragha",
      newBeliever: "Umemkubali Yesu?",
    },
    common: { open: "Fungua", readMore: "Soma zaidi", pray: "Omba", share: "Shiriki", save: "Hifadhi", cancel: "Ghairi", next: "Inayofuata", previous: "Iliyotangulia", back: "Rudi", close: "Funga" },
  },

  hi: {
    nav: { today: "आज", bible: "बाइबिल", practices: "अभ्यास", pray: "प्रार्थना", me: "मैं", resources: "संसाधन", search: "खोजें", start: "शुरू करें", language: "भाषा" },
    footer: {
      dayOne: "पहला दिन", growAndGo: "बढ़ो और जाओ",
      gospel: "सुसमाचार", bible: "बाइबिल", readingPlans: "पठन योजनाएं",
      scriptureMemory: "शास्त्र स्मरण", witness: "साक्षी",
      today: "आज", secretPlace: "मेरा गुप्त स्थान", journey: "शिष्यता की यात्रा",
      resources: "संसाधन", topical: "विषय अनुसार शास्त्र", creeds: "ऐतिहासिक विश्वास-वचन",
      glossary: "धार्मिक शब्दकोश", disciplines: "आत्मिक अनुशासन",
      sermonLibrary: "उपदेश पुस्तकालय", atlas: "बाइबिल एटलस", timeline: "बाइबिल काल-क्रम",
      kids: "बच्चों के लिए बाइबिल कहानियाँ", family: "पारिवारिक वेदी",
      persecuted: "सताई हुई कलीसिया", christianYear: "मसीही वर्ष",
      connect: "एक देह (स्थानीय कलीसिया)", jesusInScripture: "सम्पूर्ण शास्त्र में यीशु",
      sixEmphases: "मुख्य पदों पर छह बल", search: "खोजें", roadmap: "रोडमैप",
      about: "हमारे बारे में", whatWeBelieve: "हम जो विश्वास करते हैं", privacy: "गोपनीयता",
      newBeliever: "क्या आपने अभी हाँ कहा?",
    },
    common: { open: "खोलें", readMore: "और पढ़ें", pray: "प्रार्थना", share: "साझा करें", save: "सहेजें", cancel: "रद्द", next: "अगला", previous: "पिछला", back: "वापस", close: "बंद करें" },
  },

  ar: {
    nav: { today: "اليوم", bible: "الكتاب المقدس", practices: "الممارسات", pray: "صلِّ", me: "أنا", resources: "الموارد", search: "ابحث", start: "ابدأ", language: "اللغة" },
    footer: {
      dayOne: "اليوم الأول", growAndGo: "انمُ واذهب",
      gospel: "الإنجيل", bible: "الكتاب المقدس", readingPlans: "خطط القراءة",
      scriptureMemory: "حفظ الكتاب المقدس", witness: "الشهادة",
      today: "اليوم", secretPlace: "مكاني السري", journey: "رحلة التلمذة",
      resources: "الموارد", topical: "الكتاب المقدس حسب الموضوع", creeds: "قوانين الإيمان التاريخية",
      glossary: "قاموس لاهوتي", disciplines: "الانضباطات الروحية",
      sermonLibrary: "مكتبة العظات", atlas: "أطلس الكتاب المقدس", timeline: "الجدول الزمني للكتاب",
      kids: "قصص الكتاب المقدس للأطفال", family: "مذبح العائلة",
      persecuted: "الكنيسة المضطهَدة", christianYear: "السنة المسيحية",
      connect: "جسد واحد (كنيسة محلية)", jesusInScripture: "يسوع في كل الكتاب المقدس",
      sixEmphases: "ستة محاور في مقاطع رئيسية", search: "ابحث", roadmap: "خارطة الطريق",
      about: "حولنا", whatWeBelieve: "ما نؤمن به", privacy: "الخصوصية",
      newBeliever: "هل قبلت يسوع للتو؟",
    },
    common: { open: "افتح", readMore: "اقرأ المزيد", pray: "صلِّ", share: "شارك", save: "احفظ", cancel: "إلغاء", next: "التالي", previous: "السابق", back: "رجوع", close: "إغلاق" },
  },

  zh: {
    nav: { today: "今日", bible: "圣经", practices: "实践", pray: "祈祷", me: "我", resources: "资源", search: "搜索", start: "开始", language: "语言" },
    footer: {
      dayOne: "第一天", growAndGo: "成长与前行",
      gospel: "福音", bible: "圣经", readingPlans: "读经计划",
      scriptureMemory: "背诵经文", witness: "见证",
      today: "今日", secretPlace: "我的密室", journey: "门徒之旅",
      resources: "资源", topical: "主题经文", creeds: "历代信经",
      glossary: "神学词汇", disciplines: "属灵操练",
      sermonLibrary: "讲道集", atlas: "圣经地图", timeline: "圣经年表",
      kids: "儿童圣经故事", family: "家庭祭坛",
      persecuted: "受逼迫的教会", christianYear: "教会年历",
      connect: "同一身体（本地教会）", jesusInScripture: "通篇圣经中的耶稣",
      sixEmphases: "关键经文的六个侧重", search: "搜索", roadmap: "路线图",
      about: "关于", whatWeBelieve: "我们的信仰", privacy: "隐私",
      newBeliever: "刚刚说\"愿意\"了吗?",
    },
    common: { open: "打开", readMore: "阅读更多", pray: "祈祷", share: "分享", save: "保存", cancel: "取消", next: "下一个", previous: "上一个", back: "返回", close: "关闭" },
  },
};

/** Returns the UI string dictionary for the given locale. */
export function uiFor(locale: LocaleCode | undefined | null): UIStrings {
  return STRINGS[locale ?? "en"] ?? STRINGS.en;
}

/** Locales whose text reads right-to-left. */
export const RTL_LOCALES: LocaleCode[] = ["ar"];

/** Human-readable native language names for the locale switcher. */
export const LOCALE_LABELS: Record<LocaleCode, { native: string; english: string; flag: string }> = {
  en: { native: "English", english: "English", flag: "🇬🇧" },
  es: { native: "Español", english: "Spanish", flag: "🇪🇸" },
  pt: { native: "Português", english: "Portuguese", flag: "🇧🇷" },
  fr: { native: "Français", english: "French", flag: "🇫🇷" },
  sw: { native: "Kiswahili", english: "Swahili", flag: "🇰🇪" },
  hi: { native: "हिन्दी", english: "Hindi", flag: "🇮🇳" },
  ar: { native: "العربية", english: "Arabic", flag: "🇸🇦" },
  zh: { native: "中文", english: "Chinese", flag: "🇨🇳" },
};
