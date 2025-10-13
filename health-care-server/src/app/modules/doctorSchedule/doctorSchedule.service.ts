import { Request } from "express";
import { prisma } from "../../shared/prisma";

const createDoctorSchedule = async (req: Request) => {
  const scheduleIds: string[] = req.body.scheduleIds || [];
  const doctorId = req.decoded?.id ?? "";

  const data = scheduleIds.map((scheduleId) => ({ doctorId, scheduleId }));

  return await prisma.doctorSchedule.createMany({ data });
};

export default { createDoctorSchedule };

// https://www.youtube.com/watch?v=dcZqrRnKL5M&list=RDdcZqrRnKL5M&start_radio=1
