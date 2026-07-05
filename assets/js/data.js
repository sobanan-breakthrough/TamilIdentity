/* ============================================================================
   TamilIdentity∞ — Content data layer (v2, research-expanded)
   Grounded in Sangam poetics, the Tirukkuṟaḷ, the Siddhar tradition, and the
   living culture. Facts and quotes are drawn from cited public sources
   (see SOURCES). Tamil script is included only where verified; translations
   are attributed. Bilingual throughout: Tamil + romanisation + plain English.
   ============================================================================ */

/* ---- Section registry drives the scroll-spy navigation ---- */
const SECTIONS = [
  { id: "top", label: "Threshold", tamil: "வாசல்" },
  { id: "intro", label: "The Question", tamil: "வினா" },
  { id: "land", label: "The Land", tamil: "தமிழகம்" },
  { id: "aintinai", label: "I · Land & Feeling", tamil: "ஐந்திணை" },
  { id: "kinship", label: "II · Kinship & Aram", tamil: "அறம்" },
  { id: "democracy", label: "III · The Rebels", tamil: "சித்தர்" },
  { id: "body", label: "IV · Body as Temple", tamil: "கோயில்" },
  { id: "living", label: "The Living Culture", tamil: "முத்தமிழ்" },
  { id: "synthesis", label: "The Synthesis", tamil: "தொகுப்பு" },
  { id: "build", label: "Build From Here", tamil: "எழுவோம்" },
];

/* ============================================================
   THE LAND — timeline, dynasties, diaspora
   ============================================================ */
const TIMELINE = [
  { when: "c. 1000 BCE+", what: "Iron-age urn burials and gold at Adichanallur point to deep antiquity in the south.", tag: "land" },
  { when: "c. 6th c. BCE", what: "Keezhadi, on the Vaigai near Madurai: radiocarbon dates reach ~580 BCE — a literate, urban Tamil settlement with Tamil-Brahmi writing.", tag: "land" },
  { when: "c. 300 BCE – 300 CE", what: "The Sangam age. Some 2,381 poems by 473 poets — kings, potters, farmers, and at least 27 women.", tag: "sangam" },
  { when: "c. 1st c. CE", what: "Kaniyan Pūngundranār: “Every town our home, every human our kin.”", tag: "sangam" },
  { when: "c. 5th–6th c. CE", what: "Ilango Adigal's Cilappatikāram — Kaṇṇaki's justice burns an unjust throne.", tag: "sangam" },
  { when: "c. 450–500 CE", what: "Thiruvaḷḷuvar's Tirukkuṟaḷ — 1,330 couplets of secular, universal Aram (dating per Zvelebil).", tag: "kural" },
  { when: "6th–9th c. CE", what: "The Bhakti flowering: 63 Nāyanmārs & 12 Āḻvārs sing god in Tamil, for everyone.", tag: "bhakti" },
  { when: "medieval", what: "The Siddhars: anti-caste, body-as-temple, written in the people's Tamil.", tag: "siddhar" },
  { when: "19th c.", what: "Revival: Ārumuka Nāvalar, C.W. Damodaram Pillai & U.V. Swaminatha Aiyar (“Tamiḻ Thāthā”) rescue the palm-leaf manuscripts.", tag: "revival" },
  { when: "2004", what: "Tamil is the first language declared a Classical Language of India.", tag: "revival" },
  { when: "today", what: "70–90 million Tamils across the world carry it forward — including you, reading this.", tag: "now" },
];

const DYNASTIES = [
  { name: "Chēra", tamil: "சேரர்", emblem: "🏹", desc: "The bow. Lords of the western coast (today's Kerala & western Tamil Nadu); patrons of the poets, gateway to Roman sea-trade." },
  { name: "Chōla", tamil: "சோழர்", emblem: "🐅", desc: "The tiger. From the Kaveri delta rose one of history's great maritime empires, reaching Southeast Asia — and the sublime bronze Naṭarāja." },
  { name: "Pāṇḍya", tamil: "பாண்டியர்", emblem: "🐟", desc: "The twin fish. Rulers of Madurai, seat of the legendary Sangam academies and centre of the pearl and temple trade." },
];

