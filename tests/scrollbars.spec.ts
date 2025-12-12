import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Scroll into view of the hiding button", async ({ page }) => {
  const ScrollbarsPage = page.getByRole("link", { name: "Scrollbars" });
  await ScrollbarsPage.click();

  const hidingBtn = page.getByRole("button", { name: "Hiding Button" });

  await hidingBtn.scrollIntoViewIfNeeded();

  await hidingBtn.click();
});
