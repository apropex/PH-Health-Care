import { Router } from "express";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import validateRequest from "../../middlewares/validateRequest";
import controllers from "./auth.controller";
import { resetPasswordSchema } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  //   validateRequest(),
  controllers.login,
);

router.post(
  "/reset-password",
  tokenVerifier,
  validateRequest(resetPasswordSchema),
  controllers.resetPassword,
);

router.get("/refresh-token-verifier", controllers.getAccessTokenByRefreshToken);

export default router;
