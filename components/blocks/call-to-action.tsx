import type { CallToActionBlock as CallToActionBlockProps } from "@/payload-types";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

type Props = CallToActionBlockProps & {
  className?: string;
};

export const CallToAction = ({
  title,
  description,
  button,
  enableSecondaryButton,
  secondaryButton,
  hasBackground,
  className,
}: Props) => (
  <section
    className={cn(
      "relative overflow-hidden",
      hasBackground ? "bg-muted/50" : "border-border/50 border-y",
      className
    )}
  >
    <div className="container max-w-7xl py-16 lg:py-24">
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        ) : null}

        <div
          className={cn(
            "mt-8 flex flex-col items-center gap-4",
            "sm:flex-row sm:justify-center"
          )}
        >
          {button?.path ? (
            <Link
              className={cn(buttonVariants({ size: "lg" }), "min-w-40")}
              href={button.path}
            >
              {button?.label || "¡Empezar ahora!"}
              <HugeiconsIcon
                className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                icon={ArrowRight01Icon}
              />
            </Link>
          ) : null}

          {enableSecondaryButton && secondaryButton?.path ? (
            <Link
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "min-w-40"
              )}
              href={secondaryButton.path}
            >
              {secondaryButton?.label || "¡Saber más!"}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);
