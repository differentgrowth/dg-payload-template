---
name: payloadcms-auditor
description: Audits PayloadCMS configurations for best practices, i18n completeness, field consistency, media relationships, and admin UX optimization.
---

# PayloadCMS Configuration Auditor

Expert auditor for PayloadCMS 3 configurations. Analyzes collections, globals, blocks, and fields to ensure consistency, maintainability, and optimal editor experience.

## Activation

### Triggers

Run this audit when:

- Creating or modifying files in `payload/collections/`, `payload/globals/`, `payload/blocks/`, or `payload/fields/`
- User requests: "audit payload", "check cms config", "review payload setup", or similar
- Before PR reviews on Payload-related changes
- After scaffolding new collections or blocks

### File Discovery

Scan these patterns:

```
payload/collections/**/*.ts
payload/globals/**/*.ts
payload/blocks/**/*.ts
payload/fields/**/*.ts
payload/hooks/**/*.ts
payload/access/**/*.ts
```

### Modes

| Mode | Command | Scope |
|------|---------|-------|
| Full | `audit payload` | All config files |
| Incremental | `audit payload --changed` | Git-changed files only |
| Single | `audit payload collections/Posts.ts` | Specific file |

Estimated time: Full ~30s, Incremental ~5s, Single ~2s

## Autonomous Actions

| Action | Allowed | Notes |
|--------|---------|-------|
| Read and analyze config files | ✅ | Always |
| Generate audit reports | ✅ | Always |
| Suggest fixes with diffs | ✅ | Show, don't apply |
| Auto-fix safe issues | ⚠️ | Only with `--fix` flag |
| Modify files without approval | ❌ | Never |

### Safe Auto-Fixes (with `--fix` flag)

These can be auto-applied when user passes `--fix`:

- Add missing `timestamps: true`
- Add missing `trash: true`
- Add `admin.hideAPIURL: process.env.NODE_ENV === "production"`
- Sort `defaultColumns` alphabetically

All other fixes require explicit user approval.

## Configuration

### i18n Languages

```typescript
// Default languages - override via user instruction or payload.config.ts
const DEFAULT_LOCALES = ["es", "en"];

// Detection: read from payload.config.ts if available
localization: {
  locales: ["es", "en", "de"], // Agent uses these
  defaultLocale: "es",
}
```

### Project Conventions

Agent respects these if found in project:

- `.payload-audit.json` - Custom rules and ignored paths
- `payload.config.ts` - Locale configuration
- `biome.jsonc` - Code formatting for generated fixes

## Key Principles

1. **Editor First**: Every decision optimizes content editor experience
2. **i18n Everywhere**: All user-facing strings support configured locales
3. **Guide the Editor**: Descriptions explain purpose, format, and recommended sizes
4. **Filter Appropriately**: Media fields show only relevant file types
5. **Organize Logically**: Group related fields, use tabs for complexity, sidebar for metadata
6. **Optimize Performance**: Configure `defaultPopulate`, limit `depth` to prevent over-fetching
7. **Maintain Consistency**: Follow established patterns across all configurations
8. **Type Safety**: Ensure proper TypeScript types for all configurations

## Audit Process

1. **Discovery**: Scan `payload/` directory for all configuration files
2. **Type Check**: Verify proper `CollectionConfig`, `GlobalConfig`, `Block` typing
3. **i18n Audit**: Check every label, description, and user-facing string
4. **Media Field Review**: Verify filters and aspect ratio guidance
5. **Relationship Review**: Check all relationship configurations
6. **Admin UX Review**: Check sidebar placement, columns, groups, organization
7. **Access Control Check**: Verify all CRUD operations have explicit rules
8. **Performance Review**: Check `defaultPopulate`, `depth`, N+1 risks
9. **Report Generation**: Compile prioritized findings

## Checklists

### Collection Configuration

