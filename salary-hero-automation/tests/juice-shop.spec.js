const { test, expect } = require("@playwright/test");

// Scenario 1: Login, add 1 item, checkout, add address
// Scenario 2: Login, add 2 items, checkout, add address
// Scenario 3: Search for apple, verify results

test.describe("Juice Shop Automation", () => {
  const baseUrl = "https://juice-shop.herokuapp.com/#/";
  const userEmail = "testuser1@juice-sh.op";
  const userPassword = "TestPassword123!";
  const address = {
    country: "Thailand",
    name: "Test User",
    mobile: "0812345678",
    zip: "10110",
    address: "123 Test Street",
    city: "Bangkok",
  };

  async function dismissWelcome(page) {
    // Dismiss cookie and welcome banners if present
    try {
      await page
        .locator('button[aria-label="Close Welcome Banner"]')
        .click({ timeout: 3000 });
    } catch {}
    try {
      await page
        .locator('button[aria-label="dismiss cookie message"]')
        .click({ timeout: 2000 });
    } catch {}
  }

  async function login(page) {
    await page.goto(baseUrl);
    await dismissWelcome(page);
    await page.locator("#navbarAccount").click();
    await page.locator("#navbarLoginButton").click();
    await page.locator("input#email").fill(userEmail);
    await page.locator("input#password").fill(userPassword);
    await page.locator("button#loginButton").click();
    await page.waitForSelector('span[aria-label="Go to user profile"]', {
      timeout: 10000,
    });
  }

  async function addItemToBasket(page, itemIndex = 0) {
    // Wait for products to load
    await page.waitForSelector('button[aria-label^="Add to Basket"]');
    const addButtons = await page.locator(
      'button[aria-label^="Add to Basket"]'
    );
    await addButtons.nth(itemIndex).click();
  }

  async function checkoutAndAddAddress(page) {
    await page.locator('button[aria-label="Show the shopping cart"]').click();
    await page.locator("button#checkoutButton").click();
    await page.locator('button[aria-label="Add a new address"]').click();
    await page
      .locator('input[placeholder="Please provide a country."]')
      .fill(address.country);
    await page
      .locator('input[placeholder="Please provide a name."]')
      .fill(address.name);
    await page
      .locator('input[placeholder="Please provide a mobile number."]')
      .fill(address.mobile);
    await page
      .locator('input[placeholder="Please provide a ZIP code."]')
      .fill(address.zip);
    await page
      .locator('textarea[placeholder="Please provide an address."]')
      .fill(address.address);
    await page
      .locator('input[placeholder="Please provide a city."]')
      .fill(address.city);
    await page.locator("button#submitButton").click();
    await page.waitForTimeout(1000); // Wait for address to be added
  }

  test("Scenario 1: Login, add 1 item, checkout, add address", async ({
    page,
  }) => {
    await login(page);
    await addItemToBasket(page, 0);
    await checkoutAndAddAddress(page);
  });

  test("Scenario 2: Login, add 2 items, checkout, add address", async ({
    page,
  }) => {
    await login(page);
    await addItemToBasket(page, 0);
    await addItemToBasket(page, 1);
    await checkoutAndAddAddress(page);
  });

  test("Scenario 3: Search for apple, verify results", async ({ page }) => {
    await page.goto(baseUrl);
    await dismissWelcome(page);
    await page.locator('button[aria-label="Open search bar"]').click();
    await page.locator('input[aria-label="Search"]').fill("apple");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    const appleProducts = await page
      .locator('mat-card:has-text("Apple")')
      .count();
    expect(appleProducts).toBe(2);
    const bananaProduct = await page
      .locator('mat-card:has-text("Banana")')
      .count();
    expect(bananaProduct).toBe(0);
  });
});
