import type { APIResponse } from "@playwright/test";
import type { ApiClient } from "./apiClient";

export class CheckoutClient {
  constructor(private apiClient: ApiClient) {}

  async checkout(): Promise<APIResponse> {
    return this.apiClient.post("/checkout");
  }
}