const DIASPORA = [
  { place: "Tamil Nadu & Puducherry", flag: "🇮🇳", note: "~69M native speakers (2011 Census); Puducherry ~88% Tamil." },
  { place: "Sri Lanka (Eelam)", flag: "🇱🇰", note: "Sri Lankan Tamils ~2.3M + Hill-Country Tamils ~0.84M (2012)." },
  { place: "Malaysia", flag: "🇲🇾", note: "~1.8–2M — temples, Tamil schools, a deep-rooted community." },
  { place: "Singapore", flag: "🇸🇬", note: "Tamil is one of four official languages of the republic." },
  { place: "Mauritius", flag: "🇲🇺", note: "A community centuries old; Tamil festivals are national life." },
  { place: "South Africa", flag: "🇿🇦", note: "Descendants of 19th-c. indentured Tamils keep the language alive." },
  { place: "United Kingdom", flag: "🇬🇧", note: "A large Eelam & Indian-Tamil diaspora, esp. in London." },
  { place: "Canada", flag: "🇨🇦", note: "One of the world's largest Eelam-Tamil populations, in Toronto." },
  { place: "Réunion & Fiji", flag: "🌏", note: "Island communities from the plantation era." },
  { place: "Gulf states", flag: "🕌", note: "A vast modern working diaspora across the Gulf." },
];

/* ============================================================
   PILLAR I — Aintinai (the five landscapes)
   ============================================================ */
const LANDSCAPES = [
  { id: "kurinji", tamil: "குறிஞ்சி", roman: "Kuṟiñci", en: "Mountains & Hills", flower: "Kurinji blossom",
    akam: "Union of lovers", akamTamil: "புணர்தல் · Puṇardal", puram: "Vetci — the cattle raid",
    karu: "Bamboo, jackfruit, honey; hunters (kuravar); the peacock & the deity Murugan (Cēyōn).",
    meaning: "The clandestine, electric first meeting of lovers in the high hills. In the public world, the same terrain sparks the raid that begins a war.",
    time: "Midnight · the cold, dewy season", deity: "Murugan (Cēyōn)", hue: "#6d5aa8" },
  { id: "mullai", tamil: "முல்லை", roman: "Mullai", en: "Forests & Woodlands", flower: "Jasmine",
    akam: "Patient waiting, domestic faith", akamTamil: "இருத்தல் · Iruttal", puram: "Vañci — the war-march (invasion)",
    karu: "Deer, jasmine, millet; herders (āyar/idaiyar); the god Māyōn (Viṣṇu).",
    meaning: "The forest of the faithful heart that waits through the monsoon for a loved one's return — while, in the public world, the king marches out to war (its counter-theme Karanthai is the recovery of raided cattle).",
    time: "Evening · the rains", deity: "Māyōn", hue: "#3f7d54" },
  { id: "marutam", tamil: "மருதம்", roman: "Marutam", en: "Farmland & River Plains", flower: "Marutam (queen's flower)",
    akam: "Lovers' quarrels & reconciliation", akamTamil: "ஊடல் · Ūdal", puram: "Uzhignai — the fortress siege",
    karu: "Buffalo, freshwater fish, paddy; farmers (uḻavar); the god Vēndan (Indiran).",
    meaning: "The fertile riverine plains of settled towns, where the tangle of married life — jealousy, sulking, making up — plays out. The city's wealth also draws the siege.",
    time: "Dawn · near sunrise", deity: "Vēndan (Indiran)", hue: "#c8992e" },
  { id: "neytal", tamil: "நெய்தல்", roman: "Neytal", en: "Seashore & Coast", flower: "Blue water lily",
    akam: "Anxious waiting, longing, grief", akamTamil: "இரங்கல் · Irangal", puram: "Thumbai — the pitched battle",
    karu: "Sharks, screw-pine, salt & fish; fisherfolk (paratavar); the god Varuṇan (the sea).",
    meaning: "The coast where one watches the horizon for a ship not yet returned. Separation across water; in the public sphere, the open clash of armies.",
    time: "Twilight", deity: "Varuṇan", hue: "#2b8a9e" },
  { id: "palai", tamil: "பாலை", roman: "Pālai", en: "Arid Wasteland", flower: "Parched paalai",
    akam: "Separation & the hard journey", akamTamil: "பிரிதல் · Piridal", puram: "Vākai — victory & conquest",
    karu: "Not a fixed terrain but land scorched dry; wayfarers & bandits; the goddess Koṟṟavai.",
    meaning: "A state more than a place — the sun-scorched land crossed in search of wealth, or in elopement. Enduring hardship for something greater; the road to triumph.",
    time: "Midday · high summer", deity: "Koṟṟavai", hue: "#b56a34" },
];

