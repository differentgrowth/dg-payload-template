---
description: Initialize project context by creating AGENTS.md and CLAUDE.md symlink
---

## Instructions

Analyze the current project and create an `AGENTS.md` file with comprehensive project context, plus a `CLAUDE.md` symlink.

### Step 1: Gather Project Information

Read and analyze:
- `package.json` for project name, dependencies, scripts
- `tsconfig.json` or similar for language/compiler config
- `README.md` if exists
- `.env.example` or `.env.local` for environment variables
- Directory structure (`ls -la`, key folders)
- Existing `CLAUDE.md` or `AGENTS.md` for conventions
- Any config files (next.config.*, vite.config.*, etc.)

### Step 2: Create AGENTS.md

Generate `AGENTS.md` at project root with this structure:

```markdown
# {Project Name} - Project Context

> Brief one-line description of what this project is.

## Project Overview

[2-3 paragraphs describing:
- What the project does
- Who it's for
- Key features/goals]

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [e.g., Next.js 15] |
| Language | [e.g., TypeScript 5.x] |
| Styling | [e.g., Tailwind CSS] |
| Database | [if applicable] |
| Hosting | [if known] |
| Package Manager | [e.g., pnpm] |

## Architecture

### Directory Structure

```
[Key directories with brief descriptions]
```

### Key Patterns

- [Pattern 1: e.g., "Server Components by default"]
- [Pattern 2: e.g., "Colocation of components with pages"]
- [Pattern 3: e.g., "Shared UI in /components/ui"]

## Project Conventions

### File Organization

- [Rule 1]
- [Rule 2]

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE | `API_BASE_URL` |
| Files | kebab-case | `user-profile.tsx` |

### Code Patterns

- [Pattern from CLAUDE.md or inferred]
- [Import ordering]
- [Error handling approach]

## Development

### Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run linter |
| `pnpm test` | Run tests |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| [VAR_NAME] | [Purpose] | Yes/No |

## Related Documents

| Document | Purpose |
|----------|---------|
| `AGENTS.md` | Project context (this file) |
| `CLAUDE.md` | Symlink to AGENTS.md (for Claude Code) |
| `PLAN.md` | Project roadmap and task tracking |
| `PROGRESS.md` | Session history and active work |
| `BRAND_MANUAL.md` | Brand guidelines (if applicable) |
| `CONTENT_GUIDE.md` | Content standards (if applicable) |

## Notes

[Any additional context, gotchas, or important information for AI agents working on this project]
```

### Step 3: Customize Content

- Replace all placeholders with actual project information
- Remove sections that don't apply (e.g., Database if none)
- Add project-specific sections if needed
- Keep it concise but comprehensive

### Step 4: Create CLAUDE.md Symlink

After creating `AGENTS.md`, create a symlink so both Claude Code and OpenCode use the same file:

```bash
ln -sf AGENTS.md CLAUDE.md
```

This ensures:
- `AGENTS.md` is the single source of truth
- `CLAUDE.md` (used by Claude Code) points to it
- Both tools share identical project context

If `CLAUDE.md` already exists as a regular file, back it up first:
```bash
mv CLAUDE.md CLAUDE.md.backup
ln -sf AGENTS.md CLAUDE.md
```

### Guidelines

- Be factual - only include information you can verify from the codebase
- Use tables for structured information
- Keep descriptions brief and scannable
- Focus on information useful for AI agents working on the project
