import { registerCustomBlocks } from "./blockly/customBlocks.js";
import { TOOLBOX_BY_MODE, STARTER_XML } from "./blockly/toolboxes.js";
import { validateBlocklyChallenge } from "./blockly/validate.js";
import { createSimulator } from "./blockly/simulator.js";
import { getState, updateState } from "../assets/js/state.js";

const BLOCKLY_CDN = "https://cdn.jsdelivr.net/npm/blockly@10.4.3";
let workspace = null;
let simulator = null;
let loadPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Không tải được ${src}`));
    document.head.append(script);
  });
}

async function ensureBlockly() {
  if (window.Blockly) return window.Blockly;
  if (!loadPromise) {
    loadPromise = (async () => {
      await loadScript(`${BLOCKLY_CDN}/blockly.min.js`);
      await loadScript(`${BLOCKLY_CDN}/blocks_compressed.min.js`);
      await loadScript(`${BLOCKLY_CDN}/javascript_compressed.min.js`);
      await loadScript(`${BLOCKLY_CDN}/msg/vi.js`);
      registerCustomBlocks(window.Blockly);
      return window.Blockly;
    })();
  }
  return loadPromise;
}

export function isBlocklyLab(lab) {
  return lab?.type === "blockly" && lab?.blockly?.mode;
}

export function renderBlocklyLab(lab, skill, escapeHtml) {
  const cfg = lab.blockly;
  return `
    <section class="blockly-lab">
      <header class="blockly-lab-head">
        <a class="back-link" href="#/quiz/${lab.skill}">← Quiz</a>
        <div>
          <span class="tag tag-cs">Blockly · ${escapeHtml(cfg.mode)}</span>
          <h1>${escapeHtml(lab.title)}</h1>
          <p class="blockly-mission">${escapeHtml(cfg.mission)}</p>
        </div>
      </header>
      <div class="blockly-workspace-wrap">
        <div id="blocklyDiv" class="blockly-div" aria-label="Vùng lập trình Blockly"></div>
        <aside class="blockly-side">
          <div class="blockly-stage">
            <canvas id="blocklyCanvas" width="280" height="220" aria-label="Sân khấu mô phỏng"></canvas>
          </div>
          <div id="blocklyLog" class="blockly-log" aria-live="polite"></div>
          <div class="blockly-actions">
            <button type="button" class="btn secondary" id="blocklyRun">▶ Chạy thử</button>
            <button type="button" class="btn primary" id="blocklyCheck">✓ Kiểm tra bài</button>
          </div>
          <div id="blocklyFeedback" class="blockly-feedback" aria-live="polite"></div>
          <button type="button" class="btn primary blockly-complete" id="blocklyComplete" disabled>
            Hoàn thành thực hành (+${lab.xp} XP)
          </button>
        </aside>
      </div>
      ${cfg.hint ? `<p class="blockly-hint"><strong>Gợi ý SGK:</strong> ${escapeHtml(cfg.hint)}</p>` : ""}
    </section>`;
}

export async function bindBlocklyLab(lab, { onPassed, escapeHtml }) {
  const Blockly = await ensureBlockly();
  const cfg = lab.blockly;
  const container = document.getElementById("blocklyDiv");
  const feedback = document.getElementById("blocklyFeedback");
  const completeBtn = document.getElementById("blocklyComplete");
  const canvas = document.getElementById("blocklyCanvas");

  if (!container) return;

  if (workspace) {
    workspace.dispose();
    workspace = null;
  }

  const toolboxXml = TOOLBOX_BY_MODE[cfg.mode] || TOOLBOX_BY_MODE.sequence;
  workspace = Blockly.inject(container, {
    toolbox: toolboxXml,
    media: `${BLOCKLY_CDN}/media/`,
    renderer: "zelos",
    theme: Blockly.Themes.Zelos,
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 1.2, minScale: 0.6 },
    trashcan: true
  });

  simulator = createSimulator(canvas);
  simulator.reset();

  const setFeedback = (html, ok) => {
    if (!feedback) return;
    feedback.className = `blockly-feedback${ok === true ? " is-ok" : ok === false ? " is-warn" : ""}`;
    feedback.innerHTML = html;
  };

  const savedXml = getState().labProgress?.[lab.id]?.blocklyXml;
  const initialXml = savedXml || cfg.starterXml || STARTER_XML;
  Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), workspace);

  if (getState().labProgress?.[lab.id]?.passed) {
    completeBtn.disabled = false;
    setFeedback("<strong>Đã đạt yêu cầu.</strong> Bấm hoàn thành để nhận XP.", true);
  }

  const saveXml = () => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(xml);
    updateState((state) => {
      if (!state.labProgress) state.labProgress = {};
      if (!state.labProgress[lab.id]) state.labProgress[lab.id] = { done: [] };
      state.labProgress[lab.id].blocklyXml = text;
      state.labProgress[lab.id].passed = state.labProgress[lab.id].passed || false;
    });
  };

  workspace.addChangeListener(() => saveXml());

  document.getElementById("blocklyRun")?.addEventListener("click", async () => {
    setFeedback("<span>Đang chạy thử…</span>");
    try {
      await simulator.run(workspace);
      setFeedback("<span>Chạy thử xong. Xem nhật ký bên phải.</span>");
    } catch (e) {
      setFeedback(`<span>Lỗi mô phỏng: ${escapeHtml(e.message)}</span>`, false);
    }
  });

  document.getElementById("blocklyCheck")?.addEventListener("click", () => {
    const result = validateBlocklyChallenge(cfg.mode, workspace, cfg.rules || {});
    if (result.ok) {
      updateState((state) => {
        if (!state.labProgress) state.labProgress = {};
        state.labProgress[lab.id] = {
          ...(state.labProgress[lab.id] || {}),
          passed: true,
          done: ["blockly_pass"]
        };
      });
      completeBtn.disabled = false;
      setFeedback(`<strong>Đạt yêu cầu!</strong><p>${escapeHtml(result.message)}</p>`, true);
    } else {
      setFeedback(`<strong>Chưa đạt</strong><p>${escapeHtml(result.message)}</p>`, false);
    }
    saveXml();
  });

  completeBtn?.addEventListener("click", () => {
    const passed = workspace && validateBlocklyChallenge(cfg.mode, workspace, cfg.rules || {}).ok;
    if (!passed) {
      setFeedback("<strong>Hãy bấm «Kiểm tra bài» và đạt yêu cầu trước.</strong>", false);
      return;
    }
    onPassed?.();
  });

  window.addEventListener("resize", onResize);
  onResize();

  function onResize() {
    Blockly.svgResize(workspace);
  }

  return () => {
    window.removeEventListener("resize", onResize);
    if (workspace) {
      workspace.dispose();
      workspace = null;
    }
    simulator?.stop();
  };
}

export function disposeBlocklyLab() {
  if (workspace) {
    workspace.dispose();
    workspace = null;
  }
  simulator?.stop();
}
