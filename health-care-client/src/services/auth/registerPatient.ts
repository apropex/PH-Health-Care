/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import mergeApi from "@/utility/merge-api";
import { zodValidatorFn } from "@/utility/zodValidatorFn";
import z from "zod";

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

export const registerPatient = async (_: any, formData: FormData) => {
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

    return await fetch(mergeApi("/patient/create-patient"), {
      method: "POST",
      body: newFormData,
    }).then((res) => res.json());

    //
  } catch (error: any) {
    return {
      message: error?.message || "Patient registration failed",
      error,
    };
  }
};
