import {
  getScratchEmbedUrl,
  getScratchEditorUrl,
  SCRATCH_GALLERY,
  SKILL_EMBEDS
} from "./embedLab/scratchProjects.js";

export { SKILL_EMBEDS, SCRATCH_GALLERY };

export function isEmbedLab(lab) {
  return lab?.type === "embed" && lab?.embed?.provider;
}

export function renderEmbedLab(lab, skill, escapeHtml) {
  const embed = lab.embed;
  const progress = lab.steps || [];
  const embedUrl = embed.provider === "scratch" ? getScratchEmbedUrl(embed.projectId) : embed.url;
  const editorUrl =
    embed.provider === "scratch" && embed.projectId ? getScratchEditorUrl(embed.projectId) : null;

  return `
    <section class="embed-lab">
      <aside class="embed-lab-side">
        <a class="back-link" href="#/practice/${lab.skill}">← Luyện tập</a>
        <span class="tag tag-cs">Scratch · nhúng</span>
        <h1>${escapeHtml(lab.title)}</h1>
        <p class="embed-lab-mission">${escapeHtml(embed.mission || "")}</p>
        <p class="embed-lab-note">Cần kết nối Internet để tải Scratch.</p>
        ${editorUrl ? `<a class="btn secondary embed-editor-link" href="${editorUrl}" target="_blank" rel="noopener noreferrer">Mở Scratch chỉnh sửa ↗</a>` : ""}
        <div class="embed-checklist">
          <strong>Em đã làm được</strong>
          <ul class="embed-step-list" id="embedStepList">
            ${progress
              .map(
                (step) => `
              <li>
                <label class="embed-step-check">
                  <input type="checkbox" data-step="${step.id}">
                  <span>${escapeHtml(step.label)}</span>
                </label>
                ${step.hint ? `<p class="embed-step-hint">${escapeHtml(step.hint)}</p>` : ""}
              </li>`
              )
              .join("")}
          </ul>
        </div>
        <button type="button" class="btn primary" id="embedComplete" disabled>
          Hoàn thành thực hành (+${lab.xp} XP)
        </button>
      </aside>
      <div class="embed-frame-wrap">
        <iframe
          class="embed-frame"
          id="embedFrame"
          src="${embedUrl}"
          title="${escapeHtml(lab.title)}"
          allow="fullscreen; autoplay"
          loading="lazy"
          referrerpolicy="no-referrer"
        ></iframe>
      </div>
    </section>`;
}

export function bindEmbedLab(lab, { onComplete }) {
  const steps = lab.steps || [];
  const checkboxes = [...document.querySelectorAll("#embedStepList input[type=checkbox]")];
  const completeBtn = document.querySelector("#embedComplete");

  const refresh = () => {
    const done = checkboxes.filter((cb) => cb.checked).length;
    if (completeBtn) completeBtn.disabled = done < steps.length;
  };

  checkboxes.forEach((cb) => cb.addEventListener("change", refresh));
  refresh();

  completeBtn?.addEventListener("click", () => {
    if (completeBtn.disabled) return;
    onComplete?.();
  });

  return () => {};
}

export function renderScratchGallery(escapeHtml) {
  return `
    <section class="scratch-gallery">
      <header class="section-head">
        <div>
          <h1>Scratch trong ITFlow</h1>
          <p>Học lập trình trực quan ngay trong ứng dụng — dùng TurboWarp (tương thích Scratch).</p>
        </div>
        <a class="back-link" href="#/home">← Trang chủ</a>
      </header>
      <p class="embed-lab-note">Cần Internet. Em có thể mở trình chỉnh sửa để tự sáng tạo dự án.</p>
      <div class="scratch-grid">
        ${SCRATCH_GALLERY.map((item) => {
          const embedUrl = getScratchEmbedUrl(item.projectId);
          const editorUrl = getScratchEditorUrl(item.projectId);
          return `
            <article class="scratch-card">
              <div class="scratch-card-frame">
                <iframe
                  src="${embedUrl}"
                  title="${escapeHtml(item.title)}"
                  loading="lazy"
                  allow="fullscreen"
                  referrerpolicy="no-referrer"
                ></iframe>
              </div>
              <div class="scratch-card-body">
                <span class="tag">Lớp ${escapeHtml(item.grade)}</span>
                <h2>${escapeHtml(item.title)}</h2>
                <p>${escapeHtml(item.description)}</p>
                <a class="btn secondary" href="${editorUrl}" target="_blank" rel="noopener noreferrer">Chỉnh sửa dự án ↗</a>
              </div>
            </article>`;
        }).join("")}
      </div>
    </section>`;
}
