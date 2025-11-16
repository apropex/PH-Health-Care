import { tGender } from "@/constants";

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

  doctorSpecialties: {
    specialties: iSpecialty[];
  };
}

export interface iSpecialty {
  id: string;
  title: string;
  icon: string;
}

export interface iDoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}
