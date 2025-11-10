"use server";

import { checkToken } from "@/proxy-utils/check-token";
import { getCookie } from "@/proxy-utils/cookie";
import { JwtPayload } from "jsonwebtoken";

const getUserFromJwtPayload = async (): Promise<JwtPayload | null> => {
  const accessToken = await getCookie("accessToken");
  return await checkToken(accessToken, "access");
};

export default getUserFromJwtPayload;
