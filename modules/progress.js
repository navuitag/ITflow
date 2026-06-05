import { percent } from "../assets/js/utils.js";

export function isSkillUnlocked(skill, state) {
  return skill.prerequisite.every((id) => state.completedLessons.includes(id));
}

export function getLabForSkill(skillId, labs) {
  return labs.find((lab) => lab.skill === skillId);
}

export function getSkillProgress(skill, state, questions, labs = []) {
  const relatedAnswers = state.answers.filter((answer) => answer.skill === skill.id);
  const correct = relatedAnswers.filter((answer) => answer.correct).length;
  const accuracy = percent(correct, relatedAnswers.length);
  const lessonDone = state.completedLessons.includes(skill.id);
  const lab = getLabForSkill(skill.id, labs);
  const labDone = !lab || state.completedLabs.includes(skill.id);
  const mastery = state.skillMastery[skill.id] || (lessonDone ? 50 : 0);
  const questionCount = questions.filter((question) => question.skill === skill.id).length;

  return {
    lessonDone,
    labDone,
    completed: lessonDone && labDone,
    accuracy,
    mastery,
    attempted: relatedAnswers.length,
    questionCount,
    hasLab: Boolean(lab)
  };
}

export function getOverallAccuracy(state) {
  const correct = state.answers.filter((answer) => answer.correct).length;
  return percent(correct, state.answers.length);
}

export function getWeakSkills(state) {
  const errorMap = state.errors.reduce((map, error) => {
    map[error.skill] = (map[error.skill] || 0) + 1;
    return map;
  }, {});
  return Object.entries(errorMap)
    .sort((a, b) => b[1] - a[1])
    .map(([skill, count]) => ({ skill, count }));
}
