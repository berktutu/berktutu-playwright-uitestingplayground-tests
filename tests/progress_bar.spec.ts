import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("State of progress bar", async ({ page }) => {
  const progressBarPage = page.getByRole("link", { name: "Progress Bar" });
  await progressBarPage.click();

  const progressBar = page.locator("#progressBar");

  const startBtn = page.getByRole("button", { name: "Start" });
  const stopBtn = page.getByRole("button", { name: "Stop" });

  await startBtn.click();

  while (true) {
    const ariaValue = await progressBar.getAttribute("aria-valuenow");

    if (ariaValue === "75") {
      await stopBtn.click();
      break;
    }
  }

  await expect(progressBar).toHaveText("75%");
});
