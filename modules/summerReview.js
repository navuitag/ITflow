import { escapeHtml } from "../assets/js/utils.js";
import { renderQuizCard, focusAnswerInput } from "../components/quizCard.js";
import { showModal } from "../components/modal.js";
import { validateAnswer } from "./quizEngine.js";
import { updateState } from "../assets/js/state.js";

const XP_TOPIC = 30;
const XP_EXAM = 50;
const XP_COMBO_BONUS = 5;
const XP_PERFECT = 20;

function defaultSummerState() {
  return { packs: {} };
}

function migrateSummerReview(raw) {
  if (!raw) return defaultSummerState();
  if (raw.packs) return raw;
  return {
    packs: {
      "g1-g2": {
        topicStars: raw.topicStars || {},
        completedTopics: raw.completedTopics || [],
        examResults: raw.examResults || {},
        unlockedExams: raw.unlockedExams || ["exam_1"],
        bestCombo: raw.bestCombo || 0
      }
    }
  };
}

function defaultPackProgress(pack) {
  const firstExam = pack?.exams?.[0]?.id || "exam_1";
  return {
    topicStars: {},
    completedTopics: [],
    examResults: {},
    unlockedExams: [firstExam],
    bestCombo: 0
  };
}

function getPackProgress(state, packId, pack) {
  if (!state.summerReview) state.summerReview = defaultSummerState();
  state.summerReview = migrateSummerReview(state.summerReview);
  if (!state.summerReview.packs[packId]) {
    state.summerReview.packs[packId] = defaultPackProgress(pack);
  }
  return state.summerReview.packs[packId];
}

function isTopicUnlocked(topic, progress, completedTopics) {
  if (!topic.prerequisite?.length) return true;
  return topic.prerequisite.every((id) => completedTopics.includes(id));
}

function isExamUnlocked(exam, progress) {
  return progress.unlockedExams.includes(exam.id);
}

function getTopicQuestions(data, topicId) {
  return data.questions.filter((q) => q.topic === topicId);
}

function getExamQuestions(data, examId) {
  return data.questions.filter((q) => q.exam === examId);
}

