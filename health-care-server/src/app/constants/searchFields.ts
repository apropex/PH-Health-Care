import { iDoctorSearchQuery, iUserSearchQuery } from "../shared/global-interfaces";

export const userSearchFields: (keyof iUserSearchQuery)[] = ["email", "status", "role"];

export const doctorSearchFields: (keyof iDoctorSearchQuery)[] = [
  "name",
  "email",
  "contactNumber",
  "address",
  "registrationNumber",
  "experience",
  "gender",
  "appointmentFee",
  "qualification",
  "currentWorkingPlace",
  "designation",
  "isDeleted",
];

export const doctorBooleanFields: (keyof iDoctorSearchQuery)[] = ["isDeleted"];
