import {
  test,
  expect,
} from "../fixtures/uiFixture.js";

import { ProductsPage } from "../pages/ProductsPage.js";
import { CartPage } from "../pages/CartPage.js";

test(
  "authenticated user can add a product and view cart",
  async ({ authenticatedPage }) => {
    const productsPage =
      new ProductsPage(authenticatedPage);

    const cartPage =
      new CartPage(authenticatedPage);

    // Go to Products
    await productsPage.goto();

    await expect(
      authenticatedPage.getByRole("heading", {
        name: "Products",
        exact: true,
      })
    ).toBeVisible();

    // Add product
    const productName = "iPhone 16";

    await productsPage.addProductToCart(
      productName
    );

    // Handle success alert

authenticatedPage.once(
  "dialog",
  async (dialog) => {
    expect(dialog.message()).toBe(
      "Product added to cart!"
    );

    await dialog.accept();
  }
);

await productsPage.addProductToCart(
  productName
);

    // Go to Cart
    await cartPage.goto();

    await expect(
      authenticatedPage.getByRole("heading", {
        name: "Your Cart",
        exact: true,
      })
    ).toBeVisible();

    // Verify product exists in cart
    await expect(
      cartPage.cartItem(productName)
    ).toBeVisible();

    // Verify cart has one item
    await expect(
      authenticatedPage.locator(".cart-item")
    ).toHaveCount(1);
  }
);