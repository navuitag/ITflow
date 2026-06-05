import { normalizeAnswer } from "../assets/js/utils.js";

export function analyzeError(answer, question, errorPatterns) {
  const normalized = normalizeAnswer(answer);
  const pattern = errorPatterns.find((item) => {
    const sameSkill = !item.skill || item.skill === question.skill;
    return sameSkill && normalized.includes(normalizeAnswer(item.pattern));
  });

  if (pattern) return pattern;

  return {
    skill: question.skill,
    errorType: "concept_error",
    title: "Cần xem lại khái niệm",
    message: "Đáp án chưa khớp. Hãy đọc lại bài học và kiến thức trọng tâm.",
    hint: question.hint,
    recommendation: question.skill
  };
}
