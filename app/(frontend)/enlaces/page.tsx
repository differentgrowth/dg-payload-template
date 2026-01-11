import type { Metadata } from "next";

import { redirect } from "next/navigation";

import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { SocialMediaIcon } from "@/components/ui/social-media-icon";
import { buttonVariants } from "@/lib/button-variants";
import { getServerSideURL } from "@/lib/get-url";
import { cn } from "@/lib/utils";
import { getLinks } from "@/queries/get-links";
import { getSocialMedia } from "@/queries/get-social-media";

export function generateMetadata(): Metadata {
  const serverUrl = getServerSideURL();
  const title = "Enlaces | ACME";
  const description =
    "Encuentra todos nuestros enlaces y redes sociales en un solo lugar. Conecta con ACME.";
  const canonicalUrl = `${serverUrl}/enlaces`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const [{ items: links }, { items: socialMedia }] = await Promise.all([
    getLinks(),
    getSocialMedia(),
  ]);

  if (!links) {
    redirect("/");
  }

  return (
    <main className="flex flex-col space-y-12 py-12">
      <div className="container max-w-2xl border-b">
        <h1>ACME</h1>
      </div>
      <section
        className={cn(
          "container max-w-md grow",
          "flex flex-col items-center space-y-6"
        )}
      >
        {links.map(({ id, label, url }) => (
          <a
            className={cn(
              "group",
              buttonVariants({ variant: "ghost", size: "lg" }),
              "w-full justify-between border"
            )}
            href={url}
            key={id}
            rel="noreferrer noopener"
            target="_blank"
          >
            {label}
            <HugeiconsIcon
              aria-hidden
              className="size-4 origin-bottom-left scale-0 transition-transform group-hover:scale-100"
              icon={LinkSquare02Icon}
            />
          </a>
        ))}
      </section>

      <section
        className={cn(
          "container max-w-md",
          "flex flex-wrap items-center justify-center gap-3"
        )}
      >
        {socialMedia.map(({ id, label, url, platform }) => (
          <a
            aria-label={label}
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "border",
            })}
            href={url}
            key={id}
            rel="noreferrer noopener nofollow"
            target="_blank"
          >
            <SocialMediaIcon aria-label={platform} platform={platform} />
          </a>
        ))}
      </section>
    </main>
  );
}
