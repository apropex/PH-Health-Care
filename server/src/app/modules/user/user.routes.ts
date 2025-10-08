import { Router } from "express";
import controllers from "./user.controller";

const userRouter = Router();

userRouter.post("/create-patient", controllers.createPatient);

export default userRouter;
