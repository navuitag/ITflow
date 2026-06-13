const SCHOOL_LEVELS = [
  {
    id: "tieu-hoc",
    title: "Tiểu Học",
    subtitle: "Hệ thống học liệu số lớp 1 – 2 – 3 – 4 – 5",
    grades: [1, 2, 3, 4, 5],
    icon: "🎒"
  },
  {
    id: "thcs",
    title: "Trung Học Cơ Sở",
    subtitle: "Hệ thống học liệu số lớp 6 – 7 – 8 – 9",
    grades: [6, 7, 8, 9],
    icon: "💻"
  },
  {
    id: "thpt",
    title: "Trung Học Phổ Thông",
    subtitle: "Hệ thống học liệu số lớp 10 – 11 – 12",
    grades: [10, 11, 12],
    icon: "🚀"
  }
];

const FEATURES = [
  {
    title: "Trò chơi & Lab",
    body: "Chơi và tương tác: mô phỏng chuột–bàn phím, Blockly, Scratch, memory game.",
    icon: "🎮",
    href: "#/input",
    label: "Khám phá"
  },
  {
    title: "Bài học",
    body: "Lý thuyết, quiz, flashcard và bài tập SGK theo từng lớp và chương.",
    icon: "📚",
    href: "#/skills",
    label: "Mở sách"
  },
  {
    title: "Tài nguyên",
    body: "Sơ đồ tư duy, thư viện Scratch, mô phỏng và liên kết học liệu tham khảo.",
    icon: "🗂️",
    href: "#/resources",
    label: "Xem thêm"
  }
];

function countSkills(skills, grades) {
  return skills.filter((skill) => grades.includes(skill.grade)).length;
}

function levelForGrade(grade) {
  return SCHOOL_LEVELS.find((level) => level.grades.includes(grade)) || SCHOOL_LEVELS[0];
}

