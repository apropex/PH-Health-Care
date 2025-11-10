/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import mergeApi from "@/utility/merge-api";
import parseJSONbody from "@/utility/parseJSONbody";
import { iZodValidatorReturns, zodValidatorFn } from "@/utility/zodValidatorFn";
import z from "zod";
import { login } from "./login";

// === Return Type ===
interface iRegisterResponse extends iZodValidatorReturns {
  message?: string;
}

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

const registerValidation = z
  .object({
    name: z.string().min(3, "Name is required"),
    address: z.string().optional(),
    email: z.email("Valid email is required"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain at least 1 letter, 1 number, 1 symbol and be 6+ characters"
      ),
    confirmPassword: z.string({ error: "Passwords do not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerPatient = async (
  _: any,
  formData: FormData
): Promise<iRegisterResponse> => {
  const name = formData.get("name");
  const address = formData.get("address");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const needPasswordChange = false;

  try {
    const zodRes = registerValidation.safeParse({
      name,
      address,
      email,
      password,
      confirmPassword,
    });

    if (!zodRes.success) return zodValidatorFn(zodRes);

    const registerData = {
      user: { email, password, needPasswordChange },
      patient: { name, address },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const response = await fetch(mergeApi("/patient/create-patient"), {
      method: "POST",
      body: newFormData,
    });

    const { success, message } = await parseJSONbody<null>(response);

    if (!success) return { success: false, message };

    return await login(null, formData);

    //
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    return {
      success: false,
      message: error?.message || "Patient registration failed",
    };
  }
};
