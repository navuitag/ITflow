/**
 * Nội dung Tin học lớp 7 — SGK Kết nối tri thức với cuộc sống (16 bài, 5 chủ đề)
 */
import { readFile, writeFile } from "node:fs/promises";
import { SKILL_SIMULATORS } from "../modules/inputLab/scenarios.js";

const SOURCE = "Bám sát SGK Tin học 7 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.";

const grade7 = [
  ["g7_a01", "Bài 1. Thiết bị vào – ra", "Máy tính và cộng đồng", 1, "Phân biệt thiết bị vào (bàn phím, chuột…) và thiết bị ra (màn hình, loa…).", []],
  ["g7_a02", "Bài 2. Phần mềm máy tính", "Máy tính và cộng đồng", 1, "Hệ điều hành, phần mềm ứng dụng và phần mềm hệ thống.", ["g7_a01"]],
  ["g7_a03", "Bài 3. Quản lí dữ liệu trong máy tính", "Máy tính và cộng đồng", 1, "Tệp, thư mục, phần mở rộng và quy tắc đặt tên dữ liệu.", ["g7_a02"]],
  ["g7_b04", "Bài 4. Mạng xã hội và kênh trao đổi trên Internet", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 2, "Mạng xã hội, forum, chat; lợi ích và rủi ro khi trao đổi trực tuyến.", ["g7_a03"]],
  ["g7_c05", "Bài 5. Ứng xử trên mạng", "Đạo đức, pháp luật và văn hóa trong môi trường số", 3, "Ứng xử văn minh, tôn trọng người khác và tránh bắt nạt trên mạng.", ["g7_b04"]],
  ["g7_d06", "Bài 6. Làm quen với phần mềm bảng tính", "Ứng dụng tin học", 4, "Ô, hàng, cột, vùng làm việc và lưu tệp bảng tính.", ["g7_c05"]],
  ["g7_d07", "Bài 7. Tính toán tự động trên bảng tính", "Ứng dụng tin học", 4, "Công thức, tham chiếu ô và tính toán tự động khi dữ liệu đổi.", ["g7_d06"]],
  ["g7_d08", "Bài 8. Công cụ hỗ trợ tính toán", "Ứng dụng tin học", 4, "Hàm SUM, AVERAGE và các công cụ tính nhanh trên bảng tính.", ["g7_d07"]],
  ["g7_d09", "Bài 9. Trình bày bảng tính", "Ứng dụng tin học", 4, "Định dạng số, căn lề, viền và màu nền ô dữ liệu.", ["g7_d08"]],
  ["g7_d10", "Bài 10. Hoàn thiện bảng tính", "Ứng dụng tin học", 4, "Kiểm tra công thức, biểu đồ đơn giản và hoàn thiện bảng điểm mẫu.", ["g7_d09"]],
  ["g7_d11", "Bài 11. Tạo bài trình chiếu", "Ứng dụng tin học", 4, "Tạo slide mới, bố cục và nội dung cho bài trình chiếu chủ đề lớp.", ["g7_d10"]],
  ["g7_d12", "Bài 12. Định dạng đối tượng trên trang chiếu", "Ứng dụng tin học", 4, "Định dạng chữ, hình, hiệu ứng và căn chỉnh đối tượng trên slide.", ["g7_d11"]],
  ["g7_d13", "Bài 13. Thực hành tổng hợp: Hoàn thiện bài trình chiếu", "Ứng dụng tin học", 4, "Hoàn thiện bài trình chiếu kết hợp bảng tính theo rubric SGK.", ["g7_d12"]],
  ["g7_e14", "Bài 14. Thuật toán tìm kiếm tuần tự", "Giải quyết vấn đề với sự trợ giúp của máy tính", 5, "Duyệt lần lượt từng phần tử để tìm giá trị cần — độ phức tạp O(n).", ["g7_d13"]],
  ["g7_e15", "Bài 15. Thuật toán tìm kiếm nhị phân", "Giải quyết vấn đề với sự trợ giúp của máy tính", 5, "Chia đôi dãy đã sắp xếp, so sánh phần tử giữa để thu hẹp vùng tìm.", ["g7_e14"]],
  ["g7_e16", "Bài 16. Thuật toán sắp xếp", "Giải quyết vấn đề với sự trợ giúp của máy tính", 5, "Sắp xếp chọn, chèn hoặc nổi bọt — đổi chỗ phần tử để dãy tăng dần.", ["g7_e15"]]
];

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const buildSkills = () =>
  grade7.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
    id,
    title,
    grade: 7,
    book: "KNTT",
    chapter,
    chapterIndex,
    lessonNo: index + 1,
    domain: chapter,
    level: chapterIndex,
    prerequisite,
    description,
    streams: chapterIndex >= 5 ? ["CS"] : chapterIndex >= 4 ? ["ICT"] : ["DL"],
    competencies: chapterIndex === 3 ? ["NLb"] : chapterIndex >= 5 ? ["NLc", "NLd"] : ["NLa", "NTh"]
  }));

