import type { CardLinksBlock as CardLinksBlockProps } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight02Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

type Props = CardLinksBlockProps & {
  className?: string;
};

export function CardLinks({ links, className }: Props) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div
        className={cn(
          "container grid max-w-7xl grid-cols-1 gap-6",
          "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {links.map((link) => (
          <article
            className={cn(
              "group relative flex flex-col rounded-2xl border border-border/50 bg-card p-6",
              "transition-all duration-300",
              "hover:border-border hover:shadow-black/5 hover:shadow-lg"
            )}
            key={link.id}
          >
            <div className="mb-6 flex size-16 items-center justify-center rounded-xl bg-muted/50">
              {link.image &&
              typeof link.image === "object" &&
              link.image.sizes?.square?.url ? (
                <Image
                  alt={link.image.alt || link.title}
                  className="size-10 object-contain"
                  height={40}
                  src={link.image.sizes?.square?.url}
                  width={40}
                />
              ) : (
                <Logo className="size-8 opacity-60" />
              )}
            </div>

            <h3 className="font-semibold text-lg">{link.title}</h3>

            <div className="mt-auto pt-6">
              <Link
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-between"
                )}
                href={link.url}
              >
                {link.label}
                <HugeiconsIcon
                  className="size-4 transition-transform group-hover:translate-x-1"
                  icon={
                    link.url.startsWith("http")
                      ? LinkSquare02Icon
                      : ArrowRight02Icon
                  }
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
