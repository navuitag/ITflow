import {
  getState,
  getProfiles,
  resetProgress,
  setSelectedGrade,
  completeOnboarding,
  restartOnboarding,
  updateState,
  createProfile,
  switchProfile,
  renameProfile,
  deleteProfile,
  hasProfiles
} from "./state.js";
import { setRoute, escapeHtml, streamTag } from "./utils.js";
import { renderNavbar, renderBottomNav } from "../../components/navbar.js";
import { bindLearnerSwitcher, renderAddLearnerForm, renderLearnerList } from "../../components/learnerSwitcher.js";
import { renderLessonCard } from "../../components/lessonCard.js";
import { renderQuizCard, focusAnswerInput } from "../../components/quizCard.js";
import { showModal } from "../../components/modal.js";
import { completeLesson } from "../../modules/lessonEngine.js";
import { submitAnswer } from "../../modules/quizEngine.js";
import { completeLab, getLabProgress, toggleLabStep } from "../../modules/labEngine.js";
import {
  isBlocklyLab,
  renderBlocklyLab,
  bindBlocklyLab,
  disposeBlocklyLab
} from "../../modules/blocklyLab.js";
import {
  isInputLab,
  renderInputLab,
  bindInputLab,
  disposeInputLab
} from "../../modules/inputLab.js";
import { getGamificationSummary } from "../../modules/gamification.js";
import { getOverallAccuracy, getSkillProgress, getWeakSkills, getLabForSkill } from "../../modules/progress.js";

let data = {
  skills: [],
  lessons: [],
  questions: [],
  labs: [],
  errors: []
};

let disposeBlockly = null;
let disposeInput = null;

export function configureRouter(appData) {
  data = appData;
  window.addEventListener("hashchange", renderRoute);
}

export function renderRoute() {
  const state = getState();
  const parts = (window.location.hash || "#/home").replace("#/", "").split("/").filter(Boolean);
  const route = parts[0] || "home";
  const id = parts[1];

  if (disposeBlockly && route !== "lab") {
    disposeBlockly();
    disposeBlockly = null;
    disposeBlocklyLab();
  }
  if (disposeInput && route !== "lab") {
    disposeInput();
    disposeInput = null;
    disposeInputLab();
  }

  if (!state.onboarded) {
    render(renderOnboarding(state));
    bindOnboarding();
    return;
  }

  const shell = (content) => `
    ${renderNavbar(state, availableGrades())}
    <main class="app-shell">${content}</main>
    ${renderBottomNav()}
  `;

  let content;
  let after;

  if (route === "lesson") {
    content = renderLesson(id, state);
    after = () => bindLesson(id);
  } else if (route === "quiz") {
    content = renderQuiz(id, state);
    after = () => bindQuiz(id);
  } else if (route === "lab") {
    content = renderLab(id, state);
    after = () => bindLab(id);
  } else if (route === "skills") {
    content = renderSkills(state);
    after = bindSkills;
  } else if (route === "review" && id === "errors") {
    content = renderErrors(state);
  } else if (route === "profile") {
    content = renderProfile(state);
    after = bindProfile;
  } else {
    content = renderHome(state);
  }

  render(shell(content));
  bindNavbar();
  if (after) after();
}

function render(html) {
  document.querySelector("#app").innerHTML = html;
}

function availableGrades() {
  return [...new Set(data.skills.map((s) => s.grade))].sort((a, b) => a - b);
}

function resolveGrade(state) {
  const grades = availableGrades();
  return grades.includes(state.selectedGrade) ? state.selectedGrade : grades[0];
}

function labelSkill(skillId) {
  return data.skills.find((s) => s.id === skillId)?.title || skillId;
}

function notFound(message) {
  return `<section class="empty-state">${escapeHtml(message)}</section>`;
}

