import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";
import path from "path";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Verify file upload", async ({ page }) => {
  const fileUploadPage = page.getByRole("link", { name: "File Upload" });
  await fileUploadPage.click();

  const fileName = "Example_image.svg.png";

  const filePath = path.resolve(
    `C:/Users/berkt/Desktop/berktutu-playwright-uitestingplayground-tests/${fileName}`
  );

  const frame = page.frameLocator("iframe");

  const fileChooserPromise = page.waitForEvent("filechooser");

  await frame.locator(".browse-btn").click();

  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles(filePath);

  expect(frame.getByText(fileName)).toBeVisible;
});
