import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Verify first and second click", async ({ page }) => {
  const hiddenLayersPage = page.getByRole("link", { name: "Hidden Layers" });
  await hiddenLayersPage.click();

  const greenBtn = page.getByRole("button", { name: "Button" });
  await greenBtn.click();

  // Second click should not be successful because of the blocked button
  await expect(greenBtn.click()).rejects.toThrow();

  // Additional check if the blue button is clickable
  const blueBtn = page.locator(".btn-primary", { hasText: "Button" });
  await blueBtn.click();
});
