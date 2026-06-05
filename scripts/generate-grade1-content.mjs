/**
 * Nội dung Tin học lớp 1 — bám 16 bài chương trình làm quen máy tính TH
 * (SGK KNTT chính thức bắt đầu từ lớp 3; lớp 1 = tiền đề NLa theo CT GDPT 2018)
 */
import { readFile, writeFile } from "node:fs/promises";
import { SKILL_SIMULATORS } from "../modules/inputLab/scenarios.js";

const SOURCE =
  "Bám sát chương trình Tin học lớp 1 (làm quen máy tính, chuột, bàn phím); nội dung tự biên soạn cho ITFlow, chuẩn bị cho SGK KNTT lớp 3+.";

const grade1 = [
  ["g1_a01", "Bài 1. Làm quen với máy tính", "Làm quen máy tính", 1, "Nhận biết máy tính là thiết bị hỗ trợ học tập và vui chơi có ích.", []],
  ["g1_a02", "Bài 2. Các bộ phận máy tính", "Làm quen máy tính", 1, "Nhận diện màn hình, thân máy, chuột, bàn phím và loa.", ["g1_a01"]],
  ["g1_a03", "Bài 3. Tư thế ngồi học và ánh sáng", "Làm quen máy tính", 1, "Ngồi đúng tư thế, đủ ánh sáng để bảo vệ mắt và sức khỏe.", ["g1_a02"]],
  ["g1_a04", "Bài 4. Bật và tắt máy tính", "Làm quen máy tính", 1, "Khởi động và tắt máy tính đúng cách, không tắt đột ngột khi đang dùng.", ["g1_a03"]],
  ["g1_b05", "Bài 5. Chuột máy tính", "Thao tác với chuột", 2, "Cầm chuột đúng cách; di chuyển con trỏ trên màn hình.", ["g1_a04"]],
  ["g1_b06", "Bài 6. Chuột máy tính (tiếp theo)", "Thao tác với chuột", 2, "Nháy, nháy đúp và kéo thả chuột.", ["g1_b05"]],
  ["g1_b07", "Bài 7. Trò chơi Sticks", "Thao tác với chuột", 2, "Luyện phối hợp mắt–tay qua trò chơi trên máy tính.", ["g1_b06"]],
  ["g1_b08", "Bài 8. Chuột máy tính (tiếp theo)", "Thao tác với chuột", 2, "Dùng nút cuộn và di chuyển chính xác trong vùng làm việc.", ["g1_b07"]],
  ["g1_b09", "Bài 9. Thực hành trò chơi Tangram", "Thao tác với chuột", 2, "Kéo thả hình khối để ghép hình Tangram.", ["g1_b08"]],
  ["g1_b10", "Bài 10. Ôn tập chuột và Tangram", "Thao tác với chuột", 2, "Ôn các thao tác chuột qua bài tập tổng hợp.", ["g1_b09"]],
  ["g1_c11", "Bài 11. Bàn phím máy tính", "Bàn phím máy tính", 3, "Nhận biết các hàng phím và đặt tay trên hàng cơ sở.", ["g1_b10"]],
  ["g1_c12", "Bài 12. Thực hành bàn phím", "Bàn phím máy tính", 3, "Gõ các phím trên hàng cơ sở và hàng trên.", ["g1_c11"]],
  ["g1_c13", "Bài 13. Bàn phím (tiếp theo)", "Bàn phím máy tính", 3, "Gõ chữ hoa bằng phím Shift và các phím số.", ["g1_c12"]],
  ["g1_c14", "Bài 14. Thực hành bàn phím (tiếp)", "Bàn phím máy tính", 3, "Gõ dãy ký tự ngắn theo hướng dẫn.", ["g1_c13"]],
  ["g1_d15", "Bài 15. Máy tính trong đời sống", "Máy tính trong cuộc sống", 4, "Nêu ví dụ máy tính giúp học, giao tiếp và giải trí lành mạnh.", ["g1_c14"]],
  ["g1_c16", "Bài 16. Ôn tập bàn phím", "Bàn phím máy tính", 3, "Ôn tập toàn bộ thao tác gõ bàn phím cơ bản.", ["g1_d15"]]
];

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

