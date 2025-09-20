/**
 * Checkout and add address during checkout
 * @param {import('@playwright/test').Page} page
 * @param {object} address
 */
export async function checkoutAndAddAddress(page, address) {
  await page.locator("button[aria-label='Show the shopping cart']").click();
  await page.locator("button#checkoutButton").click();
  await page.locator("button[aria-label='Add a new address']").click();
  await page
    .locator("input[placeholder='Please provide a country.']")
    .fill(address.country);
  await page
    .locator("input[placeholder='Please provide a name.']")
    .fill(address.name);
  await page
    .locator("input[placeholder='Please provide a mobile number.']")
    .fill(address.mobile);
  await page
    .locator("input[placeholder='Please provide a ZIP code.']")
    .fill(address.zip);
  await page
    .locator("textarea[placeholder='Please provide an address.']")
    .fill(address.address);
  await page
    .locator("input[placeholder='Please provide a city.']")
    .fill(address.city);
  await page.locator("button#submitButton").click();
  await page.waitForTimeout(1000); // Wait for address to be added
}
// Cart helpers for Juice Shop tests

/**
 * Remove all items from the cart.
 * @param {import('@playwright/test').Page} page
 */
export async function clearCart(page) {
  await page.locator("button[aria-label='Show the shopping cart']").click();
  await page.waitForTimeout(2000);
  while ((await page.locator("mat-cell.cdk-column-remove").count()) > 0) {
    await page.locator("mat-cell.cdk-column-remove button").first().click();
    await page.waitForTimeout(300);
  }
}

/**
 * Add an item to the basket by index.
 * @param {import('@playwright/test').Page} page
 * @param {number} itemIndex
 */
export async function addItemToBasket(page, itemIndex = 0) {
  await page.waitForSelector("button[aria-label^='Add to Basket']");
  const addButtons = await page.locator("button[aria-label^='Add to Basket']");
  await addButtons.nth(itemIndex).click();
}
