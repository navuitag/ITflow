/**
 * Nội dung Tin học lớp 2 — bám SGK Hướng dẫn học Tin học lớp 2 (NXBGD)
 * và phân phối chương trình TH (8 chủ đề mở rộng 16 bài học).
 */
import { readFile, writeFile } from "node:fs/promises";
import { SKILL_SIMULATORS } from "../modules/inputLab/scenarios.js";

const SOURCE =
  "Bám sát SGK Hướng dẫn học Tin học lớp 2 (NXBGD) và phân phối chương trình môn Tin học TH; nội dung tự biên soạn cho ITFlow.";

const grade2 = [
  ["g2_a01", "Bài 1. Những gì em đã biết", "Ôn tập và thao tác cơ bản", 1, "Ôn bộ phận máy tính, tư thế ngồi, đặt tay chuột và bàn phím đã học lớp 1.", []],
  ["g2_a02", "Bài 2. Luyện tập chuột với Mouse Trainer", "Ôn tập và thao tác cơ bản", 1, "Rèn nháy, nháy đúp và kéo thả chuột qua phần mềm Mouse Trainer.", ["g2_a01"]],
  ["g2_a03", "Bài 3. Bắt đầu làm việc với máy tính", "Ôn tập và thao tác cơ bản", 1, "Mở và thoát phần mềm đúng cách; nhận biết biểu tượng trên màn hình.", ["g2_a02"]],
  ["g2_b04", "Bài 4. Em tập làm họa sĩ (Leah's Farm Paint)", "Em tập làm họa sĩ", 2, "Làm quen công cụ vẽ và tô màu trong phần mềm Leah's Farm Paint & Play.", ["g2_a03"]],
  ["g2_b05", "Bài 5. Em tập làm họa sĩ (tiếp theo)", "Em tập làm họa sĩ", 2, "Thực hành vẽ, tô màu và lưu bức tranh theo mẫu.", ["g2_b04"]],
  ["g2_b14", "Bài 14. Paint — vẽ hình khối", "Em tập làm họa sĩ", 2, "Dùng công cụ hình khối, đường thẳng và đường cong trong Paint.", ["g2_b05"]],
  ["g2_b15", "Bài 15. Paint — tô màu và chèn chữ", "Em tập làm họa sĩ", 2, "Tô màu nền, viền và thêm chữ vào bức vẽ.", ["g2_b14"]],
  ["g2_c06", "Bài 6. Luyện gõ bàn phím (Rapid Typing)", "Bàn phím và trò chơi học tập", 3, "Gõ các phím hàng cơ sở bằng đúng vị trí ngón tay.", ["g2_b15"]],
  ["g2_c07", "Bài 7. Luyện gõ bàn phím (tiếp theo)", "Bàn phím và trò chơi học tập", 3, "Gõ hàng trên, hàng số và gõ chậm nhưng đúng.", ["g2_c06"]],
  ["g2_c08", "Bài 8. Chơi trò chơi chữ cái", "Bàn phím và trò chơi học tập", 3, "Làm quen chữ cái qua trò chơi giáo dục trên máy tính.", ["g2_c07"]],
  ["g2_c13", "Bài 13. Học tiếng Anh với Fast Hands", "Bàn phím và trò chơi học tập", 3, "Luyện phản xạ bàn phím qua trò chơi từ vựng tiếng Anh.", ["g2_c08"]],
  ["g2_d09", "Bài 9. Thông tin xung quanh em", "Thông tin và học trên mạng", 4, "Nhận biết thông tin hữu ích trên Internet và quy tắc an toàn khi tìm kiếm.", ["g2_c13"]],
  ["g2_d10", "Bài 10. Nhà bác học nhí", "Thông tin và học trên mạng", 4, "Dùng website Nhà bác học nhí để tìm kiếm và khám phá kiến thức.", ["g2_d09"]],
  ["g2_d11", "Bài 11. Nhà toán học nhí", "Thông tin và học trên mạng", 4, "Chơi trò chơi toán trực tuyến, rèn tư duy qua website học tập.", ["g2_d10"]],
  ["g2_d12", "Bài 12. Trò chơi GCompris", "Thông tin và học trên mạng", 4, "Khám phá bộ trò chơi GCompris: toán, chữ cái và logic.", ["g2_d11"]],
  ["g2_d16", "Bài 16. Ôn tập cuối học kỳ", "Thông tin và học trên mạng", 4, "Ôn chuột, bàn phím, vẽ và ứng dụng học tập qua bài tập tổng hợp.", ["g2_d12"]]
];

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const buildSkills = () =>
  grade2.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
    id,
    title,
    grade: 2,
    book: "Hướng dẫn học Tin học 2",
    chapter,
    chapterIndex,
    lessonNo: index + 1,
    domain: chapter,
    level: chapterIndex,
    prerequisite,
    description,
    streams: ["DL"],
    competencies: ["NLa", "NTh"]
  }));

