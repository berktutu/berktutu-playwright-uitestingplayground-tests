import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("State of an element", async ({ page }) => {
  const autoWaitPage = page.getByRole("link", { name: "Auto Wait" });
  await autoWaitPage.click();

  await page.selectOption(".form-select", "input");

  const inputField = page.getByRole("textbox");
  const inputText = "test";
  await inputField.fill(inputText);

  await expect(inputField).toBeVisible();

  const visibleCheckbox = page.getByRole("checkbox", { name: "visible" });
  await visibleCheckbox.uncheck();

  const apply10SecBtn = page.getByRole("button", { name: "Apply 10s" });
  await apply10SecBtn.click();

  await expect(inputField).not.toBeVisible();
  await expect(inputField).toBeVisible({ timeout: 15000 });
  await expect(inputField).toHaveValue(inputText);
});
