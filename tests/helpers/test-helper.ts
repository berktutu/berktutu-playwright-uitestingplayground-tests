import { test } from "@playwright/test";

export function setUpUrl() {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://www.uitestingplayground.com");
  });
}
