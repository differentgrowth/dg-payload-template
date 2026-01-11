import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPostBySlug = ({
  slug,
  draft = false,
}: {
  slug: string;
  draft?: boolean;
}) => {
  const getCachedPost = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });

      const result = await payload.find({
        collection: "posts",
        limit: 1,
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
    ["post", slug, `draft-${draft}`],
    { tags: [CACHE_TAGS.POSTS] }
  );

  return getCachedPost();
};
