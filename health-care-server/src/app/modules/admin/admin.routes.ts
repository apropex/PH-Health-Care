import { UserRole } from "@prisma/client";
import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import { roleVerifier } from "../../middlewares/roleVerifier";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "../admin/admin.controller";
import { CreateAdminSchema, UpdateAdminSchema } from "./admin.validation";

const router = Router();
const { ADMIN } = UserRole;

router.post(
  "/create-admin",
  roleVerifier(ADMIN),
  singleFileUploader,
  validateRequest(CreateAdminSchema),
  controllers.createAdmin,
);

router.get("/", roleVerifier(ADMIN), controllers.getAllAdmins);

router.get("/:id", roleVerifier(ADMIN), controllers.getAdminById);

router.patch(
  "/:id",
  roleVerifier(ADMIN),
  singleFileUploader,
  validateRequest(UpdateAdminSchema),
  controllers.updateAdmin,
);

router.delete(
  "/soft-delete/:id",
  roleVerifier(ADMIN),
  controllers.softDeleteAdmin,
);

export default router;
