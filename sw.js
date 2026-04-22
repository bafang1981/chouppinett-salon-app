const CACHE_NAME = 'strandpro-v1';
const STATIC_CACHE = 'strandpro-static-v1';
const DYNAMIC_CACHE = 'strandpro-dynamic-v1';

// Static assets to cache
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Strategy for static assets (cache first)
  if (STATIC_ASSETS.some(asset => url.pathname === asset.replace('./', '/')) || 
      url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then(response => {
              // Cache successful responses
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then(cache => cache.put(request, responseClone));
              }
              return response;
            })
            .catch(() => {
              // Return cached version if network fails
              return caches.match(request);
            });
        })
    );
    return;
  }

  // Strategy for HTML pages (network first, fallback to cache)
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cached version or offline page
          return caches.match(request) || caches.match('./index.html');
        })
    );
    return;
  }

  // Default strategy for other requests (network first)
  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache successful responses for dynamic content
        if (response.ok && request.destination === 'script' || request.destination === 'style') {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
        }
        return response;
      })
      .catch(() => {
        // Try cache for scripts and styles
        if (request.destination === 'script' || request.destination === 'style') {
          return caches.match(request);
        }
        // For other requests, just fail
        return Promise.reject('Network request failed');
      })
  );
});
// Push notification event
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  const data = event.data ? event.data.json() : { 
    title: 'StrandPro', 
    body: 'You have a new notification.' 
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || './icons/icon-192x192.png',
      badge: data.badge || './icons/icon-72x72.png',
      tag: data.tag || 'strandpro',
      data: data.url || './',
      requireInteraction: false,
      silent: false
    })
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        // Focus existing window if open
        for (const client of clientList) {
          if (client.url === event.notification.data && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if none exists
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data || './');
        }
      })
  );
});
