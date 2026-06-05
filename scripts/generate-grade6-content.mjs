/**
 * Nội dung Tin học lớp 6 — SGK Kết nối tri thức với cuộc sống (17 bài, 6 chủ đề)
 */
import { readFile, writeFile } from "node:fs/promises";
import { SKILL_SIMULATORS } from "../modules/inputLab/scenarios.js";

const SOURCE = "Bám sát SGK Tin học 6 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.";

const grade6 = [
  ["g6_a01", "Bài 1. Thông tin và dữ liệu", "Máy tính và cộng đồng", 1, "Phân biệt dữ liệu (sự kiện thô) và thông tin (dữ liệu có ý nghĩa).", []],
  ["g6_a02", "Bài 2. Xử lý thông tin", "Máy tính và cộng đồng", 1, "Nhận biết các bước thu thập, lưu trữ, xử lý và truyền thông tin.", ["g6_a01"]],
  ["g6_a03", "Bài 3. Thông tin trong máy tính", "Máy tính và cộng đồng", 1, "Hiểu dữ liệu số, đơn vị bit/byte và cách máy tính lưu trữ thông tin.", ["g6_a02"]],
  ["g6_b04", "Bài 4. Mạng máy tính", "Mạng máy tính và Internet", 2, "Mô tả mạng LAN/WAN, thiết bị mạng và lợi ích kết nối máy tính.", ["g6_a03"]],
  ["g6_b05", "Bài 5. Internet", "Mạng máy tính và Internet", 2, "Internet là mạng toàn cầu; trình duyệt, website và dịch vụ trực tuyến.", ["g6_b04"]],
  ["g6_c06", "Bài 6. Mạng thông tin toàn cầu", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "WWW, siêu liên kết và kho tri thức trên Internet.", ["g6_b05"]],
  ["g6_c07", "Bài 7. Tìm kiếm thông tin trên Internet", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Dùng công cụ tìm kiếm, chọn từ khóa và đánh giá độ tin cậy nguồn.", ["g6_c06"]],
  ["g6_c08", "Bài 8. Thư điện tử", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Soạn, gửi, nhận email; địa chỉ, tiêu đề và nội dung lịch sự.", ["g6_c07"]],
  ["g6_d09", "Bài 9. An toàn thông tin trên Internet", "Đạo đức, pháp luật và văn hóa trong môi trường số", 4, "Bảo vệ tài khoản, nhận biết lừa đảo và ứng xử an toàn trên mạng.", ["g6_c08"]],
  ["g6_e10", "Bài 10. Sơ đồ tư duy", "Ứng dụng tin học", 5, "Tạo sơ đồ tư duy tổ chức ý tưởng cho dự án sổ lưu niệm.", ["g6_d09"]],
  ["g6_e11", "Bài 11. Định dạng văn bản", "Ứng dụng tin học", 5, "Định dạng phông, cỡ chữ, màu và đoạn văn trong sổ lưu niệm.", ["g6_e10"]],
  ["g6_e12", "Bài 12. Trình bày thông tin ở dạng bảng", "Ứng dụng tin học", 5, "Chèn bảng, gộp ô và căn chỉnh dữ liệu trong văn bản.", ["g6_e11"]],
  ["g6_e13", "Bài 13. Thực hành: Tìm kiếm và thay thế", "Ứng dụng tin học", 5, "Dùng Tìm/Thay thế để sửa nhanh từ hoặc cụm từ trong văn bản.", ["g6_e12"]],
  ["g6_e14", "Bài 14. Thực hành tổng hợp: Hoàn thiện sổ lưu niệm", "Ứng dụng tin học", 5, "Hoàn thiện sản phẩm sổ lưu niệm: văn bản, bảng, hình ảnh theo rubric.", ["g6_e13"]],
  ["g6_f15", "Bài 15. Thuật toán", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Mô tả thuật toán bằng các bước tuần tự rõ ràng, có điểm bắt đầu và kết thúc.", ["g6_e14"]],
  ["g6_f16", "Bài 16. Các cấu trúc điều khiển", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Tuần tự, rẽ nhánh (Nếu–Thì) và lặp trong giải quyết vấn đề.", ["g6_f15"]],
  ["g6_f17", "Bài 17. Chương trình máy tính", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Chuyển thuật toán thành chương trình Blockly hoàn chỉnh.", ["g6_f16"]]
];

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const buildSkills = () =>
  grade6.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
    id,
    title,
    grade: 6,
    book: "KNTT",
    chapter,
    chapterIndex,
    lessonNo: index + 1,
    domain: chapter,
    level: chapterIndex,
    prerequisite,
    description,
    streams: chapterIndex >= 6 ? ["CS"] : chapterIndex >= 5 ? ["ICT"] : ["DL"],
    competencies: chapterIndex === 4 ? ["NLb"] : chapterIndex >= 6 ? ["NLc", "NLd"] : ["NLa", "NTh"]
  }));

const corePoints = {
  g6_a01: [
    "Dữ liệu: sự kiện, con số, hình ảnh thô chưa được giải thích.",
    "Thông tin: dữ liệu đã được xử lý, có ý nghĩa với người nhận.",
    "Ví dụ: 38°C là dữ liệu; «Hôm nay nóng 38°C» là thông tin."
  ],
  g6_a02: [
    "Thu thập → lưu trữ → xử lý → truyền → tiếp nhận.",
    "Con người và máy tính đều xử lý thông tin.",
    "Máy tính xử lý nhanh, chính xác với dữ liệu số."
  ],
  g6_a03: [
    "Máy tính lưu mọi thứ dưới dạng nhị phân (0 và 1).",
    "Bit là đơn vị nhỏ nhất; 8 bit = 1 byte.",
    "Tệp văn bản, ảnh, âm thanh đều là dữ liệu số."
  ],
  g6_b04: [
    "Mạng LAN: trong phạm vi trường, gia đình.",
    "Router/switch nối các máy tính.",
    "Chia sẻ tệp và máy in qua mạng."
  ],
  g6_b05: [
    "Internet kết nối hàng tỷ thiết bị toàn cầu.",
    "Trình duyệt truy cập website qua URL.",
    "Dịch vụ: email, học trực tuyến, tra cứu thông tin."
  ],
  g6_c06: [
    "WWW (World Wide Web) là hệ thống trang liên kết.",
    "Siêu liên kết (hyperlink) nối các trang với nhau.",
    "Thông tin trên web đa dạng — cần chọn lọc."
  ],
  g6_c07: [
    "Từ khóa ngắn, đúng chính tả.",
    "So sánh nhiều nguồn trước khi tin.",
    "Ghi nguồn khi trích dẫn cho bài tập."
  ],
  g6_c08: [
    "Email gồm: người gửi, người nhận, tiêu đề, nội dung.",
    "Tiêu đề ngắn gọn, lịch sự; không gửi file lạ.",
    "Không chia sẻ mật khẩu qua email."
  ],
  g6_d09: [
    "Mật khẩu mạnh, không tiết lộ cho bạn bè.",
    "Cảnh giác tin nhắn, link lạ (lừa đảo).",
    "Báo người lớn khi bị quấy rối trên mạng."
  ],
  g6_e10: [
    "Nhánh chính từ chủ đề trung tâm (sổ lưu niệm).",
    "Mỗi nhánh là một ý: ảnh, kỷ niệm, bạn bè…",
    "Sơ đồ giúp lên kế hoạch trước khi gõ văn bản."
  ],
  g6_e11: [
    "Tiêu đề đậm, cỡ lớn; nội dung cỡ vừa.",
    "Màu chữ tương phản nền trang.",
    "Ctrl+S lưu thường xuyên."
  ],
  g6_e12: [
    "Bảng có hàng và cột rõ ràng.",
    "Tiêu đề cột mô tả nội dung (ngày, sự kiện…).",
    "Căn giữa tiêu đề bảng; căn trái nội dung."
  ],
  g6_e13: [
    "Ctrl+F mở hộp Tìm kiếm.",
    "Thay thế đúng từ cần sửa hàng loạt.",
    "Xem trước trước khi «Thay thế tất cả»."
  ],
  g6_e14: [
    "Kiểm tra đủ phần: bìa, lời mở đầu, ảnh, bảng kỷ niệm.",
    "Trao đổi nhóm để hoàn thiện sổ lưu niệm.",
    "Lưu và nộp đúng định dạng giáo viên yêu cầu."
  ],
  g6_f15: [
    "Thuật toán: dãy bước hữu hạn, không mơ hồ.",
    "Có điểm bắt đầu và kết thúc.",
    "Viết thuật toán trước khi lập trình."
  ],
  g6_f16: [
    "Tuần tự: làm lần lượt từng bước.",
    "Rẽ nhánh: Nếu điều kiện đúng thì làm A, sai thì B.",
    "Lặp: thực hiện cùng việc nhiều lần."
  ],
  g6_f17: [
    "Chương trình là thuật toán viết cho máy tính.",
    "Ghép khối Blockly tương ứng thuật toán đã vẽ.",
    "Chạy thử và sửa cho đến khi đúng kịch bản."
  ]
};

const buildLessons = () =>
  grade6.map(([id, title, chapter, , description]) => {
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
  g6_a01: {
    q1: {
      q: "«38°C» trong dự báo thời tiết là:",
      choices: ["Dữ liệu", "Thông tin đã xử lý", "Phần mềm", "Mạng LAN"],
      a: "Dữ liệu"
    },
    q2: {
      q: "Thông tin là dữ liệu đã được xử lý và có ý nghĩa với người nhận.",
      a: "Đúng"
    }
  },
  g6_a03: {
    q1: {
      q: "Đơn vị nhỏ nhất lưu trữ trong máy tính là:",
      choices: ["Bit", "Byte", "Kilobyte", "Megabyte"],
      a: "Bit"
    }
  },
  g6_b05: {
    q1: {
      q: "Internet là:",
      choices: ["Mạng máy tính toàn cầu", "Chỉ mạng trong một lớp học", "Một phần mềm soạn thảo", "Ổ cứng máy tính"],
      a: "Mạng máy tính toàn cầu"
    }
  },
  g6_c08: {
    q1: {
      q: "Khi soạn email, em nên:",
      choices: ["Viết tiêu đề rõ ràng, lịch sự", "Gửi file lạ cho người không quen", "Chia sẻ mật khẩu qua email", "Không cần tiêu đề"],
      a: "Viết tiêu đề rõ ràng, lịch sự"
    }
  },
  g6_d09: {
    q1: {
      q: "Nhận được link lạ hứa quà miễn phí, em nên:",
      choices: ["Không nhấp, báo người lớn", "Nhấp ngay để nhận quà", "Gửi link cho bạn", "Nhập mật khẩu vào link"],
      a: "Không nhấp, báo người lớn"
    },
    q2: { q: "Mật khẩu mạnh nên được giữ bí mật và không chia sẻ.", a: "Đúng" }
  },
  g6_f16: {
    q1: {
      q: "Khối «Nếu … thì» trong lập trình thể hiện cấu trúc:",
      choices: ["Rẽ nhánh", "Tuần tự", "Lặp vô hạn", "Lưu trữ tệp"],
      a: "Rẽ nhánh"
    }
  }
};

const buildQuestions = () =>
  grade6.flatMap(([id, title, , , description]) => {
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
          choices: [description, "Dữ liệu và thông tin là một khái niệm.", "Không cần đánh giá nguồn trên Internet.", "Thuật toán không cần thứ tự các bước."],
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
          hint: "Suy nghĩ quy tắc an toàn và đạo đức số."
        }
      : {
          id: `q_${id}_2`,
          skill: id,
          type: "true_false",
          question: `Kiến thức bài «${short}» góp phần hình thành năng lực tin học lớp 6.`,
          choices: ["Đúng", "Sai"],
          answer: "Đúng",
          hint: "Môn Tin học THCS phát triển năng lực NLa–NLd theo CT 2018."
        };
    return [q1, q2];
  });

const blocklyLabs = {
  g6_f15: {
    mode: "sequence",
    mission: "Viết thuật toán tuần tự: ghép ≥ 3 lệnh dưới «Khi bấm Chạy» (Nói, Tiến…).",
    hint: "Bài 15 SGK — mỗi bước thuật toán tương ứng một lệnh.",
    rules: { minChain: 3 }
  },
  g6_f16: {
    mode: "loop",
    mission: "Cấu trúc lặp: dùng «Lặp lại» ≥ 3 lần, bên trong có ít nhất một lệnh.",
    hint: "Bài 16 — lặp là một trong các cấu trúc điều khiển.",
    rules: { minRepeatTimes: 3 }
  },
  g6_f17: {
    mode: "branch",
    mission: "Chương trình máy tính: dùng khối «Nếu … thì» với ít nhất một lệnh trong nhánh.",
    hint: "Kết hợp rẽ nhánh theo điều kiện — chạy thử trên sân khấu.",
    rules: {}
  }
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu SGK và xác định sản phẩm", hint: "Ghi ra việc cần hoàn thành." },
  { id: "s2", label: "Thực hiện trên máy theo hướng dẫn", hint: "Làm đúng thứ tự." },
  { id: "s3", label: "Kiểm tra và trình bày kết quả", hint: "So với rubric bài học." }
];

const scrapbookSteps = [
  { id: "s1", label: "Rà soát cấu trúc sổ lưu niệm theo sơ đồ tư duy", hint: "Bìa, lời mở đầu, các mục chính." },
  { id: "s2", label: "Hoàn thiện định dạng, bảng và hình ảnh", hint: "Đồng bộ phông và căn lề." },
  { id: "s3", label: "Trao đổi nhóm và chỉnh theo góp ý", hint: "Thảo luận với bạn trong tổ." },
  { id: "s4", label: "Lưu và nộp sản phẩm", hint: "Đặt tên tệp rõ ràng." }
];

const theoryOnly = new Set(["g6_a01", "g6_d09"]);

const buildLabs = () =>
  grade6
    .filter(([id]) => !theoryOnly.has(id))
    .map(([id, title]) => {
      const short = title.replace(/^Bài \d+[AB]?\.\s*/, "").replace(/^Thực hành:?\s*/, "").replace(/^Thực hành tổng hợp:\s*/, "");
      if (blocklyLabs[id]) {
        const cfg = blocklyLabs[id];
        return {
          id: `lab_${id}`,
          skill: id,
          type: "blockly",
          title: `Thực hành Blockly: ${short}`,
          xp: 50,
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
          xp: 44,
          simulator: sim
        };
      }
      return {
        id: `lab_${id}`,
        skill: id,
        type: "checklist",
        title: `Thực hành: ${short}`,
        xp: 44,
        steps: id === "g6_e14" ? scrapbookSteps : defaultLabSteps
      };
    });

const grade6Errors = [
  {
    skill: "g6_d09",
    pattern: "link",
    errorType: "phishing",
    title: "Nhấp link lạ trên Internet",
    message: "Link giả mạo có thể đánh cắp tài khoản hoặc cài phần mềm độc hại.",
    hint: "Không nhấp link lạ; kiểm tra địa chỉ và hỏi người lớn.",
    recommendation: "g6_d09"
  },
  {
    skill: "g6_c08",
    pattern: "cc",
    errorType: "email",
    title: "Gửi email không phù hợp",
    message: "Gửi email cho người lạ hoặc đính kèm file không rõ nguồn gây rủi ro.",
    hint: "Chỉ gửi cho người nhận cần thiết; không đính kèm file lạ.",
    recommendation: "g6_c08"
  },
  {
    skill: "g6_f16",
    pattern: "lap",
    errorType: "loop_logic",
    title: "Vòng lặp chưa khớp thuật toán",
    message: "Số lần lặp hoặc lệnh trong thân lặp chưa đúng với bài toán.",
    hint: "Xác định việc cần lặp bao nhiêu lần trước khi ghép khối.",
    recommendation: "g6_f16"
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

const g6Skills = buildSkills();
const g6Lessons = buildLessons();
const g6Questions = buildQuestions();
const g6Labs = buildLabs();

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(merge(skills, g6Skills), null, 2)),
  writeFile("data/lessons.json", JSON.stringify(merge(lessons, g6Lessons), null, 2)),
  writeFile("data/questions.json", JSON.stringify(merge(questions, g6Questions), null, 2)),
  writeFile("data/labs.json", JSON.stringify(merge(labs, g6Labs), null, 2)),
  writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, grade6Errors), null, 2))
]);

const mergedSkills = merge(skills, g6Skills);
const mergedQuestions = merge(questions, g6Questions);

console.log(
  `Grade 6: +${g6Skills.length} skills, +${g6Lessons.length} lessons, +${g6Questions.length} questions, +${g6Labs.length} labs`
);
console.log(`Total: ${mergedSkills.length} skills, ${mergedQuestions.length} questions`);
