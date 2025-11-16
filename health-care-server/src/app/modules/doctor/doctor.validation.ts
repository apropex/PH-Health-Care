import { Gender, UserRole } from "@prisma/client";
import z, { ZodObject } from "zod";
import { defaultZodError } from "../../../helper/defaultZodError";

const userSchema = z.object({
  email: z.string({ error: defaultZodError }),
  password: z.string({ error: defaultZodError }).optional(),
  role: z.literal(UserRole.DOCTOR, { error: "User role must be DOCTOR" }),
});

const doctorSchema = z.object({
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
});

export const CreateDoctorSchema: ZodObject = z.object({
  user: userSchema,
  doctor: doctorSchema,
});

const specialtySchema = z.object({
  id: z.string({ error: defaultZodError }),
  isDelete: z.boolean({ error: defaultZodError }),
});

export const UpdateDoctorSchema = z.object({
  doctor: doctorSchema.extend(
    z.object({ email: z.string({ error: defaultZodError }) }).shape,
  ),
  specialties: z.array(specialtySchema).optional(),
});

/**
  "doctor": {},
  "specialties": [
      {
          "id": "specialty id",
          "isDelete": false
      },
      {
          "id": "specialty id",
          "isDelete": true
      }
  ]
 */
