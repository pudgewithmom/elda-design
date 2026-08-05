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
3. Start PostgreSQL: `pnpm db:start`.
4. Install dependencies: `pnpm install`.
5. Apply Payload migrations: `pnpm db:migrate`.
6. Generate Payload files: `pnpm generate:types && pnpm generate:importmap`.
7. Verify PostgreSQL, Payload hooks and temporary lead cleanup: `pnpm infra:check`.
8. Start the project: `pnpm dev`.

The public site is available at `http://localhost:3000`; Payload Admin is at
`http://localhost:3000/admin`. On the first visit, Payload will ask you to create
the first administrator account.

The project container is exposed on `127.0.0.1:5433` to avoid conflicts with a
system PostgreSQL installation. Payload migrations are versioned in `src/migrations`.

## Lead flow

1. A server-side form handler validates input with Zod.
2. Cloudflare Turnstile is verified in production.
3. The lead is saved to the Payload `leads` collection.
4. The Telegram bot sends an HTML-safe notification to every chat in
   `TELEGRAM_MANAGER_CHAT_IDS`.
5. Delivery status and errors are stored on the lead record.

Telegram chat IDs are comma-separated. Tokens and secrets must never be committed.

## Telegram setup

1. Create a bot through `@BotFather` and put its token into
   `TELEGRAM_BOT_TOKEN` in the deployment secret store or local `.env`.
2. Ask every manager to open the new bot and send `/start`.
3. Run `pnpm telegram:discover` and copy the returned numeric IDs into
   `TELEGRAM_MANAGER_CHAT_IDS`, separated by commas.
4. Run `pnpm telegram:check` to validate the bot and all manager chats.
5. Run `pnpm telegram:test` to send one test notification to every manager.

Every real lead is stored before notification delivery. Payload records `sent`,
`skipped` or `failed` on the lead, so a temporary Telegram failure does not lose
the application. Telegram requests retry rate-limit, network and server failures.

Required production secrets:

```text
DATABASE_URL
PAYLOAD_SECRET
NEXT_PUBLIC_SITE_URL
TELEGRAM_BOT_TOKEN
TELEGRAM_MANAGER_CHAT_IDS
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

Run `pnpm db:migrate` as a release step before starting a new application version.
The `/api/health` endpoint checks the actual database connection and reports
Telegram configuration readiness without exposing secret values.

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
