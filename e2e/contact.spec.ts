import { expect, test } from "@playwright/test";

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contacto");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/contacto/i);
  });

  test("displays contact form", async ({ page }) => {
    const form = page.locator("form");
    await expect(form).toBeVisible();
  });

  test("form has required fields", async ({ page }) => {
    // Name field
    const nameInput = page.getByLabel(/nombre/i);
    await expect(nameInput).toBeVisible();

    // Email field
    const emailInput = page.getByLabel(/email/i);
    await expect(emailInput).toBeVisible();

    // Phone field
    const phoneInput = page.getByLabel(/teléfono/i);
    await expect(phoneInput).toBeVisible();

    // Message field
    const messageInput = page.getByLabel(/mensaje/i);
    await expect(messageInput).toBeVisible();

    // Privacy checkbox
    const privacyCheckbox = page.getByRole("checkbox");
    await expect(privacyCheckbox).toBeVisible();

    // Submit button
    const submitButton = page.getByRole("button", { name: /enviar/i });
    await expect(submitButton).toBeVisible();
  });

  test("form shows validation errors on empty submit", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: /enviar/i });
    await submitButton.click();

    // Wait for validation messages
    await page.waitForTimeout(500);

    // Check for any validation error messages
    const errorMessages = page.locator(
      "[role='alert'], .text-destructive, [aria-invalid='true']"
    );
    const errorCount = await errorMessages.count();

    expect(errorCount).toBeGreaterThan(0);
  });

  test("form fields accept input", async ({ page }) => {
    const nameInput = page.getByLabel(/nombre/i);
    await nameInput.fill("Test User");
    await expect(nameInput).toHaveValue("Test User");

    const emailInput = page.getByLabel(/email/i);
    await emailInput.fill("test@example.com");
    await expect(emailInput).toHaveValue("test@example.com");

    const phoneInput = page.getByLabel(/teléfono/i);
    await phoneInput.fill("612345678");
    await expect(phoneInput).toHaveValue("612345678");

    const messageInput = page.getByLabel(/mensaje/i);
    await messageInput.fill("This is a test message");
    await expect(messageInput).toHaveValue("This is a test message");
  });

  test("privacy checkbox can be toggled", async ({ page }) => {
    const privacyCheckbox = page.getByRole("checkbox");

    // Initially unchecked
    await expect(privacyCheckbox).not.toBeChecked();

    // Click to check
    await privacyCheckbox.click();
    await expect(privacyCheckbox).toBeChecked();

    // Click to uncheck
    await privacyCheckbox.click();
    await expect(privacyCheckbox).not.toBeChecked();
  });
});
