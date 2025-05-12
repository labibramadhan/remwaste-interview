# SkipHire Showcase

A modern web application for skip hiring services, built with React, TypeScript, and Tailwind CSS v4.1.

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

## Deployment to Cloudflare Pages

This project is configured for deployment to Cloudflare Pages using the included `wrangler.toml` file.

### Automatic Deployment (CI/CD)

1. Push your code to GitHub
2. Connect your GitHub repository to Cloudflare Pages
3. Configure the build settings:
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Node.js version: `18`

### Manual Deployment

To deploy manually using Wrangler:

1. Install Wrangler: `pnpm add -g wrangler`
2. Login to Cloudflare: `wrangler login`
3. Build the project: `pnpm build`
4. Deploy to Cloudflare Pages: `wrangler pages deploy dist`

### Important Notes

- The application uses client-side routing with TanStack Router
- A route rewrite is configured in `wrangler.toml` to handle SPA routing
- Environment variables can be configured in the `[env]` sections of `wrangler.toml`
