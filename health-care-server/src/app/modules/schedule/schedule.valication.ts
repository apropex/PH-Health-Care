import z from "zod";

export const createScheduleSchema = z.object({
  startDate: z
    .string({ error: "startDate must be string type" })
    .min(4, "startDate is required"),
  endDate: z
    .string({ error: "endDate must be string type" })
    .min(4, "endDate is required"),
  startTime: z
    .string({ error: "startTime must be string type" })
    .min(4, "startTime is required"),
  endTime: z
    .string({ error: "endTime must be string type" })
    .min(4, "endTime is required"),
});
