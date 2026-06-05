import { masteryLabel, streamTag } from "../assets/js/utils.js";
import { isSkillUnlocked, getSkillProgress, getLabForSkill } from "../modules/progress.js";

export function renderLessonCard(skill, state, questions, labs) {
  const unlocked = isSkillUnlocked(skill, state);
  const progress = getSkillProgress(skill, state, questions, labs);
  const status = progress.completed
    ? "Hoàn thành"
    : unlocked
    ? "Sẵn sàng"
    : "Đang khóa";
  const lab = getLabForSkill(skill.id, labs);
  const labLabel = lab?.type === "blockly" ? "Blockly" : "Thực hành";
  const labLink = progress.hasLab
    ? `<a class="btn quiet" href="#/lab/${skill.id}">${labLabel}</a>`
    : "";
  const action = unlocked
    ? `<a class="btn primary" href="#/lesson/${skill.id}">Lý thuyết</a>
       <a class="btn secondary" href="#/quiz/${skill.id}">Quiz</a>
       ${labLink}`
    : `<button class="btn disabled" disabled>Khóa</button>`;

  return `
    <article class="skill-card ${unlocked ? "" : "locked"}">
      <div>
        <span class="tag">Lớp ${skill.grade} · ${streamTag(skill.streams)}</span>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
        <div class="dual-badge">
          <span>Lý thuyết: ${progress.lessonDone ? "✓" : "—"}</span>
          <span>Thực hành: ${progress.hasLab ? (progress.labDone ? "✓" : "—") : "N/A"}</span>
        </div>
      </div>
      <div class="mastery">
        <div class="progress-track"><span style="width:${progress.mastery}%"></span></div>
        <small>${status} · ${masteryLabel(progress.mastery)}</small>
      </div>
      <div class="card-actions">${action}</div>
    </article>
  `;
}
