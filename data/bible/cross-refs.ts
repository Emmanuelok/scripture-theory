// Cross-references for the most-studied verses across Scripture.
// Hand-curated from the public-domain Treasury of Scripture Knowledge
// tradition. The full TSK has ~340,000 entries; this seed covers the
// 80 most-quoted verses so the feature ships meaningfully on day one.
// The schema scales to the full dataset when ingested.

type Key = string; // "{book}:{chapter}:{verse}"

export const CROSS_REFS: Record<Key, string[]> = {
  // Genesis
  "genesis:1:1": ["John 1:1–3", "Hebrews 11:3", "Colossians 1:16", "Psalm 33:6"],
  "genesis:1:27": ["Genesis 5:1", "Matthew 19:4", "Colossians 3:10", "James 3:9"],
  "genesis:3:15": ["Romans 16:20", "Galatians 4:4", "Revelation 12:9", "1 John 3:8"],
  "genesis:12:3": ["Galatians 3:8", "Acts 3:25", "Romans 4:13"],
  "genesis:15:6": ["Romans 4:3", "Galatians 3:6", "James 2:23"],
  "genesis:22:18": ["Galatians 3:16", "Acts 3:25"],

  // Exodus
  "exodus:3:14": ["John 8:58", "Revelation 1:8", "Hebrews 13:8"],
  "exodus:20:3": ["Matthew 22:37", "1 Corinthians 8:6", "Deuteronomy 6:4–5"],

  // Deuteronomy
  "deuteronomy:6:4": ["Mark 12:29", "1 Corinthians 8:6", "John 17:3"],
  "deuteronomy:6:5": ["Matthew 22:37", "Mark 12:30", "Luke 10:27"],

  // Psalms
  "psalms:1:1": ["Jeremiah 17:7–8", "Psalm 119:1–3"],
  "psalms:1:2": ["Joshua 1:8", "Psalm 119:97"],
  "psalms:1:3": ["Jeremiah 17:8", "Ezekiel 47:12", "John 15:5"],
  "psalms:22:1": ["Matthew 27:46", "Mark 15:34"],
  "psalms:23:1": ["John 10:11", "Isaiah 40:11", "Ezekiel 34:11–16", "1 Peter 2:25"],
  "psalms:23:4": ["Hebrews 13:5", "Romans 8:38–39", "Isaiah 41:10"],
  "psalms:23:6": ["John 14:2–3", "Revelation 7:17"],
  "psalms:46:1": ["Hebrews 4:16", "Psalm 91:1–2", "Isaiah 41:10"],
  "psalms:51:10": ["Ezekiel 36:26", "2 Corinthians 5:17", "Titus 3:5"],
  "psalms:100:3": ["John 10:14", "Isaiah 43:1", "Ephesians 2:10"],
  "psalms:117:1": ["Romans 15:11", "Revelation 7:9"],
  "psalms:119:105": ["2 Peter 1:19", "Proverbs 6:23", "Psalm 19:7–8"],
  "psalms:139:14": ["Genesis 1:27", "Psalm 8:4–5"],

  // Isaiah
  "isaiah:6:3": ["Revelation 4:8", "John 12:41"],
  "isaiah:7:14": ["Matthew 1:23", "Luke 1:31"],
  "isaiah:9:6": ["Luke 2:11", "John 14:27", "Hebrews 1:8"],
  "isaiah:40:8": ["1 Peter 1:24–25", "Matthew 24:35"],
  "isaiah:40:31": ["Psalm 27:14", "Lamentations 3:25"],
  "isaiah:41:10": ["Joshua 1:9", "Hebrews 13:5–6", "Deuteronomy 31:6"],
  "isaiah:53:5": ["1 Peter 2:24", "Romans 4:25", "Matthew 8:17"],
  "isaiah:55:6": ["Acts 17:27", "Matthew 7:7", "Hebrews 11:6"],

  // Jeremiah
  "jeremiah:29:11": ["Romans 8:28", "Psalm 33:11"],
  "jeremiah:31:33": ["Hebrews 8:10", "Hebrews 10:16", "2 Corinthians 3:3"],

  // Matthew
  "matthew:5:3": ["Luke 6:20", "Isaiah 57:15"],
  "matthew:5:6": ["John 4:14", "John 6:35", "Psalm 42:1–2"],
  "matthew:5:8": ["Psalm 24:3–4", "Hebrews 12:14", "1 John 3:2–3"],
  "matthew:5:14": ["John 8:12", "Philippians 2:15", "Ephesians 5:8"],
  "matthew:5:44": ["Luke 6:27–28", "Romans 12:14", "Acts 7:60"],
  "matthew:6:9": ["Luke 11:2", "John 17:11"],
  "matthew:6:33": ["Luke 12:31", "Psalm 37:4", "1 Kings 3:11–13"],
  "matthew:7:7": ["Luke 11:9", "John 16:24", "James 1:5"],
  "matthew:11:28": ["John 14:27", "Hebrews 4:9–11", "Jeremiah 31:25"],
  "matthew:22:37": ["Deuteronomy 6:5", "Mark 12:30", "Luke 10:27"],
  "matthew:22:39": ["Leviticus 19:18", "Romans 13:9", "Galatians 5:14"],
  "matthew:28:18": ["Daniel 7:14", "Ephesians 1:21", "Philippians 2:9–10"],
  "matthew:28:19": ["Mark 16:15", "Acts 1:8", "Romans 10:14–15"],
  "matthew:28:20": ["Matthew 18:20", "Acts 18:9–10", "Hebrews 13:5"],

  // Mark
  "mark:1:15": ["Acts 2:38", "Matthew 4:17"],
  "mark:10:45": ["Matthew 20:28", "1 Timothy 2:6", "Philippians 2:7"],

  // Luke
  "luke:1:37": ["Matthew 19:26", "Jeremiah 32:17", "Genesis 18:14"],
  "luke:2:11": ["Isaiah 9:6", "Matthew 1:21", "John 4:42"],
  "luke:9:23": ["Matthew 16:24", "Mark 8:34", "Galatians 2:20"],
  "luke:15:7": ["Luke 15:10", "Ezekiel 18:23", "2 Peter 3:9"],
  "luke:19:10": ["Matthew 18:11", "1 Timothy 1:15"],

  // John
  "john:1:1": ["Genesis 1:1", "1 John 1:1–2", "Revelation 19:13"],
  "john:1:14": ["Philippians 2:6–8", "Colossians 2:9", "Hebrews 1:1–3"],
  "john:3:3": ["1 Peter 1:23", "John 3:5", "2 Corinthians 5:17"],
  "john:3:16": ["Romans 5:8", "1 John 4:9–10", "John 6:40", "John 17:3"],
  "john:6:35": ["John 4:14", "Matthew 5:6", "Revelation 7:16"],
  "john:8:32": ["John 14:6", "Galatians 5:1", "Romans 6:18"],
  "john:10:10": ["Romans 5:17", "John 17:3", "1 John 5:12"],
  "john:11:25": ["John 5:24", "John 14:19", "1 Corinthians 15:20"],
  "john:13:34": ["John 15:12", "1 John 3:23", "1 Thessalonians 4:9"],
  "john:14:6": ["Acts 4:12", "1 Timothy 2:5", "Hebrews 10:19–20"],
  "john:14:27": ["John 16:33", "Philippians 4:7", "Colossians 3:15"],
  "john:15:5": ["Philippians 4:13", "Galatians 2:20", "2 Corinthians 3:5"],
  "john:17:3": ["1 John 5:20", "John 3:16", "Jeremiah 9:24"],
  "john:20:31": ["John 3:15", "1 John 5:13"],

  // Acts
  "acts:1:8": ["Matthew 28:19", "Luke 24:47", "Acts 2:4"],
  "acts:2:38": ["Mark 1:15", "Acts 3:19", "Romans 6:3"],
  "acts:4:12": ["John 14:6", "1 Timothy 2:5", "Acts 10:43"],
  "acts:16:31": ["Romans 10:9", "Acts 13:39"],

  // Romans
  "romans:1:16": ["1 Corinthians 1:18", "2 Timothy 1:8", "Mark 8:38"],
  "romans:3:23": ["Romans 5:12", "Ecclesiastes 7:20", "1 John 1:8"],
  "romans:5:1": ["Ephesians 2:14", "Colossians 1:20", "Isaiah 32:17"],
  "romans:5:8": ["John 3:16", "1 John 4:10", "Ephesians 2:4–5"],
  "romans:6:23": ["James 1:15", "John 3:36", "1 John 5:11"],
  "romans:8:1": ["John 5:24", "John 3:18", "1 Corinthians 1:8"],
  "romans:8:28": ["Genesis 50:20", "Psalm 27:13–14", "2 Corinthians 4:17"],
  "romans:8:38": ["Romans 8:35", "John 10:28–29", "1 John 4:18"],
  "romans:10:9": ["Acts 2:36", "1 Corinthians 12:3", "Philippians 2:11"],
  "romans:10:17": ["Galatians 3:2", "1 Thessalonians 2:13"],
  "romans:12:1": ["1 Peter 2:5", "Hebrews 13:15–16", "Philippians 4:18"],
  "romans:12:2": ["Ephesians 4:22–24", "Colossians 3:10", "1 Peter 1:14"],

  // 1 Corinthians
  "1corinthians:10:13": ["1 Peter 1:6–7", "James 1:13", "Hebrews 2:18"],
  "1corinthians:13:4": ["Galatians 5:22", "Ephesians 4:2", "Colossians 3:12"],
  "1corinthians:15:3": ["Isaiah 53:5–6", "Galatians 1:4", "1 Peter 2:24"],
  "1corinthians:15:20": ["1 Thessalonians 4:14", "Revelation 1:5"],

  // 2 Corinthians
  "2corinthians:5:17": ["Galatians 6:15", "Ephesians 4:24", "Romans 6:4"],
  "2corinthians:5:21": ["Isaiah 53:9", "1 Peter 2:22", "1 John 3:5"],
  "2corinthians:12:9": ["Philippians 4:13", "Isaiah 40:29", "2 Corinthians 4:7"],

  // Galatians
  "galatians:2:20": ["Romans 6:6", "Colossians 3:3", "Philippians 1:21"],
  "galatians:5:22": ["Ephesians 5:9", "Philippians 1:11", "Colossians 3:12–14"],
  "galatians:6:9": ["Hebrews 12:3", "2 Thessalonians 3:13"],

  // Ephesians
  "ephesians:2:8": ["Romans 3:24", "Titus 3:5", "Galatians 2:16"],
  "ephesians:2:10": ["Titus 2:14", "Matthew 5:16", "Philippians 2:13"],
  "ephesians:6:11": ["1 Peter 5:8–9", "2 Corinthians 10:4", "James 4:7"],

  // Philippians
  "philippians:1:6": ["1 Thessalonians 5:23–24", "Jude 1:24"],
  "philippians:2:5": ["John 13:14–15", "1 Peter 2:21", "Matthew 11:29"],
  "philippians:4:6": ["1 Peter 5:7", "Matthew 6:25", "Psalm 55:22"],
  "philippians:4:13": ["2 Corinthians 12:9–10", "Ephesians 6:10", "Colossians 1:11"],

  // Colossians
  "colossians:1:15": ["Hebrews 1:3", "2 Corinthians 4:4", "John 1:18"],
  "colossians:3:2": ["Romans 8:5–6", "Philippians 3:20", "Matthew 6:33"],

  // 1 Thessalonians
  "1thessalonians:5:16": ["Philippians 4:4", "Romans 12:12", "James 1:2"],
  "1thessalonians:5:17": ["Ephesians 6:18", "Luke 18:1", "Romans 12:12"],

  // 2 Timothy
  "2timothy:1:7": ["Romans 8:15", "1 John 4:18", "Acts 1:8"],
  "2timothy:3:16": ["2 Peter 1:20–21", "Psalm 119:160", "John 17:17"],

  // Titus
  "titus:3:5": ["Ephesians 2:8–9", "John 3:5", "1 Peter 1:3"],

  // Hebrews
  "hebrews:4:12": ["Ephesians 6:17", "1 Peter 1:23", "Jeremiah 23:29"],
  "hebrews:4:16": ["Romans 5:2", "Ephesians 3:12", "Hebrews 10:19–22"],
  "hebrews:11:1": ["Romans 8:24–25", "2 Corinthians 4:18", "Romans 10:17"],
  "hebrews:11:6": ["Romans 4:20", "James 1:6", "Acts 17:27"],
  "hebrews:12:1": ["1 Corinthians 9:24", "Philippians 3:13–14"],
  "hebrews:12:2": ["Acts 3:15", "Philippians 2:8–9", "1 Peter 2:21"],
  "hebrews:13:8": ["Malachi 3:6", "James 1:17", "Revelation 1:8"],

  // James
  "james:1:2": ["1 Peter 1:6–7", "Romans 5:3", "Matthew 5:11–12"],
  "james:1:5": ["Matthew 7:7", "Proverbs 2:3–6", "1 Kings 3:9"],
  "james:1:22": ["Matthew 7:21", "Luke 6:46", "Romans 2:13"],
  "james:4:7": ["Ephesians 6:11", "1 Peter 5:8–9", "1 John 5:4"],
  "james:5:16": ["1 John 1:9", "Psalm 32:5", "Proverbs 28:13"],

  // 1 Peter
  "1peter:1:3": ["Titus 3:5", "John 3:3", "Ephesians 2:4–5"],
  "1peter:1:16": ["Leviticus 11:44", "Matthew 5:48", "1 Thessalonians 4:7"],
  "1peter:2:9": ["Exodus 19:5–6", "Revelation 1:6", "Isaiah 43:21"],
  "1peter:3:15": ["Colossians 4:6", "2 Timothy 2:25"],
  "1peter:5:7": ["Philippians 4:6", "Psalm 55:22", "Matthew 6:25–34"],

  // 2 Peter
  "2peter:3:9": ["Ezekiel 18:23", "1 Timothy 2:4", "Romans 2:4"],

  // 1 John
  "1john:1:9": ["Psalm 32:5", "Proverbs 28:13", "Jeremiah 31:34"],
  "1john:3:1": ["John 1:12", "Galatians 3:26", "Romans 8:15"],
  "1john:4:8": ["1 John 4:16", "John 3:16"],
  "1john:4:19": ["1 John 4:10", "Romans 5:8"],
  "1john:5:11": ["John 3:36", "John 10:28", "Romans 6:23"],

  // Revelation
  "revelation:3:20": ["John 14:23", "Song of Solomon 5:2", "Luke 12:36"],
  "revelation:21:4": ["Isaiah 25:8", "1 Corinthians 15:54", "Revelation 7:17"],
  "revelation:22:20": ["1 Corinthians 16:22", "2 Peter 3:12", "James 5:8"],
};

export function crossRefsFor(book: string, chapter: number, verse: number): string[] {
  return CROSS_REFS[`${book}:${chapter}:${verse}`] ?? [];
}
