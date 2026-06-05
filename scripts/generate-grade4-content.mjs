/**
 * Nội dung Tin học lớp 4 — SGK Kết nối tri thức với cuộc sống (16 bài + 12A/12B)
 */
import { readFile, writeFile } from "node:fs/promises";
import { SKILL_SIMULATORS } from "../modules/inputLab/scenarios.js";

const SOURCE = "Bám sát SGK Tin học 4 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.";

const grade4 = [
  ["g4_a01", "Bài 1. Phần cứng và phần mềm máy tính", "Máy tính và em", 1, "Phân biệt phần cứng (thiết bị) và phần mềm (chương trình) trên máy tính.", []],
  ["g4_a02", "Bài 2. Gõ bàn phím đúng cách", "Máy tính và em", 1, "Gõ bàn phím bằng 10 ngón, đúng tư thế và nhịp độ.", ["g4_a01"]],
  ["g4_b03", "Bài 3. Thông tin trên trang web", "Mạng máy tính và Internet", 2, "Nhận biết tiêu đề, liên kết và nội dung chính trên trang web.", ["g4_a02"]],
  ["g4_c04", "Bài 4. Tìm kiếm và trao đổi thông tin", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Tìm kiếm, chọn lọc và chia sẻ thông tin phù hợp trên mạng.", ["g4_b03"]],
  ["g4_c05", "Bài 5. Thao tác với tệp và thư mục", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Tạo, đổi tên, sao chép và sắp xếp tệp trong cây thư mục.", ["g4_c04"]],
  ["g4_d06", "Bài 6. Sử dụng phần mềm khi được phép", "Đạo đức, pháp luật và văn hoá trong môi trường số", 4, "Chỉ dùng phần mềm và nội dung số khi được phép; tôn trọng bản quyền.", ["g4_c05"]],
  ["g4_e07", "Bài 7. Tạo bài trình chiếu", "Ứng dụng tin học", 5, "Tạo slide mới: tiêu đề, nội dung và hình ảnh minh họa.", ["g4_d06"]],
  ["g4_e08", "Bài 8. Định dạng văn bản trên trang chiếu", "Ứng dụng tin học", 5, "Đổi phông chữ, cỡ chữ, màu và căn lề trên slide.", ["g4_e07"]],
  ["g4_e09", "Bài 9. Hiệu ứng chuyển trang", "Ứng dụng tin học", 5, "Thêm hiệu ứng chuyển slide và trình chiếu có kiểm soát.", ["g4_e08"]],
  ["g4_e10", "Bài 10. Phần mềm soạn thảo văn bản", "Ứng dụng tin học", 5, "Làm quen giao diện trình soạn thảo văn bản (Word/Wordpad).", ["g4_e09"]],
  ["g4_e11", "Bài 11. Chỉnh sửa văn bản", "Ứng dụng tin học", 5, "Gõ, sửa, định dạng và lưu văn bản có cấu trúc.", ["g4_e10"]],
  ["g4_e12a", "Bài 12A. Thực hành đa phương tiện", "Ứng dụng tin học", 5, "Kết hợp chữ, hình ảnh và âm thanh trong sản phẩm số.", ["g4_e11"]],
  ["g4_e12b", "Bài 12B. Phần mềm luyện gõ bàn phím", "Ứng dụng tin học", 5, "Luyện gõ 10 ngón bằng phần mềm luyện tập bàn phím.", ["g4_e12a"]],
  ["g4_f13", "Bài 13. Chơi với máy tính", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Làm quen trò chơi giáo dục và môi trường lập trình trực quan.", ["g4_e12b"]],
  ["g4_f14", "Bài 14. Khám phá môi trường lập trình trực quan", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Ghép khối lệnh tuần tự trong môi trường lập trình Blockly.", ["g4_f13"]],
  ["g4_f15", "Bài 15. Tạo chương trình máy tính để diễn tả ý tưởng", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Dùng cấu trúc lặp để diễn tả ý tưởng bằng chương trình.", ["g4_f14"]],
  ["g4_f16", "Bài 16. Chương trình của em", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Hoàn thiện chương trình tổng hợp (tuần tự + lặp) theo kịch bản em tự chọn.", ["g4_f15"]]
];

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const buildSkills = () =>
  grade4.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
    id,
    title,
    grade: 4,
    book: "KNTT",
    chapter,
    chapterIndex,
    lessonNo: index + 1,
    domain: chapter,
    level: chapterIndex,
    prerequisite,
    description,
    streams: chapterIndex >= 6 ? ["CS"] : chapterIndex >= 5 ? ["ICT"] : ["DL"],
    competencies: chapterIndex === 4 ? ["NLb"] : chapterIndex >= 6 ? ["NLc"] : ["NLa", "NTh"]
  }));

const corePoints = {
  g4_a01: [
    "Phần cứng: CPU, RAM, ổ cứng, màn hình, chuột, bàn phím…",
    "Phần mềm: hệ điều hành, ứng dụng học tập, trò chơi.",
    "Không thể chạy phần mềm nếu thiếu phần cứng phù hợp."
  ],
  g4_a02: [
    "Ngón tay trên F và J; gõ bằng đầu ngón.",
    "Nhìn màn hình, không nhìn xuống bàn phím.",
    "Gõ chậm đúng trước, nhanh sau."
  ],
  g4_b03: [
    "Trang web có tiêu đề, địa chỉ (URL) và nội dung.",
    "Liên kết (hyperlink) dẫn sang trang khác.",
    "Không nhấp liên kết lạ khi chưa có người lớn."
  ],
  g4_c04: [
    "Từ khóa ngắn, đúng chính tả khi tìm kiếm.",
    "Chia sẻ thông tin qua email hoặc tin nhắn có trách nhiệm.",
    "Ghi nguồn khi trích dẫn."
  ],
  g4_c05: [
    "Thư mục cha chứa thư mục con và tệp.",
    "Sao chép giữ bản gốc; di chuyển thì bản gốc đổi chỗ.",
    "Đặt tên tệp không dấu cách lạ hoặc ký tự đặc biệt."
  ],
  g4_d06: [
    "Chỉ cài/dùng phần mềm khi phụ huynh hoặc trường cho phép.",
    "Không sao chép phim, nhạc, game trái phép.",
    "Xin phép trước khi dùng ảnh, video của người khác."
  ],
  g4_e07: [
    "Slide 1: tiêu đề + tên em; các slide: nội dung chính.",
    "Một slide không quá nhiều chữ.",
    "Lưu bài trình chiếu đúng thư mục."
  ],
  g4_e08: [
    "Tiêu đề to, nội dung nhỏ hơn.",
    "Màu chữ tương phản với nền.",
    "Căn giữa tiêu đề; căn trái đoạn văn."
  ],
  g4_e09: [
    "Hiệu ứng chuyển giúp slide mượt hơn.",
    "Không lạm dụng hiệu ứng gây rối.",
    "F5 hoặc Trình chiếu để xem thử."
  ],
  g4_e10: [
    "Vùng soạn thảo là nơi gõ văn bản.",
    "Thanh công cụ: đậm, nghiêng, gạch chân, căn lề.",
    "Lưu thường xuyên (Ctrl+S)."
  ],
  g4_e11: [
    "Bôi đen chữ rồi đổi định dạng.",
    "Copy/paste đoạn văn đúng chỗ.",
    "Kiểm tra chính tả trước khi nộp."
  ],
  g4_e12a: [
    "Chèn ảnh và âm thanh phù hợp nội dung.",
    "Âm lượng vừa phải khi trình chiếu.",
    "Tôn trọng bản quyền ảnh, nhạc."
  ],
  g4_e12b: [
    "Phần mềm luyện gõ có bài theo hàng phím.",
    "Theo dõi WPM (số từ/phút) nếu có.",
    "Luyện mỗi ngày vài phút."
  ],
  g4_f13: [
    "Trò chơi giáo dục rèn tư duy và thao tác.",
    "Chơi có giới hạn thời gian.",
    "Chuẩn bị tinh thần học lập trình trực quan."
  ],
  g4_f14: [
    "Khối lệnh chạy từ trên xuống.",
    "«Khi bấm Chạy» là điểm bắt đầu.",
    "Thử «Chạy thử» sau mỗi lần ghép khối."
  ],
  g4_f15: [
    "Lặp giúp máy tính làm việc nhiều lần.",
    "Đặt số lần lặp phù hợp bài toán.",
    "Có lệnh bên trong thân vòng lặp."
  ],
  g4_f16: [
    "Kịch bản: mô tả việc em muốn máy tính làm.",
    "Kết hợp tuần tự và lặp trong một chương trình.",
    "Trình bày chương trình cho bạn và giáo viên."
  ]
};

const buildLessons = () =>
  grade4.map(([id, title, chapter, , description]) => {
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
  g4_a01: {
    q1: {
      q: "Windows, Word thuộc loại nào?",
      choices: ["Phần mềm", "Phần cứng", "Màn hình", "Cáp mạng"],
      a: "Phần mềm"
    }
  },
  g4_a02: {
    q1: {
      q: "Gõ bàn phím đúng cách là:",
      choices: ["Đặt tay trên hàng cơ sở, nhìn màn hình", "Nhìn xuống phím và gõ nhanh", "Dùng một ngón", "Không cần tư thế"],
      a: "Đặt tay trên hàng cơ sở, nhìn màn hình"
    }
  },
  g4_c05: {
    q1: {
      q: "Cây thư mục giúp em:",
      choices: ["Sắp xếp tệp dễ tìm", "Tăng tốc Internet", "In ấn tự động", "Gõ bàn phím nhanh"],
      a: "Sắp xếp tệp dễ tìm"
    }
  },
  g4_d06: {
    q1: {
      q: "Dùng phần mềm lậu (crack) là:",
      choices: ["Vi phạm bản quyền", "Luôn được phép", "An toàn tuyệt đối", "Khuyến khích ở trường"],
      a: "Vi phạm bản quyền"
    },
    q2: { q: "Em chỉ dùng phần mềm khi được phụ huynh hoặc nhà trường cho phép.", a: "Đúng" }
  },
  g4_f15: {
    q1: {
      q: "Cấu trúc lặp trong lập trình dùng để:",
      choices: ["Thực hiện việc nhiều lần", "Tắt máy tính", "Gõ văn bản", "In tài liệu"],
      a: "Thực hiện việc nhiều lần"
    }
  }
};

const buildQuestions = () =>
  grade4.flatMap(([id, title, , , description]) => {
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
          choices: [description, "Không cần tôn trọng bản quyền số.", "Tệp và thư mục là một khái niệm.", "Lập trình không cần thứ tự lệnh."],
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
          hint: "Suy nghĩ quy tắc đạo đức số."
        }
      : {
          id: `q_${id}_2`,
          skill: id,
          type: "true_false",
          question: `Kiến thức bài «${short}» góp phần hình thành năng lực tin học lớp 4.`,
          choices: ["Đúng", "Sai"],
          answer: "Đúng",
          hint: "Môn Tin học phát triển năng lực NLa–NLc theo CT 2018."
        };
    return [q1, q2];
  });

const blocklyLabs = {
  g4_f14: {
    mode: "sequence",
    mission: "Khám phá Blockly: ghép ≥ 2 lệnh tuần tự (Nói, Tiến…) dưới «Khi bấm Chạy».",
    hint: "Bài 14 SGK — làm quen môi trường lập trình trực quan.",
    rules: { minChain: 2 }
  },
  g4_f15: {
    mode: "loop",
    mission: "Dùng khối «Lặp lại» ≥ 3 lần, bên trong có ít nhất một lệnh.",
    hint: "Diễn tả ý tưởng bằng cấu trúc lặp.",
    rules: { minRepeatTimes: 3 }
  },
  g4_f16: {
    mode: "loop_practice",
    mission: "Chương trình của em: lặp ≥ 4 lần + chạy thử trên sân khấu.",
    hint: "Kết hợp tuần tự và lặp theo kịch bản tự chọn.",
    rules: { minRepeatTimes: 4 }
  }
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu SGK và xác định sản phẩm", hint: "Ghi ra việc cần hoàn thành." },
  { id: "s2", label: "Thực hiện trên máy theo hướng dẫn", hint: "Làm đúng thứ tự." },
  { id: "s3", label: "Kiểm tra và trình bày kết quả", hint: "So với rubric bài học." }
];

const theoryOnly = new Set(["g4_a01", "g4_d06"]);

const buildLabs = () =>
  grade4
    .filter(([id]) => !theoryOnly.has(id))
    .map(([id, title]) => {
      const short = title.replace(/^Bài \d+[AB]?\.\s*/, "");
      if (blocklyLabs[id]) {
        const cfg = blocklyLabs[id];
        return {
          id: `lab_${id}`,
          skill: id,
          type: "blockly",
          title: `Thực hành Blockly: ${short}`,
          xp: 48,
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
          xp: 42,
          simulator: sim
        };
      }
      return {
        id: `lab_${id}`,
        skill: id,
        type: "checklist",
        title: `Thực hành: ${short}`,
        xp: 42,
        steps: defaultLabSteps
      };
    });

const grade4Errors = [
  {
    skill: "g4_d06",
    pattern: "crack",
    errorType: "copyright",
    title: "Dùng phần mềm không bản quyền",
    message: "Cài phần mềm lậu vi phạm pháp luật và có thể chứa virus.",
    hint: "Chỉ dùng phần mềm được cấp phép hoặc miễn phí hợp pháp.",
    recommendation: "g4_d06"
  },
  {
    skill: "g4_c05",
    pattern: "xoa",
    errorType: "file_ops",
    title: "Xóa nhầm tệp quan trọng",
    message: "Xóa tệp không qua Thùng rác sẽ khó khôi phục.",
    hint: "Kiểm tra tên tệp trước khi xóa; sao lưu bài quan trọng.",
    recommendation: "g4_c05"
  },
  {
    skill: "g4_f15",
    pattern: "lap",
    errorType: "loop_logic",
    title: "Vòng lặp chưa đúng",
    message: "Số lần lặp hoặc lệnh trong thân lặp chưa khớp kịch bản.",
    hint: "Xác định việc cần lặp bao nhiêu lần trước khi ghép khối.",
    recommendation: "g4_f15"
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

const g4Skills = buildSkills();
const g4Lessons = buildLessons();
const g4Questions = buildQuestions();
const g4Labs = buildLabs();

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(merge(skills, g4Skills), null, 2)),
  writeFile("data/lessons.json", JSON.stringify(merge(lessons, g4Lessons), null, 2)),
  writeFile("data/questions.json", JSON.stringify(merge(questions, g4Questions), null, 2)),
  writeFile("data/labs.json", JSON.stringify(merge(labs, g4Labs), null, 2)),
  writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, grade4Errors), null, 2))
]);

const mergedSkills = merge(skills, g4Skills);
const mergedQuestions = merge(questions, g4Questions);

console.log(
  `Grade 4: +${g4Skills.length} skills, +${g4Lessons.length} lessons, +${g4Questions.length} questions, +${g4Labs.length} labs`
);
console.log(`Total: ${mergedSkills.length} skills, ${mergedQuestions.length} questions`);
