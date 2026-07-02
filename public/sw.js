self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('DoniCargo Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  // Pass-through simple pour le mode démo.
});
