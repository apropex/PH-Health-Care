//

import { UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../error-handler/ApiError";
import { compareHash } from "../../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { prisma } from "../../shared/prisma";

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
      doctor: { select: { id: true } },
      admin: { select: { id: true } },
      patient: { select: { id: true } },
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

  if (patient) payload = { ...rest, secondaryId: patient.id };
  if (doctor) payload = { ...rest, secondaryId: doctor.id };
  if (admin) payload = { ...rest, secondaryId: admin.id };

  const access_token = generateAccessToken(payload);
  const refresh_token = generateRefreshToken(payload);

  return { user: rest, access_token, refresh_token };
};

export default { login };
