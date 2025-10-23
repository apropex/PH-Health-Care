//

//* USER SERVICES *//

import {
  Admin,
  Doctor,
  Patient,
  Prisma,
  User,
  UserStatus,
} from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import exclude from "../../../utils/exclude";
import { iQuery } from "../../shared/global-query-interfaces";
import { prisma } from "../../shared/prisma";
import {
  userBooleanFields,
  userFilterFields,
  userSearchFields,
} from "./user.constants";

interface iUserProfile extends User {
  admin: Admin | null;
  patient: Patient | null;
  doctor: Doctor | null;
}

const getAllUsers = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: userFilterFields,
    booleanFields: userBooleanFields,
  });

  const where = getSearchFilters({
    searchFields: userSearchFields,
    search,
    filters,
  }) as Prisma.UserWhereInput;

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

const getUserById = async (id: string) => {
  const user = (await prisma.user.findUniqueOrThrow({
    where: { id },
    include: { admin: true, patient: true, doctor: true },
  })) as iUserProfile;

  if (user.status === UserStatus.DELETED) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User was deleted, contact to support",
    );
  }

  const excludeFields: (keyof iUserProfile)[] = ["password"];

  (["admin", "doctor", "patient"] as (keyof iUserProfile)[]).forEach((f) => {
    if (!user[f]) excludeFields.push(f);
  });

  const safeUser = exclude(user, ...excludeFields);

  return safeUser;
};

const changeProfileStatus = async (id: string, status: UserStatus) => {
  await prisma.user.findUniqueOrThrow({ where: { id } });

  const user = await prisma.user.update({
    where: { id },
    data: { status },
  });

  return user;
};

export default { getAllUsers, getUserById, changeProfileStatus };
