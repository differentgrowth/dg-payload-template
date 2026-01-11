import type { CollectionSlug } from "payload";

import { slugify } from "@/lib/utils";

export const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: "",
  posts: "/blog",
};

export const globalPathMap: Record<string, string> = {
  "home-page": "/",
  "blog-page": "/blog",
  "contact-page": "/contacto",
};

interface CollectionPreviewProps {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  folderName?: string;
}

interface GlobalPreviewProps {
  global: keyof typeof globalPathMap;
}

export const generatePreviewPath = ({
  collection,
  slug,
  folderName,
}: CollectionPreviewProps): string => {
  const prefix = collectionPrefixMap[collection] || "";

  // Build path with folder prefix if provided (slugify the folder name)
  let path: string;
  if (collection === "pages" && folderName) {
    path = `/${slugify(folderName)}/${slug}`;
  } else {
    path = `${prefix}/${slug}`;
  }

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || "",
  });

  return `/api/v1/preview?${encodedParams.toString()}`;
};

export const generateGlobalPreviewPath = ({
  global,
}: GlobalPreviewProps): string => {
  const path = globalPathMap[global] || "/";

  const encodedParams = new URLSearchParams({
    global,
    path,
    previewSecret: process.env.PREVIEW_SECRET || "",
  });

  return `/api/v1/preview?${encodedParams.toString()}`;
};
