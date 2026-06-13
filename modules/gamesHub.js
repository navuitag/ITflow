import { ARCADE_GAMES, bindArcadeGame, renderArcadeGame } from "./arcadeGames.js";
import { SCRATCH_GALLERY } from "./embedLab/scratchProjects.js";
import { SKILL_SIMULATORS } from "./inputLab/scenarios.js";

const SCHOOL_BANDS = [
  { id: "all", label: "Tất cả" },
  { id: "tieu-hoc", label: "Tiểu học", grades: [1, 2, 3, 4, 5] },
  { id: "thcs", label: "THCS", grades: [6, 7, 8, 9] },
  { id: "thpt", label: "THPT", grades: [10, 11, 12] }
];

const CATEGORIES = [
  { id: "all", label: "Mọi loại" },
  { id: "mouse", label: "Chuột" },
  { id: "keyboard", label: "Bàn phím" },
  { id: "memory", label: "Trí nhớ" },
  { id: "logic", label: "Logic" },
  { id: "coding", label: "Lập trình" }
];

function bandForGrade(grade) {
  if (grade <= 5) return "tieu-hoc";
  if (grade <= 9) return "thcs";
  return "thpt";
}

function matchesFilter(item, band, category, grade) {
  const bandOk = band === "all" || item.bands?.includes(band) || item.band === band;
  const catOk = category === "all" || item.category === category;
  const gradeOk = !item.grades || item.grades.includes(grade);
  return bandOk && catOk && gradeOk;
}

