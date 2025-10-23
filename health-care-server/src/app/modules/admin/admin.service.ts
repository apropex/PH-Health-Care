import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import { buildHash } from "../../../utils/bcrypt";
import { prisma } from "../../shared/prisma";

interface iCreateAdmin {
  admin: Omit<Prisma.AdminCreateInput, "user" | "email">;
  user: Omit<Prisma.UserCreateInput, "admin" | "doctor" | "patient">;
}

const createAdmin = async ({ admin, user }: iCreateAdmin) => {
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

export default { createAdmin };
