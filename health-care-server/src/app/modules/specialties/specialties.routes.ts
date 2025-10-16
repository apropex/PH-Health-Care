import { UserRole } from "@prisma/client";
import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import { roleVerifier } from "../../middlewares/roleVerifier";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./specialties.controller";
import { CreateSpecialtySchema } from "./specialties.validation";

const router = Router();

router.get("/", controllers.getAllSpecialties);

router.post(
  "/",
  singleFileUploader,
  validateRequest(CreateSpecialtySchema),
  controllers.createSpecialty,
);

router.delete(
  "/:id",
  roleVerifier(UserRole.ADMIN),
  controllers.deleteSpecialty,
);

export default router;
