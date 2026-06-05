# ITFlow VN — Học Tin học kiểu micro-learning

Ứng dụng web học **Tin học** (hiện có nội dung **lớp 5** – SGK Kết nối tri thức): mỗi bài gồm **lý thuyết**, **quiz** và **thực hành** (lab checklist). SPA thuần HTML/CSS/JS (ES Modules), PWA offline, lưu tiến độ trong `localStorage`.

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

## Nội dung lớp 5 (MVP)

| | Số lượng |
|---|---|
| Vi kỹ năng / bài | 18 |
| Câu hỏi | 36 |
| Lab thực hành | 13 |

Sinh lại dữ liệu lớp 5:

```bash
node scripts/generate-grade5-content.mjs
```

## Blockly (Chủ đề 6 · Lớp 5, Bài 10–16)

Lab lập trình trực quan nhúng [Blockly 10](https://developers.google.com/blockly/) (CDN):

- Khối tiếng Việt: «Khi bấm Chạy», «Nói», «Tiến», «Quay», «Chờ»
- Khối chuẩn: lặp, rẽ nhánh, biến, biểu thức
- **Chạy thử**: mô phỏng trên canvas + nhật ký
- **Kiểm tra bài**: tự động theo cấu trúc SGK từng bài

Cần mạng lần đầu để tải thư viện Blockly.

## Lộ trình mở rộng

1. Lớp 3–4, 6–12 (script `generate-grade*.mjs`)
2. Office-lite / mô phỏng cây thư mục
3. Lưu workspace Blockly offline (vendor cục bộ)

## Tham chiếu

- Chương trình GDPT 2018 môn Tin học (TT 32/2018)
- SGK Tin học 5 KNTT (`docs/SGK Tin học 5 KNTT.pdf`)
