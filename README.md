# ITFlow VN — Học Tin học kiểu micro-learning

Ứng dụng web học **Tin học** (lớp **1–12** – bám chương trình làm quen / SGK KNTT): mỗi bài gồm **lý thuyết**, **luyện tập** (quiz, flashcards, memory, bài tập SGK), **thực hành** (lab checklist / Blockly / mô phỏng), **sơ đồ tư duy** và **ôn hè**. SPA thuần HTML/CSS/JS (ES Modules), PWA offline, lưu tiến độ trong `localStorage`.

## Chạy ứng dụng

Cần HTTP server (ES Modules + `fetch`):

```bash
cd ITflow
python3 -m http.server 8080
```

Mở: http://localhost:8080

## Cấu trúc

```text
ITflow/
├── index.html
├── manifest.json
├── service-worker.js
├── assets/css/          # main, layout, lab
├── assets/js/           # app, router, state, utils, profileStore
├── components/          # navbar, lessonCard, quizCard, modal, learnerSwitcher
├── modules/             # lesson, quiz, lab, progress, gamification, error engines
├── data/                # skills, lessons, questions, labs, errors (JSON)
├── scripts/             # generate-grade5-content.mjs
└── docs/                # SGK & tài liệu tham chiếu
```

## Nội dung

| Lớp | Bài | Câu hỏi | Lab |
|-----|-----|---------|-----|
| 1 | 16 | 32 | 12 (mô phỏng chuột/bàn phím) |
| 2 | 16 | 32 | 13 (mô phỏng chuột/bàn phím) |
| 3 | 16 | 32 | 12 (4 mô phỏng + 3 Blockly + checklist) |
| 4 | 17 | 34 | 15 (5 mô phỏng + 3 Blockly + checklist) |
| 5 | 18 | 36 | 13 (7 Blockly + checklist) |
| 6 | 17 | 34 | 15 (5 mô phỏng + 3 Blockly + checklist) |
| 7 | 16 | 32 | 15 (5 mô phỏng + 3 Blockly + checklist) |
| 8 | 20 | 40 | 18 (1 mô phỏng + 4 Blockly + checklist) |
| 9 | 22 | 44 | 20 (1 mô phỏng + 3 Blockly + checklist) |
| 10 | 34 | 68 | 31 (2 mô phỏng + 5 Blockly + checklist/Python) |
| 11 | 46 | 92 | 44 (16 chung + 15 CS + 15 ICT; SQL/ảnh/video) |
| 12 | 37 | 74 | 31 (21 chung + 9 CS + 7 ICT; mạng/ML/web) |

**Lớp 1:** 16 bài làm quen máy tính (chuột, bàn phím, an toàn). *Lưu ý: SGK Tin học KNTT chính thức từ lớp 3; lớp 1–2 bám SGK Hướng dẫn học Tin học TH.*

**Lớp 2:** SGK Hướng dẫn học Tin học lớp 2 (NXBGD) — chuột, Paint, bàn phím, học trên mạng (16 bài).

**Lớp 3:** SGK Tin học 3 – Kết nối tri thức (6 chủ đề, Blockly bài 14–16).

**Lớp 4:** SGK Tin học 4 – Kết nối tri thức (6 chủ đề, trình chiếu/văn bản, Blockly bài 14–16).

**Lớp 5:** SGK Tin học 5 – Kết nối tri thức (6 chủ đề, Blockly bài 10–16).

**Lớp 6:** SGK Tin học 6 – Kết nối tri thức THCS (6 chủ đề, dự án sổ lưu niệm, Blockly bài 15–17).

**Lớp 7:** SGK Tin học 7 – Kết nối tri thức THCS (5 chủ đề, bảng tính + trình chiếu, thuật toán bài 14–16).

**Lớp 8:** SGK Tin học 8 – KNTT (6 chủ đề, nhánh 8A/11A và 8B/11B, Blockly bài 12–15).

**Lớp 9:** SGK Tin học 9 – KNTT (6 chủ đề, bảng tính nâng cao / video, Blockly bài 14–16).

