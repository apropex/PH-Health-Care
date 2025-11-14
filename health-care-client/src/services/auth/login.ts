/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { tUserRole } from "@/constants";
import { iUser } from "@/interfaces/user.interfaces";
import { checkToken } from "@/proxy-utils/check-token";
import { setCookies } from "@/proxy-utils/cookie";
import {
  getDefaultDashboardRoute,
  isValidRedirectPath,
} from "@/proxy-utils/proxy-helper";
import { errorResponse } from "@/utility/errorResponse";
import mergeApi from "@/utility/merge-api";
import parseJSONbody from "@/utility/parseJSONbody";
import { iZodValidatorReturns, zodErrorReturn } from "@/utility/zodValidatorFn";
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
      return zodErrorReturn(validation);
    }

    const { email, password } = validation.data;

    const response = await fetch(mergeApi("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await parseJSONbody<iUser>(response);

    if (!result.success) throw new Error(result.message || "");

    const { success: tokenSuccess, accessToken } = await setCookies(response);

    if (!tokenSuccess || !accessToken) {
      return {
        success: false,
        message: "Authentication failed: No cookies received",
      };
    }

    const role = (await checkToken(accessToken, "access"))?.role as tUserRole;

    if (!(redirectPath && role && isValidRedirectPath(redirectPath, role))) {
      redirectPath = role ? getDefaultDashboardRoute(role) : "/";
    }

    redirect(`${redirectPath}?loggedIn=true`);
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    else return errorResponse(error);
  }
};
