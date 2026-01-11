import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test("homepage has meta description", async ({ page }) => {
    await page.goto("/");

    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content?.length).toBeGreaterThan(0);
  });

  test("homepage has Open Graph tags", async ({ page }) => {
    await page.goto("/");

    // Check for essential OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogType = page.locator('meta[property="og:type"]');

    await expect(ogTitle).toHaveCount(1);
    await expect(ogDescription).toHaveCount(1);
    await expect(ogType).toHaveCount(1);
  });

  test("blog page has meta description", async ({ page }) => {
    await page.goto("/blog");

    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute("content");
    expect(content).toBeTruthy();
  });

  test("contact page has meta description", async ({ page }) => {
    await page.goto("/contacto");

    const metaDescription = page.locator('meta[name="description"]');
    const content = await metaDescription.getAttribute("content");
    expect(content).toBeTruthy();
  });

  test("pages have canonical URL", async ({ page }) => {
    await page.goto("/");

    const canonical = page.locator('link[rel="canonical"]');
    const href = await canonical.getAttribute("href");
    expect(href).toBeTruthy();
  });

  test("robots meta tag is configured", async ({ page }) => {
    await page.goto("/");

    const robots = page.locator('meta[name="robots"]');
    const robotsCount = await robots.count();

    // Robots tag is optional, but if present should have content
    if (robotsCount > 0) {
      const content = await robots.getAttribute("content");
      expect(content).toBeTruthy();
    }
  });

  test("viewport meta tag is set", async ({ page }) => {
    await page.goto("/");

    const viewport = page.locator('meta[name="viewport"]');
    const content = await viewport.getAttribute("content");
    expect(content).toContain("width=device-width");
  });

  test("charset is defined", async ({ page }) => {
    await page.goto("/");

    const charset = page.locator(
      'meta[charset], meta[http-equiv="Content-Type"]'
    );
    const charsetCount = await charset.count();
    expect(charsetCount).toBeGreaterThan(0);
  });
});

test.describe("Sitemap and Robots", () => {
  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);

    const contentType = response?.headers()["content-type"];
    expect(contentType).toContain("xml");
  });

  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });
});
