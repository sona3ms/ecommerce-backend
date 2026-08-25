import type { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
  constructor(
    private request: APIRequestContext,
    private token?: string
  ) {}

  private getHeaders(): Record<string, string> {
    if (!this.token) {
      return {};
    }

    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint, {
      headers: this.getHeaders(),
    });
  }

  async post(endpoint: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(endpoint, {
      data,
      headers: this.getHeaders(),
    });
  }

  async put(endpoint: string, data?: unknown): Promise<APIResponse> {
    return this.request.put(endpoint, {
      data,
      headers: this.getHeaders(),
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: this.getHeaders(),
    });
  }
}