import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth.js";
import {
  addItemToBasket,
  clearCart,
  checkoutAndAddAddress,
} from "../helpers/cart.js";
import fs from "fs";
import {
  assertBasketCount,
  searchForProduct,
  getProductTitles,
  countProducts,
} from "../helpers/search.js";

const baseUrl = "https://juice-shop.herokuapp.com/#/";
const userData = JSON.parse(
  fs.readFileSync(new URL("../fixtures/user.json", import.meta.url))
);
const { email: userEmail, password: userPassword, address } = userData;

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await login(page, baseUrl, userEmail, userPassword);
  await clearCart(page);
  await page.close();
});

test.beforeEach(async ({ page }) => {
  await login(page, baseUrl, userEmail, userPassword);
});

test.afterEach(async ({ page }) => {
  await clearCart(page);
});

test("Scenario 1: Login, add 1 item, checkout, add address", async ({
  page,
}) => {
  await addItemToBasket(page, 0);
  await page.waitForTimeout(2000);
  await assertBasketCount(page, 1);
  await checkoutAndAddAddress(page, address);
});

test("Scenario 2: Login, add 2 items, checkout, add address", async ({
  page,
}) => {
  await addItemToBasket(page, 0);
  await addItemToBasket(page, 1);
  await page.waitForTimeout(2000);
  await assertBasketCount(page, 2);
  await checkoutAndAddAddress(page, address);
});

test("Scenario 3: Search for apple, verify results", async ({ page }) => {
  await searchForProduct(page, "apple");
  const titles = await getProductTitles(page);
  console.log("Product titles:", titles);
  const appleProducts = await countProducts(page, "Apple");
  const bananaProduct = await countProducts(page, "Banana");
  expect(appleProducts).toBe(2);
  expect(bananaProduct).toBe(0);
});
