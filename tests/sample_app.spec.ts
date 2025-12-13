import { test, expect } from "@playwright/test";
import { setUpUrl } from "./helpers/test-helper";

test.beforeEach(async ({ page }) => {
  await setUpUrl(page);
});

test.describe("Login form", () => {
  test("Successful login", async ({ page }) => {
    const sampleAppPage = page.getByRole("link", { name: "Sample App" });
    await sampleAppPage.click();

    const userNameField = page.getByPlaceholder("User Name");
    const passwordField = page.getByPlaceholder("********");
    const loginBtn = page.getByRole("button");
    const loginStatus = page.locator("#loginstatus");

    const credentials = {
      userName: "user123",
      password: "pwd",
    };

    await userNameField.fill(credentials.userName);
    await passwordField.fill(credentials.password);
    await loginBtn.click();

    await expect(loginStatus).toHaveText(`Welcome, ${credentials.userName}!`);
  });

  test("Unsuccessful login", async ({ page }) => {
    const sampleAppPage = page.getByRole("link", { name: "Sample App" });
    await sampleAppPage.click();

    const userNameField = page.getByPlaceholder("User Name");
    const passwordField = page.getByPlaceholder("********");
    const loginBtn = page.getByRole("button");
    const loginStatus = page.locator("#loginstatus");

    const credentials = {
      userName: "user123",
      password: "pwd3",
    };

    await userNameField.fill(credentials.userName);
    await passwordField.fill(credentials.password);
    await loginBtn.click();

    await expect(loginStatus).toHaveText("Invalid username/password");
  });
});
