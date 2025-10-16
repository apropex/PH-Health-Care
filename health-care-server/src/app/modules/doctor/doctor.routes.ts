import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./doctor.controller";
import { CreateDoctorSchema } from "./doctor.validation";

const router = Router();

router.post(
  "/create-doctor",
  singleFileUploader,
  validateRequest(CreateDoctorSchema),
  controllers.createDoctor,
);

router.get("/", controllers.getAllDoctors);

export default router;
