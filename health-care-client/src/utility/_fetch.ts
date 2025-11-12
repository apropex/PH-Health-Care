import { getCookie } from "@/hooks/getCookie";
import { iResponse } from "@/interfaces";
import joinText from "./joinText";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type TypeMethods = Record<
  Lowercase<(typeof methods)[number]>,
  <TResponse = unknown, TRequest = unknown>(
    api: string,
    options?: RequestInit,
    data?: TRequest
  ) => Promise<iResponse<TResponse>>
>;

export async function fetchHelper<TResponse = unknown, TRequest = unknown>(
  api: string,
  options: RequestInit = {},
  data?: TRequest
): Promise<iResponse<TResponse>> {
  const isGetMethod = options.method === "GET";

  const body = options.body || JSON.stringify(data);
  if (body && !isGetMethod) options.body = body;

  const tokens = await getCookie();
  const isServer = typeof window === "undefined";

  const res = await fetch(joinText(baseUrl, api), {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(isServer && tokens ? { cookie: tokens } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error ${res.status}: ${errorText}`);
  }

  try {
    return (await res.json()) as iResponse<TResponse>;
  } catch {
    throw new Error(`Invalid JSON in response from ${api}`);
  }
}

export const _fetch = Object.fromEntries(
  methods.map((method) => [
    method.toLowerCase(),
    async <TResponse = unknown, TRequest = unknown>(
      api: string,
      options: RequestInit = {},
      data?: TRequest
    ): Promise<iResponse<TResponse>> => {
      return fetchHelper<TResponse, TRequest>(api, { ...options, method }, data);
    },
  ])
) as TypeMethods;

//

/*
export const _fetch = {
  get: async <TResponse = any, TRequest = any>(
    api: string,
    options: RequestInit
  ): Promise<iResponse<TResponse>> => {
    return serverFetchHelper<TResponse, TRequest>(api, { ...options, method: "GET" });
  },

  //
  post: async <TResponse = any, TRequest = any>(
    api: string,
    options: RequestInit = {},
    data?: any
  ): Promise<iResponse<TResponse>> => {
    return serverFetchHelper<TResponse, TRequest>(
      api,
      {
        ...options,
        method: "POST",
      },
      data
    );
  },

  //
  patch: async <TResponse = any, TRequest = any>(
    api: string,
    options: RequestInit = {},
    data?: any
  ): Promise<iResponse<TResponse>> => {
    return serverFetchHelper<TResponse, TRequest>(
      api,
      {
        ...options,
        method: "PATCH",
      },
      data
    );
  },

  //
  put: async <TResponse = any, TRequest = any>(
    api: string,
    options: RequestInit = {},
    data?: any
  ): Promise<iResponse<TResponse>> => {
    return serverFetchHelper<TResponse, TRequest>(
      api,
      {
        ...options,
        method: "PUT",
      },
      data
    );
  },

  //
  delete: async <TResponse = any, TRequest = any>(
    api: string,
    options: RequestInit = {},
    data?: any
  ): Promise<iResponse<TResponse>> => {
    return serverFetchHelper<TResponse, TRequest>(
      api,
      {
        ...options,
        method: "DELETE",
      },
      data
    );
  },
};
*/
