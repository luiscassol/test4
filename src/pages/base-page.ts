import { Page, Locator, expect } from '@playwright/test';
import { Environment } from '../utils/environment';

/**
 * Clase base para todos los Page Objects
 */
export class BasePage {
  protected page: Page;
  protected env: Environment;
  
  /**
   * Constructor de la clase base
   * @param page Instancia de Page de Playwright
   */
  constructor(page: Page) {
    this.page = page;
    this.env = Environment.getInstance();
  }

  /**
   * Navega a la URL base del entorno actual
   */
  async navigateToBaseUrl(): Promise<void> {
    await this.page.goto(this.env.getBaseUrl());
  }

  /**
   * Navega a una ruta específica relativa a la URL base
   * @param path Ruta a navegar
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${this.env.getBaseUrl()}${path}`);
  }

  /**
   * Espera a que un elemento sea visible
   * @param selector Selector del elemento
   * @param timeout Timeout opcional en milisegundos
   */
  async waitForElement(selector: string, timeout?: number): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ 
      state: 'visible', 
      timeout: timeout || this.env.getDefaultTimeout() 
    });
    return element;
  }

  /**
   * Verifica si un elemento está visible
   * @param selector Selector del elemento
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  /**
   * Hace clic en un elemento
   * @param selector Selector del elemento
   */
  async click(selector: string): Promise<void> {
    const element = await this.waitForElement(selector);
    await element.click();
  }

  /**
   * Rellena un campo de texto
   * @param selector Selector del elemento
   * @param text Texto a ingresar
   */
  async fill(selector: string, text: string): Promise<void> {
    const element = await this.waitForElement(selector);
    await element.fill(text);
  }

  /**
   * Obtiene el texto de un elemento
   * @param selector Selector del elemento
   */
  async getText(selector: string): Promise<string> {
    const element = await this.waitForElement(selector);
    return await element.innerText();
  }

  /**
   * Espera a que una URL contenga un patrón específico
   * @param urlPattern Patrón de URL a esperar
   * @param timeout Timeout opcional en milisegundos
   */
  async waitForUrl(urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await this.page.waitForURL(urlPattern, { 
      timeout: timeout || this.env.getDefaultTimeout() 
    });
  }
}
