self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('DoniCargo Service Worker activated');
});

self.addEventListener('fetch', () => {
  // Pass-through simple pour le mode démo.
});
