/**
 * Search and assertion helpers for Juice Shop Playwright tests.
 */
import { expect } from "@playwright/test";

/**
 * Assert that the basket count matches the expected value.
 * @param {import('@playwright/test').Page} page
 * @param {number} expectedCount
 */
export async function assertBasketCount(page, expectedCount) {
  const basketCount = await page.locator("span.warn-notification").innerText();
  expect(Number(basketCount)).toBe(expectedCount);
}

/**
 * Search for a product by term using the Juice Shop search UI.
 * @param {import('@playwright/test').Page} page
 * @param {string} term
 */
export async function searchForProduct(page, term) {
  await page.waitForSelector("mat-icon.mat-search_icon-search", {
    timeout: 5000,
  });
  await page.locator("mat-icon.mat-search_icon-search").click();
  await page.waitForSelector("input", { timeout: 5000 });
  await page.locator("input").fill(term);
  await page.keyboard.press("Enter");
  await page.waitForSelector("mat-card", { timeout: 7000 });
}

/**
 * Get all product titles currently displayed in the product cards.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<string[]>}
 */
export async function getProductTitles(page) {
  return page.$$eval("mat-card .item-name", (els) =>
    els.map((e) => e.textContent.trim())
  );
}

/**
 * Count the number of product cards containing a given name.
 * @param {import('@playwright/test').Page} page
 * @param {string} name
 * @returns {Promise<number>}
 */
export async function countProducts(page, name) {
  return page.locator(`mat-card:has-text("${name}")`).count();
}
