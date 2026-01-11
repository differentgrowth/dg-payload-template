import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getBlogPage = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({
      slug: "blog-page",
      depth: 2,
    });

    return data;
  },
  ["blog-page"],
  { tags: [CACHE_TAGS.BLOG_PAGE] }
);
