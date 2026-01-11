import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

export const homepageData = (
  setRichText: (text: string) => SerializedEditorState<SerializedLexicalNode>
) => ({
  label: "Home",
  hero: {
    title: "Build faster. Ship smarter.",
    description: setRichText(
      "The modern platform for teams who want to move fast without breaking things. From idea to production in minutes, not months."
    ),
  },
  blocks: [
    {
      blockType: "stats" as const,
      items: [
        {
          value: "10k+",
          label: "Developers",
          description: "Building with our platform",
        },
        {
          value: "99.99%",
          label: "Uptime",
          description: "Over the past 12 months",
        },
        {
          value: "< 50ms",
          label: "Latency",
          description: "Global average response time",
        },
        {
          value: "150+",
          label: "Countries",
          description: "Where we serve traffic",
        },
      ],
    },
    {
      blockType: "cardLinks" as const,
      links: [
        {
          title: "Quick Start",
          label: "Get running in 5 minutes",
          url: "/docs/quickstart",
        },
        {
          title: "API Reference",
          label: "Complete API documentation",
          url: "/docs/api",
        },
        {
          title: "Examples",
          label: "Real-world code samples",
          url: "/examples",
        },
      ],
    },
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "half" as const,
          content: setRichText(
            "## Why teams choose us\n\nWe built this platform because we were tired of the complexity. Every feature is designed with one goal: **get you to production faster**.\n\nNo configuration hell. No vendor lock-in. Just clean APIs that work the way you expect."
          ),
        },
        {
          size: "half" as const,
          content: setRichText(
            "## Built for scale\n\nWhether you're a solo developer or an enterprise team, the platform grows with you. Start free, scale infinitely.\n\n- **99.99% uptime** SLA available\n- **Global edge network** for low latency\n- **SOC 2 Type II** compliant"
          ),
        },
      ],
    },
    {
      blockType: "descriptionList" as const,
      items: [
        {
          title: "Instant Deployments",
          content: setRichText(
            "Push your code and watch it go live in seconds. Our intelligent build system optimizes every deployment automatically."
          ),
        },
        {
          title: "Real-time Collaboration",
          content: setRichText(
            "Work together seamlessly with preview deployments for every pull request. Share links, gather feedback, iterate faster."
          ),
        },
        {
          title: "Observability Built-in",
          content: setRichText(
            "Logs, metrics, and traces in one place. Understand exactly what's happening in your application without bolting on third-party tools."
          ),
        },
        {
          title: "Edge Functions",
          content: setRichText(
            "Run code at the edge, closest to your users. Perfect for A/B testing, personalization, and geolocation-based logic."
          ),
        },
      ],
    },
    {
      blockType: "testimonials" as const,
      items: [
        {
          name: "Sarah Chen",
          content:
            "We cut our deployment time from 45 minutes to under 30 seconds. The ROI was immediate.",
          url: "https://example.com",
        },
        {
          name: "Marcus Rodriguez",
          content:
            "Finally, a platform that doesn't make me feel like I need a DevOps team just to ship a landing page.",
          url: "https://example.com",
        },
        {
          name: "Elena Kowalski",
          content:
            "The developer experience is unmatched. Our team velocity increased 3x in the first month.",
          url: "https://example.com",
        },
      ],
    },
    {
      blockType: "featuredPosts" as const,
      title: "From the blog",
      subtitle: "Insights, tutorials, and updates from our engineering team.",
    },
    {
      blockType: "callToAction" as const,
      title: "Ready to get started?",
      description:
        "Join thousands of developers shipping production applications every day.",
      button: {
        label: "Start for free",
        path: "/signup",
      },
    },
  ],
});
