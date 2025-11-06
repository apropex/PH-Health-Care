/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { iUser } from "@/interfaces/user.interfaces";
import mergeApi from "@/utility/merge-api";
import { iZodValidatorReturns, zodValidatorFn } from "@/utility/zodValidatorFn";
import z from "zod";

const loginValidation = z.object({
  email: z.email({ error: "Enter a valid email address" }),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

interface iReturnProps extends iZodValidatorReturns {
  message?: string;
  user?: iUser | null;
}

export const login = async (_: any, formData: FormData): Promise<iReturnProps> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const zodRes = loginValidation.safeParse(loginData);
    if (!zodRes.success) return zodValidatorFn(zodRes);

    const { success, message, data } = await fetch(mergeApi("/auth/login"), {
      method: "POST",
      body: JSON.stringify(zodRes.data),
    }).then((res) => res.json());

    return { success, message, user: data };

    //
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to login", user: null };
  }
};
