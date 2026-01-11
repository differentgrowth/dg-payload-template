import type { Metadata } from "next";
import type { Media } from "@/payload-types";

import { draftMode } from "next/headers";

import { BlogPagination } from "@/components/blog/pagination";
import { PostsList } from "@/components/blog/posts-list";
import { LivePreviewListener } from "@/components/payload/live-preview-listener";
import { SchemaMarkup } from "@/components/shared/schema-markup";
import { getServerSideURL } from "@/lib/get-url";
import { getBlogPage } from "@/queries/get-blog-page";
import { getPosts } from "@/queries/get-posts";

function getImageUrl(image: Media | string | null | undefined): string | null {
  if (!image || typeof image === "string") {
    return null;
  }
  return image.sizes?.og?.url || image.url || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getBlogPage();
  const serverUrl = getServerSideURL();

  const imageUrl = getImageUrl(page.meta?.image as Media | string | null);
  const title = page.meta?.title || "Blog";
  const description =
    page.meta?.description ||
    "Descubre las últimas novedades y artículos sobre estrategias digitales, diseño web y SEO.";
  const canonicalUrl = `${serverUrl}/blog`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      siteName: "ACME",
      locale: "es_ES",
      type: "website",
      title,
      description,
      ...(imageUrl
        ? {
            images: [
              {
                url: `${serverUrl}${imageUrl}`,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [`${serverUrl}${imageUrl}`] } : {}),
    },
    robots: {
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
    },
  };
}

export default async function Page() {
  const { isEnabled: draft } = await draftMode();
  const [blogPage, { docs: posts, totalPages, hasNextPage, hasPrevPage }] =
    await Promise.all([getBlogPage(), getPosts({ page: 1 })]);

  return (
    <main className="container max-w-7xl px-6 pt-12 pb-24">
      {draft ? <LivePreviewListener /> : null}
      <SchemaMarkup data={blogPage.schemaMarkup} />

      <header className="mb-12">
        <h1 className="font-bold font-serif text-4xl tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Descubre las últimas novedades y artículos.
        </p>
      </header>

      <PostsList posts={posts} />

      <BlogPagination
        className="mt-12"
        currentPage={1}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        totalPages={totalPages}
      />
    </main>
  );
}
