import express from "express";
import adminRoutes from "../modules/admin/admin.routes";
import authRoutes from "../modules/auth/auth.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import patientRoutes from "../modules/patient/patient.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import specialtyRoutes from "../modules/specialties/specialties.routes";
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
    path: "/patient",
    route: patientRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
  {
    path: "/schedule",
    route: scheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: doctorScheduleRoutes,
  },
  {
    path: "/specialties",
    route: specialtyRoutes,
  },

  //
].forEach(({ path, route }) => router.use(path, route));

export default router;
