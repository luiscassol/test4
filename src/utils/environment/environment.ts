import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

/**
 * Clase para manejar la configuración de entorno
 */
export class Environment {
  private static instance: Environment;
  private env: Record<string, string> = {};

  private constructor() {
    this.loadEnvironment();
  }

  /**
   * Obtiene la instancia singleton de Environment
   */
  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  /**
   * Carga las variables de entorno basadas en el valor de ENV
   */
  private loadEnvironment(): void {
    // Primero cargamos el archivo .env si existe en la raíz
    dotenv.config();
    
    // Determinamos el entorno a usar (dev, staging, prod)
    const env = process.env.ENV || 'dev';
    
    // Ruta al archivo de entorno específico
    const envPath = path.resolve(process.cwd(), `config/environments/.env.${env}`);
    
    // Verificamos si el archivo existe
    if (fs.existsSync(envPath)) {
      // Cargamos las variables del archivo de entorno específico
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      
      // Asignamos las variables al objeto env y al process.env
      for (const key in envConfig) {
        this.env[key] = envConfig[key];
        process.env[key] = envConfig[key];
      }
    } else {
      console.warn(`Archivo de entorno ${envPath} no encontrado. Usando variables de entorno predeterminadas.`);
    }
  }

  /**
   * Obtiene una variable de entorno
   * @param key Nombre de la variable
   * @param defaultValue Valor por defecto si la variable no existe
   */
  public get(key: string, defaultValue: string = ''): string {
    return this.env[key] || process.env[key] || defaultValue;
  }

  /**
   * Obtiene la URL base del entorno actual
   */
  public getBaseUrl(): string {
    return this.get('BASE_URL', 'https://example.com');
  }

  /**
   * Obtiene las credenciales de usuario
   */
  public getCredentials(): { username: string; password: string } {
    return {
      username: this.get('USERNAME', ''),
      password: this.get('PASSWORD', '')
    };
  }

  /**
   * Obtiene el timeout predeterminado
   */
  public getDefaultTimeout(): number {
    return parseInt(this.get('DEFAULT_TIMEOUT', '30000'), 10);
  }

  /**
   * Obtiene el entorno actual
   */
  public getCurrentEnvironment(): string {
    return this.get('ENV', 'dev');
  }
}
