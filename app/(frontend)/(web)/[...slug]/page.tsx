import type { Metadata } from "next";

import { draftMode } from "next/headers";

import { Hero } from "@/components/blocks/hero";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { LivePreviewListener } from "@/components/payload/live-preview-listener";
import { PayloadRedirects } from "@/components/payload/redirects";
import { SchemaMarkup } from "@/components/shared/schema-markup";
import { generateMeta } from "@/lib/generate-meta";
import { getPageBySlug } from "@/queries/get-page-by-slug";
import { getPagePath, getPageSlugs } from "@/queries/get-page-slugs";

export async function generateStaticParams() {
  const pages = await getPageSlugs();

  return pages.docs.map((doc) => ({
    slug: getPagePath(doc),
  }));
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const { isEnabled: draft } = await draftMode();

  const page = await getPageBySlug({ slugSegments: slug, draft });

  return generateMeta({ doc: page, isDraft: draft });
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;

  const page = await getPageBySlug({ slugSegments: slug, draft });

  if (!page) {
    return <PayloadRedirects url="/" />;
  }

  // Build the full URL path including folder
  const fullPath = `/${slug.join("/")}`;

  return (
    <main>
      <SchemaMarkup data={page.schemaMarkup} />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={fullPath} />

      {draft ? <LivePreviewListener /> : null}

      <Hero {...page.hero} />
      <RenderBlocks blocks={page.blocks} />
    </main>
  );
}
