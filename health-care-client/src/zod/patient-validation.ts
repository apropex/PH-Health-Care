//

import z from "zod";

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

export const registerValidation_client = z
  .object({
    name: z.string().min(3, "Name is required"),
    address: z.string().optional(),
    email: z.email("Valid email is required"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must contain at least 1 letter, 1 number, 1 symbol and be 6+ characters"
      ),
    confirmPassword: z.string({ error: "Passwords do not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerValidation_server = z.object({
  name: z.string().min(3, "Name is required"),
  address: z.string().optional(),
});

export type registerValidationType_server = z.infer<typeof registerValidation_client>;
