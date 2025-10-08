import * as z from "zod";

//

const defaultError = ({ input, expected }: any) =>
  input ? `invalid type, expected ${expected}` : "Field is required";

//

export const CreatePatientSchema = z.object({
  user: z.object({
    name: z.string({ error: defaultError }),
    email: z.string({ error: defaultError }),
    password: z.string({ error: defaultError }),
  }),
  patient: z.object({
    address: z.string({ error: defaultError }).optional(),
  }),
});
