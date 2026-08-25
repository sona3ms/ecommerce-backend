import { test, expect } from "../fixtures/apiFixture";

test("should get authenticated user profile", async ({
  authenticatedApiClient,
}) => {
  const response = await authenticatedApiClient.get(
    "/auth/profile"
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("id");
  expect(body).toHaveProperty("name");
  expect(body).toHaveProperty("email");

  expect(body).not.toHaveProperty("password");
});