import z from "zod";

export const resetPasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