export function renderHomePortal(state, ctx) {
  const { escapeHtml, skills, activeGrade, nextSkill, study, summary, questPercent, weakSkill } = ctx;
  const gradeSkills = skills.filter((skill) => skill.grade === activeGrade);
  const activeLevel = levelForGrade(activeGrade);
  const totalSkills = skills.length;

  const levelCards = SCHOOL_LEVELS.map((level) => {
    const count = countSkills(skills, level.grades);
    const isActive = level.id === activeLevel.id ? " is-active" : "";
    return `
      <button type="button" class="kv-level-card${isActive}" data-kv-level="${level.id}" data-kv-grade="${level.grades[0]}">
        <span class="kv-level-icon" aria-hidden="true">${level.icon}</span>
        <h2>${escapeHtml(level.title)}</h2>
        <p>${escapeHtml(level.subtitle)}</p>
        <span class="kv-level-meta">${count} bài · ${level.grades[0]}–${level.grades[level.grades.length - 1]}</span>
      </button>`;
  }).join("");

  const featureCards = FEATURES.map((item) => `
    <article class="kv-feature-card">
      <span class="kv-feature-icon" aria-hidden="true">${item.icon}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
      <a class="btn secondary" href="${item.href}">${escapeHtml(item.label)}</a>
    </article>`).join("");

  return `
    <section class="kv-hero">
      <div>
        <div class="kv-hero-badge" aria-hidden="true">IT</div>
        <span class="eyebrow">ITFlow VN · Học liệu số Tin học</span>
        <h1>Vừa học vừa chơi — bám SGK KNTT lớp 1–12</h1>
        <p class="kv-hero-lead">Nền tảng tham khảo <strong>Kiến Vàng</strong> (Khang Phúc): truy cập lý thuyết, quiz, lab thực hành và trò chơi tương tác trực tiếp trên trình duyệt — không cần cài thêm phần mềm.</p>
        <div class="hero-actions">
          <a class="btn primary" href="#/lesson/${nextSkill.id}">Tiếp tục học</a>
          <a class="btn secondary" href="#/skills">Chọn lớp / Sách</a>
          <a class="btn secondary" href="#/sitemap">Sơ đồ điều hướng</a>
        </div>
      </div>
      <div class="kv-hero-visual">
        <div class="kv-hero-card">
          <span class="tag">Daily Quest</span>
          <strong>${state.dailyQuest.progress}/${state.dailyQuest.target}</strong>
          <span>câu đúng hôm nay</span>
          <div class="progress-track" style="margin-top:12px"><span style="width:${questPercent}%"></span></div>
          <p style="margin-top:12px;font-size:0.85rem">${weakSkill ? `Ôn thêm: ${escapeHtml(weakSkill.skill)}` : "Khởi động nhẹ với bài tiếp theo."}</p>
        </div>
      </div>
    </section>

    <section class="kv-level-grid" aria-label="Chọn cấp học">
      ${levelCards}
    </section>

    <section class="kv-about">
      <h2>Về ITFlow VN</h2>
      <p>
        ITFlow VN là hệ thống hỗ trợ học <strong>Tin học</strong> theo hướng học liệu số — tương tự
        <a href="https://online.khangphuc.vn/" target="_blank" rel="noopener">Kiến Vàng</a> của Khang Phúc.
        Người học truy cập trực tiếp bài giảng, luyện tập, lab Blockly, mô phỏng chuột–bàn phím và Scratch.
        Giáo viên có thể dùng sơ đồ tư duy, bài tập SGK và nhiều hình thức luyện tập (flashcard, quiz, memory) để em ghi nhớ kiến thức mới.
        Hiện có <strong>${totalSkills}</strong> bài trên <strong>12 lớp</strong>.
      </p>
    </section>

    <section class="kv-feature-grid" aria-label="Tính năng chính">
      ${featureCards}
    </section>

    <section class="stat-grid">
      <article><strong>${study.todayLabel}</strong><span>Học hôm nay</span></article>
      <article><strong>${state.todayXp}</strong><span>XP hôm nay</span></article>
      <article><strong>${state.streak}</strong><span>Chuỗi ngày</span></article>
      <article><strong>${study.totalLabel}</strong><span>Tổng giờ học</span></article>
      <article><strong>${ctx.accuracy}%</strong><span>Độ chính xác</span></article>
      <article><strong>${summary.level}</strong><span>Cấp độ</span></article>
    </section>

    <section class="kv-continue-panel">
      <div class="section-head">
        <h2>Bài tiếp theo · Lớp ${activeGrade}</h2>
        <a href="#/mindmap">Sơ đồ tư duy</a>
      </div>
      <div class="skill-grid">
        ${ctx.renderLessonCards(gradeSkills.slice(0, 3))}
      </div>
    </section>
    ${ctx.edtechHub}
  `;
}

export function bindHomePortal({ setSelectedGrade, setRoute }) {
  document.querySelectorAll("[data-kv-level]").forEach((button) => {
    button.addEventListener("click", () => {
      const grade = Number(button.dataset.kvGrade);
      setSelectedGrade(grade);
      setRoute("#/skills");
    });
  });
}

