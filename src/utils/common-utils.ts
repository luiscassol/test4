import { Page } from '@playwright/test';

/**
 * Utilidades comunes para los tests
 */
export class CommonUtils {
  /**
   * Espera un tiempo específico (usar solo cuando sea absolutamente necesario)
   * @param ms Tiempo en milisegundos
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Genera un string aleatorio
   * @param length Longitud del string
   */
  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }

  /**
   * Genera un email aleatorio
   */
  static generateRandomEmail(): string {
    return `test-${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Formatea una fecha en el formato deseado
   * @param date Fecha a formatear
   * @param format Formato deseado (por defecto: YYYY-MM-DD)
   */
  static formatDate(date: Date = new Date(), format: string = 'YYYY-MM-DD'): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  }

  /**
   * Toma una captura de pantalla y la guarda con un nombre único
   * @param page Instancia de Page de Playwright
   * @param name Nombre base para la captura
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `report/screenshots/${name}_${timestamp}.png` });
  }
}
