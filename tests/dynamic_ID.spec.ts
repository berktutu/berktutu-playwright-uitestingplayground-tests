import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test.describe("Dynamic ID", () => {
  test("Record button click", async ({ page }) => {
    const dynamicIdPage = page.getByRole("link", { name: "Dynamic ID" });
    await dynamicIdPage.click();

    const dynamicIdBtn = page.getByRole("button", {
      name: "Button with Dynamic ID",
    });

    await dynamicIdBtn.click();
  });

  test("Verify ID is not used for button", async ({ page }) => {
    const dynamicIdPage = page.getByRole("link", { name: "Dynamic ID" });
    await dynamicIdPage.click();

    await page.reload({ waitUntil: "load" });
    const dynamicIdBtn = page.getByRole("button", {
      name: "Button with Dynamic ID",
    });

    await dynamicIdBtn.click();
  });
});
