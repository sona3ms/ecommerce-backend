import type { Page } from "@playwright/test";

export class AddressPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/addresses");
  }

  async clickAddAddress() {
    await this.page
      .getByRole("button", {
        name: "+ Add Address",
      })
      .click();
  }

  async fillAddress(data: {
    fullName: string;
    phone: string;
    house: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }) {
    await this.page
      .locator("#fullName")
      .fill(data.fullName);

    await this.page
      .locator("#phone")
      .fill(data.phone);

    await this.page
      .locator("#house")
      .fill(data.house);

    await this.page
      .locator("#street")
      .fill(data.street);

    await this.page
      .locator("#city")
      .fill(data.city);

    await this.page
      .locator("#state")
      .fill(data.state);

    await this.page
      .locator("#pincode")
      .fill(data.pincode);
  }

  async saveAddress() {
    await this.page
      .getByRole("button", {
        name: "Save Address",
      })
      .click();
  }

  addressCard(fullName: string) {
    return this.page
      .locator(".address-card")
      .filter({
        hasText: fullName,
      });
  }
}