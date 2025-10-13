//

//* DOCTOR-SCHEDULE ROUTES *//

import { Router } from "express";
import controllers from "./doctorSchedule.controller";

const router = Router();

router.post(
  "/",
  //   roleVerifier(UserRole.DOCTOR), // TODO: uncomment
  controllers.createDoctorSchedule,
);

export default router;
