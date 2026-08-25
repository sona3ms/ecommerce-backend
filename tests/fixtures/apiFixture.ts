import { test as base } from "@playwright/test";
import { ApiClient } from "../clients/apiClient";
import { AuthClient } from "../clients/authClient";
import { CartClient } from "../clients/cartClients";
import { AddressClient } from "../clients/addressClient";
import { CouponClient } from "../clients/couponClient";
import { CheckoutClient } from "../clients/checkoutClient";
type Fixtures = {
  apiClient: ApiClient;
  authClient: AuthClient;
  authenticatedApiClient: ApiClient;
  cartClient: CartClient;
  addressClient: AddressClient;
  couponClient: CouponClient;
  checkoutClient: CheckoutClient;
};

export const test = base.extend<Fixtures>({
  apiClient: async ({ request }, use) => {
    const apiClient = new ApiClient(request);

    await use(apiClient);
  },

  authClient: async ({ apiClient }, use) => {
    const authClient = new AuthClient(apiClient);

    await use(authClient);
  },

  authenticatedApiClient: async ({ request, authClient }, use) => {
    const email = `authtest${Date.now()}@example.com`;
    const password = "Password@123";

    await authClient.register(
      "API Test User",
      email,
      password
    );

    const loginResponse = await authClient.login(
      email,
      password
    );

    const loginBody = await loginResponse.json();

    const token = loginBody.token;

    const authenticatedClient = new ApiClient(
      request,
      token
    );

    await use(authenticatedClient);
  },

  cartClient: async ({ authenticatedApiClient }, use) => {
  const cartClient = new CartClient(authenticatedApiClient);

  await use(cartClient);
},
addressClient: async ({ authenticatedApiClient }, use) => {
  const addressClient = new AddressClient(authenticatedApiClient);

  await use(addressClient);
},
couponClient: async ({ authenticatedApiClient }, use) => {
  const couponClient = new CouponClient(authenticatedApiClient);

  await use(couponClient);
},
checkoutClient: async ({ authenticatedApiClient }, use) => {
  const checkoutClient = new CheckoutClient(authenticatedApiClient);

  await use(checkoutClient);
},
});

export { expect } from "@playwright/test";