const buildSkills = () =>
  grade1.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
    id,
    title,
    grade: 1,
    book: "Tin học 1",
    chapter,
    chapterIndex,
    lessonNo: index + 1,
    domain: chapter,
    level: chapterIndex,
    prerequisite,
    description,
    streams: ["DL"],
    competencies: ["NLa"]
  }));

const corePoints = {
  g1_a01: [
    "Máy tính giúp em học bài, xem tranh ảnh và chơi trò chơi giáo dục.",
    "Chỉ dùng máy tính khi có người lớn hướng dẫn.",
    "Không tự ý mở các chương trình lạ."
  ],
  g1_a02: [
    "Màn hình hiển thị hình ảnh; chuột điều khiển con trỏ.",
    "Bàn phím dùng để gõ chữ và số.",
    "Loa phát âm thanh."
  ],
  g1_a03: [
    "Ngồi thẳng lưng, mắt cách màn hình khoảng một gang tay.",
    "Phòng học đủ sáng, không chói màn hình.",
    "Nghỉ 5–10 phút sau mỗi 30 phút dùng máy."
  ],
  g1_a04: [
    "Bật máy theo hướng dẫn giáo viên hoặc phụ huynh.",
    "Tắt máy bằng lệnh Tắt máy, không rút điện đột ngột.",
    "Đóng chương trình trước khi tắt máy."
  ],
  g1_b05: [
    "Tay phải (hoặc tay thuận) đặt nhẹ trên chuột.",
    "Di chuyển chuột từ từ để con trỏ không nhảy lung tung.",
    "Đặt chuột trên tấm lót chuột."
  ],
  g1_b06: [
    "Nháy trái: chọn một đối tượng.",
    "Nháy đúp: mở tệp hoặc chương trình.",
    "Kéo thả: giữ nút trái và di chuyển."
  ],
  g1_b07: ["Trò chơi giúp luyện tay nhanh và chính xác hơn.", "Tập trung vào màn hình khi chơi.", "Dừng chơi khi được nhắc."],
  g1_b08: ["Nút cuộn giúp xem nội dung dài trên trang web hoặc tài liệu.", "Không ấn mạnh nút chuột.", "Lau chuột sạch khi bám bụi."],
  g1_b09: ["Kéo hình khối vào đúng vị trí để ghép Tangram.", "Kiên nhẫn thử lại khi chưa khớp.", "Hợp tác với bạn khi làm theo nhóm."],
  g1_b10: ["Ôn nháy, kéo thả, cuộn trong một bài tập.", "Làm chậm và đúng quan trọng hơn làm nhanh.", "Nhờ giáo viên khi không chọn được đối tượng."],
  g1_c11: [
    "Hàng cơ sở: A S D F và J K L ;",
    "Ngón trỏ trái trên F, ngón trỏ phải trên J.",
    "Gõ bằng đầu ngón, không nhìn xuống bàn phím ngay lập tức."
  ],
  g1_c12: ["Gõ từng phím một, không đè nhiều phím cùng lúc.", "Giữ tay thả lỏng.", "So sánh kết quả với mẫu trên màn hình."],
  g1_c13: ["Giữ Shift + phím chữ để gõ hoa.", "Gõ số bằng hàng phím số phía trên.", "Gõ chậm nhưng đúng."],
  g1_c14: ["Gõ dãy ký tự theo nhịp đếm.", "Không vội khi sai — xóa và gõ lại.", "Chúc mừng bản thân khi hoàn thành."],
  g1_d15: [
    "Máy tính ở trường, nhà, thư viện giúp tìm thông tin và học.",
    "Không dùng máy tính quá lâu; cân bằng vận động.",
    "Kể cho người thân một việc máy tính giúp em trong tuần."
  ],
  g1_c16: ["Ôn hàng cơ sở và hàng trên.", "Gõ tên em hoặc từ ngắn làm bài kiểm tra nhỏ.", "Tiếp tục luyện mỗi ngày vài phút."]
};

