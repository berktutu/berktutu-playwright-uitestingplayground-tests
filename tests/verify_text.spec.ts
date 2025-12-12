import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Find the element with Welcome text", async ({ page }) => {
  const verifyTextPage = page.getByRole("link", { name: "Verify Text" });
  await verifyTextPage.click();

  const panel = page.locator(".bg-primary");
  const welcomeText = panel.locator(
    '//span[normalize-space(.)="Welcome UserName!"]'
  );

  await expect(welcomeText).toBeVisible();
});
