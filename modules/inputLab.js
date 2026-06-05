import { resolveSimulator } from "./inputLab/scenarios.js";
import { getState, updateState } from "../assets/js/state.js";

let activeController = null;

export function isInputLab(lab) {
  if (lab?.type === "mouse" || lab?.type === "keyboard") return true;
  const sim = resolveSimulator(lab);
  return sim?.type === "mouse" || sim?.type === "keyboard";
}

export function renderInputLab(lab, skill, escapeHtml) {
  const sim = resolveSimulator(lab);
  const tag = sim.type === "mouse" ? "Chuột" : "Bàn phím";
  const isMouse = sim.type === "mouse";

  return `
    <section class="input-lab">
      <header class="input-lab-head">
        <a class="back-link" href="#/quiz/${lab.skill}">← Quiz</a>
        <span class="tag tag-cs">Mô phỏng · ${escapeHtml(tag)}</span>
        <h1>${escapeHtml(lab.title)}</h1>
        <p class="input-lab-mission">${escapeHtml(sim.instruction)}</p>
      </header>
      <div class="input-lab-body">
        ${isMouse ? `<div class="input-desktop" id="inputDesktop" aria-label="Màn hình mô phỏng">
          <div class="input-cursor" id="inputCursor" aria-hidden="true">🖱</div>
        </div>` : `<div class="input-keyboard-panel" id="inputKeyboardPanel" tabindex="0" aria-label="Vùng luyện gõ bàn phím">
          <p class="input-lab-mission">Nhấn phím trên bàn phím thật (hoặc chạm phím ảo).</p>
          <div class="input-prompt" id="inputPrompt"></div>
          <div class="input-typed" id="inputTyped"></div>
          <div class="input-keyboard" id="inputKeyboard"></div>
        </div>`}
        <aside class="input-lab-side">
          <strong>Tiến độ</strong>
          <ul class="input-task-list" id="inputTaskList"></ul>
          <div class="input-feedback" id="inputFeedback" aria-live="polite"></div>
          <button type="button" class="btn primary" id="inputComplete" disabled>
            Hoàn thành thực hành (+${lab.xp} XP)
          </button>
        </aside>
      </div>
    </section>`;
}

function markPassed(lab) {
  updateState((state) => {
    if (!state.labProgress) state.labProgress = {};
    state.labProgress[lab.id] = { passed: true, done: ["sim_pass"] };
  });
}

function setFeedback(el, text, ok = false) {
  if (!el) return;
  el.textContent = text;
  el.classList.toggle("is-ok", ok);
  el.classList.toggle("is-warn", Boolean(text) && !ok);
}

function updateTasks(listEl, tasks) {
  if (!listEl) return;
  listEl.innerHTML = tasks
    .map((t) => `<li class="${t.done ? "is-done" : ""}">${t.label}</li>`)
    .join("");
}

function allDone(tasks) {
  return tasks.length > 0 && tasks.every((t) => t.done);
}

function bindCursor(desktop, cursor) {
  const move = (clientX, clientY) => {
    const rect = desktop.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  };

  desktop.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  desktop.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches[0]) {
        e.preventDefault();
        move(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: false }
  );
}

function placeIcons(desktop, count) {
  const glyphs = ["📁", "🎮", "🎨", "📚", "⭐"];
  const positions = [
    [24, 24],
    [100, 40],
    [180, 28],
    [260, 50],
    [320, 30],
    [60, 100],
    [150, 90],
    [240, 110]
  ];
  return Array.from({ length: count }, (_, i) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "input-icon";
    el.dataset.icon = String(i);
    const [left, top] = positions[i % positions.length];
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    el.innerHTML = `<span class="glyph">${glyphs[i % glyphs.length]}</span><span>App ${i + 1}</span>`;
    desktop.appendChild(el);
    return el;
  });
}

