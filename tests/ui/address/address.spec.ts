import {
  test,
  expect,
} from "../fixtures/uiFixture.js";

import { AddressPage } from "../pages/AddressPage.js";

test(
  "authenticated user can add a new address",
  async ({ authenticatedPage }) => {
    const addressPage =
      new AddressPage(authenticatedPage);

    const fullName = `UI Test User ${Date.now()}`;

    await addressPage.goto();

    await expect(
      authenticatedPage.getByRole("heading", {
        name: "My Addresses",
        exact: true,
      })
    ).toBeVisible();

    await addressPage.clickAddAddress();

    await addressPage.fillAddress({
      fullName,
      phone: "9876543210",
      house: "12A",
      street: "MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    });

    await addressPage.saveAddress();

    await expect(
      addressPage.addressCard(fullName)
    ).toBeVisible();
  }
);