/**
 * Sinh exercises.json từ questions hiện có.
 * Chạy: node scripts/generate-it-extras.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDir = path.join(root, "data");

async function main() {
  const questions = JSON.parse(await fs.readFile(path.join(dataDir, "questions.json"), "utf8"));
  const exercises = questions.map((q) => ({
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

  await fs.writeFile(path.join(dataDir, "exercises.json"), `${JSON.stringify(exercises, null, 2)}\n`);
  console.log(`exercises.json: ${exercises.length} bài`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
