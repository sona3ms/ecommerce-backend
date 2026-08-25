import { test, expect } from "../fixtures/apiFixture";

test("should get all products", async ({ apiClient }) => {
  const response = await apiClient.get("/products");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();
  expect(body.length).toBeGreaterThan(0);

  for (const product of body) {
    expect(product).toHaveProperty("id");
    expect(product).toHaveProperty("name");
    expect(product).toHaveProperty("price");

    expect(typeof product.id).toBe("number");
    expect(typeof product.name).toBe("string");
    expect(typeof product.price).toBe("number");
  }
});