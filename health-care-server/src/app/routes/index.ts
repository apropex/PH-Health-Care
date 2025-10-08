import express from "express";
import userRouter from "../modules/user/user.routes";

const router = express.Router();

[
  {
    path: "/user",
    route: userRouter,
  },

  //
].forEach(({ path, route }) => router.use(path, route));

export default router;
