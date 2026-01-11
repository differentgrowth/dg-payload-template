import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  collectionPrefixMap,
  generateGlobalPreviewPath,
  generatePreviewPath,
  globalPathMap,
} from "@/lib/generate-preview-path";

describe("collectionPrefixMap", () => {
  it("has empty prefix for pages", () => {
    expect(collectionPrefixMap.pages).toBe("");
  });

  it("has /blog prefix for posts", () => {
    expect(collectionPrefixMap.posts).toBe("/blog");
  });
});

describe("globalPathMap", () => {
  it("has / path for home-page", () => {
    expect(globalPathMap["home-page"]).toBe("/");
  });

  it("has /blog path for blog-page", () => {
    expect(globalPathMap["blog-page"]).toBe("/blog");
  });

  it("has /contacto path for contact-page", () => {
    expect(globalPathMap["contact-page"]).toBe("/contacto");
  });
});

describe("generatePreviewPath", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, PREVIEW_SECRET: "test-secret" };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("generates preview path for pages collection", () => {
    const result = generatePreviewPath({
      collection: "pages",
      slug: "about",
    });

    expect(result).toContain("/api/v1/preview?");
    expect(result).toContain("slug=about");
    expect(result).toContain("collection=pages");
    expect(result).toContain("path=%2Fabout");
    expect(result).toContain("previewSecret=test-secret");
  });

  it("generates preview path for posts collection", () => {
    const result = generatePreviewPath({
      collection: "posts",
      slug: "my-post",
    });

    expect(result).toContain("/api/v1/preview?");
    expect(result).toContain("slug=my-post");
    expect(result).toContain("collection=posts");
    expect(result).toContain("path=%2Fblog%2Fmy-post");
  });

  it("includes folder name in path for pages when provided", () => {
    const result = generatePreviewPath({
      collection: "pages",
      slug: "subpage",
      folderName: "Services",
    });

    expect(result).toContain("path=%2Fservices%2Fsubpage");
  });

  it("slugifies folder name", () => {
    const result = generatePreviewPath({
      collection: "pages",
      slug: "test-page",
      folderName: "My Services",
    });

    expect(result).toContain("path=%2Fmy-services%2Ftest-page");
  });

  it("handles empty PREVIEW_SECRET", () => {
    process.env.PREVIEW_SECRET = undefined;

    const result = generatePreviewPath({
      collection: "pages",
      slug: "test",
    });

    expect(result).toContain("previewSecret=");
  });

  it("does not include folder name for posts collection", () => {
    const result = generatePreviewPath({
      collection: "posts",
      slug: "my-post",
      folderName: "Category",
    });

    // Posts should use the /blog prefix, not the folder name
    expect(result).toContain("path=%2Fblog%2Fmy-post");
    expect(result).not.toContain("category");
  });

  it("URL encodes special characters in slug", () => {
    const result = generatePreviewPath({
      collection: "pages",
      slug: "hello-world",
    });

    expect(result).toContain("slug=hello-world");
  });
});

describe("generateGlobalPreviewPath", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, PREVIEW_SECRET: "test-secret" };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("generates preview path for home-page global", () => {
    const result = generateGlobalPreviewPath({
      global: "home-page",
    });

    expect(result).toContain("/api/v1/preview?");
    expect(result).toContain("global=home-page");
    expect(result).toContain("path=%2F");
    expect(result).toContain("previewSecret=test-secret");
  });

  it("generates preview path for blog-page global", () => {
    const result = generateGlobalPreviewPath({
      global: "blog-page",
    });

    expect(result).toContain("global=blog-page");
    expect(result).toContain("path=%2Fblog");
  });

  it("generates preview path for contact-page global", () => {
    const result = generateGlobalPreviewPath({
      global: "contact-page",
    });

    expect(result).toContain("global=contact-page");
    expect(result).toContain("path=%2Fcontacto");
  });

  it("handles empty PREVIEW_SECRET", () => {
    process.env.PREVIEW_SECRET = undefined;

    const result = generateGlobalPreviewPath({
      global: "home-page",
    });

    expect(result).toContain("previewSecret=");
  });
});