const corePoints = {
  g7_a01: [
    "Thiết bị vào: bàn phím, chuột, micro, camera…",
    "Thiết bị ra: màn hình, loa, máy in…",
    "CPU xử lý; thiết bị vào/ra giúp trao đổi với người dùng."
  ],
  g7_a02: [
    "Hệ điều hành điều khiển phần cứng.",
    "Phần mềm ứng dụng: Word, Excel, trình duyệt…",
    "Phần mềm hệ thống: driver, tiện ích bảo trì."
  ],
  g7_a03: [
    "Tệp có tên và phần mở rộng (.docx, .xlsx, .jpg…).",
    "Thư mục chứa tệp và thư mục con.",
    "Đặt tên không dấu, không ký tự lạ; sao lưu dữ liệu quan trọng."
  ],
  g7_b04: [
    "Mạng xã hội: Facebook, Zalo, forum học tập…",
    "Chia sẻ nhanh nhưng cần kiểm soát quyền riêng tư.",
    "Không đăng thông tin nhạy cảm; cảnh giác người lạ."
  ],
  g7_c05: [
    "Lịch sự, không xúc phạm, không bắt nạt (cyberbullying).",
    "Tôn trọng bản quyền ảnh, video, bài viết.",
    "Báo giáo viên/phụ huynh khi gặp hành vi xấu trên mạng."
  ],
  g7_d06: [
    "Ô được định danh bởi cột (A,B…) và hàng (1,2…).",
    "Vùng ô: A1:C5 chọn nhiều ô liền kề.",
    "Lưu tệp .xlsx vào thư mục bài học."
  ],
  g7_d07: [
    "Công thức bắt đầu bằng dấu =.",
    "Tham chiếu ô: =A1+B1.",
    "Sao chép công thức xuống các hàng khác."
  ],
  g7_d08: [
    "SUM(A1:A10) tính tổng.",
    "AVERAGE tính trung bình.",
    "AutoSum gợi ý công thức nhanh."
  ],
  g7_d09: [
    "Định dạng số: số thập phân, phần trăm.",
    "Căn giữa tiêu đề; căn phải cột số.",
    "Viền và màu nền giúp bảng dễ đọc."
  ],
  g7_d10: [
    "Kiểm tra lỗi #DIV/0!, #VALUE! trong công thức.",
    "Biểu đồ cột thể hiện điểm số.",
    "In xem trước trước khi nộp."
  ],
  g7_d11: [
    "Slide 1: tiêu đề + tên nhóm.",
    "Mỗi slide một ý chính, không quá nhiều chữ.",
    "Chọn bố cục phù hợp nội dung."
  ],
  g7_d12: [
    "Nhóm đối tượng để di chuyển cùng lúc.",
    "Màu chữ tương phản nền slide.",
    "Hiệu ứng vừa phải, không gây rối."
  ],
  g7_d13: [
    "Kết hợp số liệu từ bảng tính vào slide.",
    "Trình chiếu thử (F5) trước khi báo cáo.",
    "Trao đổi nhóm và chỉnh theo góp ý."
  ],
  g7_e14: [
    "Duyệt từ đầu đến cuối dãy.",
    "So sánh từng phần tử với giá trị cần tìm.",
    "Dừng khi tìm thấy hoặc hết dãy."
  ],
  g7_e15: [
    "Dãy phải đã sắp xếp tăng (hoặc giảm) dần.",
    "Lấy phần tử giữa, so sánh với giá trị cần tìm.",
    "Thu hẹp nửa trái hoặc nửa phải — nhanh hơn tìm tuần tự."
  ],
  g7_e16: [
    "Sắp xếp chọn: tìm min và đổi chỗ.",
    "Sắp xếp chèn: chèn vào vị trí đúng.",
    "Nổi bọt: so sánh cặp liền kề và đổi chỗ."
  ]
};

