import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.skip(({ browserName }) => browserName === "webkit", "skip webkitt");

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Execute click event", async ({ page }) => {
  const clickPage = page.getByRole("link", { name: "Click" });
  await clickPage.click();

  const clickEventBtn = page.getByRole("button", {
    name: "Button That Ignores DOM Click Event",
  });
  await clickEventBtn.click();

  // Moving the mouse away so the button is not on hover state anymore. Helps the correct color to be picked
  await page.mouse.move(0, 0);

  await expect(clickEventBtn).toHaveCSS("background-color", "rgb(40, 167, 69)");
});
