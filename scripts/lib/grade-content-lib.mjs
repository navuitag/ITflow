/**
 * Tiện ích sinh nội dung SGK cho ITFlow (dùng chung lớp 8–12).
 */
import { readFile, writeFile } from "node:fs/promises";
import { SKILL_SIMULATORS } from "../../modules/inputLab/scenarios.js";

export const merge = (existing, incoming, key = "id") => {
  const map = new Map(existing.map((item) => [item[key], item]));
  for (const item of incoming) map.set(item[key], item);
  return [...map.values()].sort((a, b) => {
    if (a.grade !== b.grade) return a.grade - b.grade;
    if (a.chapterIndex !== b.chapterIndex) return a.chapterIndex - b.chapterIndex;
    if ((a.lessonNo || 0) !== (b.lessonNo || 0)) return (a.lessonNo || 0) - (b.lessonNo || 0);
    return a.id.localeCompare(b.id);
  });
};

export const mergeErrors = (existing, incoming) => {
  const key = (item) => `${item.skill}:${item.pattern}`;
  const map = new Map(existing.map((item) => [key(item), item]));
  for (const item of incoming) map.set(key(item), item);
  return [...map.values()];
};

const defaultLabSteps = [
  { id: "s1", label: "Đọc yêu cầu SGK và xác định sản phẩm", hint: "Ghi ra việc cần hoàn thành." },
  { id: "s2", label: "Thực hiện trên máy theo hướng dẫn", hint: "Làm đúng thứ tự." },
  { id: "s3", label: "Kiểm tra và trình bày kết quả", hint: "So với rubric bài học." }
];

const shortTitle = (title) =>
  title
    .replace(/^Bài \d+[AB]?\.\s*/, "")
    .replace(/^Thực hành:?\s*/, "")
    .replace(/^Thực hành tổng hợp:\s*/, "");

