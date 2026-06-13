import { getGamificationSummary } from "../modules/gamification.js";
import { renderLearnerSwitcher } from "./learnerSwitcher.js";
import { renderEdtechHubButton } from "./edtechHub.js";

const PRIMARY_LINKS = [
  { href: "#/home", label: "Trang chủ" },
  { href: "#/skills", label: "Sách" },
  { href: "#/games", label: "Trò chơi" },
  { href: "#/resources", label: "Tài nguyên" }
];

const MORE_LINKS = [
  { href: "#/mindmap", label: "Sơ đồ tư duy" },
  { href: "#/sitemap", label: "Sơ đồ điều hướng" },
  { href: "#/input", label: "Lab chuột & bàn phím" },
  { href: "#/scratch", label: "Scratch" },
  { href: "#/profile", label: "Hồ sơ người học" }
];

const BOTTOM_LINKS = [
  { href: "#/home", label: "Nhà" },
  { href: "#/skills", label: "Sách" },
  { href: "#/games", label: "Game" },
  { href: "#/resources", label: "Tài nguyên" },
  { href: "#/profile", label: "Tôi" }
];

function renderMoreMenu() {
  const items = MORE_LINKS.map((link) => `
    <a class="nav-more-item" href="${link.href}">${link.label}</a>
  `).join("");

  return `
    <div class="nav-more">
      <button type="button" class="nav-more-btn" id="navMoreBtn" aria-haspopup="true" aria-expanded="false">
        Thêm
        <span class="nav-more-caret" aria-hidden="true">▾</span>
      </button>
      <div class="nav-more-menu" id="navMoreMenu">
        ${items}
      </div>
    </div>
  `;
}

export function renderNavbar(state, grades = []) {
  const summary = getGamificationSummary(state);
  const options = grades
    .map((grade) => `<option value="${grade}"${grade === state.selectedGrade ? " selected" : ""}>Lớp ${grade}</option>`)
    .join("");

  const primaryLinks = PRIMARY_LINKS.map((link) => `<a href="${link.href}">${link.label}</a>`).join("");

  return `
    <header class="topbar">
      <a class="brand" href="#/home" aria-label="ITFlow VN">
        <span class="brand-mark">IT</span>
        <span>ITFlow VN</span>
      </a>
      <nav class="nav-links" aria-label="Điều hướng chính">
        ${primaryLinks}
        ${renderMoreMenu()}
      </nav>
      <div class="top-stats">
        ${renderEdtechHubButton()}
        ${renderLearnerSwitcher(state)}
        ${grades.length ? `<label class="grade-switch">
          <span>Lớp</span>
          <select id="gradeSelect" aria-label="Chọn lớp">${options}</select>
        </label>` : ""}
        <span class="top-stat-pill" title="Chuỗi học">${state.streak} ngày</span>
        <span class="top-stat-pill" title="Điểm kinh nghiệm">${state.xp} XP</span>
        <span class="top-stat-pill top-stat-level" title="Cấp độ">Lv ${summary.level}</span>
      </div>
    </header>
  `;
}

export function renderBottomNav() {
  return `
    <nav class="bottom-nav" aria-label="Điều hướng mobile">
      ${BOTTOM_LINKS.map((link) => `<a href="${link.href}">${link.label}</a>`).join("")}
    </nav>
  `;
}

let navMoreDocumentBound = false;

function setNavMoreOpen(open) {
  const button = document.getElementById("navMoreBtn");
  if (button) button.setAttribute("aria-expanded", String(open));
}

export function bindNavMore() {
  const wrap = document.querySelector(".nav-more");
  const button = document.getElementById("navMoreBtn");
  const menu = document.getElementById("navMoreMenu");
  if (!wrap || !button || !menu) return;

  wrap.onmouseenter = () => setNavMoreOpen(true);
  wrap.onmouseleave = () => setNavMoreOpen(false);
  wrap.onfocusin = () => setNavMoreOpen(true);
  wrap.onfocusout = (event) => {
    if (!wrap.contains(event.relatedTarget)) setNavMoreOpen(false);
  };

  if (navMoreDocumentBound) return;
  navMoreDocumentBound = true;
}
