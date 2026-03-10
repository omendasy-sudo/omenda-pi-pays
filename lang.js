/**
 * Omenda Pi Pays — Multi-Language Support
 * 15 languages for global coverage
 */
(function () {
  "use strict";

  const LANG_KEY = "omenda_lang";

  const languages = {
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

  const T = {
    // ── Navigation ──
    "nav.marketplace": {
      en: "Marketplace", es: "Mercado", fr: "Marché", pt: "Mercado", de: "Marktplatz",
      ar: "السوق", zh: "市场", hi: "बाज़ार", ja: "マーケット", ko: "마켓플레이스",
      sw: "Soko", tr: "Pazar", ru: "Маркетплейс", id: "Pasar", th: "ตลาด"
    },
    "nav.explore": {
      en: "Explore", es: "Explorar", fr: "Explorer", pt: "Explorar", de: "Entdecken",
      ar: "استكشاف", zh: "探索", hi: "खोजें", ja: "探索", ko: "탐색",
      sw: "Gundua", tr: "Keşfet", ru: "Обзор", id: "Jelajahi", th: "สำรวจ"
    },
    "nav.map": {
      en: "Map", es: "Mapa", fr: "Carte", pt: "Mapa", de: "Karte",
      ar: "خريطة", zh: "地图", hi: "नक्शा", ja: "マップ", ko: "지도",
      sw: "Ramani", tr: "Harita", ru: "Карта", id: "Peta", th: "แผนที่"
    },
    "nav.social": {
      en: "Social", es: "Social", fr: "Social", pt: "Social", de: "Sozial",
      ar: "اجتماعي", zh: "社交", hi: "सोशल", ja: "ソーシャル", ko: "소셜",
      sw: "Jamii", tr: "Sosyal", ru: "Соцсети", id: "Sosial", th: "โซเชียล"
    },
    "nav.register": {
      en: "Register", es: "Registro", fr: "Inscription", pt: "Cadastro", de: "Registrieren",
      ar: "تسجيل", zh: "注册", hi: "पंजीकरण", ja: "登録", ko: "등록",
      sw: "Jisajili", tr: "Kayıt", ru: "Регистрация", id: "Daftar", th: "ลงทะเบียน"
    },
    "nav.sell": {
      en: "Sell", es: "Vender", fr: "Vendre", pt: "Vender", de: "Verkaufen",
      ar: "بيع", zh: "出售", hi: "बेचें", ja: "出品", ko: "판매",
      sw: "Uza", tr: "Sat", ru: "Продать", id: "Jual", th: "ขาย"
    },
    "nav.services": {
      en: "Services", es: "Servicios", fr: "Services", pt: "Serviços", de: "Dienste",
      ar: "خدمات", zh: "服务", hi: "सेवाएं", ja: "サービス", ko: "서비스",
      sw: "Huduma", tr: "Hizmetler", ru: "Услуги", id: "Layanan", th: "บริการ"
    },
    "nav.home": {
      en: "Home", es: "Inicio", fr: "Accueil", pt: "Início", de: "Startseite",
      ar: "الرئيسية", zh: "首页", hi: "होम", ja: "ホーム", ko: "홈",
      sw: "Nyumbani", tr: "Ana Sayfa", ru: "Главная", id: "Beranda", th: "หน้าแรก"
    },
    "nav.connectPi": {
      en: "Login with Pi", es: "Conectar Pi", fr: "Connecter Pi", pt: "Conectar Pi", de: "Pi verbinden",
      ar: "ربط Pi", zh: "连接 Pi", hi: "Pi जोड़ें", ja: "Pi接続", ko: "Pi 연결",
      sw: "Unganisha Pi", tr: "Pi Bağla", ru: "Подключить Pi", id: "Hubungkan Pi", th: "เชื่อมต่อ Pi"
    },

    // ── Hero / Home ──
    "hero.badge": {
      en: "Pi Mainnet is Live", es: "Pi Mainnet está Activa", fr: "Pi Mainnet est en Ligne", pt: "Pi Mainnet está Ativa", de: "Pi Mainnet ist Live",
      ar: "شبكة Pi الرئيسية مباشرة", zh: "Pi 主网已上线", hi: "Pi मेननेट लाइव है", ja: "Piメインネット稼働中", ko: "Pi 메인넷 가동 중",
      sw: "Pi Mainnet iko Hai", tr: "Pi Mainnet Yayında", ru: "Pi Mainnet запущен", id: "Pi Mainnet Aktif", th: "Pi Mainnet เปิดใช้งานแล้ว"
    },
    "hero.title": {
      en: "Trade Globally with", es: "Comercia Globalmente con", fr: "Commerce Mondial avec", pt: "Negocie Globalmente com", de: "Weltweit Handeln mit",
      ar: "تداول عالمياً مع", zh: "全球交易", hi: "वैश्विक व्यापार करें", ja: "世界中で取引", ko: "전 세계에서 거래하세요",
      sw: "Fanya Biashara Duniani na", tr: "Küresel Ticaret Yap", ru: "Торгуйте Глобально с", id: "Berdagang Global dengan", th: "ค้าขายทั่วโลกด้วย"
    },
    "hero.subtitle": {
      en: "A secure, decentralized marketplace for pioneers. Buy and sell premium products using Pi cryptocurrency.",
      es: "Un mercado descentralizado y seguro para pioneros. Compra y vende productos premium con Pi.",
      fr: "Un marché décentralisé et sécurisé pour les pionniers. Achetez et vendez avec la cryptomonnaie Pi.",
      pt: "Um marketplace descentralizado e seguro para pioneiros. Compre e venda produtos premium com Pi.",
      de: "Ein sicherer, dezentraler Marktplatz für Pioniere. Kaufen und verkaufen Sie mit Pi-Kryptowährung.",
      ar: "سوق لامركزي وآمن للرواد. اشترِ وبع المنتجات المتميزة باستخدام عملة Pi.",
      zh: "安全的去中心化先驱者市场。使用Pi加密货币买卖优质产品。",
      hi: "पायनियर्स के लिए एक सुरक्षित, विकेंद्रीकृत बाज़ार। Pi से खरीदें और बेचें।",
      ja: "パイオニアのための安全な分散型マーケットプレイス。Pi暗号通貨で売買。",
      ko: "개척자를 위한 안전한 탈중앙화 마켓플레이스. Pi 암호화폐로 거래하세요.",
      sw: "Soko salama na la kisasa kwa waanzilishi. Nunua na uze bidhaa kwa Pi.",
      tr: "Öncüler için güvenli, merkeziyetsiz pazar. Pi ile alım satım yapın.",
      ru: "Безопасный децентрализованный маркетплейс для пионеров. Покупайте и продавайте за Pi.",
      id: "Pasar terdesentralisasi yang aman untuk perintis. Jual beli dengan kripto Pi.",
      th: "ตลาดกระจายศูนย์ที่ปลอดภัยสำหรับผู้บุกเบิก ซื้อขายด้วย Pi"
    },
    "hero.searchPlaceholder": {
      en: "Search products, categories...", es: "Buscar productos, categorías...", fr: "Rechercher produits, catégories...", pt: "Pesquisar produtos, categorias...", de: "Produkte, Kategorien suchen...",
      ar: "بحث عن منتجات، فئات...", zh: "搜索产品、类别...", hi: "उत्पाद, श्रेणियां खोजें...", ja: "商品、カテゴリを検索...", ko: "상품, 카테고리 검색...",
      sw: "Tafuta bidhaa, kategoria...", tr: "Ürün, kategori ara...", ru: "Поиск товаров, категорий...", id: "Cari produk, kategori...", th: "ค้นหาสินค้า หมวดหมู่..."
    },
    "hero.search": {
      en: "Search", es: "Buscar", fr: "Rechercher", pt: "Pesquisar", de: "Suchen",
      ar: "بحث", zh: "搜索", hi: "खोजें", ja: "検索", ko: "검색",
      sw: "Tafuta", tr: "Ara", ru: "Поиск", id: "Cari", th: "ค้นหา"
    },

    // ── Stats ──
    "stats.activePioneers": {
      en: "Active Pioneers", es: "Pioneros Activos", fr: "Pionniers Actifs", pt: "Pioneiros Ativos", de: "Aktive Pioniere",
      ar: "رواد نشطون", zh: "活跃先驱者", hi: "सक्रिय पायनियर्स", ja: "アクティブパイオニア", ko: "활성 파이오니어",
      sw: "Waanzilishi Hai", tr: "Aktif Öncüler", ru: "Активные Пионеры", id: "Perintis Aktif", th: "ผู้บุกเบิกที่ใช้งาน"
    },
    "stats.productsListed": {
      en: "Products Listed", es: "Productos Listados", fr: "Produits Listés", pt: "Produtos Listados", de: "Gelistete Produkte",
      ar: "منتجات معروضة", zh: "上架产品", hi: "सूचीबद्ध उत्पाद", ja: "掲載商品数", ko: "등록 상품",
      sw: "Bidhaa Zilizoorodheshwa", tr: "Listelenen Ürünler", ru: "Товаров в Каталоге", id: "Produk Terdaftar", th: "สินค้าที่ลงทะเบียน"
    },
    "stats.livePiRate": {
      en: "Live Pi Rate", es: "Tasa Pi en Vivo", fr: "Taux Pi en Direct", pt: "Taxa Pi ao Vivo", de: "Pi-Live-Kurs",
      ar: "سعر Pi المباشر", zh: "Pi实时汇率", hi: "Pi लाइव दर", ja: "Piライブレート", ko: "Pi 실시간 시세",
      sw: "Bei ya Pi Sasa", tr: "Canlı Pi Kuru", ru: "Курс Pi Сейчас", id: "Kurs Pi Langsung", th: "อัตรา Pi สด"
    },
    "stats.successRate": {
      en: "Success Rate", es: "Tasa de Éxito", fr: "Taux de Réussite", pt: "Taxa de Sucesso", de: "Erfolgsrate",
      ar: "معدل النجاح", zh: "成功率", hi: "सफलता दर", ja: "成功率", ko: "성공률",
      sw: "Kiwango cha Mafanikio", tr: "Başarı Oranı", ru: "Уровень Успеха", id: "Tingkat Keberhasilan", th: "อัตราสำเร็จ"
    },

    // ── Products ──
    "products.featured": {
      en: "Featured Products", es: "Productos Destacados", fr: "Produits en Vedette", pt: "Produtos em Destaque", de: "Empfohlene Produkte",
      ar: "منتجات مميزة", zh: "精选产品", hi: "विशेष उत्पाद", ja: "注目の商品", ko: "추천 상품",
      sw: "Bidhaa Bora", tr: "Öne Çıkan Ürünler", ru: "Рекомендуемые Товары", id: "Produk Unggulan", th: "สินค้าแนะนำ"
    },
    "products.all": {
      en: "All", es: "Todos", fr: "Tous", pt: "Todos", de: "Alle",
      ar: "الكل", zh: "全部", hi: "सभी", ja: "すべて", ko: "전체",
      sw: "Yote", tr: "Tümü", ru: "Все", id: "Semua", th: "ทั้งหมด"
    },
    "products.electronics": {
      en: "Electronics", es: "Electrónica", fr: "Électronique", pt: "Eletrônicos", de: "Elektronik",
      ar: "إلكترونيات", zh: "电子产品", hi: "इलेक्ट्रॉनिक्स", ja: "電子機器", ko: "전자제품",
      sw: "Elektroniki", tr: "Elektronik", ru: "Электроника", id: "Elektronik", th: "อิเล็กทรอนิกส์"
    },
    "products.fashion": {
      en: "Fashion", es: "Moda", fr: "Mode", pt: "Moda", de: "Mode",
      ar: "أزياء", zh: "时尚", hi: "फैशन", ja: "ファッション", ko: "패션",
      sw: "Mitindo", tr: "Moda", ru: "Мода", id: "Fashion", th: "แฟชั่น"
    },
    "products.digital": {
      en: "Digital", es: "Digital", fr: "Numérique", pt: "Digital", de: "Digital",
      ar: "رقمي", zh: "数字", hi: "डिजिटल", ja: "デジタル", ko: "디지털",
      sw: "Dijitali", tr: "Dijital", ru: "Цифровые", id: "Digital", th: "ดิจิทัล"
    },
    "products.homeCategory": {
      en: "Home", es: "Hogar", fr: "Maison", pt: "Casa", de: "Zuhause",
      ar: "منزل", zh: "家居", hi: "घर", ja: "ホーム", ko: "홈",
      sw: "Nyumba", tr: "Ev", ru: "Дом", id: "Rumah", th: "บ้าน"
    },
    "products.beauty": {
      en: "Beauty", es: "Belleza", fr: "Beauté", pt: "Beleza", de: "Schönheit",
      ar: "جمال", zh: "美容", hi: "सौंदर्य", ja: "ビューティー", ko: "뷰티",
      sw: "Urembo", tr: "Güzellik", ru: "Красота", id: "Kecantikan", th: "ความงาม"
    },
    "products.sports": {
      en: "Sports", es: "Deportes", fr: "Sports", pt: "Esportes", de: "Sport",
      ar: "رياضة", zh: "运动", hi: "खेल", ja: "スポーツ", ko: "스포츠",
      sw: "Michezo", tr: "Spor", ru: "Спорт", id: "Olahraga", th: "กีฬา"
    },
    "products.food": {
      en: "Food", es: "Comida", fr: "Nourriture", pt: "Alimentos", de: "Lebensmittel",
      ar: "طعام", zh: "食品", hi: "खाना", ja: "食品", ko: "식품",
      sw: "Chakula", tr: "Yiyecek", ru: "Еда", id: "Makanan", th: "อาหาร"
    },
    "products.buyWithPi": {
      en: "Buy with Pi", es: "Comprar con Pi", fr: "Acheter avec Pi", pt: "Comprar com Pi", de: "Mit Pi kaufen",
      ar: "شراء بـ Pi", zh: "用Pi购买", hi: "Pi से खरीदें", ja: "Piで購入", ko: "Pi로 구매",
      sw: "Nunua kwa Pi", tr: "Pi ile Satın Al", ru: "Купить за Pi", id: "Beli dengan Pi", th: "ซื้อด้วย Pi"
    },

    // ── CTA ──
    "cta.title": {
      en: "Start Selling with Pi Today", es: "Empieza a Vender con Pi Hoy", fr: "Commencez à Vendre avec Pi", pt: "Comece a Vender com Pi Hoje", de: "Beginnen Sie Heute mit Pi zu Verkaufen",
      ar: "ابدأ البيع بـ Pi اليوم", zh: "今天开始用Pi销售", hi: "आज ही Pi से बिक्री शुरू करें", ja: "今日からPiで販売を始めよう", ko: "오늘부터 Pi로 판매하세요",
      sw: "Anza Kuuza na Pi Leo", tr: "Bugün Pi ile Satışa Başla", ru: "Начните Продавать за Pi Сегодня", id: "Mulai Jual dengan Pi Hari Ini", th: "เริ่มขายด้วย Pi วันนี้"
    },
    "cta.subtitle": {
      en: "Join thousands of pioneers already trading on Omenda Pi Pays. Register your business and list your products.",
      es: "Únete a miles de pioneros que ya comercian en Omenda Pi Pays. Registra tu negocio y publica tus productos.",
      fr: "Rejoignez des milliers de pionniers sur Omenda Pi Pays. Inscrivez votre entreprise et listez vos produits.",
      pt: "Junte-se a milhares de pioneiros na Omenda Pi Pays. Cadastre seu negócio e liste seus produtos.",
      de: "Schließen Sie sich Tausenden von Pionieren auf Omenda Pi Pays an. Registrieren Sie Ihr Unternehmen.",
      ar: "انضم إلى آلاف الرواد في Omenda Pi Pays. سجل عملك وأدرج منتجاتك.",
      zh: "加入数千名已在Omenda Pi Pays交易的先驱者。注册您的企业并上架产品。",
      hi: "Omenda Pi Pays पर पहले से व्यापार कर रहे हज़ारों पायनियर्स से जुड़ें।",
      ja: "すでにOmenda Pi Paysで取引している数千のパイオニアに参加しましょう。",
      ko: "이미 Omenda Pi Pays에서 거래 중인 수천 명의 파이오니어와 함께하세요.",
      sw: "Jiunge na maelfu ya waanzilishi wanaofanya biashara kwenye Omenda Pi Pays.",
      tr: "Omenda Pi Pays'te ticaret yapan binlerce öncüye katılın.",
      ru: "Присоединяйтесь к тысячам пионеров на Omenda Pi Pays.",
      id: "Bergabunglah dengan ribuan perintis di Omenda Pi Pays.",
      th: "เข้าร่วมกับผู้บุกเบิกหลายพันคนบน Omenda Pi Pays"
    },
    "cta.registerBusiness": {
      en: "Register Your Business", es: "Registra tu Negocio", fr: "Inscrivez votre Entreprise", pt: "Cadastre seu Negócio", de: "Unternehmen Registrieren",
      ar: "سجل عملك", zh: "注册您的企业", hi: "अपना व्यवसाय पंजीकृत करें", ja: "ビジネスを登録", ko: "비즈니스 등록",
      sw: "Sajili Biashara Yako", tr: "İşletmenizi Kaydedin", ru: "Зарегистрировать Бизнес", id: "Daftarkan Bisnis Anda", th: "ลงทะเบียนธุรกิจ"
    },

    // ── Map Page ──
    "map.title": {
      en: "Global", es: "Mapa", fr: "Carte", pt: "Mapa", de: "Globale",
      ar: "خريطة", zh: "全球", hi: "वैश्विक", ja: "グローバル", ko: "글로벌",
      sw: "Ramani ya", tr: "Küresel", ru: "Глобальная", id: "Peta", th: "แผนที่"
    },
    "map.titleHighlight": {
      en: "Pioneer Map", es: "de Pioneros", fr: "des Pionniers", pt: "dos Pioneiros", de: "Pionier-Karte",
      ar: "الرواد العالمية", zh: "先驱者地图", hi: "पायनियर मानचित्र", ja: "パイオニアマップ", ko: "파이오니어 지도",
      sw: "Waanzilishi Dunia", tr: "Öncü Haritası", ru: "Карта Пионеров", id: "Perintis Global", th: "ผู้บุกเบิกทั่วโลก"
    },
    "map.subtitle": {
      en: "Discover pioneers, businesses & services accepting Pi worldwide",
      es: "Descubre pioneros, negocios y servicios que aceptan Pi en todo el mundo",
      fr: "Découvrez les pionniers, entreprises et services acceptant Pi dans le monde",
      pt: "Descubra pioneiros, negócios e serviços que aceitam Pi no mundo",
      de: "Entdecken Sie Pioniere, Unternehmen und Dienste, die Pi weltweit akzeptieren",
      ar: "اكتشف الرواد والأعمال والخدمات التي تقبل Pi حول العالم",
      zh: "发现全球接受Pi的先驱者、企业和服务",
      hi: "दुनिया भर में Pi स्वीकार करने वाले पायनियर्स, व्यवसायों और सेवाओं की खोज करें",
      ja: "世界中のPi対応パイオニア、ビジネス、サービスを発見",
      ko: "전 세계에서 Pi를 받는 파이오니어, 비즈니스, 서비스를 찾아보세요",
      sw: "Gundua waanzilishi, biashara na huduma zinazokubali Pi duniani kote",
      tr: "Dünya genelinde Pi kabul eden öncüleri, işletmeleri ve hizmetleri keşfedin",
      ru: "Откройте для себя пионеров, бизнес и сервисы, принимающие Pi по всему миру",
      id: "Temukan perintis, bisnis & layanan yang menerima Pi di seluruh dunia",
      th: "ค้นพบผู้บุกเบิก ธุรกิจ และบริการที่รับ Pi ทั่วโลก"
    },
    "map.pioneers": {
      en: "Pioneers", es: "Pioneros", fr: "Pionniers", pt: "Pioneiros", de: "Pioniere",
      ar: "رواد", zh: "先驱者", hi: "पायनियर्स", ja: "パイオニア", ko: "파이오니어",
      sw: "Waanzilishi", tr: "Öncüler", ru: "Пионеры", id: "Perintis", th: "ผู้บุกเบิก"
    },
    "map.businesses": {
      en: "Businesses", es: "Negocios", fr: "Entreprises", pt: "Negócios", de: "Unternehmen",
      ar: "أعمال", zh: "企业", hi: "व्यवसाय", ja: "ビジネス", ko: "비즈니스",
      sw: "Biashara", tr: "İşletmeler", ru: "Бизнес", id: "Bisnis", th: "ธุรกิจ"
    },
    "map.servicesLabel": {
      en: "Services", es: "Servicios", fr: "Services", pt: "Serviços", de: "Dienste",
      ar: "خدمات", zh: "服务", hi: "सेवाएं", ja: "サービス", ko: "서비스",
      sw: "Huduma", tr: "Hizmetler", ru: "Услуги", id: "Layanan", th: "บริการ"
    },
    "map.nearby": {
      en: "Nearby", es: "Cercanos", fr: "À proximité", pt: "Próximos", de: "In der Nähe",
      ar: "قريب", zh: "附近", hi: "पास में", ja: "近くの", ko: "근처",
      sw: "Karibu", tr: "Yakınlarda", ru: "Поблизости", id: "Terdekat", th: "ใกล้เคียง"
    },
    "map.results": {
      en: "results", es: "resultados", fr: "résultats", pt: "resultados", de: "Ergebnisse",
      ar: "نتائج", zh: "结果", hi: "परिणाम", ja: "件", ko: "결과",
      sw: "matokeo", tr: "sonuç", ru: "результатов", id: "hasil", th: "ผลลัพธ์"
    },
    "map.searchPlaceholder": {
      en: "Search by name, city...", es: "Buscar por nombre, ciudad...", fr: "Rechercher par nom, ville...", pt: "Pesquisar por nome, cidade...", de: "Nach Name, Stadt suchen...",
      ar: "بحث بالاسم، المدينة...", zh: "按名称、城市搜索...", hi: "नाम, शहर से खोजें...", ja: "名前、都市で検索...", ko: "이름, 도시로 검색...",
      sw: "Tafuta kwa jina, mji...", tr: "İsim, şehir ile ara...", ru: "Поиск по имени, городу...", id: "Cari berdasarkan nama, kota...", th: "ค้นหาตามชื่อ เมือง..."
    },
    "map.hotels": {
      en: "Hotels", es: "Hoteles", fr: "Hôtels", pt: "Hotéis", de: "Hotels",
      ar: "فنادق", zh: "酒店", hi: "होटल", ja: "ホテル", ko: "호텔",
      sw: "Hoteli", tr: "Oteller", ru: "Отели", id: "Hotel", th: "โรงแรม"
    },
    "map.realEstate": {
      en: "Real Estate", es: "Inmobiliaria", fr: "Immobilier", pt: "Imóveis", de: "Immobilien",
      ar: "عقارات", zh: "房地产", hi: "रियल एस्टेट", ja: "不動産", ko: "부동산",
      sw: "Mali Isiyohamishika", tr: "Gayrimenkul", ru: "Недвижимость", id: "Properti", th: "อสังหาริมทรัพย์"
    },
    "map.billPay": {
      en: "Bill Pay", es: "Pago de Facturas", fr: "Paiement", pt: "Pagamento", de: "Rechnungen",
      ar: "دفع الفواتير", zh: "账单支付", hi: "बिल भुगतान", ja: "請求書支払い", ko: "청구서 결제",
      sw: "Lipa Bili", tr: "Fatura Öde", ru: "Оплата Счетов", id: "Bayar Tagihan", th: "ชำระบิล"
    },
    "map.noResults": {
      en: "No results found", es: "No se encontraron resultados", fr: "Aucun résultat trouvé", pt: "Nenhum resultado encontrado", de: "Keine Ergebnisse gefunden",
      ar: "لم يتم العثور على نتائج", zh: "未找到结果", hi: "कोई परिणाम नहीं मिला", ja: "結果が見つかりません", ko: "결과 없음",
      sw: "Hakuna matokeo", tr: "Sonuç bulunamadı", ru: "Ничего не найдено", id: "Tidak ada hasil", th: "ไม่พบผลลัพธ์"
    },

    // ── Map Regions ──
    "region.europe": {
      en: "Europe", es: "Europa", fr: "Europe", pt: "Europa", de: "Europa",
      ar: "أوروبا", zh: "欧洲", hi: "यूरोप", ja: "ヨーロッパ", ko: "유럽",
      sw: "Ulaya", tr: "Avrupa", ru: "Европа", id: "Eropa", th: "ยุโรป"
    },
    "region.asiaPacific": {
      en: "Asia Pacific", es: "Asia Pacífico", fr: "Asie Pacifique", pt: "Ásia Pacífico", de: "Asien-Pazifik",
      ar: "آسيا والمحيط الهادئ", zh: "亚太地区", hi: "एशिया प्रशांत", ja: "アジア太平洋", ko: "아시아 태평양",
      sw: "Asia Pasifiki", tr: "Asya Pasifik", ru: "Азия", id: "Asia Pasifik", th: "เอเชียแปซิฟิก"
    },
    "region.americas": {
      en: "Americas", es: "Américas", fr: "Amériques", pt: "Américas", de: "Amerikas",
      ar: "الأمريكتين", zh: "美洲", hi: "अमेरिका", ja: "アメリカ", ko: "아메리카",
      sw: "Marekani", tr: "Amerikalar", ru: "Америка", id: "Amerika", th: "อเมริกา"
    },
    "region.africa": {
      en: "Africa", es: "África", fr: "Afrique", pt: "África", de: "Afrika",
      ar: "أفريقيا", zh: "非洲", hi: "अफ्रीका", ja: "アフリカ", ko: "아프리카",
      sw: "Afrika", tr: "Afrika", ru: "Африка", id: "Afrika", th: "แอฟริกา"
    },
    "region.europeSub": {
      en: "Leading in Pi merchant adoption", es: "Líder en adopción de comerciantes Pi", fr: "Leader en adoption marchande Pi", pt: "Líder em adoção de comerciantes Pi", de: "Führend bei Pi-Händler-Adoption",
      ar: "رائدة في اعتماد تجار Pi", zh: "Pi商家采用领先", hi: "Pi व्यापारी अपनाने में अग्रणी", ja: "Pi加盟店導入をリード", ko: "Pi 가맹점 채택 선도",
      sw: "Inayoongoza katika kupokea Pi", tr: "Pi ticaret kabulünde lider", ru: "Лидер по принятию Pi", id: "Terdepan adopsi pedagang Pi", th: "นำในการรับ Pi"
    },
    "region.asiaSub": {
      en: "Fastest growing Pi community", es: "Comunidad Pi de más rápido crecimiento", fr: "Communauté Pi à la croissance la plus rapide", pt: "Comunidade Pi com crescimento mais rápido", de: "Schnellst wachsende Pi-Community",
      ar: "أسرع مجتمع Pi نموًا", zh: "增长最快的Pi社区", hi: "सबसे तेज़ी से बढ़ता Pi समुदाय", ja: "最も成長の速いPiコミュニティ", ko: "가장 빠르게 성장하는 Pi 커뮤니티",
      sw: "Jumuiya ya Pi inayokua haraka", tr: "En hızlı büyüyen Pi topluluğu", ru: "Быстрорастущее сообщество Pi", id: "Komunitas Pi tercepat bertumbuh", th: "ชุมชน Pi ที่เติบโตเร็วที่สุด"
    },
    "region.americasSub": {
      en: "Strong enterprise Pi integration", es: "Fuerte integración empresarial de Pi", fr: "Forte intégration Pi en entreprise", pt: "Forte integração empresarial de Pi", de: "Starke Pi-Unternehmensintegration",
      ar: "تكامل مؤسسي قوي مع Pi", zh: "强大的企业Pi整合", hi: "मजबूत एंटरप्राइज Pi एकीकरण", ja: "強力な企業Pi統合", ko: "강력한 기업 Pi 통합",
      sw: "Muunganisho imara wa Pi", tr: "Güçlü kurumsal Pi entegrasyonu", ru: "Сильная корпоративная интеграция Pi", id: "Integrasi Pi perusahaan kuat", th: "การบูรณาการ Pi ระดับองค์กร"
    },
    "region.africaSub": {
      en: "Emerging Pi payment ecosystem", es: "Ecosistema de pagos Pi emergente", fr: "Écosystème de paiement Pi émergent", pt: "Ecossistema de pagamentos Pi emergente", de: "Aufstrebendes Pi-Zahlungs-Ökosystem",
      ar: "نظام دفع Pi ناشئ", zh: "新兴Pi支付生态系统", hi: "उभरता Pi भुगतान पारिस्थितिकी तंत्र", ja: "成長するPi決済エコシステム", ko: "새로운 Pi 결제 생태계",
      sw: "Mfumo unaojitokeza wa malipo ya Pi", tr: "Gelişen Pi ödeme ekosistemi", ru: "Развивающаяся экосистема платежей Pi", id: "Ekosistem pembayaran Pi berkembang", th: "ระบบนิเวศการชำระเงิน Pi ที่เกิดใหม่"
    },

    // ── Footer ──
    "footer.marketplace": {
      en: "Marketplace", es: "Mercado", fr: "Marché", pt: "Mercado", de: "Marktplatz",
      ar: "السوق", zh: "市场", hi: "बाज़ार", ja: "マーケット", ko: "마켓",
      sw: "Soko", tr: "Pazar", ru: "Маркетплейс", id: "Pasar", th: "ตลาด"
    },
    "footer.exploreProducts": {
      en: "Explore Products", es: "Explorar Productos", fr: "Explorer les Produits", pt: "Explorar Produtos", de: "Produkte Entdecken",
      ar: "استكشاف المنتجات", zh: "探索产品", hi: "उत्पाद खोजें", ja: "商品を探す", ko: "상품 탐색",
      sw: "Tafuta Bidhaa", tr: "Ürünleri Keşfet", ru: "Обзор Товаров", id: "Jelajahi Produk", th: "สำรวจสินค้า"
    },
    "footer.sellers": {
      en: "Sellers", es: "Vendedores", fr: "Vendeurs", pt: "Vendedores", de: "Verkäufer",
      ar: "البائعون", zh: "卖家", hi: "विक्रेता", ja: "出品者", ko: "판매자",
      sw: "Wauzaji", tr: "Satıcılar", ru: "Продавцы", id: "Penjual", th: "ผู้ขาย"
    },
    "footer.postProduct": {
      en: "Post Product", es: "Publicar Producto", fr: "Publier un Produit", pt: "Publicar Produto", de: "Produkt Veröffentlichen",
      ar: "نشر منتج", zh: "发布产品", hi: "उत्पाद पोस्ट करें", ja: "商品を掲載", ko: "상품 등록",
      sw: "Chapisha Bidhaa", tr: "Ürün Yayınla", ru: "Опубликовать Товар", id: "Posting Produk", th: "โพสต์สินค้า"
    },
    "footer.quickRegistration": {
      en: "Quick Registration", es: "Registro Rápido", fr: "Inscription Rapide", pt: "Cadastro Rápido", de: "Schnell Registrieren",
      ar: "تسجيل سريع", zh: "快速注册", hi: "त्वरित पंजीकरण", ja: "クイック登録", ko: "빠른 등록",
      sw: "Usajili wa Haraka", tr: "Hızlı Kayıt", ru: "Быстрая Регистрация", id: "Pendaftaran Cepat", th: "ลงทะเบียนด่วน"
    },
    "footer.allServices": {
      en: "All Services", es: "Todos los Servicios", fr: "Tous les Services", pt: "Todos os Serviços", de: "Alle Dienste",
      ar: "جميع الخدمات", zh: "所有服务", hi: "सभी सेवाएं", ja: "全サービス", ko: "모든 서비스",
      sw: "Huduma Zote", tr: "Tüm Hizmetler", ru: "Все Услуги", id: "Semua Layanan", th: "บริการทั้งหมด"
    },
    "footer.rentHotel": {
      en: "Rent Hotel", es: "Alquilar Hotel", fr: "Louer un Hôtel", pt: "Alugar Hotel", de: "Hotel Mieten",
      ar: "حجز فندق", zh: "预订酒店", hi: "होटल किराये", ja: "ホテルを予約", ko: "호텔 예약",
      sw: "Kodi Hoteli", tr: "Otel Kirala", ru: "Снять Отель", id: "Sewa Hotel", th: "เช่าโรงแรม"
    },
    "footer.buyHome": {
      en: "Buy Home", es: "Comprar Casa", fr: "Acheter une Maison", pt: "Comprar Casa", de: "Haus Kaufen",
      ar: "شراء منزل", zh: "购买房屋", hi: "घर खरीदें", ja: "家を購入", ko: "집 구매",
      sw: "Nunua Nyumba", tr: "Ev Satın Al", ru: "Купить Дом", id: "Beli Rumah", th: "ซื้อบ้าน"
    },
    "footer.payBills": {
      en: "Pay Bills", es: "Pagar Facturas", fr: "Payer les Factures", pt: "Pagar Contas", de: "Rechnungen Bezahlen",
      ar: "دفع الفواتير", zh: "支付账单", hi: "बिल भुगतान", ja: "請求書を支払う", ko: "청구서 결제",
      sw: "Lipa Bili", tr: "Fatura Öde", ru: "Оплатить Счета", id: "Bayar Tagihan", th: "ชำระบิล"
    },
    "footer.community": {
      en: "Community", es: "Comunidad", fr: "Communauté", pt: "Comunidade", de: "Gemeinschaft",
      ar: "المجتمع", zh: "社区", hi: "समुदाय", ja: "コミュニティ", ko: "커뮤니티",
      sw: "Jumuiya", tr: "Topluluk", ru: "Сообщество", id: "Komunitas", th: "ชุมชน"
    },
    "footer.globalMap": {
      en: "Global Map", es: "Mapa Global", fr: "Carte Mondiale", pt: "Mapa Global", de: "Globale Karte",
      ar: "خريطة عالمية", zh: "全球地图", hi: "वैश्विक नक्शा", ja: "グローバルマップ", ko: "글로벌 지도",
      sw: "Ramani ya Dunia", tr: "Küresel Harita", ru: "Глобальная Карта", id: "Peta Global", th: "แผนที่โลก"
    },
    "footer.mobileView": {
      en: "Mobile View", es: "Vista Móvil", fr: "Vue Mobile", pt: "Vista Mobile", de: "Mobile Ansicht",
      ar: "عرض الجوال", zh: "移动视图", hi: "मोबाइल दृश्य", ja: "モバイル表示", ko: "모바일 보기",
      sw: "Mwonekano wa Simu", tr: "Mobil Görünüm", ru: "Мобильный Вид", id: "Tampilan Mobile", th: "มุมมองมือถือ"
    },
    "footer.sdkSandbox": {
      en: "SDK Sandbox", es: "Sandbox SDK", fr: "Sandbox SDK", pt: "Sandbox SDK", de: "SDK-Sandbox",
      ar: "بيئة SDK", zh: "SDK沙盒", hi: "SDK सैंडबॉक्स", ja: "SDKサンドボックス", ko: "SDK 샌드박스",
      sw: "SDK Sandbox", tr: "SDK Sandbox", ru: "SDK Песочница", id: "SDK Sandbox", th: "SDK Sandbox"
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

    // ── Forms ──
    "form.title": {
      en: "Register Your Business", es: "Registra tu Negocio", fr: "Inscrivez votre Entreprise", pt: "Cadastre seu Negócio", de: "Unternehmen Registrieren",
      ar: "سجل عملك", zh: "注册您的企业", hi: "अपना व्यवसाय पंजीकृत करें", ja: "ビジネスを登録", ko: "비즈니스 등록",
      sw: "Sajili Biashara Yako", tr: "İşletmenizi Kaydedin", ru: "Зарегистрировать Бизнес", id: "Daftarkan Bisnis Anda", th: "ลงทะเบียนธุรกิจ"
    },
    "form.submit": {
      en: "Submit", es: "Enviar", fr: "Soumettre", pt: "Enviar", de: "Absenden",
      ar: "إرسال", zh: "提交", hi: "जमा करें", ja: "送信", ko: "제출",
      sw: "Wasilisha", tr: "Gönder", ru: "Отправить", id: "Kirim", th: "ส่ง"
    },

    // ── Sell page ──
    "sell.title": {
      en: "List Your Product", es: "Publica tu Producto", fr: "Listez votre Produit", pt: "Liste seu Produto", de: "Produkt Listen",
      ar: "أدرج منتجك", zh: "发布您的产品", hi: "अपना उत्पाद लिस्ट करें", ja: "商品を出品", ko: "상품 등록",
      sw: "Orodhesha Bidhaa Yako", tr: "Ürününüzü Listeleyin", ru: "Разместить Товар", id: "Daftarkan Produk Anda", th: "ลงรายการสินค้า"
    },

    // ── Explore / new.html ──
    "explore.title": {
      en: "Explore the Pi Marketplace", es: "Explora el Mercado Pi", fr: "Explorez le Marché Pi", pt: "Explore o Mercado Pi", de: "Pi-Marktplatz Entdecken",
      ar: "استكشف سوق Pi", zh: "探索Pi市场", hi: "Pi बाज़ार खोजें", ja: "Piマーケットを探索", ko: "Pi 마켓 탐색",
      sw: "Gundua Soko la Pi", tr: "Pi Pazarını Keşfet", ru: "Изучите Маркетплейс Pi", id: "Jelajahi Pasar Pi", th: "สำรวจตลาด Pi"
    },

    // ── Type labels ──
    "type.pioneer": {
      en: "Pioneer", es: "Pionero", fr: "Pionnier", pt: "Pioneiro", de: "Pionier",
      ar: "رائد", zh: "先驱者", hi: "पायनियर", ja: "パイオニア", ko: "파이오니어",
      sw: "Mwanzilishi", tr: "Öncü", ru: "Пионер", id: "Perintis", th: "ผู้บุกเบิก"
    },
    "type.business": {
      en: "Business", es: "Negocio", fr: "Entreprise", pt: "Negócio", de: "Unternehmen",
      ar: "عمل", zh: "企业", hi: "व्यवसाय", ja: "ビジネス", ko: "비즈니스",
      sw: "Biashara", tr: "İşletme", ru: "Бизнес", id: "Bisnis", th: "ธุรกิจ"
    },
    "type.service": {
      en: "Service", es: "Servicio", fr: "Service", pt: "Serviço", de: "Dienst",
      ar: "خدمة", zh: "服务", hi: "सेवा", ja: "サービス", ko: "서비스",
      sw: "Huduma", tr: "Hizmet", ru: "Сервис", id: "Layanan", th: "บริการ"
    },

    // ── General / Shared ──
    "general.users": {
      en: "users", es: "usuarios", fr: "utilisateurs", pt: "usuários", de: "Benutzer",
      ar: "مستخدمون", zh: "用户", hi: "उपयोगकर्ता", ja: "ユーザー", ko: "사용자",
      sw: "watumiaji", tr: "kullanıcı", ru: "пользователей", id: "pengguna", th: "ผู้ใช้"
    },
    "general.txns": {
      en: "txns", es: "transacciones", fr: "transactions", pt: "transações", de: "Transaktionen",
      ar: "معاملات", zh: "交易", hi: "लेनदेन", ja: "取引", ko: "거래",
      sw: "miamala", tr: "işlem", ru: "транзакций", id: "transaksi", th: "ธุรกรรม"
    },
    "general.privacy": {
      en: "Privacy", es: "Privacidad", fr: "Confidentialité", pt: "Privacidade", de: "Datenschutz",
      ar: "الخصوصية", zh: "隐私", hi: "गोपनीयता", ja: "プライバシー", ko: "개인정보",
      sw: "Faragha", tr: "Gizlilik", ru: "Конфиденциальность", id: "Privasi", th: "ความเป็นส่วนตัว"
    },
    "general.terms": {
      en: "Terms", es: "Términos", fr: "Conditions", pt: "Termos", de: "Bedingungen",
      ar: "الشروط", zh: "条款", hi: "शर्तें", ja: "規約", ko: "약관",
      sw: "Masharti", tr: "Şartlar", ru: "Условия", id: "Ketentuan", th: "ข้อกำหนด"
    },
    "general.openInPiBrowser": {
      en: "Please open in Pi Browser", es: "Abra en Pi Browser", fr: "Ouvrez dans Pi Browser", pt: "Abra no Pi Browser", de: "Bitte im Pi Browser öffnen",
      ar: "افتح في متصفح Pi", zh: "请在Pi浏览器中打开", hi: "Pi ब्राउज़र में खोलें", ja: "Pi Browserで開いてください", ko: "Pi 브라우저에서 열어주세요",
      sw: "Fungua katika Pi Browser", tr: "Lütfen Pi Browser'da açın", ru: "Откройте в Pi Browser", id: "Buka di Pi Browser", th: "กรุณาเปิดใน Pi Browser"
    },

    // ── Explore Page (new.html) ──
    "explore.discoverShop": {
      en: "Discover & Shop with", es: "Descubre y Compra con", fr: "Découvrez et Achetez avec", pt: "Descubra e Compre com", de: "Entdecken & Einkaufen mit",
      ar: "اكتشف وتسوق مع", zh: "探索并购物", hi: "खोजें और खरीदें", ja: "発見して購入", ko: "발견하고 쇼핑하세요",
      sw: "Gundua na Nunua kwa", tr: "Keşfet ve Alışveriş Yap", ru: "Откройте и Покупайте с", id: "Temukan & Belanja dengan", th: "ค้นพบและช้อปด้วย"
    },
    "explore.shopSubtitle": {
      en: "Browse thousands of products from verified sellers worldwide. Pay securely with your Pi wallet.",
      es: "Explora miles de productos de vendedores verificados en todo el mundo. Paga de forma segura con tu billetera Pi.",
      fr: "Parcourez des milliers de produits de vendeurs vérifiés dans le monde entier. Payez en toute sécurité avec votre portefeuille Pi.",
      pt: "Navegue por milhares de produtos de vendedores verificados em todo o mundo. Pague com segurança com sua carteira Pi.",
      de: "Durchsuchen Sie Tausende von Produkten verifizierter Verkäufer weltweit. Bezahlen Sie sicher mit Ihrer Pi-Wallet.",
      ar: "تصفح آلاف المنتجات من بائعين موثقين حول العالم. ادفع بأمان بمحفظة Pi.",
      zh: "浏览来自全球认证卖家的数千种产品。使用Pi钱包安全支付。",
      hi: "दुनिया भर के सत्यापित विक्रेताओं के हज़ारों उत्पाद ब्राउज़ करें। Pi वॉलेट से सुरक्षित भुगतान करें।",
      ja: "世界中の認証済み出品者の製品をブラウズ。Piウォレットで安全に支払い。",
      ko: "전 세계 인증된 판매자의 수천 개 상품을 둘러보세요. Pi 지갑으로 안전하게 결제하세요.",
      sw: "Vinjari maelfu ya bidhaa kutoka wauzaji waliothibitishwa duniani kote. Lipa salama na mkoba wako wa Pi.",
      tr: "Dünyanın dört bir yanındaki doğrulanmış satıcılardan binlerce ürünü keşfedin. Pi cüzdanınızla güvenle ödeyin.",
      ru: "Просматривайте тысячи товаров от проверенных продавцов. Платите безопасно с Pi-кошелька.",
      id: "Jelajahi ribuan produk dari penjual terverifikasi di seluruh dunia. Bayar aman dengan dompet Pi.",
      th: "เรียกดูสินค้าหลายพันรายการจากผู้ขายที่ตรวจสอบแล้วทั่วโลก ชำระเงินอย่างปลอดภัยด้วยกระเป๋า Pi"
    },
    "explore.browseCategories": {
      en: "Browse Categories", es: "Explorar Categorías", fr: "Parcourir les Catégories", pt: "Navegar Categorias", de: "Kategorien Durchsuchen",
      ar: "تصفح الفئات", zh: "浏览分类", hi: "श्रेणियां ब्राउज़ करें", ja: "カテゴリを見る", ko: "카테고리 탐색",
      sw: "Vinjari Kategoria", tr: "Kategorilere Göz At", ru: "Обзор Категорий", id: "Jelajahi Kategori", th: "เรียกดูหมวดหมู่"
    },
    "explore.fashionSection": {
      en: "Fashion & Accessories", es: "Moda y Accesorios", fr: "Mode et Accessoires", pt: "Moda e Acessórios", de: "Mode & Accessoires",
      ar: "أزياء وإكسسوارات", zh: "时尚与配饰", hi: "फैशन और एक्सेसरीज़", ja: "ファッション＆アクセサリー", ko: "패션 & 액세서리",
      sw: "Mitindo na Vifaa", tr: "Moda ve Aksesuarlar", ru: "Мода и Аксессуары", id: "Fashion & Aksesori", th: "แฟชั่นและเครื่องประดับ"
    },
    "explore.electronicsSection": {
      en: "Electronics & Gadgets", es: "Electrónica y Gadgets", fr: "Électronique et Gadgets", pt: "Eletrônicos e Gadgets", de: "Elektronik & Gadgets",
      ar: "إلكترونيات وأجهزة", zh: "电子产品与小工具", hi: "इलेक्ट्रॉनिक्स और गैजेट्स", ja: "電子機器＆ガジェット", ko: "전자제품 & 가젯",
      sw: "Elektroniki na Vifaa", tr: "Elektronik ve Cihazlar", ru: "Электроника и Гаджеты", id: "Elektronik & Gadget", th: "อิเล็กทรอนิกส์และแกดเจ็ต"
    },
    "explore.digitalProducts": {
      en: "Digital Products", es: "Productos Digitales", fr: "Produits Numériques", pt: "Produtos Digitais", de: "Digitale Produkte",
      ar: "منتجات رقمية", zh: "数字产品", hi: "डिजिटल उत्पाद", ja: "デジタル製品", ko: "디지털 상품",
      sw: "Bidhaa za Dijitali", tr: "Dijital Ürünler", ru: "Цифровые Товары", id: "Produk Digital", th: "ผลิตภัณฑ์ดิจิทัล"
    },
    "explore.homeLiving": {
      en: "Home & Living", es: "Hogar y Vida", fr: "Maison et Vie", pt: "Casa e Vida", de: "Wohnen & Leben",
      ar: "منزل ومعيشة", zh: "家居生活", hi: "होम और लिविंग", ja: "ホーム＆リビング", ko: "홈 & 리빙",
      sw: "Nyumba na Maisha", tr: "Ev ve Yaşam", ru: "Дом и Жизнь", id: "Rumah & Kehidupan", th: "บ้านและการใช้ชีวิต"
    },
    "explore.beautyHealth": {
      en: "Beauty & Health", es: "Belleza y Salud", fr: "Beauté et Santé", pt: "Beleza e Saúde", de: "Schönheit & Gesundheit",
      ar: "جمال وصحة", zh: "美容与健康", hi: "सौंदर्य और स्वास्थ्य", ja: "ビューティー＆ヘルス", ko: "뷰티 & 건강",
      sw: "Urembo na Afya", tr: "Güzellik ve Sağlık", ru: "Красота и Здоровье", id: "Kecantikan & Kesehatan", th: "ความงามและสุขภาพ"
    },
    "explore.sportsOutdoors": {
      en: "Sports & Outdoors", es: "Deportes y Aire Libre", fr: "Sports et Plein Air", pt: "Esportes e Ao Ar Livre", de: "Sport & Outdoor",
      ar: "رياضة وهواء طلق", zh: "运动与户外", hi: "खेल और आउटडोर", ja: "スポーツ＆アウトドア", ko: "스포츠 & 아웃도어",
      sw: "Michezo na Nje", tr: "Spor ve Açık Hava", ru: "Спорт и Отдых", id: "Olahraga & Outdoor", th: "กีฬาและกิจกรรมกลางแจ้ง"
    },
    "explore.foodGroceries": {
      en: "Food & Groceries", es: "Comida y Comestibles", fr: "Nourriture et Épicerie", pt: "Alimentos e Mercearia", de: "Lebensmittel & Einkauf",
      ar: "طعام وبقالة", zh: "食品与杂货", hi: "खाना और किराना", ja: "食品＆食料品", ko: "식품 & 식료품",
      sw: "Chakula na Vyakula", tr: "Yiyecek ve Market", ru: "Еда и Продукты", id: "Makanan & Belanja", th: "อาหารและของชำ"
    },
    "explore.payNow": {
      en: "Pay Now", es: "Pagar Ahora", fr: "Payer", pt: "Pagar Agora", de: "Jetzt Bezahlen",
      ar: "ادفع الآن", zh: "立即支付", hi: "अभी भुगतान करें", ja: "今すぐ支払う", ko: "지금 결제",
      sw: "Lipa Sasa", tr: "Şimdi Öde", ru: "Оплатить", id: "Bayar Sekarang", th: "ชำระเงินตอนนี้"
    },
    "explore.viewAll": {
      en: "View All", es: "Ver Todo", fr: "Voir Tout", pt: "Ver Tudo", de: "Alle Anzeigen",
      ar: "عرض الكل", zh: "查看全部", hi: "सभी देखें", ja: "すべて表示", ko: "모두 보기",
      sw: "Tazama Yote", tr: "Hepsini Gör", ru: "Показать Все", id: "Lihat Semua", th: "ดูทั้งหมด"
    },
    "explore.securePayments": {
      en: "Secure Payments", es: "Pagos Seguros", fr: "Paiements Sécurisés", pt: "Pagamentos Seguros", de: "Sichere Zahlungen",
      ar: "مدفوعات آمنة", zh: "安全支付", hi: "सुरक्षित भुगतान", ja: "安全な決済", ko: "안전한 결제",
      sw: "Malipo Salama", tr: "Güvenli Ödemeler", ru: "Безопасные Платежи", id: "Pembayaran Aman", th: "การชำระเงินที่ปลอดภัย"
    },
    "explore.kycVerified": {
      en: "KYC Verified", es: "KYC Verificado", fr: "KYC Vérifié", pt: "KYC Verificado", de: "KYC Verifiziert",
      ar: "تحقق KYC", zh: "KYC已验证", hi: "KYC सत्यापित", ja: "KYC認証済み", ko: "KYC 인증",
      sw: "KYC Imethibitishwa", tr: "KYC Doğrulanmış", ru: "KYC Верификация", id: "KYC Terverifikasi", th: "ยืนยัน KYC แล้ว"
    },
    "explore.globalShipping": {
      en: "Global Shipping", es: "Envío Global", fr: "Livraison Mondiale", pt: "Envio Global", de: "Weltweiter Versand",
      ar: "شحن عالمي", zh: "全球配送", hi: "वैश्विक शिपिंग", ja: "グローバル配送", ko: "글로벌 배송",
      sw: "Usafirishaji Duniani", tr: "Küresel Kargo", ru: "Мировая Доставка", id: "Pengiriman Global", th: "จัดส่งทั่วโลก"
    },
    "explore.support": {
      en: "24/7 Support", es: "Soporte 24/7", fr: "Support 24/7", pt: "Suporte 24/7", de: "24/7 Support",
      ar: "دعم 24/7", zh: "24/7支持", hi: "24/7 सहायता", ja: "24時間サポート", ko: "24/7 지원",
      sw: "Msaada 24/7", tr: "7/24 Destek", ru: "Поддержка 24/7", id: "Dukungan 24/7", th: "สนับสนุน 24/7"
    },
    "explore.postProduct": {
      en: "Post a Product", es: "Publicar un Producto", fr: "Publier un Produit", pt: "Publicar um Produto", de: "Produkt Veröffentlichen",
      ar: "نشر منتج", zh: "发布产品", hi: "उत्पाद पोस्ट करें", ja: "商品を投稿", ko: "상품 게시",
      sw: "Chapisha Bidhaa", tr: "Ürün Yayınla", ru: "Опубликовать Товар", id: "Posting Produk", th: "โพสต์สินค้า"
    },
    "explore.searchSellers": {
      en: "Search products, sellers, categories...", es: "Buscar productos, vendedores, categorías...", fr: "Rechercher produits, vendeurs, catégories...", pt: "Pesquisar produtos, vendedores, categorias...", de: "Produkte, Verkäufer, Kategorien suchen...",
      ar: "بحث عن منتجات، بائعين، فئات...", zh: "搜索产品、卖家、类别...", hi: "उत्पाद, विक्रेता, श्रेणियां खोजें...", ja: "商品、出品者、カテゴリを検索...", ko: "상품, 판매자, 카테고리 검색...",
      sw: "Tafuta bidhaa, wauzaji, kategoria...", tr: "Ürün, satıcı, kategori ara...", ru: "Поиск товаров, продавцов, категорий...", id: "Cari produk, penjual, kategori...", th: "ค้นหาสินค้า ผู้ขาย หมวดหมู่..."
    },

    // ── Sell Page (Submit.html) ──
    "sell.postTitle": {
      en: "Post a Product", es: "Publicar un Producto", fr: "Publier un Produit", pt: "Publicar um Produto", de: "Produkt Veröffentlichen",
      ar: "نشر منتج", zh: "发布产品", hi: "उत्पाद पोस्ट करें", ja: "商品を投稿", ko: "상품 게시",
      sw: "Chapisha Bidhaa", tr: "Ürün Yayınla", ru: "Опубликовать Товар", id: "Posting Produk", th: "โพสต์สินค้า"
    },
    "sell.postSubtitle": {
      en: "List your product on the marketplace. Upload photos, set your Pi price, and start selling.",
      es: "Lista tu producto en el mercado. Sube fotos, establece tu precio en Pi y empieza a vender.",
      fr: "Listez votre produit sur le marché. Téléchargez des photos, définissez votre prix en Pi et commencez à vendre.",
      pt: "Liste seu produto no marketplace. Envie fotos, defina seu preço em Pi e comece a vender.",
      de: "Listen Sie Ihr Produkt auf dem Marktplatz. Laden Sie Fotos hoch, setzen Sie Ihren Pi-Preis und beginnen Sie zu verkaufen.",
      ar: "أدرج منتجك في السوق. ارفع الصور، حدد سعر Pi، وابدأ البيع.",
      zh: "在市场上发布您的产品。上传照片，设置Pi价格，开始销售。",
      hi: "मार्केटप्लेस पर अपना उत्पाद लिस्ट करें। फ़ोटो अपलोड करें, Pi मूल्य सेट करें और बिक्री शुरू करें।",
      ja: "マーケットプレイスに商品を出品。写真をアップロード、Pi価格を設定して販売開始。",
      ko: "마켓플레이스에 상품을 등록하세요. 사진을 업로드하고, Pi 가격을 설정하고, 판매를 시작하세요.",
      sw: "Orodhesha bidhaa yako sokoni. Pakia picha, weka bei ya Pi na uanze kuuza.",
      tr: "Ürününüzü pazarda listeleyin. Fotoğraf yükleyin, Pi fiyatını belirleyin ve satışa başlayın.",
      ru: "Разместите товар на маркетплейсе. Загрузите фото, установите цену в Pi и начните продавать.",
      id: "Daftarkan produk Anda di pasar. Unggah foto, tetapkan harga Pi, dan mulai berjualan.",
      th: "ลงสินค้าบนตลาด อัปโหลดรูปภาพ ตั้งราคา Pi และเริ่มขาย"
    },
    "sell.productPhotos": {
      en: "Product Photos", es: "Fotos del Producto", fr: "Photos du Produit", pt: "Fotos do Produto", de: "Produktfotos",
      ar: "صور المنتج", zh: "产品照片", hi: "उत्पाद फ़ोटो", ja: "商品写真", ko: "상품 사진",
      sw: "Picha za Bidhaa", tr: "Ürün Fotoğrafları", ru: "Фото Товара", id: "Foto Produk", th: "รูปสินค้า"
    },
    "sell.productDetails": {
      en: "Product Details", es: "Detalles del Producto", fr: "Détails du Produit", pt: "Detalhes do Produto", de: "Produktdetails",
      ar: "تفاصيل المنتج", zh: "产品详情", hi: "उत्पाद विवरण", ja: "商品詳細", ko: "상품 상세",
      sw: "Maelezo ya Bidhaa", tr: "Ürün Detayları", ru: "Детали Товара", id: "Detail Produk", th: "รายละเอียดสินค้า"
    },
    "sell.publishProduct": {
      en: "Publish Product", es: "Publicar Producto", fr: "Publier le Produit", pt: "Publicar Produto", de: "Produkt Veröffentlichen",
      ar: "نشر المنتج", zh: "发布产品", hi: "उत्पाद प्रकाशित करें", ja: "商品を公開", ko: "상품 게시",
      sw: "Chapisha Bidhaa", tr: "Ürünü Yayınla", ru: "Опубликовать Товар", id: "Publikasikan Produk", th: "เผยแพร่สินค้า"
    },

    // ── Success Page ──
    "success.title": {
      en: "Submitted Successfully!", es: "¡Enviado con Éxito!", fr: "Soumis avec Succès !", pt: "Enviado com Sucesso!", de: "Erfolgreich Eingereicht!",
      ar: "تم الإرسال بنجاح!", zh: "提交成功！", hi: "सफलतापूर्वक सबमिट किया गया!", ja: "送信成功！", ko: "제출 완료!",
      sw: "Imetumwa Kwa Mafanikio!", tr: "Başarıyla Gönderildi!", ru: "Успешно Отправлено!", id: "Berhasil Dikirim!", th: "ส่งสำเร็จ!"
    },
    "success.subtitle": {
      en: "Your product has been received and is now under review. It will appear on the marketplace once approved by our team.",
      es: "Tu producto ha sido recibido y está en revisión. Aparecerá en el mercado una vez aprobado por nuestro equipo.",
      fr: "Votre produit a été reçu et est en cours de vérification. Il apparaîtra sur le marché une fois approuvé.",
      pt: "Seu produto foi recebido e está em análise. Aparecerá no marketplace após aprovação.",
      de: "Ihr Produkt wurde empfangen und wird überprüft. Es wird nach Genehmigung auf dem Marktplatz erscheinen.",
      ar: "تم استلام منتجك وهو قيد المراجعة. سيظهر في السوق بعد الموافقة.",
      zh: "您的产品已收到，正在审核中。审核通过后将显示在市场上。",
      hi: "आपका उत्पाद प्राप्त हो गया है और समीक्षा में है। हमारी टीम द्वारा स्वीकृत होने पर यह मार्केटप्लेस पर दिखाई देगा।",
      ja: "商品は受け付けられ、現在審査中です。承認後にマーケットプレイスに表示されます。",
      ko: "상품이 접수되었으며 검토 중입니다. 팀의 승인 후 마켓플레이스에 표시됩니다.",
      sw: "Bidhaa yako imepokelewa na inakaguliwa. Itaonekana sokoni baada ya kupitishwa na timu yetu.",
      tr: "Ürününüz alındı ve inceleniyor. Ekibimiz tarafından onaylandıktan sonra pazarda görünecektir.",
      ru: "Ваш товар получен и находится на рассмотрении. Он появится на маркетплейсе после одобрения.",
      id: "Produk Anda telah diterima dan sedang ditinjau. Akan muncul di pasar setelah disetujui tim kami.",
      th: "สินค้าของคุณได้รับแล้วและอยู่ระหว่างการตรวจสอบ จะปรากฏบนตลาดเมื่อทีมของเราอนุมัติ"
    },
    "success.postAnother": {
      en: "Post Another Product", es: "Publicar Otro Producto", fr: "Publier un Autre Produit", pt: "Publicar Outro Produto", de: "Weiteres Produkt Veröffentlichen",
      ar: "نشر منتج آخر", zh: "发布另一个产品", hi: "एक और उत्पाद पोस्ट करें", ja: "別の商品を投稿", ko: "다른 상품 게시",
      sw: "Chapisha Bidhaa Nyingine", tr: "Başka Ürün Yayınla", ru: "Опубликовать Ещё", id: "Posting Produk Lagi", th: "โพสต์สินค้าอื่น"
    },
    "success.browseMarketplace": {
      en: "Browse Marketplace", es: "Explorar Mercado", fr: "Parcourir le Marché", pt: "Explorar Mercado", de: "Marktplatz Durchsuchen",
      ar: "تصفح السوق", zh: "浏览市场", hi: "बाज़ार देखें", ja: "マーケットを見る", ko: "마켓 둘러보기",
      sw: "Vinjari Soko", tr: "Pazarı Gez", ru: "Обзор Маркетплейса", id: "Jelajahi Pasar", th: "เรียกดูตลาด"
    },

    // ── Resources ──
    "footer.resources": {
      en: "Resources", es: "Recursos", fr: "Ressources", pt: "Recursos", de: "Ressourcen",
      ar: "موارد", zh: "资源", hi: "संसाधन", ja: "リソース", ko: "리소스",
      sw: "Rasilimali", tr: "Kaynaklar", ru: "Ресурсы", id: "Sumber Daya", th: "ทรัพยากร"
    },
    "footer.kycVerification": {
      en: "KYC Verification", es: "Verificación KYC", fr: "Vérification KYC", pt: "Verificação KYC", de: "KYC-Verifizierung",
      ar: "تحقق KYC", zh: "KYC验证", hi: "KYC सत्यापन", ja: "KYC認証", ko: "KYC 인증",
      sw: "Uthibitishaji wa KYC", tr: "KYC Doğrulama", ru: "KYC Верификация", id: "Verifikasi KYC", th: "การยืนยัน KYC"
    },
    "footer.submissionStatus": {
      en: "Submission Status", es: "Estado de Envío", fr: "Statut de Soumission", pt: "Status de Envio", de: "Einreichungsstatus",
      ar: "حالة الإرسال", zh: "提交状态", hi: "सबमिशन स्थिति", ja: "送信状況", ko: "제출 상태",
      sw: "Hali ya Uwasilishaji", tr: "Gönderim Durumu", ru: "Статус Отправки", id: "Status Pengiriman", th: "สถานะการส่ง"
    },
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
      en: "Share updates, promote products & connect with pioneers worldwide", es: "Comparta actualizaciones, promueva productos y conecte con pioneros", fr: "Partagez des mises à jour, promouvez des produits et connectez-vous avec des pionniers", pt: "Compartilhe atualizações, promova produtos e conecte-se com pioneiros", de: "Teilen Sie Updates, bewerben Sie Produkte und verbinden Sie sich mit Pionieren",
      ar: "شارك التحديثات وروّج للمنتجات وتواصل مع الرواد", zh: "分享更新、推广产品并与全球先驱者联系", hi: "अपडेट साझा करें, उत्पादों का प्रचार करें और पायनियर्स से जुड़ें", ja: "アップデートを共有し、製品を宣伝し、パイオニアとつながる", ko: "업데이트를 공유하고, 제품을 홍보하고, 파이오니어와 연결하세요",
      sw: "Shiriki masasisho, tangaza bidhaa na uunganike na waanzilishi", tr: "Güncellemeleri paylaşın, ürünleri tanıtın ve öncülerle bağlantı kurun", ru: "Делитесь обновлениями, продвигайте товары и общайтесь с пионерами", id: "Bagikan pembaruan, promosikan produk & terhubung dengan pionir", th: "แบ่งปันอัปเดต โปรโมทสินค้า และเชื่อมต่อกับผู้บุกเบิก"
    },
    "social.liveDescription": {
      en: "Posts from verified businesses and pioneers", es: "Publicaciones de negocios verificados y pioneros", fr: "Publications d'entreprises vérifiées et de pionniers", pt: "Postagens de negócios verificados e pioneiros", de: "Beiträge von verifizierten Unternehmen und Pionieren",
      ar: "منشورات من الشركات والرواد الموثقين", zh: "来自认证商家和先驱者的帖子", hi: "सत्यापित व्यवसायों और पायनियर्स की पोस्ट", ja: "認証済みビジネスとパイオニアからの投稿", ko: "인증된 비즈니스와 파이오니어의 게시물",
      sw: "Machapisho kutoka biashara na waanzilishi waliothibitishwa", tr: "Doğrulanmış işletmeler ve öncülerden gönderiler", ru: "Публикации от верифицированных бизнесов и пионеров", id: "Postingan dari bisnis terverifikasi dan pionir", th: "โพสต์จากธุรกิจที่ยืนยันแล้วและผู้บุกเบิก"
    },
    "social.postPlaceholder": {
      en: "What's happening in Pi commerce?", es: "¿Qué pasa en el comercio Pi?", fr: "Quoi de neuf dans le commerce Pi?", pt: "O que está acontecendo no comércio Pi?", de: "Was passiert im Pi-Handel?",
      ar: "ماذا يحدث في تجارة Pi؟", zh: "Pi商务有什么新动态？", hi: "Pi कॉमर्स में क्या हो रहा है?", ja: "Piコマースで何が起きている？", ko: "Pi 커머스에서 무슨 일이?",
      sw: "Nini kinaendelea katika biashara ya Pi?", tr: "Pi ticaretinde neler oluyor?", ru: "Что происходит в Pi-коммерции?", id: "Apa yang terjadi di perdagangan Pi?", th: "มีอะไรเกิดขึ้นในการค้า Pi?"
    },
    "social.photo": {
      en: "Photo", es: "Foto", fr: "Photo", pt: "Foto", de: "Foto",
      ar: "صورة", zh: "照片", hi: "फ़ोटो", ja: "写真", ko: "사진",
      sw: "Picha", tr: "Fotoğraf", ru: "Фото", id: "Foto", th: "รูปภาพ"
    },
    "social.broadcast": {
      en: "Broadcast", es: "Publicar", fr: "Diffuser", pt: "Transmitir", de: "Senden",
      ar: "نشر", zh: "发布", hi: "प्रसारित करें", ja: "配信", ko: "방송",
      sw: "Tangaza", tr: "Yayınla", ru: "Опубликовать", id: "Siarkan", th: "เผยแพร่"
    },
    "social.catGeneral": {
      en: "General", es: "General", fr: "Général", pt: "Geral", de: "Allgemein",
      ar: "عام", zh: "常规", hi: "सामान्य", ja: "一般", ko: "일반",
      sw: "Jumla", tr: "Genel", ru: "Общее", id: "Umum", th: "ทั่วไป"
    },
    "social.catProduct": {
      en: "Product Launch", es: "Lanzamiento", fr: "Lancement", pt: "Lançamento", de: "Produktstart",
      ar: "إطلاق منتج", zh: "产品发布", hi: "उत्पाद लॉन्च", ja: "製品発売", ko: "제품 출시",
      sw: "Uzinduzi", tr: "Ürün Lansmanı", ru: "Запуск продукта", id: "Peluncuran", th: "เปิดตัวสินค้า"
    },
    "social.catPromo": {
      en: "Promotion", es: "Promoción", fr: "Promotion", pt: "Promoção", de: "Aktion",
      ar: "ترويج", zh: "促销", hi: "प्रमोशन", ja: "プロモーション", ko: "프로모션",
      sw: "Ofa", tr: "Promosyon", ru: "Акция", id: "Promosi", th: "โปรโมชัน"
    },
    "social.catNews": {
      en: "News", es: "Noticias", fr: "Actualités", pt: "Notícias", de: "Nachrichten",
      ar: "أخبار", zh: "新闻", hi: "समाचार", ja: "ニュース", ko: "뉴스",
      sw: "Habari", tr: "Haberler", ru: "Новости", id: "Berita", th: "ข่าว"
    },
    "social.catEvent": {
      en: "Event", es: "Evento", fr: "Événement", pt: "Evento", de: "Veranstaltung",
      ar: "حدث", zh: "活动", hi: "इवेंट", ja: "イベント", ko: "이벤트",
      sw: "Tukio", tr: "Etkinlik", ru: "Событие", id: "Acara", th: "กิจกรรม"
    },
    "social.catHiring": {
      en: "Hiring", es: "Empleo", fr: "Recrutement", pt: "Vagas", de: "Stellenangebote",
      ar: "توظيف", zh: "招聘", hi: "भर्ती", ja: "採用", ko: "채용",
      sw: "Ajira", tr: "İş İlanı", ru: "Вакансии", id: "Lowongan", th: "รับสมัครงาน"
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
    "social.postsToday": {
      en: "Posts Today", es: "Posts Hoy", fr: "Posts Aujourd'hui", pt: "Posts Hoje", de: "Posts Heute",
      ar: "منشورات اليوم", zh: "今日帖子", hi: "आज की पोस्ट", ja: "今日の投稿", ko: "오늘 게시물",
      sw: "Machapisho Leo", tr: "Bugünkü Gönderiler", ru: "Постов сегодня", id: "Postingan Hari Ini", th: "โพสต์วันนี้"
    },
    "social.countries": {
      en: "Countries", es: "Países", fr: "Pays", pt: "Países", de: "Länder",
      ar: "دول", zh: "国家", hi: "देश", ja: "国", ko: "国가",
      sw: "Nchi", tr: "Ülkeler", ru: "Стран", id: "Negara", th: "ประเทศ"
    },

    // ── Transport / Ride-Hailing ──
    "nav.transport": {
      en: "Transport", es: "Transporte", fr: "Transport", pt: "Transporte", de: "Transport",
      ar: "النقل", zh: "交通", hi: "परिवहन", ja: "交通", ko: "교통",
      sw: "Usafiri", tr: "Ulaşım", ru: "Транспорт", id: "Transportasi", th: "ขนส่ง"
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
  };

  // ── Core Functions ──
  function getLang() {
    return localStorage.getItem(LANG_KEY) || navigator.language.split("-")[0] || "en";
  }

  function setLang(lang) {
    if (!languages[lang]) lang = "en";
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
    document.documentElement.dir = languages[lang].dir;
    document.documentElement.lang = lang;
    // Update selector if present
    var sel = document.getElementById("lang-select");
    if (sel) sel.value = lang;
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function t(key, lang) {
    lang = lang || getLang();
    var entry = T[key];
    if (!entry) return key;
    return entry[lang] || entry["en"] || key;
  }

  function applyTranslations(lang) {
    lang = lang || getLang();
    // Translate elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var text = t(key, lang);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
    // Translate data-i18n-placeholder
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"), lang);
    });
    // Translate data-i18n-title
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      el.title = t(el.getAttribute("data-i18n-title"), lang);
    });
  }

  // ── Language Selector Widget ──
  function createLangSelector() {
    var currentLang = getLang();
    if (!languages[currentLang]) currentLang = "en";

    var wrapper = document.createElement("div");
    wrapper.className = "lang-selector";
    wrapper.style.cssText = "position:relative;display:inline-flex;align-items:center;";

    var btn = document.createElement("button");
    btn.id = "lang-toggle-btn";
    btn.style.cssText = "background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#a1a1aa;padding:7px 12px;border-radius:100px;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px;transition:all 0.2s;";
    btn.innerHTML = languages[currentLang].flag + " " + currentLang.toUpperCase() + ' <span style="font-size:0.625rem;opacity:0.5">▼</span>';
    btn.onmouseenter = function(){ btn.style.borderColor = "rgba(255,255,255,0.16)"; btn.style.color = "#fafafa"; };
    btn.onmouseleave = function(){ if(!dropdown.classList.contains("open")){ btn.style.borderColor = "rgba(255,255,255,0.08)"; btn.style.color = "#a1a1aa"; }};

    var dropdown = document.createElement("div");
    dropdown.id = "lang-dropdown";
    dropdown.style.cssText = "display:none;position:absolute;top:calc(100% + 8px);right:0;background:#111114;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:6px;min-width:180px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,0.5);max-height:320px;overflow-y:auto;";

    Object.keys(languages).forEach(function (code) {
      var lang = languages[code];
      var item = document.createElement("button");
      item.style.cssText = "display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;background:none;border:none;color:#a1a1aa;font-size:0.8125rem;font-family:inherit;cursor:pointer;border-radius:8px;transition:all 0.15s;text-align:left;";
      if (code === currentLang) item.style.cssText += "background:rgba(124,58,237,0.12);color:#a78bfa;";
      item.innerHTML = '<span style="font-size:1.1rem">' + lang.flag + "</span><span>" + lang.label + '</span><span style="margin-left:auto;font-size:0.6875rem;opacity:0.5">' + code.toUpperCase() + "</span>";
      item.onmouseenter = function(){ if(code !== currentLang) item.style.background = "rgba(255,255,255,0.06)"; item.style.color = "#fafafa"; };
      item.onmouseleave = function(){ if(code !== currentLang){ item.style.background = "none"; item.style.color = "#a1a1aa"; } else { item.style.background = "rgba(124,58,237,0.12)"; item.style.color = "#a78bfa"; }};
      item.onclick = function (e) {
        e.stopPropagation();
        setLang(code);
        dropdown.style.display = "none";
        dropdown.classList.remove("open");
        btn.innerHTML = lang.flag + " " + code.toUpperCase() + ' <span style="font-size:0.625rem;opacity:0.5">▼</span>';
        // Update active state
        dropdown.querySelectorAll("button").forEach(function(b){ b.style.background = "none"; b.style.color = "#a1a1aa"; });
        item.style.background = "rgba(124,58,237,0.12)"; item.style.color = "#a78bfa";
      };
      dropdown.appendChild(item);
    });

    btn.onclick = function (e) {
      e.stopPropagation();
      var isOpen = dropdown.style.display === "block";
      dropdown.style.display = isOpen ? "none" : "block";
      if(isOpen) dropdown.classList.remove("open"); else dropdown.classList.add("open");
    };

    document.addEventListener("click", function () {
      dropdown.style.display = "none";
      dropdown.classList.remove("open");
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);
    return wrapper;
  }

  function injectLangSelector() {
    // Try nav-right first
    var navRight = document.querySelector(".nav-right");
    if (navRight) {
      navRight.insertBefore(createLangSelector(), navRight.firstChild);
      return;
    }
    // Try inline nav div containing connect button
    var connectBtn = document.getElementById("pi-connect-btn");
    if (connectBtn && connectBtn.parentElement && connectBtn.parentElement.tagName !== "NAV") {
      connectBtn.parentElement.insertBefore(createLangSelector(), connectBtn.parentElement.firstChild);
      return;
    }
    // Try topbar-nav
    var topbar = document.querySelector(".topbar-nav");
    if (topbar) {
      topbar.parentElement.appendChild(createLangSelector());
      return;
    }
    // Fallback: fixed position top-right
    var container = document.createElement("div");
    container.style.cssText = "position:fixed;top:12px;right:12px;z-index:9999;";
    container.appendChild(createLangSelector());
    document.body.appendChild(container);
  }

  // ── Auto-init ──
  function init() {
    var lang = getLang();
    if (!languages[lang]) lang = "en";
    document.documentElement.dir = languages[lang].dir;
    document.documentElement.lang = lang;
    injectLangSelector();
    applyTranslations(lang);
  }

  // ── Cross-tab language sync ──
  window.addEventListener("storage", function(e) {
    if (e.key === LANG_KEY && e.newValue && languages[e.newValue]) {
      applyTranslations(e.newValue);
      document.documentElement.dir = languages[e.newValue].dir;
      document.documentElement.lang = e.newValue;
      var btn = document.getElementById("lang-toggle-btn");
      if (btn) btn.innerHTML = languages[e.newValue].flag + " " + e.newValue.toUpperCase() + ' <span style="font-size:0.625rem;opacity:0.5">\u25BC</span>';
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ── Public API ──
  window.OmendaLang = {
    t: t,
    setLang: setLang,
    getLang: getLang,
    languages: languages,
    applyTranslations: applyTranslations,
  };
})();
