import type { Category, Media as MediaType, Post, User } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import { Calendar03Icon, Time02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/shared/rich-text";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatLongDate, slugify } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

interface PostHeroProps {
  title: string;
  description: Post["description"];
  image?: number | MediaType | null;
  publishedAt?: string | null;
  authors?: (number | User)[] | null;
  categories?: (number | Category)[] | null;
  readingTime?: number;
}

export const PostHero = ({
  title,
  description,
  image,
  publishedAt,
  authors,
  categories,
  readingTime = 5,
}: PostHeroProps) => {
  const authorsList = authors?.filter(
    (author): author is User => typeof author === "object"
  );
  const categoriesList = categories?.filter(
    (cat): cat is Category => typeof cat === "object"
  );

  return (
    <header className="relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/50 via-background to-background" />

      <div className="container max-w-4xl px-6 pt-12 pb-8 lg:pt-20 lg:pb-12">
        {/* Categories */}
        {categoriesList && categoriesList.length > 0 && (
          <div className="fade-in slide-in-from-bottom-2 mb-6 flex animate-in flex-wrap gap-2 duration-500">
            {categoriesList.map((category) => (
              <Link
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-xs uppercase tracking-wider transition-colors hover:bg-primary/20"
                href={`/blog?category=${slugify(category.title)}`}
                key={category.id}
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="fade-in slide-in-from-bottom-3 animate-in text-balance font-bold font-serif text-4xl tracking-tight delay-100 duration-700 sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Description */}
        <RichText
          className="fade-in slide-in-from-bottom-4 mt-6 animate-in text-lg text-muted-foreground leading-relaxed delay-200 duration-700 sm:text-xl"
          data={description}
        />

        {/* Meta info */}
        <div className="fade-in slide-in-from-bottom-5 mt-8 flex animate-in flex-wrap items-center gap-6 border-border/50 border-t pt-8 delay-300 duration-700">
          {/* Authors */}
          {authorsList && authorsList.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {authorsList.map((author) => (
                  <Avatar
                    className="size-10 border-2 border-background"
                    key={author.id}
                  >
                    <AvatarFallback className="bg-primary/10 font-medium text-primary text-sm">
                      {author.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">
                  {authorsList.map((a) => a.name).join(", ")}
                </span>
                {authorsList.length === 1 && (
                  <span className="text-muted-foreground text-xs">Author</span>
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          {authorsList &&
            authorsList.length > 0 &&
            (publishedAt || readingTime) && (
              <div className="hidden h-8 w-px bg-border sm:block" />
            )}

          {/* Date and reading time */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            {publishedAt && (
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon className="size-4" icon={Calendar03Icon} />
                <time dateTime={publishedAt}>
                  {formatLongDate(publishedAt)}
                </time>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon className="size-4" icon={Time02Icon} />
              <span>{readingTime} min de lectura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="fade-in zoom-in-95 container max-w-5xl animate-in px-6 pb-12 delay-500 duration-1000 lg:pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-muted shadow-2xl shadow-black/10 dark:shadow-black/30">
          {image ? (
            <Media
              blockType="media"
              className="aspect-[16/9] w-full"
              fill
              imgClassName="object-cover"
              media={image}
            />
          ) : (
            <Image
              alt={title}
              className="aspect-[16/9] w-full object-cover"
              src={placeholder}
              unoptimized
            />
          )}
          {/* Subtle overlay gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>
      </div>
    </header>
  );
};
