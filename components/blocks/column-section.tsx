import type { ColumnSectionBlock as ColumnSectionBlockProps } from "@/payload-types";

import Link from "next/link";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { RichText } from "@/components/shared/rich-text";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

type Props = ColumnSectionBlockProps & {
  className?: string;
};

export const ColumnSection = ({ columns, hasBackground, className }: Props) => {
  return (
    <section
      className={cn(
        "py-16 lg:py-24",
        hasBackground && "bg-muted/30",
        className
      )}
    >
      <div className="container max-w-7xl">
        <div className="grid grid-cols-4 gap-x-12 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map(({ enableLink, link, content, size, id }) => {
              return (
                <div
                  className={cn("col-span-4", {
                    "mx-auto max-w-7xl lg:col-span-full": size === "full",
                    "lg:col-span-6 lg:col-start-4":
                      columns.length === 1 && size === "half",
                    "lg:col-span-4 lg:col-start-5":
                      columns.length === 1 && size === "oneThird",
                    "lg:col-span-8 lg:col-start-3":
                      columns.length === 1 && size === "twoThirds",
                    "lg:col-span-6": columns.length > 1 && size === "half",
                    "lg:col-span-4": columns.length > 1 && size === "oneThird",
                    "lg:col-span-8": columns.length > 1 && size === "twoThirds",
                  })}
                  key={id}
                >
                  {content ? (
                    <RichText
                      className="prose prose-lg max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-headings:tracking-tight"
                      data={content}
                    />
                  ) : null}

                  {enableLink && link?.url ? (
                    <Link
                      className={cn(buttonVariants({ size: "lg" }), "mt-6")}
                      href={link.url}
                    >
                      {link.label}
                      <HugeiconsIcon
                        className="ml-2 size-4"
                        icon={ArrowRight01Icon}
                      />
                    </Link>
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
