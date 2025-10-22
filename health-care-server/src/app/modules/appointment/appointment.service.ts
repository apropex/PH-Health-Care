import { Prisma, UserRole } from "@prisma/client";
import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import ApiError from "../../../error-handler/ApiError";
import make_payment from "../../../lib/make_payment";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import { appointmentFilterFields } from "./appointment.constants";

type WhereInput = Prisma.AppointmentWhereInput;

//
const createAppointment = async (req: Request) => {
  const { secondaryId, status, email } = req.decoded as JwtPayload;
  const { scheduleId, doctorId } = req.body;
  const videoCallingId = uuid();
  const transactionId = uuid();

  if (status === "DELETED") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `User (${email}) is deleted, contact to support`,
    );
  }

  const [doctor] = await Promise.all([
    prisma.doctor.findFirstOrThrow({
      where: { id: doctorId, isDeleted: false },
    }),
    prisma.doctorSchedule.findFirstOrThrow({
      where: { doctorId, scheduleId: scheduleId, isBooked: false },
    }),
  ]);

  return await prisma.$transaction(async (trx) => {
    const appointment = await trx.appointment.create({
      data: {
        patientId: secondaryId,
        doctorId: doctor.id,
        scheduleId,
        videoCallingId,
      },
    });

    await trx.doctorSchedule.update({
      where: { doctorId_scheduleId: { doctorId, scheduleId } },
      data: { isBooked: true },
    });

    const payment = await trx.payment.create({
      data: {
        appointmentId: appointment.id,
        amount: doctor.appointmentFee,
        transactionId,
      },
    });

    const session = await make_payment({
      email,
      doctorName: doctor.name,
      amount: doctor.appointmentFee,
      appointmentId: appointment.id,
      paymentId: payment.id,
      patientEmail: email,
    });

    return { appointment, paymentUrl: session.url };
  });
};

//* GET ALL APPOINTMENTS *\\
const getAllAppointments = async (query: iQuery) => {
  const { page, take, skip, orderBy, filters } = configureQuery(query, {
    filterFields: appointmentFilterFields,
  });

  const where = getSearchFilters({
    filters: filters,
  }) as WhereInput;

  const include = {
    patient: true,
    doctor: true,
  };

  const [appointments, total_data, filtered_data] = await Promise.all([
    prisma.appointment.findMany({ where, orderBy, skip, take, include }),
    prisma.appointment.count(),
    prisma.appointment.count({ where }),
  ]);

  return {
    data: appointments,
    meta: {
      total_data,
      filtered_data,
      total_page: Math.ceil(filtered_data / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};

//* GET MY APPOINTMENTS *\\
const getMyAppointments = async (
  { role, email }: JwtPayload,
  query: iQuery,
) => {
  const { page, take, skip, orderBy, filters } = configureQuery(query, {
    filterFields: appointmentFilterFields,
  });

  const where = getSearchFilters({
    filters: filters,
  }) as WhereInput;

  if (role && email) {
    if (!Array.isArray(where?.AND)) where.AND = [];
    if (role === UserRole.PATIENT) where.AND.push({ patient: { email } });
    if (role === UserRole.DOCTOR) where.AND.push({ doctor: { email } });
  }

  const include = {
    [role === UserRole.DOCTOR ? "patient" : "doctor"]: true,
  };

  const [appointments, total_data, filtered_data] = await Promise.all([
    prisma.appointment.findMany({ where, orderBy, skip, take, include }),
    prisma.appointment.count(),
    prisma.appointment.count({ where }),
  ]);

  return {
    data: appointments,
    meta: {
      total_data,
      filtered_data,
      total_page: Math.ceil(filtered_data / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};

const updateAppointmentStatus = async (req: Request) => {
  const { id, status } = req.body;
  const email = req.decoded?.email;

  const { doctor } = await prisma.appointment.findUniqueOrThrow({
    where: { id },
    include: { doctor: true },
  });

  if (email !== doctor.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `You are not permitted to change the status, only ${doctor.name} can change it.`,
    );
  }

  return await prisma.appointment.update({
    where: { id },
    data: { status },
  });
};

export default {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus,
};
