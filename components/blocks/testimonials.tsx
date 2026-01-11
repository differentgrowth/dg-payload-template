import type { TestimonialsBlock as TestimonialsBlockProps } from "@/payload-types";

import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Marquee as MarqueeRoot } from "@/components/ui/marquee";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

type Props = TestimonialsBlockProps & {
  className?: string;
};

export const Testimonials = ({
  title,
  subtitle,
  animated,
  items,
  className,
}: Props) => {
  if (!items?.length) {
    return null;
  }

  if (animated === "none") {
    return (
      <section className={cn("py-16 lg:py-24", className)}>
        <div className="container max-w-7xl">
          {(title || subtitle) && (
            <div className="mx-auto mb-12 max-w-2xl text-center">
              {title && (
                <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div
            className={cn(
              "grid gap-6",
              items.length === 1 && "mx-auto max-w-md",
              items.length === 2 && "mx-auto max-w-3xl md:grid-cols-2",
              items.length >= 3 && "md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {items.map((testimonial) => (
              <TestimonialCard {...testimonial} key={testimonial.id} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container max-w-7xl">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2 className="font-semibold text-3xl tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          "relative",
          animated === "vertical" &&
            "flex h-125 w-full flex-row items-center justify-center gap-4 overflow-hidden",
          animated === "horizontal" &&
            "flex w-full flex-col items-center justify-center gap-4 overflow-hidden"
        )}
      >
        <MarqueeRoot
          className="[--duration:40s]"
          pauseOnHover
          repeat={4}
          vertical={animated === "vertical"}
        >
          {items.map((testimonial) => (
            <TestimonialCard {...testimonial} key={testimonial.id} />
          ))}
        </MarqueeRoot>

        {animated === "vertical" && (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background" />
          </>
        )}

        {animated === "horizontal" && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background" />
          </>
        )}
      </div>
    </section>
  );
};

function TestimonialCard({
  url,
  name,
  content,
  avatar,
  role,
}: NonNullable<TestimonialsBlockProps["items"]>[number]) {
  return (
    <article
      className={cn(
        "relative w-full max-w-sm rounded-2xl border border-border/50 bg-card p-6",
        "transition-all duration-300",
        "hover:border-border hover:shadow-black/5 hover:shadow-lg"
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="size-12 border-2 border-border/50">
          <AvatarImage
            alt={typeof avatar === "object" ? avatar?.alt || undefined : name}
            src={
              typeof avatar === "object"
                ? avatar?.sizes?.square?.url || undefined
                : undefined
            }
          />
          <AvatarFallback className="font-medium text-sm">
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-muted-foreground text-sm">
            {url ? (
              <a
                aria-label={`${role} - ${name}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto p-0 text-muted-foreground hover:text-foreground"
                )}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {role}
                <HugeiconsIcon
                  className="ml-1 size-3"
                  icon={LinkSquare02Icon}
                />
              </a>
            ) : (
              role
            )}
          </p>
        </div>
      </div>

      <blockquote className="mt-4 text-muted-foreground leading-relaxed">
        "{content}"
      </blockquote>
    </article>
  );
}
