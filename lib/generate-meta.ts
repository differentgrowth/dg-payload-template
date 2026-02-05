import type { Metadata } from "next";
import type { Config, Media, Page, Post } from "@/payload-types";

import { getServerSideURL } from "@/lib/get-url";

export const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  nocache: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const getImageUrl = (
  image?: Media | Config["db"]["defaultIDType"] | null
): string | undefined => {
  if (image && typeof image === "object" && "url" in image) {
    const serverUrl = getServerSideURL();
    const ogUrl = image.sizes?.og?.url || image.url;

    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
  }

  return undefined;
};

const defaultOpenGraph: Metadata["openGraph"] = {
  type: "website",
  description:
    "En ACME, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
  images: [
    {
      url: `${getServerSideURL()}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "ACME",
    },
  ],
  siteName: "ACME",
  title: "ACME",
};

export const mergeOpenGraph = (
  og?: Metadata["openGraph"]
): Metadata["openGraph"] => ({
  ...defaultOpenGraph,
  ...og,
  images: og?.images ?? defaultOpenGraph.images,
});

function buildCanonicalUrl(
  prefix: string,
  slug: string[] | string | undefined
): string {
  const serverUrl = getServerSideURL();
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
  if (!slugPath) {
    const path = prefix || "/";
    return `${serverUrl}${path}`;
  }
  const normalizedPrefix = prefix === "/" ? "" : prefix;
  return `${serverUrl}${normalizedPrefix}/${slugPath}`;
}

// biome-ignore lint/suspicious/useAwait: no problem
export const generateMeta = async (args: {
  doc: Partial<Post | Page> | null;
  prefix?: string;
  isDraft?: boolean;
}): Promise<Metadata> => {
  const { doc, prefix = "/", isDraft = false } = args;

  const ogImage = getImageUrl(doc?.meta?.image);

  const title = doc?.meta?.title ? `${doc?.meta?.title}` : "ACME";

  const canonicalUrl = buildCanonicalUrl(prefix, doc?.slug);
  const description = doc?.meta?.description || "";

  if (isDraft) {
    return {
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: mergeOpenGraph({
        description,
        images: ogImage ? [{ url: ogImage }] : undefined,
        title,
        url: canonicalUrl,
      }),
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
      title: { absolute: title },
      robots: noIndexRobots,
    };
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: canonicalUrl,
    }),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
};
