import { iAppointmentSearchQuery } from "../../shared/global-query-interfaces";

//* APPOINTMENT CONSTANTS *\\
type iAppointment = (keyof iAppointmentSearchQuery)[];

export const appointmentFilterFields: iAppointment = [
  "status",
  "paymentStatus",
];
