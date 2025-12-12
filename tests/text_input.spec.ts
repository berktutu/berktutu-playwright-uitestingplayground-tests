import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Button changing input value", async ({ page }) => {
  const textInputPage = page.getByRole("link", { name: "Text Input" });
  await textInputPage.click();

  const textInputTextbox = page.getByPlaceholder("MyButton");
  await textInputTextbox.fill("Button name changed");

  const textInputBtn = page.getByRole("button");
  await textInputBtn.click();

  // Retry if it still works after first change
  await textInputTextbox.fill("Button name changed 2");
  await textInputBtn.click();
});
