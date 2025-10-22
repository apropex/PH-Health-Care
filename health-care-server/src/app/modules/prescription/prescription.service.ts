import { AppointmentStatus, Prisma, UserRole } from "@prisma/client";
import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../error-handler/ApiError";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import {
  prescriptionFilterFields,
  prescriptionSearchFields,
} from "./prescription.constants";

type CreateInput = Prisma.PrescriptionCreateInput & { appointmentId: string };
type WhereInput = Prisma.PrescriptionWhereInput;

const createPrescription = async (req: Request) => {
  const payload = req.body as CreateInput;
  const email = req.decoded?.email;

  const { id, status, doctor, doctorId, patientId } =
    await prisma.appointment.findUniqueOrThrow({
      where: { id: payload.appointmentId },
      include: { doctor: true },
    });

  if (email !== doctor.email) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `You are not permitted to create the prescription, only ${doctor.name} can create it.`,
    );
  }

  if (status !== AppointmentStatus.COMPLETED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Appointment status must be COMPLETED, present status is: ${status}`,
    );
  }

  return await prisma.prescription.create({
    data: {
      appointmentId: id,
      doctorId,
      patientId,
      instruction: payload.instruction,
      followUpdate: payload.followUpdate,
    },
    include: {
      patient: true,
    },
  });
};

// get my prescriptions
const getMyPrescriptions = async (decoded: JwtPayload, query: iQuery) => {
  const { secondaryId, role } = decoded;

  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: prescriptionFilterFields,
  });

  if (role === UserRole.DOCTOR) filters.doctorId = secondaryId;
  if (role === UserRole.PATIENT) filters.patientId = secondaryId;

  const where = getSearchFilters({
    filters,
    searchFields: prescriptionSearchFields,
    search,
  }) as WhereInput;

  const include = {
    doctor: true,
    patient: true,
  };

  const [prescriptions, total_data, filtered_data] = await Promise.all([
    prisma.prescription.findMany({ where, orderBy, skip, take, include }),
    prisma.prescription.count(),
    prisma.prescription.count({ where }),
  ]);

  return {
    data: prescriptions,
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

export default { createPrescription, getMyPrescriptions };
