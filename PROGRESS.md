# Progress Log

> Session logs and active work tracking. See PLAN.md for the master task list.

## Active Session

_No active session. Use `/start-task <id>` to begin._

---

## Session History

### 2026-01-14 - SSR/SEO Fix for Server Components

**Issue:** BlockErrorBoundary was wrapping all blocks including server components, forcing them to become client components and breaking SSR.

**Files Modified:**
- `components/blocks/render-blocks.tsx` - Only wrap client blocks in error boundary
- `components/blocks/featured-posts.tsx` - Added try/catch for server-side error handling
- `components/blocks/latest-posts.tsx` - Added try/catch for server-side error handling
- `app/(frontend)/not-found.tsx` - Removed "use client", now a server component
- `components/shared/back-button.tsx` - New client component for history navigation

**Fixes Applied:**
- Created `clientBlocks` set to identify which blocks can be wrapped in error boundary
- Server blocks (FeaturedPosts, LatestPosts, etc.) now render without wrapper to preserve SSR
- Added internal try/catch to server components instead of using error boundaries
- Extracted BackButton as a separate client component to keep not-found.tsx as server component

**Additional Fixes:**
- Fixed `ArrowClockwise02Icon` → `ArrowReloadHorizontalIcon` (icon not exported)
- Fixed `category.slug` → `slugify(category.title)` in post-hero.tsx
- Fixed type assertion in rich-text.tsx for code block children

---

### 2026-01-14 - Phase 1: Robustness & Error Handling (T001, T003, T004, T005)

**Tasks Completed:** T001, T003, T004, T005

| Task | Description | Status |
|------|-------------|--------|
| T001 | Add React error boundaries with fallback UI for block rendering | ✅ |
| T003 | Add not-found and error pages with branded styling | ✅ |
| T004 | Implement toast notifications for form submissions | ✅ |
| T005 | Add retry logic for failed API calls in queries | ✅ |

**Files Created:**
- `components/blocks/block-error-boundary.tsx` - Error boundary component for individual blocks
- `lib/retry.ts` - Retry utility with exponential backoff

**Files Modified:**
- `components/blocks/render-blocks.tsx` - Wrapped blocks in BlockErrorBoundary
- `app/(frontend)/not-found.tsx` - Enhanced with branded styling
- `app/(frontend)/(web)/error.tsx` - Enhanced with branded styling
- `app/(frontend)/global-error.tsx` - Enhanced with branded styling
- `components/blocks/contact-form.tsx` - Added comprehensive error handling with toast messages
- `queries/get-page-by-slug.ts` - Added retry logic with exponential backoff
- `queries/get-post-by-slug.ts` - Added retry logic with exponential backoff

**Summary:**
- Created BlockErrorBoundary for graceful handling of block rendering failures
- Redesigned error pages with branded styling, logo marks, and helpful CTAs
- Enhanced contact form with network error handling and status-specific messages
- Built reusable retry utility with configurable exponential backoff

---

### 2026-01-14 - Phase 0: React Performance Fixes

**Tasks Completed:** P001-P007

| Task | Description | Status |
|------|-------------|--------|
| P001 | Add dynamic imports for heavy block components (`render-blocks.tsx`) | ✅ |
| P002 | Delete unused barrel file (`components/ui/icons.tsx`) | ✅ |
| P003 | Add `depth: 2` to `getPostBySlug` query | ✅ |
| P004 | Memoize context values in `comparison.tsx` and `form.tsx` | ✅ |
| P005 | Add `useCallback` to event handlers (`mode-toggle.tsx`, `slug-generator.tsx`) | ✅ |
| P006 | Wrap list items with `React.memo` (`TestimonialCard`, `ImageCard`) | ✅ |
| P007 | Extract inline icon objects to constants (`sonner.tsx`, `layout.tsx`) | ✅ |

**Summary:**
- Implemented dynamic imports for 5 heavy block components (ContactForm, Comparison, Faqs, Marquee, Testimonials)
- Removed unused 43-icon barrel file
- Fixed missing depth parameter for related posts hydration
- Added useMemo for 3 context providers
- Added useCallback to 3 event handlers
- Wrapped 2 list item components with React.memo
- Extracted toast icons to module-level constant
