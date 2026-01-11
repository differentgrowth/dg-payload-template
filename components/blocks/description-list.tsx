import type { DescriptionListBlock as DescriptionListBlockProps } from "@/payload-types";

import { RichText } from "@/components/shared/rich-text";
import { cn } from "@/lib/utils";

type Props = DescriptionListBlockProps & {
  className?: string;
};

export function DescriptionList({ title, subtitle, items, className }: Props) {
  if (!items || items.length === 0) {
    return null;
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

        <dl className="mx-auto max-w-3xl space-y-6">
          {items.map((item, index) => (
            <div
              className={cn(
                "group rounded-2xl border border-border/50 bg-card p-6",
                "transition-all duration-300",
                "hover:border-border hover:shadow-black/5 hover:shadow-lg"
              )}
              key={item.id}
            >
              <dt className="flex items-center gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-medium text-primary text-sm">
                  {index + 1}
                </span>
                <span className="font-semibold text-lg">{item.title}</span>
              </dt>
              <dd className="mt-4 pl-12 text-muted-foreground">
                <RichText data={item.content} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
