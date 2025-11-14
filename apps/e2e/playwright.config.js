// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Onde os arquivos de teste estão
  testDir: './tests',
  
  // URL base para todos os testes (onde seu PWA está rodando)
  use: {
    baseURL: 'http://localhost:8080', 
    trace: 'on-first-retry',
  },

  // Roda em Chromium, Firefox e WebKit
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});