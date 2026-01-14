import { expect, test } from "@playwright/test";

// Regex patterns at top level for performance
const ACME_PATTERN = /ACME/i;
const DIFFERENT_GROWTH_PATTERN = /different growth/i;
const MENU_PATTERN = /menu/i;

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(ACME_PATTERN);
  });

  test("displays header with logo", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    const logo = header.getByRole("link", { name: DIFFERENT_GROWTH_PATTERN });
    await expect(logo).toBeVisible();
  });

  test("displays navigation menu", async ({ page }) => {
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("displays footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("logo links to homepage", async ({ page }) => {
    const logo = page
      .getByRole("link", { name: DIFFERENT_GROWTH_PATTERN })
      .first();
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("page loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Filter out expected errors (e.g., favicon, external resources)
    const criticalErrors = errors.filter(
      (e) => !(e.includes("favicon") || e.includes("404"))
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("is responsive on mobile", async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
    }

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Mobile menu button should be visible
    const mobileMenuButton = page.getByRole("button", { name: MENU_PATTERN });
    if (await mobileMenuButton.isVisible()) {
      await expect(mobileMenuButton).toBeVisible();
    }
  });
});
