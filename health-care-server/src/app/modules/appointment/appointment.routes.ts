import { Router } from "express";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import controllers from "./appointment.controller";

const router = Router();

router.post("/", tokenVerifier, controllers.createAppointment);

export default router;
