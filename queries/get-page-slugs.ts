import type { FolderInterface } from "@/payload-types";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

import configPromise from "@payload-config";

import { slugify } from "@/lib/utils";
import { CACHE_TAGS } from "@/queries/cache-tags";

export const getPageSlugs = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const pages = await payload.find({
      collection: "pages",
      depth: 1,
      limit: -1,
      overrideAccess: false,
      pagination: false,
      where: {
        _status: { equals: "published" },
      },
      select: {
        slug: true,
        label: true,
        updatedAt: true,
        folder: true,
      },
    });

    return pages;
  },
  ["page-slugs"],
  { tags: [CACHE_TAGS.PAGES] }
);

/**
 * Get the full path segments for a page including its folder
 */
export const getPagePath = (page: {
  slug?: string | null;
  folder?: number | FolderInterface | null;
}): string[] => {
  const segments: string[] = [];

  if (page.folder && typeof page.folder === "object" && page.folder.name) {
    segments.push(slugify(page.folder.name));
  }

  if (page.slug) {
    segments.push(page.slug);
  }

  return segments;
};

/**
 * Get the full URL path for a page including its folder
 */
export const getPageUrl = (page: {
  slug?: string | null;
  folder?: number | FolderInterface | null;
}): string => {
  const segments = getPagePath(page);
  return `/${segments.join("/")}`;
};
