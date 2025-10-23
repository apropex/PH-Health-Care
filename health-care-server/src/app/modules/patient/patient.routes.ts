import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import { ADMIN, PATIENT } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
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

router.get("/", roleVerifier(ADMIN), controllers.getAllPatients);

router.get("/:id", tokenVerifier, controllers.getPatientById);

router.post(
  "/delete/:id",
  roleVerifier(ADMIN, PATIENT),
  controllers.softDelete,
);

router.patch("/", roleVerifier(PATIENT), controllers.updateById);

export default router;
