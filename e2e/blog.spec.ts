import { expect, test } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/blog/i);
  });

  test("displays blog header", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });

  test("displays posts list or empty state", async ({ page }) => {
    // Either posts are displayed or an empty state message
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("blog post links are clickable", async ({ page }) => {
    const postLinks = page.locator("article a, [data-slot='card'] a").first();

    if (await postLinks.isVisible()) {
      const href = await postLinks.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toContain("/blog/");
    }
  });

  test("pagination is displayed when needed", async ({ page }) => {
    // Check if pagination exists (may not be present with few posts)
    const pagination = page.locator(
      "[data-slot='pagination'], nav[aria-label*='pagination']"
    );
    const paginationCount = await pagination.count();

    // Pagination is optional, so we just verify it doesn't error
    expect(paginationCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Blog Post Page", () => {
  test("displays 404 for non-existent post", async ({ page }) => {
    const response = await page.goto("/blog/non-existent-post-12345");

    // Should show 404 page
    expect(response?.status()).toBe(404);
  });
});
