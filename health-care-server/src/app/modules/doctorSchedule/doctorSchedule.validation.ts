import z from "zod";

//

export const CreateDoctorScheduleSchema = z.object({
  scheduleIds: z.array(z.string()),
});