function bindNavbar() {
  bindLearnerSwitcher({
    onSwitch: (profileId) => {
      switchProfile(profileId);
      renderRoute();
    },
    onAdd: () => setRoute("#/profile")
  });
  const select = document.querySelector("#gradeSelect");
  if (!select) return;
  select.addEventListener("change", () => {
    setSelectedGrade(Number(select.value));
    renderRoute();
  });
}

function renderOnboarding(state) {
  const grades = availableGrades();
  const isNew = !hasProfiles();
  const cards = grades.map((grade) => {
    const count = data.skills.filter((s) => s.grade === grade).length;
    return `
      <button class="grade-pick" data-grade="${grade}" type="button">
        <span class="grade-pick-num">Lớp ${grade}</span>
        <span class="grade-pick-meta">${count} bài · Tin học</span>
      </button>`;
  }).join("");

  return `
    <main class="onboarding">
      <section class="onboarding-card">
        <span class="brand-mark">IT</span>
        <span class="eyebrow">Chào mừng ITFlow VN</span>
        <h1>${isNew ? "Ai sẽ học hôm nay?" : "Bạn đang học lớp mấy?"}</h1>
        <p>Học lý thuyết, làm quiz và thực hành theo SGK Kết nối tri thức.</p>
        ${isNew ? `
          <label class="onboarding-name">
            <span>Tên người học</span>
            <input type="text" id="onboardingName" maxlength="40" placeholder="Ví dụ: Minh, Lan..." value="${escapeHtml(state.user.name === "Bạn học" ? "" : state.user.name)}">
          </label>` : ""}
        <div class="grade-pick-grid">${cards}</div>
      </section>
    </main>`;
}

function bindOnboarding() {
  document.querySelectorAll(".grade-pick").forEach((button) => {
    button.addEventListener("click", () => {
      const grade = Number(button.dataset.grade);
      const nameInput = document.querySelector("#onboardingName");
      const name = nameInput?.value?.trim();

      if (nameInput && !name) {
        nameInput.focus();
        return;
      }

      if (!hasProfiles()) {
        const profileId = createProfile(name || "Bạn học");
        if (!profileId) return;
      }

      completeOnboarding(grade, name);

      // Hash đã là #/home thì setRoute không đổi → phải renderRoute() trực tiếp
      const hash = window.location.hash || "#/home";
      if (hash === "#/home" || hash === "#/" || hash === "#") {
        renderRoute();
      } else {
        setRoute("#/home");
      }
    });
  });
}

function renderHome(state) {
  const summary = getGamificationSummary(state);
  const activeGrade = resolveGrade(state);
  const gradeSkills = data.skills.filter((s) => s.grade === activeGrade);
  const nextSkill = gradeSkills.find((s) => !state.completedLessons.includes(s.id)) || gradeSkills[0];
  const questPercent = Math.round((state.dailyQuest.progress / state.dailyQuest.target) * 100);
  const weak = getWeakSkills(state)[0];

  return `
    <section class="hero-panel">
      <div>
        <span class="eyebrow">${escapeHtml(state.user.name)} · Lớp ${activeGrade} · Tin học</span>
        <h1>Lý thuyết chắc, thực hành thạo.</h1>
        <p>Mỗi bài gồm phần lý thuyết, mini quiz và thực hành (nếu có). Hoàn thành cả hai để đạt mastery.</p>
        <div class="hero-actions">
          <a class="btn primary" href="#/lesson/${nextSkill?.id || ""}">Tiếp tục học</a>
          <a class="btn secondary" href="#/skills">Cây kỹ năng</a>
        </div>
      </div>
      <div class="daily-card">
        <span class="tag">Daily Quest</span>
        <h2>${state.dailyQuest.progress}/${state.dailyQuest.target} câu đúng</h2>
        <div class="progress-track"><span style="width:${questPercent}%"></span></div>
        <p>${weak ? `Nên ôn: ${escapeHtml(labelSkill(weak.skill))}` : "Tiếp tục bài tiếp theo nhé."}</p>
      </div>
    </section>
    <section class="stat-grid">
      <article><strong>${state.todayXp}</strong><span>XP hôm nay</span></article>
      <article><strong>${state.streak}</strong><span>Chuỗi ngày</span></article>
      <article><strong>${getOverallAccuracy(state)}%</strong><span>Độ chính xác</span></article>
      <article><strong>${summary.level}</strong><span>Cấp độ</span></article>
    </section>
    <section class="section-head">
      <h2>Kỹ năng · Lớp ${activeGrade}</h2>
      <a href="#/skills">Xem tất cả</a>
    </section>
    <div class="skill-grid">
      ${gradeSkills.slice(0, 3).map((s) => renderLessonCard(s, state, data.questions, data.labs)).join("")}
    </div>`;
}

