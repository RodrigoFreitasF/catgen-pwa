const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:8080', 
    trace: 'on-first-retry',
  },

  
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});