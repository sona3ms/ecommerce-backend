import { test, expect } from "../fixtures/apiFixture";

test("should login successfully", async ({ authClient }) => {
  const email = `loginuser${Date.now()}@example.com`;
  const password = "Password@123";

  // Register user first
  const registerResponse = await authClient.register(
    "Login Test User",
    email,
    password
  );

  expect(registerResponse.status()).toBe(201);

  // Login
  const response = await authClient.login(email, password);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.message).toBe("Login successful");
  expect(body.user).toHaveProperty("id");
  expect(body.user).toHaveProperty("email");
  expect(body.user).not.toHaveProperty("password");

  expect(body.token).toBeTruthy();
  expect(typeof body.token).toBe("string");
});