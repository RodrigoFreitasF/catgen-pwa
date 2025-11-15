import express from 'express';
import cors from 'cors'; 

const CAT_API_URL = 'https://cataas.com/cat?json=true'; 
const BASE_URL = 'https://cataas.com'; 
const PORT = 3000; 

const app = express();
app.use(cors());


app.get('/api/gato', async (req, res) => {
  console.log('Requisição recebida. Tentando Cataas...'); 
  
  try {
    const apiResponse = await fetch(CAT_API_URL);
    
    if (!apiResponse.ok) {
        throw new Error(`Cataas retornou status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    
    const catImageUrl = BASE_URL + data.url; 

    res.json({ imageUrl: catImageUrl });

  } catch (error) {
    console.error('--- ERRO FATAL DE CONEXÃO/REDE EXTERNA ---');
    console.error(error); 
    console.error('-------------------------------------------');
    
    res.status(500).json({ error: 'Falha grave ao buscar imagem (Cataas).' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor API (CatGen) rodando na porta ${PORT}`);
});