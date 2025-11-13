// Define um nome e versão para o cache
const CACHE_NAME = 'catgen-cache-v1';

// Lista de arquivos que o PWA deve salvar em cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Evento 'install': Ocorre quando o Service Worker é instalado
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  
  // Espera a instalação terminar antes de prosseguir
  event.waitUntil(
    // Abre o cache com o nome definido
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Adiciona todos os nossos arquivos (assets) ao cache
        console.log('Service Worker: Cacheando arquivos principais...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(err => console.error('Falha ao abrir cache:', err))
  );
});

// Evento 'fetch': Ocorre toda vez que o PWA tenta buscar um arquivo (ex: CSS, JS, imagem, ou uma chamada de API)
self.addEventListener('fetch', (event) => {
  
  // Estratégia: "Cache first, then network"
  // (Primeiro tenta pegar do cache. Se não achar, busca na rede)
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 1. Encontrou no cache?
        if (response) {
          console.log('Service Worker: Arquivo encontrado no cache!', event.request.url);
          return response; // Retorna o arquivo do cache
        }
        
        // 2. Não encontrou no cache?
        console.log('Service Worker: Arquivo não encontrado no cache, buscando na rede...', event.request.url);
        return fetch(event.request); // Vai buscar na internet
      })
  );
});