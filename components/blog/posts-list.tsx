import type { Post } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import { ArrowRight01Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/shared/rich-text";
import { cn, formatLongDate } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

interface Props {
  posts: (PostData | number)[];
  className?: string;
  variant?: "default" | "compact";
}

type PostData = Pick<
  Post,
  | "slug"
  | "categories"
  | "title"
  | "description"
  | "id"
  | "image"
  | "publishedAt"
  | "authors"
>;

export const PostsList = ({ posts, className, variant = "default" }: Props) => {
  if (!posts.length) {
    return null;
  }

  return (
    <div className={cn("py-8", className)}>
      <div
        className={cn(
          "grid gap-8",
          variant === "default"
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        )}
      >
        {posts.map((item) => {
          if (typeof item === "number") {
            return null;
          }
          const {
            id,
            image,
            title,
            description,
            categories,
            slug,
            publishedAt,
            authors,
          } = item;

          const categoriesList = categories?.filter(
            (cat): cat is Exclude<typeof cat, number> => typeof cat === "object"
          );

          return (
            <article
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-black/5 hover:shadow-lg dark:hover:shadow-black/20"
              key={id}
            >
              {/* Image */}
              <Link
                aria-hidden="true"
                className="relative aspect-[16/10] overflow-hidden bg-muted"
                href={`/blog/${slug}`}
                tabIndex={-1}
              >
                {image ? (
                  <Media
                    blockType="media"
                    className="h-full w-full"
                    fill
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    media={image}
                  />
                ) : (
                  <Image
                    alt={title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    src={placeholder}
                  />
                )}
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Categories */}
                {categoriesList && categoriesList.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {categoriesList.map((category) => (
                      <span
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary text-xs uppercase tracking-wider"
                        key={category.id}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 line-clamp-2 font-semibold font-serif text-lg leading-tight transition-colors group-hover:text-primary">
                  <Link href={`/blog/${slug}`}>
                    {title}
                    <span className="absolute inset-0" />
                  </Link>
                </h3>

                {/* Description */}
                <RichText
                  className="mb-4 line-clamp-2 text-muted-foreground text-sm leading-relaxed"
                  data={description}
                />

                {/* Meta */}
                <div className="mt-auto flex flex-wrap items-center gap-4 text-muted-foreground text-xs">
                  {publishedAt && (
                    <div className="flex items-center gap-1.5">
                      <HugeiconsIcon
                        className="size-3.5"
                        icon={Calendar03Icon}
                      />
                      <time dateTime={publishedAt}>
                        {formatLongDate(publishedAt)}
                      </time>
                    </div>
                  )}

                  {authors && authors.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span>
                        {authors
                          .filter(
                            (a): a is Exclude<typeof a, number> =>
                              typeof a === "object"
                          )
                          .map((a) => a.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Read more arrow - appears on hover */}
              <div className="absolute right-4 bottom-4 flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                <HugeiconsIcon className="size-4" icon={ArrowRight01Icon} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
