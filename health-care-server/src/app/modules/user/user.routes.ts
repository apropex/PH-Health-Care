//

//* USER ROUTES *//

import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./user.controller";
import {
  CreateAdminSchema,
  CreateDoctorSchema,
  CreatePatientSchema,
} from "./user.validation";

const router = Router();

router.get("/", controllers.getAllUsers);

router.post(
  "/create-patient",
  singleFileUploader,
  validateRequest(CreatePatientSchema),
  controllers.createPatient,
);

router.post(
  "/create-admin",
  singleFileUploader,
  validateRequest(CreateAdminSchema),
  controllers.createAdmin,
);

router.post(
  "/create-doctor",
  singleFileUploader,
  validateRequest(CreateDoctorSchema),
  controllers.createDoctor,
);

export default router;
