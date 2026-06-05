import { updateState } from "../assets/js/state.js";

export function getLabProgress(lab, state) {
  const record = state.labProgress?.[lab.id] || { done: [] };
  const done = new Set(record.done || []);

  if (lab.type === "blockly" || lab.type === "mouse" || lab.type === "keyboard") {
    const passed = Boolean(record.passed) || state.completedLabs.includes(lab.skill);
    return {
      done: passed ? ["sim_pass"] : [],
      total: 1,
      percent: passed ? 100 : 0,
      complete: passed
    };
  }

  const total = lab.steps?.length || 0;
  return {
    done: [...done],
    total,
    percent: total ? Math.round((done.size / total) * 100) : 0,
    complete: total > 0 && done.size >= total
  };
}

export function toggleLabStep(lab, stepId) {
  updateState((state) => {
    if (!state.labProgress) state.labProgress = {};
    const record = state.labProgress[lab.id] || { done: [] };
    const done = new Set(record.done);
    if (done.has(stepId)) done.delete(stepId);
    else done.add(stepId);
    state.labProgress[lab.id] = { done: [...done] };
  });
}

export function completeLab(lab) {
  updateState((state) => {
    const progress = getLabProgress(lab, state);
    if (!progress.complete) return;

    if (!state.completedLabs.includes(lab.skill)) {
      state.completedLabs.push(lab.skill);
      state.xp += lab.xp;
      state.todayXp += lab.xp;
    }
    const current = state.skillMastery[lab.skill] || 0;
    state.skillMastery[lab.skill] = Math.max(current, 70);
  });
}
