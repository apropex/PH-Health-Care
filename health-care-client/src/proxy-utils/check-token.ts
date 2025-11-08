/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const checkToken = async (
  token: string,
  secret: "access" | "refresh"
): Promise<JwtPayload | null> => {
  if (!accessTokenSecret || !refreshTokenSecret) return null;

  const tokenSecret = secret === "access" ? accessTokenSecret : refreshTokenSecret;

  try {
    const decoded = jwt.verify(token, tokenSecret);
    if (typeof decoded === "string") return null;
    return decoded as JwtPayload;
  } catch (error: any) {
    const cookieStore = await cookies();
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      cookieStore.delete("accessToken");
      if (secret === "refresh") cookieStore.delete("refreshToken");
    }
    return null;
  }
};
