//

import { UserStatus } from "@prisma/client";
import { compareHash } from "../../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { prisma } from "../../shared/prisma";

const login = async ({ email, password }: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User does not exists");
  if (user.status === UserStatus.DELETED)
    throw new Error("User account was deleted, contact to support");

  const { password: hashedPass, ...rest } = user;

  const isValidate = await compareHash(password, hashedPass);
  if (!isValidate) throw new Error("Invalidate credentials");

  const access_token = generateAccessToken(user);
  const refresh_token = generateRefreshToken(user);

  return { user: rest, access_token, refresh_token };
};

export default { login };
