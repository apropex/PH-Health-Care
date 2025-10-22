import { iDoctorSearchQuery } from "../../shared/global-query-interfaces";

//* DOCTOR CONSTANTS *\\
type iDoctor = (keyof iDoctorSearchQuery)[];

export const doctorFilterFields: iDoctor = [
  "registrationNumber",
  "experience",
  "gender",
  "appointmentFee",
  "qualification",
  "currentWorkingPlace",
  "designation",
  "isDeleted",
  "specialties",
];
export const doctorSearchFields: iDoctor = [
  "name",
  "email",
  "address",
  "currentWorkingPlace",
  "designation",
  "contactNumber",
];
export const doctorBooleanFields: iDoctor = ["isDeleted"];
export const doctorNumberFields: iDoctor = ["experience", "appointmentFee"];
