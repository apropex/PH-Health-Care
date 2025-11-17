"use server";

import { UserRole } from "@/constants";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { _fetch } from "@/utility/_fetch";
import { errorResponse } from "@/utility/errorResponse";
import join from "@/utility/joinText";
import { makeFormData } from "@/utility/makeFormData";
import {
  CreateDoctorSchema_server,
  DoctorFormSchemaType_client,
  UpdateDoctorSchema_client,
} from "@/zod/doctor-validation";

// ============ CREATE DOCTOR =============
export const createDoctor = async (
  data: DoctorFormSchemaType_client,
  specialties: string[],
  file: File
) => {
  try {
    if (!file) return errorResponse({ message: "Doctor image is required" });

    const payload = await CreateDoctorSchema_server.parseAsync(data);

    const user = {
      email: payload.email,
      password: payload.password,
      role: UserRole.DOCTOR,
    };

    const doctor = {
      name: payload.name,
      contactNumber: payload.contactNumber,
      address: payload.address || "",
      registrationNumber: payload.registrationNumber,
      experience: payload.experience,
      gender: payload.gender,
      appointmentFee: payload.appointmentFee,
      qualification: payload.qualification,
      currentWorkingPlace: payload.currentWorkingPlace,
      designation: payload.designation,
    };

    const formData = makeFormData(["data", { user, doctor, specialties }, "file", file]);

    return await _fetch.post<iDoctor>("/doctor/create-doctor", { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ GET DOCTORS =============
export const getDoctors = async (query?: string) => {
  try {
    return await _fetch.get<iDoctor[]>(join("/doctor", query ? join("?", query) : ""));
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ GET DOCTOR BY ID =============
export const getDoctorById = async (id: string) => {
  try {
    return await _fetch.get<iDoctor>(join("/doctor/", id));
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ UPDATE DOCTOR =============
export const updateDoctor = async (
  id: string,
  data: DoctorFormSchemaType_client,
  specialties: { addIds: string[]; deleteIds: string[] },
  file?: File
) => {
  if (!id) return errorResponse({ message: "Doctor id not found" });

  try {
    const payload = await UpdateDoctorSchema_client.parseAsync(data);

    const doctor = {
      email: payload.email,
      name: payload.name,
      contactNumber: payload.contactNumber,
      address: payload.address || "",
      registrationNumber: payload.registrationNumber,
      experience: payload.experience,
      gender: payload.gender,
      appointmentFee: payload.appointmentFee,
      qualification: payload.qualification,
      currentWorkingPlace: payload.currentWorkingPlace,
      designation: payload.designation,
    };

    const formData = makeFormData(["data", { doctor, specialties }, "file", file]);

    return await _fetch.patch(join("/doctor/", id), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ DELETE DOCTOR =============
export const softDeleteDoctor = async (id: string) => {
  try {
    return await _fetch.delete(join("/doctor/soft-delete/", id));
  } catch (error) {
    return errorResponse(error);
  }
};
