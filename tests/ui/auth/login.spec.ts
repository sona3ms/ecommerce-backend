import {
  test,
  expect,
} from "@playwright/test";

import { LoginPage } from "../pages/LoginPage.js";

test("user can login successfully", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(
      "Login successful!"
    );

    await dialog.accept();
  });

  await loginPage.login(
    "test@123.com",
    "test"
  );
});