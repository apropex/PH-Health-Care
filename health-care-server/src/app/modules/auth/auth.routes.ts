import { Router } from "express";
import controllers from "./auth.controller";

const router = Router();

router.post(
  "/login",
  //   validateRequest(),
  controllers.login,
);

export default router;
