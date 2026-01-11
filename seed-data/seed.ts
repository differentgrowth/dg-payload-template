import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import type { CollectionSlug, Payload, SanitizedConfig } from "payload";
import type { HomePage, Page, Post } from "@/payload-types";

import payload from "payload";

import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";

import { categories } from "@/seed-data/categories";
import { homepageData } from "@/seed-data/homepage";
import { links } from "@/seed-data/links";
import {
  aboutPageData,
  careersPageData,
  contactPageData,
  faqPageData,
  pricingPageData,
  privacyPageData,
  servicesPageData,
  termsPageData,
} from "@/seed-data/pages";
import { postData, postSlugs } from "@/seed-data/posts";
import { socialMedia } from "@/seed-data/social-media";

const seedingContext = { isSeeding: true };

async function cleanDatabase(currentPayload: Payload) {
  const collections = ["categories", "media", "posts", "pages", "users"];

  for (const collection of collections) {
    try {
      await currentPayload.delete({
        collection: collection as CollectionSlug,
        where: {},
        req: { context: seedingContext },
      });
      currentPayload.logger.info(`Cleared ${collection} collection`);
    } catch (error) {
      currentPayload.logger.error(
        `Error clearing ${collection}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // Note: Globals are not cleared because they have required fields
  // and will be overwritten with valid data during seeding anyway
}

export const script = async (config: SanitizedConfig) => {
  try {
    await payload.init({ config });
    payload.logger.info("Initializing database seeding...");

    const defaultEditorConfig = await editorConfigFactory.default({
      config: payload.config,
    });

    const setRichText = (
      text: string
    ): SerializedEditorState<SerializedLexicalNode> =>
      convertMarkdownToLexical({
        editorConfig: defaultEditorConfig,
        markdown: text,
      });

    payload.logger.info("Cleaning database...");
    await cleanDatabase(payload);
    payload.logger.info("Database cleaned successfully!");

    // Create admin user
    const adminUser = await payload.create({
      collection: "users",
      data: {
        name: "Admin",
        email: "admin@acme.com",
        password: "Testing123!",
        role: "admin",
      },
      req: { context: seedingContext },
    });
    payload.logger.info("Created admin user");

    // Update globals
    await payload.updateGlobal({
      slug: "home-page",
      data: homepageData(setRichText) as HomePage,
      req: { context: seedingContext },
    });
    payload.logger.info("Updated home-page global");

    await payload.updateGlobal({
      slug: "blog-page",
      data: {
        label: "Blog",
        showOnHeader: true,
        showOnFooter: true,
      },
      req: { context: seedingContext },
    });
    payload.logger.info("Updated blog-page global");

    await payload.updateGlobal({
      slug: "social-media",
      data: { items: socialMedia },
      req: { context: seedingContext },
    });
    payload.logger.info("Updated social-media global");

    await payload.updateGlobal({
      slug: "links",
      data: { items: links },
      req: { context: seedingContext },
    });
    payload.logger.info("Updated links global");

    // Create categories
    const createdCategories = await Promise.all(
      categories.map((category) =>
        payload.create({
          collection: "categories",
          data: { title: category },
          req: { context: seedingContext },
        })
      )
    );
    payload.logger.info(`Created ${createdCategories.length} categories`);

    // Create pages
    const pageConfigs = [
      {
        generator: aboutPageData,
        config: {
          slug: "about",
          status: "published" as const,
          showOnHeader: true,
          showOnFooter: true,
        },
      },
      {
        generator: servicesPageData,
        config: {
          slug: "services",
          status: "published" as const,
          showOnHeader: true,
          showOnFooter: true,
        },
      },
      {
        generator: pricingPageData,
        config: {
          slug: "pricing",
          status: "published" as const,
          showOnHeader: true,
          showOnFooter: false,
        },
      },
      {
        generator: contactPageData,
        config: {
          slug: "contact",
          status: "published" as const,
          showOnHeader: true,
          showOnFooter: true,
        },
      },
      {
        generator: faqPageData,
        config: {
          slug: "faq",
          status: "published" as const,
          showOnHeader: false,
          showOnFooter: true,
        },
      },
      {
        generator: careersPageData,
        config: {
          slug: "careers",
          status: "published" as const,
          showOnHeader: false,
          showOnFooter: true,
        },
      },
      {
        generator: privacyPageData,
        config: {
          slug: "privacy",
          status: "published" as const,
          showOnHeader: false,
          showOnFooter: true,
        },
      },
      {
        generator: termsPageData,
        config: {
          slug: "terms",
          status: "published" as const,
          showOnHeader: false,
          showOnFooter: true,
        },
      },
    ];

    for (const { generator, config: pageConfig } of pageConfigs) {
      await payload.create({
        collection: "pages",
        data: generator(setRichText, pageConfig) as unknown as Page,
        req: { context: seedingContext },
      });
      payload.logger.info(`Created page: ${pageConfig.slug}`);
    }

    // Create posts with varied categories
    const postConfigs = postSlugs.map((slug, index) => ({
      slug,
      featured: index === 0,
      category: createdCategories[index % createdCategories.length],
    }));

    for (const { slug, featured, category } of postConfigs) {
      await payload.create({
        collection: "posts",
        data: postData(setRichText, {
          slug,
          author: adminUser,
          featured,
          category,
          status: "published",
        }) as unknown as Post,
        req: { context: seedingContext },
      });
      payload.logger.info(`Created post: ${slug}`);
    }

    payload.logger.info("Seed data created successfully!");
    process.exit(0);
  } catch (error) {
    payload.logger.error(error);
    payload.logger.error(
      `Seed failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    process.exit(1);
  }
};
