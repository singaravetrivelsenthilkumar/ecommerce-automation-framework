class ProductsPage {
  constructor(page) {
    this.page = page;

    this.productItems = page.locator(".inventory_item");
    this.productNames = page.locator(".inventory_item_name");
    this.productPrices = page.locator(".inventory_item_price");

    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]'
    );

    this.cartBadge = page.locator(".shopping_cart_badge");

    this.addBackpackButton = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );
  }

  async open() {
    await this.page.goto(
      "https://www.saucedemo.com/inventory.html"
    );
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price =>
      Number(price.replace("$", "").trim())
    );
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption("lohi");
  }

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async getCartCount() {
    return await this.cartBadge.textContent();
  }
}

module.exports = { ProductsPage };
