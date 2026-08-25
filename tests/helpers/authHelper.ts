import { test, expect } from "@playwright/test";

test("should get all products", async ({ request }) => {
  const response = await request.get("/products");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);
});