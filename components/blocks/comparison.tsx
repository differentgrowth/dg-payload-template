import type { ComparisonBlock as ComparisonBlockProps } from "@/payload-types";

import { Media } from "@/components/blocks/media";
import {
  ComparisonHandle,
  ComparisonItem,
  Comparison as ComparisonRoot,
} from "@/components/ui/comparison";
import { cn } from "@/lib/utils";

type Props = ComparisonBlockProps & {
  className?: string;
};

export const Comparison = ({
  title,
  description,
  beforeImage,
  afterImage,
  className,
}: Props) => (
  <section className={cn("py-16 lg:py-24", className)}>
    <div className="container max-w-7xl">
      {(title || description) && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {title ? (
            <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>
      )}

      <ComparisonRoot className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border/50 shadow-black/5 shadow-lg">
        <ComparisonItem position="left">
          <Media blockType="media" media={afterImage} />
        </ComparisonItem>
        <ComparisonItem position="right">
          <Media blockType="media" media={beforeImage} />
        </ComparisonItem>
        <ComparisonHandle />
      </ComparisonRoot>
    </div>
  </section>
);
