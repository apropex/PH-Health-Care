import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./user.controller";
import {
  CreateAdminSchema,
  CreateDoctorSchema,
  CreatePatientSchema,
} from "./user.validation";

const userRouter = Router();

userRouter.post(
  "/create-patient",
  singleFileUploader("file"),
  validateRequest(CreatePatientSchema),
  controllers.createPatient,
);

userRouter.post(
  "/create-admin",
  singleFileUploader("file"),
  validateRequest(CreateAdminSchema),
  controllers.createAdmin,
);

userRouter.post(
  "/create-doctor",
  singleFileUploader("file"),
  validateRequest(CreateDoctorSchema),
  controllers.createDoctor,
);

export default userRouter;
