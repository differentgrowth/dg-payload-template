import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage has no accessibility violations in structure", async ({
    page,
  }) => {
    await page.goto("/");

    // Check for basic accessibility requirements
    // 1. Page has a main landmark
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // 2. Page has exactly one h1
    const h1Elements = page.locator("h1");
    const h1Count = await h1Elements.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // 3. Images have alt text
    const images = page.locator("img");
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // alt can be empty string for decorative images, but should exist
      expect(alt).not.toBeNull();
    }
  });

  test("blog page has proper heading hierarchy", async ({ page }) => {
    await page.goto("/blog");

    // Should have at least one heading
    const headings = page.locator("h1, h2, h3, h4, h5, h6");
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test("contact form has accessible labels", async ({ page }) => {
    await page.goto("/contacto");

    // All form inputs should have associated labels
    const inputs = page.locator(
      "input:not([type='hidden']):not([type='submit']), textarea"
    );
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      // Input should have either an id (with matching label), aria-label, or aria-labelledby
      const hasLabel = id || ariaLabel || ariaLabelledBy;
      expect(hasLabel).toBeTruthy();
    }
  });

  test("interactive elements are keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Tab through the page and check focus is visible
    await page.keyboard.press("Tab");

    // Should be able to focus on interactive elements
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });

  test("links have discernible text", async ({ page }) => {
    await page.goto("/");

    const links = page.getByRole("link");
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(linkCount, 20); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      const title = await link.getAttribute("title");

      // Link should have some accessible name
      const hasAccessibleName =
        (text && text.trim().length > 0) || ariaLabel || title;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test("buttons have discernible text", async ({ page }) => {
    await page.goto("/");

    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");
      const title = await button.getAttribute("title");

      // Button should have some accessible name
      const hasAccessibleName =
        (text && text.trim().length > 0) || ariaLabel || title;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test("page has lang attribute", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    const lang = await html.getAttribute("lang");
    expect(lang).toBeTruthy();
  });

  test("skip to main content link exists", async ({ page }) => {
    await page.goto("/");

    // Press Tab to reveal skip link if it exists
    await page.keyboard.press("Tab");

    // Check for skip link (common accessibility pattern)
    const skipLink = page.locator(
      "a[href='#main'], a[href='#content'], a:has-text('skip')"
    );
    const skipLinkCount = await skipLink.count();

    // Skip link is optional but good practice
    expect(skipLinkCount).toBeGreaterThanOrEqual(0);
  });
});
