import { test, expect } from '../fixtures/auth-fixture';

test.describe('Suite de pruebas de login', () => {
  test('Debe iniciar sesión correctamente con credenciales válidas', async ({ loginPage, dashboardPage }) => {
    // Navegar a la página de login
    await loginPage.navigateToLoginPage();
    
    // Iniciar sesión con credenciales del entorno
    await loginPage.loginWithEnvironmentCredentials();
    
    // Verificar que se ha cargado el dashboard
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();
    
    // Verificar mensaje de bienvenida
    const welcomeMessage = await dashboardPage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Bienvenido');
  });

  test('Debe mostrar error con credenciales inválidas', async ({ loginPage }) => {
    // Navegar a la página de login
    await loginPage.navigateToLoginPage();
    
    // Iniciar sesión con credenciales inválidas
    await loginPage.login('usuario_invalido', 'contraseña_invalida');
    
    // Verificar que se muestra mensaje de error
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    // Verificar texto del mensaje de error
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('credenciales');
  });
});