/* The Aintinai theory in one glance */
const AINTINAI_THEORY = {
  intro: "The Tolkāppiyam, Tamil's oldest grammar, teaches that a poem's meaning is built from three layers:",
  layers: [
    { k: "Mudalporuḷ", tamil: "முதற்பொருள்", v: "the first things — land and time (place + season + hour)." },
    { k: "Karupporuḷ", tamil: "கருப்பொருள்", v: "the native things — the flora, fauna, people, gods, food and instruments of that land." },
    { k: "Uripporuḷ", tamil: "உரிப்பொருள்", v: "the essential thing — the human emotion that land is fit to carry." },
  ],
  mayakkam: "Poets could blend regions (Tiṇai Mayakkam), knowing nature and feeling refuse to be boxed. So the map is not a cage — it is a language for the heart.",
};

const ANTHOLOGIES = {
  intro: "The surviving Sangam corpus is gathered into two great collections:",
  ettu: { name: "Ettuttokai · The Eight Anthologies", tamil: "எட்டுத்தொகை",
    items: ["Naṟṟiṇai", "Kuṟuntokai", "Aiṅkuṟunūṟu", "Patiṟṟuppattu", "Paripāṭal", "Kalittokai", "Akanāṉūṟu", "Puṟanāṉūṟu"] },
  pathu: { name: "Pattuppāṭṭu · The Ten Idylls", tamil: "பத்துப்பாட்டு",
    items: ["Ten longer poems — including Tirumurukāṟṟuppaṭai, Neṭunalvāṭai, Maturaikkāñci & Paṭṭiṉappālai — painting cities, kings and gods."] },
  note: "Poems fall into two worlds: Akam (அகம், the inner life of love) and Puṟam (புறம், the outer life of war, kingship and civic virtue).",
};

/* A single, famous, verified Sangam poem — Kuruntokai 40 */
const SANGAM_POEM = {
  tamil: "யாயும் ஞாயும் யார் ஆகியரோ\nஎந்தையும் நுந்தையும் எம் முறைக் கேளிர்\nயானும் நீயும் எவ் வழி அறிதும்\nசெம் புலப் பெயல் நீர் போல\nஅன்புடை நெஞ்சம் தாம் கலந்தனவே",
  rom: "yāyum ñāyum yār ākiyarō / entaiyum nuntaiyum em muṟaik kēḷir / yāṉum nīyum ev vaḻi aṟitum / cem pulap peyal nīr pōla / aṉpuṭai neñcam tām kalantaṉavē",
  en: "What could my mother be to yours?\nWhat kin my father to yours anyway?\nAnd how did you and I even meet?\nBut in love our hearts have mingled\nlike red earth and pouring rain.",
  cite: "Kuṟuntokai 40 · Cempulappeyanīrār · trans. A.K. Ramanujan",
  note: "Two thousand years old, and once posted in the London Underground. A stranger becomes kin through love alone — the intimate twin of Kaniyan's public vow.",
};

/* ============================================================
   PILLAR II — Kinship, the Cāṉṟōr, and Aram
   ============================================================ */
const YADHUM = {
  tamil: "யாதும் ஊரே யாவரும் கேளிர்",
  roman: "Yāthum ūrē yāvarum kēḷir",
  en: "Every town is our home town; every human, our kin.",
  poet: "Kaniyan Pūngundranār",
  source: "Puṟanāṉūṟu 192 · c. 1st century CE",
  gloss: "Good and evil do not reach us from others — we make them within. Life is a raft carried down a mountain river swollen by a storm. Because every one of us is equally at the mercy of that current, the wise neither exalt the powerful nor scorn the weak.",
};

