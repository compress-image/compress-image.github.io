// Offline support: the app shell is cached so the compressor works without a network.
// Bump VERSION whenever the cached files change.
const VERSION = 'v2';
const CACHE = 'image-compressor-' + VERSION;
const CORE = [
  './',
  './index.html',
  './vendor/jszip.min.js',
  './manifest.webmanifest',
  './favicon.svg',
  './icons/icon-192.png',
  './fonts/space-grotesk-latin-wght-normal.woff2',
  './fonts/ibm-plex-mono-latin-400-normal.woff2',
  './fonts/ibm-plex-mono-latin-500-normal.woff2',
  './fonts/ibm-plex-mono-latin-600-normal.woff2',
  './fonts/ibm-plex-mono-cyrillic-400-normal.woff2',
  './fonts/ibm-plex-mono-cyrillic-500-normal.woff2',
  './fonts/ibm-plex-mono-cyrillic-600-normal.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('image-compressor-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function putInCache(request, response) {
  if (response && (response.ok || response.type === 'opaque')) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Pages: network first so updates show up immediately, cache as a fallback.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => putInCache('./', res))
        .catch(() => caches.match('./').then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Same-origin assets: serve from cache, refresh in the background.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((hit) => {
        const network = fetch(req).then((res) => putInCache(req, res)).catch(() => hit);
        return hit || network;
      })
    );
  }
});
