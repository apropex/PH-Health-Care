import { iDoctorSearchQuery } from "../../shared/global-query-interfaces";

//* DOCTOR CONSTANTS *\\
type iDoctor = (keyof iDoctorSearchQuery)[];

export const doctorFilterFields: iDoctor = [
  "name",
  "email",
  "contactNumber",
  "registrationNumber",
  "experience",
  "gender",
  "appointmentFee",
  "qualification",
  "currentWorkingPlace",
  "designation",
  "isDeleted",
];
export const doctorSearchFields: iDoctor = [
  "name",
  "email",
  "address",
  "currentWorkingPlace",
  "designation",
];
export const doctorBooleanFields: iDoctor = ["isDeleted"];
export const doctorNumberFields: iDoctor = ["experience", "appointmentFee"];
