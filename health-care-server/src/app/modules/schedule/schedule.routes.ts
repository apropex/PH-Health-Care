//

//* SCHEDULE ROUTES *//

import { UserRole } from "@prisma/client";
import { Router } from "express";
import { roleVerifier } from "../../middlewares/roleVerifier";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./schedule.controller";
import { createScheduleSchema } from "./schedule.valication";

const router = Router();

router.get(
  "/",
  roleVerifier(UserRole.DOCTOR, UserRole.ADMIN),
  controllers.getAllSchedule,
);

router.post(
  "/",
  validateRequest(createScheduleSchema),
  controllers.createSchedule,
);

router.delete("/:id", controllers.deleteSchedule);

export default router;
