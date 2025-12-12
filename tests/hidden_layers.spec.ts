import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
  const hiddenLayersPage = page.getByRole("link", { name: "Hidden Layers" });
  await hiddenLayersPage.click();
});

test("Verify first and second click", async ({ page }) => {
  const greenBtn = page.getByRole("button", { name: "Button" });
  await greenBtn.click();

  await expect(greenBtn.click()).rejects.toThrow();

  // Additional check if the blue button is clickable
  const blueBtn = page.locator(".btn-primary", { hasText: "Button" });
  await blueBtn.click();
});
