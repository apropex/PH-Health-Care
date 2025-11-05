import * as z from "zod";
import { defaultZodError } from "../../../helper/defaultZodError";

export const CreatePatientSchema = z.object({
  user: z.object({
    email: z.string({ error: defaultZodError }),
    password: z.string({ error: defaultZodError }),
    needPasswordChange: z.boolean({ error: defaultZodError }),
  }),
  patient: z.object({
    name: z.string({ error: defaultZodError }),
    address: z.string({ error: defaultZodError }).optional(),
  }),
});
