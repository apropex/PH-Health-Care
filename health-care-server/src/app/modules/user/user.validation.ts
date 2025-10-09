import { Gender } from "@prisma/client";
import * as z from "zod";

//

const defaultError = ({ input, expected }: any) =>
  input ? `invalid type, expected ${expected}` : "Field is required";

//

export const CreatePatientSchema = z.object({
  user: z.object({
    email: z.string({ error: defaultError }),
    password: z.string({ error: defaultError }),
  }),
  patient: z.object({
    name: z.string({ error: defaultError }),
    address: z.string({ error: defaultError }).optional(),
  }),
});

//

export const CreateAdminSchema = z.object({
  user: z.object({
    email: z.string({ error: defaultError }),
    password: z.string({ error: defaultError }),
  }),
  admin: z.object({
    name: z.string({ error: defaultError }),
    contactNumber: z.string({ error: defaultError }),
  }),
});

//

export const CreateDoctorSchema = z.object({
  user: z.object({
    email: z.string({ error: defaultError }),
    password: z.string({ error: defaultError }),
  }),
  doctor: z.object({
    name: z.string({ error: defaultError }),
    contactNumber: z.string({ error: defaultError }),
    address: z.string({ error: defaultError }).optional(),
    registrationNumber: z.string({ error: defaultError }),
    experience: z.number({ error: defaultError }),
    gender: z.enum(Object.values(Gender), { error: defaultError }),
    appointmentFee: z.number({ error: defaultError }),
    qualification: z.string({ error: defaultError }),
    currentWorkingPlace: z.string({ error: defaultError }),
    designation: z.string({ error: defaultError }),
  }),
});