function createMouseController(lab, sim, elements) {
  const { desktop, taskList, feedback, completeBtn } = elements;
  const cursor = desktop.querySelector("#inputCursor");
  bindCursor(desktop, cursor);

  const tasks = [];
  let state = {};

  const refresh = () => {
    updateTasks(taskList, tasks);
    const done = allDone(tasks);
    completeBtn.disabled = !done;
    if (done) {
      setFeedback(feedback, "Tuyệt vời! Em đã hoàn thành mô phỏng.", true);
      markPassed(lab);
    }
  };

  const hitTask = (id, label) => {
    const t = tasks.find((x) => x.id === id);
    if (t && !t.done) {
      t.done = true;
      setFeedback(feedback, `✓ ${label}`);
      refresh();
    }
  };

  switch (sim.scenario) {
    case "shutdown": {
      tasks.push(
        { id: "power", label: "Bật máy", done: false },
        { id: "start", label: "Mở menu Start", done: false },
        { id: "off", label: "Chọn Tắt máy", done: false }
      );
      const power = document.createElement("button");
      power.type = "button";
      power.className = "input-power-btn";
      power.textContent = "⏻ Bật máy";
      power.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)";
      desktop.appendChild(power);

      const taskbar = document.createElement("div");
      taskbar.className = "input-taskbar";
      const startBtn = document.createElement("button");
      startBtn.type = "button";
      startBtn.className = "input-start-btn";
      startBtn.textContent = "Start";
      taskbar.appendChild(startBtn);
      desktop.appendChild(taskbar);

      const menu = document.createElement("div");
      menu.className = "input-shutdown-menu";
      const offBtn = document.createElement("button");
      offBtn.type = "button";
      offBtn.className = "input-shutdown-item";
      offBtn.textContent = "Tắt máy";
      menu.appendChild(offBtn);
      desktop.appendChild(menu);

      power.addEventListener("click", () => {
        power.textContent = "💻 Đang chạy";
        hitTask("power", "Bật máy");
      });
      startBtn.addEventListener("click", () => {
        menu.classList.add("is-open");
        hitTask("start", "Mở Start");
      });
      offBtn.addEventListener("click", () => {
        menu.classList.remove("is-open");
        hitTask("off", "Tắt máy");
      });
      break;
    }

    case "click_targets": {
      const count = sim.targetCount || 3;
      tasks.push({ id: "clicks", label: `Nháy ${count} biểu tượng`, done: false });
      const icons = placeIcons(desktop, count);
      const clicked = new Set();
      icons.forEach((icon) => {
        icon.addEventListener("click", () => {
          icon.classList.add("is-hit");
          clicked.add(icon.dataset.icon);
          if (clicked.size >= count) hitTask("clicks", `Đủ ${count} lần nháy`);
        });
      });
      break;
    }

    case "double_click": {
      tasks.push({ id: "dbl", label: "Nháy đúp mở chương trình", done: false });
      const icon = placeIcons(desktop, 1)[0];
      icon.style.left = "50%";
      icon.style.top = "45%";
      icon.style.transform = "translate(-50%, -50%)";
      icon.addEventListener("dblclick", () => {
        icon.classList.add("is-hit");
        icon.innerHTML = '<span class="glyph">✅</span><span>Đã mở</span>';
        hitTask("dbl", "Nháy đúp");
      });
      break;
    }

    case "click_sequence": {
      tasks.push({ id: "seq", label: "Nháy theo thứ tự 1→2→3", done: false });
      let step = 0;
      [1, 2, 3].forEach((n, i) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = `input-seq${i === 0 ? " is-next" : ""}`;
        el.textContent = String(n);
        el.dataset.step = String(n);
        el.style.left = `${40 + i * 70}px`;
        el.style.top = "120px";
        desktop.appendChild(el);
        el.addEventListener("click", () => {
          if (Number(el.dataset.step) !== step + 1) {
            setFeedback(feedback, "Chưa đúng thứ tự — thử lại từ ô 1.", false);
            step = 0;
            desktop.querySelectorAll(".input-seq").forEach((s, idx) => {
              s.classList.toggle("is-next", idx === 0);
              s.classList.remove("is-hit");
            });
            return;
          }
          el.classList.add("is-hit");
          el.classList.remove("is-next");
          step += 1;
          const next = desktop.querySelector(`.input-seq[data-step="${step + 1}"]`);
          next?.classList.add("is-next");
          if (step >= 3) hitTask("seq", "Đúng thứ tự");
        });
      });
      break;
    }

    case "scroll_reveal": {
      tasks.push(
        { id: "scroll", label: "Cuộn xuống cuối danh sách", done: false },
        { id: "pick", label: "Nháy mục cuối", done: false }
      );
      const panel = document.createElement("div");
      panel.className = "input-scroll-panel";
      for (let i = 1; i <= 6; i += 1) {
        const item = document.createElement("button");
        item.type = "button";
        item.className = `input-scroll-item${i === 6 ? " is-hidden-target" : ""}`;
        item.textContent = i === 6 ? "🎯 Mục cần chọn" : `Dòng ${i}`;
        panel.appendChild(item);
        if (i === 6) {
          item.addEventListener("click", () => {
            if (!state.scrolled) {
              setFeedback(feedback, "Cuộn xuống trước khi chọn mục cuối.");
              return;
            }
            item.classList.add("is-hit");
            hitTask("pick", "Chọn mục");
          });
        }
      }
      desktop.appendChild(panel);
      panel.addEventListener("scroll", () => {
        if (panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 8) {
          state.scrolled = true;
          hitTask("scroll", "Cuộn xuống");
        }
      });
      break;
    }

    case "drag_drop": {
      tasks.push({ id: "drag", label: "Kéo thả vào khung", done: false });
      const piece = document.createElement("div");
      piece.className = "input-draggable";
      piece.textContent = "◆ Mảnh ghép";
      piece.style.left = "30px";
      piece.style.top = "80px";
      const zone = document.createElement("div");
      zone.className = "input-drop-zone";
      zone.textContent = "Thả vào đây";
      zone.style.right = "30px";
      zone.style.top = "80px";
      zone.style.width = "120px";
      desktop.appendChild(piece);
      desktop.appendChild(zone);

      let dragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const onPointerDown = (e) => {
        dragging = true;
        piece.classList.add("is-dragging");
        piece.setPointerCapture(e.pointerId);
        const rect = piece.getBoundingClientRect();
        const parent = desktop.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      };

      const onPointerMove = (e) => {
        if (!dragging) return;
        const parent = desktop.getBoundingClientRect();
        piece.style.left = `${e.clientX - parent.left - offsetX}px`;
        piece.style.top = `${e.clientY - parent.top - offsetY}px`;
        const zr = zone.getBoundingClientRect();
        const pr = piece.getBoundingClientRect();
        const over =
          pr.left < zr.right && pr.right > zr.left && pr.top < zr.bottom && pr.bottom > zr.top;
        zone.classList.toggle("is-over", over);
      };

      const onPointerUp = (e) => {
        if (!dragging) return;
        dragging = false;
        piece.classList.remove("is-dragging");
        piece.releasePointerCapture(e.pointerId);
        const zr = zone.getBoundingClientRect();
        const pr = piece.getBoundingClientRect();
        const over =
          pr.left < zr.right && pr.right > zr.left && pr.top < zr.bottom && pr.bottom > zr.top;
        if (over) {
          piece.style.left = `${zone.offsetLeft + 20}px`;
          piece.style.top = `${zone.offsetTop + 20}px`;
          zone.classList.remove("is-over");
          hitTask("drag", "Kéo thả đúng");
        }
      };

      piece.addEventListener("pointerdown", onPointerDown);
      piece.addEventListener("pointermove", onPointerMove);
      piece.addEventListener("pointerup", onPointerUp);
      piece.addEventListener("pointercancel", onPointerUp);
      break;
    }

    case "mouse_trainer": {
      tasks.push(
        { id: "c3", label: "Nháy chuột 3 lần (vào vùng luyện)", done: false },
        { id: "dbl", label: "Nháy đúp 1 lần", done: false },
        { id: "drag", label: "Kéo thả 1 lần", done: false }
      );
      state.clicks = 0;
      const pad = document.createElement("button");
      pad.type = "button";
      pad.className = "input-drop-zone";
      pad.textContent = "Nháy vào đây (0/3)";
      pad.style.cssText = "left:24px;top:60px;width:140px";
      desktop.appendChild(pad);
      pad.addEventListener("click", () => {
        state.clicks += 1;
        pad.textContent = `Nháy vào đây (${state.clicks}/3)`;
        if (state.clicks >= 3) hitTask("c3", "Đủ 3 lần nháy");
      });

      const dbl = placeIcons(desktop, 1)[0];
      dbl.style.left = "200px";
      dbl.style.top = "70px";
      dbl.addEventListener("dblclick", () => hitTask("dbl", "Nháy đúp"));

      const piece = document.createElement("div");
      piece.className = "input-draggable";
      piece.textContent = "Kéo";
      piece.style.left = "280px";
      piece.style.top = "140px";
      const zone = document.createElement("div");
      zone.className = "input-drop-zone";
      zone.textContent = "Thả";
      zone.style.left = "320px";
      zone.style.top = "200px";
      zone.style.width = "80px";
      desktop.appendChild(piece);
      desktop.appendChild(zone);
      let drag = false;
      let ox = 0;
      let oy = 0;
      piece.addEventListener("pointerdown", (e) => {
        drag = true;
        piece.setPointerCapture(e.pointerId);
        const r = piece.getBoundingClientRect();
        ox = e.clientX - r.left;
        oy = e.clientY - r.top;
      });
      piece.addEventListener("pointermove", (e) => {
        if (!drag) return;
        const p = desktop.getBoundingClientRect();
        piece.style.left = `${e.clientX - p.left - ox}px`;
        piece.style.top = `${e.clientY - p.top - oy}px`;
      });
      piece.addEventListener("pointerup", (e) => {
        if (!drag) return;
        drag = false;
        piece.releasePointerCapture(e.pointerId);
        const zr = zone.getBoundingClientRect();
        const pr = piece.getBoundingClientRect();
        if (pr.left < zr.right && pr.right > zr.left && pr.top < zr.bottom && pr.bottom > zr.top) {
          hitTask("drag", "Kéo thả");
        }
      });
      break;
    }

    case "open_close": {
      tasks.push(
        { id: "open", label: "Nháy đúp mở cửa sổ", done: false },
        { id: "close", label: "Nháy X đóng cửa sổ", done: false }
      );
      const icon = placeIcons(desktop, 1)[0];
      icon.style.left = "60px";
      icon.style.top = "50px";
      const win = document.createElement("div");
      win.className = "input-window";
      win.innerHTML = `<div class="input-window-head"><strong>Paint</strong><button type="button" class="input-close-btn">X</button></div><p>Chương trình đang chạy</p>`;
      desktop.appendChild(win);
      icon.addEventListener("dblclick", () => {
        win.classList.add("is-open");
        hitTask("open", "Mở phần mềm");
      });
      win.querySelector(".input-close-btn").addEventListener("click", () => {
        win.classList.remove("is-open");
        hitTask("close", "Đóng cửa sổ");
      });
      break;
    }

    case "paint_colors": {
      tasks.push(
        { id: "colors", label: "Chọn 3 màu", done: false },
        { id: "stroke", label: "Tô vùng vẽ 3 lần", done: false }
      );
      state.colors = new Set();
      state.strokes = 0;
      const bar = document.createElement("div");
      bar.className = "input-paint-bar";
      ["#ef4444", "#3b82f6", "#22c55e", "#eab308"].forEach((color) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "input-color";
        btn.style.background = color;
        btn.dataset.color = color;
        bar.appendChild(btn);
        btn.addEventListener("click", () => {
          bar.querySelectorAll(".input-color").forEach((b) => b.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          state.selected = color;
          state.colors.add(color);
          if (state.colors.size >= 3) hitTask("colors", "Đủ 3 màu");
        });
      });
      desktop.appendChild(bar);
      const canvas = document.createElement("button");
      canvas.type = "button";
      canvas.className = "input-canvas-zone";
      canvas.textContent = "Vùng vẽ — nháy để tô";
      desktop.appendChild(canvas);
      canvas.addEventListener("click", () => {
        if (!state.selected) {
          setFeedback(feedback, "Chọn màu trước khi tô.");
          return;
        }
        state.strokes += 1;
        canvas.style.setProperty("--stroke", state.selected);
        canvas.classList.add("has-stroke");
        canvas.textContent = `Đã tô ${state.strokes}/3`;
        if (state.strokes >= 3) hitTask("stroke", "Tô đủ 3 lần");
      });
      break;
    }

    case "web_search": {
      const keyword = (sim.searchKeyword || "khoa").toLowerCase();
      tasks.push(
        { id: "focus", label: "Nháy ô tìm kiếm", done: false },
        { id: "type", label: `Gõ từ khóa «${keyword}»`, done: false },
        { id: "result", label: "Nháy kết quả", done: false }
      );
      const web = document.createElement("div");
      web.className = "input-web-mock";
      const search = document.createElement("button");
      search.type = "button";
      search.className = "input-search-box";
      search.textContent = "🔍 Tìm kiếm...";
      const result = document.createElement("button");
      result.type = "button";
      result.className = "input-search-result";
      result.textContent = "📘 Chủ đề: Nhà bác học nhí";
      web.appendChild(search);
      web.appendChild(result);
      desktop.appendChild(web);
      search.addEventListener("click", () => {
        search.textContent = `${keyword}|`;
        hitTask("focus", "Ô tìm kiếm");
      });
      const onKey = (e) => {
        if (e.key.length === 1) {
          state.typed = (state.typed || "") + e.key.toLowerCase();
          if (keyword.startsWith(state.typed)) {
            search.textContent = state.typed + "|";
            if (state.typed === keyword) {
              result.classList.add("is-visible");
              hitTask("type", "Gõ từ khóa");
            }
          } else state.typed = "";
        }
      };
      document.addEventListener("keydown", onKey);
      result.addEventListener("click", () => hitTask("result", "Chọn kết quả"));
      refresh();
      return {
        destroy: () => document.removeEventListener("keydown", onKey),
        refresh
      };
    }

    case "device_parts": {
      tasks.push({ id: "parts", label: "Nháy 4 bộ phận máy tính", done: false });
      const parts = [
        { id: "screen", label: "🖥 Màn hình", left: "18%", top: "12%" },
        { id: "mouse", label: "🖱 Chuột", left: "12%", top: "68%" },
        { id: "keyboard", label: "⌨ Bàn phím", left: "42%", top: "68%" },
        { id: "speaker", label: "🔊 Loa", left: "72%", top: "48%" }
      ];
      const clicked = new Set();
      parts.forEach((part) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "input-device-btn";
        btn.textContent = part.label;
        btn.style.left = part.left;
        btn.style.top = part.top;
        desktop.appendChild(btn);
        btn.addEventListener("click", () => {
          clicked.add(part.id);
          btn.classList.add("is-hit");
          if (clicked.size >= 4) hitTask("parts", "Đủ 4 bộ phận");
        });
      });
      break;
    }

    case "posture_check": {
      tasks.push(
        { id: "posture", label: "Chọn tư thế ngồi đúng", done: false },
        { id: "light", label: "Chọn ánh sáng phù hợp", done: false }
      );
      const posturePanel = document.createElement("div");
      posturePanel.className = "input-posture-panel";
      posturePanel.innerHTML = "<strong>Tư thế ngồi</strong>";
      desktop.appendChild(posturePanel);
      [
        "Ngồi cúi sát màn hình",
        "Ngồi thẳng lưng, mắt cách màn hình một gang tay",
        "Nằm khi dùng máy tính"
      ].forEach((text, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "input-posture-btn";
        btn.textContent = text;
        posturePanel.appendChild(btn);
        btn.addEventListener("click", () => {
          if (index === 1) {
            btn.classList.add("is-correct");
            hitTask("posture", "Tư thế đúng");
          } else {
            btn.classList.add("is-wrong");
            setFeedback(feedback, "Chưa đúng — chọn tư thế giữ mắt và lưng khỏe.");
          }
        });
      });
      const lightPanel = document.createElement("div");
      lightPanel.className = "input-posture-panel";
      lightPanel.innerHTML = "<strong>Ánh sáng phòng học</strong>";
      desktop.appendChild(lightPanel);
      ["Phòng tối, chỉ sáng màn hình", "Đủ sáng, không chói màn hình", "Ánh nắng chiếu thẳng vào màn hình"].forEach(
        (text, index) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "input-posture-btn";
          btn.textContent = text;
          lightPanel.appendChild(btn);
          btn.addEventListener("click", () => {
            if (index === 1) {
              btn.classList.add("is-correct");
              hitTask("light", "Ánh sáng đúng");
            } else {
              btn.classList.add("is-wrong");
              setFeedback(feedback, "Chưa đúng — cần đủ sáng và không chói mắt.");
            }
          });
        }
      );
      break;
    }

    case "right_click": {
      tasks.push({ id: "menu", label: "Nháy phải và chọn «Mở»", done: false });
      const icon = placeIcons(desktop, 1)[0];
      icon.style.left = "50%";
      icon.style.top = "40%";
      icon.style.transform = "translate(-50%, -50%)";
      const menu = document.createElement("div");
      menu.className = "input-context-menu";
      menu.innerHTML = `<button type="button" data-action="open">Mở</button><button type="button">Đổi tên</button>`;
      desktop.appendChild(menu);
      icon.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const rect = desktop.getBoundingClientRect();
        menu.style.left = `${e.clientX - rect.left}px`;
        menu.style.top = `${e.clientY - rect.top}px`;
        menu.classList.add("is-open");
      });
      menu.querySelector('[data-action="open"]').addEventListener("click", () => {
        menu.classList.remove("is-open");
        icon.classList.add("is-hit");
        hitTask("menu", "Mở");
      });
      break;
    }

    case "click_play": {
      tasks.push({ id: "play", label: "Nháy nút PLAY", done: false });
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "input-play-btn";
      btn.textContent = "▶ PLAY";
      desktop.appendChild(btn);
      btn.addEventListener("click", () => {
        btn.classList.add("is-hit");
        btn.textContent = "Đang chơi…";
        hitTask("play", "PLAY");
      });
      break;
    }

    case "review_mix": {
      tasks.push(
        { id: "icons", label: "Nháy 2 biểu tượng", done: false },
        { id: "type", label: "Gõ «tin»", done: false }
      );
      const icons = placeIcons(desktop, 2);
      const clicked = new Set();
      icons.forEach((icon) => {
        icon.addEventListener("click", () => {
          clicked.add(icon.dataset.icon);
          icon.classList.add("is-hit");
          if (clicked.size >= 2) hitTask("icons", "2 biểu tượng");
        });
      });
      const onKey = (e) => {
        if (e.key.length === 1) {
          state.typed = (state.typed || "") + e.key.toLowerCase();
          if ("tin".startsWith(state.typed) && state.typed === "tin") hitTask("type", "Gõ tin");
          else if (!"tin".startsWith(state.typed)) state.typed = "";
        }
      };
      document.addEventListener("keydown", onKey);
      refresh();
      return {
        destroy: () => document.removeEventListener("keydown", onKey),
        refresh
      };
    }

    default: {
      tasks.push({ id: "generic", label: "Hoàn thành thao tác mẫu", done: false });
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "input-play-btn";
      btn.textContent = "Thử thao tác";
      desktop.appendChild(btn);
      btn.addEventListener("click", () => hitTask("generic", "Xong"));
    }
  }

  refresh();
  return { destroy: () => {}, refresh };
}

