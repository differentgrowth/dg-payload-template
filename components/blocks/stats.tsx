import type { StatsBlock as StatsBlockProps } from "@/payload-types";

import { cn } from "@/lib/utils";

type Props = StatsBlockProps & {
  className?: string;
};

export function Stats({ title, subtitle, items, className }: Props) {
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

        <div
          className={cn(
            "grid gap-8",
            items.length === 1 && "mx-auto max-w-xs grid-cols-1",
            items.length === 2 && "mx-auto max-w-2xl grid-cols-2",
            items.length === 3 && "grid-cols-2 md:grid-cols-3",
            items.length >= 4 && "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {items
            .filter((item) => item.value && item.label)
            .map((item) => (
              <div
                className={cn(
                  "group rounded-2xl border border-border/50 bg-card p-8 text-center",
                  "transition-all duration-300",
                  "hover:border-border hover:shadow-black/5 hover:shadow-lg"
                )}
                key={item.id}
              >
                <div className="mb-2 font-bold text-4xl text-primary tracking-tight lg:text-5xl">
                  {item.value}
                </div>
                <div className="font-medium text-foreground">{item.label}</div>
                {item.description && (
                  <div className="mt-2 text-muted-foreground text-sm">
                    {item.description}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
