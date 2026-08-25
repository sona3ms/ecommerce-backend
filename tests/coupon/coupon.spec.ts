import { test, expect } from "../fixtures/apiFixture";

test("should apply valid coupon", async ({
  cartClient,
  couponClient,
}) => {
  // Add product to create a cart subtotal
  const addResponse = await cartClient.addToCart(1);

  expect(addResponse.status()).toBe(200);

  const cartBody = await addResponse.json();

  expect(cartBody.cart.subtotal).toBeGreaterThan(0);

  // Apply coupon
  const response = await couponClient.applyCoupon("SAVE10");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.coupon).toBe("SAVE10");
  expect(body.discount).toBeGreaterThan(0);
  expect(body.total).toBeGreaterThan(0);

  expect(body.discount).toBe(
    cartBody.cart.subtotal * 0.1
  );
});