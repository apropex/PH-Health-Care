import { Prisma, UserStatus } from "@prisma/client";
import { Request } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../error-handler/ApiError";
import { buildHash } from "../../../utils/bcrypt";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import {
  patientBooleanFields,
  patientFilterFields,
  patientSearchFields,
} from "./patient.constants";
import { iCreatePatient } from "./patient.interface";

type WhereInput = Prisma.PatientWhereInput;

const createPatient = async ({ patient, user }: iCreatePatient) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({
    where: { email: user.email },
  }));

  if (userExists)
    throw new ApiError(httpStatus.CONFLICT, "User already exists");

  return await prisma.$transaction(async (trx) => {
    const createdUser = await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.patient.create({
      data: {
        ...patient,
        user: {
          connect: {
            email: createdUser.email,
          },
        },
      },
    });
  });
};

const getAllPatients = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: patientFilterFields,
    booleanFields: patientBooleanFields,
  });

  const where = getSearchFilters({
    searchFields: patientSearchFields,
    search,
    filters,
  }) as WhereInput;

  const include = {
    reviews: true,
  };

  const [patients, total_data, filtered_data] = await Promise.all([
    prisma.patient.findMany({ where, orderBy, skip, take, include }),
    prisma.patient.count(),
    prisma.patient.count({ where }),
  ]);

  return {
    data: patients,
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

const getPatientById = async (id: string) => {
  return await prisma.patient.findUnique({
    where: { id, isDeleted: false },
  });
};

const softDelete = async (id: string) => {
  return await prisma.$transaction(async (trx) => {
    const patient = await trx.patient.update({
      where: { id },
      data: { isDeleted: false },
    });

    await trx.user.update({
      where: { email: patient.email },
      data: { status: UserStatus.DELETED },
    });

    return patient;
  });
};

/*
{
  patient: {},
  patientHealthInfo: {},
  medicalReport: [],
}
*/

const updateById = async (req: Request) => {
  const { patient: patientData, patientHealthInfo, medicalReport } = req.body;
  const decoded: JwtPayload = req.decoded || {};

  if (decoded.status === UserStatus.DELETED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User is deleted, contact to support",
    );
  }

  return await prisma.$transaction(async (trx) => {
    const patient = await trx.patient.update({
      where: { id: decoded.secondaryId },
      data: patientData,
    });

    if (patientHealthInfo) {
      await trx.patientHealthInfo.upsert({
        where: { patientId: patient.id },
        update: patientHealthInfo,
        create: { ...patientHealthInfo, patientId: patient.id },
      });
    }

    if (medicalReport && Array.isArray(medicalReport) && medicalReport.length) {
      medicalReport.forEach(async ({ id, ...data }) => {
        await trx.medicalReport.upsert({
          where: { id, patientId: patient.id },
          update: data,
          create: { ...data, patientId: patient.id },
        });
      });
    }

    return await trx.patient.findUnique({
      where: { id: patient.id },
      include: {
        patientHealthInfo: true,
        medicalReport: true,
      },
    });
  });
};

export default {
  createPatient,
  getAllPatients,
  getPatientById,
  softDelete,
  updateById,
};
