import type { APIResponse } from "@playwright/test";
import type { ApiClient } from "./apiClient";

export class CartClient {
  constructor(private apiClient: ApiClient) {}

  async getCart(): Promise<APIResponse> {
    return this.apiClient.get("/cart");
  }

  async addToCart(productId: number): Promise<APIResponse> {
    return this.apiClient.post("/cart/add", {
      productId,
    });
  }

  async updateQuantity(
    productId: number,
    quantity: number
  ): Promise<APIResponse> {
    return this.apiClient.put(`/cart/${productId}`, {
      quantity,
    });
  }

  async removeFromCart(productId: number): Promise<APIResponse> {
    return this.apiClient.delete(`/cart/${productId}`);
  }
}