import { test as base } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages';
import { Environment } from '../utils/environment';

/**
 * Tipo para el estado autenticado
 */
type AuthenticatedFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  env: Environment;
};

/**
 * Fixture extendido que proporciona un estado autenticado
 */
export const test = base.extend<AuthenticatedFixtures>({
  // Provee la instancia del entorno
  env: async ({}, use) => {
    const env = Environment.getInstance();
    await use(env);
  },
  
  // Provee la página de login
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  // Provee la página de dashboard
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  
  // Configura el contexto autenticado
  page: async ({ page, env }, use) => {
    // Realiza la navegación a la página de login
    await page.goto(`${env.getBaseUrl()}/login`);
    
    // Opcional: si quieres autenticar automáticamente antes de cada test,
    // descomenta las siguientes líneas
    /*
    const loginPage = new LoginPage(page);
    const credentials = env.getCredentials();
    await loginPage.login(credentials.username, credentials.password);
    
    // Verificar que estamos en el dashboard
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isDashboardLoaded();
    */
    
    await use(page);
  },
});

// Exportamos expect para facilitar su uso
export { expect } from '@playwright/test';
