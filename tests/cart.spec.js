const { test, expect } = require("../fixtures/test-fixtures");
const { ProductsPage } = require("../pages/ProductsPage");
const { CartPage } = require("../pages/CartPage");

test("TC09 - Verify cart contents", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addBackpackToCart();
  await cartPage.open();

  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.productNames).toHaveText([
    "Sauce Labs Backpack"
  ]);
  await expect(cartPage.productPrices).toHaveText(["$29.99"]);

  await page.waitForTimeout(10000);
});

test("TC10 - Remove a product from cart", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addBackpackToCart();
  await cartPage.open();
  await cartPage.removeBackpack();

  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(page.locator(".shopping_cart_badge")).toHaveCount(0);

  await page.waitForTimeout(10000);
});

test("TC11 - Verify multiple products in cart", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addBackpackToCart();

  await page.locator(
    '[data-test="add-to-cart-sauce-labs-bike-light"]'
  ).click();

  await cartPage.open();

  await expect(cartPage.cartItems).toHaveCount(2);
  await expect(cartPage.productNames).toHaveText([
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light"
  ]);
  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");

  await page.waitForTimeout(10000);
});

test("TC12 - Continue to checkout", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addBackpackToCart();
  await cartPage.open();
  await cartPage.checkout();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  await expect(
    page.getByText("Checkout: Your Information", { exact: true })
  ).toBeVisible();

  await page.waitForTimeout(10000);
});
