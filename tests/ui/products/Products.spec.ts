import {
  test,
  expect,
} from "@playwright/test";

import { ProductsPage } from "../pages/ProductsPage.js";

test(
  "user can register, login and view products",
  async ({ page }) => {
    const email = `test@123.com`;
    const password = "test";

    // Register
    await page.goto("/register");

    await page
      .locator("#name")
      .fill("UI Test User");

    await page
  .locator("#register-email")
  .fill(email);

    await page
      .locator("#register-password")
      .fill(password);

    await page
      .getByRole("button", {
        name: /create account|register|sign up/i,
      })
      .click();

    // Login
    await page.goto("/login");

    await page
      .locator("#email")
      .fill(email);

    await page
      .locator("#password")
      .fill(password);

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe(
        "Login successful!"
      );

      await dialog.accept();
    });

    await page
      .getByRole("button", {
        name: "Sign in",
      })
      .click();

    // Products
    const productsPage =
      new ProductsPage(page);

    await productsPage.goto();

    await expect(
      page.getByRole("heading", {
        name: "Products",
        exact: true,
      })
    ).toBeVisible();

    const productNames =
      await productsPage.getProductNames();

    expect(productNames.length).toBeGreaterThan(0);
  }
);