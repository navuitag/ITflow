const CACHE_NAME = "itflow-vn-v$(( $(echo 25) + 1 ))";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/css/main.css",
  "./assets/css/layout.css",
  "./assets/css/animation.css",
  "./assets/css/responsive.css",
  "./assets/css/lab.css",
  "./assets/css/blockly-lab.css",
  "./assets/css/input-lab.css",
  "./assets/css/embed-lab.css",
  "./modules/embedLab.js",
  "./modules/embedLab/scratchProjects.js",
  "./assets/css/practice-features.css",
  "./assets/css/mindmap.css",
  "./modules/blocklyLab.js",
  "./modules/inputLab.js",
  "./modules/inputLab/scenarios.js",
  "./modules/blockly/customBlocks.js",
  "./modules/blockly/toolboxes.js",
  "./modules/blockly/validate.js",
  "./modules/blockly/simulator.js",
  "./modules/practiceModes.js",
  "./modules/practiceContent.js",
  "./modules/mindMap.js",
  "./assets/js/app.js",
  "./assets/js/router.js",
  "./assets/js/state.js",
  "./assets/js/profileStore.js",
  "./assets/js/studyTime.js",
  "./assets/js/edtechApps.js",
  "./components/edtechHub.js",
  "./assets/css/edtech-hub.css",
  "./assets/js/author.js",
  "./assets/js/contact.js",
  "./assets/js/feedback.js",
  "./assets/css/feedback.css",
  "./assets/css/author.css",
  "./assets/images/My-QR-Zalo.jpg",
  "./assets/js/utils.js",
  "./modules/lessonEngine.js",
  "./modules/quizEngine.js",
  "./modules/labEngine.js",
  "./modules/errorEngine.js",
  "./modules/progress.js",
  "./modules/gamification.js",
  "./components/navbar.js",
  "./components/learnerSwitcher.js",
  "./components/lessonCard.js",
  "./components/quizCard.js",
  "./components/flashcardPanel.js",
  "./components/memoryPanel.js",
  "./components/modal.js",
  "./data/skills.json",
  "./data/lessons.json",
  "./data/questions.json",
  "./data/labs.json",
  "./data/errors.json",
  "./data/exercises.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
