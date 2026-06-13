export function renderVisualization(config = {}) {
  const type = config.visualization;
  if (!type) return "";
  return renderItVisualization(type, config);
}

export function bindVisualizations(_root = document) {}

export function shouldShowPracticeViz(skill) {
  return Boolean(skill?.visualization);
}

function renderItVisualization(type, config = {}) {
  if (type === "computer") return renderComputerViz();
  if (type === "mouse") return renderMouseViz();
  if (type === "keyboard") return renderKeyboardViz();
  if (type === "binary") return renderBinaryViz(config);
  if (type === "network") return renderNetworkViz();
  if (type === "storage") return renderStorageViz();
  if (type === "software") return renderSoftwareViz();
  if (type === "safety") return renderSafetyViz();
  if (type === "blockly") return renderBlocklyViz();
  if (type === "scratch") return renderScratchViz();
  return renderConceptViz(type);
}

function renderComputerViz() {
  return `
    <div class="viz it-viz computer-viz" aria-label="Các bộ phận máy tính">
      <div class="it-parts">
        <span>🖥 Màn hình</span>
        <span>⌨ Bàn phím</span>
        <span>🖱 Chuột</span>
        <span>🔊 Loa</span>
      </div>
      <p class="viz-caption">Máy tính gồm thiết bị vào, ra và bộ xử lý trung tâm</p>
    </div>
  `;
}

function renderMouseViz() {
  return `
    <div class="viz it-viz mouse-viz" aria-label="Thao tác chuột">
      <div class="it-parts">
        <span>Nhấp trái</span>
        <span>Kéo thả</span>
        <span>Cuộn</span>
        <span>Nhấp phải</span>
      </div>
      <p class="viz-caption">Chuột giúp điều khiển con trỏ trên màn hình</p>
    </div>
  `;
}

function renderKeyboardViz() {
  return `
    <div class="viz it-viz keyboard-viz" aria-label="Bàn phím">
      <div class="it-parts">
        <span>Chữ cái</span>
        <span>Số</span>
        <span>Enter</span>
        <span>Shift</span>
        <span>Space</span>
      </div>
      <p class="viz-caption">Bàn phím dùng để nhập chữ, số và lệnh</p>
    </div>
  `;
}

function renderBinaryViz(config = {}) {
  const bits = config.bits || "1010";
  return `
    <div class="viz it-viz binary-viz" aria-label="Hệ nhị phân">
      <div class="binary-row">${bits.split("").map((bit) => `<span class="binary-bit">${bit}</span>`).join("")}</div>
      <p class="viz-caption">Máy tính lưu trữ và xử lý thông tin bằng bit 0 và 1</p>
    </div>
  `;
}

function renderNetworkViz() {
  return `
    <div class="viz it-viz network-viz" aria-label="Mạng máy tính">
      <div class="it-flow">
        <span>Máy tính</span><span>→</span><span>Router</span><span>→</span><span>Internet</span>
      </div>
      <p class="viz-caption">Thiết bị kết nối qua mạng để trao đổi dữ liệu</p>
    </div>
  `;
}

function renderStorageViz() {
  return `
    <div class="viz it-viz storage-viz" aria-label="Lưu trữ">
      <div class="it-parts">
        <span>RAM</span>
        <span>Ổ cứng</span>
        <span>USB</span>
        <span>Cloud</span>
      </div>
      <p class="viz-caption">Dữ liệu có thể lưu tạm thời hoặc lâu dài</p>
    </div>
  `;
}

function renderSoftwareViz() {
  return `
    <div class="viz it-viz software-viz" aria-label="Phần mềm">
      <div class="it-flow">
        <span>Hệ điều hành</span><span>→</span><span>Ứng dụng</span><span>→</span><span>Người dùng</span>
      </div>
      <p class="viz-caption">Phần mềm điều khiển phần cứng và hỗ trợ công việc</p>
    </div>
  `;
}

function renderSafetyViz() {
  return `
    <div class="viz it-viz safety-viz" aria-label="An toàn máy tính">
      <div class="it-parts">
        <span>🔒 Mật khẩu</span>
        <span>🛡 Không chia sẻ thông tin</span>
        <span>✅ Nguồn tin đáng tin</span>
      </div>
      <p class="viz-caption">Bảo vệ tài khoản và dữ liệu cá nhân khi dùng máy tính</p>
    </div>
  `;
}

function renderBlocklyViz() {
  return `
    <div class="viz it-viz blockly-viz" aria-label="Lập trình khối">
      <div class="it-flow">
        <span>Khối lệnh</span><span>→</span><span>Thứ tự</span><span>→</span><span>Chạy chương trình</span>
      </div>
      <p class="viz-caption">Ghép khối lệnh theo thứ tự để điều khiển máy tính</p>
    </div>
  `;
}

function renderScratchViz() {
  return `
    <div class="viz it-viz scratch-viz" aria-label="Scratch">
      <div class="it-parts">
        <span>Nhân vật</span>
        <span>Kịch bản</span>
        <span>Sân khấu</span>
      </div>
      <p class="viz-caption">Scratch kết hợp đồ họa, âm thanh và lập trình khối</p>
    </div>
  `;
}

function renderConceptViz(type = "concept") {
  return `
    <div class="viz it-viz concept-viz" aria-label="Khái niệm Tin học">
      <span>${type}</span>
      <p class="viz-caption">Minh họa khái niệm Tin học</p>
    </div>
  `;
}
