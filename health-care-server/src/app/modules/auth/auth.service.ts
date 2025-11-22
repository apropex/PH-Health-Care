//

import { UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import { buildHash, compareHash } from "../../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { prisma } from "../../shared/prisma";
import { resetPasswordSchemaType } from "./auth.validation";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      doctor: true,
      admin: true,
      patient: true,
    },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User does not exists");
  if (user.status === UserStatus.DELETED)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "User account was deleted, contact to support",
    );

  const { password: hashedPass, patient, doctor, admin, ...rest } = user;

  await compareHash(password, hashedPass);

  let payload = {};
  let newUser = {};

  if (patient) {
    newUser = { ...rest, patient };
    payload = {
      ...rest,
      secondaryId: patient.id,
      avatar: patient.profilePhoto,
      name: patient.name,
    };
  }
  if (doctor) {
    newUser = { ...rest, doctor };
    payload = {
      ...rest,
      secondaryId: doctor.id,
      avatar: doctor.profilePhoto,
      name: doctor.name,
    };
  }
  if (admin) {
    newUser = { ...rest, admin };
    payload = {
      ...rest,
      secondaryId: admin.id,
      avatar: admin.profilePhoto,
      name: admin.name,
    };
  }

  const access_token = generateAccessToken(payload);
  const refresh_token = generateRefreshToken(payload);

  return { user: newUser, access_token, refresh_token };
};

const resetPassword = async (id: string, payload: resetPasswordSchemaType) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { id } });
  await compareHash(payload.oldPassword, user.password, "Invalid old password");

  const hashed = await buildHash(payload.newPassword);
  await prisma.user.update({ where: { id }, data: { password: hashed } });
};

export default { login, resetPassword };
