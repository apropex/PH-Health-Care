import { Router } from "express";
import adminRoutes from "../modules/admin/admin.routes";
import appointmentRoutes from "../modules/appointment/appointment.routes";
import authRoutes from "../modules/auth/auth.routes";
import doctorRoutes from "../modules/doctor/doctor.routes";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.routes";
import patientRoutes from "../modules/patient/patient.routes";
import prescriptionRoutes from "../modules/prescription/prescription.routes";
import scheduleRoutes from "../modules/schedule/schedule.routes";
import specialtyRoutes from "../modules/specialties/specialties.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

const routesMaker = (dest: string, router: Router) => {
  return { path: dest, route: router };
};

[
  routesMaker("/user", userRoutes),
  routesMaker("/auth", authRoutes),
  routesMaker("/patient", patientRoutes),
  routesMaker("/admin", adminRoutes),
  routesMaker("/doctor", doctorRoutes),
  routesMaker("/schedule", scheduleRoutes),
  routesMaker("/doctor-schedule", doctorScheduleRoutes),
  routesMaker("/specialties", specialtyRoutes),
  routesMaker("/appointment", appointmentRoutes),
  routesMaker("/prescription", prescriptionRoutes),

  //
].forEach(({ path, route }) => router.use(path, route));

export default router;
