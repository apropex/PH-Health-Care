import { Gender } from "@/constants";
import { z } from "zod";

const commonSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(20, "Full name must be within 20 characters")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Name cannot be empty or whitespaces only")),

  email: z.email({ error: "Email is required" }),

  password: z.string().optional(),

  contactNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Enter a valid phone number")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Phone number cannot be empty or whitespaces only")),

  gender: z.enum(Object.values(Gender)),

  address: z
    .string()
    .min(1, "Address is required")
    .max(50, "Address must be within 50 characters")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Address cannot be empty or whitespaces only")),

  registrationNumber: z
    .string()
    .min(1, "Registration number is required")
    .max(20, "Registration number must be within 20 characters")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Registration number cannot be empty or whitespaces only")),

  qualification: z
    .string()
    .min(1, "Qualification is required")
    .max(20, "Qualification must be within 20 characters")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Qualification cannot be empty or whitespaces only")),
  designation: z
    .string()
    .min(1, "Designation is required")
    .max(20, "Designation must be within 20 characters")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Designation cannot be empty or whitespaces only")),
  currentWorkingPlace: z.string().optional(),
});

const onlyForClient = z.object({
  needPasswordChange: z.coerce.boolean<boolean>({
    error: "Need password change is required",
  }),
  experience: z.coerce.number<number>({ error: "Registration no is required" }),
  appointmentFee: z.coerce.number<number>({ error: "Appointment fee is required" }),
});

const onlyForServer = z.object({
  needPasswordChange: z.boolean({ error: "Enter valid password change type" }),
  experience: z.number({ error: "Registration no is required" }),
  appointmentFee: z.number({ error: "Appointment fee is required" }),
});

export const CreateDoctorSchema_client = commonSchema.extend(onlyForClient.shape);
export const CreateDoctorSchema_server = commonSchema.extend(onlyForServer.shape);

export const UpdateDoctorSchema_client = CreateDoctorSchema_client.omit({
  password: true,
});

export type DoctorFormSchemaType_client = z.infer<typeof CreateDoctorSchema_client>;
export type DoctorFormSchemaType_server = z.infer<typeof CreateDoctorSchema_server>;
export type UpdateDoctorSchemaType = z.infer<typeof UpdateDoctorSchema_client>;
