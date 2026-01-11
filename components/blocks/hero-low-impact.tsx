import type { Media as MediaType, Page } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/shared/rich-text";
import { cn } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

const HeroButtons = ({
  primary,
  secondary,
}: {
  primary?: { label?: string | null; path?: string | null };
  secondary?: { label?: string | null; path?: string | null };
  image: number | MediaType | null | undefined;
  heroImpact: "low" | "high" | null | undefined;
}) => {
  if (!(primary || secondary)) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      {primary?.path && (
        <Link className={cn({ size: "lg" })} href={primary.path}>
          {primary.label || "Get started"}
          <HugeiconsIcon className="ml-2 size-4" icon={ArrowRight01Icon} />
        </Link>
      )}

      {secondary?.path && (
        <Link
          className={cn({ size: "lg", variant: "outline" })}
          href={secondary.path}
        >
          {secondary.label || "Learn more"}
          <HugeiconsIcon className="ml-2 size-4" icon={ArrowRight02Icon} />
        </Link>
      )}
    </div>
  );
};

export const HeroLowImpact = (props: Page["hero"]) => {
  if (!props) {
    return null;
  }

  const {
    title,
    description,
    enablePrimaryLink,
    primaryLink,
    enableSecondaryLink,
    secondaryLink,
    image,
    impact,
  } = props;

  const primaryBtn =
    enablePrimaryLink && primaryLink?.label && primaryLink?.path
      ? primaryLink
      : undefined;

  const secondaryBtn =
    enableSecondaryLink && secondaryLink?.label && secondaryLink?.path
      ? secondaryLink
      : undefined;

  return (
    <section className="relative overflow-hidden border-border/50 border-b bg-muted/30">
      <div className="container max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div
          className={cn("grid items-center gap-12 lg:grid-cols-2 lg:gap-16")}
        >
          <div className="max-w-xl">
            {title && (
              <h1 className="text-balance font-bold text-4xl tracking-tight sm:text-5xl">
                {title}
              </h1>
            )}

            {description && (
              <RichText
                className="mt-6 text-lg text-muted-foreground leading-relaxed"
                data={description}
              />
            )}

            <HeroButtons
              heroImpact={impact}
              image={image}
              primary={primaryBtn}
              secondary={secondaryBtn}
            />
          </div>

          <div className="relative">
            {image ? (
              <Media
                blockType="media"
                imgClassName="rounded-2xl"
                media={image}
                pictureClassName="w-full rounded-2xl shadow-xl shadow-black/10"
                videoClassName="w-full rounded-2xl shadow-xl shadow-black/10"
              />
            ) : (
              <Image
                alt="placeholder"
                className="aspect-4/3 w-full rounded-2xl object-cover shadow-black/10 shadow-xl"
                src={placeholder}
                unoptimized
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
