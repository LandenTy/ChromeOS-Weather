const cacheName = 'no-border-pwa-v1';
const filesToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/192x192.png',   // Add the 192x192 icon to cache
    '/512x512.png',   // Add the 512x512 icon to cache
];

// Install the service worker and cache necessary files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch the assets from the cache first, and then from the network if needed
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
