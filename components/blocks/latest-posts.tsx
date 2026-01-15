import type {
  LatestPostsBlock as LatestPostsBlockProps,
  Post,
} from "@/payload-types";

import { PostsList } from "@/components/blog/posts-list";
import { cn } from "@/lib/utils";
import { getPosts } from "@/queries/get-posts";

type Props = LatestPostsBlockProps & {
  className?: string;
};

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

export async function LatestPosts({ title, subtitle, className }: Props) {
  let posts: PostData[] = [];
  try {
    const result = await getPosts({ page: 1, quantity: 3 });
    posts = result.docs;
  } catch (error) {
    console.error("[LatestPosts] Failed to fetch posts:", error);
    return null;
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className={cn("container py-12 lg:py-20", className)}>
      {title || subtitle ? (
        <div className="max-w-none">
          {title ? (
            <h2 className="mx-auto mb-6 w-fit text-balance border-b border-b-primary px-6 pb-1 text-center text-primary">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mx-auto mb-10 max-w-2xl text-balance text-center text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
      <PostsList className="px-0" posts={posts} />
    </section>
  );
}
