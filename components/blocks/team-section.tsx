import type { TeamSectionBlock as TeamSectionBlockProps } from "@/payload-types";

import Image from "next/image";

import { Media } from "@/components/blocks/media";
import { cn } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

type Props = TeamSectionBlockProps & {
  className?: string;
};

export const TeamSection = ({
  title,
  subtitle,
  members,
  hasBackground,
  className,
}: Props) => (
  <section
    className={cn("py-16 lg:py-24", hasBackground && "bg-muted/30", className)}
  >
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

      {members?.length ? (
        <div
          className={cn(
            "grid gap-8",
            members.length === 1 && "mx-auto max-w-sm",
            members.length === 2 && "mx-auto max-w-2xl sm:grid-cols-2",
            members.length === 3 && "sm:grid-cols-2 lg:grid-cols-3",
            members.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {members.map(({ name, role, bio, image, id }) => {
            if (typeof image === "number") {
              return null;
            }

            return (
              <article
                className={cn(
                  "group overflow-hidden rounded-2xl border border-border/50 bg-card",
                  "transition-all duration-300",
                  "hover:border-border hover:shadow-black/5 hover:shadow-lg"
                )}
                key={id}
              >
                <div className="aspect-square overflow-hidden">
                  {image ? (
                    <Media
                      blockType="media"
                      imgClassName="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      media={image}
                      pictureClassName="size-full"
                    />
                  ) : (
                    <Image
                      alt=""
                      className="size-full object-cover"
                      src={placeholder}
                    />
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="mt-1 text-muted-foreground text-sm">{role}</p>
                  {bio && (
                    <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                      {bio}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </div>
  </section>
);
