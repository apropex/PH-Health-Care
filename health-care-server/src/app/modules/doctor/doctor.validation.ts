import { Gender } from "@prisma/client";
import z, { ZodObject } from "zod";
import { defaultZodError } from "../../../helper/defaultZodError";

export const CreateDoctorSchema: ZodObject = z.object({
  user: z.object({
    email: z.string({ error: defaultZodError }),
    password: z.string({ error: defaultZodError }),
  }),
  doctor: z.object({
    name: z.string({ error: defaultZodError }),
    contactNumber: z.string({ error: defaultZodError }),
    address: z.string({ error: defaultZodError }).optional(),
    registrationNumber: z.string({ error: defaultZodError }),
    experience: z.number({ error: defaultZodError }),
    gender: z.enum(Object.values(Gender), { error: defaultZodError }),
    appointmentFee: z.number({ error: defaultZodError }),
    qualification: z.string({ error: defaultZodError }),
    currentWorkingPlace: z.string({ error: defaultZodError }),
    designation: z.string({ error: defaultZodError }),
  }),
});
