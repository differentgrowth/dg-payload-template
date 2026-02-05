import type { Metadata } from "next";
import type { Media } from "@/payload-types";

import { draftMode } from "next/headers";

import { Hero } from "@/components/blocks/hero";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { LivePreviewListener } from "@/components/payload/live-preview-listener";
import { SchemaMarkup } from "@/components/shared/schema-markup";
import { indexRobots, noIndexRobots } from "@/lib/generate-meta";
import { getServerSideURL } from "@/lib/get-url";
import { getContactPage } from "@/queries/get-contact-page";

function getImageUrl(image: Media | string | null | undefined): string | null {
  if (!image || typeof image === "string") {
    return null;
  }
  return image.sizes?.og?.url || image.url || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode();
  const page = await getContactPage();
  const serverUrl = getServerSideURL();

  const imageUrl = getImageUrl(page.meta?.image as Media | string | null);
  const title =
    page.meta?.title || "ACME | Potenciando tu marca con estrategias digitales";
  const description =
    page.meta?.description ||
    "En ACME, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.";
  const canonicalUrl = `${serverUrl}/contacto`;

  return {
    title: { absolute: title },
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
    robots: draft ? noIndexRobots : indexRobots,
  };
}

export default async function Page() {
  const { isEnabled: draft } = await draftMode();
  const { hero, blocks, schemaMarkup } = await getContactPage();

  return (
    <main>
      {draft ? <LivePreviewListener /> : null}
      <SchemaMarkup data={schemaMarkup} />
      <Hero {...hero} />
      <RenderBlocks blocks={blocks} />
    </main>
  );
}
