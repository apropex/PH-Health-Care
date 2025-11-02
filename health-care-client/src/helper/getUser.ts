/* eslint-disable @typescript-eslint/no-explicit-any */

import { iResponse } from "@/interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import mergeApi from "@/utility/merge-api";

export default async function getUser(cookie?: string, cache?: RequestCache) {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (cookie) options.headers = { ...options.headers, cookie };
  else options.credentials = "include";
  if (cache) options.cache = cache;

  try {
    const res = await fetch(mergeApi("/user/me"), options);
    if (!res.ok) throw new Error("Failed to fetch authentication status.");

    const { success, message, data } = (await res.json()) as iResponse<iUser>;

    return { success, message, user: data };
  } catch (err: any) {
    console.log(err.message);
    return {
      isAuthenticated: false,
      user: null,
    };
  }
}
