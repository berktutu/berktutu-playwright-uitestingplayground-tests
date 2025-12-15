import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";
import { text } from "stream/consumers";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Edit field", async ({ page }) => {
  const disabledInputPage = page.getByRole("link", { name: "Disabled Input" });
  await disabledInputPage.click();

  const text = "Test123";

  const textField = page.getByPlaceholder("Change me...");
  const editFieldBtn = page.getByRole("button", {
    name: "Enable Edit Field with 5 seconds delay",
  });

  await editFieldBtn.click();
  await expect(textField).toBeDisabled();
  await expect(textField).not.toBeDisabled({ timeout: 10000 });

  await textField.fill(text);
  await expect(textField).toHaveValue(text);
});
