self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('airhorner').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        './dist/build.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});