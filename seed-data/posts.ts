import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Category, User } from "@/payload-types";

interface PostConfig {
  author: User;
  featured: boolean;
  category: Category;
  slug: string;
  status: "published" | "draft";
}

interface PostTemplate {
  title: string;
  excerpt: string;
  content: string;
}

const postTemplates: Record<string, PostTemplate> = {
  "announcing-v2": {
    title: "Announcing Platform v2.0",
    excerpt:
      "After months of work, we're excited to announce the biggest update to our platform yet. Here's everything that's new.",
    content: `We've been heads down for the past six months building what we believe is a generational leap for our platform. Today, we're thrilled to announce Platform v2.0.

## What's New

**Performance Improvements**

Cold starts are now 5x faster. We completely rewrote our runtime to eliminate unnecessary overhead and optimize for real-world workloads.

**New Dashboard**

The dashboard has been redesigned from the ground up. Everything you need is now accessible in two clicks or less.

**Team Features**

- Role-based access control
- Audit logs
- SSO integration
- Usage analytics per team member

## Migration

Existing projects will be automatically migrated over the next two weeks. No action required on your part—we'll handle everything seamlessly.

## What's Next

This is just the beginning. We have an ambitious roadmap for the rest of the year, including native mobile support, GraphQL API, and much more.

Thank you to everyone who provided feedback during the beta. You made this release possible.`,
  },
  "edge-functions-guide": {
    title: "The Complete Guide to Edge Functions",
    excerpt:
      "Learn how to run code at the edge, closest to your users. This guide covers everything from setup to advanced patterns.",
    content: `Edge functions let you run code in 30+ regions worldwide, responding to requests in milliseconds. This guide will show you how to get started and explore advanced patterns.

## Why Edge Functions?

Traditional serverless functions run in a single region. If your users are in Tokyo but your function runs in Virginia, every request adds 200ms of latency.

Edge functions solve this by running your code in the region closest to each user. The same function, deployed everywhere.

## Getting Started

Create a new edge function:

\`\`\`typescript
export default function handler(request: Request) {
  return new Response('Hello from the edge!', {
    headers: { 'content-type': 'text/plain' },
  });
}
\`\`\`

Deploy it:

\`\`\`bash
platform deploy --edge
\`\`\`

That's it. Your function is now running globally.

## Common Use Cases

**A/B Testing**

Run experiments without client-side flicker by making routing decisions at the edge.

**Geolocation**

Personalize content based on the user's country, city, or region.

**Authentication**

Validate tokens and redirect unauthenticated users before they hit your origin.

## Performance Tips

1. Keep functions small—aim for under 1MB
2. Use streaming responses for large payloads
3. Cache aggressively with appropriate headers
4. Avoid blocking I/O when possible

Edge functions are one of the most powerful tools in modern web development. Start small, measure everything, and iterate.`,
  },
  "database-scaling": {
    title: "Scaling Your Database: Lessons from 1M Requests/Second",
    excerpt:
      "What we learned scaling our database infrastructure to handle a million requests per second.",
    content: `Last month, our database infrastructure handled over 1 million requests per second during a major product launch. Here's what we learned along the way.

## The Problem

Our original architecture was simple: one primary database, a few read replicas. It worked great until it didn't.

At around 100k requests/second, we started seeing increased latency. At 200k, timeouts. Something had to change.

## Solution 1: Read Replicas

We added more read replicas. This helped—briefly. The primary was still a bottleneck for writes, and replication lag was causing consistency issues.

## Solution 2: Sharding

We implemented horizontal sharding based on tenant ID. Each shard handles a subset of tenants, distributing the load.

Key decisions:
- Consistent hashing for shard assignment
- 64 logical shards, 8 physical servers
- Each physical server hosts 8 shards

## Solution 3: Connection Pooling

Connection pooling was a game-changer. We went from thousands of direct connections to a pool of 100 persistent connections per shard.

## What We'd Do Differently

1. Start with connection pooling from day one
2. Build observability early—we were flying blind for too long
3. Plan for sharding even if you don't need it yet

Scaling databases is hard. But with the right architecture, it's entirely tractable. The key is to plan ahead and iterate based on real data.`,
  },
  "developer-experience": {
    title: "Why Developer Experience Matters More Than Features",
    excerpt:
      "The best product isn't the one with the most features—it's the one developers actually want to use.",
    content: `We spend a lot of time thinking about developer experience (DX). Not because it's trendy, but because we believe it's the most important differentiator in developer tools.

## The DX Paradox

More features often mean worse DX. Every new capability adds cognitive load. Every new option is a decision someone has to make.

The best developer tools are opinionated. They make decisions so you don't have to.

## What Good DX Looks Like

**Fast feedback loops**

Deploy in seconds, not minutes. See errors immediately, not after a 10-minute build.

**Sensible defaults**

The default behavior should be the right behavior 90% of the time.

**Clear error messages**

"Error: Something went wrong" is not an error message. Tell developers what happened and how to fix it.

**Minimal configuration**

Zero-config should be the goal. Every config file is a failure of defaults.

## Measuring DX

We track:
- Time to first successful deployment
- Support tickets per 1000 users
- Documentation bounce rate
- CLI command success rate

Numbers don't capture everything, but they're a starting point.

## The Business Case

Good DX isn't just nice to have. It's a competitive advantage:
- Lower support costs
- Higher retention
- Organic growth through word of mouth

Developer experience is product strategy. Treat it accordingly.`,
  },
  "security-best-practices": {
    title: "Security Best Practices for Modern Web Applications",
    excerpt: "A comprehensive guide to securing your web applications in 2025.",
    content: `Security is everyone's responsibility. This guide covers the essential practices every developer should know.

## Authentication

**Use established libraries**

Never roll your own authentication. Use battle-tested libraries and services.

**Implement MFA**

Multi-factor authentication should be available for all users and required for admin accounts.

**Secure session management**

- Use secure, httpOnly cookies
- Implement proper session expiration
- Rotate session tokens after login

## Authorization

**Principle of least privilege**

Users and services should only have the permissions they absolutely need.

**Validate on the server**

Never trust client-side checks. Always validate permissions server-side.

## Data Protection

**Encrypt at rest and in transit**

TLS everywhere. Encrypt sensitive data in your database.

**Sanitize inputs**

Protect against SQL injection, XSS, and other injection attacks.

**Audit logging**

Log security-relevant events. Who did what, when.

## Dependencies

**Keep dependencies updated**

Automate dependency updates with tools like Dependabot.

**Audit regularly**

Run security audits as part of your CI/CD pipeline.

## Response Plan

**Have a plan before you need one**

Document how you'll respond to security incidents. Practice it.

Security is a journey, not a destination. Stay vigilant, keep learning, and assume you'll be breached—then design accordingly.`,
  },
  "monorepo-setup": {
    title: "Setting Up a Monorepo That Actually Works",
    excerpt:
      "Monorepos can be amazing or terrible. Here's how to set one up that your team will love.",
    content: `Monorepos are having a moment. But for every success story, there are teams drowning in complexity. Here's how to get it right.

## Why Monorepo?

**Shared code without the pain**

No more "which version of the shared library do I use?" Just import it.

**Atomic changes**

Update an API and all its consumers in one commit. No coordination required.

**Unified tooling**

One CI/CD pipeline, one set of linters, one way of doing things.

## The Setup

We recommend Turborepo for most teams. It's fast, simple, and works out of the box.

\`\`\`bash
npx create-turbo@latest
\`\`\`

Structure your repo like this:

\`\`\`
apps/
  web/
  api/
  docs/
packages/
  ui/
  config/
  utils/
\`\`\`

## Key Decisions

**Package manager**

Use pnpm. Faster installs, better disk usage, native workspace support.

**Build system**

Turborepo handles caching and parallel builds. Don't overthink it.

**Versioning**

For internal packages, skip semver. Just use workspace references.

## Common Pitfalls

1. Don't put everything in one package
2. Establish clear ownership for shared packages
3. Set up proper caching from day one
4. Document the why, not just the how

Monorepos aren't magic. They're a tool. Use them when they make sense, and don't be afraid to split things out if the monorepo becomes more pain than value.`,
  },
};

export const postData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PostConfig
) => {
  const template = postTemplates[config.slug] ?? postTemplates["announcing-v2"];

  return {
    slug: config.slug,
    title: template.title,
    description: setRichText(template.excerpt),
    publishedAt: new Date().toISOString(),
    authors: [config.author.id],
    featured: config.featured,
    categories: [config.category.id],
    relatedPosts: [],
    content: setRichText(template.content),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    _status: config.status,
  };
};

export const postSlugs = Object.keys(postTemplates);
