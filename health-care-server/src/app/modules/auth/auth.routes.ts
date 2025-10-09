import { Router } from "express";
import controllers from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/login",
  //   validateRequest(),
  controllers.login
);

export default authRouter;
