import { test, Page } from "@playwright/test";

export async function setUpUrl(page: Page) {
  await page.goto("http://www.uitestingplayground.com");
}
