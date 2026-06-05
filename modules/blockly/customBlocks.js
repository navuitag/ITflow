/** Khối lệnh tùy biên ITFlow (tiếng Việt) — đăng ký sau khi Blockly đã tải. */
export function registerCustomBlocks(Blockly) {
  Blockly.Blocks.it_start = {
    init() {
      this.appendDummyField().appendField("🚩 Khi bấm Chạy");
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("Điểm bắt đầu chương trình");
      this.setDeletable(false);
    }
  };

  Blockly.Blocks.it_say = {
    init() {
      this.appendDummyField().appendField("💬 Nói");
      this.appendValueInput("TEXT").setCheck("String").appendField("");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks.it_move = {
    init() {
      this.appendDummyField().appendField("➡️ Tiến");
      this.appendValueInput("STEPS").setCheck("Number").appendField("bước");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks.it_turn = {
    init() {
      this.appendDummyField().appendField("↻ Quay");
      this.appendValueInput("DEG").setCheck("Number").appendField("độ");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks.it_wait = {
    init() {
      this.appendDummyField().appendField("⏱ Chờ");
      this.appendValueInput("SEC").setCheck("Number").appendField("giây");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setInputsInline(true);
    }
  };

  Blockly.Blocks.text_string = {
    init() {
      this.appendDummyField().appendField('"').appendField(new Blockly.FieldTextInput("Xin chào"), "TEXT").appendField('"');
      this.setOutput(true, "String");
      this.setColour(200);
    }
  };

  if (Blockly.JavaScript) {
    Blockly.JavaScript.it_start = () => "";
    Blockly.JavaScript.it_say = (block) => {
      const text = Blockly.JavaScript.valueToCode(block, "TEXT", Blockly.JavaScript.ORDER_NONE) || '""';
      return `say(${text});\n`;
    };
    Blockly.JavaScript.it_move = (block) => {
      const steps = Blockly.JavaScript.valueToCode(block, "STEPS", Blockly.JavaScript.ORDER_NONE) || "10";
      return `move(${steps});\n`;
    };
    Blockly.JavaScript.it_turn = (block) => {
      const deg = Blockly.JavaScript.valueToCode(block, "DEG", Blockly.JavaScript.ORDER_NONE) || "90";
      return `turn(${deg});\n`;
    };
    Blockly.JavaScript.it_wait = (block) => {
      const sec = Blockly.JavaScript.valueToCode(block, "SEC", Blockly.JavaScript.ORDER_NONE) || "1";
      return `wait(${sec});\n`;
    };
    Blockly.JavaScript.text_string = (block) => {
      const text = block.getFieldValue("TEXT").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return [`"${text}"`, Blockly.JavaScript.ORDER_ATOMIC];
    };
  }
}
