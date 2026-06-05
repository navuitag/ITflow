/** Mô phỏng chạy thử chương trình khối (canvas + nhật ký). */
export function createSimulator(canvas) {
  const ctx = canvas.getContext("2d");
  const logEl = document.querySelector("#blocklyLog");
  const state = { x: canvas.width / 2, y: canvas.height / 2, angle: 0, running: false };

  const log = (msg) => {
    if (!logEl) return;
    const line = document.createElement("div");
    line.className = "blockly-log-line";
    line.textContent = msg;
    logEl.append(line);
    logEl.scrollTop = logEl.scrollHeight;
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e0f2fe";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(state.x, state.y);
    ctx.rotate((state.angle * Math.PI) / 180);
    ctx.fillStyle = "#0891b2";
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(-14, 12);
    ctx.lineTo(-14, -12);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const evalNumber = (block, inputName, fallback = 0) => {
    if (!block) return fallback;
    const child = block.getInputTargetBlock(inputName);
    if (!child) return fallback;
    if (child.type === "math_number") return Number(child.getFieldValue("NUM")) || fallback;
    if (child.type === "variables_get") return variables[child.getFieldValue("VAR")] ?? 0;
    return fallback;
  };

  const variables = {};

  async function runChain(first) {
    let block = first;
    while (block && state.running) {
      await runOne(block);
      block = block.getNextBlock();
    }
  }

  async function runOne(block) {
    if (!block || state.running === false) return;
    switch (block.type) {
      case "it_say": {
        const textBlock = block.getInputTargetBlock("TEXT");
        const text = textBlock?.getFieldValue("TEXT") || "...";
        log(`💬 Nói: ${text}`);
        await delay(400);
        break;
      }
      case "it_move": {
        const steps = evalNumber(block, "STEPS", 10);
        const rad = (state.angle * Math.PI) / 180;
        state.x += Math.cos(rad) * steps;
        state.y += Math.sin(rad) * steps;
        log(`➡️ Tiến ${steps} bước`);
        draw();
        await delay(350);
        break;
      }
      case "it_turn": {
        const deg = evalNumber(block, "DEG", 90);
        state.angle += deg;
        log(`↻ Quay ${deg}°`);
        draw();
        await delay(300);
        break;
      }
      case "it_wait": {
        const sec = Math.min(3, evalNumber(block, "SEC", 1));
        log(`⏱ Chờ ${sec}s`);
        await delay(sec * 400);
        break;
      }
      case "controls_repeat_ext": {
        const times = evalNumber(block, "TIMES", 2);
        const body = block.getInputTargetBlock("DO");
        for (let i = 0; i < times && state.running; i += 1) {
          log(`🔁 Lặp ${i + 1}/${times}`);
          await runChain(body);
        }
        return;
      }
      case "controls_if": {
        const cond = block.getInputTargetBlock("IF0");
        let result = false;
        if (cond?.type === "logic_compare") {
          const a = evalNumber(cond, "A", 0);
          const b = evalNumber(cond, "B", 0);
          const op = cond.getFieldValue("OP");
          result = op === "EQ" ? a === b : op === "GT" ? a > b : op === "LT" ? a < b : false;
        }
        log(result ? "✓ Điều kiện đúng" : "✗ Điều kiện sai");
        if (result) await runChain(block.getInputTargetBlock("DO0"));
        break;
      }
      case "variables_set": {
        const name = block.getFieldValue("VAR") || "biến";
        variables[name] = evalNumber(block, "VALUE", 0);
        log(`📦 Gán ${name} = ${variables[name]}`);
        await delay(250);
        break;
      }
      default:
        break;
    }
  }

  return {
    reset() {
      state.x = canvas.width / 2;
      state.y = canvas.height / 2;
      state.angle = 0;
      state.running = false;
      Object.keys(variables).forEach((k) => delete variables[k]);
      if (logEl) logEl.innerHTML = "";
      draw();
    },
    async run(workspace) {
      this.reset();
      state.running = true;
      draw();
      const start = workspace.getBlocksByType("it_start", false)[0];
      if (!start?.getNextBlock()) {
        log("Chưa có lệnh nào sau «Khi bấm Chạy».");
        state.running = false;
        return;
      }
      log("▶ Bắt đầu chạy thử…");
      await runChain(start.getNextBlock());
      log("■ Kết thúc.");
      state.running = false;
    },
    stop() {
      state.running = false;
    }
  };
}
