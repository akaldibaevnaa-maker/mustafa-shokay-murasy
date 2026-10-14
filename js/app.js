/**
 * «Мұстафа Шоқайдың балалық шағы, өскен ортасы» 
 * Негізгі платформа қолданбасының скрипті (app.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSearch();
  initFontSizeControls();
});

// --------------------------------------------------------------------------
// 1. Табтарды ауыстыру (Tab switching)
// --------------------------------------------------------------------------
function switchTab(tabId) {
  // Барлық таб батырмаларын белсенділіктен шығару
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  // Барлық таб мазмұндарын жасыру, таңдалғанын көрсету
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach(content => {
    content.classList.toggle("active", content.id === `tab-${tabId}`);
  });

  // Беттің басына жәймен жылжу
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --------------------------------------------------------------------------
// 2. Жарық / Қараңғы тақырыпты ауыстыру (Theme toggle)
// --------------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem("shokay_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("shokay_theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (icon) {
    icon.innerHTML = theme === "dark" ? "☀️" : "🌙";
  }
}

// --------------------------------------------------------------------------
// 3. Баяндама мәтінінен іздеу жүйесі (Text search inside article)
// --------------------------------------------------------------------------
let originalArticleHTML = "";

function initSearch() {
  const articleEl = document.getElementById("articleContent");
  if (articleEl) {
    originalArticleHTML = articleEl.innerHTML;
  }
}

function searchArticle(query) {
  const articleEl = document.getElementById("articleContent");
  if (!articleEl) return;

  const q = query.trim();
  if (!q) {
    articleEl.innerHTML = originalArticleHTML;
    document.getElementById("searchStatus").innerText = "";
    return;
  }

  try {
    const regex = new RegExp(`(${escapeRegExp(q)})`, "gi");
    let matchCount = 0;

    // Мәтінді қайта қалпына келтіріп іздеу
    articleEl.innerHTML = originalArticleHTML;

    // Параграфтар бойынша іздеу және сары түспен белгілеу
    const paragraphs = articleEl.querySelectorAll("p, h2, h3, .quote-box");
    paragraphs.forEach(p => {
      if (regex.test(p.innerHTML)) {
        p.innerHTML = p.innerHTML.replace(regex, (match) => {
          matchCount++;
          return `<mark style="background:#fde047; color:#000; padding:1px 3px; border-radius:3px; font-weight:bold;">${match}</mark>`;
        });
      }
    });

    const statusEl = document.getElementById("searchStatus");
    if (statusEl) {
      statusEl.innerText = matchCount > 0 ? `Табылды: ${matchCount} сәйкестік` : "Нәтиже табылмады";
    }
  } catch (e) {
    console.error("Іздеу қатесі:", e);
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// --------------------------------------------------------------------------
// 4. Оқу залының қаріп өлшемін реттеу (Font size adjuster)
// --------------------------------------------------------------------------
let currentFontSize = 1.1; // rem

function initFontSizeControls() {
  const article = document.getElementById("articleContent");
  if (article) {
    article.style.fontSize = `${currentFontSize}rem`;
  }
}

function changeFontSize(delta) {
  const article = document.getElementById("articleContent");
  if (!article) return;

  currentFontSize = Math.max(0.9, Math.min(1.5, currentFontSize + delta));
  article.style.fontSize = `${currentFontSize}rem`;
}

// --------------------------------------------------------------------------
// 5. Дыбыстық оқырман (Text to Speech - Web Speech API)
// --------------------------------------------------------------------------
let isSpeaking = false;

function toggleSpeech() {
  const btn = document.getElementById("speechToggleBtn");
  if (!("speechSynthesis" in window)) {
    alert("Кешіріңіз, браузеріңізде мәтінді дыбыстау қолдауы жоқ.");
    return;
  }

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    if (btn) btn.innerHTML = "🔊 Мәтінді тыңдау";
    return;
  }

  const articleEl = document.getElementById("articleContent");
  if (!articleEl) return;

  const textToRead = articleEl.innerText;
  const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 3000)); // Алғашқы 3000 таңбаны оқу
  utterance.lang = "kk-KZ"; // Қазақ тілі, болмаса браузер жүйелік тілді пайдаланады
  utterance.rate = 0.95;

  utterance.onend = () => {
    isSpeaking = false;
    if (btn) btn.innerHTML = "🔊 Мәтінді тыңдау";
  };

  utterance.onerror = () => {
    isSpeaking = false;
    if (btn) btn.innerHTML = "🔊 Мәтінді тыңдау";
  };

  window.speechSynthesis.speak(utterance);
  isSpeaking = true;
  if (btn) btn.innerHTML = "⏹️ Тоқтату";
}

// --------------------------------------------------------------------------
// 6. Галерея фотоларын үлкейтіп көру (Image Lightbox Modal)
// --------------------------------------------------------------------------
function openLightbox(src, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");

  img.src = src;
  cap.innerText = caption;
  modal.classList.add("open");
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  modal.classList.remove("open");
}

// Сілтеме әдебиетіне өткізу (Citation click to reference)
function scrollToRef(refNum) {
  switchTab("sources");
  setTimeout(() => {
    const refItem = document.getElementById(`ref-${refNum}`);
    if (refItem) {
      refItem.scrollIntoView({ behavior: "smooth" });
      refItem.style.background = "rgba(217, 119, 6, 0.15)";
      setTimeout(() => {
        refItem.style.background = "transparent";
      }, 2000);
    }
  }, 250);
}

// --------------------------------------------------------------------------
// 7. Тарихи Маршруттың толық мәліметтер жүйесі (Route Details System)
// --------------------------------------------------------------------------
const routeDetailsData = {
  1: {
    id: 1,
    title: "Наршоқы & Сұлутөбе",
    subtitle: "1890 – 1898 жж. Балалық шақ, атамекен және медреседе сауат ашу кезеңі",
    badge: "1-бекет • Туған жері мен алғашқы сауаты",
    location: "Қызылорда облысы, Шиелі ауданы, Сұлутөбе теміржол стансасынан 15 шақырым қашықтықтағы Наршоқы елді мекені, Әулиетораңғыл қонысы.",
    paragraphs: [
      "Мұстафа Шоқай 1890 жылдың 7 қаңтарында Сұлутөбе теміржол стансасынан он бес шақырым жердегі Наршоқы елді мекенінде дүниеге келген. Мұстафаның атасы Торғай – Сыр өңіріндегі беделді датқалардың бірі болған, ал әкесі Шоқай ұзақ жылдар бойы би-болыс қызметін атқарған, ел арасында аса сыйлы, танымал қайраткер еді. Олар 1890 жылдың көктеміне дейін Орынбор – Ташкент теміржолы бойындағы Сұлутөбе бекетінен бес шақырым жерде орналасқан Әулиетораңғыл деген мекенде тұрған.",
      "1896 жылы Наршоқыда орналасқан Шоқай қыстауының жанында жаңа мектеп-медресе ашылып, алғашқылардың бірі болып алты жасар Мұстафа, оның ағасы Сыздық және немере ағасы Бәкір қабылданады. Мұстафа өзінің тума алғырлығымен ерекшеленіп, мектеп шәкірттерінің ішінде бірінші болып әптиекті меңгеріп, кейін Құран оқуға көшеді. Ол қатарластарының арасында Құранды ең жақсы, мәнеріне келтіріп оқитындардың бірі ретінде танылды.",
      "Мұстафаның білім мен тәрбиесінің негізін медресемен қатар, би ауылына келіп, ел мен жер тағдырын толғаған шешендер мен ақын-жыраулар қалыптастырды. Ол жастайынан Сыр өңірінің әйгілі сүлейлері – Досбол би, Күдеріқожа Көшекұлы, Будабай Қабылұлы, Майлықожа Сұлтанқожаұлы сынды шешендердің сөздерін тыңдап, бес жасынан домбыра тартып, ұлттық мұрадан нәр алып өсті."
    ],
    quote: "«Үйге келген қонақтар өтінбесе де, бала Мұстафа оларға Құран оқып беретін ізгі әдеті болған... Әркімнің жүрегіне мейірім шуағын төгетін еді.»",
    legacy: "Қазіргі күнге дейін Наршоқыда екі бөлмелі тарихи медресенің орны сақталған. Шоқай, Әліш және Мұстафаның басқа да туыстары осы маңнан 300-400 метр қашықтықтағы ата-баба қорымында жерленген."
  },
  2: {
    id: 2,
    title: "Перовск (Қызылорда)",
    subtitle: "1899 – 1902 жж. Қалалық орыс-қазақ училищесінде білім алу кезеңі",
    badge: "2-бекет • Заманауи бастауыш білім",
    location: "Перовск қаласы (қазіргі Қызылорда қаласы, Сырдария өзені жағалауы).",
    paragraphs: [
      "Наршоқыдағы медресені екі жылда аяқтаған Мұстафа Қызылордадағы қалалық орыс-қазақ мектебіне оқуға түседі. Өзбекстан орталық мұрағатында сақталған өмірбаяндық ресми құжаттарға сәйкес, ол 1899-1902 жылдары Перовск училищесінде оқығаны нақты көрсетілген.",
      "Мұстафаның зайыбы Мария Яковлевнаның естелігінде: «Мұстафа жеті жасынан бастап Перовскідегі мектепке барып оқыды», – деп жазылған. Туыстары Ғани Бәкірұлы мен Б. Атабаевтардың естеліктеріне сәйкес, Мұстафа алғашында қалалық мектепке қабылданып, бір ай оқығаннан кейін ауылға қайтып келеді. Әжесі оны қимай қайта жібермей қойған соң, әкесі ауылда оқыту үшін Тимофей есімді орыс мұғалімін жалдап, үйде оқытқан.",
      "Осы училищеде Мұстафа орыс тілі мен бастауыш ғылымдарды жетік меңгеріп, Ташкенттегі классикалық ерлер гимназиясының күрделі емтихандарына тыңғылықты дайындалды."
    ],
    quote: "«Перовскіде оқу – Мұстафаның таным көкжиегін кеңейтіп, оны заманауи өркениетті білімге, үлкен өмір жолына алып шыққан алтын көпір болды.»",
    legacy: "Қызылорда қаласында 1878 жылы қызыл кірпіштен бой көтерген тарихи мектеп ғимараты бүгінге дейін сақталған. Қабырғасында Мұстафа Шоқайға арналған естелік тақта орнатылған. 2025 жылы баяндамашы Інжу осы тарихи ғимаратқа барып, зерттеу жүргізді."
  },
  3: {
    id: 3,
    title: "Сыр бойы қалалары (Ақмешіт, Түркістан, Сайрам, Әулиеата)",
    subtitle: "1898 – 1902 жж. Әкесі Шоқай бимен бірге ел аралау және халық өмірін тану сапарлары",
    badge: "3-бекет • Ел аралау және көзқарасының шыңдалуы",
    location: "Сыр бойы мен Оңтүстік өлкесі: Ақмешіт, Түркістан, Сайрам, Әулиеата (Тараз), Темірлан, Қарнақ, Жосалы, Бөген ауылдары.",
    paragraphs: [
      "Мұстафаның әкесі Шоқай би Сыр бойында аса беделді, сөзі өтімді, әділ би болған. Ол ел ішіндегі дау-шарларды шешу, билік айту және жиын өткізу сапарларында жас Мұстафаны үнемі қасына ертіп жүрген.",
      "Осы сапарлар кезінде Мұстафа Ақмешіт, Түркістан, Сайрам, Әулиеата сияқты ежелгі қалалармен қатар, Темірлан, Қарнақ, Жосалы, Бөген секілді ауылдарды аралап, қазақ халқының шынайы тұрмыс-тіршілігін өз көзімен көрді.",
      "Әсіресе, жергілікті патша отаршылдық әкімшілігінің қазақтарға жасаған қиянаты, шұрайлы жер-суларды тартып алу саясаты бала Мұстафаның жанына қатты батты. Бұл оның әділетшіл, еркіндіксүйгіш саяси көзқарасының тым ерте қалыптасуына негіз қалады."
    ],
    quote: "«Ол музыканы өте жақсы көрді, есту қабілеті жоғары, есте сақтау қабілеті керемет еді, кез келген нәрсені тез есіне түсіретін... Халықтың жанайқайы мен мұңы оның санасында мәңгі сақталып қалды.» — Мария Шоқай",
    legacy: "Бұл сапарлар Мұстафаның бүкіл түркі жұртына, Сыр мен Түркістанның ежелгі мәдениетіне деген терең сүйіспеншілігін қалыптастырды."
  },
  4: {
    id: 4,
    title: "Ташкент (Ерлер гимназиясы)",
    subtitle: "1902 – 1910 жж. Ташкент классикалық ерлер гимназиясы, Алтын медаль",
    badge: "4-бекет • Классикалық гимназия және Алтын медаль",
    location: "Ташкент қаласы (Түркістан генерал-губернаторлығының бас орталығы).",
    paragraphs: [
      "1902 жылдың тамызында әкесі Шоқайдың табанды өтінішімен Ташкент ерлер гимназиясына қабылданды. Әкесі баласының білімін жалғастыруын алдын ала ойлап, 1902 жылдың 24 наурызында-ақ гимназия директорының атына ресми өтініш береді. Бастапқыда отаршылдық шектеулерге байланысты қабылданбағанымен, әкесі губернаторға дейін арызданып, оқуға қабылдаттырады.",
      "Гимназияда латын, француз, неміс тілдерін, тарих, математикалық географияны терең оқыды. 1910 жылы Ташкент ерлер гимназиясын үздік бағалармен және жоғары дәрежелі **Алтын медальмен** бітірді. Сыныптастарының басым бөлігі славян өкілдері болған кезде, қазақ баласының гимназияны алтынмен тәмамдауы зор тарихи оқиға еді.",
      "Ташкентте білім алып жүрген кезінде Мұстафа қазақ халқының жер-су мұңын, қоныстанушылардың өктемдігін генерал-губернатор А. Самсоновқа тайсалмай бірнеше рет жеткізді. Оған генерал-губернатор кеңсесінен тілмаштық қызмет ұсынылса да, ол ұсыныстан бас тартып, империя астанасына заң факультетіне түсуге шешім қабылдады."
    ],
    quote: "«Мұстафа өзінің туған халқының мұңын генерал-губернатор алдында да батыл қорғай білді... Ол орысшаға жетік, саяси сауаты өте жоғары жас қайраткер болды.»",
    legacy: "Гимназия директоры Е. Вознесенский Мұстафаның біліміне тәнті болып, Түркістан өлкесі училищелерінің бас инспекторына оны Санкт-Петербург университетіне қабылдау туралы арнайы ресми рапорт жолдады."
  },
  5: {
    id: 5,
    title: "Ырғыз & Орынбор",
    subtitle: "Ағартушылық бағыт, Ыбырай Алтынсарин оқулықтары және «Қазақ» газеті",
    badge: "5-бекет • Ұлттық ағартушылық бастау",
    location: "Ырғыз даласы, Орынбор қаласы (қазақ баспасөзі мен Алаш қайраткерлерінің ордасы).",
    paragraphs: [
      "Торғай датқаның үшінші ұлы Әліш (Мұстафаның туған немере ағасы) сапар барысында Ырғызға, одан әрі Орынборға барып, сол жерде ұлы ұстаз Ыбырай Алтынсариннің «Начальное руководство к обучению киргизов русскому языку» және «Киргизская хрестоматия» («Қазақ хрестоматиясы») кітаптарының бірнеше данасын сатып алып келеді.",
      "Бала Мұстафа мен ауылдағы шәкірттер алғашқы әліпбилік сауатын және орысша оқуды осы Алтынсариннің төл оқулықтары арқылы меңгерді. Бұл Шоқай әулетінің көзі ашық, жаңа заман ғылымы мен ұлттық ағартушылыққа үнемі ұмтылғанын айғақтайды.",
      "Кейіннен Орынбор қаласы – Мұстафа Шоқайдың рухани қалыптасуында ерекше орын алған атақты «Қазақ» газеті басылып шыққан, Әлихан Бөкейханов пен Ахмет Байтұрсынұлы, Міржақып Дулатовтар бас қосқан Алаш қозғалысының рухани астанасына айналды."
    ],
    quote: "«Ә. Бөкейханов пен А. Байтұрсынов атамекенімізді қара түнектен шығару жолында ұмытылмас қызметтер көрсеткен ұлы қайраткерлер...» — Мұстафа Шоқай (1931 ж.)",
    legacy: "Ырғыз-Орынбор бағыты Мұстафаның Сыр бойынан басталған ағартушылық танымын жалпықазақтық, азаттық деңгейіне көтерді."
  },
  6: {
    id: 6,
    title: "Санкт-Петербург",
    subtitle: "1910 – 1914 жж. Императорлық университеттің заң факультеті және қоғамдық шыңдалу",
    badge: "6-бекет • Империя астанасы және саяси күрескерлік",
    location: "Санкт-Петербург қаласы (Ресей империясының астанасы, Васильев аралы).",
    paragraphs: [
      "1910 жылдың 6 шілдесінде Мұстафа Санкт-Петербург Императорлық университетінің заң факультетіне студент болып қабылданды. Түркістан өлкесінен стипендия тағайындалғанымен, ауылдағы ата-анасына салмақ салмас үшін Қоныс аудару басқармасында қазақ және өзбек тілдерінен орыс тіліне аудармашы болып қосымша еңбек етті.",
      "Университетте 1910-1914 жылдары оқып, мемлекеттік заңдарды, азаматтық құқықты, сондай-ақ қазақ даласындағы билер мен қазылар соты жүйесін терең зерттеді. 1914 жылдың 15 қыркүйегінде университеттің толық курсын аяқтағанын растайтын ресми диплом алды.",
      "Петербургке келген күннен бастап түрік-мұсылман жастарының қозғалысына араласты. Адвокат Серәлі Лапиннің үйіндегі саяси жиындарға қатысып, Санжар Асфендияров, татар, әзірбайжан жастарымен бірлесіп әрекет етті. Әлихан Бөкейхановтың рухани басшылығымен Ресей Мемлекеттік Думасының мұсылман фракциясының хатшысы болып, жалпыресейлік саяси сахнаға көтерілді."
    ],
    quote: "«1910-1914 жылдары Петербург университетінде оқып жүргенімде біз, студенттер, саяси күрестерге араласып, ұлт теңдігін талап еттік... Бұл менің мемлекет қайраткері ретіндегі басты шыңдалу мектебім болды.» — Мұстафа Шоқай",
    legacy: "Санкт-Петербург мемлекеттік университетінің мұрағатында Мұстафа Шоқайдың сынақ кітапшасы, қолхаттары және оқуға қабылдау туралы тарихи құжаттары сақталған."
  }
};

let currentRouteId = 1;

function openRouteDetail(id) {
  const data = routeDetailsData[id];
  if (!data) return;

  currentRouteId = id;
  const modal = document.getElementById("routeModal");
  if (!modal) return;

  document.getElementById("routeModalBadge").innerText = data.badge;
  document.getElementById("routeModalTitle").innerText = data.title;
  document.getElementById("routeModalSub").innerText = data.subtitle;
  document.getElementById("routeModalLocation").innerText = data.location;

  // Тірек мәтіндерді толтыру
  const textContainer = document.getElementById("routeModalText");
  textContainer.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join("") +
    `<div class="quote-box">${data.quote}</div>` +
    `<div style="background:var(--bg-card-subtle); padding:0.85rem 1.15rem; border-radius:var(--radius-sm); border:1px solid var(--border); font-size:0.9rem; margin-top:1rem;">
      <strong style="color:var(--primary);">🏛️ Тарихи мұра мен бүгінгі дерек:</strong> ${data.legacy}
    </div>`;

  // Алдыңғы / келесі батырмаларды күйге келтіру
  const prevBtn = document.getElementById("routePrevBtn");
  const nextBtn = document.getElementById("routeNextBtn");
  if (prevBtn) prevBtn.disabled = (currentRouteId <= 1);
  if (nextBtn) nextBtn.disabled = (currentRouteId >= 6);

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeRouteModal() {
  const modal = document.getElementById("routeModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "auto";
}

function closeRouteModalOnBackdrop(e) {
  if (e.target.id === "routeModal") {
    closeRouteModal();
  }
}

function navigateRoute(delta) {
  const newId = currentRouteId + delta;
  if (newId >= 1 && newId <= 6) {
    openRouteDetail(newId);
  }
}

// --------------------------------------------------------------------------
// 8. Кинолента стиліндегі фототаспаны басқару (Film Strip Controls)
// --------------------------------------------------------------------------
let isFilmStripPaused = false;

function toggleFilmStrip() {
  const track = document.getElementById("filmStripTrack");
  const btn = document.getElementById("filmPlayToggleBtn");
  if (!track) return;

  isFilmStripPaused = !isFilmStripPaused;
  track.classList.toggle("paused", isFilmStripPaused);
  if (btn) {
    btn.innerHTML = isFilmStripPaused ? "▶️ Жалғастыру" : "⏸️ Кідірту";
  }
}

function scrollFilmStrip(direction) {
  const wrapper = document.getElementById("filmStripWrapper");
  if (!wrapper) return;
  wrapper.scrollBy({ left: direction * 350, behavior: "smooth" });
}

// Пернетақта батырмаларын бақылау (Route Modal)
window.addEventListener("keydown", (e) => {
  const routeModal = document.getElementById("routeModal");
  if (routeModal && routeModal.classList.contains("open")) {
    if (e.key === "Escape") {
      closeRouteModal();
    } else if (e.key === "ArrowLeft") {
      navigateRoute(-1);
    } else if (e.key === "ArrowRight") {
      navigateRoute(1);
    }
  }

  const lightboxModal = document.getElementById("lightboxModal");
  if (lightboxModal && lightboxModal.classList.contains("open")) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  }
});

