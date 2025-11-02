import { tGender, tUserRole, tUserStatus } from "@/constants";

export interface iUser {
  id: string;
  email: string;
  password: string;
  role: tUserRole;
  needPasswordChange: boolean;
  status: tUserStatus;
  createdAt: string;
  updatedAt: string;
  admin: iAdmin | null | undefined;
  doctor: iDoctor | null | undefined;
  patient: iPatient | null | undefined;
}

export interface iAdmin {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface iDoctor {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: tGender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  averageRating: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface iPatient {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
