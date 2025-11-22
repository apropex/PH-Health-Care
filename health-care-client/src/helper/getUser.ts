"use server";

import { iAdmin } from "@/interfaces/admin.interfaces";
import { iDoctor } from "@/interfaces/doctor.interfaces";
import { iPatient } from "@/interfaces/patient.interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import { _fetch } from "@/utility/_fetch";
import { JwtPayload } from "jsonwebtoken";

interface getUserReturnType extends JwtPayload {
  patient: iPatient | null;
  doctor: iDoctor | null;
  admin: iAdmin | null;
}

export const getUser = async (): Promise<getUserReturnType> => {
  try {
    const { data } = await _fetch.get<iUser>("/auth/me", {
      cache: "force-cache",
      next: { tags: ["USER_INFO"] },
    });

    const user: getUserReturnType = {
      id: data.id,
      email: data.email,
      role: data.role,
      needPasswordChange: data.needPasswordChange,
      status: data.status,
      name: "",
      avatar: "",
      secondaryId: "",
      patient: null,
      doctor: null,
      admin: null,
    };

    if (data.patient) {
      user.name = data.patient.name;
      user.avatar = data.patient.profilePhoto;
      user.secondaryId = data.patient.id;
      user.patient = data.patient;
    } else if (data.doctor) {
      user.name = data.doctor.name;
      user.avatar = data.doctor.profilePhoto;
      user.secondaryId = data.doctor.id;
      user.doctor = data.doctor;
    } else if (data.admin) {
      user.name = data.admin.name;
      user.avatar = data.admin.profilePhoto;
      user.secondaryId = data.admin.id;
      user.admin = data.admin;
    }

    return user;
  } catch (error) {
    throw error;
  }
};
