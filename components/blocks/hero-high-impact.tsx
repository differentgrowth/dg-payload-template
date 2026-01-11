import type { Page } from "@/payload-types";

import Link from "next/link";

import { ArrowRight01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/shared/rich-text";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export const HeroHighImpact = (props: Page["hero"]) => {
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
  } = props;

  return (
    <section
      className={cn(
        "relative isolate min-h-[70dvh] overflow-hidden",
        image && "relative"
      )}
    >
      {image && (
        <>
          <div className="absolute inset-0 z-10 bg-background/85 backdrop-blur-sm" />
          <Media blockType="media" fill media={image} />
        </>
      )}

      <div className="container relative z-20 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-center py-24 text-center sm:py-32">
          {enablePrimaryLink && primaryLink?.path && (
            <Link
              className={cn(
                "mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2",
                "text-muted-foreground text-sm transition-colors hover:border-border hover:text-foreground"
              )}
              href={primaryLink.path}
            >
              {primaryLink.label}
              <HugeiconsIcon className="size-4" icon={ArrowRight01Icon} />
            </Link>
          )}

          <h1 className="text-balance font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <RichText
              className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl"
              data={description}
            />
          )}

          {(enablePrimaryLink || enableSecondaryLink) && (
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              {enablePrimaryLink && primaryLink?.path && (
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "min-w-40 sm:hidden"
                  )}
                  href={primaryLink.path}
                >
                  {primaryLink.label || "Get started"}
                  <HugeiconsIcon
                    className="ml-2 size-4"
                    icon={ArrowRight01Icon}
                  />
                </Link>
              )}

              {enableSecondaryLink && secondaryLink?.path && (
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "min-w-40"
                  )}
                  href={secondaryLink.path}
                >
                  {secondaryLink.label || "Learn more"}
                  <HugeiconsIcon
                    className="ml-2 size-4"
                    icon={ArrowRight02Icon}
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