function groupByChapter(skills) {
  const groups = new Map();
  skills
    .slice()
    .sort((a, b) => (a.chapterIndex - b.chapterIndex) || (a.lessonNo - b.lessonNo))
    .forEach((skill) => {
      const key = `${skill.chapterIndex}|${skill.chapter}`;
      if (!groups.has(key)) {
        groups.set(key, { chapter: skill.chapter, chapterIndex: skill.chapterIndex, items: [] });
      }
      groups.get(key).items.push(skill);
    });
  return [...groups.values()];
}

function renderSkills(state) {
  const grades = availableGrades();
  const activeGrade = resolveGrade(state);
  const gradeSkills = data.skills.filter((s) => s.grade === activeGrade);
  const done = gradeSkills.filter((s) => state.completedLessons.includes(s.id)).length;
  const chapters = groupByChapter(gradeSkills);
  const tabs = grades.map((grade) => {
    const count = data.skills.filter((s) => s.grade === grade).length;
    const active = grade === activeGrade ? " active" : "";
    return `<button class="grade-tab${active}" data-grade="${grade}" type="button">
      <strong>Lớp ${grade}</strong><span>${count} bài</span>
    </button>`;
  }).join("");

  return `
    <section class="page-title">
      <span class="eyebrow">Skill Tree</span>
      <h1>Cây kỹ năng Tin học</h1>
      <p>Hoàn thành lý thuyết và thực hành để mở khóa bài tiếp theo.</p>
    </section>
    <div class="grade-tabs">${tabs}</div>
    <div class="grade-summary">
      <span>Lớp ${activeGrade} · ${chapters.length} chủ đề · ${gradeSkills.length} bài</span>
      <span>${done}/${gradeSkills.length} bài lý thuyết xong</span>
    </div>
    ${chapters.map((group) => `
      <section class="chapter-group">
        <header class="chapter-head">
          <span class="tag">Chủ đề ${group.chapterIndex}</span>
          <h2>${escapeHtml(group.chapter)}</h2>
        </header>
        <div class="skill-path">
          ${group.items.map((s) => renderLessonCard(s, state, data.questions, data.labs)).join("")}
        </div>
      </section>`).join("")}`;
}

function bindSkills() {
  document.querySelectorAll(".grade-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      setSelectedGrade(Number(tab.dataset.grade));
      renderRoute();
    });
  });
}

function renderKeypoints(step) {
  if (!step.points?.length) return "";
  return `<ul class="keypoints-list">${step.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>`;
}

