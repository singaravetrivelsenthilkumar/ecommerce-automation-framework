
const { test, expect } = require("@playwright/test");

const BASE_URL = "https://fakestoreapi.com";

test("TC16 - GET products successfully", async ({ request }) => {
  const response = await request.get(`${BASE_URL}/products`);

  expect(response.status()).toBe(200);

  const products = await response.json();

  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);

  expect(products[0]).toHaveProperty("id");
  expect(products[0]).toHaveProperty("title");
  expect(products[0]).toHaveProperty("price");

  console.log("HTTP status:", response.status());
  console.log("Products returned:", products.length);
  console.log("First product:", products[0]);
});

test("TC17 - POST a new product", async ({ request }) => {
  const newProduct = {
    title: "Automation Testing Product",
    price: 49.99,
    description: "Created by Playwright API test",
    image: "https://i.pravatar.cc",
    category: "electronics"
  };

  const response = await request.post(`${BASE_URL}/products`, {
    data: newProduct
  });

  expect(response.status()).toBe(201);

  const result = await response.json();

  expect(result).toHaveProperty("id");
  expect(result.title).toBe(newProduct.title);
  expect(result.price).toBe(newProduct.price);

  console.log("Created product response:", result);
});

test("TC18 - PUT update a product", async ({ request }) => {
  const updatedProduct = {
    title: "Updated Automation Product",
    price: 79.99,
    description: "Updated using Playwright",
    image: "https://i.pravatar.cc",
    category: "electronics"
  };

  const response = await request.put(`${BASE_URL}/products/1`, {
    data: updatedProduct
  });

  expect(response.status()).toBe(200);

  const result = await response.json();

  expect(result.title).toBe(updatedProduct.title);
  expect(result.price).toBe(updatedProduct.price);

  console.log("Updated product response:", result);
});

test("TC19 - DELETE a product", async ({ request }) => {
  const response = await request.delete(`${BASE_URL}/products/1`);

  expect(response.status()).toBe(200);

  const result = await response.json();

  expect(result).toHaveProperty("id");

  console.log("Delete response:", result);
});
