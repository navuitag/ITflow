/** Trò chơi arcade độc lập — phong cách Kiến Vàng (vừa học vừa chơi). */

export const ARCADE_GAMES = [
  {
    id: "click-frenzy",
    title: "Click Frenzy",
    subtitle: "Nháy nhanh vào biểu tượng",
    icon: "🖱️",
    category: "mouse",
    bands: ["tieu-hoc", "thcs"],
    grades: [1, 2, 3, 4, 5, 6, 7],
    xp: 15,
    description: "Luyện phản xạ chuột: nháy vào icon xuất hiện ngẫu nhiên trong 30 giây."
  },
  {
    id: "typing-sprint",
    title: "Typing Sprint",
    subtitle: "Đua gõ từ tiếng Anh",
    icon: "⌨️",
    category: "keyboard",
    bands: ["tieu-hoc", "thcs", "thpt"],
    grades: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    xp: 20,
    description: "Gõ đúng từ hiện trên màn hình — luyện tốc độ và độ chính xác bàn phím."
  },
  {
    id: "device-match",
    title: "Ghép thiết bị",
    subtitle: "Memory card phần cứng",
    icon: "🧩",
    category: "memory",
    bands: ["tieu-hoc", "thcs"],
    grades: [1, 2, 3, 4, 5, 6],
    xp: 18,
    description: "Ghép cặp tên thiết bị máy tính — CPU, RAM, chuột, màn hình..."
  },
  {
    id: "binary-blitz",
    title: "Binary Blitz",
    subtitle: "Đổi nhị phân sang thập phân",
    icon: "🔢",
    category: "logic",
    bands: ["thcs", "thpt"],
    grades: [8, 9, 10, 11, 12],
    xp: 25,
    description: "Trò chơi trắc nghiệm nhanh: chọn giá trị thập phân của số nhị phân 4 bit."
  }
];

const TYPING_WORDS = [
  "cat", "dog", "sun", "book", "mouse", "keyboard", "school", "computer", "internet", "scratch",
  "lop3", "tin", "hoc", "game", "play", "code", "byte", "data", "file", "save"
];

