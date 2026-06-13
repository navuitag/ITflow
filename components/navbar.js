import { getGamificationSummary } from "../modules/gamification.js";
import { renderLearnerSwitcher } from "./learnerSwitcher.js";
import { renderEdtechHubButton } from "./edtechHub.js";

export function renderNavbar(state, grades = []) {
  const summary = getGamificationSummary(state);
  const options = grades
    .map((grade) => `<option value="${grade}"${grade === state.selectedGrade ? " selected" : ""}>Lớp ${grade}</option>`)
    .join("");

  return `
    <header class="topbar">
      <a class="brand" href="#/home" aria-label="ITFlow VN">
        <span class="brand-mark">IT</span>
        <span>ITFlow VN</span>
      </a>
      <nav class="nav-links" aria-label="Điều hướng chính">
        <a href="#/home">Trang chủ</a>
        <a href="#/skills">Sách</a>
        <a href="#/resources">Tài nguyên</a>
        <a href="#/sitemap">Sơ đồ điều hướng</a>
        <a href="#/mindmap">Sơ đồ tư duy</a>
        <a href="#/profile">Hồ sơ</a>
      </nav>
      <div class="top-stats">
        ${renderEdtechHubButton()}
        ${renderLearnerSwitcher(state)}
        ${grades.length ? `<label class="grade-switch">
          <span>Lớp</span>
          <select id="gradeSelect" aria-label="Chọn lớp">${options}</select>
        </label>` : ""}
        <span>${state.streak} ngày</span>
        <span>${state.xp} XP</span>
        <span>Lv ${summary.level}</span>
      </div>
    </header>
  `;
}

export function renderBottomNav() {
  return `
    <nav class="bottom-nav" aria-label="Điều hướng mobile">
      <a href="#/home">Nhà</a>
      <a href="#/skills">Sách</a>
      <a href="#/resources">Tài nguyên</a>
      <a href="#/input">Lab</a>
      <a href="#/mindmap">Sơ đồ</a>
      <a href="#/profile">Tôi</a>
    </nav>
  `;
}