const buildLessons = () =>
  grade1.map(([id, title, chapter, , description]) => {
    const points = corePoints[id] || [description, "Thực hành cùng giáo viên hoặc phụ huynh.", "Hỏi ngay khi chưa hiểu thao tác."];
    return {
      id,
      title,
      skill: id,
      chapter,
      source: SOURCE,
      xp: 40,
      steps: [
        { type: "intro", title: "Mục tiêu bài học", content: description },
        {
          type: "keypoints",
          title: "Em cần nhớ",
          content: "Nắm các ý sau trước khi làm quiz và thực hành:",
          points
        },
        {
          type: "summary",
          title: "Ghi nhớ nhanh",
          content: points[0]
        }
      ]
    };
  });

const quizExtras = {
  g1_a01: {
    q1wrong: ["Máy tính chỉ dành cho người lớn, học sinh không được dùng.", "Máy tính không dùng được để học bài."],
    q2: { q: "Khi dùng máy tính lớp 1, em nên có người lớn hướng dẫn.", a: "Đúng" }
  },
  g1_a02: {
    q1: { q: "Bộ phận nào dùng để gõ chữ và số?", choices: ["Bàn phím", "Chuột", "Loa", "Màn hình"], a: "Bàn phím" }
  },
  g1_a03: {
    q1: { q: "Tư thế ngồi học đúng giúp bảo vệ điều gì?", choices: ["Mắt và lưng", "Tóc", "Giày", "Cặp sách"], a: "Mắt và lưng" }
  },
  g1_a04: {
    q1: { q: "Cách tắt máy tính an toàn là:", choices: ["Dùng lệnh Tắt máy", "Rút điện ngay", "Ấn nút nguồn liên tục", "Đóng màn hình"], a: "Dùng lệnh Tắt máy" }
  },
  g1_b06: {
    q1: { q: "Thao tác «kéo thả» dùng để:", choices: ["Di chuyển đối tượng trên màn hình", "Tắt máy", "Gõ chữ hoa", "Bật loa"], a: "Di chuyển đối tượng trên màn hình" }
  },
  g1_c11: {
    q1: { q: "Ngón tay đặt trên phím F và J thuộc hàng nào?", choices: ["Hàng cơ sở", "Hàng số", "Hàng chức năng", "Hàng dưới cùng"], a: "Hàng cơ sở" }
  }
};

const buildQuestions = () =>
  grade1.flatMap(([id, title, , , description]) => {
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
          choices: [description, ...(extra?.q1wrong || ["Máy tính không cần thiết ở trường.", "Không cần bảo vệ mắt khi học."])],
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
          question: `Bài «${short}» giúp em hình thành thói quen dùng máy tính an toàn.`,
          choices: ["Đúng", "Sai"],
          answer: "Đúng",
          hint: "Tin học lớp 1 tập trung an toàn và thao tác cơ bản."
        };
    return [q1, q2];
  });

