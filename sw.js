//cache all assets
var Cache_list = [
  "/",
  "/styles.css",
  "/index.html",
  "/js/app.js",
  "/manifest.json",
  "/icon/icon-36x36.png",
  "/icon/icon-48x48.png",
  "/icon/icon-72x72.png",
  "/icon/icon-96x96.png",
  "/icon/icon-144x144.png",
  "/icon/icon-192x192.png",
  "/icon/icon-256x256.png",
  "/icon/icon-384x384.png",
  "/icon/icon-512x512.png",
  "/images/about-header.jpg",
  "/images/contact-image.jpg",
  "/images/example-blog01.jpg",
  "/images/example-blog02.jpg",
  "/images/example-blog03.jpg",
  "/images/example-blog04.jpg",
  "/images/example-blog05.jpg",
  "/images/example-blog06.jpg",
  "/images/example-blog07.jpg",
  "/images/example-work01.jpg",
  "/images/example-work02.jpg",
  "/images/example-work03.jpg",
  "/images/example-work04.jpg",
  "/images/example-work05.jpg",
  "/images/example-work06.jpg",
  "/images/example-work07.jpg",
  "/images/example-work08.jpg",
  "/images/example-work09.jpg",
  "/images/footer-background.png",
  "/images/header-bg.jpg",
  "/images/logo.png",
  "/images/photo-wide.jpg",
  "/images/photo.jpg",
  "/images/portfolio-example-01.jpg",
  "/images/portfolio-example-02.jpg",
  "/images/portfolio-example-03.jpg",
  "/images/portfolio-example-04.jpg",
  "/images/portfolio-example-05.jpg",
  "/images/portfolio-example-06.jpg",
  "/about.html",
  "/contact.html",
  "/blog.html",
  "/portfolio-example01.html",
  'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en',
  'https://code.getmdl.io/1.3.0/material.min.js',
  'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css',
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("first-app").then(function (cache) {
      cache.addAll(Cache_list);
    })
  );
  
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response; // return cached response if found
      }
      // if response is not found in cache, fetch from network
      return fetch(event.request).then(function (response) {
        if (Cache_list.indexOf(event.request.url) !== -1) {
          return caches.open("first-app").then(function (cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        } else {
          return response;
        }
      });
    })
  );
});
