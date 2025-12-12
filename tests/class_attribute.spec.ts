import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Identify and click the right button", async ({ page }) => {
  const classAttributePage = page.getByRole("link", {
    name: "Class Attribute",
  });
  await classAttributePage.click();

  const primaryBtn = page.locator(
    "//button[contains(concat('', normalize-space(@class), ''), 'btn-primary')]"
  );

  page.on("dialog", async (dialog) => {
    console.log("Popup message:", dialog.message());
    expect(dialog.message()).toBe("Primary button pressed");
    await dialog.accept();
  });

  await primaryBtn.click();
});
