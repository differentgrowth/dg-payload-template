# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 + PayloadCMS 3 template with TailwindCSS 4 and shadcn/ui components. Uses Vercel Postgres in production and Docker PostgreSQL locally.

## Commands

```bash
pnpm dev           # Start development server
pnpm build         # Production build
pnpm start         # Start production server
pnpm lint          # Run Biome linter (biome check)
pnpm format        # Format code (biome format --write)
pnpm devsafe       # Clear .next cache and start dev

# Payload CLI
pnpm payload generate:types      # Regenerate payload-types.ts
pnpm payload generate:importmap  # Regenerate import map
pnpm payload seed                # Run seed script
```

## Architecture

### Route Groups (app/)
- `(frontend)/` - Public website routes with shared layout, theme provider, and global styles
- `(payload)/` - PayloadCMS admin panel at `/admin` with custom styling
- `api/` - API routes
- `llms.txt/` - LLM-friendly content endpoint

### PayloadCMS Structure
- **Collections** (`collections/`): pages, posts, media, categories, leads, users
- **Globals** (`globals/`): home-page, blog-page, contact-page, contact-methods, links, social-media
- **Blocks** (`blocks/`): Reusable content blocks (call-to-action, card-links, faqs, testimonials, etc.)
- **Fields** (`fields/`): Shared field configurations (hero, slug, filesize)
- **Hooks** (`hooks/`): Payload lifecycle hooks for revalidation and email notifications
- **Queries** (`queries/`): Cached data fetching functions with Next.js cache tags

### Payload Config
The `payload-config/` directory contains modular configuration:
- `collections.ts`, `globals.ts` - Content type definitions
- `plugins.ts` - SEO, redirects, blob storage
- `page-blocks.ts` - Available blocks for pages
- `live-preview.ts` - Preview configuration
- `db.ts` - Database adapter (Vercel Postgres)

### Component Organization
- `components/ui/` - shadcn/ui primitives (button, card, form, etc.)
- `components/blocks/` - Block renderers matching PayloadCMS block types
- `components/admin/` - Custom PayloadCMS admin components
- `components/layout/` - Page structure (header, footer, navbar)
- `components/shared/` - Reusable utilities (logo, mark, rich-text, schema-markup)
- `components/blog/` - Blog features (posts-list, pagination)
- `components/payload/` - CMS integration (live-preview-listener, redirects)
- `components/theme/` - Theme management (provider, mode-toggle)

### Key Patterns
- **Path alias**: `@/*` maps to project root
- **Class merging**: Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **API route**: `/admin-api` (not `/api`) for Payload endpoints
- **Cache revalidation**: Hooks trigger `revalidateTag()` on content changes

## Code Standards

Uses **Ultracite** (Biome preset) for linting and formatting. Key rules:
- No `console.log`, `debugger`, or `any` types
- Use `for...of` over `.forEach()`
- Arrow functions for callbacks
- Next.js `<Image>` component required (no `<img>`)
- Explicit hook dependencies
- No barrel files (index re-exports)

Run `pnpm format` before committing.

## Environment Variables

Required in `.env`:
```
DATABASE_URI        # Postgres connection string
PAYLOAD_SECRET      # 32-byte secret (openssl rand -base64 32)
PREVIEW_SECRET      # Preview mode secret
BLOB_READ_WRITE_TOKEN  # Vercel Blob storage
RESEND_API_KEY      # Email service (optional)
AUTOLOGIN           # Set "true" for dev auto-login
```

## Local Database Setup

```bash
docker run --name dg-template-postgres -e POSTGRES_PASSWORD=your_password -p 5432:5432 -d postgres
```
