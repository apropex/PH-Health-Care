import { UserRole } from "@prisma/client";
import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import { roleVerifier } from "../../middlewares/roleVerifier";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./doctor.controller";
import { CreateDoctorSchema, UpdateDoctorSchema } from "./doctor.validation";

const router = Router();

router.post(
  "/create-doctor",
  roleVerifier(UserRole.ADMIN),
  singleFileUploader,
  validateRequest(CreateDoctorSchema),
  controllers.createDoctor,
);

router.get("/", controllers.getAllDoctors);

router.get("/:id", controllers.getDoctorById);

router.patch(
  "/:id",
  singleFileUploader,
  validateRequest(UpdateDoctorSchema),
  controllers.updateDoctor,
);

router.delete(
  "/soft-delete/:id",
  roleVerifier(UserRole.ADMIN, UserRole.DOCTOR),
  controllers.softDeleteDoctor,
);

router.post("/suggestion", controllers.getAISuggestion);

export default router;
