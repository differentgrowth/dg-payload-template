import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { CACHE_TAGS } from "@/queries/cache-tags";

export const getContactPage = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.findGlobal({
      slug: "contact-page",
      depth: 2,
    });

    return data;
  },
  ["contact-page"],
  { tags: [CACHE_TAGS.CONTACT_PAGE] }
);
