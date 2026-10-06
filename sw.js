/* ==========================================================================
   Attendance Analyzer — Instant Service Worker & Offline Cache Storage
   Version: 4.1.0
   ========================================================================== */

const CACHE_NAME = 'caa-web-cache-v4.1.5';

// Compute base URL dynamically from Service Worker location (works on root domain, GitHub Pages /repo/, or any CDN)
const SW_SCOPE = self.registration ? self.registration.scope : self.location.href;

const RELATIVE_ASSETS = [
  './',
  'index.html',
  'browsers.html',
  'faq.html',
  'sidepanel.html',
  'updates.html',
  'proof.html',
  'policy.html',
  'payment.html',
  'install.html',
  'donation-policy.html',
  'advertise.html',
  'styles.css?v=4.1.5',
  'navigation.js?v=4.1.5',
  'main.js?v=4.1.5',
  'sdg-data.js?v=4.1.5',
  'assets/icon48.png?v=4.1.5',
  'version.json'
];

// Map relative paths to absolute URLs within the current host & subfolder scope
const PRECACHE_ASSETS = RELATIVE_ASSETS.map((asset) => {
  try {
    return new URL(asset, SW_SCOPE).href;
  } catch (e) {
    return asset;
  }
});

// Install: Cache core shell immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial warning:', err);
      });
    })
  );
});

// Activate: Clean up old caches & take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate for HTML pages (0ms instant load + background fresh update)
// Cache-First for static assets (CSS, JS, Fonts, Images)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests for same origin and trusted CDNs
  if (request.method !== 'GET') return;

  const isSameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com');

  if (!isSameOrigin && !isGoogleFont) return;

  // Stale-While-Revalidate Strategy for HTML navigation and static assets
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);

      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Network failed (offline)
        return cachedResponse;
      });

      // If cached response exists, return instantly (0ms latency), while updating cache in background
      return cachedResponse || fetchPromise;
    })
  );
});
