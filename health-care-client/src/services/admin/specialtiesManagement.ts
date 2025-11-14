//

import { _fetch } from "@/utility/_fetch";
import { errorResponse } from "@/utility/errorResponse";
import join from "@/utility/joinText";
import { makeFormData } from "@/utility/makeFormData";
import { zodErrorReturn } from "@/utility/zodValidatorFn";
import z from "zod";

const specialtySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

export async function createSpecialty(_: unknown, formData: FormData) {
  try {
    const rawData = { title: formData.get("title") };
    const file = formData.get("file") as File;

    const payload = specialtySchema.safeParse(rawData);
    if (!payload.success) return zodErrorReturn(payload);

    const newFormData = makeFormData(["data", payload.data, "file", file]);

    return await _fetch.post("/specialties", { body: newFormData });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function getSpecialties() {
  try {
    return await _fetch.get("/specialties");
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deleteSpecialty(id: string) {
  try {
    return await _fetch.delete(join("/specialties/", id));
  } catch (error) {
    return errorResponse(error);
  }
}
