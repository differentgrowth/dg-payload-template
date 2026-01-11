import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface PageConfig {
  status: "published" | "draft";
  showOnHeader: boolean;
  showOnFooter: boolean;
  slug: string;
}

const getShownIn = (config: PageConfig) => {
  const shownIn: string[] = [];
  if (config.showOnHeader) {
    shownIn.push("header");
  }
  if (config.showOnFooter) {
    shownIn.push("footer");
  }
  return shownIn;
};

const toLabel = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const aboutPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: toLabel(config.slug),
  shownIn: getShownIn(config),
  hero: {
    title: "About Us",
    description: setRichText(
      "We're a team of engineers, designers, and problem-solvers building the tools we wish existed."
    ),
  },
  blocks: [
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "half" as const,
          content: setRichText(
            "## Our story\n\nFounded in 2020, we started as a small team frustrated with the state of developer tooling. Every platform felt bloated, over-engineered, or designed by committee.\n\nSo we built something different. Something that respects your time and gets out of your way."
          ),
        },
        {
          size: "half" as const,
          content: setRichText(
            "## Our mission\n\nWe believe great tools should be invisible. They should amplify your abilities, not add cognitive load.\n\nEvery decision we make is filtered through one question: **Does this help developers ship faster?**"
          ),
        },
      ],
    },
    {
      blockType: "descriptionList" as const,
      items: [
        {
          title: "Developer-first",
          content: setRichText(
            "We're developers building for developers. We use our own product every day, so we feel every paper cut and fix it immediately."
          ),
        },
        {
          title: "Transparent by default",
          content: setRichText(
            "Our roadmap, pricing, and even our mistakes are public. We believe trust is built through transparency, not marketing."
          ),
        },
        {
          title: "Built to last",
          content: setRichText(
            "We're bootstrapped and profitable. No VC pressure to grow at all costs. We're building a company that will be here in 20 years."
          ),
        },
      ],
    },
    {
      blockType: "teamSection" as const,
      title: "Meet the team",
      subtitle:
        "We're a distributed team across 8 time zones, united by a love for great software.",
      members: [
        {
          name: "Alex Rivera",
          role: "Co-founder & CEO",
          bio: "Former infrastructure lead at Stripe. Obsessed with making complex systems simple.",
        },
        {
          name: "Jordan Park",
          role: "Co-founder & CTO",
          bio: "Ex-Google engineer. Believes the best code is the code you don't write.",
        },
        {
          name: "Sam Okonkwo",
          role: "Head of Product",
          bio: "Previously at Figma. Thinks every button should earn its place on the screen.",
        },
        {
          name: "Morgan Chen",
          role: "Head of Engineering",
          bio: "Built systems at Netflix handling millions of requests per second. Now makes developers faster.",
        },
      ],
    },
    {
      blockType: "callToAction" as const,
      title: "Want to join us?",
      description:
        "We're always looking for talented people who care about craft. Check out our open positions.",
      button: {
        label: "View careers",
        path: "/careers",
      },
    },
  ],
});

export const servicesPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: toLabel(config.slug),
  shownIn: getShownIn(config),
  hero: {
    title: "Services",
    description: setRichText(
      "Everything you need to build, deploy, and scale modern applications."
    ),
  },
  blocks: [
    {
      blockType: "cardLinks" as const,
      links: [
        {
          title: "Hosting",
          label: "Global edge deployment",
          url: "/services/hosting",
        },
        {
          title: "Databases",
          label: "Managed PostgreSQL & Redis",
          url: "/services/databases",
        },
        {
          title: "Storage",
          label: "S3-compatible object storage",
          url: "/services/storage",
        },
        {
          title: "Functions",
          label: "Serverless compute at the edge",
          url: "/services/functions",
        },
      ],
    },
    {
      blockType: "cardList" as const,
      items: [
        { label: "Zero-config deployments" },
        { label: "Automatic SSL certificates" },
        { label: "DDoS protection included" },
        { label: "Global CDN" },
        { label: "Preview environments" },
        { label: "Rollback with one click" },
      ],
    },
    {
      blockType: "descriptionList" as const,
      items: [
        {
          title: "Enterprise Support",
          content: setRichText(
            "Dedicated account manager, 24/7 support, custom SLAs, and onboarding assistance for teams that need extra help."
          ),
        },
        {
          title: "Consulting",
          content: setRichText(
            "Our solutions architects can help you design your infrastructure, optimize performance, and migrate from other platforms."
          ),
        },
        {
          title: "Training",
          content: setRichText(
            "Private workshops and training sessions to get your team up to speed on modern deployment practices and platform features."
          ),
        },
      ],
    },
    {
      blockType: "callToAction" as const,
      title: "Not sure what you need?",
      description:
        "Talk to our team. We'll help you find the right solution for your use case.",
      button: {
        label: "Contact sales",
        path: "/contact",
      },
    },
  ],
});