const ARAM = {
  intro: "As the Sangam kingdoms faded, the heroic ethos was re-forged into ethics. At its summit stands the Tirukkuṟaḷ — 1,330 couplets by Thiruvaḷḷuvar in the tight kural venba metre (just seven words each: four, then three).",
  structure: [
    { book: "Aṟam · Virtue", tamil: "அறம்", n: "38 chapters · 380 couplets", note: "Personal & domestic ethics — the householder's path is honoured above withdrawal." },
    { book: "Poruḷ · Society", tamil: "பொருள்", n: "70 chapters · 700 couplets", note: "Wealth, justice & statecraft — the largest book, on living well together." },
    { book: "Inbam · Love", tamil: "இன்பம்", n: "25 chapters · 250 couplets", note: "The subtle psychology of love, in the voices of the lovers themselves." },
  ],
  vsDharma: "Aram is close to the Sanskrit dharma, but with a decisive difference: it is caste-blind and universal. As the tradition puts it, virtue is the same “whether one is the bearer of the palanquin or the rider in it.” Valluvar names no sect and no deity — only an “ultimate reality” — which is why the Kuṟaḷ is loved across every faith as the Ulaka Podhu Maṟai, the “universal scripture.”",
  reach: "Translated into 50+ languages, it is one of the most translated non-religious works on Earth. Tolstoy quoted the “Hindu Kural” in his 1908 Letter to a Hindu — which drew Gandhi to study it. Off Kanyakumari, where three seas meet, Valluvar stands in stone: 133 feet tall, one foot for each of the Kuṟaḷ's 133 chapters.",
};

const KURALS = [
  { n: 1, book: "Aṟam · Virtue", chapter: "The Praise of God",
    tamil: "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.",
    roman: "Akara mudhala ezhuththellām ādhi\nbhagavan mudhaṟṟē ulagu.",
    en: "As the letter A is the first of all letters, so the eternal First Cause is first of the world.",
    theme: "Beginnings" },
  { n: 80, book: "Aṟam · Virtue", chapter: "Possession of Love (Aṉbuṭaimai)",
    tamil: "அன்பின் வழியது உயிர்நிலை அஃதிலார்க்கு\nஎன்புதோல் போர்த்த உடம்பு.",
    roman: "Aṉbin vaḻiyadhu uyirnilai aḵdhilārkku\neṉbudhōl pōrththa uḍambu.",
    en: "A life led by love is the living soul; without it, the body is but bones cased in skin.",
    theme: "Anbu — love is the seed of virtue" },
  { n: 391, book: "Poruḷ · Society", chapter: "Learning (Kalvi)",
    tamil: "கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.",
    roman: "Kaṟka kasaḍaṟak kaṟpavai kaṟṟapiṉ\nniṟka adhaṟkut thaka.",
    en: "Learn thoroughly what is worth learning — and then live in accordance with that learning.",
    theme: "Learning is nothing until it is lived" },
  { n: 397, book: "Poruḷ · Society", chapter: "Learning (Kalvi)",
    tamil: "யாதானும் நாடாமால் ஊராமால் என்னொருவன்\nசாந்துணையுங் கல்லாத வாறு.",
    roman: "Yādhāṉum nāḍāmāl ūrāmāl eṉṉoruvaṉ\nsāndhuṇaiyuṅ kallādha vāṟu.",
    en: "To the learned, every land is home and every town their own. Why then would anyone stop learning until they die?",
    theme: "Learning makes the whole world your home" },
  { n: 291, book: "Aṟam · Virtue", chapter: "Truthfulness (Vāymai)",
    tamil: "வாய்மை எனப்படுவது யாதெனின் யாதொன்றும்\nதீமை இலாத சொலல்.",
    roman: "Vāymai eṉappaḍuvadhu yādheṉiṉ yādhoṉṟum\ntīmai ilādha solal.",
    en: "What is truthfulness? It is speech entirely free of harm to any living being.",
    theme: "Truth measured by harmlessness" },
  { n: 543, book: "Poruḷ · Statecraft", chapter: "The Just Sceptre (Seṅkōṉmai)",
    tamil: "அந்தணர் நூற்கும் அறத்திற்கும் ஆதியாய்\nநின்றது மன்னவன் கோல்.",
    roman: "Andhaṇar nūṟkum aṟaththiṟkum ādhiyāy\nniṉṟadhu maṉṉavaṉ kōl.",
    en: "The ruler's just sceptre (kōl) is the foundation of both wisdom and virtue — power must answer to justice.",
    theme: "The sceptre of justice over the spear of force" },
];

