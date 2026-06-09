// ============================================
// COMPATIBILIDAD
// ============================================
// Chrome 58+, Firefox 54+, Safari 11+, Edge 79+

// ============================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================
const CONFIG = {
  QUESTION_LIMIT: 10,
  POINTS_PER_QUESTION: 2,
  TIME_VALUE: 960,
  TOTAL_AVATARS: 19,
  OPTIONS_DELAY: 800,
  AVATAR_CLOSE_DELAY: 300,
  CONFETTI_PIECES: 100,
  CONFETTI_INTERVAL: 200,
  SPECIAL_CHARS_REGEX: /[:;()"!¿?.,-]/g,
  TYPING_TEXTS: [
    'Un ángel dijo a la madre de Sansón: "Tu hijo nunca deberá cortarse el cabello." Desde joven demostró fuerza sobrenatural - mató a un león con sus manos. !Era extraordinario! Su debilidad: no tomaba buenas decisiones. Dalila le preguntó: "¿Cuál es el secreto de tu fuerza?" Finalmente confesó la verdad. Lo traicionaron (mientras dormía), le cortaron el cabello y lo capturaron. En la cárcel su cabello volvió a crecer; Sansón oró y Dios le restauró su fuerza.',

    'Ana le prometió a Dios: "Si me das un niño, te lo devolveré." Nació Samuel y su madre lo llevó al templo (con el sacerdote Elí). Una noche escuchó una voz: "!Samuel, Samuel!" Corrió y le dijo a Elí: "!Aquí estoy!; ¿me llamaste?" Elí respondió: "No te llamé - vuelve a acostarte." Finalmente le explicó: "Si te llama, di: Habla, Señor; tu siervo escucha." Samuel obedeció y se convirtió en profeta de Israel.',

    'David era el más joven de ocho hermanos; cuidaba ovejas. ¿Quién esperaba que ese muchacho - pequeño y sencillo - llegara a ser rey? Dios le dijo a Samuel: "Los seres humanos ven lo exterior, pero yo veo el corazón." El camino no fue fácil: enfrentó a Goliat (con una honda y una piedra), huyó del rey Saúl por años, y cometió errores graves. !Por eso Dios lo llamó "un hombre conforme a su corazón"!',

    'David fue guerrero; pero también poeta y músico. Aprendió a tocar el arpa - instrumento para adorar a Dios. Escribió muchos salmos (canciones de oración) que leemos hoy. El más famoso es el Salmo 23: "El Señor es mi pastor; nada me faltará." ¿Por qué lo comparó con un pastor? Porque conocía ese trabajo: el pastor guía y cuida a sus ovejas con amor. !Qué privilegio tan grande ser amado por Él!',

    'Al principio no existía nada - solo oscuridad. Dios habló y todo tomó forma: creó la luz; separó las aguas y apareció la tierra seca (con plantas). !Qué espectáculo impresionante! Colocó el sol, la luna y las estrellas. Llenó los mares de peces y el cielo de aves. Finalmente formó al ser humano y dijo: "Hagamos al hombre a nuestra imagen y semejanza." ¿Sabes lo que eso significa? Que cada persona tiene algo de Dios en su interior.',

    'Un maestro le preguntó a Jesús: "¿Quién es mi prójimo?" Un hombre viajaba a Jericó - camino peligroso - cuando ladrones lo atacaron; lo dejaron herido y sin nada. Pasó un sacerdote (persona importante) pero cruzó al otro lado; tampoco se detuvo otro líder. Finalmente llegó un samaritano - despreciado por los judíos - y al ver al herido, se llenó de compasión. Lo curó, lo llevó a una posada y pagó los gastos. !Eso sí es amor al prójimo! Jesús dijo: "Ve y haz tú lo mismo."',
  ],
};

const ACCENT_MAP = { a: "á", e: "é", i: "í", o: "ó", u: "ú" };

// ============================================
// GESTOR DE CONFIGURACIÓN
// ============================================
class SettingsManager {
  constructor() {
    this.settings = this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem("quizSettings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      phase1: false,
      phase2: true,
      questionSet: Object.keys(QUESTION_SETS)[0],
      questionLimit: 10,
      maxPts1: 20,
      maxPts2: 20,
    };
  }

  save(phase1, phase2, questionSet, questionLimit, maxPts1, maxPts2) {
    this.settings = {
      phase1,
      phase2,
      questionSet,
      questionLimit,
      maxPts1,
      maxPts2,
    };
    localStorage.setItem("quizSettings", JSON.stringify(this.settings));
  }
}

// ============================================
// UTILIDADES
// ============================================
class Utils {
  static shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  static getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  static formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  static showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      position: "center",
      style: { background: "linear-gradient(to right, #3DA4FF, #3DC4FF)" },
    }).showToast();
  }

  static toggleScreen(hide, show) {
    if (hide) hide.classList.add("hide");
    if (show) show.classList.remove("hide");
  }
}

