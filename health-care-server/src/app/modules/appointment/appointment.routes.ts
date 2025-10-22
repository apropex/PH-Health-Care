import { UserRole } from "@prisma/client";
import { Router } from "express";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import controllers from "./appointment.controller";

const router = Router();

router.post("/", tokenVerifier, controllers.createAppointment);

router.get("/", roleVerifier(UserRole.ADMIN), controllers.getAllAppointments);

router.get("/my-appointments", tokenVerifier, controllers.getMyAppointments);

router.patch(
  "/status/:id",
  roleVerifier(UserRole.DOCTOR),
  controllers.updateAppointmentStatus,
);

export default router;
