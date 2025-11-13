// A URL da NOSSA API (que vamos rodar no Docker)
// O Docker Compose vai expor nossa API na porta 3000
const API_URL = 'http://api:3000/api/gato';

// 1. Registro do Service Worker (Passo 4)
// Isso é essencial para o PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((error) => {
      console.log('Falha ao registrar Service Worker:', error);
    });
} else {
  console.log('Navegador não suporta Service Worker.');
}

// 2. Lógica da aplicação
document.addEventListener('DOMContentLoaded', () => {
  const btnGato = document.getElementById('btn-gato');
  const imgGato = document.getElementById('img-gato');
  const statusEl = document.getElementById('status');

  btnGato.addEventListener('click', buscarNovoGato);

  async function buscarNovoGato() {
    statusEl.textContent = 'Buscando gato... 😸';
    imgGato.src = ''; // Limpa a imagem anterior

    try {
      // 3. Chama a NOSSA API (o backend em /apps/api)
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Atualiza a imagem e o status
      imgGato.src = data.imageUrl;
      statusEl.textContent = 'Gato encontrado!';

    } catch (error) {
      console.error('Erro ao buscar gato:', error);
      statusEl.textContent = 'Falha ao buscar gato. (A API está rodando?)';
      // Coloca uma imagem de erro
      imgGato.src = 'https://cataas.com/cat/says/Falhou';
    }
  }
});