const CACHE_NAME = 'catgen-cache-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cacheando arquivos principais...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(err => console.error('Falha ao abrir cache:', err))
  );
});

self.addEventListener('fetch', (event) => {
  

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
    
        if (response) {
          console.log('Service Worker: Arquivo encontrado no cache!', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Arquivo não encontrado no cache, buscando na rede...', event.request.url);
        return fetch(event.request);
      })
  );
});