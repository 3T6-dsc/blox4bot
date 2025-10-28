# blox4bot

Discord moderation platform built as a TypeScript monorepo.

## Project Structure

```
blox4bot/
├── apps/
│   └── web/              # Web frontend application
├── services/
│   ├── api/              # Express API backend
│   └── bot/              # Discord bot service
├── packages/
│   ├── config/           # Shared ESLint/TypeScript configuration
│   └── shared/           # Shared types and utilities
└── ...
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Copy the environment file and configure it:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Build all packages:

```bash
pnpm build
```

4. Run services in development mode:

```bash
pnpm dev
```

This will start all services (API, bot, and web) concurrently.

## Available Commands

- `pnpm install` - Install all dependencies
- `pnpm dev` - Run all services in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Check formatting without making changes
- `pnpm ts:check` - Type-check all packages
- `pnpm clean` - Clean all build artifacts

## Environment Variables

See `.env.example` for all required environment variables:

- `DISCORD_BOT_TOKEN` - Your Discord bot token
- `DISCORD_CLIENT_ID` - Discord application client ID
- `DISCORD_CLIENT_SECRET` - Discord application client secret
- `REDIRECT_URL` - OAuth redirect URL
- `BACKEND_API_URL` - Backend API base URL
- `PORT` - API server port (default: 3000)
- `SESSION_SECRET` - Session secret for authentication
- `DATABASE_URL` - PostgreSQL database connection string
- `SENTRY_DSN` - (Optional) Sentry DSN for error tracking

## Development

### Running Individual Services

```bash
# API only
cd services/api && pnpm dev

# Bot only
cd services/bot && pnpm dev

# Web only
cd apps/web && pnpm dev
```

### Adding a New Package

1. Create a new directory under `apps/`, `services/`, or `packages/`
2. Add a `package.json` with workspace dependencies
3. Extend the shared TypeScript and ESLint configurations
4. Add appropriate scripts (build, dev, lint, type-check)

## Code Quality

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Run linters on staged files

Pre-commit hooks will automatically:

- Lint and fix TypeScript files
- Format code with Prettier

Pre-push hooks will:

- Run type-checking on all packages

## CI/CD

GitHub Actions workflow runs on every push and PR:

- Lint all packages
- Format check
- Type-check all packages
- Build all packages

## License

ISC
