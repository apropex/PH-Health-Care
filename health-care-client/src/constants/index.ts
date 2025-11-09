//

export const UserRole = {
  PATIENT: "PATIENT",
  DOCTOR: "DOCTOR",
  ADMIN: "ADMIN",
} as const;

export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DELETED: "DELETED",
} as const;

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export const AppointmentStatus = {
  SCHEDULE: "SCHEDULE",
  ONPROGRESS: "ONPROGRESS",
  COMPLETED: "COMPLETED",
  CANCEL: "CANCEL",
} as const;

export const PaymentStatus = {
  PAID: "PAID",
  UNPAID: "UNPAID",
} as const;

export const BloodGroup = {
  A_POSITIVE: "A_POSITIVE",
  B_POSITIVE: "B_POSITIVE",
  O_POSITIVE: "O_POSITIVE",
  AB_POSITIVE: "AB_POSITIVE",
  A_NEGATIVE: "A_NEGATIVE",
  B_NEGATIVE: "B_NEGATIVE",
  O_NEGATIVE: "O_NEGATIVE",
  AB_NEGATIVE: "AB_NEGATIVE",
} as const;

export const MaritalStatus = {
  MARRIED: "MARRIED",
  UNMARRIED: "UNMARRIED",
} as const;

export type tUserRole = (typeof UserRole)[keyof typeof UserRole];
export type tUserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export type tGender = (typeof Gender)[keyof typeof Gender];
export type tAppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];
export type tPaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export type tBloodGroup = (typeof BloodGroup)[keyof typeof BloodGroup];
export type tMaritalStatus = (typeof MaritalStatus)[keyof typeof MaritalStatus];
