//

//* SCHEDULE ROUTES *//

import { UserRole } from "@prisma/client";
import { Router } from "express";
import { roleVerifier } from "../../middlewares/roleVerifier";
import controllers from "./schedule.controller";

const router = Router();

router.get(
  "/",
  roleVerifier(UserRole.DOCTOR, UserRole.ADMIN),
  controllers.getAllSchedule,
);

router.post("/", controllers.createSchedule);

router.delete("/:id", controllers.deleteSchedule);

export default router;
