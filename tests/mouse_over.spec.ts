import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Click count", async ({ page }) => {
  const mouseOverPage = page.getByRole("link", { name: "Mouse Over" });
  await mouseOverPage.click();

  const clickMeBtn = page.getByTitle("Click me");
  // .hover() fails on webkit and firefox in this practice. Instead I used dispatchEvent however it doesn't simulate real mouse over.
  await clickMeBtn.dispatchEvent("mouseenter");
  const clickMeBtnActive = page.getByTitle("Active Link");
  for (let i = 0; i < 2; i++) {
    await clickMeBtnActive.click();
  }

  const linkBtn = page.locator(".text-primary", { hasText: "Link Button" });
  // .hover() fails on webkit and firefox in this practice. Instead I used dispatchEvent however it doesn't simulate real mouse over.
  await linkBtn.dispatchEvent("mouseenter");
  const linkBtnActive = page.locator(".text-warning", {
    hasText: "Link Button",
  });
  for (let i = 0; i < 2; i++) {
    await linkBtnActive.click();
  }

  await expect(page.locator("#clickCount")).toHaveText("2");
  await expect(page.locator("#clickButtonCount")).toHaveText("2");
});
