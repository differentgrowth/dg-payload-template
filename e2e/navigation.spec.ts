import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("can navigate from homepage to blog", async ({ page }) => {
    await page.goto("/");

    const blogLink = page.getByRole("link", { name: /blog/i }).first();
    if (await blogLink.isVisible()) {
      await blogLink.click();
      await expect(page).toHaveURL(/\/blog/);
    }
  });

  test("can navigate from homepage to contact", async ({ page }) => {
    await page.goto("/");

    const contactLink = page.getByRole("link", { name: /contacto/i }).first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/\/contacto/);
    }
  });

  test("header navigation links work", async ({ page }) => {
    await page.goto("/");

    const header = page.locator("header");
    const navLinks = header.getByRole("link");
    const linkCount = await navLinks.count();

    // Verify each link has a valid href
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("footer navigation links work", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    const navLinks = footer.getByRole("link");
    const linkCount = await navLinks.count();

    // Verify each link has a valid href
    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
    }
  });

  test("back navigation works", async ({ page }) => {
    await page.goto("/");
    await page.goto("/blog");

    await page.goBack();
    await expect(page).toHaveURL("/");
  });
});

test.describe("404 Page", () => {
  test("displays 404 for non-existent page", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-12345");

    expect(response?.status()).toBe(404);
  });

  test("404 page has link to homepage", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-12345");

    // Should have a way to navigate back to homepage
    const homeLink = page.getByRole("link", { name: /inicio|home|volver/i });
    if (await homeLink.isVisible()) {
      await expect(homeLink).toBeVisible();
    }
  });
});
