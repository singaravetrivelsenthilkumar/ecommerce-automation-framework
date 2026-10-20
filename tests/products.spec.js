
const { test, expect } = require("../fixtures/test-fixtures");
const { ProductsPage } = require("../pages/ProductsPage");

test("TC05 - Verify product listing", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);

  await expect(productsPage.productItems).toHaveCount(6);

  await expect(
    page.getByText("Products", { exact: true })
  ).toBeVisible();

  await page.waitForTimeout(10000);
});

test("TC06 - Verify product names and prices", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);

  const names = await productsPage.getProductNames();
  const prices = await productsPage.getProductPrices();

  expect(names.length).toBe(6);
  expect(prices.length).toBe(6);

  expect(names).toContain("Sauce Labs Backpack");
  expect(prices.every(price => price > 0)).toBe(true);

  console.log("Product names:", names);
  console.log("Product prices:", prices);

  await page.waitForTimeout(10000);
});

test("TC07 - Sort products by price low to high", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);

  await productsPage.sortByPriceLowToHigh();

  const prices = await productsPage.getProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);

  console.log("Sorted prices:", prices);

  await page.waitForTimeout(10000);
});

test("TC08 - Add a product to the cart", async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const productsPage = new ProductsPage(page);

  await productsPage.addBackpackToCart();

  await expect(productsPage.cartBadge).toHaveText("1");

  console.log("Backpack added to cart successfully");

  await page.waitForTimeout(10000);
});
