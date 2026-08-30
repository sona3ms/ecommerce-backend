import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  projects: [
    {
      name: "api",
      testMatch: /.*\.spec\.ts/,
      testIgnore: /ui\/.*/,
      use: {
        baseURL: "http://localhost:3000",
      },
    },

    {
      name: "ui",
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        baseURL: "http://localhost:5173",
        launchOptions: {
          slowMo: 1000,
        },
      },
    },
  ],
});
