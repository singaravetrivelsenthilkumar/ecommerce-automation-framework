const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");

test("TC01 - Valid user can log in successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  await expect(page).toHaveURL(/inventory/);
  await expect(
    page.getByText("Products", { exact: true })
  ).toBeVisible();

  await page.waitForTimeout(10000);
});

test("TC02 - Invalid password shows an error", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "wrong_password");

  await expect(loginPage.errorMessage).toContainText(
    "Username and password do not match"
  );
  await page.waitForTimeout(10000);
});

test("TC03 - Invalid username shows an error", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("wrong_user", "secret_sauce");

  await expect(loginPage.errorMessage).toContainText(
    "Username and password do not match"
  );
});

test("TC04 - Empty credentials show a validation error", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("", "");

  await expect(loginPage.errorMessage).toContainText(
    "Username is required"
  );
});
