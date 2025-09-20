// Authentication helpers for Juice Shop tests

/**
 * Dismiss welcome and cookie banners if present.
 * @param {import('@playwright/test').Page} page
 */
export async function dismissWelcome(page) {
  try {
    await page
      .locator("button[aria-label='Close Welcome Banner']")
      .click({ timeout: 3000 });
  } catch {}
  try {
    await page
      .locator("a[aria-label='dismiss cookie message']")
      .click({ timeout: 2000 });
  } catch {}
}

/**
 * Log in to Juice Shop, or register if user does not exist.
 * @param {import('@playwright/test').Page} page
 * @param {string} baseUrl
 * @param {string} userEmail
 * @param {string} userPassword
 */
export async function login(page, baseUrl, userEmail, userPassword) {
  await page.goto(baseUrl);
  await dismissWelcome(page);
  await page.locator("#navbarAccount").click();
  await page.locator("#navbarLoginButton").click();
  await page.locator("input#email").fill(userEmail);
  await page.locator("input#password").fill(userPassword);
  await page.locator("button#loginButton").click();
  try {
    await page.waitForSelector(
      "div.ng-star-inserted:has-text('All Products')",
      { timeout: 7000 }
    );
  } catch {
    await register(page, userEmail, userPassword);
    await page.locator("input#email").fill(userEmail);
    await page.locator("input#password").fill(userPassword);
    await page.locator("button#loginButton").click();
    await page.waitForSelector(
      "div.ng-star-inserted:has-text('All Products')",
      { timeout: 10000 }
    );
  }
}

/**
 * Register a new user in Juice Shop.
 * @param {import('@playwright/test').Page} page
 * @param {string} userEmail
 * @param {string} userPassword
 */
export async function register(page, userEmail, userPassword) {
  await page.locator("a[routerlink='/register']").click();
  await page.locator("input#emailControl").fill(userEmail);
  await page.locator("input#passwordControl").fill(userPassword);
  await page.locator("input#repeatPasswordControl").fill(userPassword);
  await page
    .locator("mat-select[name='securityQuestion']")
    .click({ force: true });
  await page.waitForTimeout(3000);
  await page
    .locator("mat-select[name='securityQuestion']")
    .click({ force: true });
  await page.locator("mat-option").first().click();
  await page.locator("input#securityAnswerControl").fill("TestAnswer");
  await page.locator("button#registerButton").click();
}
