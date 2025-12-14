import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
  const alertPage = page.getByRole("link", { name: "Alerts" });
  await alertPage.click();
});

test.describe("Alert, Confirm, Prompt", () => {
  test("Alert", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      await dialog.accept();
    });

    const alertBtn = page.getByRole("button", { name: "Alert" });
    await alertBtn.click();
  });

  test("Confirm", async ({ page }) => {
    // Using page.once instead of on here because of additional alert
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      await dialog.accept();
    });

    const confirmBtn = page.getByRole("button", { name: "Confirm" });
    await confirmBtn.click();

    // Waiting for alert
    const alertDialog = await page.waitForEvent("dialog");
    await alertDialog.accept();
  });

  test("Prompt", async ({ page }) => {
    const promptInput = "Test123";
    // Using page.once instead of on here because of additional alert
    page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      await dialog.accept(promptInput);
    });

    const promptBtn = page.getByRole("button", { name: "Prompt" });
    await promptBtn.click();

    // Waiting for alert
    const alertDialog = await page.waitForEvent("dialog");
    expect(alertDialog.type()).toBe("alert");
    expect(alertDialog.message()).toBe(`User value: ${promptInput}`);
    await alertDialog.accept();
  });
});
