const CACHE_NAME = 'realone-v3';
const urlsToCache = ['/', '/index.html'];

// Track all pending notification timeouts so we can cancel them
const pendingTimeouts = [];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('message', e => {
  if (e.data.type === 'SCHEDULE_NOTIFICATION') {
    const id = setTimeout(() => {
      self.registration.showNotification(e.data.title, {
        body: e.data.body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: e.data.tag,
        requireInteraction: false,
      });
    }, e.data.delay);
    pendingTimeouts.push(id);
  }

  if (e.data.type === 'CANCEL_NOTIFICATIONS') {
    while (pendingTimeouts.length > 0) {
      clearTimeout(pendingTimeouts.pop());
    }
  }
});
