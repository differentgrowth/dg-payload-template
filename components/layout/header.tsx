import { Navbar } from "@/components/layout/navbar";
import { getBlogPage } from "@/queries/get-blog-page";
import { getNavigation } from "@/queries/get-navigation";
import { getPageUrl } from "@/queries/get-page-slugs";

export const Header = async () => {
  const [{ docs: pages }, blogPage] = await Promise.all([
    getNavigation({ header: true, footer: false }),
    getBlogPage(),
  ]);

  const items = [
    ...pages.map((item) => ({ label: item.label, href: getPageUrl(item) })),
    ...(blogPage?.showOnHeader && blogPage.label
      ? [{ label: blogPage.label, href: "/blog" }]
      : []),
  ];

  return <Navbar menu={items} />;
};
