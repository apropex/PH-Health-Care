import { Gender } from "@/constants";
import { z } from "zod";

export const DoctorFormSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(20, "Full name must be within 20 characters")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Name cannot be empty or whitespaces only")),
  email: z.email({ error: "Email is required" }),

  contactNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Enter a valid phone number")
    .transform((val) => val.trim())
    .pipe(z.string().min(1, "Phone number cannot be empty or whitespaces only")),
  needPasswordChange: z.string(),

  gender: z.enum(Object.values(Gender)),
  password: z.string().optional(),
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

  experience: z.coerce.number<number>({ error: "Registration no is required" }),
  appointmentFee: z.coerce.number<number>({ error: "Appointment fee is required" }),

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

export type DoctorFormSchemaType = z.infer<typeof DoctorFormSchema>;
