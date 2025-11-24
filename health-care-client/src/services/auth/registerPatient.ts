/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { _fetch } from "@/utility/_fetch";
import { errorResponse } from "@/utility/errorResponse";
import { makeFormData } from "@/utility/makeFormData";
import { iZodValidatorReturns, zodParseResult } from "@/utility/zodValidatorFn";
import { registerValidation_client } from "@/zod/patient-validation";
import { login } from "./login";

// === Return Type ===
interface iRegisterResponse extends iZodValidatorReturns {
  message?: string;
}

export const registerPatient = async (
  _: any,
  formData: FormData,
): Promise<iRegisterResponse> => {
  const name = formData.get("name");
  const address = formData.get("address");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const avatar = formData.get("avatar") as File;
  const needPasswordChange = false;

  try {
    const zodRes = zodParseResult(
      {
        name,
        address,
        email,
        password,
        confirmPassword,
      },
      registerValidation_client,
    );

    if (!zodRes.success) return zodRes;

    if (!avatar) return { success: false };

    const registerData = {
      user: { email, password, needPasswordChange },
      patient: { name, address },
    };

    const newFormData = makeFormData(["data", registerData, "file", avatar]);

    const { success, message } = await _fetch.post("/patient/create-patient", {
      body: newFormData,
    });

    if (!success) return { success: false, message };

    return await login(null, formData);

    //
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    return errorResponse(error);
  }
};
