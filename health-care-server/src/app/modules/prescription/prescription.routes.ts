import { UserRole } from "@prisma/client";
import { Router } from "express";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import controllers from "./prescription.controller";

const router = Router();

router.post("/", roleVerifier(UserRole.DOCTOR), controllers.createPrescription);

router.get("/my-prescriptions", tokenVerifier, controllers.getMyPrescriptions);

export default router;
