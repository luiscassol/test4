# Proyecto de Automatización con Playwright

Este proyecto implementa un framework de automatización de pruebas utilizando Playwright y TypeScript, siguiendo el patrón Page Object Model (POM).

## Características

- Soporte para múltiples entornos (dev, staging, prod)
- Manejo de credenciales temporales usando dotenv
- Organización bajo el patrón Page Object Model (POM)
- Utilidades comunes reutilizables
- Tests independientes organizados
- Generación de reportes HTML
- Ejecución configurable por entorno

## Estructura del Proyecto

```
├── config/
│   └── environments/           # Archivos de configuración por entorno
│       ├── .env.dev
│       ├── .env.staging
│       └── .env.prod
├── report/                     # Reportes y capturas de pantalla
│   ├── screenshots/
│   └── test-results/
├── src/
│   ├── config/                 # Configuraciones adicionales
│   ├── fixtures/               # Fixtures de Playwright
│   ├── pages/                  # Page Objects
│   │   ├── base-page.ts
│   │   ├── login-page.ts
│   │   └── dashboard-page.ts
│   ├── tests/                  # Tests
│   │   └── login.spec.ts
│   └── utils/                  # Utilidades
│       ├── common-utils.ts
│       └── environment/        # Manejo de variables de entorno
├── .env.example                # Plantilla de variables de entorno
├── package.json
├── playwright.config.ts        # Configuración de Playwright
└── README.md
```

## Requisitos Previos

- Node.js 14 o superior
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install

# Instalar los navegadores de Playwright
npx playwright install
```

## Configuración

1. Copia el archivo `.env.example` a un nuevo archivo `.env` en la raíz del proyecto.
2. Configura las variables según tus necesidades.

## Ejecución de Tests

```bash
# Ejecutar todos los tests con el entorno predeterminado
npm test

# Ejecutar tests en un entorno específico
npm run test:dev
npm run test:staging
npm run test:prod

# Ejecutar tests con la interfaz gráfica
npm run test:ui

# Ver el reporte de los tests
npm run report
```

## Generación de Código

```bash
# Iniciar la herramienta de generación de código
npm run codegen
```

## Convenciones de Código

- Seguir principios SOLID
- Métodos pequeños y con un solo propósito
- Usar Page Objects para encapsular interacciones con la UI
- Mantener los tests independientes entre sí
- Evitar hardcodear datos de prueba

## Contribución

1. Crea un nuevo branch para tu feature o fix
2. Implementa tus cambios
3. Asegúrate de que todos los tests pasen
4. Crea un Pull Request