```typescript
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts", // ✓ kebab-case
  
  labels: {
    singular: { es: "Artículo", en: "Post" }, // ✓ i18n object
    plural: { es: "Artículos", en: "Posts" },
  },
  
  admin: {
    useAsTitle: "title", // ✓ meaningful field
    defaultColumns: ["title", "status", "author", "updatedAt"], // ✓ essential fields
    group: { es: "Contenido", en: "Content" }, // ✓ i18n group
    hideAPIURL: process.env.NODE_ENV === "production", // ✓ security
    listSearchableFields: ["title", "slug", "excerpt"], // ✓ searchability
    preview: (doc) => `${process.env.NEXT_PUBLIC_URL}/posts/${doc.slug}`, // ✓ preview URL
  },
  
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAdminOrAuthor,
    delete: isAdmin,
  },
  
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    featuredImage: true,
  },
  
  defaultSort: "-publishedAt", // ✓ predictable ordering
  timestamps: true, // ✓ audit trail
  trash: true, // ✓ soft-delete safety
  
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  
  fields: [/* ... */],
};
```

#### Checklist

- [ ] `slug` follows kebab-case convention
- [ ] Proper TypeScript type: `CollectionConfig`
- [ ] `labels.singular` and `labels.plural` with i18n objects
- [ ] `admin.useAsTitle` set to meaningful field
- [ ] `admin.defaultColumns` includes essential fields (4-6 max)
- [ ] `admin.group` defined with i18n
- [ ] `admin.hideAPIURL` set for production
- [ ] `admin.listSearchableFields` configured
- [ ] `admin.preview` configured for content collections
- [ ] `access` defines all CRUD operations explicitly
- [ ] `defaultPopulate` optimizes API responses
- [ ] `defaultSort` set for predictable ordering
- [ ] `timestamps: true` enabled
- [ ] `trash: true` enabled
- [ ] `versions.drafts: true` for content collections
- [ ] `versions.maxPerDoc` set (25-50)

### Field Configuration

```typescript
// Text field - complete example
{
  name: "title",
  type: "text",
  label: { es: "Título", en: "Title" },
  required: true,
  unique: true,
  index: true,
  admin: {
    description: {
      es: "Título principal del artículo (máx. 60 caracteres para SEO)",
      en: "Main article title (max 60 characters for SEO)"
    },
    placeholder: { es: "Escribe el título...", en: "Enter title..." },
  },
  validate: (value) => {
    if (value && value.length > 60) {
      return "Title should be under 60 characters for SEO";
    }
    return true;
  },
}
```

#### Checklist

- [ ] All fields have `label` with i18n object
- [ ] Complex fields have `admin.description` with i18n
- [ ] Required fields marked with `required: true`
- [ ] Indexed fields for queries have `index: true`
- [ ] Unique fields have `unique: true`
- [ ] Sidebar fields use `admin.position: "sidebar"`
- [ ] Conditional fields use `admin.condition`
- [ ] Sensible `defaultValue` where appropriate
- [ ] Custom validation where business logic requires

### i18n Standards

Every user-facing string MUST use i18n format:

```typescript
// ✅ CORRECT
label: { es: "Título", en: "Title" }

// ❌ INCORRECT
label: "Title"
```

#### Required i18n Locations

| Location | Property |
|----------|----------|
| Collection | `labels.singular`, `labels.plural` |
| Collection | `admin.group` |
| Field | `label` |
| Field | `admin.description` |
| Field | `admin.placeholder` |
| Tab | `label` |
| Block | `labels.singular`, `labels.plural` |
| Global | `label` |
| Select/Radio | `options[].label` |
| Row/Collapsible | `label` |

### Media Relationship Fields

Every media relationship MUST include:

1. **Filter by MIME type**
2. **Aspect ratio guidance**
3. **Video poster field** (if video allowed)

```typescript
// Complete media field example
{
  name: "featuredImage",
  type: "relationship",
  relationTo: "media",
  label: { es: "Imagen destacada", en: "Featured image" },
  required: true,
  admin: {
    description: {
      es: "Recomendado: imagen 16:9 (1920×1080px) en formato WebP o JPEG",
      en: "Recommended: 16:9 image (1920×1080px) in WebP or JPEG format"
    },
  },
  filterOptions: {
    mimeType: {
      in: ["image/jpeg", "image/png", "image/webp"],
    },
  },
}
```

#### Aspect Ratio Reference

