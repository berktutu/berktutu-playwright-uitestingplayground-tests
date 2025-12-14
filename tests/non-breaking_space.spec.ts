import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Non-breaking space XPath", async ({ page }) => {
  const nonBreakingSpacePage = page.getByRole("link", {
    name: "Non-Breaking Space",
  });
  await nonBreakingSpacePage.click();

  // Could select with user facing locator but for the goal of the practice XPath is used
  const nonBreakingSpaceBtn = page.locator(
    "//button[normalize-space(translate(text(), '\u00A0', ' '))='My Button']"
  );
  await nonBreakingSpaceBtn.click();
});