const corePoints = {
  g2_a01: [
    "Máy tính có bốn bộ phận chính: thân máy, màn hình, chuột, bàn phím.",
    "Ngồi thẳng lưng, mắt cách màn hình khoảng một gang tay.",
    "Đặt tay lên chuột và hàng cơ sở bàn phím như đã học lớp 1."
  ],
  g2_a02: [
    "Mouse Trainer giúp luyện nháy trái, nháy đúp và kéo thả.",
    "Mở phần mềm bằng nháy đúp vào biểu tượng trên màn hình.",
    "Thoát bằng nút X hoặc lệnh thoát — không tắt máy đột ngột."
  ],
  g2_a03: [
    "Biểu tượng (icon) là hình nhỏ đại diện cho chương trình.",
    "Nháy đúp mở phần mềm; nháy một lần chọn đối tượng.",
    "Đóng chương trình trước khi tắt máy."
  ],
  g2_b04: [
    "Leah's Farm Paint có công cụ bút, tô màu và hình mẫu.",
    "Chọn màu trước khi vẽ hoặc tô.",
    "Làm chậm và kiên nhẫn khi tô trong vùng hình."
  ],
  g2_b05: [
    "Hoàn thành bức tranh theo mẫu giáo viên giao.",
    "Lưu bài bằng lệnh Save hoặc theo hướng dẫn phần mềm.",
    "Không xóa bài của bạn khác trên máy trường."
  ],
  g2_b14: [
    "Công cụ hình chữ nhật, elip và đường thẳng giúp vẽ nhanh.",
    "Chọn màu viền và màu tô trước khi vẽ hình.",
    "Giữ Shift khi vẽ để có hình vuông hoặc hình tròn đều."
  ],
  g2_b15: [
    "Công cụ chữ (Text) cho phép gõ tiêu đề vào tranh.",
    "Tô màu nền và viền khác nhau để tranh sinh động.",
    "Kiểm tra chính tả trước khi hoàn thành."
  ],
  g2_c06: [
    "Hàng cơ sở: đặt ngón trỏ trái trên F, phải trên J.",
    "Gõ từng phím, đưa tay về hàng cơ sở sau mỗi lần gõ.",
    "Rapid Typing có bài luyện theo từng hàng phím."
  ],
  g2_c07: [
    "Thêm hàng trên và hàng số khi đã quen hàng cơ sở.",
    "Gõ chậm nhưng đúng quan trọng hơn gõ nhanh sai.",
    "Nghỉ tay khi mỏi, không đè nhiều phím cùng lúc."
  ],
  g2_c08: [
    "Trò chơi chữ cái giúp nhớ thứ tự và hình dạng chữ.",
    "Vừa học vừa chơi — tập trung vào màn hình.",
    "Báo giáo viên khi gặp nội dung lạ trên mạng."
  ],
  g2_c13: [
    "Fast Hands luyện gõ từ tiếng Anh quen thuộc.",
    "Đọc từ trên màn hình rồi gõ đúng từng chữ.",
    "Học thêm từ mới mỗi tuần qua trò chơi."
  ],
  g2_d09: [
    "Internet có nhiều thông tin — cần người lớn hướng dẫn khi tìm kiếm.",
    "Không chia sẻ họ tên, địa chỉ, mật khẩu trên mạng.",
    "Chỉ vào website giáo viên hoặc phụ huynh cho phép."
  ],
  g2_d10: [
    "Nhà bác học nhí giúp khám phá khoa học qua hình ảnh và video.",
    "Dùng ô tìm kiếm gõ từ khóa rồi nhấn Enter hoặc kính lúp.",
    "Thoát website bằng nút X khi học xong."
  ],
  g2_d11: [
    "Nhà toán học nhí có trò chơi đếm, cộng trừ vui nhộn.",
    "Nhấn PLAY để bắt đầu; mũi tên quay lại trang trước.",
    "Cố gắng trả lời đúng để ghi điểm cao."
  ],
  g2_d12: [
    "GCompris gồm nhiều trò chơi: toán, chữ, logic.",
    "Chọn mục phù hợp lớp 2 theo hướng dẫn giáo viên.",
    "Chơi có giới hạn thời gian, không bỏ bài học khác."
  ],
  g2_d16: [
    "Ôn: chuột (nháy, kéo thả), bàn phím hàng cơ sở, vẽ và tô màu.",
    "Ôn: mở/thoát phần mềm và tìm kiếm an toàn trên web.",
    "Tự đánh giá phần nào cần luyện thêm ở nhà."
  ]
};