const buildLessons = () =>
  grade7.map(([id, title, chapter, , description]) => {
    const points = corePoints[id] || [description, "Thực hành theo SGK tại phòng máy.", "Hỏi giáo viên khi chưa hiểu."];
    return {
      id,
      title,
      skill: id,
      chapter,
      source: SOURCE,
      xp: 50,
      steps: [
        { type: "intro", title: "Mục tiêu bài học", content: description },
        {
          type: "keypoints",
          title: "Em cần nhớ",
          content: "Nắm các ý sau trước khi làm quiz và thực hành:",
          points
        },
        { type: "summary", title: "Ghi nhớ nhanh", content: points[0] }
      ]
    };
  });

const quizExtras = {
  g7_a01: {
    q1: {
      q: "Màn hình máy tính thuộc loại thiết bị:",
      choices: ["Ra", "Vào", "Lưu trữ", "Mạng"],
      a: "Ra"
    }
  },
  g7_a02: {
    q1: {
      q: "Windows, Ubuntu thuộc loại:",
      choices: ["Hệ điều hành", "Trình duyệt web", "Bàn phím", "Ổ cứng"],
      a: "Hệ điều hành"
    }
  },
  g7_b04: {
    q1: {
      q: "Khi dùng mạng xã hội, em nên:",
      choices: ["Kiểm soát thông tin cá nhân đăng tải", "Đăng mật khẩu để bạn nhớ", "Chấp nhận mọi lời mời người lạ", "Chia sẻ ảnh riêng tư của người khác"],
      a: "Kiểm soát thông tin cá nhân đăng tải"
    }
  },
  g7_c05: {
    q1: {
      q: "Bắt nạt trên mạng (cyberbullying) là:",
      choices: ["Hành vi sai, cần báo người lớn", "Trò đùa vô hại", "Cách thể hiện bản lĩnh", "Được khuyến khích ở trường"],
      a: "Hành vi sai, cần báo người lớn"
    },
    q2: { q: "Ứng xử trên mạng cần lịch sự và tôn trọng người khác.", a: "Đúng" }
  },
  g7_d07: {
    q1: {
      q: "Công thức Excel bắt đầu bằng ký tự:",
      choices: ["=", "+", "*", "#"],
      a: "="
    }
  },
  g7_e15: {
    q1: {
      q: "Tìm kiếm nhị phân yêu cầu dãy dữ liệu:",
      choices: ["Đã sắp xếp", "Ngẫu nhiên", "Chỉ có một phần tử", "Không có số"],
      a: "Đã sắp xếp"
    }
  },
  g7_e16: {
    q1: {
      q: "Thuật toán sắp xếp dùng để:",
      choices: ["Sắp xếp phần tử theo thứ tự", "Tắt máy tính", "Gửi email", "In tài liệu"],
      a: "Sắp xếp phần tử theo thứ tự"
    }
  }
};

