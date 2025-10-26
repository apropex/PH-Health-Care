//

import { PaymentStatus, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../error-handler/ApiError";
import { prisma } from "../../shared/prisma";

const { ADMIN, PATIENT, DOCTOR } = UserRole;

const fetchDashboardMetaData = async (decoded: JwtPayload) => {
  let metadata;

  switch (decoded.role) {
    case ADMIN: {
      metadata = await getAdminMetadata();
      break;
    }

    case DOCTOR: {
      metadata = await getDoctorMetadata(decoded.secondaryId);
      break;
    }

    case PATIENT: {
      metadata = await getPatientMetadata(decoded.secondaryId);
      break;
    }

    default:
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user role");
  }

  return metadata;
};

//* ADMIN METADATA *\\
const getAdminMetadata = async () => {
  const result = await Promise.all([
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.admin.count(),
    prisma.appointment.count(),
    prisma.payment.count(),

    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: PaymentStatus.PAID },
    }),

    getBarChartData(),
    getPieChartData(),
  ]);

  return {
    totalPatients: result[0],
    totalDoctors: result[1],
    totalAdmins: result[2],
    totalAppointments: result[3],
    totalPayments: result[4],
    totalRevenue: result[5],
    barChartData: result[6],
    pieChartData: result[7],
  };
};

const getBarChartData = async () => {
  return await prisma.$queryRaw`
    SELECT DATE_TRUNC('month', "createdAt") AS month,
    CAST(COUNT(*) AS INTEGER) AS count
    FROM "appointments"
    GROUP BY month
    ORDER BY month ASC
    `;
};

const getPieChartData = async () => {
  const result = await prisma.appointment.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  return result?.map(({ status, _count }) => ({
    status,
    total: Number(_count.id),
  }));
};

//* DOCTOR METADATA *\\
const getDoctorMetadata = async (doctorId: string) => {
  const result = await Promise.all([
    prisma.appointment.count({ where: { doctorId } }),
    prisma.appointment.groupBy({ by: ["patientId"], _count: { id: true } }),
    prisma.review.count({ where: { doctorId } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { appointment: { doctorId }, status: PaymentStatus.PAID },
    }),
    prisma.appointment.groupBy({
      by: ["status"],
      _count: { id: true },
      where: { doctorId },
    }),
  ]);

  const totalPatients = result[1].map(({ patientId, _count }) => ({
    patientId,
    count: Number(_count.id),
  }));

  const appointmentsByStatus = result[4].map(({ status, _count }) => ({
    status,
    count: Number(_count.id),
  }));

  return {
    totalAppointments: result[0],
    totalPatients,
    totalReviews: result[2],
    totalRevenue: result[3],
    appointmentsByStatus,
  };
};

const getPatientMetadata = async (patientId: string) => {
  const result = await Promise.all([
    prisma.appointment.count({ where: { patientId } }),
    prisma.prescription.count({ where: { patientId } }),
    prisma.review.count({ where: { patientId } }),
    prisma.appointment.groupBy({
      by: ["status"],
      _count: { id: true },
      where: { patientId },
    }),
  ]);

  const appointmentsById = result[3].map(({ status, _count }) => ({
    status,
    count: Number(_count.id),
  }));

  return {
    totalAppointments: result[0],
    totalPrescriptions: result[1],
    totalReviews: result[2],
    appointmentsById,
  };
};

export default { fetchDashboardMetaData };
