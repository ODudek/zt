const CACHE_NAME = "zt-project";

let filesToCache = ["/", "/css/*.css", "/js/*.js"];

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
      .catch(function(err) {
        console.error(err);
      })
  );
});

self.addEventListener("fetch", function(evt) {
  evt.respondWith(
    fetch(evt.request).catch(function() {
      return caches.match(evt.request);
    })
  );
});