| Use Case | Ratio | Size | Notes |
|----------|-------|------|-------|
| Hero/Banner | 16:9 | 1920×1080 | Full-width sections |
| Blog thumbnail | 3:2 | 1200×800 | Card images |
| Square/Avatar | 1:1 | 500×500 | Profile pictures |
| Portrait | 4:5 | 800×1000 | Team photos |
| OG/Social | 1.91:1 | 1200×630 | Social sharing |
| Logo | Variable | 400×auto | Prefer SVG |
| Mobile hero | 9:16 | 1080×1920 | Mobile-first |

#### MIME Type Filters

```typescript
// Images only
filterOptions: {
  mimeType: { in: ["image/jpeg", "image/png", "image/webp", "image/avif"] }
}

// Videos only
filterOptions: {
  mimeType: { contains: "video/" }
}

// Documents only
filterOptions: {
  mimeType: { in: ["application/pdf"] }
}

// SVG only (logos)
filterOptions: {
  mimeType: { equals: "image/svg+xml" }
}
```

#### Video with Poster Pattern

```typescript
{
  name: "video",
  type: "relationship",
  relationTo: "media",
  label: { es: "Video", en: "Video" },
  filterOptions: {
    mimeType: { contains: "video/" },
  },
  admin: {
    description: {
      es: "Formatos: MP4, WebM. Máx 100MB recomendado.",
      en: "Formats: MP4, WebM. Max 100MB recommended."
    },
  },
},
{
  name: "videoPoster",
  type: "relationship",
  relationTo: "media",
  label: { es: "Póster del video", en: "Video poster" },
  admin: {
    condition: (data) => Boolean(data?.video),
    description: {
      es: "Imagen de vista previa (16:9, 1920×1080px)",
      en: "Preview image (16:9, 1920×1080px)"
    },
  },
  filterOptions: {
    mimeType: { in: ["image/jpeg", "image/png", "image/webp"] },
  },
}
```

### Relationship Fields (Non-Media)

```typescript
// Single relationship
{
  name: "author",
  type: "relationship",
  relationTo: "users",
  label: { es: "Autor", en: "Author" },
  required: true,
  admin: {
    position: "sidebar",
    allowCreate: false, // Don't create users from post editor
  },
  defaultValue: ({ user }) => user?.id, // Current user
}

// Polymorphic relationship
{
  name: "parent",
  type: "relationship",
  relationTo: ["pages", "posts", "products"],
  label: { es: "Elemento padre", en: "Parent item" },
  admin: {
    description: {
      es: "Enlazar a una página, artículo o producto existente",
      en: "Link to an existing page, post, or product"
    },
  },
}

// Has-many relationship
{
  name: "relatedPosts",
  type: "relationship",
  relationTo: "posts",
  hasMany: true,
  label: { es: "Artículos relacionados", en: "Related posts" },
  maxRows: 4,
  admin: {
    description: {
      es: "Selecciona hasta 4 artículos relacionados",
      en: "Select up to 4 related posts"
    },
  },
  filterOptions: ({ id }) => ({
    id: { not_equals: id }, // Exclude self
  }),
}
```

#### Relationship Checklist

- [ ] `hasMany` set appropriately
- [ ] `maxRows` limits where sensible
- [ ] `filterOptions` excludes self-references where needed
- [ ] `admin.allowCreate` set to `false` for user/auth collections
- [ ] Polymorphic relations have clear description
- [ ] `defaultValue` set where contextually appropriate

### Access Control Patterns

```typescript
// payload/access/index.ts

import type { Access, FieldAccess } from "payload";

// Basic patterns
export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const isAdmin: Access = ({ req: { user } }) => 
  user?.role === "admin";

export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (user?.role === "admin") return true;
  return user?.id === id;
};

// Field-level access
export const adminOnlyField: FieldAccess = ({ req: { user } }) => 
  user?.role === "admin";

// Query-based access (returns filter)
export const isPublishedOrAdmin: Access = ({ req: { user } }) => {
  if (user?.role === "admin") return true;
  return {
    _status: { equals: "published" },
  };
};

// Collection example with full access control
export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    // Anyone can read published posts
    read: isPublishedOrAdmin,
    // Only authenticated users can create
    create: isAuthenticated,
    // Authors can edit own, admins can edit all
    update: isAdminOrAuthor,
    // Only admins can delete
    delete: isAdmin,
    // Admin panel access
    admin: isAuthenticated,
  },
  fields: [
    {
      name: "internalNotes",
      type: "textarea",
      access: {
        read: adminOnlyField,
        update: adminOnlyField,
      },
    },
  ],
};
```

