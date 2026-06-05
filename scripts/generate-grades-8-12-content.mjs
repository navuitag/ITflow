/**
 * Sinh nội dung Tin học lớp 8–12 (SGK KNTT).
 * Chạy: node scripts/generate-grades-8-12-content.mjs
 */
import { buildGradeContent, writeGradeContent } from "./lib/grade-content-lib.mjs";
import {
  grade8Lessons,
  grade9Lessons,
  grade10Lessons,
  grade11Lessons,
  grade12Lessons
} from "./data/grades-8-12.mjs";

const thcsStreams = (ci) => (ci >= 5 ? ["CS"] : ci >= 4 ? ["ICT"] : ["DL"]);
const thptStreams = (ci) => (ci >= 5 ? ["CS"] : ci >= 4 ? ["ICT", "DL"] : ["DL"]);

const blockly8 = {
  g8_e12: { mode: "sequence", mission: "Từ thuật toán đến chương trình: ≥ 3 lệnh tuần tự.", hint: "Mỗi bước thuật toán là một lệnh.", rules: { minChain: 3 } },
  g8_e13: { mode: "variables", mission: "Biểu diễn dữ liệu: gán và đọc biến.", hint: "Biến lưu giá trị dữ liệu.", rules: {} },
  g8_e14: { mode: "branch", mission: "Cấu trúc điều khiển: dùng «Nếu … thì».", hint: "Rẽ nhánh theo điều kiện.", rules: {} },
  g8_e15: { mode: "loop_practice", mission: "Gỡ lỗi: lặp ≥ 3 lần và chạy thử sửa lỗi.", hint: "Kiểm tra từng bước trong vòng lặp.", rules: { minRepeatTimes: 3 } }
};

const blockly9 = {
  g9_e14: { mode: "sequence", mission: "Giải quyết vấn đề: thuật toán tuần tự ≥ 3 lệnh.", hint: "Phân tích bài toán thành các bước.", rules: { minChain: 3 } },
  g9_e15: { mode: "expressions", mission: "Bài toán tin học: dùng phép tính và biến.", hint: "Biểu thức mô tả quan hệ dữ liệu.", rules: {} },
  g9_e16: { mode: "project", mission: "Lập chương trình: lặp + rẽ nhánh + biến (≥ 6 khối).", hint: "Tổng hợp từ thuật toán đã thiết kế.", rules: { minBlocks: 6 } }
};

const blockly10 = {
  g10_e16: { mode: "sequence", mission: "Python: mô phỏng chương trình tuần tự ≥ 2 lệnh.", hint: "Làm quen cấu trúc chương trình.", rules: { minChain: 2 } },
  g10_e17: { mode: "variables", mission: "Biến và gán: khai báo biến, gán giá trị.", hint: "Tương ứng x = 5 trong Python.", rules: {} },
  g10_e19: { mode: "branch", mission: "if: dùng «Nếu … thì» với điều kiện.", hint: "Rẽ nhánh if/else.", rules: {} },
  g10_e20: { mode: "loop", mission: "for: «Lặp lại» ≥ 3 lần.", hint: "Vòng lặp for trong Python.", rules: { minRepeatTimes: 3 } },
  g10_e31: { mode: "project", mission: "Dự án Python: ≥ 6 khối, chạy thử.", hint: "Tổng hợp kiến thức đã học.", rules: { minBlocks: 6 } }
};

const blockly11 = {
  g11_f19: { mode: "sequence", mission: "Tìm kiếm: mô phỏng duyệt tuần tự ≥ 3 bước.", hint: "So sánh từng phần tử mảng.", rules: { minChain: 3 } },
  g11_f21: { mode: "loop", mission: "Sắp xếp: lặp ≥ 4 lần trong thuật toán.", hint: "Vòng lặp lồng so sánh đổi chỗ.", rules: { minRepeatTimes: 4 } },
  g11_f28: { mode: "project", mission: "Mô đun: chương trình ≥ 6 khối tổng hợp.", hint: "Chia nhỏ theo module/hàm.", rules: { minBlocks: 6 } }
};

const blockly12 = {
  g12_d07: { mode: "sequence", mission: "HTML: ≥ 2 lệnh tuần tự mô phỏng cấu trúc trang.", hint: "Thứ tự các phần tử trang web.", rules: { minChain: 2 } },
  g12_d18: { mode: "project", mission: "Dự án web: ≥ 5 khối tổng hợp HTML/CSS.", hint: "Hoàn thiện trang theo rubric.", rules: { minBlocks: 5 } },
  g12_g29: { mode: "sequence", mission: "Mô phỏng: ≥ 3 bước mô hình hóa bài toán.", hint: "Thiết lập tham số rồi chạy mô phỏng.", rules: { minChain: 3 } },
  g12ict_h28: { mode: "project", mission: "Dự án web ICT: ≥ 5 khối HTML tổng hợp.", hint: "Hoàn thiện trang theo rubric nhánh ứng dụng.", rules: { minBlocks: 5 } }
};

