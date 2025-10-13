import express from "express";
import authRoutes from "../modules/auth/auth.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import userRoutes from "../modules/user/user.routes";

const router = express.Router();

[
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/schedule",
    route: scheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: doctorScheduleRoutes,
  },

  //
].forEach(({ path, route }) => router.use(path, route));

export default router;
