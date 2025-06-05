import { Page } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Page Object para la página de login
 */
export class LoginPage extends BasePage {
  // Selectores
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';

  /**
   * Constructor de la página de login
   * @param page Instancia de Page de Playwright
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navega a la página de login
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/login');
  }

  /**
   * Realiza el login con credenciales específicas
   * @param username Nombre de usuario
   * @param password Contraseña
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Realiza el login con las credenciales del entorno actual
   */
  async loginWithEnvironmentCredentials(): Promise<void> {
    const credentials = this.env.getCredentials();
    await this.login(credentials.username, credentials.password);
  }

  /**
   * Verifica si hay un mensaje de error visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Obtiene el texto del mensaje de error
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
