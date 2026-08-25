import type { APIResponse } from "@playwright/test";
import type { ApiClient } from "./apiClient";

export class AuthClient {
  constructor(private apiClient: ApiClient) {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<APIResponse> {
    return this.apiClient.post("/auth/register", {
      name,
      email,
      password,
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<APIResponse> {
    return this.apiClient.post("/auth/login", {
      email,
      password,
    });
  }
}