const buildQuestions = () =>
  grade7.flatMap(([id, title, , , description]) => {
    const short = title.split(". ").slice(1).join(". ") || title;
    const extra = quizExtras[id];
    const q1 = extra?.q1
      ? {
          id: `q_${id}_1`,
          skill: id,
          type: "multiple_choice",
          question: extra.q1.q,
          choices: extra.q1.choices,
          answer: extra.q1.a,
          hint: "Xem lại phần «Em cần nhớ»."
        }
      : {
          id: `q_${id}_1`,
          skill: id,
          type: "multiple_choice",
          question: `Theo bài «${short}», ý nào đúng nhất?`,
          choices: [description, "Không cần đặt tên tệp rõ ràng.", "Công thức bảng tính không bắt đầu bằng =.", "Thuật toán tìm kiếm không cần so sánh."],
          answer: description,
          hint: "Đọc lại mục tiêu và kiến thức trọng tâm."
        };
    const q2 = extra?.q2
      ? {
          id: `q_${id}_2`,
          skill: id,
          type: "true_false",
          question: extra.q2.q,
          choices: ["Đúng", "Sai"],
          answer: extra.q2.a,
          hint: "Suy nghĩ quy tắc ứng xử trên mạng."
        }
      : {
          id: `q_${id}_2`,
          skill: id,
          type: "true_false",
          question: `Kiến thức bài «${short}» góp phần hình thành năng lực tin học lớp 7.`,
          choices: ["Đúng", "Sai"],
          answer: "Đúng",
          hint: "Môn Tin học THCS phát triển năng lực NLa–NLd theo CT 2018."
        };
    return [q1, q2];
  });

const blocklyLabs = {
  g7_e14: {
    mode: "sequence",
    mission: "Tìm kiếm tuần tự: ghép ≥ 3 lệnh tuần tự (Nói, Tiến…) mô phỏng duyệt từng bước.",
    hint: "Mỗi bước so sánh tương ứng một lệnh trong thuật toán.",
    rules: { minChain: 3 }
  },
  g7_e15: {
    mode: "branch",
    mission: "Tìm kiếm nhị phân: dùng «Nếu … thì» so sánh và chọn nhánh xử lý.",
    hint: "So sánh phần tử giữa — rẽ nhánh trái hoặc phải.",
    rules: {}
  },
  g7_e16: {
    mode: "loop",
    mission: "Sắp xếp: dùng «Lặp lại» ≥ 4 lần, bên trong có lệnh (mô phỏng đổi chỗ/so sánh).",
    hint: "Vòng lặp thể hiện việc quét và đổi chỗ nhiều lần.",
    rules: { minRepeatTimes: 4 }
  }
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu SGK và xác định sản phẩm", hint: "Ghi ra việc cần hoàn thành." },
  { id: "s2", label: "Thực hiện trên máy theo hướng dẫn", hint: "Làm đúng thứ tự." },
  { id: "s3", label: "Kiểm tra và trình bày kết quả", hint: "So với rubric bài học." }
];

const spreadsheetSteps = [
  { id: "s1", label: "Nhập dữ liệu vào bảng tính theo mẫu SGK", hint: "Đúng hàng, cột." },
  { id: "s2", label: "Viết công thức hoặc dùng hàm SUM/AVERAGE", hint: "Bắt đầu bằng dấu =." },
  { id: "s3", label: "Định dạng và kiểm tra kết quả", hint: "Xem lỗi công thức nếu có." },
  { id: "s4", label: "Lưu tệp .xlsx", hint: "Đặt tên có nghĩa." }
];

const presentationSteps = [
  { id: "s1", label: "Rà soát slide và số liệu từ bảng tính", hint: "Đủ phần theo rubric." },
  { id: "s2", label: "Hoàn thiện định dạng và hiệu ứng", hint: "Đồng bộ phông, màu." },
  { id: "s3", label: "Trình chiếu thử và trao đổi nhóm", hint: "F5 xem trước." },
  { id: "s4", label: "Lưu và nộp bài trình chiếu", hint: "Đặt tên tệp rõ ràng." }
];

const checklistSteps = {
  g7_d06: defaultLabSteps,
  g7_d09: spreadsheetSteps.slice(0, 3),
  g7_d10: spreadsheetSteps,
  g7_d11: defaultLabSteps,
  g7_d12: defaultLabSteps,
  g7_d13: presentationSteps
};

const theoryOnly = new Set(["g7_c05"]);

