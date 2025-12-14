import { test, expect } from "@playwright/test";

test("Verify clipboard value", async ({ browser, browserName }) => {
  if (browserName !== "chromium") {
    test.skip();
  }

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  // Granting permisson to get the clipboard content
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);

  // Specifically for this test https instead of http. So reading the clipboard can work.
  await page.goto("https://uitestingplayground.com/shadowdom");

  const generateBtn = page.locator("#buttonGenerate");
  await generateBtn.click();

  const copyBtn = page.locator("#buttonCopy");
  await copyBtn.click();

  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText()
  );
  const clipboardValue = await handle.jsonValue();

  const textField = page.locator("#editField");
  const textFieldValue = await textField.inputValue();

  console.log(clipboardValue, textFieldValue);

  expect(clipboardValue).toEqual(textFieldValue);
});
