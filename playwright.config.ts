import { PlaywrightTestConfig, devices } from '@playwright/test';
import { Environment } from './src/utils/environment';

// Inicializar el entorno
const env = Environment.getInstance();
const currentEnv = env.getCurrentEnvironment();

/**
 * Configuración de Playwright para los tests
 * @see https://playwright.dev/docs/test-configuration
 */
const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: env.getDefaultTimeout(),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: './report', open: 'never' }],
    ['list']
  ],
  
  use: {
    baseURL: env.getBaseUrl(),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    
    // Navegadores a headless por defecto en CI
    headless: !!process.env.CI,
    
    // Configuración del viewport
    viewport: { width: 1280, height: 720 },
  },
  
  // Configuración de los proyectos
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // También podemos definir configuraciones para móviles
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  
  // Carpeta para los outputs de los tests
  outputDir: 'report/test-results',
};

// Muestra el entorno actual
console.log(`Running tests in ${currentEnv.toUpperCase()} environment`);

export default config;
