
const API_URL = '/api/gato';


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


document.addEventListener('DOMContentLoaded', () => {
  const btnGato = document.getElementById('btn-gato');
  const imgGato = document.getElementById('img-gato');
  const statusEl = document.getElementById('status');

  btnGato.addEventListener('click', buscarNovoGato);

  async function buscarNovoGato() {
    console.log('Botão clicado! Buscando gato...');
    statusEl.textContent = 'Buscando gato... 😸';
    imgGato.src = ''; 

    try {
      console.log('Fazendo fetch para:', API_URL);
      const response = await fetch(API_URL);
      console.log('Resposta recebida:', response.status);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      imgGato.src = data.imageUrl;
      console.log('Imagem setada para:', data.imageUrl);
      statusEl.textContent = 'Gato encontrado!';

    } catch (error) {
      console.error('Erro ao buscar gato:', error);
      statusEl.textContent = 'Falha ao buscar gato. (A API está rodando?)';
      
      imgGato.src = 'https://cataas.com/cat/says/Falhou';
    }
  }
});