**Lớp 10:** SGK Tin học 10 – KNTT THPT (Python bài 16–32, đồ họa, Blockly mô phỏng).

**Lớp 11:** SGK Tin học 11 – KNTT (16 bài chung + **Khoa học máy tính** hoặc **Tin học ứng dụng** bài 17–31).

**Lớp 12:** SGK Tin học 12 – KNTT (21 bài chung + **Khoa học máy tính** bài 22–30 hoặc **Tin học ứng dụng** bài 22–28).

Sinh lại dữ liệu:

```bash
node scripts/generate-grade1-content.mjs
node scripts/generate-grade2-content.mjs
node scripts/generate-grade3-content.mjs
node scripts/generate-grade4-content.mjs
node scripts/generate-grade5-content.mjs
node scripts/generate-grade6-content.mjs
node scripts/generate-grade7-content.mjs
node scripts/generate-grades-8-12-content.mjs
# hoặc từng lớp: generate-grade8-content.mjs … generate-grade12-content.mjs
```

## Blockly

- **Lớp 3:** Chủ đề 6 — Bài 14–16 (tuần tự, rẽ nhánh)
- **Lớp 4:** Chủ đề 6 — Bài 14–16 (tuần tự, lặp)
- **Lớp 5:** Chủ đề 6 — Bài 10–16 (tuần tự, lặp, rẽ nhánh, biến, biểu thức, dự án)
- **Lớp 6:** Chủ đề 6 — Bài 15–17 (tuần tự, lặp, rẽ nhánh)
- **Lớp 7:** Chủ đề 5 — Bài 14–16 (tìm kiếm tuần tự, nhị phân, sắp xếp)
- **Lớp 8–9:** Blockly — thuật toán, biến, rẽ nhánh, dự án
- **Lớp 10–11:** Blockly mô phỏng Python/thuật toán; lab checklist cho Python/SQL
- **Lớp 12:** Blockly + checklist HTML/CSS

Lab lập trình trực quan nhúng [Blockly 10](https://developers.google.com/blockly/) (CDN):

- Khối tiếng Việt: «Khi bấm Chạy», «Nói», «Tiến», «Quay», «Chờ»
- Khối chuẩn: lặp, rẽ nhánh, biến, biểu thức
- **Chạy thử**: mô phỏng trên canvas + nhật ký
- **Kiểm tra bài**: tự động theo cấu trúc SGK từng bài

Cần mạng lần đầu để tải thư viện Blockly.

## Mô phỏng chuột & bàn phím (Lớp 1–12)

Lab **Mô phỏng** thay checklist cho các bài thực hành lớp 1–2:

- **Chuột:** nháy, nháy đúp, kéo thả, cuộn, mở/thoát phần mềm, tô màu Paint, tìm kiếm web
- **Bàn phím:** hàng cơ sở, gõ dãy/từ, bàn phím ảo + bàn phím thật

Cấu hình kịch bản: `modules/inputLab/scenarios.js`

## Tính năng (parity MathFlow + lab Tin học)

- **Luyện tập** (`#/practice/:skill`): mini quiz, flashcards, memory, bài tập SGK (`exercises.json`)
- **Sơ đồ tư duy** (`#/mindmap`): tổng hợp theo lớp/chủ đề/bài
- **Ôn hè** (`#/summer`): 11 lộ trình lớp 1→12, chủ đề + đề tổng hợp
- **Sổ lỗi sai**, **hồ sơ/huy hiệu**, **daily quest**
- **Lab riêng ITflow**: Blockly, mô phỏng chuột/bàn phím, checklist HTML/Python/SQL

Sinh dữ liệu phụ:

```bash
node scripts/generate-it-extras.mjs
```

## Lộ trình mở rộng

1. Lab Python/SQL/HTML tương tác (THPT)
2. Lưu workspace Blockly offline (vendor cục bộ)

## Tham chiếu

- Chương trình GDPT 2018 môn Tin học (TT 32/2018)
- SGK Tin học 5 KNTT (`docs/SGK Tin học 5 KNTT.pdf`)