const HOME_ROW = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];
const ROW_ASDF = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"];
const ROW_BASE = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];
const ROW_Z = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];

function renderKeyboard(container) {
  const rows = [HOME_ROW.slice(0, 13), ROW_ASDF, ROW_BASE, ROW_Z];
  container.innerHTML = rows
    .map(
      (row) =>
        `<div class="input-key-row">${row
          .map((k) => {
            const home = k === "f" || k === "j" ? " is-home" : "";
            return `<span class="input-key${home}" data-key="${k}">${k.toUpperCase()}</span>`;
          })
          .join("")}</div>`
    )
    .join("");
}

function normalizeChar(char, shift) {
  if (!shift) return char.toLowerCase();
  return char.toUpperCase();
}

function createKeyboardController(lab, sim, elements) {
  const { panel, promptEl, typedEl, keyboardEl, taskList, feedback, completeBtn } = elements;
  const tasks = [{ id: "type", label: `Hoàn thành: ${sim.instruction}`, done: false }];

  let buffer = "";
  let shift = false;
  const target = (sim.text || sim.keys?.join("") || "").toLowerCase();
  const keyOnly = sim.scenario === "press_keys";
  const expectedKeys = (sim.keys || []).map((k) => k.toLowerCase());
  const pressedKeys = new Set();

  const updatePrompt = () => {
    if (!target) {
      promptEl.textContent = sim.instruction;
      return;
    }
    const done = buffer.length;
    const html = target
      .split("")
      .map((ch, i) => (i === done ? `<span class="next-char">${ch}</span>` : ch))
      .join("");
    promptEl.innerHTML = html || "✓";
  };

  const highlightKey = (key) => {
    keyboardEl.querySelectorAll(".input-key").forEach((el) => {
      el.classList.toggle("is-next", el.dataset.key === key);
    });
  };

  const refresh = () => {
    updateTasks(taskList, tasks);
    const done = allDone(tasks);
    completeBtn.disabled = !done;
    if (done) {
      setFeedback(feedback, "Chính xác! Em đã gõ đúng.", true);
      markPassed(lab);
    }
  };

  const succeed = () => {
    tasks[0].done = true;
    refresh();
  };

  renderKeyboard(keyboardEl);
  if (target) highlightKey(target[buffer.length] || "");
  updatePrompt();
  refresh();

  const onKeyDown = (e) => {
    if (e.key === "Shift") {
      shift = true;
      return;
    }
    if (e.key === "Backspace") {
      buffer = buffer.slice(0, -1);
      typedEl.textContent = buffer;
      updatePrompt();
      highlightKey(target[buffer.length] || "");
      return;
    }
    if (e.key.length !== 1) return;
    e.preventDefault();

    const ch = normalizeChar(e.key, shift);
    shift = false;
    const lower = ch.toLowerCase();

    keyboardEl.querySelectorAll(".input-key").forEach((el) => {
      el.classList.toggle("is-pressed", el.dataset.key === lower);
    });
    setTimeout(() => {
      keyboardEl.querySelectorAll(".input-key").forEach((el) => el.classList.remove("is-pressed"));
    }, 120);

    if (keyOnly) {
      if (expectedKeys.includes(lower)) {
        pressedKeys.add(lower);
        typedEl.textContent = [...pressedKeys].join(" ");
        if (expectedKeys.every((k) => pressedKeys.has(k))) succeed();
      } else setFeedback(feedback, `Gõ phím ${expectedKeys.join(" hoặc ")}.`);
      return;
    }

    const want = target[buffer.length];
    if (!want) return;
    if (lower !== want && ch !== want) {
      setFeedback(feedback, `Cần gõ «${want}» — thử lại từ đầu.`);
      buffer = "";
      typedEl.textContent = "";
      updatePrompt();
      highlightKey(target[0] || "");
      return;
    }

    buffer += want;
    typedEl.textContent = buffer;
    setFeedback(feedback, "");
    updatePrompt();
    highlightKey(target[buffer.length] || "");
    if (buffer.length >= target.length) succeed();
  };

  const onKeyUp = (e) => {
    if (e.key === "Shift") shift = false;
  };

  panel.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  panel.addEventListener("click", () => panel.focus());
  panel.focus();

  keyboardEl.querySelectorAll(".input-key").forEach((keyEl) => {
    keyEl.addEventListener("click", () => {
      const fake = new KeyboardEvent("keydown", { key: keyEl.dataset.key, bubbles: true });
      onKeyDown(fake);
    });
  });

  return {
    destroy: () => {
      panel.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    },
    refresh
  };
}

