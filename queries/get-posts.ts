import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS, POSTS_PER_PAGE } from "@/queries/cache-tags";

export const getPosts = ({
  page = 1,
  quantity = POSTS_PER_PAGE,
}: {
  page?: number;
  quantity?: number;
} = {}) => {
  const getCachedPosts = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });
      const posts = await payload.find({
        collection: "posts",
        depth: 1,
        limit: quantity,
        page,
        overrideAccess: false,
        where: {
          _status: {
            equals: "published",
          },
        },
        select: {
          title: true,
          publishedAt: true,
          slug: true,
          description: true,
          categories: true,
          image: true,
          authors: true,
        },
        sort: "-publishedAt",
      });

      return posts;
    },
    ["posts", `page-${page}`, `quantity-${quantity}`],
    { tags: [CACHE_TAGS.POSTS] }
  );

  return getCachedPosts();
};

export const getFeaturedPosts = ({
  quantity = 3,
}: {
  quantity?: number;
} = {}) => {
  const getCachedFeaturedPosts = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });
      const posts = await payload.find({
        collection: "posts",
        depth: 1,
        limit: quantity,
        pagination: false,
        where: {
          and: [
            {
              _status: {
                equals: "published",
              },
            },
            {
              featured: {
                equals: true,
              },
            },
          ],
        },
        select: {
          title: true,
          publishedAt: true,
          slug: true,
          description: true,
          categories: true,
          image: true,
          authors: true,
        },
        sort: "-publishedAt",
      });

      return posts;
    },
    ["featured-posts", `quantity-${quantity}`],
    { tags: [CACHE_TAGS.FEATURED_POSTS] }
  );

  return getCachedFeaturedPosts();
};
