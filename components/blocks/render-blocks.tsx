import type { Page } from "@/payload-types";

import dynamic from "next/dynamic";

import { BlockErrorBoundary } from "@/components/blocks/block-error-boundary";
import { CallToAction } from "@/components/blocks/call-to-action";
import { CardLinks } from "@/components/blocks/card-links";
import { CardList } from "@/components/blocks/card-list";
import { ColumnSection } from "@/components/blocks/column-section";
import { DescriptionList } from "@/components/blocks/description-list";
import { EmbedMap } from "@/components/blocks/embed-map";
import { FeaturedPosts } from "@/components/blocks/featured-posts";
import { Gallery } from "@/components/blocks/gallery";
import { LatestPosts } from "@/components/blocks/latest-posts";
import { LogoCloud } from "@/components/blocks/logo-cloud";
import { Media } from "@/components/blocks/media";
import { PricingTable } from "@/components/blocks/pricing-table";
import { Stats } from "@/components/blocks/stats";
import { TeamSection } from "@/components/blocks/team-section";

// Dynamic imports for heavy components (bundle size optimization)
// ContactForm: client component with react-hook-form (~12KB)
const ContactForm = dynamic(() =>
  import("@/components/blocks/contact-form").then((mod) => mod.ContactForm)
);
// Comparison: uses motion/react library (~45KB)
const Comparison = dynamic(() =>
  import("@/components/blocks/comparison").then((mod) => mod.Comparison)
);
// Faqs: uses accordion with client-side interactivity
const Faqs = dynamic(() =>
  import("@/components/blocks/faqs").then((mod) => mod.Faqs)
);
// Marquee: uses client-side marquee animations
const Marquee = dynamic(() =>
  import("@/components/blocks/marquee").then((mod) => mod.Marquee)
);
// Testimonials: uses marquee animations
const Testimonials = dynamic(() =>
  import("@/components/blocks/testimonials").then((mod) => mod.Testimonials)
);

const blockComponents = {
  callToAction: CallToAction,
  cardLinks: CardLinks,
  cardList: CardList,
  columnSection: ColumnSection,
  comparison: Comparison,
  contactForm: ContactForm,
  descriptionList: DescriptionList,
  embedMap: EmbedMap,
  faqs: Faqs,
  featuredPosts: FeaturedPosts,
  gallery: Gallery,
  latestPosts: LatestPosts,
  logoCloud: LogoCloud,
  marquee: Marquee,
  media: Media,
  pricingTable: PricingTable,
  stats: Stats,
  teamSection: TeamSection,
  testimonials: Testimonials,
};

// Client blocks that can be wrapped in BlockErrorBoundary
// These are either marked "use client" or loaded via dynamic()
const clientBlocks = new Set([
  "contactForm",
  "comparison",
  "faqs",
  "marquee",
  "testimonials",
]);

interface Props {
  blocks: Page["blocks"];
}

export const RenderBlocks = ({ blocks }: Props) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const { blockType } = block;

        if (blockType && blockType in blockComponents) {
          const Block =
            blockComponents[blockType as keyof typeof blockComponents];

          if (Block) {
            // Only wrap client blocks in error boundary to preserve SSR for server components
            if (clientBlocks.has(blockType)) {
              return (
                <BlockErrorBoundary blockType={blockType} key={block.id}>
                  {/* biome-ignore lint/suspicious/noExplicitAny: Block components have varying prop types */}
                  <Block {...(block as any)} />
                </BlockErrorBoundary>
              );
            }

            // Server blocks render without wrapper to maintain SSR benefits
            return (
              // biome-ignore lint/suspicious/noExplicitAny: Block components have varying prop types
              <Block {...(block as any)} key={block.id} />
            );
          }
        }
        return null;
      })}
    </>
  );
};
