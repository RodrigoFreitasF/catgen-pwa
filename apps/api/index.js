import express from 'express';
import cors from 'cors'; 

// Tentativa com uma API de Gatos diferente, mais robusta (Cataas)
const CAT_API_URL = 'https://cataas.com/cat?json=true'; 
const BASE_URL = 'https://cataas.com'; // Onde as imagens estão hospedadas
const PORT = 3000; 

const app = express();
app.use(cors());

// Rota para buscar o gato
app.get('/api/gato', async (req, res) => {
  console.log('Requisição recebida. Tentando Cataas...'); 
  
  try {
    // 1. Chama a API
    const apiResponse = await fetch(CAT_API_URL);
    
    if (!apiResponse.ok) {
        throw new Error(`Cataas retornou status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    
    // A API Cataas retorna um URL parcial, precisamos adicionar a base
    const catImageUrl = BASE_URL + data.url; 

    // 2. Envia a URL da imagem de volta para o PWA
    res.json({ imageUrl: catImageUrl });

  } catch (error) {
    // Log de erro de conexão detalhado
    console.error('--- ERRO FATAL DE CONEXÃO/REDE EXTERNA ---');
    console.error(error); 
    console.error('-------------------------------------------');
    
    // Retorna um erro 500 para o frontend
    res.status(500).json({ error: 'Falha grave ao buscar imagem (Cataas).' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor API (CatGen) rodando na porta ${PORT}`);
});