/* The epic of justice — Cilappatikaram */
const EPIC = {
  title: "Cilappatikāram", tamil: "சிலப்பதிகாரம்", meaning: "“The Tale of the Anklet”",
  author: "Ilango Adigal (a Jain ascetic, said to be brother of the Chēra king Cheṅkuṭṭuvaṉ)",
  date: "c. 5th–6th century CE · the first of the Five Great Epics of Tamil",
  story: "Kōvalaṉ, a merchant, ruins himself on the courtesan-artist Mādhavi, then returns to his faithful wife Kaṇṇaki. To rebuild their life he sells her anklet in Madurai — but is falsely accused of stealing the queen's identical anklet and is executed without trial. Kaṇṇaki storms the Pāṇḍya court, breaks open her anklet to prove it holds rubies (the queen's held pearls), and the king, realising his injustice, dies of shame. Her grief burns Madurai; she is raised to a goddess of chastity and justice.",
  why: "It is the moment Tamil literature declares that no throne stands above justice — that the moral power of one wronged person can topple a king. It also weaves together the three arts, Iyal–Isai–Naṭakam (word, music, dance).",
};

/* ============================================================
   PILLAR III — The Siddhars
   ============================================================ */
const SIDDHARS = [
  { name: "Thirumūlar", tamil: "திருமூலர்",
    line: "“One is the kind (of humanity), and One is God.”", lineTamil: "ஒன்றே குலம் ஒருவனே தேவன்",
    note: "Author of the Tirumandiram (10th book of the Tirumurai, 3,000+ verses). His teaching “Aṉbē Sivam” — Love itself is God — is the root of Tamil radical equality." },
  { name: "Sivavākkiyar", tamil: "சிவவாக்கியர்",
    line: "“Will the planted stone speak, when the living Lord is within you?”", lineTamil: "நட்ட கல்லும் பேசுமோ …",
    note: "The rebel poet of the Civavākkiyam, who mocked idol-worship and ritual bathing and insisted purity is inward, not ceremonial." },
  { name: "Bogar", tamil: "போகர்",
    line: "Sculpted the Palani deity from nine minerals.", lineTamil: "நவபாஷாணம் · Navapāṣāṇam",
    note: "Master alchemist; his compound of nine (arsenical) minerals is said to form the Murugan idol at Palani — science placed in service of the sacred." },
  { name: "Kudambai", tamil: "குதம்பை",
    line: "“What use is the ritual? — O earring!”", lineTamil: "…குதம்பாய்",
    note: "One of the eighteen, whose every verse ends addressing his earring (kudambai) — read as the soul, or the coiled kuṇḍalinī. His jīva samādhi is at Mayiladuthurai." },
  { name: "Agathiyar", tamil: "அகத்தியர்",
    line: "The fount of the tradition.", lineTamil: "முதல் சித்தர்",
    note: "Revered as the first of the Siddhars and a father-figure of Tamil grammar, medicine and yoga." },
  { name: "Pāmbāṭṭi", tamil: "பாம்பாட்டிச் சித்தர்",
    line: "“Dance, snake, dance!”", lineTamil: "ஆடு பாம்பே",
    note: "The 'snake-charmer' Siddhar, whose refrain to the serpent (the kuṇḍalinī) turns a folk image into a map of inner awakening." },
];

