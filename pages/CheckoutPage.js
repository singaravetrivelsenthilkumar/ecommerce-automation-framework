
class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');

    this.continueButton = page.getByRole("button", {
      name: "Continue"
    });

    this.finishButton = page.getByRole("button", {
      name: "Finish"
    });

    this.errorMessage = page.locator('[data-test="error"]');

    this.itemTotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");

    this.confirmationMessage = page.locator(".complete-header");
  }

  async fillCustomerDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
