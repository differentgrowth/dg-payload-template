import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { isTransientError, withRetry } from "@/lib/retry";
import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPostBySlug = ({
  slug,
  draft = false,
}: {
  slug: string;
  draft?: boolean;
}) => {
  const getCachedPost = unstable_cache(
    () => {
      return withRetry(
        async () => {
          const payload = await getPayload({ config: configPromise });

          const result = await payload.find({
            collection: "posts",
            limit: 1,
            depth: 2, // Hydrate relatedPosts and nested media
            draft,
            pagination: false,
            where: {
              and: [
                {
                  slug: {
                    equals: slug,
                  },
                },
                draft
                  ? {
                      _status: {
                        in: ["draft", "published"],
                      },
                    }
                  : {
                      _status: {
                        equals: "published",
                      },
                    },
              ],
            },
          });

          return result.docs?.[0] || null;
        },
        {
          maxAttempts: 3,
          isRetryable: isTransientError,
          onRetry: (attempt, error) => {
            console.warn(`[getPostBySlug] Retry attempt ${attempt}:`, error);
          },
        }
      );
    },
    ["post", slug, `draft-${draft}`],
    { tags: [CACHE_TAGS.POSTS] }
  );

  return getCachedPost();
};
