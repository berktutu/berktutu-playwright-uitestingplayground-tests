import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Scroll into the name field and fill text", async ({ page }) => {
  const overlappedElementPage = page.getByRole("link", {
    name: "Overlapped Element",
  });
  await overlappedElementPage.click();

  const idTextbox = page.getByPlaceholder("Id");
  await idTextbox.fill("test");

  const nameTextbox = page.getByPlaceholder("Name");
  // This ensures that the texbox is fully visible and centered
  await nameTextbox.click();
  await nameTextbox.fill("Myname");
});
