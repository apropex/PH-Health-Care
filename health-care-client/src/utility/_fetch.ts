import { iResponse } from "@/interfaces";

export async function _fetch<TResponse = unknown, TRequest = unknown>(
  api: string,
  param?: RequestInit,
  body?: TRequest
): Promise<iResponse<TResponse>> {
  //

  const options: RequestInit = param || {};

  options.headers = {
    "Content-Type": "application/json",
  };

  if (!options.headers.cookie) options.credentials = "include";

  // Only include body if method allows it
  if (options.method !== "GET" && options.method !== "HEAD" && body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(api, options);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
  }

  // Try parsing JSON safely
  try {
    return (await res.json()) as iResponse<TResponse>;
  } catch {
    throw new Error("Failed to parse JSON response.");
  }
}