export function buildGradeContent({
  grade,
  source,
  lessons,
  corePoints = {},
  quizExtras = {},
  blocklyLabs = {},
  theoryOnly = new Set(),
  checklistSteps = {},
  gradeErrors = [],
  streamsFn,
  competenciesFn
}) {
  const parseLessonNo = (title, index) => {
    const m = title.match(/Bài\s+(\d+)/i);
    return m ? Number(m[1]) : index + 1;
  };

  const buildSkills = () =>
    lessons.map(([id, title, chapter, chapterIndex, description, prerequisite, book], index) => ({
      id,
      title,
      grade,
      book: book || "KNTT",
      chapter,
      chapterIndex,
      lessonNo: parseLessonNo(title, index),
      domain: chapter,
      level: chapterIndex,
      prerequisite,
      description,
      streams:
        book === "KNTT-CS"
          ? ["CS"]
          : book === "KNTT-ICT"
            ? ["ICT"]
            : streamsFn
              ? streamsFn(chapterIndex)
              : chapterIndex >= 5
                ? ["CS"]
                : chapterIndex >= 4
                  ? ["ICT"]
                  : ["DL"],
      competencies: competenciesFn
        ? competenciesFn(chapterIndex)
        : chapterIndex === 3
          ? ["NLb"]
          : chapterIndex >= 5
            ? ["NLc", "NLd"]
            : ["NLa", "NTh"]
    }));

  const buildLessons = () =>
    lessons.map(([id, title, chapter, , description]) => {
      const points = corePoints[id] || [description, "Thực hành theo SGK tại phòng máy.", "Hỏi giáo viên khi chưa hiểu."];
      return {
        id,
        title,
        skill: id,
        chapter,
        source,
        xp: 50,
        steps: [
          { type: "intro", title: "Mục tiêu bài học", content: description },
          {
            type: "keypoints",
            title: "Em cần nhớ",
            content: "Nắm các ý sau trước khi làm quiz và thực hành:",
            points
          },
          { type: "summary", title: "Ghi nhớ nhanh", content: points[0] }
        ]
      };
    });

  const buildQuestions = () =>
    lessons.flatMap(([id, title, , , description]) => {
      const short = title.split(". ").slice(1).join(". ") || title;
      const extra = quizExtras[id];
      const q1 = extra?.q1
        ? {
            id: `q_${id}_1`,
            skill: id,
            type: "multiple_choice",
            question: extra.q1.q,
            choices: extra.q1.choices,
            answer: extra.q1.a,
            hint: "Xem lại phần «Em cần nhớ»."
          }
        : {
            id: `q_${id}_1`,
            skill: id,
            type: "multiple_choice",
            question: `Theo bài «${short}», ý nào đúng nhất?`,
            choices: [description, "Không cần tôn trọng bản quyền số.", "Dữ liệu và thông tin luôn giống nhau.", "Thuật toán không cần thứ tự các bước."],
            answer: description,
            hint: "Đọc lại mục tiêu và kiến thức trọng tâm."
          };
      const q2 = extra?.q2
        ? {
            id: `q_${id}_2`,
            skill: id,
            type: "true_false",
            question: extra.q2.q,
            choices: ["Đúng", "Sai"],
            answer: extra.q2.a,
            hint: "Suy nghĩ quy tắc đạo đức số và an toàn."
          }
        : {
            id: `q_${id}_2`,
            skill: id,
            type: "true_false",
            question: `Kiến thức bài «${short}» góp phần hình thành năng lực tin học lớp ${grade}.`,
            choices: ["Đúng", "Sai"],
            answer: "Đúng",
            hint: "Môn Tin học phát triển năng lực NLa–NLe theo CT 2018."
          };
      return [q1, q2];
    });

  const buildLabs = () =>
    lessons
      .filter(([id]) => !theoryOnly.has(id))
      .map(([id, title]) => {
        const short = shortTitle(title);
        if (blocklyLabs[id]) {
          const cfg = blocklyLabs[id];
          return {
            id: `lab_${id}`,
            skill: id,
            type: "blockly",
            title: `Thực hành Blockly: ${short}`,
            xp: 52,
            blockly: { ...cfg, starterXml: null }
          };
        }
        const sim = SKILL_SIMULATORS[id];
        if (sim) {
          return {
            id: `lab_${id}`,
            skill: id,
            type: sim.type,
            title: `Thực hành: ${short}`,
            xp: 46,
            simulator: sim
          };
        }
        return {
          id: `lab_${id}`,
          skill: id,
          type: "checklist",
          title: `Thực hành: ${short}`,
          xp: 46,
          steps: checklistSteps[id] || defaultLabSteps
        };
      });

  return { buildSkills, buildLessons, buildQuestions, buildLabs, gradeErrors };
}

export async function writeGradeContent(grade, built) {
  const { buildSkills, buildLessons, buildQuestions, buildLabs, gradeErrors } = built;
  const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));

  const [skills, lessons, questions, labs, errors] = await Promise.all([
    readJson("data/skills.json"),
    readJson("data/lessons.json"),
    readJson("data/questions.json"),
    readJson("data/labs.json"),
    readJson("data/errors.json")
  ]);

  const gSkills = buildSkills();
  const gLessons = buildLessons();
  const gQuestions = buildQuestions();
  const gLabs = buildLabs();

  await Promise.all([
    writeFile("data/skills.json", JSON.stringify(merge(skills, gSkills), null, 2)),
    writeFile("data/lessons.json", JSON.stringify(merge(lessons, gLessons), null, 2)),
    writeFile("data/questions.json", JSON.stringify(merge(questions, gQuestions), null, 2)),
    writeFile("data/labs.json", JSON.stringify(merge(labs, gLabs), null, 2)),
    writeFile("data/errors.json", JSON.stringify(mergeErrors(errors, gradeErrors), null, 2))
  ]);

  const mergedSkills = merge(skills, gSkills);
  const mergedQuestions = merge(questions, gQuestions);

  console.log(
    `Grade ${grade}: +${gSkills.length} skills, +${gLessons.length} lessons, +${gQuestions.length} questions, +${gLabs.length} labs`
  );
  console.log(`Total: ${mergedSkills.length} skills, ${mergedQuestions.length} questions`);
}
