# EL'DA Design

Production-ready website foundation for EL'DA Design, based on the approved Figma concept.

## Stack

- Next.js App Router, React and strict TypeScript
- CSS Modules and CSS custom properties
- Motion for React
- Payload CMS and PostgreSQL
- Telegram Bot API notifications for new leads
- Vitest, Testing Library and Playwright
- Docker and GitHub Actions

## Local setup

1. Install Node from `.nvmrc` and enable Corepack.
2. Copy `.env.example` to `.env` and replace development placeholders.
3. Start PostgreSQL: `docker compose up -d postgres`.
4. Install dependencies: `pnpm install`.
5. Generate Payload files: `pnpm generate:types && pnpm generate:importmap`.
6. Start the project: `pnpm dev`.

The public site is available at `http://localhost:3000`; Payload Admin is at
`http://localhost:3000/admin`.

## Lead flow

1. A server-side form handler validates input with Zod.
2. Cloudflare Turnstile is verified in production.
3. The lead is saved to the Payload `leads` collection.
4. The Telegram bot sends an HTML-safe notification to every chat in
   `TELEGRAM_MANAGER_CHAT_IDS`.
5. Delivery status and errors are stored on the lead record.

Telegram chat IDs are comma-separated. Tokens and secrets must never be committed.

## Structure

```text
src/
  app/
    (site)/          public website
    (payload)/       CMS admin and REST API
    api/health/      infrastructure health check
  components/        shared layout, sections and UI primitives
  features/
    leads/           validation and lead creation
    telegram/        manager notifications
  lib/               site configuration and SEO helpers
  payload/
    collections/     CMS data models
    globals/         global site settings
  styles/            tokens, reset and global styles
tests/
  unit/
  e2e/
```

## Quality gates

Run `pnpm check` before opening a pull request. The CI workflow validates ESLint,
Stylelint, TypeScript, unit tests and the production build.
