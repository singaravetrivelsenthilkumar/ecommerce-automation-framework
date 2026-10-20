
class CartPage {
  constructor(page) {
    this.page = page;

    this.cartLink = page.locator(".shopping_cart_link");
    this.cartItems = page.locator(".cart_item");
    this.productNames = page.locator(".inventory_item_name");
    this.productPrices = page.locator(".inventory_item_price");

    this.removeBackpackButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );

    this.checkoutButton = page.getByRole("button", {
      name: "Checkout"
    });
  }

  async open() {
    await this.cartLink.click();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async removeBackpack() {
    await this.removeBackpackButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
