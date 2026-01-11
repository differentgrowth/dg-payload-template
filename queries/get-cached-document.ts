import type { Config } from "@/payload-types";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

type Collection = keyof Config["collections"];

export function getDocument(collection: Collection, slug: string, depth = 0) {
  const getCachedDocument = unstable_cache(
    async () => {
      const payload = await getPayload({ config: configPromise });

      const { docs } = await payload.find({
        collection,
        depth,
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      return docs.at(0);
    },
    [collection, slug, `depth-${depth}`],
    { tags: [`${collection}_${slug}`] }
  );

  return getCachedDocument();
}
