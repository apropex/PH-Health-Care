import { Prisma } from "@prisma/client";
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

interface iCreateDoctor {
  doctor: Omit<Prisma.DoctorCreateInput, "user" | "doctorSchedules" | "email">;
  user: Omit<Prisma.UserCreateInput, "admin" | "doctor" | "patient">;
}

const createDoctor = async ({ doctor, user }: iCreateDoctor) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({
    where: { email: user.email },
  }));

  if (userExists) throw new Error("User already exists");

  return await prisma.$transaction(async (trx) => {
    const createdUser = await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.doctor.create({
      data: {
        ...doctor,
        user: {
          connect: {
            email: createdUser.email,
          },
        },
      },
    });
  });
};

const getAllDoctors = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: doctorFilterFields,
    booleanFields: doctorBooleanFields,
    numberFields: doctorNumberFields,
  });

  const where = getSearchFilters({
    searchFields: doctorSearchFields,
    search,
    filters,
  }) as Prisma.DoctorWhereInput;

  const [doctors, total_data, filtered_data] = await Promise.all([
    prisma.doctor.findMany({ where, orderBy, skip, take }),
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

export default {
  createDoctor,
  getAllDoctors,
};
