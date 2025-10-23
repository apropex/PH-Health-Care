//

//* USER ROUTES *//

import { Router } from "express";
import { ADMIN } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import controllers from "./user.controller";

const router = Router();

router.get("/", controllers.getAllUsers);

router.get("/:id", tokenVerifier, controllers.getUserById);

router.get("/me", tokenVerifier, controllers.getMe);

router.post(
  "/:id/status",
  roleVerifier(ADMIN),
  controllers.changeProfileStatus,
);

export default router;