// ============================================
// GESTOR DE TEMPORIZADOR
// ============================================
class TimerManager {
  constructor(timerElement, onTimeUp) {
    this.timerElement = timerElement;
    this.onTimeUp = onTimeUp;
    this.interval = null;
  }

  start(timeValue = CONFIG.TIME_VALUE) {
    let time = timeValue;
    this.interval = setInterval(() => {
      this.timerElement.textContent = Utils.formatTime(time);
      time--;
      if (time < 0) {
        this.stop();
        this.onTimeUp();
      }
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// ============================================
// GESTOR DE PREGUNTAS
// ============================================
class QuizManager {
  constructor(elements, config) {
    this.elements = elements;
    this.config = config;
    this.state = {
      questions: [],
      currentQuestion: null,
      counter: 0,
      correctAnswers: 0,
      attempts: 0,
      optionsEnabled: false,
    };
  }

  initialize(questions, limit) {
    this.currentLimit = Math.min(
      limit || this.config.QUESTION_LIMIT,
      questions.length,
    );
    this.state.questions = [...questions];
    this.state.counter = 0;
    this.state.correctAnswers = 0;
    this.state.attempts = 0;
    this.renderAnswersIndicator();
  }

  loadNextQuestion() {
    if (this.state.counter >= this.currentLimit) return false;

    const randomIndex = Utils.getRandomIndex(this.state.questions.length);
    this.state.currentQuestion = this.state.questions[randomIndex];
    this.state.questions.splice(randomIndex, 1);

    this.renderQuestion();
    this.renderOptions();
    this.state.counter++;
    return true;
  }

  renderQuestion() {
    const { counter, currentQuestion } = this.state;
    this.elements.questionNumber.textContent = `Pregunta ${counter + 1} de ${this.currentLimit}`;
    this.elements.questionText.innerHTML = currentQuestion.q;

    if (currentQuestion.img) {
      this.elements.questionText.appendChild(
        this.createQuestionImage(currentQuestion.img),
      );
    }
  }

  createQuestionImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.className = "img-fluid";
    img.width = 400;
    img.alt = "Imagen de la pregunta";
    return img;
  }

  renderOptions() {
    const options = [...this.state.currentQuestion.options];
    const shuffledIndices = Utils.shuffleArray(options.map((_, i) => i));

    this.elements.optionContainer.innerHTML = "";
    this.elements.nextBtn.classList.add("disabled-btn");
    this.state.optionsEnabled = false;

    shuffledIndices.forEach((optionIndex, i) => {
      const option = this.createOptionElement(optionIndex, i);
      this.elements.optionContainer.appendChild(option);
    });

    setTimeout(() => {
      this.state.optionsEnabled = true;
    }, CONFIG.OPTIONS_DELAY);
  }

  createOptionElement(optionIndex, position) {
    const option = document.createElement("div");
    option.className = "option";
    option.textContent = this.state.currentQuestion.options[optionIndex];
    option.dataset.index = optionIndex;
    option.style.animationDelay = `${0.2 + position * 0.15}s`;
    return option;
  }

  handleOptionSelect(optionElement) {
    if (
      optionElement.classList.contains("already-answered") ||
      !this.state.optionsEnabled
    )
      return;

    const selectedIndex = parseInt(optionElement.dataset.index);
    const isCorrect = selectedIndex === this.state.currentQuestion.answer;

    optionElement.classList.add(isCorrect ? "correct" : "wrong");
    this.updateAnswerIndicator(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      this.state.correctAnswers++;
    } else {
      this.highlightCorrectAnswer();
    }

    this.state.attempts++;
    this.disableAllOptions();
    this.elements.nextBtn.classList.remove("disabled-btn");
  }

  highlightCorrectAnswer() {
    const correctIndex = this.state.currentQuestion.answer;
    Array.from(this.elements.optionContainer.children).forEach((option) => {
      if (parseInt(option.dataset.index) === correctIndex)
        option.classList.add("correct");
    });
  }

  disableAllOptions() {
    this.elements.optionContainer
      .querySelectorAll(".option")
      .forEach((option) => option.classList.add("already-answered"));
  }

  renderAnswersIndicator() {
    this.elements.answersIndicator.innerHTML = "";
    for (let i = 0; i < this.currentLimit; i++) {
      this.elements.answersIndicator.appendChild(document.createElement("div"));
    }
  }

  updateAnswerIndicator(markType) {
    const indicator =
      this.elements.answersIndicator.children[this.state.counter - 1];
    if (indicator) indicator.classList.add(markType);
  }

  getResults() {
    return {
      correctAnswers: this.state.correctAnswers,
      wrongAnswers: this.state.attempts - this.state.correctAnswers,
    };
  }
}

// ============================================
// GESTOR DE PRUEBA DE ESCRITURA
// ============================================
class TypingTestManager {
  constructor(elements, config) {
    this.elements = elements;
    this.config = config;
    this.state = {
      currentText: "",
      currentIndex: 0,
      errors: 0,
      totalErrors: 0,
      completed: false,
    };
    this.typedText = "";
    this.deadKey = null;
  }

  initialize() {
    const randomIndex = Utils.getRandomIndex(this.config.TYPING_TEXTS.length);
    this.state.currentText = this.config.TYPING_TEXTS[randomIndex];
    this.state.currentIndex = 0;
    this.state.errors = 0;
    this.state.totalErrors = 0;
    this.state.completed = false;
    this.typedText = "";
    this.render();
  }

  render() {
    const typingTextElement = document.getElementById("typingText");
    if (!typingTextElement) return;
    typingTextElement.innerHTML = "";

    let wordWrapper = null;
    this.state.currentText.split("").forEach((char, index) => {
      const span = this.createCharSpan(char, index);
      if (char === " ") {
        wordWrapper = null;
        typingTextElement.appendChild(span);
      } else {
        if (!wordWrapper) {
          wordWrapper = document.createElement("span");
          wordWrapper.className = "word-group";
          typingTextElement.appendChild(wordWrapper);
        }
        wordWrapper.appendChild(span);
      }
    });
  }

  createCharSpan(char, index) {
    const span = document.createElement("span");
    span.textContent = char;
    if (char === " ") span.setAttribute("data-space", "true");

    if (index < this.state.currentIndex) {
      span.className = "char-correct";
    } else if (index === this.state.currentIndex) {
      span.classList.add("char-current");
    } else {
      span.classList.add("char-pending");
    }
    return span;
  }

  handleInput(e) {
    if (e.key === "Dead") {
      this.deadKey = e.code;
      return;
    }

    let char = e.key;
    if (this.deadKey) {
      char = this.applyAccent(char);
      this.deadKey = null;
    }
    if (!this.isValidKey(e.key)) return;

    e.preventDefault();

    const typingTextElement = document.getElementById("typingText");
    if (!typingTextElement) return;
    const spans = typingTextElement.querySelectorAll("span:not(.word-group)");

    if (e.key === "Backspace") {
      this.handleBackspace(spans);
    } else if (!this.state.completed) {
      this.handleCharacterInput(char, e.key, spans);
    }
  }

  applyAccent(char) {
    if (["BracketLeft", "Quote", "BracketRight"].includes(this.deadKey)) {
      return ACCENT_MAP[char] || char;
    }
    return char;
  }

  isValidKey(key) {
    return key.length === 1 || key === "Backspace" || key === " ";
  }

  handleBackspace(spans) {
    if (this.state.currentIndex === 0) return;

    if (this.state.completed) {
      this.state.completed = false;
      this.elements.nextBtnExtra.classList.add("disabled-btn");
    }

    this.typedText = this.typedText.slice(0, -1);
    const { currentIndex, currentText } = this.state;

    if (currentIndex < currentText.length) {
      spans[currentIndex].classList.remove("char-current");
      spans[currentIndex].classList.add("char-pending");
    }

    this.state.currentIndex--;

    if (spans[this.state.currentIndex].classList.contains("char-incorrect")) {
      this.state.errors--;
      this.state.totalErrors--;
    }

    const isSpace = spans[this.state.currentIndex].hasAttribute("data-space");
    spans[this.state.currentIndex].className = "char-current";
    if (isSpace)
      spans[this.state.currentIndex].setAttribute("data-space", "true");
    this.scrollToCurrent(spans);
  }

  handleCharacterInput(char, key, spans) {
    const { currentIndex, currentText } = this.state;
    if (currentIndex >= currentText.length) return;

    const expectedChar = currentText[currentIndex];
    const typedChar = key === " " ? " " : key;
    this.typedText += key;

    const isCorrect = char === expectedChar || typedChar === expectedChar;
    const isSpace = spans[currentIndex].hasAttribute("data-space");

    spans[currentIndex].classList.remove("char-current", "char-pending");
    spans[currentIndex].classList.add(
      isCorrect ? "char-correct" : "char-incorrect",
    );
    if (isSpace) spans[currentIndex].setAttribute("data-space", "true");

    if (!isCorrect) {
      this.state.errors++;
      this.state.totalErrors++;
    }

    this.state.currentIndex++;

    if (this.state.currentIndex < currentText.length) {
      spans[this.state.currentIndex].classList.add("char-current");
      this.scrollToCurrent(spans);
    } else {
      this.state.completed = true;
      this.elements.nextBtnExtra.classList.remove("disabled-btn");
    }
  }

  scrollToCurrent(spans) {
    const current = spans[this.state.currentIndex];
    if (current)
      current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  getResults() {
    const { currentText } = this.state;
    const specialRegex = /[=:;()"!\/¿?.,-]/;
    let correctSpecialChars = 0;
    const len = Math.min(this.typedText.length, currentText.length);
    for (let i = 0; i < len; i++) {
      if (
        this.typedText[i] === currentText[i] &&
        specialRegex.test(currentText[i])
      ) {
        correctSpecialChars++;
      }
    }
    const totalSpecialChars = (currentText.match(/[=:;()"!\/¿?.,-]/g) || [])
      .length;
    return {
      errors: this.state.totalErrors,
      totalChars: currentText.length,
      correctSpecialChars,
      totalSpecialChars,
    };
  }
}

// ============================================
// GESTOR DE AVATARES
// ============================================
class AvatarManager {
  constructor(elements, config) {
    this.elements = elements;
    this.config = config;
    this.selectedAvatar = "01.png";
  }

  initialize() {
    this.loadAvatars();
  }

  loadAvatars() {
    this.elements.avatarGrid.innerHTML = "";
    for (let i = 1; i <= this.config.TOTAL_AVATARS; i++) {
      const filename = `${String(i).padStart(2, "0")}.png`;
      this.elements.avatarGrid.appendChild(this.createAvatarImage(filename));
    }
  }

  createAvatarImage(filename) {
    const img = document.createElement("img");
    img.src = `img/avatares/${filename}`;
    img.alt = `Avatar ${filename}`;
    img.className = "avatar-option";
    img.dataset.avatar = filename;
    if (filename === this.selectedAvatar) img.classList.add("selected");
    img.onerror = () => {
      img.style.display = "none";
    };
    return img;
  }

  openModal() {
    this.elements.avatarModal.classList.remove("hide");
    this.loadAvatars();
  }

  closeModal() {
    this.elements.avatarModal.classList.add("hide");
    if (this.elements.nameInput) this.elements.nameInput.focus();
  }

  selectAvatar(filename) {
    this.selectedAvatar = filename;
    this.elements.avatarImg.src = `img/avatares/${filename}`;
    this.elements.avatarImgResult.src = `img/avatares/${filename}`;
    document.querySelectorAll(".avatar-option").forEach((img) => {
      img.classList.toggle("selected", img.dataset.avatar === filename);
    });
    setTimeout(() => this.closeModal(), CONFIG.AVATAR_CLOSE_DELAY);
  }
}

// ============================================
// GESTOR DE CONFETI
// ============================================
class ConfettiManager {
  constructor() {
    this.container = document.getElementById("confetti-container");
    this.interval = null;
    this.colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#feca57",
      "#ee5a6f",
      "#c44569",
      "#f368e0",
      "#ff9ff3",
    ];
    this.shapes = ["confetti-square", "confetti-circle", "confetti-rectangle"];
  }

  launch() {
    for (let i = 0; i < CONFIG.CONFETTI_PIECES; i++) {
      setTimeout(() => this.createPiece(), i * 10);
    }
    this.interval = setInterval(() => {
      for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++)
        this.createPiece();
    }, CONFIG.CONFETTI_INTERVAL);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  createPiece() {
    const confetti = document.createElement("div");
    const shape = this.shapes[Utils.getRandomIndex(this.shapes.length)];
    const color = this.colors[Utils.getRandomIndex(this.colors.length)];
    confetti.className = `confetti ${shape}`;
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + "%";
    const duration = Math.random() * 2 + 3;
    const delay = Math.random() * 0.3;
    confetti.style.animationDuration = duration + "s";
    confetti.style.animationDelay = delay + "s";
    this.container.appendChild(confetti);
    setTimeout(() => confetti.remove(), (duration + delay) * 1000);
  }
}

// ============================================
// APLICACIÓN PRINCIPAL
// ============================================
class QuizApp {
  constructor() {
    this.userName = "";
    this.currentPhase = null; // 'quiz' | 'typing'
    this.settingsManager = new SettingsManager();
    this.elements = this.initElements();
    this.quizManager = new QuizManager(this.elements, CONFIG);
    this.typingTestManager = new TypingTestManager(this.elements, CONFIG);
    this.avatarManager = new AvatarManager(this.elements, CONFIG);
    this.timerManager = new TimerManager(this.elements.timerContainer, () =>
      this.endQuiz(),
    );
    this.confettiManager = new ConfettiManager();

    this.initEventListeners();
    this.preventPageRefresh();
    this.avatarManager.initialize();
  }

  initElements() {
    return {
      // Screens
      instructionsBox: document.querySelector(".instructions-box"),
      homeBox: document.querySelector(".home-box"),
      quizBox: document.querySelector(".quiz-box"),
      resultBox: document.querySelector(".result-box"),
      // Common
      timerContainer: document.querySelector(".timer-countdown"),
      nameInput: document.querySelector(".name"),
      // Phase 1 — Quiz
      questionBoxContainer: document.querySelector(".question-box-container"),
      questionNumber: document.querySelector(".question-number"),
      questionText: document.querySelector(".question-text"),
      optionContainer: document.querySelector(".option-container"),
      answersIndicator: document.querySelector(".answers-indicator"),
      nextBtn: document.querySelector(".next-btn"),
      // Phase 2 — Typing
      questionBoxContainerExtra: document.querySelector(
        ".question-box-container-extra",
      ),
      nextBtnExtra: document.querySelector(".next-btn-extra"),
      // Avatar
      avatarImg: document.getElementById("selectedAvatar"),
      avatarImgResult: document.getElementById("selectedAvatarResult"),
      avatarModal: document.getElementById("avatarModal"),
      avatarGrid: document.getElementById("avatarGrid"),
      // Settings
      settingsModal: document.getElementById("settingsModal"),
      checkPhase1: document.getElementById("checkPhase1"),
      checkPhase2: document.getElementById("checkPhase2"),
    };
  }

  initEventListeners() {
    document.addEventListener("click", (e) => this.handleClick(e));
    if (this.elements.nameInput) {
      this.elements.nameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.handleNameSubmit();
      });
    }
    document.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  handleClick(e) {
    // Settings
    if (e.target.id === "settingsBtn") {
      this.openSettings();
      return;
    }
    if (e.target.id === "closeSettings" || e.target.id === "settingsModal") {
      this.closeSettings();
      return;
    }
    if (e.target.id === "saveSettings") {
      this.saveSettings();
      return;
    }

    // Buttons
    if (e.target.closest(".btn")) {
      const btn = e.target.closest(".btn");
      const text = btn.textContent.trim();
      if (text === "INGRESAR") {
        this.handleNameSubmit();
        return;
      }
      if (text === "¡Comenzar!") {
        this.startQuiz();
        return;
      }
      if (btn.classList.contains("next-btn")) {
        this.handleNext();
        return;
      }
      if (btn.classList.contains("next-btn-extra")) {
        this.endQuiz();
        return;
      }
      return;
    }

    // Quiz options
    if (e.target.classList.contains("option")) {
      this.quizManager.handleOptionSelect(e.target);
      return;
    }

    // Avatar
    if (e.target.id === "editAvatarBtn") {
      this.avatarManager.openModal();
    } else if (e.target.id === "closeModal" || e.target.id === "avatarModal") {
      this.avatarManager.closeModal();
    } else if (e.target.classList.contains("avatar-option")) {
      this.avatarManager.selectAvatar(e.target.dataset.avatar);
    }
  }

  handleKeydown(e) {
    if (e.ctrlKey && e.key === "9") {
      e.preventDefault();
      this.elements.settingsModal.classList.contains("hide")
        ? this.openSettings()
        : this.closeSettings();
      return;
    }
    if (e.key === "Escape") {
      if (!this.elements.avatarModal.classList.contains("hide")) {
        this.avatarManager.closeModal();
        return;
      }
      if (!this.elements.settingsModal.classList.contains("hide")) {
        this.closeSettings();
        return;
      }
    }
    if (this.currentPhase === "typing") {
      this.typingTestManager.handleInput(e);
    }
  }

  preventPageRefresh() {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
      const preventKeys = [116, e.ctrlKey && 82, e.ctrlKey && 27];
      if (preventKeys.includes(e.keyCode) || (e.ctrlKey && e.keyCode === 116))
        e.preventDefault();
    });
  }

  // ---- Settings ----
  openSettings() {
    this.elements.checkPhase1.checked = this.settingsManager.settings.phase1;
    this.elements.checkPhase2.checked = this.settingsManager.settings.phase2;

    const { questionSet, questionLimit, maxPts1, maxPts2 } =
      this.settingsManager.settings;

    document.getElementById("maxPts1").value = maxPts1 ?? 20;
    document.getElementById("maxPts2").value = maxPts2 ?? 20;

    const savedSet = questionSet || Object.keys(QUESTION_SETS)[0];
    const list = document.getElementById("questionSetList");
    list.innerHTML = "";
    Object.keys(QUESTION_SETS).forEach((name) => {
      const count = QUESTION_SETS[name].length;
      const label = document.createElement("label");
      label.className = "settings-option";
      label.innerHTML = `
        <input type="radio" name="questionSet" value="${name}" ${name === savedSet ? "checked" : ""} />
        <span>${name} <small>(${count} preguntas)</small></span>
      `;
      list.appendChild(label);
    });

    const maxAvailable = QUESTION_SETS[savedSet]?.length || 1;
    const limitInput = document.getElementById("questionLimit");
    limitInput.max = maxAvailable;
    limitInput.value = Math.min(questionLimit ?? 10, maxAvailable);
    document.getElementById("questionLimitMax").textContent =
      `/ ${maxAvailable}`;

    // Actualizar max al cambiar el banco
    list.addEventListener("change", () => {
      const selected = document.querySelector(
        'input[name="questionSet"]:checked',
      );
      if (selected) {
        const max = QUESTION_SETS[selected.value]?.length || 1;
        limitInput.max = max;
        if (parseInt(limitInput.value) > max) limitInput.value = max;
        document.getElementById("questionLimitMax").textContent = `/ ${max}`;
      }
    });

    this.elements.settingsModal.classList.remove("hide");
  }

  closeSettings() {
    this.elements.settingsModal.classList.add("hide");
  }

  saveSettings() {
    const phase1 = this.elements.checkPhase1.checked;
    const phase2 = this.elements.checkPhase2.checked;
    if (!phase1 && !phase2) {
      Utils.showToast("Debés habilitar al menos una fase");
      return;
    }
    const selectedSet = document.querySelector(
      'input[name="questionSet"]:checked',
    );
    const questionSet = selectedSet
      ? selectedSet.value
      : Object.keys(QUESTION_SETS)[0];
    const maxAvailable = QUESTION_SETS[questionSet]?.length || 1;
    const questionLimit = Math.min(
      Math.max(
        1,
        parseInt(document.getElementById("questionLimit").value) || 10,
      ),
      maxAvailable,
    );
    const maxPts1 = Math.max(
      1,
      parseInt(document.getElementById("maxPts1").value) || 20,
    );
    const maxPts2 = Math.max(
      1,
      parseInt(document.getElementById("maxPts2").value) || 20,
    );
    this.settingsManager.save(
      phase1,
      phase2,
      questionSet,
      questionLimit,
      maxPts1,
      maxPts2,
    );
    this.closeSettings();
    Utils.showToast("Configuración guardada");
  }

  // ---- Flow ----
  handleNameSubmit() {
    const name = this.elements.nameInput.value.trim();
    if (!name) {
      Utils.showToast("Por favor, ingresá tu nombre");
      return;
    }
    this.userName = name;
    this.updateInstructions();
    Utils.toggleScreen(this.elements.instructionsBox, this.elements.homeBox);
  }

  updateInstructions() {
    const { phase1, phase2 } = this.settingsManager.settings;
    const p = this.elements.homeBox.querySelector("p");
    if (phase1 && phase2) {
      p.innerHTML =
        "Responda <strong>preguntas</strong> de opción múltiple y complete la <strong>prueba de escritura</strong>. Los símbolos especiales suman puntos extra.";
    } else if (phase1) {
      p.innerHTML =
        "Lea con <strong>atención</strong> cada pregunta y seleccione la respuesta correcta. Haga clic en <strong>Siguiente</strong> para continuar.";
    } else {
      p.innerHTML =
        'Escriba el texto que aparece en pantalla con la mayor <strong>precisión</strong> posible. Los símbolos especiales (<strong>= : ; ( ) " ! / ¿ ? . , -</strong>) suman puntos extra.';
    }
  }

  startQuiz() {
    const { phase1, phase2 } = this.settingsManager.settings;
    Utils.toggleScreen(this.elements.homeBox, this.elements.quizBox);
    this.timerManager.start();

    if (phase1) {
      this.currentPhase = "quiz";
      const { questionSet, questionLimit } = this.settingsManager.settings;
      const questions =
        QUESTION_SETS[questionSet] ||
        QUESTION_SETS[Object.keys(QUESTION_SETS)[0]];
      this.quizManager.initialize(questions, questionLimit);
      this.quizManager.loadNextQuestion();
      Utils.toggleScreen(
        this.elements.questionBoxContainerExtra,
        this.elements.questionBoxContainer,
      );
    } else {
      this.currentPhase = "typing";
      this.typingTestManager.initialize();
      Utils.toggleScreen(
        this.elements.questionBoxContainer,
        this.elements.questionBoxContainerExtra,
      );
    }
  }

  handleNext() {
    const hasAnswered =
      this.elements.optionContainer.querySelector(".already-answered");
    if (!hasAnswered) return;

    if (!this.quizManager.loadNextQuestion()) {
      const { phase2 } = this.settingsManager.settings;
      if (phase2) {
        this.startTypingTest();
      } else {
        this.endQuiz();
      }
    }
  }

  startTypingTest() {
    this.currentPhase = "typing";
    Utils.toggleScreen(
      this.elements.questionBoxContainer,
      this.elements.questionBoxContainerExtra,
    );
    this.typingTestManager.initialize();
  }

  endQuiz() {
    this.timerManager.stop();
    this.currentPhase = null;
    Utils.toggleScreen(this.elements.quizBox, this.elements.resultBox);
    this.displayResults();
    this.confettiManager.launch();
  }

  // ---- Results ----
  calcTypingScore(typingResults, maxPts) {
    const { errors, totalChars, correctSpecialChars, totalSpecialChars } =
      typingResults;
    const half = maxPts / 2;
    const accuracyPts =
      totalChars > 0
        ? Math.max(0, Math.round((half * (totalChars - errors)) / totalChars))
        : 0;
    const specialPts =
      totalSpecialChars > 0
        ? Math.round(
            (half * Math.min(correctSpecialChars, totalSpecialChars)) /
              totalSpecialChars,
          )
        : 0;
    return { accuracyPts, specialPts };
  }

  setCard(card, value, label) {
    card.children[0].textContent = value;
    card.children[1].textContent = label;
  }

  displayResults() {
    const {
      phase1,
      phase2,
      maxPts1 = 20,
      maxPts2 = 20,
    } = this.settingsManager.settings;
    const cards = this.elements.resultBox.querySelectorAll(".card");
    let totalPoints = 0;
    let maxPoints = 0;

    if (phase1 && phase2) {
      const qr = this.quizManager.getResults();
      const tr = this.typingTestManager.getResults();
      const { accuracyPts, specialPts } = this.calcTypingScore(tr, maxPts2);
      const limit = this.quizManager.currentLimit;
      const quizPts = Math.round((qr.correctAnswers * maxPts1) / limit);
      const typingPts = accuracyPts + specialPts;
      totalPoints = quizPts + typingPts;
      maxPoints = maxPts1 + maxPts2;
      this.setCard(cards[0], `${quizPts}/${maxPts1}`, "Quiz");
      this.setCard(cards[1], `${typingPts}/${maxPts2}`, "Escritura");
      this.setCard(cards[2], tr.errors, "Errores");
    } else if (phase1) {
      const qr = this.quizManager.getResults();
      const limit = this.quizManager.currentLimit;
      const quizPts = Math.round((qr.correctAnswers * maxPts1) / limit);
      totalPoints = quizPts;
      maxPoints = maxPts1;
      this.setCard(cards[0], limit, "Preguntas");
      this.setCard(cards[1], qr.correctAnswers, "Correctas");
      this.setCard(cards[2], qr.wrongAnswers, "Incorrectas");
    } else {
      const tr = this.typingTestManager.getResults();
      const half = maxPts2 / 2;
      const { accuracyPts, specialPts } = this.calcTypingScore(tr, maxPts2);
      totalPoints = accuracyPts + specialPts;
      maxPoints = maxPts2;
      this.setCard(cards[0], `${accuracyPts}/${half}`, "Precisión");
      this.setCard(cards[1], `${specialPts}/${half}`, "Símbolos");
      this.setCard(cards[2], tr.errors, "Errores");
    }

    this.elements.resultBox.querySelector(".total-score").textContent =
      `${Math.min(totalPoints, maxPoints)} / ${maxPoints} pts`;
    this.elements.resultBox.querySelector(".name-result").textContent =
      this.userName;
  }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  new QuizApp();
});
