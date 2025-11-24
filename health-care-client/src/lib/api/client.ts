/* eslint-disable @typescript-eslint/no-explicit-any */

import { interceptors } from "./interceptors";
import { ApiError, ApiRequestConfig, ApiResponse, HttpMethod } from "./types";
import { buildUrl, createTimeoutSignal } from "./utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

class ApiClient {
  private defaults: Partial<ApiRequestConfig> = {
    timeout: 10000,
    retry: 1,
    cache: "default",
  };

  setDefaults(config: Partial<ApiRequestConfig>) {
    this.defaults = { ...this.defaults, ...config };
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async request<T = any>(
    endpoint: string,
    config: ApiRequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const method = (config.method || "GET") as HttpMethod;
    const mergedConfig: ApiRequestConfig = {
      ...this.defaults,
      ...config,
      headers: { ...this.defaults.headers, ...config.headers },
    };

    // Run request interceptors
    const interceptedConfig = await interceptors.runRequestInterceptors(mergedConfig);

    const url = buildUrl(API_BASE_URL, endpoint, interceptedConfig.params);
    const timeout = interceptedConfig.timeout ?? 10000;
    const signal = interceptedConfig.signal ?? createTimeoutSignal(timeout);

    let attempt = 0;
    const maxRetries = interceptedConfig.retry ?? 1;

    while (true) {
      try {
        const fetchConfig: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...interceptedConfig.headers,
          },
          cache: interceptedConfig.cache,
          next: interceptedConfig.next,
          signal,
        };

        if (interceptedConfig.body && method !== "GET") {
          fetchConfig.body = JSON.stringify(interceptedConfig.body);
        }

        const response = await fetch(url, fetchConfig);

        const contentType = response.headers.get("content-type");
        let data: any;

        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        const apiResponse: ApiResponse<T> = {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        };

        // Run response interceptors
        const finalResponse = await interceptors.runResponseInterceptors(apiResponse);

        if (!response.ok) {
          const error: ApiError = new Error("Request failed") as ApiError;
          error.status = response.status;
          error.data = data;
          throw error;
        }

        return finalResponse;
      } catch (error: any) {
        attempt++;

        const shouldRetry =
          interceptedConfig.retry !== false &&
          attempt <= (maxRetries as number) &&
          (error.name === "AbortError" || error.status >= 500 || !error.status);

        if (shouldRetry) {
          await this.delay(1000 * attempt); // Exponential backoff
          continue;
        }

        const apiError: ApiError = {
          name: error.name || "ApiError",
          message: error.message || "Unknown error",
          status: error.status || 0,
          data: error.data || null,
        };

        await interceptors.runErrorInterceptors(apiError);
      }
    }
  }

  get<T = any>(endpoint: string, config?: Omit<ApiRequestConfig, "body" | "method">) {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  post<T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<ApiRequestConfig, "body" | "method">,
  ) {
    return this.request<T>(endpoint, { ...config, method: "POST", body });
  }

  put<T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<ApiRequestConfig, "body" | "method">,
  ) {
    return this.request<T>(endpoint, { ...config, method: "PUT", body });
  }

  patch<T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<ApiRequestConfig, "body" | "method">,
  ) {
    return this.request<T>(endpoint, { ...config, method: "PATCH", body });
  }

  delete<T = any>(endpoint: string, config?: Omit<ApiRequestConfig, "body" | "method">) {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const api = new ApiClient();
