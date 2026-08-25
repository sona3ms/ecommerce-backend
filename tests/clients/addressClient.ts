import type { APIResponse } from "@playwright/test";
import type { ApiClient } from "./apiClient";

export class AddressClient {
  constructor(private apiClient: ApiClient) {}

  async getAddresses(): Promise<APIResponse> {
    return this.apiClient.get("/addresses");
  }

  async addAddress(data: {
    fullName: string;
    phone: string;
    house: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }): Promise<APIResponse> {
    return this.apiClient.post("/addresses", data);
  }

  async updateAddress(
    id: number,
    data: Partial<{
      fullName: string;
      phone: string;
      house: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
    }>
  ): Promise<APIResponse> {
    return this.apiClient.put(`/addresses/${id}`, data);
  }

  async deleteAddress(id: number): Promise<APIResponse> {
    return this.apiClient.delete(`/addresses/${id}`);
  }
}