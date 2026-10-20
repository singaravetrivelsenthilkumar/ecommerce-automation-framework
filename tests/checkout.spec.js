
const { test, expect } = require("../fixtures/test-fixtures");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutPage } = require("../pages/CheckoutPage");

test.beforeEach(async ({ authenticatedPage }) => {
  const productsPage = new ProductsPage(authenticatedPage);
  const cartPage = new CartPage(authenticatedPage);

  await productsPage.addBackpackToCart();
  await cartPage.open();
  await cartPage.checkout();
});

test("TC13A - First name is required", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.continueCheckout();

  await expect(checkoutPage.errorMessage).toContainText(
    "First Name is required"
  );

  await page.waitForTimeout(10000);
});

test("TC13B - Last name is required", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.firstName.fill("Test");
  await checkoutPage.continueCheckout();

  await expect(checkoutPage.errorMessage).toContainText(
    "Last Name is required"
  );

  await page.waitForTimeout(10000);
});

test("TC13C - Postal code is required", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.firstName.fill("Test");
  await checkoutPage.lastName.fill("User");
  await checkoutPage.continueCheckout();

  await expect(checkoutPage.errorMessage).toContainText(
    "Postal Code is required"
  );

  await page.waitForTimeout(10000);
});

test("TC14 - Verify order summary", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCustomerDetails("Test", "User", "600001");
  await checkoutPage.continueCheckout();

  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await expect(checkoutPage.itemTotal).toHaveText("Item total: $29.99");
  await expect(checkoutPage.tax).toHaveText("Tax: $2.40");
  await expect(checkoutPage.total).toHaveText("Total: $32.39");

  await expect(
    page.getByText("Sauce Labs Backpack", { exact: true })
  ).toBeVisible();

  await page.waitForTimeout(10000);
});

test("TC15 - Complete checkout successfully", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.fillCustomerDetails("Test", "User", "600001");
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.confirmationMessage).toHaveText(
    "Thank you for your order!"
  );

  await page.waitForTimeout(10000);
});