const SIDDHA_SCIENCE = {
  intro: "To perfect the body-temple, the Siddhars built a whole science — one of India's recognised systems of traditional medicine.",
  items: [
    { k: "Mukkuṟṟam", tamil: "மூக்குற்றம்", v: "The three humours — vātham (air), pittham (fire), kabham (water) — kept in balance." },
    { k: "Nāḍi Parisōdhaṉai", tamil: "நாடி பரிசோதனை", v: "Pulse-reading and tongue diagnosis to read the whole person, not just the symptom." },
    { k: "96 Tattuvas", tamil: "தத்துவங்கள்", v: "The 96 principles said to constitute a human being, body and mind." },
    { k: "Rasavātham", tamil: "இரசவாதம்", v: "Alchemy — mercury and minerals worked toward the 'elixir of life'." },
    { k: "Muppu", tamil: "முப்பு", v: "The 'universal salt', three salts combined — for rejuvenation and transmutation." },
    { k: "Kāya Kalpa", tamil: "காயகற்பம்", v: "The science of longevity — renewing the body toward Soruba Samādhi." },
  ],
};

/* ============================================================
   PILLAR IV — The body as temple
   ============================================================ */
const BODY_TEMPLE = {
  verse: {
    tamil: "உள்ளம் பெருங்கோயில் ஊனுடம்பு ஆலயம்",
    roman: "Uḷḷam peruṅkōyil ūṉ uḍambu ālayam",
    en: "The mind is the great temple; the body of flesh, its shrine.",
    poet: "Thirumūlar", source: "Tirumandiram, verse 1823",
  },
  parts: [
    { id: "heart", label: "Heart / Mind", tamil: "உள்ளம்", ritual: "The Grand Temple — Kōyil",
      note: "Not the stone sanctum on a distant hill, but the innermost chamber you already carry." },
    { id: "breath", label: "Breath", tamil: "மூச்சு", ritual: "The nadaswaram — sacred music",
      note: "Vāsi yoga: the breath is the temple's living reed, playing without pause." },
    { id: "pulse", label: "Heartbeat", tamil: "இதயத்துடிப்பு", ritual: "The mridangam — the drum",
      note: "Each beat keeps the rhythm of a ritual that never stops." },
    { id: "eyes", label: "Eyes", tamil: "கண்கள்", ritual: "The senses — the lamps",
      note: "In Thirumular's verse the five senses are the temple's undying lamps." },
    { id: "vasal", label: "The Threshold", tamil: "வாசல்", ritual: "Vāsal — the inner doorway",
      note: "Cross this inner threshold in stillness and outer pilgrimage falls away. This is where you began." },
  ],
  anbe: "Thirumular's most famous line reveals the whole tradition in three words — “Aṉbē Sivam,” Love itself is God. Devotion turns inward: worship not of an image, but of the living reality within every body.",
};

/* ============================================================
   THE LIVING CULTURE — Muthamizh, arts, voices, festivals
   ============================================================ */
const MUTHAMIZH = {
  intro: "Tamil calls itself Muttamiḻ — the “threefold Tamil” — because it was never only literature. It is word, sound and body together.",
  items: [
    { k: "Iyal", tamil: "இயல்", icon: "✍️", v: "Literature — from Sangam verse to the Kuṟaḷ to modern poetry." },
    { k: "Isai", tamil: "இசை", icon: "🎵", v: "Music — a Tamil musical tradition feeding into Carnatic music and the Tamiḻ Isai movement." },
    { k: "Nāṭakam", tamil: "நாடகம்", icon: "💃", v: "Drama & dance — the root of Bharatanāṭyam and Tamil theatre." },
  ],
};

const ARTS = [
  { name: "Bharatanāṭyam", tamil: "பரதநாட்டியம்", desc: "The classical dance born in Tamil temples (once 'sadir'), now danced across the world." },
  { name: "Naṭarāja bronzes", tamil: "நடராஜர்", desc: "The Chola bronze of Shiva as cosmic dancer — one of humanity's supreme sculptures." },
  { name: "Kōlam", tamil: "கோலம்", desc: "The rice-flour thresholds women draw at dawn — a daily welcome, feeding ants as it beautifies." },
  { name: "Silambam", tamil: "சிலம்பம்", desc: "An ancient Tamil martial art of the staff and blade." },
  { name: "Dravidian temples", tamil: "கோபுரம்", desc: "Soaring gopuram gateways and stone cities like Madurai and Thanjavur." },
  { name: "Thai Pongal", tamil: "தைப்பொங்கல்", desc: "The harvest thanksgiving to sun, rain, earth and cattle — the truest Tamil festival." },
];

