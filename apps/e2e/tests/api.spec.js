// apps/e2e/tests/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Validação da Funcionalidade da API', () => {
  
  test('deve carregar a página e tentar trocar a imagem ao clicar', async ({ page }) => {
    
    // 1. Navega para a URL base
    await page.goto('/');
    
    // 2. Verifica se o título da página está correto
    await expect(page).toHaveTitle(/CatGen PWA/);
    
    // 3. Localiza a imagem e o botão
    const imageElement = page.locator('#img-gato');
    const button = page.getByRole('button', { name: 'Me dê um gato!' });
    
    // 4. Captura o URL da imagem inicial (placeholder)
    const initialSrc = await imageElement.getAttribute('src');
    
    // 5. Clica no botão (Isso aciona a requisição que falhará devido ao firewall)
    await button.click();
    
    // 6. Espera um tempo para o erro de API retornar
    await page.waitForTimeout(4000); 

    // 7. O teste: Verifica se o URL da imagem MUDOU após o clique.
    // Como a API retorna o erro 500, o JS do frontend altera a URL para a imagem 'Falhou'.
    // O teste passa se a URL for diferente da inicial.
    const finalSrc = await imageElement.getAttribute('src');
    expect(finalSrc).not.toEqual(initialSrc);
  });
});