export function bindInputLab(lab, { onPassed, escapeHtml }) {
  const sim = resolveSimulator(lab);
  const completeBtn = document.querySelector("#inputComplete");
  const taskList = document.querySelector("#inputTaskList");
  const feedback = document.querySelector("#inputFeedback");

  const passed = Boolean(getState().labProgress?.[lab.id]?.passed);
  if (passed) {
    completeBtn.disabled = false;
    setFeedback(feedback, "Em đã hoàn thành mô phỏng trước đó.", true);
  }

  if (sim.type === "mouse") {
    const desktop = document.querySelector("#inputDesktop");
    activeController = createMouseController(lab, sim, {
      desktop,
      taskList,
      feedback,
      completeBtn
    });
  } else {
    activeController = createKeyboardController(lab, sim, {
      panel: document.querySelector("#inputKeyboardPanel"),
      promptEl: document.querySelector("#inputPrompt"),
      typedEl: document.querySelector("#inputTyped"),
      keyboardEl: document.querySelector("#inputKeyboard"),
      taskList,
      feedback,
      completeBtn
    });
  }

  completeBtn?.addEventListener("click", () => {
    if (completeBtn.disabled) return;
    onPassed?.();
  });

  return () => disposeInputLab();
}

export function disposeInputLab() {
  activeController?.destroy?.();
  activeController = null;
}
