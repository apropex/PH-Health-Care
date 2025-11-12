/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "@/proxy-utils/cookie";
import { ApiRequestConfig, Interceptor } from "./types";

class Interceptors {
  private requestInterceptors: Interceptor<ApiRequestConfig>[] = [];
  private responseInterceptors: Interceptor<any>[] = [];
  private errorInterceptors: ((error: any) => any)[] = [];

  useRequest(interceptor: Interceptor<ApiRequestConfig>) {
    this.requestInterceptors.push(interceptor);
  }

  useResponse(interceptor: Interceptor<any>) {
    this.responseInterceptors.push(interceptor);
  }

  useError(interceptor: (error: any) => any) {
    this.errorInterceptors.push(interceptor);
  }

  async runRequestInterceptors(config: ApiRequestConfig): Promise<ApiRequestConfig> {
    let modifiedConfig = { ...config };
    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  async runResponseInterceptors(response: any): Promise<any> {
    let modifiedResponse = { ...response };
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  async runErrorInterceptors(error: any): Promise<never> {
    let currentError = error;
    for (const interceptor of this.errorInterceptors) {
      try {
        await interceptor(currentError);
      } catch (err) {
        currentError = err;
      }
    }
    throw currentError;
  }
}

export const interceptors = new Interceptors();

// === AUTH INTERCEPTOR: Server + Client Safe ===
interceptors.useRequest(async (config) => {
  let token: string | undefined;

  // 1. Try Server-Side (Next.js App Router)
  if (typeof window === "undefined") {
    try {
      // Use dynamic import to avoid SSR issues
      //   const { cookies } = await import("next/headers");
      //   token = await cookies().get("accessToken")?.value;
      token = await getCookie("accessToken");
    } catch {
      // Fallback if headers/cookies not available
    }
  }

  // 2. Try Client-Side
  if (!token && typeof window !== "undefined") {
    // Option A: From document.cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
    token = cookieValue;
  }

  // 3. Attach to headers
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      Cookie: `accessToken=${token}`,
    };
  }

  return config;
});

// === GLOBAL ERROR HANDLER ===
interceptors.useError((error) => {
  console.error("[API Error]", error.status, error.data);

  if (typeof window !== "undefined") {
    if (error.status === 401) {
      // Clear invalid token
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    } else if (error.status >= 500) {
      alert("Server error. Please try again.");
    }
  }

  // Re-throw for further handling
  throw error;
});
