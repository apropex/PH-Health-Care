import { Router } from "express";
import { singleFileUploader } from "../../../helper/multer.controller";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "../admin/admin.controller";
import { CreateAdminSchema } from "./admin.validation";

const router = Router();

router.post(
  "/create-admin",
  singleFileUploader,
  validateRequest(CreateAdminSchema),
  controllers.createAdmin,
);

export default router;
