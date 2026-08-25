import { test, expect } from "../fixtures/apiFixture";

test("should complete checkout successfully", async ({
  cartClient,
  addressClient,
  checkoutClient,
}) => {
  // Add product to cart
  const cartResponse = await cartClient.addToCart(1);

  expect(cartResponse.status()).toBe(200);

  const cartBody = await cartResponse.json();

  expect(cartBody.cart.subtotal).toBeGreaterThan(0);

  // Add address
  const addressResponse = await addressClient.addAddress({
    fullName: "Checkout Test User",
    phone: "9876543210",
    house: "12A",
    street: "MG Road",
    city: "Kottayam",
    state: "Kerala",
    pincode: "686001",
  });

  expect(addressResponse.status()).toBe(201);

  // Checkout
  const checkoutResponse = await checkoutClient.checkout();

  expect(checkoutResponse.status()).toBe(201);

  const body = await checkoutResponse.json();

  console.log("Checkout response:", body);

  expect(body.message).toBe("Order placed successfully");
  expect(body.order).toHaveProperty("id");
  expect(body.order).toHaveProperty("status");
  expect(body.order).toHaveProperty("subtotal");
  expect(body.order).toHaveProperty("total");
});