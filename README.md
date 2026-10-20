# E-Commerce Automation Framework

A web UI and API automation testing project built using **JavaScript and Playwright**. This project automates key e-commerce workflows on SauceDemo and demonstrates REST API testing using Fake Store API.

## Features

- Login automation and validation
- Product listing, name and price verification
- Product sorting and cart operations
- Checkout form validation and order confirmation
- REST API testing using GET, POST, PUT and DELETE
- Page Object Model (POM)
- Reusable Playwright test fixtures
- HTML test reports
- Failure screenshots, videos and traces

## Tech Stack

- JavaScript
- Playwright Test
- Node.js and npm
- SauceDemo — UI testing
- Fake Store API — API testing
- Git and GitHub

## Project Structure

```text
ecommerce-automation-framework/
├── fixtures/
│   └── test-fixtures.js
├── pages/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   ├── api/
│   │   └── products-api.spec.js
│   ├── login.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

## Prerequisites

Install Node.js and npm before setting up the project.

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd ecommerce-automation-framework
```

Install dependencies:

```bash
npm install
```

Install the Playwright Chromium browser:

```bash
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npx playwright test --workers=1
```

Run tests with a visible browser:

```bash
npx playwright test --headed --workers=1
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js --headed --workers=1
```

Run API tests:

```bash
npx playwright test tests/api/products-api.spec.js
```

## HTML Test Report

After running the tests, open the HTML report:

```bash
npx playwright show-report
```

The report displays test results and provides access to available failure artifacts.

## Design Approach

The project uses the Page Object Model to separate page locators and actions from test cases. A reusable authenticated-page fixture handles login setup for product, cart and checkout tests.

## Test Results

The initial full regression run completed with **23 tests passed**. Two of those tests belonged to Playwright's default example file, so rerun the suite after removing that file and update this section with the latest verified result.

## Notes

- SauceDemo is used for UI automation practice.
- Fake Store API is a separate service used for REST API exercises.
- API write operations may return simulated responses and may not persist changes.
- This is a learning and portfolio project; it is not a production e-commerce application.

## Author

**Singaravetrivel S**

