import { unstable_cache } from "next/cache";
import { getPayload, type Where } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getNavigation = ({
  header,
  footer,
}: {
  header: boolean;
  footer: boolean;
}) => {
  const cacheKey = ["navigation", `header-${header}`, `footer-${footer}`];

  const getCachedNavigation = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });

      const shownIn: ("header" | "footer")[] = [];
      if (header) {
        shownIn.push("header");
      }
      if (footer) {
        shownIn.push("footer");
      }

      const whereClause: Where = {
        shownIn: {
          in: shownIn,
        },
      };

      const result = await payload.find({
        collection: "pages",
        limit: -1,
        pagination: false,
        depth: 1,
        where: whereClause,
        select: {
          label: true,
          slug: true,
          folder: true,
        },
        sort: "-createdAt",
      });

      return result;
    },
    cacheKey,
    { tags: [CACHE_TAGS.PAGES] }
  );

  return getCachedNavigation();
};
