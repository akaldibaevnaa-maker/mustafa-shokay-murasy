/**
 * Мұстафа Шоқай мұрасына арналған интерактивті тест және Сертификат модулі
 */

const quizQuestions = [
  {
    question: "1. Мұстафа Шоқай қай жылы және қай елді мекенде дүниеге келген?",
    options: [
      "1890 жылдың 7 қаңтарында Сұлутөбе бекеті маңындағы Наршоқыда",
      "1885 жылы Ташкент қаласында",
      "1895 жылы Перовск бекінісінде",
      "1900 жылы Әулиеата қаласында"
    ],
    answer: 0,
    explanation: "Мұстафа Шоқай 1890 жылдың 7 қаңтарында Қызылорда облысы, Шиелі ауданына қарасты Сұлутөбе теміржол стансасынан 15 шақырым жердегі Наршоқыда туған."
  },
  {
    question: "2. Мұстафа Шоқайдың шежірелік тегі қай руға жатады?",
    options: [
      "Арғын ➔ Қаракесек",
      "Қыпшақ тайпасы ➔ Бошай тармағы ➔ Жанай руы",
      "Үйсін ➔ Шапырашты",
      "Найман ➔ Қаракерей"
    ],
    answer: 1,
    explanation: "Зерттеу дерегі бойынша Мұстафа Қыпшақ тайпасының Бошай тармағынан тарайтын Жанай руына жатады."
  },
  {
    question: "3. Мұстафаның анасы Бақтыбике кімнің туған қарындасы?",
    options: [
      "Исатай батырдың",
      "Атақты Баспақ батырдың",
      "Жанқожа батырдың",
      "Бұқарбай батырдың"
    ],
    answer: 1,
    explanation: "Анасының есімі – Бақтыбике. Ол атақты Баспақ батырдың туған қарындасы [4, 53 б]."
  },
  {
    question: "4. Мұстафа алты жасында Наршоқы мектебінде алғашқылардың бірі болып нені меңгерді?",
    options: [
      "Латын әліпбиін",
      "Әптиекті меңгеріп, кейін Құран оқуға көшті",
      "Орыс тілінде диктант жазды",
      "Французша ән айтуды"
    ],
    answer: 1,
    explanation: "Мұстафа алғырлығымен ерекшеленіп, мектеп шәкірттерінің ішінде бірінші болып әптиекті меңгеріп, кейін Құран оқуға көшеді."
  },
  {
    question: "5. Мұстафа бала кезінде қай музыкалық аспапты үйреніп, өнерге жақын болды?",
    options: [
      "Бес жасында домбыра тартуды үйренді",
      "Жеті жасында қобыз тартты",
      "Сыбызғыда ойнады",
      "Фортепианода ойнады"
    ],
    answer: 0,
    explanation: "Зайыбы Мария Яковлевнаның айтуынша, Мұстафа бес жасында домбыра тартуды үйреніп, ерекше музыкалық есту және есте сақтау қабілетімен көзге түскен."
  },
  {
    question: "6. Бала Мұстафаға Ырғыз бен Орынбордан қазақ хрестоматиясы мен оқулықтарын алып келген кім?",
    options: [
      "Әкесі Шоқай би",
      "Торғай датқаның үшінші ұлы Әліш ағасы",
      "Тимофей мұғалім",
      "Досбол би"
    ],
    answer: 1,
    explanation: "Әліш сапар барысында Орынбордан «Киргизская хрестоматия» және «Начальное руководство к обучению киргизов русскому языку» кітаптарын алып келіп, Мұстафаның сауатын ашты."
  },
  {
    question: "7. Мұстафа 1899-1902 жылдары қай оқу орнында білім алды?",
    options: [
      "Перовск (Қызылорда) училищесінде",
      "Орынбор кадет корпусында",
      "Қазан татар медресесінде",
      "Семей мұғалімдер семинариясында"
    ],
    answer: 0,
    explanation: "Мұрағаттық құжаттарға сәйкес, Мұстафа 1899-1902 жылдары Перовск (Қызылорда) училищесінде білім алған."
  },
  {
    question: "8. Мұстафа Шоқай 1910 жылы Ташкент ерлер гимназиясын қалай тәмамдады?",
    options: [
      "Күміс медальмен",
      "Алтын медальмен (негізгі пәндерден үздік)",
      "Тек куәлік алып аяқтады",
      "Оқуды аяқтамай Санкт-Петербургке кетті"
    ],
    answer: 1,
    explanation: "Н. П. Архангельскийдің айтуынша, Мұстафа Ташкент ерлер гимназиясын барлық дерлік пәндерді «үздік» бағамен, алтын медальмен тәмамдаған."
  },
  {
    question: "9. Санкт-Петербург университетінде Мұстафа қай мамандық бойынша оқыды?",
    options: [
      "Медицина факультетінде",
      "Заң факультетінде",
      "Шығыстану факультетінде",
      "Физика-математика факультетінде"
    ],
    answer: 1,
    explanation: "Мұстафа Санкт-Петербург императорлық университетінің заң факультетінде оқып, құқық ғылымдары мен сот жүйесін терең меңгерген."
  },
  {
    question: "10. Петербург кезеңінде Мұстафа Шоқайға рухани басшылық жасаған Алаш көсемі кім?",
    options: [
      "Әлихан Бөкейханов",
      "Мағжан Жұмабаев",
      "Сұлтанмахмұт Торайғыров",
      "Жүсіпбек Аймауытов"
    ],
    answer: 0,
    explanation: "«Қазақ» газеті және саяси қызмет барысында Мұстафа Шоқайға Петербургте Әлихан Бөкейханов рухани басшылық жасаған [1, 57 б]."
  }
];

