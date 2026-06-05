export function collectBlockInfo(workspace) {
  const blocks = workspace.getAllBlocks(false).filter((b) => !b.isShadow());
  const types = new Set(blocks.map((b) => b.type));
  return { blocks, types, count: blocks.length };
}

function hasStartConnected(workspace) {
  const start = workspace.getBlocksByType("it_start", false)[0];
  if (!start) return false;
  return Boolean(start.getNextBlock());
}

function countStatementChain(startBlock) {
  let n = 0;
  let current = startBlock?.getNextBlock();
  while (current) {
    if (!current.isShadow()) n += 1;
    current = current.getNextBlock();
  }
  return n;
}

function findRepeatMinTimes(workspace, minTimes) {
  const repeats = workspace.getBlocksByType("controls_repeat_ext", false);
  return repeats.some((block) => {
    const timesBlock = block.getInputTargetBlock("TIMES");
    if (!timesBlock || timesBlock.type !== "math_number") return false;
    return Number(timesBlock.getFieldValue("NUM")) >= minTimes;
  });
}

export function validateBlocklyChallenge(mode, workspace, rules = {}) {
  const { types, count } = collectBlockInfo(workspace);

  if (!types.has("it_start")) {
    return { ok: false, message: "Thiếu khối «Khi bấm Chạy». Kéo khối này vào vùng làm việc." };
  }

  if (!hasStartConnected(workspace)) {
    return { ok: false, message: "Ghép ít nhất một lệnh ngay dưới «Khi bấm Chạy»." };
  }

  const start = workspace.getBlocksByType("it_start", false)[0];
  const chainLen = countStatementChain(start);

  switch (mode) {
    case "sequence": {
      if (chainLen < (rules.minChain || 2)) {
        return { ok: false, message: `Cần ít nhất ${rules.minChain || 2} lệnh nối tiếp (tuần tự).` };
      }
      if (!types.has("it_say") && !types.has("it_move")) {
        return { ok: false, message: "Thêm khối «Nói» hoặc «Tiến» để thể hiện thuật toán tuần tự." };
      }
      return { ok: true, message: "Đúng cấu trúc tuần tự! Các lệnh chạy lần lượt từ trên xuống." };
    }
    case "loop":
    case "loop_practice": {
      if (!types.has("controls_repeat_ext")) {
        return { ok: false, message: "Thêm khối «Lặp lại … lần» (cấu trúc lặp)." };
      }
      const minTimes = rules.minRepeatTimes || 3;
      if (!findRepeatMinTimes(workspace, minTimes)) {
        return { ok: false, message: `Đặt số lần lặp ≥ ${minTimes} trong khối lặp.` };
      }
      const inner = workspace.getBlocksByType("controls_repeat_ext", false)[0]?.getInputTargetBlock("DO");
      if (!inner) {
        return { ok: false, message: "Đặt ít nhất một lệnh bên trong thân vòng lặp." };
      }
      return { ok: true, message: "Đã dùng cấu trúc lặp đúng!" };
    }
    case "branch": {
      if (!types.has("controls_if")) {
        return { ok: false, message: "Thêm khối «Nếu … thì» (rẽ nhánh)." };
      }
      const ifBlock = workspace.getBlocksByType("controls_if", false)[0];
      if (!ifBlock?.getInputTargetBlock("DO0")) {
        return { ok: false, message: "Thêm lệnh trong nhánh «thì» của khối Nếu." };
      }
      return { ok: true, message: "Đã dùng cấu trúc rẽ nhánh!" };
    }
    case "variables": {
      if (!types.has("variables_set")) {
        return { ok: false, message: "Dùng khối «Gán …» để tạo hoặc cập nhật biến." };
      }
      if (!types.has("variables_get")) {
        return { ok: false, message: "Dùng khối đọc biến khi cần lấy giá trị đã lưu." };
      }
      return { ok: true, message: "Đã sử dụng biến trong chương trình!" };
    }
    case "expressions": {
      if (!types.has("math_arithmetic")) {
        return { ok: false, message: "Thêm phép tính (+, −, ×, ÷) bằng khối biểu thức." };
      }
      if (!types.has("variables_set") && !types.has("it_say")) {
        return { ok: false, message: "Gán kết quả biểu thức vào biến hoặc hiển thị bằng «Nói»." };
      }
      return { ok: true, message: "Đã dùng biểu thức trong chương trình!" };
    }
    case "project": {
      const labels = {
        controls_repeat_ext: "lặp",
        controls_if: "rẽ nhánh",
        variables_set: "gán biến"
      };
      const need = ["controls_repeat_ext", "controls_if", "variables_set"];
      const missing = need.filter((t) => !types.has(t));
      if (missing.length) {
        return {
          ok: false,
          message: `Kịch bản cần lặp, rẽ nhánh và biến. Còn thiếu: ${missing.map((t) => labels[t]).join(", ")}.`
        };
      }
      if (count < (rules.minBlocks || 6)) {
        return { ok: false, message: "Chương trình còn quá ngắn — thêm lệnh cho đủ kịch bản." };
      }
      return { ok: true, message: "Chương trình đủ cấu trúc — tốt!" };
    }
    default:
      return { ok: count >= 2, message: count >= 2 ? "Đã có chương trình." : "Thêm thêm khối lệnh." };
  }
}