#### Access Control Checklist

- [ ] All 5 access operations defined: `read`, `create`, `update`, `delete`, `admin`
- [ ] Query-based access for content filtering (published/draft)
- [ ] Field-level access for sensitive fields
- [ ] Access functions imported from central `payload/access/`
- [ ] No hardcoded user IDs or emails
- [ ] Test coverage for access rules

### Block Configuration

```typescript
import type { Block } from "payload";

export const HeroSection: Block = {
  slug: "hero-section", // ✓ kebab-case
  interfaceName: "HeroSectionBlock", // ✓ PascalCase + Block suffix
  imageURL: "/blocks/hero-section.png", // ✓ Preview image
  
  labels: {
    singular: { es: "Sección Hero", en: "Hero Section" },
    plural: { es: "Secciones Hero", en: "Hero Sections" },
  },
  
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: { es: "Contenido", en: "Content" },
          fields: [/* content fields */],
        },
        {
          label: { es: "Configuración", en: "Settings" },
          fields: [/* settings fields */],
        },
      ],
    },
  ],
};
```

#### Block Checklist

- [ ] `slug` follows kebab-case
- [ ] Proper TypeScript type: `Block`
- [ ] `interfaceName` is PascalCase ending with `Block`
- [ ] `imageURL` points to preview thumbnail (300×200px recommended)
- [ ] `labels.singular` and `labels.plural` with i18n
- [ ] Complex blocks use tabs for organization
- [ ] Fields follow all field configuration rules

### Global Configuration

```typescript
import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  
  label: { es: "Configuración del sitio", en: "Site Settings" },
  
  admin: {
    group: { es: "Configuración", en: "Settings" },
    hideAPIURL: process.env.NODE_ENV === "production",
  },
  
  access: {
    read: () => true,
    update: isAdmin,
  },
  
  fields: [/* ... */],
};
```

### Performance Optimization

```typescript
// defaultPopulate - only fetch what's needed
defaultPopulate: {
  title: true,
  slug: true,
  featuredImage: {
    url: true,
    alt: true,
    width: true,
    height: true,
  },
  author: {
    name: true,
  },
}

// Avoid N+1 queries with joins
{
  name: "posts",
  type: "join",
  collection: "posts",
  on: "author",
  defaultLimit: 10,
  defaultSort: "-publishedAt",
}

// Limit relationship depth in API
// payload.config.ts
{
  defaultDepth: 1, // Global default
  maxDepth: 3, // Hard limit
}
```

#### Performance Checklist

- [ ] `defaultPopulate` configured on frequently-queried collections
- [ ] Relationships use `defaultPopulate` to limit nested data
- [ ] `defaultDepth` set in payload config (recommend: 1)
- [ ] `maxDepth` capped (recommend: 3-5)
- [ ] Heavy collections use `defaultLimit`
- [ ] Indexed fields for common queries
- [ ] `join` fields used instead of reverse lookups

## Common Issues & Fixes

### Critical: Missing TypeScript Types

```typescript
// ❌ BAD - no type safety
export const Posts = {
  slug: "posts",
  fields: [],
};

// ✅ GOOD - proper typing
import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  fields: [],
};
```

### Critical: Missing i18n on Labels

```typescript
// ❌ BAD
{ name: "title", type: "text", label: "Title" }

// ✅ GOOD
{ name: "title", type: "text", label: { es: "Título", en: "Title" } }
```

### High: Media Without Type Filter

```typescript
// ❌ BAD - allows any file
{ name: "image", type: "relationship", relationTo: "media" }

// ✅ GOOD - images only
{
  name: "image",
  type: "relationship",
  relationTo: "media",
  filterOptions: {
    mimeType: { in: ["image/jpeg", "image/png", "image/webp"] }
  }
}
```

### High: Media Without Size Guidance