function renderLesson(id, state) {
  const lesson = data.lessons.find((l) => l.id === id);
  if (!lesson) return notFound("Không tìm thấy bài học.");
  const skill = data.skills.find((s) => s.id === lesson.skill);
  const progress = getSkillProgress({ id: lesson.skill }, state, data.questions, data.labs);
  const lab = getLabForSkill(lesson.skill, data.labs);

  return `
    <section class="lesson-layout">
      <aside class="lesson-sidebar">
        <a class="back-link" href="#/skills">← Kỹ năng</a>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p>${streamTag(skill?.streams)} ${progress.mastery}% mastery</p>
        <div class="progress-track"><span style="width:${progress.mastery}%"></span></div>
      </aside>
      <div class="lesson-steps">
        ${lesson.steps.map((step, i) => `
          <article class="lesson-step${step.type === "keypoints" ? " lesson-step-keypoints" : ""}">
            <span class="step-count">${i + 1}</span>
            <div>
              <h2>${escapeHtml(step.title)}</h2>
              ${step.content ? `<p>${escapeHtml(step.content)}</p>` : ""}
              ${step.type === "keypoints" ? renderKeypoints(step) : ""}
            </div>
          </article>`).join("")}
        <div class="completion-panel">
          <div>
            <h2>Hoàn thành lý thuyết</h2>
            <p>Nhận ${lesson.xp} XP, sau đó làm quiz${lab ? " và thực hành" : ""}.</p>
          </div>
          <button class="btn primary" id="completeLesson" type="button">Hoàn thành</button>
        </div>
      </div>
    </section>`;
}

function bindLesson(id) {
  const lesson = data.lessons.find((l) => l.id === id);
  const button = document.querySelector("#completeLesson");
  if (!lesson || !button) return;
  button.addEventListener("click", () => {
    completeLesson(lesson);
    showModal({
      title: "Đã hoàn thành lý thuyết",
      body: `+${lesson.xp} XP. Chuyển sang mini quiz nhé.`,
      actionLabel: "Làm quiz",
      onAction: () => setRoute(`#/quiz/${lesson.skill}`)
    });
  });
}

function renderQuiz(skillId, state) {
  const skill = data.skills.find((s) => s.id === skillId);
  if (!skill) return notFound("Không tìm thấy kỹ năng.");
  const questions = data.questions.filter((q) => q.skill === skillId);
  if (!questions.length) return notFound("Chưa có câu hỏi cho bài này.");
  const question = questions.find((q) => !state.answers.some((a) => a.questionId === q.id && a.correct)) || questions[0];

  return `
    <section class="page-title">
      <a class="back-link" href="#/lesson/${skillId}">← Bài học</a>
      <h1>Quiz · ${escapeHtml(skill.title)}</h1>
      <p>Luyện nắm vững kiến thức lý thuyết.</p>
    </section>
    ${renderQuizCard(question)}`;
}

function bindQuiz(skillId) {
  const questions = data.questions.filter((q) => q.skill === skillId);
  const question = questions.find((q) => !getState().answers.some((a) => a.questionId === q.id && a.correct)) || questions[0];
  const card = document.querySelector(".quiz-card");
  if (!card || !question) return;

  focusAnswerInput(card);

  card.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(btn.dataset.answer, question, skillId));
  });

  const form = card.querySelector(".answer-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = form.querySelector("[name=answer]")?.value?.trim();
      if (value) handleAnswer(value, question, skillId);
    });
  }

  card.querySelector(".hint-btn")?.addEventListener("click", () => {
    showModal({ title: "Gợi ý", body: question.hint || "Đọc lại phần kiến thức trọng tâm." });
  });
}

function handleAnswer(answer, question, skillId) {
  const result = submitAnswer(answer, question, data.errors);
  const panel = document.querySelector(".feedback-panel");
  const card = document.querySelector(".quiz-card");
  card?.classList.remove("is-correct", "is-wrong");
  card?.classList.add(result.correct ? "is-correct" : "is-wrong");

  if (result.correct) {
    const allCorrect = data.questions
      .filter((q) => q.skill === skillId)
      .every((q) => getState().answers.some((a) => a.questionId === q.id && a.correct));
    panel.innerHTML = `<strong>Chính xác! +${result.xp} XP</strong>
      <p>${allCorrect ? "Đã hoàn thành quiz. " : ""}${getLabForSkill(skillId, data.labs) ? '<a class="btn primary" href="#/lab/' + skillId + '">Sang thực hành</a>' : '<a class="btn quiet" href="#/skills">Về cây kỹ năng</a>'}</p>`;
    if (allCorrect) updateState((s) => {
      s.skillMastery[skillId] = Math.max(s.skillMastery[skillId] || 0, 60);
    });
    return;
  }

  panel.innerHTML = `
    <strong>${escapeHtml(result.error.title)}</strong>
    <p>${escapeHtml(result.error.message)}</p>
    <p><b>Gợi ý:</b> ${escapeHtml(result.error.hint)}</p>
    <a class="btn quiet" href="#/lesson/${result.error.recommendation}">Ôn lại bài</a>`;
}

