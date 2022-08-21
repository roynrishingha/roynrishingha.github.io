const royrustdev_cache = "royrustdev_cache_v1";
const assets = [
  "/",
  "/index.html",
  "/404.html",
  "/assets/css/root.css",
  "/assets/js/serviceWorker.js",
  "/assets/js/main.js",
  "/assets/vendor/typed.js/typed.min.js",
  "/assets/vendor/typed.js/typed.js",
  "/assets/vendor/typed.js/typed.min.js.map",
  "/assets/img/certs/algorithms-stanford-800x500.jpg",
  "/assets/img/certs/redhat-course.png",
  "/assets/img/roy/profile-matrix.png",
  "/assets/img/roy/profile.png",
  "/assets/img/roy/royrustdev.png",
  "/assets/img/roy/royrustdev.svg",
  "/assets/img/skills/bash.svg",
  "/assets/img/skills/css.svg",
  "/assets/img/skills/docker.svg",
  "/assets/img/skills/expressjs.svg",
  "/assets/img/skills/fedora.svg",
  "/assets/img/skills/git.svg",
  "/assets/img/skills/github_actions.svg",
  "/assets/img/skills/js.svg",
  "/assets/img/skills/kubernetes.svg",
  "/assets/img/skills/lua.svg",
  "/assets/img/skills/mongodb.svg",
  "/assets/img/skills/nodejs.svg",
  "/assets/img/skills/postgresql.svg",
  "/assets/img/skills/postman.png",
  "/assets/img/skills/redis.svg",
  "/assets/img/skills/rust.svg",
  "/assets/img/skills/scss.svg",
  "/assets/img/skills/ts.svg",
  "/assets/img/skills/vite.svg",
  "/assets/img/skills/vuejs.svg",
  "/assets/img/skills/wasm.svg",
  "/assets/img/ai-wallpaper.jpg",
  "/assets/img/bg.png",
  "/assets/img/error.jpg",
  "/assets/img/neovim-rust.png",
  "/assets/img/trust-globe.svg",
  "/assets/img/white-ai-wallpaper.jpg",
  "/assets/resume/royrustdev_resume.pdf",
  "/assets/favicon/android-icon-144x144.png",
  "/assets/favicon/android-icon-192x192.png",
  "/assets/favicon/android-icon-36x36.png",
  "/assets/favicon/android-icon-48x48.png",
  "/assets/favicon/android-icon-512x512.png",
  "/assets/favicon/android-icon-72x72.png",
  "/assets/favicon/android-icon-96x96.png",
  "/assets/favicon/apple-icon-114x114.png",
  "/assets/favicon/apple-icon-120x120.png",
  "/assets/favicon/apple-icon-144x144.png",
  "/assets/favicon/apple-icon-152x152.png",
  "/assets/favicon/apple-icon-180x180.png",
  "/assets/favicon/apple-icon-57x57.png",
  "/assets/favicon/apple-icon-60x60.png",
  "/assets/favicon/apple-icon-72x72.png",
  "/assets/favicon/apple-icon-76x76.png",
  "/assets/favicon/apple-icon.png",
  "/assets/favicon/browserconfig.xml",
  "/assets/favicon/favicon-16x16.png",
  "/assets/favicon/favicon-32x32.png",
  "/assets/favicon/favicon-96x96.png",
  "/assets/favicon/favicon.ico",
  "/assets/favicon/ms-icon-144x144.png",
  "/assets/favicon/ms-icon-150x150.png",
  "/assets/favicon/ms-icon-310x310.png",
  "/assets/favicon/ms-icon-70x70.png",
  "/assets/favicon/royrustdev.png",
  "/assets/favicon/royrustdev.svg",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(royrustdev_cache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
