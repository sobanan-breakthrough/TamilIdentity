/* ============================================================================
   TamilIdentity∞ — Content data layer
   Grounded in Sangam poetics, the Tirukkural, and the Siddhar tradition.
   All content is bilingual-aware: Tamil script + romanised transliteration
   + accessible English, so readers and non-readers of Tamil are both included.
   ============================================================================ */

/* The five landscapes — Aintinai. The flagship of Pillar I.
   Each maps ecology → interior emotion (akam) → public/war phase (puram). */
const LANDSCAPES = [
  {
    id: "kurinji",
    tamil: "குறிஞ்சி",
    roman: "Kuṟiñci",
    en: "Mountains & Hills",
    flower: "Kurinji blossom",
    akam: "Union of lovers",
    akamTamil: "களவு · Kalavu",
    puram: "Vetci — the cattle raid",
    meaning:
      "The clandestine, electric first meeting of lovers in the high hills. In the public world, the same terrain sparks the raid that provokes a war — the beginning of things.",
    time: "Midnight · the cold season",
    deity: "Murugan",
    hue: "#6d5aa8",
  },
  {
    id: "mullai",
    tamil: "முல்லை",
    roman: "Mullai",
    en: "Forests & Woodlands",
    flower: "Jasmine",
    akam: "Patient waiting, domestic faith",
    akamTamil: "இருத்தல் · Iruttal",
    puram: "Karanthai — retrieving the herds",
    meaning:
      "The forest of the faithful heart that waits through the monsoon for a loved one to return. Publicly, it is the defence of what belongs to the community.",
    time: "Evening · the rains",
    deity: "Māyōn",
    hue: "#3f7d54",
  },
  {
    id: "marutam",
    tamil: "மருதம்",
    roman: "Marutam",
    en: "Agricultural Plains",
    flower: "Marutam (queen's flower)",
    akam: "Lovers' quarrels, discord",
    akamTamil: "ஊடல் · Ūdal",
    puram: "Uzhignai — the fortress siege",
    meaning:
      "The fertile riverine plains of settled towns, where the complexity of married life — jealousy, sulking, reconciliation — plays out. The city's wealth also draws the siege.",
    time: "Dawn · near sunrise",
    deity: "Indiran",
    hue: "#c8992e",
  },
  {
    id: "neytal",
    tamil: "நெய்தல்",
    roman: "Neytal",
    en: "Seashore & Coast",
    flower: "Blue water lily",
    akam: "Anxious waiting, longing, grief",
    akamTamil: "இரங்கல் · Irangal",
    puram: "Thumbai — the pitched battle",
    meaning:
      "The coast where one watches the horizon for a ship that has not returned. Separation across water; and in the public sphere, the open clash of armies.",
    time: "Twilight",
    deity: "Varunan",
    hue: "#2b8a9e",
  },
  {
    id: "palai",
    tamil: "பாலை",
    roman: "Pālai",
    en: "Arid Wasteland",
    flower: "Parched jasmine",
    akam: "Separation, the hard journey",
    akamTamil: "பிரிதல் · Piridal",
    puram: "Vaakai — victory & conquest",
    meaning:
      "Not a place but a state — the sun-scorched land the traveller crosses in search of wealth or in elopement. Enduring hardship for the sake of something greater; the road to triumph.",
    time: "Midday · high summer",
    deity: "Korravai",
    hue: "#b56a34",
  },
];

/* Kaniyan Pungundranar — the cosmopolitan heart of Pillar II. */
const YADHUM = {
  tamil: "யாதும் ஊரே யாவரும் கேளிர்",
  roman: "Yāthum ūrē yāvarum kēḷir",
  en: "Every town is our home town; every human, our kin.",
  poet: "Kaniyan Pūngundranār",
  source: "Puṟanāṉūṟu 192 · c. 1st century CE",
  gloss:
    "Good and evil do not come to us from others — we generate them within. Life is a raft carried down a mountain river swollen by storm. Because every one of us is equally at the mercy of that current, the wise neither fawn over the powerful nor look down on the weak.",
};

