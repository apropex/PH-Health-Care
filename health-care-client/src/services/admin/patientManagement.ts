"use server";

import { iResponse } from "@/interfaces";
import { iPatient } from "@/interfaces/patient.interfaces";
import { _fetch } from "@/utility/_fetch";
import { errorResponse } from "@/utility/errorResponse";
import join from "@/utility/joinText";
import { makeFormData } from "@/utility/makeFormData";
import {
  registerValidation_server,
  registerValidationType_server,
} from "@/zod/patient-validation";

// ============ GET PATIENTS =============
export const getPatients = async (query?: string) => {
  try {
    return await _fetch.get<iPatient[]>(join("/patient", query ? join("?", query) : ""));
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ GET PATIENT BY ID =============
export const getPatientById = async (id: string) => {
  try {
    return await _fetch.get<iPatient>(join("/patient/", id));
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ UPDATE PATIENT =============
export const updatePatient = async (
  id: string,
  data: registerValidationType_server,
  specialties: { addIds: string[]; deleteIds: string[] },
  file?: File
) => {
  if (!id) return errorResponse({ message: "Doctor id not found" });

  try {
    const payload = await registerValidation_server.parseAsync(data);

    const patient = {
      name: payload.name,
      address: payload.address || "",
    };

    const formData = makeFormData(["data", patient, "file", file]);

    return await _fetch.patch(join("/patient/", id), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ DELETE PATIENT =============
export const softDeletePatient = async (id: string): Promise<iResponse<unknown>> => {
  try {
    return await _fetch.delete(join("/patient/soft-delete/", id));
  } catch (error) {
    return errorResponse(error);
  }
};
