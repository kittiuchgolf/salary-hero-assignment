# Salary Hero Automation

Automated end-to-end browser tests for [OWASP Juice Shop](https://juice-shop.herokuapp.com/#/) using Playwright.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run all Playwright tests:**
   ```sh
   npx playwright test
   ```
3. **Run a specific test file:**
   ```sh
   npx playwright test tests/juice-shop.spec.js
   ```
4. **Run tests in headed mode (for debugging):**
   ```sh
   npx playwright test tests/juice-shop.spec.js --headed
   ```

## Test Scenarios

The main test file covers:

- Login, add 1 item to basket, checkout, add address
- Login, add 2 items to basket, checkout, add address
- Search for "apple", verify 2 apple products and no banana product

## Project Structure

- `tests/juice-shop.spec.js` — Main Playwright test scenarios
- `helpers/auth.js` — Authentication and welcome banner helpers
- `helpers/cart.js` — Cart, checkout, and address helpers
- `fixtures/user.json` — Test user and address data
- `playwright.config.js` — Playwright configuration
- `eslint.config.mjs` — ESLint v9+ config (flat config)

## Helpers & Fixtures

- **auth.js**: Handles login, registration, and dismissing welcome/cookie banners.
- **cart.js**: Contains helpers for clearing the cart, adding items, and checking out with address.
- **user.json**: Stores test user credentials and address (edit as needed).

## Notes

- If login fails, the helper will attempt to register the user automatically.
- For selector issues, use Playwright Inspector or Codegen for robust selectors.
- All helpers and fixtures are modular and imported into the test file.

---
