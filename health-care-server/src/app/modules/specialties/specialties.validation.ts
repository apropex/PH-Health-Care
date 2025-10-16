import z from "zod";

export const CreateSpecialtySchema = z.object({
  title: z.string({
    error: "Title is required!",
  }),
});