const VOICES = [
  { pull: "“Learn to desire what is good.”", attr: "Avvaiyār — opening line of the Āttichūḍi, 109 alphabetical maxims still taught to Tamil children", tamil: "அறம் செய விரும்பு" },
  { pull: "“If even one person goes hungry, we shall destroy this whole world.”", attr: "Subramania Bhāratī (Bhāratiyār) — modern national poet of freedom, women's dignity, and the end of caste", tamil: "தனி ஒருவனுக்கு உணவில்லை எனில் …" },
];

const BHAKTI = {
  intro: "Between the Sangam and the Siddhars came the Bhakti flood (6th–9th c. CE): poet-saints who sang god not in Sanskrit but in Tamil, opening devotion to everyone — kings and potters, women and the outcast alike.",
  points: [
    { k: "63 Nāyaṉmārs", tamil: "நாயன்மார்", v: "Shaiva saints drawn from every caste; their Tēvāram hymns (Tirumurai 1–7) are still sung today." },
    { k: "12 Āḻvārs", tamil: "ஆழ்வார்", v: "Vaishnava saints whose 4,000-verse Nālāyira Divya Prabandham is called the 'Tamil Veda'." },
    { k: "Tiruvācakam", tamil: "திருவாசகம்", v: "Māṇikkavācakar's hymns — of which it is said, “even a stone would melt” — the tenderness beside the Siddhars' fire." },
  ],
};

/* Women of spiritual & poetic authority in the Tamil tradition. */
const WOMEN = {
  intro: "The Tamil tradition carried women's voices at its very centre — as saints, as philosophers, as the poets who taught its children.",
  figures: [
    { name: "Avvaiyār", tamil: "ஔவையார்", note: "Not one woman but a venerated title borne by several across the ages — from a Sangam poet-diplomat to the author of the Āttichūḍi still learned by Tamil children." },
    { name: "Āṇṭāḷ", tamil: "ஆண்டாள்", note: "The only woman among the 12 Āḻvārs; her Tiruppāvai is sung every Mārgaḻi dawn across the Tamil world." },
    { name: "Kāraikkāl Ammaiyār", tamil: "காரைக்கால் அம்மையார்", note: "One of the 63 Nāyanmārs — a woman who chose devotion over convention and became a saint in her own right." },
  ],
  note: "The Siddhar canon of “eighteen” is a traditional roster, and its named members are men — but the wider stream of Tamil sanctity and letters kept women's authority alive.",
};

/* The language itself — a living classical tongue. */
const LANGUAGE = {
  intro: "Tamil is not only what these ideas are written in — it is itself one of the pillars of the identity.",
  facts: [
    { k: "A living classical language", v: "In 2004 Tamil became the first language declared a Classical Language of India — a literature attested for more than two thousand years and still spoken daily." },
    { k: "~80–86 million speakers", v: "Roughly 79 million speak it as a mother tongue; a Dravidian language, official in Tamil Nadu & Puducherry, Sri Lanka, and Singapore." },
    { k: "The oldest grammar", v: "The Tolkāppiyam is the oldest surviving Tamil grammar and poetics — the source of the Akam/Puṟam and Aintiṇai systems (dating debated, layered over the early centuries)." },
    { k: "Tamiḻ Thāy", v: "Tamils personify the language as a mother — Tamiḻttāy — which is why, for so many, losing the tongue feels like losing a parent." },
  ],
};

/* ============================================================
   SYNTHESIS + BEHAVIOURAL CHANGE
   ============================================================ */
