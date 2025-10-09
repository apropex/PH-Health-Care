//

import * as z from "zod";
import {
  CreateAdminSchema,
  CreateDoctorSchema,
  CreatePatientSchema,
} from "./user.validation";

export type iCreatePatient = z.infer<typeof CreatePatientSchema> & {
  patient: {
    profilePhoto?: string;
  };
};

export type iCreateAdmin = z.infer<typeof CreateAdminSchema> & {
  admin: {
    profilePhoto?: string;
  };
};

export type iCreateDoctor = z.infer<typeof CreateDoctorSchema> & {
  doctor: {
    profilePhoto?: string;
  };
};
