import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Load Delay", async ({ page }) => {
  const loadDelayPage = page.getByRole("link", { name: "Load Delay" });
  await loadDelayPage.click();

  const loadDelaybtn = page.getByRole("button", {
    name: "Button Appearing After Delay",
  });

  // Wait for button to be visible. Change the timeout if needed. Currently using the default timeout.
  await expect(loadDelaybtn).toBeVisible();

  await loadDelaybtn.click();
});
