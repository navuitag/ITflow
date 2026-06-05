import { loadJson } from "./utils.js";
import { configureRouter, renderRoute } from "./router.js";

async function boot() {
  const [skills, lessons, questions, labs, errors] = await Promise.all([
    loadJson("data/skills.json"),
    loadJson("data/lessons.json"),
    loadJson("data/questions.json"),
    loadJson("data/labs.json"),
    loadJson("data/errors.json")
  ]);

  configureRouter({ skills, lessons, questions, labs, errors });

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
