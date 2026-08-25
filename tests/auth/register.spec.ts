import { test, expect } from "../fixtures/apiFixture";

test("should register a new user", async ({ authClient }) => {
  const email = `testuser${Date.now()}@example.com`;

  const response = await authClient.register(
    "Test User",
    email,
    "Password@123"
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.message).toBe("User registered successfully");
  expect(body.user).toHaveProperty("id");
  expect(body.user).toHaveProperty("name");
  expect(body.user).toHaveProperty("email");

  expect(body.user).not.toHaveProperty("password");
});