# DG Template

A modern, production-ready starter template built with Next.js 16, PayloadCMS 3, TailwindCSS 4, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: PayloadCMS 3
- **Styling**: TailwindCSS 4 + shadcn/ui
- **Database**: PostgreSQL (Docker locally, Vercel Postgres in production)
- **Storage**: Vercel Blob Storage
- **Email**: Resend (optional)
- **Linting**: Biome (via Ultracite)

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up PostgreSQL with Docker

```bash
docker run --name dg-template-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URI="postgresql://postgres:postgres@localhost:5432"
PAYLOAD_SECRET="<generate with: openssl rand -base64 32>"
PREVIEW_SECRET="<generate with: openssl rand -base64 32>"
BLOB_READ_WRITE_TOKEN=""
RESEND_API_KEY=""
AUTOLOGIN="true"
```

### 4. Start the development server

```bash
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000) and the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin).

> With `AUTOLOGIN="true"`, you'll be automatically logged in during development.

## Commands

```bash
pnpm dev              # Start development server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run Biome linter
pnpm format           # Format code with Biome
pnpm devsafe          # Clear .next cache and start dev
```

### Payload CLI

```bash
pnpm payload generate:types      # Regenerate TypeScript types
pnpm payload generate:importmap  # Regenerate import map
pnpm payload seed                # Run seed script
```

## Project Structure

```
app/
├── (frontend)/     # Public website routes
├── (payload)/      # Admin panel at /admin
├── api/            # API routes
└── llms.txt/       # LLM-friendly content endpoint

blocks/             # PayloadCMS block definitions
collections/        # PayloadCMS collections (pages, posts, media, etc.)
components/
├── ui/             # shadcn/ui primitives
├── blocks/         # Block renderers
├── layout/         # Header, footer, navbar
└── shared/         # Reusable utilities
fields/             # Shared field configurations
globals/            # PayloadCMS globals (home-page, contact, etc.)
hooks/              # Payload lifecycle hooks
payload-config/     # Modular Payload configuration
queries/            # Cached data fetching functions
```

## Database

### Docker Commands

```bash
# Start existing container
docker start dg-template-postgres

# Stop container
docker stop dg-template-postgres

# Remove container (deletes all data)
docker rm dg-template-postgres

# View logs
docker logs dg-template-postgres
```

### Migrations

Create a new migration:

```bash
pnpm payload migrate:create
```

Run pending migrations:

```bash
pnpm payload migrate
```

Check migration status:

```bash
pnpm payload migrate:status
```

Roll back the last migration:

```bash
pnpm payload migrate:down
```

Roll back all migrations and re-run them:

```bash
pnpm payload migrate:refresh
```

Roll back all migrations:

```bash
pnpm payload migrate:reset
```

> **Note**: In development, the database schema is automatically synced on startup. Migrations are required for production deployments.

## Deployment

This template is optimized for [Vercel](https://vercel.com). Required environment variables in production:

- `DATABASE_URI` - Vercel Postgres connection string
- `PAYLOAD_SECRET` - 32-byte secret for Payload
- `PREVIEW_SECRET` - Secret for preview mode
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token

Optional:
- `RESEND_API_KEY` - For email functionality

## Code Standards

This project uses [Ultracite](https://github.com/haydenbleasel/ultracite) (Biome preset) for linting and formatting. Run `pnpm format` before committing.

Key rules:
- No `console.log` or `any` types
- Use `for...of` over `.forEach()`
- Arrow functions for callbacks
- Use Next.js `<Image>` component

## Next Steps

When PayloadCMS officially sets Next.js 16 as stable:

- [ ] Remove `raw-loader` from `next.config.ts` turbopack rules (currently used for markdown file imports)
- [ ] Review and update any deprecated Next.js 15 patterns if applicable
- [ ] Test live preview functionality with the stable release
