import z from "zod";
import { CreateDoctorSchema } from "./doctor.validation";

export type iCreateDoctor = z.infer<typeof CreateDoctorSchema> & {
  doctor: {
    profilePhoto?: string;
  };
};
