import { SKILL_SIMULATORS } from "../../modules/inputLab/scenarios.js";
import { SKILL_EMBEDS } from "../../modules/embedLab/scratchProjects.js";

export const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu SGK và xác định sản phẩm", hint: "Ghi ra việc cần hoàn thành." },
  { id: "s2", label: "Thực hiện trên máy theo hướng dẫn", hint: "Làm đúng thứ tự." },
  { id: "s3", label: "Kiểm tra và trình bày kết quả", hint: "So với rubric bài học." }
];

export function shortSkillTitle(title) {
  return title
    .replace(/^Bài \d+[AB]?\.\s*/, "")
    .replace(/^Thực hành:?\s*/, "")
    .replace(/^Thực hành tổng hợp:\s*/, "");
}

export function buildLabForSkill(id, title, options = {}) {
  const {
    blocklyLabs = {},
    checklistSteps = {},
    labStepsBySkill = {},
    xp = 46,
    simXp,
    checklistXp
  } = options;
  const short = shortSkillTitle(title);

  if (blocklyLabs[id]) {
    const cfg = blocklyLabs[id];
    return {
      id: `lab_${id}`,
      skill: id,
      type: "blockly",
      title: `Thực hành Blockly: ${short}`,
      xp: xp + 6,
      blockly: { ...cfg, starterXml: null }
    };
  }

  const embed = SKILL_EMBEDS[id];
  if (embed) {
    return {
      id: `lab_${id}`,
      skill: id,
      type: "embed",
      title: embed.labTitle || `Scratch: ${short}`,
      xp: embed.xp || xp,
      embed: {
        provider: embed.provider,
        projectId: embed.projectId,
        mission: embed.mission,
        url: embed.url
      },
      steps: embed.steps || defaultLabSteps
    };
  }

  const sim = SKILL_SIMULATORS[id];
  if (sim) {
    return {
      id: `lab_${id}`,
      skill: id,
      type: sim.type,
      title: `Thực hành: ${short}`,
      xp: simXp ?? xp - 4,
      simulator: sim
    };
  }

  return {
    id: `lab_${id}`,
    skill: id,
    type: "checklist",
    title: `Thực hành: ${short}`,
    xp: checklistXp ?? xp,
    steps: checklistSteps[id] || labStepsBySkill[id] || defaultLabSteps
  };
}
