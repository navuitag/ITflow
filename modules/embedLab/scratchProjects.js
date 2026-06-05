/** Dự án Scratch (TurboWarp) gắn với kỹ năng SGK. */
export const SKILL_EMBEDS = {
  g2_d12: {
    provider: "scratch",
    projectId: 4814367,
    labTitle: "Scratch: Trò chơi và animation",
    mission:
      "Làm quen Scratch qua dự án «Animate your name». Nháy cờ xanh, thử đổi chữ và thêm hiệu ứng chuyển động.",
    steps: [
      { id: "s1", label: "Nháy cờ xanh chạy chương trình", hint: "Góc trên bên phải khung Scratch." },
      { id: "s2", label: "Thử đổi tên hoặc màu chữ của em", hint: "Kéo khối trong nhóm Hiển thị / Ngoại hình." },
      { id: "s3", label: "Thêm ít nhất một hiệu ứng chuyển động", hint: "Dùng khối Lặp hoặc Trượt." }
    ]
  },
  g4_f13: {
    provider: "scratch",
    projectId: 104,
    labTitle: "Scratch: Chơi với máy tính",
    mission: "Điều khiển nhân vật Scratch bằng phím mũi tên — bước đầu lập trình trực quan.",
    steps: [
      { id: "s1", label: "Nháy cờ xanh để chạy", hint: "Quan sát nhân vật di chuyển." },
      { id: "s2", label: "Nhấn phím mũi tên trên bàn phím", hint: "Thử các hướng lên, xuống, trái, phải." },
      { id: "s3", label: "Đổi trang phục hoặc phông nền", hint: "Tab Trang phục hoặc Phông nền bên dưới sân khấu." }
    ]
  }
};

/** Dự án Scratch tự do (không gắn bài SGK) — dùng trên trang #/scratch. */
export const SCRATCH_GALLERY = [
  {
    id: "getting-started",
    projectId: 104,
    title: "Làm quen Scratch",
    grade: "1–4",
    description: "Nhân vật mèo Scratch — nháy cờ xanh và thử di chuyển."
  },
  {
    id: "animate-name",
    projectId: 4814367,
    title: "Animate your name",
    grade: "2–4",
    description: "Tạo animation tên em — dự án Hour of Code."
  },
  {
    id: "pong",
    projectId: 279508763,
    title: "Pong đơn giản",
    grade: "4–6",
    description: "Trò chơi đỡ bóng — luyện tư duy và điều khiển bàn phím."
  }
];

export function getScratchEmbedUrl(projectId) {
  return `https://turbowarp.org/embed/${projectId}?autoplay=false&turbo=false`;
}

export function getScratchEditorUrl(projectId) {
  return `https://turbowarp.org/${projectId}/editor`;
}
