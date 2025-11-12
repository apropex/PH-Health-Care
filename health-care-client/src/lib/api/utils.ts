/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildUrl = (base: string, path: string, params?: Record<string, any>) => {
  const url = new URL(path, base);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
};

export const createTimeoutSignal = (ms: number): AbortSignal => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
};

export const isNetworkError = (error: any): boolean => {
  return !error.response && (error.code === "ERR_NETWORK" || error.name === "AbortError");
};
