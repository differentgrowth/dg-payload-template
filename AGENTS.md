# DG Payload Template - Project Context

> A modern, production-ready Next.js 16 + PayloadCMS 3 starter template with TailwindCSS 4, shadcn/ui, and Vercel deployment.

## Project Overview

This is a full-stack starter template designed for building content-managed websites with a headless CMS approach. It combines Next.js 16's App Router with PayloadCMS 3 for content management, providing both a public-facing website and an admin panel at `/admin`.

The template is optimized for Vercel deployment, using Vercel Postgres for the database and Vercel Blob for media storage. For local development, it uses Docker PostgreSQL with automatic schema synchronization.

Key features include SEO optimization via the PayloadCMS SEO plugin, live preview for content editors, automated cache revalidation on content changes, and a comprehensive block-based page builder system.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, React 19) |
| CMS | PayloadCMS 3 |
| Language | TypeScript 5.9 |
| Styling | TailwindCSS 4 + shadcn/ui |
| Database | PostgreSQL (Docker locally, Vercel Postgres in prod) |
| Storage | Vercel Blob |
| Email | Resend (optional) |
| Package Manager | pnpm |
| Linting | Biome via Ultracite |
| Testing | Vitest (unit) + Playwright (e2e) |
| Animation | Motion (Framer Motion) |

## Architecture

### Directory Structure

```
app/
├── (frontend)/          # Public website routes with shared layout
├── (payload)/           # Admin panel at /admin
├── api/                 # API routes
└── llms.txt/            # LLM-friendly content endpoint

payload/
├── blocks/              # PayloadCMS block definitions
├── collections/         # Content types (pages, posts, media, users, etc.)
├── fields/              # Shared field configurations
├── globals/             # Site-wide content (homepage, contact, social)
├── hooks/               # Lifecycle hooks (revalidation, email)
└── i18n/                # Internationalization

payload-config/          # Modular Payload configuration
├── collections.ts       # Collection imports
├── globals.ts           # Global imports
├── plugins.ts           # SEO, redirects, blob storage plugins
├── page-blocks.ts       # Available blocks for pages
├── live-preview.ts      # Preview configuration
└── db.ts                # Database adapter

components/
├── ui/                  # shadcn/ui primitives
├── blocks/              # Block renderers matching CMS blocks
├── admin/               # Custom PayloadCMS admin components
├── layout/              # Header, footer, navbar
├── shared/              # Logo, rich-text, schema-markup
├── blog/                # Posts list, pagination
├── payload/             # Live preview, redirects
└── theme/               # Theme provider, mode toggle

queries/                 # Cached data fetching with Next.js cache tags
lib/                     # Utilities (cn, env, access control, metadata)
```

### Key Patterns

- **Route Groups**: `(frontend)/` for public routes, `(payload)/` for admin
- **Server Components**: Default for all pages, client components only when needed
- **Cache Tags**: Automatic revalidation via Payload hooks triggering `revalidateTag()`
- **Block System**: Pages built from configurable content blocks
- **Path Alias**: `@/*` maps to project root, `@payload-config` for Payload config

## Project Conventions

### File Organization

- Collections, globals, and blocks are in the `payload/` directory
- Configuration modules are in `payload-config/`
- React components are in `components/` organized by purpose
- Data fetching functions are in `queries/` with caching

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `CardLinks.tsx` |
| Utilities | camelCase | `generateMeta.ts` |
| Collections | kebab-case | `pages.ts` |
| Blocks | kebab-case | `call-to-action.ts` |
| Queries | kebab-case | `get-page-by-slug.ts` |

### Code Patterns

- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- API routes use `/admin-api` prefix (not `/api`) for Payload
- No `console.log`, `debugger`, or `any` types
- Use `for...of` over `.forEach()`
- Arrow functions for callbacks
- Use Next.js `<Image>` component (no `<img>`)
- Explicit hook dependencies
- No barrel files (index re-exports)

## Development

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format code with Ultracite |
| `pnpm devsafe` | Clear .next cache and start dev |
| `pnpm test` | Run Vitest tests |
| `pnpm e2e` | Run Playwright tests |
| `pnpm payload generate:types` | Regenerate TypeScript types |
| `pnpm payload generate:importmap` | Regenerate import map |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URI` | PostgreSQL connection string | Yes |
| `PAYLOAD_SECRET` | 32-byte secret for Payload | Yes |
| `PREVIEW_SECRET` | Secret for preview mode | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes (prod) |
| `RESEND_API_KEY` | Email service API key | No |
| `AUTOLOGIN` | Set "true" for dev auto-login | No |

### Local Database Setup

```bash
docker run --name dg-template-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

## Related Documents

| Document | Purpose |
|----------|---------|
| `AGENTS.md` | Project context (this file) |
| `CLAUDE.md` | Symlink to AGENTS.md (for Claude Code) |
| `PLAN.md` | Project roadmap and task tracking |
| `PROGRESS.md` | Session history and active work |
| `README.md` | User-facing documentation |

## Notes

- The admin panel is accessible at `/admin` with automatic login in development when `AUTOLOGIN=true`
- Live preview is configured for pages and posts
- Database schema auto-syncs in development; migrations are required for production
- Security headers are configured in `next.config.ts` including CSP, HSTS, and XSS protection
- The template includes IE incompatibility detection with automatic redirect
