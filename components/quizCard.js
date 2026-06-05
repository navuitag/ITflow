import { escapeHtml, shuffle } from "../assets/js/utils.js";

export function renderQuizCard(question) {
  const choiceList = Array.isArray(question.choices) ? question.choices : [];
  const choices = question.type === "multiple_choice" ? shuffle(choiceList) : [];
  const answerArea = question.type === "true_false"
    ? `<div class="choice-grid choice-grid--binary">${(question.choices || ["Đúng", "Sai"]).map((choice) => `
        <button class="choice-btn" data-answer="${escapeHtml(choice)}">${escapeHtml(choice)}</button>
      `).join("")}</div>`
    : question.type === "multiple_choice"
    ? `<div class="choice-grid">${choices.map((choice) => `
        <button class="choice-btn" data-answer="${escapeHtml(choice)}">${escapeHtml(choice)}</button>
      `).join("")}</div>`
    : `
      <form class="answer-form">
        <input class="answer-input" name="answer" autocomplete="off" autofocus placeholder="Nhập đáp án">
        <button class="btn primary" type="submit">Kiểm tra</button>
      </form>
    `;

  return `
    <article class="quiz-card" data-question-id="${question.id}">
      <div class="quiz-meta">
        <span>Lý thuyết · Mini quiz</span>
        <button class="hint-btn" type="button" data-hint="${escapeHtml(question.hint || "")}">Gợi ý</button>
      </div>
      <h2>${escapeHtml(question.question)}</h2>
      ${answerArea}
      <div class="feedback-panel" aria-live="polite"></div>
    </article>
  `;
}

export function focusAnswerInput(root = document) {
  const input = root.querySelector(".answer-input:not([disabled])");
  if (!input) return;
  requestAnimationFrame(() => input.focus({ preventScroll: true }));
}