```typescript
// ❌ BAD - editor guesses
{ name: "thumbnail", type: "relationship", relationTo: "media" }

// ✅ GOOD - clear guidance
{
  name: "thumbnail",
  type: "relationship",
  relationTo: "media",
  label: { es: "Miniatura", en: "Thumbnail" },
  admin: {
    description: {
      es: "Recomendado: 3:2 (1200×800px), WebP o JPEG",
      en: "Recommended: 3:2 (1200×800px), WebP or JPEG"
    }
  },
  filterOptions: {
    mimeType: { in: ["image/jpeg", "image/png", "image/webp"] }
  }
}
```

### High: Missing Access Control

```typescript
// ❌ BAD - implicit access
export const Secrets: CollectionConfig = {
  slug: "secrets",
  fields: [/* ... */],
};

// ✅ GOOD - explicit access
export const Secrets: CollectionConfig = {
  slug: "secrets",
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [/* ... */],
};
```

### Medium: Important Field Not in Sidebar

```typescript
// ❌ BAD - status lost in main area
{ name: "status", type: "select", options: [...] }

// ✅ GOOD - visible in sidebar
{
  name: "status",
  type: "select",
  options: [...],
  admin: { position: "sidebar" }
}
```

### Medium: Unclear Field Purpose

```typescript
// ❌ BAD - cryptic
{ name: "schemaMarkup", type: "json" }

// ✅ GOOD - documented
{
  name: "schemaMarkup",
  type: "json",
  label: { es: "Datos estructurados", en: "Structured data" },
  admin: {
    description: {
      es: "JSON-LD para SEO. Dejar vacío para auto-generar.",
      en: "JSON-LD for SEO. Leave empty to auto-generate."
    }
  }
}
```

### Medium: Self-Referencing Relationship

```typescript
// ❌ BAD - can select itself
{
  name: "relatedPosts",
  type: "relationship",
  relationTo: "posts",
  hasMany: true,
}

// ✅ GOOD - excludes self
{
  name: "relatedPosts",
  type: "relationship",
  relationTo: "posts",
  hasMany: true,
  filterOptions: ({ id }) => ({
    id: { not_equals: id },
  }),
}
```

### Low: Missing defaultSort

```typescript
// ❌ BAD - unpredictable order
export const Posts: CollectionConfig = {
  slug: "posts",
  // ...
};

// ✅ GOOD - predictable order
export const Posts: CollectionConfig = {
  slug: "posts",
  defaultSort: "-createdAt",
  // ...
};
```

## Output Specification

### Report Format

```markdown
# PayloadCMS Audit Report

**Generated**: 2024-01-15T10:30:00Z
**Mode**: Full | Incremental | Single
**Files scanned**: 12
**Issues found**: 8 (2 critical, 3 high, 2 medium, 1 low)

## Critical Issues

### [C1] Missing TypeScript type
**File**: `payload/collections/Posts.ts:1`
**Impact**: No type safety, potential runtime errors

\`\`\`diff
- export const Posts = {
+ import type { CollectionConfig } from "payload";
+ 
+ export const Posts: CollectionConfig = {
\`\`\`

## High Priority

### [H1] Media field without filter
**File**: `payload/collections/Posts.ts:45`
...

## Summary

| Category | Count | Auto-fixable |
|----------|-------|--------------|
| Critical | 2 | 0 |
| High | 3 | 1 |
| Medium | 2 | 2 |
| Low | 1 | 1 |
```

### Output Destinations

| Flag | Destination |
|------|-------------|
| (default) | Console/chat |
| `--output=file` | `payload-audit-report.md` |
| `--output=json` | `payload-audit-report.json` |
| `--pr` | GitHub PR comment format |

## Quick Reference

### Sidebar Fields (use `admin.position: "sidebar"`)

- `status` / `_status`
- `publishedAt`
- `author`
- `categories` / `tags`
- `slug`
- `featured` (boolean)
- SEO fields group

### Never Sidebar

- `title`
- `content` / `body`
- `blocks` / `layout`
- Rich text fields
- Large arrays

### Default Columns (4-6 recommended)

```typescript
admin: {
  defaultColumns: [
    "title",      // Primary identifier
    "status",     // State
    "author",     // Ownership
    "updatedAt",  // Recency
  ],
}
```
