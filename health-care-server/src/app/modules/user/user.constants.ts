import {
  iAdminSearchQuery,
  iDoctorSearchQuery,
  iPatientSearchQuery,
  iUserSearchQuery,
} from "../../shared/global-query-interfaces";

//* USER CONSTANTS *\\
type iUser = (keyof iUserSearchQuery)[];

export const userFilterFields: iUser = ["status", "role", "needPasswordChange"];
export const userSearchFields: iUser = ["email"];
export const userBooleanFields: iUser = ["needPasswordChange"];

//

//* ADMIN CONSTANTS *\\
type iAdmin = (keyof iAdminSearchQuery)[];

export const adminFilterFields: iAdmin = ["email", "name", "contactNumber", "isDeleted"];
export const adminSearchFields: iAdmin = ["email", "name", "contactNumber"];
export const adminBooleanFields: iAdmin = ["isDeleted"];

//

//* PATIENT CONSTANTS *\\
type iPatient = (keyof iPatientSearchQuery)[];

export const patientFilterFields: iPatient = ["email", "name", "address", "isDeleted"];
export const patientSearchFields: iPatient = ["email", "name", "address"];
export const patientBooleanFields: iPatient = ["isDeleted"];

//

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