const DEVICE_PAIRS = [
  ["CPU", "Bộ xử lý"],
  ["RAM", "Bộ nhớ"],
  ["Monitor", "Màn hình"],
  ["Mouse", "Chuột"],
  ["Keyboard", "Bàn phím"],
  ["Speaker", "Loa"]
];

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = randInt(i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function binaryQuestion() {
  const value = randInt(16);
  const bits = value.toString(2).padStart(4, "0");
  const options = shuffle([value, (value + 1) % 16, (value + 3) % 16, (value + 7) % 16].map(String));
  return { bits, answer: String(value), options };
}

export function renderArcadeGame(gameId, escapeHtml, bestScore = 0) {
  const game = ARCADE_GAMES.find((item) => item.id === gameId);
  if (!game) return null;

  const shells = {
    "click-frenzy": `
      <div class="arcade-stage" id="arcadeStage">
        <div class="arcade-hud">
          <span>⏱ <strong id="arcadeTimer">30</strong>s</span>
          <span>🎯 <strong id="arcadeScore">0</strong></span>
          ${bestScore ? `<span>🏆 ${bestScore}</span>` : ""}
        </div>
        <div class="arcade-click-field" id="arcadeClickField" aria-label="Vùng nháy chuột"></div>
        <p class="arcade-hint" id="arcadeHint">Nhấn Bắt đầu — rồi nháy vào biểu tượng xuất hiện!</p>
        <button type="button" class="btn primary" id="arcadeStart">Bắt đầu</button>
      </div>`,
    "typing-sprint": `
      <div class="arcade-stage" id="arcadeStage">
        <div class="arcade-hud">
          <span>⏱ <strong id="arcadeTimer">45</strong>s</span>
          <span>✅ <strong id="arcadeScore">0</strong> từ</span>
          ${bestScore ? `<span>🏆 ${bestScore}</span>` : ""}
        </div>
        <div class="arcade-word" id="arcadeWord">---</div>
        <input class="arcade-type-input" id="arcadeTypeInput" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" disabled placeholder="Gõ từ rồi Enter">
        <p class="arcade-hint" id="arcadeHint">Gõ đúng từ và nhấn Enter. Không cần dấu.</p>
        <button type="button" class="btn primary" id="arcadeStart">Bắt đầu</button>
      </div>`,
    "device-match": `
      <div class="arcade-stage" id="arcadeStage">
        <div class="arcade-hud">
          <span>Lượt: <strong id="arcadeMoves">0</strong></span>
          <span>Cặp: <strong id="arcadeScore">0</strong>/6</span>
        </div>
        <div class="arcade-memory-grid" id="arcadeMemoryGrid"></div>
        <p class="arcade-hint" id="arcadeHint">Lật thẻ và ghép tên tiếng Anh với tiếng Việt.</p>
      </div>`,
    "binary-blitz": `
      <div class="arcade-stage" id="arcadeStage">
        <div class="arcade-hud">
          <span>Câu <strong id="arcadeQIndex">1</strong>/8</span>
          <span>✅ <strong id="arcadeScore">0</strong></span>
        </div>
        <p class="arcade-binary-label">Nhị phân</p>
        <div class="arcade-binary-value" id="arcadeBinary">0000</div>
        <p class="arcade-hint">Chọn giá trị thập phân đúng:</p>
        <div class="arcade-options" id="arcadeOptions"></div>
        <p class="arcade-feedback" id="arcadeFeedback" hidden></p>
      </div>`
  };

  return `
    <section class="arcade-play">
      <a class="back-link" href="#/games">← Trò chơi</a>
      <header class="arcade-play-head">
        <span class="tag">${escapeHtml(game.icon)} ${escapeHtml(game.category)}</span>
        <h1>${escapeHtml(game.title)}</h1>
        <p>${escapeHtml(game.description)}</p>
      </header>
      ${shells[gameId] || ""}
      <div class="arcade-result" id="arcadeResult" hidden></div>
    </section>`;
}

function finishGame(ctx, game, score, message) {
  const prevBest = ctx.getState().arcadeScores?.[game.id]?.best || 0;
  const best = Math.max(prevBest, score);
  ctx.updateState((state) => {
    if (!state.arcadeScores) state.arcadeScores = {};
    state.arcadeScores[game.id] = { best, last: score, playedAt: Date.now() };
    const xp = Math.min(game.xp, Math.max(5, Math.round(score / 2)));
    state.xp += xp;
    state.todayXp += xp;
    state.dailyQuest.progress = Math.min(state.dailyQuest.target, state.dailyQuest.progress + 1);
  });
  const result = document.getElementById("arcadeResult");
  if (result) {
    result.hidden = false;
    result.innerHTML = `
      <h2>${message}</h2>
      <p>Điểm: <strong>${score}</strong>${best > score ? ` · Kỷ lục: ${best}` : " · Kỷ lục mới! 🎉"}</p>
      <div class="hero-actions">
        <button type="button" class="btn primary" id="arcadeReplay">Chơi lại</button>
        <a class="btn secondary" href="#/games">Về sảnh game</a>
      </div>`;
    result.querySelector("#arcadeReplay")?.addEventListener("click", () => ctx.renderRoute());
  }
}

export function bindArcadeGame(gameId, ctx) {
  const game = ARCADE_GAMES.find((item) => item.id === gameId);
  if (!game) return;

  if (gameId === "click-frenzy") bindClickFrenzy(game, ctx);
  else if (gameId === "typing-sprint") bindTypingSprint(game, ctx);
  else if (gameId === "device-match") bindDeviceMatch(game, ctx);
  else if (gameId === "binary-blitz") bindBinaryBlitz(game, ctx);
}

function bindClickFrenzy(game, ctx) {
  const field = document.getElementById("arcadeClickField");
  const timerEl = document.getElementById("arcadeTimer");
  const scoreEl = document.getElementById("arcadeScore");
  const startBtn = document.getElementById("arcadeStart");
  const hint = document.getElementById("arcadeHint");
  if (!field || !startBtn) return;

  let score = 0;
  let timeLeft = 30;
  let timerId = null;
  let targetEl = null;
  const glyphs = ["📁", "🎮", "🎨", "⭐", "💻", "🔤", "🎯", "🐱"];

  const spawn = () => {
    targetEl?.remove();
    targetEl = document.createElement("button");
    targetEl.type = "button";
    targetEl.className = "arcade-target";
    targetEl.textContent = glyphs[randInt(glyphs.length)];
    targetEl.style.left = `${10 + randInt(70)}%`;
    targetEl.style.top = `${10 + randInt(60)}%`;
    targetEl.addEventListener("click", () => {
      score += 1;
      if (scoreEl) scoreEl.textContent = String(score);
      spawn();
    });
    field.appendChild(targetEl);
  };

  const end = () => {
    clearInterval(timerId);
    targetEl?.remove();
    startBtn.hidden = false;
    if (hint) hint.textContent = "Hết giờ! Chơi lại để phá kỷ lục.";
    finishGame(ctx, game, score, score >= 15 ? "Xuất sắc!" : score >= 8 ? "Khá tốt!" : "Cố gắng thêm nhé!");
  };

  startBtn.addEventListener("click", () => {
    score = 0;
    timeLeft = 30;
    if (scoreEl) scoreEl.textContent = "0";
    if (timerEl) timerEl.textContent = "30";
    startBtn.hidden = true;
    if (hint) hint.textContent = "Nháy nhanh vào biểu tượng!";
    spawn();
    timerId = setInterval(() => {
      timeLeft -= 1;
      if (timerEl) timerEl.textContent = String(timeLeft);
      if (timeLeft <= 0) end();
    }, 1000);
  });
}

function bindTypingSprint(game, ctx) {
  const input = document.getElementById("arcadeTypeInput");
  const wordEl = document.getElementById("arcadeWord");
  const timerEl = document.getElementById("arcadeTimer");
  const scoreEl = document.getElementById("arcadeScore");
  const startBtn = document.getElementById("arcadeStart");
  if (!input || !startBtn) return;

  let score = 0;
  let timeLeft = 45;
  let timerId = null;
  let currentWord = "";

  const nextWord = () => {
    currentWord = TYPING_WORDS[randInt(TYPING_WORDS.length)];
    if (wordEl) wordEl.textContent = currentWord;
    input.value = "";
  };

  const end = () => {
    clearInterval(timerId);
    input.disabled = true;
    startBtn.hidden = false;
    finishGame(ctx, game, score, score >= 8 ? "Bàn phím bay!" : "Luyện thêm vài lần nữa nhé!");
  };

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || input.disabled) return;
    event.preventDefault();
    if (input.value.trim().toLowerCase() === currentWord) {
      score += 1;
      if (scoreEl) scoreEl.textContent = String(score);
      nextWord();
    } else {
      input.classList.add("is-wrong");
      setTimeout(() => input.classList.remove("is-wrong"), 300);
    }
  });

  startBtn.addEventListener("click", () => {
    score = 0;
    timeLeft = 45;
    if (scoreEl) scoreEl.textContent = "0";
    if (timerEl) timerEl.textContent = "45";
    startBtn.hidden = true;
    input.disabled = false;
    input.focus();
    nextWord();
    timerId = setInterval(() => {
      timeLeft -= 1;
      if (timerEl) timerEl.textContent = String(timeLeft);
      if (timeLeft <= 0) end();
    }, 1000);
  });
}

