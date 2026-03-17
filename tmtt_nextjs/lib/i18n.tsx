"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

const LANG_KEY = "omenda_lang";

export const languages: Record<string, { label: string; flag: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", flag: "🇬🇧", dir: "ltr" },
  es: { label: "Español", flag: "🇪🇸", dir: "ltr" },
  fr: { label: "Français", flag: "🇫🇷", dir: "ltr" },
  pt: { label: "Português", flag: "🇧🇷", dir: "ltr" },
  de: { label: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  ar: { label: "العربية", flag: "🇸🇦", dir: "rtl" },
  zh: { label: "中文", flag: "🇨🇳", dir: "ltr" },
  hi: { label: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  ja: { label: "日本語", flag: "🇯🇵", dir: "ltr" },
  ko: { label: "한국어", flag: "🇰🇷", dir: "ltr" },
  sw: { label: "Kiswahili", flag: "🇰🇪", dir: "ltr" },
  tr: { label: "Türkçe", flag: "🇹🇷", dir: "ltr" },
  ru: { label: "Русский", flag: "🇷🇺", dir: "ltr" },
  id: { label: "Indonesia", flag: "🇮🇩", dir: "ltr" },
  th: { label: "ไทย", flag: "🇹🇭", dir: "ltr" },
  it: { label: "Italiano", flag: "🇮🇹", dir: "ltr" },
  vi: { label: "Tiếng Việt", flag: "🇻🇳", dir: "ltr" },
  nl: { label: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  pl: { label: "Polski", flag: "🇵🇱", dir: "ltr" },
  bn: { label: "বাংলা", flag: "🇧🇩", dir: "ltr" },
  ms: { label: "Bahasa Melayu", flag: "🇲🇾", dir: "ltr" },
  tl: { label: "Filipino", flag: "🇵🇭", dir: "ltr" },
  uk: { label: "Українська", flag: "🇺🇦", dir: "ltr" },
  el: { label: "Ελληνικά", flag: "🇬🇷", dir: "ltr" },
  he: { label: "עברית", flag: "🇮🇱", dir: "rtl" },
  sv: { label: "Svenska", flag: "🇸🇪", dir: "ltr" },
  da: { label: "Dansk", flag: "🇩🇰", dir: "ltr" },
  fi: { label: "Suomi", flag: "🇫🇮", dir: "ltr" },
  no: { label: "Norsk", flag: "🇳🇴", dir: "ltr" },
  ro: { label: "Română", flag: "🇷🇴", dir: "ltr" },
  hu: { label: "Magyar", flag: "🇭🇺", dir: "ltr" },
  cs: { label: "Čeština", flag: "🇨🇿", dir: "ltr" },
  am: { label: "አማርኛ", flag: "🇪🇹", dir: "ltr" },
  ha: { label: "Hausa", flag: "🇳🇬", dir: "ltr" },
  yo: { label: "Yorùbá", flag: "🇳🇬", dir: "ltr" },
  zu: { label: "isiZulu", flag: "🇿🇦", dir: "ltr" },
};

type Translations = Record<string, Record<string, string>>;

const T: Translations = {
  // ── Navigation ──
  "nav.home": {
    en: "Home", es: "Inicio", fr: "Accueil", pt: "Início", de: "Startseite",
    ar: "الرئيسية", zh: "首页", hi: "होम", ja: "ホーム", ko: "홈",
    sw: "Nyumbani", tr: "Ana Sayfa", ru: "Главная", id: "Beranda", th: "หน้าแรก",
    it: "Home", vi: "Trang chủ", nl: "Home", pl: "Strona główna", bn: "হোম", ms: "Laman Utama", tl: "Home", uk: "Головна", el: "Αρχική", he: "בית", sv: "Hem", da: "Hjem", fi: "Koti", no: "Hjem", ro: "Acasă", hu: "Kezdőlap", cs: "Domů", am: "መነሻ", ha: "Gida", yo: "Ilé", zu: "Ekhaya"
  },
  "nav.marketplace": {
    en: "Marketplace", es: "Mercado", fr: "Marché", pt: "Mercado", de: "Marktplatz",
    ar: "السوق", zh: "市场", hi: "बाज़ार", ja: "マーケット", ko: "마켓플레이스",
    sw: "Soko", tr: "Pazar", ru: "Маркетплейс", id: "Pasar", th: "ตลาด",
    it: "Mercato", vi: "Chợ", nl: "Marktplaats", pl: "Rynek", bn: "মার্কেটপ্লেস", ms: "Pasaran", tl: "Palengke", uk: "Маркетплейс", el: "Αγορά", he: "שוק", sv: "Marknadsplats", da: "Markedsplads", fi: "Markkinapaikka", no: "Markedsplass", ro: "Piață", hu: "Piactér", cs: "Tržiště", am: "ገበያ", ha: "Kasuwa", yo: "Ọjà", zu: "Imakethe"
  },
  "nav.map": {
    en: "Map", es: "Mapa", fr: "Carte", pt: "Mapa", de: "Karte",
    ar: "خريطة", zh: "地图", hi: "नक्शा", ja: "マップ", ko: "지도",
    sw: "Ramani", tr: "Harita", ru: "Карта", id: "Peta", th: "แผนที่",
    it: "Mappa", vi: "Bản đồ", nl: "Kaart", pl: "Mapa", bn: "মানচিত্র", ms: "Peta", tl: "Mapa", uk: "Карта", el: "Χάρτης", he: "מפה", sv: "Karta", da: "Kort", fi: "Kartta", no: "Kart", ro: "Hartă", hu: "Térkép", cs: "Mapa", am: "ካርታ", ha: "Taswirar", yo: "Maapu", zu: "Imephu"
  },
  "nav.services": {
    en: "Services", es: "Servicios", fr: "Services", pt: "Serviços", de: "Dienste",
    ar: "خدمات", zh: "服务", hi: "सेवाएं", ja: "サービス", ko: "서비스",
    sw: "Huduma", tr: "Hizmetler", ru: "Услуги", id: "Layanan", th: "บริการ",
    it: "Servizi", vi: "Dịch vụ", nl: "Diensten", pl: "Usługi", bn: "সেবা", ms: "Perkhidmatan", tl: "Serbisyo", uk: "Послуги", el: "Υπηρεσίες", he: "שירותים", sv: "Tjänster", da: "Tjenester", fi: "Palvelut", no: "Tjenester", ro: "Servicii", hu: "Szolgáltatások", cs: "Služby", am: "አገልግሎቶች", ha: "Ayyuka", yo: "Iṣẹ́", zu: "Izinsizakalo"
  },
  "nav.social": {
    en: "Social", es: "Social", fr: "Social", pt: "Social", de: "Sozial",
    ar: "اجتماعي", zh: "社交", hi: "सोशल", ja: "ソーシャル", ko: "소셜",
    sw: "Jamii", tr: "Sosyal", ru: "Соцсети", id: "Sosial", th: "โซเชียล",
    it: "Social", vi: "Mạng xã hội", nl: "Sociaal", pl: "Społeczność", bn: "সোশ্যাল", ms: "Sosial", tl: "Social", uk: "Соцмережі", el: "Κοινωνικά", he: "חברתי", sv: "Socialt", da: "Socialt", fi: "Sosiaalinen", no: "Sosialt", ro: "Social", hu: "Közösségi", cs: "Sociální", am: "ማህበራዊ", ha: "Zamantakewa", yo: "Àwùjọ", zu: "Kwezenhlalo"
  },
  "nav.hotels": {
    en: "Hotels", es: "Hoteles", fr: "Hôtels", pt: "Hotéis", de: "Hotels",
    ar: "فنادق", zh: "酒店", hi: "होटल", ja: "ホテル", ko: "호텔",
    sw: "Hoteli", tr: "Oteller", ru: "Отели", id: "Hotel", th: "โรงแรม",
    it: "Hotel", vi: "Khách sạn", nl: "Hotels", pl: "Hotele", bn: "হোটেল", ms: "Hotel", tl: "Hotel", uk: "Готелі", el: "Ξενοδοχεία", he: "מלונות", sv: "Hotell", da: "Hoteller", fi: "Hotellit", no: "Hoteller", ro: "Hoteluri", hu: "Szállodák", cs: "Hotely", am: "ሆቴሎች", ha: "Otal", yo: "Hotẹẹli", zu: "Amahhotela"
  },
  "nav.homes": {
    en: "Homes", es: "Hogares", fr: "Maisons", pt: "Casas", de: "Häuser",
    ar: "منازل", zh: "房屋", hi: "घर", ja: "住宅", ko: "주택",
    sw: "Nyumba", tr: "Evler", ru: "Дома", id: "Rumah", th: "บ้าน",
    it: "Case", vi: "Nhà", nl: "Huizen", pl: "Domy", bn: "বাড়ি", ms: "Rumah", tl: "Bahay", uk: "Будинки", el: "Σπίτια", he: "בתים", sv: "Bostäder", da: "Boliger", fi: "Kodit", no: "Boliger", ro: "Locuințe", hu: "Otthonok", cs: "Domy", am: "ቤቶች", ha: "Gidaje", yo: "Ilé", zu: "Amakhaya"
  },
  "nav.bills": {
    en: "Bills", es: "Facturas", fr: "Factures", pt: "Contas", de: "Rechnungen",
    ar: "فواتير", zh: "账单", hi: "बिल", ja: "請求書", ko: "청구서",
    sw: "Bili", tr: "Faturalar", ru: "Счета", id: "Tagihan", th: "บิล",
    it: "Bollette", vi: "Hóa đơn", nl: "Rekeningen", pl: "Rachunki", bn: "বিল", ms: "Bil", tl: "Bayarin", uk: "Рахунки", el: "Λογαριασμοί", he: "חשבונות", sv: "Räkningar", da: "Regninger", fi: "Laskut", no: "Regninger", ro: "Facturi", hu: "Számlák", cs: "Účty", am: "ሂሳቦች", ha: "Kuɗi", yo: "Ìdíyelé", zu: "Ama-akhawunti"
  },
  "nav.admin": {
    en: "Admin", es: "Admin", fr: "Admin", pt: "Admin", de: "Admin",
    ar: "إدارة", zh: "管理", hi: "प्रशासन", ja: "管理", ko: "관리",
    sw: "Msimamizi", tr: "Yönetici", ru: "Админ", id: "Admin", th: "ผู้ดูแล",
    it: "Admin", vi: "Quản trị", nl: "Admin", pl: "Admin", bn: "অ্যাডমিন", ms: "Admin", tl: "Admin", uk: "Адмін", el: "Διαχειριστής", he: "מנהל", sv: "Admin", da: "Admin", fi: "Ylläpito", no: "Admin", ro: "Admin", hu: "Admin", cs: "Admin", am: "አስተዳዳሪ", ha: "Mai mulki", yo: "Alákòóso", zu: "Umlawuli"
  },
  "nav.connectPi": {
    en: "Connect Pi", es: "Conectar Pi", fr: "Connecter Pi", pt: "Conectar Pi", de: "Pi verbinden",
    ar: "ربط Pi", zh: "连接 Pi", hi: "Pi जोड़ें", ja: "Pi接続", ko: "Pi 연결",
    sw: "Unganisha Pi", tr: "Pi Bağla", ru: "Подключить Pi", id: "Hubungkan Pi", th: "เชื่อมต่อ Pi",
    it: "Connetti Pi", vi: "Kết nối Pi", nl: "Verbind Pi", pl: "Połącz Pi", bn: "Pi সংযোগ", ms: "Sambung Pi", tl: "Ikonekta Pi", uk: "Підключити Pi", el: "Σύνδεση Pi", he: "חבר Pi", sv: "Anslut Pi", da: "Tilslut Pi", fi: "Yhdistä Pi", no: "Koble Pi", ro: "Conectare Pi", hu: "Pi Csatlakozás", cs: "Připojit Pi", am: "Pi ያገናኙ", ha: "Haɗa Pi", yo: "Sopọ Pi", zu: "Xhuma Pi"
  },
  "nav.shareApp": {
    en: "Share App", es: "Compartir", fr: "Partager", pt: "Compartilhar", de: "Teilen",
    ar: "مشاركة", zh: "分享", hi: "शेयर करें", ja: "共有", ko: "공유",
    sw: "Shiriki", tr: "Paylaş", ru: "Поделиться", id: "Bagikan", th: "แชร์",
    it: "Condividi", vi: "Chia sẻ", nl: "Delen", pl: "Udostępnij", bn: "শেয়ার", ms: "Kongsi", tl: "Ibahagi", uk: "Поділитися", el: "Κοινοποίηση", he: "שתף", sv: "Dela", da: "Del", fi: "Jaa", no: "Del", ro: "Partajare", hu: "Megosztás", cs: "Sdílet", am: "አጋራ", ha: "Raba", yo: "Pín", zu: "Yabelana"
  },

  // ── Hero / Home ──
  "hero.badge": {
    en: "Pi Mainnet is Live", es: "Pi Mainnet está Activa", fr: "Pi Mainnet est en Ligne", pt: "Pi Mainnet está Ativa", de: "Pi Mainnet ist Live",
    ar: "شبكة Pi الرئيسية مباشرة", zh: "Pi 主网已上线", hi: "Pi मेननेट लाइव है", ja: "Piメインネット稼働中", ko: "Pi 메인넷 가동 중",
    sw: "Pi Mainnet iko Hai", tr: "Pi Mainnet Yayında", ru: "Pi Mainnet запущен", id: "Pi Mainnet Aktif", th: "Pi Mainnet เปิดใช้งานแล้ว",
    it: "Pi Mainnet è Live", vi: "Pi Mainnet đã Hoạt động", nl: "Pi Mainnet is Live", pl: "Pi Mainnet jest Aktywny", bn: "Pi মেইননেট লাইভ", ms: "Pi Mainnet Aktif", tl: "Pi Mainnet ay Live", uk: "Pi Mainnet запущено", el: "Το Pi Mainnet είναι Live", he: "Pi Mainnet פעיל", sv: "Pi Mainnet är Live", da: "Pi Mainnet er Live", fi: "Pi Mainnet on Live", no: "Pi Mainnet er Live", ro: "Pi Mainnet este Live", hu: "Pi Mainnet Aktív", cs: "Pi Mainnet je Live", am: "Pi Mainnet ቀጥታ ነው", ha: "Pi Mainnet yana Aiki", yo: "Pi Mainnet ti ṣiṣẹ́", zu: "Pi Mainnet iyasebenza"
  },
  "hero.titlePrefix": {
    en: "Your Life, Powered by", es: "Tu Vida, Impulsada por", fr: "Votre Vie, Propulsée par", pt: "Sua Vida, Movida por", de: "Ihr Leben, Angetrieben von",
    ar: "حياتك، مدعومة بـ", zh: "您的生活，由", hi: "आपका जीवन, द्वारा संचालित", ja: "あなたの暮らしを", ko: "당신의 삶을",
    sw: "Maisha Yako, Yanayoendeshwa na", tr: "Hayatınız,", ru: "Ваша Жизнь на", id: "Hidup Anda, Didukung oleh", th: "ชีวิตคุณ ขับเคลื่อนด้วย",
    it: "La Tua Vita, Alimentata da", vi: "Cuộc Sống Của Bạn, Vận Hành Bởi", nl: "Uw Leven, Aangedreven door", pl: "Twoje Życie, Napędzane przez", bn: "আপনার জীবন, চালিত", ms: "Hidup Anda, Dikuasakan oleh", tl: "Ang Buhay Mo, Pinapagana ng", uk: "Ваше Життя на", el: "Η Ζωή Σας, με τη Δύναμη του", he: "החיים שלך, מונעים על ידי", sv: "Ditt Liv, Drivet av", da: "Dit Liv, Drevet af", fi: "Elämäsi, Käyttövoimana", no: "Ditt Liv, Drevet av", ro: "Viața Ta, Alimentată de", hu: "Az Életed, Hajtja a", cs: "Váš Život, Poháněný", am: "ሕይወትዎ ፣ በ", ha: "Rayuwarka, Mai Ƙarfi ta", yo: "Ìgbésí Ayé Rẹ, Ní Agbára", zu: "Impilo Yakho, Iqhutshwa yi"
  },
  "hero.piCoin": {
    en: "Pi Coin", es: "Pi Coin", fr: "Pi Coin", pt: "Pi Coin", de: "Pi Coin",
    ar: "Pi Coin", zh: "Pi Coin 驱动", hi: "Pi Coin", ja: "Pi Coinが支える", ko: "Pi Coin이 함께합니다",
    sw: "Pi Coin", tr: "Pi Coin ile", ru: "Pi Coin", id: "Pi Coin", th: "Pi Coin",
    it: "Pi Coin", vi: "Pi Coin", nl: "Pi Coin", pl: "Pi Coin", bn: "Pi Coin", ms: "Pi Coin", tl: "Pi Coin", uk: "Pi Coin", el: "Pi Coin", he: "Pi Coin", sv: "Pi Coin", da: "Pi Coin", fi: "Pi Coin", no: "Pi Coin", ro: "Pi Coin", hu: "Pi Coin", cs: "Pi Coin", am: "Pi Coin", ha: "Pi Coin", yo: "Pi Coin", zu: "Pi Coin"
  },
  "hero.subtitle": {
    en: "Rent hotels, buy your dream home, and pay all your bills — using Pi cryptocurrency. Secure, instant, and decentralized.",
    es: "Alquila hoteles, compra tu casa soñada y paga todas tus facturas — usando Pi. Seguro, instantáneo y descentralizado.",
    fr: "Louez des hôtels, achetez votre maison de rêve et payez toutes vos factures — avec Pi. Sécurisé, instantané et décentralisé.",
    pt: "Alugue hotéis, compre sua casa dos sonhos e pague todas as suas contas — usando Pi. Seguro, instantâneo e descentralizado.",
    de: "Mieten Sie Hotels, kaufen Sie Ihr Traumhaus und bezahlen Sie Ihre Rechnungen — mit Pi. Sicher, sofort und dezentral.",
    ar: "استأجر فنادق، اشترِ منزل أحلامك، وادفع جميع فواتيرك — باستخدام Pi. آمن وفوري ولامركزي.",
    zh: "租酒店、买梦想家园、支付所有账单——使用Pi加密货币。安全、即时、去中心化。",
    hi: "होटल किराये पर लें, अपना सपनों का घर खरीदें, और सभी बिल चुकाएं — Pi से। सुरक्षित, तुरंत और विकेंद्रीकृत।",
    ja: "ホテルを借り、夢のマイホームを購入し、すべての請求書を支払う — Pi暗号通貨で。安全、即時、分散型。",
    ko: "호텔을 예약하고, 꿈의 집을 구매하고, 모든 청구서를 납부하세요 — Pi 암호화폐로. 안전하고, 즉시, 탈중앙화.",
    sw: "Kodi hoteli, nunua nyumba ya ndoto yako, na ulipe bili zako zote — kwa Pi. Salama, haraka na bila kati.",
    tr: "Otel kiralayın, hayalinizdeki evi satın alın, tüm faturalarınızı ödeyin — Pi ile. Güvenli, anında ve merkeziyetsiz.",
    ru: "Снимайте отели, покупайте дом мечты, оплачивайте все счета — с помощью Pi. Безопасно, мгновенно и децентрализованно.",
    id: "Sewa hotel, beli rumah impian, dan bayar semua tagihan — menggunakan Pi. Aman, instan, dan terdesentralisasi.",
    th: "เช่าโรงแรม ซื้อบ้านในฝัน และชำระบิลทั้งหมด — ด้วย Pi ปลอดภัย ทันที และกระจายศูนย์",
    it: "Affitta hotel, compra la casa dei sogni e paga le bollette — con Pi. Sicuro, istantaneo e decentralizzato.", vi: "Thuê khách sạn, mua nhà mơ ước và thanh toán hóa đơn — bằng Pi. An toàn, tức thì và phi tập trung.", nl: "Huur hotels, koop uw droomhuis en betaal rekeningen — met Pi. Veilig, direct en gedecentraliseerd.", pl: "Wynajmij hotel, kup wymarzony dom i opłać rachunki — za pomocą Pi. Bezpieczne, natychmiastowe i zdecentralizowane.", bn: "হোটেল ভাড়া করুন, স্বপ্নের বাড়ি কিনুন এবং সব বিল পরিশোধ করুন — Pi দিয়ে।", ms: "Sewa hotel, beli rumah impian dan bayar semua bil — menggunakan Pi. Selamat, segera dan terdesentralisasi.", tl: "Mag-rent ng hotel, bumili ng dream home at magbayad ng bills — gamit ang Pi. Ligtas, agaran at desentralisado.", uk: "Орендуйте готелі, купуйте будинок мрії та оплачуйте рахунки — за допомогою Pi. Безпечно, миттєво та децентралізовано.", el: "Νοικιάστε ξενοδοχεία, αγοράστε το σπίτι των ονείρων σας — με Pi. Ασφαλές, άμεσο και αποκεντρωμένο.", he: "שכרו מלונות, קנו את בית החלומות ושלמו חשבונות — עם Pi. מאובטח, מיידי ומבוזר.", sv: "Hyr hotell, köp ditt drömhem och betala räkningar — med Pi. Säkert, omedelbart och decentraliserat.", da: "Lej hoteller, køb dit drømmehjem og betal regninger — med Pi. Sikkert, øjeblikkeligt og decentraliseret.", fi: "Vuokraa hotelleja, osta unelmiesi koti ja maksa laskut — Pi:llä. Turvallista, välitöntä ja hajautettua.", no: "Lei hoteller, kjøp drømmeboligen og betal regninger — med Pi. Sikkert, øyeblikkelig og desentralisert.", ro: "Închiriați hoteluri, cumpărați casa visurilor și plătiți facturile — cu Pi. Sigur, instant și descentralizat.", hu: "Béreljen szállodát, vásároljon álomotthont és fizesse számláit — Pi-vel. Biztonságos, azonnali és decentralizált.", cs: "Pronajměte hotel, kupte dům snů a plaťte účty — pomocí Pi. Bezpečné, okamžité a decentralizované.", am: "ሆቴሎችን ይከራዩ፣ የህልም ቤት ይግዙ እና ሁሉንም ክፍያዎች ይክፈሉ — Pi በመጠቀም።", ha: "Yi hayar otal, sayi gidan mafarki kuma biya duk kuɗaɗen ku — ta Pi.", yo: "Ya hotẹẹli, ra ilé àlá rẹ kí o sì san gbogbo ìdíyelé — pẹ̀lú Pi.", zu: "Qasha amahhotela, thenga ikhaya lamaphupho bese ukhokhela ama-akhawunti — nge-Pi."
  },
  "hero.exploreServices": {
    en: "Explore Services", es: "Explorar Servicios", fr: "Explorer les Services", pt: "Explorar Serviços", de: "Dienste Entdecken",
    ar: "استكشاف الخدمات", zh: "探索服务", hi: "सेवाएं खोजें", ja: "サービスを探す", ko: "서비스 탐색",
    sw: "Gundua Huduma", tr: "Hizmetleri Keşfet", ru: "Обзор Услуг", id: "Jelajahi Layanan", th: "สำรวจบริการ",
    it: "Esplora Servizi", vi: "Khám phá Dịch vụ", nl: "Diensten Verkennen", pl: "Przeglądaj Usługi", bn: "সেবা অন্বেষণ", ms: "Terokai Perkhidmatan", tl: "Tuklasin ang Serbisyo", uk: "Огляд Послуг", el: "Εξερεύνηση Υπηρεσιών", he: "גלה שירותים", sv: "Utforska Tjänster", da: "Udforsk Tjenester", fi: "Tutustu Palveluihin", no: "Utforsk Tjenester", ro: "Explorează Servicii", hu: "Szolgáltatások Böngészése", cs: "Prozkoumat Služby", am: "አገልግሎቶችን ያስሱ", ha: "Bincika Ayyuka", yo: "Ṣàwárí Iṣẹ́", zu: "Hlola Izinsizakalo"
  },
  "hero.payBillNow": {
    en: "Pay a Bill Now", es: "Paga una Factura", fr: "Payer une Facture", pt: "Pagar uma Conta", de: "Rechnung Bezahlen",
    ar: "ادفع فاتورة الآن", zh: "立即支付账单", hi: "अभी बिल भुगतान करें", ja: "今すぐ請求書を支払う", ko: "지금 청구서 결제",
    sw: "Lipa Bili Sasa", tr: "Şimdi Fatura Öde", ru: "Оплатить Счёт", id: "Bayar Tagihan Sekarang", th: "ชำระบิลตอนนี้",
    it: "Paga una Bolletta", vi: "Thanh toán Ngay", nl: "Betaal een Rekening", pl: "Zapłać Rachunek", bn: "এখনই বিল পরিশোধ", ms: "Bayar Bil Sekarang", tl: "Magbayad ng Bill", uk: "Оплатити Рахунок", el: "Πληρωμή Λογαριασμού", he: "שלם חשבון עכשיו", sv: "Betala en Räkning Nu", da: "Betal en Regning Nu", fi: "Maksa Lasku Nyt", no: "Betal en Regning Nå", ro: "Plătește o Factură Acum", hu: "Fizess Számlát Most", cs: "Zaplatit Účet", am: "አሁን ሂሳብ ይክፈሉ", ha: "Biya Kuɗi Yanzu", yo: "San Ìdíyelé Báyìí", zu: "Khokha I-akhawunti Manje"
  },

  // ── Stats ──
  "stats.activePioneers": {
    en: "Active Pioneers", es: "Pioneros Activos", fr: "Pionniers Actifs", pt: "Pioneiros Ativos", de: "Aktive Pioniere",
    ar: "رواد نشطون", zh: "活跃先驱者", hi: "सक्रिय पायनियर्स", ja: "アクティブパイオニア", ko: "활성 파이오니어",
    sw: "Waanzilishi Hai", tr: "Aktif Öncüler", ru: "Активные Пионеры", id: "Perintis Aktif", th: "ผู้บุกเบิกที่ใช้งาน",
    it: "Pionieri Attivi", vi: "Người tiên phong", nl: "Actieve Pioniers", pl: "Aktywni Pionierzy", bn: "সক্রিয় পাইওনিয়ার", ms: "Perintis Aktif", tl: "Aktibong Pioneer", uk: "Активні Піонери", el: "Ενεργοί Πρωτοπόροι", he: "חלוצים פעילים", sv: "Aktiva Pionjärer", da: "Aktive Pionerer", fi: "Aktiiviset Pioneerit", no: "Aktive Pionerer", ro: "Pionieri Activi", hu: "Aktív Úttörők", cs: "Aktivní Průkopníci", am: "ንቁ አቅኚዎች", ha: "Masu Aiki", yo: "Àwọn Aṣáájú", zu: "Abaholi Abasebenzayo"
  },
  "stats.serviceCategories": {
    en: "Service Categories", es: "Categorías de Servicios", fr: "Catégories de Services", pt: "Categorias de Serviços", de: "Dienstkategorien",
    ar: "فئات الخدمات", zh: "服务类别", hi: "सेवा श्रेणियां", ja: "サービスカテゴリ", ko: "서비스 카테고리",
    sw: "Kategoria za Huduma", tr: "Hizmet Kategorileri", ru: "Категории Услуг", id: "Kategori Layanan", th: "หมวดหมู่บริการ",
    it: "Categorie di Servizi", vi: "Danh mục Dịch vụ", nl: "Dienstcategorieën", pl: "Kategorie Usług", bn: "সেবা বিভাগ", ms: "Kategori Perkhidmatan", tl: "Kategorya ng Serbisyo", uk: "Категорії Послуг", el: "Κατηγορίες Υπηρεσιών", he: "קטגוריות שירות", sv: "Tjänstekategorier", da: "Tjenestekategorier", fi: "Palvelukategoriat", no: "Tjenestekategorier", ro: "Categorii de Servicii", hu: "Szolgáltatási Kategóriák", cs: "Kategorie Služeb", am: "የአገልግሎት ምድቦች", ha: "Rukunin Ayyuka", yo: "Ẹ̀ka Iṣẹ́", zu: "Izigaba Zezinsizakalo"
  },
  "stats.providers": {
    en: "Providers", es: "Proveedores", fr: "Fournisseurs", pt: "Provedores", de: "Anbieter",
    ar: "مزودون", zh: "供应商", hi: "प्रदाता", ja: "プロバイダー", ko: "제공자",
    sw: "Watoa Huduma", tr: "Sağlayıcılar", ru: "Поставщики", id: "Penyedia", th: "ผู้ให้บริการ",
    it: "Fornitori", vi: "Nhà cung cấp", nl: "Aanbieders", pl: "Dostawcy", bn: "প্রদানকারী", ms: "Pembekal", tl: "Tagapagbigay", uk: "Постачальники", el: "Πάροχοι", he: "ספקים", sv: "Leverantörer", da: "Udbydere", fi: "Tarjoajat", no: "Leverandører", ro: "Furnizori", hu: "Szolgáltatók", cs: "Poskytovatelé", am: "አቅራቢዎች", ha: "Masu Samarwa", yo: "Olùpèsè", zu: "Abahlinzeki"
  },
  "stats.successRate": {
    en: "Success Rate", es: "Tasa de Éxito", fr: "Taux de Réussite", pt: "Taxa de Sucesso", de: "Erfolgsrate",
    ar: "معدل النجاح", zh: "成功率", hi: "सफलता दर", ja: "成功率", ko: "성공률",
    sw: "Kiwango cha Mafanikio", tr: "Başarı Oranı", ru: "Уровень Успеха", id: "Tingkat Keberhasilan", th: "อัตราสำเร็จ",
    it: "Tasso di Successo", vi: "Tỷ lệ Thành công", nl: "Slagingspercentage", pl: "Wskaźnik Sukcesu", bn: "সাফল্যের হার", ms: "Kadar Kejayaan", tl: "Tagumpay na Rate", uk: "Рівень Успіху", el: "Ποσοστό Επιτυχίας", he: "שיעור הצלחה", sv: "Framgångsgrad", da: "Succesrate", fi: "Onnistumisprosentti", no: "Suksessrate", ro: "Rata de Succes", hu: "Sikerességi Arány", cs: "Úspěšnost", am: "የስኬት መጠን", ha: "Adadin Nasara", yo: "Ìwọ̀n Àṣeyọrí", zu: "Izinga Lokuphumelela"
  },

  // ── Services ──
  "services.ourServices": {
    en: "Our Services", es: "Nuestros Servicios", fr: "Nos Services", pt: "Nossos Serviços", de: "Unsere Dienste",
    ar: "خدماتنا", zh: "我们的服务", hi: "हमारी सेवाएं", ja: "サービス一覧", ko: "우리의 서비스",
    sw: "Huduma Zetu", tr: "Hizmetlerimiz", ru: "Наши Услуги", id: "Layanan Kami", th: "บริการของเรา",
    it: "I Nostri Servizi", vi: "Dịch Vụ Của Chúng Tôi", nl: "Onze Diensten", pl: "Nasze Usługi", bn: "আমাদের সেবা", ms: "Perkhidmatan Kami", tl: "Ang Aming Serbisyo", uk: "Наші Послуги", el: "Οι Υπηρεσίες Μας", he: "השירותים שלנו", sv: "Våra Tjänster", da: "Vores Tjenester", fi: "Palvelumme", no: "Våre Tjenester", ro: "Serviciile Noastre", hu: "Szolgáltatásaink", cs: "Naše Služby", am: "አገልግሎቶቻችን", ha: "Ayyukanmu", yo: "Iṣẹ́ Wa", zu: "Izinsizakalo Zethu"
  },
  "services.everythingPi": {
    en: "Everything you need, paid with Pi", es: "Todo lo que necesitas, pagado con Pi", fr: "Tout ce dont vous avez besoin, payé avec Pi", pt: "Tudo que você precisa, pago com Pi", de: "Alles was Sie brauchen, bezahlt mit Pi",
    ar: "كل ما تحتاجه، ادفع بـ Pi", zh: "您需要的一切，用Pi支付", hi: "आपको जो चाहिए, Pi से भुगतान करें", ja: "必要なものすべて、Piで支払い", ko: "필요한 모든 것, Pi로 결제",
    sw: "Kila kitu unachohitaji, ulipe kwa Pi", tr: "İhtiyacınız olan her şey, Pi ile ödeyin", ru: "Всё, что нужно, оплачивайте Pi", id: "Semua yang Anda butuhkan, bayar dengan Pi", th: "ทุกสิ่งที่คุณต้องการ ชำระด้วย Pi",
    it: "Tutto ciò di cui hai bisogno, pagato con Pi", vi: "Mọi thứ bạn cần, thanh toán bằng Pi", nl: "Alles wat u nodig heeft, betaald met Pi", pl: "Wszystko czego potrzebujesz, zapłacone Pi", bn: "আপনার যা দরকার, Pi দিয়ে পরিশোধ করুন", ms: "Semua yang anda perlukan, dibayar dengan Pi", tl: "Lahat ng kailangan mo, bayad sa Pi", uk: "Все, що потрібно, оплачуйте Pi", el: "Ό,τι χρειάζεστε, πληρωμένο με Pi", he: "כל מה שצריך, משולם ב-Pi", sv: "Allt du behöver, betalt med Pi", da: "Alt du har brug for, betalt med Pi", fi: "Kaikki mitä tarvitset, maksettu Pi:llä", no: "Alt du trenger, betalt med Pi", ro: "Tot ce ai nevoie, plătit cu Pi", hu: "Minden, amire szükséged van, Pi-vel fizetve", cs: "Vše co potřebujete, placeno Pi", am: "የሚፈልጉት ሁሉ ፣ በPi ይክፈሉ", ha: "Duk abin da kuke bukata, biya ta Pi", yo: "Ohun gbogbo tí o nílò, san pẹ̀lú Pi", zu: "Konke okudingayo, ukukhokhela nge-Pi"
  },
  "services.rentHotel": {
    en: "Rent Hotel", es: "Alquilar Hotel", fr: "Louer Hôtel", pt: "Alugar Hotel", de: "Hotel Mieten",
    ar: "حجز فندق", zh: "预订酒店", hi: "होटल किराये", ja: "ホテルを予約", ko: "호텔 예약",
    sw: "Kodi Hoteli", tr: "Otel Kirala", ru: "Снять Отель", id: "Sewa Hotel", th: "เช่าโรงแรม",
    it: "Affitta Hotel", vi: "Thuê Khách sạn", nl: "Hotel Huren", pl: "Wynajmij Hotel", bn: "হোটেল ভাড়া", ms: "Sewa Hotel", tl: "Upa ng Hotel", uk: "Орендувати Готель", el: "Ενοικίαση Ξενοδοχείου", he: "שכירת מלון", sv: "Hyr Hotell", da: "Lej Hotel", fi: "Vuokraa Hotelli", no: "Lei Hotell", ro: "Închiriază Hotel", hu: "Szálloda Bérlés", cs: "Pronájem Hotelu", am: "ሆቴል ይከራዩ", ha: "Yi hayar Otal", yo: "Ya Hotẹẹli", zu: "Qasha Ihhotela"
  },
  "services.rentHotelDesc": {
    en: "Book luxury & budget hotels across East Africa", es: "Reserva hoteles de lujo y económicos", fr: "Réservez des hôtels de luxe et économiques", pt: "Reserve hotéis de luxo e econômicos", de: "Buchen Sie luxuriöse & günstige Hotels",
    ar: "احجز فنادق فاخرة واقتصادية", zh: "预订东非的豪华和经济型酒店", hi: "लक्जरी और बजट होटल बुक करें", ja: "豪華&格安ホテルを予約", ko: "럭셔리 & 저가 호텔 예약",
    sw: "Panga hoteli za anasa na bei nafuu", tr: "Lüks ve bütçe dostu oteller", ru: "Бронируйте отели", id: "Pesan hotel mewah & murah", th: "จองโรงแรมหรูและประหยัด",
    it: "Prenota hotel di lusso e economici", vi: "Đặt khách sạn sang trọng và giá rẻ", nl: "Boek luxe en budget hotels", pl: "Rezerwuj luksusowe i budżetowe hotele", bn: "বিলাসবহুল ও সাশ্রয়ী হোটেল বুক করুন", ms: "Tempah hotel mewah dan bajet", tl: "Mag-book ng luxury at budget hotels", uk: "Бронюйте розкішні та бюджетні готелі", el: "Κρατήστε πολυτελή και οικονομικά ξενοδοχεία", he: "הזמינו מלונות יוקרה ותקציביים", sv: "Boka lyx- och budgethotell", da: "Book luksus- og budgethoteller", fi: "Varaa luksus- ja budjettihotelleja", no: "Bestill luksus- og budsjetthoteller", ro: "Rezervă hoteluri de lux și economice", hu: "Foglaljon luxus és olcsó szállodákat", cs: "Rezervujte luxusní a levné hotely", am: "የቅንጦት እና ርካሽ ሆቴሎችን ያስያዙ", ha: "Yi ajiya otal masu tsada da arha", yo: "Ṣe ìfipamọ́ hotẹẹli", zu: "Bhukha amahhotela esigcwele nobuhle"
  },
  "services.buyHome": {
    en: "Buy Home", es: "Comprar Casa", fr: "Acheter Maison", pt: "Comprar Casa", de: "Haus Kaufen",
    ar: "شراء منزل", zh: "购买房屋", hi: "घर खरीदें", ja: "家を購入", ko: "집 구매",
    sw: "Nunua Nyumba", tr: "Ev Satın Al", ru: "Купить Дом", id: "Beli Rumah", th: "ซื้อบ้าน",
    it: "Compra Casa", vi: "Mua Nhà", nl: "Huis Kopen", pl: "Kup Dom", bn: "বাড়ি কিনুন", ms: "Beli Rumah", tl: "Bumili ng Bahay", uk: "Купити Будинок", el: "Αγορά Σπιτιού", he: "קנה בית", sv: "Köp Bostad", da: "Køb Bolig", fi: "Osta Koti", no: "Kjøp Bolig", ro: "Cumpără Casă", hu: "Ház Vásárlás", cs: "Koupit Dům", am: "ቤት ይግዙ", ha: "Sayi Gida", yo: "Ra Ilé", zu: "Thenga Ikhaya"
  },
  "services.buyHomeDesc": {
    en: "Houses, apartments, land & commercial properties", es: "Casas, apartamentos, terrenos y propiedades", fr: "Maisons, appartements, terrains et propriétés", pt: "Casas, apartamentos, terrenos e propriedades", de: "Häuser, Wohnungen, Grundstücke & Gewerbe",
    ar: "منازل وشقق وأراضي وعقارات تجارية", zh: "住宅、公寓、土地和商业地产", hi: "घर, अपार्टमेंट, जमीन और व्यावसायिक संपत्ति", ja: "住宅、アパート、土地、商業物件", ko: "주택, 아파트, 토지 & 상업용 부동산",
    sw: "Nyumba, ghorofa, ardhi na mali za biashara", tr: "Evler, daireler, arazi ve ticari mülkler", ru: "Дома, квартиры, земля и коммерция", id: "Rumah, apartemen, tanah & properti komersial", th: "บ้าน อพาร์ทเมนท์ ที่ดินและอสังหาริมทรัพย์",
    it: "Case, appartamenti, terreni e immobili commerciali", vi: "Nhà, căn hộ, đất và bất động sản thương mại", nl: "Huizen, appartementen, grond en commercieel vastgoed", pl: "Domy, mieszkania, działki i nieruchomości komercyjne", bn: "বাড়ি, অ্যাপার্টমেন্ট, জমি এবং বাণিজ্যিক সম্পত্তি", ms: "Rumah, apartmen, tanah dan hartanah komersial", tl: "Bahay, apartment, lupa at commercial properties", uk: "Будинки, квартири, земля та комерційна нерухомість", el: "Σπίτια, διαμερίσματα, γη και εμπορικά ακίνητα", he: "בתים, דירות, קרקע ונכסים מסחריים", sv: "Hus, lägenheter, mark och kommersiella fastigheter", da: "Huse, lejligheder, jord og erhvervsejendomme", fi: "Talot, asunnot, maa ja liikekiinteistöt", no: "Hus, leiligheter, tomt og næringseiendommer", ro: "Case, apartamente, terenuri și proprietăți comerciale", hu: "Házak, lakások, telkek és üzleti ingatlanok", cs: "Domy, byty, pozemky a komerční nemovitosti", am: "ቤቶች፣ አፓርትመንቶች፣ መሬት እና ንግድ ንብረት", ha: "Gidaje, gidaje, ƙasa da kadarori", yo: "Ilé, iyàrá, ilẹ̀ àti ohun-ìní", zu: "Izindlu, amaflethi, umhlaba nempahla yokuhweba"
  },
  "services.payBills": {
    en: "Pay Bills", es: "Pagar Facturas", fr: "Payer Factures", pt: "Pagar Contas", de: "Rechnungen Bezahlen",
    ar: "دفع الفواتير", zh: "支付账单", hi: "बिल भुगतान", ja: "請求書を支払う", ko: "청구서 결제",
    sw: "Lipa Bili", tr: "Fatura Öde", ru: "Оплатить Счета", id: "Bayar Tagihan", th: "ชำระบิล",
    it: "Paga Bollette", vi: "Thanh toán Hóa đơn", nl: "Rekeningen Betalen", pl: "Zapłać Rachunki", bn: "বিল পরিশোধ", ms: "Bayar Bil", tl: "Magbayad ng Bills", uk: "Оплатити Рахунки", el: "Πληρωμή Λογαριασμών", he: "שלם חשבונות", sv: "Betala Räkningar", da: "Betal Regninger", fi: "Maksa Laskut", no: "Betal Regninger", ro: "Plătește Facturi", hu: "Számlák Fizetése", cs: "Zaplatit Účty", am: "ሂሳቦችን ይክፈሉ", ha: "Biya Kuɗi", yo: "San Ìdíyelé", zu: "Khokha Ama-akhawunti"
  },
  "services.payBillsDesc": {
    en: "Electricity, water, internet, TV & phone bills", es: "Electricidad, agua, internet, TV y teléfono", fr: "Électricité, eau, internet, TV et téléphone", pt: "Eletricidade, água, internet, TV e telefone", de: "Strom, Wasser, Internet, TV & Telefon",
    ar: "كهرباء، ماء، إنترنت، تلفزيون وهاتف", zh: "电费、水费、网费、电视费和电话费", hi: "बिजली, पानी, इंटरनेट, टीवी और फोन बिल", ja: "電気、水道、ネット、TV、電話", ko: "전기, 수도, 인터넷, TV & 전화",
    sw: "Stima, maji, intaneti, TV na simu", tr: "Elektrik, su, internet, TV & telefon", ru: "Электричество, вода, интернет, ТВ и телефон", id: "Listrik, air, internet, TV & telepon", th: "ค่าไฟ น้ำ เน็ต ทีวี และโทรศัพท์",
    it: "Elettricità, acqua, internet, TV e telefono", vi: "Điện, nước, internet, TV và điện thoại", nl: "Elektriciteit, water, internet, TV en telefoon", pl: "Prąd, woda, internet, TV i telefon", bn: "বিদ্যুৎ, পানি, ইন্টারনেট, টিভি ও ফোন বিল", ms: "Elektrik, air, internet, TV dan telefon", tl: "Kuryente, tubig, internet, TV at telepono", uk: "Електрика, вода, інтернет, ТВ та телефон", el: "Ηλεκτρισμός, νερό, internet, TV και τηλέφωνο", he: "חשמל, מים, אינטרנט, טלוויזיה וטלפון", sv: "El, vatten, internet, TV och telefon", da: "El, vand, internet, TV og telefon", fi: "Sähkö, vesi, internet, TV ja puhelin", no: "Strøm, vann, internett, TV og telefon", ro: "Electricitate, apă, internet, TV și telefon", hu: "Villany, víz, internet, TV és telefon", cs: "Elektřina, voda, internet, TV a telefon", am: "ኤሌክትሪክ ፣ ውሃ ፣ ኢንተርኔት ፣ ቲቪ እና ስልክ", ha: "Wutar lantarki, ruwa, intanet, TV da waya", yo: "Iná mọ́nàmọ́ná, omi, ìntánẹ́ẹ́tì, TV àti fóònù", zu: "Ugesi, amanzi, i-inthanethi, i-TV nefoni"
  },
  "services.getStarted": {
    en: "Get Started →", es: "Comenzar →", fr: "Commencer →", pt: "Começar →", de: "Loslegen →",
    ar: "ابدأ الآن →", zh: "开始使用 →", hi: "शुरू करें →", ja: "始める →", ko: "시작하기 →",
    sw: "Anza →", tr: "Başla →", ru: "Начать →", id: "Mulai →", th: "เริ่มต้น →",
    it: "Inizia →", vi: "Bắt đầu →", nl: "Aan de Slag →", pl: "Rozpocznij →", bn: "শুরু করুন →", ms: "Mula →", tl: "Magsimula →", uk: "Почати →", el: "Ξεκινήστε →", he: "התחל →", sv: "Kom igång →", da: "Kom i gang →", fi: "Aloita →", no: "Kom i gang →", ro: "Începe →", hu: "Kezdés →", cs: "Začít →", am: "ጀምር →", ha: "Fara →", yo: "Bẹ̀rẹ̀ →", zu: "Qala →"
  },

  // ── CTA ──
  "cta.title": {
    en: "Start Using Pi for Everything", es: "Empieza a Usar Pi para Todo", fr: "Utilisez Pi pour Tout", pt: "Comece a Usar Pi para Tudo", de: "Pi für Alles Nutzen",
    ar: "ابدأ باستخدام Pi لكل شيء", zh: "开始用Pi做一切", hi: "सब कुछ के लिए Pi का उपयोग शुरू करें", ja: "すべてにPiを使い始めよう", ko: "모든 것에 Pi를 사용하세요",
    sw: "Anza Kutumia Pi kwa Kila Kitu", tr: "Her Şey İçin Pi Kullanın", ru: "Начните Использовать Pi для Всего", id: "Mulai Gunakan Pi untuk Segalanya", th: "เริ่มใช้ Pi สำหรับทุกอย่าง",
    it: "Inizia a Usare Pi per Tutto", vi: "Bắt đầu Sử dụng Pi cho Mọi thứ", nl: "Begin Pi te Gebruiken voor Alles", pl: "Zacznij Używać Pi do Wszystkiego", bn: "সব কিছুর জন্য Pi ব্যবহার শুরু করুন", ms: "Mula Gunakan Pi untuk Segala-galanya", tl: "Simulang Gumamit ng Pi sa Lahat", uk: "Почніть Використовувати Pi для Всього", el: "Ξεκινήστε να Χρησιμοποιείτε Pi για Όλα", he: "התחל להשתמש ב-Pi לכל דבר", sv: "Börja Använda Pi för Allt", da: "Begynd at Bruge Pi til Alt", fi: "Aloita Pi:n Käyttö Kaikkeen", no: "Begynn å Bruke Pi til Alt", ro: "Începe să Folosești Pi pentru Tot", hu: "Kezdd el Használni a Pi-t Mindenre", cs: "Začněte Používat Pi na Vše", am: "ለሁሉም Pi መጠቀም ይጀምሩ", ha: "Fara amfani da Pi ga komai", yo: "Bẹ̀rẹ̀ Lílo Pi fún Gbogbo", zu: "Qala Ukusebenzisa Pi Kukho Konke"
  },
  "cta.subtitle": {
    en: "Join thousands of pioneers already using Omenda Pi Pays for hotels, real estate, and bill payments.",
    es: "Únete a miles de pioneros que ya usan Omenda Pi Pays para hoteles, inmobiliaria y pagos de facturas.",
    fr: "Rejoignez des milliers de pionniers utilisant déjà Omenda Pi Pays pour les hôtels, l'immobilier et les factures.",
    pt: "Junte-se a milhares de pioneiros já usando Omenda Pi Pays para hotéis, imóveis e pagamentos.",
    de: "Schließen Sie sich Tausenden von Pionieren an, die Omenda Pi Pays für Hotels, Immobilien und Rechnungen nutzen.",
    ar: "انضم إلى آلاف الرواد الذين يستخدمون Omenda Pi Pays للفنادق والعقارات والفواتير.",
    zh: "加入数千名已在使用Omenda Pi Pays预订酒店、房地产和账单支付的先驱者。",
    hi: "होटल, रियल एस्टेट और बिल भुगतान के लिए Omenda Pi Pays का उपयोग कर रहे हज़ारों पायनियर्स से जुड़ें।",
    ja: "ホテル、不動産、請求書の支払いにOmenda Pi Paysを使用する数千のパイオニアに参加しましょう。",
    ko: "호텔, 부동산, 청구서 결제에 Omenda Pi Pays를 사용하는 수천 명의 파이오니어와 함께하세요.",
    sw: "Jiunge na maelfu ya waanzilishi wanaotumia Omenda Pi Pays kwa hoteli, mali na malipo ya bili.",
    tr: "Oteller, gayrimenkul ve fatura ödemeleri için Omenda Pi Pays kullanan binlerce öncüye katılın.",
    ru: "Присоединяйтесь к тысячам пионеров, использующих Omenda Pi Pays для отелей, недвижимости и оплаты счетов.",
    id: "Bergabunglah dengan ribuan perintis yang sudah menggunakan Omenda Pi Pays untuk hotel, properti, dan tagihan.",
    th: "เข้าร่วมกับผู้บุกเบิกหลายพันคนที่ใช้ Omenda Pi Pays สำหรับโรงแรม อสังหาริมทรัพย์ และการชำระบิล",
    it: "Unisciti a migliaia di pionieri che usano Omenda Pi Pays per hotel, immobili e pagamenti.", vi: "Tham gia cùng hàng ngàn người tiên phong đang sử dụng Omenda Pi Pays.", nl: "Sluit u aan bij duizenden pioniers die Omenda Pi Pays gebruiken.", pl: "Dołącz do tysięcy pionierów używających Omenda Pi Pays.", bn: "হাজার হাজার পাইওনিয়ারদের সাথে যোগ দিন যারা Omenda Pi Pays ব্যবহার করছে।", ms: "Sertai ribuan perintis yang menggunakan Omenda Pi Pays.", tl: "Sumali sa libu-libong pioneer na gumagamit ng Omenda Pi Pays.", uk: "Приєднуйтесь до тисяч піонерів, які використовують Omenda Pi Pays.", el: "Γίνετε μέλος χιλιάδων πρωτοπόρων που χρησιμοποιούν το Omenda Pi Pays.", he: "הצטרפו לאלפי חלוצים שכבר משתמשים ב-Omenda Pi Pays.", sv: "Gå med tusentals pionjärer som redan använder Omenda Pi Pays.", da: "Deltag med tusindvis af pionerer der allerede bruger Omenda Pi Pays.", fi: "Liity tuhansien pioneerien joukkoon, jotka käyttävät Omenda Pi Paysia.", no: "Bli med tusenvis av pionerer som allerede bruker Omenda Pi Pays.", ro: "Alăturați-vă miilor de pionieri care folosesc Omenda Pi Pays.", hu: "Csatlakozzon több ezer úttörőhöz, akik már Omenda Pi Payst használnak.", cs: "Připojte se k tisícům průkopníků používajících Omenda Pi Pays.", am: "Omenda Pi Pays የሚጠቀሙ በሺዎች አቅኚዎችን ይቀላቀሉ።", ha: "Ku shiga tare da dubban masu farawa da ke amfani da Omenda Pi Pays.", yo: "Darapọ̀ mọ́ ẹgbẹẹgbẹ̀rún àwọn aṣáájú tí wọ́n ń lo Omenda Pi Pays.", zu: "Joyina izinkulungwane zabaholi abasebenzisa i-Omenda Pi Pays."
  },
  "cta.viewAllServices": {
    en: "View All Services", es: "Ver Todos los Servicios", fr: "Voir Tous les Services", pt: "Ver Todos os Serviços", de: "Alle Dienste Anzeigen",
    ar: "عرض جميع الخدمات", zh: "查看所有服务", hi: "सभी सेवाएं देखें", ja: "全サービスを見る", ko: "모든 서비스 보기",
    sw: "Tazama Huduma Zote", tr: "Tüm Hizmetleri Gör", ru: "Все Услуги", id: "Lihat Semua Layanan", th: "ดูบริการทั้งหมด",
    it: "Vedi Tutti i Servizi", vi: "Xem Tất cả Dịch vụ", nl: "Alle Diensten Bekijken", pl: "Zobacz Wszystkie Usługi", bn: "সব সেবা দেখুন", ms: "Lihat Semua Perkhidmatan", tl: "Tingnan Lahat ng Serbisyo", uk: "Всі Послуги", el: "Δείτε Όλες τις Υπηρεσίες", he: "צפה בכל השירותים", sv: "Visa Alla Tjänster", da: "Se Alle Tjenester", fi: "Näytä Kaikki Palvelut", no: "Se Alle Tjenester", ro: "Vezi Toate Serviciile", hu: "Összes Szolgáltatás", cs: "Zobrazit Všechny Služby", am: "ሁሉንም አገልግሎቶች ይመልከቱ", ha: "Duba Duk Ayyuka", yo: "Wo Gbogbo Iṣẹ́", zu: "Buka Zonke Izinsizakalo"
  },

  // ── Services Page ──
  "services.piPowered": {
    en: "Pi-Powered Services", es: "Servicios Pi", fr: "Services Pi", pt: "Serviços Pi", de: "Pi-Dienste",
    ar: "خدمات Pi", zh: "Pi驱动的服务", hi: "Pi-संचालित सेवाएं", ja: "Pi対応サービス", ko: "Pi 기반 서비스",
    sw: "Huduma za Pi", tr: "Pi Destekli Hizmetler", ru: "Pi-Сервисы", id: "Layanan Pi", th: "บริการรองรับ Pi",
    it: "Servizi Pi", vi: "Dịch vụ Pi", nl: "Pi-Diensten", pl: "Usługi Pi", bn: "Pi-চালিত সেবা", ms: "Perkhidmatan Pi", tl: "Serbisyong Pi", uk: "Pi-Послуги", el: "Υπηρεσίες Pi", he: "שירותי Pi", sv: "Pi-Tjänster", da: "Pi-Tjenester", fi: "Pi-Palvelut", no: "Pi-Tjenester", ro: "Servicii Pi", hu: "Pi-Szolgáltatások", cs: "Pi-Služby", am: "Pi-አገልግሎቶች", ha: "Sabis na Pi", yo: "Iṣẹ́ Pi", zu: "Izinsizakalo ze-Pi"
  },
  "services.allServicesOnePlatform": {
    en: "All Services,", es: "Todos los Servicios,", fr: "Tous les Services,", pt: "Todos os Serviços,", de: "Alle Dienste,",
    ar: "جميع الخدمات،", zh: "所有服务，", hi: "सभी सेवाएं,", ja: "すべてのサービス", ko: "모든 서비스,",
    sw: "Huduma Zote,", tr: "Tüm Hizmetler,", ru: "Все Услуги,", id: "Semua Layanan,", th: "บริการทั้งหมด",
    it: "Tutti i Servizi,", vi: "Tất cả Dịch vụ,", nl: "Alle Diensten,", pl: "Wszystkie Usługi,", bn: "সব সেবা,", ms: "Semua Perkhidmatan,", tl: "Lahat ng Serbisyo,", uk: "Усі Послуги,", el: "Όλες οι Υπηρεσίες,", he: "כל השירותים,", sv: "Alla Tjänster,", da: "Alle Tjenester,", fi: "Kaikki Palvelut,", no: "Alle Tjenester,", ro: "Toate Serviciile,", hu: "Összes Szolgáltatás,", cs: "Všechny Služby,", am: "ሁሉም አገልግሎቶች፣", ha: "Duk Ayyuka,", yo: "Gbogbo Iṣẹ́,", zu: "Zonke Izinsizakalo,"
  },
  "services.onePlatform": {
    en: "One Platform", es: "Una Plataforma", fr: "Une Plateforme", pt: "Uma Plataforma", de: "Eine Plattform",
    ar: "منصة واحدة", zh: "一个平台", hi: "एक प्लेटफॉर्म", ja: "ワンプラットフォーム", ko: "하나의 플랫폼",
    sw: "Jukwaa Moja", tr: "Tek Platform", ru: "Одна Платформа", id: "Satu Platform", th: "แพลตฟอร์มเดียว",
    it: "Una Piattaforma", vi: "Một Nền tảng", nl: "Eén Platform", pl: "Jedna Platforma", bn: "একটি প্ল্যাটফর্ম", ms: "Satu Platform", tl: "Isang Platform", uk: "Одна Платформа", el: "Μία Πλατφόρμα", he: "פלטפורמה אחת", sv: "En Plattform", da: "Én Platform", fi: "Yksi Alusta", no: "Én Plattform", ro: "O Platformă", hu: "Egy Platform", cs: "Jedna Platforma", am: "አንድ መድረክ", ha: "Dandali Ɗaya", yo: "Pẹpẹ Kan", zu: "Inkundla Eyodwa"
  },
  "services.pageSubtitle": {
    en: "Rent hotels, buy properties, and pay your bills — all using Pi cryptocurrency. Fast, secure, and decentralized.",
    es: "Alquila hoteles, compra propiedades y paga facturas — todo con Pi. Rápido, seguro y descentralizado.",
    fr: "Louez des hôtels, achetez des propriétés et payez vos factures — tout avec Pi. Rapide, sécurisé et décentralisé.",
    pt: "Alugue hotéis, compre propriedades e pague contas — tudo com Pi. Rápido, seguro e descentralizado.",
    de: "Mieten Sie Hotels, kaufen Sie Immobilien und bezahlen Sie Rechnungen — alles mit Pi. Schnell, sicher und dezentral.",
    ar: "استأجر فنادق، اشترِ عقارات وادفع فواتيرك — كلها بـ Pi. سريع وآمن ولامركزي.",
    zh: "租酒店、买房产、付账单——全部使用Pi加密货币。快速、安全、去中心化。",
    hi: "होटल किराये पर लें, संपत्ति खरीदें, और बिल भुगतान करें — सब Pi से।",
    ja: "ホテルの予約、物件の購入、請求書の支払い — すべてPiで。",
    ko: "호텔 예약, 부동산 구매, 청구서 결제 — 모두 Pi로.",
    sw: "Kodi hoteli, nunua mali, na lipa bili — yote kwa Pi.",
    tr: "Otel kiralayın, mülk satın alın, fatura ödeyin — hepsi Pi ile.",
    ru: "Снимайте отели, покупайте недвижимость и оплачивайте счета — всё с Pi.",
    id: "Sewa hotel, beli properti, dan bayar tagihan — semuanya dengan Pi.",
    th: "เช่าโรงแรม ซื้ออสังหาฯ และชำระบิล — ทั้งหมดด้วย Pi",
    it: "Affitta hotel, compra proprietà e paga le bollette — tutto con Pi.", vi: "Thuê khách sạn, mua bất động sản và thanh toán hóa đơn — tất cả bằng Pi.", nl: "Huur hotels, koop vastgoed en betaal rekeningen — alles met Pi.", pl: "Wynajmuj hotele, kupuj nieruchomości i płać rachunki — wszystko za Pi.", bn: "হোটেল ভাড়া করুন, সম্পত্তি কিনুন এবং বিল পরিশোধ করুন — সব Pi দিয়ে।", ms: "Sewa hotel, beli hartanah dan bayar bil — semuanya dengan Pi.", tl: "Mag-rent ng hotel, bumili ng property at magbayad ng bills — lahat gamit ang Pi.", uk: "Орендуйте готелі, купуйте нерухомість та оплачуйте рахунки — все за Pi.", el: "Νοικιάστε ξενοδοχεία, αγοράστε ακίνητα και πληρώστε λογαριασμούς — με Pi.", he: "שכרו מלונות, קנו נכסים ושלמו חשבונות — הכל עם Pi.", sv: "Hyr hotell, köp fastigheter och betala räkningar — allt med Pi.", da: "Lej hoteller, køb ejendomme og betal regninger — alt med Pi.", fi: "Vuokraa hotelleja, osta kiinteistöjä ja maksa laskut — kaikki Pi:llä.", no: "Lei hoteller, kjøp eiendommer og betal regninger — alt med Pi.", ro: "Închiriați hoteluri, cumpărați proprietăți și plătiți facturi — totul cu Pi.", hu: "Béreljen hotelt, vásároljon ingatlant és fizesse számláit — mind Pi-vel.", cs: "Pronajměte hotel, kupte nemovitost a plaťte účty — vše za Pi.", am: "ሆቴሎችን ይከራዩ ፣ ንብረት ይግዙ እና ሂሳቦችን ይክፈሉ — ሁሉም በPi።", ha: "Yi hayar otal, sayi kadara kuma biya kuɗi — duka ta Pi.", yo: "Ya hotẹẹli, ra ohun-ìní kí o sì san ìdíyelé — pẹ̀lú Pi.", zu: "Qasha amahhotela, thenga impahla bese ukhokhela — konke nge-Pi."
  },
  "services.chooseService": {
    en: "Choose a Service", es: "Elige un Servicio", fr: "Choisissez un Service", pt: "Escolha um Serviço", de: "Dienst Auswählen",
    ar: "اختر خدمة", zh: "选择服务", hi: "सेवा चुनें", ja: "サービスを選ぶ", ko: "서비스 선택",
    sw: "Chagua Huduma", tr: "Bir Hizmet Seçin", ru: "Выберите Услугу", id: "Pilih Layanan", th: "เลือกบริการ",
    it: "Scegli un Servizio", vi: "Chọn Dịch vụ", nl: "Kies een Dienst", pl: "Wybierz Usługę", bn: "একটি সেবা বেছে নিন", ms: "Pilih Perkhidmatan", tl: "Pumili ng Serbisyo", uk: "Виберіть Послугу", el: "Επιλέξτε Υπηρεσία", he: "בחר שירות", sv: "Välj en Tjänst", da: "Vælg en Tjeneste", fi: "Valitse Palvelu", no: "Velg en Tjeneste", ro: "Alege un Serviciu", hu: "Válasszon Szolgáltatást", cs: "Vyberte Službu", am: "አገልግሎት ይምረጡ", ha: "Zaɓi Aiki", yo: "Yan Iṣẹ́", zu: "Khetha Insizakalo"
  },
  "services.howItWorks": {
    en: "How It Works", es: "Cómo Funciona", fr: "Comment ça Marche", pt: "Como Funciona", de: "So Funktioniert's",
    ar: "كيف يعمل", zh: "如何使用", hi: "यह कैसे काम करता है", ja: "使い方", ko: "이용 방법",
    sw: "Jinsi Inavyofanya Kazi", tr: "Nasıl Çalışır", ru: "Как Это Работает", id: "Cara Kerja", th: "วิธีใช้งาน",
    it: "Come Funziona", vi: "Cách Hoạt động", nl: "Hoe het Werkt", pl: "Jak to Działa", bn: "এটা কিভাবে কাজ করে", ms: "Cara Ia Berfungsi", tl: "Paano Ito Gumagana", uk: "Як Це Працює", el: "Πώς Λειτουργεί", he: "איך זה עובד", sv: "Hur det Fungerar", da: "Sådan Fungerer det", fi: "Näin se Toimii", no: "Slik Fungerer det", ro: "Cum Funcționează", hu: "Hogyan Működik", cs: "Jak to Funguje", am: "እንዴት ይሠራል", ha: "Yadda Yake Aiki", yo: "Bí ó Ṣe Ń Ṣiṣẹ́", zu: "Kusebenza Kanjani"
  },
  "services.step01": {
    en: "Choose Service", es: "Elige Servicio", fr: "Choisir Service", pt: "Escolher Serviço", de: "Dienst Wählen",
    ar: "اختر الخدمة", zh: "选择服务", hi: "सेवा चुनें", ja: "サービスを選ぶ", ko: "서비스 선택",
    sw: "Chagua Huduma", tr: "Hizmet Seç", ru: "Выберите Услугу", id: "Pilih Layanan", th: "เลือกบริการ",
    it: "Scegli Servizio", vi: "Chọn Dịch vụ", nl: "Kies Dienst", pl: "Wybierz Usługę", bn: "সেবা বেছে নিন", ms: "Pilih Perkhidmatan", tl: "Pumili ng Serbisyo", uk: "Виберіть Послугу", el: "Επιλογή Υπηρεσίας", he: "בחר שירות", sv: "Välj Tjänst", da: "Vælg Tjeneste", fi: "Valitse Palvelu", no: "Velg Tjeneste", ro: "Alege Serviciu", hu: "Szolgáltatás Kiválasztása", cs: "Zvolte Službu", am: "አገልግሎት ይምረጡ", ha: "Zaɓi Aiki", yo: "Yan Iṣẹ́", zu: "Khetha Insizakalo"
  },
  "services.step01Desc": {
    en: "Select from hotels, properties, or bill payment", es: "Selecciona hoteles, propiedades o pago de facturas", fr: "Choisissez parmi hôtels, propriétés ou factures", pt: "Selecione hotéis, propriedades ou pagamento de contas", de: "Wählen Sie Hotels, Immobilien oder Rechnungszahlung",
    ar: "اختر من بين الفنادق أو العقارات أو دفع الفواتير", zh: "从酒店、房产或账单支付中选择", hi: "होटल, संपत्ति, या बिल भुगतान चुनें", ja: "ホテル、物件、請求書から選択", ko: "호텔, 부동산 또는 청구서 선택",
    sw: "Chagua kutoka hoteli, mali au malipo ya bili", tr: "Otellerden, mülklerden veya fatura ödemesinden seçin", ru: "Выберите отели, недвижимость или оплату счетов", id: "Pilih dari hotel, properti, atau pembayaran tagihan", th: "เลือกจากโรงแรม อสังหาฯ หรือชำระบิล",
    it: "Scegli tra hotel, proprietà o pagamento bollette", vi: "Chọn khách sạn, bất động sản hoặc thanh toán hóa đơn", nl: "Kies uit hotels, vastgoed of rekeningen", pl: "Wybierz z hoteli, nieruchomości lub rachunków", bn: "হোটেল, সম্পত্তি বা বিল পরিশোধ থেকে নির্বাচন করুন", ms: "Pilih daripada hotel, hartanah atau pembayaran bil", tl: "Pumili mula sa hotel, property o bill payment", uk: "Виберіть з готелів, нерухомості або оплати рахунків", el: "Επιλέξτε ξενοδοχεία, ακίνητα ή πληρωμή λογαριασμών", he: "בחר ממלונות, נכסים או תשלום חשבונות", sv: "Välj mellan hotell, fastigheter eller räkningar", da: "Vælg mellem hoteller, ejendomme eller regninger", fi: "Valitse hotelleista, kiinteistöistä tai laskuista", no: "Velg mellom hoteller, eiendommer eller regninger", ro: "Alegeți dintre hoteluri, proprietăți sau facturi", hu: "Válasszon szállodák, ingatlanok vagy számlák közül", cs: "Vyberte z hotelů, nemovitostí nebo účtů", am: "ከሆቴሎች ፣ ንብረት ወይም ሂሳብ ይምረጡ", ha: "Zaɓi daga otal, kadara ko biyan kuɗi", yo: "Yan láti hotẹẹli, ohun-ìní tàbí ìdíyelé", zu: "Khetha kumahhotela, izakhiwo noma ama-akhawunti"
  },
  "services.step02": {
    en: "Select & Configure", es: "Seleccionar y Configurar", fr: "Sélectionner et Configurer", pt: "Selecionar e Configurar", de: "Auswählen & Konfigurieren",
    ar: "اختر واضبط", zh: "选择和配置", hi: "चुनें और कॉन्फ़िगर करें", ja: "選択して設定", ko: "선택 및 설정",
    sw: "Chagua na Sanidi", tr: "Seç ve Yapılandır", ru: "Выберите и Настройте", id: "Pilih & Atur", th: "เลือกและกำหนดค่า",
    it: "Seleziona e Configura", vi: "Chọn và Cấu hình", nl: "Selecteer en Configureer", pl: "Wybierz i Skonfiguruj", bn: "নির্বাচন ও কনফিগার", ms: "Pilih dan Konfigurasikan", tl: "Pumili at I-configure", uk: "Виберіть та Налаштуйте", el: "Επιλογή και Ρύθμιση", he: "בחר והגדר", sv: "Välj och Konfigurera", da: "Vælg og Konfigurer", fi: "Valitse ja Määritä", no: "Velg og Konfigurer", ro: "Selectează și Configurează", hu: "Kiválasztás és Beállítás", cs: "Vyberte a Nastavte", am: "ምረጡ እና ያዋቅሩ", ha: "Zaɓi kuma Saita", yo: "Yan àti Ṣètò", zu: "Khetha Bese Ulungisa"
  },
  "services.step02Desc": {
    en: "Pick your item, dates, or enter bill details", es: "Elige tu artículo, fechas o ingresa detalles de factura", fr: "Choisissez votre article, dates ou entrez les détails", pt: "Escolha seu item, datas ou insira detalhes da conta", de: "Wählen Sie Ihr Artikel, Daten oder Rechnungsdetails",
    ar: "اختر العنصر أو التواريخ أو أدخل تفاصيل الفاتورة", zh: "选择您的项目、日期或输入账单详情", hi: "अपना आइटम, तिथियां चुनें या बिल विवरण दर्ज करें", ja: "アイテム、日付を選択、または明細を入力", ko: "항목, 날짜를 선택하거나 청구서 세부정보를 입력",
    sw: "Chagua bidhaa yako, tarehe, au ingiza maelezo ya bili", tr: "Öğenizi, tarihleri seçin veya fatura bilgilerini girin", ru: "Выберите товар, даты или введите данные счёта", id: "Pilih item, tanggal, atau masukkan detail tagihan", th: "เลือกรายการ วันที่ หรือกรอกรายละเอียดบิล",
    it: "Scegli articolo, date o dettagli bolletta", vi: "Chọn món, ngày hoặc nhập chi tiết hóa đơn", nl: "Kies uw artikel, data of voer rekening in", pl: "Wybierz przedmiot, daty lub szczegóły rachunku", bn: "আইটেম, তারিখ বা বিল বিবরণ লিখুন", ms: "Pilih item, tarikh atau masukkan butiran bil", tl: "Pumili ng item, petsa o ilagay ang detalye ng bill", uk: "Виберіть товар, дати або введіть дані рахунку", el: "Επιλέξτε αντικείμενο, ημερομηνίες ή εισάγετε λεπτομέρειες", he: "בחר פריט, תאריכים או הזן פרטי חשבון", sv: "Välj artikel, datum eller ange räkningsdetaljer", da: "Vælg vare, datoer eller indtast regningsdetaljer", fi: "Valitse tuote, päivämäärät tai syötä laskutiedot", no: "Velg vare, datoer eller oppgi regningsdetaljer", ro: "Alegeți articol, date sau introduceți detalii", hu: "Válasszon tételt, dátumot vagy adja meg az adatokat", cs: "Vyberte položku, data nebo zadejte údaje", am: "ንጥል ፣ ቀኖች ይምረጡ ወይም ዝርዝሮችን ያስገቡ", ha: "Zaɓi abu, ranakun ko shigar bayanan", yo: "Yan ohun, ọjọ́ tàbí kọ àlàyé", zu: "Khetha into, izinsuku noma ufake imininingwane"
  },
  "services.step03": {
    en: "Pay with Pi", es: "Pagar con Pi", fr: "Payer avec Pi", pt: "Pagar com Pi", de: "Mit Pi Bezahlen",
    ar: "ادفع بـ Pi", zh: "用Pi支付", hi: "Pi से भुगतान करें", ja: "Piで支払う", ko: "Pi로 결제",
    sw: "Lipa kwa Pi", tr: "Pi ile Öde", ru: "Оплатить Pi", id: "Bayar dengan Pi", th: "ชำระด้วย Pi",
    it: "Paga con Pi", vi: "Thanh toán bằng Pi", nl: "Betaal met Pi", pl: "Zapłać Pi", bn: "Pi দিয়ে পরিশোধ", ms: "Bayar dengan Pi", tl: "Bayad sa Pi", uk: "Оплатити Pi", el: "Πληρωμή με Pi", he: "שלם עם Pi", sv: "Betala med Pi", da: "Betal med Pi", fi: "Maksa Pi:llä", no: "Betal med Pi", ro: "Plătește cu Pi", hu: "Fizess Pi-vel", cs: "Zaplaťte Pi", am: "በPi ይክፈሉ", ha: "Biya da Pi", yo: "San pẹ̀lú Pi", zu: "Khokha nge-Pi"
  },
  "services.step03Desc": {
    en: "Complete secure payment via Pi Network", es: "Completa el pago seguro por Pi Network", fr: "Effectuez le paiement sécurisé via Pi Network", pt: "Complete o pagamento seguro pela Pi Network", de: "Sichere Zahlung über Pi Network abschließen",
    ar: "أكمل الدفع الآمن عبر Pi Network", zh: "通过Pi Network完成安全支付", hi: "Pi Network के माध्यम से सुरक्षित भुगतान करें", ja: "Pi Networkで安全に決済", ko: "Pi Network을 통해 안전하게 결제",
    sw: "Kamilisha malipo salama kupitia Pi Network", tr: "Pi Network üzerinden güvenli ödemeyi tamamlayın", ru: "Завершите безопасный платёж через Pi Network", id: "Selesaikan pembayaran aman melalui Pi Network", th: "ชำระเงินอย่างปลอดภัยผ่าน Pi Network",
    it: "Completa il pagamento sicuro via Pi Network", vi: "Hoàn tất thanh toán an toàn qua Pi Network", nl: "Voltooi veilige betaling via Pi Network", pl: "Zrealizuj bezpieczną płatność przez Pi Network", bn: "Pi Network এর মাধ্যমে নিরাপদ পেমেন্ট সম্পন্ন করুন", ms: "Lengkapkan pembayaran selamat melalui Pi Network", tl: "Kumpletuhin ang secure na bayad sa Pi Network", uk: "Завершіть безпечний платіж через Pi Network", el: "Ολοκληρώστε ασφαλή πληρωμή μέσω Pi Network", he: "השלם תשלום מאובטח דרך Pi Network", sv: "Slutför säker betalning via Pi Network", da: "Fuldfør sikker betaling via Pi Network", fi: "Suorita turvallinen maksu Pi Networkin kautta", no: "Fullfør sikker betaling via Pi Network", ro: "Finalizați plata sigură prin Pi Network", hu: "Biztonságos fizetés a Pi Networkön", cs: "Dokončete bezpečnou platbu přes Pi Network", am: "በPi Network በኩል ደህንነቱ የተጠበቀ ክፍያ ያጠናቅቁ", ha: "Kammala biyan kuɗi mai tsaro ta Pi Network", yo: "Parí ìsanwó àbò nípasẹ̀ Pi Network", zu: "Qedela inkokhelo ephephile nge-Pi Network"
  },
  "services.options": {
    en: "options", es: "opciones", fr: "options", pt: "opções", de: "Optionen",
    ar: "خيارات", zh: "选项", hi: "विकल्प", ja: "オプション", ko: "옵션",
    sw: "chaguzi", tr: "seçenek", ru: "опций", id: "opsi", th: "ตัวเลือก",
    it: "opzioni", vi: "tùy chọn", nl: "opties", pl: "opcje", bn: "বিকল্প", ms: "pilihan", tl: "mga pagpipilian", uk: "опцій", el: "επιλογές", he: "אפשרויות", sv: "alternativ", da: "muligheder", fi: "vaihtoehtoa", no: "alternativer", ro: "opțiuni", hu: "lehetőség", cs: "možností", am: "አማራጮች", ha: "zaɓuɓɓuka", yo: "àṣàyàn", zu: "izinketho"
  },
  "services.explore": {
    en: "Explore →", es: "Explorar →", fr: "Explorer →", pt: "Explorar →", de: "Entdecken →",
    ar: "استكشاف →", zh: "探索 →", hi: "खोजें →", ja: "探索 →", ko: "탐색 →",
    sw: "Gundua →", tr: "Keşfet →", ru: "Обзор →", id: "Jelajahi →", th: "สำรวจ →",
    it: "Esplora →", vi: "Khám phá →", nl: "Ontdek →", pl: "Przeglądaj →", bn: "অন্বেষণ →", ms: "Terokai →", tl: "Tuklasin →", uk: "Огляд →", el: "Εξερεύνηση →", he: "גלה →", sv: "Utforska →", da: "Udforsk →", fi: "Tutustu →", no: "Utforsk →", ro: "Explorează →", hu: "Böngészés →", cs: "Prozkoumat →", am: "ያስሱ →", ha: "Bincika →", yo: "Ṣàwárí →", zu: "Hlola →"
  },
  "services.totalServices": {
    en: "Total Services", es: "Total Servicios", fr: "Total Services", pt: "Total Serviços", de: "Dienste Gesamt",
    ar: "إجمالي الخدمات", zh: "总服务数", hi: "कुल सेवाएं", ja: "総サービス", ko: "전체 서비스",
    sw: "Jumla ya Huduma", tr: "Toplam Hizmetler", ru: "Всего Услуг", id: "Total Layanan", th: "บริการทั้งหมด",
    it: "Servizi Totali", vi: "Tổng Dịch vụ", nl: "Totaal Diensten", pl: "Łączne Usługi", bn: "মোট সেবা", ms: "Jumlah Perkhidmatan", tl: "Kabuuang Serbisyo", uk: "Всього Послуг", el: "Σύνολο Υπηρεσιών", he: "סך השירותים", sv: "Totala Tjänster", da: "Samlede Tjenester", fi: "Palvelut Yhteensä", no: "Totalt Tjenester", ro: "Total Servicii", hu: "Összes Szolgáltatás", cs: "Celkem Služeb", am: "ጠቅላላ አገልግሎቶች", ha: "Jimlar Ayyuka", yo: "Àpapọ̀ Iṣẹ́", zu: "Isamba Sezinsizakalo"
  },
  "services.hotelsListed": {
    en: "Hotels Listed", es: "Hoteles Listados", fr: "Hôtels Listés", pt: "Hotéis Listados", de: "Hotels Gelistet",
    ar: "الفنادق المدرجة", zh: "上架酒店", hi: "सूचीबद्ध होटल", ja: "掲載ホテル", ko: "등록 호텔",
    sw: "Hoteli Zilizoorodheshwa", tr: "Listelenen Oteller", ru: "Отелей", id: "Hotel Terdaftar", th: "โรงแรมที่ลงทะเบียน",
    it: "Hotel Elencati", vi: "Khách sạn", nl: "Hotels Vermeld", pl: "Hoteli na Liście", bn: "তালিকাভুক্ত হোটেল", ms: "Hotel Disenaraikan", tl: "Naka-list na Hotel", uk: "Готелів", el: "Ξενοδοχεία", he: "מלונות רשומים", sv: "Listade Hotell", da: "Oplistede Hoteller", fi: "Listatut Hotellit", no: "Listede Hoteller", ro: "Hoteluri Listate", hu: "Listázott Szállodák", cs: "Uvedené Hotely", am: "የተዘረዘሩ ሆቴሎች", ha: "Otal da aka Jera", yo: "Àwọn Hotẹẹli", zu: "Amahhotela Afakiwe"
  },
  "services.properties": {
    en: "Properties", es: "Propiedades", fr: "Propriétés", pt: "Propriedades", de: "Immobilien",
    ar: "عقارات", zh: "房产", hi: "संपत्तियां", ja: "物件", ko: "부동산",
    sw: "Mali", tr: "Mülkler", ru: "Объектов", id: "Properti", th: "อสังหาริมทรัพย์",
    it: "Proprietà", vi: "Bất động sản", nl: "Vastgoed", pl: "Nieruchomości", bn: "সম্পত্তি", ms: "Hartanah", tl: "Mga Ari-arian", uk: "Об'єкти", el: "Ακίνητα", he: "נכסים", sv: "Fastigheter", da: "Ejendomme", fi: "Kiinteistöt", no: "Eiendommer", ro: "Proprietăți", hu: "Ingatlanok", cs: "Nemovitosti", am: "ንብረቶች", ha: "Kadarori", yo: "Ohun-ìní", zu: "Izakhiwo"
  },
  "services.billProviders": {
    en: "Bill Providers", es: "Proveedores de Facturas", fr: "Fournisseurs de Factures", pt: "Provedores de Contas", de: "Rechnungsanbieter",
    ar: "مزودو الفواتير", zh: "账单供应商", hi: "बिल प्रदाता", ja: "請求書プロバイダー", ko: "청구서 제공자",
    sw: "Watoa Bili", tr: "Fatura Sağlayıcılar", ru: "Поставщиков", id: "Penyedia Tagihan", th: "ผู้ให้บริการบิล",
    it: "Fornitori Bollette", vi: "Nhà cung cấp", nl: "Rekening Aanbieders", pl: "Dostawcy Rachunków", bn: "বিল প্রদানকারী", ms: "Pembekal Bil", tl: "Tagapagbigay ng Bill", uk: "Постачальники", el: "Πάροχοι Λογαριασμών", he: "ספקי חשבונות", sv: "Räkningsleverantörer", da: "Regningsudbydere", fi: "Laskuttajat", no: "Regningsleverandører", ro: "Furnizori Facturi", hu: "Számla Szolgáltatók", cs: "Poskytovatelé Účtů", am: "የሂሳብ አቅራቢዎች", ha: "Masu Samar Kuɗi", yo: "Olùpèsè Ìdíyelé", zu: "Abahlinzeki Bama-akhawunti"
  },

  // ── Footer (shared with layout) ──
  "footer.services": {
    en: "Services", es: "Servicios", fr: "Services", pt: "Serviços", de: "Dienste",
    ar: "خدمات", zh: "服务", hi: "सेवाएं", ja: "サービス", ko: "서비스",
    sw: "Huduma", tr: "Hizmetler", ru: "Услуги", id: "Layanan", th: "บริการ",
    it: "Servizi", vi: "Dịch vụ", nl: "Diensten", pl: "Usługi", bn: "সেবা", ms: "Perkhidmatan", tl: "Serbisyo", uk: "Послуги", el: "Υπηρεσίες", he: "שירותים", sv: "Tjänster", da: "Tjenester", fi: "Palvelut", no: "Tjenester", ro: "Servicii", hu: "Szolgáltatások", cs: "Služby", am: "አገልግሎቶች", ha: "Ayyuka", yo: "Iṣẹ́", zu: "Izinsizakalo"
  },
  "footer.rentHotel": {
    en: "Rent Hotel", es: "Alquilar Hotel", fr: "Louer Hôtel", pt: "Alugar Hotel", de: "Hotel Mieten",
    ar: "حجز فندق", zh: "预订酒店", hi: "होटल किराये", ja: "ホテルを予約", ko: "호텔 예약",
    sw: "Kodi Hoteli", tr: "Otel Kirala", ru: "Снять Отель", id: "Sewa Hotel", th: "เช่าโรงแรม",
    it: "Affitta Hotel", vi: "Thuê Khách sạn", nl: "Hotel Huren", pl: "Wynajmij Hotel", bn: "হোটেল ভাড়া", ms: "Sewa Hotel", tl: "Upa ng Hotel", uk: "Орендувати Готель", el: "Ενοικίαση Ξενοδοχείου", he: "שכירת מלון", sv: "Hyr Hotell", da: "Lej Hotel", fi: "Vuokraa Hotelli", no: "Lei Hotell", ro: "Închiriază Hotel", hu: "Szálloda Bérlés", cs: "Pronájem Hotelu", am: "ሆቴል ይከራዩ", ha: "Yi hayar Otal", yo: "Ya Hotẹẹli", zu: "Qasha Ihhotela"
  },
  "footer.buyHome": {
    en: "Buy Home", es: "Comprar Casa", fr: "Acheter Maison", pt: "Comprar Casa", de: "Haus Kaufen",
    ar: "شراء منزل", zh: "购买房屋", hi: "घर खरीदें", ja: "家を購入", ko: "집 구매",
    sw: "Nunua Nyumba", tr: "Ev Satın Al", ru: "Купить Дом", id: "Beli Rumah", th: "ซื้อบ้าน",
    it: "Compra Casa", vi: "Mua Nhà", nl: "Huis Kopen", pl: "Kup Dom", bn: "বাড়ি কিনুন", ms: "Beli Rumah", tl: "Bumili ng Bahay", uk: "Купити Будинок", el: "Αγορά Σπιτιού", he: "קנה בית", sv: "Köp Bostad", da: "Køb Bolig", fi: "Osta Koti", no: "Kjøp Bolig", ro: "Cumpără Casă", hu: "Ház Vásárlás", cs: "Koupit Dům", am: "ቤት ይግዙ", ha: "Sayi Gida", yo: "Ra Ilé", zu: "Thenga Ikhaya"
  },
  "footer.payBills": {
    en: "Pay Bills", es: "Pagar Facturas", fr: "Payer Factures", pt: "Pagar Contas", de: "Rechnungen Bezahlen",
    ar: "دفع الفواتير", zh: "支付账单", hi: "बिल भुगतान", ja: "請求書を支払う", ko: "청구서 결제",
    sw: "Lipa Bili", tr: "Fatura Öde", ru: "Оплатить Счета", id: "Bayar Tagihan", th: "ชำระบิล",
    it: "Paga Bollette", vi: "Thanh toán Hóa đơn", nl: "Rekeningen Betalen", pl: "Zapłać Rachunki", bn: "বিল পরিশোধ", ms: "Bayar Bil", tl: "Magbayad ng Bills", uk: "Оплатити Рахунки", el: "Πληρωμή Λογαριασμών", he: "שלם חשבונות", sv: "Betala Räkningar", da: "Betal Regninger", fi: "Maksa Laskut", no: "Betal Regninger", ro: "Plătește Facturi", hu: "Számlák Fizetése", cs: "Zaplatit Účty", am: "ሂሳቦችን ይክፈሉ", ha: "Biya Kuɗi", yo: "San Ìdíyelé", zu: "Khokha Ama-akhawunti"
  },
  "footer.marketplace": {
    en: "Marketplace", es: "Mercado", fr: "Marché", pt: "Mercado", de: "Marktplatz",
    ar: "السوق", zh: "市场", hi: "बाज़ार", ja: "マーケット", ko: "마켓",
    sw: "Soko", tr: "Pazar", ru: "Маркетплейс", id: "Pasar", th: "ตลาด",
    it: "Mercato", vi: "Chợ", nl: "Marktplaats", pl: "Rynek", bn: "মার্কেটপ্লেস", ms: "Pasaran", tl: "Palengke", uk: "Маркетплейс", el: "Αγορά", he: "שוק", sv: "Marknadsplats", da: "Markedsplads", fi: "Markkinapaikka", no: "Markedsplass", ro: "Piață", hu: "Piactér", cs: "Tržiště", am: "ገበያ", ha: "Kasuwa", yo: "Ọjà", zu: "Imakethe"
  },
  "footer.home": {
    en: "Home", es: "Inicio", fr: "Accueil", pt: "Início", de: "Startseite",
    ar: "الرئيسية", zh: "首页", hi: "होम", ja: "ホーム", ko: "홈",
    sw: "Nyumbani", tr: "Ana Sayfa", ru: "Главная", id: "Beranda", th: "หน้าแรก",
    it: "Home", vi: "Trang chủ", nl: "Home", pl: "Strona główna", bn: "হোম", ms: "Laman Utama", tl: "Home", uk: "Головна", el: "Αρχική", he: "בית", sv: "Hem", da: "Hjem", fi: "Koti", no: "Hjem", ro: "Acasă", hu: "Kezdőlap", cs: "Domů", am: "መነሻ", ha: "Gida", yo: "Ilé", zu: "Ekhaya"
  },
  "footer.explore": {
    en: "Explore", es: "Explorar", fr: "Explorer", pt: "Explorar", de: "Entdecken",
    ar: "استكشاف", zh: "探索", hi: "खोजें", ja: "探索", ko: "탐색",
    sw: "Gundua", tr: "Keşfet", ru: "Обзор", id: "Jelajahi", th: "สำรวจ",
    it: "Esplora", vi: "Khám phá", nl: "Ontdek", pl: "Przeglądaj", bn: "অন্বেষণ", ms: "Terokai", tl: "Tuklasin", uk: "Огляд", el: "Εξερεύνηση", he: "גלה", sv: "Utforska", da: "Udforsk", fi: "Tutustu", no: "Utforsk", ro: "Explorează", hu: "Böngészés", cs: "Prozkoumat", am: "ያስሱ", ha: "Bincika", yo: "Ṣàwárí", zu: "Hlola"
  },
  "footer.sellProduct": {
    en: "Sell Product", es: "Vender Producto", fr: "Vendre Produit", pt: "Vender Produto", de: "Produkt Verkaufen",
    ar: "بيع منتج", zh: "出售产品", hi: "उत्पाद बेचें", ja: "商品を出品", ko: "상품 판매",
    sw: "Uza Bidhaa", tr: "Ürün Sat", ru: "Продать Товар", id: "Jual Produk", th: "ขายสินค้า",
    it: "Vendi Prodotto", vi: "Bán Sản phẩm", nl: "Verkoop Product", pl: "Sprzedaj Produkt", bn: "পণ্য বিক্রি", ms: "Jual Produk", tl: "Ibenta ang Produkto", uk: "Продати Товар", el: "Πώληση Προϊόντος", he: "מכור מוצר", sv: "Sälj Produkt", da: "Sælg Produkt", fi: "Myy Tuote", no: "Selg Produkt", ro: "Vinde Produs", hu: "Termék Eladás", cs: "Prodat Produkt", am: "ምርት ይሽጡ", ha: "Sayar Kaya", yo: "Ta Ọjà", zu: "Thengisa Umkhiqizo"
  },
  "footer.registerBusiness": {
    en: "Register Business", es: "Registrar Negocio", fr: "Inscrire Entreprise", pt: "Cadastrar Negócio", de: "Geschäft Registrieren",
    ar: "تسجيل عمل", zh: "注册企业", hi: "व्यवसाय पंजीकरण", ja: "ビジネス登録", ko: "비즈니스 등록",
    sw: "Sajili Biashara", tr: "İşletme Kaydet", ru: "Регистрация Бизнеса", id: "Daftar Bisnis", th: "ลงทะเบียนธุรกิจ",
    it: "Registra Attività", vi: "Đăng ký Kinh doanh", nl: "Bedrijf Registreren", pl: "Zarejestruj Firmę", bn: "ব্যবসা নিবন্ধন", ms: "Daftar Perniagaan", tl: "Irehistro ang Negosyo", uk: "Реєстрація Бізнесу", el: "Εγγραφή Επιχείρησης", he: "רשום עסק", sv: "Registrera Företag", da: "Registrer Virksomhed", fi: "Rekisteröi Yritys", no: "Registrer Bedrift", ro: "Înregistrare Afacere", hu: "Cég Regisztráció", cs: "Registrace Firmy", am: "ንግድ ይመዝገቡ", ha: "Yi Rajista Kasuwanci", yo: "Forúkọ Ìṣòwò", zu: "Bhalisa Ibhizinisi"
  },
  "footer.platform": {
    en: "Platform", es: "Plataforma", fr: "Plateforme", pt: "Plataforma", de: "Plattform",
    ar: "المنصة", zh: "平台", hi: "प्लेटफॉर्म", ja: "プラットフォーム", ko: "플랫폼",
    sw: "Jukwaa", tr: "Platform", ru: "Платформа", id: "Platform", th: "แพลตฟอร์ม",
    it: "Piattaforma", vi: "Nền tảng", nl: "Platform", pl: "Platforma", bn: "প্ল্যাটফর্ম", ms: "Platform", tl: "Platform", uk: "Платформа", el: "Πλατφόρμα", he: "פלטפורמה", sv: "Plattform", da: "Platform", fi: "Alusta", no: "Plattform", ro: "Platformă", hu: "Platform", cs: "Platforma", am: "መድረክ", ha: "Dandali", yo: "Pẹpẹ", zu: "Inkundla"
  },
  "footer.allServices": {
    en: "All Services", es: "Todos los Servicios", fr: "Tous les Services", pt: "Todos os Serviços", de: "Alle Dienste",
    ar: "جميع الخدمات", zh: "所有服务", hi: "सभी सेवाएं", ja: "全サービス", ko: "모든 서비스",
    sw: "Huduma Zote", tr: "Tüm Hizmetler", ru: "Все Услуги", id: "Semua Layanan", th: "บริการทั้งหมด",
    it: "Tutti i Servizi", vi: "Tất cả Dịch vụ", nl: "Alle Diensten", pl: "Wszystkie Usługi", bn: "সব সেবা", ms: "Semua Perkhidmatan", tl: "Lahat ng Serbisyo", uk: "Усі Послуги", el: "Όλες οι Υπηρεσίες", he: "כל השירותים", sv: "Alla Tjänster", da: "Alle Tjenester", fi: "Kaikki Palvelut", no: "Alle Tjenester", ro: "Toate Serviciile", hu: "Összes Szolgáltatás", cs: "Všechny Služby", am: "ሁሉም አገልግሎቶች", ha: "Duk Ayyuka", yo: "Gbogbo Iṣẹ́", zu: "Zonke Izinsizakalo"
  },
  "footer.piMarketplace": {
    en: "Pi Marketplace", es: "Mercado Pi", fr: "Marché Pi", pt: "Mercado Pi", de: "Pi-Marktplatz",
    ar: "سوق Pi", zh: "Pi市场", hi: "Pi बाज़ार", ja: "Piマーケット", ko: "Pi 마켓",
    sw: "Soko la Pi", tr: "Pi Pazarı", ru: "Pi Маркетплейс", id: "Pasar Pi", th: "ตลาด Pi",
    it: "Pi Mercato", vi: "Pi Chợ", nl: "Pi Marktplaats", pl: "Pi Rynek", bn: "Pi মার্কেটপ্লেস", ms: "Pi Pasaran", tl: "Pi Palengke", uk: "Pi Маркетплейс", el: "Pi Αγορά", he: "Pi שוק", sv: "Pi Marknadsplats", da: "Pi Markedsplads", fi: "Pi Markkinapaikka", no: "Pi Markedsplass", ro: "Pi Piață", hu: "Pi Piactér", cs: "Pi Tržiště", am: "Pi ገበያ", ha: "Pi Kasuwa", yo: "Pi Ọjà", zu: "Pi Imakethe"
  },
  "footer.quickRegister": {
    en: "Quick Register", es: "Registro Rápido", fr: "Inscription Rapide", pt: "Cadastro Rápido", de: "Schnell Registrieren",
    ar: "تسجيل سريع", zh: "快速注册", hi: "त्वरित पंजीकरण", ja: "クイック登録", ko: "빠른 등록",
    sw: "Usajili wa Haraka", tr: "Hızlı Kayıt", ru: "Быстрая Регистрация", id: "Daftar Cepat", th: "ลงทะเบียนด่วน",
    it: "Registrazione Rapida", vi: "Đăng ký Nhanh", nl: "Snel Registreren", pl: "Szybka Rejestracja", bn: "দ্রুত নিবন্ধন", ms: "Daftar Pantas", tl: "Mabilis na Rehistro", uk: "Швидка Реєстрація", el: "Γρήγορη Εγγραφή", he: "הרשמה מהירה", sv: "Snabb Registrering", da: "Hurtig Registrering", fi: "Pikarekisteröinti", no: "Rask Registrering", ro: "Înregistrare Rapidă", hu: "Gyors Regisztráció", cs: "Rychlá Registrace", am: "ፈጣን ምዝገባ", ha: "Rajista da Sauri", yo: "Ìforúkọsílẹ̀ Kíákíá", zu: "Ukubhalisa Okusheshayo"
  },
  "footer.legal": {
    en: "Legal", es: "Legal", fr: "Légal", pt: "Legal", de: "Rechtliches",
    ar: "قانوني", zh: "法律", hi: "कानूनी", ja: "法的事項", ko: "법적 사항",
    sw: "Kisheria", tr: "Yasal", ru: "Правовая Информация", id: "Hukum", th: "กฎหมาย",
    it: "Legale", vi: "Pháp lý", nl: "Juridisch", pl: "Prawne", bn: "আইনি", ms: "Undang-undang", tl: "Legal", uk: "Правова Інформація", el: "Νομικά", he: "משפטי", sv: "Juridiskt", da: "Juridisk", fi: "Oikeudellinen", no: "Juridisk", ro: "Legal", hu: "Jogi", cs: "Právní", am: "ሕጋዊ", ha: "Shari'a", yo: "Òfin", zu: "Ezomthetho"
  },
  "footer.privacyPolicy": {
    en: "Privacy Policy", es: "Política de Privacidad", fr: "Politique de Confidentialité", pt: "Política de Privacidade", de: "Datenschutzrichtlinie",
    ar: "سياسة الخصوصية", zh: "隐私政策", hi: "गोपनीयता नीति", ja: "プライバシーポリシー", ko: "개인정보 보호정책",
    sw: "Sera ya Faragha", tr: "Gizlilik Politikası", ru: "Политика Конфиденциальности", id: "Kebijakan Privasi", th: "นโยบายความเป็นส่วนตัว",
    it: "Informativa Privacy", vi: "Chính sách Bảo mật", nl: "Privacybeleid", pl: "Polityka Prywatności", bn: "গোপনীয়তা নীতি", ms: "Dasar Privasi", tl: "Patakaran sa Privacy", uk: "Політика Конфіденційності", el: "Πολιτική Απορρήτου", he: "מדיניות פרטיות", sv: "Integritetspolicy", da: "Privatlivspolitik", fi: "Tietosuojakäytäntö", no: "Personvernpolicy", ro: "Politica de Confidențialitate", hu: "Adatvédelmi Irányelvek", cs: "Zásady Ochrany Soukromí", am: "የግላዊነት ፖሊሲ", ha: "Manufar Sirri", yo: "Ìlànà Àṣírí", zu: "Inqubomgomo Yobumfihlo"
  },
  "footer.termsOfService": {
    en: "Terms of Service", es: "Términos de Servicio", fr: "Conditions d'Utilisation", pt: "Termos de Serviço", de: "Nutzungsbedingungen",
    ar: "شروط الخدمة", zh: "服务条款", hi: "सेवा की शर्तें", ja: "利用規約", ko: "서비스 약관",
    sw: "Masharti ya Huduma", tr: "Hizmet Şartları", ru: "Условия Использования", id: "Ketentuan Layanan", th: "ข้อกำหนดการให้บริการ",
    it: "Termini di Servizio", vi: "Điều khoản Dịch vụ", nl: "Servicevoorwaarden", pl: "Warunki Usługi", bn: "সেবার শর্তাবলী", ms: "Terma Perkhidmatan", tl: "Mga Tuntunin ng Serbisyo", uk: "Умови Використання", el: "Όροι Χρήσης", he: "תנאי שירות", sv: "Användarvillkor", da: "Servicevilkår", fi: "Käyttöehdot", no: "Tjenestevilkår", ro: "Termeni și Condiții", hu: "Szolgáltatási Feltételek", cs: "Podmínky Služby", am: "የአገልግሎት ውል", ha: "Sharuddan Aiki", yo: "Àwọn Ìlànà Iṣẹ́", zu: "Imigomo Yezinsizakalo"
  },
  "footer.kycPolicy": {
    en: "KYC Policy", es: "Política KYC", fr: "Politique KYC", pt: "Política KYC", de: "KYC-Richtlinie",
    ar: "سياسة KYC", zh: "KYC政策", hi: "KYC नीति", ja: "KYCポリシー", ko: "KYC 정책",
    sw: "Sera ya KYC", tr: "KYC Politikası", ru: "Политика KYC", id: "Kebijakan KYC", th: "นโยบาย KYC",
    it: "Politica KYC", vi: "Chính sách KYC", nl: "KYC-beleid", pl: "Polityka KYC", bn: "KYC নীতি", ms: "Dasar KYC", tl: "Patakaran ng KYC", uk: "Політика KYC", el: "Πολιτική KYC", he: "מדיניות KYC", sv: "KYC-policy", da: "KYC-politik", fi: "KYC-käytäntö", no: "KYC-policy", ro: "Politica KYC", hu: "KYC Irányelvek", cs: "Zásady KYC", am: "KYC ፖሊሲ", ha: "Manufar KYC", yo: "Ìlànà KYC", zu: "Inqubomgomo ye-KYC"
  },
  "footer.copyright": {
    en: "Built for Pioneers. Powered by Pi Network.",
    es: "Hecho para Pioneros. Impulsado por Pi Network.",
    fr: "Conçu pour les Pionniers. Propulsé par Pi Network.",
    pt: "Feito para Pioneiros. Alimentado por Pi Network.",
    de: "Für Pioniere gebaut. Angetrieben von Pi Network.",
    ar: "صُنع للرواد. مدعوم من Pi Network.",
    zh: "为先驱者打造。由Pi Network驱动。",
    hi: "पायनियर्स के लिए बनाया गया। Pi Network द्वारा संचालित।",
    ja: "パイオニアのために構築。Pi Networkで駆動。",
    ko: "파이오니어를 위해 구축. Pi Network으로 구동.",
    sw: "Imejengwa kwa Waanzilishi. Inaendeshwa na Pi Network.",
    tr: "Öncüler için Tasarlandı. Pi Network ile Çalışır.",
    ru: "Создано для Пионеров. Работает на Pi Network.",
    id: "Dibuat untuk Perintis. Didukung oleh Pi Network.",
    th: "สร้างสำหรับผู้บุกเบิก ขับเคลื่อนโดย Pi Network",
    it: "Costruito per i Pionieri. Alimentato da Pi Network.", vi: "Xây dựng cho Người tiên phong. Vận hành bởi Pi Network.", nl: "Gebouwd voor Pioniers. Aangedreven door Pi Network.", pl: "Zbudowane dla Pionierów. Napędzane przez Pi Network.", bn: "পাইওনিয়ারদের জন্য নির্মিত। Pi Network দ্বারা চালিত।", ms: "Dibina untuk Perintis. Dikuasakan oleh Pi Network.", tl: "Ginawa para sa mga Pioneer. Pinapagana ng Pi Network.", uk: "Створено для Піонерів. Працює на Pi Network.", el: "Χτισμένο για Πρωτοπόρους. Με τη δύναμη του Pi Network.", he: "נבנה עבור חלוצים. מופעל על ידי Pi Network.", sv: "Byggt för Pionjärer. Drivs av Pi Network.", da: "Bygget til Pionerer. Drevet af Pi Network.", fi: "Rakennettu Pioneereille. Käyttövoimana Pi Network.", no: "Bygget for Pionerer. Drevet av Pi Network.", ro: "Construit pentru Pionieri. Alimentat de Pi Network.", hu: "Úttörőknek építve. A Pi Network erejével.", cs: "Vytvořeno pro Průkopníky. Poháněno Pi Network.", am: "ለአቅኚዎች ተገንብቷል። በPi Network ይሠራል።", ha: "An gina wa Masu Farawa. Ana sarrafa shi ta Pi Network.", yo: "A kọ́ fún Àwọn Aṣáájú. Pẹ̀lú agbára Pi Network.", zu: "Kwakhelwe Abaholi. Kuphethwe yi-Pi Network."
  },

  // ── Hotels page ──
  "hotels.backToServices": {
    en: "← Services", es: "← Servicios", fr: "← Services", pt: "← Serviços", de: "← Dienste",
    ar: "← خدمات", zh: "← 服务", hi: "← सेवाएं", ja: "← サービス", ko: "← 서비스",
    sw: "← Huduma", tr: "← Hizmetler", ru: "← Услуги", id: "← Layanan", th: "← บริการ",
    it: "← Servizi", vi: "← Dịch vụ", nl: "← Diensten", pl: "← Usługi", bn: "← সেবা", ms: "← Perkhidmatan", tl: "← Serbisyo", uk: "← Послуги", el: "← Υπηρεσίες", he: "← שירותים", sv: "← Tjänster", da: "← Tjenester", fi: "← Palvelut", no: "← Tjenester", ro: "← Servicii", hu: "← Szolgáltatások", cs: "← Služby", am: "← አገልግሎቶች", ha: "← Ayyuka", yo: "← Iṣẹ́", zu: "← Izinsizakalo"
  },
  "hotels.title": {
    en: "Hotels", es: "Hoteles", fr: "Hôtels", pt: "Hotéis", de: "Hotels",
    ar: "فنادق", zh: "酒店", hi: "होटल", ja: "ホテル", ko: "호텔",
    sw: "Hoteli", tr: "Oteller", ru: "Отели", id: "Hotel", th: "โรงแรม",
    it: "Hotel", vi: "Khách sạn", nl: "Hotels", pl: "Hotele", bn: "হোটেল", ms: "Hotel", tl: "Hotel", uk: "Готелі", el: "Ξενοδοχεία", he: "מלונות", sv: "Hotell", da: "Hoteller", fi: "Hotellit", no: "Hoteller", ro: "Hoteluri", hu: "Szállodák", cs: "Hotely", am: "ሆቴሎች", ha: "Otal", yo: "Hotẹẹli", zu: "Amahhotela"
  },

  // ── Bills page ──
  "bills.all": {
    en: "All", es: "Todos", fr: "Tous", pt: "Todos", de: "Alle",
    ar: "الكل", zh: "全部", hi: "सभी", ja: "すべて", ko: "전체",
    sw: "Yote", tr: "Tümü", ru: "Все", id: "Semua", th: "ทั้งหมด",
    it: "Tutti", vi: "Tất cả", nl: "Alles", pl: "Wszystkie", bn: "সব", ms: "Semua", tl: "Lahat", uk: "Усі", el: "Όλα", he: "הכל", sv: "Alla", da: "Alle", fi: "Kaikki", no: "Alle", ro: "Toate", hu: "Összes", cs: "Vše", am: "ሁሉም", ha: "Duka", yo: "Gbogbo", zu: "Konke"
  },
  "bills.electricity": {
    en: "Electricity", es: "Electricidad", fr: "Électricité", pt: "Eletricidade", de: "Strom",
    ar: "كهرباء", zh: "电费", hi: "बिजली", ja: "電気", ko: "전기",
    sw: "Stima", tr: "Elektrik", ru: "Электричество", id: "Listrik", th: "ค่าไฟ",
    it: "Elettricità", vi: "Điện", nl: "Elektriciteit", pl: "Prąd", bn: "বিদ্যুৎ", ms: "Elektrik", tl: "Kuryente", uk: "Електрика", el: "Ηλεκτρισμός", he: "חשמל", sv: "El", da: "El", fi: "Sähkö", no: "Strøm", ro: "Electricitate", hu: "Villany", cs: "Elektřina", am: "ኤሌክትሪክ", ha: "Wutar lantarki", yo: "Iná mọ́nà", zu: "Ugesi"
  },
  "bills.water": {
    en: "Water", es: "Agua", fr: "Eau", pt: "Água", de: "Wasser",
    ar: "ماء", zh: "水费", hi: "पानी", ja: "水道", ko: "수도",
    sw: "Maji", tr: "Su", ru: "Вода", id: "Air", th: "ค่าน้ำ",
    it: "Acqua", vi: "Nước", nl: "Water", pl: "Woda", bn: "পানি", ms: "Air", tl: "Tubig", uk: "Вода", el: "Νερό", he: "מים", sv: "Vatten", da: "Vand", fi: "Vesi", no: "Vann", ro: "Apă", hu: "Víz", cs: "Voda", am: "ውሃ", ha: "Ruwa", yo: "Omi", zu: "Amanzi"
  },
  "bills.internet": {
    en: "Internet", es: "Internet", fr: "Internet", pt: "Internet", de: "Internet",
    ar: "إنترنت", zh: "网费", hi: "इंटरनेट", ja: "インターネット", ko: "인터넷",
    sw: "Intaneti", tr: "İnternet", ru: "Интернет", id: "Internet", th: "อินเทอร์เน็ต",
    it: "Internet", vi: "Internet", nl: "Internet", pl: "Internet", bn: "ইন্টারনেট", ms: "Internet", tl: "Internet", uk: "Інтернет", el: "Internet", he: "אינטרנט", sv: "Internet", da: "Internet", fi: "Internet", no: "Internett", ro: "Internet", hu: "Internet", cs: "Internet", am: "ኢንተርኔት", ha: "Intanet", yo: "Ìntánẹ́ẹ́tì", zu: "I-inthanethi"
  },
  "bills.tv": {
    en: "TV", es: "TV", fr: "TV", pt: "TV", de: "TV",
    ar: "تلفزيون", zh: "电视费", hi: "टीवी", ja: "TV", ko: "TV",
    sw: "TV", tr: "TV", ru: "ТВ", id: "TV", th: "ทีวี",
    it: "TV", vi: "TV", nl: "TV", pl: "TV", bn: "টিভি", ms: "TV", tl: "TV", uk: "ТВ", el: "TV", he: "טלוויזיה", sv: "TV", da: "TV", fi: "TV", no: "TV", ro: "TV", hu: "TV", cs: "TV", am: "ቲቪ", ha: "TV", yo: "TV", zu: "I-TV"
  },
  "bills.phone": {
    en: "Phone", es: "Teléfono", fr: "Téléphone", pt: "Telefone", de: "Telefon",
    ar: "هاتف", zh: "电话费", hi: "फोन", ja: "電話", ko: "전화",
    sw: "Simu", tr: "Telefon", ru: "Телефон", id: "Telepon", th: "โทรศัพท์",
    it: "Telefono", vi: "Điện thoại", nl: "Telefoon", pl: "Telefon", bn: "ফোন", ms: "Telefon", tl: "Telepono", uk: "Телефон", el: "Τηλέφωνο", he: "טלפון", sv: "Telefon", da: "Telefon", fi: "Puhelin", no: "Telefon", ro: "Telefon", hu: "Telefon", cs: "Telefon", am: "ስልክ", ha: "Waya", yo: "Fóònù", zu: "Ifoni"
  },
  "bills.insurance": {
    en: "Insurance", es: "Seguro", fr: "Assurance", pt: "Seguro", de: "Versicherung",
    ar: "تأمين", zh: "保险", hi: "बीमा", ja: "保険", ko: "보험",
    sw: "Bima", tr: "Sigorta", ru: "Страхование", id: "Asuransi", th: "ประกันภัย",
    it: "Assicurazione", vi: "Bảo hiểm", nl: "Verzekering", pl: "Ubezpieczenie", bn: "বীমা", ms: "Insurans", tl: "Insurance", uk: "Страхування", el: "Ασφάλεια", he: "ביטוח", sv: "Försäkring", da: "Forsikring", fi: "Vakuutus", no: "Forsikring", ro: "Asigurare", hu: "Biztosítás", cs: "Pojištění", am: "ኢንሹራንስ", ha: "Inshora", yo: "Ìṣédúró", zu: "Umshwalense"
  },
  // ── Social Feed ──
  "social.title": {
    en: "Business", es: "Negocios", fr: "Affaires", pt: "Negócios", de: "Geschäfts",
    ar: "أعمال", zh: "商业", hi: "व्यापार", ja: "ビジネス", ko: "비즈니스",
    sw: "Biashara", tr: "İş", ru: "Бизнес", id: "Bisnis", th: "ธุรกิจ",
    it: "Affari", vi: "Kinh doanh", nl: "Zakelijk", pl: "Biznes", bn: "ব্যবসা", ms: "Perniagaan", tl: "Negosyo", uk: "Бізнес", el: "Επιχειρήσεις", he: "עסקים", sv: "Affärer", da: "Forretning", fi: "Liiketoiminta", no: "Forretning", ro: "Afaceri", hu: "Üzlet", cs: "Podnikání", am: "ንግድ", ha: "Kasuwanci", yo: "Ìṣòwò", zu: "Ibhizinisi"
  },
  "social.titleHighlight": {
    en: "Broadcast", es: "Transmisión", fr: "Diffusion", pt: "Transmissão", de: "Übertragung",
    ar: "بث", zh: "广播", hi: "प्रसारण", ja: "ブロードキャスト", ko: "방송",
    sw: "Tangazo", tr: "Yayın", ru: "Трансляция", id: "Siaran", th: "ออกอากาศ",
    it: "Trasmissione", vi: "Phát sóng", nl: "Uitzending", pl: "Transmisja", bn: "সম্প্রচার", ms: "Siaran", tl: "Broadcast", uk: "Трансляція", el: "Μετάδοση", he: "שידור", sv: "Sändning", da: "Udsendelse", fi: "Lähetys", no: "Kringkasting", ro: "Difuzare", hu: "Közvetítés", cs: "Vysílání", am: "ስርጭት", ha: "Watsa", yo: "Ìgbóhùnsáfẹ́fẹ́", zu: "Ukusakaza"
  },
  "social.subtitle": {
    en: "Share updates, promote products & connect with pioneers worldwide", es: "Comparta actualizaciones y conecte con pioneros", fr: "Partagez des mises à jour et connectez-vous avec des pionniers", pt: "Compartilhe atualizações e conecte-se com pioneiros", de: "Teilen Sie Updates und verbinden Sie sich mit Pionieren",
    ar: "شارك التحديثات وتواصل مع الرواد", zh: "分享更新并与先驱者联系", hi: "अपडेट साझा करें और पायनियर्स से जुड़ें", ja: "アップデートを共有しパイオニアとつながる", ko: "업데이트를 공유하고 파이오니어와 연결하세요",
    sw: "Shiriki masasisho na uunganike na waanzilishi", tr: "Güncellemeleri paylaşın ve öncülerle bağlantı kurun", ru: "Делитесь обновлениями и общайтесь с пионерами", id: "Bagikan pembaruan & terhubung dengan pionir", th: "แบ่งปันอัปเดตและเชื่อมต่อกับผู้บุกเบิก",
    it: "Condividi aggiornamenti, promuovi prodotti e connettiti con i pionieri", vi: "Chia sẻ cập nhật, quảng bá sản phẩm và kết nối với người tiên phong", nl: "Deel updates, promoot producten en verbind met pioniers", pl: "Udostępniaj aktualizacje, promuj produkty i łącz się z pionierami", bn: "আপডেট শেয়ার করুন, পণ্য প্রচার করুন এবং পাইওনিয়ারদের সাথে সংযোগ করুন", ms: "Kongsi kemas kini, promosikan produk dan berhubung dengan perintis", tl: "Magbahagi ng update, i-promote ang produkto at kumonekta sa mga pioneer", uk: "Діліться оновленнями, просувайте продукти та зв'язуйтесь з піонерами", el: "Μοιραστείτε ενημερώσεις, προωθήστε προϊόντα και συνδεθείτε με πρωτοπόρους", he: "שתפו עדכונים, קדמו מוצרים והתחברו עם חלוצים", sv: "Dela uppdateringar, marknadsför produkter och anslut med pionjärer", da: "Del opdateringer, promover produkter og forbind med pionerer", fi: "Jaa päivityksiä, mainosta tuotteita ja yhdisty pioneereihin", no: "Del oppdateringer, promoter produkter og koble til med pionerer", ro: "Partajați actualizări, promovați produse și conectați-vă cu pionierii", hu: "Osszon meg frissítéseket, népszerűsítsen termékeket és kapcsolódjon úttörőkhöz", cs: "Sdílejte aktualizace, propagujte produkty a spojte se s průkopníky", am: "ዝመናዎችን ያጋሩ ፣ ምርቶችን ያስተዋውቁ እና ከአቅኚዎች ጋር ይገናኙ", ha: "Raba sabuntawa, tallata kayayyaki kuma haɗu da masu farawa", yo: "Pín àwọn ìmúdájú, ṣe ìpolówó àwọn ọjà kí o sì darapọ̀ mọ́ àwọn aṣáájú", zu: "Yabelana ngezibuyekezo, khuthaza imikhiqizo uxhumane nabaholi"
  },
  "social.broadcast": {
    en: "Broadcast", es: "Publicar", fr: "Diffuser", pt: "Transmitir", de: "Senden",
    ar: "نشر", zh: "发布", hi: "प्रसारित करें", ja: "配信", ko: "방송",
    sw: "Tangaza", tr: "Yayınla", ru: "Опубликовать", id: "Siarkan", th: "เผยแพร่",
    it: "Pubblica", vi: "Phát sóng", nl: "Uitzenden", pl: "Opublikuj", bn: "সম্প্রচার", ms: "Siarkan", tl: "I-broadcast", uk: "Опублікувати", el: "Μετάδοση", he: "שדר", sv: "Sänd", da: "Udsend", fi: "Lähetä", no: "Kringkast", ro: "Difuzează", hu: "Közvetítés", cs: "Vysílat", am: "ያሰራጩ", ha: "Watsa", yo: "Gbóhùnsáfẹ́fẹ́", zu: "Sakaza"
  },
  "social.trending": {
    en: "Trending Topics", es: "Tendencias", fr: "Tendances", pt: "Tendências", de: "Trends",
    ar: "المواضيع الرائجة", zh: "热门话题", hi: "ट्रेंडिंग", ja: "トレンド", ko: "트렌딩",
    sw: "Mwenendo", tr: "Trendler", ru: "Тренды", id: "Trending", th: "กำลังเป็นที่นิยม",
    it: "Argomenti di Tendenza", vi: "Xu hướng", nl: "Trending", pl: "Na Topie", bn: "ট্রেন্ডিং", ms: "Trending", tl: "Trending", uk: "Тренди", el: "Τάσεις", he: "מגמות", sv: "Trender", da: "Trending", fi: "Trendit", no: "Trender", ro: "Trending", hu: "Trendek", cs: "Trendy", am: "አዝማሚያዎች", ha: "Abin da ake", yo: "Ohun Tó Ń Tàn", zu: "Okuthrendayo"
  },
  "social.topPioneers": {
    en: "Top Pioneers", es: "Mejores Pioneros", fr: "Meilleurs Pionniers", pt: "Melhores Pioneiros", de: "Top-Pioniere",
    ar: "أفضل الرواد", zh: "顶尖先驱者", hi: "शीर्ष पायनियर्स", ja: "トップパイオニア", ko: "탑 파이오니어",
    sw: "Waanzilishi Bora", tr: "En İyi Öncüler", ru: "Топ пионеры", id: "Pionir Teratas", th: "ผู้บุกเบิกอันดับต้น",
    it: "Top Pionieri", vi: "Người tiên phong hàng đầu", nl: "Top Pioniers", pl: "Top Pionierzy", bn: "শীর্ষ পাইওনিয়ার", ms: "Perintis Teratas", tl: "Nangunguna na Pioneer", uk: "Топ Піонери", el: "Κορυφαίοι Πρωτοπόροι", he: "חלוצים מובילים", sv: "Topp Pionjärer", da: "Top Pionerer", fi: "Huippupioneerit", no: "Topp Pionerer", ro: "Pionieri de Top", hu: "Top Úttörők", cs: "Top Průkopníci", am: "ከፍተኛ አቅኚዎች", ha: "Manyan Masu Farawa", yo: "Àwọn Aṣáájú Olókìkí", zu: "Abaholi Abaphezulu"
  },
  "social.communityStats": {
    en: "Community Stats", es: "Estadísticas", fr: "Statistiques", pt: "Estatísticas", de: "Statistiken",
    ar: "إحصائيات المجتمع", zh: "社区统计", hi: "समुदाय आँकड़े", ja: "コミュニティ統計", ko: "커뮤니티 통계",
    sw: "Takwimu za Jamii", tr: "Topluluk İstatistikleri", ru: "Статистика сообщества", id: "Statistik Komunitas", th: "สถิติชุมชน",
    it: "Statistiche Comunità", vi: "Thống kê Cộng đồng", nl: "Gemeenschapsstatistieken", pl: "Statystyki Społeczności", bn: "সম্প্রদায় পরিসংখ্যান", ms: "Statistik Komuniti", tl: "Stats ng Komunidad", uk: "Статистика Спільноти", el: "Στατιστικά Κοινότητας", he: "סטטיסטיקות קהילה", sv: "Gemenskapsstatistik", da: "Fællesskabsstatistik", fi: "Yhteisötilastot", no: "Fellesskapsstatistikk", ro: "Statistici Comunitate", hu: "Közösségi Mutatók", cs: "Statistiky Komunity", am: "የማህበረሰብ ስታትስቲክስ", ha: "Ƙididdigan Al'umma", yo: "Ìṣirò Àwùjọ", zu: "Izibalo Zomphakathi"
  },

  // ── Transport / Ride-Hailing ──
  "nav.transport": {
    en: "Transport", es: "Transporte", fr: "Transport", pt: "Transporte", de: "Transport",
    ar: "النقل", zh: "交通", hi: "परिवहन", ja: "交通", ko: "교통",
    sw: "Usafiri", tr: "Ulaşım", ru: "Транспорт", id: "Transportasi", th: "ขนส่ง",
    it: "Trasporti", vi: "Vận chuyển", nl: "Vervoer", pl: "Transport", bn: "পরিবহন", ms: "Pengangkutan", tl: "Transportasyon", uk: "Транспорт", el: "Μεταφορές", he: "תחבורה", sv: "Transport", da: "Transport", fi: "Liikenne", no: "Transport", ro: "Transport", hu: "Közlekedés", cs: "Doprava", am: "መጓጓዣ", ha: "Sufuri", yo: "Ìrìnnà", zu: "Ezokuthutha"
  },
  "services.transport": {
    en: "Transport & Rides", es: "Transporte y Viajes", fr: "Transport & Trajets", pt: "Transporte & Viagens", de: "Transport & Fahrten",
    ar: "النقل والرحلات", zh: "交通与出行", hi: "परिवहन और सवारी", ja: "交通と乗車", ko: "교통 및 탑승",
    sw: "Usafiri & Safari", tr: "Ulaşım & Yolculuklar", ru: "Транспорт и Поездки", id: "Transportasi & Perjalanan", th: "ขนส่งและการเดินทาง",
    it: "Trasporti e Corse", vi: "Vận chuyển và Di chuyển", nl: "Vervoer en Ritten", pl: "Transport i Przejazdy", bn: "পরিবহন ও রাইড", ms: "Pengangkutan dan Perjalanan", tl: "Transportasyon at Sakay", uk: "Транспорт і Поїздки", el: "Μεταφορές και Βόλτες", he: "תחבורה ונסיעות", sv: "Transport och Resor", da: "Transport og Ture", fi: "Liikenne ja Kyydit", no: "Transport og Turer", ro: "Transport și Curse", hu: "Közlekedés és Fuvarok", cs: "Doprava a Jízdy", am: "መጓጓዣ እና ግልቢያ", ha: "Sufuri da Tafiye", yo: "Ìrìnnà àti Rírìn", zu: "Ukuthutha Nezithuthi"
  },
  "services.transportDesc": {
    en: "Book city rides, taxis, hire drivers, schedule deliveries, or fly anywhere — all powered by Pi.",
    es: "Reserve viajes urbanos, taxis, contrate conductores, programe entregas o vuele — todo con Pi.",
    fr: "Réservez trajets, taxis, chauffeurs, livraisons ou vols — tout en Pi.",
    pt: "Reserve viagens, táxis, motoristas, entregas ou voos — tudo com Pi.",
    de: "Buchen Sie Fahrten, Taxis, Fahrer, Lieferungen oder Flüge — alles mit Pi.",
    ar: "احجز رحلات أو سيارات أجرة أو سائقين أو توصيل أو طيران — بعملة Pi.",
    zh: "预订出行、出租车、司机、配送或航班——全部使用Pi支付。",
    hi: "सवारी, टैक्सी, ड्राइवर, डिलीवरी या उड़ानें बुक करें — सब Pi से।",
    ja: "乗車、タクシー、運転手、配達、フライトを予約 — Piで。",
    ko: "탑승, 택시, 드라이버, 배달, 항공편 예약 — Pi로.",
    sw: "Weka nafasi za safari, teksi, madereva, usafirishaji au ndege — kwa Pi.",
    tr: "Yolculuklar, taksiler, şoförler, teslimatlar veya uçuşlar — Pi ile.",
    ru: "Поездки, такси, водители, доставка или авиарейсы — всё за Pi.",
    id: "Pesan perjalanan, taksi, sopir, pengiriman atau penerbangan — dengan Pi.",
    th: "จองการเดินทาง แท็กซี่ คนขับ จัดส่ง หรือบิน — ด้วย Pi",
    it: "Prenota corse, taxi, autisti, consegne o voli — tutto con Pi.", vi: "Đặt xe, taxi, tài xế, giao hàng hoặc bay — tất cả bằng Pi.", nl: "Boek ritten, taxi's, chauffeurs, bezorgingen of vluchten — alles met Pi.", pl: "Rezerwuj przejazdy, taksówki, kierowców, dostawy lub loty — za Pi.", bn: "রাইড, ট্যাক্সি, ড্রাইভার, ডেলিভারি বা ফ্লাইট বুক করুন — Pi দিয়ে।", ms: "Tempah perjalanan, teksi, pemandu, penghantaran atau penerbangan — dengan Pi.", tl: "Mag-book ng sakay, taxi, driver, delivery o flight — gamit ang Pi.", uk: "Бронюйте поїздки, таксі, водіїв, доставку або авіарейси — за Pi.", el: "Κρατήστε διαδρομές, ταξί, οδηγούς, παραδόσεις ή πτήσεις — με Pi.", he: "הזמינו נסיעות, מוניות, נהגים, משלוחים או טיסות — עם Pi.", sv: "Boka resor, taxi, chaufförer, leveranser eller flyg — med Pi.", da: "Book ture, taxier, chauffører, leveringer eller flyrejser — med Pi.", fi: "Varaa kyytejä, takseja, kuljettajia, toimituksia tai lentoja — Pi:llä.", no: "Bestill turer, drosjer, sjåfører, leveranser eller fly — med Pi.", ro: "Rezervați curse, taxiuri, șoferi, livrări sau zboruri — cu Pi.", hu: "Foglaljon fuvarokat, taxikat, sofőröket, szállításokat vagy repjegyeket — Pi-vel.", cs: "Rezervujte jízdy, taxi, řidiče, doručení nebo lety — za Pi.", am: "ግልቢያ ፣ ታክሲ ፣ ሹፌር ፣ ማድረስ ወይም በረራ ያስያዙ — በPi።", ha: "Yi ajiya hanya, taksi, direba, isar kaya ko jirgin sama — ta Pi.", yo: "Ṣe ìfipamọ́ ìrìnnà, tàkísì, awakọ̀, ìfigba tàbí ìgbòkègbodò — pẹ̀lú Pi.", zu: "Bhukha izithuthi, amathekisi, abashayeli, ukulethwa noma izindiza — nge-Pi."
  },
  "transport.title": {
    en: "Transport & Rides", es: "Transporte y Viajes", fr: "Transport & Trajets", pt: "Transporte & Viagens", de: "Transport & Fahrten",
    ar: "النقل والرحلات", zh: "交通与出行", hi: "परिवहन और सवारी", ja: "交通と乗車", ko: "교통 및 탑승",
    sw: "Usafiri & Safari", tr: "Ulaşım & Yolculuklar", ru: "Транспорт и Поездки", id: "Transportasi & Perjalanan", th: "ขนส่งและการเดินทาง",
    it: "Trasporti e Corse", vi: "Vận chuyển và Di chuyển", nl: "Vervoer en Ritten", pl: "Transport i Przejazdy", bn: "পরিবহন ও রাইড", ms: "Pengangkutan dan Perjalanan", tl: "Transportasyon at Sakay", uk: "Транспорт і Поїздки", el: "Μεταφορές και Βόλτες", he: "תחבורה ונסיעות", sv: "Transport och Resor", da: "Transport og Ture", fi: "Liikenne ja Kyydit", no: "Transport og Turer", ro: "Transport și Curse", hu: "Közlekedés és Fuvarok", cs: "Doprava a Jízdy", am: "መጓጓዣ እና ግልቢያ", ha: "Sufuri da Tafiye", yo: "Ìrìnnà àti Rírìn", zu: "Ukuthutha Nezithuthi"
  },
  "transport.badge": {
    en: "Pay with Pi", es: "Paga con Pi", fr: "Payez avec Pi", pt: "Pague com Pi", de: "Mit Pi bezahlen",
    ar: "ادفع بـ Pi", zh: "用Pi支付", hi: "Pi से भुगतान करें", ja: "Piで支払い", ko: "Pi로 결제",
    sw: "Lipa na Pi", tr: "Pi ile Öde", ru: "Оплата Pi", id: "Bayar dengan Pi", th: "จ่ายด้วย Pi",
    it: "Paga con Pi", vi: "Thanh toán bằng Pi", nl: "Betaal met Pi", pl: "Zapłać Pi", bn: "Pi দিয়ে পরিশোধ", ms: "Bayar dengan Pi", tl: "Bayad sa Pi", uk: "Оплата Pi", el: "Πληρωμή με Pi", he: "שלם עם Pi", sv: "Betala med Pi", da: "Betal med Pi", fi: "Maksa Pi:llä", no: "Betal med Pi", ro: "Plătește cu Pi", hu: "Fizess Pi-vel", cs: "Zaplaťte Pi", am: "በPi ይክፈሉ", ha: "Biya da Pi", yo: "San pẹ̀lú Pi", zu: "Khokha nge-Pi"
  },
  "transport.heroTitle": {
    en: "Your Ride,", es: "Tu Viaje,", fr: "Votre Trajet,", pt: "Sua Viagem,", de: "Ihre Fahrt,",
    ar: "رحلتك،", zh: "您的行程，", hi: "आपकी सवारी,", ja: "あなたの乗車、", ko: "당신의 탑승,",
    sw: "Safari Yako,", tr: "Yolculuğunuz,", ru: "Ваша Поездка,", id: "Perjalanan Anda,", th: "การเดินทางของคุณ,",
    it: "La Tua Corsa,", vi: "Chuyến Đi Của Bạn,", nl: "Uw Rit,", pl: "Twoja Podróż,", bn: "আপনার রাইড,", ms: "Perjalanan Anda,", tl: "Ang Sakay Mo,", uk: "Ваша Поїздка,", el: "Η Διαδρομή Σας,", he: "הנסיעה שלך,", sv: "Din Resa,", da: "Din Tur,", fi: "Sinun Kyytisi,", no: "Din Reise,", ro: "Cursa Ta,", hu: "Az Utazásod,", cs: "Vaše Cesta,", am: "ጉዞዎ፣", ha: "Tafiyar Ka,", yo: "Ìrìn Rẹ,", zu: "Uhambo Lwakho,"
  },
  "transport.heroHighlight": {
    en: "Your Way", es: "Tu Camino", fr: "Votre Chemin", pt: "Seu Caminho", de: "Ihr Weg",
    ar: "طريقك", zh: "由你决定", hi: "आपका रास्ता", ja: "あなたのスタイル", ko: "당신의 방식",
    sw: "Njia Yako", tr: "Sizin Yolunuz", ru: "Ваш Путь", id: "Cara Anda", th: "ตามแบบของคุณ",
    it: "A Modo Tuo", vi: "Theo Cách Của Bạn", nl: "Op Uw Manier", pl: "Na Twój Sposób", bn: "আপনার মতো", ms: "Cara Anda", tl: "Sa Paraan Mo", uk: "Ваш Шлях", el: "Με τον Τρόπο Σας", he: "בדרך שלך", sv: "På Ditt Sätt", da: "På Din Måde", fi: "Sinun Tapasi", no: "Din Vei", ro: "În Felul Tău", hu: "A Te Utad", cs: "Vaše Cesta", am: "በመንገድዎ", ha: "Ta Hanyarka", yo: "Ní Ọ̀nà Rẹ", zu: "Ngendlela Yakho"
  },
  "transport.heroDesc": {
    en: "Book city rides, taxis, hire drivers, schedule deliveries, or fly anywhere — all powered by Pi cryptocurrency.",
    es: "Reserve viajes urbanos, taxis, contrate conductores, programe entregas o vuele a cualquier lugar — todo con Pi.",
    fr: "Réservez des trajets urbains, taxis, chauffeurs, livraisons ou vols — tout en Pi.",
    pt: "Reserve viagens urbanas, táxis, motoristas, entregas ou voos — tudo com Pi.",
    de: "Buchen Sie Stadtfahrten, Taxis, Fahrer, Lieferungen oder Flüge — alles mit Pi.",
    ar: "احجز رحلات المدينة أو سيارات الأجرة أو سائقين أو توصيل أو طيران — الكل بعملة Pi.",
    zh: "预订城市出行、出租车、司机、配送或航班——全部使用Pi加密货币支付。",
    hi: "शहर की सवारी, टैक्सी, ड्राइवर, डिलीवरी या उड़ानें बुक करें — सब Pi से।",
    ja: "市内の乗車、タクシー、運転手、配達、フライトを予約 — すべてPiで。",
    ko: "도시 탑승, 택시, 드라이버, 배달, 항공편 예약 — 모두 Pi로.",
    sw: "Weka nafasi za safari za mjini, teksi, madereva, usafirishaji au ndege — yote kwa Pi.",
    tr: "Şehir içi yolculuklar, taksiler, şoförler, teslimatlar veya uçuşlar — hepsi Pi ile.",
    ru: "Бронируйте поездки, такси, водителей, доставку или авиарейсы — всё за Pi.",
    id: "Pesan perjalanan kota, taksi, sopir, pengiriman atau penerbangan — semua dengan Pi.",
    th: "จองการเดินทางในเมือง แท็กซี่ คนขับ จัดส่ง หรือบิน — ทั้งหมดด้วย Pi",
    it: "Prenota corse, taxi, autisti, consegne o voli — tutto con Pi.", vi: "Đặt xe, taxi, tài xế, giao hàng hoặc bay — tất cả bằng Pi.", nl: "Boek stadsritten, taxi's, chauffeurs, bezorgingen of vluchten — met Pi.", pl: "Zarezerwuj przejazdy, taksówki, kierowców, dostawy lub loty — za Pi.", bn: "রাইড, ট্যাক্সি, ড্রাইভার, ডেলিভারি বা ফ্লাইট বুক করুন — Pi দিয়ে।", ms: "Tempah perjalanan bandar, teksi, pemandu, penghantaran atau penerbangan — dengan Pi.", tl: "Mag-book ng city ride, taxi, driver, delivery o flight — gamit ang Pi.", uk: "Бронюйте поїздки, таксі, водіїв, доставку або авіарейси — за Pi.", el: "Κρατήστε αστικές διαδρομές, ταξί, οδηγούς, παραδόσεις ή πτήσεις — με Pi.", he: "הזמינו נסיעות עירוניות, מוניות, נהגים, משלוחים או טיסות — עם Pi.", sv: "Boka stadsturer, taxi, chaufförer, leveranser eller flyg — med Pi.", da: "Book byture, taxier, chauffører, leveringer eller fly — med Pi.", fi: "Varaa kaupunkikyytejä, takseja, kuljettajia, toimituksia tai lentoja — Pi:llä.", no: "Bestill byturer, drosjer, sjåfører, leveranser eller fly — med Pi.", ro: "Rezervați curse urbane, taxiuri, șoferi, livrări sau zboruri — cu Pi.", hu: "Foglaljon városi fuvarokat, taxikat, sofőröket, szállításokat vagy repjegyeket — Pi-vel.", cs: "Rezervujte městské jízdy, taxi, řidiče, doručení nebo lety — za Pi.", am: "የከተማ ግልቢያ ፣ ታክሲ ፣ ሹፌር ፣ ማድረስ ወይም በረራ ያስያዙ — በPi።", ha: "Yi ajiya tafiyar birni, taksi, direba, isar kaya ko jirgin sama — ta Pi.", yo: "Ṣe àkójọ ìrìnnà ìlú, tàkísì, awakọ̀, ìfigba tàbí ìgbòkègbodò — pẹ̀lú Pi.", zu: "Bhukha izithuthi zasedolobheni, amathekisi, abashayeli, ukulethwa noma izindiza — nge-Pi."
  },
  "transport.tabRides": {
    en: "City Rides", es: "Viajes Urbanos", fr: "Trajets Urbains", pt: "Viagens Urbanas", de: "Stadtfahrten",
    ar: "رحلات المدينة", zh: "城市出行", hi: "शहर की सवारी", ja: "市内の乗車", ko: "도시 탑승",
    sw: "Safari za Mjini", tr: "Şehir İçi", ru: "Городские", id: "Perjalanan Kota", th: "การเดินทางในเมือง",
    it: "Corse Urbane", vi: "Xe thành phố", nl: "Stadsritten", pl: "Przejazdy", bn: "শহরের রাইড", ms: "Perjalanan Bandar", tl: "City Rides", uk: "Міські Поїздки", el: "Αστικές Βόλτες", he: "נסיעות עירוניות", sv: "Stadsturer", da: "Byture", fi: "Kaupunkikyydit", no: "Byturer", ro: "Curse Urbane", hu: "Városi Fuvarok", cs: "Městské Jízdy", am: "የከተማ ግልቢያ", ha: "Tafiyar Birni", yo: "Ìrìnnà Ìlú", zu: "Imizila Yasedolobheni"
  },
  "transport.tabTaxi": {
    en: "Taxi", es: "Taxi", fr: "Taxi", pt: "Táxi", de: "Taxi",
    ar: "تاكسي", zh: "出租车", hi: "टैक्सी", ja: "タクシー", ko: "택시",
    sw: "Teksi", tr: "Taksi", ru: "Такси", id: "Taksi", th: "แท็กซี่",
    it: "Taxi", vi: "Taxi", nl: "Taxi", pl: "Taxi", bn: "ট্যাক্সি", ms: "Teksi", tl: "Taxi", uk: "Таксі", el: "Ταξί", he: "מונית", sv: "Taxi", da: "Taxa", fi: "Taksi", no: "Drosje", ro: "Taxi", hu: "Taxi", cs: "Taxi", am: "ታክሲ", ha: "Taksi", yo: "Tàkísì", zu: "Ithekisi"
  },
  "transport.tabDriver": {
    en: "Hire Driver", es: "Contratar Conductor", fr: "Chauffeur Privé", pt: "Contratar Motorista", de: "Fahrer Mieten",
    ar: "استئجار سائق", zh: "雇用司机", hi: "ड्राइवर किराये पर", ja: "運転手を雇う", ko: "드라이버 고용",
    sw: "Ajiri Dereva", tr: "Şoför Kirala", ru: "Нанять Водителя", id: "Sewa Sopir", th: "จ้างคนขับ",
    it: "Noleggia Autista", vi: "Thuê Tài xế", nl: "Chauffeur Huren", pl: "Wynajmij Kierowcę", bn: "ড্রাইভার ভাড়া", ms: "Sewa Pemandu", tl: "Mag-hire ng Driver", uk: "Найняти Водія", el: "Ενοικίαση Οδηγού", he: "שכור נהג", sv: "Hyr Chaufför", da: "Lej Chauffør", fi: "Palkkaa Kuljettaja", no: "Lei Sjåfør", ro: "Angajează Șofer", hu: "Sofőr Bérlés", cs: "Pronájem Řidiče", am: "ሹፌር ይቅጠሩ", ha: "Yi hayar Direba", yo: "Yá Awakọ̀", zu: "Qasha Umshayeli"
  },
  "transport.tabDelivery": {
    en: "Delivery", es: "Entrega", fr: "Livraison", pt: "Entrega", de: "Lieferung",
    ar: "توصيل", zh: "配送", hi: "डिलीवरी", ja: "配達", ko: "배달",
    sw: "Usafirishaji", tr: "Teslimat", ru: "Доставка", id: "Pengiriman", th: "จัดส่ง",
    it: "Consegna", vi: "Giao hàng", nl: "Bezorging", pl: "Dostawa", bn: "ডেলিভারি", ms: "Penghantaran", tl: "Delivery", uk: "Доставка", el: "Παράδοση", he: "משלוח", sv: "Leverans", da: "Levering", fi: "Toimitus", no: "Levering", ro: "Livrare", hu: "Szállítás", cs: "Doručení", am: "ማድረስ", ha: "Isar Kaya", yo: "Ìfigba", zu: "Ukulethwa"
  },
  "transport.tabAirways": {
    en: "Airways", es: "Aerolíneas", fr: "Aérien", pt: "Aéreo", de: "Fluglinien",
    ar: "طيران", zh: "航空", hi: "एयरवेज", ja: "航空", ko: "항공",
    sw: "Ndege", tr: "Havayolları", ru: "Авиа", id: "Penerbangan", th: "สายการบิน",
    it: "Voli", vi: "Hàng không", nl: "Luchtvaart", pl: "Lotnictwo", bn: "এয়ারওয়েজ", ms: "Penerbangan", tl: "Airways", uk: "Авіа", el: "Αεροπορία", he: "תעופה", sv: "Flyg", da: "Flyselskaber", fi: "Lentoyhtiöt", no: "Fly", ro: "Aviație", hu: "Repülés", cs: "Letecky", am: "አየር መንገድ", ha: "Jirgin Sama", yo: "Ọkọ̀ Òfurufú", zu: "Izindiza"
  },
  "transport.bookRide": {
    en: "Book Your Ride", es: "Reserva Tu Viaje", fr: "Réservez Votre Trajet", pt: "Reserve Sua Viagem", de: "Fahrt Buchen",
    ar: "احجز رحلتك", zh: "预订行程", hi: "सवारी बुक करें", ja: "乗車を予約", ko: "탑승 예약",
    sw: "Weka Safari", tr: "Yolculuk Ayırt", ru: "Забронировать", id: "Pesan Perjalanan", th: "จองการเดินทาง",
    it: "Prenota la Corsa", vi: "Đặt Chuyến đi", nl: "Boek Uw Rit", pl: "Zarezerwuj Przejazd", bn: "রাইড বুক করুন", ms: "Tempah Perjalanan", tl: "Mag-book ng Sakay", uk: "Забронювати Поїздку", el: "Κρατήστε Βόλτα", he: "הזמן נסיעה", sv: "Boka Din Resa", da: "Book Din Tur", fi: "Varaa Kyytisi", no: "Bestill Din Reise", ro: "Rezervă Cursa", hu: "Foglald a Fuvart", cs: "Rezervujte Jízdu", am: "ግልቢያ ያስያዙ", ha: "Yi ajiya Tafiya", yo: "Ṣe àkójọ Ìrìn", zu: "Bhukha Uhambo"
  },
  "transport.pickup": {
    en: "Pickup Location", es: "Punto de Recogida", fr: "Lieu de Prise en Charge", pt: "Local de Embarque", de: "Abholort",
    ar: "موقع الاستلام", zh: "上车地点", hi: "पिकअप स्थान", ja: "乗車場所", ko: "탑승 장소",
    sw: "Mahali pa Kupanda", tr: "Alış Noktası", ru: "Место посадки", id: "Lokasi Jemput", th: "จุดรับ",
    it: "Punto di Ritiro", vi: "Điểm đón", nl: "Ophaallocatie", pl: "Miejsce Odbioru", bn: "পিকআপ লোকেশন", ms: "Lokasi Jemput", tl: "Pickup Location", uk: "Місце Посадки", el: "Σημείο Παραλαβής", he: "מיקום איסוף", sv: "Hämtplats", da: "Afhentningssted", fi: "Noutopaikka", no: "Hentested", ro: "Loc de Preluare", hu: "Felvételi Pont", cs: "Místo Vyzvednutí", am: "መነሻ ቦታ", ha: "Wurin Ɗauka", yo: "Ibùdó Gbígbà", zu: "Indawo Yokuthathwa"
  },
  "transport.destination": {
    en: "Destination", es: "Destino", fr: "Destination", pt: "Destino", de: "Ziel",
    ar: "الوجهة", zh: "目的地", hi: "गंतव्य", ja: "目的地", ko: "목적지",
    sw: "Mwisho", tr: "Varış", ru: "Пункт назначения", id: "Tujuan", th: "จุดหมาย",
    it: "Destinazione", vi: "Điểm đến", nl: "Bestemming", pl: "Cel Podróży", bn: "গন্তব্য", ms: "Destinasi", tl: "Destinasyon", uk: "Пункт Призначення", el: "Προορισμός", he: "יעד", sv: "Destination", da: "Destination", fi: "Määränpää", no: "Destinasjon", ro: "Destinație", hu: "Úticél", cs: "Cíl", am: "መድረሻ", ha: "Makoma", yo: "Ibi Àfojúsùn", zu: "Indawo Yokuya"
  },
  "transport.dateTime": {
    en: "Date & Time", es: "Fecha y Hora", fr: "Date et Heure", pt: "Data e Hora", de: "Datum & Zeit",
    ar: "التاريخ والوقت", zh: "日期与时间", hi: "दिनांक और समय", ja: "日時", ko: "날짜 및 시간",
    sw: "Tarehe na Saa", tr: "Tarih & Saat", ru: "Дата и Время", id: "Tanggal & Waktu", th: "วันที่และเวลา",
    it: "Data e Ora", vi: "Ngày và Giờ", nl: "Datum en Tijd", pl: "Data i Godzina", bn: "তারিখ ও সময়", ms: "Tarikh dan Masa", tl: "Petsa at Oras", uk: "Дата і Час", el: "Ημερομηνία και Ώρα", he: "תאריך ושעה", sv: "Datum och Tid", da: "Dato og Tid", fi: "Päivämäärä ja Aika", no: "Dato og Tid", ro: "Data și Ora", hu: "Dátum és Idő", cs: "Datum a Čas", am: "ቀን እና ሰዓት", ha: "Rana da Lokaci", yo: "Ọjọ́ àti Àkókò", zu: "Usuku Nesikhathi"
  },
  "transport.passengers": {
    en: "Passengers", es: "Pasajeros", fr: "Passagers", pt: "Passageiros", de: "Passagiere",
    ar: "الركاب", zh: "乘客", hi: "यात्री", ja: "乗客", ko: "승객",
    sw: "Abiria", tr: "Yolcular", ru: "Пассажиры", id: "Penumpang", th: "ผู้โดยสาร",
    it: "Passeggeri", vi: "Hành khách", nl: "Passagiers", pl: "Pasażerowie", bn: "যাত্রী", ms: "Penumpang", tl: "Pasahero", uk: "Пасажири", el: "Επιβάτες", he: "נוסעים", sv: "Passagerare", da: "Passagerer", fi: "Matkustajat", no: "Passasjerer", ro: "Pasageri", hu: "Utasok", cs: "Cestující", am: "ተሳፋሪዎች", ha: "Fasinjoji", yo: "Àwọn Ẹrò", zu: "Abagibeli"
  },
  "transport.findRides": {
    en: "Find Available Rides", es: "Buscar Viajes", fr: "Trouver des Trajets", pt: "Encontrar Viagens", de: "Fahrten Finden",
    ar: "ابحث عن رحلات", zh: "查找可用行程", hi: "उपलब्ध सवारी खोजें", ja: "利用可能な乗車を探す", ko: "이용 가능한 탑승 찾기",
    sw: "Tafuta Safari", tr: "Müsait Seferleri Bul", ru: "Найти Поездки", id: "Cari Perjalanan", th: "ค้นหาการเดินทาง",
    it: "Trova Corse Disponibili", vi: "Tìm Chuyến đi", nl: "Zoek Beschikbare Ritten", pl: "Znajdź Przejazdy", bn: "উপলভ্য রাইড খুঁজুন", ms: "Cari Perjalanan", tl: "Maghanap ng Sakay", uk: "Знайти Поїздки", el: "Βρείτε Βόλτες", he: "מצא נסיעות", sv: "Hitta Resor", da: "Find Ture", fi: "Etsi Kyytejä", no: "Finn Turer", ro: "Găsește Curse", hu: "Fuvarok Keresése", cs: "Najít Jízdy", am: "ግልቢያ ያግኙ", ha: "Nemo Tafiye", yo: "Wá Ìrìnnà", zu: "Thola Izithuthi"
  },
  "transport.becomeDriver": {
    en: "Become a Driver Agent", es: "Conviértete en Conductor", fr: "Devenez Chauffeur", pt: "Seja um Motorista", de: "Fahrer Werden",
    ar: "كن وكيل سائق", zh: "成为司机代理", hi: "ड्राइवर एजेंट बनें", ja: "ドライバーエージェントになる", ko: "드라이버 에이전트 되기",
    sw: "Kuwa Wakala wa Dereva", tr: "Sürücü Ajanı Ol", ru: "Стать водителем", id: "Jadi Agen Sopir", th: "เป็นตัวแทนคนขับ",
    it: "Diventa Autista", vi: "Trở thành Tài xế", nl: "Word Chauffeur", pl: "Zostań Kierowcą", bn: "ড্রাইভার এজেন্ট হন", ms: "Jadi Ejen Pemandu", tl: "Maging Driver Agent", uk: "Стати Водієм", el: "Γίνετε Οδηγός", he: "הפוך לנהג", sv: "Bli Chaufför", da: "Bliv Chauffør", fi: "Ryhdy Kuljettajaksi", no: "Bli Sjåfør", ro: "Devino Șofer", hu: "Légy Sofőr", cs: "Staňte se Řidičem", am: "ሹፌር ይሁኑ", ha: "Zama Direba", yo: "Jẹ́ Awakọ̀", zu: "Yiba Umshayeli"
  },
  "transport.driverDesc": {
    en: "Join thousands of drivers earning Pi on every ride.", es: "Únete a miles de conductores ganando Pi.", fr: "Rejoignez des milliers de chauffeurs gagnant des Pi.", pt: "Junte-se a milhares de motoristas ganhando Pi.", de: "Verdienen Sie Pi als Fahrer.",
    ar: "انضم لآلاف السائقين واكسب Pi.", zh: "加入数千名司机，每次出行赚取Pi。", hi: "हज़ारों ड्राइवरों से जुड़ें और Pi कमाएँ।", ja: "数千人のドライバーとPiを稼ごう。", ko: "수천 명의 드라이버와 함께 Pi를 벌어보세요.",
    sw: "Jiunge na maelfu ya madereva wanaopata Pi.", tr: "Binlerce sürücüyle Pi kazanın.", ru: "Зарабатывайте Pi за каждую поездку.", id: "Bergabung dengan ribuan sopir yang menghasilkan Pi.", th: "เข้าร่วมกับคนขับหลายพันคนที่ได้รับ Pi",
    it: "Unisciti a migliaia di autisti che guadagnano Pi.", vi: "Tham gia cùng hàng ngàn tài xế kiếm Pi.", nl: "Word een van duizenden chauffeurs die Pi verdienen.", pl: "Dołącz do tysięcy kierowców zarabiających Pi.", bn: "হাজার হাজার ড্রাইভারদের সাথে যোগ দিন যারা Pi আয় করে।", ms: "Sertai ribuan pemandu yang memperoleh Pi.", tl: "Sumali sa libu-libong driver na kumikita ng Pi.", uk: "Приєднуйтесь до тисяч водіїв, які заробляють Pi.", el: "Γίνετε μέλος χιλιάδων οδηγών που κερδίζουν Pi.", he: "הצטרפו לאלפי נהגים שמרוויחים Pi.", sv: "Gå med tusentals chaufförer som tjänar Pi.", da: "Bliv en af tusindvis af chauffører der tjener Pi.", fi: "Liity tuhansien kuljettajien joukkoon jotka ansaitsevat Pi:tä.", no: "Bli med tusenvis av sjåfører som tjener Pi.", ro: "Alătură-te miilor de șoferi care câștigă Pi.", hu: "Csatlakozzon több ezer sofőrhöz akik Pi-t keresnek.", cs: "Připojte se k tisícům řidičů kteří vydělávají Pi.", am: "Pi የሚያገኙ በሺዎች ሹፌሮችን ይቀላቀሉ።", ha: "Ku shiga tare da dubban direbobi da ke samun Pi.", yo: "Darapọ̀ mọ́ ẹgbẹẹgbẹ̀rún àwọn awakọ̀ tí wọ́n ń jèrè Pi.", zu: "Joyina izinkulungwane zabashayeli abathola Pi."
  },
  "transport.applyNow": {
    en: "Apply Now", es: "Aplica Ahora", fr: "Postuler", pt: "Inscreva-se", de: "Jetzt Bewerben",
    ar: "تقدم الآن", zh: "立即申请", hi: "अभी आवेदन करें", ja: "今すぐ応募", ko: "지금 신청",
    sw: "Omba Sasa", tr: "Şimdi Başvur", ru: "Подать заявку", id: "Daftar Sekarang", th: "สมัครเลย",
    it: "Candidati Ora", vi: "Ứng tuyển Ngay", nl: "Nu Solliciteren", pl: "Aplikuj Teraz", bn: "এখনই আবেদন করুন", ms: "Mohon Sekarang", tl: "Mag-apply Ngayon", uk: "Подати Заявку", el: "Κάντε Αίτηση", he: "הגש מועמדות", sv: "Ansök Nu", da: "Ansøg Nu", fi: "Hae Nyt", no: "Søk Nå", ro: "Aplică Acum", hu: "Jelentkezz Most", cs: "Přihlásit se", am: "አሁን ያመልክቱ", ha: "Yi Takarda Yanzu", yo: "Lò Fún Báyìí", zu: "Faka Isicelo Manje"
  },
  "transport.searchFlights": {
    en: "Search Flights", es: "Buscar Vuelos", fr: "Rechercher des Vols", pt: "Buscar Voos", de: "Flüge Suchen",
    ar: "ابحث عن رحلات طيران", zh: "搜索航班", hi: "उड़ानें खोजें", ja: "フライト検索", ko: "항공편 검색",
    sw: "Tafuta Ndege", tr: "Uçuş Ara", ru: "Поиск Рейсов", id: "Cari Penerbangan", th: "ค้นหาเที่ยวบิน",
    it: "Cerca Voli", vi: "Tìm Chuyến bay", nl: "Vluchten Zoeken", pl: "Szukaj Lotów", bn: "ফ্লাইট খুঁজুন", ms: "Cari Penerbangan", tl: "Maghanap ng Flights", uk: "Пошук Рейсів", el: "Αναζήτηση Πτήσεων", he: "חפש טיסות", sv: "Sök Flyg", da: "Søg Flyrejser", fi: "Hae Lentoja", no: "Søk Fly", ro: "Caută Zboruri", hu: "Repjegy Keresés", cs: "Hledat Lety", am: "በረራዎችን ይፈልጉ", ha: "Bincika Jirgin Sama", yo: "Wá Ọkọ̀ Òfurufú", zu: "Sesha Izindiza"
  },
  "transport.howItWorks": {
    en: "How It Works", es: "Cómo Funciona", fr: "Comment Ça Marche", pt: "Como Funciona", de: "So Funktioniert Es",
    ar: "كيف يعمل", zh: "如何使用", hi: "कैसे काम करता है", ja: "使い方", ko: "이용 방법",
    sw: "Jinsi Inavyofanya Kazi", tr: "Nasıl Çalışır", ru: "Как Работает", id: "Cara Kerja", th: "วิธีการทำงาน",
    it: "Come Funziona", vi: "Cách Hoạt động", nl: "Hoe het Werkt", pl: "Jak to Działa", bn: "এটা কিভাবে কাজ করে", ms: "Cara Ia Berfungsi", tl: "Paano Ito Gumagana", uk: "Як Це Працює", el: "Πώς Λειτουργεί", he: "איך זה עובד", sv: "Hur det Fungerar", da: "Sådan Fungerer det", fi: "Näin se Toimii", no: "Slik Fungerer det", ro: "Cum Funcționează", hu: "Hogyan Működik", cs: "Jak to Funguje", am: "እንዴት ይሠራል", ha: "Yadda Yake Aiki", yo: "Bí ó Ṣe Ń Ṣiṣẹ́", zu: "Kusebenza Kanjani"
  },
  "transport.activeDrivers": {
    en: "Active Drivers", es: "Conductores Activos", fr: "Chauffeurs Actifs", pt: "Motoristas Ativos", de: "Aktive Fahrer",
    ar: "سائقون نشطون", zh: "活跃司机", hi: "सक्रिय ड्राइवर", ja: "アクティブドライバー", ko: "활동 드라이버",
    sw: "Madereva Hai", tr: "Aktif Sürücüler", ru: "Активных водителей", id: "Sopir Aktif", th: "คนขับที่ใช้งาน",
    it: "Autisti Attivi", vi: "Tài xế Hoạt động", nl: "Actieve Chauffeurs", pl: "Aktywni Kierowcy", bn: "সক্রিয় ড্রাইভার", ms: "Pemandu Aktif", tl: "Aktibong Driver", uk: "Активні Водії", el: "Ενεργοί Οδηγοί", he: "נהגים פעילים", sv: "Aktiva Chaufförer", da: "Aktive Chauffører", fi: "Aktiiviset Kuljettajat", no: "Aktive Sjåfører", ro: "Șoferi Activi", hu: "Aktív Sofőrök", cs: "Aktivní Řidiči", am: "ንቁ ሹፌሮች", ha: "Direban da ke Aiki", yo: "Àwọn Awakọ̀", zu: "Abashayeli Abasebenzayo"
  },
  "transport.citiesCovered": {
    en: "Cities Covered", es: "Ciudades Cubiertas", fr: "Villes Couvertes", pt: "Cidades Cobertas", de: "Abgedeckte Städte",
    ar: "مدن مغطاة", zh: "覆盖城市", hi: "शहर कवर किए गए", ja: "対応都市", ko: "서비스 도시",
    sw: "Miji Inayohudumiwa", tr: "Kapsanan Şehirler", ru: "Городов", id: "Kota Tercakup", th: "เมืองที่ครอบคลุม",
    it: "Città Coperte", vi: "Thành phố được Phục vụ", nl: "Steden Gedekt", pl: "Obsługiwane Miasta", bn: "কভার করা শহর", ms: "Bandar Diliputi", tl: "Mga Lungsod na Covered", uk: "Міст Охоплено", el: "Πόλεις", he: "ערים מכוסות", sv: "Städer", da: "Dækkede Byer", fi: "Kaupunkeja", no: "Byer Dekket", ro: "Orașe Acoperite", hu: "Lefedett Városok", cs: "Pokrytá Města", am: "የተሸፈኑ ከተማዎች", ha: "Birane da Aka Shafa", yo: "Àwọn Ìlú", zu: "Amadolobha Ahlanganisiwe"
  },
  "transport.airlines": {
    en: "Partner Airlines", es: "Aerolíneas Asociadas", fr: "Compagnies Partenaires", pt: "Companhias Parceiras", de: "Partner-Fluglinien",
    ar: "شركات طيران شريكة", zh: "合作航空公司", hi: "साझेदार एयरलाइंस", ja: "提携航空会社", ko: "제휴 항공사",
    sw: "Mashirika ya Ndege", tr: "Ortak Havayolları", ru: "Авиакомпаний", id: "Maskapai Mitra", th: "สายการบินพันธมิตร",
    it: "Compagnie Partner", vi: "Hãng Hàng không", nl: "Partner Luchtvaartmaatschappijen", pl: "Partnerskie Linie", bn: "পার্টনার এয়ারলাইন", ms: "Syarikat Penerbangan Rakan", tl: "Partner Airlines", uk: "Авіакомпанії", el: "Αεροπορικές Εταιρείες", he: "חברות תעופה", sv: "Partner Flygbolag", da: "Partner Flyselskaber", fi: "Kumppanilentoyhtiöt", no: "Partner Flyselskaper", ro: "Companii Aeriene Partenere", hu: "Partner Légitársaságok", cs: "Partnerské Aerolinky", am: "አጋር አየር መንገዶች", ha: "Kamfanin Jirgin Sama", yo: "Àwọn Alájọṣe Ọkọ̀ Òfurufú", zu: "Izinkampani Zezindiza"
  },
  "transport.avgRating": {
    en: "Avg Rating", es: "Calificación Promedio", fr: "Note Moyenne", pt: "Avaliação Média", de: "Durchschnittsbewertung",
    ar: "متوسط التقييم", zh: "平均评分", hi: "औसत रेटिंग", ja: "平均評価", ko: "평균 평점",
    sw: "Kiwango cha Wastani", tr: "Ort. Puan", ru: "Средний рейтинг", id: "Rating Rata-rata", th: "คะแนนเฉลี่ย",
    it: "Valutazione Media", vi: "Đánh giá trung bình", nl: "Gemiddelde Score", pl: "Średnia Ocena", bn: "গড় রেটিং", ms: "Purata Penilaian", tl: "Average Rating", uk: "Середній Рейтинг", el: "Μέση Βαθμολογία", he: "דירוג ממוצע", sv: "Genomsnittsbetyg", da: "Gennemsnitsvurdering", fi: "Keskiarvosana", no: "Gjennomsnittsvurdering", ro: "Nota Medie", hu: "Átlagos Értékelés", cs: "Průměrné Hodnocení", am: "ድምጹ", ha: "Matsakaicin Maki", yo: "Ìwọ̀n Àárín Gbùngbùn", zu: "Isilinganiso Sokulinganisa"
  },
  "transport.bookFlight": {
    en: "Book Flight", es: "Reservar Vuelo", fr: "Réserver Vol", pt: "Reservar Voo", de: "Flug Buchen",
    ar: "احجز رحلة طيران", zh: "预订航班", hi: "उड़ान बुक करें", ja: "フライト予約", ko: "항공편 예약",
    sw: "Weka Ndege", tr: "Uçuş Ayırt", ru: "Забронировать рейс", id: "Pesan Penerbangan", th: "จองเที่ยวบิน",
    it: "Prenota Volo", vi: "Đặt Chuyến bay", nl: "Vlucht Boeken", pl: "Rezerwuj Lot", bn: "ফ্লাইট বুক করুন", ms: "Tempah Penerbangan", tl: "I-book ang Flight", uk: "Забронювати Рейс", el: "Κράτηση Πτήσης", he: "הזמן טיסה", sv: "Boka Flyg", da: "Book Flyrejse", fi: "Varaa Lento", no: "Bestill Fly", ro: "Rezervă Zbor", hu: "Repjegy Foglalás", cs: "Rezervovat Let", am: "በረራ ያስያዙ", ha: "Yi ajiya Jirgin Sama", yo: "Ṣe àkójọ Ọkọ̀ Òfurufú", zu: "Bhukha Indiza"
  },
  "transport.from": {
    en: "From", es: "Desde", fr: "De", pt: "De", de: "Von",
    ar: "من", zh: "从", hi: "से", ja: "出発", ko: "출발",
    sw: "Kutoka", tr: "Nereden", ru: "Откуда", id: "Dari", th: "จาก",
    it: "Da", vi: "Từ", nl: "Vanaf", pl: "Od", bn: "থেকে", ms: "Dari", tl: "Mula sa", uk: "Від", el: "Από", he: "מ-", sv: "Från", da: "Fra", fi: "Alkaen", no: "Fra", ro: "De la", hu: "Tól", cs: "Od", am: "ከ", ha: "Daga", yo: "Láti", zu: "Kusuka"
  },
  "transport.perPerson": {
    en: "per person", es: "por persona", fr: "par personne", pt: "por pessoa", de: "pro Person",
    ar: "لكل شخص", zh: "每人", hi: "प्रति व्यक्ति", ja: "一人あたり", ko: "1인당",
    sw: "kwa mtu", tr: "kişi başı", ru: "за человека", id: "per orang", th: "ต่อคน",
    it: "per persona", vi: "mỗi người", nl: "per persoon", pl: "za osobę", bn: "প্রতি ব্যক্তি", ms: "seorang", tl: "bawat tao", uk: "за особу", el: "ανά άτομο", he: "לאדם", sv: "per person", da: "per person", fi: "per henkilö", no: "per person", ro: "per persoană", hu: "személyenként", cs: "za osobu", am: "በአንድ ሰው", ha: "kowane mutum", yo: "fún ẹnìkọ̀ọ̀kan", zu: "ngomuntu"
  },
  "transport.transportRoutes": {
    en: "Transport Routes", es: "Rutas de Transporte", fr: "Itinéraires de Transport", pt: "Rotas de Transporte", de: "Transportrouten",
    ar: "طرق النقل", zh: "交通路线", hi: "परिवहन मार्ग", ja: "輸送ルート", ko: "운송 경로",
    sw: "Njia za Usafiri", tr: "Ulaşım Güzergahları", ru: "Маршруты", id: "Rute Transportasi", th: "เส้นทางขนส่ง",
    it: "Rotte di Trasporto", vi: "Tuyến Vận chuyển", nl: "Vervoersroutes", pl: "Trasy Transportu", bn: "পরিবহন রুট", ms: "Laluan Pengangkutan", tl: "Mga Ruta ng Transport", uk: "Маршрути", el: "Δρομολόγια", he: "מסלולי תחבורה", sv: "Transportrutter", da: "Transportruter", fi: "Kuljetusreitit", no: "Transportruter", ro: "Rute de Transport", hu: "Szállítási Útvonalak", cs: "Dopravní Trasy", am: "የመጓጓዣ መንገዶች", ha: "Hanyoyin Sufuri", yo: "Àwọn Ipa-ọ̀nà Ìrìnnà", zu: "Imizila Yokuthutha"
  },
};

// ── Context ──
interface I18nContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    const detected = stored || navigator.language.split("-")[0] || "en";
    const resolved = languages[detected] ? detected : "en";
    setLangState(resolved);
    document.documentElement.dir = languages[resolved].dir;
    document.documentElement.lang = resolved;
  }, []);

  // Cross-tab language sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANG_KEY && e.newValue && languages[e.newValue]) {
        setLangState(e.newValue);
        document.documentElement.dir = languages[e.newValue].dir;
        document.documentElement.lang = e.newValue;
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setLang = useCallback((code: string) => {
    const resolved = languages[code] ? code : "en";
    localStorage.setItem(LANG_KEY, resolved);
    setLangState(resolved);
    document.documentElement.dir = languages[resolved].dir;
    document.documentElement.lang = resolved;
    // Sync with static HTML lang.js
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: resolved } }));
  }, []);

  const t = useCallback((key: string): string => {
    const entry = T[key];
    if (!entry) return key;
    return entry[lang] || entry["en"] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}

// ── Language Selector Component ──
export function LangSelector() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = languages[lang] || languages.en;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-all hover:border-white/[0.16] hover:text-white"
      >
        <span>{current.flag}</span>
        <span>{lang.toUpperCase()}</span>
        <span className="text-[0.5rem] opacity-50">▼</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 max-h-80 w-44 overflow-y-auto rounded-xl border border-white/[0.08] bg-[#111114] p-1.5 shadow-2xl">
            {Object.entries(languages).map(([code, l]) => (
              <button
                key={code}
                onClick={() => { setLang(code); setOpen(false); }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                  code === lang
                    ? "bg-violet-500/12 text-violet-400"
                    : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="text-base">{l.flag}</span>
                <span>{l.label}</span>
                <span className="ml-auto text-[0.625rem] opacity-50">{code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
