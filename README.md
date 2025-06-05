# Playwright Automation Framework

This project implements a test automation framework using Playwright and TypeScript, following the Page Object Model (POM) pattern.

## Features

- Support for multiple environments (dev, staging, prod)
- Temporary credentials management using dotenv
- Organization under the Page Object Model (POM) pattern
- Reusable common utilities
- Organized independent tests
- HTML report generation
- Configurable execution by environment

## Project Structure

```
├── config/
│   └── environments/           # Environment configuration files
│       ├── .env.dev
│       ├── .env.staging
│       └── .env.prod
├── report/                     # Reports and screenshots
│   ├── screenshots/
│   └── test-results/
├── src/
│   ├── config/                 # Additional configurations
│   ├── fixtures/               # Playwright fixtures
│   ├── pages/                  # Page Objects
│   │   ├── base-page.ts
│   │   ├── login-page.ts
│   │   └── dashboard-page.ts
│   ├── tests/                  # Tests
│   │   └── login.spec.ts
│   └── utils/                  # Utilities
│       ├── common-utils.ts
│       └── environment/        # Environment variables management
├── .env.example                # Environment variables template
├── package.json
├── playwright.config.ts        # Playwright configuration
└── README.md
```

## Prerequisites

- Node.js 14 or higher
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Configuration

1. Copy the `.env.example` file to a new `.env` file in the project root.
2. Configure the variables according to your needs.

## Running Tests

```bash
# Run all tests with the default environment
npm test

# Run tests in a specific environment
npm run test:dev
npm run test:staging
npm run test:prod

# Run tests with the UI
npm run test:ui

# View the test report
npm run report
```

## Code Generation

```bash
# Start the code generation tool
npm run codegen
```

## Code Conventions

- Follow SOLID principles
- Small methods with a single purpose
- Use Page Objects to encapsulate UI interactions
- Keep tests independent from each other
- Avoid hardcoding test data

## Contribution

1. Create a new branch for your feature or fix
2. Implement your changes
3. Make sure all tests pass
4. Create a Pull Request