/* Tirukkural couplets — Pillar II, the ethic of Aram. Seven-word kural venba. */
const KURALS = [
  {
    n: 1,
    book: "Aram · Virtue",
    tamil: "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.",
    roman: "Akara mudhala ezhuththellām ādhi\nbhagavan mudhaṟṟē ulagu.",
    en: "As the letter A begins the alphabet, so an ancient First Cause begins the world.",
    theme: "Beginnings",
  },
  {
    n: 80,
    book: "Aram · Virtue",
    tamil: "அன்பின் வழியது உயிர்நிலை அஃதிலார்க்கு\nஎன்புதோல் போர்த்த உடம்பு.",
    roman: "Anbin vazhiyadhu uyirnilai aḵdhilārkku\nenbudhōl pōrththa udambu.",
    en: "A life ruled by love is the living soul. Without it, we are only bones wrapped in skin.",
    theme: "Anbu — love as the seed of virtue",
  },
  {
    n: 291,
    book: "Aram · Virtue",
    tamil: "வாய்மை எனப்படுவது யாதெனின் யாதொன்றும்\nதீமை இலாத சொலல்.",
    roman: "Vāymai enappaduvadhu yādhenin yādhoṉṟum\ntīmai ilādha solal.",
    en: "What is truth? It is speech entirely free of harm to any living being.",
    theme: "Veracity",
  },
  {
    n: 397,
    book: "Porul · Society",
    tamil: "யாதானும் நாடாமால் ஊராமால் என்னொருவன்\nசாந்துணையுங் கல்லாத வாறு.",
    roman: "Yādhāṉum nādāmāl ūrāmāl ennoruvan\nsāndhuṇaiyuṅ kallādha vāṟu.",
    en: "To the learned, every land is home and every town their own. Why then would anyone stop learning until the day they die?",
    theme: "Learning & belonging",
  },
  {
    n: 55,
    book: "Aram · Virtue",
    tamil: "தெய்வம் தொழாஅள் கொழுநன் தொழுதெழுவாள்\nபெய்யெனப் பெய்யும் மழை.",
    roman: "Deyvam tozhāaḷ kozhunan tozhudhezhuvāḷ\npeyyenap peyyum mazhai.",
    en: "It is often read that the devoted partner commands even the rain — a verse later ages debate; we cite it as a window into how classical Tamil prized fidelity.",
    theme: "Read with a critical eye",
  },
  {
    n: 543,
    book: "Porul · Statecraft",
    tamil: "அந்தணர் நூற்கும் அறத்திற்கும் ஆதியாய்\nநின்றது மன்னவன் கோல்.",
    roman: "Andhaṇar nūṟkum aṟaththiṟkum ādhiyāy\nninṟadhu mannavan kōl.",
    en: "The just sceptre (kol) of the ruler is the foundation of both wisdom and virtue — power answers to justice, not the reverse.",
    theme: "The sceptre over the spear",
  },
];

/* The body as temple — Pillar IV, Thirumular's somatic vision. */
const BODY_TEMPLE = {
  verse: {
    tamil: "உள்ளம் பெரும் கோயில் ஊனுடம்பு ஆலயம்",
    roman: "Uḷḷam perum kōyil ūṉ udambu ālayam",
    en: "The heart is the great temple; the body of flesh, its shrine.",
    poet: "Thirumūlar",
    source: "Tirumandiram",
  },
  parts: [
    {
      id: "heart",
      label: "Heart",
      tamil: "உள்ளம்",
      ritual: "The Grand Temple — Kōvil",
      note: "Not the stone sanctum on a hill, but the innermost chamber you already carry.",
    },
    {
      id: "breath",
      label: "Breath",
      tamil: "மூச்சு",
      ritual: "The nadaswaram — sacred music",
      note: "Vasi yoga: the breath is the temple's living reed, playing without pause.",
    },
    {
      id: "pulse",
      label: "Heartbeat",
      tamil: "இதயத்துடிப்பு",
      ritual: "The mridangam — the drum",
      note: "Every beat keeps the rhythm of the ritual that never stops.",
    },
    {
      id: "eyes",
      label: "Eyes",
      tamil: "கண்கள்",
      ritual: "The arati — the lamp",
      note: "The light of sight is the flame offered and received.",
    },
    {
      id: "vasal",
      label: "The Threshold",
      tamil: "வாசல்",
      ritual: "Vāsal — the inner doorway",
      note: "Once you cross this inner threshold in stillness, pilgrimage and scripture fall away.",
    },
  ],
};

/* Voices of the Siddhars — Pillar III, radical social democracy. */
const SIDDHARS = [
  {
    name: "Thirumūlar",
    tamil: "திருமூலர்",
    line: "“One is the caste, and One is God.”",
    lineTamil: "ஒன்றே குலம் ஒருவனே தேவன்",
    note: "The founding declaration of Tamil radical egalitarianism — to see the divine everywhere is to make untouchability impossible.",
  },
  {
    name: "Sivavākkiyar",
    tamil: "சிவவாக்கியர்",
    line: "“A planted stone will never speak — the living god dwells within you.”",
    lineTamil: "நட்ட கல்லைத் தெய்வமென்று …",
    note: "The 10th-century rebel poet who mocked idol-worship and ritual bathing, insisting purity is internal.",
  },
  {
    name: "Kudambai",
    tamil: "குடம்பை",
    line: "A woman master of alchemy and medicine.",
    lineTamil: "பெண் சித்தர்",
    note: "She attained Soruba Samadhi at Mayavaram — 'the place of the deathless boon' — proof that this path was never closed to women.",
  },
  {
    name: "Bogar",
    tamil: "போகர்",
    line: "Sculpted the Palani deity from nine minerals.",
    lineTamil: "நவபாஷாணம்",
    note: "Navapashanam — the master-alchemist's compound of nine arsenical minerals, science in service of the sacred.",
  },
];

