import type { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/cart");
  }

  cartItem(productName: string) {
    return this.page
      .locator(".cart-item")
      .filter({
        hasText: productName,
      });
  }

  async getCartItemCount() {
    return this.page
      .locator(".cart-item")
      .count();
  }

  async applyCoupon(code: string) {
    await this.page
      .locator("#coupon")
      .fill(code);

    await this.page
      .getByRole("button", {
        name: "Apply",
      })
      .click();
  }

  async proceedToCheckout() {
    await this.page
      .getByRole("link", {
        name: "Proceed to Checkout",
      })
      .click();
  }
}