const MATRIX = {
  cols: ["Dimension", "Sangam (300 BCE–300 CE)", "Tirukkuṟaḷ (Ethical)", "Siddhars (Medieval)"],
  rows: [
    ["Sacred language", "Tamil as aesthetic refinement & the art of loving", "Tamil as universal, secular moral wisdom (Aram)", "Tamil as transformative sound & a tool of liberation"],
    ["Spiritual ideal", "The Cāṉṟōr — noble warrior, patron, elder", "The Illarathāṉ — virtuous householder", "The Siddhar — perfected yogi-healer, living free"],
    ["Sense of space", "Localised ecological zones (tiṇai)", "Home (Illaram) balanced with the just nation (Poruḷ)", "The body as microcosm & ultimate temple"],
    ["Society & gender", "Clan duty; celebrates fidelity (kaṟpu); women among the poets", "Merit over birth; equal partnership in virtue", "Rejects caste & ritual gatekeeping; the wider tradition venerates women saints"],
    ["Praxis", "Defence of land, patronage, courtship", "Integrity, truth, non-violence, compassion", "Vāsi yoga, pharmacology, alchemy of the body"],
  ],
};

const PRACTICES = [
  { pillar: "Ecological consciousness", tamil: "இயற்கை உணர்வு", from: "The Aintiṇai — feeling woven into land.",
    prompt: "Which of the five landscapes is your emotional home right now?",
    action: "This week, notice one natural rhythm where you live — a tree, a tide, a season — and let it name how you feel." },
  { pillar: "Universal kinship", tamil: "யாதும் ஊரே", from: "Kaniyan Pūngundranār & the Cāṉṟōr ideal.",
    prompt: "Where do you draw the line between “us” and “them”?",
    action: "Once this week, treat a stranger as kin — and refuse both to fawn over the powerful and to look down on the weak." },
  { pillar: "Radical social democracy", tamil: "ஒன்றே குலம்", from: "The Siddhars' revolt against caste.",
    prompt: "Whose dignity does your community still overlook?",
    action: "Name one hierarchy you were handed — and choose one concrete way to refuse it this month." },
  { pillar: "The body as temple", tamil: "உள்ளம் பெரும் கோயில்", from: "Thirumular's somatic mysticism.",
    prompt: "When did you last treat your body as sacred, not as a tool?",
    action: "Give yourself five minutes of breath a day. The temple is already built; just walk in." },
];

const SOURCES = [
  "Sangam literature & the Tolkāppiyam — Sangam literature (Wikipedia); shivaji.du.ac.in e-content on Akam/Puram",
  "Kuṟuntokai 40 — trans. A.K. Ramanujan; Kuṟuntokai (Wikipedia); oldtamilpoetry.com",
  "Kaniyan Pūngundranār, Puṟanāṉūṟu 192 — Tamil Wiki; Puṟanāṉūṟu (Wikipedia)",
  "Tirukkuṟaḷ structure & couplets — Kural (Wikipedia); G.U. Pope translation; thirukkural.net; ytamizh.com",
  "Aram vs Dharma & the secular Kuṟaḷ — Kural (Wikipedia); Valluvar (Wikipedia)",
  "Cilappatikāram — Cilappatikaram (Wikipedia); Britannica; culture-and-heritage summaries",
  "Tamil Siddhars & the 18 — Siddhar (Grokipedia); Philosophy Institute; National Health Portal of India",
  "Thirumūlar, Tirumandiram v.1823 & 'Aṉbē Sivam' — shaivam.org; wisdomlib.org",
  "Sivavākkiyar, Civavākkiyam — rprabhu notes; knowingourroots.com",
  "Siddha medicine — Hinduism Today; National Institute of Siddha (AYUSH)",
  "Keezhadi & Adichanallur — Keezhadi excavation site (Wikipedia); TN State Dept. of Archaeology",
  "Tamil population & classical-language status — Tamils / Tamil population by nation (Wikipedia); 2011 India & 2012 Sri Lanka censuses",
  "Avvaiyār's Āttichūḍi & Subramania Bhāratī — kaapiyam.com; Subramania Bharati (Wikipedia)",
  "Bhakti — Nāyaṉmārs & Āḻvārs (Wikipedia); Tēvāram; Divya Prabandham",
];