function renderLab(skillId, state) {
  const lab = getLabForSkill(skillId, data.labs);
  const skill = data.skills.find((s) => s.id === skillId);
  if (!lab || !skill) return notFound("Bài này chưa có lab thực hành.");

  if (isBlocklyLab(lab)) {
    return renderBlocklyLab(lab, skill, escapeHtml);
  }

  if (isInputLab(lab)) {
    return renderInputLab(lab, skill, escapeHtml);
  }

  const progress = getLabProgress(lab, state);

  return `
    <section class="lab-layout">
      <aside class="lesson-sidebar">
        <a class="back-link" href="#/quiz/${skillId}">← Quiz</a>
        <h1>${escapeHtml(lab.title)}</h1>
        <p class="lab-progress-text">${progress.done.length}/${progress.total} bước · ${progress.percent}%</p>
        <div class="progress-track"><span style="width:${progress.percent}%"></span></div>
        <p>Hoàn thành tất cả bước để nhận ${lab.xp} XP.</p>
      </aside>
      <div class="lesson-steps">
        ${lab.steps.map((step) => {
          const checked = progress.done.includes(step.id);
          return `
            <article class="lab-step${checked ? " is-done" : ""}">
              <label class="lab-step-check">
                <input type="checkbox" data-step="${step.id}" ${checked ? "checked" : ""}>
              </label>
              <div>
                <h2>${escapeHtml(step.label)}</h2>
                <p>${escapeHtml(step.hint)}</p>
              </div>
            </article>`;
        }).join("")}
        <div class="completion-panel">
          <button class="btn primary" id="completeLab" type="button" ${progress.complete ? "" : "disabled"}>
            Hoàn thành thực hành
          </button>
        </div>
      </div>
    </section>`;
}

async function bindLab(skillId) {
  const lab = getLabForSkill(skillId, data.labs);
  if (!lab) return;

  if (isBlocklyLab(lab)) {
    disposeBlockly = await bindBlocklyLab(lab, {
      escapeHtml,
      onPassed: () => {
        completeLab(lab);
        showModal({
          title: "Hoàn thành thực hành Blockly",
          body: `+${lab.xp} XP. Bạn đã hoàn thành lập trình trực quan cho bài này.`,
          actionLabel: "Tiếp tục",
          onAction: () => setRoute("#/skills")
        });
      }
    });
    return;
  }

  if (isInputLab(lab)) {
    disposeInput = bindInputLab(lab, {
      escapeHtml,
      onPassed: () => {
        completeLab(lab);
        showModal({
          title: "Hoàn thành mô phỏng",
          body: `+${lab.xp} XP. Em đã luyện xong thao tác chuột/bàn phím.`,
          actionLabel: "Tiếp tục",
          onAction: () => setRoute("#/skills")
        });
      }
    });
    return;
  }

  document.querySelectorAll(".lab-step input[type=checkbox]").forEach((input) => {
    input.addEventListener("change", () => {
      toggleLabStep(lab, input.dataset.step);
      renderRoute();
    });
  });

  document.querySelector("#completeLab")?.addEventListener("click", () => {
    const progress = getLabProgress(lab, getState());
    if (!progress.complete) return;
    completeLab(lab);
    showModal({
      title: "Hoàn thành thực hành",
      body: `+${lab.xp} XP. Bạn đã hoàn thành cả lý thuyết và thực hành cho bài này.`,
      actionLabel: "Tiếp tục",
      onAction: () => setRoute("#/skills")
    });
  });
}

