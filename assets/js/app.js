import { loadJson } from "./utils.js";
import { configureRouter, renderRoute } from "./router.js";

const SUMMER_FILES = [
  ["g1-g2", "data/summer-review.json"],
  ["g2-g3", "data/summer-review-g2-g3.json"],
  ["g3-g4", "data/summer-review-g3-g4.json"],
  ["g4-g5", "data/summer-review-g4-g5.json"],
  ["g5-g6", "data/summer-review-g5-g6.json"],
  ["g6-g7", "data/summer-review-g6-g7.json"],
  ["g7-g8", "data/summer-review-g7-g8.json"],
  ["g8-g9", "data/summer-review-g8-g9.json"],
  ["g9-g10", "data/summer-review-g9-g10.json"],
  ["g10-g11", "data/summer-review-g10-g11.json"],
  ["g11-g12", "data/summer-review-g11-g12.json"]
];

async function boot() {
  const summerLoads = await Promise.all(
    SUMMER_FILES.map(async ([id, path]) => {
      try {
        const pack = await loadJson(path);
        return [id, pack];
      } catch {
        return null;
      }
    })
  );

  const summerPacks = Object.fromEntries(summerLoads.filter(Boolean));

  const [skills, lessons, questions, labs, errors, exercises] = await Promise.all([
    loadJson("data/skills.json"),
    loadJson("data/lessons.json"),
    loadJson("data/questions.json"),
    loadJson("data/labs.json"),
    loadJson("data/errors.json"),
    loadJson("data/exercises.json").catch(() => [])
  ]);

  configureRouter({
    skills,
    lessons,
    questions,
    labs,
    errors,
    exercises,
    summerPacks
  });

  if (!window.location.hash) {
    window.location.hash = "#/home";
  } else {
    renderRoute();
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}

boot().catch((error) => {
  document.querySelector("#app").innerHTML = `
    <main class="app-shell">
      <section class="empty-state">
        Không khởi động được ITFlow.<br>
        <small>${error.message}</small>
      </section>
    </main>
  `;
});
