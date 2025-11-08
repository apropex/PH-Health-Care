/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { tUserRole } from "@/constants";
import { iUser } from "@/interfaces/user.interfaces";
import { checkToken } from "@/proxy-utils/check-token";
import {
  getDefaultDashboardRoute,
  isValidRedirectPath,
} from "@/proxy-utils/proxy-helper";
import { setCookies } from "@/proxy-utils/setCookie";
import mergeApi from "@/utility/merge-api";
import { iZodValidatorReturns, zodValidatorFn } from "@/utility/zodValidatorFn";
import { redirect } from "next/navigation";
import z from "zod";

// === Zod Schema ===
const loginSchema = z.object({
  email: z.string().email("Enter a valid email address").trim(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

// === Return Type ===
interface iLoginResponse extends iZodValidatorReturns {
  message?: string;
  user?: iUser | null;
}

export const login = async (_: any, formData: FormData): Promise<iLoginResponse> => {
  try {
    const rawData = {
      email: formData.get("email")?.toString().trim(),
      password: formData.get("password")?.toString(),
    };

    let redirectPath = formData.get("redirect")?.toString();

    const validation = loginSchema.safeParse(rawData);
    if (!validation.success) {
      return zodValidatorFn(validation);
    }

    const { email, password } = validation.data;

    const response = await fetch(mergeApi("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const { success: tokenSuccess, accessToken } = await setCookies(response);

    if (!tokenSuccess || !accessToken)
      return {
        success: false,
        message: "Authentication failed: No cookies received",
        user: null,
      };

    const role = (await checkToken(accessToken, "access"))?.role as tUserRole;

    if (!(redirectPath && role && isValidRedirectPath(redirectPath, role))) {
      redirectPath = role ? getDefaultDashboardRoute(role) : "/";
    }

    redirect(redirectPath);

    // const body = await parseJSONbody<iUser>(response);
  } catch (error: any) {
    console.error("Login error:", error);
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    return {
      success: false,
      message: error?.message || "An unexpected error occurred during login",
      user: null,
    };
  }
};
