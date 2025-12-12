import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Trigger AJAX request", async ({ page }) => {
  const ajaxDataPage = page.getByRole("link", { name: "AJAX Data" });
  await ajaxDataPage.click();

  const triggerAjaxReqBtn = page.getByRole("button", {
    name: "Button Triggering AJAX Request",
  });
  await triggerAjaxReqBtn.click();

  const successMsg = page.locator(".bg-success");

  // Waiting for success message because toHaveText has a default 5 seconds timeout
  await successMsg.waitFor({ state: "attached" });
  await expect(successMsg).toHaveText("Data loaded with AJAX get request.");

  await successMsg.click();
});
