/**
 * Bible stories for children — read-aloud retellings that stay faithful to
 * the text. Each story is written by Scripture Theory editorial in
 * simple, age-3-to-10 language, with the Bible reference so a parent can
 * read the actual passage afterward.
 *
 * Editorial standard: we don't add to Scripture. Names, places, and the
 * shape of every story are exactly as the Bible tells them. We simplify
 * vocabulary; we never simplify meaning.
 */

export type KidsStory = {
  id: string;
  title: string;
  reference: string;
  bookId: string;
  chapter: number;
  age: "Littles" | "Kids" | "Older kids";
  body: string[]; // paragraphs
  bigIdea: string;
  prayer: string;
  question: string;
};

export const kidsStories: KidsStory[] = [
  {
    id: "creation",
    title: "When God made everything",
    reference: "Genesis 1",
    bookId: "genesis",
    chapter: 1,
    age: "Littles",
    body: [
      "Long, long ago, before there were stars or oceans or you or me — there was God. And God was good, and God was happy, and God wanted to make something beautiful.",
      "So God said, \"Let there be light.\" And just like that, there was light! Then God made the sky, and the seas, and the dry land. He filled the world with trees and flowers and singing birds and splashing whales and crawling bugs.",
      "Then God made people. He made them like little pictures of Himself, so they could love Him and love each other. He looked at everything He made and said, \"This is very good.\"",
    ],
    bigIdea: "God made everything — and everything He made is good.",
    prayer:
      "Thank You, God, for making the sky and the trees and the people I love. Thank You for making me. Amen.",
    question: "What's your favorite thing God made?",
  },
  {
    id: "noah",
    title: "Noah and the great big boat",
    reference: "Genesis 6–9",
    bookId: "genesis",
    chapter: 6,
    age: "Littles",
    body: [
      "A long time after God made the world, people stopped listening to Him. They were mean to each other and did sad, wrong things. It made God so sad He decided to start over.",
      "But God loved one man named Noah. God told Noah, \"Build a great big boat — bigger than your house. Put two of every animal inside. A flood is coming, but I will keep you safe.\"",
      "So Noah built the boat. Lions came. Elephants came. Tiny mice came. The rain fell for forty days and forty nights. Noah and his family and all the animals were safe inside.",
      "When the water finally went down, God put a big, beautiful rainbow in the sky. \"Whenever you see this,\" God said, \"remember My promise. I love you. I will keep you.\"",
    ],
    bigIdea: "God keeps His promises. The rainbow says so.",
    prayer:
      "Thank You, God, for keeping Noah safe in the storm. Keep me safe today too. Amen.",
    question: "Have you ever seen a rainbow? What did God say it would remind us of?",
  },
  {
    id: "abraham",
    title: "Abraham trusts God",
    reference: "Genesis 12",
    bookId: "genesis",
    chapter: 12,
    age: "Kids",
    body: [
      "One day, God spoke to a man named Abram. \"Leave your home,\" God said. \"Leave your country. Go to a new land — a land I will show you. I will make you a great family. Through your family, I will bless the whole world.\"",
      "Abram didn't know where he was going. He didn't have a map. But he packed up his tent, his wife Sarai, his animals, and his nephew Lot — and he went.",
      "Abram trusted God so much that the Bible says, \"Abram believed God, and it counted as goodness in him.\" God changed his name to Abraham — \"father of many\" — and just like God promised, Abraham's family grew and grew. Years later, a baby would be born in Abraham's family line. That baby was Jesus.",
    ],
    bigIdea: "Trusting God means going even when we don't know where.",
    prayer:
      "God, help me trust You today the way Abraham trusted You. Wherever You lead, I will go. Amen.",
    question: "Has God ever asked you to do something that felt hard? What did you do?",
  },
  {
    id: "joseph",
    title: "Joseph and the coat",
    reference: "Genesis 37–50",
    bookId: "genesis",
    chapter: 37,
    age: "Kids",
    body: [
      "Joseph was the favorite son of his father Jacob. Jacob gave him a beautiful coat of many colors. Joseph's older brothers were jealous — so jealous that one day they sold him as a slave to traders going to Egypt.",
      "In Egypt, Joseph worked hard and trusted God. He was thrown into prison for something he didn't do. But God was with him. The king of Egypt heard about Joseph and put him in charge of all the food in the land.",
      "Then a famine came. Joseph's brothers came to Egypt looking for food — and there was Joseph, the brother they had thrown away, now their rescuer. Joseph forgave them. He cried, and they cried, and he gave them food and a home.",
      "\"You meant it for evil,\" Joseph told his brothers, \"but God meant it for good — to save many people alive.\" That is how God works. He can turn even the worst things into a way to help others.",
    ],
    bigIdea: "God can turn even bad days into good ones.",
    prayer:
      "Father, when something feels unfair, help me remember Joseph. You are still working. You are still good. Amen.",
    question: "Has anyone ever been unkind to you? How did Joseph treat his brothers in the end?",
  },
  {
    id: "moses-baby",
    title: "The baby in the basket",
    reference: "Exodus 2",
    bookId: "exodus",
    chapter: 2,
    age: "Littles",
    body: [
      "In Egypt, the king was scared of God's people, the Israelites. He made them work as slaves. He even said all the baby boys should be taken away.",
      "But one mommy had a baby boy she could not give up. She wove a little basket — like a tiny boat — and put her baby inside, and floated him in the river where it was safe.",
      "The king's daughter — the princess — was washing in the river. She heard a tiny cry. She lifted up the basket and saw the baby and loved him right away. She named him Moses, which means \"drawn out of the water.\"",
      "God was watching over that little basket the whole time. God had big, big plans for that baby.",
    ],
    bigIdea: "God watches over little ones. He always has.",
    prayer:
      "Jesus, thank You that You see me. You watched over Moses. You watch over me too. Amen.",
    question: "Who watches over you when you sleep?",
  },
  {
    id: "moses-burning-bush",
    title: "The burning bush",
    reference: "Exodus 3",
    bookId: "exodus",
    chapter: 3,
    age: "Kids",
    body: [
      "Many years later, grown-up Moses was tending sheep in the desert. He saw something strange: a bush on fire — but the fire was not burning it up.",
      "Moses walked closer. A voice spoke from the bush. \"Moses! Moses! Take off your shoes. The ground you are standing on is holy.\" It was God Himself.",
      "\"I have heard My people crying in Egypt,\" God said. \"I am sending you to bring them out.\" Moses was scared. \"Who am I to do that?\" he asked. God said, \"I will be with you.\"",
      "Moses went. And God did exactly what He said. He brought His people out of Egypt with a mighty hand.",
    ],
    bigIdea: "When God sends us, He goes with us.",
    prayer:
      "God, when I am scared, remind me what You told Moses: \"I will be with you.\" Amen.",
    question: "What's the scariest thing you can think of? What did God tell Moses about being scared?",
  },
  {
    id: "passover",
    title: "The first Passover",
    reference: "Exodus 12",
    bookId: "exodus",
    chapter: 12,
    age: "Older kids",
    body: [
      "Pharaoh, the king of Egypt, would not let God's people go. So God sent ten plagues — water turned to blood, frogs, hail, locusts, darkness. Each one harder than the last.",
      "The last plague was the worst: the firstborn son of every house in Egypt would die. But God gave His people a way to be safe. \"Take a perfect lamb,\" He said. \"Paint its blood over your door. When I see the blood, I will pass over your house.\"",
      "The Israelites did exactly that. The angel passed through Egypt that night. Every house with the lamb's blood was kept safe. Pharaoh finally let God's people go.",
      "Many years later, John the Baptist would see Jesus walking by and say, \"Behold, the Lamb of God who takes away the sin of the world.\" Jesus is the perfect Lamb. His blood saves us — not just from one night, but forever.",
    ],
    bigIdea: "Jesus is the perfect Lamb. His blood keeps us safe.",
    prayer:
      "Jesus, thank You for being the Lamb. Thank You that Your blood paid for my sins. Amen.",
    question: "Why do you think God called Jesus the \"Lamb of God\"?",
  },
  {
    id: "david-goliath",
    title: "David and the giant",
    reference: "1 Samuel 17",
    bookId: "1samuel",
    chapter: 17,
    age: "Kids",
    body: [
      "Israel was at war with the Philistines. The Philistines had a giant warrior named Goliath — nine feet tall — who every morning shouted across the valley, \"Send a man to fight me!\"",
      "All of Israel's soldiers were scared. None of them would go.",
      "Then a shepherd boy named David came to bring lunch to his brothers. He heard Goliath shouting and said, \"Who is this giant that he should defy the armies of the living God?\"",
      "David did not wear armor. He took only his shepherd's sling and five smooth stones from the brook. He told Goliath, \"You come at me with a sword and a spear, but I come in the name of the Lord of hosts.\"",
      "One stone. Right between the eyes. The giant fell. And Israel saw that day what David already knew: the battle belongs to the Lord.",
    ],
    bigIdea: "The battle belongs to the Lord.",
    prayer:
      "God, when something feels too big for me, remind me it is not too big for You. Amen.",
    question: "Is there anything that scares you right now? Who is bigger than that thing?",
  },
  {
    id: "psalm-23",
    title: "The Lord is my Shepherd",
    reference: "Psalm 23",
    bookId: "psalms",
    chapter: 23,
    age: "Littles",
    body: [
      "When David grew up he became a king. But before he was king, he was a shepherd. He took care of sheep — bringing them to grass to eat, water to drink, and safe places to sleep.",
      "One day David wrote a song. He said, \"The Lord is my Shepherd. I have everything I need.\"",
      "David meant: God takes care of me the way I used to take care of my sheep. God gives me grass when I'm hungry. God gives me water when I'm thirsty. God walks with me through the scary places. God is good.",
      "That song became Psalm 23. People have sung it for three thousand years. Jesus said it about Himself too: \"I am the good Shepherd.\"",
    ],
    bigIdea: "Jesus is my Shepherd. He takes care of me.",
    prayer:
      "Jesus, You are my Shepherd. Thank You for taking care of me. Amen.",
    question: "What do shepherds do for their sheep? What does Jesus do for you?",
  },
  {
    id: "daniel-lions",
    title: "Daniel and the lions",
    reference: "Daniel 6",
    bookId: "daniel",
    chapter: 6,
    age: "Kids",
    body: [
      "Daniel was an Israelite who worked for the king of Persia. He was so good and wise that the king made him one of the highest officials in the whole kingdom.",
      "The other officials were jealous. They tricked the king into making a new law: anyone who prayed to God instead of to the king would be thrown into the lions' den.",
      "Daniel heard about the law. And then Daniel did exactly what he always did: he went to his upstairs window, opened it toward Jerusalem, knelt down, and prayed to God three times a day.",
      "They threw Daniel to the lions. The king was so sad — but he couldn't change the law. All night the king couldn't sleep. At dawn he ran to the den. \"Daniel! Has your God been able to rescue you?\"",
      "\"O king, live forever!\" Daniel called back. \"My God sent His angel and shut the lions' mouths.\" Not a scratch on him.",
    ],
    bigIdea: "When we keep praying, God is with us — even in the lions' den.",
    prayer:
      "God, help me to keep praying every day like Daniel. Thank You for being with me always. Amen.",
    question: "If a law said you couldn't pray, what would you do? What did Daniel do?",
  },
  {
    id: "christmas",
    title: "Jesus is born",
    reference: "Luke 2",
    bookId: "luke",
    chapter: 2,
    age: "Littles",
    body: [
      "A young woman named Mary lived in a town called Nazareth. One day, an angel came and said, \"You will have a baby. You will name Him Jesus. He will be the Son of God.\"",
      "Mary said, \"Yes. Let it be just as God says.\"",
      "Just before the baby was born, Mary and Joseph had to travel to Bethlehem. The town was so crowded there was no room in the inn. So they stayed in a stable, with the animals.",
      "That night, Jesus was born. Mary wrapped Him in soft cloth and laid Him in a manger — a wooden box where the animals ate. The King of the world. Sleeping in a feeding box.",
      "Out in the fields, shepherds were watching their sheep. The sky filled with angels. \"Good news!\" the angels sang. \"A Savior is born — Christ the Lord!\"",
    ],
    bigIdea: "Jesus is God's gift to the world. Born for you.",
    prayer:
      "Thank You, Jesus, for coming to be one of us. Thank You for being our Savior. Amen.",
    question: "If Jesus was born in a stable, who do you think He came for?",
  },
  {
    id: "jesus-calms-storm",
    title: "Jesus calms the storm",
    reference: "Mark 4:35–41",
    bookId: "mark",
    chapter: 4,
    age: "Kids",
    body: [
      "One night, Jesus and His friends got into a boat to cross the big Sea of Galilee. Jesus was tired. He went to the back of the boat and fell asleep on a cushion.",
      "A wild storm came up. Wind howled. Waves crashed over the boat. The disciples were terrified. They woke Jesus up. \"Teacher! Don't You care that we're going to die?\"",
      "Jesus stood up. He looked at the storm and said, \"Peace. Be still.\" And the wind stopped. The sea went flat. The world became very, very quiet.",
      "The disciples were amazed. \"Who is this,\" they whispered, \"that even the wind and the sea obey Him?\"",
    ],
    bigIdea: "Jesus is bigger than any storm.",
    prayer:
      "Jesus, when life feels scary, You are still in the boat with me. You are the Lord of every storm. Amen.",
    question: "What scary thing in your life is Jesus bigger than?",
  },
  {
    id: "cross",
    title: "The day Jesus saved us",
    reference: "Luke 23",
    bookId: "luke",
    chapter: 23,
    age: "Older kids",
    body: [
      "Jesus was perfect. He never did anything wrong. He healed sick people, fed hungry people, and loved everyone — even the people who hated Him.",
      "But the leaders were jealous. They arrested Jesus. They lied about Him. They put Him on a cross.",
      "Jesus could have stopped it. He had stopped storms with His voice. But He chose to go to the cross — because every wrong thing you and I have ever done needed to be paid for, and only a perfect Person could pay it.",
      "While Jesus was dying, He said, \"Father, forgive them. They don't know what they're doing.\" And then, \"It is finished.\" The biggest debt anyone could ever owe — gone.",
      "They buried Jesus in a tomb cut out of rock. They rolled a giant stone across the door. The sky went dark. Even Jesus' friends thought it was the end. But it wasn't. It was only Friday. Sunday was coming.",
    ],
    bigIdea: "Jesus took our wrongs on Himself. That's how much He loves us.",
    prayer:
      "Jesus, thank You for going to the cross for me. I am sorry for the wrong things I have done. Thank You for forgiving me. Amen.",
    question: "Why do you think Jesus chose to go to the cross? Did He have to?",
  },
  {
    id: "easter",
    title: "He is risen!",
    reference: "Luke 24",
    bookId: "luke",
    chapter: 24,
    age: "Kids",
    body: [
      "On Sunday morning, very early, some women went to Jesus' tomb. They had spices to put on His body. They wondered, \"Who will roll the big stone away for us?\"",
      "But when they got there — the stone was already rolled away. The tomb was empty.",
      "Two angels were standing there. \"Why are you looking for the living among the dead? He is not here. He is risen, just as He said!\"",
      "The women ran to tell the disciples. Mary saw Jesus Himself in the garden. He spoke her name: \"Mary.\" She fell at His feet. He was alive — really, really alive.",
      "Jesus is alive today. The same Jesus who walked out of that tomb is the One who loves you right now.",
    ],
    bigIdea: "Jesus is alive. The story has the best ending.",
    prayer:
      "Jesus, You are alive! Thank You for beating death. Help me live like You're really, really alive. Amen.",
    question: "If Jesus is alive right now, what does that change about today?",
  },
  {
    id: "pentecost",
    title: "The Spirit comes",
    reference: "Acts 2",
    bookId: "acts",
    chapter: 2,
    age: "Older kids",
    body: [
      "After Jesus rose from the dead, He spent forty days with His friends. Then He told them, \"Wait in Jerusalem. I'm going to send you the Holy Spirit.\"",
      "So they waited. They prayed. They worshiped.",
      "On the day of Pentecost, they were all together in one room. Suddenly there came a sound like a mighty rushing wind. Flames like fire came down and rested on every one of them. They were filled with the Holy Spirit.",
      "Peter stood up and preached about Jesus. People from every country in the world heard him in their own language. That day, three thousand people believed in Jesus and were baptized.",
      "The Church was born — and the same Holy Spirit who filled them that day still fills every believer who trusts in Jesus.",
    ],
    bigIdea: "The same Spirit who filled the first Church fills us today.",
    prayer:
      "Holy Spirit, fill me today. Help me to love Jesus and tell others about Him. Amen.",
    question: "What does the Holy Spirit do for us?",
  },
  {
    id: "jesus-loves-me",
    title: "Jesus loves the children",
    reference: "Mark 10:13–16",
    bookId: "mark",
    chapter: 10,
    age: "Littles",
    body: [
      "One day, mommies and daddies were bringing their children to Jesus. They wanted Jesus to put His hands on them and bless them.",
      "But the disciples — Jesus' friends — got annoyed. \"Jesus is busy! Don't bother Him with little kids!\"",
      "When Jesus saw what they were doing, He was sad. \"No! Let the children come to Me. Don't stop them. The kingdom of God belongs to children just like these.\"",
      "Then Jesus took the children in His arms, put His hands on them, and blessed them. The King of heaven, holding children, smiling at children, loving children.",
      "He loves you exactly like that today.",
    ],
    bigIdea: "Jesus loves children. He loves you.",
    prayer:
      "Jesus, thank You for loving me. Thank You for making space for me on Your lap. Amen.",
    question: "How does it feel to know Jesus is happy to see you?",
  },
];

export const kidsAges: KidsStory["age"][] = ["Littles", "Kids", "Older kids"];
