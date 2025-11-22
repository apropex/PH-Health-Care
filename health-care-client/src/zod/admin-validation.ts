import z from "zod";

export const CreateAdminSchema = z.object({
  email: z.string({ error: "Enter a valid email address" }),
  password: z.string({ error: "Password must be string type" }),
  needPasswordChange: z.coerce.boolean<boolean>({
    error: "Need password change must be true or false",
  }),
  name: z
    .string({ error: "Name must be string type" })
    .min(3, "Name must be at least 3 characters"),
  contactNumber: z.string({ error: "" }).min(10, "Enter a valid mobile number"),
});

export type CreateAdminSchemaType = z.infer<typeof CreateAdminSchema>;
