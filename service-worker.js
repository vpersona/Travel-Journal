const CACHE_NAME = 'travel-journal-v1';
const urlsToCache = [
  '/',
  '/main.html',
  '/map.html',
  '/newpost.html',
  '/styles/style.css',
  '/styles/map.css',
  '/styles/newpost.css',
  '/scripts/main-script.js',
  '/scripts/map.js',
  '/scripts/newpost.js',
  '/scripts/share.js',
  '/images/plus.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css'
];

// zainstaluj service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// aktywuj service worker i usuń stare cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// fetch z cache 
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('Offline - content not available'))
  );
});