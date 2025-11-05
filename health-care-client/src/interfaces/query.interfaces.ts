//

import { tGender } from "@/constants";

export interface iCommonQuery {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface iDoctorQuery extends iCommonQuery {
  registrationNumber?: string;
  experience?: string | number;
  gender?: tGender;
  appointmentFee?: string | number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  isDeleted?: string | boolean;
  specialties?: string;
}
