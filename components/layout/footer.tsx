import Link from "next/link";

import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CopyrightParagraph } from "@/components/shared/copyright-paragraph";
import { SocialMediaIcon } from "@/components/ui/social-media-icon";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { getBlogPage } from "@/queries/get-blog-page";
import { getNavigation } from "@/queries/get-navigation";
import { getPageUrl } from "@/queries/get-page-slugs";
import { getSocialMedia } from "@/queries/get-social-media";

export async function Footer() {
  const [{ docs: pages }, blogPage, { items: socialMediaItems }] =
    await Promise.all([
      getNavigation({ header: false, footer: true }),
      getBlogPage(),
      getSocialMedia(),
    ]);

  const navigation = [
    ...pages.map((item) => ({ label: item.label, href: getPageUrl(item) })),
    ...(blogPage?.showOnHeader && blogPage.label
      ? [{ label: blogPage.label, href: "/blog" }]
      : []),
  ];

  const socialMedia = socialMediaItems.map((item) => ({
    id: item.id,
    platform: item.platform,
    url: item.url,
  }));

  return (
    <footer className="mt-12 bg-muted">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {navigation.map((item) => (
            <Link
              className={buttonVariants({ variant: "link" })}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {socialMedia.map((item) => (
            <a
              aria-label={item.platform}
              className={buttonVariants({ size: "icon", variant: "outline" })}
              href={item.url}
              key={item.url}
              rel="noreferrer noopener nofollow"
            >
              <span className="sr-only">{item.platform}</span>
              <SocialMediaIcon platform={item.platform} />
            </a>
          ))}
        </div>
        <CopyrightParagraph />
      </div>
      <div className="flex w-full justify-center">
        <Link
          className={cn(buttonVariants({ variant: "link" }), "group")}
          href="https://www.differentgrowth.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made by Different Growth with
          <span className="relative flex">
            <HugeiconsIcon
              className={cn(
                "absolute size-4 opacity-75",
                "text-primary transition-colors group-hover:animate-ping group-hover:text-red-400"
              )}
              icon={FavouriteIcon}
            />
            <HugeiconsIcon
              className={cn(
                "relative size-4",
                "text-primary transition-colors group-hover:text-red-500"
              )}
              icon={FavouriteIcon}
            />
          </span>
        </Link>
      </div>
    </footer>
  );
}
