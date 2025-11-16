import { tBloodGroup, tGender, tMaritalStatus } from "@/constants";

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

export interface iPatientHealthInfo {
  id: string;

  gender: tGender;
  dateOfBirth: string;
  bloodGroup: tBloodGroup;
  hasAllergies: boolean;
  hasDiabetes: boolean;
  height: string;
  weight: string;
  smokingStatus: boolean;
  dietaryPreferences: string;
  pregnancyStatus: boolean;
  mentalHealthHistory: string;
  immunizationStatus: string;
  hasPastSurgeries: boolean;
  recentAnxiety: boolean;
  recentDepression: boolean;
  maritalStatus: tMaritalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface iMedicalReport {
  id: string;
  reportName: string;
  reportLink: string;
  createdAt: string;
  updatedAt: string;
}
