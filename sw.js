const CACHE_NAME = 'mdl-portfolio-cache-v1';
const CACHE_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/app.js',
  '/images/about-header.jpg',
  '/images/header-bg.jpg',
  '/icon/icon-36x36.png',
  '/icon/icon-48x48.png',
  '/icon/icon-72x72.png',
  '/icon/icon-96x96.png',
  '/icon/icon-144x144.png',
  '/icon/icon-192x192.png',
  '/icon/icon-256x256.png',
  '/icon/icon-384x384.png',
  '/icon/icon-512x512.png',
  '/images/portfolio-example-01.jpg',
  '/images/portfolio-example-02.jpg',
  '/images/portfolio-example-03.jpg',
  '/images/portfolio-example-04.jpg',
  '/images/portfolio-example-05.jpg',
  '/images/portfolio-example-06.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en',
  'https://code.getmdl.io/1.3.0/material.min.js',
  'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[Service Worker] Installing Service Worker ...', event);
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mdl-') && cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('[Service Worker] Fetching something ...', event);
        return response;
      }
      return fetch(event.request);
    })
  );
});
