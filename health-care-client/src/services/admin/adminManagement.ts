"use server";

import { iResponse } from "@/interfaces";
import { iAdmin } from "@/interfaces/admin.interfaces";
import { _fetch } from "@/utility/_fetch";
import { errorResponse } from "@/utility/errorResponse";
import join from "@/utility/joinText";
import { makeFormData } from "@/utility/makeFormData";
import { CreateAdminSchema, CreateAdminSchemaType } from "@/zod/admin-validation";

// ============ CREATE ADMIN =============
export const createAdmin = async (data: CreateAdminSchemaType, file: File) => {
  try {
    if (!file) return errorResponse({ message: "Admin image is required" });

    const payload = await CreateAdminSchema.parseAsync(data);

    const user = {
      email: payload.email,
      password: payload.password || "",
      needPasswordChange: payload.needPasswordChange,
    };

    const admin = {
      name: payload.name,
      contactNumber: payload.contactNumber,
    };

    const formData = makeFormData(["data", { user, admin }, "file", file]);

    return await _fetch.post<iAdmin>("/admin/create-admin", { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ GET ADMINS =============
export const getAdmins = async (query?: string) => {
  try {
    return await _fetch.get<iAdmin[]>(join("/admin", query ? join("?", query) : ""));
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ GET ADMIN BY ID =============
export const getAdminById = async (id: string) => {
  try {
    return await _fetch.get<iAdmin>(join("/admin/", id));
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ UPDATE ADMINS =============
export const updateAdmin = async (
  id: string,
  data: CreateAdminSchemaType,
  file?: File
) => {
  if (!id) return errorResponse({ message: "Admin id not found" });

  try {
    const { name, contactNumber } = await CreateAdminSchema.parseAsync(data);

    const formData = makeFormData(["data", { name, contactNumber }, "file", file]);

    return await _fetch.patch(join("/admin/", id), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

// ============ DELETE ADMIN =============
export const softDeleteAdmin = async (id: string): Promise<iResponse<unknown>> => {
  try {
    return await _fetch.delete(join("/admin/soft-delete/", id));
  } catch (error) {
    return errorResponse(error);
  }
};
