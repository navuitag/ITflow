/**
 * Nội dung Tin học lớp 3 — SGK Kết nối tri thức với cuộc sống (16 bài, 6 chủ đề)
 */
import { readFile, writeFile } from "node:fs/promises";
import { buildLabForSkill } from "./lib/lab-builders.mjs";

const SOURCE = "Bám sát SGK Tin học 3 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.";

const grade3 = [
  ["g3_a01", "Bài 1. Thông tin và quyết định", "Máy tính và em", 1, "Nhận biết thông tin giúp em đưa ra quyết định đúng trong học tập và sinh hoạt.", []],
  ["g3_a02", "Bài 2. Xử lí thông tin", "Máy tính và em", 1, "Thu thập, chọn lọc và sử dụng thông tin phù hợp với mục đích.", ["g3_a01"]],
  ["g3_a03", "Bài 3. Máy tính và em", "Máy tính và em", 1, "Mô tả vai trò máy tính trong học tập, giao tiếp và sáng tạo.", ["g3_a02"]],
  ["g3_a04", "Bài 4. Làm việc với máy tính", "Máy tính và em", 1, "Khởi động, mở/thoát phần mềm và làm việc an toàn trên máy tính.", ["g3_a03"]],
  ["g3_a05", "Bài 5. Sử dụng bàn phím", "Máy tính và em", 1, "Gõ chữ, số và ký tự cơ bản bằng đúng tư thế bàn phím.", ["g3_a04"]],
  ["g3_b06", "Bài 6. Khám phá thông tin trên Internet", "Mạng máy tính và Internet", 2, "Tìm kiếm thông tin trên Internet có người lớn hướng dẫn.", ["g3_a05"]],
  ["g3_c07", "Bài 7. Sắp xếp để dễ tìm", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Đặt tên tệp và thư mục có nghĩa để dễ tìm lại.", ["g3_b06"]],
  ["g3_c08", "Bài 8. Sơ đồ hình cây", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Nhận biết cấu trúc cây thư mục trên máy tính.", ["g3_c07"]],
  ["g3_c09", "Bài 9. Thực hành với tệp và thư mục", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Tạo, đổi tên, di chuyển tệp và thư mục theo hướng dẫn.", ["g3_c08"]],
  ["g3_d10", "Bài 10. Bảo vệ thông tin khi dùng máy tính", "Đạo đức, pháp luật và văn hoá trong môi trường số", 4, "Bảo vệ mật khẩu và thông tin cá nhân khi dùng máy tính.", ["g3_c09"]],
  ["g3_e11", "Bài 11. Bài trình chiếu của em", "Tin học ứng dụng", 5, "Tạo slide đơn giản: tiêu đề, nội dung và hình ảnh.", ["g3_d10"]],
  ["g3_e12", "Bài 12. Tìm hiểu về thế giới tự nhiên", "Tin học ứng dụng", 5, "Dùng phần mềm/website để khám phá chủ đề tự nhiên.", ["g3_e11"]],
  ["g3_e13", "Bài 13. Luyện tập sử dụng chuột", "Tin học ứng dụng", 5, "Ôn nháy, nháy đúp, kéo thả chuột chính xác.", ["g3_e12"]],
  ["g3_f14", "Bài 14. Em thực hiện công việc như thế nào", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Mô tả các bước công việc theo thứ tự (thuật toán tuần tự).", ["g3_e13"]],
  ["g3_f15", "Bài 15. Công việc theo điều kiện", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Nhận biết việc làm khác nhau khi điều kiện thay đổi (rẽ nhánh).", ["g3_f14"]],
  ["g3_f16", "Bài 16. Công việc của em và sự trợ giúp của máy tính", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Lập kế hoạch công việc và dùng máy tính hỗ trợ (trình chiếu, tìm kiếm).", ["g3_f15"]]
];

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const buildSkills = () =>
  grade3.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
    id,
    title,
    grade: 3,
    book: "KNTT",
    chapter,
    chapterIndex,
    lessonNo: index + 1,
    domain: chapter,
    level: chapterIndex,
    prerequisite,
    description,
    streams: chapterIndex >= 6 ? ["CS"] : chapterIndex >= 5 ? ["ICT"] : ["DL"],
    competencies: chapterIndex === 4 ? ["NLb"] : chapterIndex >= 6 ? ["NLc"] : ["NLa"]
  }));

const corePoints = {
  g3_a01: [
    "Thông tin là dữ liệu có ý nghĩa (chữ, số, hình, âm thanh).",
    "Thông tin đúng giúp em chọn lựa tốt hơn.",
    "Hỏi người lớn khi chưa chắc thông tin."
  ],
  g3_a02: [
    "Thu thập → chọn lọc → sử dụng là ba bước xử lí thông tin.",
    "Không dùng thông tin chưa kiểm chứng.",
    "Ghi chú nguồn khi tìm được điều hay."
  ],
  g3_a03: [
    "Máy tính giúp học, chơi, sáng tạo và trao đổi.",
    "Dùng máy tính có trách nhiệm và đúng giờ.",
    "Nghỉ mắt sau khi dùng máy lâu."
  ],
  g3_a04: [
    "Bật/tắt máy đúng quy trình.",
    "Mở phần mềm bằng biểu tượng; thoát trước khi tắt máy.",
    "Không tự ý cài phần mềm lạ."
  ],
  g3_a05: [
    "Hàng cơ sở: đặt ngón trỏ lên F và J.",
    "Gõ từng phím, nhìn màn hình.",
    "Phím Space dùng để cách từ."
  ],
  g3_b06: [
    "Internet là mạng kết nối máy tính trên thế giới.",
    "Tìm kiếm bằng từ khóa ngắn, rõ nghĩa.",
    "Chỉ vào website giáo viên/phụ huynh cho phép."
  ],
  g3_c07: [
    "Đặt tên tệp: môn_chủđề_ví dụ (tin_bai1_anh).",
    "Không dùng ký tự lạ trong tên tệp.",
    "Sắp xếp theo môn học hoặc dự án."
  ],
  g3_c08: [
    "Thư mục gốc chứa nhiều thư mục con (cây thư mục).",
    "Đường dẫn cho biết vị trí tệp trong cây.",
    "Desktop không phải nơi lưu tất cả tệp."
  ],
  g3_c09: [
    "Tạo thư mục mới trước khi lưu nhiều bài.",
    "Đổi tên tệp khi tên chưa rõ nghĩa.",
    "Không xóa tệp người khác trên máy trường."
  ],
  g3_d10: [
    "Không chia sẻ mật khẩu, địa chỉ, số điện thoại.",
    "Đăng xuất khi rời máy dùng chung.",
    "Báo người lớn khi thấy nội dung lạ."
  ],
  g3_e11: [
    "Mỗi slide: tiêu đề ngắn + 2–3 ý.",
    "Chữ to, dễ đọc; hình minh họa rõ.",
    "Luyện trình bày trước lớp."
  ],
  g3_e12: [
    "Dùng ảnh/video để học thiên nhiên.",
    "Ghi lại 3 điều mới học được.",
    "Trích nguồn ảnh khi dùng trong bài."
  ],
  g3_e13: [
    "Nháy trái: chọn; nháy đúp: mở.",
    "Kéo thả để di chuyển đối tượng.",
    "Làm chậm và chính xác."
  ],
  g3_f14: [
    "Công việc gồm các bước làm lần lượt.",
    "Thiếu một bước có thể sai kết quả.",
    "Viết kịch bản trước khi làm trên máy."
  ],
  g3_f15: [
    "«Nếu… thì…» mô tả việc làm theo điều kiện.",
    "Ví dụ: nếu trời mưa thì mang áo mưa.",
    "Máy tính cũng chọn nhánh theo điều kiện."
  ],
  g3_f16: [
    "Kể công việc em làm và máy tính hỗ trợ phần nào.",
    "Có thể: tìm ảnh, gõ chữ, làm slide.",
    "Ôn tuần tự và điều kiện qua Blockly."
  ]
};

const buildLessons = () =>
  grade3.map(([id, title, chapter, , description]) => {
    const points = corePoints[id] || [description, "Thực hành theo SGK tại phòng máy.", "Hỏi giáo viên khi chưa hiểu."];
    return {
      id,
      title,
      skill: id,
      chapter,
      source: SOURCE,
      xp: 48,
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
  g3_a01: {
    q1: {
      q: "Thông tin giúp em điều gì?",
      choices: ["Đưa ra quyết định tốt hơn", "Không cần suy nghĩ", "Chỉ để chơi", "Thay thế học bài"],
      a: "Đưa ra quyết định tốt hơn"
    }
  },
  g3_a03: {
    q1: {
      q: "Máy tính có thể giúp em:",
      choices: ["Học tập và sáng tạo", "Chỉ xem phim", "Không giao tiếp", "Không lưu bài"],
      a: "Học tập và sáng tạo"
    }
  },
  g3_c08: {
    q1: {
      q: "Cây thư mục trên máy tính giống:",
      choices: ["Cây có thư mục cha và con", "Một tệp duy nhất", "Màn hình Desktop", "Bàn phím"],
      a: "Cây có thư mục cha và con"
    }
  },
  g3_d10: {
    q1: {
      q: "Khi dùng máy chung, em nên:",
      choices: ["Đăng xuất tài khoản", "Để mật khẩu trên màn hình", "Chia sẻ mật khẩu bạn", "Mở link lạ"],
      a: "Đăng xuất tài khoản"
    },
    q2: { q: "Không chia sẻ mật khẩu với bạn bè là thói quen đúng.", a: "Đúng" }
  },
  g3_f15: {
    q1: {
      q: "«Nếu trời mưa thì mang áo mưa» thuộc loại:",
      choices: ["Công việc theo điều kiện", "Lặp vô hạn", "Không có thứ tự", "Chỉ gõ phím"],
      a: "Công việc theo điều kiện"
    }
  }
};

const buildQuestions = () =>
  grade3.flatMap(([id, title, , , description]) => {
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
          choices: [description, "Máy tính không liên quan đến học tập.", "Không cần bảo vệ thông tin cá nhân.", "Thuật toán không cần thứ tự bước."],
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
          hint: "Suy nghĩ tình huống an toàn số."
        }
      : {
          id: `q_${id}_2`,
          skill: id,
          type: "true_false",
          question: `Kiến thức bài «${short}» góp phần hình thành năng lực tin học lớp 3.`,
          choices: ["Đúng", "Sai"],
          answer: "Đúng",
          hint: "Môn Tin học phát triển năng lực NLa–NLc theo CT 2018."
        };
    return [q1, q2];
  });

const blocklyLabs = {
  g3_f14: {
    mode: "sequence",
    mission: "Ghép ít nhất 2 lệnh tuần tự (Nói, Tiến…) dưới «Khi bấm Chạy».",
    hint: "Công việc làm lần lượt từng bước — giống thuật toán tuần tự SGK.",
    rules: { minChain: 2 }
  },
  g3_f15: {
    mode: "branch",
    mission: "Dùng khối «Nếu … thì» với điều kiện và ít nhất một lệnh trong nhánh.",
    hint: "Ví dụ: nếu điểm > 5 thì Nói «Đạt».",
    rules: {}
  },
  g3_f16: {
    mode: "branch",
    mission: "Từ kịch bản công việc: dùng «Nếu … thì» + ít nhất 2 lệnh (Nói/Tiến), rồi chạy thử.",
    hint: "Máy tính giúp em: chọn việc làm phù hợp điều kiện.",
    rules: { minBlocks: 4 }
  }
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu SGK và xác định sản phẩm", hint: "Ghi ra việc cần hoàn thành." },
  { id: "s2", label: "Thực hiện trên máy theo hướng dẫn", hint: "Làm đúng thứ tự." },
  { id: "s3", label: "Kiểm tra và trình bày kết quả", hint: "So với rubric bài học." }
];

const theoryOnly = new Set(["g3_a01", "g3_a02", "g3_a03", "g3_d10"]);

const buildLabs = () =>
  grade3
    .filter(([id]) => !theoryOnly.has(id))
    .map(([id, title]) =>
      buildLabForSkill(id, title, {
        blocklyLabs,
        xp: 45,
        simXp: 40,
        checklistXp: 40
      })
    );

const grade3Errors = [
  {
    skill: "g3_c07",
    pattern: "bai",
    errorType: "file_naming",
    title: "Đặt tên tệp không rõ nghĩa",
    message: "Tên như «bai1.doc» khó tìm khi có nhiều môn học.",
    hint: "Dùng tên có môn + chủ đề, ví dụ: tin_bai7_thumuc.",
    recommendation: "g3_c07"
  },
  {
    skill: "g3_d10",
    pattern: "mat khau",
    errorType: "privacy",
    title: "Lộ mật khẩu hoặc thông tin riêng",
    message: "Chia sẻ mật khẩu khiến tài khoản dễ bị xâm nhập.",
    hint: "Giữ mật khẩu bí mật; đăng xuất sau khi dùng máy chung.",
    recommendation: "g3_d10"
  },
  {
    skill: "g3_f14",
    pattern: "buoc",
    errorType: "algorithm",
    title: "Thiếu bước trong thuật toán",
    message: "Bỏ qua bước khiến công việc không hoàn thành đúng.",
    hint: "Liệt kê đủ bước tuần tự trước khi ghép khối Blockly.",
    recommendation: "g3_f14"
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

const g3Skills = buildSkills();
const g3Lessons = buildLessons();
const g3Questions = buildQuestions();
const g3Labs = buildLabs();

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(merge(skills, g3Skills), null, 2)),
  writeFile("data/lessons.json", JSON.stringify(merge(lessons, g3Lessons), null, 2)),
  writeFile("data/questions.json", JSON.stringify(merge(questions, g3Questions), null, 2)),
  writeFile("data/labs.json", JSON.stringify(merge(labs, g3Labs), null, 2)),
  writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, grade3Errors), null, 2))
]);

const mergedSkills = merge(skills, g3Skills);
const mergedQuestions = merge(questions, g3Questions);

console.log(
  `Grade 3: +${g3Skills.length} skills, +${g3Lessons.length} lessons, +${g3Questions.length} questions, +${g3Labs.length} labs`
);
console.log(`Total: ${mergedSkills.length} skills, ${mergedQuestions.length} questions`);
