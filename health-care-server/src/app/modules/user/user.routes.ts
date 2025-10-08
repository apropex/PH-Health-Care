import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./user.controller";
import { CreatePatientSchema } from "./user.validation";

const userRouter = Router();

userRouter.post(
  "/create-patient",
  singleFileUploader("file"),
  validateRequest(CreatePatientSchema),
  controllers.createPatient
);

export default userRouter;
