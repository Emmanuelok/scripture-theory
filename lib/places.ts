// City / country / region → (lat, lng) lookup. Used to place news-story
// dots on the world map. Pure data, no API calls. Keywords are lower-case
// substrings of news titles/descriptions. First match wins.
//
// Coverage is intentionally focused on places that show up in world news:
// capitals, megacities, conflict zones, and major regional names.

export type Place = {
  name: string;
  lat: number;
  lng: number;
  keywords: string[];
};

export const PLACES: Place[] = [
  // — Africa —
  { name: "Lagos", lat: 6.5244, lng: 3.3792, keywords: ["lagos", "abuja", "nigeria", "nigerian"] },
  { name: "Cairo", lat: 30.0444, lng: 31.2357, keywords: ["cairo", "egypt", "egyptian"] },
  { name: "Khartoum", lat: 15.5007, lng: 32.5599, keywords: ["khartoum", "sudan", "sudanese", "darfur"] },
  { name: "Juba", lat: 4.8517, lng: 31.5825, keywords: ["juba", "south sudan"] },
  { name: "Addis Ababa", lat: 9.03, lng: 38.74, keywords: ["addis", "ethiopia", "ethiopian", "tigray", "amhara"] },
  { name: "Nairobi", lat: -1.286, lng: 36.8172, keywords: ["nairobi", "kenya", "kenyan"] },
  { name: "Mogadishu", lat: 2.0469, lng: 45.3182, keywords: ["mogadishu", "somalia", "al-shabaab", "shabaab"] },
  { name: "Asmara", lat: 15.3229, lng: 38.9251, keywords: ["asmara", "eritrea"] },
  { name: "Kampala", lat: 0.3476, lng: 32.5825, keywords: ["kampala", "uganda"] },
  { name: "Kigali", lat: -1.9579, lng: 30.1127, keywords: ["kigali", "rwanda"] },
  { name: "Kinshasa", lat: -4.4419, lng: 15.2663, keywords: ["kinshasa", "congo", "drc", "goma"] },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241, keywords: ["cape town", "south africa", "johannesburg", "pretoria"] },
  { name: "Harare", lat: -17.8252, lng: 31.0335, keywords: ["harare", "zimbabwe"] },
  { name: "Maputo", lat: -25.9692, lng: 32.5732, keywords: ["maputo", "mozambique", "cabo delgado"] },
  { name: "Antananarivo", lat: -18.8792, lng: 47.5079, keywords: ["antananarivo", "madagascar"] },
  { name: "Luanda", lat: -8.839, lng: 13.2894, keywords: ["luanda", "angola"] },
  { name: "Accra", lat: 5.6037, lng: -0.187, keywords: ["accra", "ghana"] },
  { name: "Dakar", lat: 14.7167, lng: -17.4677, keywords: ["dakar", "senegal"] },
  { name: "Bamako", lat: 12.6392, lng: -8.0029, keywords: ["bamako", "mali"] },
  { name: "Ouagadougou", lat: 12.3714, lng: -1.5197, keywords: ["ouagadougou", "burkina faso"] },
  { name: "Niamey", lat: 13.5117, lng: 2.1251, keywords: ["niamey", "niger"] },
  { name: "Yaoundé", lat: 3.848, lng: 11.5021, keywords: ["yaounde", "cameroon"] },
  { name: "Algiers", lat: 36.7538, lng: 3.0588, keywords: ["algiers", "algeria"] },
  { name: "Tunis", lat: 36.8065, lng: 10.1815, keywords: ["tunis", "tunisia"] },
  { name: "Tripoli (LY)", lat: 32.8872, lng: 13.1913, keywords: ["tripoli", "libya"] },
  { name: "Rabat", lat: 34.0209, lng: -6.8416, keywords: ["rabat", "morocco", "casablanca"] },
  { name: "Lusaka", lat: -15.3875, lng: 28.3228, keywords: ["lusaka", "zambia"] },
  { name: "Lilongwe", lat: -13.9626, lng: 33.7741, keywords: ["lilongwe", "malawi"] },

  // — Middle East —
  { name: "Jerusalem", lat: 31.7683, lng: 35.2137, keywords: ["jerusalem", "israel", "israeli", "tel aviv", "netanyahu"] },
  { name: "Gaza City", lat: 31.5018, lng: 34.4663, keywords: ["gaza", "rafah", "khan younis", "palestin", "hamas"] },
  { name: "Beirut", lat: 33.8938, lng: 35.5018, keywords: ["beirut", "lebanon", "hezbollah"] },
  { name: "Damascus", lat: 33.5138, lng: 36.2765, keywords: ["damascus", "syria", "aleppo", "homs"] },
  { name: "Amman", lat: 31.9454, lng: 35.9284, keywords: ["amman", "jordan"] },
  { name: "Baghdad", lat: 33.3152, lng: 44.3661, keywords: ["baghdad", "iraq", "mosul", "basra"] },
  { name: "Tehran", lat: 35.6892, lng: 51.389, keywords: ["tehran", "iran", "iranian"] },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753, keywords: ["riyadh", "saudi", "mecca", "medina", "mbs"] },
  { name: "Sanaa", lat: 15.3694, lng: 44.191, keywords: ["sanaa", "yemen", "houthi"] },
  { name: "Doha", lat: 25.2854, lng: 51.531, keywords: ["doha", "qatar"] },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, keywords: ["dubai", "abu dhabi", "uae", "emirates"] },
  { name: "Kuwait City", lat: 29.3759, lng: 47.9774, keywords: ["kuwait"] },
  { name: "Ankara", lat: 39.9334, lng: 32.8597, keywords: ["ankara", "istanbul", "turkey", "turkish", "erdogan"] },

  // — Europe —
  { name: "London", lat: 51.5074, lng: -0.1278, keywords: ["london", "uk", "britain", "british", "england", "scotland", "wales"] },
  { name: "Dublin", lat: 53.3498, lng: -6.2603, keywords: ["dublin", "ireland", "irish"] },
  { name: "Paris", lat: 48.8566, lng: 2.3522, keywords: ["paris", "france", "french", "macron"] },
  { name: "Berlin", lat: 52.52, lng: 13.405, keywords: ["berlin", "germany", "german"] },
  { name: "Madrid", lat: 40.4168, lng: -3.7038, keywords: ["madrid", "spain", "spanish", "barcelona"] },
  { name: "Rome", lat: 41.9028, lng: 12.4964, keywords: ["rome", "italy", "italian", "vatican", "pope"] },
  { name: "Lisbon", lat: 38.7223, lng: -9.1393, keywords: ["lisbon", "portugal"] },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041, keywords: ["amsterdam", "netherlands", "dutch", "hague"] },
  { name: "Brussels", lat: 50.8503, lng: 4.3517, keywords: ["brussels", "belgium", "eu commission", "european union"] },
  { name: "Bern", lat: 46.948, lng: 7.4474, keywords: ["bern", "switzerland", "geneva", "zurich"] },
  { name: "Vienna", lat: 48.2082, lng: 16.3738, keywords: ["vienna", "austria"] },
  { name: "Athens", lat: 37.9838, lng: 23.7275, keywords: ["athens", "greece", "greek"] },
  { name: "Warsaw", lat: 52.2297, lng: 21.0122, keywords: ["warsaw", "poland", "polish"] },
  { name: "Prague", lat: 50.0755, lng: 14.4378, keywords: ["prague", "czech"] },
  { name: "Budapest", lat: 47.4979, lng: 19.0402, keywords: ["budapest", "hungary", "orban"] },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686, keywords: ["stockholm", "sweden"] },
  { name: "Oslo", lat: 59.9139, lng: 10.7522, keywords: ["oslo", "norway"] },
  { name: "Helsinki", lat: 60.1699, lng: 24.9384, keywords: ["helsinki", "finland"] },
  { name: "Copenhagen", lat: 55.6761, lng: 12.5683, keywords: ["copenhagen", "denmark"] },
  { name: "Moscow", lat: 55.7558, lng: 37.6173, keywords: ["moscow", "kremlin", "russia", "russian", "putin"] },
  { name: "Kyiv", lat: 50.4501, lng: 30.5234, keywords: ["kyiv", "kiev", "ukraine", "ukrainian", "zelensky", "kharkiv", "odesa"] },
  { name: "Minsk", lat: 53.9006, lng: 27.5591, keywords: ["minsk", "belarus", "lukashenko"] },

  // — Central / South Asia —
  { name: "Tbilisi", lat: 41.7151, lng: 44.8271, keywords: ["tbilisi", "georgia"] },
  { name: "Yerevan", lat: 40.1792, lng: 44.4991, keywords: ["yerevan", "armenia", "nagorno"] },
  { name: "Baku", lat: 40.4093, lng: 49.8671, keywords: ["baku", "azerbaijan"] },
  { name: "Tashkent", lat: 41.2995, lng: 69.2401, keywords: ["tashkent", "uzbekistan"] },
  { name: "Astana", lat: 51.1605, lng: 71.4704, keywords: ["astana", "kazakhstan", "almaty"] },
  { name: "Dushanbe", lat: 38.5598, lng: 68.787, keywords: ["dushanbe", "tajikistan"] },
  { name: "Bishkek", lat: 42.8746, lng: 74.5698, keywords: ["bishkek", "kyrgyz"] },
  { name: "Kabul", lat: 34.5553, lng: 69.2075, keywords: ["kabul", "afghanistan", "afghan", "taliban"] },
  { name: "Islamabad", lat: 33.6844, lng: 73.0479, keywords: ["islamabad", "pakistan", "karachi", "lahore"] },
  { name: "New Delhi", lat: 28.6139, lng: 77.209, keywords: ["delhi", "india", "indian", "mumbai", "kolkata", "modi"] },
  { name: "Kathmandu", lat: 27.7172, lng: 85.324, keywords: ["kathmandu", "nepal"] },
  { name: "Dhaka", lat: 23.8103, lng: 90.4125, keywords: ["dhaka", "bangladesh"] },
  { name: "Colombo", lat: 6.9271, lng: 79.8612, keywords: ["colombo", "sri lanka"] },
  { name: "Thimphu", lat: 27.4716, lng: 89.6386, keywords: ["thimphu", "bhutan"] },

  // — East Asia —
  { name: "Beijing", lat: 39.9042, lng: 116.4074, keywords: ["beijing", "china", "chinese", "shanghai", "shenzhen", "xi jinping", "ccp"] },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694, keywords: ["hong kong"] },
  { name: "Taipei", lat: 25.033, lng: 121.5654, keywords: ["taipei", "taiwan"] },
  { name: "Pyongyang", lat: 39.0392, lng: 125.7625, keywords: ["pyongyang", "north korea", "dprk", "kim jong"] },
  { name: "Seoul", lat: 37.5665, lng: 126.978, keywords: ["seoul", "south korea"] },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, keywords: ["tokyo", "japan", "japanese", "osaka"] },
  { name: "Ulaanbaatar", lat: 47.8864, lng: 106.9057, keywords: ["ulaanbaatar", "mongolia"] },

  // — Southeast Asia —
  { name: "Hanoi", lat: 21.0285, lng: 105.8542, keywords: ["hanoi", "vietnam", "ho chi minh"] },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018, keywords: ["bangkok", "thailand", "thai"] },
  { name: "Yangon", lat: 16.8409, lng: 96.1735, keywords: ["yangon", "myanmar", "burma", "rohingya"] },
  { name: "Phnom Penh", lat: 11.5564, lng: 104.9282, keywords: ["phnom penh", "cambodia"] },
  { name: "Vientiane", lat: 17.9757, lng: 102.6331, keywords: ["vientiane", "laos"] },
  { name: "Kuala Lumpur", lat: 3.139, lng: 101.6869, keywords: ["kuala lumpur", "malaysia"] },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, keywords: ["singapore"] },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456, keywords: ["jakarta", "indonesia", "indonesian"] },
  { name: "Manila", lat: 14.5995, lng: 120.9842, keywords: ["manila", "philippines", "filipino"] },

  // — Oceania —
  { name: "Sydney", lat: -33.8688, lng: 151.2093, keywords: ["sydney", "australia", "australian", "melbourne", "canberra"] },
  { name: "Auckland", lat: -36.8485, lng: 174.7633, keywords: ["auckland", "new zealand", "wellington"] },
  { name: "Port Moresby", lat: -9.4438, lng: 147.1803, keywords: ["port moresby", "papua new guinea", "png"] },
  { name: "Suva", lat: -18.1416, lng: 178.4419, keywords: ["suva", "fiji"] },

  // — North America —
  { name: "Washington DC", lat: 38.9072, lng: -77.0369, keywords: ["washington", "white house", "biden", "trump", "us senate", "us house", "supreme court", "pentagon"] },
  { name: "New York", lat: 40.7128, lng: -74.006, keywords: ["new york", "manhattan", "brooklyn", "queens", "un general assembly"] },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, keywords: ["los angeles", "california", "san francisco", "silicon valley"] },
  { name: "Chicago", lat: 41.8781, lng: -87.6298, keywords: ["chicago", "illinois"] },
  { name: "Houston", lat: 29.7604, lng: -95.3698, keywords: ["houston", "texas", "dallas"] },
  { name: "Ottawa", lat: 45.4215, lng: -75.6972, keywords: ["ottawa", "canada", "canadian", "toronto", "vancouver", "montreal"] },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332, keywords: ["mexico", "mexican", "tijuana"] },

  // — Caribbean / Central America —
  { name: "Port-au-Prince", lat: 18.5944, lng: -72.3074, keywords: ["port-au-prince", "haiti", "haitian"] },
  { name: "Havana", lat: 23.1136, lng: -82.3666, keywords: ["havana", "cuba", "cuban"] },
  { name: "Santo Domingo", lat: 18.4861, lng: -69.9312, keywords: ["santo domingo", "dominican"] },
  { name: "Guatemala City", lat: 14.6349, lng: -90.5069, keywords: ["guatemala"] },
  { name: "Tegucigalpa", lat: 14.0723, lng: -87.1921, keywords: ["tegucigalpa", "honduras"] },
  { name: "San Salvador", lat: 13.6929, lng: -89.2182, keywords: ["san salvador", "el salvador"] },
  { name: "Managua", lat: 12.1364, lng: -86.2514, keywords: ["managua", "nicaragua"] },
  { name: "San José (CR)", lat: 9.9281, lng: -84.0907, keywords: ["san jose, costa rica", "costa rica"] },
  { name: "Panama City", lat: 8.9824, lng: -79.5199, keywords: ["panama"] },
  { name: "Kingston (JM)", lat: 17.9712, lng: -76.7926, keywords: ["kingston", "jamaica"] },

  // — South America —
  { name: "Brasília", lat: -15.7975, lng: -47.8919, keywords: ["brasilia", "brazil", "brazilian", "sao paulo", "rio de janeiro", "lula"] },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, keywords: ["buenos aires", "argentina", "argentine", "milei"] },
  { name: "Bogotá", lat: 4.711, lng: -74.0721, keywords: ["bogota", "colombia", "colombian"] },
  { name: "Caracas", lat: 10.4806, lng: -66.9036, keywords: ["caracas", "venezuela", "venezuelan", "maduro"] },
  { name: "Lima", lat: -12.0464, lng: -77.0428, keywords: ["lima", "peru", "peruvian"] },
  { name: "Quito", lat: -0.1807, lng: -78.4678, keywords: ["quito", "ecuador"] },
  { name: "La Paz", lat: -16.5, lng: -68.15, keywords: ["la paz", "bolivia"] },
  { name: "Asunción", lat: -25.2637, lng: -57.5759, keywords: ["asuncion", "paraguay"] },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645, keywords: ["montevideo", "uruguay"] },
  { name: "Santiago", lat: -33.4489, lng: -70.6693, keywords: ["santiago", "chile", "chilean"] },
];

export function placeFromText(text: string): Place | null {
  const hay = text.toLowerCase();
  // Prefer the LONGEST matching keyword (most specific). A plain first-match
  // in array order mis-pinned "South Sudan" onto Khartoum because "sudan" is
  // a substring of "south sudan" and Khartoum is listed first.
  let best: Place | null = null;
  let bestLen = 0;
  for (const p of PLACES) {
    for (const k of p.keywords) {
      if (k.length > bestLen && hay.includes(k)) {
        best = p;
        bestLen = k.length;
      }
    }
  }
  return best;
}
