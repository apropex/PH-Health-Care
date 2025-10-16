//

//* DOCTOR-SCHEDULE ROUTES *//

import { UserRole } from "@prisma/client";
import { Router } from "express";
import { roleVerifier } from "../../middlewares/roleVerifier";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./doctorSchedule.controller";
import { CreateDoctorScheduleSchema } from "./doctorSchedule.validation";

const router = Router();

router.post(
  "/",
  roleVerifier(UserRole.DOCTOR),
  validateRequest(CreateDoctorScheduleSchema),
  controllers.createDoctorSchedule,
);

export default router;
