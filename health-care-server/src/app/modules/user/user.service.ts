//

//* USER SERVICES *//

import { Prisma } from "@prisma/client";
import { buildHash } from "../../../utils/bcrypt";
import configureQuery from "../../../utils/configureQuery";
import { userSearchFields } from "../../constants/searchFields";
import { iQuery } from "../../shared/global-interfaces";
import { prisma } from "../../shared/prisma";
import { iCreateAdmin, iCreateDoctor, iCreatePatient } from "./user.interface";

//

const createPatient = async ({ patient, user }: iCreatePatient) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({ where: { email: user.email } }));

  if (userExists) throw new Error("User already exists");

  return await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.patient.create({
      data: {
        ...patient,
        email: user.email,
      },
    });
  });
};

//

const createAdmin = async ({ admin, user }: iCreateAdmin) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({ where: { email: user.email } }));

  if (userExists) throw new Error("User already exists");

  return await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.patient.create({
      data: {
        ...admin,
        email: user.email,
      },
    });
  });
};

//

const createDoctor = async ({ doctor, user }: iCreateDoctor) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({ where: { email: user.email } }));

  if (userExists) throw new Error("User already exists");

  return await prisma.$transaction(async (trx) => {
    await trx.user.create({
      data: {
        ...user,
        password: hashed,
      },
    });

    return await trx.patient.create({
      data: {
        ...doctor,
        email: user.email,
      },
    });
  });
};

//

const getAllUsers = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(
    query,
    ...userSearchFields,
  );

  let where: Prisma.UserWhereInput = {};

  if (search) {
    where.email = {
      contains: search as string,
      mode: "insensitive",
    };
  }

  if (filters && Object.keys(filters).length > 0) {
    where = { ...where, ...filters } as Prisma.UserWhereInput;
  }

  const [users, total_data, filtered_data] = await Promise.all([
    prisma.user.findMany({ where, skip, take, orderBy }),
    prisma.user.count(),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
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
  createPatient,
  createAdmin,
  createDoctor,
  getAllUsers,
};
