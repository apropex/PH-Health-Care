import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./patient.controller";
import { CreatePatientSchema } from "./patient.validation";

const router = Router();

router.post(
  "/create-patient",
  singleFileUploader,
  validateRequest(CreatePatientSchema),
  controllers.createPatient,
);

export default router;