const spreadsheetSteps = [
  { id: "s1", label: "Nhập dữ liệu theo mẫu SGK", hint: "Đúng hàng, cột." },
  { id: "s2", label: "Viết công thức hoặc hàm", hint: "Bắt đầu bằng =." },
  { id: "s3", label: "Định dạng và kiểm tra", hint: "Biểu đồ nếu có." },
  { id: "s4", label: "Lưu tệp", hint: "Đặt tên rõ ràng." }
];

const webSteps = [
  { id: "s1", label: "Tạo/chỉnh file HTML theo SGK", hint: "Cấu trúc đúng thẻ." },
  { id: "s2", label: "Thêm CSS hoặc nội dung", hint: "Kiểm tra trên trình duyệt." },
  { id: "s3", label: "Kiểm tra hiển thị và liên kết", hint: "F12 hoặc xem trước." },
  { id: "s4", label: "Lưu và nộp sản phẩm", hint: "Thư mục dự án gọn." }
];

const pythonSteps = [
  { id: "s1", label: "Đọc đề và viết thuật toán", hint: "Ghi pseudocode." },
  { id: "s2", label: "Viết code Python theo SGK", hint: "Chạy thử từng phần." },
  { id: "s3", label: "Kiểm thử với test case", hint: "Sửa lỗi nếu có." },
  { id: "s4", label: "Lưu file .py và nộp", hint: "Tên file có nghĩa." }
];

const sqlPracticeSteps = [
  { id: "s1", label: "Thiết kế/xác định cấu trúc bảng", hint: "Khóa chính, khóa ngoại." },
  { id: "s2", label: "Tạo hoặc cập nhật CSDL theo SGK", hint: "Đúng kiểu dữ liệu từng trường." },
  { id: "s3", label: "Truy vấn và kiểm tra kết quả", hint: "SELECT/JOIN nếu có." },
  { id: "s4", label: "Lưu hoặc sao lưu dữ liệu", hint: "Backup trước khi sửa." }
];

const networkSteps = [
  { id: "s1", label: "Xác định thiết bị và topology", hint: "Router, switch, AP theo sơ đồ." },
  { id: "s2", label: "Cấu hình hoặc mô phỏng kết nối", hint: "IP, dây/cáp hoặc Wi-Fi." },
  { id: "s3", label: "Kiểm tra chia sẻ tài nguyên", hint: "Ping, truy cập tệp/máy in." },
  { id: "s4", label: "Ghi chú và nộp báo cáo", hint: "Sơ đồ + kết quả thử." }
];

const dataScienceSteps = [
  { id: "s1", label: "Thu thập/chuẩn bị dữ liệu mẫu", hint: "CSV hoặc bảng theo SGK." },
  { id: "s2", label: "Phân tích hoặc trực quan hóa", hint: "Biểu đồ, thống kê cơ bản." },
  { id: "s3", label: "Rút ra nhận xét/tri thức", hint: "So sánh với giả thuyết." },
  { id: "s4", label: "Lưu sản phẩm và trình bày", hint: "File hoặc slide ngắn." }
];

const mediaProjectSteps = [
  { id: "s1", label: "Chuẩn bị ảnh/clip theo kịch bản", hint: "Đúng định dạng, bản quyền." },
  { id: "s2", label: "Chỉnh sửa trên phần mềm SGK", hint: "Lớp, màu, cắt ghép." },
  { id: "s3", label: "Xem trước và chỉnh theo góp ý", hint: "Âm thanh vừa phải." },
  { id: "s4", label: "Xuất file và nộp sản phẩm", hint: "Định dạng giáo viên yêu cầu." }
];

