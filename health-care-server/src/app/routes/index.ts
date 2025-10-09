import express from "express";
import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/user/user.routes";

const router = express.Router();

[
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },

  //
].forEach(({ path, route }) => router.use(path, route));

export default router;
