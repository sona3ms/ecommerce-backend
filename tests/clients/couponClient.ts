import type { APIResponse } from "@playwright/test";
import type { ApiClient } from "./apiClient";

export class CouponClient {
  constructor(private apiClient: ApiClient) {}

  async applyCoupon(code: string): Promise<APIResponse> {
    return this.apiClient.post("/coupons", {
      code,
    });
  }
}