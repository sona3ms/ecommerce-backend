import type { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/products");
  }

  productCard(productName: string) {
    return this.page
      .locator(".product-card")
      .filter({
        hasText: productName,
      });
  }

  async getProductNames() {
    await this.page
      .locator(".product-card")
      .first()
      .waitFor();

    return this.page
      .locator(".product-card h2")
      .allTextContents();
  }

  async addProductToCart(
    productName: string
  ) {
    const product =
      this.productCard(productName);

    await product
      .getByRole("button", {
        name: "Add to Cart",
      })
      .click();
  }
}