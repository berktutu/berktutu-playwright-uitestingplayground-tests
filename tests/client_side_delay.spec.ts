import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test("Client side delay", async ({ page }) => {
  const clientSideDelayPage = page.getByRole("link", {
    name: "Client Side Delay",
  });
  await clientSideDelayPage.click();

  const triggerClientSideLogicBtn = page.getByRole("button", {
    name: "Button Triggering Client Side Logic",
  });
  await triggerClientSideLogicBtn.click();

  const clientSideMsg = page.locator(".bg-success");
  await clientSideMsg.waitFor({ state: "attached" });
  await expect(clientSideMsg).toHaveText("Data calculated on the client side.");
  await expect(clientSideMsg).toBeVisible();
  await clientSideMsg.click();
});
