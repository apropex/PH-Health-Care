import { Router } from "express";
import adminRoutes from "../modules/admin/admin.routes";
import appointmentRoutes from "../modules/appointment/appointment.routes";
import authRoutes from "../modules/auth/auth.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import metaDataRoutes from "../modules/meta/meta.routes";
import patientRoutes from "../modules/patient/patient.routes";
import prescriptionRoutes from "../modules/prescription/prescription.routes";
import reviewRoutes from "../modules/review/review.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import specialtyRoutes from "../modules/specialties/specialties.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

[
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/patient", route: patientRoutes },
  { path: "/admin", route: adminRoutes },
  { path: "/doctor", route: doctorRoutes },
  { path: "/schedule", route: scheduleRoutes },
  { path: "/doctor-schedule", route: doctorScheduleRoutes },
  { path: "/specialties", route: specialtyRoutes },
  { path: "/appointment", route: appointmentRoutes },
  { path: "/prescription", route: prescriptionRoutes },
  { path: "/review", route: reviewRoutes },
  { path: "/meta-data", route: metaDataRoutes },

  //
].forEach(({ path, route }) => router.use(path, route));

export default router;
