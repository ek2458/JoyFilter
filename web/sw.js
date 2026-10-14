// Offline cache for the web version. Bump VERSION when files change.
const VERSION = 'joyfilter-v1';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'fonts/fonts.css',
  'vendor/face-api.js',
  'model/ssd_mobilenetv1_model-weights_manifest.json',
  'model/ssd_mobilenetv1_model.bin',
  'model/face_landmark_68_model-weights_manifest.json',
  'model/face_landmark_68_model.bin',
  'model/tiny_face_detector_model-weights_manifest.json',
  'model/tiny_face_detector_model.bin',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }))
  );
});