export function createGamesHubModule(ctx) {
  let filterBand = "all";
  let filterCategory = "all";

  function buildSimulatorEntries(grade) {
    return Object.entries(SKILL_SIMULATORS)
      .map(([skillId, sim]) => {
        const skill = ctx.data.skills.find((item) => item.id === skillId);
        if (!skill || skill.grade !== grade) return null;
        return {
          id: skillId,
          title: skill.title,
          instruction: sim.instruction,
          category: sim.type === "mouse" ? "mouse" : "keyboard",
          href: `#/lab/${skillId}`,
          band: bandForGrade(skill.grade),
          grades: [skill.grade]
        };
      })
      .filter(Boolean);
  }

  function buildBlocklyEntries(grade) {
    return ctx.data.labs
      .filter((lab) => lab.type === "blockly")
      .map((lab) => {
        const skill = ctx.data.skills.find((item) => item.id === lab.skill);
        if (!skill || skill.grade !== grade) return null;
        return {
          id: lab.id,
          title: lab.title || skill.title,
          instruction: "Lập trình Blockly — kéo thả khối lệnh.",
          category: "coding",
          href: `#/lab/${lab.skill}`,
          band: bandForGrade(skill.grade),
          grades: [skill.grade]
        };
      })
      .filter(Boolean);
  }

  function renderGameCard(item, escapeHtml) {
    if (item.href) {
      return `
        <a class="game-card" href="${item.href}">
          <span class="game-card-icon">${item.icon || "🎮"}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.subtitle || item.instruction || item.description || "")}</p>
          <span class="game-card-cta">Chơi →</span>
        </a>`;
    }
    return `
      <a class="game-card" href="#/games/${item.id}">
        <span class="game-card-icon">${item.icon || "🎮"}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.subtitle || item.description || "")}</p>
        <span class="game-card-cta">Chơi →</span>
      </a>`;
  }

  function renderCatalog(state) {
    const grade = state.selectedGrade;
    const band = filterBand === "all" ? bandForGrade(grade) : filterBand;

    const arcade = ARCADE_GAMES.filter((g) => matchesFilter(g, filterBand, filterCategory, grade));
    const simulators = buildSimulatorEntries(grade).filter((g) =>
      matchesFilter(g, filterBand, filterCategory, grade)
    );
    const blockly = buildBlocklyEntries(grade).filter((g) =>
      matchesFilter(g, filterBand, filterCategory, grade)
    );
    const scratch = SCRATCH_GALLERY.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.description,
      icon: "🐱",
      category: "coding",
      bands: ["tieu-hoc", "thcs"],
      href: "#/scratch",
      grades: [1, 2, 3, 4, 5, 6]
    })).filter((g) => matchesFilter(g, filterBand, filterCategory, grade));

    const bandTabs = SCHOOL_BANDS.map((b) => `
      <button type="button" class="game-filter${filterBand === b.id ? " active" : ""}" data-game-band="${b.id}">${b.label}</button>`).join("");
    const catTabs = CATEGORIES.map((c) => `
      <button type="button" class="game-filter${filterCategory === c.id ? " active" : ""}" data-game-cat="${c.id}">${c.label}</button>`).join("");

    const arcadeHtml = arcade.length
      ? `<div class="game-grid">${arcade.map((g) => renderGameCard(g, ctx.escapeHtml)).join("")}</div>`
      : "<p class='empty-state'>Không có trò chơi nhanh cho bộ lọc này.</p>";

    const simHtml = simulators.length
      ? `<div class="game-list">${simulators.map((g) => `
          <a class="game-list-item" href="${g.href}">
            <strong>${ctx.escapeHtml(g.title)}</strong>
            <span>${ctx.escapeHtml(g.instruction)}</span>
          </a>`).join("")}</div>`
      : "";

    const blocklyHtml = blockly.length
      ? `<div class="game-list">${blockly.slice(0, 8).map((g) => `
          <a class="game-list-item" href="${g.href}">
            <strong>${ctx.escapeHtml(g.title)}</strong>
            <span>Blockly · Lớp ${grade}</span>
          </a>`).join("")}${blockly.length > 8 ? `<a class="btn quiet" href="#/skills">+ ${blockly.length - 8} bài Blockly khác</a>` : ""}</div>`
      : "";

    const scores = state.arcadeScores || {};
    const played = Object.keys(scores).length;
    const firstSkill = ctx.data.skills.find((s) => s.grade === grade);

    return `
      <section class="games-hero">
        <div>
          <span class="eyebrow">Vừa học vừa chơi · Lớp ${grade}</span>
          <h1>Trò chơi luyện tập</h1>
          <p>Tham khảo <a href="https://online.khangphuc.vn/" target="_blank" rel="noopener">Kiến Vàng</a> — chơi và tương tác trực tiếp với nội dung Tin học: chuột, bàn phím, Blockly, Scratch và trí nhớ.</p>
        </div>
        <div class="games-hero-stats">
          <strong>${arcade.length + simulators.length + blockly.length}</strong>
          <span>game khả dụng</span>
          <strong>${played}</strong>
          <span>đã chơi</span>
        </div>
      </section>

      <div class="game-filters" role="group" aria-label="Cấp học">
        ${bandTabs}
      </div>
      <div class="game-filters game-filters--cat" role="group" aria-label="Loại game">
        ${catTabs}
      </div>

      <section class="games-section">
        <header class="section-head"><h2>🎯 Trò chơi nhanh</h2></header>
        ${arcadeHtml}
      </section>

      ${simHtml ? `<section class="games-section"><header class="section-head"><h2>🖱 Mô phỏng SGK · Lớp ${grade}</h2><a href="#/input">Xem tất cả</a></header>${simHtml}</section>` : ""}

      ${blocklyHtml ? `<section class="games-section"><header class="section-head"><h2>🧩 Blockly</h2></header>${blocklyHtml}</section>` : ""}

      ${scratch.length && (filterCategory === "all" || filterCategory === "coding") ? `
      <section class="games-section">
        <header class="section-head"><h2>🐱 Scratch</h2><a href="#/scratch">Thư viện</a></header>
        <div class="game-grid">${scratch.map((g) => renderGameCard(g, ctx.escapeHtml)).join("")}</div>
      </section>` : ""}

      <section class="games-section">
        <header class="section-head"><h2>🔁 Trí nhớ &amp; Flashcard</h2></header>
        <div class="game-quick-links">
          <a class="btn secondary" href="${firstSkill ? `#/practice/${firstSkill.id}/memory` : "#/skills"}">Memory game (bài lớp ${grade})</a>
          <a class="btn secondary" href="${firstSkill ? `#/practice/${firstSkill.id}/flashcards` : "#/skills"}">Flashcard</a>
        </div>
      </section>`;
  }

  function renderPlay(state, gameId) {
    const best = state.arcadeScores?.[gameId]?.best || 0;
    return renderArcadeGame(gameId, ctx.escapeHtml, best) || ctx.notFound("Không tìm thấy trò chơi.");
  }

  function bindCatalog() {
    document.querySelectorAll("[data-game-band]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBand = btn.dataset.gameBand;
        ctx.renderRoute();
      });
    });
    document.querySelectorAll("[data-game-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterCategory = btn.dataset.gameCat;
        ctx.renderRoute();
      });
    });
  }

  function bindPlay(gameId) {
    bindArcadeGame(gameId, {
      getState: ctx.getState,
      updateState: ctx.updateState,
      renderRoute: ctx.renderRoute
    });
  }

  return { renderCatalog, renderPlay, bindCatalog, bindPlay };
}
