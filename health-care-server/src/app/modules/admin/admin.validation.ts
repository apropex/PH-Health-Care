//

import z from "zod";
import { defaultZodError } from "../../../helper/defaultZodError";

export const CreateAdminSchema = z.object({
  user: z.object({
    email: z.string({ error: defaultZodError }),
    password: z.string({ error: defaultZodError }),
    needPasswordChange: z.boolean({ error: defaultZodError }),
  }),
  admin: z.object({
    name: z.string({ error: defaultZodError }),
    contactNumber: z.string({ error: defaultZodError }),
  }),
});

export const UpdateAdminSchema = z.object({
  name: z.string({ error: defaultZodError }),
  contactNumber: z.string({ error: defaultZodError }),
});
