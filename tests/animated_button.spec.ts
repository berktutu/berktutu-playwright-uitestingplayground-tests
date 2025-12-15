import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Moving button", async ({ page }) => {
  const animatedButtonPage = page.getByRole("link", {
    name: "Animated Button",
  });
  await animatedButtonPage.click();

  const startAnimationBtn = page.getByRole("button", {
    name: "Start Animation",
  });
  const movingTargetBtn = page.getByRole("button", { name: "Moving Target" });

  await startAnimationBtn.click();

  await expect(movingTargetBtn).toHaveClass(/spin/);
  await expect(movingTargetBtn).not.toHaveClass(/spin/, { timeout: 10000 });

  await movingTargetBtn.click();

  const statusMsg = page.locator("#opstatus");
  await expect(statusMsg).not.toHaveText(/spin/);
});
