import { tUserRole, tUserStatus } from "@/constants";
import { iAdmin } from "./admin.interfaces";
import { iDoctor } from "./doctor.interfaces";
import { iPatient } from "./patient.interfaces";

export interface iUser {
  id: string;
  email: string;
  password: string;
  role: tUserRole;
  needPasswordChange: boolean;
  status: tUserStatus;
  createdAt: string;
  updatedAt: string;
  admin?: iAdmin | null;
  doctor?: iDoctor | null;
  patient?: iPatient | null;
}
