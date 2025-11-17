import { Doctor, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { deleteImageFromCloud } from "../../../config/cloudinary/deleteImageFromCloud";
import ApiError from "../../../error-handler/ApiError";
import openRouter from "../../../helper/openRouter";
import { buildHash } from "../../../utils/bcrypt";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import {
  doctorBooleanFields,
  doctorFilterFields,
  doctorNumberFields,
  doctorSearchFields,
} from "./doctor.constants";
import { iCreateDoctor } from "./doctor.interface";

type WhereInput = Prisma.DoctorWhereInput;

// create doctor
const createDoctor = async ({ doctor, user, specialties }: iCreateDoctor) => {
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

    const newDoctor = await trx.doctor.create({
      data: {
        ...doctor,
        user: {
          connect: {
            email: createdUser.email,
          },
        },
      },
    });

    for (const specialty of specialties) {
      await trx.doctorSpecialties.create({
        data: {
          specialtiesId: specialty,
          doctorId: newDoctor.id,
        },
      });
    }

    return newDoctor;
  });
};

// GET ALL DOCTORS

const getAllDoctors = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: doctorFilterFields,
    booleanFields: doctorBooleanFields,
    numberFields: doctorNumberFields,
  });

  const { specialties, ...filterFields } = filters;

  const where = getSearchFilters({
    searchFields: doctorSearchFields,
    search,
    filters: filterFields,
  }) as WhereInput;

  if (specialties) {
    const specialtyCondition = {
      doctorSpecialties: {
        some: {
          specialties: {
            title: {
              constants: specialties,
              mode: "insensitive",
            },
          },
        },
      },
    };

    if (!Array.isArray(where?.AND)) where.AND = [];
    where.AND.push(specialtyCondition as WhereInput);
  }

  const include = {
    doctorSpecialties: {
      include: {
        specialties: true,
      },
    },
    reviews: true,
  };

  const [doctors, total_data, filtered_data] = await Promise.all([
    prisma.doctor.findMany({ where, orderBy, skip, take, include }),
    prisma.doctor.count(),
    prisma.doctor.count({ where }),
  ]);

  return {
    data: doctors,
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

// update doctor

/*
received data

{
  "user": {},
  "doctor": {},
  "specialties": [
      {
          "id": "specialty id",
          "isDelete": false
      },
      {
          "id": "specialty id",
          "isDelete": true
      }
  ]
}

*/

interface iUpdateDoctor {
  doctor: Doctor;
  specialties: {
    addIds: string[];
    deleteIds: string[];
  };
}

const updateDoctor = async (id: string, payload: iUpdateDoctor) => {
  //
  const { profilePhoto } = await prisma.doctor.findFirstOrThrow({
    where: { id },
  });

  const { specialties, doctor: doctorData } = payload;

  return await prisma.$transaction(async (trx) => {
    //

    for (const specialty of specialties.deleteIds) {
      await trx.doctorSpecialties.delete({
        where: {
          specialtiesId_doctorId: {
            specialtiesId: specialty,
            doctorId: id,
          },
        },
      });
    }

    for (const specialty of specialties.addIds) {
      await trx.doctorSpecialties.create({
        data: {
          specialtiesId: specialty,
          doctorId: id,
        },
      });
    }

    const updatedDoctor = await trx.doctor.update({
      where: { id },
      data: doctorData,
      include: {
        doctorSpecialties: {
          include: {
            specialties: true,
          },
        },
      },
    });

    if (doctorData.profilePhoto && profilePhoto) {
      await deleteImageFromCloud(profilePhoto);
    }

    return updatedDoctor;
  });
};

const getAISuggestion = async (payload: { symptoms: string }) => {
  if (!(payload && payload.symptoms.trim())) {
    throw new ApiError(httpStatus.BAD_REQUEST, "symptoms is required");
  }

  const doctors = await prisma.doctor.findMany({
    where: { isDeleted: false },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  return await openRouter(payload, doctors);
};

const getDoctorById = async (id: string) => {
  return await prisma.doctor.findUniqueOrThrow({
    where: { id, isDeleted: false },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
      doctorSchedules: {
        include: {
          schedule: true,
        },
      },
      reviews: true,
    },
  });
};

export const softDeleteDoctor = async (id: string) => {
  await prisma.doctor.update({
    where: { id },
    data: { isDeleted: true },
  });
};

export default {
  createDoctor,
  getAllDoctors,
  updateDoctor,
  getAISuggestion,
  getDoctorById,
  softDeleteDoctor,
};