let currentQuizIndex = 0;
let userScore = 0;
let answeredQuestions = [];

// Аудио дыбыстарды синтездеу (Web Audio API - офлайн әрі файлсыз)
function playTone(freq, duration, type = "sine") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Дыбыс қолдаусыз болса елемеу
  }
}

function startQuiz() {
  currentQuizIndex = 0;
  userScore = 0;
  answeredQuestions = new Array(quizQuestions.length).fill(null);
  
  document.getElementById("quizStartCard").style.display = "none";
  document.getElementById("quizPlayCard").style.display = "block";
  document.getElementById("quizResultCard").style.display = "none";
  document.getElementById("certificateArea").style.display = "none";
  
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQuizIndex];
  document.getElementById("quizCounter").innerText = `${currentQuizIndex + 1} / ${quizQuestions.length}`;
  document.getElementById("quizScoreLive").innerText = `Ұпай: ${userScore}`;
  
  // Прогресс барын жаңарту
  const percent = ((currentQuizIndex) / quizQuestions.length) * 100;
  document.getElementById("quizProgressFill").style.width = `${percent}%`;

  document.getElementById("quizQuestionText").innerText = q.question;
  const optionsContainer = document.getElementById("quizOptionsContainer");
  optionsContainer.innerHTML = "";

  const explanationBox = document.getElementById("quizExplanation");
  explanationBox.style.display = "none";
  document.getElementById("nextQuestionBtn").style.display = "none";

  q.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.innerHTML = `<span style="display:inline-block; width:26px; height:26px; line-height:24px; text-align:center; border-radius:50%; background:rgba(0,0,0,0.06); font-weight:700;">${String.fromCharCode(65 + idx)}</span> <span>${optText}</span>`;
    btn.onclick = () => selectOption(idx, btn);
    optionsContainer.appendChild(btn);
  });
}

function selectOption(selectedIdx, btnElement) {
  const q = quizQuestions[currentQuizIndex];
  const allBtns = document.querySelectorAll(".quiz-option-btn");
  
  allBtns.forEach(b => b.disabled = true);

  if (selectedIdx === q.answer) {
    btnElement.classList.add("correct");
    userScore++;
    playTone(587.33, 0.25); // D5 нотасы - сәттілік
    setTimeout(() => playTone(880, 0.3), 100);
  } else {
    btnElement.classList.add("incorrect");
    allBtns[q.answer].classList.add("correct");
    playTone(220, 0.35, "sawtooth"); // Қате дыбысы
  }

  const expBox = document.getElementById("quizExplanation");
  expBox.innerHTML = `<strong>Түсіндірме:</strong> ${q.explanation}`;
  expBox.style.display = "block";

  document.getElementById("quizScoreLive").innerText = `Ұпай: ${userScore}`;
  document.getElementById("nextQuestionBtn").style.display = "inline-flex";
}

function nextQuestion() {
  currentQuizIndex++;
  if (currentQuizIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  document.getElementById("quizPlayCard").style.display = "none";
  document.getElementById("quizResultCard").style.display = "block";
  document.getElementById("quizProgressFill").style.width = "100%";

  const finalScoreEl = document.getElementById("finalScoreText");
  const finalScorePercent = (userScore / quizQuestions.length) * 100;
  finalScoreEl.innerText = `${userScore} / ${quizQuestions.length} (${finalScorePercent}%)`;

  const feedbackEl = document.getElementById("finalFeedbackText");
  if (userScore >= 8) {
    feedbackEl.innerText = "Тамаша нәтиже! Сіз Мұстафа Шоқайдың балалық шағы мен өскен ортасын терең меңгерген шынайы «Шоқайтанушысыз»!";
  } else if (userScore >= 5) {
    feedbackEl.innerText = "Жақсы нәтиже! Зерттеу баяндамасын тағы бір мәрте қарап шығу арқылы біліміңізді толықтыра аласыз.";
  } else {
    feedbackEl.innerText = "Зерттеу материалдарымен қайта танысып, тесті қайта тапсыруға кеңес береміз.";
  }

  // Оқушы атын енгізіп сертификат алу мүмкіндігі
  const certSection = document.getElementById("certIssueSection");
  certSection.style.display = "block";
}

function generateCertificate() {
  const nameInput = document.getElementById("studentCertName").value.trim();
  if (!nameInput) {
    alert("Сертификат алу үшін аты-жөніңізді енгізіңіз!");
    return;
  }

  const percent = Math.round((userScore / quizQuestions.length) * 100);
  const now = new Date();
  const dateStr = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getFullYear()} ж.`;

  document.getElementById("certUserName").innerText = nameInput;
  document.getElementById("certUserScore").innerText = `${userScore} / 10 ұпай (${percent}%)`;
  document.getElementById("certDate").innerText = dateStr;

  document.getElementById("certificateArea").style.display = "block";
  document.getElementById("certificateArea").scrollIntoView({ behavior: 'smooth' });
}

function printCertificate() {
  window.print();
}
