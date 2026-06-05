/**
 * Sinh exercises.json và các gói ôn hè Tin học từ skills/questions hiện có.
 * Chạy: node scripts/generate-it-extras.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDir = path.join(root, "data");

const EMOJIS = ["💻", "🖱️", "⌨️", "🌐", "📊", "🧩", "🔐", "🤖", "📱", "🎨", "🗂️", "⚙️"];

async function readJson(name) {
  return JSON.parse(await fs.readFile(path.join(dataDir, name), "utf8"));
}

function buildExercises(questions) {
  return questions.map((q) => ({
    id: `ex_${q.id}`,
    skill: q.skill,
    type: q.type,
    question: q.question,
    answer: q.answer,
    hint: q.hint,
    choices: q.choices,
    source: "sgk",
    section: "Rèn luyện SGK"
  }));
}

function groupSkillsByChapter(skills, grade) {
  const map = new Map();
  skills
    .filter((s) => s.grade === grade)
    .sort((a, b) => (a.chapterIndex - b.chapterIndex) || (a.lessonNo - b.lessonNo))
    .forEach((skill) => {
      const key = skill.chapter || `Chủ đề ${skill.chapterIndex}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(skill);
    });
  return [...map.entries()];
}

function buildSummerPack(gradeFrom, skills, lessons, questions) {
  const packId = `g${gradeFrom}-g${gradeFrom + 1}`;
  const chapters = groupSkillsByChapter(skills, gradeFrom);
  const topics = [];
  const packLessons = [];
  const packQuestions = [];
  let order = 1;

  chapters.forEach(([chapterName, chapterSkills], chapterIndex) => {
    const topicId = `sr_g${gradeFrom}_ch${chapterIndex + 1}`;
    const prerequisite = order === 1 ? [] : [topics[topics.length - 1].id];
    topics.push({
      id: topicId,
      order,
      title: chapterName,
      emoji: EMOJIS[chapterIndex % EMOJIS.length],
      description: `Ôn tập ${chapterName} — lớp ${gradeFrom} lên ${gradeFrom + 1}.`,
      prerequisite,
      xp: 40
    });

    const keypoints = chapterSkills.slice(0, 4).map((s) => s.description || s.title);
    packLessons.push({
      id: topicId,
      title: chapterName,
      topic: topicId,
      source: `Ôn hè Tin học lớp ${gradeFrom} → ${gradeFrom + 1} (ITFlow).`,
      xp: 40,
      steps: [
        { type: "intro", title: "Mục tiêu chủ đề", content: topics.at(-1).description },
        {
          type: "keypoints",
          title: "Kiến thức cần nhớ",
          content: "Nắm vững các ý sau trước khi luyện:",
          points: keypoints.length ? keypoints : [chapterName]
        },
        { type: "summary", title: "Sẵn sàng thử thách?", content: "Hoàn thành câu hỏi để nhận sao và mở khóa đề tiếp theo!" }
      ]
    });

    chapterSkills.slice(0, 2).forEach((skill, qi) => {
      const q = questions.find((item) => item.skill === skill.id);
      if (!q) return;
      packQuestions.push({
        ...q,
        id: `sr_${packId}_${topicId}_q${qi + 1}`,
        topic: topicId,
        question: q.question
      });
    });

    order += 1;
  });

  const examId = `exam_g${gradeFrom}_1`;
  const examSkills = skills.filter((s) => s.grade === gradeFrom).slice(0, 5);
  examSkills.forEach((skill, i) => {
    const q = questions.find((item) => item.skill === skill.id);
    if (!q) return;
    packQuestions.push({
      ...q,
      id: `sr_${packId}_${examId}_q${i + 1}`,
      exam: examId,
      question: q.question
    });
  });

  const exams = [
    {
      id: examId,
      order: 1,
      title: `Đề tổng hợp lớp ${gradeFrom}`,
      description: `Kiểm tra nhanh kiến thức Tin học trước khi lên lớp ${gradeFrom + 1}.`,
      prerequisite: topics.length ? [topics[topics.length - 1].id] : [],
      questionCount: examSkills.length,
      xp: 50
    }
  ];

  return {
    meta: {
      id: `summer_${packId}`,
      packId,
      title: `Ôn hè Tin học lớp ${gradeFrom} → lớp ${gradeFrom + 1}`,
      subtitle: `${topics.length} chủ đề + ${exams.length} đề tổng hợp`,
      gradeFrom,
      gradeTo: gradeFrom + 1,
      source: "Nội dung ôn hè tự biên soạn từ SGK Tin học KNTT (ITFlow)."
    },
    topics,
    lessons: packLessons,
    exams,
    questions: packQuestions
  };
}

async function main() {
  const [skills, lessons, questions] = await Promise.all([
    readJson("skills.json"),
    readJson("lessons.json"),
    readJson("questions.json")
  ]);

  const exercises = buildExercises(questions);
  await fs.writeFile(path.join(dataDir, "exercises.json"), `${JSON.stringify(exercises, null, 2)}\n`);

  const grades = [...new Set(skills.map((s) => s.grade))].sort((a, b) => a - b);
  const maxGrade = grades.at(-1) || 12;
  const summerPacks = {};

  for (let g = 1; g < maxGrade; g += 1) {
    if (!grades.includes(g)) continue;
    const pack = buildSummerPack(g, skills, lessons, questions);
    const packId = pack.meta.packId;
    summerPacks[packId] = pack;
    const fileName = g === 1 ? "summer-review.json" : `summer-review-g${g}-g${g + 1}.json`;
    await fs.writeFile(path.join(dataDir, fileName), `${JSON.stringify(pack, null, 2)}\n`);
  }

  console.log(`exercises.json: ${exercises.length} bài`);
  console.log(`summer packs: ${Object.keys(summerPacks).length} gói (g1-g${maxGrade})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
