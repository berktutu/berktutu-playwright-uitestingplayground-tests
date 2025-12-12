import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
  const loadDelayPage = page.getByRole("link", { name: "Load Delay" });
  await loadDelayPage.click();
});

test("Load Delay", async ({ page }) => {
  const loadDelaybtn = page.getByRole("button", {
    name: "Button Appearing After Delay",
  });

  await expect(loadDelaybtn).toBeVisible();

  await loadDelaybtn.click();
});
