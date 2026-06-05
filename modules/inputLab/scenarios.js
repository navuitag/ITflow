/** Cấu hình mô phỏng theo skill (chuột & bàn phím). */
export const SKILL_SIMULATORS = {
  g1_a04: { type: "mouse", scenario: "shutdown", instruction: "Nháy nút Bật máy, mở menu Start rồi chọn Tắt máy." },
  g1_b05: { type: "mouse", scenario: "click_targets", instruction: "Di chuyển chuột và nháy vào 3 biểu tượng trên màn hình.", targetCount: 3 },
  g1_b06: { type: "mouse", scenario: "double_click", instruction: "Nháy đúp vào biểu tượng để mở chương trình." },
  g1_b07: { type: "mouse", scenario: "click_targets", instruction: "Nháy nhanh vào các hình nhỏ xuất hiện (luyện mắt–tay).", targetCount: 5 },
  g1_b08: { type: "mouse", scenario: "scroll_reveal", instruction: "Cuộn danh sách xuống và nháy vào mục ẩn phía dưới." },
  g1_b09: { type: "mouse", scenario: "drag_drop", instruction: "Kéo mảnh ghép vào đúng vị trí trên khung." },
  g1_b10: { type: "mouse", scenario: "click_sequence", instruction: "Nháy các ô theo đúng thứ tự 1 → 2 → 3." },
  g1_c11: { type: "keyboard", scenario: "press_keys", instruction: "Gõ phím F và J để đặt tay lên hàng cơ sở.", keys: ["f", "j"] },
  g1_c12: { type: "keyboard", scenario: "type_sequence", instruction: "Gõ dãy: ff jj dd kk", text: "ffjjddkk" },
  g1_c13: { type: "keyboard", scenario: "type_capital", instruction: "Giữ Shift và gõ chữ e, rồi gõ m (như tên Em).", text: "em" },
  g1_c14: { type: "keyboard", scenario: "type_word", instruction: "Gõ từ «lop1» không dấu.", text: "lop1" },
  g1_c16: { type: "keyboard", scenario: "type_sequence", instruction: "Ôn hàng cơ sở: asdfjkl;", text: "asdfjkl;" },
  g2_a02: { type: "mouse", scenario: "mouse_trainer", instruction: "Luyện nháy 3 lần, nháy đúp 1 lần và kéo thả 1 lần." },
  g2_a03: { type: "mouse", scenario: "open_close", instruction: "Nháy đúp mở cửa sổ phần mềm, rồi nháy nút X để đóng." },
  g2_b05: { type: "mouse", scenario: "paint_colors", instruction: "Chọn 3 màu và nháy lên vùng vẽ để tô." },
  g2_b14: { type: "mouse", scenario: "drag_drop", instruction: "Kéo hình khối vào khung mẫu." },
  g2_b15: { type: "keyboard", scenario: "type_word", instruction: "Dùng công cụ chữ: gõ «hoa».", text: "hoa" },
  g2_c06: { type: "keyboard", scenario: "type_sequence", instruction: "Rapid Typing — gõ hàng cơ sở: ffjjddkk", text: "ffjjddkk" },
  g2_c07: { type: "keyboard", scenario: "type_word", instruction: "Gõ từ «lop2» chậm nhưng đúng.", text: "lop2" },
  g2_c08: { type: "keyboard", scenario: "type_sequence", instruction: "Trò chơi chữ cái: gõ abc", text: "abc" },
  g2_c13: { type: "keyboard", scenario: "type_word", instruction: "Fast Hands: gõ từ tiếng Anh «cat».", text: "cat" },
  g2_d10: { type: "mouse", scenario: "web_search", instruction: "Nháy ô tìm kiếm, gõ từ khóa (bàn phím) và nháy kết quả." },
  g2_d11: { type: "mouse", scenario: "click_play", instruction: "Nháy nút PLAY để bắt đầu trò chơi toán." },
  g2_d12: { type: "mouse", scenario: "click_targets", instruction: "Chọn 4 trò chơi GCompris trên lưới.", targetCount: 4 },
  g2_d16: { type: "mouse", scenario: "review_mix", instruction: "Ôn tập: nháy 2 biểu tượng và gõ «tin».", text: "tin", targetCount: 2 },
  g3_a04: { type: "mouse", scenario: "open_close", instruction: "Nháy đúp mở phần mềm, rồi nháy X để đóng cửa sổ." },
  g3_a05: { type: "keyboard", scenario: "type_word", instruction: "Gõ tên lớp «lop3» và dấu cách.", text: "lop3" },
  g3_b06: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Tìm trên Internet: nháy ô tìm kiếm, gõ «thien» và chọn kết quả.",
    searchKeyword: "thien"
  },
  g3_e13: { type: "mouse", scenario: "mouse_trainer", instruction: "Ôn nháy 3 lần, nháy đúp và kéo thả như SGK bài 13." },
  g4_a02: { type: "keyboard", scenario: "type_word", instruction: "Gõ «lop4» và tên em (chữ thường).", text: "lop4" },
  g4_b03: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Đọc trang web: tìm kiếm «trang web» và nháy kết quả.",
    searchKeyword: "trang"
  },
  g4_c04: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Tìm kiếm và trao đổi: gõ «chia se» và chọn kết quả.",
    searchKeyword: "chia"
  },
  g4_e12b: {
    type: "keyboard",
    scenario: "type_sequence",
    instruction: "Luyện gõ 10 ngón: asdf jkl;",
    text: "asdfjkl;"
  },
  g4_f13: { type: "mouse", scenario: "click_play", instruction: "Chơi với máy tính: nháy PLAY để bắt đầu trò chơi." },
  g6_a03: { type: "keyboard", scenario: "type_word", instruction: "Thông tin số: gõ «lop6» (chữ thường).", text: "lop6" },
  g6_b05: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Internet: tìm «mang may tinh» và nháy kết quả.",
    searchKeyword: "mang"
  },
  g6_c07: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Tìm kiếm thông tin: gõ «tin hoc 6» và chọn kết quả.",
    searchKeyword: "tin"
  },
  g6_c08: {
    type: "keyboard",
    scenario: "type_word",
    instruction: "Soạn email: gõ tiêu đề «chao thay» (không dấu).",
    text: "chao thay"
  },
  g6_e13: {
    type: "keyboard",
    scenario: "type_sequence",
    instruction: "Tìm/thay thế: gõ lại cụm «sổ lưu niệm» → «soluunien».",
    text: "soluunien"
  },
  g7_a01: {
    type: "mouse",
    scenario: "click_targets",
    instruction: "Thiết bị vào–ra: nháy 4 biểu tượng (bàn phím, chuột, màn hình, loa).",
    targetCount: 4
  },
  g7_a03: { type: "keyboard", scenario: "type_word", instruction: "Quản lí dữ liệu: gõ «lop7» (chữ thường).", text: "lop7" },
  g7_b04: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Mạng xã hội: tìm «mang xa hoi» và chọn kết quả.",
    searchKeyword: "mang"
  },
  g7_d07: {
    type: "keyboard",
    scenario: "type_sequence",
    instruction: "Công thức bảng tính: gõ «=a1+b1».",
    text: "=a1+b1"
  },
  g7_d08: {
    type: "keyboard",
    scenario: "type_word",
    instruction: "Hàm tính tổng: gõ «sum».",
    text: "sum"
  },
  g8_b03: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Khai thác thông tin số: tìm «tin hoc 8» và chọn kết quả.",
    searchKeyword: "tin"
  },
  g9_d06: { type: "mouse", scenario: "click_play", instruction: "Phần mềm mô phỏng: nháy PLAY để chạy thí nghiệm." },
  g10_a07: { type: "keyboard", scenario: "type_word", instruction: "Thiết bị số: gõ «lop10».", text: "lop10" },
  g10_b10: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Khai thác Internet: tìm «tai nguyen» và chọn kết quả.",
    searchKeyword: "tai"
  },
  g11_b07: {
    type: "mouse",
    scenario: "web_search",
    instruction: "Tìm kiếm nâng cao: gõ «sql» và chọn kết quả.",
    searchKeyword: "sql"
  },
  g11ict_g29: {
    type: "mouse",
    scenario: "click_play",
    instruction: "Phần mềm làm phim: nháy PLAY để xem trước timeline."
  },
  g12_d08: {
    type: "keyboard",
    scenario: "type_word",
    instruction: "HTML: gõ thẻ «p» (chữ thường).",
    text: "p"
  },
  g12ict_g22: {
    type: "mouse",
    scenario: "click_targets",
    instruction: "Kết nối thiết bị số: nháy 3 biểu tượng (điện thoại, loa, cảm biến).",
    targetCount: 3
  },
  g12_g30: {
    type: "mouse",
    scenario: "click_play",
    instruction: "Mô phỏng giáo dục: nháy PLAY để chạy thí nghiệm."
  }
};

export function resolveSimulator(lab) {
  if (lab?.simulator) return lab.simulator;
  return SKILL_SIMULATORS[lab?.skill] || null;
}
