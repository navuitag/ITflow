import { writeFile } from "node:fs/promises";

const SOURCE = "Bám sát SGK Tin học 5 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.";

const grade5 = [
  ["g5_a01", "Bài 1. Em có thể làm gì với máy tính?", "Máy tính và em", 1, "Nhận biết vai trò máy tính trong học tập, giải trí và tạo sản phẩm số.", []],
  ["g5_b02", "Bài 2. Tìm kiếm thông tin trên website", "Mạng máy tính và Internet", 2, "Tìm thông tin phù hợp trên website và hợp tác chia sẻ với nhóm.", ["g5_a01"]],
  ["g5_c03", "Bài 3. Tìm kiếm thông tin trong giải quyết vấn đề", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Thu thập và chọn thông tin tin cậy khi giải quyết vấn đề.", ["g5_b02"]],
  ["g5_c04", "Bài 4. Cây thư mục", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", 3, "Tổ chức cây thư mục và tìm tệp trên máy tính.", ["g5_c03"]],
  ["g5_d05", "Bài 5. Bản quyền nội dung thông tin", "Đạo đức, pháp luật và văn hoá trong môi trường số", 4, "Tôn trọng bản quyền và quyền riêng tư trong môi trường số.", ["g5_c04"]],
  ["g5_e06", "Bài 6. Định dạng kí tự và bố trí hình ảnh trong văn bản", "Ứng dụng tin học", 5, "Định dạng văn bản và chèn hình ảnh hợp lý.", ["g5_d05"]],
  ["g5_e07", "Bài 7. Thực hành soạn thảo văn bản", "Ứng dụng tin học", 5, "Soạn thảo văn bản có cấu trúc, lưu tệp đúng thư mục.", ["g5_e06"]],
  ["g5_e08a", "Bài 8A. Làm quen với phần mềm đồ hoạ", "Ứng dụng tin học", 5, "Làm quen giao diện và công cụ đồ hoạ cơ bản.", ["g5_e07"]],
  ["g5_e09a", "Bài 9A. Sử dụng phần mềm đồ hoạ tạo sản phẩm số", "Ứng dụng tin học", 5, "Tạo thiệp hoặc tranh số đơn giản bằng phần mềm đồ hoạ.", ["g5_e08a"]],
  ["g5_e08b", "Bài 8B. Làm sản phẩm thủ công theo video hướng dẫn", "Ứng dụng tin học", 5, "Làm theo video hướng dẫn và ghi lại các bước thực hiện.", ["g5_e07"]],
  ["g5_e09b", "Bài 9B. Thực hành tạo đồ dùng gia đình theo video", "Ứng dụng tin học", 5, "Tạo sản phẩm thực tế theo hướng dẫn đa phương tiện.", ["g5_e08b"]],
  ["g5_f10", "Bài 10. Cấu trúc tuần tự", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Mô tả thuật toán tuần tự bằng các bước có thứ tự.", ["g5_e07"]],
  ["g5_f11", "Bài 11. Cấu trúc lặp", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Nhận biết và dùng cấu trúc lặp trong chương trình.", ["g5_f10"]],
  ["g5_f12", "Bài 12. Thực hành sử dụng lệnh lặp", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Viết chương trình có vòng lặp đơn giản.", ["g5_f11"]],
  ["g5_f13", "Bài 13. Cấu trúc rẽ nhánh", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Dùng điều kiện Nếu–Thì trong thuật toán.", ["g5_f12"]],
  ["g5_f14", "Bài 14. Sử dụng biến trong chương trình", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Khai báo và cập nhật biến trong lập trình trực quan.", ["g5_f13"]],
  ["g5_f15", "Bài 15. Sử dụng biểu thức trong chương trình", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Tính toán bằng biểu thức số học trong chương trình.", ["g5_f14"]],
  ["g5_f16", "Bài 16. Từ kịch bản đến chương trình", "Giải quyết vấn đề với sự trợ giúp của máy tính", 6, "Chuyển kịch bản thành chương trình hoàn chỉnh.", ["g5_f15"]]
];

const skills = grade5.map(([id, title, chapter, chapterIndex, description, prerequisite], index) => ({
  id,
  title,
  grade: 5,
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

const lessons = grade5.map(([id, title, chapter, , description]) => ({
  id,
  title,
  skill: id,
  chapter,
  source: SOURCE,
  xp: 50,
  steps: [
    { type: "intro", title: "Mục tiêu", content: description },
    {
      type: "keypoints",
      title: "Kiến thức trọng tâm",
      content: "Nắm vững các ý sau trước khi luyện tập:",
      points: [
        description,
        "Liên hệ tình huống thực tế khi học, giải trí và làm việc nhóm.",
        "Tuân thủ an toàn, bản quyền và sức khỏe khi dùng thiết bị số."
      ]
    },
    { type: "summary", title: "Ghi nhớ nhanh", content: "Ôn lại bằng mini quiz và phần thực hành (nếu có)." }
  ]
}));

const questions = grade5.flatMap(([id, title, , , description]) => [
  {
    id: `q_${id}_1`,
    skill: id,
    type: "multiple_choice",
    question: `Theo bài "${title.split(". ")[1] || title}", ý nào phù hợp nhất?`,
    choices: [description, "Máy tính chỉ dùng để chơi game, không hỗ trợ học tập.", "Không cần tôn trọng bản quyền trên Internet.", "Thuật toán không cần thứ tự các bước."],
    answer: description,
    hint: "Đọc lại phần mục tiêu và kiến thức trọng tâm trong bài học."
  },
  {
    id: `q_${id}_2`,
    skill: id,
    type: "true_false",
    question: `Kiến thức trong bài "${title}" góp phần hình thành năng lực tin học theo CT 2018.`,
    choices: ["Đúng", "Sai"],
    answer: "Đúng",
    hint: "Môn Tin học phát triển năng lực NLa–NLe qua các chủ đề A–G."
  }
]);

const blocklyLabs = {
  g5_f10: {
    mode: "sequence",
    mission: "Ghép ít nhất 2 lệnh tuần tự dưới «Khi bấm Chạy» (ví dụ: Nói rồi Tiến).",
    hint: "Thuật toán tuần tự: các bước chạy lần lượt từ trên xuống.",
    rules: { minChain: 2 }
  },
  g5_f11: {
    mode: "loop",
    mission: "Dùng khối «Lặp lại» ít nhất 3 lần, bên trong có ít nhất một lệnh.",
    hint: "Cấu trúc lặp giúp máy tính thực hiện cùng một việc nhiều lần.",
    rules: { minRepeatTimes: 3 }
  },
  g5_f12: {
    mode: "loop_practice",
    mission: "Viết chương trình lặp: nhân vật tiến và quay theo vòng lặp ≥ 4 lần.",
    hint: "Thử «Chạy thử» để xem nhân vật di chuyển.",
    rules: { minRepeatTimes: 4 }
  },
  g5_f13: {
    mode: "branch",
    mission: "Dùng khối «Nếu … thì» với điều kiện so sánh và ít nhất một lệnh trong nhánh.",
    hint: "Rẽ nhánh: chọn hành động khác nhau tùy điều kiện.",
    rules: {}
  },
  g5_f14: {
    mode: "variables",
    mission: "Gán giá trị cho biến và đọc biến trong chương trình.",
    hint: "Biến như hộp nhớ — lưu số điểm, số bước…",
    rules: {}
  },
  g5_f15: {
    mode: "expressions",
    mission: "Dùng phép tính (+, −, ×, ÷) và gán hoặc hiển thị kết quả.",
    hint: "Biểu thức: kết hợp số và phép toán trước khi gán biến.",
    rules: {}
  },
  g5_f16: {
    mode: "project",
    mission: "Từ kịch bản SGK: dùng lặp + rẽ nhánh + biến (≥ 6 khối) rồi chạy thử.",
    hint: "Ví dụ: nếu điểm > 5 thì nói «Giỏi», không thì «Cố lên»; lặp di chuyển.",
    rules: { minBlocks: 6 }
  }
};

const labs = grade5
  .filter(([id]) => id.startsWith("g5_e") || id.startsWith("g5_f"))
  .map(([id, title]) => {
    const short = title.replace(/^Bài \d+[AB]?\.\s*/, "");
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
    return {
      id: `lab_${id}`,
      skill: id,
      type: "checklist",
      title: `Thực hành: ${short}`,
      xp: 40,
      steps: [
        { id: "s1", label: "Đọc yêu cầu và xác định sản phẩm cần tạo", hint: "Ghi ra đầu ra mong muốn." },
        { id: "s2", label: "Thực hiện theo hướng dẫn SGK", hint: "Làm đúng thứ tự." },
        { id: "s3", label: "Kiểm tra kết quả", hint: "So với rubric bài học." },
        { id: "s4", label: "Lưu hoặc trình bày sản phẩm", hint: "Đặt tên tệp rõ ràng." }
      ]
    };
  });

const errors = [
  {
    skill: "g5_c04",
    pattern: "desktop",
    errorType: "file_organization",
    title: "Lưu tệp không đúng chỗ",
    message: "Lưu mọi tệp trên Desktop khiến khó tìm và dễ xóa nhầm.",
    hint: "Tạo thư mục theo môn/chủ đề và đặt tên tệp có nghĩa.",
    recommendation: "g5_c04"
  },
  {
    skill: "g5_d05",
    pattern: "sao",
    errorType: "copyright",
    title: "Sao chép khi chưa được phép",
    message: "Dùng ảnh/nhạc/video của người khác mà không xin phép vi phạm bản quyền.",
    hint: "Chỉ dùng tài nguyên miễn phí có giấy phép hoặc tự tạo.",
    recommendation: "g5_d05"
  },
  {
    skill: "g5_f11",
    pattern: "lap",
    errorType: "loop_logic",
    title: "Vòng lặp chưa đúng",
    message: "Số lần lặp hoặc điều kiện dừng chưa khớp với bài toán.",
    hint: "Xác định biến đếm và điều kiện kết thúc trước khi ghép khối lặp.",
    recommendation: "g5_f11"
  }
];

await Promise.all([
  writeFile("data/skills.json", JSON.stringify(skills, null, 2)),
  writeFile("data/lessons.json", JSON.stringify(lessons, null, 2)),
  writeFile("data/questions.json", JSON.stringify(questions, null, 2)),
  writeFile("data/labs.json", JSON.stringify(labs, null, 2)),
  writeFile("data/errors.json", JSON.stringify(errors, null, 2))
]);

console.log(`Generated: ${skills.length} skills, ${lessons.length} lessons, ${questions.length} questions, ${labs.length} labs`);
