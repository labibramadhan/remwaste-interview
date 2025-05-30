# SkipHire Showcase

A modern web application for skip hiring services, built with React, TypeScript, and Tailwind CSS using atomic design principles.

**Live Demo:** [https://remwaste-interview.labib.dev](https://remwaste-interview.labib.dev)

- [SkipHire Showcase](#skiphire-showcase)
  - [Setup](#setup)
  - [Development](#development)
  - [Code Quality Tools](#code-quality-tools)
    - [Husky](#husky)
    - [ESLint](#eslint)
    - [Conventional Commits](#conventional-commits)
  - [Folder Structure](#folder-structure)
  - [Technology Stack](#technology-stack)
    - [Tailwind CSS](#tailwind-css)
    - [Atomic Design Pattern](#atomic-design-pattern)
    - [Zustand](#zustand)
    - [TanStack Router](#tanstack-router)
    - [TanStack Query](#tanstack-query)
  - [Performance Optimizations](#performance-optimizations)
    - [Image Optimization](#image-optimization)
  - [UI/UX Improvements](#uiux-improvements)
    - [Skip Selection Enhancements](#skip-selection-enhancements)
      - [Original Version Issues](#original-version-issues)
      - [Improved Version](#improved-version)
    - [Unavailable Skip Handling](#unavailable-skip-handling)
      - [Original Version Issues](#original-version-issues-1)
      - [Improved Version](#improved-version-1)
    - [Waste Selection Improvements](#waste-selection-improvements)
      - [Original Version Issues](#original-version-issues-2)
      - [Improved Version](#improved-version-2)
    - [Bottom Bar Navigation Improvements](#bottom-bar-navigation-improvements)
      - [Original Version](#original-version)
      - [Improved Version](#improved-version-3)
  - [Testing](#testing)
    - [End-to-End (E2E) Testing with Cypress](#end-to-end-e2e-testing-with-cypress)
      - [E2E Tests Setup](#e2e-tests-setup)
      - [Running E2E Tests](#running-e2e-tests)
      - [E2E Test Features](#e2e-test-features)


## Setup

Install the dependencies:

```bash
pnpm install
```

## Development

Start the dev server:

```bash
pnpm start
```

Build the app for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

Clear persistent cache local files:

```bash
pnpm clean
```

## Code Quality Tools

### Husky

This project uses Husky to enforce code quality standards and consistent commits:

- **Pre-commit Hooks**: Automatically runs linters and formatters before each commit
- **Commit Message Validation**: Ensures all commit messages follow the conventional commit format
- **Prevents Bad Commits**: Stops commits that would break the build or violate code standards

### ESLint

ESLint is configured to enforce code quality and consistency:

- **TypeScript Integration**: Full support for TypeScript-specific linting rules
- **React Best Practices**: Enforces React-specific patterns and practices
- **Auto-fixable Rules**: Many issues can be automatically fixed with `pnpm lint:fix`
- **Custom Configuration**: Tailored ruleset balancing strictness with developer productivity

### Conventional Commits

All commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- **Structured Format**: `type(scope): description` (e.g., `feat(auth): add login page`)
- **Common Types**: feat, fix, docs, style, refactor, test, chore
- **Automated Changelog**: Enables automatic generation of semantic version changelogs
- **Clear History**: Makes the project history more readable and meaningful

## Folder Structure

The project follows an atomic design pattern with a domain-driven approach:

```
cypress/                  # Cypress testing directory
├── e2e/                # End-to-end tests (.cy.ts files)
├── fixtures/           # Test data for mocking API responses
└── support/            # Support files (commands, configuration)

src/
├── components/       # Global shared components
│   ├── atoms/        # Basic building blocks (buttons, inputs, etc.)
│   ├── molecules/    # Combinations of atoms (form fields, cards, etc.)
│   └── organisms/    # Complex UI components composed of molecules and atoms
├── config/           # Configuration files
│   └── env.ts        # Environment variables configuration
├── constants/        # Application-wide constants
│   └── waste.ts      # Constants related to waste types and percentages
├── hooks/            # Global shared hooks
├── modules/          # Feature modules using atomic design pattern
│   ├── order/        # Order-related features
│   │   ├── components/  # Components specific to the order module
│   │   │   ├── atoms/      # Basic order UI elements
│   │   │   ├── molecules/  # Composed order elements (SkipCard, NavigationTab)
│   │   │   └── organisms/  # Complex order components (SkipSelectionGrid)
│   │   ├── hooks/       # Order-specific hooks
│   │   ├── pages/       # Page components (SkipSelectionPage)
│   │   └── store/       # Zustand store for order state management
│   ├── skips/        # Skip-related features
│   │   └── hooks/    # Skip-specific hooks (useSkips for API integration)
│   └── waste/        # Waste-related features
│       └── utils/    # Waste validation and processing utilities
├── types/           # TypeScript type definitions
│   ├── skip.ts      # Skip-related types and interfaces
│   └── waste.ts     # Waste-related types and interfaces
└── utils/           # Utility functions
```

## Technology Stack

### Tailwind CSS

Tailwind CSS is used for styling components with a utility-first approach.

**Why Tailwind CSS?**
- **Utility-First**: Enables rapid UI development with predefined utility classes
- **Customization**: Easy to extend and customize through configuration
- **Performance**: Only includes the CSS that's actually used
- **Responsive Design**: Built-in responsive design utilities
- **Dark Mode**: Simple dark mode implementation

The project uses Tailwind CSS v3 configured through PostCSS:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #0037c1;
  --color-card: #1c1c1c;
  --color-card-border: #2a2a2a;
}

@layer utilities {
  .bg-primary {
    background-color: var(--color-primary);
  }
  /* Other custom utilities... */
}
```

### Atomic Design Pattern

The codebase follows the atomic design methodology, organizing components into:

- **Atoms**: Basic building blocks (buttons, inputs, icons)
- **Molecules**: Combinations of atoms (form fields, cards)
- **Organisms**: Complex UI sections (headers, skip grids)
- **Pages**: Complete views composed of organisms

This approach offers:
- **Consistency**: Reusable components ensure UI consistency
- **Maintainability**: Changes to base components cascade throughout the application
- **Efficiency**: Components can be developed and tested in isolation
- **Scalability**: Easy to add new features by composing existing components

### Zustand

Zustand is used for state management across the application.

**Why Zustand?**
- **Simplicity**: Minimal boilerplate compared to Redux
- **TypeScript Integration**: Strong typing support
- **Atomic Updates**: Fine-grained control over state updates
- **Middleware Support**: Enables persistence, logging, etc.
- **Performance**: Minimizes re-renders with its subscription model

Example (from `src/modules/order/store/useOrderStore.ts`):
```tsx
const useOrderStore = create<OrderStore>((set) => ({
  selectedSkip: null,
  heavyWasteInfo: null,
  setSelectedSkip: (skip) => set({ selectedSkip: skip }),
  setHeavyWasteInfo: (info) => set({ heavyWasteInfo: info }),
}));
```

### TanStack Router

TanStack Router (formerly React Router) handles client-side routing.

**Why TanStack Router?**
- **Type Safety**: First-class TypeScript support
- **Data Fetching**: Built-in data loading and prefetching capabilities
- **Search Params**: Strongly typed URL search parameters
- **Code Splitting**: Automatic route-based code splitting
- **Redirects & Guards**: Native support for route guards and redirects

Example (from `src/router.tsx`):
```tsx
const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/order/select-skip' });
  },
});
```

### TanStack Query

TanStack Query (formerly React Query) manages data fetching, caching, and synchronization.

**Why TanStack Query?**
- **Automatic Caching**: Built-in request deduplication and caching
- **Background Updates**: Automatic refetching and stale-while-revalidate
- **Loading & Error States**: Simple handling of loading and error states
- **Pagination & Infinite Scrolling**: First-class support
- **Optimistic Updates**: Improve perceived performance

Example (from `src/modules/skips/hooks/useSkips.ts`):
```tsx
export function useSkips() {
  return useQuery({
    queryKey: ['skips'],
    queryFn: async () => {
      // Fetch data from API
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.map(mapSkipData);
    },
  });
}
```

## Performance Optimizations

### Image Optimization

This project implements automated image optimization using Gulp and Sharp to improve page load times and performance:

```javascript
// gulpfile.js
const gulp = require('gulp');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');

async function optimizeFolder(subfolder) {
  const srcDir = path.join(imagesDir, subfolder);
  const destDir = path.join(imagesDir, subfolder + '_optimized');
  await fs.ensureDir(destDir);
  const files = (await fs.readdir(srcDir)).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file),
  );

  await Promise.all(
    files.map(async (file) => {
      const inputPath = path.join(srcDir, file);
      const outputName = path.parse(file).name + '.webp';
      const outputPath = path.join(destDir, outputName);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    }),
  );
}
```

**Key Features:**

- **WebP Conversion**: All images are converted to the modern WebP format for smaller file sizes
- **Quality Optimization**: Images are optimized at 80% quality, balancing visual fidelity with performance
- **Organized Structure**: Optimized images are stored in separate "_optimized" folders
- **Broad Format Support**: Works with JPEG, PNG, and existing WebP files

This optimization process significantly reduces image file sizes while maintaining visual quality, resulting in faster page loads and improved user experience.

## UI/UX Improvements

This project implements several significant improvements over the original [WeWantWaste](https://wewantwaste.co.uk/) website. The following changes enhance user experience and conversion rates:

### Skip Selection Enhancements

#### Original Version Issues
![Original Skip Selection](docs/images/current-ss-1.png)

- **Missing Information**: No indication of recommended or popular skip options
- **Pricing Display**: Standard pricing without highlighting discounts
- **Selection Feedback**: Limited visual feedback on skip selection

#### Improved Version
![Improved Skip Selection](docs/images/after-ss-1.png)

- **Feature Badges**: Added "Popular" and "Recommended" badges to help users make informed decisions
- **Enhanced Pricing**: Clear display of original price with discount, making the offer more compelling
- **Selection Indicators**: Added check mark icons on selected skips for better user feedback
- **Waste Type Selection**: Added ability to modify previously selected waste type from this page

### Unavailable Skip Handling

#### Original Version Issues
![Original Unavailable Skips](docs/images/current-ss-2.png)

- **Poor Organization**: Available skips mixed with unavailable ones, creating confusion
- **Unclear Messaging**: Lack of explanation why certain skips are unavailable

#### Improved Version
![Improved Unavailable Skips](docs/images/after-ss-2.png)

- **Clear Reasoning**: Added explicit explanation of why skips cannot be selected
- **Action Options**: Included button to change waste type when larger skip sizes are needed
- **Better Organization**: Improved skip ordering for better discoverability, so all available skips comes before unavailable skips

### Waste Selection Improvements

#### Original Version Issues
![Original Waste Selection](docs/images/current-ss-3.png)

- **Limited Information**: Basic waste type selection without helpful context

#### Improved Version
![Improved Waste Selection](docs/images/after-ss-3.jpeg)

- **Enhanced Information**: More detailed descriptions of waste types
- **Improved Interface**: Better visual layout and interaction design
- **User Guidance**: Clearer direction on waste type selection process

### Bottom Bar Navigation Improvements

#### Original Version
![Original Bottom Bar](docs/images/current-ss-4.png)

#### Improved Version
![Improved Bottom Bar](docs/images/after-ss-4.png)

- **Skip Summary Display**: Added catchy selected skip information including total hire days and saved price discount amount

These improvements result in a more intuitive, informative, and conversion-focused user experience.

## Testing

### End-to-End (E2E) Testing with Cypress

This project includes automated end-to-end tests using Cypress to ensure that user flows work as expected. The E2E tests simulate real user interactions with the application and verify that all components render correctly and that the application behaves as expected.

#### E2E Tests Setup

The E2E tests are configured in `cypress.config.js` and are located in the `cypress/e2e` directory. Test files use the `.cy.ts` extension, allowing for TypeScript support.

```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5002',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  env: {
    API_URL: 'https://app.wewantwaste.co.uk/api',
  },
});
```

#### Running E2E Tests

To run the E2E tests, follow these steps:

1. Start the development server in one terminal:

```bash
pnpm dev
```

2. Open a new terminal and run the Cypress E2E tests:

```bash
pnpm test:e2e
```

This will open the Cypress Test Runner where you can select and run individual tests or run all tests at once.

#### E2E Test Features

The E2E tests cover the following key features:

- **Skip Selection Page**: Tests the rendering and functionality of the skip selection page
- **Network Stubbing**: Uses Cypress interceptors to mock API responses
- **UI Interaction**: Tests clicking on skip cards and verifying selection
- **Visual Indicators**: Checks that badges like "Popular" and "Recommended" appear correctly
- **Error States**: Verifies that error messages appear when the API fails

Example of an E2E test for the skip selection page:

```typescript
describe('Skip Selection Page', () => {
  beforeEach(() => {
    // Stub the API response for skips
    cy.intercept('GET', '**/skips/by-location*', { fixture: 'skips.json' }).as('getSkips');
    
    // Visit the skip selection page directly
    cy.visit('/order/select-skip');
    
    // Wait for the API call to complete
    cy.wait('@getSkips');
  });

  it('displays skip selection page with options', () => {
    // Verify that the page title displays correctly
    cy.contains('h2', 'Choose Your Skip Size').should('be.visible');
    
    // Verify skips are loaded and displayed
    cy.get('[data-testid="skip-card"]').should('have.length.at.least', 1);
  });
});
```

Data attributes (`data-testid`) are used throughout the application to provide reliable selectors for testing, making the tests more resilient to UI changes.