const grades = [
  {
    grade: 8,
    source: "Bám sát SGK Tin học 8 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.",
    lessons: grade8Lessons,
    theoryOnly: new Set(["g8_c04", "g8_f16"]),
    blocklyLabs: blockly8,
    checklistSteps: {
      g8_d05: spreadsheetSteps,
      g8_d06: spreadsheetSteps,
      g8_d07: spreadsheetSteps
    },
    quizExtras: {
      g8_a01: { q1: { q: "Máy tính hiện đại thuộc thế hệ công cụ tính:", choices: ["Điện tử", "Cơ học thuần túy", "Chỉ dùng giấy", "Không cần điện"], a: "Điện tử" } },
      g8_c04: { q2: { q: "Sử dụng công nghệ số cần tôn trọng bản quyền và văn hóa số.", a: "Đúng" } }
    },
    gradeErrors: [
      { skill: "g8_c04", pattern: "sao", errorType: "copyright", title: "Sao chép tài liệu số trái phép", message: "Dùng ảnh/nhạc không phép vi phạm bản quyền.", hint: "Chỉ dùng tài nguyên được phép.", recommendation: "g8_c04" },
      { skill: "g8_e15", pattern: "loi", errorType: "debug", title: "Chưa gỡ lỗi chương trình", message: "Chương trình chạy sai do thiếu bước kiểm tra.", hint: "Chạy thử từng khối và sửa logic.", recommendation: "g8_e15" }
    ],
    streamsFn: thcsStreams
  },
  {
    grade: 9,
    source: "Bám sát SGK Tin học 9 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.",
    lessons: grade9Lessons,
    theoryOnly: new Set(["g9_c04", "g9_f17"]),
    blocklyLabs: blockly9,
    checklistSteps: {
      g9_d13a: spreadsheetSteps,
      g9_d10a: spreadsheetSteps,
      g9_d11a: spreadsheetSteps,
      g9_d12a: spreadsheetSteps
    },
    quizExtras: {
      g9_c04: { q1: { q: "Sử dụng dịch vụ Internet cần tuân thủ:", choices: ["Pháp luật và quy định", "Không cần quy tắc", "Chỉ khi bị phạt", "Tùy ý"], a: "Pháp luật và quy định" } },
      g9_d12a: { q1: { q: "Hàm IF trong Excel dùng để:", choices: ["Rẽ nhánh theo điều kiện", "In tài liệu", "Tắt máy", "Gõ văn bản"], a: "Rẽ nhánh theo điều kiện" } }
    },
    gradeErrors: [
      { skill: "g9_b03", pattern: "tin", errorType: "info_quality", title: "Tin giả trên mạng", message: "Chia sẻ thông tin chưa kiểm chứng gây hiểu lầm.", hint: "Đối chiếu nhiều nguồn uy tín.", recommendation: "g9_b03" },
      { skill: "g9_e16", pattern: "thuat", errorType: "algorithm", title: "Thuật toán chưa đầy đủ", message: "Thiếu bước khiến chương trình không giải được bài toán.", hint: "Liệt kê đủ bước trước khi lập trình.", recommendation: "g9_e16" }
    ],
    streamsFn: thcsStreams
  },
  {
    grade: 10,
    source: "Bám sát SGK Tin học 10 - Kết nối tri thức với cuộc sống; nội dung tự biên soạn cho ITFlow.",
    lessons: grade10Lessons,
    theoryOnly: new Set(["g10_c11", "g10_f33", "g10_f34"]),
    blocklyLabs: blockly10,
    checklistSteps: Object.fromEntries(
      grade10Lessons
        .filter(([id]) => id.startsWith("g10_e") && !blockly10[id])
        .map(([id]) => [id, pythonSteps])
    ),
    quizExtras: {
      g10_a04: { q1: { q: "Hệ nhị phân dùng các chữ số:", choices: ["0 và 1", "0 đến 9", "A đến F only", "1 và 2"], a: "0 và 1" } },
      g10_e19: { q1: { q: "Câu lệnh if trong Python dùng để:", choices: ["Rẽ nhánh", "In ra màn hình", "Tắt máy", "Lưu file"], a: "Rẽ nhánh" } }
    },
    gradeErrors: [
      { skill: "g10_b09", pattern: "mat", errorType: "security", title: "Lộ mật khẩu", message: "Chia sẻ mật khẩu khiến tài khoản bị xâm nhập.", hint: "Dùng mật khẩu mạnh, bật xác thực 2 lớp.", recommendation: "g10_b09" },
      { skill: "g10_e29", pattern: "syntax", errorType: "python", title: "Lỗi cú pháp Python", message: "Thiếu dấu : hoặc thụt lề sai gây SyntaxError.", hint: "Đọc traceback và sửa dòng báo lỗi.", recommendation: "g10_e29" }
    ],
    streamsFn: thptStreams
  },
  {
    grade: 11,
    source:
      "Bám sát SGK Tin học 11 - Kết nối tri thức (16 bài chung + nhánh Khoa học máy tính / Tin học ứng dụng); nội dung tự biên soạn cho ITFlow.",
    lessons: grade11Lessons,
    theoryOnly: new Set(["g11_c09", "g11_e16"]),
    blocklyLabs: blockly11,
    checklistSteps: {
      g11_d14: [
        { id: "s1", label: "Viết câu SELECT đơn giản", hint: "Chọn trường cần hiển thị." },
        { id: "s2", label: "Thử INSERT/UPDATE trên bảng mẫu", hint: "Sao lưu trước khi sửa." },
        { id: "s3", label: "Kiểm tra kết quả truy vấn", hint: "So với yêu cầu SGK." }
      ],
      ...Object.fromEntries(
        grade11Lessons.filter(([id]) => id.startsWith("g11_f") && !blockly11[id]).map(([id]) => [id, pythonSteps])
      ),
      ...Object.fromEntries(
        grade11Lessons.filter(([id]) => id.startsWith("g11ict_g") && Number(id.slice(-2)) <= 24).map(([id]) => [id, sqlPracticeSteps])
      ),
      ...Object.fromEntries(
        grade11Lessons.filter(([id]) => id.startsWith("g11ict_g") && Number(id.slice(-2)) >= 25).map(([id]) => [id, mediaProjectSteps])
      )
    },
    quizExtras: {
      g11_d11: { q1: { q: "Cơ sở dữ liệu là:", choices: ["Tập dữ liệu có tổ chức", "Một phần mềm game", "Loại virus", "Cáp mạng"], a: "Tập dữ liệu có tổ chức" } },
      g11_f24: { q1: { q: "O(n) mô tả thuật toán:", choices: ["Tuyến tính theo n", "Luôn cố định", "Không phụ thuộc dữ liệu", "Chỉ dùng cho mạng"], a: "Tuyến tính theo n" } },
      g11ict_g20: {
        q1: {
          q: "Khóa ngoại trong CSDL dùng để:",
          choices: ["Liên kết hai bảng", "Tăng tốc Internet", "Gõ văn bản", "In ấn"],
          a: "Liên kết hai bảng"
        }
      },
      g11ict_g31: {
        q1: {
          q: "Xuất phim hoạt hình cần:",
          choices: ["Kiểm tra âm hình và định dạng file", "Chỉ lưu ảnh tĩnh", "Không cần xem trước", "Bỏ qua bản quyền nhạc"],
          a: "Kiểm tra âm hình và định dạng file"
        }
      }
    },
    gradeErrors: [
      { skill: "g11_d14", pattern: "sql", errorType: "database", title: "Câu SQL sai cú pháp", message: "SELECT thiếu FROM hoặc sai tên bảng.", hint: "Kiểm tra tên bảng và trường.", recommendation: "g11_d14" },
      { skill: "g11_f24", pattern: "on2", errorType: "complexity", title: "Chọn thuật toán chưa tối ưu", message: "Thuật toán O(n²) có thể chậm với dữ liệu lớn.", hint: "Cân nhắc thuật toán O(n log n).", recommendation: "g11_f24" },
      {
        skill: "g11ict_g20",
        pattern: "khoa",
        errorType: "database",
        title: "Thiết kế khóa ngoại sai",
        message: "Khóa ngoại trỏ sai bảng hoặc kiểu dữ liệu không khớp.",
        hint: "Khóa ngoại phải tham chiếu khóa chính bảng liên quan.",
        recommendation: "g11ict_g20"
      },
      {
        skill: "g11ict_g24",
        pattern: "sao",
        errorType: "backup",
        title: "Chưa sao lưu trước khi sửa CSDL",
        message: "Mất dữ liệu khi cập nhật/xóa mà không có bản backup.",
        hint: "Sao lưu CSDL trước thao tác quan trọng.",
        recommendation: "g11ict_g24"
      }
    ],
    streamsFn: thptStreams
  },
  {
    grade: 12,
    source:
      "Bám sát SGK Tin học 12 - Kết nối tri thức (21 bài chung + nhánh Khoa học máy tính / Tin học ứng dụng); nội dung tự biên soạn cho ITFlow.",
    lessons: grade12Lessons,
    theoryOnly: new Set(["g12_c06", "g12_e19", "g12_e20", "g12_e21", "g12_g25", "g12_g26"]),
    blocklyLabs: blockly12,
    checklistSteps: {
      ...Object.fromEntries(
        grade12Lessons
          .filter(([id]) => id.startsWith("g12_d") && !blockly12[id])
          .map(([id]) => [id, webSteps])
      ),
      ...Object.fromEntries(
        grade12Lessons.filter(([id]) => id.startsWith("g12_f")).map(([id]) => [id, networkSteps])
      ),
      ...Object.fromEntries(
        grade12Lessons
          .filter(([id]) => id.startsWith("g12_g") && !blockly12[id])
          .map(([id]) => [id, dataScienceSteps])
      ),
      ...Object.fromEntries(
        grade12Lessons
          .filter(([id]) => id.startsWith("g12ict_h") && !blockly12[id])
          .map(([id]) => [id, webSteps])
      )
    },
    quizExtras: {
      g12_a01: { q1: { q: "Trí tuệ nhân tạo (AI) là:", choices: ["Máy mô phỏng trí thông minh", "Loại virus", "Phần cứng in ấn", "Cáp mạng"], a: "Máy mô phỏng trí thông minh" } },
      g12_d07: { q1: { q: "HTML dùng để:", choices: ["Đánh dấu cấu trúc trang web", "Thay thế hoàn toàn CSS", "Cài HĐH", "Quét virus"], a: "Đánh dấu cấu trúc trang web" } },
      g12_f22: { q1: { q: "Router trong mạng LAN dùng để:", choices: ["Định tuyến gói dữ liệu", "In ấn tài liệu", "Gõ văn bản", "Quét virus"], a: "Định tuyến gói dữ liệu" } },
      g12_g25: { q1: { q: "Học máy cần:", choices: ["Dữ liệu huấn luyện và mô hình", "Chỉ cần cáp mạng", "Không cần dữ liệu", "Chỉ phần mềm văn phòng"], a: "Dữ liệu huấn luyện và mô hình" } },
      g12ict_g22: {
        q1: {
          q: "Bluetooth dùng để:",
          choices: ["Kết nối thiết bị gần không dây", "Thay thế hoàn toàn Internet", "Cài HĐH", "Lưu file trên cloud"],
          a: "Kết nối thiết bị gần không dây"
        }
      },
      g12ict_h28: {
        q1: {
          q: "Hoàn thiện website cần:",
          choices: ["Kiểm tra liên kết, form và hiển thị", "Chỉ lưu file .txt", "Bỏ qua CSS", "Không cần xem trước"],
          a: "Kiểm tra liên kết, form và hiển thị"
        }
      }
    },
    gradeErrors: [
      { skill: "g12_b04", pattern: "http", errorType: "network", title: "Nhầm giao thức mạng", message: "HTTP dùng cho web; không phải mọi dịch vụ dùng HTTP.", hint: "Phân biệt HTTP, HTTPS, TCP/IP.", recommendation: "g12_b04" },
      { skill: "g12_d17", pattern: "css", errorType: "web", title: "CSS không áp dụng đúng", message: "Selector sai hoặc bị ghi đè bởi rule khác.", hint: "Kiểm tra specificity và thứ tự CSS.", recommendation: "g12_d17" },
      {
        skill: "g12_f24",
        pattern: "topology",
        errorType: "network",
        title: "Thiết kế mạng thiếu thiết bị",
        message: "Sơ đồ LAN thiếu router hoặc switch trung tâm.",
        hint: "Mỗi mạng LAN cần điểm kết nối và định tuyến hợp lý.",
        recommendation: "g12_f24"
      },
      {
        skill: "g12_g28",
        pattern: "data",
        errorType: "analysis",
        title: "Phân tích dữ liệu thiếu bước làm sạch",
        message: "Kết quả sai do dữ liệu thô chưa được lọc/chuẩn hóa.",
        hint: "Làm sạch dữ liệu trước khi trích rút tri thức.",
        recommendation: "g12_g28"
      },
      {
        skill: "g12ict_h27",
        pattern: "form",
        errorType: "web",
        title: "Biểu mẫu HTML thiếu thuộc tính",
        message: "Input thiếu name hoặc form không có action/method.",
        hint: "Mỗi trường form cần name; kiểm tra nút submit.",
        recommendation: "g12ict_h27"
      }
    ],
    streamsFn: thptStreams
  }
];

export const gradeConfigs = grades;

export async function runGrades(gradeNums) {
  const set = new Set(gradeNums);
  for (const cfg of grades.filter((g) => set.has(g.grade))) {
    const built = buildGradeContent(cfg);
    await writeGradeContent(cfg.grade, built);
  }
}

const invoked = process.argv[1]?.endsWith("generate-grades-8-12-content.mjs");
if (invoked) {
  const args = process.argv.slice(2).map(Number).filter((n) => n >= 8 && n <= 12);
  await runGrades(args.length ? args : grades.map((g) => g.grade));
}