function starsFromAccuracy(correct, total) {
  const pct = total ? correct / total : 0;
  if (pct >= 1) return 3;
  if (pct >= 0.75) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

function renderStars(count) {
  return Array.from({ length: 3 }, (_, i) => `<span class="sr-star${i < count ? " filled" : ""}">★</span>`).join("");
}

function awardXp(amount, reason) {
  updateState((state) => {
    state.xp += amount;
    state.todayXp += amount;
  });
  return amount;
}

export function createSummerReviewModule(ctx) {
  const session = {
    packId: null,
    mode: null,
    id: null,
    questions: [],
    index: 0,
    correct: 0,
    combo: 0,
    answers: []
  };

  function resetSession() {
    session.packId = null;
    session.mode = null;
    session.id = null;
    session.questions = [];
    session.index = 0;
    session.correct = 0;
    session.combo = 0;
    session.answers = [];
  }

  function getPacks() {
    return ctx.data.summerPacks || {};
  }

  function getPack(packId) {
    return getPacks()[packId] || { topics: [], exams: [], lessons: [], questions: [], meta: {} };
  }

  function initTopicSession(packId, topicId, data) {
    session.packId = packId;
    session.mode = "topic";
    session.id = topicId;
    session.questions = getTopicQuestions(data, topicId);
    session.index = 0;
    session.correct = 0;
    session.combo = 0;
    session.answers = [];
  }

  function initExamSession(packId, examId, data) {
    session.packId = packId;
    session.mode = "exam";
    session.id = examId;
    session.questions = getExamQuestions(data, examId);
    session.index = 0;
    session.correct = 0;
    session.combo = 0;
    session.answers = [];
  }

  function navigateFromLink(link) {
    const href = link?.getAttribute("href") || "";
    if (!href) return;
    const route = href.startsWith("#") ? href : `#${href.split("#").pop()}`;
    if (ctx.setRoute) ctx.setRoute(route);
    else window.location.hash = route;
  }

  function packLink(packId, ...parts) {
    return `#/summer/${packId}${parts.length ? `/${parts.join("/")}` : ""}`;
  }

  function resolvePackId(candidate) {
    const packs = getPacks();
    if (candidate && packs[candidate]) return candidate;
    return null;
  }

  function examTags(packId) {
    const tags = {
      "g11-g12": ["AI", "Mạng", "Web", "ML", "Hướng nghiệp"],
      "g10-g11": ["Python", "CSDL", "Mạng", "Đồ họa", "Thuật toán"],
      "g9-g10": ["Bảng tính", "Python", "Mạng", "Đạo đức số", "Dự án"],
      "g8-g9": ["Thuật toán", "Bảng tính", "Ảnh/video", "Mạng", "Tư duy"],
      "g7-g8": ["Bảng tính", "Trình chiếu", "Thuật toán", "Internet", "An toàn"],
      "g6-g7": ["Văn bản", "Trình chiếu", "Thuật toán", "Mạng", "Dự án"],
      "g5-g6": ["Văn bản", "Trình chiếu", "Blockly", "Internet", "An toàn"],
      "g4-g5": ["Văn bản", "Trình chiếu", "Blockly", "Ảnh", "Dự án"],
      "g3-g4": ["Paint", "Văn bản", "Blockly", "Internet", "An toàn"],
      "g2-g3": ["Chuột", "Bàn phím", "Paint", "Internet", "Trò chơi"],
      "g1-g2": ["Chuột", "Bàn phím", "An toàn", "Paint", "Tư duy"]
    };
    return tags[packId] || ["Tin học", "Thực hành", "Lý thuyết", "An toàn", "Dự án"];
  }

  function renderPackPicker(state) {
    const packs = getPacks();
    const cards = Object.entries(packs).map(([packId, pack]) => {
      const progress = getPackProgress(state, packId, pack);
      const topicDone = progress.completedTopics.length;
      const examDone = Object.values(progress.examResults).filter((r) => r.passed).length;
      const stars = Object.values(progress.topicStars).reduce((a, b) => a + b, 0);
      return `
        <article class="sr-pack-card card-panel">
          <span class="tag">Lớp ${pack.meta.gradeFrom} → ${pack.meta.gradeTo}</span>
          <h2>${escapeHtml(pack.meta.title)}</h2>
          <p>${escapeHtml(pack.meta.subtitle)}</p>
          <div class="sr-pack-stats">
            <span>${topicDone}/${pack.topics.length} chủ đề</span>
            <span>${examDone}/${pack.exams.length} đề</span>
            <span>${stars} sao</span>
          </div>
          <a class="btn primary" href="${packLink(packId)}">Vào lộ trình →</a>
        </article>
      `;
    }).join("");

    return `
      <section class="sr-hero">
        <a class="back-link" href="#/home">← Trang chủ</a>
        <span class="eyebrow">Ôn hè · Gamification</span>
        <h1>Chọn lộ trình ôn hè</h1>
        <p>Mỗi lộ trình có bài học ngắn, luyện tập tương tác, sao thưởng và đề tổng hợp mở khóa dần.</p>
      </section>
      <div class="sr-pack-grid">${cards}</div>
    `;
  }

  function renderHub(packId, state) {
    const data = getPack(packId);
    if (!data.meta?.title) return ctx.notFound("Không tìm thấy lộ trình ôn hè.");
    const progress = getPackProgress(state, packId, data);
    const completedTopics = progress.completedTopics || [];
    const topicDone = completedTopics.length;
    const examDone = Object.keys(progress.examResults || {}).filter((id) => progress.examResults[id]?.passed).length;
    const totalStars = Object.values(progress.topicStars || {}).reduce((a, b) => a + b, 0);

    const topicCards = data.topics
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((topic) => {
        const unlocked = isTopicUnlocked(topic, progress, completedTopics);
        const stars = progress.topicStars[topic.id] || 0;
        const done = completedTopics.includes(topic.id);
        return `
          <article class="sr-topic-card${unlocked ? "" : " locked"}${done ? " done" : ""}">
            <div class="sr-topic-icon">${topic.emoji}</div>
            <div class="sr-topic-body">
              <span class="sr-topic-order">Chủ đề ${topic.order}</span>
              <h3>${escapeHtml(topic.title)}</h3>
              <p>${escapeHtml(topic.description)}</p>
              <div class="sr-topic-meta">
                ${renderStars(stars)}
                <span>${topic.xp} XP</span>
              </div>
            </div>
            ${unlocked
    ? `<a class="btn primary sr-topic-btn" href="${packLink(packId, "topic", topic.id)}">${done ? "Ôn lại" : "Bắt đầu"}</a>`
    : `<span class="sr-lock">🔒 Hoàn thành chủ đề trước</span>`}
          </article>
        `;
      }).join("");

    const examPath = data.exams.map((exam) => {
      const unlocked = isExamUnlocked(exam, progress);
      const result = progress.examResults[exam.id];
      const passed = result && result.correct >= exam.passScore;
      return `
        <a class="sr-exam-node${unlocked ? "" : " locked"}${passed ? " passed" : ""}" href="${unlocked ? packLink(packId, "exam", exam.id) : "#"}" ${unlocked ? "" : 'aria-disabled="true"'}>
          <span class="sr-exam-num">${exam.order}</span>
          ${passed ? `<span class="sr-exam-badge">✓</span>` : ""}
        </a>
      `;
    }).join("");

    return `
      <section class="sr-hero">
        <a class="back-link" href="#/summer">← Chọn lộ trình</a>
        <span class="eyebrow">Luyện tập tương tác · Lớp ${data.meta.gradeFrom} → ${data.meta.gradeTo}</span>
        <h1>${escapeHtml(data.meta.title)}</h1>
        <p>${escapeHtml(data.meta.subtitle || "")}</p>
        <div class="sr-hero-stats">
          <article><strong>${topicDone}/${data.topics.length}</strong><span>Chủ đề</span></article>
          <article><strong>${examDone}/${data.exams.length}</strong><span>Đề ôn</span></article>
          <article><strong>${totalStars}</strong><span>Sao</span></article>
          <article><strong>${progress.bestCombo || 0}</strong><span>Combo cao nhất</span></article>
        </div>
      </section>

      <section class="sr-section">
        <header class="section-head">
          <h2>🗺️ Lộ trình ${data.topics.length} chủ đề</h2>
          <p>Học lý thuyết ngắn → luyện câu hỏi → nhận sao và XP</p>
        </header>
        <div class="sr-topic-grid">${topicCards}</div>
      </section>

      <section class="sr-section">
        <header class="section-head">
          <h2>🏆 ${data.exams.length} đề tổng hợp</h2>
          <p>Hoàn thành từng đề để mở khóa đề tiếp theo. Đạt ≥ ${data.exams[0]?.passScore || 4}/${data.exams[0]?.questionCount || 5} câu để vượt qua.</p>
        </header>
        <div class="sr-exam-path">${examPath}</div>
      </section>

      <section class="sr-rules card-panel">
        <h3>🎮 Quy tắc game hóa</h3>
        <ul>
          <li><strong>+10 XP</strong> mỗi câu đúng · <strong>+${XP_COMBO_BONUS} XP</strong> bonus khi combo ≥ 3</li>
          <li><strong>+${XP_TOPIC} XP</strong> khi hoàn thành chủ đề · <strong>+${XP_EXAM} XP</strong> khi vượt đề</li>
          <li><strong>+${XP_PERFECT} XP</strong> thưởng không sai · Sao: 3★ = 100%, 2★ ≥ 75%, 1★ ≥ 50%</li>
        </ul>
      </section>
    `;
  }

  function renderTopicLesson(packId, topicId, state) {
    const data = getPack(packId);
    const topic = data.topics.find((t) => t.id === topicId);
    const lesson = data.lessons.find((l) => l.id === topicId);
    if (!topic || !lesson) return ctx.notFound("Không tìm thấy chủ đề.");

    const progress = getPackProgress(state, packId, data);
    const stars = progress.topicStars[topicId] || 0;
    const qCount = getTopicQuestions(data, topicId).length;

    return `
      <section class="lesson-layout sr-lesson">
        <aside class="lesson-sidebar">
          <a class="back-link" href="${packLink(packId)}">← Ôn hè</a>
          <span class="sr-topic-icon lg">${topic.emoji}</span>
          <h1>${escapeHtml(topic.title)}</h1>
          <a class="lesson-mm-link" href="#/mindmap/summer/${encodeURIComponent(packId)}/${encodeURIComponent(topicId)}">🧠 Sơ đồ chủ đề</a>
          <p>${renderStars(stars)} · ${qCount} câu luyện</p>
          <div class="progress-track"><span style="width:${Math.round((stars / 3) * 100)}%"></span></div>
        </aside>
        <div class="lesson-steps">
          ${lesson.steps.map((step, index) => `
            <article class="lesson-step${step.type === "keypoints" ? " lesson-step-keypoints" : ""}">
              <span class="step-count">${index + 1}</span>
              <div>
                <h2>${escapeHtml(step.title)}</h2>
                ${step.type === "keypoints" && step.points?.length ? `
                  <ul class="keypoints-list">
                  </ul>` : ""}
              </div>
            </article>
          `).join("")}
          <div class="completion-panel sr-play-panel">
            <div>
              <h2>Sẵn sàng thử thách?</h2>
              <p>Luyện ${qCount} câu — giữ combo để nhận XP thưởng!</p>
            </div>
            <a class="btn primary" href="${packLink(packId, "topic", topicId, "play")}">Chơi ngay 🎯</a>
          </div>
        </div>
      </section>
    `;
  }

  function renderPlayHeader() {
    const total = session.questions.length;
    const current = session.index + 1;
    const pct = total ? Math.round((session.index / total) * 100) : 0;
    return `
      <div class="sr-play-header">
        <div class="sr-play-progress">
          <span>Câu ${current}/${total}</span>
          <div class="progress-track"><span style="width:${pct}%"></span></div>
        </div>
        <div class="sr-combo${session.combo >= 3 ? " hot" : ""}" aria-live="polite">
          🔥 Combo ×${session.combo}
        </div>
        <div class="sr-score">✓ ${session.correct}</div>
      </div>
    `;
  }

  function renderTopicPlay(packId, topicId, state) {
    const data = getPack(packId);
    const topic = data.topics.find((t) => t.id === topicId);
    if (!topic) return ctx.notFound("Không tìm thấy chủ đề.");

    const continuing = session.mode === "topic" && session.id === topicId && session.questions.length;
    if (!continuing) {
      initTopicSession(packId, topicId, data);
    }

    if (session.index >= session.questions.length) {
      return renderTopicComplete(packId, topicId, state);
    }

    const question = session.questions[session.index];
    return `
      <section class="sr-play-shell">
        <a class="back-link" href="${packLink(packId, "topic", topicId)}">← ${escapeHtml(topic.title)}</a>
        ${renderPlayHeader()}
        ${renderQuizCard(question, { workbook: false })}
      </section>
    `;
  }

  function renderExamPlay(packId, examId, state) {
    const data = getPack(packId);
    const exam = data.exams.find((e) => e.id === examId);
    const progress = getPackProgress(state, packId, data);
    if (!exam) return ctx.notFound("Không tìm thấy đề.");
    if (!isExamUnlocked(exam, progress)) return ctx.notFound("Đề chưa mở khóa. Hoàn thành đề trước hoặc chủ đề đầu tiên.");

    const continuing = session.mode === "exam" && session.id === examId && session.questions.length;
    if (!continuing) {
      initExamSession(packId, examId, data);
    }

    if (session.index >= session.questions.length) {
      return renderExamComplete(packId, examId, state);
    }

    const question = session.questions[session.index];
    return `
      <section class="sr-play-shell">
        <a class="back-link" href="${packLink(packId)}">← Ôn hè</a>
        <div class="sr-exam-banner">
          <span class="tag">Đề ôn ${exam.order}</span>
          <span>Cần ≥ ${exam.passScore}/${exam.questionCount} câu để vượt qua</span>
        </div>
        ${renderPlayHeader()}
        ${renderQuizCard(question, { workbook: false })}
      </section>
    `;
  }

  function renderTopicComplete(packId, topicId, state) {
    const data = getPack(packId);
    const topic = data.topics.find((t) => t.id === topicId);
    const progress = getPackProgress(state, packId, data);
    const total = session.questions.length;
    const stars = starsFromAccuracy(session.correct, total);
    const isNewBest = stars > (progress.topicStars[topicId] || 0);

    updateState((s) => {
      const sr = getPackProgress(s, packId, data);
      const prevStars = sr.topicStars[topicId] || 0;
      sr.topicStars[topicId] = Math.max(prevStars, stars);
      if (!sr.completedTopics.includes(topicId)) sr.completedTopics.push(topicId);
      sr.bestCombo = Math.max(sr.bestCombo || 0, session.combo);
    });

    let bonusXp = 0;
    if (isNewBest && stars > 0) bonusXp += XP_TOPIC;
    if (stars === 3) bonusXp += XP_PERFECT;
    if (bonusXp) awardXp(bonusXp, "topic");

    const nextTopic = data.topics.find((t) => t.order === topic.order + 1);
    const completedTopics = [...new Set([...(progress.completedTopics || []), topicId])];
    const otherTopics = data.topics.filter((t) => {
      if (t.id === topicId || t.id === nextTopic?.id) return false;
      return isTopicUnlocked(t, progress, completedTopics);
    });

    const yesTarget = nextTopic
      ? packLink(packId, "topic", nextTopic.id, "play")
      : packLink(packId);
    const yesLabel = nextTopic
      ? `Có — ${nextTopic.emoji} ${nextTopic.title}`
      : "Có — chọn chủ đề khác";

    const otherTopicsHtml = otherTopics.length
      ? `
        <p class="sr-other-topics-label">Hoặc chọn chủ đề khác:</p>
        <div class="sr-other-topics">
          ${otherTopics.map((t) => `
            <a class="sr-other-topic-chip" href="${packLink(packId, "topic", t.id)}">
              ${t.emoji} ${escapeHtml(t.title)}
            </a>
          `).join("")}
        </div>
      `
      : "";

    return `
      <section class="sr-result sr-topic-complete card-panel" data-pack-id="${escapeHtml(packId)}" data-topic-id="${escapeHtml(topicId)}">
        <div class="sr-result-icon">${stars >= 2 ? "🎉" : stars >= 1 ? "👍" : "💪"}</div>
        <h1>Hoàn thành: ${escapeHtml(topic.title)}</h1>
        <div class="sr-result-stars">${renderStars(stars)}</div>
        <p>${session.correct}/${total} câu đúng · Combo cao nhất: ${session.combo}</p>
        ${bonusXp ? `<p class="sr-xp-bonus">+${bonusXp} XP thưởng!</p>` : ""}

        <div class="sr-next-prompt">
          <h2>Bước tiếp theo</h2>
          <p class="sr-next-question">Em có muốn chuyển sang chủ đề khác không?</p>
          <div class="hero-actions sr-next-actions">
            <a class="btn primary" href="${yesTarget}">${escapeHtml(yesLabel)}</a>
            <a class="btn secondary" href="${packLink(packId, "topic", topicId, "play")}">Không — chơi lại</a>
          </div>
          ${otherTopicsHtml}
          <a class="back-link sr-back-hub" href="${packLink(packId)}">← Về lộ trình ôn hè</a>
        </div>
      </section>
    `;
  }

  function renderExamComplete(packId, examId, state) {
    const data = getPack(packId);
    const exam = data.exams.find((e) => e.id === examId);
    const total = session.questions.length;
    const passed = session.correct >= exam.passScore;
    const perfect = session.correct === total;

    updateState((s) => {
      const sr = getPackProgress(s, packId, data);
      const prev = sr.examResults[examId];
      if (!prev || session.correct > prev.correct) {
        sr.examResults[examId] = {
          correct: session.correct,
          total,
          passed,
          completedAt: Date.now()
        };
      }
      if (passed) {
        const nextExam = data.exams.find((e) => e.order === exam.order + 1);
        if (nextExam && !sr.unlockedExams.includes(nextExam.id)) {
          sr.unlockedExams.push(nextExam.id);
        }
      }
      sr.bestCombo = Math.max(sr.bestCombo || 0, session.combo);
    });

    let bonusXp = 0;
    if (passed) bonusXp += XP_EXAM;
    if (perfect) bonusXp += XP_PERFECT;
    if (bonusXp) awardXp(bonusXp, "exam");

    const nextExam = data.exams.find((e) => e.order === exam.order + 1);

    return `
      <section class="sr-result card-panel">
        <div class="sr-result-icon">${passed ? (perfect ? "🏆" : "✅") : "📚"}</div>
        <h1>${escapeHtml(exam.title)}</h1>
        <p class="sr-result-score">${session.correct}/${total} câu đúng</p>
        <p>${passed ? "Chúc mừng! Em đã vượt qua đề này." : `Cần ${exam.passScore} câu đúng. Cố gắng thêm nhé!`}</p>
        ${bonusXp ? `<p class="sr-xp-bonus">+${bonusXp} XP thưởng!</p>` : ""}
        <div class="hero-actions">
          ${passed && nextExam ? `<a class="btn primary" href="${packLink(packId, "exam", nextExam.id)}">Đề ${nextExam.order} →</a>` : ""}
          <a class="btn secondary" href="${packLink(packId, "exam", examId)}">Làm lại</a>
          <a class="btn secondary" href="${packLink(packId)}">Về lộ trình</a>
        </div>
      </section>
    `;
  }

  function handlePlayAnswer(answer, question) {
    const correct = validateAnswer(answer, question);
    const card = document.querySelector(".quiz-card");
    const panel = document.querySelector(".feedback-panel");

    card?.classList.remove("is-correct", "is-wrong");
    card?.classList.add(correct ? "is-correct" : "is-wrong");

    let xpGain = 0;
    if (correct) {
      session.correct += 1;
      session.combo += 1;
      xpGain = 10;
      if (session.combo >= 3) xpGain += XP_COMBO_BONUS;
      awardXp(xpGain, "answer");
      updateState((s) => {
        s.dailyQuest.progress = Math.min(s.dailyQuest.target, s.dailyQuest.progress + 1);
      });
    } else {
      session.combo = 0;
    }

    session.answers.push({ questionId: question.id, answer, correct });

    if (panel) {
      panel.innerHTML = correct
        ? `<strong>Chính xác!</strong> +${xpGain} XP${session.combo >= 3 ? ` · Combo ×${session.combo} 🔥` : ""}`
        : `<strong>Chưa đúng.</strong> Đáp án: <strong>${escapeHtml(question.answer)}</strong><br>${escapeHtml(question.hint || "")}`;
    }

    document.querySelectorAll(".choice-btn, .answer-form button").forEach((el) => {
      el.disabled = true;
    });

    setTimeout(() => {
      session.index += 1;
      ctx.renderRoute();
    }, correct ? 900 : 1600);
  }

  function bindPlayQuiz() {
    document.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = document.querySelector(".quiz-card");
        const qId = card?.dataset.questionId;
        const question = session.questions.find((q) => q.id === qId);
        if (question) handlePlayAnswer(btn.dataset.answer, question);
      });
    });

    const form = document.querySelector(".answer-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector(".answer-input");
        const card = document.querySelector(".quiz-card");
        const qId = card?.dataset.questionId;
        const question = session.questions.find((q) => q.id === qId);
        if (question && input?.value.trim()) handlePlayAnswer(input.value.trim(), question);
      });
    }

    document.querySelectorAll(".hint-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hint = btn.dataset.hint;
      });
    });

    bindTopicCompletePrompt();
    focusAnswerInput();
  }

  function bindTopicCompletePrompt() {
    const panel = document.querySelector(".sr-topic-complete");
    if (!panel || panel.dataset.promptBound === "1") return;
    panel.dataset.promptBound = "1";

    const yesBtn = panel.querySelector(".sr-next-actions .btn.primary");
    const noBtn = panel.querySelector(".sr-next-actions .btn.secondary");
    if (!yesBtn || !noBtn) return;

    const goNext = () => navigateFromLink(yesBtn);
    const replay = () => {
      initTopicSession(panel.dataset.packId, panel.dataset.topicId, getPack(panel.dataset.packId));
      navigateFromLink(noBtn);
    };

    showModal({
      title: "Hoàn thành chủ đề!",
      body: "Em có muốn chuyển sang chủ đề khác không?",
      actionLabel: yesBtn.textContent.trim(),
      onAction: goNext,
      secondaryLabel: "Không — chơi lại",
      onSecondary: replay
    });

    yesBtn.addEventListener("click", (event) => {
      event.preventDefault();
      goNext();
    });
    noBtn.addEventListener("click", (event) => {
      event.preventDefault();
      replay();
    });
  }

  function resetOnLeave(route) {
    if (!route.startsWith("summer")) resetSession();
  }

  function renderExamIntro(packId, examId, state) {
    const data = getPack(packId);
    const exam = data.exams.find((e) => e.id === examId);
    const progress = getPackProgress(state, packId, data);
    if (!exam) return ctx.notFound("Không tìm thấy đề.");
    if (!isExamUnlocked(exam, progress)) return ctx.notFound("Đề chưa mở khóa.");

    const prev = progress.examResults[examId];
    resetSession();

    return `
      <section class="sr-exam-intro card-panel">
        <a class="back-link" href="${packLink(packId)}">← Ôn hè</a>
        <span class="tag">Đề tổng hợp</span>
        <h1>${escapeHtml(exam.title)}</h1>
        <p>${exam.questionCount} câu · Cần ≥ ${exam.passScore} câu đúng để vượt qua · Thưởng ${exam.xp} XP</p>
        ${prev ? `<p>Kết quả trước: ${prev.correct}/${prev.total} ${prev.passed ? "✓" : ""}</p>` : ""}
        <ul class="sr-exam-topics">
          ${examTags(packId).map((tag) => `<li>${tag}</li>`).join("")}
        </ul>
        <a class="btn primary" href="${packLink(packId, "exam", examId, "play")}">Bắt đầu làm bài ⏱️</a>
      </section>
    `;
  }

  return {
    resetOnLeave,
    resolvePackId,
    renderPackPicker,
    renderHub,
    renderTopicLesson,
    renderTopicPlay,
    renderExamIntro,
    renderExamPlay,
    bindPlayQuiz,
    resetSession
  };
}
