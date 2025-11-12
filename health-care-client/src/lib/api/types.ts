/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestConfig {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  signal?: AbortSignal;
  timeout?: number;
  retry?: number | false;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface ApiError extends Error {
  status: number;
  data: any;
  code?: string;
}

export type Interceptor<T> = (value: T) => T | Promise<T>;
export type ErrorInterceptor = (error: ApiError) => any;
