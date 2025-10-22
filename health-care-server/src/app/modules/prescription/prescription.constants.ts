import { iPrescriptionSearchQuery } from "../../shared/global-query-interfaces";

//* APPOINTMENT CONSTANTS *\\
type iPrescription = (keyof iPrescriptionSearchQuery)[];

export const prescriptionFilterFields: iPrescription = [
  "id",
  "doctorId",
  "patientId",
];

export const prescriptionSearchFields = [
  "doctor.name",
  "doctor.email",
  "patient.name",
  "patient.email",
];
