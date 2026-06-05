const BASE_ACTIONS = `
  <block type="it_say">
    <value name="TEXT"><shadow type="text_string"></shadow></value>
  </block>
  <block type="it_move">
    <value name="STEPS"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
  </block>
  <block type="it_turn">
    <value name="DEG"><shadow type="math_number"><field name="NUM">90</field></shadow></value>
  </block>
  <block type="it_wait">
    <value name="SEC"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
  </block>
`;

const LOOPS = `
  <block type="controls_repeat_ext">
    <value name="TIMES"><shadow type="math_number"><field name="NUM">4</field></shadow></value>
  </block>
`;

const BRANCH = `
  <block type="controls_if">
    <value name="IF0"><shadow type="logic_compare">
      <field name="OP">GT</field>
      <value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
      <value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    </shadow></value>
  </block>
`;

const VARS = `
  <block type="variables_set">
    <field name="VAR" variabletype="">điểm</field>
    <value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
  </block>
  <block type="variables_get"><field name="VAR" variabletype="">điểm</field></block>
`;

const MATH = `
  <block type="math_arithmetic">
    <field name="OP">ADD</field>
    <value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
    <value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
  </block>
  <block type="math_number"><field name="NUM">0</field></block>
`;

const LOGIC = `
  <block type="logic_compare">
    <field name="OP">EQ</field>
    <value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    <value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
  </block>
`;

export const TOOLBOX_BY_MODE = {
  sequence: `
    <xml>
      <category name="Sự kiện" colour="120">
        <block type="it_start"></block>
      </category>
      <category name="Lệnh tuần tự" colour="160">${BASE_ACTIONS}</category>
      <category name="Số & chữ" colour="230">${MATH}<block type="text_string"></block></category>
    </xml>`,
  loop: `
    <xml>
      <category name="Sự kiện" colour="120"><block type="it_start"></block></category>
      <category name="Lệnh" colour="160">${BASE_ACTIONS}</category>
      <category name="Lặp" colour="280">${LOOPS}</category>
      <category name="Số & chữ" colour="230">${MATH}<block type="text_string"></block></category>
    </xml>`,
  loop_practice: `
    <xml>
      <category name="Sự kiện" colour="120"><block type="it_start"></block></category>
      <category name="Lệnh" colour="160">${BASE_ACTIONS}</category>
      <category name="Lặp" colour="280">${LOOPS}</category>
      <category name="Số & chữ" colour="230">${MATH}</category>
    </xml>`,
  branch: `
    <xml>
      <category name="Sự kiện" colour="120"><block type="it_start"></block></category>
      <category name="Lệnh" colour="160">${BASE_ACTIONS}</category>
      <category name="Rẽ nhánh" colour="210">${BRANCH}</category>
      <category name="Logic" colour="300">${LOGIC}</category>
      <category name="Số" colour="230">${MATH}</category>
    </xml>`,
  variables: `
    <xml>
      <category name="Sự kiện" colour="120"><block type="it_start"></block></category>
      <category name="Lệnh" colour="160">${BASE_ACTIONS}</category>
      <category name="Biến" colour="330">${VARS}</category>
      <category name="Số" colour="230">${MATH}</category>
    </xml>`,
  expressions: `
    <xml>
      <category name="Sự kiện" colour="120"><block type="it_start"></block></category>
      <category name="Lệnh" colour="160">${BASE_ACTIONS}</category>
      <category name="Biến" colour="330">${VARS}</category>
      <category name="Biểu thức" colour="230">${MATH}</category>
    </xml>`,
  project: `
    <xml>
      <category name="Sự kiện" colour="120"><block type="it_start"></block></category>
      <category name="Lệnh" colour="160">${BASE_ACTIONS}</category>
      <category name="Lặp" colour="280">${LOOPS}</category>
      <category name="Rẽ nhánh" colour="210">${BRANCH}</category>
      <category name="Biến" colour="330">${VARS}</category>
      <category name="Số & logic" colour="230">${MATH}${LOGIC}</category>
    </xml>`
};

export const STARTER_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="it_start" x="48" y="48"></block>
</xml>`;
