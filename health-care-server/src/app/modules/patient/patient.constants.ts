import { iPatientSearchQuery } from "../../shared/global-query-interfaces";

//* PATIENT CONSTANTS *\\
type iPatient = (keyof iPatientSearchQuery)[];

export const patientFilterFields: iPatient = ["isDeleted"];
export const patientSearchFields: iPatient = ["email", "name", "address"];
export const patientBooleanFields: iPatient = ["isDeleted"];