export const pricingPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: toLabel(config.slug),
  shownIn: getShownIn(config),
  hero: {
    title: "Simple, transparent pricing",
    description: setRichText(
      "No surprise bills. No hidden fees. Pay for what you use, scale as you grow."
    ),
  },
  blocks: [
    {
      blockType: "pricingTable" as const,
      plans: [
        {
          name: "Hobby",
          price: "Free",
          description: "Perfect for side projects and learning.",
          highlighted: false,
          features: [
            { text: "100GB bandwidth", included: true },
            { text: "1GB storage", included: true },
            { text: "Community support", included: true },
            { text: "Custom domains", included: false },
            { text: "Analytics", included: false },
          ],
          button: {
            label: "Get started",
            path: "/signup",
          },
        },
        {
          name: "Pro",
          price: "$20/mo",
          description: "For professional developers and small teams.",
          highlighted: true,
          features: [
            { text: "1TB bandwidth", included: true },
            { text: "100GB storage", included: true },
            { text: "Email support", included: true },
            { text: "Custom domains", included: true },
            { text: "Analytics", included: true },
          ],
          button: {
            label: "Start free trial",
            path: "/signup?plan=pro",
          },
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For organizations with advanced needs.",
          highlighted: false,
          features: [
            { text: "Unlimited bandwidth", included: true },
            { text: "Unlimited storage", included: true },
            { text: "24/7 support", included: true },
            { text: "SLA guarantees", included: true },
            { text: "SSO & SAML", included: true },
          ],
          button: {
            label: "Contact sales",
            path: "/contact",
          },
        },
      ],
    },
    {
      blockType: "faqs" as const,
      items: [
        {
          question: "Can I upgrade or downgrade at any time?",
          answer: setRichText(
            "Yes, you can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, you'll receive credit towards future bills."
          ),
        },
        {
          question: "What happens if I exceed my limits?",
          answer: setRichText(
            "We'll notify you when you're approaching your limits. If you exceed them, we'll continue serving your application and bill you for the overage at standard rates. No surprise outages."
          ),
        },
        {
          question: "Do you offer discounts for startups or non-profits?",
          answer: setRichText(
            "Yes! We offer 50% off for the first year for qualifying startups, and 25% off permanently for registered non-profits and open-source projects."
          ),
        },
        {
          question: "Is there a long-term contract?",
          answer: setRichText(
            "No. All plans are month-to-month. Enterprise customers can opt for annual billing with additional discounts, but it's not required."
          ),
        },
      ],
    },
    {
      blockType: "callToAction" as const,
      title: "Start building today",
      description: "Get started with our free tier. No credit card required.",
      button: {
        label: "Create free account",
        path: "/signup",
      },
    },
  ],
});

