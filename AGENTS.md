# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

This is a Next.js 16 + PayloadCMS 3 template for building headless CMS-powered websites. It uses React 19, TypeScript, TailwindCSS 4, and PostgreSQL.

## Commands

### Development
```bash
pnpm dev              # Start development server (localhost:3000)
pnpm devsafe          # Clear .next cache and start fresh
```

### Building & Production
```bash
pnpm build            # Production build
pnpm start            # Start production server
pnpm next:analyze     # Analyze bundle size
```

### Code Quality
```bash
pnpm lint             # Run Biome linter
pnpm format           # Format code with Ultracite
pnpm check            # Biome check with auto-fixes
```

### Testing
```bash
pnpm test             # Run unit tests once
pnpm test:watch       # Watch mode
pnpm test:ui          # Vitest UI dashboard
pnpm test:coverage    # Generate coverage reports
pnpm e2e              # Run Playwright E2E tests
pnpm e2e:ui           # Playwright UI mode
pnpm e2e:headed       # Run E2E with browser visible
```

### PayloadCMS
```bash
pnpm payload generate:types      # Regenerate TypeScript types after schema changes
pnpm payload generate:importmap  # Regenerate import map
pnpm payload migrate             # Run database migrations
pnpm payload seed                # Seed database with sample data
```

## Architecture

### Directory Structure

- **`app/(frontend)/`** - Public website routes (Next.js App Router)
- **`app/(payload)/`** - PayloadCMS admin panel (mounted at `/admin`)
- **`app/api/v1/`** - REST API endpoints (leads, preview)
- **`payload/`** - CMS configuration (blocks, collections, globals, hooks, fields)
- **`payload-config/`** - Modular Payload configuration (19 separate modules)
- **`components/`** - React components (ui/, blocks/, layout/, admin/)
- **`queries/`** - Cached data fetching functions with cache tags
- **`lib/`** - Utilities (env validation, URL handling, access control)
- **`tests/`** - Unit tests (Vitest)
- **`e2e/`** - E2E tests (Playwright)

### Key Patterns

**Data Fetching**: Queries use Next.js `unstable_cache()` with cache tags for invalidation. Retry logic with exponential backoff handles transient errors.

**Block-Based Pages**: 21+ reusable blocks in `/payload/blocks` are rendered dynamically with React.lazy() and error boundaries.

**Type Generation**: After modifying PayloadCMS collections or fields, run `pnpm payload generate:types` to update `payload-types.ts`.

**Path Aliases**: Use `@/*` for root imports and `@payload-config` for payload.config.ts.

**Admin Groups**: All PayloadCMS admin sidebar groups are centralized in `payload-config/groups.ts` via the `ADMIN_GROUPS` constant. Always use this constant instead of hardcoding group labels.

**Scheduled Publishing**: Pages and Posts collections use `schedulePublish: { timeIntervals: 60 }` with a Vercel Cron running hourly (`0 * * * *`). The `schedulePublish` task is auto-registered by PayloadCMS during config sanitization — no manual task registration is needed.

**Access Control**: Defined in `lib/access.ts` with helpers: `anyone`, `nobody`, `admins`, `adminsAndUser`, `adminsAndEditors`, `checkRole`. Users can only update their own record; admins can update all.

### Configuration Files

- **`payload.config.ts`** - Main CMS config (imports from `/payload-config`)
- **`payload-config/groups.ts`** - Centralized admin sidebar group labels (i18n)
- **`biome.jsonc`** - Linting rules (extends Ultracite presets)
- **`next.config.ts`** - Next.js config with security headers and Turbopack
- **`vercel.json`** - Vercel deployment config with hourly cron for job queue

### Environment Variables

Required in `.env.local`:
```
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=<32+ chars>     # App will crash if missing
PREVIEW_SECRET=<any>
```

Optional:
```
BLOB_READ_WRITE_TOKEN          # Vercel Blob storage (required in production)
RESEND_API_KEY                 # Email service (prefix: re_)
CRON_SECRET                    # Vercel Cron job authentication (required in production)
AUTOLOGIN=true                 # Dev auto-login (requires ADMIN_EMAIL + ADMIN_PASSWORD)
ADMIN_EMAIL                    # Dev auto-login email
ADMIN_PASSWORD                 # Dev auto-login password
```

## Linting Rules

Biome enforces:
- No `console.log` statements
- No `any` types
- Use `for...of` over `.forEach()`
- Arrow functions for callbacks
- Next.js `<Image>` component required for images

Import order: Types → Node → npm → React/Next → Payload → Others → Relative → CSS → Assets

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages:

```
<type>(<scope>): <short description>
```

**Types:**
- `feat` — new feature or functionality
- `fix` — bug fix
- `refactor` — code change that neither fixes a bug nor adds a feature
- `chore` — tooling, config, dependencies, CI/CD changes
- `docs` — documentation only
- `style` — formatting, whitespace (no code logic changes)
- `test` — adding or updating tests
- `perf` — performance improvement

**Scopes** (optional, match project areas):
- `payload` — CMS collections, globals, hooks, fields, blocks
- `api` — API routes (`app/api/`)
- `ui` — React components, styling
- `config` — payload-config, next.config, biome, vercel.json
- `queries` — data fetching and caching
- `auth` — access control, authentication
- `deps` — dependency updates

**Rules:**
- Use lowercase for type and description
- No period at the end of the description
- Keep the subject line under 72 characters
- Use imperative mood ("add feature" not "added feature")
- Reference issue numbers when applicable: `feat(ui): add dark mode toggle (#42)`
