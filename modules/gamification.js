import { levelFromXp } from "../assets/js/utils.js";

export function getGamificationSummary(state) {
  const level = levelFromXp(state.xp);
  const badges = [];

  if (state.completedLessons.length >= 1) badges.push("Bước đầu số hóa");
  if (state.completedLabs.length >= 1) badges.push("Tay nghề thực hành");
  if (state.completedLessons.length >= 5) badges.push("Nhịp học đều");
  if (state.answers.filter((answer) => answer.correct).length >= 10) badges.push("Mười câu chắc tay");
  if (state.streak >= 7) badges.push("7 ngày liên tiếp");

  return {
    level,
    currentLevelXp: state.xp % 120,
    nextLevelXp: 120,
    badges
  };
}

export function xpForAnswer(correct) {
  return correct ? 10 : 0;
}
