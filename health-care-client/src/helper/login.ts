/* eslint-disable @typescript-eslint/no-explicit-any */

import { iResponse } from "@/interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import mergeApi from "@/utility/merge-api";

export default async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(mergeApi("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const { success, data } = (await res.json()) as iResponse<iUser>;
    return { success, user: data };
  } catch (err: any) {
    throw new Error(err.message || "An error occurred while logging in.");
  }
}
