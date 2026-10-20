
const { test: base, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/inventory/);

    await use(page);
  }
});

module.exports = { test, expect };
