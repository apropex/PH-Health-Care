import { Prisma } from "@prisma/client";

export interface iCreateDoctor {
  doctor: Omit<Prisma.DoctorCreateInput, "user" | "doctorSchedules" | "email">;
  user: Omit<Prisma.UserCreateInput, "admin" | "doctor" | "patient">;
  specialties: string[];
}
