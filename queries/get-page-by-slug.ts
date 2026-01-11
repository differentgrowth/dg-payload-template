import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { slugify } from "@/lib/utils";
import { CACHE_TAGS } from "@/queries/cache-tags";

interface GetPageBySlugParams {
  slugSegments: string[];
  draft?: boolean;
}

export const getPageBySlug = ({
  slugSegments,
  draft = false,
}: GetPageBySlugParams) => {
  const cacheKey = ["page", ...slugSegments, `draft-${draft}`];

  const getCachedPage = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });

      // If there's more than one segment, the first is the folder slug
      const hasFolder = slugSegments.length > 1;
      const folderSlugFromUrl = hasFolder ? slugSegments[0] : null;
      const pageSlug = hasFolder ? slugSegments.at(-1) : slugSegments[0];

      const result = await payload.find({
        collection: "pages",
        limit: 100,
        pagination: false,
        draft,
        depth: 1,
        where: {
          and: [
            {
              slug: {
                equals: pageSlug,
              },
            },
            // If we have a folder segment, require folder to exist
            // If no folder segment, require no folder
            folderSlugFromUrl
              ? {
                  folder: {
                    exists: true,
                  },
                }
              : {
                  folder: {
                    exists: false,
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

      // If we have a folder slug, filter by matching the slugified folder name
      if (folderSlugFromUrl && result.docs.length > 0) {
        const matchingPage = result.docs.find((page) => {
          if (
            page.folder &&
            typeof page.folder === "object" &&
            page.folder.name
          ) {
            return slugify(page.folder.name) === folderSlugFromUrl;
          }
          return false;
        });
        return matchingPage || null;
      }

      return result.docs?.[0] || null;
    },
    cacheKey,
    { tags: [CACHE_TAGS.PAGES] }
  );

  return getCachedPage();
};
