import type {
  LogoCloudBlock as LogoCloudBlockProps,
  Media,
} from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = LogoCloudBlockProps & {
  className?: string;
};

export function LogoCloud({ title, style, logos, className }: Props) {
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container max-w-7xl">
        {title && (
          <p className="mb-12 text-center font-medium text-muted-foreground text-sm uppercase tracking-widest">
            {title}
          </p>
        )}

        <div
          className={cn(
            style === "grid" &&
              "grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
            style === "carousel" &&
              "flex items-center justify-center gap-x-12 gap-y-8 overflow-x-auto"
          )}
        >
          {logos.map((item) => {
            const logo = item.logo as Media;
            if (!logo?.url) {
              return null;
            }

            const logoElement = (
              <Image
                alt={item.name || "Company logo"}
                className={cn(
                  "h-10 w-auto max-w-[140px] object-contain",
                  "opacity-50 grayscale transition-all duration-300",
                  "hover:opacity-100 hover:grayscale-0"
                )}
                height={logo.height || 40}
                src={logo.url}
                width={logo.width || 140}
              />
            );

            if (item.url) {
              return (
                <Link
                  className="shrink-0"
                  href={item.url}
                  key={item.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {logoElement}
                </Link>
              );
            }

            return (
              <div className="shrink-0" key={item.id}>
                {logoElement}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
