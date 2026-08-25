import { test, expect } from "../fixtures/apiFixture";

test("should add, update and remove product from cart", async ({
  cartClient,
}) => {
  // Add product
  const addResponse = await cartClient.addToCart(1);

  expect(addResponse.status()).toBe(200);

  let body = await addResponse.json();

  let item = body.cart.items.find(
    (item: { productId: number }) => item.productId === 1
  );

  expect(item).toBeTruthy();
  expect(item.quantity).toBe(1);

  // Update quantity
  const updateResponse = await cartClient.updateQuantity(1, 3);

  expect(updateResponse.status()).toBe(200);

  body = await updateResponse.json();

  item = body.cart.items.find(
    (item: { productId: number }) => item.productId === 1
  );

  expect(item).toBeTruthy();
  expect(item.quantity).toBe(3);

  // Remove product
  const deleteResponse = await cartClient.removeFromCart(1);

  expect(deleteResponse.status()).toBe(200);

  body = await deleteResponse.json();

  expect(body.cart.items).toHaveLength(0);
  expect(body.cart.subtotal).toBe(0);
});