function bindDeviceMatch(game, ctx) {
  const grid = document.getElementById("arcadeMemoryGrid");
  const movesEl = document.getElementById("arcadeMoves");
  const scoreEl = document.getElementById("arcadeScore");
  if (!grid) return;

  const cards = [];
  DEVICE_PAIRS.forEach(([en, vi], index) => {
    cards.push({ id: `a${index}`, pairId: `p${index}`, text: en, label: "EN" });
    cards.push({ id: `b${index}`, pairId: `p${index}`, text: vi, label: "VI" });
  });
  shuffle(cards).forEach((card) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "arcade-memory-card";
    btn.dataset.cardId = card.id;
    btn.dataset.pairId = card.pairId;
    btn.innerHTML = `<span class="arcade-memory-back">?</span><span class="arcade-memory-front"><small>${card.label}</small>${card.text}</span>`;
    grid.appendChild(btn);
  });

  let flipped = [];
  let matched = 0;
  let moves = 0;

  grid.querySelectorAll(".arcade-memory-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-open") || btn.classList.contains("is-matched")) return;
      if (flipped.length >= 2) return;
      btn.classList.add("is-open");
      flipped.push(btn);
      if (flipped.length < 2) return;
      moves += 1;
      if (movesEl) movesEl.textContent = String(moves);
      const [a, b] = flipped;
      if (a.dataset.pairId === b.dataset.pairId) {
        a.classList.add("is-matched");
        b.classList.add("is-matched");
        matched += 1;
        if (scoreEl) scoreEl.textContent = String(matched);
        flipped = [];
        if (matched === DEVICE_PAIRS.length) {
          finishGame(ctx, game, Math.max(6, 20 - moves), "Ghép xong tất cả thiết bị!");
        }
      } else {
        setTimeout(() => {
          a.classList.remove("is-open");
          b.classList.remove("is-open");
          flipped = [];
        }, 700);
      }
    });
  });
}

function bindBinaryBlitz(game, ctx) {
  const optionsEl = document.getElementById("arcadeOptions");
  const binaryEl = document.getElementById("arcadeBinary");
  const qIndexEl = document.getElementById("arcadeQIndex");
  const scoreEl = document.getElementById("arcadeScore");
  const feedback = document.getElementById("arcadeFeedback");
  if (!optionsEl) return;

  let qIndex = 0;
  let score = 0;
  const total = 8;

  const showQuestion = () => {
    const q = binaryQuestion();
    if (binaryEl) binaryEl.textContent = q.bits;
    if (qIndexEl) qIndexEl.textContent = String(qIndex + 1);
    if (feedback) feedback.hidden = true;
    optionsEl.innerHTML = q.options.map((opt) => `
      <button type="button" class="btn secondary arcade-option" data-answer="${opt}">${opt}</button>`).join("");
    optionsEl.querySelectorAll(".arcade-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        optionsEl.querySelectorAll(".arcade-option").forEach((el) => { el.disabled = true; });
        const correct = btn.dataset.answer === q.answer;
        if (correct) {
          score += 1;
          if (scoreEl) scoreEl.textContent = String(score);
        }
        if (feedback) {
          feedback.hidden = false;
          feedback.textContent = correct ? "Đúng!" : `Sai — đáp án: ${q.answer}`;
          feedback.className = `arcade-feedback ${correct ? "is-ok" : "is-warn"}`;
        }
        qIndex += 1;
        setTimeout(() => {
          if (qIndex >= total) {
            finishGame(ctx, game, score, score >= 6 ? "Binary master!" : "Ôn lại hệ nhị phân nhé!");
          } else {
            showQuestion();
          }
        }, 700);
      });
    });
  };

  showQuestion();
}
