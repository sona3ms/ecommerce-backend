import {
  test as base,
  expect,
  type Page,
} from "@playwright/test";

type UIFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<UIFixtures>({
  authenticatedPage: async (
    { page },
    use
  ) => {
    const email = `uitest${Date.now()}@example.com`;
    const password = "Password@123";

    // Register test user
    const registerResponse =
      await page.request.post(
        "http://localhost:3000/auth/register",
        {
          data: {
            name: "UI Test User",
            email,
            password,
          },
        }
      );

    if (!registerResponse.ok()) {
      throw new Error(
        `Registration failed: ${await registerResponse.text()}`
      );
    }

    // Login test user
    const loginResponse =
      await page.request.post(
        "http://localhost:3000/auth/login",
        {
          data: {
            email,
            password,
          },
        }
      );

    if (!loginResponse.ok()) {
      throw new Error(
        `Login failed: ${await loginResponse.text()}`
      );
    }

    const loginBody =
      await loginResponse.json();

    // Store authentication in browser
    await page.goto("/login");

    await page.evaluate(
      ({ user, token }) => {
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        localStorage.setItem(
          "token",
          token
        );
      },
      {
        user: loginBody.user,
        token: loginBody.token,
      }
    );

    await page.goto("/addresses");

    await use(page);
  },
});

export { expect };