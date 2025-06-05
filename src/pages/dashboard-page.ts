import { Page } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Page Object para la página de dashboard
 */
export class DashboardPage extends BasePage {
  // Selectores
  private readonly welcomeMessage = '.welcome-message';
  private readonly userMenu = '.user-menu';
  private readonly logoutButton = '.logout-button';
  private readonly dashboardItems = '.dashboard-item';

  /**
   * Constructor de la página de dashboard
   * @param page Instancia de Page de Playwright
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Verifica si estamos en la página de dashboard
   */
  async isDashboardLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.welcomeMessage);
  }

  /**
   * Obtiene el mensaje de bienvenida
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.getText(this.welcomeMessage);
  }

  /**
   * Realiza el logout
   */
  async logout(): Promise<void> {
    await this.click(this.userMenu);
    await this.click(this.logoutButton);
  }

  /**
   * Obtiene el número de elementos del dashboard
   */
  async getDashboardItemsCount(): Promise<number> {
    const items = this.page.locator(this.dashboardItems);
    return await items.count();
  }
}
