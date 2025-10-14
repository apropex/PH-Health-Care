//

//* DOCTOR-SCHEDULE ROUTES *//

import { UserRole } from "@prisma/client";
import { Router } from "express";
import { roleVerifier } from "../../middlewares/roleVerifier";
import controllers from "./doctorSchedule.controller";

const router = Router();

router.post(
  "/",
  roleVerifier(UserRole.DOCTOR),
  controllers.createDoctorSchedule,
);

export default router;
