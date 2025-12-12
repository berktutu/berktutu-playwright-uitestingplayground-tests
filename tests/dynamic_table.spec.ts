import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Verify CPU values", async ({ page }) => {
  const dynamicTablePage = page.getByRole("link", { name: "Dynamic Table" });
  await dynamicTablePage.click();

  const chromeRow = page.getByRole("row", { name: "Chrome" });
  const chromeCpu = chromeRow.getByRole("cell", { name: "%" });
  const chromeCpuVal = await chromeCpu.textContent();

  const chromeWarningTxt = await page.locator(".bg-warning").textContent();
  expect(chromeWarningTxt).toEqual(`Chrome CPU: ${chromeCpuVal}`);
});
