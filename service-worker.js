

// Choose a cache name
const cacheName = 'cache-v2';
// List the files to precache
const precacheResources = ['/', '/index.html'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

// this would be used in updating the serviceWorker, where u can loop through all the caches
//  by their names and delete the caches u want that were used by the old service  
self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
//   console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(

    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
       console.log('Fetch intercepted for:', event.request.url, 'and respond with the cache files');

        return cachedResponse;
      }
      console.log('Fetch intercepted for:', event.request.url, 'and redirect it to the network');

      return fetch(event.request);
    }),
  );
});
