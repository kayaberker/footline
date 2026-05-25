export type Course = {
  id: string;
  slug: string;
  title_tr: string;
  title_en: string;
  description_tr: string;
  description_en: string;
  price: number; // kuruş (50_000 TL = 5_000_000)
  level: "beginner" | "intermediate" | "advanced";
  category: "player" | "coach" | "journalist" | "fan";
  thumbnail: string;
  lessons: number;
  duration: string;
  duration_en: string;
  badge_tr?: string; // "En Popüler", "Yeni" vb.
  badge_en?: string;
  curriculum: {
    module_tr: string;
    module_en: string;
    topics_tr: string[];
    topics_en: string[];
  }[];
  outcomes_tr: string[]; // "Bu kursu bitirince şunları yapabileceksin"
  outcomes_en: string[];
  includes_tr: string[]; // "Bu paket içerir"
  includes_en: string[];
  youtube_id?: string; // Unlisted YouTube video ID — boşsa "yakında" gösterilir
};

export const mockCourses: Course[] = [
  // ─────────────────────────────────────────────
  // 1. TARAFTAR — En giriş seviyesi, 50.000 TL
  // ─────────────────────────────────────────────
  {
    id: "1",
    slug: "taraftar-futbol-ingilizcesi",
    title_tr: "Taraftar Futbol İngilizcesi",
    title_en: "Football Fan English",
    description_tr:
      "Yabancı maç yayınlarını, spor analistlerini ve uluslararası futbol haberlerini tam olarak anlayabilmek için ihtiyacın olan 500+ kelime ve ifade. BBC Sport, Sky Sports ve ESPN gibi kanalları artık tercümansız takip et.",
    description_en:
      "500+ words and phrases you need to fully understand foreign match broadcasts, sports analysts and international football news. Follow BBC Sport, Sky Sports and ESPN without a translator.",
    price: 5_000_000, // 50.000 TL
    level: "beginner",
    category: "fan",
    thumbnail: "📺",
    lessons: 20,
    duration: "10 saat",
    duration_en: "10 hours",
    badge_tr: "Başlangıç Noktası",
    badge_en: "Start Here",
    outcomes_tr: [
      "BBC Sport ve Sky Sports yorumlarını anlayabilmek",
      "Transfer haberlerini orijinal kaynaktan takip edebilmek",
      "Yabancı futbol podcast ve videolarını anlayabilmek",
      "Sosyal medyada İngilizce futbol içeriklerine yorum yazabilmek",
      "UEFA, FIFA açıklamalarını doğrudan okuyabilmek",
    ],
    outcomes_en: [
      "Understand BBC Sport and Sky Sports commentary",
      "Follow transfer news from original sources",
      "Understand foreign football podcasts and videos",
      "Comment on English football content on social media",
      "Read UEFA and FIFA statements directly",
    ],
    includes_tr: [
      "20 video ders (toplam 10 saat)",
      "500+ kelimelik futbol sözlüğü PDF",
      "Ses dosyaları ile telaffuz antrenmanı",
      "Her ders için alıştırma testleri",
      "2 adet canlı grup seansı",
      "Sertifika",
    ],
    includes_en: [
      "20 video lessons (10 hours total)",
      "500+ word football vocabulary PDF",
      "Pronunciation training with audio files",
      "Practice tests for each lesson",
      "2 live group sessions",
      "Certificate",
    ],
    youtube_id: "dQw4w9WgXcQ",
    curriculum: [
      {
        module_tr: "Modül 1: Maç Günü Dili",
        module_en: "Module 1: Match Day Language",
        topics_tr: [
          "Pozisyon isimleri ve görevleri (striker, midfielder, fullback, sweeper keeper…)",
          "Maç anı ifadeleri: goal, assist, header, volley, clearance, tackle",
          "Maç sonu sonuç dili: draw, win, defeat, clean sheet, comeback",
          "VAR ve hakem kararları: offside, penalty, foul, yellow/red card",
          "Skor ifadeleri: nil, level, equaliser, aggregate",
        ],
        topics_en: [
          "Position names and roles (striker, midfielder, fullback, sweeper keeper…)",
          "Match moment phrases: goal, assist, header, volley, clearance, tackle",
          "Final result language: draw, win, defeat, clean sheet, comeback",
          "VAR and referee decisions: offside, penalty, foul, yellow/red card",
          "Score expressions: nil, level, equaliser, aggregate",
        ],
      },
      {
        module_tr: "Modül 2: Taktik ve Sistem Dili",
        module_en: "Module 2: Tactics and System Language",
        topics_tr: [
          "Diziliş sistemleri: 4-3-3, 4-2-3-1, 3-5-2, False 9",
          "Pressing ve blok: high press, low block, mid-block, gegenpressing",
          "Geçiş oyunu: counter-attack, transition, build-up play",
          "Set piyesleri: corner, free kick, throw-in, penalty arc",
          "Savunma kavramları: offside trap, zonal marking, man-marking",
        ],
        topics_en: [
          "Formation systems: 4-3-3, 4-2-3-1, 3-5-2, False 9",
          "Pressing and blocks: high press, low block, mid-block, gegenpressing",
          "Transition play: counter-attack, transition, build-up play",
          "Set pieces: corner, free kick, throw-in, penalty arc",
          "Defensive concepts: offside trap, zonal marking, man-marking",
        ],
      },
      {
        module_tr: "Modül 3: Transfer ve Kulüp Haberleri",
        module_en: "Module 3: Transfer and Club News",
        topics_tr: [
          "Transfer terimleri: done deal, bid, release clause, loan, permanent deal",
          "Sözleşme dili: contract extension, buyout, wages, signing-on fee",
          "Yönetim ve yapı: chairman, board, sporting director, technical staff",
          "Kulüp finansı: transfer fee, amortisation, FFP, wage bill",
          "İngilizce haber başlıklarını okuma ve anlama egzersizleri",
        ],
        topics_en: [
          "Transfer terms: done deal, bid, release clause, loan, permanent deal",
          "Contract language: contract extension, buyout, wages, signing-on fee",
          "Management and structure: chairman, board, sporting director, technical staff",
          "Club finance: transfer fee, amortisation, FFP, wage bill",
          "Reading and understanding English news headlines exercises",
        ],
      },
      {
        module_tr: "Modül 4: Yayın ve Analiz Dili",
        module_en: "Module 4: Broadcast and Analysis Language",
        topics_tr: [
          "Canlı yorum ifadeleri: 'he's through on goal', 'what a save', 'inches away'",
          "Maç analizi: possession stats, xG, pressing intensity, heat maps",
          "Yorumcu kalıpları: 'clinical finish', 'composed', 'under pressure'",
          "Harika goller için İngilizce: screamer, worldie, thunderbolt, chip",
          "Eleştiri ve övgü dili: 'poor decision', 'composed performance'",
        ],
        topics_en: [
          "Live commentary phrases: 'he's through on goal', 'what a save', 'inches away'",
          "Match analysis: possession stats, xG, pressing intensity, heat maps",
          "Commentator patterns: 'clinical finish', 'composed', 'under pressure'",
          "English for great goals: screamer, worldie, thunderbolt, chip",
          "Criticism and praise language: 'poor decision', 'composed performance'",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. FUTBOLCU BAŞLANGIÇ — 75.000 TL
  // ─────────────────────────────────────────────
  {
    id: "2",
    slug: "futbolcu-ingilizce-baslangic",
    title_tr: "Futbolcu İngilizcesi: Saha İçi İletişim",
    title_en: "Footballer English: On-Pitch Communication",
    description_tr:
      "Yabancı takımda oynarken antrenörünü anlamak, takım arkadaşlarınla sahada iletişim kurmak ve soyunma odasında kendini ifade etmek için geliştirilmiş pratik İngilizce programı.",
    description_en:
      "A practical English programme developed for understanding your coach in a foreign team, communicating with teammates on the pitch and expressing yourself in the dressing room.",
    price: 7_500_000, // 75.000 TL
    level: "beginner",
    category: "player",
    thumbnail: "⚽",
    lessons: 28,
    duration: "14 saat",
    duration_en: "14 hours",
    badge_tr: "En Popüler",
    badge_en: "Most Popular",
    outcomes_tr: [
      "Antrenörün İngilizce taktik talimatlarını anlayabilmek",
      "Saha içinde takım arkadaşlarıyla İngilizce iletişim kurabilmek",
      "Soyunma odasında günlük konuşmaları yürütebilmek",
      "Antrenman seanslarında verilenler talimatları anlayabilmek",
      "Basit maç analizi toplantılarını takip edebilmek",
      "Kulüp personeli ile temel düzeyde iletişim kurabilmek",
    ],
    outcomes_en: [
      "Understand your coach's tactical instructions in English",
      "Communicate with teammates on the pitch in English",
      "Hold everyday conversations in the dressing room",
      "Understand instructions given during training sessions",
      "Follow simple match analysis meetings",
      "Communicate with club staff at a basic level",
    ],
    includes_tr: [
      "28 video ders (toplam 14 saat)",
      "Sahada kullanılan 300+ komut ve ifade listesi",
      "Rol yapma egzersizleri (antrenör-oyuncu diyalogları)",
      "Sesli telaffuz kartları (flashcard)",
      "4 adet birebir canlı ders (45 dk)",
      "WhatsApp pratik grubu erişimi (3 ay)",
      "Sertifika",
    ],
    includes_en: [
      "28 video lessons (14 hours total)",
      "List of 300+ commands and phrases used on the pitch",
      "Role-play exercises (coach-player dialogues)",
      "Audio pronunciation flashcards",
      "4 one-to-one live lessons (45 min each)",
      "WhatsApp practice group access (3 months)",
      "Certificate",
    ],
    youtube_id: "dQw4w9WgXcQ",
    curriculum: [
      {
        module_tr: "Modül 1: İlk Gün — Kulüpte Hayatta Kalmak",
        module_en: "Module 1: Day One — Surviving at the Club",
        topics_tr: [
          "Tanışma ve kendini tanıtma: 'I'm the new midfielder from Turkey'",
          "Soyunma odası kültürü: dolaplar, rutinler, takım hiyerarşisi",
          "Temel sorular: 'Where do I warm up?', 'What time is training?'",
          "Sayıları ve saatleri anlama: antrenman saatleri, rota numaraları",
          "Kulüp personeli: kit man, physio, goalkeeper coach, analyst",
        ],
        topics_en: [
          "Meeting and introducing yourself: 'I'm the new midfielder from Turkey'",
          "Dressing room culture: lockers, routines, team hierarchy",
          "Basic questions: 'Where do I warm up?', 'What time is training?'",
          "Understanding numbers and times: training schedules, squad numbers",
          "Club staff: kit man, physio, goalkeeper coach, analyst",
        ],
      },
      {
        module_tr: "Modül 2: Antrenman Dili",
        module_en: "Module 2: Training Language",
        topics_tr: [
          "Isınma komutları: 'jog', 'stretch', 'get into pairs', 'hold your position'",
          "Rondo ve pas egzersizleri: 'one-touch', 'switch it', 'overlap', 'third man run'",
          "Küçük alan oyunları: 'press!', 'drop off', 'split!', 'man on!'",
          "Fiziksel antrenman: 'push through', 'last rep', 'back to back'",
          "Antrenman sonu değerlendirme toplantısı dili",
        ],
        topics_en: [
          "Warm-up commands: 'jog', 'stretch', 'get into pairs', 'hold your position'",
          "Rondo and passing drills: 'one-touch', 'switch it', 'overlap', 'third man run'",
          "Small-sided games: 'press!', 'drop off', 'split!', 'man on!'",
          "Physical training: 'push through', 'last rep', 'back to back'",
          "End-of-training debrief meeting language",
        ],
      },
      {
        module_tr: "Modül 3: Maç Günü İçi Konuşma",
        module_en: "Module 3: In-Match Communication",
        topics_tr: [
          "Savunma komutları: 'hold the line!', 'step up!', 'squeeze!', 'cover!'",
          "Hücum komutları: 'go!', 'turn!', 'time!', 'shoot!', 'lay it off!'",
          "Kaleci-stoper iletişimi: 'keeper's ball!', 'away!', 'push up!'",
          "Duran top organizasyonu: 'near post', 'far post', 'back stick', 'dummy run'",
          "Yaralı / Değişiklik anı: 'he's coming off', 'you're on', 'get loose'",
        ],
        topics_en: [
          "Defensive commands: 'hold the line!', 'step up!', 'squeeze!', 'cover!'",
          "Attacking commands: 'go!', 'turn!', 'time!', 'shoot!', 'lay it off!'",
          "Goalkeeper-centre-back communication: 'keeper's ball!', 'away!', 'push up!'",
          "Set-piece organisation: 'near post', 'far post', 'back stick', 'dummy run'",
          "Injury / substitution moment: 'he's coming off', 'you're on', 'get loose'",
        ],
      },
      {
        module_tr: "Modül 4: Soyunma Odası ve Sosyal Hayat",
        module_en: "Module 4: Dressing Room and Social Life",
        topics_tr: [
          "Günlük sohbet: hava durumu, müzik, film, sosyal medya",
          "Takım yemeği ve yemek: 'dietary requirements', 'halal', 'vegetarian'",
          "Şakalar ve futbol kültürü: soyunma odası argo ve kalıpları",
          "Sakatlık ve fizyoterapi: 'tight hamstring', 'scan', 'out for 4 weeks'",
          "Değerlendirme ve hedef toplantıları: 'where do you see yourself?'",
        ],
        topics_en: [
          "Daily chat: weather, music, films, social media",
          "Team meals and food: 'dietary requirements', 'halal', 'vegetarian'",
          "Banter and football culture: dressing room slang and idioms",
          "Injury and physiotherapy: 'tight hamstring', 'scan', 'out for 4 weeks'",
          "Appraisal and target meetings: 'where do you see yourself?'",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. TRANSFER & SÖZLEŞME — 100.000 TL
  // ─────────────────────────────────────────────
  {
    id: "3",
    slug: "transfer-sozlesme-ingilizce",
    title_tr: "Transfer & Sözleşme İngilizcesi",
    title_en: "Transfer & Contract English",
    description_tr:
      "Yabancı kulüplerle profesyonel müzakere yapabilmek, sözleşme maddelerini anlayabilmek ve menajerlik süreçlerinde İngilizceyi güvenle kullanabilmek için kapsamlı program.",
    description_en:
      "A comprehensive programme for negotiating professionally with foreign clubs, understanding contract clauses and using English confidently in agency processes.",
    price: 10_000_000, // 100.000 TL
    level: "advanced",
    category: "player",
    thumbnail: "📋",
    lessons: 35,
    duration: "18 saat",
    duration_en: "18 hours",
    badge_tr: "Kariyer Değiştiren",
    badge_en: "Career Changing",
    outcomes_tr: [
      "Transfer görüşmelerini İngilizce yürütebilmek",
      "Sözleşme maddelerini bağımsız okuyup anlayabilmek",
      "Menajer ve ajanlarla profesyonel iletişim kurabilmek",
      "Kulüp yöneticileriyle toplantı İngilizcesi kullanabilmek",
      "Teklif ve karşı teklif dilini bilmek",
      "Yasal belgelerdeki kritik terimleri tanımak",
    ],
    outcomes_en: [
      "Conduct transfer negotiations in English",
      "Read and understand contract clauses independently",
      "Communicate professionally with agents and managers",
      "Use business meeting English with club executives",
      "Know the language of offers and counter-offers",
      "Recognise critical terms in legal documents",
    ],
    includes_tr: [
      "35 video ders (toplam 18 saat)",
      "Gerçek kulüp sözleşmesi şablonu (anonimleştirilmiş) + açıklama",
      "Transfer müzakere senaryo egzersizleri",
      "Hukuki terimler sözlüğü (50+ madde)",
      "6 adet birebir canlı ders (60 dk)",
      "Sözleşme okuma simülasyonu",
      "Öncelikli email/mesaj yanıt desteği (6 ay)",
      "Sertifika",
    ],
    includes_en: [
      "35 video lessons (18 hours total)",
      "Real club contract template (anonymised) + explanations",
      "Transfer negotiation scenario exercises",
      "Legal terms glossary (50+ entries)",
      "6 one-to-one live lessons (60 min each)",
      "Contract reading simulation",
      "Priority email/message reply support (6 months)",
      "Certificate",
    ],
    youtube_id: "dQw4w9WgXcQ",
    curriculum: [
      {
        module_tr: "Modül 1: Transfer Süreci Dili",
        module_en: "Module 1: The Language of the Transfer Process",
        topics_tr: [
          "Transfer penceresinde kullanılan temel terimler (bid, fee, deadline day)",
          "Kulüp teklifleri: 'We'd like to make an offer for your services'",
          "Ön görüşme dili: 'We see you as a key part of our project'",
          "Menajer toplantıları: agendas, introductions, etiquette",
          "Tıbbi muayene süreci: 'pass the medical', 'clear to sign'",
          "İmza töreni ve basın açıklaması hazırlığı",
        ],
        topics_en: [
          "Core transfer window terms (bid, fee, deadline day)",
          "Club offers: 'We'd like to make an offer for your services'",
          "Initial meeting language: 'We see you as a key part of our project'",
          "Agent meetings: agendas, introductions, etiquette",
          "Medical examination process: 'pass the medical', 'clear to sign'",
          "Signing ceremony and press release preparation",
        ],
      },
      {
        module_tr: "Modül 2: Sözleşme Maddeleri",
        module_en: "Module 2: Contract Clauses",
        topics_tr: [
          "Temel sözleşme yapısı: parties, term, remuneration, termination",
          "Ücret maddeleri: basic salary, bonuses, appearance fees, image rights",
          "Performans primleri: goal bonus, assist bonus, clean sheet bonus",
          "Fesih ve ceza maddeleri: release clause, buyout, breach of contract",
          "Ek maddeler: relocation allowance, car, accommodation, education",
          "Option to extend ve unilateral option farkı",
        ],
        topics_en: [
          "Core contract structure: parties, term, remuneration, termination",
          "Remuneration clauses: basic salary, bonuses, appearance fees, image rights",
          "Performance bonuses: goal bonus, assist bonus, clean sheet bonus",
          "Termination and penalty clauses: release clause, buyout, breach of contract",
          "Additional clauses: relocation allowance, car, accommodation, education",
          "Difference between option to extend and unilateral option",
        ],
      },
      {
        module_tr: "Modül 3: Müzakere Teknikleri",
        module_en: "Module 3: Negotiation Techniques",
        topics_tr: [
          "Müzakere açılış cümleleri: 'Our position is…', 'We were hoping for…'",
          "Karşı teklif dili: 'That's not quite where we are', 'Could you consider…'",
          "Zaman kazanma ve baskı altında iletişim",
          "Kabul ve red ifadeleri: 'We're happy to proceed', 'I'm afraid that's not acceptable'",
          "E-posta müzakeresi: resmi yazışma formatı ve ton",
          "Tam senaryo: gerçek transfer müzakeresi simülasyonu",
        ],
        topics_en: [
          "Negotiation opening phrases: 'Our position is…', 'We were hoping for…'",
          "Counter-offer language: 'That's not quite where we are', 'Could you consider…'",
          "Buying time and communicating under pressure",
          "Acceptance and rejection phrases: 'We're happy to proceed', 'I'm afraid that's not acceptable'",
          "Email negotiation: formal correspondence format and tone",
          "Full scenario: real transfer negotiation simulation",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. ANTRENÖR — 100.000 TL
  // ─────────────────────────────────────────────
  {
    id: "4",
    slug: "antrenor-taktik-ingilizcesi",
    title_tr: "Antrenör & Teknik Direktör İngilizcesi",
    title_en: "Coaching & Management English",
    description_tr:
      "UEFA lisans sınavlarından uluslararası kulüp yönetimine kadar her aşamada ihtiyaç duyulan profesyonel antrenörlük İngilizcesi. Taktik sunum, oyuncu yönetimi ve basın toplantısı dili.",
    description_en:
      "Professional coaching English needed at every stage, from UEFA licence exams to international club management. Tactical presentation, player management and press conference language.",
    price: 10_000_000, // 100.000 TL
    level: "intermediate",
    category: "coach",
    thumbnail: "🧑‍💼",
    lessons: 32,
    duration: "16 saat",
    duration_en: "16 hours",
    badge_tr: "UEFA Uyumlu",
    badge_en: "UEFA Aligned",
    outcomes_tr: [
      "UEFA lisans sınavı İngilizcesini rahatlıkla kullanabilmek",
      "Oyunculara İngilizce taktik brifing verebilmek",
      "Yabancı teknik ekiple profesyonel iletişim kurabilmek",
      "İngilizce basın toplantısı yönetebilmek",
      "Maç analizi sunumu yapabilmek",
      "Yönetim kurulu toplantılarında etkin iletişim sağlamak",
    ],
    outcomes_en: [
      "Use UEFA licence exam English with confidence",
      "Give tactical briefings to players in English",
      "Communicate professionally with foreign technical staff",
      "Manage an English-language press conference",
      "Deliver a match analysis presentation",
      "Communicate effectively in board meetings",
    ],
    includes_tr: [
      "32 video ders (toplam 16 saat)",
      "UEFA Pro Lisansı kelime bankası (300+ terim)",
      "Taktik tahta sunumu şablonları",
      "Basın toplantısı soru-cevap egzersizleri",
      "5 adet birebir canlı ders (60 dk)",
      "Maç analizi sunum videosu hazırlama rehberi",
      "Sertifika",
    ],
    includes_en: [
      "32 video lessons (16 hours total)",
      "UEFA Pro Licence vocabulary bank (300+ terms)",
      "Tactical board presentation templates",
      "Press conference Q&A exercises",
      "5 one-to-one live lessons (60 min each)",
      "Match analysis presentation video preparation guide",
      "Certificate",
    ],
    youtube_id: "dQw4w9WgXcQ",
    curriculum: [
      {
        module_tr: "Modül 1: Taktik Dil",
        module_en: "Module 1: Tactical Language",
        topics_tr: [
          "Dizilişler ve değişkenler: 4-3-3, 4-2-3-1, 3-4-3, hybrid systems",
          "Savunma organizasyonu: defensive line, compactness, press triggers",
          "Hücum organizasyonu: positional play, rotations, overloads",
          "Geçiş anları: positive transition, negative transition, counter-press",
          "Duran toplar: delivery, blocking, marking, flick-on, second ball",
          "Oyun modelleri: principles of play, game model presentation dili",
        ],
        topics_en: [
          "Formations and variants: 4-3-3, 4-2-3-1, 3-4-3, hybrid systems",
          "Defensive organisation: defensive line, compactness, press triggers",
          "Attacking organisation: positional play, rotations, overloads",
          "Transition moments: positive transition, negative transition, counter-press",
          "Set pieces: delivery, blocking, marking, flick-on, second ball",
          "Game models: principles of play, game model presentation language",
        ],
      },
      {
        module_tr: "Modül 2: Oyuncu Yönetimi Dili",
        module_en: "Module 2: Player Management Language",
        topics_tr: [
          "Bireysel performans görüşmeleri: strengths, areas for improvement",
          "Motivasyon konuşmaları: pre-match talk, half-time talk yapısı",
          "Disiplin ve kural ihlali görüşmeleri",
          "Genç oyuncu geliştirme görüşmeleri",
          "Oyuncu devre arası ve maç sonu geribildirim dili",
          "Kaptanlık ve liderlik konuşmaları",
        ],
        topics_en: [
          "Individual performance reviews: strengths, areas for improvement",
          "Motivational speeches: pre-match talk, half-time talk structure",
          "Discipline and rule violation conversations",
          "Youth player development conversations",
          "Player feedback at half-time and post-match",
          "Captaincy and leadership conversations",
        ],
      },
      {
        module_tr: "Modül 3: Basın Toplantısı İngilizcesi",
        module_en: "Module 3: Press Conference English",
        topics_tr: [
          "Açılış bildirisi yapısı: 'First of all, I'd like to say…'",
          "Zor soruları yanıtlama: 'I think that's a bit unfair…', 'With respect…'",
          "Rakipler hakkında konuşmak: diplomatik övgü ve eleştiri dili",
          "Sakatlık ve kadro haberleri: 'he's touch-and-go', 'we'll assess him'",
          "Transfer soruları: 'I'm not going to comment on speculation'",
          "Sıkça sorulan sorular ve model yanıtlar bankası",
        ],
        topics_en: [
          "Opening statement structure: 'First of all, I'd like to say…'",
          "Handling difficult questions: 'I think that's a bit unfair…', 'With respect…'",
          "Talking about opponents: diplomatic praise and criticism language",
          "Injury and squad news: 'he's touch-and-go', 'we'll assess him'",
          "Transfer questions: 'I'm not going to comment on speculation'",
          "Frequently asked questions and model answer bank",
        ],
      },
      {
        module_tr: "Modül 4: UEFA Lisans Sınavı Dili",
        module_en: "Module 4: UEFA Licence Exam Language",
        topics_tr: [
          "UEFA B ve Pro Lisansı sözlü sınav formatı ve beklentileri",
          "Oyun modeli sunumu: structure, principles, drills dizisi",
          "Antrenman planı sunumu: objective, organisation, coaching points",
          "Soru-cevap bölümü: assessing and justifying your decisions",
          "Akademik yazı: raporlar, analiz belgeleri, gözlem formları",
          "Geçmiş sınav sorularına dayalı alıştırma seansları",
        ],
        topics_en: [
          "UEFA B and Pro Licence oral exam format and expectations",
          "Game model presentation: structure, principles, drills sequence",
          "Session plan presentation: objective, organisation, coaching points",
          "Question and answer section: assessing and justifying your decisions",
          "Academic writing: reports, analysis documents, observation forms",
          "Practice sessions based on past exam questions",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. YORUMCU / GAZETECİ — 85.000 TL
  // ─────────────────────────────────────────────
  {
    id: "5",
    slug: "spor-yorumculugu-gazetecilik-ingilizce",
    title_tr: "Spor Yorumculuğu & Gazetecilik İngilizcesi",
    title_en: "Sports Commentary & Journalism English",
    description_tr:
      "Uluslararası yayın kuruluşları seviyesinde canlı yorum, maç analizi ve spor habercilik İngilizcesi. BBC, beIN Sports ve ESPN standartlarında kendini ifade et.",
    description_en:
      "Live commentary, match analysis and sports journalism English to international broadcaster standards. Express yourself to the level of BBC, beIN Sports and ESPN.",
    price: 8_500_000, // 85.000 TL
    level: "intermediate",
    category: "journalist",
    thumbnail: "🎙️",
    lessons: 30,
    duration: "15 saat",
    duration_en: "15 hours",
    badge_tr: "Yayıncı Standartı",
    badge_en: "Broadcaster Standard",
    outcomes_tr: [
      "Canlı İngilizce maç yorumu yapabilmek",
      "İngilizce maç analizi raporları yazabilmek",
      "Futbolcular ve antrenörlerle İngilizce röportaj yapabilmek",
      "Uluslararası basın toplantılarında soru sorabilmek",
      "Sosyal medya için İngilizce futbol içeriği üretebilmek",
      "İngilizce yayın organlarına haber metni yazabilmek",
    ],
    outcomes_en: [
      "Deliver live match commentary in English",
      "Write match analysis reports in English",
      "Interview players and coaches in English",
      "Ask questions at international press conferences",
      "Produce English football content for social media",
      "Write news copy for English-language publications",
    ],
    includes_tr: [
      "30 video ders (toplam 15 saat)",
      "Yorumcu kalıpları kütüphanesi (200+ ifade)",
      "Canlı yorum simülasyonu egzersizleri",
      "Röportaj soru bankası",
      "4 adet birebir canlı ders (60 dk)",
      "Gerçek maç klipleri üzerinde yorum pratiği",
      "Sertifika",
    ],
    includes_en: [
      "30 video lessons (15 hours total)",
      "Commentary phrase library (200+ expressions)",
      "Live commentary simulation exercises",
      "Interview question bank",
      "4 one-to-one live lessons (60 min each)",
      "Commentary practice on real match clips",
      "Certificate",
    ],
    youtube_id: "dQw4w9WgXcQ",
    curriculum: [
      {
        module_tr: "Modül 1: Canlı Yorum Dili",
        module_en: "Module 1: Live Commentary Language",
        topics_tr: [
          "Tempo ve ritim: hızlı, orta, yavaş oyun için farklı yorum dili",
          "Gol anı ifadeleri: 'He's done it!', 'What a strike!', 'It's in the net!'",
          "Kaçan fırsatlar: 'He'll be disappointed with that', 'Inches wide'",
          "VAR süreci yorumu: 'The referee has gone to the monitor…'",
          "Maç sonu kapanış: 'And that's the final whistle…', özet dili",
          "Duygusal yorum: surprise, drama, controversy ifadeleri",
        ],
        topics_en: [
          "Tempo and rhythm: different commentary language for fast, mid, slow play",
          "Goal moment phrases: 'He's done it!', 'What a strike!', 'It's in the net!'",
          "Missed chances: 'He'll be disappointed with that', 'Inches wide'",
          "VAR process commentary: 'The referee has gone to the monitor…'",
          "Post-match close: 'And that's the final whistle…', summary language",
          "Emotional commentary: surprise, drama, controversy expressions",
        ],
      },
      {
        module_tr: "Modül 2: Analiz ve Haber Dili",
        module_en: "Module 2: Analysis and News Language",
        topics_tr: [
          "Maç analizi yapısı: intro, key moments, tactical breakdown, verdict",
          "İstatistik yorumu: 'Despite dominating possession…', xG ifadeleri",
          "Haber yazısı formatı: inverted pyramid, lede, quotes",
          "Başlık yazımı: dinamik, kısa, güçlü İngilizce başlıklar",
          "Sosyal medya dili: Twitter/X, Instagram için futbol içerikleri",
          "Transfer haberciliği: kaynaklar, spekülasyon ve kesinleşmiş haber dili",
        ],
        topics_en: [
          "Match analysis structure: intro, key moments, tactical breakdown, verdict",
          "Stats interpretation: 'Despite dominating possession…', xG expressions",
          "News article format: inverted pyramid, lede, quotes",
          "Headline writing: dynamic, concise, powerful English headlines",
          "Social media language: football content for Twitter/X, Instagram",
          "Transfer reporting: sources, speculation and confirmed news language",
        ],
      },
      {
        module_tr: "Modül 3: Röportaj Teknikleri",
        module_en: "Module 3: Interview Techniques",
        topics_tr: [
          "Röportaj açılışı: 'Congratulations on the win, how did that feel?'",
          "Derinleştirme soruları: 'Can you elaborate on that?', 'What do you mean by…?'",
          "Zor sorular: 'There's been speculation about your future…'",
          "Basın toplantısında soru sormak: etiquette ve format",
          "Canlı yayın röportajı: kısa, dinamik sorular",
          "Maç sonrası kısa röportaj kalıpları (mixed zone dili)",
        ],
        topics_en: [
          "Interview opener: 'Congratulations on the win, how did that feel?'",
          "Probing questions: 'Can you elaborate on that?', 'What do you mean by…?'",
          "Difficult questions: 'There's been speculation about your future…'",
          "Asking questions at press conferences: etiquette and format",
          "Live broadcast interview: short, dynamic questions",
          "Post-match short interview patterns (mixed zone language)",
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. FULL PACKAGE — 150.000 TL
  // ─────────────────────────────────────────────
  {
    id: "6",
    slug: "footlingo-tam-paket",
    title_tr: "FootLingo Tam Paket — Tüm Kurslar",
    title_en: "FootLingo Complete Pack — All Courses",
    description_tr:
      "Yukarıdaki 5 kursu tek çatı altında sunan tam paket. Futbolcu, antrenör ve yorumcu İngilizcesini baştan sona kapsayan, kariyerinin her dönemine eşlik edecek kapsamlı program.",
    description_en:
      "The complete pack combining all 5 courses under one roof. A comprehensive programme covering footballer, coach and commentator English from start to finish — your companion at every stage of your career.",
    price: 15_000_000, // 150.000 TL
    level: "advanced",
    category: "player",
    thumbnail: "🏆",
    lessons: 145,
    duration: "73 saat",
    duration_en: "73 hours",
    badge_tr: "En İyi Değer",
    badge_en: "Best Value",
    outcomes_tr: [
      "Tüm futbol İngilizcesi seviyelerini tamamlamak",
      "Futbolcu, antrenör ve yorumcu dilini kullanabilmek",
      "Kariyerinin her aşamasında hazırlıklı olmak",
      "UEFA sertifikasyon süreçlerine İngilizce hazırlanmak",
      "Uluslararası platformlarda özgüvenle iletişim kurmak",
    ],
    outcomes_en: [
      "Complete all Football English levels",
      "Use footballer, coach and commentator language",
      "Be prepared at every stage of your career",
      "Prepare in English for UEFA certification processes",
      "Communicate confidently on international platforms",
    ],
    includes_tr: [
      "Taraftar Futbol İngilizcesi (tüm modüller)",
      "Futbolcu İngilizcesi: Saha İçi İletişim (tüm modüller)",
      "Transfer & Sözleşme İngilizcesi (tüm modüller)",
      "Antrenör & Teknik Direktör İngilizcesi (tüm modüller)",
      "Spor Yorumculuğu & Gazetecilik İngilizcesi (tüm modüller)",
      "145 video ders (toplam 73 saat)",
      "Sınırsız birebir canlı ders (12 ay)",
      "Öncelikli destek hattı",
      "Tüm PDF materyaller ve ses dosyaları",
      "Ömür boyu erişim",
      "FootLingo Tam Paket Sertifikası",
    ],
    includes_en: [
      "Football Fan English (all modules)",
      "Footballer English: On-Pitch Communication (all modules)",
      "Transfer & Contract English (all modules)",
      "Coaching & Management English (all modules)",
      "Sports Commentary & Journalism English (all modules)",
      "145 video lessons (73 hours total)",
      "Unlimited one-to-one live lessons (12 months)",
      "Priority support line",
      "All PDF materials and audio files",
      "Lifetime access",
      "FootLingo Complete Pack Certificate",
    ],
    youtube_id: "dQw4w9WgXcQ",
    curriculum: [],
  },
];

export const mockBlogPosts = [
  {
    id: "1",
    slug: "futbol-ingilizcesinin-temelleri",
    title_tr: "Futbol İngilizcesinin 20 Temel Terimi",
    title_en: "20 Essential Football English Terms",
    excerpt_tr: "Sahada duyacağın en önemli İngilizce komutlar ve terimler. Offsidedan pressinge, tüm temel kelimeler burada.",
    excerpt_en: "The most important English commands and terms you'll hear on the pitch. From offside to pressing, all the basics here.",
    published_at: "2026-05-20",
    read_time: "5 dk",
    read_time_en: "5 min",
    content_tr: `<p>Futbol sahalarında İngilizce artık vazgeçilmez bir araç. UEFA lisansından yabancı takımlara kadar her yerde karşılaşacağın bu terimleri öğrenmek kariyerine büyük katkı sağlar.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">1. Pressing</h2>
    <p><strong style="color:#fbbf24">High pressing</strong> — yüksek pres. Savunmanın karşı takıma erken baskı uygulaması. <em>"We press high and win the ball back quickly."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">2. Offside</h2>
    <p><strong style="color:#fbbf24">Ofsayt.</strong> <em>"He's caught offside — the flag is up."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">3. Overlap</h2>
    <p><strong style="color:#fbbf24">Arkadan koşu.</strong> <em>"Make the overlap on the right!"</em> — sağ taraftan arkadan geç!</p>`,
    content_en: `<p>English has become an essential tool on football pitches worldwide. Learning these terms will greatly benefit your career.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">1. Pressing</h2>
    <p><strong style="color:#fbbf24">High pressing</strong> — applying early defensive pressure high up the pitch. <em>"We press high and win the ball back quickly."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">2. Offside</h2>
    <p><strong style="color:#fbbf24">Being in an offside position.</strong> <em>"He's caught offside — the flag is up."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">3. Overlap</h2>
    <p><strong style="color:#fbbf24">Running past a teammate to create width.</strong> <em>"Make the overlap on the right!"</em></p>`,
  },
  {
    id: "2",
    slug: "transfer-doneminde-ingilizce",
    title_tr: "Transfer Döneminde Bilmen Gereken 15 İngilizce İfade",
    title_en: "15 English Phrases You Need During Transfer Windows",
    excerpt_tr: "\"Done deal\", \"release clause\", \"medical\" — transfer döneminin vazgeçilmez terimleri.",
    excerpt_en: '"Done deal", "release clause", "medical" — the essential transfer window vocabulary.',
    published_at: "2026-05-15",
    read_time: "7 dk",
    read_time_en: "7 min",
    content_tr: `<p>Transfer dönemi geldiğinde sosyal medya İngilizce terimlerle dolup taşar. Bu kelimeleri bilmek hem kariyer hem de takip açısından çok önemli.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Done deal</h2>
    <p>Transfer tamamlandı. <em>"It's a done deal — the player signs tomorrow."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Release clause</h2>
    <p>Sözleşmedeki fesih bedeli. <em>"His release clause is set at €50 million."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Medical</h2>
    <p>Tıbbi muayene. <em>"He's in the city to undergo his medical."</em></p>`,
    content_en: `<p>When transfer windows open, social media floods with English football jargon. Knowing these terms is crucial both for your career and following the game.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Done deal</h2>
    <p>Transfer completed. <em>"It's a done deal — the player signs tomorrow."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Release clause</h2>
    <p>A buyout clause in the contract. <em>"His release clause is set at €50 million."</em></p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Medical</h2>
    <p>Medical examination before signing. <em>"He's in the city to undergo his medical."</em></p>`,
  },
  {
    id: "3",
    slug: "uefa-lisans-ingilizce-rehberi",
    title_tr: "UEFA Antrenörlük Lisansı İçin İngilizce Rehberi",
    title_en: "The English Language Guide for UEFA Coaching Licences",
    excerpt_tr: "UEFA Pro Lisansı sınavında karşılaşacağın terimler ve antrenörlük İngilizcesinin temelleri.",
    excerpt_en: "Terms you will encounter in the UEFA Pro Licence exam and the foundations of coaching English.",
    published_at: "2026-05-10",
    read_time: "8 dk",
    read_time_en: "8 min",
    content_tr: `<p>UEFA antrenörlük lisansları artık uluslararası standartlarda değerlendiriliyor. Bu süreçte İngilizce bilgisi kritik bir rol oynuyor.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Taktik Terimler</h2>
    <p><strong style="color:#fbbf24">Compact shape</strong> — sıkı savunma düzeni. <strong style="color:#fbbf24">Transition play</strong> — geçiş oyunu. <strong style="color:#fbbf24">Set pieces</strong> — duran toplar.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Antrenman Planı Sunumu</h2>
    <p>Sınavda sıkça sorulan format: <em>"The objective of this session is to improve our ability to press high and recover the ball in the final third."</em></p>`,
    content_en: `<p>UEFA coaching licences are now assessed to international standards. English proficiency plays a critical role in this process.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Tactical Terms</h2>
    <p><strong style="color:#fbbf24">Compact shape</strong> — a tight defensive structure. <strong style="color:#fbbf24">Transition play</strong> — quick switches between attack and defence. <strong style="color:#fbbf24">Set pieces</strong> — corners, free kicks and throw-ins.</p>
    <h2 style="font-size:1.4rem;font-weight:800;color:white;margin:2rem 0 0.75rem">Session Plan Presentation</h2>
    <p>A frequently required format in exams: <em>"The objective of this session is to improve our ability to press high and recover the ball in the final third."</em></p>`,
  },
];

export const mockTestimonials = [
  {
    name: "Emre Kaya",
    role_tr: "Profesyonel Futbolcu",
    role_en: "Professional Footballer",
    text_tr: "Hollanda'daki yeni takımıma uyum sağlamam FootLingo sayesinde çok daha kolay oldu. İlk haftadan itibaren antrenörümü anlayabiliyordum.",
    text_en: "Adapting to my new team in the Netherlands was much easier thanks to FootLingo. I could understand my coach from the very first week.",
    avatar: "EK",
  },
  {
    name: "Selin Arslan",
    role_tr: "Spor Yorumcusu",
    role_en: "Sports Commentator",
    text_tr: "Uluslararası maçları yorumlamak artık çok daha güvenli hissettiriyor. Transfer dönemlerinde İngilizce kaynakları doğrudan takip edebiliyorum.",
    text_en: "I feel much more confident commentating on international matches. I can now follow English sources directly during transfer windows.",
    avatar: "SA",
  },
  {
    name: "Mehmet Yıldız",
    role_tr: "UEFA B Lisanslı Antrenör",
    role_en: "UEFA B Licence Coach",
    text_tr: "Kurs içerikleri tamamen futbol odaklı olduğu için genel İngilizce kurslarına kıyasla çok daha hızlı ilerliyorsunuz.",
    text_en: "Because the course content is entirely football-focused, you progress much faster compared to general English courses.",
    avatar: "MY",
  },
];

export const levelLabels = {
  tr: { beginner: "Başlangıç", intermediate: "Orta Seviye", advanced: "İleri Seviye" },
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(amount / 100);
}