export function renderResourcesPage(escapeHtml, skills) {
  const grades = [...new Set(skills.map((s) => s.grade))].sort((a, b) => a - b);
  const gradeLinks = grades.map((g) => `<a href="#/skills" data-resource-grade="${g}">Sách lớp ${g}</a>`).join(" · ");

  const cards = [
    {
      title: "Luyện chuột & bàn phím",
      body: "Mô phỏng thao tác cơ bản cho lớp 1–2 và ôn kỹ năng thao tác.",
      href: "#/input"
    },
    {
      title: "Thư viện Scratch",
      body: "Dự án Scratch mẫu và hướng dẫn lập trình khối.",
      href: "#/scratch"
    },
    {
      title: "Sơ đồ tư duy",
      body: "Tổng quan chương trình Tin học theo lớp và chủ đề.",
      href: "#/mindmap"
    },
    {
      title: "Flashcard & Memory",
      body: "Vào bất kỳ bài nào → Luyện tập → Flashcard hoặc Memory.",
      href: "#/skills"
    },
    {
      title: "Sổ tay lỗi sai",
      body: "Xem lỗi thường gặp và gợi ý bài cần ôn lại.",
      href: "#/review/errors"
    },
    {
      title: "Kiến Vàng (tham khảo)",
      body: "Học liệu số SGK Tin học Em vui học Tin học — Công ty Khang Phúc.",
      href: "https://online.khangphuc.vn/",
      external: true
    }
  ];

  return `
    <section class="page-title">
      <span class="eyebrow">Chia sẻ · Tài nguyên</span>
      <h1>Tài nguyên học tập</h1>
      <p>Lab, mô phỏng, sơ đồ và liên kết tham khảo — theo mô hình mục Tài nguyên trên Kiến Vàng.</p>
    </section>
    <p class="grade-summary">${gradeLinks}</p>
    <div class="resource-grid">
      ${cards.map((card) => `
        <article class="resource-card">
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.body)}</p>
          <a class="btn secondary" href="${card.href}"${card.external ? ' target="_blank" rel="noopener"' : ""}>
            ${card.external ? "Mở Kiến Vàng" : "Mở"}
          </a>
        </article>`).join("")}
    </div>`;
}

export function bindResourcesPage({ setSelectedGrade, setRoute }) {
  document.querySelectorAll("[data-resource-grade]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setSelectedGrade(Number(link.dataset.resourceGrade));
      setRoute("#/skills");
    });
  });
}

export function renderSitemapPage(escapeHtml, skills) {
  const grades = [...new Set(skills.map((s) => s.grade))].sort((a, b) => a - b);

  const groups = [
    {
      title: "Trang chính",
      links: [
        { label: "Trang chủ", href: "#/home" },
        { label: "Sách / Kỹ năng", href: "#/skills" },
        { label: "Tài nguyên", href: "#/resources" },
        { label: "Sơ đồ tư duy", href: "#/mindmap" },
        { label: "Hồ sơ người học", href: "#/profile" }
      ]
    },
    {
      title: "Luyện tập & Lab",
      links: [
        { label: "Chuột & bàn phím", href: "#/input" },
        { label: "Scratch", href: "#/scratch" },
        { label: "Sổ tay lỗi sai", href: "#/review/errors" }
      ]
    },
    {
      title: "Theo lớp",
      links: grades.map((g) => ({ label: `Lớp ${g}`, href: "#/skills", grade: g }))
    },
    {
      title: "Tham khảo bên ngoài",
      links: [
        { label: "Kiến Vàng — Khang Phúc", href: "https://online.khangphuc.vn/", external: true }
      ]
    }
  ];

  return `
    <section class="page-title">
      <span class="eyebrow">Điều hướng</span>
      <h1>Sơ đồ điều hướng</h1>
      <p>Bản đồ nhanh các khu vực trong ITFlow VN — tương tự mục Sơ Đồ Điều Hướng trên Kiến Vàng.</p>
    </section>
    <div class="sitemap-grid">
      ${groups.map((group) => `
        <section class="sitemap-group">
          <h2>${escapeHtml(group.title)}</h2>
          <ul>
            ${group.links.map((link) => {
              const label = link.label || link[0];
              const href = link.href || link[1];
              const external = link.external || href.startsWith("http");
              const gradeAttr = link.grade ? ` data-sitemap-grade="${link.grade}"` : "";
              return `<li><a href="${href}"${gradeAttr}${external ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(label)}</a></li>`;
            }).join("")}
          </ul>
        </section>`).join("")}
    </div>`;
}

export function bindSitemapPage({ setSelectedGrade, setRoute }) {
  document.querySelectorAll("[data-sitemap-grade]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setSelectedGrade(Number(link.dataset.sitemapGrade));
      setRoute("#/skills");
    });
  });
}
