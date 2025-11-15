const { test, expect } = require('@playwright/test');

test.describe('Validação da Interface do PWA', () => {
  
  test('deve carregar o PWA e garantir que o título e os elementos principais estão visíveis', async ({ page }) => {
    
    await page.goto('/');
    
    await expect(page).toHaveTitle(/CatGen PWA/);
    
    const button = page.getByRole('button', { name: 'Me dê um gato!' });
    await expect(button).toBeVisible();
    
    const imageElement = page.locator('#img-gato');
    await expect(imageElement).toBeVisible();

  });
});