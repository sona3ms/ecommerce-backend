import { test, expect } from "../fixtures/apiFixture";

test("should get authenticated user's cart", async ({
  cartClient,
}) => {
  const response = await cartClient.getCart();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("items");
  expect(body).toHaveProperty("subtotal");

  expect(Array.isArray(body.items)).toBeTruthy();
  expect(typeof body.subtotal).toBe("number");
});