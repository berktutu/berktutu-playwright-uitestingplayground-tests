import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Verify visibility", async ({ page }) => {
  const visibilityPage = page.getByRole("link", { name: "Visibility" });
  await visibilityPage.click();

  // Learn locators of all buttons
  const hideBtn = page.getByRole("button", { name: "Hide" });

  const removedBtn = page.locator("#removedButton");
  const zeroWidthBtn = page.locator("#zeroWidthButton");
  const overlappedBtn = page.locator("#overlappedButton");
  const opacity0Btn = page.locator("#transparentButton");
  const visibilityHiddenBtn = page.locator("#invisibleButton");
  const displayNoneBtn = page.locator("#notdisplayedButton");
  const offscreenBtn = page.locator("#offscreenButton");

  await hideBtn.click();

  await expect(removedBtn).not.toBeVisible();
  await expect(zeroWidthBtn).not.toBeVisible();

  await expect(overlappedBtn).toBeEnabled();
  await expect(overlappedBtn.click({ timeout: 2000 })).rejects.toThrow(
    /Timeout/
  );

  await expect(opacity0Btn).toHaveCSS("opacity", "0");
  await expect(visibilityHiddenBtn).toBeHidden();
  await expect(displayNoneBtn).toBeHidden();
  await expect(offscreenBtn).not.toBeInViewport();
});
