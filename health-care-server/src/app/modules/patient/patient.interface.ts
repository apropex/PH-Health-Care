import { Prisma } from "@prisma/client";

export interface iCreatePatient {
  patient: Omit<Prisma.PatientCreateInput, "user" | "email">;
  user: Omit<Prisma.UserCreateInput, "admin" | "doctor" | "patient">;
}
