# Project Plan

> Master plan for project implementation. Active tasks are tracked in PROGRESS.md.

## Current Phase

### Phase 0: React Performance Fixes (Audit Results) ✅

_Critical performance optimizations from react-best-practices audit._

**P0 - Critical:**
- [x] P001 - Add dynamic imports for heavy block components in `render-blocks.tsx`
- [x] P002 - Delete unused barrel file `components/ui/icons.tsx`

**P1 - High:**
- [x] P003 - Add `depth: 2` to `getPostBySlug` query for related posts hydration
- [x] P004 - Memoize context values in `comparison.tsx` and `form.tsx`

**P2 - Medium:**
- [x] P005 - Add `useCallback` to event handlers (mode-toggle, slug-generator)
- [x] P006 - Wrap list item components with `React.memo` (TestimonialCard, ImageCard)

**P3 - Low:**
- [x] P007 - Extract inline icon objects to constants (sonner.tsx, layout.tsx)

### Phase 1: Robustness & Error Handling

_Foundation work to make the template production-resilient._

- [x] T001 - Add React error boundaries with fallback UI for block rendering failures
- [ ] T002 - Create loading skeletons for pages, posts, and block components
- [x] T003 - Add not-found and error pages with branded styling
- [x] T004 - Implement toast notifications for form submissions (success/error states)
- [x] T005 - Add retry logic for failed API calls in queries

### Phase 2: Content & SEO Enhancements

_Improve discoverability and content distribution._

- [ ] T006 - Add RSS feed endpoint for blog posts (`/feed.xml`)
- [ ] T007 - Enhance JSON-LD structured data (Article, Organization, BreadcrumbList)
- [ ] T008 - Add dynamic OpenGraph images for posts (currently only pages)
- [ ] T009 - Implement basic site search with PayloadCMS local API
- [ ] T010 - Add canonical URL handling for paginated content
- [ ] T011 - Create XML sitemap index for large sites (split by collection)

### Phase 3: Performance Optimization

_Faster load times and better Core Web Vitals._

- [ ] T012 - Add blur placeholder data URLs for media images
- [ ] T013 - Implement route prefetching for navigation links
- [ ] T014 - Add font subsetting and `font-display: swap`
- [ ] T015 - Configure image quality per breakpoint (art direction)
- [ ] T016 - Add bundle analyzer script and document optimization targets
- [ ] T017 - Implement stale-while-revalidate patterns for non-critical data

### Phase 4: Developer Experience

_Make the template easier to extend and maintain._

- [ ] T018 - Add Storybook for UI component documentation
- [ ] T019 - Create block scaffolding CLI script (`pnpm create-block`)
- [ ] T020 - Add health check endpoint (`/api/health`)
- [ ] T021 - Document PayloadCMS collection/global extension patterns
- [ ] T022 - Add database seed script with realistic sample content
- [ ] T023 - Create migration guide for PayloadCMS major version upgrades

## Backlog

_Unscheduled tasks - prioritize based on project needs._

- [ ] B001 - Multi-language support (i18n routing + PayloadCMS localization)
- [ ] B002 - Content scheduling (publish date, expiration)
- [ ] B003 - Webhook integrations for external services (Zapier, n8n)
- [ ] B004 - Admin dashboard widgets (content stats, recent activity)
- [ ] B005 - A/B testing infrastructure for blocks
- [ ] B006 - Content versioning and revision history UI
- [ ] B007 - Keyboard shortcuts for admin panel
- [ ] B008 - Import/export content as JSON
- [ ] B009 - Automated accessibility testing in CI
- [ ] B010 - Visual regression testing with Playwright
- [ ] B011 - Rate limiting for form submissions
- [ ] B012 - CAPTCHA integration for contact forms
- [ ] B013 - Preview environments for branches (Vercel preview comments)
- [ ] B014 - Email template builder in admin
- [ ] B015 - Analytics integration (Plausible/Fathom/GA4)

## Completed

_Tasks moved here after phase completion for historical reference._

---

## Task Format Reference

- `[ ]` Todo
- `[~]` In Progress
- `[x]` Done
- `[!]` Blocked

**Example:** `- [ ] T001 - Implement user authentication`

## Priority Guidelines

**High Impact, Low Effort** (Do First):
- T001-T004: Error handling improves perceived quality immediately
- T006: RSS feeds are expected for any blog

**High Impact, Medium Effort** (Schedule Soon):
- T009: Search is a common user expectation
- T012-T013: Direct Core Web Vitals improvements
- T018: Storybook accelerates future development

**Strategic** (Plan When Needed):
- B001: Multi-language adds significant complexity
- B005-B006: Advanced CMS features for enterprise use cases
