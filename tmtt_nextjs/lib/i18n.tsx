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
};

type Translations = Record<string, Record<string, string>>;

const T: Translations = {
  // ── Navigation ──
  "nav.home": {
    en: "Home", es: "Inicio", fr: "Accueil", pt: "Início", de: "Startseite",
    ar: "الرئيسية", zh: "首页", hi: "होम", ja: "ホーム", ko: "홈",
    sw: "Nyumbani", tr: "Ana Sayfa", ru: "Главная", id: "Beranda", th: "หน้าแรก"
  },
  "nav.marketplace": {
    en: "Marketplace", es: "Mercado", fr: "Marché", pt: "Mercado", de: "Marktplatz",
    ar: "السوق", zh: "市场", hi: "बाज़ार", ja: "マーケット", ko: "마켓플레이스",
    sw: "Soko", tr: "Pazar", ru: "Маркетплейс", id: "Pasar", th: "ตลาด"
  },
  "nav.map": {
    en: "Map", es: "Mapa", fr: "Carte", pt: "Mapa", de: "Karte",
    ar: "خريطة", zh: "地图", hi: "नक्शा", ja: "マップ", ko: "지도",
    sw: "Ramani", tr: "Harita", ru: "Карта", id: "Peta", th: "แผนที่"
  },
  "nav.services": {
    en: "Services", es: "Servicios", fr: "Services", pt: "Serviços", de: "Dienste",
    ar: "خدمات", zh: "服务", hi: "सेवाएं", ja: "サービス", ko: "서비스",
    sw: "Huduma", tr: "Hizmetler", ru: "Услуги", id: "Layanan", th: "บริการ"
  },
  "nav.social": {
    en: "Social", es: "Social", fr: "Social", pt: "Social", de: "Sozial",
    ar: "اجتماعي", zh: "社交", hi: "सोशल", ja: "ソーシャル", ko: "소셜",
    sw: "Jamii", tr: "Sosyal", ru: "Соцсети", id: "Sosial", th: "โซเชียล"
  },
  "nav.hotels": {
    en: "Hotels", es: "Hoteles", fr: "Hôtels", pt: "Hotéis", de: "Hotels",
    ar: "فنادق", zh: "酒店", hi: "होटल", ja: "ホテル", ko: "호텔",
    sw: "Hoteli", tr: "Oteller", ru: "Отели", id: "Hotel", th: "โรงแรม"
  },
  "nav.homes": {
    en: "Homes", es: "Hogares", fr: "Maisons", pt: "Casas", de: "Häuser",
    ar: "منازل", zh: "房屋", hi: "घर", ja: "住宅", ko: "주택",
    sw: "Nyumba", tr: "Evler", ru: "Дома", id: "Rumah", th: "บ้าน"
  },
  "nav.bills": {
    en: "Bills", es: "Facturas", fr: "Factures", pt: "Contas", de: "Rechnungen",
    ar: "فواتير", zh: "账单", hi: "बिल", ja: "請求書", ko: "청구서",
    sw: "Bili", tr: "Faturalar", ru: "Счета", id: "Tagihan", th: "บิล"
  },
  "nav.admin": {
    en: "Admin", es: "Admin", fr: "Admin", pt: "Admin", de: "Admin",
    ar: "إدارة", zh: "管理", hi: "प्रशासन", ja: "管理", ko: "관리",
    sw: "Msimamizi", tr: "Yönetici", ru: "Админ", id: "Admin", th: "ผู้ดูแล"
  },
  "nav.connectPi": {
    en: "Connect Pi", es: "Conectar Pi", fr: "Connecter Pi", pt: "Conectar Pi", de: "Pi verbinden",
    ar: "ربط Pi", zh: "连接 Pi", hi: "Pi जोड़ें", ja: "Pi接続", ko: "Pi 연결",
    sw: "Unganisha Pi", tr: "Pi Bağla", ru: "Подключить Pi", id: "Hubungkan Pi", th: "เชื่อมต่อ Pi"
  },
  "nav.shareApp": {
    en: "Share App", es: "Compartir", fr: "Partager", pt: "Compartilhar", de: "Teilen",
    ar: "مشاركة", zh: "分享", hi: "शेयर करें", ja: "共有", ko: "공유",
    sw: "Shiriki", tr: "Paylaş", ru: "Поделиться", id: "Bagikan", th: "แชร์"
  },

  // ── Hero / Home ──
  "hero.badge": {
    en: "Pi Mainnet is Live", es: "Pi Mainnet está Activa", fr: "Pi Mainnet est en Ligne", pt: "Pi Mainnet está Ativa", de: "Pi Mainnet ist Live",
    ar: "شبكة Pi الرئيسية مباشرة", zh: "Pi 主网已上线", hi: "Pi मेननेट लाइव है", ja: "Piメインネット稼働中", ko: "Pi 메인넷 가동 중",
    sw: "Pi Mainnet iko Hai", tr: "Pi Mainnet Yayında", ru: "Pi Mainnet запущен", id: "Pi Mainnet Aktif", th: "Pi Mainnet เปิดใช้งานแล้ว"
  },
  "hero.titlePrefix": {
    en: "Your Life, Powered by", es: "Tu Vida, Impulsada por", fr: "Votre Vie, Propulsée par", pt: "Sua Vida, Movida por", de: "Ihr Leben, Angetrieben von",
    ar: "حياتك، مدعومة بـ", zh: "您的生活，由", hi: "आपका जीवन, द्वारा संचालित", ja: "あなたの暮らしを", ko: "당신의 삶을",
    sw: "Maisha Yako, Yanayoendeshwa na", tr: "Hayatınız,", ru: "Ваша Жизнь на", id: "Hidup Anda, Didukung oleh", th: "ชีวิตคุณ ขับเคลื่อนด้วย"
  },
  "hero.piCoin": {
    en: "Pi Coin", es: "Pi Coin", fr: "Pi Coin", pt: "Pi Coin", de: "Pi Coin",
    ar: "Pi Coin", zh: "Pi Coin 驱动", hi: "Pi Coin", ja: "Pi Coinが支える", ko: "Pi Coin이 함께합니다",
    sw: "Pi Coin", tr: "Pi Coin ile", ru: "Pi Coin", id: "Pi Coin", th: "Pi Coin"
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
    th: "เช่าโรงแรม ซื้อบ้านในฝัน และชำระบิลทั้งหมด — ด้วย Pi ปลอดภัย ทันที และกระจายศูนย์"
  },
  "hero.exploreServices": {
    en: "Explore Services", es: "Explorar Servicios", fr: "Explorer les Services", pt: "Explorar Serviços", de: "Dienste Entdecken",
    ar: "استكشاف الخدمات", zh: "探索服务", hi: "सेवाएं खोजें", ja: "サービスを探す", ko: "서비스 탐색",
    sw: "Gundua Huduma", tr: "Hizmetleri Keşfet", ru: "Обзор Услуг", id: "Jelajahi Layanan", th: "สำรวจบริการ"
  },
  "hero.payBillNow": {
    en: "Pay a Bill Now", es: "Paga una Factura", fr: "Payer une Facture", pt: "Pagar uma Conta", de: "Rechnung Bezahlen",
    ar: "ادفع فاتورة الآن", zh: "立即支付账单", hi: "अभी बिल भुगतान करें", ja: "今すぐ請求書を支払う", ko: "지금 청구서 결제",
    sw: "Lipa Bili Sasa", tr: "Şimdi Fatura Öde", ru: "Оплатить Счёт", id: "Bayar Tagihan Sekarang", th: "ชำระบิลตอนนี้"
  },

  // ── Stats ──
  "stats.activePioneers": {
    en: "Active Pioneers", es: "Pioneros Activos", fr: "Pionniers Actifs", pt: "Pioneiros Ativos", de: "Aktive Pioniere",
    ar: "رواد نشطون", zh: "活跃先驱者", hi: "सक्रिय पायनियर्स", ja: "アクティブパイオニア", ko: "활성 파이오니어",
    sw: "Waanzilishi Hai", tr: "Aktif Öncüler", ru: "Активные Пионеры", id: "Perintis Aktif", th: "ผู้บุกเบิกที่ใช้งาน"
  },
  "stats.serviceCategories": {
    en: "Service Categories", es: "Categorías de Servicios", fr: "Catégories de Services", pt: "Categorias de Serviços", de: "Dienstkategorien",
    ar: "فئات الخدمات", zh: "服务类别", hi: "सेवा श्रेणियां", ja: "サービスカテゴリ", ko: "서비스 카테고리",
    sw: "Kategoria za Huduma", tr: "Hizmet Kategorileri", ru: "Категории Услуг", id: "Kategori Layanan", th: "หมวดหมู่บริการ"
  },
  "stats.providers": {
    en: "Providers", es: "Proveedores", fr: "Fournisseurs", pt: "Provedores", de: "Anbieter",
    ar: "مزودون", zh: "供应商", hi: "प्रदाता", ja: "プロバイダー", ko: "제공자",
    sw: "Watoa Huduma", tr: "Sağlayıcılar", ru: "Поставщики", id: "Penyedia", th: "ผู้ให้บริการ"
  },
  "stats.successRate": {
    en: "Success Rate", es: "Tasa de Éxito", fr: "Taux de Réussite", pt: "Taxa de Sucesso", de: "Erfolgsrate",
    ar: "معدل النجاح", zh: "成功率", hi: "सफलता दर", ja: "成功率", ko: "성공률",
    sw: "Kiwango cha Mafanikio", tr: "Başarı Oranı", ru: "Уровень Успеха", id: "Tingkat Keberhasilan", th: "อัตราสำเร็จ"
  },

  // ── Services ──
  "services.ourServices": {
    en: "Our Services", es: "Nuestros Servicios", fr: "Nos Services", pt: "Nossos Serviços", de: "Unsere Dienste",
    ar: "خدماتنا", zh: "我们的服务", hi: "हमारी सेवाएं", ja: "サービス一覧", ko: "우리의 서비스",
    sw: "Huduma Zetu", tr: "Hizmetlerimiz", ru: "Наши Услуги", id: "Layanan Kami", th: "บริการของเรา"
  },
  "services.everythingPi": {
    en: "Everything you need, paid with Pi", es: "Todo lo que necesitas, pagado con Pi", fr: "Tout ce dont vous avez besoin, payé avec Pi", pt: "Tudo que você precisa, pago com Pi", de: "Alles was Sie brauchen, bezahlt mit Pi",
    ar: "كل ما تحتاجه، ادفع بـ Pi", zh: "您需要的一切，用Pi支付", hi: "आपको जो चाहिए, Pi से भुगतान करें", ja: "必要なものすべて、Piで支払い", ko: "필요한 모든 것, Pi로 결제",
    sw: "Kila kitu unachohitaji, ulipe kwa Pi", tr: "İhtiyacınız olan her şey, Pi ile ödeyin", ru: "Всё, что нужно, оплачивайте Pi", id: "Semua yang Anda butuhkan, bayar dengan Pi", th: "ทุกสิ่งที่คุณต้องการ ชำระด้วย Pi"
  },
  "services.rentHotel": {
    en: "Rent Hotel", es: "Alquilar Hotel", fr: "Louer Hôtel", pt: "Alugar Hotel", de: "Hotel Mieten",
    ar: "حجز فندق", zh: "预订酒店", hi: "होटल किराये", ja: "ホテルを予約", ko: "호텔 예약",
    sw: "Kodi Hoteli", tr: "Otel Kirala", ru: "Снять Отель", id: "Sewa Hotel", th: "เช่าโรงแรม"
  },
  "services.rentHotelDesc": {
    en: "Book luxury & budget hotels across East Africa", es: "Reserva hoteles de lujo y económicos", fr: "Réservez des hôtels de luxe et économiques", pt: "Reserve hotéis de luxo e econômicos", de: "Buchen Sie luxuriöse & günstige Hotels",
    ar: "احجز فنادق فاخرة واقتصادية", zh: "预订东非的豪华和经济型酒店", hi: "लक्जरी और बजट होटल बुक करें", ja: "豪華&格安ホテルを予約", ko: "럭셔리 & 저가 호텔 예약",
    sw: "Panga hoteli za anasa na bei nafuu", tr: "Lüks ve bütçe dostu oteller", ru: "Бронируйте отели", id: "Pesan hotel mewah & murah", th: "จองโรงแรมหรูและประหยัด"
  },
  "services.buyHome": {
    en: "Buy Home", es: "Comprar Casa", fr: "Acheter Maison", pt: "Comprar Casa", de: "Haus Kaufen",
    ar: "شراء منزل", zh: "购买房屋", hi: "घर खरीदें", ja: "家を購入", ko: "집 구매",
    sw: "Nunua Nyumba", tr: "Ev Satın Al", ru: "Купить Дом", id: "Beli Rumah", th: "ซื้อบ้าน"
  },
  "services.buyHomeDesc": {
    en: "Houses, apartments, land & commercial properties", es: "Casas, apartamentos, terrenos y propiedades", fr: "Maisons, appartements, terrains et propriétés", pt: "Casas, apartamentos, terrenos e propriedades", de: "Häuser, Wohnungen, Grundstücke & Gewerbe",
    ar: "منازل وشقق وأراضي وعقارات تجارية", zh: "住宅、公寓、土地和商业地产", hi: "घर, अपार्टमेंट, जमीन और व्यावसायिक संपत्ति", ja: "住宅、アパート、土地、商業物件", ko: "주택, 아파트, 토지 & 상업용 부동산",
    sw: "Nyumba, ghorofa, ardhi na mali za biashara", tr: "Evler, daireler, arazi ve ticari mülkler", ru: "Дома, квартиры, земля и коммерция", id: "Rumah, apartemen, tanah & properti komersial", th: "บ้าน อพาร์ทเมนท์ ที่ดินและอสังหาริมทรัพย์"
  },
  "services.payBills": {
    en: "Pay Bills", es: "Pagar Facturas", fr: "Payer Factures", pt: "Pagar Contas", de: "Rechnungen Bezahlen",
    ar: "دفع الفواتير", zh: "支付账单", hi: "बिल भुगतान", ja: "請求書を支払う", ko: "청구서 결제",
    sw: "Lipa Bili", tr: "Fatura Öde", ru: "Оплатить Счета", id: "Bayar Tagihan", th: "ชำระบิล"
  },
  "services.payBillsDesc": {
    en: "Electricity, water, internet, TV & phone bills", es: "Electricidad, agua, internet, TV y teléfono", fr: "Électricité, eau, internet, TV et téléphone", pt: "Eletricidade, água, internet, TV e telefone", de: "Strom, Wasser, Internet, TV & Telefon",
    ar: "كهرباء، ماء، إنترنت، تلفزيون وهاتف", zh: "电费、水费、网费、电视费和电话费", hi: "बिजली, पानी, इंटरनेट, टीवी और फोन बिल", ja: "電気、水道、ネット、TV、電話", ko: "전기, 수도, 인터넷, TV & 전화",
    sw: "Stima, maji, intaneti, TV na simu", tr: "Elektrik, su, internet, TV & telefon", ru: "Электричество, вода, интернет, ТВ и телефон", id: "Listrik, air, internet, TV & telepon", th: "ค่าไฟ น้ำ เน็ต ทีวี และโทรศัพท์"
  },
  "services.getStarted": {
    en: "Get Started →", es: "Comenzar →", fr: "Commencer →", pt: "Começar →", de: "Loslegen →",
    ar: "ابدأ الآن →", zh: "开始使用 →", hi: "शुरू करें →", ja: "始める →", ko: "시작하기 →",
    sw: "Anza →", tr: "Başla →", ru: "Начать →", id: "Mulai →", th: "เริ่มต้น →"
  },

  // ── CTA ──
  "cta.title": {
    en: "Start Using Pi for Everything", es: "Empieza a Usar Pi para Todo", fr: "Utilisez Pi pour Tout", pt: "Comece a Usar Pi para Tudo", de: "Pi für Alles Nutzen",
    ar: "ابدأ باستخدام Pi لكل شيء", zh: "开始用Pi做一切", hi: "सब कुछ के लिए Pi का उपयोग शुरू करें", ja: "すべてにPiを使い始めよう", ko: "모든 것에 Pi를 사용하세요",
    sw: "Anza Kutumia Pi kwa Kila Kitu", tr: "Her Şey İçin Pi Kullanın", ru: "Начните Использовать Pi для Всего", id: "Mulai Gunakan Pi untuk Segalanya", th: "เริ่มใช้ Pi สำหรับทุกอย่าง"
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
    th: "เข้าร่วมกับผู้บุกเบิกหลายพันคนที่ใช้ Omenda Pi Pays สำหรับโรงแรม อสังหาริมทรัพย์ และการชำระบิล"
  },
  "cta.viewAllServices": {
    en: "View All Services", es: "Ver Todos los Servicios", fr: "Voir Tous les Services", pt: "Ver Todos os Serviços", de: "Alle Dienste Anzeigen",
    ar: "عرض جميع الخدمات", zh: "查看所有服务", hi: "सभी सेवाएं देखें", ja: "全サービスを見る", ko: "모든 서비스 보기",
    sw: "Tazama Huduma Zote", tr: "Tüm Hizmetleri Gör", ru: "Все Услуги", id: "Lihat Semua Layanan", th: "ดูบริการทั้งหมด"
  },

  // ── Services Page ──
  "services.piPowered": {
    en: "Pi-Powered Services", es: "Servicios Pi", fr: "Services Pi", pt: "Serviços Pi", de: "Pi-Dienste",
    ar: "خدمات Pi", zh: "Pi驱动的服务", hi: "Pi-संचालित सेवाएं", ja: "Pi対応サービス", ko: "Pi 기반 서비스",
    sw: "Huduma za Pi", tr: "Pi Destekli Hizmetler", ru: "Pi-Сервисы", id: "Layanan Pi", th: "บริการรองรับ Pi"
  },
  "services.allServicesOnePlatform": {
    en: "All Services,", es: "Todos los Servicios,", fr: "Tous les Services,", pt: "Todos os Serviços,", de: "Alle Dienste,",
    ar: "جميع الخدمات،", zh: "所有服务，", hi: "सभी सेवाएं,", ja: "すべてのサービス", ko: "모든 서비스,",
    sw: "Huduma Zote,", tr: "Tüm Hizmetler,", ru: "Все Услуги,", id: "Semua Layanan,", th: "บริการทั้งหมด"
  },
  "services.onePlatform": {
    en: "One Platform", es: "Una Plataforma", fr: "Une Plateforme", pt: "Uma Plataforma", de: "Eine Plattform",
    ar: "منصة واحدة", zh: "一个平台", hi: "एक प्लेटफॉर्म", ja: "ワンプラットフォーム", ko: "하나의 플랫폼",
    sw: "Jukwaa Moja", tr: "Tek Platform", ru: "Одна Платформа", id: "Satu Platform", th: "แพลตฟอร์มเดียว"
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
    th: "เช่าโรงแรม ซื้ออสังหาฯ และชำระบิล — ทั้งหมดด้วย Pi"
  },
  "services.chooseService": {
    en: "Choose a Service", es: "Elige un Servicio", fr: "Choisissez un Service", pt: "Escolha um Serviço", de: "Dienst Auswählen",
    ar: "اختر خدمة", zh: "选择服务", hi: "सेवा चुनें", ja: "サービスを選ぶ", ko: "서비스 선택",
    sw: "Chagua Huduma", tr: "Bir Hizmet Seçin", ru: "Выберите Услугу", id: "Pilih Layanan", th: "เลือกบริการ"
  },
  "services.howItWorks": {
    en: "How It Works", es: "Cómo Funciona", fr: "Comment ça Marche", pt: "Como Funciona", de: "So Funktioniert's",
    ar: "كيف يعمل", zh: "如何使用", hi: "यह कैसे काम करता है", ja: "使い方", ko: "이용 방법",
    sw: "Jinsi Inavyofanya Kazi", tr: "Nasıl Çalışır", ru: "Как Это Работает", id: "Cara Kerja", th: "วิธีใช้งาน"
  },
  "services.step01": {
    en: "Choose Service", es: "Elige Servicio", fr: "Choisir Service", pt: "Escolher Serviço", de: "Dienst Wählen",
    ar: "اختر الخدمة", zh: "选择服务", hi: "सेवा चुनें", ja: "サービスを選ぶ", ko: "서비스 선택",
    sw: "Chagua Huduma", tr: "Hizmet Seç", ru: "Выберите Услугу", id: "Pilih Layanan", th: "เลือกบริการ"
  },
  "services.step01Desc": {
    en: "Select from hotels, properties, or bill payment", es: "Selecciona hoteles, propiedades o pago de facturas", fr: "Choisissez parmi hôtels, propriétés ou factures", pt: "Selecione hotéis, propriedades ou pagamento de contas", de: "Wählen Sie Hotels, Immobilien oder Rechnungszahlung",
    ar: "اختر من بين الفنادق أو العقارات أو دفع الفواتير", zh: "从酒店、房产或账单支付中选择", hi: "होटल, संपत्ति, या बिल भुगतान चुनें", ja: "ホテル、物件、請求書から選択", ko: "호텔, 부동산 또는 청구서 선택",
    sw: "Chagua kutoka hoteli, mali au malipo ya bili", tr: "Otellerden, mülklerden veya fatura ödemesinden seçin", ru: "Выберите отели, недвижимость или оплату счетов", id: "Pilih dari hotel, properti, atau pembayaran tagihan", th: "เลือกจากโรงแรม อสังหาฯ หรือชำระบิล"
  },
  "services.step02": {
    en: "Select & Configure", es: "Seleccionar y Configurar", fr: "Sélectionner et Configurer", pt: "Selecionar e Configurar", de: "Auswählen & Konfigurieren",
    ar: "اختر واضبط", zh: "选择和配置", hi: "चुनें और कॉन्फ़िगर करें", ja: "選択して設定", ko: "선택 및 설정",
    sw: "Chagua na Sanidi", tr: "Seç ve Yapılandır", ru: "Выберите и Настройте", id: "Pilih & Atur", th: "เลือกและกำหนดค่า"
  },
  "services.step02Desc": {
    en: "Pick your item, dates, or enter bill details", es: "Elige tu artículo, fechas o ingresa detalles de factura", fr: "Choisissez votre article, dates ou entrez les détails", pt: "Escolha seu item, datas ou insira detalhes da conta", de: "Wählen Sie Ihr Artikel, Daten oder Rechnungsdetails",
    ar: "اختر العنصر أو التواريخ أو أدخل تفاصيل الفاتورة", zh: "选择您的项目、日期或输入账单详情", hi: "अपना आइटम, तिथियां चुनें या बिल विवरण दर्ज करें", ja: "アイテム、日付を選択、または明細を入力", ko: "항목, 날짜를 선택하거나 청구서 세부정보를 입력",
    sw: "Chagua bidhaa yako, tarehe, au ingiza maelezo ya bili", tr: "Öğenizi, tarihleri seçin veya fatura bilgilerini girin", ru: "Выберите товар, даты или введите данные счёта", id: "Pilih item, tanggal, atau masukkan detail tagihan", th: "เลือกรายการ วันที่ หรือกรอกรายละเอียดบิล"
  },
  "services.step03": {
    en: "Pay with Pi", es: "Pagar con Pi", fr: "Payer avec Pi", pt: "Pagar com Pi", de: "Mit Pi Bezahlen",
    ar: "ادفع بـ Pi", zh: "用Pi支付", hi: "Pi से भुगतान करें", ja: "Piで支払う", ko: "Pi로 결제",
    sw: "Lipa kwa Pi", tr: "Pi ile Öde", ru: "Оплатить Pi", id: "Bayar dengan Pi", th: "ชำระด้วย Pi"
  },
  "services.step03Desc": {
    en: "Complete secure payment via Pi Network", es: "Completa el pago seguro por Pi Network", fr: "Effectuez le paiement sécurisé via Pi Network", pt: "Complete o pagamento seguro pela Pi Network", de: "Sichere Zahlung über Pi Network abschließen",
    ar: "أكمل الدفع الآمن عبر Pi Network", zh: "通过Pi Network完成安全支付", hi: "Pi Network के माध्यम से सुरक्षित भुगतान करें", ja: "Pi Networkで安全に決済", ko: "Pi Network을 통해 안전하게 결제",
    sw: "Kamilisha malipo salama kupitia Pi Network", tr: "Pi Network üzerinden güvenli ödemeyi tamamlayın", ru: "Завершите безопасный платёж через Pi Network", id: "Selesaikan pembayaran aman melalui Pi Network", th: "ชำระเงินอย่างปลอดภัยผ่าน Pi Network"
  },
  "services.options": {
    en: "options", es: "opciones", fr: "options", pt: "opções", de: "Optionen",
    ar: "خيارات", zh: "选项", hi: "विकल्प", ja: "オプション", ko: "옵션",
    sw: "chaguzi", tr: "seçenek", ru: "опций", id: "opsi", th: "ตัวเลือก"
  },
  "services.explore": {
    en: "Explore →", es: "Explorar →", fr: "Explorer →", pt: "Explorar →", de: "Entdecken →",
    ar: "استكشاف →", zh: "探索 →", hi: "खोजें →", ja: "探索 →", ko: "탐색 →",
    sw: "Gundua →", tr: "Keşfet →", ru: "Обзор →", id: "Jelajahi →", th: "สำรวจ →"
  },
  "services.totalServices": {
    en: "Total Services", es: "Total Servicios", fr: "Total Services", pt: "Total Serviços", de: "Dienste Gesamt",
    ar: "إجمالي الخدمات", zh: "总服务数", hi: "कुल सेवाएं", ja: "総サービス", ko: "전체 서비스",
    sw: "Jumla ya Huduma", tr: "Toplam Hizmetler", ru: "Всего Услуг", id: "Total Layanan", th: "บริการทั้งหมด"
  },
  "services.hotelsListed": {
    en: "Hotels Listed", es: "Hoteles Listados", fr: "Hôtels Listés", pt: "Hotéis Listados", de: "Hotels Gelistet",
    ar: "الفنادق المدرجة", zh: "上架酒店", hi: "सूचीबद्ध होटल", ja: "掲載ホテル", ko: "등록 호텔",
    sw: "Hoteli Zilizoorodheshwa", tr: "Listelenen Oteller", ru: "Отелей", id: "Hotel Terdaftar", th: "โรงแรมที่ลงทะเบียน"
  },
  "services.properties": {
    en: "Properties", es: "Propiedades", fr: "Propriétés", pt: "Propriedades", de: "Immobilien",
    ar: "عقارات", zh: "房产", hi: "संपत्तियां", ja: "物件", ko: "부동산",
    sw: "Mali", tr: "Mülkler", ru: "Объектов", id: "Properti", th: "อสังหาริมทรัพย์"
  },
  "services.billProviders": {
    en: "Bill Providers", es: "Proveedores de Facturas", fr: "Fournisseurs de Factures", pt: "Provedores de Contas", de: "Rechnungsanbieter",
    ar: "مزودو الفواتير", zh: "账单供应商", hi: "बिल प्रदाता", ja: "請求書プロバイダー", ko: "청구서 제공자",
    sw: "Watoa Bili", tr: "Fatura Sağlayıcılar", ru: "Поставщиков", id: "Penyedia Tagihan", th: "ผู้ให้บริการบิล"
  },

  // ── Footer (shared with layout) ──
  "footer.services": {
    en: "Services", es: "Servicios", fr: "Services", pt: "Serviços", de: "Dienste",
    ar: "خدمات", zh: "服务", hi: "सेवाएं", ja: "サービス", ko: "서비스",
    sw: "Huduma", tr: "Hizmetler", ru: "Услуги", id: "Layanan", th: "บริการ"
  },
  "footer.rentHotel": {
    en: "Rent Hotel", es: "Alquilar Hotel", fr: "Louer Hôtel", pt: "Alugar Hotel", de: "Hotel Mieten",
    ar: "حجز فندق", zh: "预订酒店", hi: "होटल किराये", ja: "ホテルを予約", ko: "호텔 예약",
    sw: "Kodi Hoteli", tr: "Otel Kirala", ru: "Снять Отель", id: "Sewa Hotel", th: "เช่าโรงแรม"
  },
  "footer.buyHome": {
    en: "Buy Home", es: "Comprar Casa", fr: "Acheter Maison", pt: "Comprar Casa", de: "Haus Kaufen",
    ar: "شراء منزل", zh: "购买房屋", hi: "घर खरीदें", ja: "家を購入", ko: "집 구매",
    sw: "Nunua Nyumba", tr: "Ev Satın Al", ru: "Купить Дом", id: "Beli Rumah", th: "ซื้อบ้าน"
  },
  "footer.payBills": {
    en: "Pay Bills", es: "Pagar Facturas", fr: "Payer Factures", pt: "Pagar Contas", de: "Rechnungen Bezahlen",
    ar: "دفع الفواتير", zh: "支付账单", hi: "बिल भुगतान", ja: "請求書を支払う", ko: "청구서 결제",
    sw: "Lipa Bili", tr: "Fatura Öde", ru: "Оплатить Счета", id: "Bayar Tagihan", th: "ชำระบิล"
  },
  "footer.marketplace": {
    en: "Marketplace", es: "Mercado", fr: "Marché", pt: "Mercado", de: "Marktplatz",
    ar: "السوق", zh: "市场", hi: "बाज़ार", ja: "マーケット", ko: "마켓",
    sw: "Soko", tr: "Pazar", ru: "Маркетплейс", id: "Pasar", th: "ตลาด"
  },
  "footer.home": {
    en: "Home", es: "Inicio", fr: "Accueil", pt: "Início", de: "Startseite",
    ar: "الرئيسية", zh: "首页", hi: "होम", ja: "ホーム", ko: "홈",
    sw: "Nyumbani", tr: "Ana Sayfa", ru: "Главная", id: "Beranda", th: "หน้าแรก"
  },
  "footer.explore": {
    en: "Explore", es: "Explorar", fr: "Explorer", pt: "Explorar", de: "Entdecken",
    ar: "استكشاف", zh: "探索", hi: "खोजें", ja: "探索", ko: "탐색",
    sw: "Gundua", tr: "Keşfet", ru: "Обзор", id: "Jelajahi", th: "สำรวจ"
  },
  "footer.sellProduct": {
    en: "Sell Product", es: "Vender Producto", fr: "Vendre Produit", pt: "Vender Produto", de: "Produkt Verkaufen",
    ar: "بيع منتج", zh: "出售产品", hi: "उत्पाद बेचें", ja: "商品を出品", ko: "상품 판매",
    sw: "Uza Bidhaa", tr: "Ürün Sat", ru: "Продать Товар", id: "Jual Produk", th: "ขายสินค้า"
  },
  "footer.registerBusiness": {
    en: "Register Business", es: "Registrar Negocio", fr: "Inscrire Entreprise", pt: "Cadastrar Negócio", de: "Geschäft Registrieren",
    ar: "تسجيل عمل", zh: "注册企业", hi: "व्यवसाय पंजीकरण", ja: "ビジネス登録", ko: "비즈니스 등록",
    sw: "Sajili Biashara", tr: "İşletme Kaydet", ru: "Регистрация Бизнеса", id: "Daftar Bisnis", th: "ลงทะเบียนธุรกิจ"
  },
  "footer.platform": {
    en: "Platform", es: "Plataforma", fr: "Plateforme", pt: "Plataforma", de: "Plattform",
    ar: "المنصة", zh: "平台", hi: "प्लेटफॉर्म", ja: "プラットフォーム", ko: "플랫폼",
    sw: "Jukwaa", tr: "Platform", ru: "Платформа", id: "Platform", th: "แพลตฟอร์ม"
  },
  "footer.allServices": {
    en: "All Services", es: "Todos los Servicios", fr: "Tous les Services", pt: "Todos os Serviços", de: "Alle Dienste",
    ar: "جميع الخدمات", zh: "所有服务", hi: "सभी सेवाएं", ja: "全サービス", ko: "모든 서비스",
    sw: "Huduma Zote", tr: "Tüm Hizmetler", ru: "Все Услуги", id: "Semua Layanan", th: "บริการทั้งหมด"
  },
  "footer.piMarketplace": {
    en: "Pi Marketplace", es: "Mercado Pi", fr: "Marché Pi", pt: "Mercado Pi", de: "Pi-Marktplatz",
    ar: "سوق Pi", zh: "Pi市场", hi: "Pi बाज़ार", ja: "Piマーケット", ko: "Pi 마켓",
    sw: "Soko la Pi", tr: "Pi Pazarı", ru: "Pi Маркетплейс", id: "Pasar Pi", th: "ตลาด Pi"
  },
  "footer.quickRegister": {
    en: "Quick Register", es: "Registro Rápido", fr: "Inscription Rapide", pt: "Cadastro Rápido", de: "Schnell Registrieren",
    ar: "تسجيل سريع", zh: "快速注册", hi: "त्वरित पंजीकरण", ja: "クイック登録", ko: "빠른 등록",
    sw: "Usajili wa Haraka", tr: "Hızlı Kayıt", ru: "Быстрая Регистрация", id: "Daftar Cepat", th: "ลงทะเบียนด่วน"
  },
  "footer.legal": {
    en: "Legal", es: "Legal", fr: "Légal", pt: "Legal", de: "Rechtliches",
    ar: "قانوني", zh: "法律", hi: "कानूनी", ja: "法的事項", ko: "법적 사항",
    sw: "Kisheria", tr: "Yasal", ru: "Правовая Информация", id: "Hukum", th: "กฎหมาย"
  },
  "footer.privacyPolicy": {
    en: "Privacy Policy", es: "Política de Privacidad", fr: "Politique de Confidentialité", pt: "Política de Privacidade", de: "Datenschutzrichtlinie",
    ar: "سياسة الخصوصية", zh: "隐私政策", hi: "गोपनीयता नीति", ja: "プライバシーポリシー", ko: "개인정보 보호정책",
    sw: "Sera ya Faragha", tr: "Gizlilik Politikası", ru: "Политика Конфиденциальности", id: "Kebijakan Privasi", th: "นโยบายความเป็นส่วนตัว"
  },
  "footer.termsOfService": {
    en: "Terms of Service", es: "Términos de Servicio", fr: "Conditions d'Utilisation", pt: "Termos de Serviço", de: "Nutzungsbedingungen",
    ar: "شروط الخدمة", zh: "服务条款", hi: "सेवा की शर्तें", ja: "利用規約", ko: "서비스 약관",
    sw: "Masharti ya Huduma", tr: "Hizmet Şartları", ru: "Условия Использования", id: "Ketentuan Layanan", th: "ข้อกำหนดการให้บริการ"
  },
  "footer.kycPolicy": {
    en: "KYC Policy", es: "Política KYC", fr: "Politique KYC", pt: "Política KYC", de: "KYC-Richtlinie",
    ar: "سياسة KYC", zh: "KYC政策", hi: "KYC नीति", ja: "KYCポリシー", ko: "KYC 정책",
    sw: "Sera ya KYC", tr: "KYC Politikası", ru: "Политика KYC", id: "Kebijakan KYC", th: "นโยบาย KYC"
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
    th: "สร้างสำหรับผู้บุกเบิก ขับเคลื่อนโดย Pi Network"
  },

  // ── Hotels page ──
  "hotels.backToServices": {
    en: "← Services", es: "← Servicios", fr: "← Services", pt: "← Serviços", de: "← Dienste",
    ar: "← خدمات", zh: "← 服务", hi: "← सेवाएं", ja: "← サービス", ko: "← 서비스",
    sw: "← Huduma", tr: "← Hizmetler", ru: "← Услуги", id: "← Layanan", th: "← บริการ"
  },
  "hotels.title": {
    en: "Hotels", es: "Hoteles", fr: "Hôtels", pt: "Hotéis", de: "Hotels",
    ar: "فنادق", zh: "酒店", hi: "होटल", ja: "ホテル", ko: "호텔",
    sw: "Hoteli", tr: "Oteller", ru: "Отели", id: "Hotel", th: "โรงแรม"
  },

  // ── Bills page ──
  "bills.all": {
    en: "All", es: "Todos", fr: "Tous", pt: "Todos", de: "Alle",
    ar: "الكل", zh: "全部", hi: "सभी", ja: "すべて", ko: "전체",
    sw: "Yote", tr: "Tümü", ru: "Все", id: "Semua", th: "ทั้งหมด"
  },
  "bills.electricity": {
    en: "Electricity", es: "Electricidad", fr: "Électricité", pt: "Eletricidade", de: "Strom",
    ar: "كهرباء", zh: "电费", hi: "बिजली", ja: "電気", ko: "전기",
    sw: "Stima", tr: "Elektrik", ru: "Электричество", id: "Listrik", th: "ค่าไฟ"
  },
  "bills.water": {
    en: "Water", es: "Agua", fr: "Eau", pt: "Água", de: "Wasser",
    ar: "ماء", zh: "水费", hi: "पानी", ja: "水道", ko: "수도",
    sw: "Maji", tr: "Su", ru: "Вода", id: "Air", th: "ค่าน้ำ"
  },
  "bills.internet": {
    en: "Internet", es: "Internet", fr: "Internet", pt: "Internet", de: "Internet",
    ar: "إنترنت", zh: "网费", hi: "इंटरनेट", ja: "インターネット", ko: "인터넷",
    sw: "Intaneti", tr: "İnternet", ru: "Интернет", id: "Internet", th: "อินเทอร์เน็ต"
  },
  "bills.tv": {
    en: "TV", es: "TV", fr: "TV", pt: "TV", de: "TV",
    ar: "تلفزيون", zh: "电视费", hi: "टीवी", ja: "TV", ko: "TV",
    sw: "TV", tr: "TV", ru: "ТВ", id: "TV", th: "ทีวี"
  },
  "bills.phone": {
    en: "Phone", es: "Teléfono", fr: "Téléphone", pt: "Telefone", de: "Telefon",
    ar: "هاتف", zh: "电话费", hi: "फोन", ja: "電話", ko: "전화",
    sw: "Simu", tr: "Telefon", ru: "Телефон", id: "Telepon", th: "โทรศัพท์"
  },
  "bills.insurance": {
    en: "Insurance", es: "Seguro", fr: "Assurance", pt: "Seguro", de: "Versicherung",
    ar: "تأمين", zh: "保险", hi: "बीमा", ja: "保険", ko: "보험",
    sw: "Bima", tr: "Sigorta", ru: "Страхование", id: "Asuransi", th: "ประกันภัย"
  },
  // ── Social Feed ──
  "social.title": {
    en: "Business", es: "Negocios", fr: "Affaires", pt: "Negócios", de: "Geschäfts",
    ar: "أعمال", zh: "商业", hi: "व्यापार", ja: "ビジネス", ko: "비즈니스",
    sw: "Biashara", tr: "İş", ru: "Бизнес", id: "Bisnis", th: "ธุรกิจ"
  },
  "social.titleHighlight": {
    en: "Broadcast", es: "Transmisión", fr: "Diffusion", pt: "Transmissão", de: "Übertragung",
    ar: "بث", zh: "广播", hi: "प्रसारण", ja: "ブロードキャスト", ko: "방송",
    sw: "Tangazo", tr: "Yayın", ru: "Трансляция", id: "Siaran", th: "ออกอากาศ"
  },
  "social.subtitle": {
    en: "Share updates, promote products & connect with pioneers worldwide", es: "Comparta actualizaciones y conecte con pioneros", fr: "Partagez des mises à jour et connectez-vous avec des pionniers", pt: "Compartilhe atualizações e conecte-se com pioneiros", de: "Teilen Sie Updates und verbinden Sie sich mit Pionieren",
    ar: "شارك التحديثات وتواصل مع الرواد", zh: "分享更新并与先驱者联系", hi: "अपडेट साझा करें और पायनियर्स से जुड़ें", ja: "アップデートを共有しパイオニアとつながる", ko: "업데이트를 공유하고 파이오니어와 연결하세요",
    sw: "Shiriki masasisho na uunganike na waanzilishi", tr: "Güncellemeleri paylaşın ve öncülerle bağlantı kurun", ru: "Делитесь обновлениями и общайтесь с пионерами", id: "Bagikan pembaruan & terhubung dengan pionir", th: "แบ่งปันอัปเดตและเชื่อมต่อกับผู้บุกเบิก"
  },
  "social.broadcast": {
    en: "Broadcast", es: "Publicar", fr: "Diffuser", pt: "Transmitir", de: "Senden",
    ar: "نشر", zh: "发布", hi: "प्रसारित करें", ja: "配信", ko: "방송",
    sw: "Tangaza", tr: "Yayınla", ru: "Опубликовать", id: "Siarkan", th: "เผยแพร่"
  },
  "social.trending": {
    en: "Trending Topics", es: "Tendencias", fr: "Tendances", pt: "Tendências", de: "Trends",
    ar: "المواضيع الرائجة", zh: "热门话题", hi: "ट्रेंडिंग", ja: "トレンド", ko: "트렌딩",
    sw: "Mwenendo", tr: "Trendler", ru: "Тренды", id: "Trending", th: "กำลังเป็นที่นิยม"
  },
  "social.topPioneers": {
    en: "Top Pioneers", es: "Mejores Pioneros", fr: "Meilleurs Pionniers", pt: "Melhores Pioneiros", de: "Top-Pioniere",
    ar: "أفضل الرواد", zh: "顶尖先驱者", hi: "शीर्ष पायनियर्स", ja: "トップパイオニア", ko: "탑 파이오니어",
    sw: "Waanzilishi Bora", tr: "En İyi Öncüler", ru: "Топ пионеры", id: "Pionir Teratas", th: "ผู้บุกเบิกอันดับต้น"
  },
  "social.communityStats": {
    en: "Community Stats", es: "Estadísticas", fr: "Statistiques", pt: "Estatísticas", de: "Statistiken",
    ar: "إحصائيات المجتمع", zh: "社区统计", hi: "समुदाय आँकड़े", ja: "コミュニティ統計", ko: "커뮤니티 통계",
    sw: "Takwimu za Jamii", tr: "Topluluk İstatistikleri", ru: "Статистика сообщества", id: "Statistik Komunitas", th: "สถิติชุมชน"
  },

  // ── Transport / Ride-Hailing ──
  "nav.transport": {
    en: "Transport", es: "Transporte", fr: "Transport", pt: "Transporte", de: "Transport",
    ar: "النقل", zh: "交通", hi: "परिवहन", ja: "交通", ko: "교통",
    sw: "Usafiri", tr: "Ulaşım", ru: "Транспорт", id: "Transportasi", th: "ขนส่ง"
  },
  "services.transport": {
    en: "Transport & Rides", es: "Transporte y Viajes", fr: "Transport & Trajets", pt: "Transporte & Viagens", de: "Transport & Fahrten",
    ar: "النقل والرحلات", zh: "交通与出行", hi: "परिवहन और सवारी", ja: "交通と乗車", ko: "교통 및 탑승",
    sw: "Usafiri & Safari", tr: "Ulaşım & Yolculuklar", ru: "Транспорт и Поездки", id: "Transportasi & Perjalanan", th: "ขนส่งและการเดินทาง"
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
    th: "จองการเดินทาง แท็กซี่ คนขับ จัดส่ง หรือบิน — ด้วย Pi"
  },
  "transport.title": {
    en: "Transport & Rides", es: "Transporte y Viajes", fr: "Transport & Trajets", pt: "Transporte & Viagens", de: "Transport & Fahrten",
    ar: "النقل والرحلات", zh: "交通与出行", hi: "परिवहन और सवारी", ja: "交通と乗車", ko: "교통 및 탑승",
    sw: "Usafiri & Safari", tr: "Ulaşım & Yolculuklar", ru: "Транспорт и Поездки", id: "Transportasi & Perjalanan", th: "ขนส่งและการเดินทาง"
  },
  "transport.badge": {
    en: "Pay with Pi", es: "Paga con Pi", fr: "Payez avec Pi", pt: "Pague com Pi", de: "Mit Pi bezahlen",
    ar: "ادفع بـ Pi", zh: "用Pi支付", hi: "Pi से भुगतान करें", ja: "Piで支払い", ko: "Pi로 결제",
    sw: "Lipa na Pi", tr: "Pi ile Öde", ru: "Оплата Pi", id: "Bayar dengan Pi", th: "จ่ายด้วย Pi"
  },
  "transport.heroTitle": {
    en: "Your Ride,", es: "Tu Viaje,", fr: "Votre Trajet,", pt: "Sua Viagem,", de: "Ihre Fahrt,",
    ar: "رحلتك،", zh: "您的行程，", hi: "आपकी सवारी,", ja: "あなたの乗車、", ko: "당신의 탑승,",
    sw: "Safari Yako,", tr: "Yolculuğunuz,", ru: "Ваша Поездка,", id: "Perjalanan Anda,", th: "การเดินทางของคุณ,"
  },
  "transport.heroHighlight": {
    en: "Your Way", es: "Tu Camino", fr: "Votre Chemin", pt: "Seu Caminho", de: "Ihr Weg",
    ar: "طريقك", zh: "由你决定", hi: "आपका रास्ता", ja: "あなたのスタイル", ko: "당신의 방식",
    sw: "Njia Yako", tr: "Sizin Yolunuz", ru: "Ваш Путь", id: "Cara Anda", th: "ตามแบบของคุณ"
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
    th: "จองการเดินทางในเมือง แท็กซี่ คนขับ จัดส่ง หรือบิน — ทั้งหมดด้วย Pi"
  },
  "transport.tabRides": {
    en: "City Rides", es: "Viajes Urbanos", fr: "Trajets Urbains", pt: "Viagens Urbanas", de: "Stadtfahrten",
    ar: "رحلات المدينة", zh: "城市出行", hi: "शहर की सवारी", ja: "市内の乗車", ko: "도시 탑승",
    sw: "Safari za Mjini", tr: "Şehir İçi", ru: "Городские", id: "Perjalanan Kota", th: "การเดินทางในเมือง"
  },
  "transport.tabTaxi": {
    en: "Taxi", es: "Taxi", fr: "Taxi", pt: "Táxi", de: "Taxi",
    ar: "تاكسي", zh: "出租车", hi: "टैक्सी", ja: "タクシー", ko: "택시",
    sw: "Teksi", tr: "Taksi", ru: "Такси", id: "Taksi", th: "แท็กซี่"
  },
  "transport.tabDriver": {
    en: "Hire Driver", es: "Contratar Conductor", fr: "Chauffeur Privé", pt: "Contratar Motorista", de: "Fahrer Mieten",
    ar: "استئجار سائق", zh: "雇用司机", hi: "ड्राइवर किराये पर", ja: "運転手を雇う", ko: "드라이버 고용",
    sw: "Ajiri Dereva", tr: "Şoför Kirala", ru: "Нанять Водителя", id: "Sewa Sopir", th: "จ้างคนขับ"
  },
  "transport.tabDelivery": {
    en: "Delivery", es: "Entrega", fr: "Livraison", pt: "Entrega", de: "Lieferung",
    ar: "توصيل", zh: "配送", hi: "डिलीवरी", ja: "配達", ko: "배달",
    sw: "Usafirishaji", tr: "Teslimat", ru: "Доставка", id: "Pengiriman", th: "จัดส่ง"
  },
  "transport.tabAirways": {
    en: "Airways", es: "Aerolíneas", fr: "Aérien", pt: "Aéreo", de: "Fluglinien",
    ar: "طيران", zh: "航空", hi: "एयरवेज", ja: "航空", ko: "항공",
    sw: "Ndege", tr: "Havayolları", ru: "Авиа", id: "Penerbangan", th: "สายการบิน"
  },
  "transport.bookRide": {
    en: "Book Your Ride", es: "Reserva Tu Viaje", fr: "Réservez Votre Trajet", pt: "Reserve Sua Viagem", de: "Fahrt Buchen",
    ar: "احجز رحلتك", zh: "预订行程", hi: "सवारी बुक करें", ja: "乗車を予約", ko: "탑승 예약",
    sw: "Weka Safari", tr: "Yolculuk Ayırt", ru: "Забронировать", id: "Pesan Perjalanan", th: "จองการเดินทาง"
  },
  "transport.pickup": {
    en: "Pickup Location", es: "Punto de Recogida", fr: "Lieu de Prise en Charge", pt: "Local de Embarque", de: "Abholort",
    ar: "موقع الاستلام", zh: "上车地点", hi: "पिकअप स्थान", ja: "乗車場所", ko: "탑승 장소",
    sw: "Mahali pa Kupanda", tr: "Alış Noktası", ru: "Место посадки", id: "Lokasi Jemput", th: "จุดรับ"
  },
  "transport.destination": {
    en: "Destination", es: "Destino", fr: "Destination", pt: "Destino", de: "Ziel",
    ar: "الوجهة", zh: "目的地", hi: "गंतव्य", ja: "目的地", ko: "목적지",
    sw: "Mwisho", tr: "Varış", ru: "Пункт назначения", id: "Tujuan", th: "จุดหมาย"
  },
  "transport.dateTime": {
    en: "Date & Time", es: "Fecha y Hora", fr: "Date et Heure", pt: "Data e Hora", de: "Datum & Zeit",
    ar: "التاريخ والوقت", zh: "日期与时间", hi: "दिनांक और समय", ja: "日時", ko: "날짜 및 시간",
    sw: "Tarehe na Saa", tr: "Tarih & Saat", ru: "Дата и Время", id: "Tanggal & Waktu", th: "วันที่และเวลา"
  },
  "transport.passengers": {
    en: "Passengers", es: "Pasajeros", fr: "Passagers", pt: "Passageiros", de: "Passagiere",
    ar: "الركاب", zh: "乘客", hi: "यात्री", ja: "乗客", ko: "승객",
    sw: "Abiria", tr: "Yolcular", ru: "Пассажиры", id: "Penumpang", th: "ผู้โดยสาร"
  },
  "transport.findRides": {
    en: "Find Available Rides", es: "Buscar Viajes", fr: "Trouver des Trajets", pt: "Encontrar Viagens", de: "Fahrten Finden",
    ar: "ابحث عن رحلات", zh: "查找可用行程", hi: "उपलब्ध सवारी खोजें", ja: "利用可能な乗車を探す", ko: "이용 가능한 탑승 찾기",
    sw: "Tafuta Safari", tr: "Müsait Seferleri Bul", ru: "Найти Поездки", id: "Cari Perjalanan", th: "ค้นหาการเดินทาง"
  },
  "transport.becomeDriver": {
    en: "Become a Driver Agent", es: "Conviértete en Conductor", fr: "Devenez Chauffeur", pt: "Seja um Motorista", de: "Fahrer Werden",
    ar: "كن وكيل سائق", zh: "成为司机代理", hi: "ड्राइवर एजेंट बनें", ja: "ドライバーエージェントになる", ko: "드라이버 에이전트 되기",
    sw: "Kuwa Wakala wa Dereva", tr: "Sürücü Ajanı Ol", ru: "Стать водителем", id: "Jadi Agen Sopir", th: "เป็นตัวแทนคนขับ"
  },
  "transport.driverDesc": {
    en: "Join thousands of drivers earning Pi on every ride.", es: "Únete a miles de conductores ganando Pi.", fr: "Rejoignez des milliers de chauffeurs gagnant des Pi.", pt: "Junte-se a milhares de motoristas ganhando Pi.", de: "Verdienen Sie Pi als Fahrer.",
    ar: "انضم لآلاف السائقين واكسب Pi.", zh: "加入数千名司机，每次出行赚取Pi。", hi: "हज़ारों ड्राइवरों से जुड़ें और Pi कमाएँ।", ja: "数千人のドライバーとPiを稼ごう。", ko: "수천 명의 드라이버와 함께 Pi를 벌어보세요.",
    sw: "Jiunge na maelfu ya madereva wanaopata Pi.", tr: "Binlerce sürücüyle Pi kazanın.", ru: "Зарабатывайте Pi за каждую поездку.", id: "Bergabung dengan ribuan sopir yang menghasilkan Pi.", th: "เข้าร่วมกับคนขับหลายพันคนที่ได้รับ Pi"
  },
  "transport.applyNow": {
    en: "Apply Now", es: "Aplica Ahora", fr: "Postuler", pt: "Inscreva-se", de: "Jetzt Bewerben",
    ar: "تقدم الآن", zh: "立即申请", hi: "अभी आवेदन करें", ja: "今すぐ応募", ko: "지금 신청",
    sw: "Omba Sasa", tr: "Şimdi Başvur", ru: "Подать заявку", id: "Daftar Sekarang", th: "สมัครเลย"
  },
  "transport.searchFlights": {
    en: "Search Flights", es: "Buscar Vuelos", fr: "Rechercher des Vols", pt: "Buscar Voos", de: "Flüge Suchen",
    ar: "ابحث عن رحلات طيران", zh: "搜索航班", hi: "उड़ानें खोजें", ja: "フライト検索", ko: "항공편 검색",
    sw: "Tafuta Ndege", tr: "Uçuş Ara", ru: "Поиск Рейсов", id: "Cari Penerbangan", th: "ค้นหาเที่ยวบิน"
  },
  "transport.howItWorks": {
    en: "How It Works", es: "Cómo Funciona", fr: "Comment Ça Marche", pt: "Como Funciona", de: "So Funktioniert Es",
    ar: "كيف يعمل", zh: "如何使用", hi: "कैसे काम करता है", ja: "使い方", ko: "이용 방법",
    sw: "Jinsi Inavyofanya Kazi", tr: "Nasıl Çalışır", ru: "Как Работает", id: "Cara Kerja", th: "วิธีการทำงาน"
  },
  "transport.activeDrivers": {
    en: "Active Drivers", es: "Conductores Activos", fr: "Chauffeurs Actifs", pt: "Motoristas Ativos", de: "Aktive Fahrer",
    ar: "سائقون نشطون", zh: "活跃司机", hi: "सक्रिय ड्राइवर", ja: "アクティブドライバー", ko: "활동 드라이버",
    sw: "Madereva Hai", tr: "Aktif Sürücüler", ru: "Активных водителей", id: "Sopir Aktif", th: "คนขับที่ใช้งาน"
  },
  "transport.citiesCovered": {
    en: "Cities Covered", es: "Ciudades Cubiertas", fr: "Villes Couvertes", pt: "Cidades Cobertas", de: "Abgedeckte Städte",
    ar: "مدن مغطاة", zh: "覆盖城市", hi: "शहर कवर किए गए", ja: "対応都市", ko: "서비스 도시",
    sw: "Miji Inayohudumiwa", tr: "Kapsanan Şehirler", ru: "Городов", id: "Kota Tercakup", th: "เมืองที่ครอบคลุม"
  },
  "transport.airlines": {
    en: "Partner Airlines", es: "Aerolíneas Asociadas", fr: "Compagnies Partenaires", pt: "Companhias Parceiras", de: "Partner-Fluglinien",
    ar: "شركات طيران شريكة", zh: "合作航空公司", hi: "साझेदार एयरलाइंस", ja: "提携航空会社", ko: "제휴 항공사",
    sw: "Mashirika ya Ndege", tr: "Ortak Havayolları", ru: "Авиакомпаний", id: "Maskapai Mitra", th: "สายการบินพันธมิตร"
  },
  "transport.avgRating": {
    en: "Avg Rating", es: "Calificación Promedio", fr: "Note Moyenne", pt: "Avaliação Média", de: "Durchschnittsbewertung",
    ar: "متوسط التقييم", zh: "平均评分", hi: "औसत रेटिंग", ja: "平均評価", ko: "평균 평점",
    sw: "Kiwango cha Wastani", tr: "Ort. Puan", ru: "Средний рейтинг", id: "Rating Rata-rata", th: "คะแนนเฉลี่ย"
  },
  "transport.bookFlight": {
    en: "Book Flight", es: "Reservar Vuelo", fr: "Réserver Vol", pt: "Reservar Voo", de: "Flug Buchen",
    ar: "احجز رحلة طيران", zh: "预订航班", hi: "उड़ान बुक करें", ja: "フライト予約", ko: "항공편 예약",
    sw: "Weka Ndege", tr: "Uçuş Ayırt", ru: "Забронировать рейс", id: "Pesan Penerbangan", th: "จองเที่ยวบิน"
  },
  "transport.from": {
    en: "From", es: "Desde", fr: "De", pt: "De", de: "Von",
    ar: "من", zh: "从", hi: "से", ja: "出発", ko: "출발",
    sw: "Kutoka", tr: "Nereden", ru: "Откуда", id: "Dari", th: "จาก"
  },
  "transport.perPerson": {
    en: "per person", es: "por persona", fr: "par personne", pt: "por pessoa", de: "pro Person",
    ar: "لكل شخص", zh: "每人", hi: "प्रति व्यक्ति", ja: "一人あたり", ko: "1인당",
    sw: "kwa mtu", tr: "kişi başı", ru: "за человека", id: "per orang", th: "ต่อคน"
  },
  "transport.transportRoutes": {
    en: "Transport Routes", es: "Rutas de Transporte", fr: "Itinéraires de Transport", pt: "Rotas de Transporte", de: "Transportrouten",
    ar: "طرق النقل", zh: "交通路线", hi: "परिवहन मार्ग", ja: "輸送ルート", ko: "운송 경로",
    sw: "Njia za Usafiri", tr: "Ulaşım Güzergahları", ru: "Маршруты", id: "Rute Transportasi", th: "เส้นทางขนส่ง"
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