export const contactPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: toLabel(config.slug),
  shownIn: getShownIn(config),
  hero: {
    title: "Get in touch",
    description: setRichText(
      "Have a question, feedback, or just want to say hi? We'd love to hear from you."
    ),
  },
  blocks: [
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "half" as const,
          content: setRichText(
            "## Ways to reach us\n\n**Email:** hello@acme.com\n\n**Support:** support@acme.com\n\n**Sales:** sales@acme.com\n\nWe typically respond within 24 hours on business days."
          ),
        },
        {
          size: "half" as const,
          content: setRichText(
            "## Office hours\n\n**Monday - Friday:** 9am - 6pm PST\n\n**Saturday - Sunday:** Closed\n\nFor urgent issues, enterprise customers have access to 24/7 support."
          ),
        },
      ],
    },
    {
      blockType: "contactForm" as const,
      title: "Send us a message",
      subtitle:
        "Fill out the form below and we'll get back to you as soon as possible.",
    },
    {
      blockType: "embedMap" as const,
      title: "Visit our office",
      description:
        "We're located in the heart of San Francisco. Stop by for coffee if you're in the area.",
      googleMapsEmbedCode:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977771784!2d-122.3999491!3d37.7857129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ3JzA4LjYiTiAxMjLCsDI0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
      googleMapsUrl: "https://maps.google.com/?q=37.7857,-122.4000",
      appleMapsUrl: "https://maps.apple.com/?ll=37.7857,-122.4000",
    },
  ],
});

export const faqPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: "FAQ",
  shownIn: getShownIn(config),
  hero: {
    title: "Frequently Asked Questions",
    description: setRichText(
      "Find answers to common questions about our platform, pricing, and features."
    ),
  },
  blocks: [
    {
      blockType: "faqs" as const,
      items: [
        {
          question: "How do I get started?",
          answer: setRichText(
            "Sign up for a free account, connect your Git repository, and deploy your first project in under 5 minutes. Our quickstart guide walks you through every step."
          ),
        },
        {
          question: "What frameworks do you support?",
          answer: setRichText(
            "We support all major frameworks including Next.js, Remix, Astro, SvelteKit, Nuxt, and more. If it runs on Node.js or as static files, it works here."
          ),
        },
        {
          question: "Can I use my own domain?",
          answer: setRichText(
            "Absolutely. Add custom domains with automatic SSL certificates on any paid plan. We handle the certificate provisioning and renewal automatically."
          ),
        },
        {
          question: "How does billing work?",
          answer: setRichText(
            "We bill monthly based on your usage. You'll only pay for what you use beyond the free tier limits. Enterprise customers can opt for annual billing with discounts."
          ),
        },
        {
          question: "What's your uptime guarantee?",
          answer: setRichText(
            "We offer 99.9% uptime on Pro plans and 99.99% on Enterprise plans with financial SLA credits if we don't meet our commitments."
          ),
        },
        {
          question: "Can I migrate from another platform?",
          answer: setRichText(
            "Yes! We have migration guides for Vercel, Netlify, AWS, and other popular platforms. Our support team can also assist with complex migrations."
          ),
        },
        {
          question: "Do you support monorepos?",
          answer: setRichText(
            "Yes, we have first-class support for monorepos. Deploy multiple projects from a single repository with automatic dependency detection."
          ),
        },
        {
          question: "How do I contact support?",
          answer: setRichText(
            "Free tier users have access to community support and documentation. Pro users get email support. Enterprise users get 24/7 support with dedicated account managers."
          ),
        },
      ],
    },
    {
      blockType: "callToAction" as const,
      title: "Still have questions?",
      description:
        "Our support team is here to help. Reach out and we'll get back to you within 24 hours.",
      button: {
        label: "Contact support",
        path: "/contact",
      },
    },
  ],
});

