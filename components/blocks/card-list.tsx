import type { CardListBlock as CardListBlockProps } from "@/payload-types";

import Image from "next/image";

import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type Props = CardListBlockProps & {
  className?: string;
};

export function CardList({ items, className }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container max-w-7xl space-y-4">
        {items.map((item) => (
          <article
            className={cn(
              "group flex flex-col gap-6 rounded-2xl border border-border/50 bg-card p-6",
              "transition-all duration-300 sm:flex-row sm:items-center",
              "hover:border-border hover:shadow-black/5 hover:shadow-lg"
            )}
            key={item.id}
          >
            <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-muted/50 sm:size-24">
              {item.image &&
              typeof item.image === "object" &&
              item.image.url ? (
                <Image
                  alt={item.image.alt || item.label}
                  className="size-14 object-contain sm:size-16"
                  height={64}
                  src={item.image.url}
                  width={64}
                />
              ) : (
                <Logo className="size-10 opacity-60" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-lg leading-relaxed">{item.label}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
