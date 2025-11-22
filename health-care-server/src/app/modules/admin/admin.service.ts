import { Prisma, UserRole } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import { buildHash } from "../../../utils/bcrypt";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import {
  adminBooleanFields,
  adminFilterFields,
  adminSearchFields,
} from "./admin.constants";

type WhereInput = Prisma.AdminWhereInput;

interface iCreateAdmin {
  admin: Omit<Prisma.AdminCreateInput, "user" | "email">;
  user: Omit<Prisma.UserCreateInput, "admin" | "doctor" | "patient">;
}

const createAdmin = async ({ admin, user }: iCreateAdmin) => {
  const hashed = await buildHash(user.password);

  const userExists = !!(await prisma.user.count({
    where: { email: user.email },
  }));

  if (userExists) {
    throw new ApiError(httpStatus.CONFLICT, "User already exists");
  }

  return await prisma.$transaction(async (trx) => {
    const createdUser = await trx.user.create({
      data: {
        ...user,
        password: hashed,
        role: UserRole.ADMIN,
      },
    });

    return await trx.admin.create({
      data: {
        ...admin,
        user: {
          connect: {
            email: createdUser.email,
          },
        },
      },
    });
  });
};

const updateAdmin = async (id: string, payload: Prisma.AdminUpdateInput) => {
  await prisma.admin.findUniqueOrThrow({ where: { id } });
  return await prisma.admin.update({ where: { id }, data: payload });
};

const getAllAdmins = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: adminFilterFields,
    booleanFields: adminBooleanFields,
  });

  const where = getSearchFilters({
    searchFields: adminSearchFields,
    search,
    filters: filters,
  }) as WhereInput;

  const [admins, total_data, filtered_data] = await Promise.all([
    prisma.admin.findMany({ where, orderBy, skip, take }),
    prisma.admin.count(),
    prisma.admin.count({ where }),
  ]);

  return {
    data: admins,
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

const getAdminById = async (id: string) => {
  return await prisma.admin.findUniqueOrThrow({ where: { id } });
};

const softDeleteAdmin = async (id: string) => {
  await prisma.admin.update({ where: { id }, data: { isDeleted: true } });
};

export default {
  createAdmin,
  updateAdmin,
  getAllAdmins,
  getAdminById,
  softDeleteAdmin,
};