const buildLessons = () =>
  grade2.map(([id, title, chapter, , description]) => {
    const points = corePoints[id] || [description, "Thực hành cùng giáo viên tại phòng máy.", "Hỏi ngay khi chưa hiểu thao tác."];
    return {
      id,
      title,
      skill: id,
      chapter,
      source: SOURCE,
      xp: 45,
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
  g2_a01: {
    q1: {
      q: "Bộ phận nào dùng để hiển thị hình ảnh?",
      choices: ["Màn hình", "Chuột", "Bàn phím", "Loa"],
      a: "Màn hình"
    }
  },
  g2_a02: {
    q1: {
      q: "Mouse Trainer giúp em luyện tập điều gì?",
      choices: ["Thao tác chuột", "Gõ bàn phím", "Vẽ tranh", "In ấn"],
      a: "Thao tác chuột"
    }
  },
  g2_a03: {
    q1: {
      q: "Cách mở phần mềm từ biểu tượng trên màn hình thường là:",
      choices: ["Nháy đúp chuột", "Rút điện máy", "Ấn Ctrl+Z", "Gõ Enter"],
      a: "Nháy đúp chuột"
    }
  },
  g2_b04: {
    q1: {
      q: "Khi vẽ trong Leah's Farm Paint, em nên:",
      choices: ["Chọn màu trước khi tô", "Tắt máy ngay", "Gõ bàn phím", "Cuộn chuột"],
      a: "Chọn màu trước khi tô"
    }
  },
  g2_c06: {
    q1: {
      q: "Ngón tay đặt trên phím F và J thuộc hàng nào?",
      choices: ["Hàng cơ sở", "Hàng số", "Hàng chức năng", "Hàng dưới"],
      a: "Hàng cơ sở"
    }
  },
  g2_d09: {
    q1: {
      q: "Khi dùng Internet, em nên:",
      choices: ["Có người lớn hướng dẫn", "Tự cho mật khẩu", "Vào link lạ", "Chia sẻ địa chỉ nhà"],
      a: "Có người lớn hướng dẫn"
    },
    q2: { q: "Em có thể tìm thông tin bổ ích trên Internet khi được hướng dẫn.", a: "Đúng" }
  },
  g2_d10: {
    q1: {
      q: "Trên website Nhà bác học nhí, em tìm bài bằng:",
      choices: ["Ô tìm kiếm", "Tắt máy", "In ấn", "Rút USB"],
      a: "Ô tìm kiếm"
    }
  },
  g2_d16: {
    q2: { q: "Bài ôn tập giúp em củng cố chuột, bàn phím và phần mềm đã học.", a: "Đúng" }
  }
};

const buildQuestions = () =>
  grade2.flatMap(([id, title, , , description]) => {
    const short = title.split(". ").slice(1).join(". ") || title;
    const extra = quizExtras[id];
    const q1 = extra?.q1
      ? {
          id: `q_${id}_1`,
          skill: id,
          type: "multiple_choice",
          question: extra.q1.q || extra.q1.question,
          choices: extra.q1.choices,
          answer: extra.q1.a || extra.q1.answer,
          hint: "Xem lại phần «Em cần nhớ»."
        }
      : {
          id: `q_${id}_1`,
          skill: id,
          type: "multiple_choice",
          question: `Theo bài «${short}», ý nào đúng nhất?`,
          choices: [description, ...(extra?.q1wrong || ["Không cần luyện thao tác trên máy.", "Có thể tắt máy đột ngột khi đang mở phần mềm."])],
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
          hint: "Suy nghĩ tình huống an toàn khi dùng máy."
        }
      : {
          id: `q_${id}_2`,
          skill: id,
          type: "true_false",
          question: `Bài «${short}» giúp em nâng cao kỹ năng Tin học lớp 2.`,
          choices: ["Đúng", "Sai"],
          answer: "Đúng",
          hint: "Tin học lớp 2 mở rộng chuột, vẽ, bàn phím và học trên mạng."
        };
    return [q1, q2];
  });

const labStepsBySkill = {
  g2_a02: [
    { id: "s1", label: "Mở Mouse Trainer", hint: "Nháy đúp biểu tượng hoặc theo hướng dẫn GV." },
    { id: "s2", label: "Hoàn thành Training 1 (nháy chuột)", hint: "Nháy vào mục tiêu trên màn hình." },
    { id: "s3", label: "Thử Training 2 hoặc 3", hint: "Nháy đúp hoặc kéo thả theo yêu cầu." }
  ],
  g2_a03: [
    { id: "s1", label: "Mở một phần mềm từ biểu tượng", hint: "Ví dụ Paint hoặc phần mềm giáo viên chỉ định." },
    { id: "s2", label: "Thao tác trong cửa sổ phần mềm", hint: "Quan sát thanh tiêu đề và nút thu nhỏ." },
    { id: "s3", label: "Thoát phần mềm đúng cách", hint: "Đóng bằng nút X hoặc File → Exit." }
  ],
  g2_b05: [
    { id: "s1", label: "Vẽ hoặc tô theo mẫu SGK", hint: "Dùng bút và ô màu phù hợp." },
    { id: "s2", label: "Lưu bài làm", hint: "Ghi tên tệp theo quy định lớp." },
    { id: "s3", label: "Trình bày kết quả", hint: "Cho giáo viên hoặc bạn xem." }
  ],
  g2_b14: [
    { id: "s1", label: "Mở Paint và chọn công cụ hình", hint: "Hình chữ nhật, elip hoặc đường thẳng." },
    { id: "s2", label: "Vẽ ít nhất 3 hình khối", hint: "Đổi màu viền hoặc tô cho mỗi hình." },
    { id: "s3", label: "Lưu bức vẽ", hint: "Đặt tên dễ nhớ, ví dụ: lop2_hinh." }
  ],
  g2_c06: [
    { id: "s1", label: "Mở Rapid Typing (hoặc phần mềm luyện gõ)", hint: "Chọn bài hàng cơ sở." },
    { id: "s2", label: "Gõ dãy ff jj dd kk", hint: "Đặt tay đúng F và J." },
    { id: "s3", label: "Hoàn thành bài luyện cơ bản", hint: "So sánh kết quả với màn hình." }
  ],
  g2_c07: [
    { id: "s1", label: "Chọn bài hàng trên hoặc hàng số", hint: "Theo hướng dẫn giáo viên." },
    { id: "s2", label: "Gõ chậm và đúng", hint: "Không nhìn xuống bàn phím nếu có thể." },
    { id: "s3", label: "Lặp lại phím sai", hint: "Xóa và gõ lại." }
  ],
  g2_d10: [
    { id: "s1", label: "Mở website Nhà bác học nhí", hint: "Theo bookmark hoặc biểu tượng lớp học." },
    { id: "s2", label: "Tìm một chủ đề (ví dụ: cá heo, Việt Nam)", hint: "Dùng ô tìm kiếm." },
    { id: "s3", label: "Xem nội dung và thoát website", hint: "Đóng tab khi xong." }
  ],
  g2_d16: [
    { id: "s1", label: "Ôn một bài chuột (Mouse Trainer)", hint: "Ít nhất một mục Training." },
    { id: "s2", label: "Ôn gõ hàng cơ sở", hint: "5 phút luyện tập." },
    { id: "s3", label: "Hoàn thành một bức vẽ nhỏ hoặc trò chơi học tập", hint: "Tổng hợp kỹ năng học kỳ." }
  ]
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu bài thực hành SGK", hint: "Hiểu việc cần làm trên máy thật." },
  { id: "s2", label: "Thực hiện theo hướng dẫn giáo viên", hint: "Làm từng bước, an toàn trước." },
  { id: "s3", label: "Báo cáo kết quả", hint: "Trình bày hoặc chụp màn hình nếu được phép." }
];

const theoryOnly = new Set(["g2_a01", "g2_b04", "g2_d09"]);

const buildLabs = () =>
  grade2
    .filter(([id]) => !theoryOnly.has(id))
    .map(([id, title]) => {
      const sim = SKILL_SIMULATORS[id];
      const short = title.replace(/^Bài \d+\.\s*/, "");
      if (sim) {
        return {
          id: `lab_${id}`,
          skill: id,
          type: sim.type,
          title: `Thực hành: ${short}`,
          xp: 40,
          simulator: sim
        };
      }
      return {
        id: `lab_${id}`,
        skill: id,
        type: "checklist",
        title: `Thực hành: ${short}`,
        xp: 40,
        steps: labStepsBySkill[id] || defaultLabSteps
      };
    });

const grade2Errors = [
  {
    skill: "g2_a02",
    pattern: "dup",
    errorType: "mouse",
    title: "Nhầm nháy và nháy đúp",
    message: "Nháy đúp khi chỉ cần nháy một lần sẽ mở nhầm chương trình.",
    hint: "Nháy nhẹ một lần; chỉ nháy đúp khi mở phần mềm.",
    recommendation: "g2_a02"
  },
  {
    skill: "g2_c06",
    pattern: "nhin",
    errorType: "typing",
    title: "Nhìn xuống bàn phím quá nhiều",
    message: "Nhìn phím khiến gõ chậm và khó nhớ vị trí.",
    hint: "Nhìn màn hình Rapid Typing, chỉ liếc phím khi cần.",
    recommendation: "g2_c06"
  },
  {
    skill: "g2_d09",
    pattern: "mat khau",
    errorType: "safety",
    title: "Chia sẻ thông tin cá nhân trên mạng",
    message: "Đưa mật khẩu hoặc địa chỉ cho người lạ rất nguy hiểm.",
    hint: "Chỉ học trên website giáo viên cho phép; hỏi người lớn khi nghi ngờ.",
    recommendation: "g2_d09"
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

const g2Skills = buildSkills();
const g2Lessons = buildLessons();
const g2Questions = buildQuestions();
const g2Labs = buildLabs();

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(merge(skills, g2Skills), null, 2)),
  writeFile("data/lessons.json", JSON.stringify(merge(lessons, g2Lessons), null, 2)),
  writeFile("data/questions.json", JSON.stringify(merge(questions, g2Questions), null, 2)),
  writeFile("data/labs.json", JSON.stringify(merge(labs, g2Labs), null, 2)),
  writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, grade2Errors), null, 2))
]);

const mergedSkills = merge(skills, g2Skills);
const mergedQuestions = merge(questions, g2Questions);

console.log(
  `Grade 2: +${g2Skills.length} skills, +${g2Lessons.length} lessons, +${g2Questions.length} questions, +${g2Labs.length} labs`
);
console.log(`Total: ${mergedSkills.length} skills, ${mergedQuestions.length} questions`);