/* Timeline of a continuous civilisation — the Land of Tamilakam. */
const TIMELINE = [
  { when: "c. 1800 BCE", what: "Urn-burials and gold at Adichanallur signal deep antiquity.", tag: "land" },
  { when: "6th c. BCE", what: "Tamil-Brahmi literacy at Keezhadi — an urban, literate Sangam-age society.", tag: "land" },
  { when: "late 2nd c. BCE", what: "The Tolkāppiyam codifies grammar and the poetics of Akam & Puram.", tag: "sangam" },
  { when: "300 BCE – 300 CE", what: "The Sangam age: 2,381 poems, 473 poets — kings, farmers, and 27 women among them.", tag: "sangam" },
  { when: "c. 1st c. CE", what: "Kaniyan Pūngundranār: 'Every town our home, every human our kin.'", tag: "sangam" },
  { when: "c. 5th c. CE", what: "Cilappatikāram: Kannaki's fidelity dismantles a corrupt throne.", tag: "sangam" },
  { when: "post-Sangam", what: "Thiruvaḷḷuvar's Tirukkuṟaḷ — 1,330 couplets of secular, universal Aram.", tag: "kural" },
  { when: "medieval", what: "The Siddhars: anti-caste, body-as-temple, vernacular revolt.", tag: "siddhar" },
  { when: "19th c.", what: "Navalar, Damodaram Pillai & U.V. Swaminatha Aiyar recover the manuscripts.", tag: "revival" },
  { when: "today", what: "80+ million Tamils across the world carry it forward — and you are reading this.", tag: "now" },
];

/* Behavioural-change engine: each pillar → a lived micro-practice.
   This is where understanding becomes action — the point of the whole tool. */
const PRACTICES = [
  {
    pillar: "Ecological consciousness",
    tamil: "இயற்கை உணர்வு",
    from: "The Aintinai — emotion woven into land.",
    prompt: "Which of the five landscapes is your emotional home right now?",
    action:
      "This week, notice one natural rhythm where you live — a tree, a tide, a season — and let it name how you feel.",
  },
  {
    pillar: "Universal kinship",
    tamil: "யாதும் ஊரே",
    from: "Kaniyan Pūngundranār & the Cāṉṟōr ideal.",
    prompt: "Where do you draw the line between 'us' and 'them'?",
    action:
      "Once this week, treat a stranger as kin — and refuse to fawn over the powerful or look down on the weak.",
  },
  {
    pillar: "Radical social democracy",
    tamil: "ஒன்றே குலம்",
    from: "The Siddhars' revolt against caste and hierarchy.",
    prompt: "Whose dignity does your community still overlook?",
    action:
      "Name one hierarchy you were handed — and choose one concrete way to refuse it this month.",
  },
  {
    pillar: "The body as temple",
    tamil: "உள்ளம் பெரும் கோயில்",
    from: "Thirumular's somatic mysticism.",
    prompt: "When did you last treat your body as sacred, not as a tool?",
    action:
      "Give yourself five minutes of breath a day. The temple is already built; just walk in.",
  },
];

/* Comparative matrix — the synthesis across three epochs. */
const MATRIX = {
  cols: ["Dimension", "Sangam (300 BCE–300 CE)", "Tirukkuṟaḷ (Ethical)", "Siddhars (Medieval)"],
  rows: [
    ["Sacred language", "Tamil as aesthetic refinement & the art of loving", "Tamil as universal, secular moral wisdom (Aram)", "Tamil as transformative sound & tool of liberation"],
    ["Spiritual ideal", "The Cāṉṟōr — noble warrior, patron, elder", "The Illarathan — virtuous householder", "The Siddhar — perfected yogi-healer"],
    ["Space", "Localised ecological zones (thinai)", "Home (Illaram) balanced with the just nation (Porul)", "The body as microcosm & ultimate temple"],
    ["Society & gender", "Clan duty; celebrates fidelity (karpu)", "Merit over birth; equal partnership", "Rejects caste & gender inequality; female masters"],
    ["Praxis", "Defence of land, patronage, courtship", "Integrity, truth, non-violence, vegetarianism", "Vasi yoga, pharmacology, alchemy"],
  ],
};

const SOURCES = [
  "Sangam literature, Tolkāppiyam & Puṟanāṉūṟu (Wikipedia; shivaji.du.ac.in econtent)",
  "Kaniyan Pūngundranār, Puṟanāṉūṟu 192 (Tamil Wiki)",
  "Tirukkuṟaḷ & Aram (Kural — Wikipedia; LICENTIA POETICA; ResearchGate ecocritical study)",
  "Tamil Siddhars & Sivavākkiyar (Philosophy Institute; Grokipedia; Hinduism Today)",
  "Thirumūlar, Tirumandiram — 'Uḷḷam Perum Kōyil'",
  "Keezhadi & Adichanallur archaeology (Tamils — Wikipedia)",
];