function renderErrors(state) {
  const weak = getWeakSkills(state);
  const items = state.errors.slice(0, 10).map((error) => `
    <article class="error-item">
      <h3>${escapeHtml(error.title)}</h3>
      <p>${escapeHtml(error.message)}</p>
      <a class="btn quiet" href="#/lesson/${error.recommendation}">Ôn lại</a>
    </article>`).join("");

  return `
    <section class="page-title">
      <span class="eyebrow">Error Review</span>
      <h1>Sổ tay lỗi sai</h1>
    </section>
    ${weak.length ? `<p>Kỹ năng cần chú ý: ${weak.map((w) => escapeHtml(labelSkill(w.skill))).join(", ")}</p>` : ""}
    <div class="error-list">${items || "<p class='empty-state'>Chưa ghi nhận lỗi. Làm quiz để có phản hồi.</p>"}</div>`;
}

function renderProfile(state) {
  const summary = getGamificationSummary(state);
  const profiles = getProfiles();
  return `
    <section class="page-title">
      <h1>Hồ sơ học tập</h1>
      <p>${escapeHtml(state.user.name)} · Lớp ${state.selectedGrade}</p>
    </section>
    <section class="stat-grid">
      <article><strong>${state.xp}</strong><span>Tổng XP</span></article>
      <article><strong>${state.completedLessons.length}</strong><span>Bài lý thuyết</span></article>
      <article><strong>${state.completedLabs.length}</strong><span>Lab xong</span></article>
      <article><strong>${summary.badges.length}</strong><span>Huy hiệu</span></article>
    </section>
    <p>${summary.badges.map((b) => `<span class="tag">${escapeHtml(b)}</span>`).join(" ") || "Chưa có huy hiệu."}</p>
    <section class="profile-actions">
      <button class="btn secondary" id="changeGrade" type="button">Đổi lớp</button>
      <button class="btn danger" id="resetProgress" type="button">Xóa tiến độ</button>
    </section>
    <section class="section-head">
      <h2>Người học trên máy này</h2>
    </section>
    <div class="learner-list">${renderLearnerList(state, profiles)}</div>
    <section class="add-learner-panel">
      <h2>Thêm người học mới</h2>
      ${renderAddLearnerForm()}
    </section>`;
}

function bindProfile() {
  document.querySelector("#changeGrade")?.addEventListener("click", () => {
    restartOnboarding();
    renderRoute();
  });
  document.querySelector("#resetProgress")?.addEventListener("click", () => {
    if (!window.confirm(`Xóa toàn bộ tiến độ của ${getState().user.name}?`)) return;
    resetProgress();
    setRoute("#/home");
  });

  document.querySelectorAll("[data-switch-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      switchProfile(button.dataset.switchProfile);
      renderRoute();
    });
  });

  document.querySelectorAll("[data-rename-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = getProfiles().find((item) => item.id === button.dataset.renameProfile);
      if (!profile) return;
      const nextName = window.prompt("Tên mới:", profile.name);
      if (!nextName?.trim()) return;
      renameProfile(profile.id, nextName.trim());
      renderRoute();
    });
  });

  document.querySelectorAll("[data-delete-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = getProfiles().find((item) => item.id === button.dataset.deleteProfile);
      if (!profile) return;
      if (!window.confirm(`Xóa hồ sơ "${profile.name}" và toàn bộ tiến độ?`)) return;
      deleteProfile(profile.id);
      renderRoute();
    });
  });

  document.querySelector("#addLearnerForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = new FormData(event.target).get("name")?.toString().trim();
    if (!name) return;
    createProfile(name);
    restartOnboarding();
    renderRoute();
  });
}
