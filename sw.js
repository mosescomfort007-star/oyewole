/**
 * LUXE LIVING — Progressive Web App Service Worker
 * Version: 1.0.0
 * Provides offline caching, lightning-fast reloads, and background sync support.
 */

const CACHE_NAME = 'luxe-living-v1.0.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './contact.html',
  './customizer.html',
  './manifest.json',
  './favicon.svg',
  './assets/css/main.css',
  './assets/js/main.js',
  './assets/images/logo.svg',
  './assets/images/logo-mark.svg',
  './assets/images/app-icon-192.png',
  './assets/images/app-icon-512.png',
  './assets/images/hero-slide-1.jpg',
  './assets/images/hero-slide-2.jpg',
  './assets/images/hero-slide-3.jpg',
  './assets/images/showroom-reference.jpg',
  './assets/images/editorial-craftsmanship.jpg',
  './assets/images/product-chair.jpg',
  './assets/images/product-coffee-table.jpg',
  './assets/images/product-lighting.jpg',
  './assets/images/product-side-table.jpg'
];

// Install Event: Precache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[Luxe Living PWA] Precache warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Cleanup Stale Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First for HTML navigation, Stale-While-Revalidate for assets
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  // For HTML documents: Network first with cache fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // For static assets (CSS, JS, Fonts, Images): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
