/* Mindwave service worker — offline after first load */
const CACHE = 'mindwave-v3';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.hostname === 'api.anthropic.com') return; // AI insight always live

  // Google Fonts: cache at first use so typography survives offline
  if (url.hostname.includes('fonts.g')) {
    e.respondWith(
      caches.open(CACHE).then(async c => {
        const hit = await c.match(e.request);
        if (hit) return hit;
        try { const res = await fetch(e.request); c.put(e.request, res.clone()); return res; }
        catch { return new Response('', { status: 200 }); } // fall back to system fonts
      })
    );
    return;
  }
  // App shell: cache-first, refresh in background
  e.respondWith(
    caches.match(e.request).then(hit => {
      const live = fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || live;
    })
  );
});