export const careersPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: toLabel(config.slug),
  shownIn: getShownIn(config),
  hero: {
    title: "Join our team",
    description: setRichText(
      "Help us build the future of developer tools. We're hiring across engineering, design, and more."
    ),
  },
  blocks: [
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "half" as const,
          content: setRichText(
            "## Why work here?\n\nWe're a small, focused team that punches above our weight. You'll work on challenging problems with talented people who care deeply about their craft.\n\nNo endless meetings. No politics. Just building great software."
          ),
        },
        {
          size: "half" as const,
          content: setRichText(
            "## Benefits\n\n- **Competitive salary** + equity\n- **Remote-first** with optional co-working\n- **Unlimited PTO** (we actually take it)\n- **$5k/year** learning budget\n- **Top-tier health** insurance\n- **Latest equipment** of your choice"
          ),
        },
      ],
    },
    {
      blockType: "cardList" as const,
      items: [
        { label: "Work from anywhere" },
        { label: "Flexible hours" },
        { label: "No micromanagement" },
        { label: "Ship real features" },
        { label: "Grow with us" },
      ],
    },
    {
      blockType: "descriptionList" as const,
      items: [
        {
          title: "Senior Backend Engineer",
          content: setRichText(
            "Build the infrastructure that powers thousands of deployments per day. Golang, PostgreSQL, Kubernetes experience required."
          ),
        },
        {
          title: "Product Designer",
          content: setRichText(
            "Design intuitive interfaces for complex developer workflows. Strong systems thinking and attention to detail required."
          ),
        },
        {
          title: "Developer Advocate",
          content: setRichText(
            "Help developers succeed with our platform through content, talks, and community engagement. Must love teaching."
          ),
        },
      ],
    },
    {
      blockType: "testimonials" as const,
      items: [
        {
          name: "Jamie Liu, Engineer",
          content:
            "I've shipped more meaningful features in 6 months here than in 3 years at my previous company. The velocity is unreal.",
          url: "#",
        },
        {
          name: "Taylor Reeves, Designer",
          content:
            "Finally a company that actually values design. Every pixel matters here, and the engineering team gets it.",
          url: "#",
        },
      ],
    },
    {
      blockType: "callToAction" as const,
      title: "Don't see a perfect fit?",
      description:
        "We're always interested in exceptional people. Send us your story and let's talk.",
      button: {
        label: "Get in touch",
        path: "/contact",
      },
    },
  ],
});

export const privacyPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: "Privacy Policy",
  shownIn: getShownIn(config),
  hero: {
    title: "Privacy Policy",
    description: setRichText("Last updated: January 2025"),
  },
  blocks: [
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "full" as const,
          content: setRichText(
            "## Introduction\n\nYour privacy is important to us. This privacy policy explains what personal data we collect, how we use it, and your rights regarding your data.\n\n## Data We Collect\n\nWe collect information you provide directly:\n\n- **Account information:** email address, name, billing information\n- **Usage data:** how you interact with our platform\n- **Technical data:** IP address, browser type, device information\n\n## How We Use Your Data\n\nWe use your data to:\n\n- Provide and improve our services\n- Process payments and prevent fraud\n- Send important updates about your account\n- Respond to your requests and support needs\n\n## Data Retention\n\nWe retain your data only as long as necessary to provide our services or as required by law. You can request deletion of your data at any time.\n\n## Your Rights\n\nYou have the right to:\n\n- Access your personal data\n- Correct inaccurate data\n- Request deletion of your data\n- Export your data\n- Opt out of marketing communications\n\n## Contact Us\n\nIf you have questions about this policy, contact us at privacy@acme.com."
          ),
        },
      ],
    },
  ],
});

export const termsPageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => ({
  slug: config.slug,
  _status: config.status,
  label: "Terms of Service",
  shownIn: getShownIn(config),
  hero: {
    title: "Terms of Service",
    description: setRichText("Last updated: January 2025"),
  },
  blocks: [
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "full" as const,
          content: setRichText(
            "## Agreement to Terms\n\nBy accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.\n\n## Use of Service\n\nYou may use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service:\n\n- In violation of any applicable laws\n- To transmit harmful or malicious content\n- To infringe on intellectual property rights\n- To attempt to gain unauthorized access\n\n## Account Responsibilities\n\nYou are responsible for:\n\n- Maintaining the security of your account\n- All activities that occur under your account\n- Ensuring your content complies with our policies\n\n## Intellectual Property\n\nThe service and its original content, features, and functionality are owned by us and protected by international copyright, trademark, and other laws.\n\n## Termination\n\nWe may terminate or suspend your account immediately, without prior notice, for any breach of these Terms.\n\n## Limitation of Liability\n\nIn no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the service.\n\n## Changes to Terms\n\nWe reserve the right to modify these terms at any time. We will provide notice of significant changes via email or through the service.\n\n## Contact\n\nFor questions about these Terms, contact us at legal@acme.com."
          ),
        },
      ],
    },
  ],
});

// For backwards compatibility - generic page factory
export const pageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: PageConfig
) => aboutPageData(setRichText, config);
