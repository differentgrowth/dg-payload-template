import type { PricingTableBlock as PricingTableBlockProps } from "@/payload-types";

import Link from "next/link";

import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

type Props = PricingTableBlockProps & {
  className?: string;
};

export function PricingTable({ title, subtitle, plans, className }: Props) {
  if (!plans || plans.length === 0) {
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
            plans.length === 1 && "mx-auto max-w-md",
            plans.length === 2 && "mx-auto max-w-3xl md:grid-cols-2",
            plans.length === 3 && "lg:grid-cols-3",
            plans.length >= 4 && "lg:grid-cols-4"
          )}
        >
          {plans.map((plan) => (
            <article
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8",
                "transition-all duration-300",
                plan.highlighted
                  ? "border-primary shadow-lg shadow-primary/10"
                  : "border-border/50 hover:border-border hover:shadow-black/5 hover:shadow-lg"
              )}
              key={plan.id}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Recomendado
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-xl">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-2 text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <span className="font-bold text-4xl tracking-tight">
                  {plan.price}
                </span>
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="mb-8 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li className="flex items-start gap-3" key={feature.id}>
                      <div
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                          feature.included
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <HugeiconsIcon
                          className="size-3"
                          icon={feature.included ? Tick02Icon : Cancel01Icon}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          !feature.included && "text-muted-foreground"
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {plan.button?.path && (
                <Link
                  className={cn(
                    buttonVariants({
                      variant: plan.highlighted ? "default" : "outline",
                      size: "lg",
                    }),
                    "w-full"
                  )}
                  href={plan.button.path}
                >
                  {plan.button.label || "Empezar"}
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