const labStepsBySkill = {
  g1_a04: [
    { id: "s1", label: "Quan sát giáo viên bật máy mẫu", hint: "Ghi nhớ thứ tự: màn hình → thân máy." },
    { id: "s2", label: "Tự bật máy theo hướng dẫn", hint: "Không vội, chờ máy khởi động xong." },
    { id: "s3", label: "Tắt máy bằng lệnh Tắt máy", hint: "Không rút điện." }
  ],
  g1_b05: [
    { id: "s1", label: "Cầm chuột đúng tư thế", hint: "Tay thả lỏng, lòng bàn tay không úp chặt." },
    { id: "s2", label: "Di chuyển con trỏ quanh màn hình", hint: "Chậm và đều." },
    { id: "s3", label: "Nháy vào một biểu tượng trên màn hình", hint: "Một lần nháy trái." }
  ],
  g1_b09: [
    { id: "s1", label: "Mở trò chơi/ghi hình Tangram", hint: "Theo phần mềm giáo viên chỉ định." },
    { id: "s2", label: "Kéo thả ít nhất 3 mảnh ghép", hint: "Thử ghép đúng hình mẫu." },
    { id: "s3", label: "Hoàn thành hoặc lưu kết quả", hint: "Chụp màn hình nếu được phép." }
  ],
  g1_c12: [
    { id: "s1", label: "Đặt tay lên hàng cơ sở", hint: "F và J có gờ nhỏ giúp định vị." },
    { id: "s2", label: "Gõ dãy: ff jj dd kk", hint: "Từng phím, không nhìn xuống nếu có thể." },
    { id: "s3", label: "Soát lỗi và gõ lại phím sai", hint: "Chậm mà đúng." }
  ],
  g1_c14: [
    { id: "s1", label: "Gõ tên em (chữ thường)", hint: "Không dấu hoặc có dấu tùy bài." },
    { id: "s2", label: "Gõ một từ ngắn: lop1 hoặc tinhoc", hint: "Theo mẫu giáo viên." },
    { id: "s3", label: "Gõ chữ hoa đầu tên bằng Shift", hint: "Giữ Shift, gõ một chữ, thả Shift." }
  ]
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu bài thực hành", hint: "Hiểu việc cần làm trên máy thật hoặc mô phỏng." },
  { id: "s2", label: "Thực hiện theo hướng dẫn SGK/giáo viên", hint: "Làm từng bước, không bỏ qua an toàn." },
  { id: "s3", label: "Báo cáo kết quả cho giáo viên", hint: "Nói hoặc trình bày ảnh chụp màn hình." }
];

const buildLabs = () =>
  grade1
    .filter(([id]) => id !== "g1_a01" && id !== "g1_a02" && id !== "g1_a03" && id !== "g1_d15")
    .map(([id, title]) => {
      const sim = SKILL_SIMULATORS[id];
      const short = title.replace(/^Bài \d+\.\s*/, "");
      if (sim) {
        return {
          id: `lab_${id}`,
          skill: id,
          type: sim.type,
          title: `Thực hành: ${short}`,
          xp: 35,
          simulator: sim
        };
      }
      return {
        id: `lab_${id}`,
        skill: id,
        type: "checklist",
        title: `Thực hành: ${short}`,
        xp: 35,
        steps: labStepsBySkill[id] || defaultLabSteps
      };
    });

const grade1Errors = [
  {
    skill: "g1_a03",
    pattern: "sat",
    errorType: "posture",
    title: "Ngồi quá sát màn hình",
    message: "Ngồi sát màn hình dễ mỏi mắt và đau cổ.",
    hint: "Lùi ghế, mắt cách màn hình khoảng một gang tay.",
    recommendation: "g1_a03"
  },
  {
    skill: "g1_b06",
    pattern: "dup",
    errorType: "mouse",
    title: "Nhầm nháy và nháy đúp",
    message: "Nháy đúp khi chỉ cần nháy một lần sẽ mở nhầm chương trình.",
    hint: "Nháy nhẹ một lần, đợi một nhịp rồi mới nháy tiếp.",
    recommendation: "g1_b06"
  },
  {
    skill: "g1_c11",
    pattern: "nhin",
    errorType: "typing",
    title: "Nhìn xuống bàn phím quá nhiều",
    message: "Nhìn phím khiến gõ chậm và khó nhớ vị trí phím.",
    hint: "Nhìn màn hình, chỉ liếc xuống khi cần.",
    recommendation: "g1_c11"
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

const g1Skills = buildSkills();
const g1Lessons = buildLessons();
const g1Questions = buildQuestions();
const g1Labs = buildLabs();

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(merge(skills, g1Skills), null, 2)),
  writeFile("data/lessons.json", JSON.stringify(merge(lessons, g1Lessons), null, 2)),
  writeFile("data/questions.json", JSON.stringify(merge(questions, g1Questions), null, 2)),
  writeFile("data/labs.json", JSON.stringify(merge(labs, g1Labs), null, 2)),
  writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, grade1Errors), null, 2))
]);

console.log(
  `Grade 1: +${g1Skills.length} skills, +${g1Lessons.length} lessons, +${g1Questions.length} questions, +${g1Labs.length} labs`
);
console.log(
  `Total: ${merge(skills, g1Skills).length} skills, ${merge(questions, g1Questions).length} questions`
);