const buildLabs = () =>
  grade7
    .filter(([id]) => !theoryOnly.has(id))
    .map(([id, title]) => {
      const short = title
        .replace(/^Bài \d+[AB]?\.\s*/, "")
        .replace(/^Thực hành:?\s*/, "")
        .replace(/^Thực hành tổng hợp:\s*/, "");
      if (blocklyLabs[id]) {
        const cfg = blocklyLabs[id];
        return {
          id: `lab_${id}`,
          skill: id,
          type: "blockly",
          title: `Thực hành Blockly: ${short}`,
          xp: 52,
          blockly: { ...cfg, starterXml: null }
        };
      }
      const sim = SKILL_SIMULATORS[id];
      if (sim) {
        return {
          id: `lab_${id}`,
          skill: id,
          type: sim.type,
          title: `Thực hành: ${short}`,
          xp: 46,
          simulator: sim
        };
      }
      return {
        id: `lab_${id}`,
        skill: id,
        type: "checklist",
        title: `Thực hành: ${short}`,
        xp: 46,
        steps: checklistSteps[id] || defaultLabSteps
      };
    });

const grade7Errors = [
  {
    skill: "g7_c05",
    pattern: "chui",
    errorType: "cyberbullying",
    title: "Xúc phạm hoặc bắt nạt trên mạng",
    message: "Bình luận, meme chế nhạo bạn bè gây tổn thương và vi phạm quy tắc ứng xử.",
    hint: "Dừng ngay; xin lỗi nếu cần; báo giáo viên hoặc phụ huynh.",
    recommendation: "g7_c05"
  },
  {
    skill: "g7_b04",
    pattern: "dang",
    errorType: "privacy",
    title: "Đăng thông tin riêng tư lên mạng xã hội",
    message: "Địa chỉ, số điện thoại, ảnh riêng tư có thể bị lợi dụng.",
    hint: "Chỉ chia sẻ với người tin cậy; kiểm tra cài đặt quyền riêng tư.",
    recommendation: "g7_b04"
  },
  {
    skill: "g7_d07",
    pattern: "cong thuc",
    errorType: "spreadsheet",
    title: "Công thức bảng tính sai",
    message: "Thiếu dấu = hoặc tham chiếu ô sai khiến kết quả không đúng.",
    hint: "Bắt đầu công thức bằng =; kiểm tra A1, B1… khi sao chép.",
    recommendation: "g7_d07"
  }
];

const merge = (existing, incoming, key = "id") => {
  const map = new Map(existing.map((item) => [item[key], item]));
  for (const item of incoming) map.set(item[key], item);
  return [...map.values()].sort((a, b) => {
    if (a.grade !== b.grade) return a.grade - b.grade;
    if (a.chapterIndex !== b.chapterIndex) return a.chapterIndex - b.chapterIndex;
    return (a.lessonNo || 0) - (b.lessonNo || 0);
  });
};

const mergeErrors = (existing, incoming) => {
  const key = (item) => `${item.skill}:${item.pattern}`;
  const map = new Map(existing.map((item) => [key(item), item]));
  for (const item of incoming) map.set(key(item), item);
  return [...map.values()];
};

const [skills, lessons, questions, labs, errors] = await Promise.all([
  readJson("data/skills.json"),
  readJson("data/lessons.json"),
  readJson("data/questions.json"),
  readJson("data/labs.json"),
  readJson("data/errors.json")
]);

const g7Skills = buildSkills();
const g7Lessons = buildLessons();
const g7Questions = buildQuestions();
const g7Labs = buildLabs();

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(merge(skills, g7Skills), null, 2)),
  writeFile("data/lessons.json", JSON.stringify(merge(lessons, g7Lessons), null, 2)),
  writeFile("data/questions.json", JSON.stringify(merge(questions, g7Questions), null, 2)),
  writeFile("data/labs.json", JSON.stringify(merge(labs, g7Labs), null, 2)),
  writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, grade7Errors), null, 2))
]);

const mergedSkills = merge(skills, g7Skills);
const mergedQuestions = merge(questions, g7Questions);

console.log(
  `Grade 7: +${g7Skills.length} skills, +${g7Lessons.length} lessons, +${g7Questions.length} questions, +${g7Labs.length} labs`
);
console.log(`Total: ${mergedSkills.length} skills, ${mergedQuestions.length} questions`);
